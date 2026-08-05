import { useEffect, useState } from 'react';
import Image from 'next/image';
import TechBadge, { Tech } from './TechBadge';

/**
 * Tech chip list. From `sm` up (and before hydration, so the server HTML works
 * without JS) it is the plain wrapping chip grid. On mobile the chips tighten
 * to icon-only pills; tapping one spreads it open to reveal the name and
 * closes whichever chip was open before. The reveal animates the label
 * column's track from 0fr to 1fr, which keeps both open and close smooth
 * without hardcoding a width.
 */
const TechChips = ({ tech }: { tech: Tech[] }) => {
  const [interactive, setInteractive] = useState(false);
  const [open, setOpen] = useState(-1);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 639.98px)');
    const update = () => {
      setInteractive(mobile.matches);
      setOpen(-1);
    };
    update();
    mobile.addEventListener('change', update);
    return () => mobile.removeEventListener('change', update);
  }, []);

  if (!interactive) {
    return (
      <ul className="mt-4 flex list-none flex-wrap gap-2">
        {tech.map(item => (
          <TechBadge key={item.label} label={item.label} icon={item.icon} invertInDark={item.invertInDark} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="mt-4 flex list-none flex-wrap gap-2">
      {tech.map((item, index) => {
        const isOpen = open === index;
        return (
          <li key={item.label}>
            <button
              type="button"
              aria-label={item.label}
              aria-expanded={isOpen}
              onClick={() => setOpen(current => (current === index ? -1 : index))}
              className={`flex items-center rounded-full border bg-surface p-2 font-mono text-xs text-body transition-colors duration-300 ${
                isOpen ? 'border-accent/60' : 'border-line'
              }`}
            >
              {item.icon ? (
                <Image
                  src={item.icon}
                  alt=""
                  width={16}
                  height={16}
                  unoptimized
                  className={`h-4 w-4 ${item.invertInDark ? 'dark:invert' : ''}`}
                />
              ) : null}
              <span
                className={`grid transition-[grid-template-columns] duration-300 ease-signal motion-reduce:transition-none ${
                  isOpen ? 'grid-cols-[1fr]' : 'grid-cols-[0fr]'
                }`}
              >
                <span
                  className={`overflow-hidden whitespace-nowrap transition-opacity duration-300 motion-reduce:transition-none ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <span className="pl-2 pr-1">{item.label}</span>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TechChips;
