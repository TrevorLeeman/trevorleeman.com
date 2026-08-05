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

type Role = {
  period: string;
  title: string;
  meta: string;
  summary: string;
  icon: Icon;
  logo: Logo;
  highlights?: Highlight[];
  stack?: string[];
};

const m3Logo: Logo = { src: '/logos/m3-usa.png', width: 36, height: 36, className: 'rounded-md' };
const evccLogo: Logo = { src: '/logos/evcc.png', width: 36, height: 36, className: 'rounded-md' };
const cwuLogo: Logo = { src: '/logos/cwu.png', width: 36, height: 36, className: 'rounded-md' };

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
    title: 'Senior Software Engineer',
    meta: 'M3 USA · Promoted from Software Engineer in 2024',
    icon: Heartbeat,
    logo: m3Logo,
    summary:
      'I build the interactive products M3 sells into the healthcare market, and the Turborepo platform they run on, owning features from architecture through CI/CD.',
    highlights: [
      { value: 'High six figures', label: 'in deals unlocked by an interactive chat product I spearheaded' },
      {
        value: 'Endless puzzles',
        label: 'from an AI generation pipeline I built for Medical Matchup, a Connections-style quiz game',
      },
      { value: '10x', label: 'serverless cost reduction from a new caching strategy' },
    ],
    stack: ['TypeScript', 'React', 'Next.js', 'GraphQL', 'Node.js', 'Postgres', 'AWS', 'GCP', 'Docker'],
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
    <Reveal className="max-w-3xl">
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
        delegate implementation to them, and review everything they produce before it ships. That leverage is a big part
        of how one person designs, builds, and operates all of OSRS Exchange.
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
              {role.highlights && (
                <ul className="mt-4 space-y-1.5">
                  {role.highlights.map(highlight => (
                    <li key={highlight.label} className="flex items-baseline gap-x-2.5 text-sm leading-relaxed">
                      <span aria-hidden="true" className="text-signal">
                        ▲
                      </span>
                      <span>
                        <span className="whitespace-nowrap font-mono text-ink">{highlight.value}</span>{' '}
                        {highlight.label}
                      </span>
                    </li>
                  ))}
                </ul>
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
