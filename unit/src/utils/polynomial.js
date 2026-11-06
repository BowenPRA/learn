// src/utils/polynomial.js
//
// The derivation behind the Long Division task (src/tasks/PolyDivision.jsx) and
// the polynomial rendering the ADD_MATH deck leans on. Given ONLY a dividend and
// a divisor it produces every intermediate row of the written algorithm — each
// quotient term, each product row, each subtraction — so the task never stores
// an authored answer key. Pure and framework-free on purpose, exactly like
// utils/columnArithmetic.js, utils/vectors.js and utils/parabola.js.
//
// COEFFICIENTS ARE DESCENDING. `[1, -5, 8, -4]` is x³ − 5x² + 8x − 4: index 0 is
// the leading coefficient and the array's last entry is the constant term. That
// is reading order, so an authored item looks like the printed polynomial.
//
// Everything here works in plain integers. Polynomial division only stays inside
// the integers when the divisor's leading coefficient divides through (it does
// for every item the syllabus sets — 3x + 1 into 6x³ + 11x² − 3x − 2 gives
// 2x² + 3x − 2), and `checkDivision` below reports the case where it does not
// rather than letting a fractional coefficient reach a student's screen.

/** Drop leading zeros. `[0, 0, 3, 1]` → `[3, 1]`; all-zero → `[0]`. */
export function trim(coeffs) {
  const c = (coeffs || []).map((n) => Number(n) || 0);
  let i = 0;
  while (i < c.length - 1 && c[i] === 0) i += 1;
  return c.slice(i);
}

/** Degree of a polynomial. The zero polynomial reports -Infinity. */
export function degreeOf(coeffs) {
  const c = trim(coeffs);
  if (c.length === 1 && c[0] === 0) return -Infinity;
  return c.length - 1;
}

/** True for the zero polynomial. */
export const isZero = (coeffs) => trim(coeffs).every((n) => n === 0);

/** Leading (highest-power) coefficient. */
export const leadOf = (coeffs) => trim(coeffs)[0];

/** Coefficient of x^d, or 0 if the polynomial has no such term. */
export function coefAt(coeffs, d) {
  const c = trim(coeffs);
  const i = c.length - 1 - d;
  return i >= 0 && i < c.length ? c[i] : 0;
}

/** Build a descending array from a degree→coefficient map, top degree first. */
export function fromTerms(map, topDegree) {
  const out = [];
  for (let d = topDegree; d >= 0; d -= 1) out.push(Number(map[d]) || 0);
  return out.length ? out : [0];
}

/** a + b. */
export function polyAdd(a, b) {
  const top = Math.max(trim(a).length, trim(b).length) - 1;
  const out = {};
  for (let d = top; d >= 0; d -= 1) out[d] = coefAt(a, d) + coefAt(b, d);
  return trim(fromTerms(out, top));
}

/** a − b. */
export function polySub(a, b) {
  const top = Math.max(trim(a).length, trim(b).length) - 1;
  const out = {};
  for (let d = top; d >= 0; d -= 1) out[d] = coefAt(a, d) - coefAt(b, d);
  return trim(fromTerms(out, top));
}

/** a × b. */
export function polyMul(a, b) {
  const A = trim(a);
  const B = trim(b);
  if (isZero(A) || isZero(B)) return [0];
  const out = new Array(A.length + B.length - 1).fill(0);
  A.forEach((ca, i) => B.forEach((cb, j) => { out[i + j] += ca * cb; }));
  return trim(out);
}

/** k × p. */
export const polyScale = (p, k) => trim(trim(p).map((c) => c * k));

/** Evaluate p at x (Horner). Used by the factor-theorem checks. */
export function evaluate(coeffs, x) {
  return trim(coeffs).reduce((acc, c) => acc * x + c, 0);
}

/* ------------------------------------------------------------------ LaTeX */

/**
 * One term as LaTeX, WITHOUT its sign: `3x^2`, `x`, `7`. A coefficient of ±1 in
 * front of a power drops the 1, which is the difference between algebra that
 * reads like a textbook and algebra that reads like a spreadsheet.
 */
export function termBody(coef, degree, v = 'x') {
  const mag = Math.abs(coef);
  const num = mag === 1 && degree > 0 ? '' : String(mag);
  if (degree === 0) return String(mag);
  if (degree === 1) return `${num}${v}`;
  return `${num}${v}^{${degree}}`;
}

/** One signed term for standalone use: `-3x^2`, `x`, `+7` when `lead` is false. */
export function termLatex(coef, degree, { v = 'x', lead = true } = {}) {
  if (coef === 0) return degree === 0 ? '0' : `0${degree === 1 ? v : `${v}^{${degree}}`}`;
  const sign = coef < 0 ? '-' : lead ? '' : '+';
  return `${sign}${termBody(coef, degree, v)}`;
}

/**
 * A whole polynomial as LaTeX. `showZeros` writes the missing powers in
 * explicitly (`2x^3 + 0x^2 - x + 51`) — the step the textbook insists on before
 * setting out a division, and the one students skip.
 */
export function polyLatex(coeffs, { v = 'x', showZeros = false } = {}) {
  const c = trim(coeffs);
  const top = c.length - 1;
  if (isZero(c)) return '0';
  const parts = [];
  for (let i = 0; i <= top; i += 1) {
    const coef = c[i];
    const d = top - i;
    if (coef === 0 && !showZeros) continue;
    const first = parts.length === 0;
    // Written as sign + body rather than one string, so the joined result gets
    // "x^2 - 3x" (spaces around the operator) instead of "x^2-3x".
    if (first) parts.push(termLatex(coef, d, { v, lead: true }));
    else parts.push(coef < 0 ? '-' : '+', termBody(coef, d, v));
  }
  return parts.join(' ');
}

/** `(x - 2)` — a polynomial wrapped in brackets, for product forms. */
export const bracketed = (coeffs, opts) => `\\left(${polyLatex(coeffs, opts)}\\right)`;

/* ---------------------------------------------------------------- division */

/**
 * Long division set out the way it is written on paper.
 *
 * Each step is one pass of DIVIDE → MULTIPLY → SUBTRACT → BRING DOWN:
 *
 *   qDeg/qCoef   the quotient term this step produces, written above the bar in
 *                its own power column
 *   prod         (divisor × that term), the row written underneath — M+1 cells,
 *                spanning degrees qDeg+M … qDeg
 *   diff         what the subtraction leaves. The leading column always cancels
 *                to zero (that is the point of choosing qCoef), so the student
 *                only fills the M cells BELOW it: degrees qDeg+M-1 … qDeg
 *   bring        the terms brought down from the dividend to make the next row.
 *                Normally one; more when a diff cell came out zero and the
 *                running remainder dropped by more than one degree, which is
 *                exactly what a human does when they write x² - 9 rather than
 *                x² + 0x - 9 in the quotient
 *   rowBefore    the running remainder this step subtracts from, as {deg, coef}
 *                cells, so the component can print the row without re-deriving
 *
 * Returns `{ quotient, remainder, steps, exact }`. Nothing is authored: the task
 * stores only `dividend` and `divisor`.
 */
export function divide(dividend, divisor) {
  const D = trim(dividend);
  const V = trim(divisor);
  const M = degreeOf(V);
  const N = degreeOf(D);

  if (!Number.isFinite(M) || M < 1) throw new Error('divisor must have degree 1 or more');
  if (!Number.isFinite(N) || N < M) throw new Error('dividend degree must be at least the divisor degree');

  const lead = leadOf(V);
  const steps = [];
  let R = D;
  let guard = 0;

  const cellsOf = (poly, hi, lo) => {
    const out = [];
    for (let d = hi; d >= lo; d -= 1) out.push({ deg: d, coef: coefAt(poly, d) });
    return out;
  };

  while (degreeOf(R) >= M && guard < 32) {
    guard += 1;
    const rDeg = degreeOf(R);
    const qDeg = rDeg - M;
    const qCoef = leadOf(R) / lead;

    const qTerm = fromTerms({ [qDeg]: qCoef }, qDeg);
    const prodPoly = polyMul(qTerm, V);
    const next = polySub(R, prodPoly);

    // The row we are subtracting from, printed from its leading term down to
    // the lowest column the product touches.
    const rowBefore = cellsOf(R, rDeg, qDeg);
    const prod = cellsOf(prodPoly, rDeg, qDeg);
    const diff = cellsOf(next, rDeg - 1, qDeg);

    // How far down we must bring terms for the next line to be workable: to the
    // next quotient column, or to the constant term when this was the last step.
    const nextDeg = degreeOf(next);
    const stop = nextDeg >= M ? nextDeg - M : qDeg - 1;
    const bring = qDeg - 1 >= stop && qDeg - 1 >= 0 ? cellsOf(next, qDeg - 1, Math.max(stop, 0)) : [];

    steps.push({
      i: steps.length,
      qDeg,
      qCoef,
      rDeg,
      rowBefore,
      prod,
      cancelDeg: rDeg,
      diff,
      bring,
      // The whole running remainder after this step, for the "so far" readout.
      after: next,
    });

    R = next;
  }

  const quotient = trim(
    fromTerms(
      Object.fromEntries(steps.map((s) => [s.qDeg, s.qCoef])),
      steps.length ? steps[0].qDeg : 0
    )
  );

  return {
    dividend: D,
    divisor: V,
    quotient,
    remainder: trim(R),
    steps,
    exact: isZero(R),
  };
}

/**
 * Everything an authored item must satisfy to be answerable on screen. Returns
 * a list of problems (empty when the item is sound) so `npm run validate` can
 * check items with the very code the task grades with.
 */
export function checkDivision(dividend, divisor) {
  const problems = [];
  const ints = (p, what) => {
    if (!Array.isArray(p) || !p.length) { problems.push(`${what} must be an array of coefficients`); return false; }
    if (!p.every((n) => Number.isInteger(n))) { problems.push(`${what} has a non-integer coefficient`); return false; }
    return true;
  };
  if (!ints(dividend, 'dividend') || !ints(divisor, 'divisor')) return problems;

  const M = degreeOf(divisor);
  const N = degreeOf(dividend);
  if (!(M >= 1)) problems.push('divisor must have degree 1 or more');
  if (!(N >= M)) problems.push(`dividend degree ${N} is below divisor degree ${M} — nothing to divide`);
  if (problems.length) return problems;

  let model;
  try {
    model = divide(dividend, divisor);
  } catch (e) {
    problems.push(e.message);
    return problems;
  }

  // Every cell the student types must be a whole number, or the box asks for
  // something it will not accept.
  for (const s of model.steps) {
    if (!Number.isInteger(s.qCoef)) {
      problems.push(`quotient term of degree ${s.qDeg} is ${s.qCoef} — not a whole number`);
    }
    for (const c of [...s.prod, ...s.diff]) {
      if (!Number.isInteger(c.coef)) problems.push(`a working cell at degree ${c.deg} is ${c.coef} — not a whole number`);
    }
  }

  // The identity the finished screen prints must actually hold.
  const rebuilt = polyAdd(polyMul(model.divisor, model.quotient), model.remainder);
  if (polyLatex(rebuilt) !== polyLatex(model.dividend)) {
    problems.push(`divisor × quotient + remainder = ${polyLatex(rebuilt)}, not ${polyLatex(model.dividend)}`);
  }
  if (degreeOf(model.remainder) >= M) {
    problems.push('remainder degree is not below the divisor degree');
  }

  // The finished screen prints the whole division as LaTeX. A builder that
  // throws, or that emits unbalanced braces, would render as a red KaTeX error
  // at the moment the student finishes — the worst possible time to find out.
  try {
    const tex = divisionLatex(model);
    let depth = 0;
    for (let i = 0; i < tex.length; i += 1) {
      if (tex[i] === '\\') { i += 1; continue; }
      if (tex[i] === '{') depth += 1;
      else if (tex[i] === '}') depth -= 1;
      if (depth < 0) break;
    }
    if (depth !== 0) problems.push('the LaTeX for this division has unbalanced braces');
  } catch (e) {
    problems.push(`the LaTeX for this division could not be built — ${e.message}`);
  }
  return problems;
}

/**
 * The completed division, typeset the way the textbook prints it: the quotient
 * over the bar, the divisor outside the bracket, and each product underlined
 * above the line it leaves behind.
 *
 * HOW THE COLUMNS LINE UP. KaTeX has no `\cline`, so a real column grid cannot
 * draw a rule under part of a row. Instead every line is left-aligned and pushed
 * right by a `\phantom` of the DIVIDEND's own terms for the powers that line
 * does not reach. The phantom is built from the same strings the dividend line
 * renders, so the offsets are exact rather than eyeballed, and a row always
 * starts at the left edge of its own power column — which is how the book sets
 * it out. The sign between columns is a binary operator with its own spacing, so
 * a row whose leading term is positive still reserves that slot (`\phantom{+}`).
 *
 * Returns one `\begin{array}{l}…\end{array}` string, ready for SafeBlockMath.
 */
export function divisionLatex(model, { v = 'x' } = {}) {
  const D = model.dividend;
  const V = model.divisor;
  const n = degreeOf(D);

  const divisorTex = polyLatex(V, { v });
  // Everything left of the dividend: the divisor and the bracket.
  const PRE = `\\phantom{${divisorTex}\\,\\big)\\,}`;

  /**
   * One cell, written as it appears in that column: the leading column of the
   * whole division carries no operator, every other column carries a binary
   * + or −. A row whose own leading term is positive still reserves the
   * operator slot, so it starts where the column starts and not half a glyph in.
   */
  const cellTex = (coef, deg, { rowLead = false } = {}) => {
    if (deg >= n) return termLatex(coef, deg, { v, lead: true });
    const op = coef < 0 ? '{}- ' : rowLead ? '\\phantom{{}+{}}' : '{}+ ';
    return `${op}${termBody(coef, deg, v)}`;
  };

  // Each column is padded to the widest term that will ever appear in it, so no
  // cell can spill into its neighbour. Width is judged on the term BODY with the
  // markup stripped ("2x^{2}" → "2x2"): every body in a column is the same shape
  // — digits, x, the same superscript — so glyph count orders them correctly,
  // which a raw string length would not (a `\phantom{…}` is long and narrow).
  const vis = (s) => s.replace(/[{}^\\]/g, '').length;
  const widest = new Map();
  const note = (deg, coef) => {
    const b = termBody(coef, deg, v);
    if (!widest.has(deg) || vis(b) > vis(widest.get(deg))) widest.set(deg, b);
  };
  for (let d = n; d >= 0; d -= 1) note(d, coefAt(D, d));
  for (const s of model.steps) {
    note(s.qDeg, s.qCoef);
    for (const c of [...s.prod, ...s.diff, ...s.bring]) note(c.deg, c.coef);
  }
  // Only the leading column sits flush against the bracket; every other column
  // reserves the operator that separates it from the one before.
  const pad = new Map(
    [...widest.entries()].map(([deg, body]) => [deg, `${deg >= n ? '' : '{}+ '}${body}`])
  );

  /**
   * A whole line, one fixed-width slot per power. `\mathrlap` draws the cell at
   * the slot's left edge without taking any width, and the `\phantom` behind it
   * sets the slot — which is how a KaTeX line gets true columns without an
   * array (an array cannot carry a rule under only part of a row).
   */
  const line = (cells, { underline = false, wrap = null } = {}) => {
    const has = new Map(cells.map((c) => [c.deg, c]));
    const hi = cells.length ? cells[0].deg : n;
    const lo = cells.length ? cells[cells.length - 1].deg : 0;
    const before = [];  // columns above this row — empty
    const span = [];    // the columns the row actually occupies
    const after = [];   // columns below it — empty again
    for (let d = n; d >= 0; d -= 1) {
      const slot = `\\phantom{${pad.get(d)}}`;
      const c = has.get(d);
      const tex = c ? `\\mathrlap{${cellTex(c.coef, d, { rowLead: d === hi })}}${slot}` : slot;
      (d > hi ? before : d >= lo ? span : after).push(tex);
    }
    // Only the columns the row reaches are underlined — the rule stops where the
    // working stops, exactly as it is ruled on paper.
    const mid = span.join('');
    const body = `${before.join('')}${underline ? `\\underline{${mid}}` : mid}${after.join('')}`;
    return wrap ? wrap(body) : `${PRE}${body}`;
  };

  const lines = [
    line(model.steps.map((s) => ({ deg: s.qDeg, coef: s.qCoef }))),
    // The dividend is snapped to the same columns, then wrapped in the bracket.
    line(
      Array.from({ length: n + 1 }, (_, i) => ({ deg: n - i, coef: coefAt(D, n - i) })),
      { wrap: (b) => `${divisorTex}\\,\\overline{\\smash{\\big)}\\,${b}}` }
    ),
  ];
  for (const s of model.steps) {
    lines.push(line(s.prod, { underline: true }));
    lines.push(line([...s.diff, ...s.bring]));
  }
  return `\\begin{array}{l}${lines.join(' \\\\[3pt] ')}\\end{array}`;
}

/**
 * The finished statement, both ways round:
 *   product   P(x) = (divisor)(quotient) + remainder
 *   fraction  P(x)/(divisor) = quotient + remainder/(divisor)
 * `remainder` is omitted from both when the division is exact.
 */
export function resultLatex(model, { v = 'x' } = {}) {
  const q = model.quotient;
  const r = model.remainder;
  const exact = isZero(r);
  const qPart = degreeOf(q) === 0 ? polyLatex(q, { v }) : bracketed(q, { v });
  // A negative remainder joins with a minus, never "+ -13". Only the LEADING
  // sign moves out; the rest of the remainder keeps its own signs.
  const rText = polyLatex(r, { v });
  const rTail = rText.startsWith('-') ? `- ${rText.slice(1).trim()}` : `+ ${rText}`;
  const negConst = degreeOf(r) === 0 && r[0] < 0;
  const rFrac = negConst
    ? `- \\frac{${Math.abs(r[0])}}{${polyLatex(model.divisor, { v })}}`
    : `+ \\frac{${rText}}{${polyLatex(model.divisor, { v })}}`;
  const product = exact
    ? `${polyLatex(model.dividend, { v })} = ${bracketed(model.divisor, { v })}${qPart}`
    : `${polyLatex(model.dividend, { v })} = ${bracketed(model.divisor, { v })}${qPart} ${rTail}`;
  const fraction = exact
    ? `\\frac{${polyLatex(model.dividend, { v })}}{${polyLatex(model.divisor, { v })}} = ${polyLatex(q, { v })}`
    : `\\frac{${polyLatex(model.dividend, { v })}}{${polyLatex(model.divisor, { v })}} = ${polyLatex(q, { v })} ${rFrac}`;
  return { product, fraction, exact };
}
