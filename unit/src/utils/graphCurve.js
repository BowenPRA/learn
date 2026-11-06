/**
 * The curves the Graph It task can ask a student to plot, in one place.
 *
 * A curve is `{ kind, a, h, k }`. `kind` defaults to `'quadratic'`, so every
 * item authored before this file existed keeps working untouched:
 *
 *   quadratic   y = a(x − h)² + k
 *   modulus     y = a|x − h| + k
 *
 * The letters mean the same thing in both — **(h, k) is the vertex and `a` is
 * the stretch** — which is not a coincidence worth hiding. It is also why the
 * two kinds share one `levelOf`: solving either for a horizontal line comes
 * down to `(level − k) / a`, and the only difference is whether you take a
 * square root of it or not.
 *
 * Both the task and the content validator read every answer from here rather
 * than from anything an author typed, so an answer key cannot drift away from
 * the equation it is supposed to describe.
 */

/** The kinds an item may declare. */
export const CURVE_KINDS = ['quadratic', 'modulus'];

/** A curve with no `kind` is a parabola — that is what every older item is. */
export const kindOf = (curve) => curve?.kind || 'quadratic';

/** The turning point. Same for both kinds: the vertex is (h, k) by construction. */
export const vertexOf = ({ h, k }) => [h, k];

/** y at a given x, for checking that an authored point is really on the curve. */
export function yAt(curve, x) {
  const { a, h, k } = curve;
  const d = x - h;
  return kindOf(curve) === 'modulus' ? a * Math.abs(d) + k : a * d * d + k;
}

/**
 * The x values where the curve meets the horizontal line y = `level`, left to
 * right. Empty when it never reaches that line, one value when the line just
 * touches the vertex, otherwise two.
 *
 * `inside` is what `|x − h|` (or `(x − h)²`) has to equal. A negative one means
 * the line is on the wrong side of the vertex and there is nothing to find —
 * which is exactly the fact behind "a modulus is never negative", and worth an
 * item of its own.
 */
export function levelOf(curve, level = 0) {
  const { a, h, k } = curve;
  if (!a) return [];
  const inside = (level - k) / a;
  if (inside < 0) return [];
  const r = kindOf(curve) === 'modulus' ? inside : Math.sqrt(inside);
  return r === 0 ? [h] : [h - r, h + r];
}

/** Where the curve crosses the x-axis: the level-0 case. */
export const rootsOf = (curve) => levelOf(curve, 0);
