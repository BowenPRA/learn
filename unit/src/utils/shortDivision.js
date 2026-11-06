// src/utils/shortDivision.js
//
// Short division — the "bus stop" written the short way (Year 7 Maths 3.2).
// No stack of products and subtractions under the number: each remainder is
// written small, up and to the LEFT of the next digit, and read with it as one
// number (a 2 carried onto an 0 is read "20"). When the digits run out and the
// remainder is not 0, the student writes a decimal point and adds zeros after
// it, and the carrying goes on.
//
//        0  8 . 2  8  5  7
//      ┌──────────────────
//    7 │ 5 ⁵8 . ²0 ⁶0 ⁴0 ⁵0
//
// An item states the question only:
//   { id, level, dividend: '58', divisor: 7 }            exact — add zeros until the remainder is 0
//   { id, level, dividend: '58', divisor: 7, dp: 3 }     correct to 3 d.p. — work to 4 places, then round
//   { id, level, dividend: '85', divisor: 4, remainder: true }
//                                                        whole numbers — stop at the units digit and
//                                                        write what is left after an r: 21 r 1
//   (+ context / contextVn, a story told above the sum)
// Every column — the digit, the carry into it, the number it makes, the
// quotient digit, the carry out — the zeros needed and the answer are derived
// here, and the validator runs the same model (checkShortDivItems).
//
// Remainder items are the Number Gym drills of 1.4 and 1.5 (factors and
// divisibility): there the question is "does it divide exactly?", so the
// division stops at the last digit and the remainder is the answer that
// matters. No point, no added zeros.

import { dec, decText, canon, roundTo } from './decimal.js';
import { roundModel, placeName } from './rounding.js';

export const MAX_ZEROS = 5;     // zeros a student can add after the point
export const MAX_COLS = 10;     // columns under the bus stop
export const DIVISOR_RANGE = [2, 25];
export const REMAINDER_DIVISOR_MAX = 99;   // whole-number items may divide by two-digit numbers up to 99
export const DP_RANGE = [1, 4];

/**
 * The worked division.
 *   cols[c] = {
 *     digit, added,   // the dividend digit; added = a zero the student puts after the point
 *     dec,            // right of the point
 *     carryIn,        // the small remainder written up-left of this digit (0 = nothing written)
 *     current,        // carryIn·10 + digit — the number divided in this column
 *     q, carryOut,    // quotient digit above it, and the remainder carried on
 *     leading,        // a 0 before the first real quotient digit — may be left blank
 *   }
 *   intLen            digits before the point
 *   givenCols         columns the question writes (no added zeros)
 *   zerosNeeded       zeros the student must add
 *   pointAdded        the dividend is whole, so the student's first zero brings a point with it
 *   quotient          the worked quotient as a value (to workDp places)
 *   answer            the rounded answer (dp items) or the exact quotient
 *   remainderMode     a whole-number item: the last column's carry out is the
 *                     remainder, written after an r (finalRemainder)
 */
export function shortDivModel(item) {
  const remainderMode = item.remainder === true;
  const dMax = remainderMode ? REMAINDER_DIVISOR_MAX : DIVISOR_RANGE[1];
  const d = Number(item.divisor);
  if (!Number.isInteger(d) || d < DIVISOR_RANGE[0] || d > dMax) {
    throw new Error(`divisor ${item.divisor} must be a whole number from ${DIVISOR_RANGE[0]} to ${dMax}`);
  }
  const D = dec(String(item.dividend));
  if (D.n === 0n) throw new Error('the dividend is 0');
  const text = decText(D);
  const [intPart, frac = ''] = text.split('.');
  const intDigits = intPart.split('').map(Number);
  const given = frac.split('').map(Number);
  const dp = item.dp ?? null;
  if (dp != null && (!Number.isInteger(dp) || dp < DP_RANGE[0] || dp > DP_RANGE[1])) {
    throw new Error(`dp ${dp} must be ${DP_RANGE[0]}–${DP_RANGE[1]}`);
  }
  if (remainderMode && (given.length || dp != null)) {
    throw new Error(`a remainder item divides whole numbers — ${text}${dp != null ? ` with dp ${dp}` : ''} is not one`);
  }

  // How many decimal places to work to.
  const remAt = (k) => (D.n * 10n ** BigInt(k - D.dp)) % BigInt(d);  // remainder after k places (k ≥ D.dp)
  let stopsAt = null;                                               // places at which it divides exactly
  for (let k = given.length; k <= given.length + MAX_ZEROS + 1; k += 1) {
    if (remAt(k) === 0n) { stopsAt = k; break; }
  }
  let workDp;
  if (remainderMode) {
    workDp = 0;
  } else if (dp == null) {
    if (stopsAt == null || stopsAt - given.length > MAX_ZEROS) {
      throw new Error(`${text} ÷ ${d} does not stop within ${MAX_ZEROS} added zeros — give the item a dp`);
    }
    workDp = stopsAt;
  } else {
    workDp = Math.max(given.length, dp + 1);
  }

  const digits = [...intDigits, ...given, ...Array(Math.max(0, workDp - given.length)).fill(0)];
  const intLen = intDigits.length;
  const givenCols = intLen + given.length;
  const cols = [];
  let carry = 0;
  let started = false;
  digits.forEach((digit, c) => {
    const current = carry * 10 + digit;
    const q = Math.floor(current / d);
    const carryOut = current - q * d;
    const leading = !started && q === 0 && c < intLen - 1;
    if (q !== 0 || c >= intLen - 1) started = true;
    cols.push({ c, digit, added: c >= givenCols, dec: c >= intLen, carryIn: carry, current, q, carryOut, leading });
    carry = carryOut;
  });

  const qInt = cols.slice(0, intLen).map((k) => k.q).join('').replace(/^0+(?=\d)/, '');
  const qFrac = cols.slice(intLen).map((k) => k.q).join('');
  const quotient = dec(qFrac ? `${qInt}.${qFrac}` : qInt);
  const exact = carry === 0;
  const answer = dp != null ? roundTo(quotient, dp) : canon(quotient);

  return {
    item, dividend: D, dividendText: text, divisor: d, dp, remainderMode,
    intLen, givenCols, cols, workDp, stopsAt,
    zerosNeeded: Math.max(0, workDp - given.length),
    pointAdded: given.length === 0 && workDp > 0,
    quotient, quotientText: decText(quotient), exact, finalRemainder: carry,
    answer, answerText: decText(answer),
    round: dp != null ? roundModel(quotient, dp) : null,
  };
}

/**
 * A Number Gym `short-div` drill (1.4, 1.5) as Bus Stop items. The drill
 * authors a ladder of [dividend, divisor] pairs; each becomes a remainder item,
 * one level per rung. The ids are the ones the old long-division view saved
 * progress under, so a student's cleared items still count.
 */
export function drillToShortDiv(drill) {
  const levels = {};
  const items = [];
  (drill?.ladder || []).forEach((rung, ri) => {
    levels[ri + 1] = { en: rung.level, vn: rung.levelVn || rung.level, fr: rung.levelFr || rung.level };
    (rung.items || []).forEach(([D, d], ii) => {
      items.push({ id: `L${ri}-${D}d${d}-${ii}`, level: ri + 1, dividend: String(D), divisor: d, remainder: true });
    });
  });
  return {
    title: drill?.title, titleVn: drill?.titleVn, titleFr: drill?.titleFr,
    intro: drill?.intro, introVn: drill?.introVn, introFr: drill?.introFr, levels, items,
  };
}

/** Is a typed quotient digit right? A leading 0 may be left blank. */
export function qDigitOk(col, typed) {
  const s = String(typed ?? '').trim();
  if (!s) return col.leading;
  return /^\d$/.test(s) && Number(s) === col.q;
}

/** Is a typed carry right? A carry of 0 may be left blank. */
export function carryOk(value, typed) {
  const s = String(typed ?? '').trim();
  if (!s) return value === 0;
  return /^\d{1,2}$/.test(s) && Number(s) === value;
}

/** The hint for a wrong quotient digit — it never states the digit. */
export function qHint(model, col) {
  const d = model.divisor;
  if (col.current < d) {
    return {
      en: `Is ${col.current} as big as ${d}? If ${d} does not go into ${col.current}, the digit on top is 0 — and the whole ${col.current} is carried.`,
      vn: `${col.current} có lớn bằng ${d} không? Nếu ${col.current} không chia được cho ${d}, chữ số ở trên là 0 — và cả ${col.current} được nhớ sang.`,
      fr: `Est-ce que ${col.current} est aussi grand que ${d} ? Si ${d} ne va pas dans ${col.current}, le chiffre du haut est 0 — et tout le ${col.current} est reporté.`,
    };
  }
  return {
    en: `How many whole ${d}s go into ${col.current}? Count up in ${d}s and stop before you go past ${col.current}.`,
    vn: `${col.current} chứa được bao nhiêu lần ${d} trọn vẹn? Đếm thêm từng ${d} một và dừng lại trước khi vượt quá ${col.current}.`,
    fr: `En ${col.current}, combien de fois ${d} ? Compte de ${d} en ${d} et arrête-toi avant de dépasser ${col.current}.`,
  };
}

/** The hint for a wrong carry. */
export function carryHint(model, col) {
  const d = model.divisor;
  return {
    en: `What is left over? ${col.current} − ${d} × ${col.q} = ? That remainder goes in the small box, up and to the left of the next digit.`,
    vn: `Còn dư bao nhiêu? ${col.current} − ${d} × ${col.q} = ? Số dư đó được viết vào ô nhỏ, ở phía trên bên trái của chữ số tiếp theo.`,
    fr: `Que reste-t-il ? ${col.current} − ${d} × ${col.q} = ? Ce reste va dans la petite case, en haut à gauche du chiffre suivant.`,
  };
}

/** The hint for a wrong final remainder (remainder items): no next digit to carry onto. */
export function remHint(model, col) {
  const d = model.divisor;
  return {
    en: `What is left over? ${col.current} − ${d} × ${col.q} = ? There is no next digit to carry it onto, so it is the remainder — write it after the r.`,
    vn: `Còn dư bao nhiêu? ${col.current} − ${d} × ${col.q} = ? Không còn chữ số nào để nhớ sang, nên đó là số dư — viết nó sau chữ r.`,
    fr: `Que reste-t-il ? ${col.current} − ${d} × ${col.q} = ? Il n'y a plus de chiffre où le reporter, donc c'est le reste — écris-le après le r.`,
  };
}

/** What the remainder says (remainder items): divides exactly, or not. */
export function remainderVerdict(model) {
  const { divisor: d, dividendText: D, finalRemainder: r } = model;
  if (r === 0) {
    return {
      en: `Remainder 0, so ${d} divides ${D} exactly — ${d} is a factor of ${D}.`,
      vn: `Số dư bằng 0, nên ${D} chia hết cho ${d} — ${d} là ước của ${D}.`,
      fr: `Reste 0, donc ${d} divise ${D} exactement — ${d} est un diviseur de ${D}.`,
    };
  }
  return {
    en: `Remainder ${r}, not 0, so ${d} does not divide ${D} exactly — ${d} is not a factor of ${D}.`,
    vn: `Số dư là ${r}, khác 0, nên ${D} không chia hết cho ${d} — ${d} không phải là ước của ${D}.`,
    fr: `Reste ${r}, pas 0, donc ${d} ne divise pas ${D} exactement — ${d} n'est pas un diviseur de ${D}.`,
  };
}

/** Out of digits, but not finished: why a zero is needed. */
export function needZeroHint(model, col) {
  if (model.dp == null) {
    return {
      en: `The remainder is ${col.carryOut}, not 0 — so it is not finished. Add a zero after the point (+0) and carry the ${col.carryOut} onto it.`,
      vn: `Số dư là ${col.carryOut}, chưa phải 0 — nên phép chia chưa xong. Thêm một số 0 sau dấu thập phân (+0) và nhớ ${col.carryOut} sang nó.`,
      fr: `Le reste est ${col.carryOut}, pas 0 — donc ce n'est pas fini. Ajoute un zéro après le point (+0) et reporte le ${col.carryOut} dessus.`,
    };
  }
  const want = placeName(model.dp);
  return {
    en: `To round to ${want.en} you need one place further — ${model.dp + 1} decimal places. Add a zero after the point (+0) and carry the remainder onto it.`,
    vn: `Để làm tròn đến ${want.vn}, em cần tính thêm một cột — ${model.dp + 1} chữ số thập phân. Thêm một số 0 sau dấu thập phân (+0) và nhớ số dư sang nó.`,
    fr: `Pour arrondir ${want.frTo}, il te faut un rang de plus — ${model.dp + 1} décimales. Ajoute un zéro après le point (+0) et reporte le reste dessus.`,
  };
}

/** Finished, but extra zeros were added: a note, not a mistake. */
export function extraZeroNote(model) {
  if (model.dp == null) {
    return {
      en: 'The remainder is 0, so it has finished. More zeros would only put 0s on the end — the extra ones are taken away.',
      vn: 'Số dư bằng 0, nên phép chia đã xong. Thêm số 0 nữa chỉ tạo ra các số 0 ở cuối — những số 0 thừa được bỏ đi.',
      fr: "Le reste est 0, donc c'est fini. D'autres zéros ne mettraient que des 0 à la fin — ceux en trop sont retirés.",
    };
  }
  return {
    en: `${model.dp + 1} decimal places is enough: one more than the ${model.dp} you are rounding to. The extra zeros are taken away.`,
    vn: `${model.dp + 1} chữ số thập phân là đủ: nhiều hơn một so với ${model.dp} chữ số em cần làm tròn. Những số 0 thừa được bỏ đi.`,
    fr: `${model.dp + 1} décimales suffisent : une de plus que pour arrondir ${placeName(model.dp).frTo}. Les zéros en trop sont retirés.`,
  };
}

/** The question as a sentence. */
export function questionText(model) {
  const s = `${model.dividendText} ÷ ${model.divisor}`;
  if (model.remainderMode) return { en: `Work out ${s}. Is there a remainder?`, vn: `Tính ${s}. Có số dư không?`, fr: `Calcule ${s}. Y a-t-il un reste ?` };
  if (model.dp == null) return { en: `Work out ${s}.`, vn: `Tính ${s}.`, fr: `Calcule ${s}.` };
  const want = placeName(model.dp);
  return { en: `Work out ${s}, correct to ${want.en}.`, vn: `Tính ${s}, chính xác đến ${want.vn}.`, fr: `Calcule ${s}, arrondi ${want.frTo}.` };
}

/** Problems with a unit's `shortDiv.items`, as strings. */
export function checkShortDivItems(items, { bilingual = true } = {}) {
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
    try { m = shortDivModel(it); } catch (e) { out.push(`${at}: ${e.message}`); continue; }
    if (m.cols.length > MAX_COLS) out.push(`${at}: ${m.cols.length} columns under the bus stop — at most ${MAX_COLS}`);
    if (m.zerosNeeded > MAX_ZEROS) out.push(`${at}: needs ${m.zerosNeeded} zeros added — at most ${MAX_ZEROS}`);
    if (m.dp != null && m.stopsAt != null && m.stopsAt <= m.dp) {
      out.push(`${at}: ${m.dividendText} ÷ ${m.divisor} = ${m.quotientText} stops within ${m.dp} places, so "correct to ${m.dp} d.p." rounds nothing — make it an exact item`);
    }
    if (m.cols.some((k) => k.carryOut > 99)) out.push(`${at}: a carry has three digits`);
  }
  return out;
}
