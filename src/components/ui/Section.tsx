import type { PropsWithChildren } from 'react';

type SectionProps = PropsWithChildren<{
  id: string;
  /** Id of the heading that names this landmark. Ignored when `label` is set. */
  labelledBy?: string;
  /** Short accessible name for landmarks whose heading is a full sentence. */
  label?: string;
  className?: string;
}>;

const Section = ({ id, labelledBy, label, className = '', children }: SectionProps) => (
  <section
    id={id}
    aria-labelledby={label ? undefined : labelledBy}
    aria-label={label}
    className={`border-t border-line py-20 sm:py-24 lg:py-28 ${className}`}
  >
    <div className="container-page">{children}</div>
  </section>
);

export default Section;
