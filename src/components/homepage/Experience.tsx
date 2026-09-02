import Image from 'next/image';
import { ArrowUpRight, Barcode, ChalkboardTeacher, Headset, Heartbeat } from 'phosphor-react';
import type { Icon } from 'phosphor-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import Reveal from '../ui/Reveal';
import { LINKEDIN_URL } from '../../lib/links';

type Highlight = { value: string; label: string };

type Logo = {
  /** Path to an image in /public/logos. */
  src: string;
  width: number;
  height: number;
  /** Shape treatment, e.g. rounding a white-tile or circular mark. */
  className?: string;
};

/** One title held at a company; the first stage is the current one. */
type Stage = {
  period: string;
  title: string;
  note?: string;
  highlights?: Highlight[];
};

type Role = {
  period: string;
  title: string;
  meta: string;
  summary: string;
  icon: Icon;
  logo: Logo;
  highlights?: Highlight[];
  /** Promotions within the role, newest first, rendered as a rail. */
  stages?: Stage[];
  stack?: string[];
};

const m3Logo: Logo = { src: '/logos/m3-usa.png', width: 36, height: 36, className: 'rounded-md' };
const evccLogo: Logo = { src: '/logos/evcc.png', width: 36, height: 36, className: 'rounded-md' };
const cwuLogo: Logo = { src: '/logos/cwu.png', width: 36, height: 36, className: 'rounded-md' };

const Highlights = ({ items, className = '' }: { items: Highlight[]; className?: string }) => (
  <ul className={`space-y-1.5 ${className}`}>
    {items.map(highlight => (
      <li key={highlight.label} className="flex items-baseline gap-x-2.5 text-sm leading-relaxed">
        <span aria-hidden="true" className="text-signal">
          ▲
        </span>
        <span>
          <span className="whitespace-nowrap font-mono text-ink">{highlight.value}</span> {highlight.label}
        </span>
      </li>
    ))}
  </ul>
);

const CompanyLogo = ({ logo }: { logo: Logo }) => (
  <Image
    src={logo.src}
    alt=""
    width={logo.width}
    height={logo.height}
    unoptimized
    className={`shrink-0 ${logo.className ?? ''}`}
    style={{ height: logo.height, width: 'auto' }}
  />
);

const roles: Role[] = [
  {
    period: '2022 · Present',
    title: 'Senior Software Engineer, Team Lead',
    meta: 'M3 USA · Software Engineer to Team Lead in four years',
    icon: Heartbeat,
    logo: m3Logo,
    summary:
      'I build the interactive products M3 sells into the healthcare market and the Turborepo platform they run on, and I steward the pieces everything else depends on: the registration funnel, the ad platform, and releases across several repos.',
    stages: [
      {
        period: 'Sep 2026 · Present',
        title: 'Senior Software Engineer, Team Lead',
        note: 'Leading the team that builds MDLinx, with the security program and content pipelines I designed now running as team cadence.',
      },
      {
        period: '2024 · Aug 2026',
        title: 'Senior Software Engineer',
        highlights: [
          {
            value: 'Endless puzzles',
            label: 'from an AI generation pipeline I built for Medical Matchup, a Connections-style quiz game',
          },
          {
            value: 'Refresh-free',
            label:
              'login and signup after years of a full-page reload, plus a sticky component manager that ended conflicts between banners, extenders, and ads',
          },
          {
            value: 'Video platform',
            label: 'built on PlayerJS, Sprout Video, and Contentful with custom analytics events',
          },
          {
            value: 'Measurement foundation',
            label:
              'with site-wide scroll depth tracking, anonymous reader identification across Django and Next.js, and the consent banner',
          },
        ],
      },
      {
        period: '2022 · 2024',
        title: 'Software Engineer',
        highlights: [
          {
            value: 'Two weeks',
            label:
              'to build the redesigned MDLinx homepage frontend solo, from scratch, through a last-minute design pivot, meeting an industry awards deadline with my manager out the entire time',
          },
          { value: 'High six figures', label: 'in deals unlocked by an interactive chat product I spearheaded' },
          {
            value: 'Six figures',
            label: 'of pre-sold sponsorship protected by shipping SmartestDoc v2 on a fixed February deadline',
          },
          { value: '10x', label: 'serverless cost reduction from a new caching strategy' },
          {
            value: 'Under an hour',
            label:
              'from a high-priority login bug report to a deployed hotfix, tracked down alone when no one else was online',
          },
          {
            value: 'Four major upgrades',
            label: 'across the Turborepo monorepo: Node 14 to 18, Next.js 11 to 13, React 17 to 18, TypeScript 4 to 5',
          },
          {
            value: 'Foundations',
            label:
              'including a Contentful apps monorepo with CI/CD auto-deploys, the codebase’s first Playwright end-to-end tests, trunk-based development, and on-demand ISR through Contentful webhooks',
          },
        ],
      },
    ],
    stack: [
      'TypeScript',
      'React',
      'Next.js',
      'GraphQL',
      'Node.js',
      'Django',
      'Postgres',
      'Contentful',
      'GCP',
      'AWS',
      'Terraform',
      'Kubernetes',
    ],
  },
  {
    period: '2019 · 2022',
    title: 'Web Application Developer',
    meta: 'Everett Community College',
    icon: Barcode,
    logo: evccLogo,
    summary:
      'The original forward deployed role. I sat inside the college, found the department workflows that hurt, and shipped full-stack fixes: an inventory system built around barcode scanners, a modernized class schedule, advisor workload balancing, and a student ID migration across dozens of databases.',
    stack: ['JavaScript', 'PHP', 'ColdFusion', 'SQL Server', 'Red Hat Linux', 'Nginx'],
  },
  {
    period: '2018 · 2019',
    title: 'Student Web Developer',
    meta: 'Central Washington University',
    icon: ChalkboardTeacher,
    logo: cwuLogo,
    summary:
      'Developed and maintained cwu.edu on an Agile Scrum team. I also ran weekly workshops that trained and certified departmental content managers: half the job was building the site, the other half was teaching people to run their corner of it.',
    stack: ['JavaScript', 'Drupal', 'HTML', 'CSS'],
  },
  {
    period: '2016 · 2017',
    title: 'IT Help Desk Specialist',
    meta: 'Everett Community College',
    icon: Headset,
    logo: evccLogo,
    summary:
      'First line of IT support for students, staff, and faculty. Where the IT background started: listen first, diagnose carefully, and fix it without an escalation.',
  },
];

const Experience = () => (
  <Section id="experience" labelledBy="experience-title">
    <Reveal>
      <Eyebrow>02 · Experience</Eyebrow>
      <h2 id="experience-title" className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Eight years of shipping software that pays for itself.
      </h2>
      <p className="mt-6 max-w-[68ch] text-base leading-relaxed sm:text-lg">
        Every role here has the same shape: embed with the people who own a problem, learn the domain fast, and own the
        fix end to end. That is the forward deployed engineer&rsquo;s job description, and I was doing it before the
        title existed.
      </p>
      <p className="mt-4 max-w-[68ch] text-base leading-relaxed sm:text-lg">
        I&rsquo;m also an AI-native engineer. Agentic coding tools run through my daily workflow: I plan with them,
        delegate implementation to them, and review everything they produce before it ships. That leverage is how the
        Medical Matchup puzzle pipeline and the security remediation CLI shipped alongside the product roadmap instead
        of after it.
      </p>
    </Reveal>

    <div className="mt-12 divide-y divide-line border-y border-line">
      {roles.map((role, index) => (
        <Reveal key={`${role.title} ${role.period}`} delay={index * 0.05}>
          <article className="grid gap-x-10 gap-y-2 py-8 md:grid-cols-[9.5rem_1fr]">
            <p className="font-mono text-xs uppercase tracking-label text-muted md:pt-1.5">{role.period}</p>
            <div>
              <div className="flex items-center justify-between gap-4">
                <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold text-ink">
                  <role.icon size={20} weight="bold" aria-hidden="true" className="shrink-0 text-accent" />
                  {role.title}
                </h3>
                <CompanyLogo logo={role.logo} />
              </div>
              <p className="mt-1 font-mono text-xs uppercase tracking-label text-muted">{role.meta}</p>
              <p className="mt-3 max-w-[68ch] text-sm leading-relaxed">{role.summary}</p>
              {role.highlights && <Highlights items={role.highlights} className="mt-4" />}
              {role.stages && (
                /* Promotions read as a rail: a hairline down the left, one dot per
                   title, the current title lit in signal green. */
                <ol className="mt-6 space-y-7 border-l border-line pl-6">
                  {role.stages.map((stage, stageIndex) => (
                    <li key={stage.title} className="relative">
                      <span
                        aria-hidden="true"
                        className={`absolute top-[0.3rem] h-2.5 w-2.5 rounded-full ${
                          stageIndex === 0 ? 'bg-signal ring-4 ring-signal/20' : 'border border-line-strong bg-canvas'
                        }`}
                        style={{ left: 'calc(-1.5rem - 0.3125rem - 0.5px)' }}
                      />
                      <p className="font-mono text-xs uppercase tracking-label text-muted">{stage.period}</p>
                      <h4 className="mt-1 font-display text-base font-semibold text-ink">{stage.title}</h4>
                      {stage.note && <p className="mt-1.5 max-w-[68ch] text-sm leading-relaxed">{stage.note}</p>}
                      {stage.highlights && <Highlights items={stage.highlights} className="mt-2.5" />}
                    </li>
                  ))}
                </ol>
              )}
              {role.stack && (
                <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-label text-muted">
                  {role.stack.join(' · ')}
                </p>
              )}
            </div>
          </article>
        </Reveal>
      ))}
    </div>

    <Reveal className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h3 className="font-mono text-xs uppercase tracking-label text-muted">Education</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink">
          BS, Web Development &amp; Database Administration · Central Washington University
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink">
          AS, Information Technology · Everett Community College
        </p>
      </div>
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-label text-muted transition-colors hover:text-accent"
      >
        Full history on LinkedIn
        <ArrowUpRight size={12} weight="bold" aria-hidden="true" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </Reveal>
  </Section>
);

export default Experience;
