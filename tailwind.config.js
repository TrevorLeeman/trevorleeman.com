module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'theme-black': '#121212',
        'theme-white': '#EFEFEF',
        'theme-pink': '#D1345B',
        'theme-green': '#00916E',
        'theme-purple': '#623CEA',
        'theme-featured-personal-projects-light': '#1f2937',
        'theme-featured-personal-projects-dark': '#1f2937',
        // 'theme-featured-personal-projects-dark': '#D1D5DB',
      },
      fontFamily: {
        default:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        abel: 'Abel, sans-serif',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
