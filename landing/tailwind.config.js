/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Theme-aware tokens: channels are set in index.css for dark and light.
        ink: 'rgb(var(--ink) / <alpha-value>)',
        deep: 'rgb(var(--deep) / <alpha-value>)',
        fog: 'rgb(var(--fog) / <alpha-value>)',
        slate: 'rgb(var(--slate) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        strong: 'rgb(var(--strong) / <alpha-value>)',
        tint: 'rgb(var(--tint) / <alpha-value>)',
        sodium: 'rgb(var(--sodium) / <alpha-value>)',
        ok: 'rgb(var(--ok) / <alpha-value>)',
        err: 'rgb(var(--err) / <alpha-value>)',
        // Fixed in both themes: the amber fill and the dark text that sits on it.
        lamp: '#F2B33D',
        lampink: '#0A101C',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        page: '78rem',
      },
    },
  },
  plugins: [],
};
