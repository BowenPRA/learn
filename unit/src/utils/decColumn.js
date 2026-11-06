// src/utils/decColumn.js
//
// Line Up the Points — written column addition and subtraction of decimals
// (Year 7 Maths 4.2). An item states the question only:
//
//   { id, level, a: '23.4', op: '+', b: '6.78' }
//   { id, level, a: '15', op: '−', b: '3.46', context, contextFr }
//   { id, level, steps: [{ a: '2.35', op: '+', b: '1.8' }, { a: '10', op: '−', b: '@' }], context, contextFr }
//                                     '@' is the answer of the step before it
//
// Everything else is derived here, and the validator runs the same code
// (checkDecColumnItems):
//
//   LINE UP   the bottom number arrives the way a hurried student writes it —
//             lined up on the RIGHT, last digit under last digit — and slides
//             one square at a time until the two points sit in one column.
//             Every character takes one square, as on squared paper, so a
//             whole number's point is a square of its own at its end (15 = 15.).
//   FILL      the empty places after the point are filled with zeros (and a
//             whole number gets its point): 15 → 15.00, 23.4 → 23.40.
//   COLUMNS   right to left, like whole numbers: each answer digit, each carry
//             (+, written small under the answer, in the column it goes into),
//             each exchange (−, the top digit struck through and its new value
//             above it). The walk passes the point column, where the point
//             drops straight down.
//
// The slips it names: lined up on the right; a missing zero; a forgotten
// carry; the subtraction done upside down (the smaller digit from the bigger);
// a forgotten exchange (1 − 0.72 = 0.38); and, in the mental Quick Fire cards,
// the point in the wrong place.
//
// The answer digits come from columnArithmetic.buildAddSub on the two numbers
// scaled to the same number of places; the exchanges are worked out here the
// way they are written (a 0 that is asked for one becomes 10, then 9), and the
// two are checked against each other.

import { decText, canon, readDec, compare, sameValue } from './decimal.js';
import { buildAddSub } from './columnArithmetic.js';

export const MAX_DP = 3;
export const MAX_GRID = 8;          // squares once lined up (digits + the point)
export const MAX_WINDOW = 9;        // squares on screen while the bottom number slides
export const MAX_WINDOW_SLIDE = 8;  // the same, for the deck activity beside a slide
export const MAX_STEPS = 3;

const PLACE = {
  2: { en: 'hundreds', fr: 'centaines' },
  1: { en: 'tens', fr: 'dizaines' },
  0: { en: 'ones', fr: 'unités' },
  [-1]: { en: 'tenths', fr: 'dixièmes' },
  [-2]: { en: 'hundredths', fr: 'centièmes' },
  [-3]: { en: 'thousandths', fr: 'millièmes' },
};
/** The column's name: { en, fr }. */
export const placeWord = (p) => PLACE[p] || { en: `10^${p}`, fr: `10^${p}` };

/** '+' or '−' (a hyphen is read as a minus), else null. */
export const normOp = (op) => (op === '+' ? '+' : op === '−' || op === '-' ? '−' : null);

/** An authored number in its plain written form: no '.5', no '05', no zero at the end after the point. */
function authored(s) {
  const raw = String(s ?? '').trim();
  const r = readDec(raw);
  if (!r.ok) throw new Error(`"${raw}" is not a decimal`);
  const t = decText(r.v);
  if (t !== raw) throw new Error(`write "${raw}" as ${t}`);
  if (r.v.dp > 0 && canon(r.v).dp !== r.v.dp) {
    throw new Error(`"${raw}" ends in a zero after the point — write ${decText(canon(r.v))}; the student writes the zeros in`);
  }
  if (r.v.n === 0n) throw new Error('a number is 0');
  return r.v;
}

const intLenOf = (v) => decText(v).split('.')[0].length;

/** One calculation, worked out: the grid, the slide, the gaps, the walk. */
export function calcModel(calc) {
  const op = normOp(calc?.op);
  if (!op) throw new Error(`op "${calc?.op}" must be + or −`);
  const A = authored(calc.a);
  const B = authored(calc.b);
  if (op === '−' && compare(A, B) <= 0) throw new Error(`${decText(A)} − ${decText(B)} is not positive — the bigger number goes on top`);
  const dp = Math.max(A.dp, B.dp);
  if (dp === 0) throw new Error('both numbers are whole — there are no points to line up');
  if (dp > MAX_DP) throw new Error(`${dp} decimal places — at most ${MAX_DP}`);

  const scale = (v) => v.n * 10n ** BigInt(dp - v.dp);
  const an = scale(A);
  const bn = scale(B);
  const R = { n: op === '+' ? an + bn : an - bn, dp };
  const hi = Math.max(intLenOf(A), intLenOf(B), intLenOf(R)) - 1;
  const lo = -dp;
  const pointCell = hi + 1;
  const cellOf = (p) => (p === 'pt' ? pointCell : p >= 0 ? hi - p : hi + 1 - p);
  const width = hi + 2 + dp;

  const rowOf = (v) => {
    const text = decText(v);
    const [w, f = ''] = text.split('.');
    const chars = [];
    [...w].forEach((ch, i) => chars.push({ ch, p: w.length - 1 - i }));
    if (f) {
      chars.push({ ch: '.', p: 'pt' });
      [...f].forEach((ch, i) => chars.push({ ch, p: -(i + 1) }));
    }
    for (const c of chars) c.cell = cellOf(c.p);
    const digits = {};
    for (const c of chars) if (c.p !== 'pt') digits[c.p] = Number(c.ch);
    const hasPoint = v.dp > 0;
    return {
      v, text, chars, digits, hasPoint, dp: v.dp, top: w.length - 1,
      firstCell: chars[0].cell,
      lastCell: hasPoint ? cellOf(-v.dp) : cellOf(0),
    };
  };
  const a = rowOf(A);
  const b = rowOf(B);

  // LINE UP: the bottom row is drawn `shift` squares from where it belongs.
  const startShift = a.lastCell - b.lastCell;
  const shiftRange = startShift < 0 ? [startShift, 1] : startShift > 0 ? [-1, startShift] : [0, 0];
  const windowFrom = Math.min(0, b.firstCell + shiftRange[0]);
  const windowTo = Math.max(width - 1, b.lastCell + shiftRange[1]);

  // FILL: the point of a whole number, and a 0 in every empty place after the point.
  const gapsOf = (row) => {
    const out = [];
    if (!row.hasPoint) out.push({ cell: pointCell, p: 'pt', ch: '.' });
    for (let q = -(row.dp + 1); q >= lo; q -= 1) out.push({ cell: cellOf(q), p: q, ch: '0' });
    return out;
  };
  const gaps = { a: gapsOf(a), b: gapsOf(b) };

  // A digit once the gaps are filled: 0 after the point, null in front (blank).
  const digitAt = (row, p) => (row.digits[p] ?? (p < 0 ? 0 : null));

  // The answer digits, by place, from the whole-number algorithm.
  const sum = buildAddSub(Number(an), Number(bn), op === '+' ? '+' : '-');
  const ansDigit = {};
  sum.cols.forEach((c) => { ansDigit[c.col - dp] = c.digit; });
  const answerText = decText(R);
  const leadBlank = (p) => p > 0 && p > intLenOf(R) - 1;   // a 0 in front of the answer: may stay blank

  const cols = [];
  if (op === '+') {
    let carry = 0;
    for (let p = lo; p <= hi; p += 1) {
      const x = digitAt(a, p);
      const y = digitAt(b, p);
      const total = (x ?? 0) + (y ?? 0) + carry;
      const col = { p, cell: cellOf(p), x, y, carryIn: carry, total, digit: total % 10, carryOut: Math.floor(total / 10), lead: leadBlank(p) };
      if (col.digit !== (ansDigit[p] ?? 0)) throw new Error(`column ${p}: ${col.digit} against ${ansDigit[p]}`);
      cols.push(col);
      carry = col.carryOut;
    }
    if (carry) throw new Error('the grid has no column for the last carry');
  } else {
    const cur = {};
    for (let p = lo; p <= hi; p += 1) cur[p] = digitAt(a, p) ?? 0;
    const gave = {};
    const got = {};
    for (let p = lo; p <= hi; p += 1) {
      const y = digitAt(b, p) ?? 0;
      const before = cur[p];
      const chain = [];
      if (cur[p] < y) {
        let q = p + 1;
        while (q <= hi && cur[q] === 0) q += 1;
        if (q > hi) throw new Error('nothing to exchange from');
        for (let r = q; r > p; r -= 1) {      // tap r: one of r becomes ten of r − 1
          chain.push(r);
          cur[r] -= 1; gave[r] = true;
          cur[r - 1] += 10; got[r - 1] = true;
        }
      }
      const top = cur[p];
      const col = {
        p, cell: cellOf(p), x: digitAt(a, p), y: digitAt(b, p), yv: y,
        before, top, needs: chain.length > 0, chain, digit: top - y, gave: !!gave[p], got: !!got[p], lead: leadBlank(p),
      };
      if (col.digit < 0 || col.digit > 9 || col.digit !== (ansDigit[p] ?? 0)) throw new Error(`column ${p}: ${col.digit} against ${ansDigit[p]}`);
      cols.push(col);
    }
  }

  // The walk, right to left, with the point between the tenths and the ones.
  const walk = [];
  for (const c of cols) {
    if (c.p === 0) walk.push({ kind: 'point', cell: pointCell });
    walk.push({ kind: 'digit', p: c.p, cell: c.cell });
  }

  return {
    calc, op, A, B, R, dp, hi, lo, width, pointCell, cellOf, a, b,
    startShift, shiftRange, windowFrom, windowTo, needsLineUp: startShift !== 0,
    gaps, needsFill: gaps.a.length + gaps.b.length > 0,
    cols, walk, answerText, answerCanon: decText(canon(R)),
    colAt: (p) => cols.find((c) => c.p === p),
    digitAt: (which, p) => digitAt(which === 'a' ? a : b, p),
    opLatex: op === '+' ? '+' : '-',
  };
}

// ── one item: a calculation, or two or three steps of a story ─────────────────

/** The steps of an item, '@' replaced by the answer of the step before. */
export function itemModel(item) {
  const raw = Array.isArray(item?.steps) && item.steps.length ? item.steps : [{ a: item?.a, op: item?.op, b: item?.b }];
  if (raw.length > MAX_STEPS) throw new Error(`${raw.length} steps — at most ${MAX_STEPS}`);
  const steps = [];
  let prev = null;
  raw.forEach((s, i) => {
    const sub = (v) => {
      if (v !== '@') return v;
      if (!prev) throw new Error('step 1 cannot use @ — there is no answer before it');
      return prev.answerCanon;
    };
    if (i > 0 && s.a !== '@' && s.b !== '@') throw new Error(`step ${i + 1} does not use @ (the answer of step ${i})`);
    const m = calcModel({ a: sub(s.a), op: s.op, b: sub(s.b) });
    m.say = s.say;
    m.sayFr = s.sayFr;
    steps.push(m);
    prev = m;
  });
  return { item, steps, multi: steps.length > 1, answer: prev.answerCanon, answerText: prev.answerText };
}

/** "23.4 + 6.78" — plain text, both languages alike. */
export const calcText = (m) => `${m.a.text} ${m.op} ${m.b.text}`;

// ── the messages ──────────────────────────────────────────────────────────────

const s = (k) => (k === 1 ? '' : 's');
const pointOf = (row) => (row.hasPoint ? row.text : `${row.text}.`);

/** LINE UP: are the points in one column? */
export function diagnoseLineUp(m, shift) {
  if (shift === 0) return { ok: true };
  const A = m.a.text;
  const B = m.b.text;
  if (shift === m.startShift) {
    const whole = !m.a.hasPoint
      ? { en: ` ${A} is a whole number: its point is at its end, ${A} = ${pointOf(m.a)}`, fr: ` ${A} est un nombre entier : son point est à la fin, ${A} = ${pointOf(m.a)}` }
      : !m.b.hasPoint
        ? { en: ` ${B} is a whole number: its point is at its end, ${B} = ${pointOf(m.b)}`, fr: ` ${B} est un nombre entier : son point est à la fin, ${B} = ${pointOf(m.b)}` }
        : { en: '', fr: '' };
    return {
      ok: false, code: 'right',
      en: `Lined up on the right: the LAST digits are in one column, but the points are not. Line up the points, not the ends.${whole.en}`,
      fr: `Aligné à droite : les DERNIERS chiffres sont dans une colonne, mais pas les points. Aligne les points, pas les fins.${whole.fr}`,
    };
  }
  const k = Math.abs(shift);
  const left = shift < 0;
  return {
    ok: false, code: 'off',
    en: `Not yet: the point of ${B} is ${k} square${s(k)} to the ${left ? 'left' : 'right'} of the point of ${A}.`,
    fr: `Pas encore : le point de ${B} est ${k} case${s(k)} trop à ${left ? 'gauche' : 'droite'} par rapport au point de ${A}.`,
  };
}

/** FILL: `filled` is a Set of 'a:<cell>' / 'b:<cell>' the student has written in. */
export function diagnoseFill(m, filled) {
  const need = (row) => m.gaps[row].filter((g) => !filled.has(`${row}:${g.cell}`));
  const gapKeys = new Set([...m.gaps.a.map((g) => `a:${g.cell}`), ...m.gaps.b.map((g) => `b:${g.cell}`)]);
  const extra = [...filled].filter((k) => !gapKeys.has(k));
  const missA = need('a');
  const miss = missA.length ? missA : need('b');
  if (!miss.length) {
    if (!extra.length) return { ok: true };
    return {
      ok: true, extra,
      en: 'A 0 in front of a number changes nothing, so it is taken away. The zeros you need go AFTER the point.',
      fr: 'Un 0 devant un nombre ne change rien, donc on l’enlève. Les zéros utiles vont APRÈS le point.',
    };
  }
  const row = m[missA.length ? 'a' : 'b'];
  const g = miss[0];
  if (g.ch === '.') {
    return {
      ok: false, code: 'point',
      en: `${row.text} is a whole number, so its point is hidden at its end. Write the point in the point column first, then fill the places after it with zeros.`,
      fr: `${row.text} est un nombre entier, donc son point est caché à la fin. Écris d’abord le point dans la colonne du point, puis complète les rangs après lui avec des zéros.`,
    };
  }
  const w = placeWord(g.p);
  return {
    ok: false, code: 'zero',
    en: `A missing zero: ${row.text} has nothing in the ${w.en} column. Fill every empty place after the point with a 0 — it does not change the number.`,
    fr: `Il manque un zéro : ${row.text} n’a rien dans la colonne des ${w.fr}. Complète chaque place vide après le point avec un 0 — cela ne change pas le nombre.`,
  };
}

/** Read one typed digit: '' → null, '7' → 7, anything else → NaN. */
export function readDigit(text) {
  const t = String(text ?? '').trim();
  if (!t) return null;
  return /^\d$/.test(t) ? Number(t) : NaN;
}

/**
 * COLUMNS, addition: the answer digit at place p and the carry it sends into
 * the next column (written under it). `carryText` is undefined when there is
 * no next column.
 */
export function diagnoseAdd(m, p, digitText, carryText) {
  const col = m.colAt(p);
  const d = readDigit(digitText);
  if (d === null && col.lead) return { ok: true };
  if (d === null) return { ok: false, soft: true, code: 'empty', en: 'Type the answer digit for this column first.', fr: 'Écris d’abord le chiffre de la réponse pour cette colonne.' };
  const parts = [col.x ?? 0, col.y ?? 0].join(' + ');
  if (d !== col.digit) {
    if (col.carryIn && d === (col.total - col.carryIn) % 10) {
      const from = placeWord(nextRight(m, p));
      return {
        ok: false, code: 'carry',
        en: `A forgotten carry: there is a small ${col.carryIn} under this column, carried from the ${from.en}. Add it in too.`,
        fr: `Une retenue oubliée : il y a un petit ${col.carryIn} sous cette colonne, la retenue des ${from.fr}. Ajoute-le aussi.`,
      };
    }
    return {
      ok: false, code: 'add',
      en: `Add this column again: ${parts}${col.carryIn ? ` + ${col.carryIn} (the carry)` : ''}. Write only the ones digit of the total here.`,
      fr: `Refais l’addition de cette colonne : ${parts}${col.carryIn ? ` + ${col.carryIn} (la retenue)` : ''}. Écris seulement le chiffre des unités du total ici.`,
    };
  }
  if (carryText === undefined) return { ok: true };
  const c = readDigit(carryText);
  if ((c ?? 0) === col.carryOut) return { ok: true };
  if (c === null) {
    return {
      ok: false, soft: true, code: 'carryMissing',
      en: 'The total is 10 or more, so there is a carry. Write it in the small box under the next column on the left.',
      fr: 'Le total fait 10 ou plus, donc il y a une retenue. Écris-la dans la petite case sous la colonne suivante, à gauche.',
    };
  }
  if (col.carryOut === 0) {
    return {
      ok: false, code: 'carryWrong',
      en: 'This total is less than 10, so there is nothing to carry. Leave the small box empty.',
      fr: 'Ce total est inférieur à 10, donc il n’y a pas de retenue. Laisse la petite case vide.',
    };
  }
  return {
    ok: false, code: 'carryWrong',
    en: 'The carry is the TENS digit of this column’s total. It goes in the small box under the next column on the left.',
    fr: 'La retenue est le chiffre des DIZAINES du total de cette colonne. Elle va dans la petite case sous la colonne suivante, à gauche.',
  };
}

/** The next digit column to the right of p (smaller), skipping the point. */
export const nextRight = (m, p) => Math.max(m.lo, p - 1);

/** The top digits as the student starts the columns: { [p]: value }. */
export function startTops(m) {
  const cur = {};
  for (let p = m.lo; p <= m.hi; p += 1) cur[p] = m.digitAt('a', p) ?? 0;
  return cur;
}

/**
 * An exchange: the student taps the top digit of column `q` while column `p`
 * is being worked. One of q becomes ten of the column on its right. The right
 * tap is always the nearest column on the left that has something to give.
 */
export function tapExchange(m, cur, p, q) {
  const col = m.colAt(p);
  if (!col || m.op !== '−') return { ok: false, soft: true, code: 'none', en: '', fr: '' };
  if (cur[p] >= col.yv) {
    return {
      ok: false, soft: true, code: 'noNeed',
      en: `${cur[p]} − ${col.yv} can be done: ${cur[p]} is not smaller than ${col.yv}. No exchange is needed here.`,
      fr: `${cur[p]} − ${col.yv}, c’est possible : ${cur[p]} n’est pas plus petit que ${col.yv}. Pas besoin d’échange ici.`,
    };
  }
  let n = p + 1;
  while (n <= m.hi && cur[n] === 0) n += 1;
  if (q === n) {
    const next = { ...cur };
    next[q] -= 1;
    next[q - 1] += 10;
    return { ok: true, cur: next };
  }
  if (q <= p) {
    return {
      ok: false, soft: true, code: 'left',
      en: 'An exchange comes from the LEFT: tap a top digit in a bigger column.',
      fr: 'Un échange vient de la GAUCHE : touche un chiffre du haut dans une colonne plus grande.',
    };
  }
  if (cur[q] === 0) {
    const w = placeWord(q);
    return {
      ok: false, soft: true, code: 'empty',
      en: `The ${w.en} column has 0 — nothing to give. It needs an exchange from further left first.`,
      fr: `La colonne des ${w.fr} a 0 — rien à donner. Elle a d’abord besoin d’un échange plus à gauche.`,
    };
  }
  const w = placeWord(n);
  return {
    ok: false, soft: true, code: 'far',
    en: `Exchange with the nearest column that can give: the ${w.en}.`,
    fr: `Échange avec la colonne la plus proche qui peut donner : les ${w.fr}.`,
  };
}

/** Every exchange column p still needs, done for the student. */
export function autoExchange(m, cur, p) {
  let next = { ...cur };
  const y = m.colAt(p).yv;
  for (let guard = 0; next[p] < y && guard < 12; guard += 1) {
    let n = p + 1;
    while (n <= m.hi && next[n] === 0) n += 1;
    next = tapExchange(m, next, p, n).cur;
  }
  return next;
}

/**
 * COLUMNS, subtraction: the answer digit at place p, with the top digits as
 * they stand (`cur`). A right digit typed before the exchange is shown is
 * accepted, and `auto` says the exchange is to be written in for the student.
 */
export function diagnoseSub(m, p, digitText, cur) {
  const col = m.colAt(p);
  const d = readDigit(digitText);
  if (d === null && col.lead) return { ok: true };
  if (d === null) return { ok: false, soft: true, code: 'empty', en: 'Type the answer digit for this column first.', fr: 'Écris d’abord le chiffre de la réponse pour cette colonne.' };
  const y = col.yv;
  const shown = cur?.[p] ?? col.before;
  if (d === col.digit) return { ok: true, auto: shown !== col.top };
  if (col.needs && shown < y && d === y - shown) {
    return {
      ok: false, code: 'upside',
      en: `Upside down: you took ${shown} from ${y}. Always take the BOTTOM digit from the TOP one. ${shown} − ${y} cannot be done, so exchange first: take 1 from the column on the left.`,
      fr: `À l’envers : tu as fait ${y} − ${shown}. On enlève toujours le chiffre du BAS à celui du HAUT. ${shown} − ${y}, c’est impossible, donc fais d’abord un échange : prends 1 à la colonne de gauche.`,
    };
  }
  if (col.gave && d === col.top + 1 - y && col.top + 1 - y <= 9) {
    const w = placeWord(nextRight(m, p));
    return {
      ok: false, code: 'forgot',
      en: `A forgotten exchange: this column gave 1 to the ${w.en} on its right, so its top digit is ${col.top} now, not ${col.top + 1}. Look at the small number above it.`,
      fr: `Un échange oublié : cette colonne a donné 1 aux ${w.fr} à sa droite, donc son chiffre du haut est ${col.top} maintenant, pas ${col.top + 1}. Regarde le petit nombre au-dessus.`,
    };
  }
  if (col.needs && shown < y) {
    return {
      ok: false, code: 'exchange',
      en: `${shown} − ${y} cannot be done: ${shown} is smaller than ${y}. Exchange first — tap the top digit on the left that can give one.`,
      fr: `${shown} − ${y}, c’est impossible : ${shown} est plus petit que ${y}. Fais d’abord un échange — touche le chiffre du haut, à gauche, qui peut en donner un.`,
    };
  }
  return {
    ok: false, code: 'sub',
    en: `Work this column again: ${shown} − ${y}.`,
    fr: `Refais cette colonne : ${shown} − ${y}.`,
  };
}

// ── choose the calculation (story items) ──────────────────────────────────────

const hashOf = (str) => [...String(str)].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) >>> 0, 7);

/** The calculations offered for a story step, the right one among them, in a fixed shuffled order. */
export function chooseOptions(m, seed = '') {
  const A = m.a.text;
  const B = m.b.text;
  const opts = [{ val: 'ok', text: `${A} ${m.op} ${B}` }];
  if (m.op === '+') {
    const big = compare(m.A, m.B) >= 0;
    opts.push({ val: 'other', text: big ? `${A} − ${B}` : `${B} − ${A}` });
  } else {
    opts.push({ val: 'other', text: `${A} + ${B}` });
    opts.push({ val: 'swap', text: `${B} − ${A}` });
  }
  const h = hashOf(`${seed}|${A}|${B}`);
  const k = h % opts.length;
  return [...opts.slice(k), ...opts.slice(0, k)];
}

export function diagnoseChoose(m, val) {
  if (val === 'ok') return { ok: true };
  if (val === 'swap') {
    return {
      ok: false, code: 'swap',
      en: 'The bigger number goes first, on top: you take the smaller amount away FROM the bigger one.',
      fr: 'Le plus grand nombre va en premier, en haut : on enlève la plus petite quantité DE la plus grande.',
    };
  }
  return m.op === '−'
    ? {
      ok: false, code: 'other',
      en: 'Read the question again. It asks for a difference — the change, how much more or less, or what is left. That is a subtraction.',
      fr: 'Relis la question. Elle demande une différence — la monnaie, combien de plus ou de moins, ou ce qui reste. C’est une soustraction.',
    }
    : {
      ok: false, code: 'other',
      en: 'Read the question again. It puts the amounts together — altogether, in total. That is an addition.',
      fr: 'Relis la question. Elle met les quantités ensemble — en tout, au total. C’est une addition.',
    };
}

// ── checks the validator runs ─────────────────────────────────────────────────

/** Work a model through with the right answers: every step must accept its own. */
export function selfTest(m) {
  const out = [];
  if (!diagnoseLineUp(m, 0).ok) out.push('line-up refuses 0');
  if (m.needsLineUp && diagnoseLineUp(m, m.startShift).code !== 'right') out.push('the right-aligned start is not named');
  const all = new Set([...m.gaps.a.map((g) => `a:${g.cell}`), ...m.gaps.b.map((g) => `b:${g.cell}`)]);
  if (!diagnoseFill(m, all).ok) out.push('filling every gap is refused');
  if (m.needsFill && diagnoseFill(m, new Set()).ok) out.push('an empty fill is accepted');
  let cur = startTops(m);
  for (const col of m.cols) {
    if (m.op === '+') {
      const carry = col.p < m.hi ? (col.carryOut ? String(col.carryOut) : '') : undefined;
      if (!diagnoseAdd(m, col.p, col.lead ? '' : String(col.digit), carry).ok) out.push(`column ${col.p} refuses its own digit`);
    } else {
      for (const q of col.chain) {
        const t = tapExchange(m, cur, col.p, q);
        if (!t.ok) { out.push(`column ${col.p}: the exchange from ${q} is refused`); break; }
        cur = t.cur;
      }
      if (cur[col.p] !== col.top) out.push(`column ${col.p}: the exchanges leave ${cur[col.p]}, not ${col.top}`);
      const d = diagnoseSub(m, col.p, col.lead ? '' : String(col.digit), cur);
      if (!d.ok || d.auto) out.push(`column ${col.p} refuses its own digit`);
    }
  }
  const back = m.op === '+' ? compare({ n: m.R.n - m.B.n * 10n ** BigInt(m.dp - m.B.dp), dp: m.dp }, m.A) : compare({ n: m.R.n + m.B.n * 10n ** BigInt(m.dp - m.B.dp), dp: m.dp }, m.A);
  if (back !== 0) out.push('the answer does not check back');
  return out;
}

/** Every box of a finished calculation: the gaps filled, the exchanges made, the answer written. */
export function solvedState(m) {
  const filled = new Set([...m.gaps.a.map((g) => `a:${g.cell}`), ...m.gaps.b.map((g) => `b:${g.cell}`)]);
  let tops = startTops(m);
  const entries = { pt: '.' };
  for (const col of m.cols) {
    if (m.op === '−') tops = autoExchange(m, tops, col.p);
    entries[`d${col.cell}`] = col.lead ? '' : String(col.digit);
    if (m.op === '+' && col.carryOut) entries[`c${m.cellOf(col.p + 1)}`] = String(col.carryOut);
  }
  return { filled, tops, entries };
}

/** Problems with a unit's `decColumn.items`, as strings. */
export function checkDecColumnItems(items, { bilingual = true } = {}) {
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
    if (it?.steps && !it.context) out.push(`${at}: a two-step item is a story — give it a context`);
    for (const st of it?.steps || []) if (st.say && bilingual && !st.sayVn) out.push(`${at}: a step's say needs sayVn`);
    let im;
    try { im = itemModel(it); } catch (e) { out.push(`${at}: ${e.message}`); continue; }
    im.steps.forEach((m, k) => {
      const where = im.multi ? `${at} step ${k + 1}` : at;
      if (m.width > MAX_GRID) out.push(`${where}: ${m.width} squares wide — at most ${MAX_GRID}`);
      if (m.windowTo - m.windowFrom + 1 > MAX_WINDOW) out.push(`${where}: ${m.windowTo - m.windowFrom + 1} squares while it slides — at most ${MAX_WINDOW}`);
      for (const p of selfTest(m)) out.push(`${where}: ${p}`);
    });
  }
  return out;
}

/** Problems with a `deccol` deck activity: one calculation, narrow enough for a slide. */
export function checkDecColumnActivity(a) {
  const out = [];
  if (a.steps) return ['steps belong in the Line Up the Points task, not on a slide'];
  let m;
  try { m = calcModel(a); } catch (e) { return [e.message]; }
  if (m.windowTo - m.windowFrom + 1 > MAX_WINDOW_SLIDE) out.push(`${m.windowTo - m.windowFrom + 1} squares while it slides — at most ${MAX_WINDOW_SLIDE} on a slide`);
  for (const p of selfTest(m)) out.push(p);
  return out;
}

// ── Quick Fire: mental adding and subtracting (quickFire.js deals these) ──────
//   decNear    8.4 − 2.9, 6.9 + 4.6: one number is nearly a whole one — use the
//              whole number, then put the 0.1 (or 0.2) right
//   decChange  10 − 3.65, 1 − 0.72: a whole number minus a decimal — the change
// Typed cards: a wrong answer is answered by the name of its slip.

const qInt = (rng, lo, hi) => lo + Math.floor(rng() * (hi - lo + 1));
const qPick = (rng, list) => list[Math.floor(rng() * list.length)];
const fixed = (n, dp) => ({ n: BigInt(n), dp });

/** A typed answer, read — or the soft nudge for a comma or something unreadable. */
function readTyped(typed) {
  const r = readDec(typed);
  if (r.ok) return r;
  if (r.code === 'comma') return { soft: { ok: false, soft: true, en: 'Write the decimal point as a dot, not a comma.', fr: 'Écris le point décimal avec un point, pas une virgule.' } };
  return { soft: { ok: false, soft: true, en: 'Type a number.', fr: 'Écris un nombre.' } };
}
const digitsOf = (v) => decText(canon(v)).replace('.', '').replace(/^0+/, '');
/** The right digits with the point somewhere else. */
const pointSlip = (v, ans) => !sameValue(v, ans) && digitsOf(v) !== '' && digitsOf(v) === digitsOf(ans);

export function decNearCard(rng, id) {
  for (let tries = 0; tries < 60; tries += 1) {
    const sub = rng() < 0.6;
    const W = qInt(rng, 2, 7);
    const dT = qPick(rng, [1, 1, 1, 2]);
    const bT = W * 10 - dT;
    const aT = sub ? qInt(rng, bT + 6, 98) : qInt(rng, 11, 89);
    if (aT % 10 === 0) continue;
    if (sub && aT % 10 >= bT % 10) continue;     // only where the written method would exchange
    const ansT = sub ? aT - bT : aT + bT;
    const A = decText(fixed(aT, 1));
    const B = decText(fixed(bT, 1));
    const D = decText(fixed(dT, 1));
    const ans = fixed(ansT, 1);
    const whole = fixed(sub ? aT - W * 10 : aT + W * 10, 1);
    const twice = fixed(sub ? aT - W * 10 - dT : aT + W * 10 + dT, 1);
    const first = !sub && rng() < 0.5;            // 6.9 + 4.6 as well as 4.6 + 6.9
    return {
      id, mode: 'decNear',
      latex: sub ? `${A} - ${B} =` : first ? `${B} + ${A} =` : `${A} + ${B} =`,
      answer: decText(canon(ans)),
      ask: { en: 'Use a mental method.', fr: 'Utilise le calcul mental.' },
      mark: (typed) => {
        const r = readTyped(typed);
        if (r.soft) return r.soft;
        const v = r.v;
        if (sameValue(v, ans)) return { ok: true };
        if (sameValue(v, whole)) {
          return sub
            ? { ok: false, en: `You took ${W} away — that is ${D} more than ${B}. Give the ${D} back.`, fr: `Tu as enlevé ${W} — c’est ${D} de plus que ${B}. Rends les ${D}.` }
            : { ok: false, en: `You added ${W} — that is ${D} more than ${B}. Take the ${D} off.`, fr: `Tu as ajouté ${W} — c’est ${D} de plus que ${B}. Enlève les ${D}.` };
        }
        if (sameValue(v, twice)) {
          return sub
            ? { ok: false, en: `${W} was already ${D} too much, so the ${D} goes BACK: add it, do not take it away.`, fr: `${W}, c’était déjà ${D} de trop, donc il faut RENDRE les ${D} : ajoute-les, ne les enlève pas.` }
            : { ok: false, en: `${W} was already ${D} too much, so take the ${D} OFF — do not add it.`, fr: `${W}, c’était déjà ${D} de trop, donc ENLÈVE les ${D} — ne les ajoute pas.` };
        }
        if (pointSlip(v, ans)) {
          return { ok: false, en: `The digits are right, but the point is in the wrong place. ${B} is nearly ${W}: how big should the answer be?`, fr: `Les chiffres sont justes, mais le point est mal placé. ${B}, c’est presque ${W} : quelle taille doit avoir la réponse ?` };
        }
        return { ok: false, en: `${B} is nearly ${W}. Work with ${W}, then put the ${D} right.`, fr: `${B}, c’est presque ${W}. Calcule avec ${W}, puis corrige les ${D}.` };
      },
    };
  }
  return null;
}

export function decChangeCard(rng, id) {
  for (let tries = 0; tries < 60; tries += 1) {
    const W = qPick(rng, [1, 1, 2, 5, 10, 10, 20]);
    const dp = W === 1 ? 2 : qPick(rng, [1, 2, 2]);
    const unit = 10 ** dp;
    const bU = qInt(rng, 1, W * unit - 1);
    if (bU % 10 === 0) continue;                  // a zero at the end, or a whole number
    const B = decText(fixed(bU, dp));
    let m;
    try { m = calcModel({ a: String(W), op: '−', b: B }); } catch { continue; }
    const ans = m.R;
    const zeros = '0'.repeat(m.dp);
    const withDigits = (f) => {
      const ds = [...m.cols].reverse().map(f);
      return ds.every((d) => d >= 0 && d <= 9) ? fixed(ds.join(''), m.dp) : null;
    };
    const forgot = [
      withDigits((c) => c.top + (c.gave ? 1 : 0) - c.yv),
      withDigits((c) => c.top + (c.gave && c.got ? 1 : 0) - c.yv),
    ].filter((v) => v && !sameValue(v, ans));
    const upside = withDigits((c) => Math.abs((c.x ?? 0) - c.yv));
    return {
      id, mode: 'decChange', latex: `${W} - ${B} =`, answer: decText(canon(ans)),
      ask: { en: 'Work it out in your head.', fr: 'Calcule-le de tête.' },
      mark: (typed) => {
        const r = readTyped(typed);
        if (r.soft) return r.soft;
        const v = r.v;
        if (sameValue(v, ans)) return { ok: true };
        if (forgot.some((f) => sameValue(v, f))) {
          return { ok: false, en: `A forgotten exchange. ${W} is ${W}.${zeros}: a 0 that is asked for a ten becomes 10, then gives one to its right and keeps 9. Only the last column keeps 10.`, fr: `Un échange oublié. ${W}, c’est ${W}.${zeros} : un 0 à qui on demande une dizaine devient 10, puis en donne une à sa droite et garde 9. Seule la dernière colonne garde 10.` };
        }
        if (upside && !sameValue(upside, ans) && sameValue(v, upside)) {
          return { ok: false, en: `You took the smaller digit from the bigger one in each column. Write ${W} as ${W}.${zeros} and exchange — or count on from ${B} up to ${W}.`, fr: `Tu as enlevé le plus petit chiffre du plus grand dans chaque colonne. Écris ${W} comme ${W}.${zeros} et fais des échanges — ou compte de ${B} jusqu’à ${W}.` };
        }
        if (pointSlip(v, ans)) {
          return { ok: false, en: `The digits are right, but the point is in the wrong place. The answer must be less than ${W}.`, fr: `Les chiffres sont justes, mais le point est mal placé. La réponse doit être plus petite que ${W}.` };
        }
        return { ok: false, en: `Count on: from ${B} up to the next whole number, then on to ${W}. Add the jumps.`, fr: `Compte en avançant : de ${B} jusqu’au nombre entier suivant, puis jusqu’à ${W}. Additionne les sauts.` };
      },
    };
  }
  return null;
}
