// src/utils/shortDivExtras.js
//
// Two optional stages for the Bus Stop (src/tasks/ShortDivision.jsx), added for
// Year 7 Maths 4.4 Dividing decimals and switched on PER ITEM. An item without
// either flag runs exactly as before, so 3.2's Bus Stop and the Number Gym
// short-div drills of 1.4 and 1.5 are untouched.
//
//   table: true   "Write the times table first" — dividing by a 2-digit number.
//                 Before the division, the student fills in 2 × d … 9 × d
//                 (1 × d is given) by adding d each time. The finished table
//                 stays beside the bus stop while they divide.
//   check: true   "Check with the inverse calculation." After the division, the
//                 student picks the calculation that checks it — answer × d —
//                 from three, and sees it come back to the number they started
//                 with. The two wrong ones are the two slips: multiplying the
//                 number you started with, and dividing again.
//
//   { id: 'd10', level: 4, dividend: '55.2', divisor: 12, table: true }
//   { id: 'd3', level: 2, dividend: '12.24', divisor: 6, check: true }
//
// Every row, product and message is derived from the item, as in
// shortDivision.js, and the validator runs checkShortDivExtras on the same
// items (scripts/validate-entry.js, at the U04_4 marker).
//
// Messages are `{ en, fr }`: the stages belong to the English / French units of
// Unit 4. The screen falls back to English for any other language.

import { dec, decText, canon, sameValue } from './decimal.js';
import { shortDivModel } from './shortDivision.js';

export const TABLE_ROWS = 9;
export const TABLE_MIN_DIVISOR = 11;

/** The DOM id of a table row's input (the screen moves the cursor by id). */
export const tableBoxId = (uid, k) => `${uid}-tt${k}`;

/** The times table of d: [{ k: 1, value: d }, … { k: 9, value: 9d }]. */
export function timesTable(d) {
  return Array.from({ length: TABLE_ROWS }, (_, i) => ({ k: i + 1, value: (i + 1) * d }));
}

/** Is a typed table entry right? Digits only; a blank is not right. */
export function tableCellOk(d, k, typed) {
  const s = String(typed ?? '').trim();
  return /^\d{1,4}$/.test(s) && Number(s) === k * d;
}

/** The hint for a wrong row: build it from the row above. Never states the value. */
export function tableHint(d, k) {
  return {
    en: `Row ${k}: add ${d} to the row above — ${(k - 1) * d} + ${d}.`,
    fr: `Ligne ${k} : ajoute ${d} à la ligne du dessus — ${(k - 1) * d} + ${d}.`,
  };
}

/** answer × d, worked exactly — the inverse calculation. */
export function inverseProduct(model) {
  const a = model.answer;
  return canon({ n: a.n * BigInt(model.divisor), dp: a.dp });
}

// A small stable hash, so the three choices sit in an order fixed by the item
// (the right one is not always first) but never reshuffle between renders.
function hashOf(s) {
  let h = 2166136261;
  for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

/**
 * The three calculations offered at the Check stage, as KaTeX:
 *   back   answer × d      the inverse — it comes back to the dividend
 *   start  dividend × d    multiplied the number you started with
 *   again  answer ÷ d      divided again
 */
export function inverseChoices(model) {
  const A = model.answerText;
  const D = model.dividendText;
  const d = model.divisor;
  const all = [
    { val: 'back', latex: `${A} \\times ${d}` },
    { val: 'start', latex: `${D} \\times ${d}` },
    { val: 'again', latex: `${A} \\div ${d}` },
  ];
  const r = hashOf(model.item?.id ?? `${D}/${d}`) % 3;
  return [...all.slice(r), ...all.slice(0, r)];
}

/** The verdict on a chosen calculation: `{ ok, en, fr }`. */
export function markInverse(model, val) {
  const A = model.answerText;
  const D = model.dividendText;
  const d = model.divisor;
  const P = decText(inverseProduct(model));
  if (val === 'back') {
    return {
      ok: true,
      en: `${A} × ${d} = ${P} — back to the number you started with, so ${A} is right.`,
      fr: `${A} × ${d} = ${P} — on retrouve le nombre de départ, donc ${A} est juste.`,
    };
  }
  if (val === 'again') {
    return {
      ok: false,
      en: `Dividing again only takes you further away. The inverse of ÷ ${d} is × ${d}.`,
      fr: `Diviser encore t’éloigne encore plus. L’inverse de ÷ ${d}, c’est × ${d}.`,
    };
  }
  return {
    ok: false,
    en: `That multiplies the number you started with. Multiply your ANSWER by ${d}: if it is right, you get ${D} back.`,
    fr: `Là, tu multiplies le nombre de départ. Multiplie ta RÉPONSE par ${d} : si elle est juste, tu retrouves ${D}.`,
  };
}

/** Problems with the `table` / `check` flags of a unit's `shortDiv.items`, as strings. */
export function checkShortDivExtras(items) {
  const out = [];
  for (const [i, it] of (items || []).entries()) {
    const at = `item ${it?.id || i + 1}`;
    if (it?.table === undefined && it?.check === undefined) continue;
    let m;
    try { m = shortDivModel(it); } catch { continue; }   // checkShortDivItems names it
    if (it.table !== undefined) {
      if (it.table !== true) out.push(`${at}: table must be true or left out`);
      else if (m.divisor < TABLE_MIN_DIVISOR) out.push(`${at}: table is for a 2-digit divisor (${TABLE_MIN_DIVISOR} or more), not ${m.divisor}`);
    }
    if (it.check !== undefined) {
      if (it.check !== true) out.push(`${at}: check must be true or left out`);
      else if (m.dp != null) out.push(`${at}: check on a "correct to" item — a rounded answer does not multiply back to ${m.dividendText}`);
      else if (m.remainderMode) out.push(`${at}: check on a remainder item — the inverse needs the remainder added on, which this stage does not do`);
      else if (!sameValue(inverseProduct(m), dec(m.dividendText))) out.push(`${at}: ${m.answerText} × ${m.divisor} does not come back to ${m.dividendText}`);
      else if (new Set(inverseChoices(m).map((c) => c.latex)).size !== 3) out.push(`${at}: two of the inverse choices are the same calculation`);
    }
  }
  return out;
}
