import { ArrowUpRight } from 'phosphor-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import Reveal from '../ui/Reveal';
import ButtonLink from '../ui/ButtonLink';
import { GITHUB_URL, LINKEDIN_URL } from '../../lib/links';

const Contact = () => (
  <Section id="contact" label="Contact">
    <Reveal>
      <Eyebrow>05 · Contact</Eyebrow>
      <h2
        id="contact-title"
        className="mt-6 max-w-3xl font-display text-3xl font-bold leading-snug tracking-tight text-ink [text-wrap:balance] sm:text-5xl"
      >
        Curious how something here was built, or working on a similar problem? I’m always up for a conversation.
      </h2>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href={LINKEDIN_URL}>
          Connect on LinkedIn
          <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
        </ButtonLink>
        <ButtonLink href={GITHUB_URL} variant="secondary">
          Browse GitHub
          <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
        </ButtonLink>
      </div>
    </Reveal>
  </Section>
);

export default Contact;
