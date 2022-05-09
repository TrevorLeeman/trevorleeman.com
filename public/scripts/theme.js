"use strict";
// Resolve initial theme flash
// To compile to js, use command: npx tsc theme.js
// Inspired by this hangindev: https://hangindev.com/blog/avoid-flash-of-default-theme-an-implementation-of-dark-mode-in-react-app
(function () {
  // var setTheme = function (enabled) {
  //   window.document.documentElement.className = enabled ? "dark" : "light";
  //   window.__darkMode = enabled;
  //   window.__setDarkMode(enabled);
  // };
  // // window.__setDarkMode will be overwritten in our React component
  // window.__setDarkMode = function () {};
  // // window.__onThemeChange will be triggered by our React component
  // window.__onThemeChange = function (enabled) {
  //   setTheme(enabled);
  //   try {
  //     localStorage.setItem("darkMode", JSON.stringify(enabled));
  //   } catch (err) {}
  // };
  // // detect system theme and monitor for changes
  // var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  // darkQuery.addEventListener("change", function (event) {
  //   window.__onThemeChange(event.matches ? true : false);
  // });
  // var darkModeEnabled, darkStorage;
  // // try to get saved theme
  // try {
  //   darkStorage = localStorage.getItem("darkMode");
  //   darkModeEnabled = darkStorage && JSON.parse(darkStorage);
  // } catch (err) {}
  // // initialize preferredTheme
  // setTheme(darkStorage === null ? darkQuery.matches : darkModeEnabled);
  // document.querySelector("html").classList.add("dark");
})();
