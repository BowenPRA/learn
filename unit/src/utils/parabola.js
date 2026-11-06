/**
 * Vertex-form parabola helpers, in one place.
 *
 * A curve is `{ a, h, k }`, meaning y = a(x − h)² + k. Both the Graph It task
 * and the content validator read the vertex and the zeros from here rather than
 * from anything an author typed, so an answer key cannot drift away from the
 * equation it is supposed to describe.
 */

/** The turning point of y = a(x − h)² + k. */
export const vertexOf = ({ h, k }) => [h, k];

/** Real roots of a(x − h)² + k = 0, left to right. Empty when it misses the axis. */
export function rootsOf({ a, h, k }) {
  if (!a) return [];
  const inside = -k / a;
  if (inside < 0) return [];
  const r = Math.sqrt(inside);
  return r === 0 ? [h] : [h - r, h + r];
}

/** y at a given x, for checking that an authored point is really on the curve. */
export const yAt = ({ a, h, k }, x) => a * (x - h) * (x - h) + k;
