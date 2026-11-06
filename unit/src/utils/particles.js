// src/utils/particles.js
//
// Particles, formulae and names for Science 2.6 (compounds and formulae) and
// 2.7 (compounds and mixtures). One catalogue of substances; everything else
// is derived from a substance's FORMULA:
//
//   which elements, how many atoms of each      parseFormula (utils/chemFormula.js)
//   element or compound                         one kind of atom, or more
//   a box of particles: pure or a mixture,      the set of substances in the box
//     of elements / compounds / both
//   would a magnet pull iron out?               free iron particles in the box
//   what the name tells you                     the catalogue's parts (-ide, -ate,
//                                               mono, di), checked against the formula
//
// The drawings are generated too: a particle is its atoms at fixed offsets
// (a bent water, a straight carbon dioxide, a cross of methane) in the
// colours of the classroom diagrams, and a box scatters particles from a seed
// so every round's picture is new.

import { parseFormula } from './chemFormula.js';
import { elementBySymbol, leFr } from './elements.js';
import { rngFrom } from './labBench.js';

// ------------------------------------------------------------------ atoms

// Fill, stroke, radius — the classroom palette (Science 2.5–2.7 diagrams).
export const ATOM_STYLE = {
  H: ['#ffffff', '#6b7580', 13],
  He: ['#fde2ef', '#be185d', 16],
  C: ['#aab4bc', '#3b444b', 19],
  N: ['#9ec1ea', '#1a5fa8', 19],
  O: ['#f08b82', '#b3261e', 18],
  F: ['#d9f99d', '#4d7c0f', 16],
  Ne: ['#fbcfe8', '#9d174d', 17],
  Na: ['#d9c7ef', '#5c2483', 22],
  Mg: ['#e5e7eb', '#4b5563', 21],
  Al: ['#dbe4ee', '#475569', 21],
  S: ['#efe04a', '#8a7c00', 22],
  Cl: ['#bfe3b5', '#2e7d32', 22],
  Ar: ['#f5d0fe', '#86198f', 19],
  K: ['#ede9fe', '#6d28d9', 24],
  Ca: ['#fef3c7', '#a16207', 23],
  Fe: ['#9ca3af', '#374151', 21],
  Cu: ['#f2b48a', '#b45309', 21],
  Zn: ['#cbd5e1', '#334155', 21],
  Ag: ['#f1f5f9', '#64748b', 21],
  Au: ['#f4cf45', '#9a7400', 21],
  Li: ['#fce7f3', '#9d174d', 20],
};
const styleOf = (el) => ATOM_STYLE[el] || ['#e2e8f0', '#475569', 20];

// ------------------------------------------------------------------ the catalogue
// `atoms`: [element, dx, dy] in bond units (one unit ≈ a bond). Only drawable
// substances carry them. `parts`: how the name is built, for the naming rounds.

const L2 = (a, b) => [[a, -0.5, 0], [b, 0.5, 0]];
const BENT = (mid, end) => [[mid, 0, -0.25], [end, -0.85, 0.45], [end, 0.85, 0.45]];

export const SUBSTANCES = {
  // elements
  He: { en: 'helium', vn: 'heli', fr: 'hélium', atoms: [['He', 0, 0]] },
  Ne: { en: 'neon', vn: 'neon', fr: 'néon', atoms: [['Ne', 0, 0]] },
  Ar: { en: 'argon', vn: 'agon', fr: 'argon', atoms: [['Ar', 0, 0]] },
  Fe: { en: 'iron', vn: 'sắt', fr: 'fer', atoms: [['Fe', 0, 0]], magnetic: true },
  S: { en: 'sulfur', vn: 'lưu huỳnh', fr: 'soufre', atoms: [['S', 0, 0]] },
  Cu: { en: 'copper', vn: 'đồng', fr: 'cuivre', atoms: [['Cu', 0, 0]] },
  Mg: { en: 'magnesium', vn: 'magie', fr: 'magnésium', atoms: [['Mg', 0, 0]] },
  H2: { en: 'hydrogen', vn: 'hiđro', fr: 'dihydrogène', atoms: L2('H', 'H') },
  O2: { en: 'oxygen', vn: 'oxi', fr: 'dioxygène', atoms: L2('O', 'O') },
  N2: { en: 'nitrogen', vn: 'nitơ', fr: 'diazote', atoms: L2('N', 'N') },
  Cl2: { en: 'chlorine', vn: 'clo', fr: 'dichlore', atoms: L2('Cl', 'Cl') },
  // compounds, drawable
  H2O: { en: 'water', vn: 'nước', fr: 'eau', atoms: BENT('O', 'H') },
  CO2: { en: 'carbon dioxide', vn: 'cacbon đioxit', fr: 'dioxyde de carbone', atoms: [['O', -1, 0], ['C', 0, 0], ['O', 1, 0]], parts: ['carbon', 'di', 'oxide'] },
  CO: { en: 'carbon monoxide', vn: 'cacbon monoxit', fr: 'monoxyde de carbone', atoms: L2('C', 'O'), parts: ['carbon', 'mono', 'oxide'] },
  CH4: { en: 'methane', vn: 'metan', fr: 'méthane', atoms: [['C', 0, 0], ['H', -1, 0], ['H', 1, 0], ['H', 0, -1], ['H', 0, 1]] },
  NH3: { en: 'ammonia', vn: 'amoniac', fr: 'ammoniac', atoms: [['N', 0, 0.1], ['H', -0.95, 0.55], ['H', 0.95, 0.55], ['H', 0, -0.95]] },
  HCl: { en: 'hydrogen chloride', vn: 'hiđro clorua', fr: "chlorure d'hydrogène", atoms: L2('H', 'Cl'), parts: ['hydrogen', 'chloride'] },
  SO2: { en: 'sulfur dioxide', vn: 'lưu huỳnh đioxit', fr: 'dioxyde de soufre', atoms: BENT('S', 'O'), parts: ['sulfur', 'di', 'oxide'] },
  H2S: { en: 'hydrogen sulfide', vn: 'hiđro sunfua', fr: "sulfure d'hydrogène", atoms: BENT('S', 'H'), parts: ['hydrogen', 'sulfide'] },
  NaCl: { en: 'sodium chloride', vn: 'natri clorua', fr: 'chlorure de sodium', atoms: L2('Na', 'Cl'), parts: ['sodium', 'chloride'] },
  MgO: { en: 'magnesium oxide', vn: 'magie oxit', fr: 'oxyde de magnésium', atoms: L2('Mg', 'O'), parts: ['magnesium', 'oxide'] },
  CaO: { en: 'calcium oxide', vn: 'canxi oxit', fr: 'oxyde de calcium', atoms: L2('Ca', 'O'), parts: ['calcium', 'oxide'] },
  FeS: { en: 'iron sulfide', vn: 'sắt sunfua', fr: 'sulfure de fer', atoms: L2('Fe', 'S'), parts: ['iron', 'sulfide'] },
  KCl: { en: 'potassium chloride', vn: 'kali clorua', fr: 'chlorure de potassium', atoms: L2('K', 'Cl'), parts: ['potassium', 'chloride'] },
  CaCl2: { en: 'calcium chloride', vn: 'canxi clorua', fr: 'chlorure de calcium', atoms: [['Cl', -1, 0], ['Ca', 0, 0], ['Cl', 1, 0]], parts: ['calcium', 'chloride'] },
  MgCl2: { en: 'magnesium chloride', vn: 'magie clorua', fr: 'chlorure de magnésium', atoms: [['Cl', -1, 0], ['Mg', 0, 0], ['Cl', 1, 0]], parts: ['magnesium', 'chloride'] },
  CuO: { en: 'copper oxide', vn: 'đồng oxit', fr: 'oxyde de cuivre', atoms: L2('Cu', 'O'), parts: ['copper', 'oxide'] },
  // compounds, named but not drawn
  CaCO3: { en: 'calcium carbonate', vn: 'canxi cacbonat', fr: 'carbonate de calcium', parts: ['calcium', 'carbonate'] },
  MgCO3: { en: 'magnesium carbonate', vn: 'magie cacbonat', fr: 'carbonate de magnésium', parts: ['magnesium', 'carbonate'] },
  CuSO4: { en: 'copper sulfate', vn: 'đồng sunfat', fr: 'sulfate de cuivre', parts: ['copper', 'sulfate'] },
  Li2SO4: { en: 'lithium sulfate', vn: 'liti sunfat', fr: 'sulfate de lithium', parts: ['lithium', 'sulfate'] },
  'Ca(NO3)2': { en: 'calcium nitrate', vn: 'canxi nitrat', fr: 'nitrate de calcium', parts: ['calcium', 'nitrate'] },
  NaNO3: { en: 'sodium nitrate', vn: 'natri nitrat', fr: 'nitrate de sodium', parts: ['sodium', 'nitrate'] },
  NaOH: { en: 'sodium hydroxide', vn: 'natri hiđroxit', fr: 'hydroxyde de sodium', parts: ['sodium', 'hydroxide'] },
  KOH: { en: 'potassium hydroxide', vn: 'kali hiđroxit', fr: 'hydroxyde de potassium', parts: ['potassium', 'hydroxide'] },
  LiOH: { en: 'lithium hydroxide', vn: 'liti hiđroxit', fr: 'hydroxyde de lithium', parts: ['lithium', 'hydroxide'] },
  C6H12O6: { en: 'glucose', vn: 'glucozơ', fr: 'glucose' },
  C2H6O: { en: 'ethanol', vn: 'etanol', fr: 'éthanol' },
};

// What each naming part says about the elements (the 2.6 rules).
const PART_ELEMENTS = {
  oxide: ['O'], chloride: ['Cl'], sulfide: ['S'], fluoride: ['F'],
  carbonate: ['C', 'O'], sulfate: ['S', 'O'], nitrate: ['N', 'O'], hydroxide: ['O', 'H'],
};

/** Element → count for a formula, e.g. CaCO3 → { Ca: 1, C: 1, O: 3 } (in written order). */
export function countsOf(formula) {
  const raw = parseFormula(formula);
  const order = [];
  for (const m of String(formula).matchAll(/[A-Z][a-z]?/g)) if (!order.includes(m[0])) order.push(m[0]);
  return order.map((el) => ({ el, n: raw[el] }));
}
export const elementCount = (formula) => countsOf(formula).length;
export const atomTotal = (formula) => countsOf(formula).reduce((s, c) => s + c.n, 0);
export const isCompound = (formula) => elementCount(formula) > 1;

/** A formula with real subscripts, for display: CaCO3 → CaCO₃. */
export function formulaPretty(formula) {
  const sub = '₀₁₂₃₄₅₆₇₈₉';
  return String(formula).replace(/\d/g, (d) => sub[Number(d)]);
}
/** A formula as LaTeX: CaCO3 → \mathrm{CaCO_{3}}. */
export const formulaLatex = (formula) => `\\mathrm{${String(formula).replace(/(\d+)/g, '_{$1}')}}`;

/** Which elements a name says are in the compound, from its parts. */
export function elementsFromName(sub) {
  if (!sub?.parts) return null;
  const out = [];
  for (const part of sub.parts) {
    if (part === 'mono' || part === 'di') continue;
    const direct = Object.values(elementBySymbolMap()).find((e) => e.en === part);
    const els = direct ? [direct.sym] : PART_ELEMENTS[part];
    if (!els) return null;
    for (const e of els) if (!out.includes(e)) out.push(e);
  }
  return out;
}
let SYM_CACHE = null;
function elementBySymbolMap() {
  if (!SYM_CACHE) {
    SYM_CACHE = {};
    for (const sym of Object.keys(ATOM_STYLE).concat(['B', 'Be', 'Li', 'P', 'Si', 'Co', 'Br', 'I', 'Pb'])) {
      const e = elementBySymbol(sym);
      if (e) SYM_CACHE[sym] = e;
    }
  }
  return SYM_CACHE;
}

// ------------------------------------------------------------------ classify a box

/**
 * A box is a list of formulae, one per particle. Its verdict:
 *   { substances, pure, kind: 'element'|'compound'|'mixture',
 *     mixtureOf: 'elements'|'compounds'|'both'|null, magnet }
 */
export function classifyBox(particles) {
  const substances = [...new Set(particles)];
  const compounds = substances.filter(isCompound);
  const elements = substances.filter((f) => !isCompound(f));
  const pure = substances.length === 1;
  const kind = pure ? (compounds.length ? 'compound' : 'element') : 'mixture';
  const mixtureOf = pure ? null : !compounds.length ? 'elements' : !elements.length ? 'compounds' : 'both';
  const magnet = substances.some((f) => SUBSTANCES[f]?.magnetic);
  return { substances, pure, kind, mixtureOf, magnet };
}

// ------------------------------------------------------------------ drawing

const BOND = 30;

/** One particle as an SVG group string, centred on (cx, cy). */
export function particleSvg(formula, cx, cy, { scale = 1, angle = 0 } = {}) {
  const sub = SUBSTANCES[formula];
  if (!sub?.atoms) return '';
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const pts = sub.atoms.map(([el, dx, dy]) => {
    const x = dx * BOND * scale;
    const y = dy * BOND * scale;
    return { el, x: cx + x * cos - y * sin, y: cy + x * sin + y * cos };
  });
  // hydrogen drawn last on top reads badly; draw the biggest atom first
  const order = [...pts].sort((a, b) => styleOf(b.el)[2] - styleOf(a.el)[2]);
  return order.map((p) => {
    const [fill, stroke, r] = styleOf(p.el);
    return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${(r * scale).toFixed(1)}" fill="${fill}" stroke="${stroke}" stroke-width="${(2.5 * scale).toFixed(1)}"/>`;
  }).join('');
}

/** The radius a particle needs, for spacing. */
export function particleRadius(formula, scale = 1) {
  const sub = SUBSTANCES[formula];
  if (!sub?.atoms) return 0;
  return Math.max(...sub.atoms.map(([el, dx, dy]) => Math.hypot(dx, dy) * BOND + styleOf(el)[2])) * scale;
}

/**
 * A box of particles as a standalone SVG. `particles` is a list of formulae;
 * placement comes from `seed`, so the same box always draws the same way.
 * Returns '' if a particle cannot be drawn.
 */
// 400 × 300: at 320 × 240 about one box in fourteen put a particle on top of
// another, which reads as bonded.
export function boxSvg(particles, seed = 1, { w = 400, h = 300, scale = 0.8, label = '' } = {}) {
  if (!particles.every((f) => SUBSTANCES[f]?.atoms)) return '';
  const rng = rngFrom(seed);
  const placed = [];
  const pad = 10;
  let body = '';
  for (const f of particles) {
    const r = particleRadius(f, scale);
    let spot = null;
    for (let tries = 0; tries < 400 && !spot; tries += 1) {
      const x = pad + r + rng() * (w - 2 * (pad + r));
      const y = pad + r + rng() * (h - 2 * (pad + r));
      if (placed.every((p) => Math.hypot(p.x - x, p.y - y) > p.r + r + 4)) spot = { x, y, r };
    }
    if (!spot) spot = { x: pad + r + rng() * (w - 2 * (pad + r)), y: pad + r + rng() * (h - 2 * (pad + r)), r };
    placed.push(spot);
    body += particleSvg(f, spot.x, spot.y, { scale, angle: rng() * Math.PI * 2 });
  }
  const labelSvg = label ? `<text x="${w / 2}" y="${h + 26}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="20" font-weight="800" fill="#334155">${label}</text>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h + (label ? 36 : 0)}"><rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="14" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>${body}${labelSvg}</svg>`;
}

/** One particle, big, as a standalone SVG. */
export function particleCardSvg(formula, { size = 220 } = {}) {
  const r = particleRadius(formula, 1.6);
  const scale = r > size / 2 - 12 ? 1.6 * ((size / 2 - 12) / r) : 1.6;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect x="1" y="1" width="${size - 2}" height="${size - 2}" rx="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>${particleSvg(formula, size / 2, size / 2, { scale })}</svg>`;
}

/** An arbitrary cluster of atoms (the Build It tray), bonded in a row/ring. */
export function clusterSvg(counts, { size = 260 } = {}) {
  const atoms = counts.flatMap(({ el, n }) => Array.from({ length: n }, () => el));
  if (!atoms.length) return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect x="1" y="1" width="${size - 2}" height="${size - 2}" rx="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="8 6"/></svg>`;
  const c = size / 2;
  const scale = atoms.length > 6 ? 0.85 : 1.2;
  let body = '';
  if (atoms.length === 1) {
    const [fill, stroke, r] = styleOf(atoms[0]);
    body = `<circle cx="${c}" cy="${c}" r="${r * 1.6}" fill="${fill}" stroke="${stroke}" stroke-width="3"/>`;
  } else {
    // biggest atom in the middle, the rest round it
    const sorted = [...atoms].sort((a, b) => styleOf(b)[2] - styleOf(a)[2]);
    const [mid, ...ring] = sorted;
    const R = (styleOf(mid)[2] + 16) * scale;
    ring.forEach((el, i) => {
      const a = (i / ring.length) * Math.PI * 2 - Math.PI / 2;
      const [fill, stroke, r] = styleOf(el);
      body += `<circle cx="${(c + Math.cos(a) * R).toFixed(1)}" cy="${(c + Math.sin(a) * R).toFixed(1)}" r="${(r * scale).toFixed(1)}" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>`;
    });
    const [fill, stroke, r] = styleOf(mid);
    body += `<circle cx="${c}" cy="${c}" r="${(r * scale * 1.05).toFixed(1)}" fill="${fill}" stroke="${stroke}" stroke-width="3"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect x="1" y="1" width="${size - 2}" height="${size - 2}" rx="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>${body}</svg>`;
}

/** The atom key under a picture: one swatch per element present. */
export function keyOfElements(symbols) {
  return symbols.map((el) => ({ el, fill: styleOf(el)[0], stroke: styleOf(el)[1], name: elementBySymbol(el) }));
}

// ------------------------------------------------------------------ typed formulae

/**
 * A typed formula against the right one. Order of symbols is not marked
 * (the counts are), but capitals and where the small number goes are.
 */
export function diagnoseFormula(want, typed) {
  const t = String(typed ?? '').replace(/\s+/g, '').replace(/[₀-₉]/g, (d) => String('₀₁₂₃₄₅₆₇₈₉'.indexOf(d)));
  if (!t) return { ok: false, en: 'Type the formula, like H2O.', vn: 'Nhập công thức, ví dụ H2O.', fr: 'Écris la formule, par exemple H2O.' };
  const target = Object.fromEntries(countsOf(want).map((c) => [c.el, c.n]));
  let got = null;
  try { got = parseFormula(t); } catch { got = null; }
  const same = (a, b) => a && Object.keys(a).length === Object.keys(b).length && Object.keys(b).every((k) => a[k] === b[k]);
  if (same(got, target)) {
    if (t.replace(/([A-Za-z)])1(?!\d)/g, '$1') === want && t !== want) return { ok: true, one: true, en: 'Right — but a 1 is never written: no number means one.', vn: 'Đúng — nhưng không viết số 1: không có số nghĩa là một.', fr: "Correct — mais on n'écrit jamais le 1 : pas de nombre veut dire un." };
    return { ok: true, order: t !== want ? want : null };
  }
  if (/^[a-z]/.test(t) || (got && Object.keys(got).some((k) => !elementBySymbol(k)))) {
    return { ok: false, code: 'capitals', en: 'Every symbol starts with a capital letter; a second letter is small (Ca, Cl, Na).', vn: 'Mỗi kí hiệu bắt đầu bằng chữ hoa; chữ thứ hai viết thường (Ca, Cl, Na).', fr: 'Chaque symbole commence par une majuscule ; une deuxième lettre est une minuscule (Ca, Cl, Na).' };
  }
  // the number in front of the symbol it counts: 2HO → H2O
  if (/^\d/.test(t) || /\d[A-Z]/.test(t)) {
    try {
      const moved = t.replace(/(\d+)([A-Z][a-z]?)/g, '$2$1');
      if (same(parseFormula(moved), target)) return { ok: false, code: 'number-place', en: 'The small number goes AFTER the symbol it counts: H₂O means two H atoms.', vn: 'Số nhỏ đứng SAU kí hiệu mà nó đếm: H₂O nghĩa là hai nguyên tử H.', fr: "Le petit nombre se place APRÈS le symbole qu'il compte : H₂O veut dire deux atomes H." };
    } catch { /* fall through */ }
  }
  if (got && Object.keys(got).length === Object.keys(target).length && Object.keys(target).every((k) => got[k])) {
    return { ok: false, code: 'counts', en: `Right elements — count the atoms again: ${countsOf(want).map((c) => `${c.n} ${c.el}`).join(', ')}.`, vn: `Đúng nguyên tố — đếm lại số nguyên tử: ${countsOf(want).map((c) => `${c.n} ${c.el}`).join(', ')}.`, fr: `Bons éléments — recompte les atomes : ${countsOf(want).map((c) => `${c.n} ${c.el}`).join(', ')}.` };
  }
  if (got && Object.keys(got).some((k) => !target[k])) {
    const odd = Object.keys(got).find((k) => !target[k]);
    const e = elementBySymbol(odd);
    return { ok: false, code: 'element', en: `${odd} is ${e ? e.en : 'not in this particle'}. Match each colour to its element in the key.`, vn: `${odd} là ${e ? e.vn : 'không có trong hạt này'}. Khớp mỗi màu với nguyên tố của nó trong chú thích.`, fr: `${e ? `${odd}, c'est ${leFr(e.fr)}` : `${odd} n'est pas dans cette particule`}. Associe chaque couleur à son élément dans la légende.` };
  }
  return { ok: false, code: 'wrong', en: `Count each colour: ${countsOf(want).map((c) => `${c.n} ${c.el}`).join(', ')} → ${formulaPretty(want)}.`, vn: `Đếm từng màu: ${countsOf(want).map((c) => `${c.n} ${c.el}`).join(', ')} → ${formulaPretty(want)}.`, fr: `Compte chaque couleur : ${countsOf(want).map((c) => `${c.n} ${c.el}`).join(', ')} → ${formulaPretty(want)}.` };
}

// ------------------------------------------------------------------ Particle Lab sessions

export const LAB_MODES = ['count', 'formula', 'build', 'name', 'classify', 'pure', 'magnet'];

const pickFrom = (rng, list) => list[Math.floor(rng() * list.length)];
const shuffled = (rng, list) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i -= 1) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

const DRAWABLE_COMPOUNDS = ['H2O', 'CO2', 'CO', 'CH4', 'NH3', 'HCl', 'SO2', 'H2S', 'NaCl', 'MgO', 'CaCl2'];
const GAS_ELEMENTS = ['H2', 'O2', 'N2', 'Cl2', 'He', 'Ne', 'Ar'];
const COUNT_FORMULAE = ['H2O', 'CO2', 'CH4', 'NH3', 'CaCO3', 'MgCO3', 'CuSO4', 'Li2SO4', 'NaOH', 'LiOH', 'CaCl2', 'SO2', 'C6H12O6', 'C2H6O', 'Ca(NO3)2', 'NaNO3'];
const NAME_COMPOUNDS = ['NaCl', 'MgO', 'CaO', 'FeS', 'KCl', 'HCl', 'H2S', 'CuO', 'CaCl2', 'CO', 'CO2', 'SO2', 'CaCO3', 'MgCO3', 'CuSO4', 'Li2SO4', 'Ca(NO3)2', 'NaOH', 'LiOH', 'KOH'];

function boxOf(rng, kind) {
  const n = 5 + Math.floor(rng() * 3);
  if (kind === 'element') { const f = pickFrom(rng, GAS_ELEMENTS); return Array.from({ length: n }, () => f); }
  if (kind === 'compound') { const f = pickFrom(rng, ['H2O', 'CO2', 'CO', 'CH4', 'NH3', 'HCl', 'SO2', 'H2S']); return Array.from({ length: n }, () => f); }
  if (kind === 'mix-elements') { const [a, b] = shuffled(rng, GAS_ELEMENTS).slice(0, 2); return shuffled(rng, [...Array(3).fill(a), ...Array(3).fill(b)]); }
  if (kind === 'mix-compounds') { const [a, b] = shuffled(rng, ['H2O', 'CO2', 'CH4', 'NH3', 'CO', 'SO2']).slice(0, 2); return shuffled(rng, [...Array(3).fill(a), ...Array(2 + Math.floor(rng() * 2)).fill(b)]); }
  // element + compound (air, or oxygen in water vapour)
  const e = pickFrom(rng, ['O2', 'N2', 'H2', 'Ar']);
  const c = pickFrom(rng, ['H2O', 'CO2', 'CH4']);
  return shuffled(rng, [...Array(3).fill(e), ...Array(3).fill(c)]);
}

function roundCount(rng) {
  const f = pickFrom(rng, COUNT_FORMULAE);
  return { mode: 'count', formula: f, counts: countsOf(f), elements: elementCount(f), total: atomTotal(f), name: SUBSTANCES[f] };
}
function roundFormula(rng) {
  const f = pickFrom(rng, [...DRAWABLE_COMPOUNDS, 'O2', 'N2', 'H2']);
  return { mode: 'formula', formula: f, counts: countsOf(f), name: SUBSTANCES[f], svg: particleCardSvg(f) };
}
function roundBuild(rng) {
  const f = pickFrom(rng, ['H2O', 'CO2', 'CH4', 'NH3', 'SO2', 'CO', 'H2S', 'CaCl2', 'O2']);
  const present = countsOf(f).map((c) => c.el);
  const decoys = shuffled(rng, ['H', 'C', 'O', 'N', 'S', 'Cl', 'Na'].filter((e) => !present.includes(e))).slice(0, Math.max(1, 4 - present.length));
  return { mode: 'build', formula: f, counts: countsOf(f), name: SUBSTANCES[f], palette: shuffled(rng, [...present, ...decoys]) };
}
function roundName(rng) {
  const f = pickFrom(rng, NAME_COMPOUNDS);
  const sub = SUBSTANCES[f];
  const want = countsOf(f).map((c) => c.el);
  const decoys = shuffled(rng, ['Na', 'Cl', 'O', 'S', 'C', 'H', 'N', 'Mg', 'Ca', 'K', 'Cu', 'Fe', 'Li'].filter((e) => !want.includes(e))).slice(0, 7 - want.length);
  return { mode: 'name', formula: f, name: sub, answer: want, bank: shuffled(rng, [...want, ...decoys]), fromName: elementsFromName(sub) };
}
function roundClassify(rng, withMixtures) {
  const kinds = withMixtures ? ['element', 'compound', 'mix-elements', 'mix-compounds', 'mix-both'] : ['element', 'compound'];
  const kind = pickFrom(rng, kinds);
  const particles = boxOf(rng, kind);
  return { mode: 'classify', withMixtures, particles, verdict: classifyBox(particles), seed: Math.floor(rng() * 1e9) };
}
function roundPure(rng) {
  const kind = pickFrom(rng, ['element', 'compound', 'mix-elements', 'mix-compounds', 'mix-both']);
  const particles = boxOf(rng, kind);
  return { mode: 'pure', particles, verdict: classifyBox(particles), seed: Math.floor(rng() * 1e9) };
}
function roundMagnet(rng) {
  const kind = pickFrom(rng, ['mixture', 'compound', 'mixture', 'compound', 'other']);
  let particles;
  if (kind === 'mixture') particles = shuffled(rng, [...Array(4).fill('Fe'), ...Array(4).fill('S')]);
  else if (kind === 'compound') particles = Array(6).fill('FeS');
  else particles = shuffled(rng, [...Array(3).fill('Cu'), ...Array(4).fill('S')]);
  return { mode: 'magnet', particles, verdict: classifyBox(particles), seed: Math.floor(rng() * 1e9) };
}

export function makeLabRound(mode, rng = rngFrom(), opts = {}) {
  switch (mode) {
    case 'count': return roundCount(rng);
    case 'formula': return roundFormula(rng);
    case 'build': return roundBuild(rng);
    case 'name': return roundName(rng);
    case 'classify': return roundClassify(rng, opts.mixtures !== false);
    case 'pure': return roundPure(rng);
    case 'magnet': return roundMagnet(rng);
    default: throw new Error(`unknown Particle Lab mode "${mode}"`);
  }
}

export function makeLabSession(config, seed = Date.now()) {
  const rng = rngFrom(seed);
  const modes = (config?.modes || []).filter((m) => LAB_MODES.includes(m));
  const n = Math.max(1, Math.min(16, Number(config?.rounds) || 8));
  const out = [];
  for (let i = 0; i < n; i += 1) out.push(makeLabRound(modes[i % modes.length], rng, { mixtures: config?.mixtures !== false }));
  return out;
}

export function checkLabConfig(cfg) {
  const out = [];
  if (!cfg || typeof cfg !== 'object') return ['particleLab must be an object'];
  if (!cfg.title) out.push('particleLab is missing a title');
  const modes = cfg.modes || [];
  if (!Array.isArray(modes) || !modes.length) out.push('particleLab.modes must list at least one mode');
  for (const m of modes) if (!LAB_MODES.includes(m)) out.push(`particleLab mode "${m}" — known modes: ${LAB_MODES.join('/')}`);
  if (cfg.rounds !== undefined && !(Number(cfg.rounds) >= 1 && Number(cfg.rounds) <= 16)) out.push('particleLab.rounds must be 1–16');
  try {
    const rng = rngFrom(21);
    for (const m of modes.filter((x) => LAB_MODES.includes(x))) {
      for (let i = 0; i < 60; i += 1) {
        const r = makeLabRound(m, rng, { mixtures: cfg.mixtures !== false });
        if (r.formula) {
          if (!SUBSTANCES[r.formula]) out.push(`particleLab: ${r.formula} is not in the catalogue`);
          if (!diagnoseFormula(r.formula, r.formula).ok) out.push(`particleLab: ${r.formula} does not accept itself`);
        }
        if ((m === 'formula') && !r.svg.includes('<circle')) out.push(`particleLab: ${r.formula} drew nothing`);
        if (m === 'name' && r.fromName && r.fromName.slice().sort().join() !== r.answer.slice().sort().join()) out.push(`particleLab: the name "${r.name.en}" says ${r.fromName.join(', ')} but ${r.formula} has ${r.answer.join(', ')}`);
        if (r.particles && !boxSvg(r.particles, r.seed).includes('<circle')) out.push(`particleLab mode "${m}" drew an empty box`);
      }
    }
    // every named compound's name agrees with its formula
    for (const [f, sub] of Object.entries(SUBSTANCES)) {
      const fromName = elementsFromName(sub);
      if (fromName && fromName.slice().sort().join() !== countsOf(f).map((c) => c.el).sort().join()) out.push(`particleLab catalogue: "${sub.en}" does not match ${f}`);
      if (sub.atoms) {
        const drawn = {};
        for (const [el] of sub.atoms) drawn[el] = (drawn[el] || 0) + 1;
        const want = Object.fromEntries(countsOf(f).map((c) => [c.el, c.n]));
        if (JSON.stringify(Object.keys(drawn).sort().map((k) => [k, drawn[k]])) !== JSON.stringify(Object.keys(want).sort().map((k) => [k, want[k]]))) out.push(`particleLab catalogue: the drawing of ${f} has the wrong atoms`);
      }
    }
  } catch (e) {
    out.push(`particleLab threw: ${e.message}`);
  }
  return [...new Set(out)];
}
