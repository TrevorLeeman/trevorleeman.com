import Image from 'next/image';
import { ArrowUpRight } from 'phosphor-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import Reveal from '../ui/Reveal';
import ButtonLink from '../ui/ButtonLink';
import { Tech } from '../ui/TechBadge';
import TechChips from '../ui/TechChips';
import StatTicker, { Stat } from './StatTicker';
import { OSRS_EXCHANGE_URL } from '../../lib/links';

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
    <Reveal>
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
      <p className="mt-5 text-center font-mono text-xs uppercase tracking-label text-muted sm:text-left">
        <span className="whitespace-nowrap">Founder</span> · <span className="whitespace-nowrap">Product Designer</span>{' '}
        · <span className="whitespace-nowrap">Full-Stack Engineer</span> ·{' '}
        <span className="whitespace-nowrap">DevOps Engineer</span>
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

    <Reveal className="mt-12">
      <h3 className="font-mono text-xs uppercase tracking-label text-muted">Built with</h3>
      <TechChips tech={tech} />
      <ButtonLink href={OSRS_EXCHANGE_URL} className="mt-8">
        Visit osrs.exchange
        <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
      </ButtonLink>
    </Reveal>
  </Section>
);

export default Flagship;
