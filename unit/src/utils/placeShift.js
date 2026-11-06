// src/utils/placeShift.js
//
// Multiplying and dividing by powers of 10 as it really works (Year 7 Maths
// 3.1): the DIGITS move along the place-value table — left for ×, right for ÷,
// one column per power — and the decimal point never moves. A zero that
// appears between the digits and the point is a placeholder holding a column
// open; "just add a zero" is the folk rule that dies on 7.2 × 10³.
//
// An item states the question only:
//   { id, level, n: '7.2', op: '×', p: 3 }                          7.2 × 10³
//   { id, level, kind: 'power', n: '6.1', op: '×', result: '61000' }  find the power
//   { id, level, kind: 'convert', n: '4', from: 'kg', to: 'mg' }       metric mass
//   { id, level, kind: 'chain', n: '5', ops: [['×', 4], ['÷', 2], ['×', 3]] }
//   (+ context / contextVn / contextFr, a story told above the sum)
// The moves, the net power, every snapshot of the table, the placeholders,
// the answer and the slip behind a wrong answer are derived here; the
// validator runs the same model (checkShiftItems).

import { dec, decText, canon, shift, sameValue, readDec, placesOf, spanOf } from './decimal.js';
import { readProblem } from './rounding.js';

export const MASS_UNITS = ['mg', 'g', 'kg', 't'];
export const MASS_NAMES = {
  mg: { en: 'milligrams', vn: 'miligam', fr: 'milligrammes' }, g: { en: 'grams', vn: 'gam', fr: 'grammes' },
  kg: { en: 'kilograms', vn: 'kilôgam', fr: 'kilogrammes' }, t: { en: 'tonnes', vn: 'tấn', fr: 'tonnes' },
};
export const PLACE_LIMITS = [6, -5];           // millions … hundred-thousandths
export const KINDS = ['shift', 'power', 'convert', 'chain'];
const SUP = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];

/** 10³ with a Unicode superscript, for plain text. */
export const pow10Text = (p) => `10${String(p).split('').map((c) => SUP[Number(c)]).join('')}`;
/** "× 10³" as KaTeX. */
export const opLatex = (op, p) => `${op === '×' ? '\\times' : '\\div'} 10^{${p}}`;

const normOp = (op) => {
  const s = String(op).trim();
  if (['×', 'x', '*'].includes(s)) return '×';
  if (['÷', '/'].includes(s)) return '÷';
  throw new Error(`op "${op}" must be × or ÷`);
};
const signed = (m) => (m.op === '×' ? m.p : -m.p);

/**
 * The digits of a value laid on the table, with the placeholders it needs:
 *   digits        { place: digit } — the digits the number is written with
 *   placeholders  places between the digits and the point with no digit (0s to write)
 */
export function layout(v) {
  const digits = placesOf(v);
  const [hi, lo] = spanOf(v);
  const placeholders = [];
  for (let k = Math.max(hi, 0); k >= Math.min(lo, 0); k -= 1) if (digits[k] === undefined) placeholders.push(k);
  return { digits, placeholders, hi, lo };
}

/**
 * The worked question.
 *   start, result      values
 *   moves              [{ op, p }] in order (one, except a chain)
 *   net                places moved: + left (×), − right (÷)
 *   snaps              the value after each move (snaps[0] = start)
 *   moved              the start's digits after the whole move — { place: digit }
 *   placeholders       result places the moved digits leave empty (0s to write)
 *   dropped            moved places that fall off the end (zeros after the point)
 *   cols               [hi … lo] the table to draw, covering every snapshot
 */
export function shiftModel(item) {
  const kind = item.kind || 'shift';
  if (!KINDS.includes(kind)) throw new Error(`kind "${kind}" — ${KINDS.join('/')}`);
  const start = canon(dec(String(item.n)));
  if (start.n === 0n) throw new Error('n is 0');
  let moves;
  let convert = null;
  if (kind === 'shift') {
    moves = [{ op: normOp(item.op), p: item.p }];
  } else if (kind === 'power') {
    const op = normOp(item.op);
    const want = canon(dec(String(item.result)));
    let p = null;
    for (let k = 1; k <= 8; k += 1) if (sameValue(shift(start, op === '×' ? k : -k), want)) { p = k; break; }
    if (p == null) throw new Error(`${decText(start)} ${op} 10^? never makes ${decText(want)}`);
    moves = [{ op, p }];
  } else if (kind === 'convert') {
    const i = MASS_UNITS.indexOf(item.from);
    const j = MASS_UNITS.indexOf(item.to);
    if (i < 0 || j < 0) throw new Error(`convert units must be ${MASS_UNITS.join('/')}`);
    if (i === j) throw new Error('convert from and to are the same unit');
    const steps = i - j;                          // + : to a smaller unit, so ×
    moves = [{ op: steps > 0 ? '×' : '÷', p: 3 * Math.abs(steps) }];
    convert = { from: item.from, to: item.to, steps };
  } else {
    if (!Array.isArray(item.ops) || item.ops.length < 2) throw new Error('a chain needs at least two ops');
    moves = item.ops.map(([op, p]) => ({ op: normOp(op), p }));
  }
  for (const m of moves) {
    if (!Number.isInteger(m.p) || m.p < 1 || m.p > 8) throw new Error(`power ${m.p} must be a whole number 1–8`);
  }

  const snaps = [start];
  for (const m of moves) snaps.push(shift(snaps[snaps.length - 1], signed(m)));
  const result = snaps[snaps.length - 1];
  const net = moves.reduce((s, m) => s + signed(m), 0);

  const startDigits = placesOf(start);
  const moved = Object.fromEntries(Object.entries(startDigits).map(([k, dg]) => [Number(k) + net, dg]));
  // The result's written span: from its first digit (or the ones) to its last
  // digit (or the ones). A column in it that no moved digit reaches is a
  // placeholder 0; a moved zero past the end of it falls off.
  const [rh, rl] = spanOf(result);
  const placeholders = [];
  for (let k = Math.max(rh, 0); k >= Math.min(rl, 0); k -= 1) if (moved[k] === undefined) placeholders.push(k);
  const dropped = Object.keys(moved).map(Number).filter((k) => k < Math.min(rl, 0));

  // one table for the whole question: every digit any snapshot writes, and the point
  let hi = 0;
  let lo = -1;
  for (const s of snaps) {
    const [h, l] = spanOf(s);
    hi = Math.max(hi, h);
    lo = Math.min(lo, l);
  }
  for (const k of Object.keys(moved).map(Number)) { hi = Math.max(hi, k); lo = Math.min(lo, k); }
  const cols = [];
  for (let k = hi; k >= lo; k -= 1) cols.push(k);

  return {
    item, kind, start, result, moves, net, snaps, moved, placeholders, dropped, cols, convert,
    startText: decText(start), resultText: decText(result),
    power: kind === 'power' ? moves[0].p : null,
  };
}

/** The question as KaTeX (the left side; the answer box follows it). */
export function questionLatex(model) {
  const { kind, item } = model;
  if (kind === 'convert') return `${model.startText}\\text{ ${item.from}} = \\;?\\text{ ${item.to}}`;
  if (kind === 'power') return `${model.startText} ${model.moves[0].op === '×' ? '\\times' : '\\div'} 10^{\\,?} = ${model.resultText}`;
  return `${model.startText} ${model.moves.map((m) => opLatex(m.op, m.p)).join(' ')}`;
}

/** The finished line for the book: 7.2 × 10³ = 7200. */
export function answerLatex(model) {
  const { kind, item, moves } = model;
  const ops = moves.map((m) => opLatex(m.op, m.p)).join(' ');
  if (kind === 'convert') {
    return `${model.startText}\\text{ ${item.from}} = ${model.startText} ${ops}\\text{ ${item.to}} = ${model.resultText}\\text{ ${item.to}}`;
  }
  if (kind === 'chain') {
    const net = opLatex(model.net > 0 ? '×' : '÷', Math.abs(model.net));
    return `${model.startText} ${ops} = ${model.startText} ${net} = ${model.resultText}`;
  }
  return `${model.startText} ${ops} = ${model.resultText}`;
}

/**
 * The columns an interactive table draws: the question's own columns plus two
 * spare each side (so a slide the wrong way has somewhere to go, and the width
 * of the table does not give the answer away), never narrower than thousands
 * to thousandths, never past the place limits.
 */
export function tableCols(model) {
  const hi = Math.min(PLACE_LIMITS[0], Math.max(3, model.cols[0] + 2));
  const lo = Math.max(PLACE_LIMITS[1], Math.min(-3, model.cols[model.cols.length - 1] - 2));
  const out = [];
  for (let k = Math.max(hi, model.cols[0]); k >= Math.min(lo, model.cols[model.cols.length - 1]); k -= 1) out.push(k);
  return out;
}

/**
 * The gaps a slide of `offset` places leaves: `placeholders` are the empty
 * columns between the digits and the point (each needs a 0), `dropped` the
 * zeros that slid past the end of the number (written 70, not 70.00).
 */
export function gapsAt(start, offset) {
  const moved = Object.fromEntries(Object.entries(placesOf(start)).map(([k, dg]) => [Number(k) + offset, dg]));
  const [rh, rl] = spanOf(shift(start, offset));
  const placeholders = [];
  for (let k = Math.max(rh, 0); k >= Math.min(rl, 0); k -= 1) if (moved[k] === undefined) placeholders.push(k);
  const dropped = Object.keys(moved).map(Number).filter((k) => k < Math.min(rl, 0));
  return { placeholders, dropped };
}

/** The result as a ghost row for the table: every written digit, zeros included. */
export function ghostOf(v) {
  const { digits, placeholders } = layout(v);
  return { ...digits, ...Object.fromEntries(placeholders.map((k) => [k, 0])) };
}

/** How far the digits can slide before one leaves the table: [most right (−), most left (+)]. */
export function slideLimits(model, cols = tableCols(model)) {
  const places = Object.keys(placesOf(model.start)).map(Number);
  return [cols[cols.length - 1] - Math.min(...places), cols[0] - Math.max(...places)];
}

/** Where the digits go, in words. */
export function moveWords(net) {
  const n = Math.abs(net);
  const dir = net > 0 ? { en: 'left', vn: 'sang trái', fr: 'vers la gauche' } : { en: 'right', vn: 'sang phải', fr: 'vers la droite' };
  return { en: `${n} place${n === 1 ? '' : 's'} ${dir.en}`, vn: `${n} cột ${dir.vn}`, fr: `${n} colonne${n === 1 ? '' : 's'} ${dir.fr}`, n, dir };
}

/**
 * Mark a typed answer (the ordinary number). `{ ok, code, en, vn, fr }`; a wrong
 * answer is named: 'addzeros' (7.2000 — zeros stuck on after the point),
 * 'nomove', 'direction', 'count' (the right way, the wrong number of places —
 * usually a lost placeholder), 'value'. Unreadable input comes back `soft`.
 */
export function diagnoseShift(model, typed) {
  const r = readDec(typed);
  if (!r.ok) return readProblem(r.code);
  const t = r.v;
  if (sameValue(t, model.result)) return { ok: true, code: 'ok' };
  const want = moveWords(model.net);
  const bigger = model.net > 0;

  if (sameValue(t, model.start)) {
    if (bigger && String(typed).includes('.') && decText(canon(t)) !== String(typed).trim()) {
      return {
        ok: false, code: 'addzeros',
        en: `Zeros stuck on after the point do not change a number: ${String(typed).trim()} is still ${model.startText}. Multiplying moves every digit ${want.en} — the point stays where it is.`,
        vn: `Thêm số 0 sau dấu thập phân không làm số thay đổi: ${String(typed).trim()} vẫn là ${model.startText}. Phép nhân làm mọi chữ số dịch ${want.vn} — dấu thập phân giữ nguyên.`,
        fr: `Des zéros ajoutés après le point ne changent pas un nombre : ${String(typed).trim()} vaut toujours ${model.startText}. Multiplier déplace chaque chiffre de ${want.fr} — le point reste à sa place.`,
      };
    }
    return {
      ok: false, code: 'nomove',
      en: `That is the number you started with. The digits need to move ${want.en}.`,
      vn: `Đó là số ban đầu. Các chữ số cần dịch ${want.vn}.`,
      fr: `C'est le nombre de départ. Les chiffres doivent se déplacer de ${want.fr}.`,
    };
  }
  for (let k = -10; k <= 10; k += 1) {
    if (k === model.net || k === 0) continue;
    if (!sameValue(t, shift(model.start, k))) continue;
    if (Math.sign(k) !== Math.sign(model.net)) {
      return {
        ok: false, code: 'direction',
        en: bigger
          ? 'That moved the digits the wrong way — your answer got smaller. Multiplying makes a number bigger: the digits move LEFT.'
          : 'That moved the digits the wrong way — your answer got bigger. Dividing makes a number smaller: the digits move RIGHT.',
        vn: bigger
          ? 'Em đã dịch các chữ số sai chiều — đáp án bị nhỏ đi. Phép nhân làm số lớn hơn: các chữ số dịch sang TRÁI.'
          : 'Em đã dịch các chữ số sai chiều — đáp án bị lớn hơn. Phép chia làm số nhỏ hơn: các chữ số dịch sang PHẢI.',
        fr: bigger
          ? 'Les chiffres sont partis dans le mauvais sens — ta réponse est plus petite. Multiplier rend un nombre plus grand : les chiffres vont vers la GAUCHE.'
          : 'Les chiffres sont partis dans le mauvais sens — ta réponse est plus grande. Diviser rend un nombre plus petit : les chiffres vont vers la DROITE.',
      };
    }
    const got = moveWords(k);
    const lost = Math.abs(k) < Math.abs(model.net) && model.placeholders.length > 0;
    return {
      ok: false, code: 'count',
      en: `Right direction, but that moved the digits ${got.n} place${got.n === 1 ? '' : 's'}, not ${want.n}.${lost ? ' Every empty column between the digits and the point needs a placeholder 0.' : ''}`,
      vn: `Đúng chiều, nhưng em mới dịch các chữ số ${got.n} cột, chứ không phải ${want.n} cột.${lost ? ' Mỗi cột trống giữa các chữ số và dấu thập phân cần một số 0 giữ chỗ.' : ''}`,
      fr: `Bon sens, mais les chiffres se sont déplacés de ${got.n} colonne${got.n === 1 ? '' : 's'}, pas de ${want.n}.${lost ? " Chaque colonne vide entre les chiffres et le point a besoin d'un 0 pour garder la place." : ''}`,
    };
  }
  return {
    ok: false, code: 'value',
    en: `Not quite. Move every digit ${want.en}, keep the point still, and fill each empty column up to the point with a 0.`,
    vn: `Chưa đúng. Dịch mọi chữ số ${want.vn}, giữ nguyên dấu thập phân, và điền số 0 vào mỗi cột trống cho đến dấu thập phân.`,
    fr: `Pas tout à fait. Déplace chaque chiffre de ${want.fr}, garde le point immobile, et remplis chaque colonne vide jusqu'au point avec un 0.`,
  };
}

/** Mark a typed power (the "find the power" items). */
export function diagnosePower(model, typed) {
  const s = String(typed ?? '').trim();
  if (!s) return readProblem('empty');
  if (!/^\d+$/.test(s)) {
    return {
      ok: false, code: 'unreadable', soft: true, en: 'Type the power as a whole number — just the small raised number.', vn: 'Hãy nhập số mũ là một số nguyên — chỉ con số nhỏ viết cao.',
      fr: "Écris l'exposant comme un nombre entier — juste le petit nombre écrit en haut.",
    };
  }
  if (Number(s) === model.power) return { ok: true, code: 'ok' };
  return {
    ok: false, code: 'count',
    en: 'Count the columns again: follow one digit from where it starts to where it ends up. The number of places it moves is the power.',
    vn: 'Đếm lại các cột: theo dõi một chữ số từ chỗ bắt đầu đến chỗ kết thúc. Số cột nó dịch chính là số mũ.',
    fr: "Recompte les colonnes : suis un chiffre depuis sa place de départ jusqu'à sa place d'arrivée. Le nombre de colonnes parcourues est l'exposant.",
  };
}

/** The four operations a mass conversion can be. */
export const CONVERT_CHOICES = [
  { id: 'x3', op: '×', p: 3 }, { id: 'x6', op: '×', p: 6 },
  { id: 'd3', op: '÷', p: 3 }, { id: 'd6', op: '÷', p: 6 },
];

/** Mark the operation chosen for a mass conversion. */
export function diagnoseConvert(model, choice) {
  const m = model.moves[0];
  if (choice.op === m.op && choice.p === m.p) return { ok: true, code: 'ok' };
  const { from, to, steps } = model.convert;
  const n = Math.abs(steps);
  const down = steps > 0;
  const path = down ? MASS_UNITS.slice(MASS_UNITS.indexOf(to), MASS_UNITS.indexOf(from) + 1).reverse() : MASS_UNITS.slice(MASS_UNITS.indexOf(from), MASS_UNITS.indexOf(to) + 1);
  const wayEn = down ? 'down to a smaller unit, so there will be MORE of them: multiply' : 'up to a bigger unit, so there will be FEWER of them: divide';
  const wayVn = down ? 'xuống đơn vị nhỏ hơn, nên sẽ có NHIỀU hơn: nhân' : 'lên đơn vị lớn hơn, nên sẽ có ÍT hơn: chia';
  const wayFr = down ? 'descend vers une unité plus petite, donc il y en aura PLUS : multiplie' : 'monte vers une unité plus grande, donc il y en aura MOINS : divise';
  return {
    ok: false, code: choice.op !== m.op ? 'direction' : 'steps',
    en: `${path.join(' → ')} is ${n} step${n === 1 ? '' : 's'} on the ladder, each one ${pow10Text(3)}. Going ${wayEn}.`,
    vn: `${path.join(' → ')} là ${n} bậc trên thang, mỗi bậc là ${pow10Text(3)}. Đi ${wayVn}.`,
    fr: `${path.join(' → ')} : ${n} marche${n === 1 ? '' : 's'} sur l'échelle, chacune vaut ${pow10Text(3)}. On ${wayFr}.`,
  };
}

/** Problems with a unit's `placeShift.items`, as strings. */
export function checkShiftItems(items, { bilingual = true } = {}) {
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
    try { m = shiftModel(it); } catch (e) { out.push(`${at}: ${e.message}`); continue; }
    if (m.cols[0] > PLACE_LIMITS[0] || m.cols[m.cols.length - 1] < PLACE_LIMITS[1]) {
      out.push(`${at}: the table would run from 10^${m.cols[0]} to 10^${m.cols[m.cols.length - 1]} — keep it within millions to hundred-thousandths`);
    }
    if (m.kind === 'chain' && m.moves.length > 4) out.push(`${at}: a chain of more than four moves`);
    if (m.net === 0) out.push(`${at}: the moves cancel out — nothing to do`);
  }
  return out;
}
