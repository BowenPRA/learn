// src/utils/makeEasy.js
//
// Make It Easy (Year 7 Maths 4.5, Making decimal calculations easier): the
// skill is CHOOSING the easy route, then doing it. Every method in 4.5 swaps a
// hard calculation for an easy one with the same answer:
//
//   × 0.5   is ÷ 2 (half of)        × 0.2   is ÷ 10, then × 2 (two tenths)
//   × 0.25  is ÷ 4 (a quarter of)   × 0.03  is ÷ 100, then × 3
//   × 0.1   is ÷ 10 (a tenth of)    × 0.9   is also "take away a tenth"
//   × 9     is × 10, then one lot fewer;  × 11 is × 10, then one lot more
//   4.3 × 6 is 4 × 6 + 0.3 × 6 (partitioning); 3.9 × 6 is also 4 × 6 − 0.1 × 6
//
// An item states the calculation only:
//   { id, level, a: '340', b: '0.2' }                  340 × 0.2
//   { id, level, kind: 'of', a: '58', b: '0.5' }       "half of 58"
//   { id, level, a: '5.6', b: '9' }                    × 9 / × 11
//   { id, level, a: '6.3', b: '4' }                    partitioning
//   { id, level, a: '650', b: '0.4', context, contextFr, cue: 'of' }   a story
// (`op: '×'` may be written; × is the only operation.) The family, the routes
// (the valid ones and the misconceptions offered beside them), every step, the
// answer and the name of the slip behind a wrong one are derived here, with the
// exact decimals of utils/decimal.js; the validator runs the same code
// (checkMakeEasyItems). Messages are { en, fr } — the unit is English / French.

import { dec, decText, canon, sameValue, readDec, compare, shift } from './decimal.js';
import { readProblem } from './rounding.js';
import { shiftModel, diagnoseShift } from './placeShift.js';

// ── exact arithmetic on { n, dp } ───────────────────────────────────────────
const P = (k) => 10n ** BigInt(k);
const align = (a, b) => {
  const dp = Math.max(a.dp, b.dp);
  return [a.n * P(dp - a.dp), b.n * P(dp - b.dp), dp];
};
export const addD = (a, b) => { const [x, y, dp] = align(a, b); return canon({ n: x + y, dp }); };
export const subD = (a, b) => {
  const [x, y, dp] = align(a, b);
  if (y > x) throw new Error(`${decText(a)} − ${decText(b)} is negative`);
  return canon({ n: x - y, dp });
};
export const mulD = (a, b) => canon({ n: a.n * b.n, dp: a.dp + b.dp });
/** v ÷ k for a whole k, exactly — throws when it never stops (÷ 3, ÷ 7 …). */
export const divD = (v, k) => {
  const K = BigInt(decText(canon(k)));
  if (canon(k).dp !== 0 || K === 0n) throw new Error(`÷ ${decText(k)} is not a whole number`);
  let { n, dp } = v;
  for (let guard = 0; n % K !== 0n; guard += 1) {
    if (guard > 8) throw new Error(`${decText(v)} ÷ ${K} does not stop`);
    n *= 10n; dp += 1;
  }
  return canon({ n: n / K, dp });
};
const tryDiv = (v, k) => { try { return divD(v, k); } catch { return null; } };
/** Canonical text: 35.0 → 35. */
export const txt = (v) => decText(canon(v));
const D = (s) => canon(dec(String(s)));
const W = (n) => D(String(n));
const isWhole = (v) => canon(v).dp === 0;
const OPS = { '×': '\\times', '÷': '\\div', '−': '-', '+': '+' };
const say = (en, fr) => ({ en, fr });

/** One step of a route: left op right = value. */
function step(left, op, right, note) {
  const value = op === '×' ? mulD(left, right) : op === '÷' ? divD(left, right) : op === '+' ? addD(left, right) : subD(left, right);
  return {
    left, op, right, value, note,
    latex: `${txt(left)} ${OPS[op]} ${txt(right)}`,
    text: `${txt(left)} ${op} ${txt(right)}`,
  };
}
/** A route's easy calculation, as KaTeX and as plain text, from [x, op, y, op, z …]. */
const expr = (...parts) => ({
  latex: parts.map((p) => (typeof p === 'string' && OPS[p] ? OPS[p] : txt(p))).join(' '),
  text: parts.map((p) => (typeof p === 'string' && OPS[p] ? p : txt(p))).join(' '),
});

// ── the families ────────────────────────────────────────────────────────────

export const FAMILIES = ['half', 'quarter', 'tenth', 'tenths', 'hundredths', 'near10', 'partition'];

/** Which easy way a × b has: the family and its digit. Throws when there is none. */
export function familyOf(a, b) {
  const bt = txt(b);
  if (bt === '0.5') return { family: 'half' };
  if (bt === '0.25') return { family: 'quarter' };
  if (bt === '0.1') return { family: 'tenth' };
  let m = /^0\.([2-9])$/.exec(bt);
  if (m) return { family: 'tenths', d: Number(m[1]) };
  m = /^0\.0([2-9])$/.exec(bt);
  if (m) return { family: 'hundredths', d: Number(m[1]) };
  if (bt === '9' || bt === '11') return { family: 'near10', d: Number(bt) };
  if (isWhole(b) && Number(bt) >= 2 && Number(bt) <= 8 && !isWhole(a) && canon(a).dp <= 2 && compare(a, W(1)) >= 0) return { family: 'partition', d: Number(bt) };
  throw new Error(`${txt(a)} × ${bt} has no easy way here — b must be 0.5, 0.25, 0.1, 0.2–0.9, 0.02–0.09, 9 or 11, or a whole 2–8 with a decimal a (at least 1)`);
}

/** "half of", "a quarter of", "0.4 of" — the words for × b. */
export function ofWords(b) {
  const bt = txt(b);
  if (bt === '0.5') return say('half of', 'la moitié de');
  if (bt === '0.25') return say('a quarter of', 'le quart de');
  if (bt === '0.1') return say('a tenth of', 'le dixième de');
  return say(`${bt} of`, `${bt} de`);
}
const PLACE = { 1: say('tenths', 'dixièmes'), 2: say('hundredths', 'centièmes') };
const PLACE_ONE = { 1: say('tenth', 'dixième'), 2: say('hundredth', 'centième') };
/** "3 tenths", "1 tenth" — a count of a place, in both languages. */
const countOf = (n, dp) => {
  const w = String(n) === '1' ? PLACE_ONE[dp] : PLACE[dp];
  return say(`${n} ${w.en}`, `${n} ${w.fr}`);
};

/**
 * The routes for a × b: `valid` (each with its steps, a name and the chain to
 * copy) and `wrong` (the misconception offered beside them, its value when it
 * has one, and why it is wrong). `pick` (0/1, from the item id) chooses which
 * second misconception a one-route family shows.
 */
function routesFor(fam, a, b, pick) {
  const A = txt(a);
  const B = txt(b);
  const { family, d } = fam;
  const valid = [];
  const wrong = [];
  let offer = null;
  const bad = (id, e, value, why) => wrong.push({ id, latex: null, text: null, ...e, value, why });
  const ten = W(10);
  const hundred = W(100);

  if (family === 'half' || family === 'quarter' || family === 'tenth') {
    const k = { half: 2, quarter: 4, tenth: 10 }[family];
    const s = step(a, '÷', W(k), { half: say('half', 'la moitié'), quarter: say('a quarter', 'le quart'), tenth: say('a tenth', 'un dixième') }[family]);
    valid.push({
      id: family, ...expr(a, '÷', W(k)), steps: [s],
      name: {
        half: say('× 0.5 is half of: ÷ 2.', '× 0.5, c’est la moitié : ÷ 2.'),
        quarter: say('× 0.25 is a quarter of: ÷ 4.', '× 0.25, c’est le quart : ÷ 4.'),
        tenth: say('× 0.1 is a tenth of: ÷ 10.', '× 0.1, c’est le dixième : ÷ 10.'),
      }[family],
    });
    if (family === 'half') {
      bad('double', expr(a, '×', W(2)), mulD(a, W(2)), say(
        `× 0.5 is half of: ÷ 2. × 2 doubles ${A}, but × 0.5 makes it smaller.`,
        `× 0.5, c’est la moitié : ÷ 2. × 2 double ${A}, alors que × 0.5 le rend plus petit.`));
      bad('fifth', expr(a, '÷', W(5)), tryDiv(a, W(5)), say(
        '0.5 is five tenths — a half — not a fifth. ÷ 5 would be × 0.2.',
        '0.5, c’est cinq dixièmes — une moitié — pas un cinquième. ÷ 5, ce serait × 0.2.'));
    } else if (family === 'quarter') {
      bad('twentyfive', expr(a, '÷', W(25)), tryDiv(a, W(25)), say(
        '× 0.25 is not ÷ 25. 0.25 is 25 hundredths — a quarter — so it is ÷ 4.',
        '× 0.25, ce n’est pas ÷ 25. 0.25, c’est 25 centièmes — un quart — donc ÷ 4.'));
      bad('times4', expr(a, '×', W(4)), mulD(a, W(4)), say(
        `× 4 makes ${A} bigger. × 0.25 is a quarter of it: ÷ 4.`,
        `× 4 rend ${A} plus grand. × 0.25, c’est le quart : ÷ 4.`));
    } else {
      bad('times10', expr(a, '×', ten), mulD(a, ten), say(
        `× 10 makes ${A} bigger. × 0.1 is a tenth of it: ÷ 10.`,
        `× 10 rend ${A} plus grand. × 0.1, c’est le dixième : ÷ 10.`));
      bad('hundred', expr(a, '÷', hundred), divD(a, hundred), say(
        '0.1 is one TENTH, so ÷ 10. ÷ 100 would be × 0.01.',
        '0.1, c’est un DIXIÈME, donc ÷ 10. ÷ 100, ce serait × 0.01.'));
    }
  }

  if (family === 'tenths' || family === 'hundredths') {
    const places = family === 'tenths' ? 1 : 2;
    const k = places === 1 ? ten : hundred;
    const s1 = step(a, '÷', k, places === 1 ? say('one tenth', 'un dixième') : say('one hundredth', 'un centième'));
    const s2 = step(s1.value, '×', W(d), say(`${d} ${PLACE[places].en}`, `${d} ${PLACE[places].fr}`));
    valid.push({
      id: family, ...expr(a, '÷', k, '×', W(d)), steps: [s1, s2],
      name: say(`${B} is ${d} ${PLACE[places].en}: ÷ ${txt(k)}, then × ${d}.`, `${B}, c’est ${d} ${PLACE[places].fr} : ÷ ${txt(k)}, puis × ${d}.`),
    });
    if (family === 'tenths' && d === 9) {
      const t = step(a, '÷', ten, say('one tenth', 'un dixième'));
      valid.push({
        id: 'near1', ...expr(a, '−', a, '÷', ten), steps: [t, step(a, '−', t.value, say('take it away', 'on l’enlève'))],
        name: say(`0.9 is one tenth less than 1: take a tenth of ${A} away from ${A}.`, `0.9, c’est 1 moins un dixième : enlève un dixième de ${A} à ${A}.`),
      });
    }
    // Every misconception is worked out (so a typed answer can be named by it);
    // two are offered beside the right route — one when 0.9 has two right ones.
    bad('divd', expr(a, '÷', W(d)), tryDiv(a, W(d)), say(
      `× ${B} is not ÷ ${d}${d === 2 ? ' — ÷ 2 is × 0.5' : ''}. ${B} is ${d} ${PLACE[places].en}: ÷ ${txt(k)}, then × ${d}.`,
      `× ${B}, ce n’est pas ÷ ${d}${d === 2 ? ' — ÷ 2, c’est × 0.5' : ''}. ${B}, c’est ${d} ${PLACE[places].fr} : ÷ ${txt(k)}, puis × ${d}.`));
    bad('muld', expr(a, '×', W(d)), mulD(a, W(d)), say(
      `${A} × ${d} forgets the point in ${B}, and makes ${A} bigger. ${B} is ${d} ${PLACE[places].en}: ÷ ${txt(k)} first, then × ${d}.`,
      `${A} × ${d} oublie le point de ${B} et rend ${A} plus grand. ${B}, c’est ${d} ${PLACE[places].fr} : ÷ ${txt(k)} d’abord, puis × ${d}.`));
    if (family === 'tenths') {
      bad('hund', expr(a, '÷', hundred, '×', W(d)), mulD(divD(a, hundred), W(d)), say(
        `${B} is ${d} TENTHS, not hundredths: ÷ 10, then × ${d}. ÷ 100 would be × 0.0${d}.`,
        `${B}, c’est ${d} DIXIÈMES, pas des centièmes : ÷ 10, puis × ${d}. ÷ 100, ce serait × 0.0${d}.`));
      offer = d === 9 ? ['muld'] : ['divd', pick ? 'muld' : 'hund'];
    } else {
      bad('tenthscol', expr(a, '÷', ten, '×', W(d)), mulD(divD(a, ten), W(d)), say(
        `${B} is ${d} HUNDREDTHS — the 0 holds the tenths column: ÷ 100, then × ${d}. ÷ 10 would be × 0.${d}.`,
        `${B}, c’est ${d} CENTIÈMES — le 0 tient la colonne des dixièmes : ÷ 100, puis × ${d}. ÷ 10, ce serait × 0.${d}.`));
      offer = ['tenthscol', pick ? 'muld' : 'divd'];
    }
  }

  if (family === 'near10') {
    const s1 = step(a, '×', ten, say('ten lots', 'dix fois'));
    const fewer = d === 9;
    const s2 = step(s1.value, fewer ? '−' : '+', a, fewer ? say('one lot fewer', 'une fois de moins') : say('one lot more', 'une fois de plus'));
    valid.push({
      id: 'near10', ...expr(a, '×', ten, fewer ? '−' : '+', a), steps: [s1, s2],
      name: fewer
        ? say(`× 9 is ten lots of ${A}, then one lot fewer.`, `× 9, c’est dix fois ${A}, puis une fois de moins.`)
        : say(`× 11 is ten lots of ${A}, then one lot more.`, `× 11, c’est dix fois ${A}, puis une fois de plus.`),
    });
    const ten10 = s1.value;
    bad('wrongway', expr(a, '×', ten, fewer ? '+' : '−', a), fewer ? addD(ten10, a) : subD(ten10, a), fewer
      ? say(`× 9 is one lot FEWER than × 10: take ${A} away, do not add it. Adding gives × 11.`, `× 9, c’est une fois DE MOINS que × 10 : enlève ${A}, ne l’ajoute pas. L’ajouter donne × 11.`)
      : say(`× 11 is one lot MORE than × 10: add ${A}, do not take it away. Taking it away gives × 9.`, `× 11, c’est une fois DE PLUS que × 10 : ajoute ${A}, ne l’enlève pas. L’enlever donne × 9.`));
    bad(fewer ? 'minusone' : 'plusone', expr(a, '×', ten, fewer ? '−' : '+', W(1)), fewer ? subD(ten10, W(1)) : addD(ten10, W(1)), fewer
      ? say(`Take away one LOT — one more ${A} — not 1.`, `Enlève une FOIS le nombre — encore ${A} — pas 1.`)
      : say(`Add one LOT — one more ${A} — not 1.`, `Ajoute une FOIS le nombre — encore ${A} — pas 1.`));
    offer = ['wrongway', fewer ? 'minusone' : 'plusone'];
    // Mr Bowen's 3.4 × 9 = 34 − 3: only the whole part of the lot (never offered).
    const w = W(A.split('.')[0]);
    if (!isWhole(a) && w.n > 1n) {
      bad('wholeonly', null, fewer ? subD(ten10, w) : addD(ten10, w), fewer
        ? say(`Take away the whole lot, ${A} — not just ${txt(w)}.`, `Enlève le nombre entier, ${A} — pas seulement ${txt(w)}.`)
        : say(`Add the whole lot, ${A} — not just ${txt(w)}.`, `Ajoute le nombre entier, ${A} — pas seulement ${txt(w)}.`));
    }
  }

  if (family === 'partition') {
    const whole = W(txt(a).split('.')[0]);
    const part = subD(a, whole);
    const s1 = step(whole, '×', b, say('the whole part', 'la partie entière'));
    const s2 = step(part, '×', b, say('the decimal part', 'la partie décimale'));
    valid.push({
      id: 'partition', ...expr(whole, '×', b, '+', part, '×', b), steps: [s1, s2, step(s1.value, '+', s2.value, say('add the parts', 'additionne les parties'))],
      name: say(`Partition ${A} into ${txt(whole)} + ${txt(part)}. Multiply each part by ${B}, then add.`, `Décompose ${A} en ${txt(whole)} + ${txt(part)}. Multiplie chaque partie par ${B}, puis additionne.`),
    });
    const digits = W(String(part.n));
    bad('partpart', expr(whole, '×', b, '+', part), addD(s1.value, part), say(
      `The ${txt(part)} must be multiplied too: ${A} × ${B} is ${txt(whole)} × ${B} AND ${txt(part)} × ${B}.`,
      `Le ${txt(part)} doit aussi être multiplié : ${A} × ${B}, c’est ${txt(whole)} × ${B} ET ${txt(part)} × ${B}.`));
    bad('point', expr(whole, '×', b, '+', digits, '×', b), addD(s1.value, mulD(digits, b)), say(
      `The ${txt(digits)} after the point is ${txt(part)}, not ${txt(digits)}. Keep the point: ${txt(part)} × ${B}.`,
      `Le ${txt(digits)} après le point vaut ${txt(part)}, pas ${txt(digits)}. Garde le point : ${txt(part)} × ${B}.`));
    // Mr Bowen's 5.2 × 6 = 30 + 0.12: the decimal part's product one place too small (never offered).
    bad('pointstep', null, addD(s1.value, shift(s2.value, -1)), say(
      `${txt(part)} × ${B} is ${txt(s2.value)}, not ${txt(shift(s2.value, -1))}: ${countOf(txt(digits), part.dp).en} × ${B} = ${countOf(txt(mulD(digits, b)), part.dp).en}.`,
      `${txt(part)} × ${B} donne ${txt(s2.value)}, pas ${txt(shift(s2.value, -1))} : ${countOf(txt(digits), part.dp).fr} × ${B} = ${countOf(txt(mulD(digits, b)), part.dp).fr}.`));
    offer = ['partpart', 'point'];
    const tenths = a.dp === 1 ? Number(txt(a).split('.')[1]) : 0;
    if (tenths >= 8) {
      const up = addD(whole, W(1));
      const gap = subD(up, a);
      const n1 = step(up, '×', b, say(`round up to ${txt(up)}`, `arrondis à ${txt(up)}`));
      const n2 = step(gap, '×', b, say(`the extra ${txt(gap)}, ${B} times`, `le ${txt(gap)} en trop, ${B} fois`));
      valid.push({
        id: 'nearly', ...expr(up, '×', b, '−', gap, '×', b), steps: [n1, n2, step(n1.value, '−', n2.value, say('take it away', 'enlève-le'))],
        name: say(`${A} is nearly ${txt(up)}: work out ${txt(up)} × ${B}, then take away ${txt(gap)} × ${B}.`, `${A}, c’est presque ${txt(up)} : calcule ${txt(up)} × ${B}, puis enlève ${txt(gap)} × ${B}.`),
      });
      bad('nearlyone', expr(up, '×', b, '−', gap), subD(n1.value, gap), say(
        `${txt(up)} × ${B} is ${B} lots of ${txt(gap)} too many — take away ${txt(gap)} × ${B}, not just ${txt(gap)}.`,
        `${txt(up)} × ${B}, c’est ${B} fois ${txt(gap)} de trop — enlève ${txt(gap)} × ${B}, pas seulement ${txt(gap)}.`));
      offer = ['nearlyone'];
    }
  }
  return { valid, wrong, offer: offer || wrong.filter((w) => w.latex).map((w) => w.id) };
}

// ── the model ───────────────────────────────────────────────────────────────

export const KINDS = ['calc', 'of'];
export const CUES = ['of', 'each'];
export const STAGES = ['meaning', 'size', 'route', 'steps'];

const hashOf = (s) => {
  let h = 2166136261;
  for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  return h;
};
/** Deterministic shuffle — a screen shows the same order every visit. */
function shuffled(list, seed) {
  let h = seed >>> 0 || 1;
  const rand = () => { h ^= h << 13; h >>>= 0; h ^= h >> 17; h ^= h << 5; h >>>= 0; return h / 4294967296; };
  const out = [...list];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * The worked item.
 *   a, b, product           values (A, B, answerText their text)
 *   family, d               which easy way (familyOf)
 *   valid                   the right routes: { id, latex, text, name, steps }
 *   wrong                   every misconception: { id, latex, text, value, why }
 *   choices                 the routes offered, shuffled: valid + 1–2 wrong, each with `valid`
 *   stages                  ['meaning' | 'size', 'route', 'steps']
 *   words                   "half of" — for a kind 'of' item or an "of" story
 *   meaning                 the three calculations a story / "of" item could be
 */
export function easyModel(item) {
  if (item?.op != null && !['×', 'x', '*'].includes(String(item.op).trim())) throw new Error(`op "${item.op}" — Make It Easy multiplies (×) only`);
  const kind = item.kind || 'calc';
  if (!KINDS.includes(kind)) throw new Error(`kind "${kind}" — ${KINDS.join('/')}`);
  const a = D(item.a);
  const b = D(item.b);
  if (a.n === 0n || b.n === 0n) throw new Error('a and b must not be 0');
  const fam = familyOf(a, b);
  const h = hashOf(item.id || `${txt(a)}x${txt(b)}`);
  const { valid, wrong, offer } = routesFor(fam, a, b, h % 2);
  const below1 = compare(b, W(1)) < 0;
  const story = !!item.context;
  if (kind === 'of' && !below1) throw new Error('kind "of" needs b less than 1 ("half of", "0.4 of")');
  if (kind === 'of' && story) throw new Error('an item is "of" words or a story, not both');
  const cue = item.cue || (below1 ? 'of' : 'each');
  if (!CUES.includes(cue)) throw new Error(`cue "${cue}" — ${CUES.join('/')}`);
  if (cue === 'of' && !below1) throw new Error('cue "of" needs b less than 1');
  const words = kind === 'of' || (story && cue === 'of') ? ofWords(b) : null;
  const stages = [];
  if (kind === 'of' || story) stages.push('meaning');
  else if (below1) stages.push('size');
  stages.push('route', 'steps');
  const offered = offer.map((id) => wrong.find((w) => w.id === id)).filter(Boolean);
  const choices = shuffled([...valid.map((r) => ({ ...r, valid: true })), ...offered.map((r) => ({ ...r, valid: false }))], h);
  const meaning = stages[0] === 'meaning'
    ? shuffled(cue === 'each'
      ? [{ id: 'times', ...expr(a, '×', b) }, { id: 'plus', ...expr(a, '+', b) }, { id: 'share', ...expr(a, '÷', b) }]
      : [{ id: 'times', ...expr(a, '×', b) }, { id: 'divide', ...expr(a, '÷', b) }, { id: 'plus', ...expr(a, '+', b) }], h >>> 3)
    : null;
  const product = mulD(a, b);
  return {
    item, kind, a, b, A: txt(a), B: txt(b), below1, family: fam.family, d: fam.d ?? null,
    product, answerText: txt(product), valid, wrong, choices, stages, cue, story, words, meaning,
    calc: expr(a, '×', b),
    phrase: words ? say(`${words.en} ${txt(a)}`, `${words.fr} ${txt(a)}`) : null,
  };
}

/** The question as KaTeX: "340 × 0.2", or "\text{half of } 58". */
export function questionLatex(model) {
  return model.kind === 'of' ? `\\text{${model.words.en} } ${model.A}` : model.calc.latex;
}

/** The finished line to copy: 340 × 0.2 = 340 ÷ 10 × 2 = 34 × 2 = 68. */
export function chainLatex(model, route = model.valid[0]) {
  const lead = model.kind === 'of' ? `\\text{${model.words.en} } ${model.A} = ${model.calc.latex}` : model.calc.latex;
  const last = route.steps[route.steps.length - 1];
  const mid = route.steps.length > 1 ? ` = ${last.latex}` : '';
  return `${lead} = ${route.latex}${mid} = ${model.answerText}`;
}

// ── marking: every wrong answer is named ────────────────────────────────────

const bad = (code, en, fr) => ({ ok: false, code, en, fr });

/** Stage "size": is the answer bigger or smaller than a? (b < 1 only) */
export function diagnoseSize(model, pick) {
  const { A, B } = model;
  if (pick === 'smaller') {
    return { ok: true, code: 'ok', en: `Right — ${B} is less than 1, so × ${B} takes only part of ${A}. The answer is smaller.`, fr: `Correct — ${B} est plus petit que 1, donc × ${B} ne prend qu’une partie de ${A}. La réponse est plus petite.` };
  }
  return bad('bigger',
    `Multiplying does not always make a number bigger. ${B} is less than 1, so × ${B} takes only part of ${A}: the answer is smaller than ${A}.`,
    `Multiplier ne rend pas toujours un nombre plus grand. ${B} est plus petit que 1, donc × ${B} ne prend qu’une partie de ${A} : la réponse est plus petite que ${A}.`);
}

/** Stage "meaning": which calculation do the words ask for? */
export function diagnoseMeaning(model, id) {
  const { A, B, cue, phrase } = model;
  if (id === 'times') {
    return cue === 'each'
      ? { ok: true, code: 'ok', en: `Right — ${B} lots of ${A}: ${A} × ${B}.`, fr: `Correct — ${B} fois ${A} : ${A} × ${B}.` }
      : { ok: true, code: 'ok', en: `Right — "of" means ×: ${A} × ${B}.`, fr: `Correct — « of » (de) veut dire × : ${A} × ${B}.` };
  }
  if (cue === 'each') {
    return id === 'plus'
      ? bad('plus', `${B} of them at ${A} each is ${B} lots of ${A} — that is ×, not +.`, `${B}, à ${A} chacun, c’est ${B} fois ${A} — c’est ×, pas +.`)
      : bad('share', `÷ shares a total out. Here you know one of them, and you want ${B} of them: ×.`, `÷ partage un total. Ici, tu connais la valeur d’un seul, et tu en veux ${B} : ×.`);
  }
  return id === 'divide'
    ? bad('divide', `"Of" means ×: ${phrase.en} is ${A} × ${B}. ÷ ${B} would give more than ${A}.`, `« Of » (de) veut dire × : ${phrase.en} (${phrase.fr}), c’est ${A} × ${B}. ÷ ${B} donnerait plus que ${A}.`)
    : bad('plus', `"Of" means ×, not +: ${phrase.en} is ${A} × ${B}.`, `« Of » (de) veut dire ×, pas + : ${phrase.en} (${phrase.fr}), c’est ${A} × ${B}.`);
}

/** Stage "route": the easy way chosen. A right one says what it is; a wrong one, why not. */
export function diagnoseRoute(model, id) {
  const r = model.choices.find((c) => c.id === id);
  if (!r) return bad('unknown', 'Choose one of the ways shown.', 'Choisis un des moyens proposés.');
  if (r.valid) return { ok: true, code: r.id, route: r, en: `Right. ${r.name.en}`, fr: `Correct. ${r.name.fr}` };
  return bad(r.id, r.why.en, r.why.fr);
}

/** A ÷ or × by 10, 100 or 1000 is a 3.1 slide of the digits — mark it as Slide the Digits does. */
function shiftOf(s) {
  const p = { 10: 1, 100: 2, 1000: 3 }[txt(s.right)];
  if (!p || (s.op !== '×' && s.op !== '÷')) return null;
  try { return shiftModel({ n: txt(s.left), op: s.op, p }); } catch { return null; }
}

/** "Check the point": 0.3 × 6 is 3 tenths × 6 = 18 tenths. */
function pointWhy(s) {
  const lv = canon(s.left);
  if (lv.dp >= 1 && lv.dp <= 2) {
    const n = countOf(txt(W(String(lv.n))), lv.dp);
    const prod = countOf(txt(mulD(W(String(lv.n)), s.right)), lv.dp);
    return bad('point',
      `Check the point. ${txt(s.left)} is ${n.en}, and ${n.en} × ${txt(s.right)} = ${prod.en}.`,
      `Vérifie le point. ${txt(s.left)}, c’est ${n.fr}, et ${n.fr} × ${txt(s.right)} = ${prod.fr}.`);
  }
  return bad('point', `Check the size of your answer: ${s.text}. Count the zeros and the point again.`, `Vérifie la taille de ta réponse : ${s.text}. Recompte les zéros et le point.`);
}

/**
 * Mark one step's box. `{ ok, code, en, fr }`; slips named: the ÷ 10 / ÷ 100
 * slide (the wrong way, the wrong number of places — placeShift.diagnoseShift),
 * ÷ made bigger ('direction'), the point in a product ('point'), adding for
 * taking away ('sign'), taking away 1 instead of a lot ('one'), only the whole
 * part of the lot ('wholeonly'), points not lined up ('line'). Unreadable
 * input comes back `soft` (not a try).
 */
export function diagnoseStep(s, typed) {
  const r = readDec(typed);
  if (!r.ok) return readProblem(r.code);
  const t = r.v;
  if (sameValue(t, s.value)) return { ok: true, code: 'ok' };
  const L = txt(s.left);
  const R = txt(s.right);
  const sm = shiftOf(s);
  if (sm) {
    const d = diagnoseShift(sm, typed);
    return bad(d.code, d.en, d.fr);
  }
  const moved = [-2, -1, 1, 2].some((k) => sameValue(t, shift(s.value, k)));
  if (s.op === '÷') {
    if (sameValue(t, mulD(s.left, s.right))) {
      return bad('direction', `÷ ${R} makes ${L} smaller, not bigger: you want ${s.note.en} of ${L}.`, `÷ ${R} rend ${L} plus petit, pas plus grand : tu cherches ${s.note.fr} de ${L}.`);
    }
    if (moved) return bad('point', `Check the point: ${s.note.en} of ${L}.`, `Vérifie le point : ${s.note.fr} de ${L}.`);
  }
  if (s.op === '×' && moved) return pointWhy(s);
  if (s.op === '−') {
    if (sameValue(t, addD(s.left, s.right))) return bad('sign', `Take ${R} away — do not add it.`, `Enlève ${R} — ne l’ajoute pas.`);
    if (!sameValue(s.right, W(1)) && compare(s.left, W(1)) >= 0 && sameValue(t, subD(s.left, W(1)))) return bad('one', `Take away ${R}, not 1.`, `Enlève ${R}, pas 1.`);
    const w = W(R.split('.')[0]);
    if (!isWhole(s.right) && w.n > 0n && compare(s.left, w) >= 0 && sameValue(t, subD(s.left, w))) {
      return bad('wholeonly', `Take away all of ${R}, not just ${txt(w)}.`, `Enlève tout ${R}, pas seulement ${txt(w)}.`);
    }
  }
  if (s.op === '+') {
    if (compare(s.left, s.right) >= 0 && sameValue(t, subD(s.left, s.right))) return bad('sign', `Add ${R} — do not take it away.`, `Ajoute ${R} — ne l’enlève pas.`);
    if (!sameValue(s.right, W(1)) && sameValue(t, addD(s.left, W(1)))) return bad('one', `Add ${R}, not 1.`, `Ajoute ${R}, pas 1.`);
    const w = W(R.split('.')[0]);
    if (!isWhole(s.right) && w.n > 0n && sameValue(t, addD(s.left, w))) return bad('wholeonly', `Add all of ${R}, not just ${txt(w)}.`, `Ajoute tout ${R}, pas seulement ${txt(w)}.`);
    const misaligned = [-1, 1].some((k) => sameValue(t, addD(shift(s.left, k), s.right)) || sameValue(t, addD(s.left, shift(s.right, k))));
    if (moved || misaligned) {
      return bad('line', `Line up the points before you add ${L} + ${R}: ones under ones, tenths under tenths.`, `Aligne les points avant d’additionner ${L} + ${R} : unités sous unités, dixièmes sous dixièmes.`);
    }
  }
  return bad('value', `Not quite — work out ${s.text} again.`, `Pas tout à fait — recalcule ${s.text}.`);
}

/**
 * Mark a typed final answer (Quick Fire, and the Make It Easy activity's last
 * box). A wrong answer is named by the misconception it matches — every one
 * routesFor works out, offered or not — else 'nomove', 'bigger' (× a number
 * less than 1 made it bigger), 'place' (right digits, wrong point), 'value'.
 */
export function diagnoseAnswer(model, typed) {
  const r = readDec(typed);
  if (!r.ok) return readProblem(r.code);
  const t = r.v;
  const { a, A, B, product } = model;
  const easy = model.valid[0];
  if (sameValue(t, product)) return { ok: true, code: 'ok' };
  if (sameValue(t, a)) return bad('nomove', `That is ${A}, the number you started with. Make it easy: ${easy.text}.`, `C’est ${A}, le nombre de départ. Rends-le facile : ${easy.text}.`);
  for (const w of model.wrong) if (w.value && sameValue(t, w.value)) return bad(w.id, w.why.en, w.why.fr);
  if (model.below1 && compare(t, a) > 0) {
    return bad('bigger', `Your answer is bigger than ${A}. ${B} is less than 1, so the answer must be smaller. ${easy.name.en}`,
      `Ta réponse est plus grande que ${A}. ${B} est plus petit que 1, donc la réponse doit être plus petite. ${easy.name.fr}`);
  }
  if ([-3, -2, -1, 1, 2, 3].some((k) => sameValue(t, shift(product, k)))) {
    return bad('place', `The digits are right, but the point is in the wrong place. ${easy.name.en}`, `Les chiffres sont justes, mais le point n’est pas à sa place. ${easy.name.fr}`);
  }
  return bad('value', `Not quite. The easy way: ${easy.text}.`, `Pas tout à fait. Le moyen facile : ${easy.text}.`);
}

// ── the validator ───────────────────────────────────────────────────────────

/** Prove a worked item: every route ends at the answer, every box accepts its own value, every slip is named. */
function proveModel(m) {
  const out = [];
  for (const r of m.valid) {
    const last = r.steps[r.steps.length - 1];
    if (!sameValue(last.value, m.product)) out.push(`route ${r.id} ends at ${txt(last.value)}, not ${m.answerText}`);
    for (const s of r.steps) {
      if (!diagnoseStep(s, txt(s.value)).ok) out.push(`route ${r.id}: the box for ${s.text} refuses its own value ${txt(s.value)}`);
      if (canon(s.value).dp > 4) out.push(`route ${r.id}: ${s.text} = ${txt(s.value)} has more than 4 decimal places`);
    }
  }
  if (m.choices.length < 2 || m.choices.length > 3) out.push(`${m.choices.length} ways offered — 2 or 3`);
  if (!m.choices.some((c) => !c.valid)) out.push('no wrong way is offered beside the right one');
  for (const c of m.choices) if (diagnoseRoute(m, c.id).ok !== c.valid) out.push(`the way ${c.text} is marked ${c.valid ? 'wrong' : 'right'}`);
  for (const w of m.wrong) {
    if (!w.value) continue;
    if (sameValue(w.value, m.product)) { out.push(`the ${w.id} slip gives the right answer ${m.answerText} — it is no slip here`); continue; }
    const d = diagnoseAnswer(m, txt(w.value));
    if (d.ok || d.code !== w.id) out.push(`the ${w.id} answer ${txt(w.value)} is named "${d.code}", not "${w.id}"`);
  }
  if (!diagnoseAnswer(m, m.answerText).ok) out.push(`the answer ${m.answerText} is refused`);
  if (m.stages.includes('size') && (!diagnoseSize(m, 'smaller').ok || diagnoseSize(m, 'bigger').ok)) out.push('the size stage is marked the wrong way');
  if (m.meaning && m.meaning.filter((o) => diagnoseMeaning(m, o.id).ok).length !== 1) out.push('the meaning stage needs exactly one right calculation');
  if (compare(m.a, W(100000)) > 0) out.push(`${m.A} is too big for a Year 7 mental calculation`);
  return out;
}

/** Problems with a unit's `makeEasy.items`, as strings. */
export function checkMakeEasyItems(items, { bilingual = true } = {}) {
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
    let m;
    try { m = easyModel(it); } catch (e) { out.push(`${at}: ${e.message}`); continue; }
    for (const p of proveModel(m)) out.push(`${at}: ${p}`);
  }
  return out;
}

/** Problems with an `easy` deck activity (the fields beyond prompt / explain). */
export function checkEasyActivity(a, { bilingual = true } = {}) {
  let m;
  try { m = easyModel({ id: a.id, a: a.a, b: a.b, kind: a.kind, context: a.context, cue: a.cue }); } catch (e) { return [e.message]; }
  const out = proveModel(m);
  if (a.context && bilingual && !a.contextVn) out.push('context needs contextVn');
  return out;
}

// ── Quick Fire cards (utils/quickFire.js modes `makeeasy` and `easyway`) ────

const intIn = (rng, lo, hi) => lo + Math.floor(rng() * (hi - lo + 1));
const pickOne = (rng, list) => list[Math.floor(rng() * list.length)];
// The deck's Make It Easy game, dealt fresh: every family, numbers that make
// the easy way come out clean.
const QF_SHAPES = [
  (r) => [String(2 * intIn(r, 7, 99)), '0.5'],
  (r) => [`${intIn(r, 1, 9)}.${pickOne(r, [2, 4, 6, 8])}`, '0.5'],
  (r) => [String(4 * intIn(r, 4, 40)), '0.25'],
  (r) => [String(intIn(r, 13, 99)), '0.1'],
  (r) => [String(10 * intIn(r, 3, 90)), `0.${pickOne(r, [2, 3, 4, 6, 7, 8])}`],
  (r) => [String(100 * intIn(r, 2, 40)), `0.0${intIn(r, 2, 9)}`],
  (r) => [String(intIn(r, 11, 60)), '0.9'],
  (r) => [`${intIn(r, 1, 9)}.${intIn(r, 1, 9)}`, pickOne(r, ['9', '11'])],
  (r) => [`${intIn(r, 2, 9)}.${intIn(r, 1, 9)}`, String(intIn(r, 3, 8))],
];
function qfModel(rng, id) {
  for (let tries = 0; tries < 40; tries += 1) {
    const [a, b] = pickOne(rng, QF_SHAPES)(rng);
    try { return easyModel({ id, a, b }); } catch { /* deal again */ }
  }
  return null;
}

/** `makeeasy`: a × b = ? — typed, the slip named by diagnoseAnswer. */
export function makeEasyCard(rng, id) {
  const m = qfModel(rng, id);
  if (!m) return null;
  return {
    id, mode: 'makeeasy', latex: `${m.calc.latex} =`, answer: m.answerText,
    ask: { en: 'Make it easy, then type the answer.', fr: 'Rends-le facile, puis écris la réponse.' },
    mark: (typed) => diagnoseAnswer(m, typed),
  };
}

/** `easyway`: two buttons — a right easy way and a misconception. */
export function easyWayCard(rng, id) {
  const m = qfModel(rng, id);
  if (!m) return null;
  const right = pickOne(rng, m.choices.filter((c) => c.valid));
  const wrong = pickOne(rng, m.choices.filter((c) => !c.valid));
  const pair = rng() < 0.5 ? [right, wrong] : [wrong, right];
  return {
    id, mode: 'easyway', latex: m.calc.latex, answer: right.text,
    ask: { en: 'Which is the easy way?', fr: 'Quel est le moyen facile ?' },
    choices: pair.map((c) => ({ val: c.id, en: c.text, fr: c.text })),
    mark: (val) => (val === right.id ? { ok: true } : bad(wrong.id, wrong.why.en, wrong.why.fr)),
  };
}
