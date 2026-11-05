import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // The portal is light only. 'class' keeps the step engine's dark: styles off.
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // PRA's website palette (pra-website main.css). Pages and buttons are blue
        // and green; sun, coral and violet are small accents only.
        pra: {
          blue: '#116DFF', 'blue-deep': '#0B4FBF', 'blue-ink': '#0E2A5C', 'blue-pale': '#EEF5FF', 'blue-tint': '#D3E4FF',
          green: '#48971D', 'green-deep': '#2F7D14', 'green-dark': '#1F5C12', 'green-pale': '#EDF7E3', 'green-tint': '#D3EDB9',
          sun: '#FFC857', 'sun-deep': '#F5A623', 'sun-ink': '#7A5000', 'sun-pale': '#FFF6DE',
          coral: '#FF6F59', 'coral-deep': '#D2452F', 'coral-pale': '#FFEEEA',
          violet: '#7C5CFF', 'violet-pale': '#F2EEFF',
          ink: '#1B2A41', 'ink-soft': '#55657A', line: '#E3EAF2', paper: '#F7FAFE',
        },
      },
      fontFamily: {
        sans: ['Poppins', '"Be Vietnam Pro"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        vi: ['"Be Vietnam Pro"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      },
    },
  },
  plugins: [animate],
}
