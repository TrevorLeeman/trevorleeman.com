// Resolve initial theme flash
// To compile to js, use command: npx tsc theme.js
// Inspired by this hangindev: https://hangindev.com/blog/avoid-flash-of-default-theme-an-implementation-of-dark-mode-in-react-app

import { Dispatch, SetStateAction } from "react";

declare global {
  interface Window {
    __darkMode: boolean;
    __setDarkMode: Dispatch<SetStateAction<boolean>>;
    __onThemeChange: (enabled: boolean) => void;
  }
}

(() => {
  const setTheme = (enabled: boolean) => {
    window.document.documentElement.className = enabled ? "dark" : "light";
    window.__darkMode = enabled;
    window.__setDarkMode(enabled);
  };

  // window.__setDarkMode will be overwritten in our React component
  window.__setDarkMode = () => {};
  // window.__onThemeChange will be triggered by our React component
  window.__onThemeChange = (enabled) => {
    setTheme(enabled);
    try {
      localStorage.setItem("darkMode", JSON.stringify(enabled));
    } catch (err) {}
  };
  // detect system theme and monitor for changes
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  darkQuery.addEventListener("change", (event) => {
    window.__onThemeChange(event.matches ? true : false);
  });
  let darkModeEnabled, darkStorage;
  // try to get saved theme
  try {
    darkStorage = localStorage.getItem("darkMode");
    darkModeEnabled = darkStorage && JSON.parse(darkStorage);
  } catch (err) {}
  // initialize preferredTheme
  setTheme(darkStorage === null ? darkQuery.matches : darkModeEnabled);
})();
