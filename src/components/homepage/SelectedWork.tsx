import { Flask, Lightning, Megaphone, PuzzlePiece, ShieldCheck } from 'phosphor-react';
import type { Icon } from 'phosphor-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import Reveal from '../ui/Reveal';
import { Tech } from '../ui/TechBadge';
import TechChips from '../ui/TechChips';
import StatTicker, { Stat } from './StatTicker';

type Initiative = {
  period: string;
  title: string;
  icon: Icon;
  impact: string;
  stack: string[];
};

const stats: Stat[] = [
  { value: '7', label: 'Initiatives, end to end' },
  { value: '90%', label: 'Fewer security findings' },
  { value: '2x', label: 'Faster AI generation' },
  { value: 'Hundreds', label: 'Players in week one' },
];

const initiatives: Initiative[] = [
  {
    period: '2026',
    title: 'Medical Matchup',
    icon: PuzzlePiece,
    impact:
      'A Connections-style medical puzzle game, built end to end and in production within a month. Hundreds of players in the first week. Puzzles now come from an AI generation pipeline with editorial review, so the game runs without an engineer, and two new ad units monetize it.',
    stack: ['Next.js', 'TypeScript', 'GraphQL', 'Contentful', 'Segment', 'Google Ad Manager'],
  },
  {
    period: '2026 · ongoing',
    title: 'Security remediation program',
    icon: ShieldCheck,
    impact:
      'Turned vulnerability cleanup into an operating program: swept every repo against a large npm supply-chain attack list, drove scanner adoption, and ran an upgrade loop that cut open findings by roughly 90%. A CLI I built enforces one PR per fix, with generated validation evidence, smoke-test reports, and a risk score on every PR.',
    stack: ['Node.js', 'npm', 'Docker', 'GitHub Actions', 'GCP'],
  },
  {
    period: '2025',
    title: 'Flashpoint',
    icon: Lightning,
    impact:
      'MDLinx’s flagship short-form content product. I owned the whole build: four content types, deep linking, video hero banners, preview mode, and the analytics layer across Segment, Hotjar, and Snowflake, through two rounds of UAT with editorial, marketing, data, and client services. Demoed at company Demo Day.',
    stack: ['Next.js', 'GraphQL', 'Contentful', 'Segment', 'Hotjar', 'Snowflake'],
  },
  {
    period: '2024 · 2025',
    title: 'SmartestDoc sponsored campaigns',
    icon: Megaphone,
    impact:
      'Built the sponsored-campaign product end to end: content models, campaign-scoped queries, date-windowed visibility, theming, campaign stats pages, ad configuration, and an Iterable integration into the data platform. The first campaign met its contracted delivery targets.',
    stack: ['Next.js', 'GraphQL', 'Contentful', 'Iterable', 'AWS Lambda', 'Google Ad Manager'],
  },
  {
    period: '2024 · ongoing',
    title: 'Experimentation platform',
    icon: Flask,
    impact:
      'Took MDLinx from no A/B testing to product-run experimentation. Evaluated GrowthBook against a static-generation architecture in a written trade-off analysis, built the reusable integration, shipped the site’s first experiment, then added deploy hooks and conversion metrics until product could launch tests without engineering.',
    stack: ['GrowthBook', 'Next.js', 'Google Tag Manager', 'Segment', 'Snowflake'],
  },
];

const tech: Tech[] = [
  { label: 'TypeScript', icon: '/icons/typescript.svg' },
  { label: 'React', icon: '/icons/react.svg' },
  { label: 'Next.js', icon: '/icons/nextjs.svg', invertInDark: true },
  { label: 'Node.js', icon: '/icons/nodejs.svg' },
  { label: 'GraphQL' },
  { label: 'Django' },
  { label: 'PostgreSQL', icon: '/icons/postgres.svg' },
  { label: 'Contentful' },
  { label: 'Tailwind CSS', icon: '/icons/tailwind.svg' },
  { label: 'Docker', icon: '/icons/docker.svg' },
  { label: 'Kubernetes' },
  { label: 'Terraform' },
  { label: 'GitHub Actions', icon: '/icons/github-actions.svg' },
  { label: 'GCP' },
  { label: 'AWS', icon: '/icons/aws.svg' },
  { label: 'Google Ad Manager' },
  { label: 'Jest', icon: '/icons/jest.svg' },
  { label: 'Vitest', icon: '/icons/vitest.svg' },
];

const SelectedWork = () => (
  <Section id="work" labelledBy="work-title">
    <Reveal>
      <Eyebrow>01 · Selected work</Eyebrow>
      <h2 id="work-title" className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Recent work at MDLinx.
      </h2>
      <p className="mt-6 max-w-[68ch] text-base leading-relaxed sm:text-lg">
        MDLinx is M3 USA&rsquo;s news and content site for physicians. Everything below I owned from spec to production
        and measured after launch, and most of it now runs without an engineer in the loop.
      </p>
    </Reveal>

    <Reveal delay={0.05} className="mt-10">
      <StatTicker stats={stats} />
    </Reveal>

    <div className="mt-12 divide-y divide-line border-y border-line">
      {initiatives.map((initiative, index) => (
        <Reveal key={initiative.title} delay={index * 0.05}>
          <article className="grid gap-x-10 gap-y-2 py-8 md:grid-cols-[9.5rem_1fr]">
            <p className="font-mono text-xs uppercase tracking-label text-muted md:pt-1.5">{initiative.period}</p>
            <div>
              <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold text-ink">
                <initiative.icon size={20} weight="bold" aria-hidden="true" className="shrink-0 text-accent" />
                {initiative.title}
              </h3>
              <p className="mt-3 max-w-[68ch] text-sm leading-relaxed">{initiative.impact}</p>
              <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-label text-muted">
                {initiative.stack.join(' · ')}
              </p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>

    <Reveal className="mt-12">
      <h3 className="font-mono text-xs uppercase tracking-label text-muted">Built with</h3>
      <TechChips tech={tech} />
    </Reveal>
  </Section>
);

export default SelectedWork;
