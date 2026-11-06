// src/utils/lineLab.js
//
// Straight lines on the coordinate plane — the pure parts behind the Line Lab
// task (src/tasks/LineLab.jsx) and the `line` activity in a Notes deck
// (src/components/notes/LineActivity.jsx). Built for the AOPS lines units
// (LINE_1A–1C), which follow the book's chapter on graphing lines.
//
// THE RULE (same as graphCurve.js, simultaneous.js, inequalities.js): an item
// stores the QUESTION — named points, and lines written the way the book
// writes them — and every answer is derived here, with exact fractions. An
// author cannot type a wrong slope, midpoint or intercept, and an edit to an
// equation cannot leave a stale answer behind. `checkLineLabItems` refuses an
// item a student could not finish on the screen: a click target between the
// lattice points or off the grid, two lines that meet off the grid, a line
// with too few lattice points to place.
//
// AN ITEM
//   {
//     id, prompt, promptVn,                 // the problem, markdown + $KaTeX$
//     grid: { xMin, xMax, yMin, yMax },     // whole numbers; default −8..8
//     points: { A: [-3, -5], B: [5, 1] },   // numbers, or strings like '1/2'
//     lines: {
//       L: '2x - y = 6',                    // an equation, printed as written
//       M: { through: ['A', 'B'] },         // two named points
//       N: { through: 'A', slope: '-1/4' }, // a point and a slope ('undefined' = upright)
//     },
//     show: ['A', 'L'],                     // drawn before the first step
//     hideLabels: ['L'],                    // drawn without its equation (read-it items)
//     steps: [ … ],                         // below
//   }
//
// CLICK STEPS — the student places points on the lattice:
//   { kind: 'plot', points: ['A', 'B'] }            plot named points
//   { kind: 'on', line: 'L', count: 3, exclude? }   any `count` lattice points on L
//   { kind: 'xint' | 'yint', line: 'L', name? }     where L crosses an axis
//   { kind: 'at', line: 'L', x: 4, name? }          the point on L with this x (or y)
//   { kind: 'corner', from: 'A', to: 'B', name }    the right-angle corner (B's x, A's y)
//   { kind: 'midpoint', of: ['P', 'Q'], name }
//   { kind: 'divide', from: 'P', to: 'Q', ratio: [1, 2], name }   PT : TQ = 1 : 2
//   { kind: 'extend', from: 'P', through: 'Q', name }   T with Q the midpoint of PT
//   { kind: 'meet', lines: ['L', 'M'], name? }      the crossing, or "never" / "same line"
//
// TYPED STEPS — the student types a value:
//   { kind: 'type', ask: 'slope', line } | { … ask: 'slope', from, to }
//   { kind: 'type', ask: 'run' | 'rise', from, to, abs? }   change in x / y (abs → a length)
//   { kind: 'type', ask: 'distance', from, to }             exact: 10, √117, 3√13/2
//   { kind: 'type', ask: 'xint' | 'yint', line }            the crossing's coordinate
//   { kind: 'type', ask: 'xAt', line, y } | { ask: 'yAt', line, x }
//   { kind: 'type', ask: 'midpoint', of: [P, Q] } | { ask: 'divide', from, to, ratio }   two boxes
//   { kind: 'equation', line: 'L', form: 'standard' | 'slope' | 'any' }
//   { kind: 'relation', lines: ['L', 'M'] }        parallel / perpendicular / same line / neither
//
// Any step may carry `say` / `sayVn` to replace the screen's own instruction.
// A step that makes a point (corner, midpoint, divide, meet, xint, yint, at)
// may `name` it, and later steps can then refer to it by that name.
//
// A LINE is kept as whole numbers { a, b, c } meaning a·x + b·y = c, with no
// common factor and a > 0 (or a = 0 and b > 0) — the book's standard form.
// That one shape answers every question: the slope is −a/b, upright when
// b = 0; two lines are parallel when a₁b₂ = a₂b₁, perpendicular when
// a₁a₂ + b₁b₂ = 0.

import { parseStatement, linearValue, sideLatex, tidyLatex } from './simultaneous.js';
import { fr, add, sub, mul, div, isZero, frEq, toNumber } from './linearEquation.js';

export const DEFAULT_GRID = { xMin: -8, xMax: 8, yMin: -8, yMax: 8 };

export const CLICK_KINDS = ['plot', 'on', 'xint', 'yint', 'at', 'corner', 'midpoint', 'divide', 'extend', 'meet'];
export const TYPE_ASKS = ['slope', 'run', 'rise', 'distance', 'xint', 'yint', 'xAt', 'yAt', 'midpoint', 'divide'];
export const STEP_KINDS = [...CLICK_KINDS, 'type', 'equation', 'relation'];
export const RELATIONS = ['parallel', 'perpendicular', 'same', 'neither'];

// ------------------------------------------------------------------ numbers

const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const lcm = (a, b) => (a && b ? Math.abs(a * b) / gcd(a, b) : Math.abs(a || b));

/** A typed or authored number: 3, -2, 2.5, "7/3", "−7/5", "2 1/3". Null if it is not one. */
export function parseNum(v) {
  if (typeof v === 'number') return Number.isFinite(v) ? fr(v) : null;
  const s = String(v ?? '').trim().replace(/[−–—]/g, '-').replace(/^\+/, '').replace(/\s+/g, ' ');
  if (!s) return null;
  let m = s.match(/^(-?)(\d+) (\d+)\/(\d+)$/);            // mixed number
  if (m) {
    if (Number(m[4]) === 0) return null;
    const f = add(fr(Number(m[2])), fr(Number(m[3]), Number(m[4])));
    return m[1] ? fr(-f.n, f.d) : f;
  }
  m = s.replace(/ /g, '').match(/^(-?)\(?(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)\)?$/);
  if (m) {
    if (Number(m[3]) === 0) return null;
    const f = div(fr(Number(m[2])), fr(Number(m[3])));
    return m[1] ? fr(-f.n, f.d) : f;
  }
  if (/^-?\d+(\.\d+)?$/.test(s.replace(/ /g, ''))) return fr(Number(s.replace(/ /g, '')));
  return null;
}

const F = (v) => {
  const f = parseNum(v);
  if (!f) throw new Error(`"${v}" is not a number`);
  return f;
};
const num = (f) => toNumber(f);
const isInt = (f) => f.d === 1;

/** "3", "-2", "\dfrac{9}{4}", "-\dfrac{1}{2}". */
export function frTex(f) {
  if (f.d === 1) return String(f.n);
  return `${f.n < 0 ? '-' : ''}\\dfrac{${Math.abs(f.n)}}{${f.d}}`;
}
/** Plain text for SVG labels and flags: "3", "−2", "−7/5". */
export function frText(f) {
  const body = f.d === 1 ? String(Math.abs(f.n)) : `${Math.abs(f.n)}/${f.d}`;
  return f.n < 0 ? `−${body}` : body;
}
/** What a student would type for a value: "-7/5". */
export const frTyped = (f) => (f.d === 1 ? String(f.n) : `${f.n}/${f.d}`);

export const ptTex = ([x, y]) => `(${frTex(x)}, ${frTex(y)})`;
export const ptText = ([x, y]) => `(${frText(x)}, ${frText(y)})`;
export const samePt = (p, q) => frEq(p[0], q[0]) && frEq(p[1], q[1]);
/** A lattice point from the grid (plain numbers) as fractions. */
export const frPt = ([x, y]) => [fr(x), fr(y)];
export const numPt = ([x, y]) => [num(x), num(y)];
export const isLattice = ([x, y]) => isInt(x) && isInt(y);

// ------------------------------------------------------------------ lines

/** Whole numbers, no common factor, a > 0 (or a = 0 and b > 0). */
function canon(fa, fb, fc) {
  const den = [fa.d, fb.d, fc.d].reduce(lcm, 1);
  let a = fa.n * (den / fa.d);
  let b = fb.n * (den / fb.d);
  let c = fc.n * (den / fc.d);
  if (!a && !b) throw new Error('that is not a line — both x and y have gone');
  const g = gcd(gcd(a, b), c) || 1;
  a /= g; b /= g; c /= g;
  if (a < 0 || (a === 0 && b < 0)) { a = -a; b = -b; c = -c; }
  return { a: a + 0, b: b + 0, c: c + 0 };
}

/**
 * An equation's written sides and its line. Only x and y may appear; a
 * product of letters, a letter underneath a fraction bar, or an equation with
 * no letters at all is refused with a reason a student could read.
 */
export function parseLine(src) {
  const text = String(src ?? '').toLowerCase().replace(/[·×]/g, '*').replace(/÷/g, '/');
  const sides = parseStatement(text);
  if (sides.length !== 2) throw new Error('write one equals sign');
  const L = linearValue(sides[0]);
  const R = linearValue(sides[1]);
  for (const k of [...Object.keys(L), ...Object.keys(R)]) {
    if (k !== 'c' && k !== 'x' && k !== 'y') throw new Error(`use x and y — "${k}" is not one of them`);
  }
  const z = fr(0);
  const a = sub(L.x || z, R.x || z);
  const b = sub(L.y || z, R.y || z);
  const c = sub(R.c, L.c);
  return { sides, line: canon(a, b, c), tex: `${sideLatex(sides[0])} = ${sideLatex(sides[1])}` };
}

/** The line through two points. */
export function lineThrough(P, Q) {
  if (samePt(P, Q)) throw new Error('the two points are the same point');
  const a = sub(Q[1], P[1]);
  const b = sub(P[0], Q[0]);
  const c = add(mul(a, P[0]), mul(b, P[1]));
  return canon(a, b, c);
}

/** The line through P with slope m (a fraction), or upright when m is null. */
export function lineWithSlope(P, m) {
  if (m === null) return canon(fr(1), fr(0), P[0]);
  // y − y₁ = m(x − x₁)  →  m·x − y = m·x₁ − y₁
  return canon(m, fr(-1), sub(mul(m, P[0]), P[1]));
}

/** Is the point on the line? Exact. */
export const onLine = (ln, [x, y]) => frEq(add(mul(fr(ln.a), x), mul(fr(ln.b), y)), fr(ln.c));

/** Slope as a fraction, or null for an upright line. */
export const slopeOf = (ln) => (ln.b === 0 ? null : fr(-ln.a, ln.b));

/** Where the line meets the y-axis (x = 0), as a y value; null if it never does. */
export const yIntOf = (ln) => (ln.b === 0 ? null : fr(ln.c, ln.b));
/** Where the line meets the x-axis (y = 0), as an x value; null if it never does. */
export const xIntOf = (ln) => (ln.a === 0 ? null : fr(ln.c, ln.a));

/** y on the line at this x (null for an upright line); x at this y (null for a flat one). */
export const yAtX = (ln, x) => (ln.b === 0 ? null : div(sub(fr(ln.c), mul(fr(ln.a), x)), fr(ln.b)));
export const xAtY = (ln, y) => (ln.a === 0 ? null : div(sub(fr(ln.c), mul(fr(ln.b), y)), fr(ln.a)));

export const sameLine = (p, q) => p.a === q.a && p.b === q.b && p.c === q.c;

/** How two lines sit: 'same', 'parallel', 'perpendicular' or 'neither'. */
export function relationOf(p, q) {
  if (sameLine(p, q)) return 'same';
  if (p.a * q.b === q.a * p.b) return 'parallel';
  if (p.a * q.a + p.b * q.b === 0) return 'perpendicular';
  return 'neither';
}

/** The crossing point of two lines, or { verdict: 'parallel' | 'same' }. */
export function meetOf(p, q) {
  const det = p.a * q.b - q.a * p.b;
  if (det === 0) return { verdict: sameLine(p, q) ? 'same' : 'parallel' };
  const x = fr(p.c * q.b - q.c * p.b, det);
  const y = fr(p.a * q.c - q.a * p.c, det);
  return { point: [x, y] };
}

/** Every lattice point of the line inside the grid, left to right (bottom to top if upright). */
export function latticeOn(ln, grid) {
  const out = [];
  if (ln.b === 0) {
    const x = fr(ln.c, ln.a);
    if (!isInt(x) || x.n < grid.xMin || x.n > grid.xMax) return out;
    for (let y = grid.yMin; y <= grid.yMax; y += 1) out.push([x.n, y]);
    return out;
  }
  for (let x = grid.xMin; x <= grid.xMax; x += 1) {
    const y = yAtX(ln, fr(x));
    if (isInt(y) && y.n >= grid.yMin && y.n <= grid.yMax) out.push([x, y.n]);
  }
  return out;
}

export const midpointOf = (P, Q) => [div(add(P[0], Q[0]), fr(2)), div(add(P[1], Q[1]), fr(2))];

/** T on PQ with PT : TQ = m : n. */
export function dividePoint(P, Q, [m, n]) {
  const t = fr(m, m + n);
  return [add(P[0], mul(t, sub(Q[0], P[0]))), add(P[1], mul(t, sub(Q[1], P[1])))];
}

/** Squared distance, exact. */
export const dist2 = (P, Q) => {
  const dx = sub(Q[0], P[0]);
  const dy = sub(Q[1], P[1]);
  return add(mul(dx, dx), mul(dy, dy));
};

/** √n for a whole n as k√r with r square-free: 117 → [3, 13]. */
function splitRoot(n) {
  let k = 1;
  let r = n;
  for (let f = 2; f * f <= r; f += 1) {
    while (r % (f * f) === 0) { r /= f * f; k *= f; }
  }
  return [k, r];
}

/** An exact square root as KaTeX: 10, \sqrt{13}, 3\sqrt{13}, \dfrac{3\sqrt{13}}{2}. */
export function sqrtTex(d2) {
  // √(p/q) = √(p·q) / q, then k√r / q with the common factor of k and q cancelled.
  const [k, r] = splitRoot(d2.n * d2.d);
  if (r === 1) return frTex(fr(k, d2.d));
  const g = gcd(k, d2.d);
  const kk = k / g;
  const dd = d2.d / g;
  const top = `${kk === 1 ? '' : kk}\\sqrt{${r}}`;
  return dd === 1 ? top : `\\dfrac{${top}}{${dd}}`;
}
export const sqrtText = (d2) => sqrtTex(d2).replace(/\\dfrac\{(.*)\}\{(\d+)\}/, '$1/$2').replace(/\\sqrt\{(\d+)\}/g, '√$1');

/**
 * A typed length: "10", "√117", "sqrt(117)", "3√13", "3 sqrt 13", "3√13/2",
 * or a decimal. Returns { sq } — the exact square of what was typed — or
 * { approx } for a decimal, or null.
 */
export function parseRoot(s) {
  const t = String(s ?? '').toLowerCase().replace(/\s+/g, '').replace(/\*/g, '')
    .replace(/sqrt/g, '√').replace(/√\((\d+)\)/g, '√$1');
  if (!t) return null;
  const m = t.match(/^(\d+)?(?:√(\d+))?(?:\/(\d+))?$/);
  if (m && (m[1] || m[2])) {
    const k = m[1] ? Number(m[1]) : 1;
    const r = m[2] ? Number(m[2]) : 1;
    const d = m[3] ? Number(m[3]) : 1;
    if (!d) return null;
    return { sq: fr(k * k * r, d * d) };
  }
  if (/^\d*\.\d+$/.test(t)) return { approx: Number(t) };
  return null;
}

// ------------------------------------------------------------------ how a line is written

/** "y = -\dfrac{1}{4}x + \dfrac{1}{4}", "y = 3", "x = -2". */
export function slopeInterceptTex(ln) {
  if (ln.b === 0) return `x = ${frTex(fr(ln.c, ln.a))}`;
  const m = slopeOf(ln);
  const k = yIntOf(ln);
  if (isZero(m)) return `y = ${frTex(k)}`;
  const mt = m.d === 1
    ? (m.n === 1 ? '' : m.n === -1 ? '-' : String(m.n))
    : `${m.n < 0 ? '-' : ''}\\dfrac{${Math.abs(m.n)}}{${m.d}}`;
  const kt = isZero(k) ? '' : ` ${k.n < 0 ? '-' : '+'} ${frTex(fr(Math.abs(k.n), k.d))}`;
  return `y = ${mt}x${kt}`;
}

/** "5x - y = 2" — the book's standard form. */
export const standardTex = (ln) => tidyLatex(ln, ['x', 'y']);

/** KaTeX → the plain text an SVG label can hold. */
export function texToText(tex) {
  return String(tex)
    .replace(/\\dfrac\{([^{}]*)\}\{([^{}]*)\}/g, '$1/$2')
    .replace(/\\sqrt\{([^{}]*)\}/g, '√$1')
    .replace(/\\times/g, '×')
    .replace(/-/g, '−')
    .replace(/\s+/g, ' ')
    .trim();
}

// ------------------------------------------------------------------ typed equations

/** A linear side made only of k·x and k·y with whole k, x first: [{ v, k }] or null. */
function monomials(node) {
  const terms = node.t === 'sum' ? node.terms : [{ sign: 1, node }];
  const out = [];
  for (const { sign, node: n } of terms) {
    let v = null;
    let k = null;
    if (n.t === 'var') { v = n.v; k = 1; }
    else if (n.t === 'mul' && !n.explicit && n.a.t === 'num' && n.b.t === 'var' && /^\d+$/.test(n.a.v)) { v = n.b.v; k = Number(n.a.v); }
    if (!v) return null;
    out.push({ v, k: sign * k });
  }
  return out;
}
/** A side that is one whole number, possibly negative. */
function wholeNumber(node) {
  if (node.t === 'num' && /^\d+$/.test(node.v)) return Number(node.v);
  if (node.t === 'sum' && node.terms.length === 1 && node.terms[0].node.t === 'num' && /^\d+$/.test(node.terms[0].node.v)) {
    return node.terms[0].sign * Number(node.terms[0].node.v);
  }
  if (node.t === 'neg' && node.a.t === 'num' && /^\d+$/.test(node.a.v)) return -Number(node.a.v);
  return null;
}

/** Is the written equation y = (no y) — slope-intercept form? */
export function isSlopeForm(sides) {
  const [l, r] = sides;
  const bare = (n) => n.t === 'var' && n.v === 'y';
  const noY = (n) => { const V = linearValue(n); return !V.y || isZero(V.y); };
  return (bare(l) && noY(r)) || (bare(r) && noY(l));
}

/** Is it written Ax + By = C, whole numbers, no common factor, A > 0 — exactly the canonical line? */
export function isStandardForm(sides, ln) {
  const terms = monomials(sides[0]);
  const c = wholeNumber(sides[1]);
  if (!terms || c === null) return false;
  const vs = terms.map((t) => t.v);
  if (new Set(vs).size !== vs.length || vs.some((v) => v !== 'x' && v !== 'y')) return false;
  if (vs.length === 2 && vs[0] !== 'x') return false;
  const a = terms.find((t) => t.v === 'x')?.k || 0;
  const b = terms.find((t) => t.v === 'y')?.k || 0;
  return a === ln.a && b === ln.b && c === ln.c;
}

/**
 * Mark a typed equation against a line. `form` 'standard' and 'slope' also
 * want it WRITTEN that way; a right line in the wrong form comes back as
 * { ok: false, sameLine: true } so the screen can say exactly that.
 */
export function judgeEquation(src, want, form = 'any') {
  let parsed;
  try { parsed = parseLine(src); } catch (e) { return { ok: false, error: e.message }; }
  if (!sameLine(parsed.line, want)) {
    const mine = parsed.line;
    return {
      ok: false,
      line: mine,
      sameSlope: mine.a * want.b === want.a * mine.b,
    };
  }
  if (form === 'standard' && !isStandardForm(parsed.sides, want)) return { ok: false, sameLine: true, line: parsed.line };
  if (form === 'slope' && !isSlopeForm(parsed.sides)) return { ok: false, sameLine: true, line: parsed.line };
  return { ok: true, line: parsed.line };
}

// ------------------------------------------------------------------ the model

const refList = (v) => (Array.isArray(v) ? v : v == null ? [] : [v]);

function lineFromSpec(spec, points) {
  if (typeof spec === 'string') {
    const p = parseLine(spec);
    return { ...p.line, tex: p.tex, sides: p.sides, given: true };
  }
  if (spec && Array.isArray(spec.through) && spec.through.length === 2) {
    const [P, Q] = spec.through.map((n) => pointRef(n, points));
    return { ...lineThrough(P, Q), through: spec.through };
  }
  if (spec && spec.through != null && spec.slope !== undefined) {
    const P = pointRef(spec.through, points);
    const m = spec.slope === 'undefined' || spec.slope === null ? null : F(spec.slope);
    return { ...lineWithSlope(P, m), from: spec.through, slope: m };
  }
  throw new Error('a line is an equation, { through: [P, Q] } or { through: P, slope }');
}

function pointRef(name, points) {
  if (Array.isArray(name)) return [F(name[0]), F(name[1])];
  const p = points[name];
  if (!p) throw new Error(`there is no point "${name}"`);
  return p;
}
function lineRef(name, lines) {
  const l = lines[name];
  if (!l) throw new Error(`there is no line "${name}"`);
  return l;
}

/**
 * Everything the screen needs for one step: what a right answer is, and — for
 * a step that makes a point — the point it makes.
 *
 *   click:   { mode: 'click', targets: [[x, y]…] (fractions) }
 *            { mode: 'click', on: line, count, exclude }            (an `on` step)
 *            { mode: 'click', targets: [], verdict: 'parallel'|'same' }  (a `meet` that never crosses)
 *   typed:   { mode: 'number', value }  { mode: 'slope', value (null = undefined) }
 *            { mode: 'root', sq }  { mode: 'pair', value: [x, y] }
 *            { mode: 'equation', line, form }  { mode: 'relation', value }
 */
export function answerOf(step, model) {
  const { points, lines } = model;
  const P = (n) => pointRef(n, points);
  const Ln = (n) => lineRef(n, lines);
  switch (step.kind) {
    case 'plot': return { mode: 'click', targets: refList(step.points).map(P) };
    case 'on': return { mode: 'click', on: Ln(step.line), count: step.count || 2, exclude: refList(step.exclude).map(P) };
    case 'xint': {
      const x = xIntOf(Ln(step.line));
      if (x === null) throw new Error(`line ${step.line} never meets the x-axis`);
      return { mode: 'click', targets: [[x, fr(0)]] };
    }
    case 'yint': {
      const y = yIntOf(Ln(step.line));
      if (y === null) throw new Error(`line ${step.line} never meets the y-axis`);
      return { mode: 'click', targets: [[fr(0), y]] };
    }
    case 'at': {
      const ln = Ln(step.line);
      if (step.x !== undefined) {
        const y = yAtX(ln, F(step.x));
        if (y === null) throw new Error(`line ${step.line} is upright, so x = ${step.x} is not one point`);
        return { mode: 'click', targets: [[F(step.x), y]] };
      }
      const x = xAtY(ln, F(step.y));
      if (x === null) throw new Error(`line ${step.line} is flat, so y = ${step.y} is not one point`);
      return { mode: 'click', targets: [[x, F(step.y)]] };
    }
    case 'corner': return { mode: 'click', targets: [[P(step.to)[0], P(step.from)[1]]] };
    case 'midpoint': return { mode: 'click', targets: [midpointOf(P(step.of[0]), P(step.of[1]))] };
    case 'divide': return { mode: 'click', targets: [dividePoint(P(step.from), P(step.to), step.ratio)] };
    case 'extend': {
      const A = P(step.from);
      const M = P(step.through);
      return { mode: 'click', targets: [[sub(mul(fr(2), M[0]), A[0]), sub(mul(fr(2), M[1]), A[1])]] };
    }
    case 'meet': {
      const m = meetOf(Ln(step.lines[0]), Ln(step.lines[1]));
      return m.point ? { mode: 'click', targets: [m.point] } : { mode: 'click', targets: [], verdict: m.verdict };
    }
    case 'type': {
      switch (step.ask) {
        case 'slope': {
          if (step.line) return { mode: 'slope', value: slopeOf(Ln(step.line)) };
          const A = P(step.from);
          const B = P(step.to);
          const run = sub(B[0], A[0]);
          return { mode: 'slope', value: isZero(run) ? null : div(sub(B[1], A[1]), run) };
        }
        case 'run':
        case 'rise': {
          const i = step.ask === 'run' ? 0 : 1;
          const d = sub(P(step.to)[i], P(step.from)[i]);
          return { mode: 'number', value: step.abs ? fr(Math.abs(d.n), d.d) : d };
        }
        case 'distance': return { mode: 'root', sq: dist2(P(step.from), P(step.to)) };
        case 'xint': {
          const x = xIntOf(Ln(step.line));
          if (x === null) throw new Error(`line ${step.line} never meets the x-axis`);
          return { mode: 'number', value: x };
        }
        case 'yint': {
          const y = yIntOf(Ln(step.line));
          if (y === null) throw new Error(`line ${step.line} never meets the y-axis`);
          return { mode: 'number', value: y };
        }
        case 'xAt': {
          const x = xAtY(Ln(step.line), F(step.y));
          if (x === null) throw new Error(`line ${step.line} is flat — no single x`);
          return { mode: 'number', value: x };
        }
        case 'yAt': {
          const y = yAtX(Ln(step.line), F(step.x));
          if (y === null) throw new Error(`line ${step.line} is upright — no single y`);
          return { mode: 'number', value: y };
        }
        case 'midpoint': return { mode: 'pair', value: midpointOf(P(step.of[0]), P(step.of[1])) };
        case 'divide': return { mode: 'pair', value: dividePoint(P(step.from), P(step.to), step.ratio) };
        default: throw new Error(`unknown ask "${step.ask}"`);
      }
    }
    case 'equation': return { mode: 'equation', line: Ln(step.line), form: step.form || 'any' };
    case 'relation': return { mode: 'relation', value: relationOf(Ln(step.lines[0]), Ln(step.lines[1])) };
    default: throw new Error(`unknown step kind "${step.kind}"`);
  }
}

/** The point a step makes, for naming — the single click target of a point-making step. */
function madePoint(step, ans) {
  if (!step.name) return null;
  if (ans.mode === 'click' && ans.targets?.length === 1 && step.kind !== 'plot') return ans.targets[0];
  if (ans.mode === 'pair') return ans.value;
  return null;
}

/**
 * The whole item, derived: its points (authored ones plus every point a step
 * names), its lines, and each step's answer. Throws with a reason when the
 * item cannot be built.
 */
export function modelOf(item) {
  const points = {};
  for (const [k, v] of Object.entries(item.points || {})) {
    if (!Array.isArray(v) || v.length !== 2) throw new Error(`point ${k} must be [x, y]`);
    points[k] = [F(v[0]), F(v[1])];
  }
  const lines = {};
  for (const [k, spec] of Object.entries(item.lines || {})) lines[k] = lineFromSpec(spec, points);
  // Points the student can see named on the grid: shown from the start, or
  // plotted or made (and named) by a step. The step wording only calls a line
  // "line AB" when both of its points are among these.
  const labelled = new Set(refList(item.show));
  for (const st of item.steps || []) {
    if (st.kind === 'plot') refList(st.points).forEach((n) => labelled.add(n));
    if (st.name) labelled.add(st.name);
  }
  const model = { points, lines, labelled, grid: { ...DEFAULT_GRID, ...(item.grid || {}) } };
  model.answers = (item.steps || []).map((st) => {
    const ans = answerOf(st, model);
    const made = madePoint(st, ans);
    if (made) points[st.name] = made;
    return ans;
  });
  return model;
}

/** Is a lattice point (plain numbers) a right answer for a click step? */
export function clickHits(ans, p, placed = []) {
  const q = frPt(p);
  if (ans.on) {
    if (!onLine(ans.on, q)) return false;
    if (ans.exclude.some((e) => samePt(e, q))) return false;
    return !placed.some((r) => r[0] === p[0] && r[1] === p[1]);
  }
  return ans.targets.some((t) => samePt(t, q)) && !placed.some((r) => r[0] === p[0] && r[1] === p[1]);
}
/** How many right points a click step wants. */
export const clickNeeds = (ans) => (ans.on ? ans.count : ans.targets.length);

/** A typed value against a number / slope answer. */
export function judgeNumber(typed, want) {
  const f = parseNum(typed);
  if (!f) return { ok: false, blank: !String(typed ?? '').trim() };
  return { ok: frEq(f, want), value: f };
}
/** A typed length against an exact square. */
export function judgeRoot(typed, sq) {
  const r = parseRoot(typed);
  if (!r) return { ok: false, blank: !String(typed ?? '').trim() };
  if (r.sq) return { ok: frEq(r.sq, sq), value: r.sq };
  const exact = Math.sqrt(num(sq));
  // A decimal is exact when the length is rational (13.0, or 2.5 for √(25/4));
  // for a root it can only ever be close, and the screen asks for the root.
  const [k, rest] = splitRoot(sq.n * sq.d);
  if (rest === 1) return { ok: Math.abs(r.approx - k / sq.d) < 1e-9, approx: r.approx };
  return { ok: false, near: Math.abs(r.approx - exact) < 0.006, approx: r.approx };
}

// ------------------------------------------------------------------ validation

/** Problems with the click-step answers of one step, as strings. */
function checkClick(step, ans, grid, at) {
  const out = [];
  const inGrid = ([x, y]) => num(x) >= grid.xMin && num(x) <= grid.xMax && num(y) >= grid.yMin && num(y) <= grid.yMax;
  if (ans.on) {
    const free = latticeOn(ans.on, grid).filter((p) => !ans.exclude.some((e) => samePt(e, frPt(p))));
    if (free.length < ans.count + 1) out.push(`${at}: line has only ${free.length} free lattice point(s) on the grid — the step asks for ${ans.count}, and there should be a spare`);
    return out;
  }
  for (const t of ans.targets) {
    if (!isLattice(t)) out.push(`${at}: target ${ptText(t)} is not a whole-number point, so it cannot be clicked — ask for it as a typed answer`);
    else if (!inGrid(t)) out.push(`${at}: target ${ptText(t)} is outside the grid`);
  }
  if (step.kind !== 'meet' && !ans.targets.length) out.push(`${at}: has nothing to click`);
  return out;
}

/** Problems with a list of Line Lab items, as strings. Empty when sound. */
export function checkLineLabItems(items, { bilingual = true, clickOnly = false } = {}) {
  const out = [];
  const ids = new Set();
  for (const [i, item] of (items || []).entries()) {
    const at = `item ${item?.id || i + 1}`;
    if (!item?.id) out.push(`${at}: needs an id`);
    if (ids.has(item?.id)) out.push(`${at}: duplicate id`);
    ids.add(item?.id);
    if (!item.prompt || (bilingual && !item.promptVn)) out.push(`${at}: needs a ${bilingual ? 'bilingual ' : ''}prompt`);
    const g = { ...DEFAULT_GRID, ...(item.grid || {}) };
    if (![g.xMin, g.xMax, g.yMin, g.yMax].every(Number.isInteger) || g.xMin >= 0 || g.xMax <= 0 || g.yMin >= 0 || g.yMax <= 0) {
      out.push(`${at}: grid must be whole numbers with both axes inside it`);
      continue;
    }
    if (g.xMax - g.xMin > 20 || g.yMax - g.yMin > 20) out.push(`${at}: grid is wider than 20 units — the squares get too small to click`);
    if (!(item.steps || []).length) { out.push(`${at}: has no steps`); continue; }
    let model;
    try { model = modelOf(item); } catch (e) { out.push(`${at}: ${e.message}`); continue; }
    const inGrid = ([x, y]) => num(x) >= g.xMin && num(x) <= g.xMax && num(y) >= g.yMin && num(y) <= g.yMax;

    for (const name of refList(item.show)) {
      if (model.points[name]) { if (!inGrid(model.points[name])) out.push(`${at}: shown point ${name} is off the grid`); }
      else if (!model.lines[name]) out.push(`${at}: show names "${name}", which is neither a point nor a line`);
    }
    for (const name of refList(item.hideLabels)) if (!model.lines[name]) out.push(`${at}: hideLabels names "${name}", which is not a line`);
    for (const [k, ln] of Object.entries(model.lines)) {
      if (!latticeOn(ln, g).length && !xIntOf(ln) && !yIntOf(ln)) out.push(`${at}: line ${k} does not cross the grid`);
    }

    item.steps.forEach((st, j) => {
      const sat = `${at} step ${j + 1} (${st.kind}${st.ask ? ` ${st.ask}` : ''})`;
      if (!STEP_KINDS.includes(st.kind)) { out.push(`${sat}: unknown kind — ${STEP_KINDS.join('/')}`); return; }
      if (clickOnly && !CLICK_KINDS.includes(st.kind)) { out.push(`${sat}: only click steps can sit in an activity`); return; }
      if ((st.say && bilingual && !st.sayVn) || (st.sayVn && !st.say)) out.push(`${sat}: say needs both say and sayVn`);
      const ans = model.answers[j];
      if (ans.mode === 'click') out.push(...checkClick(st, ans, g, sat));
      if (st.kind === 'on' && !(Number.isInteger(st.count) && st.count >= 1 && st.count <= 4)) out.push(`${sat}: count must be 1–4`);
      if (st.kind === 'divide' || st.ask === 'divide') {
        if (!Array.isArray(st.ratio) || st.ratio.length !== 2 || !st.ratio.every((n) => Number.isInteger(n) && n > 0)) out.push(`${sat}: ratio must be two positive whole numbers`);
      }
      if (st.kind === 'type' && !TYPE_ASKS.includes(st.ask)) out.push(`${sat}: ask must be one of ${TYPE_ASKS.join('/')}`);
      if ((st.ask === 'distance' || st.ask === 'run' || st.ask === 'rise' || st.ask === 'slope') && st.from && st.to && st.from === st.to) out.push(`${sat}: from and to are the same point`);
      if (st.kind === 'equation') {
        if (!['standard', 'slope', 'any'].includes(st.form || 'any')) out.push(`${sat}: form must be standard, slope or any`);
        if (st.form === 'slope' && ans.line.b === 0) out.push(`${sat}: an upright line has no slope-intercept form`);
        // The engine must accept its own answer, written both ways.
        const std = standardTex(ans.line).replace(/\\dfrac\{(\d+)\}\{(\d+)\}/g, '$1/$2');
        if (!judgeEquation(std, ans.line, st.form === 'slope' ? 'any' : st.form).ok) out.push(`${sat}: does not accept its own standard form ${std}`);
        if (ans.line.b !== 0) {
          const si = slopeInterceptTex(ans.line).replace(/\\dfrac\{(\d+)\}\{(\d+)\}/g, '($1/$2)');
          if (!judgeEquation(si, ans.line, st.form === 'standard' ? 'any' : st.form).ok) out.push(`${sat}: does not accept its own slope form ${si}`);
        }
      }
      if (st.kind === 'meet' && ans.verdict === 'same') out.push(`${sat}: the two lines are the same line — ask it with a relation step instead`);
    });
  }
  return out;
}

/** The single step of a Notes `line` activity, checked like a Line Lab item. */
export function checkLineActivity(a, { bilingual = true } = {}) {
  if (!a.step) return ['line activity needs a step'];
  const item = { id: a.id || 'line', prompt: a.prompt, promptVn: a.promptVn, grid: a.grid, points: a.points, lines: a.lines, show: a.show, hideLabels: a.hideLabels, steps: [a.step] };
  return checkLineLabItems([item], { bilingual, clickOnly: true }).map((p) => p.replace(/^item \S+ /, ''));
}
