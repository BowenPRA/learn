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
          // The Current's logo colours (admin tailwind.config.js), for small touches that
          // tie the two sites together: the sky of the river, the lime of the leaves.
          sky: '#2196E3', lime: '#8DC63F', navy: '#1F5AA6',
        },
      },
      fontFamily: {
        sans: ['"PRA Minus"', 'Poppins', '"Be Vietnam Pro"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        vi: ['"PRA Minus"', '"Be Vietnam Pro"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      },
      boxShadow: {
        // The Current's cards: a thin line and a soft shadow, a little deeper here.
        soft: '0 1px 2px rgba(16, 32, 64, 0.04), 0 6px 20px -8px rgba(16, 32, 64, 0.12)',
        lift: '0 2px 4px rgba(16, 32, 64, 0.05), 0 16px 32px -12px rgba(17, 109, 255, 0.30)',
        hero: '0 20px 48px -20px rgba(11, 79, 191, 0.55)',
      },
      keyframes: {
        'pip-float': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        'star-pop': { '0%': { transform: 'scale(0.3) rotate(-25deg)', opacity: '0' }, '70%': { transform: 'scale(1.15) rotate(6deg)', opacity: '1' }, '100%': { transform: 'scale(1) rotate(0)', opacity: '1' } },
        sparkle: { '0%, 100%': { transform: 'scale(0.6)', opacity: '0.25' }, '50%': { transform: 'scale(1)', opacity: '1' } },
      },
      animation: {
        'pip-float': 'pip-float 3.2s ease-in-out infinite',
        'star-pop': 'star-pop 0.55s cubic-bezier(.2,.9,.3,1.3) both',
        sparkle: 'sparkle 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [animate],
}
