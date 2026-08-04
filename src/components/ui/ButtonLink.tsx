import Link from 'next/link';
import type { PropsWithChildren } from 'react';

type ButtonLinkProps = PropsWithChildren<{
  href: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}>;

const baseStyles =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-5 py-3 font-mono text-xs uppercase tracking-label transition duration-200 ease-signal motion-safe:hover:-translate-y-0.5';

const variantStyles: Record<NonNullable<ButtonLinkProps['variant']>, string> = {
  primary: 'bg-accent text-canvas shadow-card hover:bg-accent-strong',
  secondary: 'border border-line-strong bg-surface text-ink hover:border-accent hover:text-accent',
};

const ButtonLink = ({ href, variant = 'primary', className = '', children }: ButtonLinkProps) => {
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return href.startsWith('http') ? (
    <a href={href} target="_blank" rel="noreferrer" className={classes}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
};

export default ButtonLink;
