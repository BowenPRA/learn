import tailwindcssAnimate from 'tailwindcss-animate'

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
        brand: {
          // Duolingo-flavoured brand palette. face = fill, edge = border/shadow,
          // hover = hover fill. Keep these hex values pixel-identical to the
          // inline magic strings they replace.
          blue: { DEFAULT: '#1cb0f6', edge: '#1899d6', hover: '#159bd9' },
          green: { DEFAULT: '#58cc02', edge: '#58a700' },
          yellow: { DEFAULT: '#ffc800', edge: '#cca000' },
          orange: { DEFAULT: '#ff9600', edge: '#cc7800' },
          red: { DEFAULT: '#ff4b4b', edge: '#cc3c3c' },
          purple: { DEFAULT: '#ce82ff', edge: '#a567cc' },
          teal: { DEFAULT: '#14b8a6', edge: '#0d9488' },
          indigo: { DEFAULT: '#2563eb', alt: '#6366f1' },
          pink: { DEFAULT: '#ec4899', edge: '#be185d' },
        },
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
  ],
}