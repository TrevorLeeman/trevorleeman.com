import Image from 'next/image';

export type Tech = {
  label: string;
  /** Path to an SVG in /public/icons. Omit for tech without an icon. */
  icon?: string;
  /** For near-black monochrome logos that vanish on dark surfaces. */
  invertInDark?: boolean;
};

/** Renders inside a <ul>. */
const TechBadge = ({ label, icon, invertInDark }: Tech) => (
  <li className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs text-body">
    {icon ? (
      <Image
        src={icon}
        alt=""
        width={16}
        height={16}
        unoptimized
        className={`h-4 w-4 ${invertInDark ? 'dark:invert' : ''}`}
      />
    ) : null}
    <span>{label}</span>
  </li>
);

export default TechBadge;
