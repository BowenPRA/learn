// src/utils/simultaneous.js
//
// Simultaneous linear equations — the pure parts behind the Simultaneous task
// (src/tasks/Simultaneous.jsx) and the EM_07A elimination widget.
//
// THE RULE (same as surds.js, sets.js, modulus.js): an item stores the
// QUESTION — the two equations exactly as the paper prints them — and
// everything else is derived here: the tidy form of each equation, the most
// efficient method and the reason for it, the multipliers, whether to add or
// subtract, the one-letter equation, both values, the substitution line and
// the check. So no answer key can drift, and `checkSimEqItems` refuses an item
// a student could not finish on the screen.
//
// An equation is authored as plain text: "3(x + 2) - 2(y - 3) = 0",
// "x + 1 = y/4", "x = (y + 1)/5", "y = 3x - 1". A chain, "7x - 2y = 4x + y = 10",
// says two things at once and is split into two equations (Assignment 07 Q19).
// Letters are single characters; any two may be used (x and y, a and b …).
//
// A TIDY equation is `{ a, b, c }` meaning a·(first letter) + b·(second
// letter) = c, with integers. It is what elimination works on. An equation
// already written that way is kept exactly as written (so −3x + 2y = 12 is not
// silently flipped); anything else — brackets, fractions, letters on both
// sides — is tidied to the canonical form: integers, no common factor, and a
// positive first coefficient.
//
// THE METHOD (Assignment 07 asks the student to say why the chosen method was
// the most efficient, so the choice is derived, never authored):
//   · a letter already on its own ("y = 3x − 1")      → substitution
//   · one letter's coefficients already the same size → elimination, straight away
//   · one coefficient divides the other               → elimination, multiply ONE equation
//   · otherwise                                       → elimination, multiply BOTH
import { fr, add, sub, mul, div, neg, isZero, frEq } from './linearEquation.js';

// ------------------------------------------------------------------ integers

const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const lcm = (a, b) => (a && b ? Math.abs(a * b) / gcd(a, b) : 0);
const isInt = (f) => f.d === 1;

// ------------------------------------------------------------------ parsing

function tokenize(src) {
  const s = String(src).replace(/[−–—]/g, '-').replace(/×/g, '*').replace(/÷/g, '/');
  const out = [];
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (/\s/.test(ch)) { i += 1; continue; }
    if (/\d/.test(ch)) {
      let j = i;
      while (j < s.length && /[\d.]/.test(s[j])) j += 1;
      out.push({ t: 'num', v: s.slice(i, j) });
      i = j;
      continue;
    }
    if (/[a-zA-Z]/.test(ch)) { out.push({ t: 'var', v: ch }); i += 1; continue; }
    if ('+-*/()='.includes(ch)) { out.push({ t: ch }); i += 1; continue; }
    throw new Error(`unexpected "${ch}" in "${src}"`);
  }
  return out;
}

/**
 * One side of an equation as a tree that remembers how it was WRITTEN — the
 * brackets, the fraction bars, the order — so the question can be printed
 * exactly as the paper prints it, and evaluated exactly as a linear form.
 */
function parseSideTokens(tokens) {
  let pos = 0;
  const peek = () => tokens[pos];
  function expr() {
    const terms = [];
    let sign = 1;
    if (peek()?.t === '+' || peek()?.t === '-') { sign = peek().t === '-' ? -1 : 1; pos += 1; }
    terms.push({ sign, node: term() });
    while (peek()?.t === '+' || peek()?.t === '-') {
      const s = peek().t === '-' ? -1 : 1;
      pos += 1;
      terms.push({ sign: s, node: term() });
    }
    return terms.length === 1 && terms[0].sign === 1 ? terms[0].node : { t: 'sum', terms };
  }
  function term() {
    let node = factor();
    for (;;) {
      const p = peek();
      if (p?.t === '*') { pos += 1; node = { t: 'mul', a: node, b: factor(), explicit: true }; }
      else if (p?.t === '/') { pos += 1; node = { t: 'div', a: node, b: factor() }; }
      else if (p && (p.t === 'var' || p.t === '(')) { node = { t: 'mul', a: node, b: factor(), explicit: false }; }
      else if (p?.t === 'num') throw new Error('a number cannot follow a letter or a bracket — write 3x, not x3');
      else break;
    }
    return node;
  }
  function factor() {
    const p = peek();
    if (!p) throw new Error('the side ends too early');
    if (p.t === 'num') { pos += 1; return { t: 'num', v: p.v }; }
    if (p.t === 'var') { pos += 1; return { t: 'var', v: p.v }; }
    if (p.t === '(') {
      pos += 1;
      const e = expr();
      if (peek()?.t !== ')') throw new Error('a bracket is not closed');
      pos += 1;
      return { t: 'group', a: e };
    }
    if (p.t === '-') { pos += 1; return { t: 'neg', a: factor() }; }
    throw new Error(`unexpected "${p.t}"`);
  }
  if (!tokens.length) throw new Error('an empty side');
  const node = expr();
  if (pos !== tokens.length) throw new Error(`unexpected "${tokens[pos].t}"`);
  return node;
}

// A linear form is { c: fr, [letter]: fr }.
const LZERO = () => ({ c: fr(0) });
const letterKeys = (L) => Object.keys(L).filter((k) => k !== 'c');
const hasLetters = (L) => letterKeys(L).some((k) => !isZero(L[k]));
function lscale(L, f) {
  const out = { c: mul(L.c, f) };
  for (const k of letterKeys(L)) out[k] = mul(L[k], f);
  return out;
}
function ladd(A, B, sign = 1) {
  const out = { c: sign > 0 ? add(A.c, B.c) : sub(A.c, B.c) };
  for (const k of new Set([...letterKeys(A), ...letterKeys(B)])) {
    const a = A[k] || fr(0);
    const b = B[k] || fr(0);
    out[k] = sign > 0 ? add(a, b) : sub(a, b);
  }
  return out;
}

/** The linear value of a written side. Refuses anything that is not linear. */
function linOf(node) {
  switch (node.t) {
    case 'num': return { c: fr(Number(node.v)) };
    case 'var': return { c: fr(0), [node.v]: fr(1) };
    case 'group': return linOf(node.a);
    case 'neg': return lscale(linOf(node.a), fr(-1));
    case 'sum': return node.terms.reduce((acc, { sign, node: n }) => ladd(acc, linOf(n), sign), LZERO());
    case 'mul': {
      const A = linOf(node.a);
      const B = linOf(node.b);
      if (hasLetters(A) && hasLetters(B)) throw new Error('two letters multiplied together — not a linear equation');
      return hasLetters(A) ? lscale(A, B.c) : lscale(B, A.c);
    }
    case 'div': {
      const B = linOf(node.b);
      if (hasLetters(B)) throw new Error('dividing by a letter — not a linear equation');
      if (isZero(B.c)) throw new Error('division by zero');
      return lscale(linOf(node.a), div(fr(1), B.c));
    }
    default: throw new Error(`unknown node ${node.t}`);
  }
}

// ------------------------------------------------------------------ printing

const stripGroup = (n) => (n.t === 'group' ? n.a : n);

/** A written side back as KaTeX, exactly as it was authored. */
function texOf(node) {
  switch (node.t) {
    case 'num': return node.v;
    case 'var': return node.v;
    case 'group': return `(${texOf(node.a)})`;
    case 'neg': return `-${texOf(node.a)}`;
    case 'sum': return node.terms.map(({ sign, node: n }, i) => {
      const body = texOf(n);
      if (i === 0) return sign < 0 ? `-${body}` : body;
      return `${sign < 0 ? '-' : '+'} ${body}`;
    }).join(' ');
    case 'mul': return node.explicit ? `${texOf(node.a)} \\times ${texOf(node.b)}` : `${texOf(node.a)}${texOf(node.b)}`;
    case 'div': return `\\dfrac{${texOf(stripGroup(node.a))}}{${texOf(stripGroup(node.b))}}`;
    default: return '?';
  }
}

/** "3x", "-x", "x", "0" — one coefficient in front of its letter. */
export function coefTerm(k, v, first = true) {
  const abs = Math.abs(k);
  const body = abs === 1 ? v : `${abs}${v}`;
  if (first) return k < 0 ? `-${body}` : body;
  return `${k < 0 ? '-' : '+'} ${body}`;
}

/** A tidy equation as KaTeX: `{ a: 3, b: -2, c: -12 }` → "3x - 2y = -12". */
export function tidyLatex({ a, b, c }, [v1, v2]) {
  const parts = [];
  if (a) parts.push(coefTerm(a, v1, true));
  if (b) parts.push(coefTerm(b, v2, parts.length === 0));
  return `${parts.join(' ') || '0'} = ${c}`;
}

/** One letter and a number: "5x = -10". */
export const oneLetterLatex = (k, v, c) => `${coefTerm(k, v, true)} = ${c}`;

/** A number in brackets when it is negative: 4(−2), 4(3). */
const bracket = (n) => `(${n})`;

// ------------------------------------------------------------------ equations

/** Parse "lhs = rhs" (or a chain "p = q = r") into its written sides. */
export function parseStatement(src) {
  const tokens = tokenize(src);
  const sides = [[]];
  for (const tk of tokens) {
    if (tk.t === '=') sides.push([]);
    else sides[sides.length - 1].push(tk);
  }
  if (sides.length < 2) throw new Error(`"${src}" has no equals sign`);
  return sides.map(parseSideTokens);
}

/** An equation's letters, in the order they are met. */
function lettersIn(L) {
  return letterKeys(L).filter((k) => !isZero(L[k]));
}

/**
 * The canonical tidy form of `left = right` for the letters [v1, v2]:
 * integers, no common factor, and a positive first coefficient.
 */
function canonicalTidy(left, right, [v1, v2]) {
  const D = ladd(linOf(left), linOf(right), -1); // left − right = 0
  const fa = D[v1] || fr(0);
  const fb = D[v2] || fr(0);
  const fc = neg(D.c);                           // a·v1 + b·v2 = −(constant)
  const den = [fa.d, fb.d, fc.d].reduce(lcm, 1);
  let a = fa.n * (den / fa.d);
  let b = fb.n * (den / fb.d);
  let c = fc.n * (den / fc.d);
  const g = gcd(gcd(a, b), c) || 1;
  a /= g; b /= g; c /= g;
  if (a < 0 || (a === 0 && b < 0)) { a = -a; b = -b; c = -c; }
  return { a: a + 0, b: b + 0, c: c + 0 };
}

/** k·letter with an integer k, exactly as a tidy equation writes it. */
function monomial(node) {
  if (node.t === 'var') return { v: node.v, k: 1 };
  if (node.t === 'mul' && !node.explicit && node.a.t === 'num' && node.b.t === 'var' && /^\d+$/.test(node.a.v)) return { v: node.b.v, k: Number(node.a.v) };
  return null;
}

/**
 * The equation as WRITTEN, if it is already tidy — letters on the left in
 * order, each once, whole-number coefficients, one number on the right.
 */
function writtenTidy(left, right, [v1, v2]) {
  const terms = left.t === 'sum' ? left.terms : [{ sign: 1, node: left }];
  const seen = [];
  const co = { [v1]: 0, [v2]: 0 };
  for (const { sign, node } of terms) {
    const m = monomial(node);
    if (!m || seen.includes(m.v) || !(m.v in co)) return null;
    seen.push(m.v);
    co[m.v] = sign * m.k;
  }
  if (seen.join('') !== [v1, v2].filter((v) => seen.includes(v)).join('')) return null;
  const r = right.t === 'neg' && right.a.t === 'num' ? -Number(right.a.v) : right.t === 'num' ? Number(right.v) : null;
  if (r == null || !Number.isInteger(r)) return null;
  return { a: co[v1], b: co[v2], c: r };
}

/**
 * "y = 3x − 1" (or "3x − 1 = y"): one side is a letter on its own and the
 * other side holds only the other letter, with whole numbers and no fraction.
 * Returns { v, w, k, c } meaning v = k·w + c, or null.
 */
function subjectForm(left, right, vars) {
  for (const [bare, other] of [[left, right], [right, left]]) {
    if (bare.t !== 'var' || !vars.includes(bare.v)) continue;
    const L = linOf(other);
    const w = vars.find((v) => v !== bare.v);
    if (L[bare.v] && !isZero(L[bare.v])) continue;
    const k = L[w] || fr(0);
    if (isZero(k) || !isInt(k) || !isInt(L.c)) continue;
    if (JSON.stringify(other).includes('"div"')) continue;
    return { v: bare.v, w, k: k.n, c: L.c.n, node: other };
  }
  return null;
}

// ------------------------------------------------------------------ the model

/** The two equations of an item as authored strings (a chain is split). */
export function equationsOf(item) {
  if (item.chain) {
    const sides = parseStatement(item.chain);
    const last = sides[sides.length - 1];
    if (hasLetters(linOf(last))) throw new Error('a chain must end in a number');
    return { sides: sides.slice(0, -1).map((s) => [s, last]), chain: sides };
  }
  return { sides: (item.eqs || []).map((src) => {
    const s = parseStatement(src);
    if (s.length !== 2) throw new Error(`"${src}" has more than one equals sign — author it as a chain`);
    return s;
  }) };
}

/** The item's question as KaTeX lines. */
export function simEqQuestionLatex(item) {
  const { sides, chain } = equationsOf(item);
  if (chain) return [chain.map(texOf).join(' = ')];
  return sides.map(([l, r]) => `${texOf(l)} = ${texOf(r)}`);
}

/**
 * Elimination with the multipliers [m1, m2]: which letter now matches in size
 * (null if neither), the two scaled equations, add or subtract, and the
 * one-letter equation that is left. The screen calls this with the STUDENT's
 * multipliers, so any pair that works is followed through honestly.
 */
export function eliminate(tidy, [m1, m2], vars) {
  const [e1, e2] = tidy;
  const s1 = { a: e1.a * m1, b: e1.b * m1, c: e1.c * m1 };
  const s2 = { a: e2.a * m2, b: e2.b * m2, c: e2.c * m2 };
  let letter = null;
  if (Math.abs(s1.b) === Math.abs(s2.b) && s1.b !== 0) letter = vars[1];
  if (Math.abs(s1.a) === Math.abs(s2.a) && s1.a !== 0) {
    // Both match only when the equations are multiples of each other, which
    // the validator refuses; otherwise prefer the letter that just matched.
    letter = letter ? letter : vars[0];
  }
  if (!letter) return { letter: null, scaled: [s1, s2] };
  const key = letter === vars[0] ? 'a' : 'b';
  const op = Math.sign(s1[key]) === Math.sign(s2[key]) ? 'sub' : 'add';
  const k = op === 'sub' ? -1 : 1;
  const left = { a: s1.a + k * s2.a, b: s1.b + k * s2.b, c: s1.c + k * s2.c };
  const keep = letter === vars[0] ? vars[1] : vars[0];
  const coef = keep === vars[0] ? left.a : left.b;
  return { letter, keep, op, scaled: [s1, s2], result: { k: coef, c: left.c } };
}

/** The multipliers that make `letter` match with the smallest numbers. */
function bestMultipliers(tidy, key) {
  const p = Math.abs(tidy[0][key]);
  const q = Math.abs(tidy[1][key]);
  const L = lcm(p, q);
  return [L / p, L / q];
}

/**
 * Which letter elimination should remove, and how. Prefer a letter that
 * already matches; then one where only ONE equation needs multiplying; then
 * the smaller multiplier; then the letter with opposite signs (adding is
 * safer than subtracting a negative); then the second letter.
 */
function planElimination(tidy, vars) {
  const cands = ['b', 'a'].map((key) => {
    const [m1, m2] = bestMultipliers(tidy, key);
    const opposite = Math.sign(tidy[0][key]) !== Math.sign(tidy[1][key]);
    return { key, letter: key === 'a' ? vars[0] : vars[1], m: [m1, m2], same: m1 === 1 && m2 === 1, one: m1 === 1 || m2 === 1, size: Math.max(m1, m2), opposite };
  });
  cands.sort((x, y) => (y.same - x.same) || (y.one - x.one) || (x.size - y.size) || (y.opposite - x.opposite));
  return cands[0];
}

/**
 * Everything the Simultaneous screen needs, derived from the question.
 */
export function deriveSimEq(item) {
  const { sides, chain } = equationsOf(item);
  if (sides.length !== 2) throw new Error('needs exactly two equations');
  const lins = sides.map(([l, r]) => ladd(linOf(l), linOf(r), -1));
  const letters = [...new Set(lins.flatMap(lettersIn))].sort();
  if (letters.length !== 2) throw new Error(`needs exactly two letters, found ${letters.join(', ') || 'none'}`);
  const vars = item.vars || letters;

  const written = sides.map(([l, r]) => writtenTidy(l, r, vars));
  const tidy = sides.map(([l, r], i) => written[i] || canonicalTidy(l, r, vars));
  const tidyNeeded = written.map((w) => !w);
  const subjects = sides.map(([l, r]) => subjectForm(l, r, vars));

  // Solve exactly (Cramer) — the validator insists on whole numbers.
  const [e1, e2] = tidy;
  const det = e1.a * e2.b - e1.b * e2.a;
  if (det === 0) throw new Error('the two equations have no single solution');
  const sol = { [vars[0]]: fr(e1.c * e2.b - e1.b * e2.c, det), [vars[1]]: fr(e1.a * e2.c - e1.c * e2.a, det) };

  const labels = ['(1)', '(2)'];
  const base = { item, vars, sides, chain: !!chain, written, tidy, tidyNeeded, sol, labels };

  // ---- substitution: a letter already on its own
  const subIdx = subjects.findIndex(Boolean);
  if (subIdx !== -1) {
    const S = subjects[subIdx];
    const other = 1 - subIdx;
    const E = tidy[other];
    const kv = S.v === vars[0] ? 'a' : 'b';          // the subject's coefficient in the other equation
    const kw = S.w === vars[0] ? 'a' : 'b';
    const bv = E[kv];
    const collected = { k: E[kw] + bv * S.k, c: bv * S.c, rhs: E.c };  // k·w + c = rhs
    const wVal = sol[S.w];
    const vVal = sol[S.v];
    const subLine = substitutedLatex(E, vars, S);
    return {
      ...base,
      method: 'sub',
      reason: 'subject',
      subject: { idx: subIdx, v: S.v, w: S.w, k: S.k, c: S.c, latex: `${S.v} = ${texOf(S.node)}` },
      other,
      subLine,
      collected,
      first: S.w,
      firstValue: wVal,
      back: { idx: subIdx, letter: S.v, value: vVal, latex: `${S.v} = ${backLatex(S, wVal)}` },
      check: checkLine(E, vars, sol, other),
    };
  }

  // ---- elimination
  const plan = planElimination(tidy, vars);
  const reason = plan.same ? 'same' : plan.one ? 'one' : 'both';
  const elim = eliminate(tidy, plan.m, vars);
  const first = elim.keep;
  // Back-substitute into the equation where the other letter is simplest.
  const otherKey = elim.letter === vars[0] ? 'a' : 'b';
  const backIdx = Math.abs(tidy[0][otherKey]) <= Math.abs(tidy[1][otherKey]) ? 0 : 1;
  return {
    ...base,
    method: 'elim',
    reason,
    plan: { letter: plan.letter, m: plan.m },
    elim,
    first,
    firstValue: sol[first],
    back: backOf(tidy[backIdx], vars, first, sol, backIdx),
    check: checkLine(tidy[1 - backIdx], vars, sol, 1 - backIdx),
  };
}

/** a·w + b·(k·w + c) = rhs, written out. */
function substitutedLatex(E, vars, S) {
  const kv = S.v === vars[0] ? 'a' : 'b';
  const kw = S.w === vars[0] ? 'a' : 'b';
  const inner = `(${texOf(S.node)})`;
  const bv = E[kv];
  const vPart = Math.abs(bv) === 1 ? inner : `${Math.abs(bv)}${inner}`;
  const wPart = E[kw] ? coefTerm(E[kw], S.w, true) : '';
  const vFirst = S.v === vars[0];
  let lhs;
  if (vFirst) lhs = `${bv < 0 ? '-' : ''}${vPart}${wPart ? ` ${E[kw] < 0 ? '-' : '+'} ${coefTerm(Math.abs(E[kw]), S.w, true)}` : ''}`;
  else lhs = `${wPart}${wPart ? ` ${bv < 0 ? '-' : '+'} ` : bv < 0 ? '-' : ''}${vPart}`;
  return `${lhs} = ${E.c}`;
}

/** "2(4) − 3" — the subject's right-hand side with the value put in. */
function backLatex(S, wVal) {
  const val = frLatex(wVal);
  const k = S.k === 1 ? '' : S.k === -1 ? '-' : `${S.k}`;
  const lead = S.k === 1 ? bracket(val) : `${k}${bracket(val)}`;
  return S.c ? `${lead} ${S.c < 0 ? '-' : '+'} ${Math.abs(S.c)}` : lead;
}

/** Put the first letter's value into a tidy equation, leaving the other. */
function backOf(E, vars, known, sol, idx) {
  const unknown = vars.find((v) => v !== known);
  const kKey = known === vars[0] ? 'a' : 'b';
  const uKey = unknown === vars[0] ? 'a' : 'b';
  const knownPart = `${E[kKey] === 1 ? '' : E[kKey] === -1 ? '-' : E[kKey]}${bracket(frLatex(sol[known]))}`;
  const uPart = coefTerm(E[uKey], unknown, false);
  const latex = known === vars[0] ? `${knownPart} ${uPart} = ${E.c}` : `${coefTerm(E[uKey], unknown, true)} ${E[kKey] < 0 ? '-' : '+'} ${Math.abs(E[kKey]) === 1 ? '' : Math.abs(E[kKey])}${bracket(frLatex(sol[known]))} = ${E.c}`;
  return { idx, letter: unknown, value: sol[unknown], latex };
}

/** The other equation with both values put in: its left side's value must be its right side. */
function checkLine(E, vars, sol, idx) {
  const term = (k, v) => `${k === 1 ? '' : k === -1 ? '-' : k}${bracket(frLatex(sol[v]))}`;
  const parts = [];
  if (E.a) parts.push(term(E.a, vars[0]));
  if (E.b) parts.push(parts.length ? `${E.b < 0 ? '-' : '+'} ${term(Math.abs(E.b), vars[1])}` : term(E.b, vars[1]));
  const value = add(mul(fr(E.a), sol[vars[0]]), mul(fr(E.b), sol[vars[1]]));
  return { idx, latex: parts.join(' '), value, rhs: E.c };
}

/** "3", "-2", "\dfrac{9}{4}". */
export function frLatex(f) {
  if (f.d === 1) return String(f.n);
  return `${f.n < 0 ? '-' : ''}\\dfrac{${Math.abs(f.n)}}{${f.d}}`;
}

// ------------------------------------------------------------------ marking helpers

/** Is the typed tidy equation {a, b, c} the same equation as `want`? */
export function sameEquation(t, want) {
  if (![t.a, t.b, t.c].every(Number.isInteger)) return false;
  if (t.a === 0 && t.b === 0) return false;
  // Proportional: t = λ·want for some λ ≠ 0.
  return t.a * want.b === t.b * want.a && t.a * want.c === t.c * want.a && t.b * want.c === t.c * want.b
    && (t.a !== 0 || want.a === 0) && (t.b !== 0 || want.b === 0) && (t.c !== 0 || want.c === 0);
}

/** A typed number: "3", "-2", "9/4", "2.25". Null when it is not one. */
export function parseTypedNumber(s) {
  const t = String(s ?? '').trim().replace(/[−–]/g, '-');
  if (!t) return null;
  const m = t.match(/^(-?\d+)\s*\/\s*(\d+)$/);
  if (m) return Number(m[2]) === 0 ? null : fr(Number(m[1]), Number(m[2]));
  if (/^-?\d+(\.\d+)?$/.test(t)) return fr(Number(t));
  return null;
}

export const sameValue = (a, b) => !!a && !!b && frEq(fr(a.n, a.d), fr(b.n, b.d));

/**
 * The four method options, each with its reason and why it is or is not the
 * quickest here. Exactly one is correct — the derived method.
 */
export function methodOptions(model) {
  const { vars, tidy, reason } = model;
  const L = model.method === 'elim' ? model.plan.letter : null;
  const key = L === vars[0] ? 'a' : 'b';
  const sameLetter = [vars[1], vars[0]].find((v) => {
    const k = v === vars[0] ? 'a' : 'b';
    return Math.abs(tidy[0][k]) === Math.abs(tidy[1][k]);
  });
  const subj = model.method === 'sub' ? model.subject : null;
  const opts = [
    {
      id: 'subject',
      label: 'Substitution',
      why: subj ? `$${subj.v}$ is already on its own in ${model.labels[subj.idx]}` : 'rearrange one equation to make a letter the subject',
      correct: reason === 'subject',
      feedback: reason === 'subject'
        ? `Right — ${model.labels[subj.idx]} already says what $${subj.v}$ is, so it can go straight into the other equation.`
        : 'Nothing is on its own yet. Rearranging first means extra work — and usually fractions. Elimination avoids both.',
    },
    {
      id: 'same',
      label: 'Elimination, straight away',
      why: sameLetter ? `the $${sameLetter}$ terms are already the same size` : 'the terms already match',
      correct: reason === 'same',
      feedback: reason === 'same'
        ? `Right — the $${L}$ terms are already the same size, so add or subtract the equations as they are.`
        : reason === 'subject'
          ? 'Elimination would work — but one letter is already on its own, so substitution is quicker.'
          : `Not yet: the $${vars[0]}$ terms are $${coefTerm(tidy[0].a, vars[0])}$ and $${coefTerm(tidy[1].a, vars[0])}$, the $${vars[1]}$ terms $${coefTerm(tidy[0].b, vars[1])}$ and $${coefTerm(tidy[1].b, vars[1])}$ — no pair is the same size.`,
    },
    {
      id: 'one',
      label: 'Elimination, multiply one equation',
      why: 'one coefficient goes into the other',
      correct: reason === 'one',
      feedback: reason === 'one'
        ? `Right — $${Math.abs(tidy[0][key])}$ and $${Math.abs(tidy[1][key])}$: one goes into the other, so only one equation needs multiplying.`
        : reason === 'same'
          ? 'No need to multiply — a pair of terms is already the same size.'
          : reason === 'subject'
            ? 'That works, but one letter is already on its own — substitution needs no multiplying at all.'
            : 'Neither coefficient goes into the other for either letter, so one multiplier is not enough.',
    },
    {
      id: 'both',
      label: 'Elimination, multiply both equations',
      why: 'no coefficient goes into another',
      correct: reason === 'both',
      feedback: reason === 'both'
        ? `Right — no coefficient divides another, so both equations are multiplied (to make $${Math.abs(tidy[0][key] * model.plan.m[0])}${L}$).`
        : 'That works, but it makes bigger numbers than you need. Look for something quicker.',
    },
  ];
  return opts;
}

/** The options for splitting a chain "p = q = r" into two equations. */
export function chainOptions(item) {
  const { chain } = equationsOf(item);
  const [p, q, r] = chain.map(texOf);
  return [
    { id: 'pq', latex: `${p} = ${q} \\;\\text{ only}`, correct: false, why: 'That is true, but it is ONE equation with two unknowns — you need two equations.' },
    { id: 'sum', latex: `${p} + ${q} = ${r}`, correct: false, why: 'Each expression equals the number on its own — they do not add up to it.' },
    { id: 'two', latex: `${p} = ${r} \\;\\text{ and }\\; ${q} = ${r}`, correct: true, why: 'Right — each expression is equal to the number, so the chain holds two equations.' },
    { id: 'one', latex: `${p} = ${r} \\;\\text{ only}`, correct: false, why: `That leaves ${q} out — the chain says it equals ${r} too.` },
  ];
}

// ------------------------------------------------------------------ validation

/** Problems with a list of Simultaneous items, as strings. Empty when sound. */
export function checkSimEqItems(items) {
  const out = [];
  const ids = new Set();
  for (const [i, item] of (items || []).entries()) {
    const at = `item ${item?.id || i + 1}`;
    if (!item?.id) out.push(`${at}: needs an id`);
    if (ids.has(item?.id)) out.push(`${at}: duplicate id`);
    ids.add(item?.id);
    if (!!item?.chain === Array.isArray(item?.eqs)) { out.push(`${at}: give eqs (two strings) or chain, not both`); continue; }
    if (item.eqs && item.eqs.length !== 2) { out.push(`${at}: eqs must hold two equations`); continue; }
    let m;
    try { m = deriveSimEq(item); } catch (e) { out.push(`${at}: ${e.message}`); continue; }
    for (const v of m.vars) {
      if (!isInt(m.sol[v])) out.push(`${at}: ${v} = ${m.sol[v].n}/${m.sol[v].d} is not a whole number — keep answers whole`);
      else if (Math.abs(m.sol[v].n) > 60) out.push(`${at}: ${v} = ${m.sol[v].n} is too big to check by hand`);
    }
    for (const [j, t] of m.tidy.entries()) {
      if (!t.a || !t.b) out.push(`${at}: equation ${j + 1} tidies to one letter only — both letters should appear`);
      if ([t.a, t.b, t.c].some((n) => Math.abs(n) > 99)) out.push(`${at}: equation ${j + 1} tidies to ${tidyLatex(t, m.vars)} — numbers too big for the boxes`);
    }
    if (m.method === 'elim') {
      if (Math.max(...m.plan.m) > 12) out.push(`${at}: multipliers ${m.plan.m.join(' and ')} are too big`);
      if (m.elim.scaled.some((s) => [s.a, s.b, s.c].some((n) => Math.abs(n) > 199))) out.push(`${at}: the multiplied equations run past three digits`);
      if (!m.elim.letter || !m.elim.result.k) out.push(`${at}: elimination does not leave one letter`);
    } else if (!m.collected.k) out.push(`${at}: substituting leaves no letter`);
    if (item.chain && !m.chain) out.push(`${at}: chain did not split`);
  }
  return out;
}

// The written-side parser, shared with utils/inequalities.js (the boundary
// lines of a region are authored exactly like these equations).
export { linOf as linearValue, texOf as sideLatex };
