import Image from 'next/image';
import { ArrowUpRight, BellRinging, Calculator, ChartLineUp, Skull } from 'phosphor-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import Reveal from '../ui/Reveal';
import ButtonLink from '../ui/ButtonLink';
import TechBadge, { Tech } from '../ui/TechBadge';
import StatTicker, { Stat } from './StatTicker';
import { OSRS_EXCHANGE_URL } from '../../lib/links';

/* Each card leads with the engineering capability so readers outside the OSRS
   community get the point. */
const features = [
  {
    icon: ChartLineUp,
    tag: 'Performance',
    title: 'Real-time at scale',
    description:
      'Live prices, margins, and volume for 4,600+ items at once, in a dashboard tuned to stay fast while every row refreshes.',
  },
  {
    icon: BellRinging,
    tag: 'Reliability',
    title: 'Alerts that never miss',
    description:
      'Watched items re-check every six seconds, and alerts land in email and Discord with automatic retries. A fired alert never silently drops.',
  },
  {
    icon: Calculator,
    tag: 'Data pipelines',
    title: 'Numbers that update themselves',
    description:
      'Profit margins recompute from live ingredient costs the moment the market moves, so a number on screen is never stale.',
  },
  {
    icon: Skull,
    tag: 'Architecture',
    title: 'One engine, every tool',
    description:
      'Time-series Postgres storage tracks every tradeable item at five-minute resolution. Every chart, alert, and calculator reads from that same engine, so adding a new tool never means building a new backend.',
  },
];

const stats: Stat[] = [
  { value: '40k+', label: 'Monthly traders' },
  { value: '1.6M+', label: 'Sessions, past year' },
  { value: '4,600+', label: 'Items priced live' },
  { value: '1', label: 'Engineer, end to end' },
];

const tech: Tech[] = [
  { label: 'TypeScript', icon: '/icons/typescript.svg' },
  { label: 'React', icon: '/icons/react.svg' },
  { label: 'Next.js', icon: '/icons/nextjs.svg', invertInDark: true },
  { label: 'Tailwind CSS', icon: '/icons/tailwind.svg' },
  { label: 'Node.js', icon: '/icons/nodejs.svg' },
  { label: 'NestJS', icon: '/icons/nestjs.svg' },
  { label: 'PostgreSQL', icon: '/icons/postgres.svg' },
  { label: 'Prisma', icon: '/icons/prisma.svg', invertInDark: true },
  { label: 'Stripe', icon: '/icons/stripe.svg' },
  { label: 'Docker', icon: '/icons/docker.svg' },
  { label: 'GitHub Actions', icon: '/icons/github-actions.svg' },
  { label: 'AWS SES', icon: '/icons/aws.svg' },
  { label: 'Sentry', icon: '/icons/sentry.svg' },
  { label: 'Jest', icon: '/icons/jest.svg' },
  { label: 'Vitest', icon: '/icons/vitest.svg' },
];

const Flagship = () => (
  <Section id="work" labelledBy="work-title">
    <Reveal className="max-w-3xl">
      <Eyebrow>01 · Flagship</Eyebrow>
      <h2
        id="work-title"
        className="mt-5 flex items-center gap-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
      >
        <Image
          src="/images/osrs-exchange-logo.png"
          alt=""
          width={52}
          height={52}
          unoptimized
          className="h-10 w-10 shrink-0 sm:h-12 sm:w-12"
        />
        OSRS Exchange
      </h2>
      <p className="mt-4 font-display text-xl leading-snug text-ink sm:text-2xl">
        A real-time Grand Exchange trading platform for Old School RuneScape.
      </p>
      <p className="mt-5 font-mono text-xs uppercase tracking-label text-muted">
        Founder · Product Designer · Full-Stack Engineer · DevOps Engineer
      </p>
      <p className="mt-6 max-w-[68ch] text-base leading-relaxed sm:text-lg">
        Players see live prices, alerts, and profit calculators. Underneath is a real business: a NestJS and Postgres
        backend built for time-series price data, paid subscriptions through Stripe, OAuth sign-in, rate limiting, and
        Sentry monitoring on both ends. One person designs, builds, and operates all of it.
      </p>
    </Reveal>

    <Reveal delay={0.05} className="mt-12">
      <StatTicker stats={stats} />
    </Reveal>

    <div className="mt-12 grid gap-4 sm:grid-cols-2">
      {features.map((feature, index) => (
        <Reveal key={feature.title} delay={index * 0.06} className="h-full">
          <div className="h-full rounded-lg border border-line bg-surface/60 p-6 transition duration-300 ease-signal hover:border-accent/60 hover:bg-surface">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2.5 font-mono text-[0.65rem] uppercase tracking-label text-muted">
                <feature.icon size={16} weight="bold" aria-hidden="true" className="shrink-0 text-accent" />
                {feature.tag}
              </span>
              <span aria-hidden="true" className="font-mono text-[0.65rem] text-muted/60">
                0{index + 1}
              </span>
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-ink">{feature.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed">{feature.description}</p>
          </div>
        </Reveal>
      ))}
    </div>

    <Reveal className="mt-12">
      <h3 className="font-mono text-xs uppercase tracking-label text-muted">Built with</h3>
      <ul className="mt-4 flex list-none flex-wrap gap-2">
        {tech.map(item => (
          <TechBadge key={item.label} label={item.label} icon={item.icon} invertInDark={item.invertInDark} />
        ))}
      </ul>
      <ButtonLink href={OSRS_EXCHANGE_URL} className="mt-8">
        Visit osrs.exchange
        <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
      </ButtonLink>
    </Reveal>
  </Section>
);

export default Flagship;
