import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import Reveal from '../ui/Reveal';

const details = [
  { label: 'Location', value: 'Seattle, WA' },
  { label: 'Background', value: 'IT, then full-stack software' },
  { label: 'Off hours', value: 'Homelab, self-hosting, optimizing' },
];

const About = () => (
  <Section id="about" label="About">
    <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
      <Reveal>
        <Eyebrow>04 · About</Eyebrow>
        <h2
          id="about-title"
          className="mt-5 max-w-2xl font-display text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl"
        >
          I’m a software engineer in Seattle with an IT background and an optimizer’s brain.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
          I run a homelab, self-host what I can, and believe the best products come from engineers who sweat both the
          database and the drop shadow. These days that means leading a team at M3 USA and building the products
          physicians use on MDLinx.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <dl className="divide-y divide-line border-y border-line">
          {details.map(detail => (
            <div key={detail.label} className="grid grid-cols-[7rem_1fr] items-baseline gap-4 py-4">
              <dt className="font-mono text-[0.7rem] uppercase tracking-label text-muted">{detail.label}</dt>
              <dd className="font-mono text-sm text-ink">{detail.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  </Section>
);

export default About;
