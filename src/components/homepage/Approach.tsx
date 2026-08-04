import { Broadcast, Lightning, Stack } from 'phosphor-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import Reveal from '../ui/Reveal';

const pillars = [
  {
    icon: Lightning,
    title: 'UX before everything',
    description:
      'Traders make split-second decisions; the interface can’t be the bottleneck. I obsess over speed, hierarchy, and the details users feel but never notice.',
  },
  {
    icon: Stack,
    title: 'Full-stack, end to end',
    description:
      'From schema design to pixel polish: React and Next.js frontends, NestJS APIs, Postgres data layers. One owner, no handoffs.',
  },
  {
    icon: Broadcast,
    title: 'Runs in production',
    description:
      'Self-hosting enthusiast with an IT background. Docker images, CI pipelines, Sentry on both ends. I ship it, monitor it, and keep it up.',
  },
];

const Approach = () => (
  <Section id="approach" labelledBy="approach-title">
    <Reveal className="max-w-2xl">
      <Eyebrow>02 · How I work</Eyebrow>
      <h2 id="approach-title" className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        The way I build.
      </h2>
    </Reveal>

    <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-3 md:gap-8">
      {pillars.map((pillar, index) => (
        <Reveal key={pillar.title} delay={index * 0.08} className="h-full">
          {/* Stacked on mobile, the first pillar's rule floats alone under the
              heading, so it only joins the shared md line. */}
          <div className={`h-full border-line ${index === 0 ? 'md:border-t md:pt-6' : 'border-t pt-6'}`}>
            <div className="flex items-center justify-between">
              <pillar.icon size={22} weight="bold" aria-hidden="true" className="text-accent" />
              <span className="font-mono text-xs tracking-label text-muted">0{index + 1}</span>
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold text-ink md:mt-5">{pillar.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed">{pillar.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
);

export default Approach;
