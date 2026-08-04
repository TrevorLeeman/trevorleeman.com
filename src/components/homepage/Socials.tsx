import { GithubLogo, LinkedinLogo } from 'phosphor-react';
import type { ReactNode } from 'react';
import { GITHUB_URL, LINKEDIN_URL } from '../../lib/links';

const SocialLink = ({ href, label, children }: { href: string; label: string; children: ReactNode }) => (
  <a
    href={href}
    aria-label={`${label} (opens in a new tab)`}
    target="_blank"
    rel="noreferrer"
    className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-muted transition duration-200 ease-signal hover:border-accent hover:text-ink motion-safe:hover:-translate-y-0.5"
  >
    {children}
  </a>
);

const Socials = () => (
  <ul className="flex list-none items-center gap-2">
    {/* Desktop already shows the "Connect on LinkedIn" text button beside this row. */}
    <li className="sm:hidden">
      <SocialLink href={LINKEDIN_URL} label="Trevor Leeman on LinkedIn">
        <LinkedinLogo size={20} weight="fill" aria-hidden="true" />
      </SocialLink>
    </li>
    <li>
      <SocialLink href={GITHUB_URL} label="Trevor Leeman on GitHub">
        <GithubLogo size={20} weight="fill" aria-hidden="true" />
      </SocialLink>
    </li>
  </ul>
);

export default Socials;
