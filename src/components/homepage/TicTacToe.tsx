import { ArrowUpRight } from 'phosphor-react';
import Reveal from '../ui/Reveal';

const LIVE_URL = 'https://tic-tac-toe.trevorleeman.com';
const SOURCE_URL = 'https://github.com/TrevorLeeman/react-tic-tac-toe';

const QuietLink = ({ label, href }: { label: string; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-label text-muted transition-colors hover:text-accent"
  >
    {label}
    <ArrowUpRight size={12} weight="bold" aria-hidden="true" />
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);

/** A little hand-rolled board where X takes the diagonal. Decorative only. */
const MiniBoard = () => (
  <svg viewBox="0 0 120 120" aria-hidden="true" className="h-28 w-28 shrink-0 rotate-3 sm:h-32 sm:w-32">
    {[40, 80].map(p => (
      <g key={p} style={{ stroke: 'rgb(var(--color-line-strong))' }} strokeWidth={2} strokeLinecap="round">
        <line x1={p} y1={8} x2={p} y2={112} />
        <line x1={8} y1={p} x2={112} y2={p} />
      </g>
    ))}
    {/* X sweeps the diagonal, up and to the right in spirit. */}
    {[
      [20, 20],
      [60, 60],
      [100, 100],
    ].map(([cx, cy]) => (
      <g key={`${cx}-${cy}`} style={{ stroke: 'rgb(var(--color-signal))' }} strokeWidth={3} strokeLinecap="round">
        <line x1={cx - 8} y1={cy - 8} x2={cx + 8} y2={cy + 8} />
        <line x1={cx + 8} y1={cy - 8} x2={cx - 8} y2={cy + 8} />
      </g>
    ))}
    {[
      [100, 20],
      [20, 60],
      [60, 100],
    ].map(([cx, cy]) => (
      <circle
        key={`${cx}-${cy}`}
        cx={cx}
        cy={cy}
        r={9}
        style={{ stroke: 'rgb(var(--color-accent))' }}
        strokeWidth={3}
      />
    ))}
    <line
      x1={10}
      y1={10}
      x2={110}
      y2={110}
      style={{ stroke: 'rgb(var(--color-signal) / 0.55)' }}
      strokeWidth={4}
      strokeLinecap="round"
    />
  </svg>
);

/** An unnumbered aside between the serious sections: play, not portfolio. */
const TicTacToe = () => (
  <section id="projects" aria-labelledby="projects-title" className="border-t border-line py-12 sm:py-14">
    <div className="container-page">
      <Reveal className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-label text-muted">✕ ◯ · intermission</p>
          <h2 id="projects-title" className="mt-4 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
            Tic Tac Toe, from the pre-AI era.
          </h2>
          <p className="mt-3 max-w-[58ch] text-sm leading-relaxed sm:text-base">
            Every line of game logic, styling, and animation crafted by hand. What a concept these days. The board grows
            past 3×3, and the whole thing installs as a PWA.
          </p>
          <div className="mt-5 flex items-center gap-6">
            <QuietLink label="Play it" href={LIVE_URL} />
            <QuietLink label="Source" href={SOURCE_URL} />
          </div>
        </div>
        <MiniBoard />
      </Reveal>
    </div>
  </section>
);

export default TicTacToe;
