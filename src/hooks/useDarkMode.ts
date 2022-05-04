import { useEffect, useState } from "react";

const useDarkMode = (): [boolean, (enabled: boolean) => void] => {
  const [darkMode, setDarkMode] = useState(global.window?.__darkMode || false);

  useEffect(() => {
    global.window.__setDarkMode = () => setDarkMode(window?.__darkMode);
  }, []);

  return [darkMode, global.window?.__onThemeChange];
};

export default useDarkMode;
