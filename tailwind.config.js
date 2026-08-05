/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          950: '#04070d',
          900: '#070b14',
          850: '#0a1018',
          800: '#0e1622',
          700: '#15202f',
          600: '#1d2a3c',
          500: '#28384f',
        },
        neon: {
          green: '#22e378',
          cyan: '#22d3ee',
        },
      },
      boxShadow: {
        'glow-green': '0 0 24px -4px rgba(34, 227, 120, 0.45)',
        'glow-cyan': '0 0 24px -4px rgba(34, 211, 238, 0.45)',
        'glow-red': '0 0 24px -4px rgba(248, 113, 113, 0.45)',
        'glow-amber': '0 0 24px -4px rgba(251, 191, 36, 0.45)',
        'card': '0 8px 30px -12px rgba(0, 0, 0, 0.7)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'bar-shimmer': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 0%' },
        },
        'grid-pan': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '48px 48px' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'bar-shimmer': 'bar-shimmer 2s linear infinite',
        'grid-pan': 'grid-pan 20s linear infinite',
      },
    },
  },
  plugins: [],
};
