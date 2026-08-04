import Link from 'next/link';
import Navigation from './Navigation';
import ThemeToggle from '../theme/ThemeToggle';

const Header = () => (
  <header className="sticky top-0 z-40 border-b border-line bg-canvas/80 backdrop-blur-md">
    <div className="container-page flex h-16 items-center justify-between gap-2 sm:gap-4">
      <Link
        href="/#top"
        className="flex items-center gap-2 font-mono text-xs text-ink transition-colors hover:text-accent xs:gap-2.5 xs:text-sm"
      >
        <span aria-hidden="true" className="sc-heartbeat h-1.5 w-1.5 rounded-full bg-signal" />
        trevor.leeman
      </Link>
      <div className="flex items-center gap-1 sm:gap-3">
        <Navigation />
        <ThemeToggle />
      </div>
    </div>
  </header>
);

export default Header;
