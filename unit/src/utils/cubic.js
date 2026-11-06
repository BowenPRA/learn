// src/utils/cubic.js
//
// The derivation behind the Sketch It task (src/tasks/CubicSketch.jsx) and the
// `reflect` slide activity: everything a sketch of y = k(x − a)(x − b)(x − c)
// needs, from the factors alone.
//
// An item stores only the QUESTION:
//
//   { id, factors: [[p, q], [p, q], [p, q]], k: 1 }
//
// each factor being px + q, and `k` the number written in front. A repeated
// factor is written twice, so (x − 1)²(x + 1) is [[1, -1], [1, -1], [1, 1]].
// `display` carries the printed form when the book's differs (2 − x rather
// than −x + 2), and `expanded` the polynomial as printed when the question is
// "factorise, then sketch".
//
// Everything else — the x-intercepts and their multiplicity, the y-intercept,
// the end behaviour, which pieces of the curve lie below the axis (the pieces
// the modulus reflects) and the sketch window — is derived here, so there is no
// answer key to author and `npm run validate` checks an item with the code the
// task grades with. Exact arithmetic for anything the student types: roots and
// intercepts are fractions {n, d}; only the drawing uses decimals.

import { polyMul, polyScale, evaluate, polyLatex } from './polynomial.js';
import { frac, fneg, fdiv, fmul, feq, fcmp, fnum, fracLatex, F } from './modulus.js';
import { compileExpr } from './mathEquivalence.js';

/** The product k(p₁x + q₁)(p₂x + q₂)(p₃x + q₃), descending coefficients. */
export function expandCubic(item) {
  const k = item.k ?? 1;
  const prod = item.factors.reduce((acc, [p, q]) => polyMul(acc, [p, q]), [1]);
  return polyScale(prod, k);
}

/** Root of px + q = 0, as a fraction. */
export const rootOf = ([p, q]) => fdiv(fneg(frac(q)), frac(p));

/**
 * The distinct roots, ascending, each with its multiplicity — the thing the
 * sketch turns on: an odd multiplicity crosses the axis, an even one touches.
 */
export function rootsOf(item) {
  const out = [];
  for (const f of item.factors) {
    const r = rootOf(f);
    const hit = out.find((o) => feq(o.x, r));
    if (hit) hit.mult += 1;
    else out.push({ x: r, mult: 1 });
  }
  out.sort((a, b) => fcmp(a.x, b.x));
  return out.map((o) => ({ ...o, touches: o.mult % 2 === 0 }));
}

/** The y-intercept: k × the product of the constants. */
export function yInterceptOf(item) {
  return item.factors.reduce((acc, [, q]) => fmul(acc, frac(q)), frac(item.k ?? 1));
}

/** The coefficient of x³: k × the product of the x coefficients. */
export const leadingOf = (item) => item.factors.reduce((acc, [p]) => acc * p, item.k ?? 1);

/** 'up' when y → +∞ as x → +∞ (positive k), else 'down'. */
export const endBehaviourOf = (item) => (leadingOf(item) > 0 ? 'up' : 'down');

/**
 * The pieces of the curve between consecutive distinct roots, plus the two
 * tails, each with the sign of y on it. The `below` ones are what the modulus
 * reflects — and they are what the sketch's shape IS: a cubic with positive k
 * climbs out of the bottom-left, so its left tail is always below.
 */
export function arcsOf(item) {
  const coeffs = expandCubic(item);
  const roots = rootsOf(item).map((r) => fnum(r.x));
  const bounds = [-Infinity, ...roots, Infinity];
  const arcs = [];
  for (let i = 0; i < bounds.length - 1; i += 1) {
    const lo = bounds[i];
    const hi = bounds[i + 1];
    const test = lo === -Infinity && hi === Infinity ? 0
      : lo === -Infinity ? hi - 1 : hi === Infinity ? lo + 1 : (lo + hi) / 2;
    const y = evaluate(coeffs, test);
    arcs.push({ i, lo, hi, below: y < 0, sign: Math.sign(y) });
  }
  return arcs;
}

/** The factorised form as LaTeX, unless the item prints its own. */
export function factorLatex(item) {
  if (item.display) return item.display;
  const k = item.k ?? 1;
  const parts = [];
  const seen = [];
  for (const f of item.factors) {
    const r = rootOf(f);
    const hit = seen.find((s) => feq(s.r, r) && s.p === f[0] && s.q === f[1]);
    if (hit) { hit.n += 1; continue; }
    seen.push({ r, p: f[0], q: f[1], n: 1 });
  }
  for (const s of seen) {
    const body = polyLatex([s.p, s.q]);
    // A one-term factor (x, 2x) needs no brackets: x²(x + 2), not (x)²(x + 2).
    const bare = s.q === 0;
    const wrapped = bare ? body : `(${body})`;
    parts.push(s.n > 1 ? `${wrapped}^{${s.n}}` : wrapped);
  }
  const pre = k === 1 ? '' : k === -1 ? '-' : String(k);
  return `${pre}${parts.join('')}`;
}

/** The expanded polynomial as LaTeX. */
export const expandedLatex = (item) => item.expanded || polyLatex(expandCubic(item));

/**
 * A window the whole sketch fits in — every intercept and every turning point,
 * with the tails leaving the top and bottom the way a book sketch leaves them.
 * Not square: a cubic's y values dwarf its x values, and a sketch is about
 * SHAPE and intercepts, not scale (the book draws no y scale at all).
 */
export function sketchWindow(item) {
  const coeffs = expandCubic(item);
  const roots = rootsOf(item).map((r) => fnum(r.x));
  const lo = Math.min(...roots, 0);
  const hi = Math.max(...roots, 0);
  const span = Math.max(hi - lo, 2);
  const xMin = lo - span * 0.45;
  const xMax = hi + span * 0.45;
  // The tallest thing inside the roots and the y-intercept decide the height.
  let yMax = Math.abs(fnum(yInterceptOf(item)));
  const a = Math.min(...roots);
  const b = Math.max(...roots);
  for (let i = 0; i <= 200; i += 1) {
    const x = a + ((b - a) * i) / 200;
    yMax = Math.max(yMax, Math.abs(evaluate(coeffs, x)));
  }
  yMax = Math.max(yMax * 1.35, 1);
  return { xMin, xMax, yMin: -yMax, yMax, coeffs };
}

/**
 * The curve sampled inside a window, one path per arc, with each path split
 * where it leaves the window. `absolute` folds the negative pieces up — the
 * modulus graph.
 */
export function samplePaths(item, win, { absolute = false, steps = 320 } = {}) {
  const { coeffs, xMin, xMax, yMin, yMax } = win;
  const arcs = arcsOf(item);
  const out = [];
  for (const arc of arcs) {
    const lo = Math.max(xMin, arc.lo);
    const hi = Math.min(xMax, arc.hi);
    if (!(hi > lo)) { out.push({ ...arc, points: [] }); continue; }
    const points = [];
    for (let i = 0; i <= steps; i += 1) {
      const x = lo + ((hi - lo) * i) / steps;
      let y = evaluate(coeffs, x);
      if (absolute) y = Math.abs(y);
      points.push([x, Math.max(yMin, Math.min(yMax, y)), y >= yMin && y <= yMax]);
    }
    out.push({ ...arc, points });
  }
  return out;
}

/* ------------------------------------------------------------ authoring */

/**
 * Everything an authored item must satisfy to be answerable on screen.
 * Returns a list of problems, empty when the item is sound.
 */
export function checkCubicItems(items = []) {
  const problems = [];
  const seen = new Set();
  const isInt = (v) => typeof v === 'number' && Number.isInteger(v);
  for (const it of items) {
    const at = it?.id || '(no id)';
    if (!it?.id) problems.push('an item has no id');
    else if (seen.has(it.id)) problems.push(`${at}: duplicate id`);
    seen.add(it?.id);
    if (!Array.isArray(it?.factors) || it.factors.length !== 3) { problems.push(`${at}: needs exactly three linear factors`); continue; }
    if (!it.factors.every((f) => Array.isArray(f) && f.length === 2 && f.every(isInt))) { problems.push(`${at}: each factor must be [p, q] integers`); continue; }
    if (it.factors.some(([p]) => p === 0)) { problems.push(`${at}: a factor with p = 0 is a constant, not a linear factor`); continue; }
    if (it.k !== undefined && (!isInt(it.k) || it.k === 0)) { problems.push(`${at}: k must be a non-zero integer`); continue; }
    const roots = rootsOf(it);
    if (roots.length < 2) problems.push(`${at}: a triple root — the syllabus sketches curves with two or three distinct roots`);
    const arcs = arcsOf(it);
    if (!arcs.some((a) => a.below)) problems.push(`${at}: no part of the curve is below the axis — impossible for a cubic, check the factors`);
    if (it.expanded && typeof it.expanded !== 'string') problems.push(`${at}: expanded must be a LaTeX string`);
    // The printed polynomial and the factors are two copies of one fact, and
    // a wrong factorisation LOOKS right in the data. Multiply the factors out
    // and test the printed form against them at a few points.
    if (typeof it.expanded === 'string') {
      try {
        const { fn } = compileExpr(it.expanded);
        const coeffs = expandCubic(it);
        for (const x of [0.5, 1.7, -2.3, 3.1, -0.4]) {
          const want = evaluate(coeffs, x);
          if (Math.abs(fn({ x }) - want) > 1e-6 * (1 + Math.abs(want))) {
            problems.push(`${at}: expanded "${it.expanded}" is not the product of the factors (${polyLatex(coeffs)})`);
            break;
          }
        }
      } catch (e) {
        problems.push(`${at}: expanded "${it.expanded}" could not be read as an expression — ${e.message}`);
      }
    }
    // The typed roots are matched against \dfrac forms; the equivalence engine
    // reads those, but a root with a huge denominator is not something a
    // student would ever be asked to type.
    for (const r of roots) if (F(r.x).d > 12) problems.push(`${at}: root ${fracLatex(r.x)} has an unreasonable denominator`);
  }
  return problems;
}
