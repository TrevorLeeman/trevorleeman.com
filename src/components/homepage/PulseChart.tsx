import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';

/**
 * Decorative pulse scene for the hero, hand-built in SVG: one EKG-style trace
 * drawn left to right, where every beat is a shipped initiative and the
 * amplitude grows over time. All ambient motion lives in the sc-* classes in
 * globals.css; the geometry is fixed constants and pure arithmetic, so server
 * and client render identical markup. Two scenes share the code: a wide
 * thirteen-beat desktop cut and a taller seven-beat compact cut for phones,
 * each rendered by its own instance and swapped with CSS. Labels are sized from the
 * measured viewport scale so they render at a constant on-screen size at any
 * width. On fine pointers the desktop instance adds a crosshair that snaps to
 * the nearest beat, a readout chip naming it, a soft glow on that beat, and a
 * single ripple on click, all updated imperatively (refs + rAF) so mousemove
 * never re-renders. Purely visual, so callers hide it from assistive tech.
 */

type Pt = { x: number; y: number; sharp?: boolean };

type Beat = {
  /** Axis word under the beat. */
  label: string;
  /** Hover readout, desktop only. */
  chip: string;
  /** Spike height as a fraction of the tallest beat; the last beat is 1. */
  amp: number;
  /** Lower keeps its axis label first when the row runs out of room. */
  priority: number;
};

type VariantConfig = {
  viewW: number;
  /** Server-rendered guesses; replaced post-mount by the measured box. */
  defaultViewH: number;
  defaultPxScale: number;
  minViewH: number;
  maxViewH: number;
  beats: Beat[];
  /** Faint year hairlines drawn midway between these beat index pairs. */
  yearLinesBetween: [number, number][];
  /** One label per span the hairlines cut, left to right; one more than the lines. */
  years: string[];
  areaOpacity: number;
  /** Seconds the trace spends drawing; both scenes land on DRAW_LANDS. */
  drawDur: number;
  /** On-screen pixel size for axis labels. */
  tickPx: number;
};

/** The beat the trace lands on; the endpoint blooms 120ms later. */
const DRAW_LANDS = 2.7;

/* The pen's easing. It must match --sc-draw-ease on the trace paths below, or
   the label reveals detach from the pen that is supposed to trigger them. */
const DRAW_EASE = [0.33, 0.33, 0.6, 1] as const;
const DRAW_EASE_CSS = `cubic-bezier(${DRAW_EASE.join(', ')})`;

/* Fraction of the path the lit pen head covers. The trace is long, so the
   default 3% window would light half a spike at once. */
const HEAD_LENGTH = 0.012;

/* Fixed baseline wobble, cycled by sample index. Pure arithmetic, so server
   and client agree to the digit; anything random would break hydration. */
const WOBBLE = [0, 0.6, 1.1, 0.8, 0.1, -0.7, -1.2, -0.6];

const CHIP_H = 30;
const CHIP_FONT = 13;

const clamp = (value: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, value));

const SIGNAL = 'rgb(var(--color-signal))';
const ACCENT = 'rgb(var(--color-accent))';
const MUTED = 'rgb(var(--color-muted))';

const delay = (seconds: number) => ({ animationDelay: `${seconds.toFixed(2)}s` });

const f = (value: number) => value.toFixed(1);

/** One axis of a cubic bezier easing, sampled at u. */
const bez = (a: number, b: number, u: number) => 3 * (1 - u) * (1 - u) * u * a + 3 * (1 - u) * u * u * b + u * u * u;

/** Inverts the draw easing: the fraction of drawDur at which the pen has covered `fraction` of the path. */
const drawTimeFor = (fraction: number) => {
  let prevT = 0;
  let prevP = 0;
  for (let k = 1; k <= 48; k += 1) {
    const u = k / 48;
    const t = bez(DRAW_EASE[0], DRAW_EASE[2], u);
    const p = bez(DRAW_EASE[1], DRAW_EASE[3], u);
    if (p >= fraction) return prevT + (t - prevT) * ((fraction - prevP) / Math.max(p - prevP, 1e-6));
    prevT = t;
    prevP = p;
  }
  return 1;
};

/* Catmull-Rom through the gentle stretches, straight lines into and out of
   every sharp point, so the baseline reads organic while the spikes stay
   crisp. A sharp neighbour lends no tangent, which keeps the curve from
   overshooting into the spike it is approaching. */
const tracePath = (points: Pt[]) => {
  let d = `M${f(points[0].x)},${f(points[0].y)}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p1 = points[i];
    const p2 = points[i + 1];
    if (p1.sharp || p2.sharp) {
      d += ` L${f(p2.x)},${f(p2.y)}`;
      continue;
    }
    const before = points[i - 1];
    const after = points[i + 2];
    const p0 = !before || before.sharp ? p1 : before;
    const p3 = !after || after.sharp ? p2 : after;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${f(c1x)},${f(c1y)} ${f(c2x)},${f(c2y)} ${f(p2.x)},${f(p2.y)}`;
  }
  return d;
};

/* The vertical geometry derives from viewH and every on-screen size from the
   measured px scale, so the scene always spends exactly the box it gets and
   its labels hold a constant on-screen size at any viewport. */
const buildScene = (config: VariantConfig, viewH: number, pxScale: number) => {
  /* Every geometric constant below is an ON-SCREEN pixel intent, converted
     into viewBox units at the measured scale. Raw viewBox constants render at
     half size on a phone, where pxScale is ~0.49 against desktop's ~0.91. */
  const px = (screenPx: number) => Math.round(screenPx / pxScale);
  const pxf = (screenPx: number) => screenPx / pxScale;

  const tickFont = Math.round(config.tickPx / pxScale);
  /* The axis carries two rows: beat words nearest the rule, years beneath. */
  const yearFont = Math.round(tickFont * 0.85);
  const yearRow = Math.round(yearFont * 1.7);
  const plotL = px(8);
  const plotR = config.viewW - px(8);
  const xAxisGutter = Math.round(tickFont * 1.9) + yearRow;
  const axisY = viewH - xAxisGutter - px(4);
  /* The gap between the baseline and the rule keeps the undershoots off it. */
  const baseY = axisY - px(16);
  const gridTop = px(12);
  const marker = { halo: px(10), core: px(4.5), ring: px(6.5) };
  const ampMax = baseY - gridTop - marker.halo - px(4);

  const n = config.beats.length;
  const x0 = plotL + px(35);
  const xLast = plotR - px(16);
  const pitch = (xLast - x0) / (n - 1);
  const W = Math.min(0.58 * pitch, px(64));

  const pts: Pt[] = [{ x: plotL, y: baseY }];
  const apexAt: number[] = [];
  const glowPaths: string[] = [];
  let sample = 0;
  let cursor = plotL;

  config.beats.forEach((beat, i) => {
    const cx = x0 + i * pitch;
    const A = beat.amp * ampMax;
    /* Side features are capped so tall beats grow their spike, not their bumps. */
    const P = Math.min(0.12 * A, pxf(14));
    const Q = Math.min(0.05 * A, pxf(4));
    const S = Math.min(0.1 * A, pxf(11));
    const T = Math.min(0.08 * A, pxf(9));
    const entry = cx - W * 0.5;
    for (let x = cursor + pxf(28); x < entry - pxf(6); x += pxf(28)) {
      pts.push({ x, y: baseY + pxf(WOBBLE[sample % WOBBLE.length]) });
      sample += 1;
    }
    pts.push({ x: entry, y: baseY });
    pts.push({ x: cx - W * 0.34, y: baseY - P });
    pts.push({ x: cx - W * 0.22, y: baseY });
    pts.push({ x: cx - W * 0.1, y: baseY, sharp: true });
    pts.push({ x: cx - W * 0.05, y: baseY + Q, sharp: true });
    pts.push({ x: cx, y: baseY - A, sharp: true });
    apexAt.push(pts.length - 1);

    const last = i === n - 1;
    const glow = [
      `M${f(cx - W * 0.1)},${f(baseY)}`,
      `L${f(cx - W * 0.05)},${f(baseY + Q)}`,
      `L${f(cx)},${f(baseY - A)}`,
    ];
    if (!last) glow.push(`L${f(cx + W * 0.05)},${f(baseY + S)}`, `L${f(cx + W * 0.11)},${f(baseY)}`);
    glowPaths.push(glow.join(' '));

    /* The live beat ends on its peak: the endpoint is the tallest spike, still rising. */
    if (last) return;
    pts.push({ x: cx + W * 0.05, y: baseY + S, sharp: true });
    pts.push({ x: cx + W * 0.11, y: baseY, sharp: true });
    pts.push({ x: cx + W * 0.2, y: baseY });
    pts.push({ x: cx + W * 0.34, y: baseY - T });
    pts.push({ x: cx + W * 0.5, y: baseY });
    cursor = cx + W * 0.5;
  });

  /* Arc length by chord, good enough to time each label to the pen. */
  const cum = [0];
  for (let i = 1; i < pts.length; i += 1) {
    cum[i] = cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  }
  const total = cum[cum.length - 1];
  const drawStart = DRAW_LANDS - config.drawDur;

  const labelY = viewH - yearRow - Math.round(tickFont * 0.5);
  const yearY = viewH - Math.round(yearFont * 0.45);
  /* JetBrains Mono advances exactly 0.6em per glyph, spaces and slashes included. */
  const estW = (text: string) => text.length * tickFont * 0.6;
  const anchorFor = (i: number): 'start' | 'middle' | 'end' => (i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle');
  const labelXFor = (i: number, x: number) => (i === 0 ? x - W / 2 : i === n - 1 ? x + marker.halo : x);

  const beats = config.beats.map((beat, i) => {
    const x = x0 + i * pitch;
    const apexY = baseY - beat.amp * ampMax;
    const progress = cum[apexAt[i]] / total;
    return {
      ...beat,
      i,
      x,
      apexY,
      anchor: anchorFor(i),
      labelX: labelXFor(i, x),
      glowPath: glowPaths[i],
      chipW: Math.round(beat.chip.length * CHIP_FONT * 0.62 + 28),
      /* Each label lands just as the pen crests its beat. */
      revealAt: Math.max(drawStart, drawStart + config.drawDur * drawTimeFor(progress) - 0.12),
      shown: false,
    };
  });

  /* Which axis words fit: place by priority, skip any that would collide.
     Rejected labels keep their beat and chip; only the axis word goes. */
  const span = (b: (typeof beats)[number]): [number, number] => {
    const w = estW(b.label);
    if (b.anchor === 'start') return [b.labelX, b.labelX + w];
    if (b.anchor === 'end') return [b.labelX - w, b.labelX];
    return [b.labelX - w / 2, b.labelX + w / 2];
  };
  /* A full glyph of air, so neighbours never read as one phrase. */
  const gap = tickFont;
  const shown: number[] = [];
  [...beats]
    .sort((a, b) => a.priority - b.priority)
    .forEach(b => {
      const [l, r] = span(b);
      if (l < 0 || r > config.viewW) return;
      const clear = shown.every(j => {
        const [jl, jr] = span(beats[j]);
        return r + gap <= jl || l >= jr + gap;
      });
      if (clear) shown.push(b.i);
    });
  shown.forEach(i => {
    beats[i].shown = true;
  });

  const yearLines = config.yearLinesBetween.map(([a, b]) => (beats[a].x + beats[b].x) / 2);
  const edges = [plotL, ...yearLines, plotR];
  const years = config.years.map((year, i) => ({ year, x: (edges[i] + edges[i + 1]) / 2 }));
  const linePath = tracePath(pts);
  const last = beats[n - 1];
  const areaPath = `${linePath} L${f(last.x)},${f(baseY)} L${f(plotL)},${f(baseY)} Z`;

  return {
    viewW: config.viewW,
    viewH,
    pxScale,
    areaOpacity: config.areaOpacity,
    drawDur: config.drawDur,
    drawStart,
    px,
    tickFont,
    yearFont,
    yearY,
    plotL,
    plotR,
    axisY,
    baseY,
    gridTop,
    marker,
    ampMax,
    labelY,
    beats,
    yearLines,
    years,
    linePath,
    areaPath,
    endX: last.x,
    endY: last.apexY,
  };
};

/* Thirteen beats across four years on desktop; the phone cut keeps seven.
   Beats are evenly spaced rather than dated: real dates would stack the 2025
   launches on top of each other and leave dead flats between the rest. */
const CONFIGS: Record<'desktop' | 'compact', VariantConfig> = {
  desktop: {
    viewW: 1200,
    defaultViewH: 420,
    defaultPxScale: 0.9,
    minViewH: 240,
    maxViewH: 780,
    beats: [
      { label: 'Joined', chip: 'Joined M3 USA · 2022', amp: 0.22, priority: 1 },
      { label: 'Homepage', chip: 'Homepage rebuilt in two weeks · 2022', amp: 0.3, priority: 5 },
      { label: 'SmartestDoc v2', chip: 'SmartestDoc v2 · 2023', amp: 0.36, priority: 7 },
      { label: 'Digital Rounds', chip: 'Digital Rounds · 2023', amp: 0.42, priority: 9 },
      { label: 'Upgrades', chip: 'Monorepo upgrades · 2023', amp: 0.46, priority: 12 },
      { label: 'Promoted', chip: 'Promoted to Senior · 2024', amp: 0.52, priority: 8 },
      { label: 'First A/B test', chip: 'First A/B test · 2024', amp: 0.56, priority: 4 },
      { label: 'Campaigns', chip: 'SmartestDoc campaigns · 2025', amp: 0.62, priority: 10 },
      { label: 'Flashpoint', chip: 'Flashpoint · 2025', amp: 0.68, priority: 2 },
      { label: 'Auth funnel', chip: 'Refresh-free auth · 2025', amp: 0.72, priority: 11 },
      { label: 'Medical Matchup', chip: 'Medical Matchup · 2026', amp: 0.82, priority: 3 },
      { label: 'Security', chip: 'Security program · 2026', amp: 0.9, priority: 6 },
      { label: 'Team lead', chip: 'Team lead · 2026', amp: 1, priority: 0 },
    ],
    yearLinesBetween: [
      [1, 2],
      [4, 5],
      [6, 7],
      [9, 10],
    ],
    years: ['2022', '2023', '2024', '2025', '2026'],
    areaOpacity: 0.14,
    drawDur: 1.5,
    tickPx: 12,
  },
  compact: {
    viewW: 720,
    defaultViewH: 560,
    defaultPxScale: 0.49,
    minViewH: 400,
    maxViewH: 860,
    beats: [
      { label: 'Joined', chip: 'Joined M3 USA · 2022', amp: 0.26, priority: 1 },
      { label: 'Homepage', chip: 'Homepage rebuilt in two weeks · 2022', amp: 0.36, priority: 6 },
      { label: 'SmartestDoc v2', chip: 'SmartestDoc v2 · 2023', amp: 0.44, priority: 3 },
      { label: 'First A/B test', chip: 'First A/B test · 2024', amp: 0.54, priority: 5 },
      { label: 'Flashpoint', chip: 'Flashpoint · 2025', amp: 0.66, priority: 2 },
      { label: 'Medical Matchup', chip: 'Medical Matchup · 2026', amp: 0.82, priority: 4 },
      { label: 'Team lead', chip: 'Team lead · 2026', amp: 1, priority: 0 },
    ],
    yearLinesBetween: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ],
    years: ['2022', '2023', '2024', '2025', '2026'],
    areaOpacity: 0.09,
    drawDur: 1.4,
    tickPx: 10,
  },
};

type Ripple = { id: number; x: number; y: number };

const PulseChart = ({ variant, className = '' }: { variant: 'desktop' | 'compact'; className?: string }) => {
  const config = CONFIGS[variant];
  const interactive = variant === 'desktop';

  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dims, setDims] = useState({ viewH: config.defaultViewH, pxScale: config.defaultPxScale });
  const scene = useMemo(() => buildScene(config, dims.viewH, dims.pxScale), [config, dims]);

  /* Match the viewBox aspect to the box the layout hands us, so the scene
     genuinely fills its space instead of letterboxing inside it. */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      if (width < 1 || height < 1) return;
      const nextViewH = clamp(Math.round((config.viewW * height) / width), config.minViewH, config.maxViewH);
      const nextScale = clamp(width / config.viewW, 0.2, 2);
      setDims(current =>
        Math.abs(current.viewH - nextViewH) > 6 || Math.abs(current.pxScale - nextScale) > 0.03
          ? { viewH: nextViewH, pxScale: nextScale }
          : current,
      );
    });
    observer.observe(svg);
    return () => observer.disconnect();
  }, [config]);

  const glowRefs = useRef<(SVGPathElement | null)[]>([]);
  const crosshairRef = useRef<SVGGElement | null>(null);
  const vLineRef = useRef<SVGLineElement | null>(null);
  const snapRef = useRef<SVGGElement | null>(null);
  const chipRef = useRef<SVGGElement | null>(null);
  const chipRectRef = useRef<SVGRectElement | null>(null);
  const chipTextRef = useRef<SVGTextElement | null>(null);
  const frame = useRef(0);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const lastNearest = useRef(-1);
  const motionOk = useRef(true);
  const rippleId = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    if (!interactive) return;
    setEnabled(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    motionOk.current = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return () => cancelAnimationFrame(frame.current);
  }, [interactive]);

  /* A resize moves every beat, so the next move must re-place the readout. */
  useEffect(() => {
    lastNearest.current = -1;
  }, [scene]);

  /* The svg letterboxes inside its CSS box (xMidYMax meet), so pointer math
     must undo that scale and offset before mapping into viewBox units. */
  const toViewBox = (event: ReactPointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const scale = Math.min(rect.width / scene.viewW, rect.height / scene.viewH);
    const offsetX = (rect.width - scene.viewW * scale) / 2;
    const offsetY = rect.height - scene.viewH * scale;
    return {
      x: (event.clientX - rect.left - offsetX) / scale,
      y: (event.clientY - rect.top - offsetY) / scale,
    };
  };

  const nearestBeat = (x: number) => {
    const cx = clamp(x, scene.plotL, scene.plotR);
    let nearest = scene.beats[0];
    let best = Infinity;
    for (const beat of scene.beats) {
      const distance = Math.abs(beat.x - cx);
      if (distance < best) {
        best = distance;
        nearest = beat;
      }
    }
    return nearest;
  };

  const applyFrame = () => {
    const point = pointer.current;
    const crosshair = crosshairRef.current;
    if (!point || !crosshair) return;
    crosshair.style.opacity = '1';

    const beat = nearestBeat(point.x);
    /* Everything snaps to the beat, so only a change of beat costs work. */
    if (beat.i === lastNearest.current) return;
    lastNearest.current = beat.i;

    vLineRef.current?.setAttribute('x1', String(beat.x));
    vLineRef.current?.setAttribute('x2', String(beat.x));
    if (snapRef.current) snapRef.current.style.transform = `translate(${f(beat.x)}px, ${f(beat.apexY)}px)`;

    if (chipRef.current && chipRectRef.current && chipTextRef.current) {
      chipRectRef.current.setAttribute('width', String(beat.chipW));
      chipTextRef.current.setAttribute('x', String(beat.chipW / 2));
      chipTextRef.current.textContent = beat.chip;
      const chipX = beat.x + 18 + beat.chipW > scene.plotR ? beat.x - 18 - beat.chipW : beat.x + 18;
      const chipY = beat.apexY < scene.gridTop + 70 ? beat.apexY + 18 : beat.apexY - 18 - CHIP_H;
      chipRef.current.style.transform = `translate(${f(chipX)}px, ${f(chipY)}px)`;
    }

    glowRefs.current.forEach((glow, i) => {
      if (glow) glow.style.strokeOpacity = i === beat.i ? '0.3' : '0';
    });
  };

  const scheduleFrame = () => {
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      applyFrame();
    });
  };

  const handleMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!enabled) return;
    pointer.current = toViewBox(event);
    scheduleFrame();
  };

  const handleLeave = () => {
    pointer.current = null;
    lastNearest.current = -1;
    if (crosshairRef.current) crosshairRef.current.style.opacity = '0';
    glowRefs.current.forEach(glow => {
      if (glow) glow.style.strokeOpacity = '0';
    });
  };

  /* A click leaves one ring at the nearest beat, the endpoint's own language. */
  const handleDown = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!enabled || !motionOk.current) return;
    const beat = nearestBeat(toViewBox(event).x);
    const id = (rippleId.current += 1);
    setRipples(current => [...current, { id, x: beat.x, y: beat.apexY }]);
    setTimeout(() => setRipples(current => current.filter(ripple => ripple.id !== id)), 1000);
  };

  const gradientId = `sc-line-grad-${variant}`;
  const areaId = `sc-area-grad-${variant}`;
  const drawStyle = {
    '--sc-draw-dur': `${scene.drawDur}s`,
    '--sc-draw-ease': DRAW_EASE_CSS,
    '--sc-head': HEAD_LENGTH,
    ...delay(scene.drawStart),
  } as CSSProperties;
  const firstChipW = scene.beats[0].chipW;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${scene.viewW} ${scene.viewH}`}
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      className={className}
      style={enabled ? { cursor: 'crosshair' } : undefined}
      onPointerMove={interactive ? handleMove : undefined}
      onPointerLeave={interactive ? handleLeave : undefined}
      onPointerDown={interactive ? handleDown : undefined}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: ACCENT }} />
          <stop offset="1" style={{ stopColor: SIGNAL }} />
        </linearGradient>
        <linearGradient id={areaId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: SIGNAL, stopOpacity: scene.areaOpacity }} />
          <stop offset="0.8" style={{ stopColor: SIGNAL, stopOpacity: 0 }} />
        </linearGradient>
      </defs>

      {/* Grid, the bottom rule, faint year hairlines, and the year row. */}
      <g className="sc-fade" style={delay(1.06)}>
        {[0.2, 0.4, 0.6, 0.8, 1].map(k => (
          <line
            key={k}
            x1={scene.plotL}
            y1={f(scene.baseY - scene.ampMax * k)}
            x2={scene.plotR}
            y2={f(scene.baseY - scene.ampMax * k)}
            style={{ stroke: 'rgb(var(--color-grid) / 0.1)' }}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {scene.yearLines.map(x => (
          <line
            key={x}
            x1={f(x)}
            y1={scene.gridTop}
            x2={f(x)}
            y2={scene.axisY}
            style={{ stroke: 'rgb(var(--color-grid) / 0.06)' }}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <line
          x1={scene.plotL}
          y1={scene.axisY}
          x2={scene.plotR}
          y2={scene.axisY}
          style={{ stroke: 'rgb(var(--color-grid) / 0.16)' }}
          vectorEffect="non-scaling-stroke"
        />
        {scene.years.map(span => (
          <text
            key={span.year}
            x={f(span.x)}
            y={scene.yearY}
            textAnchor="middle"
            className="font-mono"
            style={{ fill: MUTED, fillOpacity: 0.45, fontSize: scene.yearFont, letterSpacing: '0.08em' }}
          >
            {span.year}
          </text>
        ))}
      </g>

      {/* Axis words, each landing as the pen crests its beat. */}
      {scene.beats
        .filter(beat => beat.shown)
        .map(beat => (
          <g key={beat.label} className="sc-fade" style={delay(beat.revealAt)}>
            <line
              x1={f(beat.x)}
              y1={scene.axisY}
              x2={f(beat.x)}
              y2={scene.axisY + scene.px(4)}
              style={{ stroke: 'rgb(var(--color-grid) / 0.16)' }}
              vectorEffect="non-scaling-stroke"
            />
            <text
              x={f(beat.labelX)}
              y={scene.labelY}
              textAnchor={beat.anchor}
              className="font-mono"
              style={{ fill: MUTED, fillOpacity: 0.6, fontSize: scene.tickFont }}
            >
              {beat.label}
            </text>
          </g>
        ))}

      {/* Hover glow, one overlay per beat under the trace; opacity is driven imperatively. */}
      {enabled
        ? scene.beats.map(beat => (
            <path
              key={beat.label}
              ref={el => {
                glowRefs.current[beat.i] = el;
              }}
              d={beat.glowPath}
              className="sc-beat pointer-events-none"
              stroke={SIGNAL}
              strokeWidth={7}
              strokeOpacity={0}
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))
        : null}

      {/* Faint fill under the trace, then the trace itself drawn by a lit pen
          that dies where the endpoint is born. The dashed paths must scale with
          the viewBox: Chromium scales a dash pattern by the inverse viewport
          scale under non-scaling-stroke, which hid the tail on wide screens, so
          their stroke width is divided by the measured scale instead. */}
      <path d={scene.areaPath} fill={`url(#${areaId})`} className="sc-fade" style={delay(1.9)} />
      <path
        d={scene.linePath}
        pathLength={1}
        className="sc-draw"
        stroke={`url(#${gradientId})`}
        strokeWidth={2.5 / scene.pxScale}
        strokeLinejoin="round"
        strokeLinecap="round"
        style={drawStyle}
      />
      <path
        d={scene.linePath}
        pathLength={1}
        className="sc-draw-head"
        stroke={SIGNAL}
        strokeWidth={4.5 / scene.pxScale}
        strokeLinejoin="round"
        strokeLinecap="round"
        style={drawStyle}
      />

      {/* Where the trace lands: a live, breathing endpoint, born from the pen.
          The halo runs two animations, so its delay list feeds the pop AND
          keeps the pulse's late start on the shared downbeat. */}
      <circle
        cx={f(scene.endX)}
        cy={f(scene.endY)}
        r={scene.marker.halo}
        className="sc-live"
        style={{ fill: SIGNAL, fillOpacity: 0.22, animationDelay: '2.82s, 3.2s' }}
      />
      <circle
        cx={f(scene.endX)}
        cy={f(scene.endY)}
        r={scene.marker.core}
        className="sc-pop"
        style={{ fill: SIGNAL, ...delay(2.88) }}
      />
      <circle
        cx={f(scene.endX)}
        cy={f(scene.endY)}
        r={scene.marker.ring}
        className="sc-ring"
        style={{ stroke: SIGNAL, ...delay(3.2) }}
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx={f(scene.endX)}
        cy={f(scene.endY)}
        r={scene.marker.ring}
        className="sc-ring"
        style={{ stroke: SIGNAL, ...delay(4.7) }}
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />

      {/* Crosshair readout, snapped to the nearest beat from pointer moves. */}
      {enabled ? (
        <g ref={crosshairRef} className="sc-crosshair pointer-events-none">
          <line
            ref={vLineRef}
            x1={-100}
            y1={scene.gridTop}
            x2={-100}
            y2={scene.axisY}
            style={{ stroke: 'rgb(var(--color-muted) / 0.35)', strokeDasharray: '3 5' }}
            vectorEffect="non-scaling-stroke"
          />
          <g ref={snapRef} className="sc-snap" style={{ transform: 'translate(-100px, -100px)' }}>
            <circle r={8} style={{ fill: ACCENT, fillOpacity: 0.25 }} />
            <circle r={3.5} style={{ fill: ACCENT }} />
          </g>
          <g ref={chipRef} className="sc-chip" style={{ transform: 'translate(-300px, -300px)' }}>
            <rect
              ref={chipRectRef}
              width={firstChipW}
              height={CHIP_H}
              rx={6}
              style={{ fill: 'rgb(var(--color-surface) / 0.92)', stroke: 'rgb(var(--color-line))' }}
              vectorEffect="non-scaling-stroke"
            />
            <text
              ref={chipTextRef}
              x={firstChipW / 2}
              y={CHIP_H / 2 + 4.5}
              textAnchor="middle"
              className="font-mono"
              style={{ fill: 'rgb(var(--color-ink))', fontSize: CHIP_FONT }}
            />
          </g>
        </g>
      ) : null}

      {/* Click ripples: a single ring at the beat, then gone. */}
      {ripples.map(ripple => (
        <g key={ripple.id} transform={`translate(${f(ripple.x)},${f(ripple.y)})`} className="pointer-events-none">
          <circle
            r={scene.marker.ring}
            className="sc-ring-once"
            style={{ stroke: SIGNAL }}
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}
    </svg>
  );
};

export default PulseChart;
