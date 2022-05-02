import React, { useEffect, useState } from "react";
import useDarkMode from "../../hooks/useDarkMode";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useDarkMode();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = (event: React.MouseEvent) => {
    setDarkMode(!darkMode);
  };

  return mounted ? (
    <i
      onClick={toggleTheme}
      className={`las text-2xl inline-block ${
        darkMode ? "la-moon" : "la-sun"
      } hover:cursor-pointer`}
    />
  ) : null;
};

export default ThemeToggle;
