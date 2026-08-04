import type { PropsWithChildren } from 'react';

type EyebrowProps = PropsWithChildren<{ className?: string }>;

const Eyebrow = ({ className = '', children }: EyebrowProps) => (
  <p className={`flex items-center gap-2.5 font-mono text-xs uppercase tracking-label text-muted ${className}`}>
    <span aria-hidden="true" className="text-signal">
      ▲
    </span>
    <span>{children}</span>
  </p>
);

export default Eyebrow;
