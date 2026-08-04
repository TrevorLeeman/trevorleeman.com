import { useEffect, useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

type RevealState = 'visible' | 'hidden' | 'revealed';

/**
 * Scroll entrance wrapper. The server HTML renders fully visible (so the page
 * works without JS and paints before hydration); after mount, elements still
 * below the viewport are hidden and fade-lift in the first time they enter it.
 */
const Reveal = ({ className = '', delay = 0, children }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RevealState>('visible');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Only animate elements the visitor hasn't seen yet.
    if (el.getBoundingClientRect().top <= window.innerHeight) return;

    setState('hidden');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('revealed');
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stateClasses =
    state === 'hidden'
      ? 'translate-y-5 opacity-0'
      : state === 'revealed'
      ? 'translate-y-0 opacity-100 transition-[opacity,transform] duration-[550ms] ease-signal'
      : '';

  return (
    <div ref={ref} className={`${stateClasses} ${className}`} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
};

export default Reveal;
