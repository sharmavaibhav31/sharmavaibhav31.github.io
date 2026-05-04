/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0c0c0c',
        'bg-surface': '#111111',
        'bg-raised': '#161616',
        'accent-red': 'rgba(255,80,80,0.85)',
        'accent-green': '#4ade80',
        'accent-orange': '#e05c2a',
        'accent-amber': 'rgba(251,191,36,0.85)',
        'accent-purple': 'rgba(167,139,250,0.85)',
        'text-primary': 'rgba(255,255,255,0.88)',
        'text-secondary': 'rgba(255,255,255,0.42)',
        'text-muted': 'rgba(255,255,255,0.18)',
        // Keeping mapping for borders/bgs based on CSS variables just in case
        'border-default': 'var(--border-default)',
        'border-subtle': 'var(--border-subtle)',
        'accent-red-bg': 'var(--accent-red-bg)',
        'accent-red-border': 'var(--accent-red-border)',
        'accent-green-bg': 'var(--accent-green-bg)',
        'accent-green-border': 'var(--accent-green-border)',
        'accent-orange-bg': 'var(--accent-orange-bg)',
        'accent-orange-border': 'var(--accent-orange-border)',
        'accent-amber-bg': 'var(--accent-amber-bg)',
        'accent-amber-border': 'var(--accent-amber-border)',
        'accent-purple-bg': 'var(--accent-purple-bg)',
        'accent-purple-border': 'var(--accent-purple-border)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        }
      },
      animation: {
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
