import { useState } from 'react'

/**
 * Reads/writes the `dark` class on <html> and persists the choice in
 * localStorage. The initial class is applied before paint by the inline script
 * in index.html, so we can seed state straight from the DOM — no effect needed.
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('theme', next ? 'dark' : 'light')
      return next
    })
  }

  return { isDark, toggle }
}
