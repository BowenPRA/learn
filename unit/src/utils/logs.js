// src/utils/logs.js
//
// Logarithms — the pure parts behind Log Simplifier (src/tasks/LogSimplify.jsx)
// and the AM_5A notes.
//
// THE RULE (same as surds.js, modulus.js, cubic.js): an item stores the
// question and everything else is derived here — each number turned into a
// log, each coefficient moved inside as a power, the single log the laws
// combine to, whether that log is an exact number, and the power it equals —
// so no answer key can drift, and `checkLogItems` refuses an item a student
// could not finish on the screen.
//
// Everything is EXACT. A positive number is held as a POWER PRODUCT: an object
// { prime: [p, q] } of rational exponents, so 72 is { 2: [3, 1], 3: [2, 1] },
// 1/9 is { 3: [-2, 1] } and √5 is { 5: [1, 2] }. Then
//   log_b N is an exact number  ⇔  N's exponents are one rational multiple k of b's,
// and that k IS the log. No floating point decides anything a student is marked on.

// ------------------------------------------------------------------ rationals

export const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };

/** A reduced rational [p, q] with q > 0. */
export function rat(p, q = 1) {
  if (!Number.isInteger(p) || !Number.isInteger(q) || q === 0) throw new Error(`bad rational ${p}/${q}`);
  if (q < 0) { p = -p; q = -q; }
  const g = gcd(p, q) || 1;
  return [p / g, q / g];
}

export const rAdd = (a, b) => rat(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
export const rMul = (a, b) => rat(a[0] * b[0], a[1] * b[1]);
export const rDiv = (a, b) => rat(a[0] * b[1], a[1] * b[0]);
export const rNeg = (a) => [-a[0], a[1]];
export const rAbs = (a) => [Math.abs(a[0]), a[1]];
export const rSign = (a) => Math.sign(a[0]);
export const rEq = (a, b) => !!a && !!b && a[0] === b[0] && a[1] === b[1];
export const rIsInt = (a) => a[1] === 1;
export const rValue = (a) => a[0] / a[1];
export const rIsOne = (a) => a[0] === 1 && a[1] === 1;

/**
 * What a student typed, as a rational: "3", "-3", "−3", "3/2", "-1 / 9",
 * "0.5", "1.25". Null for anything else (a blank box, "2^3", "abc").
 */
export function parseRational(s) {
  const t = String(s ?? '').replace(/−/g, '-').replace(/\s+/g, '');
  if (!t) return null;
  let m = t.match(/^(-?)(\d+)\/(-?)(\d+)$/);
  if (m) {
    const q = Number(m[4]);
    if (q === 0) return null;
    const sign = (m[1] ? -1 : 1) * (m[3] ? -1 : 1);
    return rat(sign * Number(m[2]), q);
  }
  m = t.match(/^(-?)(\d*)\.(\d+)$/);
  if (m) {
    const den = 10 ** m[3].length;
    return rat((m[1] ? -1 : 1) * (Number(m[2] || 0) * den + Number(m[3])), den);
  }
  m = t.match(/^-?\d+$/);
  if (m) return rat(Number(t), 1);
  return null;
}

/** An authored value: an integer, "p/q", or [p, q]. Null when it is none of those. */
export function toRat(v) {
  if (Number.isInteger(v)) return rat(v, 1);
  if (Array.isArray(v) && v.length === 2 && Number.isInteger(v[0]) && Number.isInteger(v[1]) && v[1] !== 0) return rat(v[0], v[1]);
  if (typeof v === 'string') return parseRational(v);
  return null;
}

// ------------------------------------------------------------------ power products

function factorInt(n) {
  const out = {};
  let m = n;
  for (let d = 2; d * d <= m; d += 1) while (m % d === 0) { out[d] = (out[d] || 0) + 1; m /= d; }
  if (m > 1) out[m] = (out[m] || 0) + 1;
  return out;
}

/** A positive rational as a power product. */
export function ppOfRat([p, q]) {
  if (p <= 0) throw new Error('a logarithm needs a positive number');
  const pp = {};
  for (const [prime, e] of Object.entries(factorInt(p))) pp[prime] = rat(e, 1);
  for (const [prime, e] of Object.entries(factorInt(q))) pp[prime] = pp[prime] ? rAdd(pp[prime], rat(-e, 1)) : rat(-e, 1);
  for (const k of Object.keys(pp)) if (pp[k][0] === 0) delete pp[k];
  return pp;
}

export function ppMul(a, b) {
  const out = { ...a };
  for (const [k, e] of Object.entries(b)) out[k] = out[k] ? rAdd(out[k], e) : e;
  for (const k of Object.keys(out)) if (out[k][0] === 0) delete out[k];
  return out;
}

export const ppPow = (a, r) => (r[0] === 0 ? {} : Object.fromEntries(Object.entries(a).map(([k, e]) => [k, rMul(e, r)])));

/** The rational a power product equals, or null if any exponent is fractional (a root is left). */
export function ppToRat(pp) {
  let num = 1;
  let den = 1;
  for (const [prime, e] of Object.entries(pp)) {
    if (!rIsInt(e)) return null;
    if (e[0] > 0) num *= Number(prime) ** e[0];
    else den *= Number(prime) ** -e[0];
  }
  if (!Number.isSafeInteger(num) || !Number.isSafeInteger(den)) return null;
  return rat(num, den);
}

export const ppValue = (pp) => Object.entries(pp).reduce((v, [prime, e]) => v * Number(prime) ** rValue(e), 1);

/** k with pp = base^k exactly, or null when there is no such rational k. */
export function ppRatio(pp, base) {
  const primes = new Set([...Object.keys(pp), ...Object.keys(base)]);
  if (!Object.keys(pp).length) return rat(0, 1);
  let k = null;
  for (const prime of primes) {
    const e = pp[prime];
    const f = base[prime];
    if (!e || !f) return null;
    const ratio = rDiv(e, f);
    if (k && !rEq(k, ratio)) return null;
    k = ratio;
  }
  return k;
}

// ------------------------------------------------------------------ arguments

/**
 * An item's argument: an integer, "p/q", [p, q], or { root, of } for the
 * root-th root of a number (√5 is { root: 2, of: 5 }). Returns
 * { pp, rational, latex }, rational being null for a root.
 */
export function argOf(v) {
  if (v && typeof v === 'object' && !Array.isArray(v)) {
    const of = toRat(v.of);
    const r = v.root ?? 2;
    if (!of || of[0] <= 0 || !Number.isInteger(r) || r < 2) throw new Error('a root argument needs { root: 2 or more, of: a positive number }');
    return { pp: ppPow(ppOfRat(of), rat(1, r)), rational: null, latex: `${r === 2 ? '\\sqrt' : `\\sqrt[${r}]`}{${ratLatex(of)}}` };
  }
  const q = toRat(v);
  if (!q || q[0] <= 0) throw new Error('the number inside a log must be positive');
  return { pp: ppOfRat(q), rational: q, latex: ratLatex(q) };
}

// ------------------------------------------------------------------ printing

/** A rational as KaTeX: 3, -2, \frac{1}{9}, -\frac{3}{2}. */
export function ratLatex([p, q]) {
  if (q === 1) return `${p}`;
  return `${p < 0 ? '-' : ''}\\frac{${Math.abs(p)}}{${q}}`;
}

/** A rational for a message: 3, −2, 1/9, −3/2. */
export function ratText([p, q]) {
  const s = p < 0 ? '−' : '';
  return q === 1 ? `${s}${Math.abs(p)}` : `${s}${Math.abs(p)}/${q}`;
}

/** A power for a message: 2^5, 8^(−1/3) — a fractional power is bracketed. */
export const powText = (base, r) => (r[1] === 1 ? `${base}^${ratText(r)}` : `${base}^(${ratText(r)})`);

/** The log's name: \lg for base 10 (the book's notation), \log_{b} otherwise. */
export const logName = (base) => (base === 10 ? '\\lg' : `\\log_{${base}}`);

/** A log of an argument's KaTeX. Anything that is not a bare whole number is bracketed. */
export function logLatex(base, argLatex) {
  const bare = /^\d+$/.test(argLatex) || /^\\sqrt(\[\d+\])?\{\d+\}$/.test(argLatex);
  return bare ? `${logName(base)} ${argLatex}` : `${logName(base)}\\left(${argLatex}\\right)`;
}

/** A plain-text log for a message: log₂ 8, lg 100. */
export function logText(base, argText) {
  const sub = String(base).split('').map((d) => '₀₁₂₃₄₅₆₇₈₉'[Number(d)]).join('');
  return base === 10 ? `lg ${argText}` : `log${sub} ${argText}`;
}

/** The question as KaTeX. */
export function logQuestionLatex(item) {
  if (item.kind === 'evaluate') return logLatex(item.base, argOf(item.arg).latex);
  const parts = [];
  if (item.number) parts.push(`${item.number}`);
  for (const [c, n] of item.terms || []) {
    const cr = toRat(c);
    const abs = rAbs(cr);
    const coef = rIsOne(abs) ? '' : ratLatex(abs);
    const body = `${coef}${logLatex(item.base, ratLatex(toRat(n)))}`;
    if (!parts.length) parts.push(`${rSign(cr) < 0 ? '-' : ''}${body}`);
    else parts.push(`${rSign(cr) < 0 ? '-' : '+'} ${body}`);
  }
  return parts.join(' ');
}

/** Signed plain logs as KaTeX: \log_{5} 9 + \log_{5} 8 − \log_{5} 2. */
export function plainLatex(base, plain) {
  return plain.map((t, i) => {
    const body = logLatex(base, ratLatex(t.arg));
    if (i === 0) return `${t.sign < 0 ? '-' : ''}${body}`;
    return `${t.sign < 0 ? '-' : '+'} ${body}`;
  }).join(' ');
}

/** The laws applied but not yet worked out: \log_{2}\left(\frac{40}{5}\right). */
export function rawCombineLatex(base, plain) {
  const prod = (list) => list.map((t) => (rIsInt(t.arg) ? ratLatex(t.arg) : `\\left(${ratLatex(t.arg)}\\right)`)).join(' \\times ');
  const top = plain.filter((t) => t.sign > 0);
  const bottom = plain.filter((t) => t.sign < 0);
  const topL = top.length ? prod(top) : '1';
  if (!bottom.length) return `${logName(base)}\\left(${topL}\\right)`;
  return `${logName(base)}\\left(\\frac{${topL}}{${prod(bottom)}}\\right)`;
}

// ------------------------------------------------------------------ the item model

const MAX_TYPED = 1e7;

/**
 * The derived model of a Log Simplifier item.
 *
 *   { kind: 'evaluate', base, arg }
 *       log_b(arg) is an exact number. arg: integer, "p/q", or { root, of }.
 *   { kind: 'combine', base, terms: [[coef, n], …], number? }
 *       number + Σ coef·log_b(n), written as ONE log and then, if it is an
 *       exact power of the base, as a number. coef: a non-zero integer or
 *       "p/q"; n: a positive integer or "p/q"; number: a non-zero integer
 *       written first ("2 + log₃ 5").
 */
export function deriveLogItem(item) {
  const base = item.base;
  const basePP = ppOfRat(rat(base, 1));
  const ladder = (pp) => Math.log(ppValue(pp)) / Math.log(base);

  if (item.kind === 'evaluate') {
    const a = argOf(item.arg);
    const k = ppRatio(a.pp, basePP);
    return {
      kind: 'evaluate', base, argLatex: a.latex, arg: a.rational, argPP: a.pp,
      evaluates: k !== null, exponent: k, approx: ladder(a.pp),
      stages: ['rewrite', 'exponent'],
    };
  }

  if (item.kind === 'combine') {
    const plain = [];
    const numbers = [];
    const powers = [];
    if (item.number) {
      const k = item.number;
      const arg = rat(base ** Math.abs(k), 1);
      numbers.push({ k, arg });
      plain.push({ sign: Math.sign(k), arg, from: 'number' });
    }
    (item.terms || []).forEach(([c, n], i) => {
      const coef = toRat(c);
      const inside = toRat(n);
      const abs = rAbs(coef);
      if (rIsOne(abs)) { plain.push({ sign: rSign(coef), arg: inside, from: 'term', i }); return; }
      const powered = ppToRat(ppPow(ppOfRat(inside), abs));
      powers.push({ i, coef, abs, sign: rSign(coef), arg: inside, powered });
      plain.push({ sign: rSign(coef), arg: powered, from: 'power', i });
    });
    const ok = plain.every((t) => t.arg);
    let top = rat(1, 1);
    let bottom = rat(1, 1);
    if (ok) for (const t of plain) { if (t.sign > 0) top = rMul(top, t.arg); else bottom = rMul(bottom, t.arg); }
    const value = ok ? rDiv(top, bottom) : null;
    const valuePP = value ? ppOfRat(value) : null;
    const k = valuePP ? ppRatio(valuePP, basePP) : null;
    const needsCombine = plain.length > 1 || (plain.length === 1 && plain[0].sign < 0);
    const stages = [
      ...(numbers.length ? ['numbers'] : []),
      ...(powers.length ? ['power'] : []),
      ...(needsCombine ? ['combine'] : []),
      'decide',
      ...(k !== null ? ['exponent'] : []),
    ];
    return {
      kind: 'combine', base, numbers, powers, plain, top, bottom, value, valuePP,
      evaluates: k !== null, exponent: k, approx: valuePP ? ladder(valuePP) : NaN,
      needsCombine, stages,
    };
  }
  throw new Error(`unknown kind "${item.kind}"`);
}

/** The finished working, one line each, the way a book sets it out. */
export function logWorking(item, model = deriveLogItem(item)) {
  const { base } = model;
  const b = `${base}`;
  if (model.kind === 'evaluate') {
    const k = model.exponent;
    const lines = [
      `\\text{Let } x = ${logLatex(base, model.argLatex)}`,
      `${b}^{x} = ${model.argLatex}`,
      `${b}^{x} = ${b}^{${ratLatex(k)}}`,
      `x = ${ratLatex(k)}`,
    ];
    return lines;
  }
  const lines = [logQuestionLatex(item)];
  if (model.numbers.length || model.powers.length) lines.push(`= ${plainLatex(base, model.plain)}`);
  if (model.needsCombine) {
    lines.push(`= ${rawCombineLatex(base, model.plain)}`);
    lines.push(`= ${logLatex(base, ratLatex(model.value))}`);
  }
  if (model.evaluates) lines.push(`= ${ratLatex(model.exponent)}`);
  return lines;
}

/** The final answer as KaTeX: a number, or the single log. */
export function logAnswerLatex(model) {
  if (model.evaluates) return ratLatex(model.exponent);
  return logLatex(model.base, ratLatex(model.value));
}

// ------------------------------------------------------------------ the power ladder

/**
 * The rungs of a base's power ladder around a value on it: b^lo … b^hi,
 * whole-number exponents, at least four rungs, never more than eleven.
 */
export function ladderRange(approx) {
  const v = Number.isFinite(approx) ? approx : 1;
  // One rung of headroom past the value, so a whole-number log never sits on
  // the last rung at the edge of the drawing.
  const eps = 1e-9;
  let lo = Math.min(0, Math.ceil(v - eps) - 1);
  let hi = Math.max(1, Math.floor(v + eps) + 1);
  while (hi - lo < 3) { if (v < 0) lo -= 1; else hi += 1; }
  return { lo, hi };
}

/** b^j as KaTeX-free text for a rung label: 125, 1/25. */
export function rungText(base, j) {
  if (j >= 0) {
    const n = base ** j;
    return n >= 1e6 ? `${base}^${j}` : `${n}`;
  }
  const n = base ** -j;
  return n >= 1e6 ? `${base}^${j}` : `1/${n}`;
}

// ------------------------------------------------------------------ validation

/** Problems with Log Simplifier items, as strings. */
export function checkLogItems(items) {
  const out = [];
  const ids = new Set();
  let level = 0;
  for (const [i, item] of (items || []).entries()) {
    const at = `item ${item?.id || i + 1}`;
    if (!item?.id) out.push(`${at}: needs an id`);
    if (ids.has(item?.id)) out.push(`${at}: duplicate id`);
    ids.add(item?.id);
    // The ladder only climbs: a harder level never comes before an easier one.
    if (item?.level !== undefined) {
      if (!Number.isInteger(item.level) || item.level < 1) out.push(`${at}: level must be a whole number from 1`);
      else if (item.level < level) out.push(`${at}: level ${item.level} comes after level ${level} — order the items so the levels only climb`);
      else level = item.level;
    }
    if (!Number.isInteger(item?.base) || item.base < 2 || item.base > 20) { out.push(`${at}: base must be a whole number from 2 to 20`); continue; }
    try {
      if (item.kind === 'evaluate') {
        const m = deriveLogItem(item);
        if (!m.evaluates) out.push(`${at}: log base ${item.base} of this argument is not an exact number — no whole or fractional power of ${item.base} gives it`);
        else if (m.exponent[1] > 4) out.push(`${at}: the answer ${ratText(m.exponent)} has a denominator above 4 — keep the fractional powers to halves, thirds and quarters`);
        if (Math.abs(m.approx) > 10) out.push(`${at}: the answer is too far up the power ladder to draw (keep it within ±10)`);
      } else if (item.kind === 'combine') {
        if (!Array.isArray(item.terms) || !item.terms.length) { out.push(`${at}: terms must be a list of [coef, n] pairs`); continue; }
        let bad = false;
        item.terms.forEach((t, j) => {
          if (!Array.isArray(t) || t.length !== 2) { out.push(`${at}: term ${j + 1} must be [coef, n]`); bad = true; return; }
          const c = toRat(t[0]);
          const n = toRat(t[1]);
          if (!c || c[0] === 0) { out.push(`${at}: term ${j + 1} needs a non-zero coefficient (an integer or "p/q")`); bad = true; }
          if (!n || n[0] <= 0) { out.push(`${at}: term ${j + 1} needs a positive number inside the log`); bad = true; }
        });
        if (item.number !== undefined && !(Number.isInteger(item.number) && item.number !== 0)) { out.push(`${at}: number must be a non-zero whole number`); bad = true; }
        if (bad) continue;
        const m = deriveLogItem(item);
        m.powers.forEach((p) => {
          if (!p.powered) out.push(`${at}: ${ratText(p.abs)} log of ${ratText(p.arg)} leaves a root inside — the power law must give a whole number or a fraction`);
          else if (p.powered[0] > MAX_TYPED || p.powered[1] > MAX_TYPED) out.push(`${at}: ${ratText(p.arg)} to the power ${ratText(p.abs)} is too big to type`);
        });
        if (!m.value) continue;
        if (m.stages.length === 1) out.push(`${at}: there is nothing to simplify — one log, coefficient 1, no number`);
        if (m.value[0] > MAX_TYPED || m.value[1] > MAX_TYPED) out.push(`${at}: the combined number ${ratText(m.value)} is too big to type`);
        if (m.evaluates && m.exponent[1] > 4) out.push(`${at}: the answer ${ratText(m.exponent)} has a denominator above 4`);
        if (Math.abs(m.approx) > 10) out.push(`${at}: the answer is too far up the power ladder to draw (keep it within ±10)`);
        if (item.number && Math.abs(item.number) > 6) out.push(`${at}: number ${item.number} makes ${item.base}^${Math.abs(item.number)} — keep it small enough to work out by hand`);
      } else {
        out.push(`${at}: kind must be evaluate or combine`);
      }
    } catch (e) {
      out.push(`${at}: ${e.message}`);
    }
  }
  return out;
}
