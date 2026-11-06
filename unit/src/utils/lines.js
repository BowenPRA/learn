// src/utils/lines.js
//
// Straight lines on a window of the coordinate plane — the geometry behind
// components/math/CoordGrid.jsx, the Inequalities task's regions, and the
// Simultaneous task's "the answer is where the lines cross" picture.
//
// A line is { a, b, c } meaning a·x + b·y = c. A half-plane adds `rel`
// ('<', '<=', '>', '>='): the points where a·x + b·y rel c.

/** Clip a convex polygon to a·x + b·y ≤ c (Sutherland–Hodgman, one edge). */
function clip(poly, a, b, c) {
  const out = [];
  const f = ([x, y]) => a * x + b * y - c;
  for (let i = 0; i < poly.length; i += 1) {
    const P = poly[i];
    const Q = poly[(i + 1) % poly.length];
    const fp = f(P);
    const fq = f(Q);
    if (fp <= 1e-9) out.push(P);
    if ((fp < -1e-9 && fq > 1e-9) || (fp > 1e-9 && fq < -1e-9)) {
      const t = fp / (fp - fq);
      out.push([P[0] + t * (Q[0] - P[0]), P[1] + t * (Q[1] - P[1])]);
    }
  }
  return out;
}

/** The part of the window where every half-plane holds, as a polygon. */
export function regionPolygon(window, region) {
  const { xMin, xMax, yMin, yMax } = window;
  let poly = [[xMin, yMin], [xMax, yMin], [xMax, yMax], [xMin, yMax]];
  for (const { a, b, c, rel } of region || []) {
    // Everything becomes "≤": a·x + b·y ≥ c is −a·x − b·y ≤ −c.
    poly = rel === '>' || rel === '>=' ? clip(poly, -a, -b, -c) : clip(poly, a, b, c);
    if (!poly.length) break;
  }
  return poly;
}

/** Where a·x + b·y = c crosses the window's edge: two points, or null. */
export function lineEnds(window, { a, b, c }) {
  const { xMin, xMax, yMin, yMax } = window;
  const pts = [];
  const push = (x, y) => {
    if (x < xMin - 1e-9 || x > xMax + 1e-9 || y < yMin - 1e-9 || y > yMax + 1e-9) return;
    if (!pts.some(([p, q]) => Math.abs(p - x) < 1e-6 && Math.abs(q - y) < 1e-6)) pts.push([x, y]);
  };
  if (b !== 0) { push(xMin, (c - a * xMin) / b); push(xMax, (c - a * xMax) / b); }
  if (a !== 0) { push((c - b * yMin) / a, yMin); push((c - b * yMax) / a, yMax); }
  return pts.length >= 2 ? [pts[0], pts[pts.length - 1]] : null;
}

/** Polygon area (shoelace) — the validator refuses a region with none. */
export function polygonArea(poly) {
  let s = 0;
  for (let i = 0; i < poly.length; i += 1) {
    const [x1, y1] = poly[i];
    const [x2, y2] = poly[(i + 1) % poly.length];
    s += x1 * y2 - x2 * y1;
  }
  return Math.abs(s) / 2;
}
