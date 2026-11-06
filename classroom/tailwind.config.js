import tailwindcssAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  // Lesson data files carry Tailwind classes too (e.g. a hero's `color:
  // 'bg-[#5c2483]'`), so `content/` must be scanned or those arbitrary values
  // are never generated and the slide renders with no background.
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './content/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Duolingo-flavoured brand palette shared across every lesson deck.
        brand: {
          blue: { DEFAULT: '#1cb0f6', edge: '#1899d6', hover: '#159bd9' },
          green: { DEFAULT: '#58cc02', edge: '#58a700' },
          yellow: { DEFAULT: '#ffc800', edge: '#cca000' },
          orange: { DEFAULT: '#ff9600', edge: '#cc7800' },
          red: { DEFAULT: '#ff4b4b', edge: '#cc3c3c' },
          purple: { DEFAULT: '#8b5cf6', edge: '#7c3aed' },
          teal: { DEFAULT: '#14b8a6', edge: '#0d9488' },
          indigo: { DEFAULT: '#2563eb', alt: '#6366f1' },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
