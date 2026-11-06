// src/utils/algebra.js
//
// Year 7 algebra, derived. The engine behind Collect It (2.3), Expand It
// (2.4), Undo It (2.5), Algebra Pyramids, and the maths activities in those
// decks. An item states only the QUESTION — "7x + 5y − 3x + y", "4(3 − c)",
// "2a + 4 = 18" — and everything a student is marked on is worked out here:
// the terms and their signs, which terms are like, each basket's total, every
// box of an expansion grid, the flow chart of an equation and its reverse,
// the answer, and the name of the slip behind a wrong answer. The validator
// runs the same functions, so an author cannot ship a wrong key.
//
// Numbers are exact: coefficients are rationals [p, q] (utils/logs.js), and a
// "kind" of term is a monomial key — 'x', 'ab', 'x^2', or '1' for a number.
// ab and ba are one key, because the letters are sorted; x and x² are two.
//
// What a student types is read with the same parser as the items, so
// "4x+6y", "6y + 4x" and "4x + 6 y" are one answer. Whether it is FINISHED —
// collected, no brackets, x not 1x — is a separate question (`formOf`),
// because "right value, not simplified" is a different message from "wrong".

import { rat, rAdd, rMul, rDiv, rNeg, rEq, rIsInt, rValue } from './logs.js';

const ZERO = [0, 1];
const ONE = [1, 1];

// ------------------------------------------------------------------ input

/** Presentation to plain ASCII maths: Unicode minus, ×, ÷, ², ³, LaTeX bits. */
export function normalizeInput(raw) {
  return String(raw ?? '')
    .replace(/\\left|\\right/g, '')
    .replace(/\\(?:d|t)?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, '($1)/($2)')
    .replace(/\\times|\\cdot/g, '*')
    .replace(/\\div/g, '/')
    .replace(/\^\{([^{}]*)\}/g, '^$1')
    .replace(/[{}$]/g, '')
    .replace(/[−–—]/g, '-')
    .replace(/[×·✕]/g, '*')
    .replace(/÷/g, '/')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/\s+/g, '');
}

function tokenize(src) {
  const s = normalizeInput(src);
  const out = [];
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (/\d/.test(ch)) {
      let n = '';
      while (i < s.length && /\d/.test(s[i])) n += s[i++];
      out.push({ t: 'num', v: Number(n) });
      continue;
    }
    if (/[a-zA-Z]/.test(ch)) { out.push({ t: 'var', v: ch.toLowerCase() }); i += 1; continue; }
    if ('+-*/^()='.includes(ch)) { out.push({ t: ch }); i += 1; continue; }
    throw new Error(`cannot read "${ch}"`);
  }
  return out;
}

// ------------------------------------------------------------------ parser
// AST nodes: num · var · add · sub · neg · mul(implicit?) · div · pow · group.

export function parseExpr(src) {
  const toks = typeof src === 'string' ? tokenize(src) : src;
  let i = 0;
  const peek = () => toks[i];
  const take = (t) => { if (toks[i]?.t !== t) throw new Error(`expected "${t}"`); i += 1; };
  const startsFactor = (tk) => tk && (tk.t === 'num' || tk.t === 'var' || tk.t === '(');

  function atom() {
    const tk = peek();
    if (!tk) throw new Error('the expression ends too soon');
    if (tk.t === 'num') { i += 1; return { t: 'num', v: tk.v }; }
    if (tk.t === 'var') { i += 1; return { t: 'var', v: tk.v }; }
    if (tk.t === '(') { i += 1; const e = expr(); take(')'); return { t: 'group', a: e }; }
    if (tk.t === '-') { i += 1; return { t: 'neg', a: power(), inner: true }; }
    throw new Error(`unexpected "${tk.t}"`);
  }
  function power() {
    const a = atom();
    if (peek()?.t === '^') {
      i += 1;
      const n = peek();
      if (n?.t !== 'num') throw new Error('a power must be a whole number');
      i += 1;
      return { t: 'pow', a, n: n.v };
    }
    return a;
  }
  function term() {
    let a = power();
    for (;;) {
      const tk = peek();
      if (tk?.t === '*') { i += 1; a = { t: 'mul', a, b: power(), implicit: false }; }
      else if (tk?.t === '/') { i += 1; a = { t: 'div', a, b: power() }; }
      else if (startsFactor(tk)) a = { t: 'mul', a, b: power(), implicit: true };
      else return a;
    }
  }
  function expr() {
    let a;
    if (peek()?.t === '-') { i += 1; a = { t: 'neg', a: term() }; }
    else { if (peek()?.t === '+') i += 1; a = term(); }
    for (;;) {
      const tk = peek();
      if (tk?.t === '+') { i += 1; a = { t: 'add', a, b: term() }; }
      else if (tk?.t === '-') { i += 1; a = { t: 'sub', a, b: term() }; }
      else return a;
    }
  }
  const tree = expr();
  if (i !== toks.length) throw new Error(`unexpected "${toks[i].t === 'num' || toks[i].t === 'var' ? toks[i].v : toks[i].t}"`);
  return tree;
}

// ------------------------------------------------------------------ polynomials
// A poly is a plain object: monomial key → rational coefficient. Zero terms
// are removed, so {} is 0.

/** Monomial object {a:1, b:1} → key 'ab'; {x:2} → 'x^2'; {} → '1'. */
export function keyOf(mono) {
  const letters = Object.keys(mono).filter((l) => mono[l] > 0).sort();
  if (!letters.length) return '1';
  return letters.map((l) => (mono[l] === 1 ? l : `${l}^${mono[l]}`)).join('');
}

/** Key 'x^2y' → {x:2, y:1}. */
export function monoOf(key) {
  const out = {};
  if (key === '1') return out;
  const re = /([a-z])(?:\^(\d+))?/g;
  let m;
  while ((m = re.exec(key))) out[m[1]] = (out[m[1]] || 0) + (m[2] ? Number(m[2]) : 1);
  return out;
}

const clean = (p) => Object.fromEntries(Object.entries(p).filter(([, c]) => c[0] !== 0));
export const polyAdd = (p, q) => {
  const out = { ...p };
  for (const [k, c] of Object.entries(q)) out[k] = out[k] ? rAdd(out[k], c) : c;
  return clean(out);
};
export const polyNeg = (p) => Object.fromEntries(Object.entries(p).map(([k, c]) => [k, rNeg(c)]));
export const polySub = (p, q) => polyAdd(p, polyNeg(q));
export function polyMul(p, q) {
  let out = {};
  for (const [k1, c1] of Object.entries(p)) {
    for (const [k2, c2] of Object.entries(q)) {
      const m1 = monoOf(k1);
      const m2 = monoOf(k2);
      for (const [l, e] of Object.entries(m2)) m1[l] = (m1[l] || 0) + e;
      out = polyAdd(out, { [keyOf(m1)]: rMul(c1, c2) });
    }
  }
  return out;
}
export const constPoly = (n) => (n === 0 ? {} : { 1: Array.isArray(n) ? n : rat(n, 1) });
export const isConstant = (p) => Object.keys(p).every((k) => k === '1');
export const constOf = (p) => p['1'] || ZERO;
export const polyEq = (p, q) => {
  const ks = new Set([...Object.keys(p), ...Object.keys(q)]);
  for (const k of ks) if (!rEq(p[k] || ZERO, q[k] || ZERO)) return false;
  return true;
};

/** The value of an AST as a poly. Division by a non-constant throws. */
export function polyOf(node) {
  switch (node.t) {
    case 'num': return constPoly(node.v);
    case 'var': return { [node.v]: ONE };
    case 'group': return polyOf(node.a);
    case 'neg': return polyNeg(polyOf(node.a));
    case 'add': return polyAdd(polyOf(node.a), polyOf(node.b));
    case 'sub': return polySub(polyOf(node.a), polyOf(node.b));
    case 'mul': return polyMul(polyOf(node.a), polyOf(node.b));
    case 'div': {
      const d = polyOf(node.b);
      if (!isConstant(d) || !Object.keys(d).length) throw new Error('can only divide by a number');
      return polyMul(polyOf(node.a), { 1: rDiv(ONE, constOf(d)) });
    }
    case 'pow': {
      if (node.n > 6) throw new Error('that power is too big');
      let out = constPoly(1);
      const base = polyOf(node.a);
      for (let k = 0; k < node.n; k += 1) out = polyMul(out, base);
      return out;
    }
    default: throw new Error(`unknown node ${node.t}`);
  }
}

/** Parse a string to a poly, or null when it will not parse. */
export function tryPoly(src) {
  try { return polyOf(parseExpr(src)); } catch { return null; }
}

export const hasVar = (node) => {
  if (!node) return false;
  if (node.t === 'var') return true;
  return hasVar(node.a) || hasVar(node.b);
};
const hasGroup = (node) => !!node && (node.t === 'group' || hasGroup(node.a) || hasGroup(node.b));

// ------------------------------------------------------------------ printing

const rAbs = (c) => [Math.abs(c[0]), c[1]];
const ratTex = (c) => (c[1] === 1 ? `${c[0]}` : `\\frac{${c[0]}}{${c[1]}}`);

/** 'x^2y' → 'x^{2}y'. */
export const monoLatex = (key) => (key === '1' ? '' : key.replace(/\^(\d+)/g, '^{$1}'));
/** 'x^2y' → 'x²y' (plain text). */
export const monoText = (key) => (key === '1' ? '' : key.replace(/\^2/g, '²').replace(/\^3/g, '³').replace(/\^(\d+)/g, '^$1'));

/** One term, unsigned magnitude: 7x, x, 5, ½x. */
export function termAbsLatex(c, key) {
  const a = rAbs(c);
  if (key === '1') return ratTex(a);
  if (a[0] === 1 && a[1] === 1) return monoLatex(key);
  return `${ratTex(a)}${monoLatex(key)}`;
}
export function termAbsText(c, key) {
  const a = rAbs(c);
  const num = a[1] === 1 ? `${a[0]}` : `${a[0]}/${a[1]}`;
  if (key === '1') return num;
  if (a[0] === 1 && a[1] === 1) return monoText(key);
  return `${num}${monoText(key)}`;
}

/** A signed term on its own: −3x, 7x, −1. */
export const termLatex = (c, key) => `${c[0] < 0 ? '-' : ''}${termAbsLatex(c, key)}`;
export const termText = (c, key) => `${c[0] < 0 ? '−' : ''}${termAbsText(c, key)}`;

/**
 * The keys of a poly in the order an answer is written: letter kinds in the
 * order they first appear in `order` (then any others, alphabetically), the
 * number last.
 */
export function answerOrder(p, order = []) {
  const keys = Object.keys(p);
  const letters = [...order.filter((k) => k !== '1' && keys.includes(k)), ...keys.filter((k) => k !== '1' && !order.includes(k)).sort()];
  return keys.includes('1') ? [...letters, '1'] : letters;
}

/** A poly as LaTeX / plain text, in `keys` order (default: answerOrder). */
export function polyLatex(p, keys = answerOrder(p)) {
  if (!keys.length) return '0';
  return keys.map((k, i) => {
    const c = p[k];
    if (i === 0) return termLatex(c, k);
    return `${c[0] < 0 ? ' - ' : ' + '}${termAbsLatex(c, k)}`;
  }).join('');
}
export function polyText(p, keys = answerOrder(p)) {
  if (!keys.length) return '0';
  return keys.map((k, i) => {
    const c = p[k];
    if (i === 0) return termText(c, k);
    return `${c[0] < 0 ? ' − ' : ' + '}${termAbsText(c, k)}`;
  }).join('');
}

/** An authored expression, printed as the book prints it (for the question line). */
export function exprLatex(src) {
  return normalizeInput(src)
    .replace(/\*/g, ' \\times ')
    .replace(/\^(\d+)/g, '^{$1}')
    .replace(/([+\-=])/g, ' $1 ')
    .replace(/\(\s+-\s+/g, '(-')
    .replace(/^\s+-\s+/, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

// ------------------------------------------------------------------ kinds

/** 'a' or 'an' before a letter's NAME: an x term, a y term, an ab term. */
export const articleFor = (key) => (key === '1' || !/^[aefhilmnorsx]/.test(key) ? 'a' : 'an');
/** Terms as a written run with spaced signs: 8s − s. */
export const writtenRun = (terms) => terms.map((t, i) => (i === 0 ? t.text : `${t.coef[0] < 0 ? '− ' : '+ '}${t.text.replace(/^−/, '')}`)).join(' ');

/** What to call a kind of term, for a basket label. */
export function kindName(key) {
  if (key === '1') return { en: 'Numbers', vn: 'Các số', fr: 'Nombres' };
  const m = monoText(key);
  return { en: `${m} terms`, vn: `Hạng tử ${m}`, fr: `Termes en ${m}` };
}

// ------------------------------------------------------------------ written form

/**
 * The top-level terms exactly as written: 7x + 5y − 3x + y →
 * [{sign:+1, node:7x}, {sign:+1, node:5y}, {sign:−1, node:3x}, {sign:+1, node:y}].
 * A sign typed straight after another (4x + −3) is kept on the term, flagged.
 */
export function topTerms(node) {
  const out = [];
  const walk = (n, sign) => {
    if (n.t === 'add') { walk(n.a, sign); walk(n.b, sign); return; }
    if (n.t === 'sub') { walk(n.a, sign); walk(n.b, -sign); return; }
    if (n.t === 'neg' && !n.inner) { walk(n.a, -sign); return; }
    out.push({ sign, node: n });
  };
  walk(node, 1);
  return out;
}

/**
 * Is a written term a plain monomial — a whole number (or none) then letters
 * (with powers), like 7x, ab, 3x², 12? Returns { coef, key } or null, and a
 * reason when it is a monomial written the long way (x3, 1x, 2×x, aa).
 */
export function writtenMonomial(node) {
  const parts = [];
  const flat = (n) => {
    if (n.t === 'mul') { flat(n.a); flat(n.b); if (!n.implicit) parts.push({ t: 'times' }); return; }
    parts.push(n);
  };
  flat(node);
  let reason = null;
  if (parts.some((p) => p.t === 'times')) reason = 'times-sign';
  const factors = parts.filter((p) => p.t !== 'times');
  let coef = null;
  const mono = {};
  // `shown` keeps the letters in the order they were written (ba stays ba on
  // screen), while `key` sorts them so ab and ba land in one basket.
  let shown = '';
  for (const [idx, f] of factors.entries()) {
    if (f.t === 'num') {
      if (coef !== null) return null;
      if (idx !== 0) reason = reason || 'number-after-letter';
      coef = f.v;
    } else if (f.t === 'var') {
      if (mono[f.v]) reason = reason || 'repeated-letter';
      mono[f.v] = (mono[f.v] || 0) + 1;
      shown += f.v;
    } else if (f.t === 'pow' && f.a.t === 'var') {
      if (mono[f.a.v]) reason = reason || 'repeated-letter';
      mono[f.a.v] = (mono[f.a.v] || 0) + f.n;
      shown += `${f.a.v}^${f.n}`;
    } else return null;
  }
  if (coef === 1 && Object.keys(mono).length) reason = reason || 'one-coefficient';
  if (coef === 0) reason = reason || 'zero-term';
  const key = keyOf(mono);
  return { coef: coef === null ? 1 : coef, key, shown: key === '1' ? '1' : shown, reason };
}

/**
 * How a typed answer is WRITTEN, independent of its value:
 *   { brackets, collected, simplest, reason }
 * `simplest` means: no brackets, every term a monomial written number-first,
 * no kind twice, no 1x, no 0x, no "+ −".
 */
export function formOf(src) {
  let tree;
  try { tree = parseExpr(src); } catch (e) { return { parsed: false, error: e.message }; }
  const brackets = hasGroup(tree);
  const terms = topTerms(tree);
  let reason = brackets ? 'brackets' : null;
  const seen = new Set();
  let collected = !brackets;
  for (const t of terms) {
    if (t.node.t === 'neg') reason = reason || 'double-sign';
    const m = writtenMonomial(t.node.t === 'neg' ? t.node.a : t.node);
    if (!m) { collected = false; reason = reason || 'not-a-term'; continue; }
    if (m.reason) reason = reason || m.reason;
    if (seen.has(m.key)) { collected = false; reason = reason || 'like-terms'; }
    seen.add(m.key);
  }
  return { parsed: true, brackets, collected, simplest: !reason, reason };
}

const FORM_MESSAGE = {
  brackets: { en: 'The value is right, but the brackets are still there. Multiply them out.', vn: 'Giá trị đúng, nhưng vẫn còn dấu ngoặc. Hãy nhân phá ngoặc.', fr: 'La valeur est juste, mais les parenthèses sont toujours là. Développe-les.' },
  'like-terms': { en: 'The value is right, but it is not finished: two terms are still the same kind. Collect them.', vn: 'Giá trị đúng, nhưng chưa xong: vẫn còn hai hạng tử cùng loại. Hãy gộp chúng.', fr: "La valeur est juste, mais ce n'est pas fini : deux termes sont encore semblables. Réduis-les." },
  'one-coefficient': { en: 'Right — but write x, not 1x. The 1 is invisible.', vn: 'Đúng — nhưng hãy viết x, không viết 1x. Số 1 được ẩn đi.', fr: 'Correct — mais écris x, pas 1x. Le 1 est invisible.' },
  'number-after-letter': { en: 'Right value — but write the number first: 3x, not x3.', vn: 'Giá trị đúng — nhưng hãy viết số trước: 3x, không phải x3.', fr: "Bonne valeur — mais écris le nombre d'abord : 3x, pas x3." },
  'times-sign': { en: 'Right value — but leave out the × sign: write 3x, not 3 × x.', vn: 'Giá trị đúng — nhưng bỏ dấu ×: viết 3x, không phải 3 × x.', fr: 'Bonne valeur — mais enlève le signe × : écris 3x, pas 3 × x.' },
  'repeated-letter': { en: 'Right value — but a letter times itself is a power: x × x is x².', vn: 'Giá trị đúng — nhưng một chữ nhân với chính nó là lũy thừa: x × x là x².', fr: "Bonne valeur — mais une lettre multipliée par elle-même est une puissance : x × x, c'est x²." },
  'zero-term': { en: 'Right value — but a term that comes to 0 is left out.', vn: 'Giá trị đúng — nhưng hạng tử bằng 0 thì bỏ đi.', fr: "Bonne valeur — mais un terme qui vaut 0 ne s'écrit pas." },
  'double-sign': { en: 'Right value — but a plus followed by a minus is just a minus: write x − 3, not x + −3.', vn: 'Giá trị đúng — nhưng dấu cộng rồi dấu trừ chỉ là dấu trừ: viết x − 3, không viết x + −3.', fr: "Bonne valeur — mais un plus suivi d'un moins, c'est juste un moins : écris x − 3, pas x + −3." },
  'not-a-term': { en: 'The value is right, but it is not written in its simplest form yet.', vn: 'Giá trị đúng, nhưng chưa viết ở dạng gọn nhất.', fr: "La valeur est juste, mais elle n'est pas encore écrite sous sa forme la plus simple." },
};
export const formMessage = (reason) => FORM_MESSAGE[reason] || FORM_MESSAGE['not-a-term'];

// ------------------------------------------------------------------ collect (2.3)

/**
 * The model of a "simplify" item. `expr` must be a sum of written monomials
 * (no brackets). Returns the terms as written, one basket per kind (in order
 * of first appearance, numbers last), each basket's total, and the answer.
 */
export function collectModel(expr) {
  const tree = parseExpr(expr);
  if (hasGroup(tree)) throw new Error('has brackets — use an expand item');
  const written = topTerms(tree).map((t, index) => {
    const m = writtenMonomial(t.node);
    if (!m) throw new Error(`"${expr}": term ${index + 1} is not a single term`);
    const c = rat(t.sign * m.coef, 1);
    return { index, coef: c, key: m.key, abs: termAbsLatex(c, m.shown), latex: termLatex(c, m.shown), text: termText(c, m.shown), hiddenOne: m.coef === 1 && m.key !== '1' };
  });
  const order = [];
  for (const t of written) if (!order.includes(t.key)) order.push(t.key);
  const keys = [...order.filter((k) => k !== '1'), ...order.filter((k) => k === '1')];
  const baskets = keys.map((key) => {
    const terms = written.filter((t) => t.key === key);
    const total = terms.reduce((s, t) => rAdd(s, t.coef), ZERO);
    return { key, name: kindName(key), terms: terms.map((t) => t.index), total, totalLatex: total[0] === 0 ? '0' : termLatex(total, key) };
  });
  const answer = baskets.reduce((p, b) => polyAdd(p, b.total[0] === 0 ? {} : { [b.key]: b.total }), {});
  return {
    expr,
    written,
    baskets,
    order: keys,
    answer,
    answerLatex: polyLatex(answer, answerOrder(answer, keys)),
    answerText: polyText(answer, answerOrder(answer, keys)),
    simplifiable: baskets.some((b) => b.terms.length > 1),
    questionLatex: written.map((t, i) => (i === 0 ? t.latex : `${t.coef[0] < 0 ? ' - ' : ' + '}${t.abs}`)).join(''),
  };
}

/**
 * What went wrong in a simplify answer. Returns { ok, code, en, vn, fr } where ok
 * means right AND finished. Codes, most specific first:
 *   form-*        right value, not finished (see formMessage)
 *   invisible-one a kind with a bare x was totalled as if x were 0x
 *   lost-sign     a minus term was added instead of taken away
 *   letter-gone   the right number, but the letter disappeared (8s − s = 7)
 *   unlike        two different kinds were joined (3a + 2b = 5ab, 3x + 5 = 8x)
 *   squared       x + x written as x²
 */
export function diagnoseSimplify(expr, typed) {
  const model = collectModel(expr);
  const got = tryPoly(typed);
  if (!got) return { ok: false, code: 'unreadable', en: 'That cannot be read as an expression. Use numbers, letters, + and −.', vn: 'Không đọc được biểu thức. Hãy dùng số, chữ cái, + và −.', fr: 'Je ne peux pas lire cette expression. Utilise des nombres, des lettres, + et −.' };
  if (polyEq(got, model.answer)) {
    const form = formOf(typed);
    if (form.simplest) return { ok: true, code: 'ok' };
    return { ok: false, equivalent: true, code: `form-${form.reason}`, ...formMessage(form.reason) };
  }
  const want = model.answer;
  const keysGot = Object.keys(got);
  // x + x = x²
  for (const b of model.baskets) {
    const sq = `${b.key}^2`;
    if (b.key.length === 1 && got[sq] && !model.answer[sq]) {
      return { ok: false, code: 'squared', en: `${b.key} + ${b.key} is 2${b.key}. Only ${b.key} × ${b.key} is ${b.key}². Adding like terms never changes the letter.`, vn: `${b.key} + ${b.key} là 2${b.key}. Chỉ có ${b.key} × ${b.key} mới là ${b.key}². Cộng hạng tử đồng dạng không làm thay đổi chữ cái.`, fr: `${b.key} + ${b.key}, c'est 2${b.key}. Seul ${b.key} × ${b.key} donne ${b.key}². Additionner des termes semblables ne change jamais la lettre.` };
    }
  }
  // the letter vanished: 8s − s = 7
  for (const b of model.baskets) {
    if (b.key === '1' || b.total[0] === 0 || got[b.key]) continue;
    if (got['1'] && rEq(got['1'], rAdd(constOf(want), b.total))) {
      const terms = b.terms.map((i) => model.written[i]);
      return { ok: false, code: 'letter-gone', en: `The letter never disappears: ${writtenRun(terms)} is ${termText(b.total, b.key)}, not ${termText(b.total, '1')}.`, vn: `Chữ cái không bao giờ biến mất: kết quả là ${termText(b.total, b.key)}, không phải ${termText(b.total, '1')}.`, fr: `La lettre ne disparaît jamais : ${writtenRun(terms)} donne ${termText(b.total, b.key)}, pas ${termText(b.total, '1')}.` };
    }
  }
  // a whole kind left out: 4x for 4x + 6y
  const wantKeys = Object.keys(want);
  if (keysGot.length < wantKeys.length && keysGot.every((k) => want[k] && rEq(got[k], want[k]))) {
    const missing = wantKeys.filter((k) => !got[k]);
    return { ok: false, code: 'missing-kind', en: `Not finished — ${missing.map((k) => (k === '1' ? 'the numbers' : `the ${monoText(k)} terms`)).join(' and ')} are missing. Every basket goes into the answer.`, vn: `Chưa xong — còn thiếu ${missing.map((k) => (k === '1' ? 'các số' : `các hạng tử ${monoText(k)}`)).join(' và ')}. Mọi rổ đều phải có trong đáp án.`, fr: `Pas fini — il manque ${missing.map((k) => (k === '1' ? 'les nombres' : `les termes en ${monoText(k)}`)).join(' et ')}. Chaque panier va dans la réponse.` };
  }
  // unlike kinds joined: a key in the answer that the question never had
  const foreign = keysGot.filter((k) => !model.order.includes(k));
  if (foreign.length || keysGot.length < Object.keys(want).length) {
    for (const b of model.baskets) {
      if (b.total[0] === 0 || b.key === '1') continue;
      const c = got[b.key];
      const tryNum = model.baskets.find((o) => o.key === '1');
      if (tryNum && c && rEq(c, rAdd(b.total, tryNum.total)) && !got['1']) {
        return { ok: false, code: 'unlike', en: `A number and ${articleFor(b.key)} ${monoText(b.key)} term are not like terms, so they cannot be added: ${polyText(want)} is already finished.`, vn: `Một số và một hạng tử ${monoText(b.key)} không đồng dạng nên không cộng được: ${polyText(want)} là xong rồi.`, fr: `Un nombre et un terme en ${monoText(b.key)} ne sont pas des termes semblables, donc on ne peut pas les additionner : ${polyText(want)} est déjà fini.` };
      }
    }
    return { ok: false, code: 'unlike', en: `Only like terms collect. ${model.baskets.map((b) => monoText(b.key) || 'numbers').join(', ')} are different kinds, so each is totalled on its own: ${polyText(want)}.`, vn: `Chỉ gộp các hạng tử đồng dạng. ${model.baskets.map((b) => monoText(b.key) || 'các số').join(', ')} là các loại khác nhau, nên mỗi loại được cộng riêng: ${polyText(want)}.`, fr: `Seuls les termes semblables se réduisent. ${model.baskets.map((b) => monoText(b.key) || 'nombres').join(', ')} sont de types différents, donc chacun est additionné à part : ${polyText(want)}.` };
  }
  for (const b of model.baskets) {
    const g = got[b.key] || ZERO;
    if (rEq(g, b.total)) continue;
    const terms = b.terms.map((i) => model.written[i]);
    // the letter vanished: 8s − s = 7
    if (b.key !== '1' && g[0] === 0 && got['1'] && rEq(rAdd(got['1'], rNeg(constOf(want))), b.total)) {
      return { ok: false, code: 'letter-gone', en: `The letter never disappears: ${writtenRun(terms)} is ${termText(b.total, b.key)}, not ${termText(b.total, '1')}.`, vn: `Chữ cái không bao giờ biến mất: kết quả là ${termText(b.total, b.key)}, không phải ${termText(b.total, '1')}.`, fr: `La lettre ne disparaît jamais : ${writtenRun(terms)} donne ${termText(b.total, b.key)}, pas ${termText(b.total, '1')}.` };
    }
    // x means 1x: totalling as if a bare letter were worth nothing
    const noOnes = terms.filter((t) => !t.hiddenOne).reduce((s, t) => rAdd(s, t.coef), ZERO);
    if (terms.some((t) => t.hiddenOne) && rEq(g, noOnes)) {
      return { ok: false, code: 'invisible-one', en: `${monoText(b.key)} means 1${monoText(b.key)}. Count it: the ${monoText(b.key)} terms make ${termText(b.total, b.key)}.`, vn: `${monoText(b.key)} nghĩa là 1${monoText(b.key)}. Hãy đếm nó: các hạng tử ${monoText(b.key)} cộng lại được ${termText(b.total, b.key)}.`, fr: `${monoText(b.key)} veut dire 1${monoText(b.key)}. Compte-le : les termes en ${monoText(b.key)} font ${termText(b.total, b.key)}.` };
    }
    // a minus sign left behind
    const allPlus = terms.reduce((s, t) => rAdd(s, [Math.abs(t.coef[0]), t.coef[1]]), ZERO);
    if (terms.some((t) => t.coef[0] < 0) && rEq(g, allPlus)) {
      return { ok: false, code: 'lost-sign', en: `The sign in front of a term belongs to it. ${terms.filter((t) => t.coef[0] < 0).map((t) => t.text).join(' and ')} is taken away, so the ${b.key === '1' ? 'numbers make' : `${monoText(b.key)} terms make`} ${termText(b.total, b.key)}.`, vn: `Dấu đứng trước hạng tử thuộc về hạng tử đó. ${terms.filter((t) => t.coef[0] < 0).map((t) => t.text).join(' và ')} là bị trừ đi, nên kết quả là ${termText(b.total, b.key)}.`, fr: `Le signe devant un terme lui appartient. ${terms.filter((t) => t.coef[0] < 0).map((t) => t.text).join(' et ')} est soustrait, donc ${b.key === '1' ? 'les nombres font' : `les termes en ${monoText(b.key)} font`} ${termText(b.total, b.key)}.` };
    }
  }
  return { ok: false, code: 'wrong', en: `Collect each kind on its own: ${model.baskets.map((b) => `${b.terms.map((i) => model.written[i].text).join(' ')} → ${b.total[0] === 0 ? '0' : termText(b.total, b.key)}`).join(';  ')}.`, vn: `Gộp riêng từng loại: ${model.baskets.map((b) => `${b.terms.map((i) => model.written[i].text).join(' ')} → ${b.total[0] === 0 ? '0' : termText(b.total, b.key)}`).join(';  ')}.`, fr: `Réduis chaque type à part : ${model.baskets.map((b) => `${b.terms.map((i) => model.written[i].text).join(' ')} → ${b.total[0] === 0 ? '0' : termText(b.total, b.key)}`).join(';  ')}.` };
}

/** A basket's typed total ("4x", "4", "-x", "0") against the derived total. */
export function diagnoseBasket(model, basketIndex, typed) {
  const b = model.baskets[basketIndex];
  const terms = b.terms.map((i) => model.written[i]);
  const raw = normalizeInput(typed);
  // accept "4" for "4x" in a basket that already names its letter
  let got = tryPoly(raw);
  if (got && isConstant(got) && b.key !== '1' && raw !== '0') got = polyMul(got, { [b.key]: ONE });
  if (!got) return { ok: false, code: 'unreadable', en: 'Type the total, like 4x or −2.', vn: 'Nhập tổng, ví dụ 4x hoặc −2.', fr: 'Écris le total, comme 4x ou −2.' };
  const g = got[b.key] || ZERO;
  const onlyThisKind = Object.keys(got).every((k) => k === b.key);
  if (onlyThisKind && rEq(g, b.total)) return { ok: true };
  if (!onlyThisKind) return { ok: false, code: 'unlike', en: `Everything in this basket is ${b.key === '1' ? 'a number' : `${articleFor(b.key)} ${monoText(b.key)} term`}, so the total is one too.`, vn: `Mọi thứ trong rổ này đều là ${b.key === '1' ? 'số' : `hạng tử ${monoText(b.key)}`}, nên tổng cũng vậy.`, fr: `Tout dans ce panier est ${b.key === '1' ? 'un nombre' : `un terme en ${monoText(b.key)}`}, donc le total aussi.` };
  const noOnes = terms.filter((t) => !t.hiddenOne).reduce((s, t) => rAdd(s, t.coef), ZERO);
  if (terms.some((t) => t.hiddenOne) && rEq(g, noOnes)) return { ok: false, code: 'invisible-one', en: `${monoText(b.key)} on its own is 1${monoText(b.key)} — count it.`, vn: `${monoText(b.key)} đứng một mình là 1${monoText(b.key)} — hãy đếm nó.`, fr: `${monoText(b.key)} tout seul, c'est 1${monoText(b.key)} — compte-le.` };
  const allPlus = terms.reduce((s, t) => rAdd(s, [Math.abs(t.coef[0]), t.coef[1]]), ZERO);
  if (terms.some((t) => t.coef[0] < 0) && rEq(g, allPlus)) return { ok: false, code: 'lost-sign', en: 'A minus term is taken away, not added.', vn: 'Hạng tử có dấu trừ thì bị trừ đi, không cộng vào.', fr: 'Un terme avec un moins est soustrait, pas additionné.' };
  if (rEq(g, rNeg(b.total))) return { ok: false, code: 'sign', en: 'Check the sign of the total — is there more added or more taken away?', vn: 'Kiểm tra dấu của tổng — phần cộng vào nhiều hơn hay phần trừ đi nhiều hơn?', fr: "Vérifie le signe du total — y a-t-il plus d'ajouté ou plus d'enlevé ?" };
  return { ok: false, code: 'wrong', en: `Go along the basket: ${terms.map((t) => t.text).join(', ')}.`, vn: `Đi lần lượt trong rổ: ${terms.map((t) => t.text).join(', ')}.`, fr: `Parcours le panier : ${terms.map((t) => t.text).join(', ')}.` };
}

// ------------------------------------------------------------------ expand (2.4)

/** A written term (monomial) as { coef, key }, or null. */
function monomialOfNode(node) {
  const m = writtenMonomial(node);
  return m ? { coef: rat(m.coef, 1), key: m.key } : null;
}

/**
 * The model of an "expand" item: a sum of bracket products k(a ± b ± …) and
 * loose terms, e.g. "4(3 − c)", "5(2x − 2) + x + 17", "4(x + 4) + 7(x + 1)".
 * Each bracket becomes a grid: the outside term (with the sign in front of it)
 * down the side, the inside terms (with their signs) across the top, one box
 * per product. `expanded` is the terms in grid order before collecting;
 * `answer` is the simplified poly.
 */
export function expandModel(expr) {
  const tree = parseExpr(expr);
  const parts = topTerms(tree);
  const pieces = [];
  for (const [pi, part] of parts.entries()) {
    const n = part.node;
    // k(…) or (…)k or just (…)
    let outerNode = null;
    let groupNode = null;
    if (n.t === 'mul' && n.b.t === 'group') { outerNode = n.a; groupNode = n.b; }
    else if (n.t === 'mul' && n.a.t === 'group') { outerNode = n.b; groupNode = n.a; }
    else if (n.t === 'group') { groupNode = n; }
    if (groupNode) {
      const outer = outerNode ? monomialOfNode(outerNode) : { coef: ONE, key: '1' };
      if (!outer) throw new Error(`"${expr}": part ${pi + 1} — the outside of the bracket must be a single term`);
      outer.coef = rMul(outer.coef, rat(part.sign, 1));
      const inner = topTerms(groupNode.a).map((t) => {
        const m = monomialOfNode(t.node);
        if (!m) throw new Error(`"${expr}": a term inside the bracket is not a single term`);
        return { coef: rMul(m.coef, rat(t.sign, 1)), key: m.key };
      });
      const cells = inner.map((t) => {
        const prod = polyMul({ [outer.key]: outer.coef }, { [t.key]: t.coef });
        const [key] = Object.keys(prod);
        return { coef: prod[key] || ZERO, key: key || '1', latex: prod[key] ? termLatex(prod[key], key) : '0' };
      });
      pieces.push({ kind: 'bracket', outer: { ...outer, latex: termLatex(outer.coef, outer.key) }, inner: inner.map((t) => ({ ...t, latex: termLatex(t.coef, t.key) })), cells });
    } else {
      const m = monomialOfNode(n);
      if (!m) throw new Error(`"${expr}": part ${pi + 1} is neither a bracket nor a single term`);
      const c = rMul(m.coef, rat(part.sign, 1));
      pieces.push({ kind: 'term', coef: c, key: m.key, latex: termLatex(c, m.key) });
    }
  }
  const brackets = pieces.filter((p) => p.kind === 'bracket');
  if (!brackets.length) throw new Error(`"${expr}" has no brackets to expand`);
  const expandedTerms = pieces.flatMap((p) => (p.kind === 'bracket' ? p.cells.map((c) => ({ coef: c.coef, key: c.key })) : [{ coef: p.coef, key: p.key }]));
  const expandedLatex = expandedTerms.map((t, i) => (i === 0 ? termLatex(t.coef, t.key) : `${t.coef[0] < 0 ? ' - ' : ' + '}${termAbsLatex(t.coef, t.key)}`)).join('');
  const order = [];
  for (const t of expandedTerms) if (!order.includes(t.key)) order.push(t.key);
  const answer = expandedTerms.reduce((p, t) => polyAdd(p, { [t.key]: t.coef }), {});
  const seen = new Set();
  const needsCollect = expandedTerms.some((t) => { const dup = seen.has(t.key); seen.add(t.key); return dup; });
  // A single bracket keeps the book's order (9(3 + y) = 27 + 9y); anything
  // collected is written letters first.
  const keys = needsCollect ? answerOrder(answer, order) : order.filter((k) => answer[k]);
  return {
    expr,
    pieces,
    brackets,
    expandedTerms,
    expandedLatex,
    needsCollect,
    answer,
    answerLatex: polyLatex(answer, keys),
    answerText: polyText(answer, keys),
    questionLatex: exprLatex(expr),
  };
}

/**
 * One box of a grid: the outside term × one inside term. Diagnoses the four
 * slips the classroom deck names: added instead of multiplied (5 × 2p → 7p),
 * the inside term copied unmultiplied (5(a + 3) → 3), the sign left behind,
 * and a letter lost or invented.
 */
export function diagnoseCell(outer, inner, typed) {
  const want = polyMul({ [outer.key]: outer.coef }, { [inner.key]: inner.coef });
  const got = tryPoly(typed);
  if (!got) return { ok: false, code: 'unreadable', en: 'Type the product, like 15 or −4c.', vn: 'Nhập tích, ví dụ 15 hoặc −4c.', fr: 'Écris le produit, comme 15 ou −4c.' };
  if (polyEq(got, want)) {
    const form = formOf(typed);
    if (form.simplest) return { ok: true };
    return { ok: false, equivalent: true, code: `form-${form.reason}`, ...formMessage(form.reason) };
  }
  const oText = termText(outer.coef, outer.key);
  const iText = termText(inner.coef, inner.key);
  const wText = polyText(want);
  if (polyEq(got, { [inner.key]: inner.coef })) return { ok: false, code: 'not-multiplied', en: `Every box is a multiplication: ${oText} × ${iText}. The inside term has to be multiplied too.`, vn: `Mỗi ô là một phép nhân: ${oText} × ${iText}. Hạng tử bên trong cũng phải được nhân.`, fr: `Chaque case est une multiplication : ${oText} × ${iText}. Le terme à l'intérieur doit aussi être multiplié.` };
  if (polyEq(got, polyNeg(want))) return { ok: false, code: 'sign', en: `Take the sign with the term: ${oText} × ${iText} = ${wText}.`, vn: `Mang theo dấu cùng hạng tử: ${oText} × ${iText} = ${wText}.`, fr: `Garde le signe avec le terme : ${oText} × ${iText} = ${wText}.` };
  const [gk] = Object.keys(got);
  const [wk] = Object.keys(want);
  if (Object.keys(got).length === 1 && gk === wk) {
    const g = got[gk];
    const added = rAdd(outer.coef, inner.coef);
    if (rEq(g, added) || rEq(g, rAdd(rAbs(outer.coef), rAbs(inner.coef)))) {
      return { ok: false, code: 'added', en: `Multiply the numbers, do not add them: ${oText} × ${iText} = ${wText}.`, vn: `Nhân các số, đừng cộng: ${oText} × ${iText} = ${wText}.`, fr: `Multiplie les nombres, ne les additionne pas : ${oText} × ${iText} = ${wText}.` };
    }
  }
  if (Object.keys(got).length === 1 && gk !== wk) {
    return { ok: false, code: 'letter', en: `Check the letter: ${oText} × ${iText} = ${wText}.`, vn: `Kiểm tra chữ cái: ${oText} × ${iText} = ${wText}.`, fr: `Vérifie la lettre : ${oText} × ${iText} = ${wText}.` };
  }
  return { ok: false, code: 'wrong', en: `${oText} × ${iText} = ${wText}.`, vn: `${oText} × ${iText} = ${wText}.`, fr: `${oText} × ${iText} = ${wText}.` };
}

/**
 * A whole typed expansion. `simplify` (default: whatever the item needs)
 * requires the like terms to be collected too.
 */
export function diagnoseExpand(expr, typed, { simplify } = {}) {
  const model = expandModel(expr);
  const mustCollect = simplify ?? model.needsCollect;
  const got = tryPoly(typed);
  if (!got) return { ok: false, code: 'unreadable', en: 'That cannot be read as an expression. Use numbers, letters, + and −.', vn: 'Không đọc được biểu thức. Hãy dùng số, chữ cái, + và −.', fr: 'Je ne peux pas lire cette expression. Utilise des nombres, des lettres, + et −.' };
  const form = formOf(typed);
  if (polyEq(got, model.answer)) {
    if (form.brackets) return { ok: false, equivalent: true, code: 'form-brackets', ...formMessage('brackets') };
    if (mustCollect && !form.simplest) return { ok: false, equivalent: true, code: `form-${form.reason}`, ...formMessage(form.reason) };
    if (!mustCollect && form.reason && form.reason !== 'like-terms') return { ok: false, equivalent: true, code: `form-${form.reason}`, ...formMessage(form.reason) };
    return { ok: true };
  }
  // only the first term multiplied: 5(a + 3) = 5a + 3
  let firstOnly = {};
  let added = {};
  let collectedUnlike = false;
  for (const p of model.pieces) {
    if (p.kind === 'term') { firstOnly = polyAdd(firstOnly, { [p.key]: p.coef }); added = polyAdd(added, { [p.key]: p.coef }); continue; }
    p.inner.forEach((t, i) => {
      firstOnly = polyAdd(firstOnly, i === 0 ? polyMul({ [p.outer.key]: p.outer.coef }, { [t.key]: t.coef }) : { [t.key]: t.coef });
      const c = p.outer.key === '1' ? { [t.key]: rAdd(p.outer.coef, t.coef) } : polyMul({ [p.outer.key]: p.outer.coef }, { [t.key]: t.coef });
      added = polyAdd(added, c);
    });
  }
  if (polyEq(got, firstOnly)) return { ok: false, code: 'first-only', en: 'Multiply EVERY term inside the bracket, not just the first one.', vn: 'Nhân MỌI hạng tử bên trong ngoặc, không chỉ hạng tử đầu tiên.', fr: 'Multiplie CHAQUE terme dans la parenthèse, pas seulement le premier.' };
  if (polyEq(got, added)) return { ok: false, code: 'added', en: 'Multiply the number outside by each term — do not add it.', vn: 'Nhân số bên ngoài với từng hạng tử — đừng cộng.', fr: "Multiplie le nombre à l'extérieur par chaque terme — ne l'additionne pas." };
  // carried on past the answer: 12 − 4c = 8c
  const keys = Object.keys(model.answer);
  if (keys.length > Object.keys(got).length && Object.keys(got).length === 1) {
    const sum = keys.reduce((s, k) => rAdd(s, model.answer[k]), ZERO);
    const [gk] = Object.keys(got);
    if (rEq(got[gk], sum)) collectedUnlike = true;
  }
  if (collectedUnlike) return { ok: false, code: 'past-answer', en: `Stop at ${model.answerText}. Its terms are not like terms, so they cannot be collected.`, vn: `Dừng ở ${model.answerText}. Các hạng tử không đồng dạng nên không gộp được.`, fr: `Arrête-toi à ${model.answerText}. Ses termes ne sont pas semblables, donc on ne peut pas les réduire.` };
  // a sign flipped somewhere
  const signSlip = model.expandedTerms.some((t, i) => {
    const flipped = model.expandedTerms.reduce((p, u, j) => polyAdd(p, { [u.key]: j === i ? rNeg(u.coef) : u.coef }), {});
    return polyEq(got, flipped);
  });
  if (signSlip) return { ok: false, code: 'sign', en: 'One sign is wrong. The sign in front of a term goes into its box with it.', vn: 'Có một dấu bị sai. Dấu đứng trước hạng tử đi vào ô cùng với hạng tử đó.', fr: 'Un signe est faux. Le signe devant un terme va dans sa case avec lui.' };
  // A pointer, not the answer: the student still has another go.
  return { ok: false, code: 'wrong', en: `Fill the grid one box at a time: multiply every term inside by the term outside, keeping each sign${model.needsCollect ? ', then collect the like terms' : ''}.`, vn: `Điền từng ô một: nhân mọi hạng tử bên trong với hạng tử bên ngoài, giữ nguyên dấu${model.needsCollect ? ', rồi gộp các hạng tử đồng dạng' : ''}.`, fr: `Remplis la grille une case à la fois : multiplie chaque terme à l'intérieur par le terme à l'extérieur, en gardant chaque signe${model.needsCollect ? ', puis réduis les termes semblables' : ''}.` };
}

/**
 * A work-backwards item: "□(2x + 3) = 8x + 12". The item is the full
 * expression with `hide` naming what is blanked: 'outer' and/or 'inner:<i>'
 * (the i-th inside term's number). Returns the display pieces and the values.
 */
export function missingModel(expr, hide = ['outer']) {
  const model = expandModel(expr);
  if (model.pieces.length !== 1 || model.brackets.length !== 1) throw new Error(`"${expr}": a work-backwards item is one bracket`);
  const b = model.brackets[0];
  const blanks = [];
  const outerHidden = hide.includes('outer');
  if (outerHidden && b.inner.every((_, i) => hide.includes(`inner:${i}`))) throw new Error(`"${expr}": leave at least one inside number showing, or the blanks have more than one answer`);
  if (outerHidden) {
    if (b.outer.key !== '1' || b.outer.coef[0] < 2 || !rIsInt(b.outer.coef)) throw new Error(`"${expr}": a hidden outside number must be a whole number above 1`);
    blanks.push({ id: 'outer', value: b.outer.coef[0] });
  }
  const innerTex = b.inner.map((t, i) => {
    const hidden = hide.includes(`inner:${i}`);
    const abs = rAbs(t.coef);
    if (hidden) {
      if (!rIsInt(t.coef) || abs[0] < 1) throw new Error(`"${expr}": hidden inside number must be a whole number`);
      if (t.key !== '1' && abs[0] === 1) throw new Error(`"${expr}": do not hide an invisible 1`);
      blanks.push({ id: `inner:${i}`, value: abs[0] });
    }
    const body = hidden ? `\\square${monoLatex(t.key)}` : termAbsLatex(t.coef, t.key);
    if (i === 0) return `${t.coef[0] < 0 ? '-' : ''}${body}`;
    return `${t.coef[0] < 0 ? ' - ' : ' + '}${body}`;
  }).join('');
  for (const h of hide) if (h !== 'outer' && !/^inner:\d+$/.test(h)) throw new Error(`"${expr}": unknown hide "${h}"`);
  for (const h of hide) if (h.startsWith('inner:') && Number(h.slice(6)) >= b.inner.length) throw new Error(`"${expr}": ${h} is not an inside term`);
  const outerTex = outerHidden ? '\\square' : (b.outer.key === '1' && rEq(b.outer.coef, ONE) ? '' : termLatex(b.outer.coef, b.outer.key));
  return { model, blanks, latex: `${outerTex}(${innerTex}) = ${model.answerLatex}` };
}

// ------------------------------------------------------------------ equations & flow charts (2.5)

const OPS = {
  '+': { inv: '-', apply: (v, n) => rAdd(v, n), tex: '+', text: '+' },
  '-': { inv: '+', apply: (v, n) => rAdd(v, rNeg(n)), tex: '-', text: '−' },
  '*': { inv: '/', apply: (v, n) => rMul(v, n), tex: '\\times', text: '×' },
  '/': { inv: '*', apply: (v, n) => rDiv(v, n), tex: '\\div', text: '÷' },
};
export const opText = (op) => `${OPS[op.op].text} ${op.n}`;
export const opLatex = (op) => `${OPS[op.op].tex} ${op.n}`;
export const inverseOf = (op) => ({ op: OPS[op.op].inv, n: op.n });
export const applyOp = (v, op) => OPS[op.op].apply(v, rat(op.n, 1));
export const sameOp = (a, b) => a.op === b.op && a.n === b.n;

const constValue = (node) => {
  const p = polyOf(node);
  if (!isConstant(p)) return null;
  return constOf(p);
};
const posInt = (c) => c && rIsInt(c) && c[0] >= 1;

/**
 * Peel the side of an equation that holds the letter, outermost operation
 * first, into the forward flow chart: 2a + 4 → [×2, +4]; 3(x + 2) → [+2, ×3];
 * x/4 − 3 → [÷4, −3]; 6 + x → [+6]. Shapes the flow-chart method cannot
 * reverse in one pass (20 − x, a letter on both sides) throw.
 */
export function flowOps(node) {
  const ops = [];
  let n = node;
  let letter;
  for (;;) {
    while (n.t === 'group') n = n.a;
    if (n.t === 'var') { letter = n.v; break; }
    if (n.t === 'add') {
      const [inner, other] = hasVar(n.a) ? [n.a, n.b] : [n.b, n.a];
      if (hasVar(other)) throw new Error('the letter appears twice');
      const c = constValue(other);
      if (!posInt(c)) throw new Error('an added number must be a positive whole number');
      ops.unshift({ op: '+', n: c[0] }); n = inner; continue;
    }
    if (n.t === 'sub') {
      if (hasVar(n.b)) throw new Error('"a number minus the letter" cannot be reversed in one pass');
      const c = constValue(n.b);
      if (!posInt(c)) throw new Error('a subtracted number must be a positive whole number');
      ops.unshift({ op: '-', n: c[0] }); n = n.a; continue;
    }
    if (n.t === 'mul') {
      const [inner, other] = hasVar(n.a) ? [n.a, n.b] : [n.b, n.a];
      if (hasVar(other)) throw new Error('the letter appears twice');
      const c = constValue(other);
      if (!posInt(c) || c[0] < 2) throw new Error('a multiplier must be a whole number above 1');
      ops.unshift({ op: '*', n: c[0] }); n = inner; continue;
    }
    if (n.t === 'div') {
      if (hasVar(n.b)) throw new Error('cannot divide by the letter');
      const c = constValue(n.b);
      if (!posInt(c) || c[0] < 2) throw new Error('a divisor must be a whole number above 1');
      ops.unshift({ op: '/', n: c[0] }); n = n.a; continue;
    }
    throw new Error('this equation is not a chain of + − × ÷ on one letter');
  }
  return { ops, letter };
}

/** The expression after the first k forward operations, as LaTeX: a → 2a → 2a + 4. */
export function chainLatex(letter, ops, k = ops.length) {
  let tex = letter;
  let kind = 'var';            // var | product | sum | frac
  for (const op of ops.slice(0, k)) {
    if (op.op === '*') {
      tex = kind === 'var' ? `${op.n}${tex}` : kind === 'product' ? `${op.n} \\times ${tex}` : `${op.n}(${tex})`;
      kind = 'product';
    } else if (op.op === '/') {
      tex = `\\frac{${tex}}{${op.n}}`;
      kind = 'frac';
    } else {
      tex = `${tex} ${op.op === '+' ? '+' : '-'} ${op.n}`;
      kind = 'sum';
    }
  }
  return tex;
}

/**
 * The model of an equation item. `eq` is authored ("2a + 4 = 18",
 * "30 = 6c + 12", "3(x + 2) = 21", "n/4 = 5") or built from a think-of-a-number
 * chain `{ ops: [['*', 3], ['+', 5]], result: 26, letter: 'n' }`.
 */
export function equationModel(item) {
  let letter;
  let ops;
  let target;
  let swapped = false;
  if (item.ops) {
    ops = item.ops.map(([op, n]) => ({ op: op === '×' ? '*' : op === '÷' ? '/' : op === '−' ? '-' : op, n }));
    for (const o of ops) {
      if (!OPS[o.op]) throw new Error(`unknown operation "${o.op}"`);
      if (!Number.isInteger(o.n) || o.n < 1 || ((o.op === '*' || o.op === '/') && o.n < 2)) throw new Error(`operation ${o.op} ${o.n} needs a whole number (above 1 for × and ÷)`);
    }
    letter = item.letter || 'n';
    if (!Number.isInteger(item.result)) throw new Error('result must be a whole number');
    target = rat(item.result, 1);
  } else {
    const src = String(item.eq || '');
    const halves = normalizeInput(src).split('=');
    if (halves.length !== 2) throw new Error(`"${src}" needs exactly one = sign`);
    const L = parseExpr(halves[0]);
    const R = parseExpr(halves[1]);
    if (hasVar(L) && hasVar(R)) throw new Error(`"${src}": the letter is on both sides`);
    if (!hasVar(L) && !hasVar(R)) throw new Error(`"${src}" has no letter`);
    swapped = !hasVar(L);
    const side = swapped ? R : L;
    const other = swapped ? L : R;
    target = constValue(other);
    if (!target || !rIsInt(target)) throw new Error(`"${src}": the other side must be a whole number`);
    ({ ops, letter } = flowOps(side));
  }
  if (!ops.length) throw new Error('nothing to undo');
  const inverse = [...ops].reverse().map(inverseOf);
  const back = [target];
  for (const op of inverse) back.push(applyOp(back[back.length - 1], op));
  const solution = back[back.length - 1];
  const forward = [solution];
  for (const op of ops) forward.push(applyOp(forward[forward.length - 1], op));
  if (!rEq(forward[forward.length - 1], target)) throw new Error('the chain does not come back to the answer');
  const sideLatex = chainLatex(letter, ops);
  const eqLatex = swapped ? `${target[0]} = ${sideLatex}` : `${sideLatex} = ${target[0]}`;
  return {
    letter,
    ops,
    inverse,
    target,
    swapped,
    back,               // target, then each value after undoing a step
    forward,            // solution, then each value after doing a step
    solution,
    sideLatex,
    eqLatex,
    stepsLatex: ops.map((_, k) => chainLatex(letter, ops, k + 1)),
    integerSteps: back.every(rIsInt),
  };
}

const numText = (c) => (c[1] === 1 ? (c[0] < 0 ? `−${-c[0]}` : `${c[0]}`) : `${c[0]}/${c[1]}`);
export const valueText = numText;

/** A typed solution against the model: right, did-the-same-operation, undid in the wrong order, or a failed check. */
export function diagnoseSolve(model, typed) {
  const raw = String(typed ?? '').replace(/^\s*[a-z]\s*=\s*/i, '');
  const got = tryPoly(raw);
  if (!got || !isConstant(got)) return { ok: false, code: 'unreadable', en: 'Type a number, like 7 or −4.', vn: 'Nhập một số, ví dụ 7 hoặc −4.', fr: 'Écris un nombre, comme 7 ou −4.' };
  const v = constOf(got);
  if (rEq(v, model.solution)) return { ok: true };
  // did the operation instead of undoing it
  let same = model.target;
  for (const op of [...model.ops].reverse()) same = applyOp(same, op);
  if (rEq(v, same)) {
    const op = model.ops[model.ops.length - 1];
    return { ok: false, code: 'same-op', en: `That DOES the operation instead of undoing it. The inverse of ${opText(op)} is ${opText(inverseOf(op))}.`, vn: `Em đã LÀM phép toán thay vì làm ngược lại. Phép ngược của ${opText(op)} là ${opText(inverseOf(op))}.`, fr: `Ça FAIT l'opération au lieu de la défaire. L'opération inverse de ${opText(op)} est ${opText(inverseOf(op))}.` };
  }
  if (model.ops.length > 1) {
    let wrong = model.target;
    for (const op of model.ops.map(inverseOf)) wrong = applyOp(wrong, op);
    if (rEq(v, wrong)) {
      const last = model.ops[model.ops.length - 1];
      return { ok: false, code: 'wrong-order', en: `Undo the LAST step first — socks and shoes. ${opText(last)} happened last, so ${opText(inverseOf(last))} comes first.`, vn: `Làm ngược bước CUỐI trước — như tất và giày. ${opText(last)} làm sau cùng, nên ${opText(inverseOf(last))} làm trước.`, fr: `Défais la DERNIÈRE étape d'abord — comme les chaussettes et les chaussures. ${opText(last)} est venu en dernier, donc ${opText(inverseOf(last))} vient en premier.` };
    }
  }
  let check = v;
  for (const op of model.ops) check = applyOp(check, op);
  const sidePlain = model.sideLatex
    .replace(/\\frac\{([^{}]*)\}\{(\d+)\}/g, (_, a, d) => (/[+-]/.test(a) ? `(${a}) ÷ ${d}` : `${a} ÷ ${d}`))
    .replace(/\\times/g, '×')
    .replace(/ - /g, ' − ');
  return { ok: false, code: 'check', en: `Check it: when ${model.letter} = ${numText(v)}, ${sidePlain} = ${numText(check)}, not ${numText(model.target)}.`, vn: `Thử lại: khi ${model.letter} = ${numText(v)}, ${sidePlain} = ${numText(check)}, không phải ${numText(model.target)}.`, fr: `Vérifie : quand ${model.letter} = ${numText(v)}, ${sidePlain} = ${numText(check)}, pas ${numText(model.target)}.` };
}

// ------------------------------------------------------------------ "I think of a number"

const VERB = {
  '+': { en: (n) => `add ${n}`, vn: (n) => `cộng ${n}`, fr: (n) => `j'ajoute ${n}` },
  '-': { en: (n) => `subtract ${n}`, vn: (n) => `trừ đi ${n}`, fr: (n) => `je soustrais ${n}` },
  '*': { en: (n) => (n === 2 ? 'double it' : `multiply it by ${n}`), vn: (n) => (n === 2 ? 'gấp đôi nó' : `nhân nó với ${n}`), fr: (n) => (n === 2 ? 'je le double' : `je le multiplie par ${n}`) },
  '/': { en: (n) => (n === 2 ? 'halve it' : `divide it by ${n}`), vn: (n) => (n === 2 ? 'chia đôi nó' : `chia nó cho ${n}`), fr: (n) => (n === 2 ? 'je prends la moitié' : `je le divise par ${n}`) },
};

/** "I think of a number, multiply it by 3, then add 5. The answer is 26." */
export function thinkSentence(model) {
  const steps = model.ops.map((o) => VERB[o.op]);
  const en = model.ops.map((o, i) => steps[i].en(o.n));
  const vn = model.ops.map((o, i) => steps[i].vn(o.n));
  const fr = model.ops.map((o, i) => steps[i].fr(o.n));
  const join = (list, then) => (list.length === 1 ? list[0] : `${list.slice(0, -1).join(', ')}, ${then} ${list[list.length - 1]}`);
  return {
    en: `I think of a number, ${join(en, 'then')}. The answer is ${numText(model.target)}.`,
    vn: `Tôi nghĩ ra một số, ${join(vn, 'rồi')}. Kết quả là ${numText(model.target)}.`,
    fr: `Je pense à un nombre, ${join(fr, 'puis')}. Le résultat est ${numText(model.target)}.`,
  };
}

/**
 * Equations a student might write for the same story, each a named slip:
 * the operations in the other order, one operation left out, the inverse
 * written instead. Returns [{ latex, correct, why }] with the right one in.
 */
export function equationChoices(model) {
  const L = model.letter;
  // LaTeX wants an ASCII minus; numText prints the typographic one.
  const t = numText(model.target).replace('−', '-');
  const out = [{ id: 'right', latex: `${model.sideLatex} = ${t}`, correct: true }];
  const add = (id, ops, why) => {
    if (!ops.length) return;
    const latex = `${chainLatex(L, ops)} = ${t}`;
    if (out.some((o) => o.latex === latex)) return;
    out.push({ id, latex, correct: false, why });
  };
  if (model.ops.length > 1) {
    add('order', [...model.ops].reverse(), { en: 'Those operations are in the wrong order. Read the story from the start: the first thing done to the number goes nearest the letter.', vn: 'Các phép toán sai thứ tự. Đọc câu chuyện từ đầu: việc làm đầu tiên với số đó nằm gần chữ cái nhất.', fr: "Ces opérations sont dans le mauvais ordre. Lis l'histoire depuis le début : la première chose faite au nombre va le plus près de la lettre." });
    add('missing', model.ops.slice(1), { en: 'One of the steps is missing.', vn: 'Thiếu một bước.', fr: 'Il manque une des étapes.' });
  }
  add('inverse', [...model.ops.slice(0, -1), inverseOf(model.ops[model.ops.length - 1])], { en: 'That writes the inverse. The equation says what was DONE to the number; undoing comes later, when you solve.', vn: 'Đó là phép ngược. Phương trình ghi lại những gì đã LÀM với số đó; làm ngược là việc khi giải.', fr: "Ça écrit l'opération inverse. L'équation dit ce qui a été FAIT au nombre ; défaire vient plus tard, quand tu résous." });
  if (out.length < 3 && model.ops.length === 1) {
    const o = model.ops[0];
    const swap = o.op === '+' || o.op === '-' ? { op: o.op === '+' ? '*' : '/', n: Math.max(2, o.n) } : { op: o.op === '*' ? '+' : '-', n: o.n };
    add('operation', [swap], { en: 'That is a different operation from the one in the story.', vn: 'Đó là một phép toán khác với phép toán trong câu chuyện.', fr: "C'est une opération différente de celle de l'histoire." });
  }
  return out;
}

// ------------------------------------------------------------------ validator

function checkLevels(items, levels, bilingual, out) {
  let last = -Infinity;
  const ids = new Set();
  for (const it of items) {
    if (!it?.id) out.push('an item has no id');
    else if (ids.has(it.id)) out.push(`duplicate item id "${it.id}"`);
    ids.add(it?.id);
    if (it?.level !== undefined) {
      if (!levels?.[it.level]) out.push(`item ${it.id}: level ${it.level} has no name in levels`);
      else if (bilingual && typeof levels[it.level] === 'object' && !levels[it.level].vn) out.push(`level ${it.level} needs { en, vn }`);
      if (it.level < last) out.push(`item ${it.id}: levels must only climb (level ${it.level} after ${last})`);
      last = it.level;
    }
    if (it?.context && bilingual && !it.contextVn) out.push(`item ${it.id}: context needs contextVn`);
  }
}

/** Collect It items: { id, level, expr, context? }. */
export function checkCollectItems(items = [], { levels, bilingual = true } = {}) {
  const out = [];
  checkLevels(items, levels, bilingual, out);
  for (const it of items) {
    try {
      const m = collectModel(it.expr);
      if (m.written.length < 2) out.push(`item ${it.id}: "${it.expr}" has only one term`);
      if (m.written.length > 8) out.push(`item ${it.id}: "${it.expr}" has more than 8 terms — too many chips to sort`);
      if (!Object.keys(m.answer).length) out.push(`item ${it.id}: "${it.expr}" simplifies to 0`);
      if (m.written.some((t) => !rIsInt(t.coef))) out.push(`item ${it.id}: whole-number coefficients only`);
      if (!diagnoseSimplify(it.expr, m.answerText.replace(/−/g, '-')).ok) out.push(`item ${it.id}: does not accept its own answer ${m.answerText}`);
    } catch (e) {
      out.push(`item ${it.id}: ${e.message}`);
    }
  }
  return out;
}

/** Expand It items: { id, level, expr, kind?: 'missing', hide?, context? }. */
export function checkExpandItems(items = [], { levels, bilingual = true } = {}) {
  const out = [];
  checkLevels(items, levels, bilingual, out);
  for (const it of items) {
    try {
      const m = expandModel(it.expr);
      if (m.brackets.length > 3) out.push(`item ${it.id}: more than three brackets`);
      if (m.brackets.some((b) => b.inner.length > 3)) out.push(`item ${it.id}: a bracket with more than three terms will not fit the grid`);
      if (m.expandedTerms.some((t) => !rIsInt(t.coef))) out.push(`item ${it.id}: whole-number products only`);
      if (!Object.keys(m.answer).length) out.push(`item ${it.id}: "${it.expr}" expands to 0`);
      if (it.kind === 'missing') {
        const mm = missingModel(it.expr, it.hide || ['outer']);
        if (!mm.blanks.length) out.push(`item ${it.id}: a missing item must hide something`);
      } else if (!diagnoseExpand(it.expr, m.answerText.replace(/−/g, '-')).ok) {
        out.push(`item ${it.id}: does not accept its own answer ${m.answerText}`);
      }
    } catch (e) {
      out.push(`item ${it.id}: ${e.message}`);
    }
  }
  return out;
}

/** Undo It items: { id, level, eq } | { id, level, ops, result, letter? } | + story/storyVn. */
export function checkFlowItems(items = [], { levels, bilingual = true } = {}) {
  const out = [];
  checkLevels(items, levels, bilingual, out);
  for (const it of items) {
    if (!it.eq && !it.ops) { out.push(`item ${it.id}: needs eq or ops`); continue; }
    try {
      const m = equationModel(it);
      if (m.ops.length > 3) out.push(`item ${it.id}: more than three operations`);
      if (!m.integerSteps) out.push(`item ${it.id}: undoing it passes through a fraction — choose numbers that divide exactly`);
      if (Math.abs(rValue(m.solution)) > 999) out.push(`item ${it.id}: the solution is too big to type`);
      if (!diagnoseSolve(m, valueText(m.solution).replace(/−/g, '-')).ok) out.push(`item ${it.id}: does not accept its own solution`);
      if (it.story && bilingual && !it.storyVn) out.push(`item ${it.id}: story needs storyVn`);
      if (it.story && !it.eq && !it.ops) out.push(`item ${it.id}: a story item still needs its eq`);
    } catch (e) {
      out.push(`item ${it.id}: ${e.message}`);
    }
  }
  return out;
}

export { rEq, rValue, rat };
