import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Moon, Sun } from 'phosphor-react';
import { useTheme } from 'next-themes';

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

const iconClasses = (active: boolean) =>
  `absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-200 ${
    active ? 'opacity-100 motion-safe:rotate-0' : 'opacity-0 motion-safe:-rotate-45'
  }`;

const ThemeToggle: React.FunctionComponent = () => {
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Where supported, the new theme sweeps out from the button as a growing
   * circle via the View Transitions API; the globals.css view-transition rules
   * silence the default cross-fade so the clip-path is the whole effect.
   * Everywhere else (and under reduced motion) this is a plain toggle.
   */
  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';
    const startViewTransition = (document as ViewTransitionDocument).startViewTransition?.bind(document);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
    const y = rect ? rect.top + rect.height / 2 : 40;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
    transition.ready
      .then(() =>
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 550,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          } as KeyframeAnimationOptions,
        ),
      )
      .catch(() => {
        // The browser skipped the transition; the theme still switched.
      });
  };

  return mounted ? (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-ink md:h-9 md:w-9"
    >
      <span className={iconClasses(isDark)}>
        <Moon size={17} weight="bold" />
      </span>
      <span className={iconClasses(!isDark)}>
        <Sun size={17} weight="bold" />
      </span>
    </button>
  ) : (
    // Placeholder to prevent layout shift
    <div className="h-11 w-11 md:h-9 md:w-9" />
  );
};

export default ThemeToggle;
