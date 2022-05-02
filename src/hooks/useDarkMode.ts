import { useEffect, useState } from "react";

const useDarkMode = (): [boolean, (enabled: boolean) => void] => {
  const [darkMode, setDarkMode] = useState(global.window?.__darkMode || false);

  useEffect(() => {
    global.window.__setDarkMode = () => setDarkMode(window?.__darkMode);
  }, []);

  useEffect(() => {
    if (global.window === undefined) return;

    const root = global.window.document.documentElement;
    root.classList.remove(darkMode ? "light" : "dark");
    root.classList.add(darkMode ? "dark" : "light");
  }, [darkMode]);

  return [darkMode, global.window?.__onThemeChange];
};

export default useDarkMode;
