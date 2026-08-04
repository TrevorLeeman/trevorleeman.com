import { ArrowUpRight, BellRinging, Calculator, ChartLineUp, Skull } from 'phosphor-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import Reveal from '../ui/Reveal';
import ButtonLink from '../ui/ButtonLink';
import TechBadge, { Tech } from '../ui/TechBadge';
import StatTicker, { Stat } from './StatTicker';
import { OSRS_EXCHANGE_URL } from '../../lib/links';

const features = [
  {
    icon: ChartLineUp,
    title: 'GE Tracker',
    description: 'Live prices, margins, and volume for 4,600+ items, in a dashboard built to stay fast while all of it refreshes.',
  },
  {
    icon: BellRinging,
    title: 'Price Alerts',
    description:
      'Watched items re-check every six seconds; alerts land in email and Discord, with automatic retries.',
  },
  {
    icon: Calculator,
    title: 'Recipe Profit',
    description: 'Crafting margins recomputed from live ingredient prices, so the numbers never go stale.',
  },
  {
    icon: Skull,
    title: 'Death’s Coffer',
    description: 'A value calculator built on the same live price data. New tools ship with no new plumbing.',
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
  { label: 'NestJS', icon: '/icons/nestjs.svg' },
  { label: 'Prisma', icon: '/icons/prisma.svg', invertInDark: true },
  { label: 'PostgreSQL', icon: '/icons/postgres.svg' },
  { label: 'Tailwind CSS', icon: '/icons/tailwind.svg' },
  { label: 'Docker', icon: '/icons/docker.svg' },
  { label: 'Vercel', icon: '/icons/vercel.svg', invertInDark: true },
];

const Flagship = () => (
  <Section id="work" labelledBy="work-title">
    <Reveal className="max-w-3xl">
      <Eyebrow>01 · Flagship</Eyebrow>
      <h2 id="work-title" className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        OSRS Exchange
      </h2>
      <p className="mt-4 font-display text-xl leading-snug text-ink sm:text-2xl">
        A real-time Grand Exchange trading platform for Old School RuneScape.
      </p>
      <p className="mt-5 font-mono text-xs uppercase tracking-label text-muted">
        Founder · Design · Engineering · Infrastructure
      </p>
      <p className="mt-6 max-w-[68ch] text-base leading-relaxed sm:text-lg">
        Players see flips, alerts, and profit calculators. Underneath is the engineering: a NestJS and Postgres backend
        built for time-series price data, cron pipelines that snapshot prices and recompute trends every five minutes,
        Stripe subscriptions, OAuth, rate limiting, and Sentry on both ends. One person designs, builds, and operates
        all of it.
      </p>
    </Reveal>

    <Reveal delay={0.05} className="mt-12">
      <StatTicker stats={stats} />
    </Reveal>

    <div className="mt-12 grid gap-x-10 sm:grid-cols-2">
      {features.map((feature, index) => (
        <Reveal key={feature.title} delay={index * 0.06} className="h-full">
          <div className="h-full border-t border-line py-6">
            <div className="flex items-center gap-3">
              <feature.icon size={20} weight="bold" aria-hidden="true" className="shrink-0 text-accent" />
              <h3 className="font-display text-lg font-semibold text-ink">{feature.title}</h3>
            </div>
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
