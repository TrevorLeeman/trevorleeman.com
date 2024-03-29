const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      '4xs': '300px',
      '3xs': '350px',
      '2xs': '400px',
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        'theme-black': '#121212',
        'theme-white': '#EFEFEF',
        'theme-pink': '#D1345B',
        'theme-green': '#00916E',
        'theme-purple': '#623CEA',
        'theme-light-blue-gray': 'rgb(207,216,220)',
        'theme-featured-personal-projects-light': 'rgb(30,41,59)',
        'theme-featured-personal-projects-dark': 'rgb(30,41,59)',
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
