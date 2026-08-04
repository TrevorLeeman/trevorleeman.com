import { ArrowUpRight } from 'phosphor-react';
import { PORTFOLIO_REPO_URL } from '../../lib/links';

const Footer = () => (
  <footer className="border-t border-line py-10">
    <div className="container-page flex flex-col items-center justify-between gap-4 font-mono text-xs text-muted sm:flex-row">
      <p>© {new Date().getFullYear()} Trevor Leeman · Designed &amp; built in Seattle</p>
      <a
        href={PORTFOLIO_REPO_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 transition-colors hover:text-ink"
      >
        Source on GitHub
        <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
      </a>
    </div>
  </footer>
);

export default Footer;
