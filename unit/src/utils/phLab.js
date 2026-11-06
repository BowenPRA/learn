// src/utils/phLab.js
//
// pH Lab — Year 7 Science 2.8 Acids and Bases (task PH_LAB, unit key `phLab`,
// deck activity `ph`). Pure: no React. Spec: docs/y7-science/unit2-close-engines.md §4.
//
// Everything a round asks is DERIVED from a pH number:
//
//   acid, neutral or alkali                  kindOf(pH)        below 7 · 7 · above 7
//   the universal-indicator colour           SCALE / phColour  the classroom PH_SCALE colours
//   what litmus does                         litmusDoes()      blue→red in an acid, red→blue in an alkali
//   which is the stronger acid / alkali      the further from 7, the stronger
//   neutralising drop by drop                each drop moves the pH one step towards 7
//
// The catalogue holds only whole-number pH values the classroom deck uses
// (the PhDipper and Acid Snap lists) or that a school chart prints the same
// way everywhere. Values a textbook would argue about (shampoo, green tea,
// bleach, rain) are left out on purpose.
//
// A wrong answer is answered BY NAME — the colour that pH really is, the paper
// that was already that colour, the drop that went one past green — before
// the rule. `markRound` returns those lines; the screens only print them.

import { rngFrom } from './labBench.js';

// ------------------------------------------------------------------ the scale

// Universal indicator, pH 1 at the left to pH 14 at the right: EXACTLY the
// classroom PH_SCALE diagram (content/y7-science/U02_8/diagrams.js, copied to
// src/data/Y7_SCI/U02_8/diagrams.js). The colour words are the ones a student
// would say looking at the cell.
export const SCALE = [
  { pH: 1, colour: '#d7191c', en: 'red', vn: 'đỏ' , fr: 'rouge' },
  { pH: 2, colour: '#e8462c', en: 'red', vn: 'đỏ' , fr: 'rouge' },
  { pH: 3, colour: '#f06e28', en: 'orange', vn: 'cam' , fr: 'orange' },
  { pH: 4, colour: '#f79b2c', en: 'orange', vn: 'cam' , fr: 'orange' },
  { pH: 5, colour: '#fac432', en: 'yellow', vn: 'vàng' , fr: 'jaune' },
  { pH: 6, colour: '#ecdf2a', en: 'yellow', vn: 'vàng' , fr: 'jaune' },
  { pH: 7, colour: '#4caf50', en: 'green', vn: 'xanh lá' , fr: 'vert' },
  { pH: 8, colour: '#24a58c', en: 'blue-green', vn: 'xanh ngọc' , fr: 'bleu-vert' },
  { pH: 9, colour: '#1f8ac0', en: 'blue', vn: 'xanh dương' , fr: 'bleu' },
  { pH: 10, colour: '#1f6bb5', en: 'blue', vn: 'xanh dương' , fr: 'bleu' },
  { pH: 11, colour: '#2f4fa3', en: 'dark blue', vn: 'xanh dương đậm' , fr: 'bleu foncé' },
  { pH: 12, colour: '#4a2f96', en: 'purple', vn: 'tím' , fr: 'violet' },
  { pH: 13, colour: '#63258c', en: 'purple', vn: 'tím' , fr: 'violet' },
  { pH: 14, colour: '#7a1f7a', en: 'purple', vn: 'tím' , fr: 'violet' },
];
export const PH_MIN = 1;
export const PH_MAX = 14;
export const NEUTRAL = 7;

const clampPH = (n) => Math.min(PH_MAX, Math.max(PH_MIN, Math.round(Number(n))));
export const isPH = (n) => Number.isInteger(n) && n >= PH_MIN && n <= PH_MAX;
export const cellOf = (pH) => SCALE[clampPH(pH) - 1];
export const phColour = (pH) => cellOf(pH).colour;
/** The colour a number sits on, as a word: { en, vn, fr }. */
export const colourWord = (pH) => ({ en: cellOf(pH).en, vn: cellOf(pH).vn, fr: cellOf(pH).fr });
/** White text reads on every cell but the pale yellow at 5 and 6. */
export const inkOn = (pH) => (pH === 5 || pH === 6 ? '#2b2b2b' : '#ffffff');

// ------------------------------------------------------------------ acid, neutral, alkali

export const KINDS = ['acid', 'neutral', 'alkali'];
export function kindOf(pH) {
  if (pH < NEUTRAL) return 'acid';
  if (pH > NEUTRAL) return 'alkali';
  return 'neutral';
}
export const KIND_WORDS = {
  acid: { en: 'Acid', vn: 'Axit', fr: 'Acide', a: { en: 'an acid', vn: 'axit', fr: 'un acide' }, side: { en: 'below 7', vn: 'nhỏ hơn 7', fr: 'inférieur à 7' } },
  neutral: { en: 'Neutral', vn: 'Trung tính', fr: 'Neutre', a: { en: 'neutral', vn: 'trung tính', fr: 'neutre' }, side: { en: 'exactly 7', vn: 'đúng bằng 7', fr: 'exactement 7' } },
  // French school science says "base" (basique) where the English course says alkali
  alkali: { en: 'Alkali', vn: 'Kiềm', fr: 'Basique', a: { en: 'an alkali', vn: 'kiềm', fr: 'une base' }, side: { en: 'above 7', vn: 'lớn hơn 7', fr: 'supérieur à 7' } },
};

/**
 * How strong, in the deck's words. "Strong" only where every school chart
 * agrees — pH 1–2 and 12–14, the two ends the deck calls a strong acid (pH 1)
 * and a strong alkali (pH 13); "weak" only for 4–6 and 8–10. pH 3 and 11 sit
 * on the line charts draw differently, so they are just an acid / an alkali —
 * and no round ever asks for a band: strength is always asked as a comparison
 * ("the further from 7, the stronger").
 */
export function strengthOf(pH) {
  const kind = kindOf(pH);
  let level = null;
  if (kind === 'acid') level = pH <= 2 ? 'strong' : pH >= 4 ? 'weak' : null;
  if (kind === 'alkali') level = pH >= 12 ? 'strong' : pH <= 10 ? 'weak' : null;
  const w = KIND_WORDS[kind].a;
  if (!level) return { kind, level, steps: Math.abs(pH - NEUTRAL), en: w.en, vn: w.vn, fr: w.fr };
  const en = `a ${level} ${kind}`;
  const vn = `${kind === 'acid' ? 'axit' : 'kiềm'} ${level === 'strong' ? 'mạnh' : 'yếu'}`;
  const fr = kind === 'acid' ? `un acide ${level === 'strong' ? 'fort' : 'faible'}` : `une base ${level === 'strong' ? 'forte' : 'faible'}`;
  return { kind, level, steps: Math.abs(pH - NEUTRAL), en, vn, fr };
}

// ------------------------------------------------------------------ the catalogue

// Every liquid a round can name, with its classroom pH. From the deck: the
// PhDipper eleven (lemon juice 2 … oven cleaner 13), Acid Snap (car battery
// acid 1, stomach acid 2, tamarind 3, cola 3, an ant bite 3, tap water 7, salt
// water 7, toothpaste 9, an indigestion tablet 10) and the litmus photographs
// (hydrochloric acid). School-chart standards: tomato juice 4, sugar water 7,
// milk of magnesia 10, ammonia cleaner 11, drain cleaner 14.
export const SUBSTANCES = {
  battery: { en: 'car battery acid', vn: 'axit ắc quy ô tô', fr: 'acide de batterie de voiture', pH: 1 },
  hcl: { en: 'dilute hydrochloric acid', vn: 'axit clohiđric loãng', fr: 'acide chlorhydrique dilué', pH: 1 },
  stomach: { en: 'stomach acid', vn: 'axit dạ dày', fr: 'acide gastrique', pH: 2 },
  lemon: { en: 'lemon juice', vn: 'nước chanh', fr: 'jus de citron', pH: 2 },
  vinegar: { en: 'vinegar', vn: 'giấm', fr: 'vinaigre', pH: 3 },
  cola: { en: 'cola', vn: 'nước cô-ca', fr: 'cola', pH: 3 },
  tamarind: { en: 'tamarind juice', vn: 'nước me', fr: 'jus de tamarin', pH: 3 },
  ant: { en: 'the acid in an ant bite', vn: 'axit trong vết kiến cắn', fr: "acide d'une piqûre de fourmi", pH: 3 },
  orange: { en: 'orange juice', vn: 'nước cam', fr: "jus d'orange", pH: 4 },
  tomato: { en: 'tomato juice', vn: 'nước ép cà chua', fr: 'jus de tomate', pH: 4 },
  coffee: { en: 'black coffee', vn: 'cà phê đen', fr: 'café noir', pH: 5 },
  milk: { en: 'milk', vn: 'sữa', fr: 'lait', pH: 6 },
  water: { en: 'pure water', vn: 'nước tinh khiết', fr: 'eau pure', g: 'f', pH: 7 },
  tap: { en: 'tap water', vn: 'nước máy', fr: 'eau du robinet', g: 'f', pH: 7 },
  salt: { en: 'salt water', vn: 'nước muối', fr: 'eau salée', g: 'f', pH: 7 },
  sugar: { en: 'sugar water', vn: 'nước đường', fr: 'eau sucrée', g: 'f', pH: 7 },
  sea: { en: 'sea water', vn: 'nước biển', fr: 'eau de mer', g: 'f', pH: 8 },
  soda: { en: 'baking soda in water', vn: 'bột nở (baking soda) pha nước', fr: "bicarbonate de soude dans l'eau", pH: 9 },
  toothpaste: { en: 'toothpaste', vn: 'kem đánh răng', fr: 'dentifrice', pH: 9 },
  soap: { en: 'soapy water', vn: 'nước xà phòng', fr: 'eau savonneuse', g: 'f', pH: 10 },
  tablet: { en: 'an indigestion tablet in water', vn: 'viên thuốc đau dạ dày pha nước', fr: "comprimé antiacide dans l'eau", pH: 10 },
  magnesia: { en: 'milk of magnesia', vn: 'sữa magie', fr: 'lait de magnésie', pH: 10 },
  ammonia: { en: 'ammonia cleaner', vn: 'nước tẩy rửa có amoniac', fr: 'nettoyant ammoniaqué', pH: 11 },
  limewater: { en: 'limewater', vn: 'nước vôi trong', fr: 'eau de chaux', g: 'f', pH: 12 },
  oven: { en: 'oven cleaner', vn: 'nước tẩy lò', fr: 'nettoyant pour four', pH: 13 },
  drain: { en: 'drain cleaner', vn: 'nước thông cống', fr: 'déboucheur', pH: 14 },
};
export const substanceOf = (id) => (SUBSTANCES[id] ? { id, ...SUBSTANCES[id] } : null);
/** A French name with its article (`g: 'f'` marks a feminine one): "le jus de citron", "l'eau pure", "la chaux agricole". */
export const leFrOf = (o) => (/^[aeiouyhàâéèêîôû]/i.test(o.fr) ? `l'${o.fr}` : `${o.g === 'f' ? 'la' : 'le'} ${o.fr}`);
const idsWhere = (test) => Object.keys(SUBSTANCES).filter((id) => test(SUBSTANCES[id]));

/** "lemon juice" → "Lemon juice" (every language). */
export const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

// ------------------------------------------------------------------ litmus

// Blue litmus turns red in an acid; red litmus turns blue in an alkali; a
// neutral liquid changes neither. Colours from the LITMUS_RULE diagram.
export const LITMUS = {
  blue: { en: 'Blue litmus', vn: 'Giấy quỳ xanh', fr: 'Papier tournesol bleu', dry: '#2c6fbb', acid: 'red', neutral: 'none', alkali: 'none' },
  red: { en: 'Red litmus', vn: 'Giấy quỳ đỏ', fr: 'Papier tournesol rouge', dry: '#c0392b', acid: 'none', neutral: 'none', alkali: 'blue' },
};
export const LITMUS_PAPERS = ['blue', 'red'];
export const LITMUS_DOES = {
  red: { en: 'turns red', vn: 'chuyển đỏ', fr: 'devient rouge' },
  blue: { en: 'turns blue', vn: 'chuyển xanh', fr: 'devient bleu' },
  none: { en: 'no change', vn: 'không đổi màu', fr: 'ne change pas' },
};
export const LITMUS_CHOICES = ['red', 'blue', 'none'];
/** What a litmus paper does in a liquid of this kind: 'red' | 'blue' | 'none'. */
export const litmusDoes = (paper, kind) => LITMUS[paper][kind];
/** The colour of the wet end after dipping. */
export const wetColour = (paper, does) => (does === 'red' ? '#c0392b' : does === 'blue' ? '#2c6fbb' : LITMUS[paper].dry);

// ------------------------------------------------------------------ neutralising

// What can be added. The bases are the deck's (NEUTRAL_LIFE and question 6);
// the acids are the wrong turns — adding more acid makes an acid problem worse.
// "Farm lime" is named in full: the fruit called a lime is an ACID.
export const ADDS = {
  toothpaste: { en: 'toothpaste', vn: 'kem đánh răng', fr: 'dentifrice', kind: 'base' },
  tablet: { en: 'an indigestion tablet', vn: 'viên thuốc đau dạ dày', fr: 'comprimé antiacide', kind: 'base' },
  lime: { en: 'farm lime (a white powder)', vn: 'vôi bột', fr: 'chaux agricole (une poudre blanche)', g: 'f', kind: 'base' },
  soap: { en: 'soap', vn: 'xà phòng', fr: 'savon', kind: 'base' },
  soda: { en: 'baking soda', vn: 'bột nở (baking soda)', fr: 'bicarbonate de soude', kind: 'base' },
  vinegar: { en: 'vinegar', vn: 'giấm', fr: 'vinaigre', kind: 'acid' },
  lemon: { en: 'lemon juice', vn: 'nước chanh', fr: 'jus de citron', kind: 'acid' },
  cola: { en: 'cola', vn: 'nước cô-ca', fr: 'cola', kind: 'acid' },
  tamarind: { en: 'tamarind juice', vn: 'nước me', fr: 'jus de tamarin', kind: 'acid' },
};
const ACID_ADDS = Object.keys(ADDS).filter((k) => ADDS[k].kind === 'acid');

// The deck's everyday cases — the four panels of NEUTRAL_LIFE and question 6
// (acid spilt on the bench). Every one is an acid problem fixed with a base,
// so the pH goes UP, towards 7. Nothing here the deck does not say.
export const NEUTRALISE = [
  {
    id: 'teeth', fix: 'toothpaste',
    en: 'After a meal, food leaves acid on your teeth.', vn: 'Sau bữa ăn, thức ăn để lại axit trên răng em.', fr: "Après un repas, la nourriture laisse de l'acide sur tes dents.",
    why: { en: 'Toothpaste is a base (pH 9). Brushing neutralises the acid the food left on your teeth.', vn: 'Kem đánh răng là bazơ (pH 9). Đánh răng trung hòa axit mà thức ăn để lại trên răng.', fr: "Le dentifrice est une base (pH 9). Te brosser les dents neutralise l'acide que la nourriture a laissé." },
  },
  {
    id: 'stomach', fix: 'tablet',
    en: 'Too much acid in your stomach, and it hurts.', vn: 'Dạ dày em thừa axit, và đang đau.', fr: "Trop d'acide dans ton estomac, et ça fait mal.",
    why: { en: 'An indigestion tablet is a base. It neutralises some of the stomach acid, so the pain stops.', vn: 'Viên thuốc đau dạ dày là bazơ. Nó trung hòa bớt axit trong dạ dày, nên hết đau.', fr: "Un comprimé antiacide est une base. Il neutralise une partie de l'acide gastrique, donc la douleur s'arrête." },
  },
  {
    id: 'soil', fix: 'lime',
    en: 'The soil in a rice field is too acidic for rice to grow.', vn: 'Đất ruộng quá chua (quá axit), lúa không mọc được.', fr: "Le sol d'une rizière est trop acide pour que le riz pousse.",
    why: { en: 'Farm lime is a base. Spread on the field, it neutralises the acid in the soil.', vn: 'Vôi bột là bazơ. Rải lên ruộng, nó trung hòa axit trong đất.', fr: "La chaux agricole est une base. Répandue sur le champ, elle neutralise l'acide du sol." },
  },
  {
    id: 'ant', fix: 'soap',
    en: 'An ant bites you and injects an acid.', vn: 'Một con kiến cắn em và tiêm vào một axit.', fr: 'Une fourmi te pique et injecte un acide.',
    why: { en: 'Soap is an alkali — a base. It neutralises the acid from the bite, so it helps.', vn: 'Xà phòng là kiềm — một bazơ. Nó trung hòa axit từ vết cắn, nên giúp đỡ đau.', fr: "Le savon est basique — c'est une base. Il neutralise l'acide de la piqûre, donc il soulage." },
  },
  {
    id: 'spill', fix: 'soda',
    en: 'A little acid is spilt on the lab bench.', vn: 'Một ít axit bị đổ ra bàn thí nghiệm.', fr: "Un peu d'acide est renversé sur la paillasse.",
    why: { en: 'Baking soda is a base. It neutralises the spilt acid; more acid would only make it worse.', vn: 'Bột nở là bazơ. Nó trung hòa axit bị đổ; thêm axit chỉ làm tệ hơn.', fr: "Le bicarbonate de soude est une base. Il neutralise l'acide renversé ; plus d'acide ne ferait qu'empirer les choses." },
  },
];
export const caseOf = (id) => NEUTRALISE.find((c) => c.id === id) || null;

// Which way the pH goes when a base is added to an acid.
export const WAYS = {
  up: { en: 'It goes up, towards 7', vn: 'Tăng lên, về phía 7', fr: 'Il monte, vers 7' },
  down: { en: 'It goes down, towards 1', vn: 'Giảm xuống, về phía 1', fr: 'Il descend, vers 1' },
  same: { en: 'It stays the same', vn: 'Giữ nguyên', fr: 'Il ne change pas' },
};
export const WAY_CHOICES = ['up', 'down', 'same'];

/** The pH after `drops` drops, one step towards 7 each (and past it, if you keep going). */
export const afterDrops = (start, drops) => start + (start < NEUTRAL ? 1 : -1) * drops;
export const dropsToNeutral = (start) => Math.abs(NEUTRAL - start);
/** The colours the beaker walks through, start to finish. */
export const walkOf = (start, drops) => Array.from({ length: drops + 1 }, (_, i) => afterDrops(start, i));

// ------------------------------------------------------------------ drawings
// Every picture sits on a white plate, so a dark-mode page never changes the
// colour a student is asked to read.

const PALE = '#e5eaf0';

/** A test tube of universal indicator at this pH (null: not tested yet, a "?"). */
export function tubeSvg(pH, { w = 120, h = 220 } = {}) {
  const fill = pH == null ? PALE : phColour(pH);
  const mark = pH == null
    ? '<text x="60" y="152" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="40" font-weight="800" fill="#94a3b8">?</text>'
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>`
    + `<path d="M 40 26 V 170 a 20 20 0 0 0 40 0 V 26" fill="#f8fafc" stroke="#64748b" stroke-width="4" stroke-linejoin="round"/>`
    + `<path d="M 42 86 V 170 a 18 18 0 0 0 36 0 V 86 Z" fill="${fill}"/>`
    + `<path d="M 40 26 V 170 a 20 20 0 0 0 40 0 V 26" fill="none" stroke="#64748b" stroke-width="4" stroke-linejoin="round"/>`
    + `<path d="M 32 26 H 88" stroke="#64748b" stroke-width="5" stroke-linecap="round"/>`
    + `<path d="M 50 98 V 162" stroke="#ffffff" stroke-opacity="0.5" stroke-width="5" stroke-linecap="round"/>${mark}</svg>`;
}

/**
 * A litmus strip, upright, wet end at the bottom. `does` null: still dry;
 * 'red' / 'blue' / 'none': what the wet end did. A dipped strip keeps a darker
 * band where the liquid reached, so "no change" still looks dipped.
 */
export function stripSvg(paper, does = null, { w = 80, h = 200 } = {}) {
  const dry = LITMUS[paper].dry;
  const wet = does == null ? dry : wetColour(paper, does);
  const line = does == null ? '' : `<path d="M 26 112 H 54" stroke="#ffffff" stroke-opacity="0.65" stroke-width="3" stroke-dasharray="4 3"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>`
    + `<path d="M 24 18 H 56 V 112 H 24 Z" fill="${dry}" stroke="#475569" stroke-width="2.5" stroke-linejoin="round"/>`
    + `<path d="M 24 112 H 56 V 182 H 24 Z" fill="${wet}" stroke="#475569" stroke-width="2.5" stroke-linejoin="round"/>${line}</svg>`;
}

/**
 * The fourteen-cell scale, numbered (or not), with an optional marker: a black
 * frame and a pointer over one cell. Static — the screens draw their own
 * tappable version from SCALE.
 */
export function scaleSvg({ marker = null, numbers = true } = {}) {
  const cw = 60;
  const x0 = 10;
  let body = '';
  for (const c of SCALE) {
    const x = x0 + (c.pH - 1) * cw;
    body += `<path d="M ${x} 34 h ${cw} v 52 h ${-cw} Z" fill="${c.colour}" stroke="#ffffff" stroke-width="2"/>`;
    if (numbers) body += `<text x="${x + cw / 2}" y="70" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="24" font-weight="800" fill="${inkOn(c.pH)}">${c.pH}</text>`;
  }
  if (marker != null && isPH(marker)) {
    const x = x0 + (marker - 1) * cw;
    body += `<path d="M ${x - 2} 32 h ${cw + 4} v 56 h ${-cw - 4} Z" fill="none" stroke="#1e293b" stroke-width="5"/>`
      + `<path d="M ${x + cw / 2} 28 l -12 -16 h 24 Z" fill="#1e293b"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${x0 * 2 + cw * 14} 96"><rect x="0" y="0" width="${x0 * 2 + cw * 14}" height="96" rx="12" fill="#ffffff"/>${body}</svg>`;
}

// ------------------------------------------------------------------ helpers for rounds

const pickFrom = (rng, list) => list[Math.floor(rng() * list.length)];
function shuffled(rng, list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i -= 1) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
/** A seeded generator from any string (an activity id), so a slide looks the same every visit. */
export function rngFromString(s) {
  let h = 2166136261;
  for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  return rngFrom(h || 1);
}

/**
 * Four pH values for a colour question: the answer and three others, every
 * pair at least three steps apart along the scale — so no two swatches are
 * neighbours a student could not tell apart without a chart.
 */
export const SWATCH_GAP = 3;
export function swatchOptions(pH, rng) {
  for (let tries = 0; tries < 200; tries += 1) {
    const picked = [pH];
    for (const n of shuffled(rng, SCALE.map((c) => c.pH))) {
      if (picked.length === 4) break;
      if (picked.every((p) => Math.abs(p - n) >= SWATCH_GAP)) picked.push(n);
    }
    if (picked.length === 4) return shuffled(rng, picked);
  }
  throw new Error(`no four swatches ${SWATCH_GAP} apart around pH ${pH}`);
}

// ------------------------------------------------------------------ pH Lab rounds
//
//   classify    a substance and its pH: acid, neutral or alkali
//   colour      toColour: a substance and its pH → tap its colour (four swatches)
//               toPH:     a tube's colour → tap the pH it could be (four numbers)
//   litmus      a substance with its pH (or its kind): what blue litmus does, and red
//   strength    acid:   tap the strongest acid of three (an alkali may be the trap)
//               alkali: tap the strongest alkali of three (an acid may be the trap)
//               order:  put three or four in order, most acidic first
//   neutralise  drops:    add the other family a drop at a time; stop at green
//               everyday: a deck case — what to add, and which way the pH goes

export const PH_MODES = ['classify', 'colour', 'litmus', 'strength', 'neutralise'];

const ACIDS = idsWhere((s) => s.pH < NEUTRAL);
const NEUTRALS = idsWhere((s) => s.pH === NEUTRAL);
const ALKALIS = idsWhere((s) => s.pH > NEUTRAL);
const BY_KIND = { acid: ACIDS, neutral: NEUTRALS, alkali: ALKALIS };

/** One id per kind, then a substance of that kind: the three answers come up equally often. */
const anySubstance = (rng) => pickFrom(rng, BY_KIND[pickFrom(rng, KINDS)]);

/** `n` ids from `pool` with all-different pH values. */
function distinctPH(rng, pool, n, avoid = []) {
  const out = [];
  const used = new Set(avoid.map((id) => SUBSTANCES[id].pH));
  for (const id of shuffled(rng, pool)) {
    if (out.length === n) break;
    if (!used.has(SUBSTANCES[id].pH)) { out.push(id); used.add(SUBSTANCES[id].pH); }
  }
  return out.length === n ? out : null;
}

function roundClassify(rng) {
  const sub = anySubstance(rng);
  return { mode: 'classify', sub, pH: SUBSTANCES[sub].pH };
}

function roundColour(rng) {
  if (rng() < 0.5) {
    const sub = anySubstance(rng);
    const pH = SUBSTANCES[sub].pH;
    return { mode: 'colour', dir: 'toColour', sub, pH, options: swatchOptions(pH, rng) };
  }
  const pH = PH_MIN + Math.floor(rng() * (PH_MAX - PH_MIN + 1));
  return { mode: 'colour', dir: 'toPH', pH, options: swatchOptions(pH, rng) };
}

function roundLitmus(rng) {
  const sub = anySubstance(rng);
  const pH = SUBSTANCES[sub].pH;
  return { mode: 'litmus', sub, pH, show: rng() < 0.5 ? 'pH' : 'kind', kind: kindOf(pH) };
}

function roundStrength(rng) {
  const ask = pickFrom(rng, ['acid', 'alkali', 'order']);
  if (ask === 'order') {
    const n = rng() < 0.5 ? 3 : 4;
    // across the scale: at least one acid and one alkali, all pH different
    for (;;) {
      const subs = distinctPH(rng, Object.keys(SUBSTANCES), n);
      const pHs = subs.map((id) => SUBSTANCES[id].pH);
      if (pHs.some((p) => p < NEUTRAL) && pHs.some((p) => p > NEUTRAL)) return { mode: 'strength', ask, subs };
    }
  }
  const same = ask === 'acid' ? ACIDS : ALKALIS;
  const other = ask === 'acid' ? ALKALIS : ACIDS;
  // two of the family asked for, and a third: the family again, or the trap —
  // the other family's strongest-looking number.
  const trap = rng() < 0.5;
  const two = distinctPH(rng, same, trap ? 2 : 3);
  const subs = trap ? [...two, pickFrom(rng, other.filter((id) => Math.abs(SUBSTANCES[id].pH - NEUTRAL) >= 4))] : two;
  return { mode: 'strength', ask, subs: shuffled(rng, subs), trap };
}

function roundNeutralise(rng) {
  if (rng() < 0.6) {
    const acid = rng() < 0.5;
    const start = acid ? 1 + Math.floor(rng() * 5) : 9 + Math.floor(rng() * 5);   // 1–5 or 9–13
    return { mode: 'neutralise', ask: 'drops', start, adding: acid ? 'alkali' : 'acid' };
  }
  const c = pickFrom(rng, NEUTRALISE);
  const options = shuffled(rng, [c.fix, ...shuffled(rng, ACID_ADDS).slice(0, 2)]);
  return { mode: 'neutralise', ask: 'everyday', case: c.id, options };
}

export function makePhRound(mode, rng = rngFrom()) {
  switch (mode) {
    case 'classify': return roundClassify(rng);
    case 'colour': return roundColour(rng);
    case 'litmus': return roundLitmus(rng);
    case 'strength': return roundStrength(rng);
    case 'neutralise': return roundNeutralise(rng);
    default: throw new Error(`unknown pH Lab mode "${mode}"`);
  }
}

/** A session: `rounds` rounds cycling through the unit's modes, drawn from `seed`. */
export function makePhSession(config, seed = Date.now()) {
  const rng = rngFrom(seed);
  const modes = (config?.modes || []).filter((m) => PH_MODES.includes(m));
  if (!modes.length) return [];
  const n = Math.max(1, Math.min(16, Number(config?.rounds) || 10));
  const out = [];
  for (let i = 0; i < n; i += 1) out.push(makePhRound(modes[i % modes.length], rng));
  return out;
}

/** The right answer to a round, in the shape `markRound` takes. */
export function answerOf(round) {
  switch (round.mode) {
    case 'classify': return kindOf(round.pH);
    case 'colour': return round.pH;
    case 'litmus': return { blue: litmusDoes('blue', round.kind), red: litmusDoes('red', round.kind) };
    case 'strength': {
      const byPH = [...round.subs].sort((a, b) => SUBSTANCES[a].pH - SUBSTANCES[b].pH);
      if (round.ask === 'order') return byPH;
      if (round.ask === 'acid') return byPH.filter((id) => SUBSTANCES[id].pH < NEUTRAL)[0];
      return byPH.filter((id) => SUBSTANCES[id].pH > NEUTRAL).pop();
    }
    case 'neutralise':
      if (round.ask === 'drops') return { drops: dropsToNeutral(round.start) };
      return { add: caseOf(round.case).fix, way: 'up' };
    default: return null;
  }
}

// ------------------------------------------------------------------ marking
// Every line is { en, vn, fr }. `markRound` → { ok, lines, named, parts? }: first
// the lines that name what was picked (only when it was wrong — `named` of
// them), then the rule.

const nameOf = (id) => SUBSTANCES[id] || ADDS[id] || { en: id, vn: id, fr: id };
const colourLine = (pH) => colourWord(pH);
const Le = (o) => cap(leFrOf(o));

/** "pH 3 is below 7: an acid." — the rule for one number. */
export function ruleLine(pH, sub = null) {
  const k = kindOf(pH);
  const s = strengthOf(pH);
  const who = sub ? nameOf(sub) : null;
  const en = who ? `${cap(who.en)} is pH ${pH}` : `pH ${pH}`;
  const vn = who ? `${cap(who.vn)} có pH ${pH}` : `pH ${pH}`;
  const fr = who ? `${Le(who)} a un pH de ${pH}` : `pH ${pH}`;
  if (k === 'neutral') return { en: `${en} — exactly 7, so it is neutral: not an acid and not an alkali.`, vn: `${vn} — đúng bằng 7, nên trung tính: không phải axit, cũng không phải kiềm.`, fr: `${fr} — exactement 7, donc c'est neutre : ni un acide, ni une base.` };
  const side = KIND_WORDS[k].side;
  const strong = s.level === 'strong' ? { en: ` Near the end of the scale: ${s.en}.`, vn: ` Gần cuối thang: ${s.vn}.`, fr: ` Près du bout de l'échelle : ${s.fr}.` } : { en: '', vn: '', fr: '' };
  return { en: `${en}: ${side.en}, so it is ${s.level ? KIND_WORDS[k].a.en : s.en}.${strong.en}`, vn: `${vn}: ${side.vn}, nên là ${KIND_WORDS[k].a.vn}.${strong.vn}`, fr: `${fr} : ${side.fr}, donc c'est ${KIND_WORDS[k].a.fr}.${strong.fr}` };
}

function markClassify(round, pick) {
  const want = kindOf(round.pH);
  const lines = [];
  if (pick !== want) {
    const p = round.pH;
    if (pick === 'neutral') lines.push({ en: `Neutral is exactly pH 7 — and ${p} is not 7.`, vn: `Trung tính là đúng pH 7 — mà ${p} không phải 7.`, fr: `Neutre, c'est exactement pH 7 — et ${p} n'est pas 7.` });
    else if (want === 'neutral') lines.push({ en: `pH 7 is neither: ${pick === 'acid' ? 'an acid is below 7' : 'an alkali is above 7'}.`, vn: `pH 7 không thuộc nhóm nào: ${pick === 'acid' ? 'axit nhỏ hơn 7' : 'kiềm lớn hơn 7'}.`, fr: `pH 7, ce n'est ni l'un ni l'autre : ${pick === 'acid' ? 'un acide a un pH inférieur à 7' : 'une base a un pH supérieur à 7'}.` });
    else if (pick === 'acid') lines.push({ en: `An acid is below 7, and ${p} is above 7.`, vn: `Axit có pH nhỏ hơn 7, mà ${p} lớn hơn 7.`, fr: `Un acide a un pH inférieur à 7, et ${p} est supérieur à 7.` });
    else lines.push({ en: `An alkali is above 7, and ${p} is below 7.`, vn: `Kiềm có pH lớn hơn 7, mà ${p} nhỏ hơn 7.`, fr: `Une base a un pH supérieur à 7, et ${p} est inférieur à 7.` });
  }
  const named = lines.length;
  lines.push(ruleLine(round.pH, round.sub));
  return { ok: pick === want, lines, named };
}

function markColour(round, pick) {
  const p = round.pH;
  const lines = [];
  const kind = KIND_WORDS[kindOf(p)].a;
  if (pick !== p && isPH(pick)) {
    const c = colourLine(pick);
    const pk = KIND_WORDS[kindOf(pick)].a;
    lines.push(round.dir === 'toPH'
      ? { en: `pH ${pick} would be ${c.en} — ${pk.en}.`, vn: `pH ${pick} sẽ có màu ${c.vn} — ${pk.vn}.`, fr: `pH ${pick} serait ${c.fr} — ${pk.fr}.` }
      : { en: `That swatch is the ${c.en} of pH ${pick} — ${pk.en}.`, vn: `Ô màu đó là màu ${c.vn} của pH ${pick} — ${pk.vn}.`, fr: `Cette couleur, c'est le ${c.fr} du pH ${pick} — ${pk.fr}.` });
  }
  const named = lines.length;
  const c = colourLine(p);
  if (round.dir === 'toPH') lines.push({ en: `This tube is ${c.en}: pH ${p}, ${kind.en}. Red is acid, green is neutral, blue and purple are alkali.`, vn: `Ống này màu ${c.vn}: pH ${p}, ${kind.vn}. Đỏ là axit, xanh lá là trung tính, xanh dương và tím là kiềm.`, fr: `Ce tube est ${c.fr} : pH ${p}, ${kind.fr}. Rouge : acide ; vert : neutre ; bleu et violet : basique.` });
  else {
    const who = nameOf(round.sub);
    lines.push({ en: `${cap(who.en)} is pH ${p}, so universal indicator turns ${c.en}: ${kind.en}.`, vn: `${cap(who.vn)} có pH ${p}, nên chất chỉ thị vạn năng chuyển ${c.vn}: ${kind.vn}.`, fr: `${Le(who)} a un pH de ${p}, donc l'indicateur universel devient ${c.fr} : ${kind.fr}.` });
  }
  return { ok: pick === p, lines, named };
}

function litmusWhy(paper, pick, kind) {
  const P = LITMUS[paper];
  const same = paper === 'red' ? 'rouge' : 'bleu';
  if (pick === paper) return { en: `${P.en} is already ${paper} — it cannot turn ${paper}.`, vn: `${P.vn} vốn đã màu ${paper === 'red' ? 'đỏ' : 'xanh'} — nó không thể chuyển ${paper === 'red' ? 'đỏ' : 'xanh'}.`, fr: `Le ${P.fr.charAt(0).toLowerCase()}${P.fr.slice(1)} est déjà ${same} — il ne peut pas devenir ${same}.` };
  if (paper === 'blue' && pick === 'red') return { en: `Blue litmus turns red only in an acid — this is ${KIND_WORDS[kind].a.en}.`, vn: `Giấy quỳ xanh chỉ chuyển đỏ trong axit — chất này ${kind === 'neutral' ? 'trung tính' : 'là kiềm'}.`, fr: `Le papier tournesol bleu ne devient rouge que dans un acide — ici, c'est ${KIND_WORDS[kind].a.fr}.` };
  if (paper === 'red' && pick === 'blue') return { en: `Red litmus turns blue only in an alkali — this is ${KIND_WORDS[kind].a.en}.`, vn: `Giấy quỳ đỏ chỉ chuyển xanh trong kiềm — chất này ${kind === 'neutral' ? 'trung tính' : 'là axit'}.`, fr: `Le papier tournesol rouge ne devient bleu que dans une base — ici, c'est ${KIND_WORDS[kind].a.fr}.` };
  if (paper === 'blue') return { en: 'An acid turns blue litmus red.', vn: 'Axit làm giấy quỳ xanh chuyển đỏ.', fr: 'Un acide fait devenir rouge le papier tournesol bleu.' };
  return { en: 'An alkali turns red litmus blue.', vn: 'Kiềm làm giấy quỳ đỏ chuyển xanh.', fr: 'Une base fait devenir bleu le papier tournesol rouge.' };
}

/** The litmus rule for one liquid: "an acid: blue turns red, red does not change". */
export function litmusRule(kind, sub = null) {
  const who = sub ? nameOf(sub) : null;
  const b = LITMUS_DOES[litmusDoes('blue', kind)];
  const r = LITMUS_DOES[litmusDoes('red', kind)];
  const a = KIND_WORDS[kind].a;
  return {
    en: `${who ? `${cap(who.en)} is ${a.en}` : cap(a.en)}: blue litmus — ${b.en}; red litmus — ${r.en}.${kind === 'neutral' ? ' A neutral liquid changes neither.' : ''}`,
    vn: `${who ? `${cap(who.vn)} là ${a.vn}` : cap(a.vn)}: giấy quỳ xanh — ${b.vn}; giấy quỳ đỏ — ${r.vn}.${kind === 'neutral' ? ' Chất trung tính không làm giấy nào đổi màu.' : ''}`,
    fr: `${who ? `${Le(who)} est ${a.fr}` : cap(a.fr)} : papier tournesol bleu — ${b.fr} ; papier tournesol rouge — ${r.fr}.${kind === 'neutral' ? " Un liquide neutre ne change la couleur d'aucun des deux." : ''}`,
  };
}

function markLitmus(round, pick = {}) {
  const want = answerOf(round);
  const parts = { blue: pick.blue === want.blue, red: pick.red === want.red };
  const lines = [];
  for (const paper of LITMUS_PAPERS) if (!parts[paper] && pick[paper]) lines.push(litmusWhy(paper, pick[paper], round.kind));
  const named = lines.length;
  lines.push(litmusRule(round.kind, round.sub));
  return { ok: parts.blue && parts.red, parts, lines, named };
}

const phList = (ids) => ids.map((id) => `${nameOf(id).en} (${SUBSTANCES[id].pH})`).join(' → ');
const phListVn = (ids) => ids.map((id) => `${nameOf(id).vn} (${SUBSTANCES[id].pH})`).join(' → ');
const phListFr = (ids) => ids.map((id) => `${nameOf(id).fr} (${SUBSTANCES[id].pH})`).join(' → ');

function markStrength(round, pick) {
  const want = answerOf(round);
  const lines = [];
  if (round.ask === 'order') {
    const ok = Array.isArray(pick) && pick.length === want.length && pick.every((id, i) => id === want[i]);
    if (!ok) lines.push({ en: 'Most acidic first means the SMALLEST pH first.', vn: 'Axit nhất trước nghĩa là pH NHỎ NHẤT đứng trước.', fr: 'Le plus acide en premier, cela veut dire le PLUS PETIT pH en premier.' });
    const named = lines.length;
    lines.push({ en: `${cap(phList(want))}. The smaller the number, the more acidic; the bigger, the more alkaline.`, vn: `${cap(phListVn(want))}. Số càng nhỏ càng axit; số càng lớn càng kiềm.`, fr: `${cap(phListFr(want))}. Plus le nombre est petit, plus c'est acide ; plus il est grand, plus c'est basique.` });
    return { ok, lines, named };
  }
  const w = SUBSTANCES[want];
  if (pick !== want && SUBSTANCES[pick]) {
    const p = SUBSTANCES[pick];
    const pk = kindOf(p.pH);
    if (round.ask === 'acid' && pk !== 'acid') lines.push({ en: `${cap(p.en)} is pH ${p.pH} — ${KIND_WORDS[pk].a.en}, not an acid. A big number is a strong ALKALI.`, vn: `${cap(p.vn)} có pH ${p.pH} — ${pk === 'alkali' ? 'là kiềm' : 'trung tính'}, không phải axit. Số lớn là kiềm MẠNH.`, fr: `${Le(p)} a un pH de ${p.pH} — ${KIND_WORDS[pk].a.fr}, pas un acide. Un grand nombre, c'est une base FORTE.` });
    else if (round.ask === 'alkali' && pk !== 'alkali') lines.push({ en: `${cap(p.en)} is pH ${p.pH} — ${KIND_WORDS[pk].a.en}, not an alkali. A small number is a strong ACID.`, vn: `${cap(p.vn)} có pH ${p.pH} — ${pk === 'acid' ? 'là axit' : 'trung tính'}, không phải kiềm. Số nhỏ là axit MẠNH.`, fr: `${Le(p)} a un pH de ${p.pH} — ${KIND_WORDS[pk].a.fr}, pas une base. Un petit nombre, c'est un acide FORT.` });
    else lines.push({ en: `${cap(p.en)} is pH ${p.pH}, closer to 7 than ${w.en} at pH ${w.pH}.`, vn: `${cap(p.vn)} có pH ${p.pH}, gần 7 hơn ${w.vn} (pH ${w.pH}).`, fr: `${Le(p)} a un pH de ${p.pH}, plus proche de 7 que ${leFrOf(w)} (pH ${w.pH}).` });
  }
  const named = lines.length;
  lines.push(round.ask === 'acid'
    ? { en: `${cap(w.en)}, pH ${w.pH}: the smallest number is the strongest acid.`, vn: `${cap(w.vn)}, pH ${w.pH}: số nhỏ nhất là axit mạnh nhất.`, fr: `${cap(w.fr)}, pH ${w.pH} : le plus petit nombre est l'acide le plus fort.` }
    : { en: `${cap(w.en)}, pH ${w.pH}: the biggest number is the strongest alkali.`, vn: `${cap(w.vn)}, pH ${w.pH}: số lớn nhất là kiềm mạnh nhất.`, fr: `${cap(w.fr)}, pH ${w.pH} : le plus grand nombre est la base la plus forte.` });
  return { ok: pick === want, lines, named };
}

function markDrops(round, pick = {}) {
  const need = dropsToNeutral(round.start);
  const n = Number(pick.drops);
  const now = afterDrops(round.start, n);
  const lines = [];
  // fr: "de base" / "d'acide", after "gouttes"
  const adding = round.adding === 'alkali' ? { en: 'alkali', vn: 'kiềm', fr: 'de base' } : { en: 'acid', vn: 'axit', fr: "d'acide" };
  if (n > need) {
    const c = colourLine(now);
    lines.push({ en: `One drop too many. It was green — pH 7, neutral — before that drop. Now it is ${c.en}: pH ${now}, ${KIND_WORDS[kindOf(now)].a.en}.`, vn: `Thừa một giọt. Trước giọt đó nó màu xanh lá — pH 7, trung tính. Bây giờ nó màu ${c.vn}: pH ${now}, ${KIND_WORDS[kindOf(now)].a.vn}.`, fr: `Une goutte de trop. Avant cette goutte, c'était vert — pH 7, neutre. Maintenant c'est ${c.fr} : pH ${now}, ${KIND_WORDS[kindOf(now)].a.fr}.` });
  } else if (n < need) {
    const c = colourLine(now);
    lines.push({ en: `Not neutral yet: it is still ${c.en} — pH ${now}, ${KIND_WORDS[kindOf(now)].a.en}. Neutral is green.`, vn: `Chưa trung tính: nó vẫn màu ${c.vn} — pH ${now}, ${KIND_WORDS[kindOf(now)].a.vn}. Trung tính là màu xanh lá.`, fr: `Pas encore neutre : c'est encore ${c.fr} — pH ${now}, ${KIND_WORDS[kindOf(now)].a.fr}. Neutre, c'est vert.` });
  }
  const named = lines.length;
  const walk = walkOf(round.start, need).join(' → ');
  lines.push({
    en: `${need} drop${need === 1 ? '' : 's'} of ${adding.en}: pH ${walk}. Each drop moved the pH one step towards 7, and green is neutral.`,
    vn: `${need} giọt ${adding.vn}: pH ${walk}. Mỗi giọt đưa pH một bước về phía 7, và màu xanh lá là trung tính.`,
    fr: `${need} goutte${need === 1 ? '' : 's'} ${adding.fr} : pH ${walk}. Chaque goutte a rapproché le pH de 7 d'un cran, et le vert, c'est neutre.`,
  });
  return { ok: n === need, lines, named };
}

function markEveryday(round, pick = {}) {
  const c = caseOf(round.case);
  const parts = { add: pick.add === c.fix, way: pick.way === 'up' };
  const lines = [];
  if (!parts.add && ADDS[pick.add]) {
    const a = ADDS[pick.add];
    lines.push(a.kind === 'acid'
      ? { en: `${cap(a.en)} is an acid — more acid would make the problem worse.`, vn: `${cap(a.vn)} là axit — thêm axit chỉ làm tệ hơn.`, fr: `${Le(a)} est un acide — plus d'acide aggraverait le problème.` }
      : { en: `${cap(a.en)} is a base too, but it is not the one used here.`, vn: `${cap(a.vn)} cũng là bazơ, nhưng không phải thứ dùng ở đây.`, fr: `${Le(a)} est aussi une base, mais ce n'est pas ce qu'on utilise ici.` });
  }
  if (!parts.way && pick.way) lines.push({ en: 'A base added to an acid moves the pH UP, towards 7.', vn: 'Thêm bazơ vào axit làm pH TĂNG lên, về phía 7.', fr: 'Une base ajoutée à un acide fait MONTER le pH, vers 7.' });
  const named = lines.length;
  lines.push(c.why);
  return { ok: parts.add && parts.way, parts, lines, named };
}

/** Mark one round. `answer` is in the shape `answerOf` returns. */
export function markRound(round, answer) {
  switch (round.mode) {
    case 'classify': return markClassify(round, answer);
    case 'colour': return markColour(round, answer);
    case 'litmus': return markLitmus(round, answer);
    case 'strength': return markStrength(round, answer);
    case 'neutralise': return round.ask === 'drops' ? markDrops(round, answer) : markEveryday(round, answer);
    default: return { ok: false, lines: [], named: 0 };
  }
}

// ------------------------------------------------------------------ the deck activity `ph`
//
//   { id, type: 'ph', ask, substance? | substances?, pH?, within?, prompt, promptVn, promptFr?, explain, explainVn, explainFr? }
//
//   colour  a substance (or a bare pH): tap its universal-indicator colour from
//           four swatches, chosen from the activity id so the slide is the same
//           every visit
//   place   one to four substances: put each on the numbered scale — at its
//           exact pH, or within `within: 1` of it
//   litmus  a substance (or a pH): what blue litmus does, and what red does
//   drops   a beaker at `pH` (or the substance's): add the other family a drop
//           at a time and stop when it is neutral. Overshooting is wrong.
//   show    litmus / drops: 'name' (name only — the student must know the
//           family), 'pH' (the default) or 'kind' (an acid / an alkali)

export const PH_ASKS = ['colour', 'place', 'litmus', 'drops'];

const subsOf = (a) => (Array.isArray(a?.substances) ? a.substances : a?.substance ? [a.substance] : []);

/** What a `ph` activity asks, with its answer — everything derived from the substance or the pH. */
export function activityModel(a) {
  const subs = subsOf(a);
  const sub = subs[0] || null;
  const pH = isPH(a?.pH) ? a.pH : sub && SUBSTANCES[sub] ? SUBSTANCES[sub].pH : null;
  const ask = a?.ask;
  if (ask === 'place') {
    return { ask, subs, within: a.within === 1 ? 1 : 0, answer: Object.fromEntries(subs.map((id) => [id, SUBSTANCES[id]?.pH])) };
  }
  if (pH == null) return { ask, sub, pH: null, answer: null };
  if (ask === 'colour') {
    const round = { mode: 'colour', dir: sub ? 'toColour' : 'toPH', sub, pH, options: swatchOptions(pH, rngFromString(a.id || 'ph-colour')) };
    return { ask, sub, pH, round, answer: pH };
  }
  if (ask === 'litmus') {
    const round = { mode: 'litmus', sub, pH, kind: kindOf(pH), show: 'pH' };
    return { ask, sub, pH, round, answer: answerOf(round) };
  }
  if (ask === 'drops') {
    const round = { mode: 'neutralise', ask: 'drops', start: pH, adding: pH < NEUTRAL ? 'alkali' : 'acid', sub };
    return { ask, sub, pH, round, answer: answerOf(round) };
  }
  return { ask, sub, pH, answer: null };
}

/** Mark a `ph` activity's answer → { ok, lines, parts? }. */
export function markActivity(a, answer) {
  const m = activityModel(a);
  if (m.ask === 'place') {
    const parts = {};
    const lines = [];
    for (const id of m.subs) {
      const at = Number(answer?.[id]);
      const want = m.answer[id];
      parts[id] = Number.isFinite(at) && Math.abs(at - want) <= m.within;
      const s = SUBSTANCES[id];
      if (!parts[id] && Number.isFinite(at)) lines.push({ en: `${cap(s.en)} is pH ${want} — you put it at ${at}.`, vn: `${cap(s.vn)} có pH ${want} — em đặt ở ${at}.`, fr: `${Le(s)} a un pH de ${want} — tu as choisi ${at}.` });
    }
    const named = lines.length;
    for (const id of m.subs) if (parts[id]) lines.push(ruleLine(m.answer[id], id));
    return { ok: m.subs.every((id) => parts[id]), parts, lines, named };
  }
  if (!m.round) return { ok: false, lines: [] };
  return markRound(m.round, answer);
}

/** Problems with a `ph` deck activity (utils/activity.js prefixes "ph "). */
export function checkPhActivity(a) {
  const out = [];
  if (!a || typeof a !== 'object') return ['activity is not an object'];
  if (!PH_ASKS.includes(a.ask)) return [`ask "${a.ask}" — ${PH_ASKS.join('/')}`];
  const subs = subsOf(a);
  for (const id of subs) if (!SUBSTANCES[id]) out.push(`substance "${id}" is not in utils/phLab.js SUBSTANCES (${Object.keys(SUBSTANCES).join(', ')})`);
  if (a.pH !== undefined && !isPH(a.pH)) out.push(`pH ${JSON.stringify(a.pH)} must be a whole number 1–14`);
  if (a.pH !== undefined && subs.length && SUBSTANCES[subs[0]] && SUBSTANCES[subs[0]].pH !== a.pH) out.push(`pH ${a.pH} contradicts ${subs[0]}, which is pH ${SUBSTANCES[subs[0]].pH} — give one or the other`);
  if (a.ask !== 'place' && subs.length > 1) out.push(`${a.ask} takes one substance`);
  // `show` (litmus, drops): what the slide prints about the liquid — its name
  // only (the student must know its family), its pH (default), or its kind.
  if (a.show !== undefined && !['name', 'pH', 'kind'].includes(a.show)) out.push(`show "${a.show}" — name/pH/kind`);
  if (a.show === 'name' && !subs.length) out.push('show "name" needs a substance to name');
  if (a.ask === 'place') {
    if (!subs.length || subs.length > 4) out.push('place needs 1–4 substances');
    if (a.within !== undefined && a.within !== 0 && a.within !== 1) out.push('place within must be 0 (exact) or 1');
    if (a.pH !== undefined) out.push('place takes substances, not a pH');
  } else if (!subs.length && a.pH === undefined) out.push(`${a.ask} needs a substance or a pH`);
  if (a.ask === 'drops') {
    const m = activityModel(a);
    if (m.pH === NEUTRAL) out.push('drops: the beaker is already neutral — start from an acid or an alkali');
    else if (m.pH != null && dropsToNeutral(m.pH) > 6) out.push(`drops: pH ${m.pH} needs ${dropsToNeutral(m.pH)} drops — at most 6 on a slide`);
  }
  if (out.length) return out;
  // the activity must accept its own answer, and reject a wrong one
  try {
    const m = activityModel(a);
    if (!markActivity(a, m.answer).ok) out.push('does not accept its own answer');
    if (a.ask === 'colour' && !(m.round.options.includes(m.pH) && m.round.options.length === 4)) out.push('colour: the swatches do not include the answer');
    if (a.ask === 'drops' && markActivity(a, { drops: m.answer.drops + 1 }).ok) out.push('drops: an overshoot was accepted');
  } catch (e) {
    out.push(`threw: ${e.message}`);
  }
  return out;
}

// ------------------------------------------------------------------ the validator hook

const hex = /^#[0-9a-f]{6}$/i;

/** A wrong answer for a round, to prove the marker rejects it. */
function wrongOf(round) {
  const want = answerOf(round);
  switch (round.mode) {
    case 'classify': return KINDS.find((k) => k !== want);
    case 'colour': return round.options.find((p) => p !== want);
    case 'litmus': return { ...want, blue: want.blue === 'red' ? 'none' : 'red' };
    case 'strength': return round.ask === 'order' ? [...want].reverse() : round.subs.find((id) => id !== want);
    case 'neutralise': return round.ask === 'drops' ? { drops: want.drops + 1 } : { ...want, way: 'down' };
    default: return null;
  }
}

/** Problems with a unit's `phLab` config, and with the engine's own tables. */
export function checkPhConfig(cfg) {
  const out = [];
  if (!cfg || typeof cfg !== 'object') return ['phLab must be an object'];
  if (!cfg.title) out.push('phLab is missing a title');
  const modes = cfg.modes || [];
  if (!Array.isArray(modes) || !modes.length) out.push('phLab.modes must list at least one mode');
  for (const m of modes) if (!PH_MODES.includes(m)) out.push(`phLab mode "${m}" — known modes: ${PH_MODES.join('/')}`);
  if (cfg.rounds !== undefined && !(Number.isInteger(cfg.rounds) && cfg.rounds >= 1 && cfg.rounds <= 16)) out.push('phLab.rounds must be a whole number 1–16');

  // the tables
  if (SCALE.length !== 14 || SCALE.some((c, i) => c.pH !== i + 1 || !hex.test(c.colour) || !c.en || !c.vn || !c.fr)) out.push('phLab SCALE must be pH 1–14 in order, each with a colour and a colour word in every language');
  if (Object.keys(SUBSTANCES).length < 25) out.push(`phLab SUBSTANCES has ${Object.keys(SUBSTANCES).length} — at least 25`);
  for (const [id, s] of Object.entries(SUBSTANCES)) if (!s.en || !s.vn || !s.fr || !isPH(s.pH)) out.push(`phLab substance "${id}" needs en, vn, fr and a whole-number pH 1–14`);
  for (const k of KINDS) if (BY_KIND[k].length < 3) out.push(`phLab needs at least three ${k} substances`);
  for (const c of NEUTRALISE) if (!ADDS[c.fix] || ADDS[c.fix].kind !== 'base' || !c.en || !c.vn || !c.fr || !c.why?.en || !c.why?.vn || !c.why?.fr) out.push(`phLab case "${c.id}" needs a base to add and words in every language`);

  // every mode, dozens of rounds: the marker takes each round's own answer and rejects a wrong one
  try {
    const rng = rngFrom(28);
    for (const m of modes.filter((x) => PH_MODES.includes(x))) {
      for (let i = 0; i < 60; i += 1) {
        const r = makePhRound(m, rng);
        const want = answerOf(r);
        const tag = `phLab ${m} round ${JSON.stringify(r)}`;
        if (!markRound(r, want).ok) out.push(`${tag} does not accept its own answer`);
        if (markRound(r, wrongOf(r)).ok) out.push(`${tag} accepted a wrong answer`);
        if (m === 'colour' && (r.options.length !== 4 || !r.options.includes(r.pH))) out.push(`${tag} has bad swatches`);
        if (m === 'colour' && r.options.some((p, j) => r.options.some((q, k) => k !== j && Math.abs(p - q) < SWATCH_GAP))) out.push(`${tag} has two swatches closer than ${SWATCH_GAP}`);
        if (m === 'strength' && new Set(r.subs.map((id) => SUBSTANCES[id].pH)).size !== r.subs.length) out.push(`${tag} has two substances with the same pH`);
        if (![want, wrongOf(r)].every((a) => markRound(r, a).lines.every((l) => l.en && l.vn && l.fr))) out.push(`${tag} has a line missing a language`);
      }
    }
    if (!tubeSvg(5).includes(phColour(5)) || !stripSvg('blue', 'red').includes('#c0392b')) out.push('phLab drawings do not use the scale colours');
  } catch (e) {
    out.push(`phLab threw: ${e.message}`);
  }
  return [...new Set(out)];
}
