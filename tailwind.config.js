/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Core surface palette (dark charcoal / near-black)
        night: {
          950: '#07090F', // page background
          900: '#0B0F18', // deep panels
          800: '#111827', // card background
          700: '#1B2436', // elevated borders/hover
        },
        // Electric blue + violet accent system
        accent: {
          DEFAULT: '#7C5CFF', // violet
          blue: '#38BDF8',    // electric blue
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -12px rgba(124, 92, 255, 0.45)',
        card: '0 10px 30px -12px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
