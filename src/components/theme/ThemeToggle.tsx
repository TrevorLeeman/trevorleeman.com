import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "phosphor-react";
import { ThemeContext } from "./ThemeContext";

const ThemeToggle: React.FunctionComponent = () => {
  const [mounted, setMounted] = useState(false);
  const { darkMode, setDarkMode } = React.useContext(ThemeContext);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = (event: React.MouseEvent) => {
    setDarkMode(!darkMode);
  };

  return mounted ? (
    <button
      className="h-12 w-12 cursor-pointer overflow-hidden rounded-full border-2 border-theme-black pl-[7px] dark:border-theme-white"
      onClick={toggleTheme}
    >
      <motion.div
        className="flex items-center gap-2"
        initial={{ x: darkMode ? -37 : 0 }}
        animate={{ x: darkMode ? -37 : 0 }}
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
