// src/data/Y7_SCI/U03_4/useNarrow.js
// A phone test for the two four-panel strips (story.jsx, riverStory.jsx), which
// stack their panels two by two below Tailwind's `sm`.
import { useEffect, useState } from 'react';

const PHONE = '(max-width: 639px)';
const isPhone = () => typeof window !== 'undefined' && !!window.matchMedia?.(PHONE).matches;

/** True below Tailwind's `sm` (a phone held upright); follows the window. */
export function useNarrow() {
  const [narrow, setNarrow] = useState(isPhone);
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia(PHONE);
    const on = () => setNarrow(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return narrow;
}
