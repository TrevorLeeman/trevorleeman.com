import { FlowArrow, PencilLine, Stack } from 'phosphor-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import Reveal from '../ui/Reveal';

const pillars = [
  {
    icon: Stack,
    title: 'Own the whole thing',
    description:
      'Spec, content model, API, frontend, tracking, QA, release, and the numbers afterward. On a launch I am the person with the whole picture, working across product, editorial, marketing, data, ad ops, and outside vendors.',
  },
  {
    icon: FlowArrow,
    title: 'Make it self-serve',
    description:
      'A feature is done when product and editorial can run it without an engineer: self-serve experiments, content-configurable templates, an AI puzzle pipeline with human review. I leave every codebase easier to operate than I found it, from one-command dev startup to onboarding docs.',
  },
  {
    icon: PencilLine,
    title: 'Put the judgment in writing',
    description:
      'Trade-off analyses before big decisions, impact reports after incidents, and the same scrutiny for my own work. I have paused my own migration on complexity grounds and reversed my own schema design after finding a data-integrity flaw.',
  },
];

const Approach = () => (
  <Section id="approach" labelledBy="approach-title">
    <Reveal className="max-w-2xl">
      <Eyebrow>03 · How I work</Eyebrow>
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
            <div className="flex items-center justify-between gap-3">
              <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold text-ink">
                <pillar.icon size={20} weight="bold" aria-hidden="true" className="shrink-0 text-accent" />
                {pillar.title}
              </h3>
              <span className="font-mono text-xs tracking-label text-muted">0{index + 1}</span>
            </div>
            <p className="mt-2.5 text-sm leading-relaxed">{pillar.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
);

export default Approach;
