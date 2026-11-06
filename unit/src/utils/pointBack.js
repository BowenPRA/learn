// src/utils/pointBack.js
//
// Multiplying a decimal by a whole number (Year 7 Maths 4.3), the way the
// classroom deck teaches it: ESTIMATE first, take the point OUT and multiply
// whole numbers, put the point BACK with as many decimal places as the decimal
// had, and check the answer against the estimate. "Decimals make things
// smaller" is the folk rule this kills: 0.3 × 4 is 1.2, not 0.12.
//
// An item states the question only:
//   { id, level, a: '3.6', b: '24' }                       3.6 × 24 (either order)
//   { id, level, a: '0.85', b: '12', money: true }         an answer in dollars, 2 d.p.
//   { id, level, a: '2.35', b: '16', unit: 'kg' }          a measure, its unit after the answer
//   { id, level, kind: 'fact', fact: '47 × 23 = 1081',
//     variants: ['4.7 × 23', '0.47 × 23', '108.1 ÷ 23'] }  one fact, the point placed by estimating
//   (+ context / contextFr, a story told above the sum)
// The estimate, the whole-number product (and its two rows for a 2-digit
// multiplier), the decimal places, the answer and the name of the slip behind a
// wrong answer are derived here; the validator runs the same model
// (checkPointBackItems).
//
// Every message is an `{ en, fr }` pair — 4.3 is an English / French unit.

import { readDec, dec, decText, canon, sameValue, compare, roundTo, roundSig } from './decimal.js';
import { readProblem } from './rounding.js';

export const KINDS = ['mul', 'fact'];
/** Faded 0 tiles drawn left of the digits, so a placeholder zero can be chosen without being given away. */
export const GHOSTS = 2;
export const LIMITS = { wholeMin: 2, wholeMax: 99, dpMax: 3, topDigits: 4 };

const TEN = 10n;
const pow10 = (k) => TEN ** BigInt(k);
const mul = (x, y) => ({ n: x.n * y.n, dp: x.dp + y.dp });
const isWhole = (v) => canon(v).dp === 0;
/** The digits a value is written with, leading zeros off ("0.08" → "8", "2.40" → "240"). */
const digitsOf = (v) => v.n.toString();
/** Significant digits, trailing zeros off too ("80" → "8"). */
const sigOf = (v) => canon(v).n.toString().replace(/0+$/, '') || '0';
const sigCount = (v) => sigOf(v).length;
/** A value as plain text, as simply as it can be written (5.00 → 5). */
export const plain = (v) => decText(canon(v));
/** KaTeX for an operation. */
const opLatex = (op) => (op === '÷' ? '\\div' : '\\times');

const normOp = (op) => {
  const s = String(op).trim();
  if (['×', 'x', '*'].includes(s)) return '×';
  if (['÷', '/'].includes(s)) return '÷';
  throw new Error(`"${op}" must be × or ÷`);
};

/** Round to 1 significant figure (a whole number under 10 stays as it is). */
const oneSig = (v) => canon(roundSig(canon(v), 1));

/**
 * The estimate a book would write: a decimal of 1 or more to the nearest whole
 * number (to 1 significant figure below 1: 0.68 is about 0.7), a 2-digit whole
 * number to 1 significant figure.
 */
function friendlyOf(v) {
  const c = canon(v);
  if (isWhole(c)) return c.n < 10n ? c : oneSig(c);
  if (compare(c, dec('1')) >= 0) {
    const w = canon(roundTo(c, 0));
    return sigCount(w) <= 2 ? w : oneSig(c);
  }
  return oneSig(c);
}

/** Every rounding of a factor a sensible estimate could use. */
function optionsOf(v) {
  const c = canon(v);
  const out = [oneSig(c), friendlyOf(c)];
  if (isWhole(c)) out.push(c);
  else if (compare(c, dec('0.5')) >= 0) out.push(canon(roundTo(c, 0)));
  return out.filter((o, i) => o.n !== 0n && out.findIndex((p) => sameValue(p, o)) === i);
}

/** a ÷ b exactly, to at most `max` decimal places, or null when it never stops. */
function divide(a, b, max = 8) {
  for (let k = 0; k <= max; k += 1) {
    // a/b × 10^k = a.n × 10^(b.dp + k) / (b.n × 10^a.dp)
    let num = a.n * pow10(b.dp + k);
    const den = b.n * pow10(a.dp);
    if (num % den === 0n) { num /= den; return canon({ n: num, dp: k }); }
  }
  return null;
}

/**
 * The estimate of x op y: each number to 1 significant figure; for ÷ the
 * dividend moves to a friendly multiple of the rounded divisor (143.1 ÷ 27 is
 * about 150 ÷ 30 = 5).
 */
function estimateOf(x, op, y) {
  if (op === '×') {
    const [fx, fy] = [friendlyOf(x), friendlyOf(y)];
    return { a: fx, b: fy, op, value: canon(mul(fx, fy)) };
  }
  const d = oneSig(y);
  const q = Number(Number(decText(x)) / Number(decText(d))).toPrecision(1);
  const qv = canon(dec(String(Number(q))));
  const top = canon(mul(qv, d));
  return { a: top, b: d, op, value: qv };
}

/** The estimate as a line: "4 × 20 = 80". */
export const estimateLine = (e) => `${plain(e.a)} ${e.op} ${plain(e.b)} = ${plain(e.value)}`;
export const estimateLatex = (e) => `${plain(e.a)} ${opLatex(e.op)} ${plain(e.b)} = ${plain(e.value)}`;

/** One question x op y, with its answer and its estimate (both kinds use this). */
function sumOf(x, op, y) {
  const exact = op === '×' ? canon(mul(x, y)) : divide(x, y);
  if (!exact) throw new Error(`${decText(x)} ÷ ${decText(y)} does not stop`);
  const est = estimateOf(x, op, y);
  const accepted = op === '×'
    ? optionsOf(x).flatMap((p) => optionsOf(y).map((q) => canon(mul(p, q))))
    : [est.value];
  return { x, y, op, exact, est, accepted, latex: `${decText(x)} ${opLatex(op)} ${decText(y)}` };
}

/**
 * The worked question.
 *   kind 'mul'   dec, whole (values), top (the decimal with the point out),
 *                product (the whole-number product), len (its digits), dp (the
 *                decimal places to put back), rows (two partial products for a
 *                2-digit multiplier, else null), answer (as the counting writes
 *                it: 5.00), money, write (is there a "write it" stage), stages
 *   kind 'fact'  fact { a, b, c }, steps [{ sum, row, len, dp }] — one per variant
 */
export function pointModel(item) {
  const kind = item.kind || 'mul';
  if (!KINDS.includes(kind)) throw new Error(`kind "${kind}" — ${KINDS.join('/')}`);
  return kind === 'fact' ? factModel(item) : mulModel(item);
}

function mulModel(item) {
  const A = dec(String(item.a));
  const B = dec(String(item.b));
  const aWhole = A.dp === 0;
  const bWhole = B.dp === 0;
  if (aWhole === bWhole) throw new Error(aWhole ? 'both numbers are whole — one must be a decimal' : 'both numbers are decimals — 4.3 multiplies a decimal by a whole number');
  const D = aWhole ? B : A;
  const W = aWhole ? A : B;
  const whole = Number(W.n);
  if (whole < LIMITS.wholeMin || whole > LIMITS.wholeMax) throw new Error(`the whole number ${whole} must be ${LIMITS.wholeMin}–${LIMITS.wholeMax}`);
  if (D.dp > LIMITS.dpMax) throw new Error(`${decText(D)} has more than ${LIMITS.dpMax} decimal places`);
  const top = D.n;
  if (top === 0n) throw new Error('the decimal is 0');
  if (top.toString().length > LIMITS.topDigits) throw new Error(`${decText(D)} has more than ${LIMITS.topDigits} digits`);
  const product = top * W.n;
  const pText = product.toString();
  const len = pText.length;
  const dp = D.dp;
  if (dp > len + GHOSTS) throw new Error(`the answer needs more than ${GHOSTS} placeholder zeros`);
  const answer = { n: product, dp };

  // The rows: a 2-digit multiplier whose ones digit is not 0, under a top
  // number of 2 or more digits. (24 × 8 is one row; so is 36 × 20.)
  const ones = whole % 10;
  const tens = whole - ones;
  const rows = top >= 10n && whole >= 10 && ones !== 0
    ? [{ by: ones, value: top * BigInt(ones), tens: false }, { by: tens, value: top * BigInt(tens), tens: true }]
    : null;

  const money = !!item.money;
  if (money) {
    const two = roundTo(answer, 2);
    if (!sameValue(two, answer)) throw new Error(`a money answer, ${decText(answer)}, is not exact to 2 decimal places`);
  }
  const moneyText = money ? decText(roundTo(answer, 2)) : null;
  const trailing = decText(answer) !== plain(answer);
  const write = money || trailing;

  const sum = sumOf(A, '×', B);
  const estimate = !sameValue(sum.est.value, sum.exact);
  const stages = [...(estimate ? ['estimate'] : []), 'out', 'back', ...(write ? ['write'] : [])];

  return {
    kind: 'mul', item, sum, dec: D, whole, wholeV: W, top, topText: top.toString(), product, pText, len, dp, rows,
    answer, answerText: decText(answer), simpleText: plain(answer), money, moneyText, trailing, write, estimate, stages,
    needsZero: dp > len,
    latex: sum.latex,
    outLatex: aWhole ? `${whole} \\times ${top}` : `${top} \\times ${whole}`,
  };
}

const FACT_RE = /^\s*(\d+)\s*[×x*]\s*(\d+)\s*=\s*(\d+)\s*$/;
const SUM_RE = /^\s*(\d*\.?\d+)\s*([×x*÷/])\s*(\d*\.?\d+)\s*$/;

/** "47 × 23 = 1081" → the fact, checked. */
export function parseFact(text) {
  const m = String(text || '').match(FACT_RE);
  if (!m) throw new Error(`fact "${text}" must read like "47 × 23 = 1081"`);
  const [a, b, c] = [m[1], m[2], m[3]].map((s) => dec(s));
  if (a.n * b.n !== c.n) throw new Error(`${m[1]} × ${m[2]} is ${a.n * b.n}, not ${m[3]}`);
  return {
    a, b, c, text: `${m[1]} × ${m[2]} = ${m[3]}`, latex: `${m[1]} \\times ${m[2]} = ${m[3]}`,
    sigs: { a: sigOf(a), b: sigOf(b), c: sigOf(c) },
  };
}

/** One variant of a fact ("0.47 × 23", "108.1 ÷ 23"): its sum, the digits it is answered on, and where the point goes. */
export function factStep(f, v) {
  const s = String(v).match(SUM_RE);
  if (!s) throw new Error(`variant "${v}" must read like "4.7 × 23" or "108.1 ÷ 23"`);
  const op = normOp(s[2]);
  const x = dec(s[1]);
  const y = dec(s[3]);
  const [sx, sy] = [sigOf(x), sigOf(y)];
  const uses = op === '×'
    ? (sx === f.sigs.a && sy === f.sigs.b) || (sx === f.sigs.b && sy === f.sigs.a)
    : sx === f.sigs.c && (sy === f.sigs.a || sy === f.sigs.b);
  if (!uses) throw new Error(`variant "${v}" does not use the fact ${f.text}`);
  if (op === '×' && (x.dp === 0) === (y.dp === 0)) throw new Error(`variant "${v}" must multiply a decimal by a whole number`);
  const sum = sumOf(x, op, y);
  const rowV = op === '×' ? f.c : (sy === f.sigs.a ? f.b : f.a);
  const row = digitsOf(rowV);
  // The answer written with the row's digits: row × 10^−k.
  let k = null;
  for (let j = 0; j <= row.length + GHOSTS; j += 1) if (sameValue({ n: rowV.n, dp: j }, sum.exact)) { k = j; break; }
  if (k == null) throw new Error(`"${v}" = ${plain(sum.exact)}, which the digits ${row} cannot make without extra zeros`);
  return { sum, op, row, rowN: rowV.n, len: row.length, dp: k, answerText: decText({ n: rowV.n, dp: k }) };
}

function factModel(item) {
  const f = parseFact(item.fact);
  const variants = item.variants || [];
  if (variants.length < 2 || variants.length > 4) throw new Error('a fact item needs 2–4 variants');
  const steps = variants.map((v) => factStep(f, v));
  return { kind: 'fact', item, fact: f, factLatex: f.latex, factText: f.text, steps };
}

/** The value the digits make with the point chosen `k` places from the right. */
export const placedAt = (rowN, k) => ({ n: rowN, dp: k });
export const placedText = (rowN, k) => decText(placedAt(rowN, k));

// ── marking ─────────────────────────────────────────────────────────────────
// Each diagnose* returns `{ ok, code, en, fr }`. A wrong answer is NAMED;
// `soft: true` (nothing typed, a comma, the exact answer as an estimate) is a
// nudge, not a try.

const plural = (n, en, fr) => ({ en: `${n} ${en}${n === 1 ? '' : 's'}`, fr: `${n} ${fr}${n === 1 ? '' : 's'}` });
const dpWords = (n) => plural(n, 'decimal place', 'décimale');
const between = (v, e, lo, hi) => compare(v, mul(e, dec(lo))) >= 0 && compare(v, mul(e, dec(hi))) <= 0;
const bad = (code, en, fr) => ({ ok: false, code, en, fr });
/** "10 times", "100 times" — how far a power-of-10 slip is out. */
const timesWord = (j) => `${10 ** Math.abs(j)}`;

/** The decimal and the whole number of a × sum, when it is one of each. */
function decWhole(sum) {
  if (sum.op !== '×') return null;
  const xw = isWhole(sum.x); const yw = isWhole(sum.y);
  if (xw === yw) return null;
  const d = xw ? sum.y : sum.x; const w = xw ? sum.x : sum.y;
  return { d, w: Number(canon(w).n) };
}

/** Mark a typed estimate for one sum (`model.sum`, or a fact step's `sum`). */
export function diagnoseEstimate(sum, typed) {
  const r = readDec(typed);
  if (!r.ok) return readProblem(r.code);
  const v = canon(r.v);
  const { exact, est } = sum;
  const line = estimateLine(est);
  if (sum.accepted.some((a) => sameValue(a, v))) return { ok: true, code: 'ok' };
  if (sameValue(v, exact) && sigCount(exact) > 2) {
    return {
      ok: false, code: 'exact', soft: true,
      en: `That is the exact answer. An estimate rounds the numbers first, so it is quick: ${line}. Type a rounded answer.`,
      fr: `C'est la réponse exacte. Une estimation arrondit d'abord les nombres, pour aller vite : ${line}. Écris une réponse arrondie.`,
    };
  }
  if (v.n !== 0n && between(v, exact, '0.5', '2')) return { ok: true, code: 'ok' };
  const dw = decWhole(sum);
  if (dw && dw.w >= 2 && v.n !== 0n && compare(v, dw.d) < 0) {
    return bad('smaller',
      `Multiplying by ${dw.w} makes ${plain(dw.d)} bigger, not smaller — ${dw.w} lots of it is more than ${plain(dw.d)}. Round first: ${line}.`,
      `Multiplier par ${dw.w} rend ${plain(dw.d)} plus grand, pas plus petit — ${dw.w} fois ce nombre, c'est plus que ${plain(dw.d)}. Arrondis d'abord : ${line}.`);
  }
  if (v.n !== 0n && (between(v, exact, '5', '20') || between(v, exact, '0.05', '0.2'))) {
    const big = compare(v, exact) > 0;
    return bad('scale',
      `That is about 10 times too ${big ? 'big' : 'small'}. Round each number, then work it out: ${line}.`,
      `C'est environ 10 fois trop ${big ? 'grand' : 'petit'}. Arrondis chaque nombre, puis calcule : ${line}.`);
  }
  return bad('far',
    `Not close enough to help. Round each number to something easy first: ${line}.`,
    `Pas assez proche pour t'aider. Arrondis d'abord chaque nombre à une valeur simple : ${line}.`);
}

/** Split a whole number by place value: 36 → [30, 6]; 125 → [100, 20, 5]. */
function partsOf(n) {
  const s = n.toString();
  return [...s].map((c, i) => BigInt(c) * pow10(s.length - 1 - i)).filter((p) => p !== 0n);
}

/** Mark the whole-number product typed in one go ("36 × 7 = ?"). */
export function diagnoseOut(model, typed) {
  const r = readDec(typed);
  if (!r.ok) return readProblem(r.code);
  const t = r.v;
  if (sameValue(t, { n: model.product, dp: 0 })) return { ok: true, code: 'ok' };
  if (t.dp > 0 && sameValue(t, model.sum.exact)) {
    return bad('kept',
      `Take the point out first. Work out ${model.topText} × ${model.whole} with whole numbers — the point goes back in at the next step.`,
      `Enlève d'abord le point. Calcule ${model.topText} × ${model.whole} avec des nombres entiers — le point revient à l'étape suivante.`);
  }
  if (sameValue(t, { n: model.top + BigInt(model.whole), dp: 0 })) {
    return bad('added', `That is ${model.topText} + ${model.whole}. Multiply: ${model.topText} × ${model.whole}.`,
      `Ça, c'est ${model.topText} + ${model.whole}. Multiplie : ${model.topText} × ${model.whole}.`);
  }
  const big = model.top >= BigInt(model.whole) ? model.top : BigInt(model.whole);
  const small = big === model.top ? model.whole : model.topText;
  const parts = partsOf(big);
  if (parts.length < 2) {
    return bad('value', `Not quite. Work out ${model.topText} × ${model.whole} again — use your times tables.`,
      `Pas tout à fait. Recalcule ${model.topText} × ${model.whole} — utilise tes tables.`);
  }
  const split = parts.join(' + ');
  const each = parts.map((p) => `${p} × ${small}`).join(' and ');
  const eachFr = parts.map((p) => `${p} × ${small}`).join(' et ');
  return bad('value', `Not quite. Split ${big} into ${split}: work out ${each}, then add.`,
    `Pas tout à fait. Décompose ${big} en ${split} : calcule ${eachFr}, puis additionne.`);
}

/** Mark one line of the two-row scaffold: 0 the ones row, 1 the tens row, 2 the total. */
export function diagnoseRow(model, i, typed) {
  const r = readDec(typed);
  if (!r.ok) return readProblem(r.code);
  const t = r.v;
  const [r0, r1] = model.rows;
  const want = i === 0 ? r0.value : i === 1 ? r1.value : model.product;
  if (sameValue(t, { n: want, dp: 0 })) return { ok: true, code: 'ok' };
  const top = model.topText;
  if (i === 0) {
    return bad('row', `This row is ${top} × ${r0.by} — the ones digit of ${model.whole}.`, `Cette ligne, c'est ${top} × ${r0.by} — le chiffre des unités de ${model.whole}.`);
  }
  if (i === 1) {
    const tensDigit = r1.by / 10;
    if (sameValue(t, { n: model.top * BigInt(tensDigit), dp: 0 })) {
      return bad('tenszero',
        `This row is ${top} × ${r1.by}, not ${top} × ${tensDigit}: the ${tensDigit} in ${model.whole} is ${tensDigit} ten${tensDigit === 1 ? '' : 's'}. Write a 0 on the right first, then ${top} × ${tensDigit}.`,
        `Cette ligne, c'est ${top} × ${r1.by}, pas ${top} × ${tensDigit} : le ${tensDigit} de ${model.whole} vaut ${tensDigit} dizaine${tensDigit === 1 ? '' : 's'}. Écris d'abord un 0 à droite, puis ${top} × ${tensDigit}.`);
    }
    return bad('row', `This row is ${top} × ${r1.by}: write a 0 on the right, then work out ${top} × ${tensDigit}.`,
      `Cette ligne, c'est ${top} × ${r1.by} : écris un 0 à droite, puis calcule ${top} × ${tensDigit}.`);
  }
  return bad('add', `Add the two rows: ${r0.value} + ${r1.value}.`, `Additionne les deux lignes : ${r0.value} + ${r1.value}.`);
}

/**
 * Where the point goes — the tap stage, for a 'mul' item (`step` omitted) or
 * one variant of a fact item. `row` is the digits shown, `want` the decimal
 * places, `count` the counting rule in words (null when the sum is a ÷, where
 * only the estimate can place the point).
 */
export function placeSpec(model, step = null) {
  if (model.kind === 'mul') {
    const n = model.dp;
    const w = dpWords(n);
    return {
      sum: model.sum, rowN: model.product, row: model.pText, len: model.len, want: n,
      count: {
        en: `${plain(model.dec)} has ${w.en} and ${model.whole} has none, so the answer has ${n}.`,
        fr: `${plain(model.dec)} a ${w.fr} et ${model.whole} n'en a aucune, donc la réponse en a ${n}.`,
      },
    };
  }
  const s = step;
  let count = null;
  if (s.op === '×') {
    const [x, y] = [s.sum.x, s.sum.y];
    const has = (v) => (v.dp ? dpWords(v.dp) : { en: 'none', fr: 'aucune' });
    count = {
      en: `${decText(x)} has ${has(x).en} and ${decText(y)} has ${has(y).en}, so the answer has ${x.dp + y.dp}.`,
      fr: `${decText(x)} a ${has(x).fr === 'aucune' ? 'aucune décimale' : has(x).fr} et ${decText(y)} ${has(y).fr === 'aucune' ? "n'en a aucune" : `a ${has(y).fr}`}, donc la réponse en a ${x.dp + y.dp}.`,
    };
  }
  return { sum: s.sum, rowN: s.rowN, row: s.row, len: s.len, want: s.dp, count };
}

/**
 * Mark a chosen point: `k` decimal places (0 = after the last digit; more than
 * the digits = through the faded placeholder zeros). `estimate` is the
 * student's own (a value), when they typed one. Slips: 'smaller' (decimals make
 * it smaller — 0.12 for 0.3 × 4), 'left' (counted from the left), 'placeholder'
 * (a 0 the answer needed was left out — 0.8 for 0.08), 'many', 'few', 'far'.
 */
export function diagnosePlace(spec, k, estimate = null, shown = null) {
  if (k === spec.want) return { ok: true, code: 'ok' };
  const placed = placedAt(spec.rowN, k);
  const pt = shown || placedText(spec.rowN, k);
  const est = estimate ? plain(estimate) : plain(spec.sum.est.value);
  const j = k - spec.want;
  const off = { en: `${pt} is ${timesWord(j)} times too ${j > 0 ? 'small' : 'big'}`, fr: `${pt} est ${timesWord(j)} fois trop ${j > 0 ? 'petit' : 'grand'}` };
  // The estimate the message leans on: the student's own, else the book's —
  // and none at all when rounding would not change the numbers (0.3 × 4).
  const scale = estimate
    ? { en: ` Your estimate was ${est}, and ${off.en}.`, fr: ` Ton estimation était ${est}, et ${off.fr}.` }
    : !sameValue(spec.sum.est.value, spec.sum.exact)
      ? { en: ` An estimate is ${estimateLine(spec.sum.est)}, and ${off.en}.`, fr: ` Une estimation donne ${estimateLine(spec.sum.est)}, et ${off.fr}.` }
      : { en: '', fr: '' };
  const dw = decWhole(spec.sum);
  if (dw && dw.w >= 2 && compare(placed, dw.d) < 0) {
    return bad('smaller',
      `Decimals do not make it smaller here. ${dw.w} lots of ${plain(dw.d)} is MORE than ${plain(dw.d)}, but ${pt} is less.${scale.en}`,
      `Les décimaux ne rendent pas le résultat plus petit ici. ${dw.w} fois ${plain(dw.d)}, c'est PLUS que ${plain(dw.d)}, mais ${pt} est plus petit.${scale.fr}`);
  }
  const c = spec.count;
  if (c && spec.len - spec.want >= 0 && k === spec.len - spec.want) {
    return bad('left',
      `You counted from the left. Count the decimal places from the RIGHT-hand end of the digits. ${c.en}`,
      `Tu as compté depuis la gauche. Compte les décimales depuis la DROITE des chiffres. ${c.fr}`);
  }
  if (spec.want > spec.len && k === spec.want - 1) {
    return bad('placeholder',
      `A zero is missing. The answer needs ${dpWords(spec.want).en}, but ${spec.row} has only ${spec.len} digit${spec.len === 1 ? '' : 's'}: a 0 must hold the empty place — use a faded 0.${c ? ` ${c.en}` : ''}`,
      `Il manque un zéro. La réponse a besoin de ${dpWords(spec.want).fr}, mais ${spec.row} n'a que ${spec.len} chiffre${spec.len === 1 ? '' : 's'} : un 0 doit tenir la place vide — utilise un 0 pâle.${c ? ` ${c.fr}` : ''}`);
  }
  if (c && Math.abs(j) === 1) {
    return bad(j > 0 ? 'many' : 'few',
      `One decimal place too ${j > 0 ? 'many' : 'few'}. ${c.en}${scale.en}`,
      `Une décimale ${j > 0 ? 'de trop' : 'en moins'}. ${c.fr}${scale.fr}`);
  }
  if (!c) {
    return bad('far',
      `Use the estimate to place the point: the answer must be near ${est}.${scale.en}`,
      `Utilise l'estimation pour placer le point : la réponse doit être proche de ${est}.${scale.fr}`);
  }
  return bad('far', `Count again. ${c.en}${scale.en}`, `Recompte. ${c.fr}${scale.fr}`);
}

/**
 * Mark the answer written out (the last stage, when there is one): a money
 * answer needs exactly 2 decimal places; an exact answer may drop the zeros at
 * its end (5.00 = 5) — unlike a ROUNDED answer, whose zeros show the accuracy.
 */
export function diagnoseWrite(model, typed) {
  const r = readDec(typed);
  if (!r.ok) return readProblem(r.code);
  const t = r.v;
  if (sameValue(t, model.answer)) {
    if (!model.money || t.dp === 2) return { ok: true, code: 'ok', dropped: t.dp < model.dp };
    return bad('money',
      `Right value — but money is written with 2 decimal places, for the cents: ${model.moneyText} dollars.`,
      `Bonne valeur — mais l'argent s'écrit avec 2 décimales, pour les cents : ${model.moneyText} dollars.`);
  }
  return diagnoseProduct(model, typed);
}

/**
 * Mark a whole typed answer to a × sum (Quick Fire, and the write stage's
 * wrong answers). Slips: 'smaller', 'pointout' (the point never went back),
 * 'placeholder', 'many', 'few', 'value'.
 */
export function diagnoseProduct(model, typed) {
  const r = readDec(typed);
  if (!r.ok) return readProblem(r.code);
  const t = canon(r.v);
  const exact = model.sum.exact;
  if (sameValue(t, exact)) return { ok: true, code: 'ok' };
  const spec = placeSpec(model);
  if (t.dp === 0 && sameValue(t, { n: model.product, dp: 0 }) && model.dp > 0) {
    return bad('pointout',
      `${model.pText} is ${model.topText} × ${model.whole}. Now put the point back: ${spec.count.en}`,
      `${model.pText}, c'est ${model.topText} × ${model.whole}. Remets maintenant le point : ${spec.count.fr}`);
  }
  if (sigOf(t) === sigOf(exact) && t.n !== 0n) {
    // the same digits, the point in another place
    for (let k = 0; k <= model.len + GHOSTS + 2; k += 1) {
      if (sameValue(t, placedAt(model.product, k))) return diagnosePlace(spec, k, null, String(typed).trim());
    }
  }
  return bad('value',
    `Not quite. Take the point out: ${model.topText} × ${model.whole}. Then put it back: ${spec.count.en}`,
    `Pas tout à fait. Enlève le point : ${model.topText} × ${model.whole}. Puis remets-le : ${spec.count.fr}`);
}

/** The finished line for the book: 3.6 × 24 = 86.4 (money: 7.20). */
export function answerLatex(model) {
  return `${model.latex} = ${model.money ? model.moneyText : model.simpleText}`;
}

/** At most this many tiles (digits + faded zeros) in a row, so it fits a phone. */
export const MAX_TILES = 7;

/**
 * A `pointback` deck activity — the tap stage on a slide:
 *   { id, type: 'pointback', a: '3.6', b: '24', … }            the point-out product is shown; tap where the point goes
 *   { id, type: 'pointback', fact: '47 × 23 = 1081', q: '0.47 × 23', … }   the fact's digits; estimate to place it
 */
export function activityModel(a) {
  if (a.fact) {
    const f = parseFact(a.fact);
    const s = factStep(f, a.q);
    return { spec: placeSpec({ kind: 'fact' }, s), latex: s.sum.latex, lead: f.latex, answerText: s.answerText, simpleText: s.answerText, fact: true };
  }
  const m = mulModel({ id: a.id, a: a.a, b: a.b });
  return { spec: placeSpec(m), latex: m.latex, lead: `${m.outLatex} = ${m.pText}`, answerText: m.answerText, simpleText: m.simpleText, fact: false };
}

/** Problems with a `pointback` deck activity, as strings. */
export function checkPointBackActivity(a) {
  const out = [];
  try {
    const m = activityModel(a);
    if (m.spec.len + GHOSTS > MAX_TILES) out.push(`${m.spec.len} digits + ${GHOSTS} faded zeros is more than ${MAX_TILES} tiles`);
    if (!diagnosePlace(m.spec, m.spec.want).ok) out.push('refuses its own point');
  } catch (e) { out.push(e.message); }
  return out;
}

/** Problems with a unit's `pointBack.items`, as strings — and proof that every stage accepts its own answer. */
export function checkPointBackItems(items, { bilingual = true } = {}) {
  const out = [];
  const ids = new Set();
  let lastLevel = 0;
  for (const [i, it] of (items || []).entries()) {
    const at = `item ${it?.id || i + 1}`;
    if (!it?.id) out.push(`item ${i + 1} has no id`);
    else if (ids.has(it.id)) out.push(`duplicate item id "${it.id}"`);
    ids.add(it?.id);
    if (!Number.isInteger(it?.level) || it.level < 1) out.push(`${at}: level must be a whole number ≥ 1`);
    else if (it.level < lastLevel) out.push(`${at}: level ${it.level} comes after level ${lastLevel} — levels only climb`);
    else lastLevel = it.level;
    if (it?.context && bilingual && !it.contextVn) out.push(`${at}: context needs contextVn`);
    if (it?.unit && it.money) out.push(`${at}: money items say "dollars" themselves — drop unit`);
    let m;
    try { m = pointModel(it); } catch (e) { out.push(`${at}: ${e.message}`); continue; }
    const own = (label, d) => { if (!d.ok) out.push(`${at}: ${label} refuses its own answer (${d.code})`); };
    if (m.kind === 'mul') {
      if (m.len + GHOSTS > MAX_TILES) out.push(`${at}: ${m.len} digits + ${GHOSTS} faded zeros is more than ${MAX_TILES} tiles`);
      if (m.estimate) own('the estimate', diagnoseEstimate(m.sum, plain(m.sum.est.value)));
      if (m.rows) {
        own('row 1', diagnoseRow(m, 0, String(m.rows[0].value)));
        own('row 2', diagnoseRow(m, 1, String(m.rows[1].value)));
        own('the total', diagnoseRow(m, 2, m.pText));
      } else own('the product', diagnoseOut(m, m.pText));
      own('the point', diagnosePlace(placeSpec(m), m.dp));
      if (m.write) {
        own('the answer', diagnoseWrite(m, m.money ? m.moneyText : m.answerText));
        if (!m.money) own('the answer without its zeros', diagnoseWrite(m, m.simpleText));
      }
      own('the whole answer', diagnoseProduct(m, m.simpleText));
    } else {
      m.steps.forEach((s, j) => {
        if (s.len + GHOSTS > MAX_TILES) out.push(`${at}: variant ${j + 1} has more than ${MAX_TILES} tiles`);
        own(`variant ${j + 1}'s estimate`, diagnoseEstimate(s.sum, plain(s.sum.est.value)));
        own(`variant ${j + 1}'s point`, diagnosePlace(placeSpec(m, s), s.dp));
        if (sameValue(s.sum.est.value, s.sum.exact)) out.push(`${at}: variant ${j + 1}'s estimate is the answer itself — nothing to estimate`);
      });
    }
  }
  return out;
}
