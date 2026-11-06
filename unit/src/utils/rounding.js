// src/utils/rounding.js
//
// Rounding for Year 7 Maths 3.2: the place a question asks for, the digit that
// decides, and the name of the slip behind a wrong answer. Every answer is
// derived from the number and the degree of accuracy (utils/decimal.js); an
// item never stores one.
//
// `places` is the degree of accuracy as a number: 1, 2, 3 … decimal places;
// 0 the nearest whole number; −1 the nearest 10; −2 the nearest 100; −3 the
// nearest 1000.

import { readDec, dec, decText, roundTo, truncTo, sameValue, hasForm, roundSig, placesOf } from './decimal.js';

export const PLACE_RANGE = [-3, 5];

/**
 * "2 decimal places", "the nearest 10" — EN, VN and FR, as a noun phrase.
 * French also carries `frTo`, the phrase with its "à" already in front ("à 2
 * décimales", "au millier le plus proche"): French contracts "à le" to "au",
 * so a sentence that says "rounded to …" should use `frTo`, not `à ${fr}`.
 */
export function placeName(places) {
  if (places > 0) {
    const fr = `${places} décimale${places > 1 ? 's' : ''}`;
    return { en: `${places} decimal place${places > 1 ? 's' : ''}`, vn: `${places} chữ số thập phân`, fr, frTo: `à ${fr}` };
  }
  if (places === 0) return { en: 'the nearest whole number', vn: 'số nguyên gần nhất', fr: "l'entier le plus proche", frTo: "à l'entier le plus proche" };
  const tens = {
    '-1': ['10', 'chục', 'la dizaine la plus proche', 'à la dizaine la plus proche'],
    '-2': ['100', 'trăm', 'la centaine la plus proche', 'à la centaine la plus proche'],
    '-3': ['1000', 'nghìn', 'le millier le plus proche', 'au millier le plus proche'],
  }[String(places)];
  return { en: `the nearest ${tens[0]}`, vn: `hàng ${tens[1]} gần nhất`, fr: tens[2], frTo: tens[3] };
}

/** Short form for a chip: "1 d.p.", "nearest 10". */
export function placeShort(places) {
  if (places > 0) return { en: `${places} d.p.`, vn: `${places} c.s.t.p.`, fr: `${places} déc.` };
  if (places === 0) return { en: 'nearest whole', vn: 'số nguyên gần nhất', fr: "à l'unité" };
  const tens = { '-1': ['10', 'chục'], '-2': ['100', 'trăm'], '-3': ['1000', 'nghìn'] }[String(places)];
  return { en: `nearest ${tens[0]}`, vn: `hàng ${tens[1]}`, fr: `à ${tens[0]} près` };
}

/** The column name of a place exponent (0 ones, −1 tenths …). */
export function columnName(k) {
  const EN = { 3: 'thousands', 2: 'hundreds', 1: 'tens', 0: 'ones', '-1': 'tenths', '-2': 'hundredths', '-3': 'thousandths', '-4': 'ten-thousandths', '-5': 'hundred-thousandths' };
  const VN = { 3: 'hàng nghìn', 2: 'hàng trăm', 1: 'hàng chục', 0: 'hàng đơn vị', '-1': 'hàng phần mười', '-2': 'hàng phần trăm', '-3': 'hàng phần nghìn', '-4': 'hàng phần chục nghìn', '-5': 'hàng phần trăm nghìn' };
  const FR = { 3: 'milliers', 2: 'centaines', 1: 'dizaines', 0: 'unités', '-1': 'dixièmes', '-2': 'centièmes', '-3': 'millièmes', '-4': 'dix-millièmes', '-5': 'cent-millièmes' };
  return { en: EN[k] || `10^${k}`, vn: VN[k] || `10^${k}`, fr: FR[k] || `10^${k}` };
}

/**
 * Everything about rounding `n` to `places`:
 *   keepPlace     the exponent of the last digit kept (1 d.p. → −1)
 *   deciderPlace  the digit straight after it, the one that decides
 *   decider       its value (0 when the number stops before it)
 *   up            does the kept digit go up?
 *   carries       does going up ripple left (34.98 → 35.0)?
 *   trailingZero  does the written answer end in a zero after the point?
 */
export function roundModel(n, places) {
  const v = typeof n === 'string' ? dec(n) : n;
  const digits = placesOf(v);
  const keepPlace = -places;
  const deciderPlace = keepPlace - 1;
  const decider = digits[deciderPlace] ?? 0;
  const answer = roundTo(v, places);
  const chopped = truncTo(v, places);
  const up = !sameValue(answer, chopped);
  const keptDigit = digits[keepPlace] ?? 0;
  const text = decText(answer);
  return {
    v, places, digits, keepPlace, deciderPlace, decider, answer, text, up,
    carries: up && keptDigit === 9,
    trailingZero: places > 0 && text.endsWith('0'),
    alreadyThere: v.dp <= Math.max(places, 0) && sameValue(v, answer),
  };
}

/**
 * Mark a typed rounded answer. `{ ok, code, en, vn, fr }`, where a wrong answer is
 * named: 'dropzero' (35 for 35.0), 'extra' (too many places), 'truncated' (chopped
 * without looking at the next digit), 'twice' (rounded one place, then again),
 * 'sigfig' (counted places from the front), 'otherplace' (rounded to the wrong
 * place), 'notrounded', 'value'. 'empty', 'comma' and 'unreadable' are not
 * mistakes — the caller should nudge, not count a try.
 */
export function diagnoseRound(n, places, typed) {
  const m = typeof n === 'object' && n.answer ? n : roundModel(n, places);
  const r = readDec(typed);
  if (!r.ok) return readProblem(r.code);
  const t = r.v;
  const want = placeName(m.places);

  if (sameValue(t, m.answer)) {
    if (hasForm(t, m.places)) return { ok: true, code: 'ok' };
    if (m.places > 0 && t.dp < m.places) {
      return {
        ok: false, code: 'dropzero',
        en: `Right value — but ${want.en} means ${m.places === 1 ? 'one digit' : `${m.places} digits`} after the point. Keep the zero at the end: it shows how exact the answer is.`,
        vn: `Đúng giá trị — nhưng ${want.vn} nghĩa là có ${m.places} chữ số sau dấu thập phân. Hãy giữ số 0 ở cuối: nó cho biết đáp án chính xác đến đâu.`,
        fr: `Bonne valeur — mais ${want.fr}, c'est ${m.places === 1 ? 'un chiffre' : `${m.places} chiffres`} après le point décimal. Garde le zéro à la fin : il montre la précision de la réponse.`,
      };
    }
    return {
      ok: false, code: 'extra',
      en: `Right value, but it is written with too many decimal places. ${cap(want.en)} is what the question asks for.`,
      vn: `Đúng giá trị, nhưng em viết thừa chữ số thập phân. Đề bài yêu cầu ${want.vn}.`,
      fr: `Bonne valeur, mais elle est écrite avec trop de décimales. La question demande d'arrondir ${want.frTo}.`,
    };
  }
  if (sameValue(t, m.v) && !sameValue(m.v, m.answer)) {
    return {
      ok: false, code: 'notrounded', en: 'That is the number itself — it has not been rounded yet.', vn: 'Đó chính là số ban đầu — em chưa làm tròn.',
      fr: "C'est le nombre lui-même — il n'est pas encore arrondi.",
    };
  }
  const chopped = truncTo(m.v, m.places);
  if (m.up && sameValue(t, chopped)) {
    return {
      ok: false, code: 'truncated',
      en: `You cut the number off without looking at the next digit. It is ${m.decider}, which is 5 or more, so the last digit you keep goes up.`,
      vn: `Em cắt bỏ luôn mà không nhìn chữ số tiếp theo. Chữ số đó là ${m.decider}, từ 5 trở lên, nên chữ số cuối cùng được giữ lại phải tăng lên.`,
      fr: `Tu as coupé le nombre sans regarder le chiffre suivant. C'est ${m.decider}, donc 5 ou plus : le dernier chiffre que tu gardes augmente.`,
    };
  }
  if (m.places < PLACE_RANGE[1] && m.v.dp > m.places + 1) {
    const twice = roundTo(roundTo(m.v, m.places + 1), m.places);
    if (!sameValue(twice, m.answer) && sameValue(t, twice)) {
      return {
        ok: false, code: 'twice',
        en: 'You rounded twice — one place first, then again. Round once, from the original number: look only at the digit straight after the place you want.',
        vn: 'Em đã làm tròn hai lần — một cột trước, rồi làm tròn tiếp. Chỉ làm tròn một lần, từ số ban đầu: chỉ nhìn chữ số ngay sau vị trí em cần.',
        fr: "Tu as arrondi deux fois — d'abord à un rang, puis encore. Arrondis une seule fois, à partir du nombre de départ : regarde seulement le chiffre juste après le rang voulu.",
      };
    }
  }
  if (m.places > 0) {
    const sig = roundSig(m.v, m.places);
    if (!sameValue(sig, m.answer) && sameValue(t, sig)) {
      return {
        ok: false, code: 'sigfig',
        en: 'You counted from the front of the number. Decimal places are counted from the point: only the digits after it.',
        vn: 'Em đã đếm từ đầu số. Chữ số thập phân được đếm từ dấu thập phân: chỉ những chữ số đứng sau nó.',
        fr: 'Tu as compté depuis le début du nombre. Les décimales se comptent à partir du point décimal : seulement les chiffres après lui.',
      };
    }
  }
  for (let p = PLACE_RANGE[0]; p <= PLACE_RANGE[1]; p += 1) {
    if (p === m.places) continue;
    const other = roundTo(m.v, p);
    if (sameValue(t, other) && hasForm(t, p) && !sameValue(other, m.answer)) {
      const got = placeName(p);
      return {
        ok: false, code: 'otherplace',
        en: `That is rounded to ${got.en}. The question asks for ${want.en}.`,
        vn: `Đó là làm tròn đến ${got.vn}. Đề bài yêu cầu ${want.vn}.`,
        fr: `C'est arrondi ${got.frTo}. La question demande d'arrondir ${want.frTo}.`,
      };
    }
  }
  return {
    ok: false, code: 'value',
    en: `Not quite. Find the last digit you keep for ${want.en}, then look at the very next digit: 5 or more goes up, 4 or less stays.`,
    vn: `Chưa đúng. Tìm chữ số cuối cùng được giữ lại khi làm tròn đến ${want.vn}, rồi nhìn chữ số ngay sau nó: từ 5 trở lên thì tăng, từ 4 trở xuống thì giữ nguyên.`,
    fr: `Pas tout à fait. Trouve le dernier chiffre que tu gardes pour arrondir ${want.frTo}, puis regarde le chiffre juste après : 5 ou plus, il augmente ; 4 ou moins, il reste.`,
  };
}

/** A typed answer that cannot be marked yet — say why, do not count a try. */
export function readProblem(code) {
  if (code === 'empty') return { ok: false, code, soft: true, en: 'Type a number first.', vn: 'Hãy nhập một số trước.', fr: "Écris d'abord un nombre." };
  if (code === 'comma') {
    return {
      ok: false, code, soft: true,
      en: 'Write the decimal point as a dot — 8.286, not 8,286 — and leave out commas between thousands.',
      vn: 'Hãy viết dấu thập phân bằng dấu chấm — 8.286, không phải 8,286 — và đừng dùng dấu phẩy giữa các hàng nghìn.',
      fr: 'Écris le point décimal avec un point — 8.286, pas 8,286 — et ne mets pas de virgule entre les milliers.',
    };
  }
  return {
    ok: false, code, soft: true, en: 'That is not a number I can read. Use digits and one decimal point.', vn: 'Đó không phải là một số hợp lệ. Hãy dùng chữ số và một dấu thập phân.',
    fr: 'Je ne peux pas lire ce nombre. Utilise des chiffres et un seul point décimal.',
  };
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/** The authored `to` of a round item/activity is sound. */
export function checkPlaces(places) {
  return Number.isInteger(places) && places >= PLACE_RANGE[0] && places <= PLACE_RANGE[1];
}
