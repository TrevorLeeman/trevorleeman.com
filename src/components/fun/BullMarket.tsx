import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

/**
 * Hidden easter egg: the Konami code starts a bull market. A screenful of
 * emerald candles floats up and off the page while a small mono toast confirms
 * the rally, then everything cleans itself up. A styled console greeting hints
 * at the code for anyone curious enough to open devtools. Renders nothing
 * until triggered, so it costs the page nothing.
 */

const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];

const RALLY_MS = 6200;
const CANDLE_COUNT = 26;

type Candle = { id: number; left: number; delay: number; duration: number; width: number; drift: number };

/* Module-level so React strict-mode double mounts greet exactly once. */
let greeted = false;

const BullMarket = () => {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [active, setActive] = useState(false);
  const nextId = useRef(0);
  const progress = useRef(0);
  const endTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (greeted) return;
    greeted = true;
    console.log(
      '%c▁▂▂▃▄▅▆█  up and to the right' +
        '\n%cYou opened the console. This site is hand-built Next.js and Tailwind, source in the footer.' +
        '\n%cTry the Konami code for a bull market: ↑ ↑ ↓ ↓ ← → ← → B A',
      'color:#34d399;font-family:ui-monospace,monospace;font-size:12px',
      'color:#94a3b8;font-family:ui-monospace,monospace',
      'color:#818cf8;font-family:ui-monospace,monospace',
    );
  }, []);

  useEffect(() => {
    const rally = () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduceMotion) {
        setCandles(
          Array.from({ length: CANDLE_COUNT }, () => ({
            id: (nextId.current += 1),
            left: 2 + Math.random() * 96,
            delay: Math.random() * 1.8,
            duration: 2.4 + Math.random() * 1.6,
            width: 8 + Math.random() * 10,
            drift: (Math.random() - 0.5) * 120,
          })),
        );
      }
      setActive(true);
      clearTimeout(endTimer.current);
      endTimer.current = setTimeout(() => {
        setCandles([]);
        setActive(false);
      }, RALLY_MS);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /^(input|textarea|select)$/i.test(target.tagName)) return;
      const key = event.key.toLowerCase();
      progress.current = key === KONAMI[progress.current] ? progress.current + 1 : key === KONAMI[0] ? 1 : 0;
      if (progress.current === KONAMI.length) {
        progress.current = 0;
        rally();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      clearTimeout(endTimer.current);
    };
  }, []);

  if (!active) return null;

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {candles.map(candle => (
          <span
            key={candle.id}
            className="bull-candle absolute top-full"
            style={
              {
                left: `${candle.left}%`,
                animationDelay: `${candle.delay}s`,
                animationDuration: `${candle.duration}s`,
                '--drift': `${candle.drift}px`,
              } as CSSProperties
            }
          >
            <svg width={candle.width} height={candle.width * 3.2} viewBox="0 0 10 32" fill="none">
              <line
                x1={5}
                y1={0}
                x2={5}
                y2={32}
                style={{ stroke: 'rgb(var(--color-signal))' }}
                strokeOpacity={0.7}
                strokeWidth={1.5}
              />
              <rect x={1} y={7} width={8} height={18} rx={1.5} style={{ fill: 'rgb(var(--color-signal))' }} />
            </svg>
          </span>
        ))}
      </div>
      <div role="status" className="bull-toast pointer-events-none fixed bottom-6 z-50">
        <span className="flex items-center gap-2 rounded-md border border-line bg-surface/95 px-4 py-2 font-mono text-xs text-ink shadow-card">
          <span aria-hidden="true" className="sc-heartbeat h-1.5 w-1.5 rounded-full bg-signal" style={{ animationDelay: '0s' }} />
          bull market · up and to the right
        </span>
      </div>
    </>
  );
};

export default BullMarket;
