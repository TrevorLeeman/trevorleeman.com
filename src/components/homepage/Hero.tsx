import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'phosphor-react';
import Eyebrow from '../ui/Eyebrow';
import ButtonLink from '../ui/ButtonLink';
import PulseChart from './PulseChart';
import Socials from './Socials';
import { LINKEDIN_URL } from '../../lib/links';

/**
 * The copy enters on five named tiers (rise-* in globals.css) that ramp from
 * 0.06s to 0.46s, rest for 100ms, and hand off to the pulse scene's own build.
 * The scene is lit by three fixed sources: a key light on the type, a rim light
 * where the trace lands, and a floor that dissolves the fold into the canvas.
 */
const Hero = () => (
  <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
    <div aria-hidden="true" className="chart-grid pointer-events-none absolute inset-0" />
    {/* Key light on the type. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-40 -top-56 h-[42rem] w-[52rem] rounded-full bg-accent/[0.09] blur-3xl dark:bg-accent/[0.14]"
    />
    {/* Rim light where the trace lands, so the scene reads as emitting it. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[4%] top-[42%] hidden h-[26rem] w-[34rem] rounded-full bg-signal/[0.07] blur-3xl dark:bg-signal/[0.13] sm:block"
    />
    {/* Floor: the background dissolves into the canvas instead of being cut by the fold. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-canvas via-canvas/70 to-transparent"
    />

    <div className="container-page relative flex min-h-[calc(100svh-4rem)] flex-col pt-8 sm:pt-10 2xl:pt-14">
      <div className="rise-eyebrow">
        <Eyebrow>
          <span className="hidden xs:inline">Seattle, WA · </span>Senior Software Engineer
          <span className="hidden sm:inline">, Team Lead</span>
        </Eyebrow>
      </div>

      <h1
        id="hero-title"
        className="rise-name mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:mt-5 sm:text-6xl lg:text-7xl 2xl:text-8xl"
      >
        Trevor Leeman
      </h1>

      <p className="rise-line mt-4 max-w-4xl font-display text-xl font-medium leading-snug text-ink [text-wrap:balance] sm:mt-5 sm:text-3xl 2xl:mt-6 2xl:text-4xl">
        I build products for physicians, end to end.
      </p>

      <p className="rise-body mt-3 max-w-[58ch] text-base leading-relaxed [text-wrap:balance] sm:mt-4 sm:text-lg 2xl:mt-5 2xl:text-xl">
        At M3 USA I take MDLinx products from spec to production: a medical puzzle game, sponsored campaigns,
        experiments, and the ad platform.
      </p>

      <div className="rise-frame mt-5 flex flex-wrap items-center gap-3 sm:mt-6">
        <ButtonLink href="/#work">
          See the work
          <ArrowDown size={14} weight="bold" aria-hidden="true" />
        </ButtonLink>
        <ButtonLink href={LINKEDIN_URL} variant="secondary" className="hidden sm:inline-flex">
          Connect on LinkedIn
          <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
        </ButtonLink>
        <div className="ml-1">
          <Socials />
        </div>
      </div>

      <div aria-hidden="true" className="relative mt-4 sm:mt-5">
        <div className="rise-frame mb-1 flex items-center gap-3 font-mono text-xs text-muted sm:mb-1.5">
          <span className="flex items-center gap-2">
            <span className="sc-heartbeat h-1.5 w-1.5 rounded-full bg-signal" />
            pulse
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-line/70" />
          <span className="hidden sm:block">four years, thirteen beats</span>
        </div>
        {/* Pinned right under the caption at a set height; the fold's leftover
            space below belongs to the scroll cue. The svg fills this box
            absolutely and derives its viewBox from the box aspect. */}
        <div className="relative h-[clamp(230px,33svh,340px)] sm:h-[clamp(220px,31svh,540px)] 2xl:h-[clamp(300px,calc(100svh-680px),720px)]">
          <PulseChart variant="desktop" className="absolute inset-0 hidden h-full w-full sm:block" />
          <PulseChart variant="compact" className="absolute inset-0 h-full w-full sm:hidden" />
        </div>
      </div>

      {/* The remaining fold is the cue's room; it centers itself in it, and the
          bottom padding floors it off the viewport edge on short folds. */}
      <div className="rise-frame flex min-h-[3.5rem] flex-1 items-center justify-center pb-4">
        <Link href="/#work" aria-label="Scroll to selected work" className="group flex flex-col items-center gap-1.5">
          <span className="font-mono text-[0.65rem] uppercase tracking-label text-muted/70 transition-colors group-hover:text-ink">
            scroll
          </span>
          <span
            aria-hidden="true"
            className="relative flex h-7 w-4 items-start justify-center transition-[height] duration-300 ease-signal group-hover:h-9"
          >
            <span className="h-full w-px bg-gradient-to-b from-line via-line to-transparent" />
            <span className="sc-scroll-dot absolute top-0 h-1.5 w-1.5 rounded-full bg-signal" />
          </span>
        </Link>
      </div>
    </div>
  </section>
);

export default Hero;
