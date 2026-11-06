// src/utils/modulus.js
//
// The derivation behind the Case Solver task (src/tasks/ModulusSolver.jsx):
// modulus equations and inequalities of the shapes the 0606 syllabus sets,
// solved the way the coursebook solves them, from the coefficients alone.
//
// An item stores only the QUESTION:
//
//   { id, L: [a, b], R: { abs: [c, d] } | { lin: [c, d] } | { num: k }, rel: '=' }
//
// meaning  |ax + b|  rel  R, where R is another modulus |cx + d|, a plain linear
// expression cx + d, or a number k, and `rel` is one of = < <= > >=. A positive
// number in front of a modulus is folded INTO it by the author (2|3 − x| is
// written as abs: [-2, 6]), and `display` carries the printed form when it
// differs from the folded one.
//
// Everything else is derived here — the two boundary equations, their
// solutions, the substitution check of each candidate, and for an inequality
// the critical values and the regions of the number line that satisfy it — so
// there is no authored answer key to drift, and `npm run validate` checks an
// item is answerable with the same code that grades it. Same rule as Long
// Division (utils/polynomial.js) and Graph It (utils/graphCurve.js).
//
// WHY THE INEQUALITY IS FINISHED BY TESTING, NOT BY A RULE. The coursebook
// teaches |p| < q as −q < p < q and |p| ≥ |q| as p² ≥ q², and the task's first
// stage asks the student to NAME that rule. But the region test — take a value in
// each piece of the line the critical values cut it into and try it in the
// original inequality — is what makes every shape (a number on the right, a
// modulus on the right, an expression that may go negative on the right) fall
// to one method, and it can never produce the extraneous piece squaring can.
// So the answer set is derived by testing, and the derived working shows the
// rule the student named alongside it.
//
// Exact arithmetic throughout: every value is a fraction {n, d} with d > 0, so
// 7/3 is 7/3 and never 2.3333.

import { interval, normalize, NEG_INF, POS_INF } from './interval.js';

/* ------------------------------------------------------------ fractions */

const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; };

/** A fraction n/d in lowest terms with a positive denominator. */
export function frac(n, d = 1) {
  if (!Number.isFinite(n) || !Number.isFinite(d) || d === 0) throw new Error(`bad fraction ${n}/${d}`);
  if (!Number.isInteger(n) || !Number.isInteger(d)) throw new Error(`fraction parts must be integers (${n}/${d})`);
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}
export const F = (x) => (typeof x === 'number' ? frac(x, 1) : x);
export const fadd = (p, q) => frac(F(p).n * F(q).d + F(q).n * F(p).d, F(p).d * F(q).d);
export const fsub = (p, q) => frac(F(p).n * F(q).d - F(q).n * F(p).d, F(p).d * F(q).d);
export const fmul = (p, q) => frac(F(p).n * F(q).n, F(p).d * F(q).d);
export const fdiv = (p, q) => { if (F(q).n === 0) throw new Error('divide by zero'); return frac(F(p).n * F(q).d, F(p).d * F(q).n); };
export const fneg = (p) => frac(-F(p).n, F(p).d);
export const fabs = (p) => frac(Math.abs(F(p).n), F(p).d);
export const fcmp = (p, q) => Math.sign(F(p).n * F(q).d - F(q).n * F(p).d);
export const feq = (p, q) => fcmp(p, q) === 0;
export const fnum = (p) => F(p).n / F(p).d;
export const isInt = (p) => F(p).d === 1;

/** A fraction as LaTeX: `3`, `-\dfrac{7}{2}`. The minus sits outside the fraction. */
export function fracLatex(p, { d = true } = {}) {
  const f = F(p);
  if (f.d === 1) return String(f.n);
  const cmd = d ? '\\dfrac' : '\\frac';
  return `${f.n < 0 ? '-' : ''}${cmd}{${Math.abs(f.n)}}{${f.d}}`;
}

/** A fraction as plain text with a real minus sign: `−7/2`. */
export function fracText(p) {
  const f = F(p);
  const body = f.d === 1 ? String(Math.abs(f.n)) : `${Math.abs(f.n)}/${f.d}`;
  return `${f.n < 0 ? '−' : ''}${body}`;
}

/* ------------------------------------------------------------ linear forms */

/** ax + b as LaTeX, textbook style: `2x - 1`, `x + 4`, `-x + 3`, `5`. */
export function linLatex([a, b], v = 'x') {
  const A = F(a); const B = F(b);
  const parts = [];
  if (A.n !== 0) {
    const mag = fabs(A);
    const coef = feq(mag, 1) ? '' : fracLatex(mag, { d: false });
    parts.push(`${A.n < 0 ? '-' : ''}${coef}${v}`);
  }
  if (B.n !== 0) {
    const mag = fabs(B);
    if (!parts.length) parts.push(fracLatex(B, { d: false }));
    else parts.push(B.n < 0 ? '-' : '+', fracLatex(mag, { d: false }));
  }
  return parts.length ? parts.join(' ') : '0';
}

/** |ax + b| as LaTeX. */
export const absLatex = (lin, v = 'x') => `|${linLatex(lin, v)}|`;

/**
 * The negative of a linear expression, written the way a student writes it:
 * `-(x + 4)` when there are two terms to distribute over, but `-x` or `-5`
 * when there is only one — brackets around a single term are noise.
 */
export function negatedLatex(lin, v = 'x') {
  const A = F(lin[0]); const B = F(lin[1]);
  const single = A.n === 0 || B.n === 0;
  return single ? linLatex([fneg(lin[0]), fneg(lin[1])], v) : `-(${linLatex(lin, v)})`;
}

/** The right-hand side as LaTeX. */
export function rightLatex(R, v = 'x') {
  if (R.abs) return absLatex(R.abs, v);
  if (R.lin) return linLatex(R.lin, v);
  return fracLatex(R.num, { d: false });
}

/** A whole question as LaTeX, unless the item prints its own. */
export function questionLatex(item) {
  if (item.display) return item.display;
  return `${absLatex(item.L)} ${REL_TEX[item.rel]} ${rightLatex(item.R)}`;
}

export const REL_TEX = { '=': '=', '<': '<', '<=': '\\leq', '>': '>', '>=': '\\geq' };
export const REL_TEXT = { '=': '=', '<': '<', '<=': '≤', '>': '>', '>=': '≥' };
const RELS = Object.keys(REL_TEX);

/** Value of ax + b at x. */
const linAt = ([a, b], x) => fadd(fmul(a, x), b);

/* ------------------------------------------------------------ the shapes */

/**
 * The four shapes the chapter sets, which the first stage asks the student to
 * NAME. `abs_neg` is the number-on-the-right case with a negative number: no
 * working at all, because a modulus is never negative.
 */
export function shapeOf(item) {
  const R = item.R || {};
  if (R.abs) return 'abs_abs';
  if (R.lin) return 'abs_lin';
  if (R.num !== undefined) return fnum(R.num) < 0 ? 'abs_neg' : 'abs_num';
  return null;
}

/** Is this an equation or an inequality? */
export const isEquation = (item) => item.rel === '=';

/**
 * The first move the shape calls for — the label the "Name the shape" stage
 * marks against, and the rule the derived working quotes.
 */
export function ruleOf(item) {
  const shape = shapeOf(item);
  const eq = isEquation(item);
  if (shape === 'abs_neg') return eq ? 'none' : (item.rel === '<' || item.rel === '<=' ? 'none' : 'all');
  if (eq) return shape === 'abs_abs' ? 'split' : shape === 'abs_num' ? 'two' : 'split_check';
  if (shape === 'abs_num') return item.rel === '<' || item.rel === '<=' ? 'inside' : 'outside';
  if (shape === 'abs_abs') return 'square';
  return 'sign';
}

/* ------------------------------------------------------------ the cases */

/**
 * The two boundary equations — ax + b = R′ and ax + b = −R′ — solved. For an
 * equation these ARE the two cases; for an inequality they are where the two
 * sides are equal, so their solutions are the critical values.
 *
 * A case whose x terms cancel is either impossible (`kind: 'none'`, the
 * parallel-arms case) or always true (`kind: 'all'`, which the syllabus never
 * sets but the derivation should not fall over on).
 */
export function casesOf(item) {
  const [a, b] = item.L;
  const R = item.R;
  const rhs = R.abs || R.lin || [0, R.num];
  const out = [];
  for (const sign of ['+', '-']) {
    const [c, d] = sign === '+' ? rhs : [fneg(rhs[0]), fneg(rhs[1])];
    // ax + b = cx + d  →  (a − c)x = d − b
    const coef = fsub(a, c);
    const rhsK = fsub(d, b);
    let kind = 'unique';
    let sol = null;
    if (F(coef).n === 0) kind = F(rhsK).n === 0 ? 'all' : 'none';
    else sol = fdiv(rhsK, coef);
    out.push({ sign, lhs: [F(a), F(b)], rhs: [F(c), F(d)], coef, const: rhsK, kind, sol });
  }
  return out;
}

/** Evaluate |L| and R at x, as fractions. */
export function sidesAt(item, x) {
  const lhs = fabs(linAt(item.L, x));
  const R = item.R;
  const rhs = R.abs ? fabs(linAt(R.abs, x)) : R.lin ? linAt(R.lin, x) : F(R.num);
  return { lhs, rhs };
}

/** Does x satisfy the item's relation? */
export function holdsAt(item, x) {
  const { lhs, rhs } = sidesAt(item, x);
  const c = fcmp(lhs, rhs);
  switch (item.rel) {
    case '=': return c === 0;
    case '<': return c < 0;
    case '<=': return c <= 0;
    case '>': return c > 0;
    case '>=': return c >= 0;
    default: return false;
  }
}

/* ------------------------------------------------------------ solving */

/**
 * Everything the task and the validator need, from the question alone.
 *
 *   shape, rule            what to name and which rule applies
 *   cases[]                the two boundary equations, solved
 *   candidates[]           (equations) each case solution with the substitution
 *                          check: the value of each side, and whether it is kept
 *   answers[]              (equations) the kept solutions, ascending
 *   critical[]             (inequalities) distinct case solutions, ascending
 *   regions[]              (inequalities) each piece of the line the critical
 *                          values cut it into, with a test value and whether the
 *                          inequality holds there; endpoints likewise
 *   set                    (inequalities) the solution set, as utils/interval.js
 *                          intervals with decimal endpoints, for the number line
 *   answerLatex            the final answer, typeset
 */
export function solveModulus(item) {
  const shape = shapeOf(item);
  const rule = ruleOf(item);
  const eq = isEquation(item);
  const cases = shape === 'abs_neg' ? [] : casesOf(item);
  const model = { shape, rule, isEquation: eq, cases };

  if (eq) {
    const candidates = cases
      .filter((c) => c.kind === 'unique')
      .map((c) => {
        const { lhs, rhs } = sidesAt(item, c.sol);
        return { x: c.sol, sign: c.sign, lhs, rhs, keep: feq(lhs, rhs) };
      })
      .sort((p, q) => fcmp(p.x, q.x));
    // Two cases can land on the same x (never in the syllabus, but keep it sane).
    const answers = [];
    for (const c of candidates) if (c.keep && !answers.some((x) => feq(x, c.x))) answers.push(c.x);
    model.candidates = candidates;
    model.answers = answers;
    model.answerLatex = answers.length
      ? answers.map((x) => `x = ${fracLatex(x)}`).join(' \\text{ or } ')
      : '\\text{no solution}';
    return model;
  }

  // Inequality: cut the line at the critical values and test each piece.
  const critical = [];
  for (const c of cases) if (c.kind === 'unique' && !critical.some((x) => feq(x, c.sol))) critical.push(c.sol);
  critical.sort(fcmp);
  const bounds = [null, ...critical, null];
  const regions = [];
  for (let i = 0; i < bounds.length - 1; i += 1) {
    const lo = bounds[i];
    const hi = bounds[i + 1];
    const test = lo === null && hi === null ? frac(0)
      : lo === null ? fsub(hi, 1)
        : hi === null ? fadd(lo, 1)
          : fdiv(fadd(lo, hi), 2);
    regions.push({ i, lo, hi, test, holds: holdsAt(item, test) });
  }
  const endpoints = critical.map((x) => ({ x, holds: holdsAt(item, x) }));
  // The set, with decimal endpoints, in the shape the number line reads.
  const set = normalize(regions
    .filter((r) => r.holds)
    .map((r) => interval(
      r.lo === null ? NEG_INF : fnum(r.lo),
      r.hi === null ? POS_INF : fnum(r.hi),
      r.lo === null ? true : !endpoints.find((e) => feq(e.x, r.lo)).holds,
      r.hi === null ? true : !endpoints.find((e) => feq(e.x, r.hi)).holds,
    )));
  // Merge touching pieces across an included endpoint, as utils/interval does.
  const merged = [];
  for (const iv of set) {
    const last = merged[merged.length - 1];
    if (last && iv.lo === last.hi && (!iv.loOpen || !last.hiOpen)) { last.hi = iv.hi; last.hiOpen = iv.hiOpen; }
    else merged.push({ ...iv });
  }
  model.critical = critical;
  model.regions = regions;
  model.endpoints = endpoints;
  model.set = merged;
  model.answerLatex = setLatex(merged, critical);
  return model;
}

/**
 * A solution set as the inequality the mark scheme wants: one chain for an
 * interval, two statements joined by "or" for two rays. The decimal endpoints
 * are matched back to the exact fractions they came from.
 */
export function setLatex(set, critical = []) {
  const tex = (v) => {
    const f = critical.find((c) => Math.abs(fnum(c) - v) < 1e-9);
    return f ? fracLatex(f, { d: false }) : String(v);
  };
  if (!set.length) return '\\text{no solution}';
  const piece = (iv) => {
    const lo = iv.lo === NEG_INF;
    const hi = iv.hi === POS_INF;
    if (lo && hi) return '\\text{all real } x';
    if (lo) return `x ${iv.hiOpen ? '<' : '\\leq'} ${tex(iv.hi)}`;
    if (hi) return `x ${iv.loOpen ? '>' : '\\geq'} ${tex(iv.lo)}`;
    return `${tex(iv.lo)} ${iv.loOpen ? '<' : '\\leq'} x ${iv.hiOpen ? '<' : '\\leq'} ${tex(iv.hi)}`;
  };
  return set.map(piece).join(' \\text{ or } ');
}

/* ------------------------------------------------------------ the working */

/**
 * The finished working, line by line in LaTeX, the way it would be written in
 * an exercise book. Used on the completion card under "Copy this into your
 * book". Nothing here is authored.
 */
export function workingLatex(item, model = solveModulus(item)) {
  const lines = [];
  const q = questionLatex(item);
  const Ltex = linLatex(item.L);
  lines.push(q);
  if (model.shape === 'abs_neg') {
    lines.push(model.rule === 'all'
      ? '\\text{A modulus is never negative, so this is true for every } x.'
      : '\\text{A modulus is never negative, so there is no solution.}');
    return lines;
  }
  // The rule the book quotes, in this question's own terms, before the cases.
  const Rtex = rightLatex(item.R);
  if (model.rule === 'inside') {
    const k = fracLatex(item.R.num, { d: false });
    lines.push(`-${k} ${REL_TEX[item.rel]} ${Ltex} ${REL_TEX[item.rel]} ${k}`);
  } else if (model.rule === 'outside') {
    const k = fracLatex(item.R.num, { d: false });
    const flipped = item.rel === '>' ? '<' : '\\leq';
    lines.push(`${Ltex} ${flipped} -${k} \\;\\text{ or }\\; ${Ltex} ${REL_TEX[item.rel]} ${k}`);
  } else if (model.rule === 'square') {
    lines.push(`(${Ltex})^2 ${REL_TEX[item.rel]} (${linLatex(item.R.abs)})^2 \\;\\text{— or find where } ${absLatex(item.L)} = ${Rtex}`);
  } else if (model.rule === 'sign') {
    lines.push(`\\text{The right side can be negative: keep only } x \\text{ where } ${Rtex} \\geq 0 \\text{ can hold, then test.}`);
  }
  for (const c of model.cases) {
    const rhsTex = c.sign === '+' ? linLatex(c.rhs) : negatedLatex([fneg(c.rhs[0]), fneg(c.rhs[1])]);
    let line = `${Ltex} = ${rhsTex}`;
    if (c.kind === 'unique') line += ` \\;\\Rightarrow\\; x = ${fracLatex(c.sol, { d: false })}`;
    else if (c.kind === 'none') line += ' \\;\\Rightarrow\\; \\text{no solution}';
    else line += ' \\;\\Rightarrow\\; \\text{true for all } x';
    lines.push(line);
  }
  if (model.isEquation) {
    for (const c of model.candidates) {
      lines.push(`\\text{Check } x = ${fracLatex(c.x, { d: false })}:\\; ${fracLatex(c.lhs, { d: false })} ${c.keep ? '=' : '\\neq'} ${fracLatex(c.rhs, { d: false })} \\;\\text{(${c.keep ? 'keep' : 'reject'})}`);
    }
    lines.push(`\\therefore\\; ${model.answerLatex}`);
    return lines;
  }
  if (model.critical.length) {
    lines.push(`\\text{Critical values: } ${model.critical.map((x) => fracLatex(x, { d: false })).join(',\\; ')}`);
  }
  for (const r of model.regions) {
    const where = r.lo === null && r.hi === null ? '\\text{everywhere}'
      : r.lo === null ? `x < ${fracLatex(r.hi, { d: false })}`
        : r.hi === null ? `x > ${fracLatex(r.lo, { d: false })}`
          : `${fracLatex(r.lo, { d: false })} < x < ${fracLatex(r.hi, { d: false })}`;
    const { lhs, rhs } = sidesAt(item, r.test);
    lines.push(`\\text{Test } x = ${fracLatex(r.test, { d: false })} \\text{ in } ${where}:\\; ${fracLatex(lhs, { d: false })} ${REL_TEX[item.rel]} ${fracLatex(rhs, { d: false })}\\; \\text{is ${r.holds ? 'true' : 'false'}}`);
  }
  lines.push(`\\therefore\\; ${model.answerLatex}`);
  return lines;
}

/* ------------------------------------------------------------ authoring */

/**
 * Everything an authored item must satisfy to be answerable on screen. Returns
 * a list of problems (empty when the item is sound) so `npm run validate` can
 * check items with the code the task grades with.
 */
export function checkModulusItems(items = []) {
  const problems = [];
  const seen = new Set();
  const isNum = (v) => typeof v === 'number' && Number.isFinite(v) && Number.isInteger(v);
  for (const it of items) {
    const at = it?.id || '(no id)';
    if (!it?.id) problems.push('an item has no id');
    else if (seen.has(it.id)) problems.push(`${at}: duplicate id`);
    seen.add(it?.id);
    if (!Array.isArray(it?.L) || it.L.length !== 2 || !it.L.every(isNum)) { problems.push(`${at}: L must be [a, b] integers`); continue; }
    if (it.L[0] === 0) problems.push(`${at}: L has no x term — |b| is a number, not a modulus function`);
    const R = it.R || {};
    const kinds = ['abs', 'lin', 'num'].filter((k) => R[k] !== undefined);
    if (kinds.length !== 1) { problems.push(`${at}: R must be exactly one of { abs }, { lin }, { num }`); continue; }
    if (R.abs && (!Array.isArray(R.abs) || R.abs.length !== 2 || !R.abs.every(isNum) || R.abs[0] === 0)) problems.push(`${at}: R.abs must be [c, d] integers with c ≠ 0`);
    if (R.lin && (!Array.isArray(R.lin) || R.lin.length !== 2 || !R.lin.every(isNum) || R.lin[0] === 0)) problems.push(`${at}: R.lin must be [c, d] integers with c ≠ 0 (use num for a constant)`);
    if (R.num !== undefined && !isNum(R.num)) problems.push(`${at}: R.num must be an integer`);
    if (!RELS.includes(it.rel)) problems.push(`${at}: rel "${it.rel}" is not one of ${RELS.join(' ')}`);
    if (problems.some((p) => p.startsWith(`${at}:`))) continue;

    let model;
    try { model = solveModulus(it); } catch (e) { problems.push(`${at}: ${e.message}`); continue; }
    if (model.isEquation) {
      if (model.shape !== 'abs_neg' && !model.candidates.length) problems.push(`${at}: neither case has a solution`);
      if (model.shape === 'abs_neg' && !it.expectNone) problems.push(`${at}: the right side is negative — set expectNone: true if the "no solution" item is deliberate`);
    } else {
      if (model.shape === 'abs_neg' && !it.expectNone) problems.push(`${at}: the right side is negative — set expectNone: true if that trap is deliberate`);
      if (model.shape !== 'abs_neg' && !model.critical.length) problems.push(`${at}: no critical values — the two sides never meet`);
      const line = it.line || {};
      const min = line.min ?? -8;
      const max = line.max ?? 8;
      for (const c of model.critical) {
        const v = fnum(c);
        if (v <= min || v >= max) problems.push(`${at}: critical value ${fracText(c)} is not inside the number line ${min}..${max} — set line: { min, max }`);
      }
      if (!model.set.length && !it.expectNone) problems.push(`${at}: the inequality has no solutions — set expectNone: true if deliberate`);
    }
    try {
      const tex = workingLatex(it, model).join('');
      let depth = 0;
      for (let i = 0; i < tex.length; i += 1) {
        if (tex[i] === '\\') { i += 1; continue; }
        if (tex[i] === '{') depth += 1; else if (tex[i] === '}') depth -= 1;
        if (depth < 0) break;
      }
      if (depth !== 0) problems.push(`${at}: the derived working has unbalanced braces`);
    } catch (e) { problems.push(`${at}: working could not be built — ${e.message}`); }
  }
  return problems;
}
