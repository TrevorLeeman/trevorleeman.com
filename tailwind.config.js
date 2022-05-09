module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "theme-black": "#121212",
        "theme-white": "#EFEFEF",
        "theme-pink": "#D1345B",
        "theme-green": "#00916E",
        "theme-purple": "#623CEA",
      },
      fontFamily: {
        default:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
    },
  },
  plugins: [],
};
