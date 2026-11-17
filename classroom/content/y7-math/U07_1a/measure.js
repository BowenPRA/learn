// content/y7-math/U07_1a/measure.js
// Sizes for the stacked fractions in parts.jsx, kept out of the component file
// so React's fast refresh still works there.
export const r1 = (n) => Math.round(n * 10) / 10

/** Width of a stacked fraction (parts.jsx Frac) at digit size `size`. */
export const fracWidth = (top, bottom, size) => Math.max(String(top).length, String(bottom).length) * size * 0.62 + size * 0.25

/** Width of a mixed number (parts.jsx Mixed) at size `size`. */
export const mixedWidth = (whole, top, bottom, size) =>
  String(whole).length * size * 1.45 * 0.6 + fracWidth(top, bottom, size * 0.62) + size * 0.04
