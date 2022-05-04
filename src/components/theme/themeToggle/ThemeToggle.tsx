import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "phosphor-react";
import { ThemeContext } from "../themeContext/ThemeContext";

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
      className="rounded-full w-12 h-12 pl-[7px] overflow-hidden cursor-pointer border-2 border-gray-800 dark:border-gray-200"
      onClick={toggleTheme}
    >
      <motion.div
        className="flex gap-2 items-center"
        initial={{ x: darkMode ? -37 : 0 }}
        animate={{ x: darkMode ? -37 : 0 }}
      >
        <Sun size={30} className="flex-shrink-0" />
        <Moon size={30} className="flex-shrink-0" />
      </motion.div>
    </button>
  ) : null;
  return <></>;
};

export default ThemeToggle;
