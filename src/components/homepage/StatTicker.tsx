import { useEffect, useRef } from 'react';

export type Stat = {
  label: string;
  value: string;
};

type CountPlan = { target: number; decimals: number; grouped: boolean; suffix: string };

/** Splits "1.6M+" into a number to count to and the suffix to keep. */
const parseValue = (value: string): CountPlan | null => {
  const match = value.match(/^([\d,]*\.?\d+)(.*)$/);
  if (!match) return null;
  return {
    target: parseFloat(match[1].replace(/,/g, '')),
    decimals: (match[1].split('.')[1] || '').length,
    grouped: match[1].includes(','),
    suffix: match[2],
  };
};

const formatValue = (value: number, plan: CountPlan) =>
  (plan.grouped ? Math.round(value).toLocaleString('en-US') : value.toFixed(plan.decimals)) + plan.suffix;

/**
 * Ticker-style strip of figures between two hairlines, no card chrome. The
 * figures tick up like live market data the first time the strip scrolls into
 * view. Same contract as Reveal: the server HTML carries the final values, the
 * count-up only runs for figures the visitor has not seen yet, and the frames
 * write textContent directly so nothing re-renders. The final frame restores
 * the exact published string.
 */
const StatTicker = ({ stats }: { stats: Stat[] }) => {
  const listRef = useRef<HTMLDListElement>(null);
  const valueRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (list.getBoundingClientRect().top <= window.innerHeight) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const plans = stats.map((stat, i) => ({
          el: valueRefs.current[i],
          plan: parseValue(stat.value),
          delay: i * 90,
          final: stat.value,
        }));
        const start = performance.now();
        const tick = (now: number) => {
          let done = true;
          for (const { el, plan, delay, final } of plans) {
            if (!el || !plan) continue;
            const progress = Math.min(1, Math.max(0, (now - start - delay) / 1100));
            if (progress < 1) done = false;
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = progress >= 1 ? final : formatValue(plan.target * eased, plan);
          }
          if (!done) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    observer.observe(list);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [stats]);

  return (
    <dl ref={listRef} className="grid grid-cols-2 gap-x-8 gap-y-6 border-y border-line py-6 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div key={stat.label}>
          <dt className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-label text-muted">
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-signal" />
            {stat.label}
          </dt>
          <dd className="mt-2 font-display text-xl font-semibold tabular-nums text-ink">
            <span
              ref={el => {
                valueRefs.current[index] = el;
              }}
            >
              {stat.value}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default StatTicker;
