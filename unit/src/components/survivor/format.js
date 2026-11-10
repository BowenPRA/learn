// src/components/survivor/format.js
//
// Display helpers shared by the HUD and the results card. They live outside the
// component file so that file exports components and nothing else, which is what
// fast refresh needs to hot-swap a screen without dropping the run.

/** `mm:ss` from milliseconds, clamped at zero. */
export const fmtTime = (ms) => {
  const total = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
};

/** Compact score for the HUD, matching the tower-defense readout's `10k` style. */
export const fmtScore = (n) => (n >= 10000 ? `${Number((n / 1000).toFixed(1))}k` : Math.round(n));
