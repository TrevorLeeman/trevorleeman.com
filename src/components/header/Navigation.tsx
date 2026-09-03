import Link from 'next/link';

type NavigationItem = {
  label: string;
  href: string;
  /** Secondary items collapse away on small screens. */
  className?: string;
};

const navigationList: NavigationItem[] = [
  { label: 'Work', href: '/#work' },
  { label: 'Experience', href: '/#experience', className: 'hidden md:block' },
  { label: 'Approach', href: '/#approach', className: 'hidden md:block' },
  { label: 'About', href: '/#about', className: 'hidden md:block' },
  { label: 'Contact', href: '/#contact' },
];

const Navigation = () => (
  <nav aria-label="Primary">
    <ul className="flex list-none items-center gap-0.5 sm:gap-1">
      {navigationList.map(navItem => (
        <li key={navItem.href} className={navItem.className}>
          <Link
            href={navItem.href}
            className="block rounded-md px-2 py-2.5 font-mono text-xs uppercase tracking-label text-muted transition-colors hover:text-ink xs:px-2.5 sm:px-3"
          >
            {navItem.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navigation;
