import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';

/**
 * Decorative market scene for the hero, hand-built in SVG. All ambient motion
 * lives in the sc-* classes in globals.css; the series are fixed constants so
 * server and client render identical markup. Two scenes share the code: a wide
 * 28-candle desktop cut and a taller 14-candle compact cut for phones, each
 * rendered by its own instance and swapped with CSS. Axis labels follow the
 * osrs.exchange convention: dual y rails with mirrored tick values and rotated
 * captions, sized from the measured viewport scale so they render at a constant
 * on-screen size at any width. On fine pointers the desktop instance adds a
 * crosshair readout, magnetic candles, and a click burst, updated imperatively
 * (refs + rAF) so mousemove never re-renders. Purely visual, so callers hide
 * it from assistive tech.
 */

type Point = { x: number; y: number };

/** Catmull-Rom spline through every point, so the line reads organic, not robotic. */
const smoothPath = (points: Point[]) => {
  const n = points.length;
  let d = `M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
  for (let i = 0; i < n - 1; i += 1) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(n - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
};

type XLabel = { i: number; text: string; anchor: 'start' | 'middle' | 'end' };

type VariantConfig = {
  viewW: number;
  /** Server-rendered guesses; replaced post-mount by the measured box. */
  defaultViewH: number;
  defaultPxScale: number;
  minViewH: number;
  maxViewH: number;
  closes: number[];
  firstOpen: number;
  bodyW: number;
  volScale: number;
  prevHigh: number;
  maWindow: number;
  areaOpacity: number;
  verticalGridAt: number[];
  /** Per-index stagger for the volume and candle waves; they share it. */
  step: number;
  /** Seconds the price line spends drawing; both scenes land on DRAW_LANDS. */
  drawDur: number;
  /** On-screen pixel size for tick labels; 0 disables that label tier. */
  tickPx: number;
  captionPx: number;
  xLabels: XLabel[];
};

/** The beat the price line lands on; the endpoint blooms 120ms later. */
const DRAW_LANDS = 2.7;

/* The vertical geometry derives from viewH and the label gutters derive from
   the measured px scale, so the scene always spends exactly the box it gets
   and its labels hold a constant on-screen size at any viewport. */
const buildScene = (config: VariantConfig, viewH: number, pxScale: number) => {
  /* Every geometric constant below is an ON-SCREEN pixel intent, converted
     into viewBox units at the measured scale. Raw viewBox constants render at
     half size on a phone, where pxScale is ~0.49 against desktop's ~0.91. */
  const px = (screenPx: number) => Math.round(screenPx / pxScale);

  const tickFont = Math.round(config.tickPx / pxScale);
  const captionFont = config.captionPx ? Math.round(config.captionPx / pxScale) : 0;
  const captionGutter = captionFont ? Math.round(captionFont * 1.8) : 0;
  const plotL = captionGutter + Math.round(tickFont * 3.7);
  const plotR = config.viewW - plotL;
  const x0 = plotL + Math.round(config.bodyW * 0.9) + 6;
  const pitch = (plotR - 10 - config.bodyW / 2 - x0) / (config.closes.length - 1);

  const xAxisGutter = Math.round(tickFont * 1.9);
  const volBase = viewH - xAxisGutter - 6;
  const priceZero = volBase - px(46);
  const priceScale = (priceZero - px(42)) / 100;
  const gridTop = px(24);
  const marker = { halo: px(10), core: px(4.5), ring: px(6.5) };
  const x = (i: number) => x0 + i * pitch;
  const priceY = (p: number) => priceZero - p * priceScale;

  const candles = config.closes.map((close, i) => {
    const open = i === 0 ? config.firstOpen : config.closes[i - 1];
    // Deterministic jitter; anything random would break SSR. Volume tracks the
    // size of the move, so the breakout leg trades heavy like a real rally.
    const high = Math.max(open, close) + 1.8 + ((i * 7) % 5) * 0.7;
    const low = Math.min(open, close) - 1.8 - ((i * 11) % 5) * 0.7;
    const volume = 9 + ((i * 13) % 8) + Math.round(Math.abs(close - open) * 1.4);
    return { i, cx: x(i), open, close, high, low, up: close >= open, volume };
  });

  const linePoints = config.closes.map((close, i) => ({ x: x(i), y: priceY(close) }));
  const pricePath = smoothPath(linePoints);
  const areaBase = priceY(0);
  const areaPath = `${pricePath} L${x(config.closes.length - 1).toFixed(1)},${areaBase} L${x(0).toFixed(1)},${areaBase} Z`;

  const maPoints: Point[] = [];
  for (let i = config.maWindow - 1; i < config.closes.length; i += 1) {
    let sum = 0;
    for (let k = 0; k < config.maWindow; k += 1) sum += config.closes[i - k];
    maPoints.push({ x: x(i), y: priceY(sum / config.maWindow) });
  }
  const maPath = smoothPath(maPoints);

  const lastIndex = config.closes.length - 1;
  return {
    ...config,
    viewH,
    px,
    marker,
    tickFont,
    captionFont,
    plotL,
    plotR,
    x0,
    pitch,
    volBase,
    priceZero,
    priceScale,
    gridTop,
    x,
    priceY,
    candles,
    pricePath,
    areaPath,
    maPath,
    lastIndex,
    endX: x(lastIndex),
    endY: priceY(config.closes[lastIndex]),
  };
};

/* Both series follow a compounding curve: half the chart is patient sideways
   grind, then the gains stack. The story is exponential, not linear. */
const CONFIGS: Record<'desktop' | 'compact', VariantConfig> = {
  desktop: {
    viewW: 1200,
    defaultViewH: 420,
    defaultPxScale: 0.9,
    minViewH: 280,
    maxViewH: 780,
    closes: [15, 16, 15, 17, 18, 17, 19, 21, 20, 23, 25, 24, 27, 30, 28, 32, 36, 34, 39, 44, 41, 47, 53, 50, 59, 68, 79, 92],
    firstOpen: 14,
    bodyW: 16,
    volScale: 1.0,
    prevHigh: 53,
    maWindow: 5,
    areaOpacity: 0.14,
    verticalGridAt: [7, 14, 21],
    step: 0.028,
    drawDur: 1.35,
    tickPx: 12,
    captionPx: 11,
    xLabels: [
      { i: 0, text: 'day one', anchor: 'start' },
      { i: 7, text: 'the grind', anchor: 'middle' },
      { i: 14, text: 'compounding', anchor: 'middle' },
      { i: 21, text: 'breakout', anchor: 'middle' },
      { i: 27, text: 'now', anchor: 'end' },
    ],
  },
  compact: {
    viewW: 720,
    defaultViewH: 560,
    defaultPxScale: 0.49,
    minViewH: 400,
    maxViewH: 860,
    closes: [15, 17, 16, 20, 24, 22, 28, 34, 31, 41, 51, 47, 68, 92],
    firstOpen: 14,
    bodyW: 26,
    volScale: 1.0,
    prevHigh: 51,
    maWindow: 3,
    areaOpacity: 0.09,
    verticalGridAt: [4, 9],
    step: 0.055,
    drawDur: 1.25,
    tickPx: 10,
    captionPx: 0,
    xLabels: [
      { i: 0, text: 'day one', anchor: 'start' },
      { i: 6, text: 'the grind', anchor: 'middle' },
      { i: 13, text: 'now', anchor: 'end' },
    ],
  },
};

const CHIP_W = 148;
const CHIP_H = 30;

const clamp = (value: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, value));

const SIGNAL = 'rgb(var(--color-signal))';
const LOSS = 'rgb(var(--color-loss))';
const ACCENT = 'rgb(var(--color-accent))';
const MUTED = 'rgb(var(--color-muted))';

const delay = (seconds: number) => ({ animationDelay: `${seconds.toFixed(2)}s` });

/* Scatter pattern for the click burst; fixed so every "order" feels crafted. */
const BURST_TICKS = [
  { dx: -34, dy: -50, wait: 0 },
  { dx: -16, dy: -68, wait: 0.05 },
  { dx: 0, dy: -56, wait: 0.02 },
  { dx: 14, dy: -74, wait: 0.07 },
  { dx: 30, dy: -52, wait: 0.03 },
  { dx: 46, dy: -64, wait: 0.09 },
];

type Burst = { id: number; x: number; y: number };

const SignalChart = ({ variant, className = '' }: { variant: 'desktop' | 'compact'; className?: string }) => {
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

  const magnetRefs = useRef<(SVGGElement | null)[]>([]);
  const crosshairRef = useRef<SVGGElement | null>(null);
  const vLineRef = useRef<SVGLineElement | null>(null);
  const hLineRef = useRef<SVGLineElement | null>(null);
  const snapRef = useRef<SVGGElement | null>(null);
  const chipRef = useRef<SVGGElement | null>(null);
  const chipTextRef = useRef<SVGTextElement | null>(null);
  const frame = useRef(0);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const motionOk = useRef(true);
  const burstId = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    if (!interactive) return;
    setEnabled(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    motionOk.current = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return () => cancelAnimationFrame(frame.current);
  }, [interactive]);

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

  const zoneFor = (price: number) => {
    if (price > scene.prevHigh) return 'breakout';
    if (price < 32) return 'the dip';
    return 'momentum';
  };

  const applyFrame = () => {
    const point = pointer.current;
    const crosshair = crosshairRef.current;
    if (!point || !crosshair) return;

    const cx = clamp(point.x, scene.plotL, scene.plotR);
    const cy = clamp(point.y, scene.gridTop + 20, scene.volBase);
    const price = clamp((scene.priceZero - cy) / scene.priceScale, 0, 104);

    crosshair.style.opacity = '1';
    vLineRef.current?.setAttribute('x1', String(cx));
    vLineRef.current?.setAttribute('x2', String(cx));
    hLineRef.current?.setAttribute('y1', String(cy));
    hLineRef.current?.setAttribute('y2', String(cy));

    const nearest = clamp(Math.round((cx - scene.x0) / scene.pitch), 0, scene.lastIndex);
    if (snapRef.current) {
      snapRef.current.style.transform = `translate(${scene.x(nearest).toFixed(1)}px, ${scene.priceY(scene.closes[nearest]).toFixed(1)}px)`;
    }

    if (chipRef.current && chipTextRef.current) {
      chipTextRef.current.textContent = `+${Math.round(price)}% · ${zoneFor(price)}`;
      const chipX = cx > scene.viewW - 280 ? cx - 18 - CHIP_W : cx + 18;
      const chipY = cy < scene.gridTop + 70 ? cy + 18 : cy - 18 - CHIP_H;
      chipRef.current.style.transform = `translate(${chipX}px, ${chipY}px)`;
    }

    if (motionOk.current) {
      for (let i = 0; i <= scene.lastIndex; i += 1) {
        const target = magnetRefs.current[i];
        if (!target) continue;
        const distance = Math.abs(scene.x(i) - cx);
        const surge = 1 + 0.32 * Math.exp(-(distance * distance) / 14450);
        target.style.transform = surge > 1.005 ? `scaleY(${surge.toFixed(3)})` : '';
      }
    }
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
    if (crosshairRef.current) crosshairRef.current.style.opacity = '0';
    magnetRefs.current.forEach(target => {
      if (target) target.style.transform = '';
    });
  };

  const handleDown = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!enabled || !motionOk.current) return;
    const point = toViewBox(event);
    const id = (burstId.current += 1);
    setBursts(current => [
      ...current,
      { id, x: clamp(point.x, scene.plotL + 20, scene.plotR - 60), y: clamp(point.y, scene.gridTop + 50, scene.volBase - 30) },
    ]);
    setTimeout(() => setBursts(current => current.filter(burst => burst.id !== id)), 1100);
  };

  const gradientId = `sc-line-grad-${variant}`;
  const areaId = `sc-area-grad-${variant}`;
  const midY = (scene.gridTop + scene.volBase) / 2;

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

      {/* Grid and axes: gains on dual y rails, the story along the x axis. */}
      <g className="sc-fade" style={delay(1.06)}>
        {[20, 40, 60, 80, 100].map(price => (
          <g key={price}>
            <line
              x1={scene.plotL}
              y1={scene.priceY(price)}
              x2={scene.plotR}
              y2={scene.priceY(price)}
              style={{ stroke: 'rgb(var(--color-grid) / 0.1)' }}
              vectorEffect="non-scaling-stroke"
            />
            {/* The +100% labels stay silent; the live tick owns the top of the
                rails once the line lands. */}
            {price < 100 ? (
              <>
                <text
                  x={scene.plotL - 10}
                  y={scene.priceY(price) + scene.tickFont * 0.34}
                  textAnchor="end"
                  className="font-mono"
                  style={{ fill: MUTED, fillOpacity: 0.65, fontSize: scene.tickFont }}
                >
                  +{price}%
                </text>
                <text
                  x={scene.plotR + 10}
                  y={scene.priceY(price) + scene.tickFont * 0.34}
                  textAnchor="start"
                  className="font-mono"
                  style={{ fill: MUTED, fillOpacity: 0.65, fontSize: scene.tickFont }}
                >
                  +{price}%
                </text>
              </>
            ) : null}
          </g>
        ))}
        {scene.captionFont ? (
          <>
            <text
              transform={`rotate(-90 ${Math.round(scene.captionFont * 0.9)} ${midY})`}
              x={Math.round(scene.captionFont * 0.9)}
              y={midY}
              textAnchor="middle"
              className="font-mono uppercase"
              style={{ fill: MUTED, fillOpacity: 0.5, fontSize: scene.captionFont, letterSpacing: '0.18em' }}
            >
              gains (%)
            </text>
            <text
              transform={`rotate(90 ${scene.viewW - Math.round(scene.captionFont * 0.9)} ${midY})`}
              x={scene.viewW - Math.round(scene.captionFont * 0.9)}
              y={midY}
              textAnchor="middle"
              className="font-mono uppercase"
              style={{ fill: MUTED, fillOpacity: 0.5, fontSize: scene.captionFont, letterSpacing: '0.18em' }}
            >
              gains (%)
            </text>
          </>
        ) : null}
        {scene.verticalGridAt.map(i => (
          <line
            key={i}
            x1={scene.x(i)}
            y1={scene.gridTop}
            x2={scene.x(i)}
            y2={scene.volBase}
            style={{ stroke: 'rgb(var(--color-grid) / 0.06)' }}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <line
          x1={scene.plotL}
          y1={scene.volBase}
          x2={scene.plotR}
          y2={scene.volBase}
          style={{ stroke: 'rgb(var(--color-grid) / 0.16)' }}
          vectorEffect="non-scaling-stroke"
        />
        {scene.xLabels.map(label => (
          <text
            key={label.text}
            x={label.anchor === 'start' ? scene.x(label.i) - scene.bodyW / 2 : label.anchor === 'end' ? scene.x(label.i) + scene.bodyW / 2 : scene.x(label.i)}
            y={scene.viewH - Math.round(scene.tickFont * 0.5)}
            textAnchor={label.anchor}
            className="font-mono"
            style={{ fill: MUTED, fillOpacity: 0.6, fontSize: scene.tickFont }}
          >
            {label.text}
          </text>
        ))}
      </g>

      {/* Volume, quiet under the price action, heavy where the moves are big. */}
      <g>
        {scene.candles.map(candle => (
          <rect
            key={candle.i}
            className="sc-rise"
            style={{ fill: candle.up ? SIGNAL : LOSS, fillOpacity: 0.25, ...delay(1.12 + candle.i * scene.step) }}
            x={candle.cx - scene.bodyW / 2}
            y={scene.volBase - candle.volume * scene.volScale}
            width={scene.bodyW}
            height={candle.volume * scene.volScale}
            rx={2}
          />
        ))}
      </g>

      {/* The prior high the rally breaks through. */}
      <g className="sc-fade" style={delay(1.55)}>
        <line
          x1={scene.plotL}
          y1={scene.priceY(scene.prevHigh)}
          x2={scene.plotR}
          y2={scene.priceY(scene.prevHigh)}
          style={{ stroke: 'rgb(var(--color-muted) / 0.4)', strokeDasharray: '2 7' }}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <text
          x={scene.plotL + 6}
          y={scene.priceY(scene.prevHigh) - 8}
          className="font-mono uppercase"
          style={{
            fill: MUTED,
            fillOpacity: 0.6,
            fontSize: Math.max(scene.px(10), Math.round(scene.tickFont * 0.85)),
            letterSpacing: '0.18em',
          }}
        >
          prev high
        </text>
      </g>

      {/* Candles. The inner group is the magnet target so the entrance
          animation's fill-forwards transform never fights the hover surge. */}
      <g>
        {scene.candles.map(candle => {
          const color = candle.up ? SIGNAL : LOSS;
          const bodyTop = scene.priceY(Math.max(candle.open, candle.close));
          const bodyHeight = Math.max(4, Math.abs(scene.priceY(candle.open) - scene.priceY(candle.close)));
          const entrance = 1.22 + candle.i * scene.step;
          const isLive = candle.i === scene.lastIndex;
          return (
            <g
              key={candle.i}
              className={isLive ? 'sc-rise sc-live' : 'sc-rise'}
              /* The live candle runs two animations; the delay list must feed
                 the entrance AND keep the pulse's late start. */
              style={{ animationDelay: isLive ? `${entrance.toFixed(2)}s, 3.2s` : `${entrance.toFixed(2)}s` }}
            >
              <g
                ref={el => {
                  magnetRefs.current[candle.i] = el;
                }}
                className="sc-magnet"
              >
                <line
                  x1={candle.cx}
                  y1={scene.priceY(candle.high)}
                  x2={candle.cx}
                  y2={scene.priceY(candle.low)}
                  style={{ stroke: color, strokeOpacity: 0.7 }}
                  vectorEffect="non-scaling-stroke"
                />
                <rect
                  x={candle.cx - scene.bodyW / 2}
                  y={bodyTop}
                  width={scene.bodyW}
                  height={bodyHeight}
                  rx={2}
                  style={{ fill: color }}
                />
              </g>
            </g>
          );
        })}
      </g>

      {/* Close-price area and line, drawing up and to the right. The lit head
          rides the pen and dies where the endpoint is born. */}
      <path d={scene.areaPath} fill={`url(#${areaId})`} className="sc-fade" style={delay(1.9)} />
      <path
        d={scene.maPath}
        className="sc-fade"
        style={{ stroke: 'rgb(var(--color-accent) / 0.5)', strokeDasharray: '6 9', ...delay(1.62) }}
        strokeWidth={1.75}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={scene.pricePath}
        pathLength={1}
        className="sc-draw"
        stroke={`url(#${gradientId})`}
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={{ '--sc-draw-dur': `${scene.drawDur}s`, ...delay(DRAW_LANDS - scene.drawDur) } as CSSProperties}
      />
      <path
        d={scene.pricePath}
        pathLength={1}
        className="sc-draw-head"
        stroke={SIGNAL}
        strokeWidth={4.5}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={{ '--sc-draw-dur': `${scene.drawDur}s`, ...delay(DRAW_LANDS - scene.drawDur) } as CSSProperties}
      />

      {/* The last price snaps back to the axis and prints in signal. */}
      <line
        x1={scene.endX}
        y1={scene.endY}
        x2={scene.plotL}
        y2={scene.endY}
        pathLength={1}
        className="sc-draw"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        style={{ '--sc-draw-dur': '0.35s', stroke: SIGNAL, strokeOpacity: 0.4, ...delay(2.85) } as CSSProperties}
      />
      <text
        x={scene.plotL - 10}
        y={scene.endY + scene.tickFont * 0.34}
        textAnchor="end"
        className="sc-fade font-mono"
        style={{ fill: SIGNAL, fontSize: scene.tickFont, animationDuration: '0.5s', ...delay(3.2) }}
      >
        +{scene.closes[scene.lastIndex]}%
      </text>

      {/* Where the line lands: a live, breathing endpoint, born from the pen. */}
      <circle
        cx={scene.endX}
        cy={scene.endY}
        r={scene.marker.halo}
        className="sc-pop"
        style={{ fill: SIGNAL, fillOpacity: 0.22, ...delay(2.82) }}
      />
      <circle
        cx={scene.endX}
        cy={scene.endY}
        r={scene.marker.core}
        className="sc-pop"
        style={{ fill: SIGNAL, ...delay(2.88) }}
      />
      <circle
        cx={scene.endX}
        cy={scene.endY}
        r={scene.marker.ring}
        className="sc-ring"
        style={{ stroke: SIGNAL, ...delay(3.2) }}
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx={scene.endX}
        cy={scene.endY}
        r={scene.marker.ring}
        className="sc-ring"
        style={{ stroke: SIGNAL, ...delay(4.7) }}
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />

      {/* Crosshair readout, positioned imperatively from pointer moves. */}
      {enabled ? (
        <g ref={crosshairRef} className="sc-crosshair pointer-events-none">
          <line
            ref={vLineRef}
            x1={-100}
            y1={scene.gridTop}
            x2={-100}
            y2={scene.volBase}
            style={{ stroke: 'rgb(var(--color-muted) / 0.35)', strokeDasharray: '3 5' }}
            vectorEffect="non-scaling-stroke"
          />
          <line
            ref={hLineRef}
            x1={scene.plotL}
            y1={-100}
            x2={scene.plotR}
            y2={-100}
            style={{ stroke: 'rgb(var(--color-muted) / 0.35)', strokeDasharray: '3 5' }}
            vectorEffect="non-scaling-stroke"
          />
          <g ref={snapRef} className="sc-snap" style={{ transform: 'translate(-100px, -100px)' }}>
            <circle r={8} style={{ fill: ACCENT, fillOpacity: 0.25 }} />
            <circle r={3.5} style={{ fill: ACCENT }} />
          </g>
          <g ref={chipRef} className="sc-chip" style={{ transform: 'translate(-200px, -200px)' }}>
            <rect
              width={CHIP_W}
              height={CHIP_H}
              rx={6}
              style={{ fill: 'rgb(var(--color-surface) / 0.92)', stroke: 'rgb(var(--color-line))' }}
              vectorEffect="non-scaling-stroke"
            />
            <text
              ref={chipTextRef}
              x={CHIP_W / 2}
              y={CHIP_H / 2 + 4.5}
              textAnchor="middle"
              className="font-mono"
              style={{ fill: 'rgb(var(--color-ink))', fontSize: 13 }}
            />
          </g>
        </g>
      ) : null}

      {/* Click bursts: a buy order's worth of up-ticks and a shockwave. */}
      {bursts.map(burst => (
        <g key={burst.id} transform={`translate(${burst.x},${burst.y})`} className="pointer-events-none">
          <circle r={scene.px(9)} className="sc-ring-once" style={{ stroke: SIGNAL }} strokeWidth={1.5} />
          {BURST_TICKS.map((tick, i) => (
            <path
              key={i}
              d="M0,-6 L5,3 L-5,3 Z"
              className="sc-burst-tick"
              style={
                {
                  fill: SIGNAL,
                  '--dx': `${tick.dx}px`,
                  '--dy': `${tick.dy}px`,
                  ...delay(tick.wait),
                } as CSSProperties
              }
            />
          ))}
        </g>
      ))}
    </svg>
  );
};

export default SignalChart;
