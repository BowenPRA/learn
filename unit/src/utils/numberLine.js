// src/utils/numberLine.js
//
// The pure half of the tappable number line (src/components/math/NumberLineSVG.jsx):
// how endpoints cut the line into regions, and how a shading mark decides
// which region is shaded. One rule for the drawing, the tap handler and the
// marking, so what looks shaded and what is scored cannot come apart.

import { NEG_INF, POS_INF } from './interval.js';

/** Is a shading mark inside (lo, hi)? */
export const markInside = (m, lo, hi) => (lo === NEG_INF || m > lo) && (hi === POS_INF || m < hi);

/** The value that stands for a region once it is shaded. */
export const repOf = (lo, hi, min, max) =>
  lo === NEG_INF && hi === POS_INF ? 0
    : lo === NEG_INF ? min - 0.5
      : hi === POS_INF ? max + 0.5
        : (lo + hi) / 2;

/**
 * The regions the points cut the line into, with their shading. `marks` are
 * representative x-values, one per shaded region, rather than indices — an
 * index means something different the moment an endpoint moves.
 */
export function regionsOf(points, marks, min, max) {
  const sorted = [...points].sort((a, b) => a.x - b.x);
  const bounds = [{ x: NEG_INF }, ...sorted, { x: POS_INF }];
  const out = [];
  for (let i = 0; i < bounds.length - 1; i += 1) {
    const lo = bounds[i].x;
    const hi = bounds[i + 1].x;
    out.push({
      i, lo, hi,
      loDraw: lo === NEG_INF ? min - 0.6 : lo,
      hiDraw: hi === POS_INF ? max + 0.6 : hi,
      rep: repOf(lo, hi, min, max),
      shaded: marks.some((m) => markInside(m, lo, hi)),
    });
  }
  return out;
}
