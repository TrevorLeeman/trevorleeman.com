const defaultTheme = require('tailwindcss/defaultTheme');

// Semantic tokens are defined as `R G B` triplets in src/styles/globals.css so a
// single class works in both themes (`bg-canvas`, `text-ink`, ...).
const token = variable => `rgb(var(${variable}) / <alpha-value>)`;

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
        canvas: token('--color-canvas'),
        surface: token('--color-surface'),
        'surface-raised': token('--color-surface-raised'),
        line: token('--color-line'),
        'line-strong': token('--color-line-strong'),
        ink: token('--color-ink'),
        body: token('--color-body'),
        muted: token('--color-muted'),
        accent: token('--color-accent'),
        'accent-strong': token('--color-accent-strong'),
        signal: token('--color-signal'),
      },
      fontFamily: {
        display: ['var(--font-display)', ...defaultTheme.fontFamily.sans],
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
      },
      letterSpacing: {
        label: '0.18em',
      },
      boxShadow: {
        card: '0 1px 2px rgb(2 6 23 / 0.06), 0 12px 32px -24px rgb(2 6 23 / 0.45)',
        lift: '0 1px 2px rgb(2 6 23 / 0.08), 0 24px 48px -28px rgb(var(--color-accent) / 0.55)',
      },
      transitionTimingFunction: {
        signal: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
