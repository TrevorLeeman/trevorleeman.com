import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'phosphor-react';
import { useTheme } from 'next-themes';

const iconClasses = (active: boolean) =>
  `absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-200 ${
    active ? 'opacity-100 motion-safe:rotate-0' : 'opacity-0 motion-safe:-rotate-45'
  }`;

const ThemeToggle: React.FunctionComponent = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return mounted ? (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-ink md:h-9 md:w-9"
    >
      <span className={iconClasses(isDark)}>
        <Moon size={17} weight="bold" />
      </span>
      <span className={iconClasses(!isDark)}>
        <Sun size={17} weight="bold" />
      </span>
    </button>
  ) : (
    // Placeholder to prevent layout shift
    <div className="h-11 w-11 md:h-9 md:w-9" />
  );
};

export default ThemeToggle;
