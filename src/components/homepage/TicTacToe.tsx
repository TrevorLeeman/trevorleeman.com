import { useEffect, useRef, useState } from 'react';
import { ArrowCounterClockwise, ArrowUpRight } from 'phosphor-react';
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

type Mark = 'x' | 'o';
type Cell = Mark | null;

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const winnerOf = (cells: Cell[]) => {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) return { mark: cells[a] as Mark, line };
  }
  return null;
};

/** Decent but beatable: it wins and blocks on sight, but never plans a fork. */
const replyFor = (cells: Cell[]) => {
  const openIn = (line: number[], mark: Mark) => {
    const marks = line.map(i => cells[i]);
    return marks.filter(m => m === mark).length === 2 && marks.includes(null) ? line[marks.indexOf(null)] : -1;
  };
  for (const mark of ['o', 'x'] as Mark[]) {
    for (const line of LINES) {
      const spot = openIn(line, mark);
      if (spot >= 0) return spot;
    }
  }
  if (!cells[4]) return 4;
  const corners = [0, 2, 6, 8].filter(i => !cells[i]);
  const open = cells.map((cell, i) => (cell ? -1 : i)).filter(i => i >= 0);
  const pool = corners.length ? corners : open;
  return pool[Math.floor(Math.random() * pool.length)];
};

/** Cell centers in the 120-unit board, shared by the grid and the strike. */
const CENTERS = [20, 60, 100];

type GlyphProps = { className?: string; ghost?: boolean; draw?: boolean };

/* With draw set, the marks write themselves stroke by stroke: the X as two
   quick flicks, the O as one sweep from the top. Ghost hints render the same
   glyph finished and still. */
const XGlyph = ({ className = '', ghost = false, draw = false }: GlyphProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
    <g
      style={{ stroke: ghost ? 'rgb(var(--color-muted))' : 'rgb(var(--color-signal))' }}
      strokeWidth={3}
      strokeLinecap="round"
    >
      <line x1={5} y1={5} x2={19} y2={19} pathLength={1} className={draw ? 'ttt-stroke' : undefined} />
      <line x1={19} y1={5} x2={5} y2={19} pathLength={1} className={draw ? 'ttt-stroke ttt-stroke-2' : undefined} />
    </g>
  </svg>
);

const OGlyph = ({ className = '', draw = false }: GlyphProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
    {/* The circle path starts at 3 o'clock; the rotate puts the pen down at
        the top so the sweep reads like handwriting. */}
    <circle
      cx={12}
      cy={12}
      r={8}
      pathLength={1}
      transform="rotate(-90 12 12)"
      style={{ stroke: 'rgb(var(--color-accent))' }}
      strokeWidth={3}
      strokeLinecap="round"
      className={draw ? 'ttt-stroke-o' : undefined}
    />
  </svg>
);

/**
 * The little board, for real this time. The visitor is X and moves first; the
 * site answers after a beat. The server renders the empty board so markup
 * stays deterministic, and every move is client state after that. Marks write
 * themselves in like pen strokes, the same language as the hero line and the
 * winning strike, so the whole board reads as two people playing on paper.
 */
const PlayableBoard = () => {
  const [cells, setCells] = useState<Cell[]>(() => Array(9).fill(null));
  const [thinking, setThinking] = useState(false);
  const replyTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(replyTimer.current), []);

  const result = winnerOf(cells);
  const full = cells.every(Boolean);
  const over = result !== null || full;
  const started = cells.some(Boolean);

  const place = (index: number) => {
    if (cells[index] || over || thinking) return;
    const next = [...cells];
    next[index] = 'x';
    setCells(next);
    if (winnerOf(next) || next.every(Boolean)) return;
    setThinking(true);
    replyTimer.current = setTimeout(() => {
      setCells(current => {
        const withReply = [...current];
        withReply[replyFor(current)] = 'o';
        return withReply;
      });
      setThinking(false);
    }, 420);
  };

  const reset = () => {
    clearTimeout(replyTimer.current);
    setThinking(false);
    setCells(Array(9).fill(null));
  };

  const status = result
    ? result.mark === 'x'
      ? 'you win, nicely played'
      : 'the site takes this one'
    : full
    ? 'a draw, respectable'
    : thinking
    ? 'hmm...'
    : started
    ? 'your move'
    : 'you are ✕, take a square';

  const strike = result
    ? (() => {
        const from = { x: CENTERS[result.line[0] % 3], y: CENTERS[Math.floor(result.line[0] / 3)] };
        const to = { x: CENTERS[result.line[2] % 3], y: CENTERS[Math.floor(result.line[2] / 3)] };
        const length = Math.hypot(to.x - from.x, to.y - from.y);
        const ux = (to.x - from.x) / length;
        const uy = (to.y - from.y) / length;
        return { x1: from.x - ux * 9, y1: from.y - uy * 9, x2: to.x + ux * 9, y2: to.y + uy * 9 };
      })()
    : null;

  const cellLabel = (index: number, cell: Cell) => {
    const position = `row ${Math.floor(index / 3) + 1}, column ${(index % 3) + 1}`;
    return cell ? `${position}, taken by ${cell === 'x' ? 'X' : 'O'}` : `Place an X at ${position}`;
  };

  return (
    <div className="flex shrink-0 flex-col items-center gap-3 self-center sm:self-auto">
      <div className="relative h-36 w-36 sm:h-40 sm:w-40">
        {/* Hand-drawn grid: four rounded hairlines instead of cell borders. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <span className="absolute inset-y-[4%] left-1/3 w-0.5 -translate-x-1/2 rounded-full bg-line-strong" />
          <span className="absolute inset-y-[4%] left-2/3 w-0.5 -translate-x-1/2 rounded-full bg-line-strong" />
          <span className="absolute inset-x-[4%] top-1/3 h-0.5 -translate-y-1/2 rounded-full bg-line-strong" />
          <span className="absolute inset-x-[4%] top-2/3 h-0.5 -translate-y-1/2 rounded-full bg-line-strong" />
        </div>

        {/* grid-rows-3 pins every row to an exact third. Rows must never size
            from their contents: the ghost hints unmount while the site is
            thinking, and content-sized rows would redistribute and shove the
            placed pieces around. */}
        <div
          role="group"
          aria-label="Playable tic tac toe. You play X, the site plays O."
          className="relative grid h-full w-full grid-cols-3 grid-rows-3"
        >
          {cells.map((cell, index) => (
            <button
              key={index}
              type="button"
              onClick={() => place(index)}
              disabled={!!cell || over || thinking}
              aria-label={cellLabel(index, cell)}
              className="group relative flex items-center justify-center disabled:cursor-default"
            >
              {cell === 'x' ? (
                <XGlyph draw className="h-[55%] w-[55%]" />
              ) : cell === 'o' ? (
                <OGlyph draw className="h-[55%] w-[55%]" />
              ) : !over && !thinking ? (
                <XGlyph ghost className="h-[55%] w-[55%] opacity-0 transition-opacity group-hover:opacity-25" />
              ) : null}
            </button>
          ))}
        </div>

        {strike ? (
          <svg viewBox="0 0 120 120" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full">
            <line
              {...strike}
              pathLength={1}
              className="ttt-strike"
              style={{
                stroke: result?.mark === 'x' ? 'rgb(var(--color-signal) / 0.55)' : 'rgb(var(--color-accent) / 0.55)',
              }}
              strokeWidth={4}
              strokeLinecap="round"
            />
          </svg>
        ) : null}
      </div>

      <p aria-live="polite" className="flex h-4 items-center gap-3 font-mono text-[0.65rem] text-muted">
        {status}
        {over ? (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1 uppercase tracking-label transition-colors hover:text-accent"
          >
            <ArrowCounterClockwise size={11} weight="bold" aria-hidden="true" />
            again
          </button>
        ) : null}
      </p>
    </div>
  );
};

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
        <PlayableBoard />
      </Reveal>
    </div>
  </section>
);

export default TicTacToe;
