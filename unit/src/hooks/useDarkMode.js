import { useCallback, useEffect, useState } from 'react';

/**
 * Dark mode, in one place.
 *
 * Five screens carried a byte-identical copy of this: read localStorage in an
 * effect, `setIsDark`, then add the class by hand. Reading it in an effect meant
 * every screen rendered light first and then re-rendered dark, which is both the
 * flash of the wrong theme and what `react-hooks/set-state-in-effect` was
 * flagging. The value is available synchronously, so it belongs in the initial
 * state; the effect is left doing what effects are for — syncing the `<html>`
 * class, which is an external system.
 *
 * `theme` is only written on an explicit toggle. Persisting the system
 * preference on mount would silently convert "follow my OS" into a hard choice
 * the user never made.
 */
const prefersDark = () =>
  localStorage.getItem('theme') === 'dark' ||
  (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(prefersDark);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggle = useCallback(() => {
    const next = !isDark;
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setIsDark(next);
  }, [isDark]);

  return [isDark, toggle];
}
