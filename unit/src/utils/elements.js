// src/utils/elements.js
//
// The elements a Year 7 student meets (Science 2.5–2.7): the book's first 20,
// laid out as the book lays them out (groups 1–8, hydrogen floating above the
// gap), and the handful of other elements the compounds use. One table, read
// by the Element Hunt task, the `periodic` notes activity, the Particle Lab
// and the validator — so the table a student taps is the table they are
// marked against.

export const FIRST_20 = [
  { z: 1, sym: 'H', en: 'hydrogen', vn: 'hiđro', fr: 'hydrogène', metal: false, period: 1, group: null },
  { z: 2, sym: 'He', en: 'helium', vn: 'heli', fr: 'hélium', metal: false, period: 1, group: 8 },
  { z: 3, sym: 'Li', en: 'lithium', vn: 'liti', fr: 'lithium', metal: true, period: 2, group: 1 },
  { z: 4, sym: 'Be', en: 'beryllium', vn: 'beri', fr: 'béryllium', metal: true, period: 2, group: 2 },
  { z: 5, sym: 'B', en: 'boron', vn: 'bo', fr: 'bore', metal: false, period: 2, group: 3 },
  { z: 6, sym: 'C', en: 'carbon', vn: 'cacbon', fr: 'carbone', metal: false, period: 2, group: 4 },
  { z: 7, sym: 'N', en: 'nitrogen', vn: 'nitơ', fr: 'azote', metal: false, period: 2, group: 5 },
  { z: 8, sym: 'O', en: 'oxygen', vn: 'oxi', fr: 'oxygène', metal: false, period: 2, group: 6 },
  { z: 9, sym: 'F', en: 'fluorine', vn: 'flo', fr: 'fluor', metal: false, period: 2, group: 7 },
  { z: 10, sym: 'Ne', en: 'neon', vn: 'neon', fr: 'néon', metal: false, period: 2, group: 8 },
  { z: 11, sym: 'Na', en: 'sodium', vn: 'natri', fr: 'sodium', metal: true, period: 3, group: 1, latin: 'natrium' },
  { z: 12, sym: 'Mg', en: 'magnesium', vn: 'magie', fr: 'magnésium', metal: true, period: 3, group: 2 },
  { z: 13, sym: 'Al', en: 'aluminium', vn: 'nhôm', fr: 'aluminium', metal: true, period: 3, group: 3 },
  { z: 14, sym: 'Si', en: 'silicon', vn: 'silic', fr: 'silicium', metal: false, period: 3, group: 4 },
  { z: 15, sym: 'P', en: 'phosphorus', vn: 'photpho', fr: 'phosphore', metal: false, period: 3, group: 5 },
  { z: 16, sym: 'S', en: 'sulfur', vn: 'lưu huỳnh', fr: 'soufre', metal: false, period: 3, group: 6 },
  { z: 17, sym: 'Cl', en: 'chlorine', vn: 'clo', fr: 'chlore', metal: false, period: 3, group: 7 },
  { z: 18, sym: 'Ar', en: 'argon', vn: 'agon', fr: 'argon', metal: false, period: 3, group: 8 },
  { z: 19, sym: 'K', en: 'potassium', vn: 'kali', fr: 'potassium', metal: true, period: 4, group: 1, latin: 'kalium' },
  { z: 20, sym: 'Ca', en: 'calcium', vn: 'canxi', fr: 'calcium', metal: true, period: 4, group: 2 },
];

// Beyond the first 20: the metals of 2.5's photographs and the compounds of
// 2.6–2.7. Not on the tappable table.
export const OTHERS = [
  { z: 26, sym: 'Fe', en: 'iron', vn: 'sắt', fr: 'fer', metal: true, latin: 'ferrum' },
  { z: 27, sym: 'Co', en: 'cobalt', vn: 'coban', fr: 'cobalt', metal: true },
  { z: 29, sym: 'Cu', en: 'copper', vn: 'đồng', fr: 'cuivre', metal: true, latin: 'cuprum' },
  { z: 30, sym: 'Zn', en: 'zinc', vn: 'kẽm', fr: 'zinc', metal: true },
  { z: 35, sym: 'Br', en: 'bromine', vn: 'brom', fr: 'brome', metal: false },
  { z: 47, sym: 'Ag', en: 'silver', vn: 'bạc', fr: 'argent', metal: true, latin: 'argentum' },
  { z: 53, sym: 'I', en: 'iodine', vn: 'iot', fr: 'iode', metal: false },
  { z: 79, sym: 'Au', en: 'gold', vn: 'vàng', fr: 'or', metal: true, latin: 'aurum' },
  { z: 82, sym: 'Pb', en: 'lead', vn: 'chì', fr: 'plomb', metal: true, latin: 'plumbum' },
];

export const ELEMENTS = [...FIRST_20, ...OTHERS];
const BY_SYM = Object.fromEntries(ELEMENTS.map((e) => [e.sym, e]));
export const elementBySymbol = (sym) => BY_SYM[sym] || null;
export const elementByName = (name) => ELEMENTS.find((e) => e.en === String(name || '').trim().toLowerCase()) || null;

// French articles before an element or substance name. Every element is
// masculine in French; a name starting with a vowel or a mute h elides:
// le carbone / l'oxygène, du carbone / de l'oxygène, de carbone / d'oxygène,
// au carbone / à l'oxygène. A name may carry a bracket after it ("oxygène (O)").
const ELIDES = /^[aeiouyhàâéèêëîïôûü]/i;
export const leFr = (name) => (ELIDES.test(name) ? `l'${name}` : `le ${name}`);
export const duFr = (name) => (ELIDES.test(name) ? `de l'${name}` : `du ${name}`);
export const deFr = (name) => (ELIDES.test(name) ? `d'${name}` : `de ${name}`);
export const auFr = (name) => (ELIDES.test(name) ? `à l'${name}` : `au ${name}`);
/** The French name, with the English one in brackets when they differ: "azote (nitrogen)". */
export const frWithEn = (e) => (e.fr === e.en ? e.fr : `${e.fr} (${e.en})`);

/** How the symbol was made — the three ways on the 2.5 slide. */
export function symbolWay(el) {
  if (el.latin) return { id: 'latin', en: `from its Latin name, ${el.latin}`, vn: `từ tên La-tinh, ${el.latin}`, fr: `tiré de son nom latin, ${el.latin}` };
  // The French name does not always start with the symbol's letter (azote, N): name the English one.
  if (el.sym.length === 1) return { id: 'first', en: 'the first letter of its name', vn: 'chữ cái đầu tiên của tên', fr: `la première lettre de son nom anglais, ${el.en}` };
  return { id: 'two', en: 'the first letter and one more letter of its name', vn: 'chữ cái đầu và thêm một chữ cái trong tên', fr: `la première lettre et une autre lettre de son nom anglais, ${el.en}` };
}

// ------------------------------------------------------------------ the table layout
// The book's first-20 table, in SVG units: two wide columns, ten narrow blank
// cells in period 4 (the transition metals the book leaves out), six wide
// columns; hydrogen floats above the gap. Shared by the task and the activity.

export const TABLE = { X0: 16, Y0: 16, CW: 88, CH: 86, TW: 26 };
TABLE.W = TABLE.X0 * 2 + 8 * TABLE.CW + 10 * TABLE.TW;
TABLE.H = TABLE.Y0 * 2 + 4 * TABLE.CH;

export const colX = (g) => (g <= 2 ? TABLE.X0 + (g - 1) * TABLE.CW : TABLE.X0 + 2 * TABLE.CW + 10 * TABLE.TW + (g - 3) * TABLE.CW);
export const rowY = (p) => TABLE.Y0 + (p - 1) * TABLE.CH;
export function tilePos(el) {
  if (el.sym === 'H') return { x: TABLE.X0 + 2 * TABLE.CW + 4 * TABLE.TW + 5, y: rowY(1) };
  return { x: colX(el.group), y: rowY(el.period) };
}
/** The ten blank narrow cells in period 4. */
export const BLANK_CELLS = Array.from({ length: 10 }, (_, k) => ({ x: TABLE.X0 + 2 * TABLE.CW + k * TABLE.TW, y: rowY(4), w: TABLE.TW }));

// ------------------------------------------------------------------ queries

/**
 * The set of first-20 symbols a query picks out. Query shapes:
 *   { sym: 'Mg' }                       one element
 *   { name: 'magnesium' }               one element, by name
 *   { period: 3 }                       a row
 *   { group: 2 }                        a column
 *   { period: 3, metal: true }          metals in a row (metal:false = non-metals)
 *   { sameGroupAs: 'He' }               the others in its column
 *   { samePeriodAs: 'Mg' }              the others in its row
 *   { metal: true }                     every metal
 */
export function querySymbols(q = {}) {
  let list = FIRST_20;
  if (q.sym) return FIRST_20.some((e) => e.sym === q.sym) ? [q.sym] : [];
  if (q.name) { const e = FIRST_20.find((x) => x.en === q.name); return e ? [e.sym] : []; }
  if (q.sameGroupAs) {
    const e = BY_SYM[q.sameGroupAs];
    if (!e?.group) return [];
    list = list.filter((x) => x.group === e.group && x.sym !== e.sym);
  }
  if (q.samePeriodAs) {
    const e = BY_SYM[q.samePeriodAs];
    if (!e?.period) return [];
    list = list.filter((x) => x.period === e.period && x.sym !== e.sym);
  }
  if (q.period != null) list = list.filter((x) => x.period === q.period);
  if (q.group != null) list = list.filter((x) => x.group === q.group);
  if (q.metal != null) list = list.filter((x) => x.metal === q.metal);
  return list.map((x) => x.sym);
}

/** A query in words, every language — the prompt a generated round shows. */
export function queryWords(q) {
  const e = q.sym ? BY_SYM[q.sym] : q.name ? elementByName(q.name) : null;
  if (e) return { en: `Tap ${e.en}.`, vn: `Chạm vào ${e.vn} (${e.en}).`, fr: `Touche ${leFr(frWithEn(e))}.` };
  // fr: the plural, after "tous les"
  const kind = q.metal === true ? { en: 'metal', vn: 'kim loại', fr: 'métaux' } : q.metal === false ? { en: 'non-metal', vn: 'phi kim', fr: 'non-métaux' } : { en: 'element', vn: 'nguyên tố', fr: 'éléments' };
  if (q.sameGroupAs) { const x = BY_SYM[q.sameGroupAs]; return { en: `Tap every other ${kind.en} in the same group as ${x.en}.`, vn: `Chạm vào mọi ${kind.vn} khác cùng nhóm với ${x.vn} (${x.en}).`, fr: `Touche tous les autres ${kind.fr} du même groupe que ${leFr(frWithEn(x))}.` }; }
  if (q.samePeriodAs) { const x = BY_SYM[q.samePeriodAs]; return { en: `Tap every other ${kind.en} in the same period as ${x.en}.`, vn: `Chạm vào mọi ${kind.vn} khác cùng chu kì với ${x.vn} (${x.en}).`, fr: `Touche tous les autres ${kind.fr} de la même période que ${leFr(frWithEn(x))}.` }; }
  if (q.period != null && q.group != null) return { en: `Tap the element in period ${q.period}, group ${q.group}.`, vn: `Chạm vào nguyên tố ở chu kì ${q.period}, nhóm ${q.group}.`, fr: `Touche l'élément de la période ${q.period}, groupe ${q.group}.` };
  if (q.period != null) return { en: `Tap every ${kind.en} in period ${q.period}.`, vn: `Chạm vào mọi ${kind.vn} trong chu kì ${q.period}.`, fr: `Touche tous les ${kind.fr} de la période ${q.period}.` };
  if (q.group != null) return { en: `Tap every ${kind.en} in group ${q.group}.`, vn: `Chạm vào mọi ${kind.vn} trong nhóm ${q.group}.`, fr: `Touche tous les ${kind.fr} du groupe ${q.group}.` };
  return { en: `Tap every ${kind.en}.`, vn: `Chạm vào mọi ${kind.vn}.`, fr: `Touche tous les ${kind.fr}.` };
}

/**
 * A typed symbol against an element. Catches the capital-letter rule (mg,
 * MG, and CO — which is two elements), another element's symbol, and the
 * English-first-letter guess for a Latin symbol.
 */
export function diagnoseSymbol(el, typed) {
  const t = String(typed ?? '').trim();
  if (!t) return { ok: false, en: 'Type the symbol.', vn: 'Nhập kí hiệu.', fr: 'Écris le symbole.' };
  if (t === el.sym) return { ok: true };
  if (t.toLowerCase() === el.sym.toLowerCase()) {
    if (t.length === 2 && t === t.toUpperCase()) {
      const a = BY_SYM[t[0]];
      const b = BY_SYM[t[1]];
      if (a && b) return { ok: false, code: 'two-capitals', en: `${t} with two capitals is TWO elements, ${a.en} and ${b.en}. The second letter of a symbol is always small: ${el.sym}.`, vn: `${t} với hai chữ hoa là HAI nguyên tố, ${a.vn} và ${b.vn}. Chữ cái thứ hai của kí hiệu luôn viết thường: ${el.sym}.`, fr: `${t} avec deux majuscules, ce sont DEUX éléments : ${leFr(a.fr)} et ${leFr(b.fr)}. La deuxième lettre d'un symbole est toujours une minuscule : ${el.sym}.` };
    }
    return { ok: false, code: 'capitals', en: el.sym.length === 1 ? `A symbol always starts with a capital letter: ${el.sym}.` : `Right letters, wrong capitals. The first letter is a capital and the second is small: ${el.sym}.`, vn: el.sym.length === 1 ? `Kí hiệu luôn bắt đầu bằng chữ hoa: ${el.sym}.` : `Đúng chữ, sai chữ hoa. Chữ đầu viết hoa, chữ thứ hai viết thường: ${el.sym}.`, fr: el.sym.length === 1 ? `Un symbole commence toujours par une majuscule : ${el.sym}.` : `Bonnes lettres, mauvaises majuscules. La première lettre est une majuscule, la deuxième une minuscule : ${el.sym}.` };
  }
  const other = BY_SYM[t];
  if (el.latin && t[0].toUpperCase() === el.en[0].toUpperCase()) {
    return { ok: false, code: 'latin', en: `${other ? `${t} is ${other.en}. ` : ''}${el.en[0].toUpperCase() + el.en.slice(1)}'s symbol comes from its Latin name, ${el.latin}: ${el.sym}.`, vn: `${other ? `${t} là ${other.vn}. ` : ''}Kí hiệu của ${el.vn} đến từ tên La-tinh ${el.latin}: ${el.sym}.`, fr: `${other ? `${t}, c'est ${leFr(other.fr)}. ` : ''}Le symbole ${duFr(el.fr)} vient de son nom latin, ${el.latin} : ${el.sym}.` };
  }
  if (other) return { ok: false, code: 'other', en: `${t} is ${other.en}. ${el.en[0].toUpperCase() + el.en.slice(1)} is ${el.sym}.`, vn: `${t} là ${other.vn}. ${el.vn} là ${el.sym}.`, fr: `${t}, c'est ${leFr(other.fr)}. Le symbole ${duFr(el.fr)} est ${el.sym}.` };
  return { ok: false, code: 'wrong', en: `The symbol for ${el.en} is ${el.sym} — ${symbolWay(el).en}.`, vn: `Kí hiệu của ${el.vn} là ${el.sym} — ${symbolWay(el).vn}.`, fr: `Le symbole ${duFr(el.fr)} est ${el.sym} — ${symbolWay(el).fr}.` };
}
