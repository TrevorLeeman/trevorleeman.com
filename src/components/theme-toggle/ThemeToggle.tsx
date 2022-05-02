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
    <div
      onClick={toggleTheme}
      className={`rounded-full w-9 h-9 ${
        darkMode ? "bg-red-700" : "bg-green-700"
      } inline-block hover:cursor-pointer`}
    />
  ) : null;
};

export default ThemeToggle;
