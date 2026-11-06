// src/utils/decOrder.js
//
// Fill the Zeros — comparing and ordering decimals (Year 7 Maths 4.1). The one
// idea: a LONGER decimal is not a BIGGER one. 3.3 beats 3.25, because once the
// zeros are filled in it is 3.30 against 3.25, and 3 tenths beat 2 tenths.
//
// An item states the question only:
//   { id, level, kind: 'compare', a: '4.09', b: '4.1' }                 < = or >
//   { id, level, kind: 'order', nums: ['3.3', '3.25', '3.05'], dir: 'asc' }
//   { id, level, kind: 'order', nums, word: 'fastest', labels: ['Ana', …], unit: 's',
//     position: 3, context, contextFr }                                  a race: who was third?
//   { id, level, kind: 'digit', a: '4.□5', sign: '>', b: '4.38' }        which digits keep it true?
//   (`fill: false` leaves out the fill-with-zeros stage)
// `dir` is 'asc' (start with the smallest) or 'desc' (start with the largest);
// a `word` (fastest, cheapest, heaviest …) brings its own direction. The
// padded numbers, the order, the answer, the digits that work and the NAME of
// the slip behind a wrong answer are all derived here; the validator runs the
// same model (checkDecOrderItems), and so do the deck activity and Quick Fire.
//
// The named slips (pairSlip): the whole-number part ignored, the decimal part
// read as a whole number (.25 "is more than" .3 because 25 > 3), longer is
// bigger, and — for a list — the right order the wrong way round.

import { readDec, decText, compare } from './decimal.js';

export const DEC_KINDS = ['order', 'compare', 'digit'];
export const MIN_NUMS = 3;
export const MAX_NUMS = 6;
export const MAX_DP = 4;
export const MAX_INT = 4;
export const BLANK = '□';

/** The words that set a direction, with the French and what they mean. */
export const ORDER_WORDS = {
  smallest: { dir: 'asc', en: 'smallest', fr: 'le plus petit' },
  largest: { dir: 'desc', en: 'largest', fr: 'le plus grand' },
  fastest: {
    dir: 'asc', en: 'fastest', fr: 'le plus rapide',
    means: { en: 'The fastest time is the SMALLEST number.', fr: 'Le temps le plus rapide est le nombre le plus PETIT.' },
  },
  slowest: {
    dir: 'desc', en: 'slowest', fr: 'le plus lent',
    means: { en: 'The slowest time is the LARGEST number.', fr: 'Le temps le plus lent est le nombre le plus GRAND.' },
  },
  cheapest: {
    dir: 'asc', en: 'cheapest', fr: 'le moins cher',
    means: { en: 'The cheapest price is the SMALLEST number.', fr: 'Le prix le moins cher est le nombre le plus PETIT.' },
  },
  'most expensive': {
    dir: 'desc', en: 'most expensive', fr: 'le plus cher',
    means: { en: 'The most expensive price is the LARGEST number.', fr: 'Le prix le plus cher est le nombre le plus GRAND.' },
  },
  lightest: {
    dir: 'asc', en: 'lightest', fr: 'le plus léger',
    means: { en: 'The lightest mass is the SMALLEST number.', fr: 'La masse la plus légère est le nombre le plus PETIT.' },
  },
  heaviest: {
    dir: 'desc', en: 'heaviest', fr: 'le plus lourd',
    means: { en: 'The heaviest mass is the LARGEST number.', fr: 'La masse la plus lourde est le nombre le plus GRAND.' },
  },
  shortest: {
    dir: 'asc', en: 'shortest', fr: 'le plus court',
    means: { en: 'The shortest length is the SMALLEST number.', fr: 'La longueur la plus courte est le nombre le plus PETIT.' },
  },
  longest: {
    dir: 'desc', en: 'longest', fr: 'le plus long',
    means: { en: 'The longest length is the LARGEST number.', fr: 'La longueur la plus longue est le nombre le plus GRAND.' },
  },
};

export const ORDINALS = {
  en: ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'],
  fr: ['premier', 'deuxième', 'troisième', 'quatrième', 'cinquième', 'sixième'],
};

/** The place names after the point, singular and plural: k = 1 is tenths. */
const PLACE = {
  en: [null, ['tenth', 'tenths'], ['hundredth', 'hundredths'], ['thousandth', 'thousandths'], ['ten-thousandth', 'ten-thousandths']],
  fr: [null, ['dixième', 'dixièmes'], ['centième', 'centièmes'], ['millième', 'millièmes'], ['dix-millième', 'dix-millièmes']],
};
export const placeWord = (lang, k, n = 2) => (PLACE[lang]?.[k] || PLACE.en[k] || ['', ''])[n === 1 ? 0 : 1];

/** The sign as words, for the compare buttons and the messages. */
export const SIGN_WORDS = {
  '<': { en: 'is less than', fr: 'est inférieur à' },
  '=': { en: 'is equal to', fr: 'est égal à' },
  '>': { en: 'is greater than', fr: 'est supérieur à' },
};
const signOf = (c) => (c < 0 ? '<' : c > 0 ? '>' : '=');

/** One authored number → a row of the board. Throws on anything that is not a plain decimal. */
export function rowOf(text, i = 0) {
  const s = String(text ?? '').trim();
  const r = readDec(s);
  if (!r.ok || s.includes(',') || /\s/.test(s)) throw new Error(`"${text}" is not a decimal like 3.25`);
  const [w = '0', f = ''] = s.split('.');
  const intText = String(BigInt(w || '0'));
  if (f.length > MAX_DP) throw new Error(`"${text}" has ${f.length} decimal places — at most ${MAX_DP}`);
  if (intText.length > MAX_INT) throw new Error(`"${text}" has a whole-number part of ${intText.length} digits — at most ${MAX_INT}`);
  return { i, src: s, v: r.v, text: decText(r.v), intText, whole: BigInt(intText), frac: f, dp: f.length, decInt: BigInt(f || '0') };
}

/** A row written with `dp` decimal places — the zeros filled in. */
export const paddedText = (row, dp) => (dp > 0 ? `${row.intText}.${row.frac.padEnd(dp, '0')}` : row.intText);

/** Zeros (and the point, for a whole number) this row needs to reach `dp` places. */
export const zerosFor = (row, dp) => Math.max(0, dp - row.dp);

/** The first decimal place where two rows differ, once padded (same whole-number part). */
function decidingPlace(x, y) {
  const dp = Math.max(x.dp, y.dp);
  const fx = x.frac.padEnd(dp, '0');
  const fy = y.frac.padEnd(dp, '0');
  for (let k = 0; k < dp; k += 1) if (fx[k] !== fy[k]) return { k: k + 1, dx: Number(fx[k]), dy: Number(fy[k]) };
  return null;
}

/**
 * Why `big` is bigger than `small`, as `{ en, fr }`: the whole-number parts, or
 * the zeros filled in and the place that decides ("3 tenths beat 2").
 */
export function whyBigger(big, small) {
  if (big.whole !== small.whole) {
    return {
      en: `${big.text} is bigger: its whole-number part, ${big.intText}, is more than ${small.intText}.`,
      fr: `${big.text} est plus grand : sa partie entière, ${big.intText}, est plus grande que ${small.intText}.`,
    };
  }
  const dp = Math.max(big.dp, small.dp);
  const B = paddedText(big, dp);
  const S = paddedText(small, dp);
  const d = decidingPlace(big, small);
  const filled = big.dp !== small.dp;
  const lead = filled
    ? { en: `Fill with zeros: ${B} and ${S}.`, fr: `Complète avec des zéros : ${B} et ${S}.` }
    : { en: `Compare digit by digit: ${B} and ${S}.`, fr: `Compare chiffre par chiffre : ${B} et ${S}.` };
  const one = d.dx === 1;
  return {
    en: `${lead.en} The ${placeWord('en', d.k)} decide: ${d.dx} ${placeWord('en', d.k, d.dx)} ${one ? 'beats' : 'beat'} ${d.dy}.`,
    fr: `${lead.fr} Les ${placeWord('fr', d.k)} décident : ${d.dx} ${placeWord('fr', d.k, d.dx)} ${one ? 'l’emporte' : 'l’emportent'} sur ${d.dy}.`,
  };
}

/**
 * The slip behind saying `small` is the bigger one, named:
 *   'whole'  the whole-number parts were ignored
 *   'decInt' the decimal parts were read as whole numbers (.25 against .3 → 25 > 3)
 *   'longer' the one with more decimal places was taken to be bigger
 *   'value'  none of those — a plain misreading
 */
export function pairSlip(big, small) {
  if (big.whole !== small.whole) return 'whole';
  if (big.dp === small.dp) return 'value';
  if (small.decInt > big.decInt) return 'decInt';
  if (small.dp > big.dp) return 'longer';
  return 'value';
}

/** The name of a pair slip, as `{ en, fr }` (empty for 'value'). */
export function slipName(key, big, small) {
  if (key === 'whole') {
    return {
      en: 'Look at the whole-number part first.',
      fr: 'Regarde d’abord la partie entière.',
    };
  }
  if (key === 'decInt') {
    return {
      en: `The decimal part is not a whole number: .${small.frac} is not bigger than .${big.frac} just because ${small.decInt} is more than ${big.decInt}.`,
      fr: `La partie décimale n’est pas un nombre entier : .${small.frac} n’est pas plus grand que .${big.frac} juste parce que ${small.decInt} est plus grand que ${big.decInt}.`,
    };
  }
  if (key === 'longer') {
    return {
      en: `Longer is not bigger: ${small.text} has more decimal places, but it is the smaller number.`,
      fr: `Plus long ne veut pas dire plus grand : ${small.text} a plus de décimales, mais c’est le plus petit nombre.`,
    };
  }
  return { en: '', fr: '' };
}

/** A slip name followed by the reason, as one `{ en, fr }` message. */
export function pairMessage(big, small, key = pairSlip(big, small)) {
  const name = slipName(key, big, small);
  const why = whyBigger(big, small);
  return {
    slip: key,
    en: [name.en, why.en].filter(Boolean).join(' '),
    fr: [name.fr, why.fr].filter(Boolean).join(' '),
  };
}

/** Which of two rows is bigger: `[big, small]`, or null when they are equal. */
export function bigSmall(x, y) {
  const c = compare(x.v, y.v);
  if (c === 0) return null;
  return c > 0 ? [x, y] : [y, x];
}

/** A row's decimal part as a fraction-only value (the whole-number part thrown away). */
const fracRow = (r) => rowOf(r.frac ? `0.${r.frac}` : '0');

const cmpBig = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const sameList = (a, b) => Array.isArray(a) && a.length === b.length && a.every((x, i) => x === b[i]);
/** The list-level slips, in the order they are named when two give the same list. */
export const SLIP_PRIORITY = ['reversed', 'decInt', 'longer', 'whole'];

/** A word's French without its article: "le plus rapide" → "plus rapide". */
const frBare = (w) => w.fr.replace(/^le /, '');

// ── order ───────────────────────────────────────────────────────────────────

export function orderModel(item) {
  const nums = item?.nums;
  if (!Array.isArray(nums) || nums.length < MIN_NUMS || nums.length > MAX_NUMS) {
    throw new Error(`an order item needs ${MIN_NUMS}–${MAX_NUMS} numbers in nums`);
  }
  const rows = nums.map((t, i) => rowOf(t, i));
  if (item.labels !== undefined) {
    if (!Array.isArray(item.labels) || item.labels.length !== rows.length) throw new Error('labels must give one name per number');
    if (item.labels.some((l) => typeof l !== 'string' || !l.trim())) throw new Error('every label must be a name');
  }
  rows.forEach((r, i) => { r.label = item.labels?.[i] ?? null; });
  for (let i = 0; i < rows.length; i += 1) {
    for (let j = i + 1; j < rows.length; j += 1) {
      if (compare(rows[i].v, rows[j].v) === 0) throw new Error(`${rows[i].src} and ${rows[j].src} are the same number — an order needs different values`);
    }
  }
  if (item.word !== undefined && !ORDER_WORDS[item.word]) throw new Error(`word "${item.word}" — known words: ${Object.keys(ORDER_WORDS).join(', ')}`);
  if (item.dir !== undefined && !['asc', 'desc'].includes(item.dir)) throw new Error(`dir "${item.dir}" — asc (smallest first) or desc (largest first)`);
  if (item.dir === undefined && item.word === undefined) throw new Error('an order item needs dir (asc / desc) or a word (fastest, heaviest …)');
  if (item.word && item.dir && ORDER_WORDS[item.word].dir !== item.dir) throw new Error(`word "${item.word}" starts with the ${item.dir === 'asc' ? 'largest' : 'smallest'} — it does not fit dir "${item.dir}"`);
  const dir = item.dir ?? ORDER_WORDS[item.word].dir;
  const word = ORDER_WORDS[item.word ?? (dir === 'asc' ? 'smallest' : 'largest')];
  const ascending = [...rows].sort((x, y) => compare(x.v, y.v)).map((r) => r.i);
  const order = dir === 'asc' ? ascending : [...ascending].reverse();
  const maxDp = Math.max(...rows.map((r) => r.dp));
  const maxInt = Math.max(...rows.map((r) => r.intText.length));

  // The orders a slip would give, kept only where they differ from the right one.
  const byKey = (key) => {
    const s = [...rows].sort((x, y) => key(x, y) || compare(x.v, y.v)).map((r) => r.i);
    return dir === 'asc' ? s : s.reverse();
  };
  const candidates = {
    reversed: [...order].reverse(),
    decInt: byKey((x, y) => cmpBig(x.whole, y.whole) || cmpBig(x.decInt, y.decInt)),
    longer: byKey((x, y) => x.dp - y.dp),
    whole: byKey((x, y) => compare(fracRow(x).v, fracRow(y).v)),
  };
  const slips = {};
  for (const k of SLIP_PRIORITY) {
    const s = candidates[k];
    if (sameList(s, order) || Object.values(slips).some((t) => sameList(t, s))) continue;
    slips[k] = s;
  }

  let position = null;
  if (item.position !== undefined) {
    if (!Number.isInteger(item.position) || item.position < 2 || item.position > rows.length - 1) {
      throw new Error(`position must be a whole number from 2 to ${rows.length - 1} (first and last need no counting)`);
    }
    position = item.position;
  }
  return {
    kind: 'order', id: item.id, rows, dir, word, wordKey: item.word ?? null, order, slips, maxDp, maxInt,
    fill: item.fill !== false && rows.some((r) => r.dp < maxDp),
    position, positionAnswer: position ? order[position - 1] : null,
    unit: item.unit || '', labelled: !!item.labels,
  };
}

/** The message for the right order, the wrong way round. */
function reversedMessage(m) {
  if (m.word.means) {
    return { en: `${m.word.means.en} Start with the ${m.word.en}.`, fr: `${m.word.means.fr} Commence par ${m.word.fr}.` };
  }
  return m.dir === 'asc'
    ? { en: 'Right order, wrong way round: start with the smallest.', fr: 'Bon ordre, mais à l’envers : commence par le plus petit.' }
    : { en: 'Right order, wrong way round: start with the largest.', fr: 'Bon ordre, mais à l’envers : commence par le plus grand.' };
}

/**
 * Mark an order: `placed` is the row indices in the order the student tapped
 * them. `{ ok }`, `{ ok: false, soft }` when it is not finished, or a wrong
 * order with `slip` (reversed · decInt · longer · whole · value), the first
 * position that is wrong, and the message.
 */
export function diagnoseOrder(m, placed) {
  if (!Array.isArray(placed) || placed.length !== m.rows.length || new Set(placed).size !== m.rows.length) {
    return { ok: false, soft: true, en: 'Tap every number, in order, first.', fr: 'Touche d’abord tous les nombres, dans l’ordre.' };
  }
  if (sameList(placed, m.order)) return { ok: true };
  const wrongAt = placed.findIndex((x, i) => x !== m.order[i]);
  const listSlip = SLIP_PRIORITY.find((k) => m.slips[k] && sameList(placed, m.slips[k]));
  if (listSlip === 'reversed') return { ok: false, slip: 'reversed', wrongAt, ...reversedMessage(m) };
  let pair = null;
  for (let k = 0; k + 1 < placed.length && !pair; k += 1) {
    const x = m.rows[placed[k]];
    const y = m.rows[placed[k + 1]];
    const c = compare(x.v, y.v);
    if (m.dir === 'asc' && c > 0) pair = [x, y];
    if (m.dir === 'desc' && c < 0) pair = [y, x];
  }
  const [big, small] = pair;
  const key = listSlip || pairSlip(big, small);
  const msg = pairMessage(big, small, key);
  return { ok: false, slip: key, wrongAt, en: msg.en, fr: msg.fr };
}

/** "the third fastest" / "le troisième plus rapide". */
export function positionPhrase(m) {
  const p = m.position - 1;
  return { en: `the ${ORDINALS.en[p]} ${m.word.en}`, fr: `le ${ORDINALS.fr[p]} ${frBare(m.word)}` };
}

/** Mark the pick for "which one is the third …?" (a row index). */
export function diagnosePosition(m, picked) {
  if (!Number.isInteger(picked)) return { ok: false, soft: true, en: 'Tap one of them first.', fr: 'Touche d’abord l’un d’eux.' };
  if (picked === m.positionAnswer) return { ok: true };
  const ph = positionPhrase(m);
  const n = m.rows.length;
  if (picked === m.order[n - m.position]) {
    return {
      ok: false, slip: 'end',
      en: `That is ${m.position} from the wrong end. Count from the ${m.word.en}: ${ph.en} is number ${m.position}.`,
      fr: `C’est le numéro ${m.position} en partant du mauvais bout. Compte à partir du ${frBare(m.word)} : ${ph.fr} est le numéro ${m.position}.`,
    };
  }
  return {
    ok: false, slip: 'count',
    en: `Count again from the ${m.word.en}: 1, 2, 3 … ${ph.en} is number ${m.position}.`,
    fr: `Recompte à partir du ${frBare(m.word)} : 1, 2, 3 … ${ph.fr} est le numéro ${m.position}.`,
  };
}

// ── compare ─────────────────────────────────────────────────────────────────

export function compareModel(item) {
  const a = rowOf(item?.a, 0);
  const b = rowOf(item?.b, 1);
  const answer = signOf(compare(a.v, b.v));
  const maxDp = Math.max(a.dp, b.dp);
  return {
    kind: 'compare', id: item.id, rows: [a, b], a, b, answer, maxDp,
    maxInt: Math.max(a.intText.length, b.intText.length),
    fill: item.fill !== false && a.dp !== b.dp, unit: item.unit || '',
  };
}

/** Mark a sign ('<', '=' or '>') written between a and b. */
export function diagnoseCompare(m, sign) {
  if (!['<', '=', '>'].includes(sign)) return { ok: false, soft: true, en: 'Choose <, = or >.', fr: 'Choisis <, = ou >.' };
  if (sign === m.answer) return { ok: true };
  const { a, b } = m;
  if (m.answer === '=') {
    return {
      ok: false, slip: 'trailing',
      en: `A zero at the end changes nothing: ${a.text} and ${b.text} are the same number.`,
      fr: `Un zéro à la fin ne change rien : ${a.text} et ${b.text} sont le même nombre.`,
    };
  }
  const [big, small] = bigSmall(a, b);
  const msg = pairMessage(big, small);
  if (sign === '=') {
    return { ok: false, slip: 'notEqual', en: `They are not the same number. ${msg.en}`, fr: `Ce n’est pas le même nombre. ${msg.fr}` };
  }
  return { ok: false, slip: msg.slip, en: msg.en, fr: msg.fr };
}

// ── a missing digit ─────────────────────────────────────────────────────────

const BLANK_RE = /[_□]/g;

export function digitModel(item) {
  if (!['<', '>'].includes(item?.sign)) throw new Error('a digit item needs sign: "<" or ">"');
  const count = (s) => (String(s ?? '').match(BLANK_RE) || []).length;
  if (count(item.a) + count(item.b) !== 1) throw new Error('a digit item needs exactly one missing digit, written □ (or _), in a or b');
  const side = count(item.a) ? 'a' : 'b';
  const tmpl = String(item[side]).trim().replace(BLANK_RE, BLANK);
  const other = rowOf(item[side === 'a' ? 'b' : 'a'], side === 'a' ? 1 : 0);
  const at = tmpl.indexOf(BLANK);
  const pt = tmpl.indexOf('.');
  if (at === 0 && (pt === -1 ? tmpl.length : pt) > 1) throw new Error(`"${tmpl}": the missing digit cannot lead a whole-number part — a 0 would not be written there`);
  const options = [];
  const works = [];
  for (let d = 0; d <= 9; d += 1) {
    const row = rowOf(tmpl.replace(BLANK, String(d)), side === 'a' ? 0 : 1);
    const [L, R] = side === 'a' ? [row, other] : [other, row];
    const c = compare(L.v, R.v);
    options.push({ d, L, R, c });
    if (item.sign === '<' ? c < 0 : c > 0) works.push(d);
  }
  const text = side === 'a' ? `${tmpl} ${item.sign} ${other.src}` : `${other.src} ${item.sign} ${tmpl}`;
  if (!works.length) throw new Error(`no digit makes ${text} true`);
  if (works.length === 10) throw new Error(`every digit makes ${text} true — there is nothing to decide`);
  return {
    kind: 'digit', id: item.id, side, tmpl, other, sign: item.sign, works, options, text,
    aText: side === 'a' ? tmpl : other.src, bText: side === 'a' ? other.src : tmpl,
    rows: [], fill: false, unit: item.unit || '',
  };
}

/** Mark the digits a student tapped for the box. */
export function diagnoseDigits(m, picked) {
  const set = [...new Set((picked || []).map(Number))].filter((d) => Number.isInteger(d) && d >= 0 && d <= 9).sort((x, y) => x - y);
  if (!set.length) return { ok: false, soft: true, en: 'Tap every digit that works first.', fr: 'Touche d’abord tous les chiffres qui marchent.' };
  const extra = set.filter((d) => !m.works.includes(d));
  const missing = m.works.filter((d) => !set.includes(d));
  if (!extra.length && !missing.length) return { ok: true };
  if (extra.length) {
    const o = m.options[extra[0]];
    if (o.c === 0) {
      return {
        ok: false, slip: 'equal', digit: o.d,
        en: `Not ${o.d}: ${o.L.text} = ${o.R.text}. Equal is not ${m.sign === '<' ? 'less than' : 'greater than'}.`,
        fr: `Pas ${o.d} : ${o.L.text} = ${o.R.text}. Égal, ce n’est pas ${m.sign === '<' ? 'plus petit' : 'plus grand'}.`,
      };
    }
    const [big, small] = bigSmall(o.L, o.R);
    const why = whyBigger(big, small);
    return {
      ok: false, slip: 'extra', digit: o.d,
      en: `Not ${o.d}: ${o.L.text} ${signOf(o.c)} ${o.R.text}. ${why.en}`,
      fr: `Pas ${o.d} : ${o.L.text} ${signOf(o.c)} ${o.R.text}. ${why.fr}`,
    };
  }
  const o = m.options[missing[0]];
  return {
    ok: false, slip: 'missing', digit: o.d,
    en: `${o.d} works too: ${o.L.text} ${m.sign} ${o.R.text}. Find them all.`,
    fr: `${o.d} marche aussi : ${o.L.text} ${m.sign} ${o.R.text}. Trouve-les tous.`,
  };
}

// ── any item ────────────────────────────────────────────────────────────────

export function decOrderModel(item) {
  if (item?.kind === 'order') return orderModel(item);
  if (item?.kind === 'compare') return compareModel(item);
  if (item?.kind === 'digit') return digitModel(item);
  throw new Error(`kind "${item?.kind}" — ${DEC_KINDS.join(', ')}`);
}

/** The question a model asks, as `{ en, fr }`. */
export function questionOf(m) {
  if (m.kind === 'compare') return { en: 'Write <, = or > between the two numbers.', fr: 'Écris <, = ou > entre les deux nombres.' };
  if (m.kind === 'digit') return { en: 'Which digits can go in the box? Tap every one that works.', fr: 'Quels chiffres peuvent aller dans la case ? Touche tous ceux qui marchent.' };
  if (m.word.means) return { en: `Write them in order, starting with the ${m.word.en}.`, fr: `Range-les dans l’ordre, en commençant par ${m.word.fr}.` };
  return m.dir === 'asc'
    ? { en: 'Write these in order of size, starting with the smallest.', fr: 'Range ces nombres dans l’ordre, du plus petit au plus grand.' }
    : { en: 'Write these in order of size, starting with the largest.', fr: 'Range ces nombres dans l’ordre, du plus grand au plus petit.' };
}

/** The stages a model is worked in: fill (when the places differ), then order / compare / digit, then position. */
export const stagesOf = (m) => [...(m.fill ? ['fill'] : []), m.kind, ...(m.position ? ['position'] : [])];

/** Every row filled to the longest: `{ [row]: zeros }`. */
export const allZeros = (m) => Object.fromEntries((m.rows || []).map((r) => [r.i, zerosFor(r, m.maxDp)]));

/** "Which one is the third fastest?" */
export function positionQuestion(m) {
  const ph = positionPhrase(m);
  return { en: `Which one is ${ph.en}?`, fr: `Lequel est ${ph.fr} ?` };
}

/** The finished answer, to copy: "3.05 < 3.25 < 3.3", "4.09 < 4.1", "4, 5 or 6". */
export function answerLine(m) {
  if (m.kind === 'compare') return `${m.a.text} ${m.answer} ${m.b.text}`;
  if (m.kind === 'digit') return m.works.join(', ');
  return m.order.map((i) => m.rows[i].text).join(m.dir === 'asc' ? ' < ' : ' > ');
}

// ── the validator ───────────────────────────────────────────────────────────

/** Problems with one model: its own answer must pass, and every slip must be named. */
function modelProblems(m) {
  const out = [];
  if (m.kind === 'order') {
    if (!diagnoseOrder(m, m.order).ok) out.push('refuses its own order');
    for (const [k, s] of Object.entries(m.slips)) {
      const d = diagnoseOrder(m, s);
      if (d.ok || d.soft) out.push(`the "${k}" order is not marked wrong`);
      else if (d.slip !== k) out.push(`the "${k}" order is named "${d.slip}"`);
    }
    if (!m.slips.decInt && !m.slips.longer && !m.slips.whole) {
      out.push(`${m.rows.map((r) => r.src).join(', ')} has no trap — no longer number is the smaller one and the whole-number parts never decide`);
    }
    if (m.position && !diagnosePosition(m, m.positionAnswer).ok) out.push('refuses its own position answer');
  }
  if (m.kind === 'compare') {
    if (!diagnoseCompare(m, m.answer).ok) out.push('refuses its own sign');
    for (const s of ['<', '=', '>']) if (s !== m.answer && diagnoseCompare(m, s).ok) out.push(`accepts ${s} as well`);
  }
  if (m.kind === 'digit' && !diagnoseDigits(m, m.works).ok) out.push('refuses its own digits');
  return out;
}

/** Problems with a unit's `decOrder.items`, as strings (the validator's DEC_ORDER check). */
export function checkDecOrderItems(items, { bilingual = true } = {}) {
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
    if (it?.unit !== undefined && (typeof it.unit !== 'string' || !it.unit || it.unit.length > 8)) out.push(`${at}: unit is a short symbol, like kg, m or s`);
    let m;
    try { m = decOrderModel(it); } catch (e) { out.push(`${at}: ${e.message}`); continue; }
    for (const p of modelProblems(m)) out.push(`${at}: ${p}`);
  }
  return out;
}

/** Problems with a `decorder` deck activity (the item fields sit on the activity). */
export function checkDecOrderActivity(a) {
  try {
    return modelProblems(decOrderModel(a)).map((p) => `decorder ${p}`);
  } catch (e) {
    return [`decorder: ${e.message}`];
  }
}

// ── Quick Fire cards (utils/quickFire.js deals them) ────────────────────────
// Choice cards, answered once. Every pair or set is built round a trap — a
// longer decimal that is smaller, a decimal part that reads as a bigger whole
// number, a whole-number part that decides — and a wrong pick is answered by
// the name of its slip.

const intIn = (rng, lo, hi) => lo + Math.floor(rng() * (hi - lo + 1));
const shuffled = (rng, arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** 3.3 □ 3.25 — less than or greater than (never equal). */
export function decCompareCard(rng, id) {
  for (let tries = 0; tries < 50; tries += 1) {
    const w = rng() < 0.4 ? 0 : intIn(rng, 1, 19);
    const shape = rng();
    let x;
    let y;
    if (shape < 0.35) {
      // .3 against .25: the decimal part read as a whole number
      const t = intIn(rng, 2, 9);
      x = `${w}.${t}`;
      y = `${w}.${intIn(rng, 1, t - 1)}${intIn(rng, 1, 9)}`;
    } else if (shape < 0.55) {
      // .4 against .07: longer is not bigger
      x = `${w}.${intIn(rng, 1, 9)}`;
      y = `${w}.0${intIn(rng, 1, 9)}${rng() < 0.5 ? intIn(rng, 1, 9) : ''}`;
    } else if (shape < 0.75) {
      // 9.874 against 10.2: the whole-number part decides
      x = `${w}.${intIn(rng, 5, 9)}${intIn(rng, 1, 9)}${intIn(rng, 1, 9)}`;
      y = `${w + intIn(rng, 1, 3)}.${intIn(rng, 1, 4)}`;
    } else {
      // one more place, and bigger: shorter is not bigger either
      const t = intIn(rng, 1, 8);
      x = `${w}.${t}`;
      y = `${w}.${t}${intIn(rng, 1, 9)}`;
    }
    const [A, B] = rng() < 0.5 ? [x, y] : [y, x];
    const m = compareModel({ id, a: A, b: B });
    if (m.answer === '=') continue;
    return {
      id, mode: 'deccompare', latex: `${A} \\;\\square\\; ${B}`, answer: m.answer,
      ask: { en: 'Less than or greater than?', fr: 'Inférieur ou supérieur ?' },
      choices: [
        { val: '<', en: '<  is less than', fr: '<  est inférieur à' },
        { val: '>', en: '>  is greater than', fr: '>  est supérieur à' },
      ],
      mark: (val) => {
        const d = diagnoseCompare(m, val);
        return d.ok ? { ok: true } : { ok: false, en: d.en, fr: d.fr };
      },
    };
  }
  return null;
}

/** Four decimals: which is the smallest (or the largest)? */
export function decPickCard(rng, id) {
  for (let tries = 0; tries < 50; tries += 1) {
    const w = rng() < 0.4 ? 0 : intIn(rng, 1, 15);
    const t = intIn(rng, 3, 8);
    const nums = [
      `${w}.${t}`,                                                   // short and big
      `${w}.${t - 1}${intIn(rng, 1, 9)}`,                            // longer, smaller
      `${w}.${t - 1}${intIn(rng, 0, 9)}${intIn(rng, 1, 9)}`,         // longest
      rng() < 0.35 ? `${w + 1}.0${intIn(rng, 1, 9)}` : `${w}.0${intIn(rng, 1, 9)}`,
    ];
    const rows = nums.map((n, i) => rowOf(n, i));
    if (new Set(rows.map((r) => r.text)).size < 4) continue;
    if (rows.some((r, i) => rows.some((q, j) => j > i && compare(r.v, q.v) === 0))) continue;
    const largest = rng() < 0.5;
    const sorted = [...rows].sort((p, q) => compare(p.v, q.v));
    const ans = largest ? sorted[sorted.length - 1] : sorted[0];
    const shown = shuffled(rng, rows);
    return {
      id, mode: 'decpick', latex: shown.map((r) => r.text).join(',\\quad '), answer: ans.text,
      ask: largest
        ? { en: 'Which is the largest?', fr: 'Lequel est le plus grand ?' }
        : { en: 'Which is the smallest?', fr: 'Lequel est le plus petit ?' },
      choices: shown.map((r) => ({ val: r.text, en: r.text, fr: r.text })),
      mark: (val) => {
        if (val === ans.text) return { ok: true };
        const p = rows.find((r) => r.text === val);
        if (!p) return { ok: false, en: 'Choose one of the four.', fr: 'Choisis l’un des quatre.' };
        const msg = largest ? pairMessage(ans, p) : pairMessage(p, ans);
        return { ok: false, en: msg.en, fr: msg.fr };
      },
    };
  }
  return null;
}
