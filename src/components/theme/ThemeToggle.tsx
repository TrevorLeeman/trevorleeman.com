import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'phosphor-react';
import { useTheme } from 'next-themes';

const ThemeToggle: React.FunctionComponent = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = (event: React.MouseEvent) => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return mounted ? (
    <button
      className="h-12 w-12 cursor-pointer overflow-hidden rounded-full border-2 border-theme-black pl-[7px] dark:border-theme-white md:scale-125"
      onClick={toggleTheme}
      aria-label="theme-toggle"
    >
      <motion.div
        className="flex items-center gap-2"
        initial={{ x: resolvedTheme === 'dark' ? -37 : 0 }}
        animate={{ x: resolvedTheme === 'dark' ? -37 : 0 }}
      >
        <Sun size={30} className="flex-shrink-0" />
        <Moon size={30} className="flex-shrink-0" />
      </motion.div>
    </button>
  ) : (
    // Placeholder to prevent layout shift
    <div className="h-12 w-12" />
  );
};

export default ThemeToggle;
