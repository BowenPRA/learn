// src/utils/waterCycle.js
//
// Water Journey — Year 7 Science 2.4 The water cycle (WATER_JOURNEY, unit key
// `waterJourney`, deck activity `cycle`). Pure, no React. Spec:
// docs/y7-science/unit2-close-engines.md §3.
//
// THE CYCLE IS A GRAPH. Six PLACES water can be (open water, the atmosphere, a
// cloud, the land, groundwater, a plant) and seven PROCESSES that move it — the
// arrows the deck draws, named as the deck names them. Precipitation is the one
// process with two arrows (rain on the land, rain on open water). Everything a
// round asks is derived from that graph:
//
//   which process an arrow is            ARROWS[i].process
//   is a journey A → B possible in       walk(): follow each process from the
//     this order?                        place the particle is at; precipitation
//                                        branches, so the walk keeps a SET of
//                                        places. Any order that ends at B is
//                                        right — derived, never stored.
//   what happens to the water            PROCESSES[i].state / .heat
//
// cycleSvg() draws the engine's own diagram (sea, land, one cloud, trees, the
// soil band of groundwater, the Sun) at 800 × 470, every arrow a cubic curve
// whose midpoint is its tap target, spaced so the targets never overlap and
// still read on a 375 px phone.

import { rngFrom } from './labBench.js';

// ------------------------------------------------------------------ places

export const PLACES = {
  sea: {
    en: 'open water', vn: 'mặt nước hở', fr: 'eau libre', frThe: "l'eau libre",
    detail: 'the sea, lakes and rivers', detailVn: 'biển, hồ và sông', detailFr: 'la mer, les lacs et les rivières',
    at: { en: 'in open water (the sea)', vn: 'ở mặt nước hở (biển)', fr: "dans l'eau libre (la mer)" },
  },
  air: {
    en: 'the atmosphere', vn: 'khí quyển', fr: "l'atmosphère", frThe: "l'atmosphère",
    detail: 'water vapour in the air', detailVn: 'hơi nước trong không khí', detailFr: "la vapeur d'eau dans l'air",
    at: { en: 'in the atmosphere, as water vapour', vn: 'trong khí quyển, ở dạng hơi nước', fr: "dans l'atmosphère, sous forme de vapeur d'eau" },
  },
  cloud: {
    en: 'a cloud', vn: 'đám mây', fr: 'un nuage', frThe: 'un nuage',
    detail: 'tiny drops of liquid water', detailVn: 'những giọt nước lỏng rất nhỏ', detailFr: "de minuscules gouttes d'eau liquide",
    at: { en: 'in a cloud', vn: 'trong một đám mây', fr: 'dans un nuage' },
  },
  land: {
    en: 'the land', vn: 'mặt đất', fr: 'le sol', frThe: 'le sol',
    detail: 'the ground and the soil', detailVn: 'mặt đất và lớp đất', detailFr: 'la surface de la terre et le sol',
    at: { en: 'on the land', vn: 'trên mặt đất', fr: 'sur le sol' },
  },
  ground: {
    en: 'groundwater', vn: 'nước ngầm', fr: 'nappe phréatique', frThe: 'la nappe phréatique',
    detail: 'water in the soil and rocks', detailVn: 'nước trong đất và đá', detailFr: "l'eau dans le sol et les roches",
    at: { en: 'as groundwater, in the rocks', vn: 'thành nước ngầm, trong lòng đất đá', fr: 'dans la nappe phréatique, dans les roches' },
  },
  plant: {
    en: 'a plant', vn: 'cây', fr: 'une plante', frThe: 'une plante',
    detail: 'its roots, stem and leaves', detailVn: 'rễ, thân và lá của cây', detailFr: 'ses racines, sa tige et ses feuilles',
    at: { en: 'inside a plant', vn: 'bên trong một cái cây', fr: "à l'intérieur d'une plante" },
  },
};

// ------------------------------------------------------------------ processes
// `to` is a list when a process has more than one arrow. `state` is null when
// the water does not change state; `heat` is 'in' (heat energy taken in),
// 'out' (given out) or null. `near` is the process a student most often
// mistakes it for — always one of the four options in an `arrow` round.
// `frThe` is the French name with its article, for sentences; `frPl` marks the
// one whose French name is plural (les précipitations), so its verbs agree.

export const PROCESSES = [
  {
    id: 'evaporation', en: 'evaporation', vn: 'sự bay hơi', fr: 'évaporation', frThe: "l'évaporation", from: 'sea', to: 'air',
    state: { from: 'liquid', to: 'gas' }, heat: 'in', near: 'transpiration',
    short: 'liquid water turning to a gas at its surface — from the sea, a lake or a puddle',
    shortVn: 'nước lỏng chuyển thành khí ở bề mặt — từ biển, hồ hay vũng nước',
    shortFr: "l'eau liquide qui se transforme en gaz à sa surface — depuis la mer, un lac ou une flaque",
    why: 'The Sun heats the sea. Heat energy is transferred to the water particles: they move faster, and some break free from the surface as a gas — water vapour.',
    whyVn: 'Mặt Trời làm nóng biển. Nhiệt năng được truyền cho các hạt nước: chúng chuyển động nhanh hơn, và một số thoát ra khỏi bề mặt thành khí — hơi nước.',
    whyFr: "Le Soleil chauffe la mer. De l'énergie thermique est transférée aux particules d'eau : elles bougent plus vite, et certaines s'échappent de la surface sous forme de gaz — la vapeur d'eau.",
  },
  {
    id: 'transpiration', en: 'transpiration', vn: 'sự thoát hơi nước', fr: 'transpiration', frThe: 'la transpiration', from: 'plant', to: 'air',
    state: { from: 'liquid', to: 'gas' }, heat: 'in', near: 'evaporation',
    short: 'water leaving a plant through its leaves',
    shortVn: 'nước đi ra khỏi cây qua lá',
    shortFr: "l'eau qui sort d'une plante par ses feuilles",
    why: 'Water leaves a plant through its leaves, as water vapour. Like evaporation, the liquid takes in heat energy and becomes a gas.',
    whyVn: 'Nước đi ra khỏi cây qua lá, ở dạng hơi nước. Giống như sự bay hơi, chất lỏng nhận nhiệt năng và trở thành khí.',
    whyFr: "L'eau sort d'une plante par ses feuilles, sous forme de vapeur d'eau. Comme pour l'évaporation, le liquide reçoit de l'énergie thermique et devient un gaz.",
  },
  {
    id: 'condensation', en: 'condensation', vn: 'sự ngưng tụ', fr: 'condensation', frThe: 'la condensation', from: 'air', to: 'cloud',
    state: { from: 'gas', to: 'liquid' }, heat: 'out', near: 'evaporation',
    short: 'water vapour cooling and turning into tiny drops',
    shortVn: 'hơi nước lạnh đi và chuyển thành những giọt nước rất nhỏ',
    shortFr: "la vapeur d'eau qui se refroidit et se transforme en minuscules gouttes",
    why: 'High up, the air is cold. Heat energy is transferred away from the vapour: its particles slow down and pull together into tiny drops of liquid — a cloud.',
    whyVn: 'Trên cao, không khí lạnh. Nhiệt năng được truyền ra khỏi hơi nước: các hạt chậm lại và hút nhau thành những giọt lỏng rất nhỏ — một đám mây.',
    whyFr: "En altitude, l'air est froid. De l'énergie thermique quitte la vapeur : ses particules ralentissent et se rapprochent en minuscules gouttes de liquide — un nuage.",
  },
  {
    id: 'precipitation', en: 'precipitation', vn: 'giáng thủy', fr: 'précipitations', frThe: 'les précipitations', frPl: true, from: 'cloud', to: ['land', 'sea'],
    state: null, heat: null, near: 'condensation',
    short: 'water falling from a cloud — rain, snow, hail or sleet',
    shortVn: 'nước rơi từ đám mây — mưa, tuyết, mưa đá hoặc mưa tuyết',
    shortFr: "l'eau qui tombe d'un nuage — pluie, neige, grêle ou neige fondue",
    why: 'The drops in a cloud join up until they are too heavy for the air to hold, and fall. Rain is liquid in the cloud and still liquid when it lands, so the fall changes no state. Snow and hail froze inside the cloud before they fell; falling does not change them either.',
    whyVn: 'Các giọt nước trong mây nhập lại đến khi quá nặng, không khí không giữ nổi, và chúng rơi xuống. Mưa là chất lỏng trong mây và vẫn là chất lỏng khi chạm đất, nên khi rơi không có sự chuyển thể nào. Tuyết và mưa đá đã đông đặc trong mây trước khi rơi; việc rơi cũng không làm chúng chuyển thể.',
    whyFr: "Les gouttes d'un nuage s'assemblent jusqu'à être trop lourdes pour que l'air les retienne, et elles tombent. La pluie est liquide dans le nuage et toujours liquide quand elle arrive au sol : la chute ne provoque aucun changement d'état. La neige et la grêle ont gelé dans le nuage avant de tomber ; la chute ne les change pas non plus.",
  },
  {
    id: 'runoff', en: 'surface run-off', vn: 'dòng chảy bề mặt', fr: 'ruissellement', frThe: 'le ruissellement', from: 'land', to: 'sea',
    state: null, heat: null, near: 'soaking',
    short: 'water flowing over the ground into rivers',
    shortVn: 'nước chảy trên mặt đất vào sông',
    shortFr: "l'eau qui coule sur le sol jusqu'aux rivières",
    why: 'Rain that does not soak in flows across the ground into rivers, and the rivers carry it to the sea. It carries soil away with it. It is liquid all the way.',
    whyVn: 'Nước mưa không thấm xuống thì chảy trên mặt đất vào sông, và sông đưa nó ra biển. Nó cuốn đất đi theo. Nó là chất lỏng suốt quãng đường.',
    whyFr: "La pluie qui ne s'infiltre pas coule sur le sol jusqu'aux rivières, et les rivières l'emportent jusqu'à la mer. Elle emporte de la terre avec elle. Elle reste liquide tout le long du trajet.",
  },
  {
    id: 'soaking', en: 'soaking in', vn: 'thấm xuống đất', fr: 'infiltration', frThe: "l'infiltration", from: 'land', to: 'ground',
    state: null, heat: null, near: 'runoff',
    short: 'water soaking down into the soil and rocks',
    shortVn: 'nước thấm xuống đất và đá',
    shortFr: "l'eau qui s'enfonce dans le sol et les roches",
    why: 'Rain soaks down through the soil into the rocks and becomes groundwater. It stays a liquid.',
    whyVn: 'Nước mưa thấm xuống qua lớp đất vào trong đá và trở thành nước ngầm. Nó vẫn là chất lỏng.',
    whyFr: "La pluie s'infiltre à travers le sol jusque dans les roches et rejoint la nappe phréatique. Elle reste liquide.",
  },
  {
    id: 'gwflow', en: 'groundwater flow', vn: 'dòng nước ngầm', fr: 'écoulement souterrain', frThe: "l'écoulement souterrain", from: 'ground', to: 'sea',
    state: null, heat: null, near: 'runoff',
    short: 'groundwater moving slowly through the rocks to rivers and the sea',
    shortVn: 'nước ngầm di chuyển chậm qua đất đá ra sông và biển',
    shortFr: "l'eau souterraine qui avance lentement à travers les roches jusqu'aux rivières et à la mer",
    why: 'Groundwater moves slowly through the rocks — it can take years — and seeps out into rivers and the sea. It is liquid all the way.',
    whyVn: 'Nước ngầm di chuyển chậm qua đất đá — có thể mất nhiều năm — rồi rỉ ra sông và biển. Nó là chất lỏng suốt quãng đường.',
    whyFr: "L'eau souterraine avance lentement à travers les roches — cela peut prendre des années — et ressort dans les rivières et la mer. Elle reste liquide tout le long du trajet.",
  },
];

export const PROCESS = Object.fromEntries(PROCESSES.map((p) => [p.id, p]));
const toList = (to) => (Array.isArray(to) ? to : [to]);

/** Every edge of the graph: { process, from, to }. */
export const EDGES = PROCESSES.flatMap((p) => toList(p.to).map((to) => ({ process: p.id, from: p.from, to })));

/** A process name; in Vietnamese and French the English key word follows in brackets (not when it is the same word). */
export function processName(pid, lang = 'en') {
  const p = PROCESS[pid];
  if (!p) return String(pid);
  if (lang === 'vn') return `${p.vn} (${p.en})`;
  if (lang === 'fr') return p.fr && p.fr !== p.en ? `${p.fr} (${p.en})` : p.en;
  return p.en;
}

// French "de" / "à" before a place with its article: du sol, de l'atmosphère,
// d'un nuage · au sol, à l'atmosphère, à un nuage.
const deP = (s) => (s.startsWith('le ') ? `du ${s.slice(3)}` : s.startsWith('les ') ? `des ${s.slice(4)}` : /^[aeiouyhéè]/i.test(s) ? `d'${s}` : `de ${s}`);
const aP = (s) => (s.startsWith('le ') ? `au ${s.slice(3)}` : s.startsWith('les ') ? `aux ${s.slice(4)}` : `à ${s}`);
/** "de l'eau libre à l'atmosphère" — a French route between two places. */
const routeFr = (from, to) => `${deP(PLACES[from].frThe)} ${[].concat(to).map((t) => aP(PLACES[t].frThe)).join(' ou ')}`;

/** "from open water to the atmosphere" — for the lines that name an arrow. */
export function routeOf(pid) {
  const p = PROCESS[pid];
  if (!p) return { en: '', vn: '', fr: '' };
  const to = toList(p.to);
  return {
    en: `from ${PLACES[p.from].en} to ${to.map((t) => PLACES[t].en).join(' or ')}`,
    vn: `từ ${PLACES[p.from].vn} đến ${to.map((t) => PLACES[t].vn).join(' hoặc ')}`,
    fr: routeFr(p.from, to),
  };
}

// ------------------------------------------------------------------ state + heat

export const STATE_OPTIONS = [
  { id: 'lg', en: 'liquid → gas', vn: 'lỏng → khí', fr: 'liquide → gaz' },
  { id: 'gl', en: 'gas → liquid', vn: 'khí → lỏng', fr: 'gaz → liquide' },
  { id: 'none', en: 'no change of state', vn: 'không chuyển thể', fr: "pas de changement d'état" },
];
export const HEAT_OPTIONS = [
  { id: 'in', en: 'heat energy is taken in', vn: 'nhiệt năng được nhận vào', fr: "de l'énergie thermique est absorbée" },
  { id: 'out', en: 'heat energy is given out', vn: 'nhiệt năng được tỏa ra', fr: "de l'énergie thermique est libérée" },
  { id: 'none', en: 'neither — nothing changes state', vn: 'không cái nào — không có gì chuyển thể', fr: "ni l'un ni l'autre — rien ne change d'état" },
];

/** The state-mode answer a process carries: { state: 'lg'|'gl'|'none', heat: 'in'|'out'|'none' }. */
export function stateAnswerOf(pid) {
  const p = PROCESS[pid];
  const state = !p?.state ? 'none' : p.state.from === 'liquid' && p.state.to === 'gas' ? 'lg' : 'gl';
  return { state, heat: p?.heat || 'none' };
}

// ------------------------------------------------------------------ the drawing's arrows
// Each arrow is a cubic Bézier [p0, p1, p2, p3] in the 800 × 470 viewBox; its
// tap target is the curve's midpoint, and a verdict's name chip sits on it
// (the targets are far enough apart that no two chips overlap).

export const VIEW = { w: 800, h: 470 };
export const HIT_R = 44;

export const ARROWS = [
  { id: 'evap', process: 'evaporation', from: 'sea', to: 'air', pts: [[708, 312], [714, 278], [704, 230], [692, 198]] },
  { id: 'transp', process: 'transpiration', from: 'plant', to: 'air', pts: [[160, 106], [178, 86], [208, 70], [252, 58]] },
  { id: 'cond', process: 'condensation', from: 'air', to: 'cloud', pts: [[680, 172], [670, 132], [626, 102], [570, 96]] },
  { id: 'precip_land', process: 'precipitation', from: 'cloud', to: 'land', pts: [[372, 124], [371, 166], [370, 208], [368, 250]] },
  { id: 'precip_sea', process: 'precipitation', from: 'cloud', to: 'sea', pts: [[538, 124], [541, 182], [544, 240], [546, 302]] },
  { id: 'runoff', process: 'runoff', from: 'land', to: 'sea', pts: [[388, 258], [420, 271], [452, 284], [490, 298]] },
  { id: 'soak', process: 'soaking', from: 'land', to: 'ground', pts: [[285, 242], [285, 292], [285, 342], [285, 392]], dashed: true },
  { id: 'gwflow', process: 'gwflow', from: 'ground', to: 'sea', pts: [[300, 416], [380, 428], [452, 424], [530, 410]] },
];
export const ARROW = Object.fromEntries(ARROWS.map((a) => [a.id, a]));
export const arrowsOf = (pid) => ARROWS.filter((a) => a.process === pid);

/** A point on a cubic Bézier. */
export function bezierAt(pts, t) {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return [
    a * pts[0][0] + b * pts[1][0] + c * pts[2][0] + d * pts[3][0],
    a * pts[0][1] + b * pts[1][1] + c * pts[2][1] + d * pts[3][1],
  ];
}

/** An arrow's tap target: the curve's midpoint, rounded. */
export function midOf(arrow) {
  const [x, y] = bezierAt(arrow.pts, 0.5);
  return [Math.round(x), Math.round(y)];
}

/** Where a place's name (and a journey's A / B pill) sits — clear of every arrow. */
export const ANCHORS = {
  sea: [690, 440],
  air: [128, 32],
  cloud: [445, 72],
  land: [420, 362],
  ground: [130, 440],
  plant: [108, 230],
};

// ------------------------------------------------------------------ drawing
// The classroom WATER_CYCLE's palette, cloud and trees, so the student meets a
// picture they have seen. Shapes only, no ids (several copies can sit on one
// page): arrowheads are drawn as triangles, not markers.

const SKY = '#e8f3fb';
const SEA = '#bcdcef';
const SEA_S = '#5f9dc4';
const LAND = '#cfe0c0';
const LAND_S = '#5f7f4a';
const SOIL = '#e7d7bd';
const SOIL_S = '#b79d76';
const WATER = '#5aa9d6';
const BLUE = '#1a5fa8';
const GREEN = '#4a8b23';
const TEAL = '#0087a8';
const KEY = '#c25e12';
const INK = '#2b2b2b';
const GOOD = '#3e9a00';
const BAD = '#e02424';
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";

const COLOUR = {
  evaporation: WATER, transpiration: GREEN, condensation: TEAL, precipitation: WATER,
  runoff: BLUE, soaking: BLUE, gwflow: BLUE,
};
const TONE_COLOUR = { lit: KEY, path: KEY, good: GOOD, bad: BAD };

const f1 = (n) => Number(n.toFixed(1));
const pt = (p) => `${f1(p[0])} ${f1(p[1])}`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Rough width of bold text, for sizing a chip. */
const textW = (s, size) => [...String(s)].reduce((w, ch) => w + (ch === ' ' ? 0.3 : /[ijlI.,'’·]/.test(ch) ? 0.32 : /[mwMW]/.test(ch) ? 0.9 : 0.6), 0) * size;

function chip(cx, cy, text, { colour = KEY, size = 20, fill = '#ffffff', ink } = {}) {
  const w = Math.round(textW(text, size) + size * 1.1);
  const h = Math.round(size * 1.55);
  return `<rect x="${f1(cx - w / 2)}" y="${f1(cy - h / 2)}" width="${w}" height="${h}" rx="${Math.round(h / 2)}" fill="${fill}" stroke="${colour}" stroke-width="2.5"/>`
    + `<text x="${f1(cx)}" y="${f1(cy + size * 0.36)}" font-family="${FONT}" font-size="${size}" font-weight="bold" fill="${ink || colour}" text-anchor="middle">${esc(text)}</text>`;
}

function tree(x, y, s = 0.85) {
  return `<path d="M ${f1(x - 3 * s)} ${y} v ${f1(-15 * s)} h ${f1(6 * s)} v ${f1(15 * s)} Z" fill="#7a5a3a"/>`
    + `<path d="M ${x} ${f1(y - 52 * s)} L ${f1(x + 19 * s)} ${f1(y - 13 * s)} L ${f1(x - 19 * s)} ${f1(y - 13 * s)} Z" fill="#4a8b23" stroke="#2f5f14" stroke-width="2"/>`
    + `<path d="M ${x} ${f1(y - 72 * s)} L ${f1(x + 14 * s)} ${f1(y - 38 * s)} L ${f1(x - 14 * s)} ${f1(y - 38 * s)} Z" fill="#4a8b23" stroke="#2f5f14" stroke-width="2"/>`;
}

// One cloud: the shapes drawn twice — outlined and thick, then white on top —
// so only the outer silhouette keeps a line.
const CLOUD = [
  ['ellipse', 445, 98, 104, 26], ['circle', 380, 84, 30], ['circle', 432, 62, 40],
  ['circle', 492, 68, 34], ['circle', 530, 88, 24],
];
function cloud() {
  const shape = (s, attrs) => (s[0] === 'ellipse'
    ? `<ellipse cx="${s[1]}" cy="${s[2]}" rx="${s[3]}" ry="${s[4]}" ${attrs}/>`
    : `<circle cx="${s[1]}" cy="${s[2]}" r="${s[3]}" ${attrs}/>`);
  return CLOUD.map((s) => shape(s, `fill="${SEA_S}" stroke="${SEA_S}" stroke-width="5"`)).join('')
    + CLOUD.map((s) => shape(s, 'fill="#ffffff"')).join('');
}

function rain(xs) {
  return xs.map((x, i) => `<line x1="${x}" y1="${128 + (i % 2) * 12}" x2="${x - 4}" y2="${146 + (i % 2) * 12}" stroke="${WATER}" stroke-width="3.5" stroke-linecap="round"/>`).join('');
}

function scene() {
  const waves = [[560, 352], [640, 372], [720, 392], [600, 420], [690, 446]]
    .map(([x, y]) => `<path d="M ${x} ${y} q 11 -7 22 0 q 11 7 22 0" fill="none" stroke="${SEA_S}" stroke-width="2.5" stroke-linecap="round"/>`).join('');
  const rocks = [[40, 410], [92, 452], [150, 402], [212, 446], [330, 404], [380, 456], [452, 400], [470, 452]]
    .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="6" fill="#d2bc98"/>`).join('');
  return `<rect x="0" y="0" width="800" height="470" rx="14" fill="${SKY}"/>`
    + `<circle cx="752" cy="52" r="28" fill="#f8cf3c" stroke="#c99a00" stroke-width="3"/>`
    + `<path d="M 500 318 H 800 V 456 Q 800 470 786 470 H 500 Z" fill="${SEA}"/>`
    + `<line x1="500" y1="318" x2="800" y2="318" stroke="${SEA_S}" stroke-width="3"/>${waves}`
    + `<path d="M 0 232 L 110 150 L 200 200 L 500 318 V 470 H 14 Q 0 470 0 456 Z" fill="${LAND}"/>`
    + `<path d="M 0 385 H 500 V 470 H 14 Q 0 470 0 456 Z" fill="${SOIL}"/>${rocks}`
    + `<line x1="0" y1="385" x2="500" y2="385" stroke="${SOIL_S}" stroke-width="2.5" stroke-dasharray="10 7"/>`
    + `<path d="M 0 232 L 110 150 L 200 200 L 500 318" fill="none" stroke="${LAND_S}" stroke-width="3.5" stroke-linejoin="round"/>`
    + `<path d="M 110 150 L 132 162 L 91 164 Z" fill="#ffffff"/>`
    + tree(128, 161) + tree(152, 175) + tree(176, 188)
    + cloud() + rain([336, 352, 392, 408, 506, 522, 560])
    + `<rect x="1" y="1" width="798" height="468" rx="13" fill="none" stroke="#cbd5e1" stroke-width="2"/>`;
}

function arrowSvg(a, tone) {
  const colour = TONE_COLOUR[tone] || COLOUR[a.process];
  const strong = !!TONE_COLOUR[tone];
  const width = strong ? 9 : 7;
  const [p0, p1, p2, p3] = a.pts;
  let dx = p3[0] - p2[0];
  let dy = p3[1] - p2[1];
  const len = Math.hypot(dx, dy) || 1;
  dx /= len; dy /= len;
  const L = strong ? 27 : 24;
  const W = strong ? 15 : 13;
  const base = [p3[0] - dx * L, p3[1] - dy * L];
  const head = `${pt(p3)} ${pt([base[0] - dy * W, base[1] + dx * W])} ${pt([base[0] + dy * W, base[1] - dx * W])}`;
  const d = `M ${pt(p0)} C ${pt(p1)} ${pt(p2)} ${pt(base)}`;
  const dash = a.dashed ? ' stroke-dasharray="14 9"' : '';
  const halo = strong
    ? `<path d="${d}" fill="none" stroke="#ffffff" stroke-width="${width + 7}" stroke-linecap="round"/><polygon points="${head}" fill="#ffffff" stroke="#ffffff" stroke-width="7" stroke-linejoin="round"/>`
    : '';
  const op = tone === 'dim' ? ' opacity="0.28"' : '';
  return `<g${op}>${halo}<path d="${d}" fill="none" stroke="${colour}" stroke-width="${width}" stroke-linecap="round"${dash}/><polygon points="${head}" fill="${colour}"/></g>`;
}

/**
 * The engine's water-cycle diagram as an SVG string (viewBox 0 0 800 470).
 *   highlight  arrow id, or a list — lit in orange; every other arrow dimmed
 *   tones      { [arrowId]: 'lit' | 'good' | 'bad' | 'path' | 'dim' } (wins over highlight)
 *   dimRest    with `tones`, dim the arrows not named (default: true when highlighting)
 *   hit        draw a white target ring at every arrow's midpoint (the tap targets)
 *   labels     true | { places: bool, arrows: [arrowId…] } — name chips (in `lang`)
 *   marks      { A: placeId, B: placeId } — the journey's start and end
 *   numbers    { [arrowId]: n } — step numbers on a journey's arrows
 */
export function cycleSvg({ highlight = null, tones = null, dimRest, hit = false, labels = null, marks = null, numbers = null, lang = 'en' } = {}) {
  const say = (o) => o[lang] || o.en;
  const lit = highlight == null ? [] : [].concat(highlight);
  const tone = {};
  for (const id of lit) tone[id] = 'lit';
  Object.assign(tone, tones || {});
  const dim = dimRest ?? lit.length > 0;
  // Drawn order: the plain arrows first, the toned ones on top.
  const order = [...ARROWS].sort((a, b) => (tone[a.id] && tone[a.id] !== 'dim' ? 1 : 0) - (tone[b.id] && tone[b.id] !== 'dim' ? 1 : 0));
  let body = scene();
  for (const a of order) body += arrowSvg(a, tone[a.id] || (dim ? 'dim' : 'base'));

  const lab = labels === true ? { places: true, arrows: ARROWS.map((a) => a.id) } : labels || {};
  if (lab.places) {
    for (const [id, [x, y]] of Object.entries(ANCHORS)) body += chip(x, y, say(PLACES[id]), { colour: INK, size: 19 });
  }
  for (const id of lab.arrows || []) {
    const a = ARROW[id];
    if (!a) continue;
    const t = tone[id];
    const [x, y] = midOf(a);
    body += chip(x, y, say(PROCESS[a.process]), { colour: TONE_COLOUR[t] || COLOUR[a.process], size: 20 });
  }
  if (hit) {
    for (const a of ARROWS) {
      const [x, y] = midOf(a);
      body += `<circle cx="${x}" cy="${y}" r="15" fill="#ffffff" stroke="${INK}" stroke-width="3"/><circle cx="${x}" cy="${y}" r="5" fill="${INK}"/>`;
    }
  }
  for (const [id, n] of Object.entries(numbers || {})) {
    const a = ARROW[id];
    if (!a) continue;
    const [x, y] = midOf(a);
    body += `<circle cx="${x}" cy="${y}" r="17" fill="${KEY}" stroke="#ffffff" stroke-width="3"/>`
      + `<text x="${x}" y="${y + 7}" font-family="${FONT}" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">${n}</text>`;
  }
  if (marks) {
    for (const [letter, colour] of [['A', TEAL], ['B', KEY]]) {
      const place = marks[letter];
      if (!PLACES[place]) continue;
      const [x, y] = ANCHORS[place];
      body += chip(x, y, `${letter} · ${say(PLACES[place])}`, { colour, size: 20, fill: colour, ink: '#ffffff' });
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW.w} ${VIEW.h}" font-family="${FONT}">${body}</svg>`;
}

// ------------------------------------------------------------------ everyday
// The classroom game WhichStage's twelve cards, and more. `trap` is the wrong
// answer the sentence invites; the two the deck names are the ones to watch:
// anything you can SEE (mist, breath, a cold glass, the white cloud above a
// kettle) is already liquid — condensation; water leaving through plants is
// transpiration, not evaporation.

export const EVERYDAY = [
  // evaporation
  { id: 'puddle', process: 'evaporation', trap: 'soaking',
    en: 'A puddle on the road disappears on a sunny morning.', vn: 'Một vũng nước trên đường biến mất vào một buổi sáng nắng.', fr: 'Une flaque sur la route disparaît par un matin ensoleillé.',
    why: 'Liquid to gas, from the surface of the puddle straight into the air.', whyVn: 'Từ lỏng thành khí, từ bề mặt vũng nước bay thẳng vào không khí.', whyFr: "De liquide à gaz, depuis la surface de la flaque directement dans l'air." },
  { id: 'washing', process: 'evaporation', trap: 'condensation',
    en: 'Wet clothes dry on the line in the sun.', vn: 'Quần áo ướt khô trên dây phơi dưới nắng.', fr: 'Des vêtements mouillés sèchent sur le fil au soleil.',
    why: 'The Sun transfers heat energy to the water, and its particles escape from the cloth as a gas.', whyVn: 'Mặt Trời truyền nhiệt năng cho nước, và các hạt nước thoát ra khỏi vải thành khí.', whyFr: "Le Soleil transfère de l'énergie thermique à l'eau, et ses particules s'échappent du tissu sous forme de gaz." },
  { id: 'sea_warms', process: 'evaporation', trap: 'transpiration',
    en: 'The sea warms up in the sun, and water goes into the air.', vn: 'Biển ấm lên dưới nắng, và nước đi vào không khí.', fr: "La mer se réchauffe au soleil, et de l'eau passe dans l'air.",
    why: 'Most of the water vapour in the air evaporated from the sea.', whyVn: 'Phần lớn hơi nước trong không khí bay hơi từ biển.', whyFr: "La plus grande partie de la vapeur d'eau de l'air s'est évaporée de la mer." },
  { id: 'lake_lower', process: 'evaporation', trap: 'gwflow',
    en: 'In a long dry season with no rain, a lake gets lower and lower.', vn: 'Trong một mùa khô dài không mưa, mặt hồ ngày càng thấp xuống.', fr: "Pendant une longue saison sèche sans pluie, le niveau d'un lac baisse de plus en plus.",
    why: 'Water leaves the surface of the lake as water vapour, and no rain puts it back.', whyVn: 'Nước rời khỏi mặt hồ ở dạng hơi nước, và không có mưa bù lại.', whyFr: "L'eau quitte la surface du lac sous forme de vapeur d'eau, et aucune pluie ne la remplace." },
  // transpiration
  { id: 'rice_field', process: 'transpiration', trap: 'evaporation',
    en: 'A rice field loses water through its rice plants.', vn: 'Ruộng lúa mất nước qua cây lúa.', fr: "Une rizière perd de l'eau par ses plants de riz.",
    why: 'Out through the leaves of the plants — not off the water or the ground. That makes it transpiration.', whyVn: 'Đi ra qua lá cây — không phải từ mặt nước hay mặt đất. Vì vậy đó là sự thoát hơi nước.', whyFr: "Par les feuilles des plantes — pas depuis l'eau ni depuis le sol. C'est donc de la transpiration." },
  { id: 'forest', process: 'transpiration', trap: 'evaporation',
    en: 'A forest puts water vapour into the air on a hot day.', vn: 'Một khu rừng đưa hơi nước vào không khí vào một ngày nóng.', fr: "Une forêt envoie de la vapeur d'eau dans l'air par une journée chaude.",
    why: 'It is water vapour, but it came out of the leaves of the trees.', whyVn: 'Đó là hơi nước, nhưng nó đi ra từ lá cây.', whyFr: "C'est de la vapeur d'eau, mais elle est sortie des feuilles des arbres." },
  { id: 'mango', process: 'transpiration', trap: 'condensation',
    en: 'Water vapour leaves the leaves of a mango tree on a hot afternoon.', vn: 'Hơi nước thoát ra từ lá cây xoài vào một buổi chiều nóng.', fr: "De la vapeur d'eau sort des feuilles d'un manguier par un après-midi chaud.",
    why: 'Water leaving a plant through its leaves is transpiration.', whyVn: 'Nước đi ra khỏi cây qua lá là sự thoát hơi nước.', whyFr: "L'eau qui sort d'une plante par ses feuilles, c'est la transpiration." },
  { id: 'banana', process: 'transpiration', trap: 'evaporation',
    en: 'A banana plantation gives off water vapour through its big leaves.', vn: 'Một vườn chuối thải hơi nước qua những chiếc lá to.', fr: "Une bananeraie rejette de la vapeur d'eau par ses grandes feuilles.",
    why: 'The water comes out of the plants, through their leaves.', whyVn: 'Nước đi ra từ cây, qua lá của chúng.', whyFr: "L'eau sort des plantes, par leurs feuilles." },
  // condensation
  { id: 'iced_coffee', process: 'condensation', trap: 'evaporation',
    en: 'Drops form on the outside of a glass of iced coffee.', vn: 'Giọt nước đọng bên ngoài ly cà phê đá.', fr: "Des gouttes se forment sur l'extérieur d'un verre de café glacé.",
    why: 'Water vapour in the air touched the cold glass, cooled and turned back into liquid. Nothing leaked through the glass.', whyVn: 'Hơi nước trong không khí chạm vào ly lạnh, lạnh đi và trở lại thành chất lỏng. Không có gì thấm qua ly.', whyFr: "La vapeur d'eau de l'air a touché le verre froid, s'est refroidie et est redevenue liquide. Rien n'a traversé le verre." },
  { id: 'cloud_forms', process: 'condensation', trap: 'evaporation',
    en: 'A cloud forms high in the sky.', vn: 'Một đám mây hình thành trên cao.', fr: 'Un nuage se forme haut dans le ciel.',
    why: 'Gas to liquid: a cloud is tiny drops of water, made when vapour cools.', whyVn: 'Từ khí thành lỏng: mây là những giọt nước rất nhỏ, hình thành khi hơi nước lạnh đi.', whyFr: "De gaz à liquide : un nuage, ce sont de minuscules gouttes d'eau, formées quand la vapeur se refroidit." },
  { id: 'mist', process: 'condensation', trap: 'evaporation',
    en: 'Mist lies over a lake at sunrise.', vn: 'Sương mù phủ trên mặt hồ lúc bình minh.', fr: 'De la brume flotte sur un lac au lever du soleil.',
    why: 'You can see it, so it is already liquid: tiny drops of vapour that cooled and condensed.', whyVn: 'Em nhìn thấy được, nên nó đã là chất lỏng: những giọt nhỏ từ hơi nước đã lạnh đi và ngưng tụ.', whyFr: "Tu peux la voir, donc elle est déjà liquide : de minuscules gouttes de vapeur qui s'est refroidie et condensée." },
  { id: 'breath', process: 'condensation', trap: 'evaporation',
    en: 'Your breath makes a little white cloud on a cold morning.', vn: 'Hơi thở của em tạo thành một làn khói trắng nhỏ vào buổi sáng lạnh.', fr: 'Ton souffle fait un petit nuage blanc par un matin froid.',
    why: 'The cold air cooled the water vapour in your breath into tiny drops — that is what you see.', whyVn: 'Không khí lạnh làm hơi nước trong hơi thở lạnh đi thành những giọt nhỏ — đó là thứ em nhìn thấy.', whyFr: "L'air froid a refroidi la vapeur d'eau de ton souffle en minuscules gouttes — c'est ce que tu vois." },
  { id: 'mirror', process: 'condensation', trap: 'evaporation',
    en: 'The bathroom mirror goes misty after a hot shower.', vn: 'Gương phòng tắm bị mờ sau khi tắm nước nóng.', fr: 'Le miroir de la salle de bain se couvre de buée après une douche chaude.',
    why: 'Water vapour from the shower touched the cool mirror and turned into tiny drops.', whyVn: 'Hơi nước từ vòi sen chạm vào tấm gương mát và biến thành những giọt nhỏ.', whyFr: "La vapeur d'eau de la douche a touché le miroir frais et s'est transformée en minuscules gouttes." },
  { id: 'pho_lid', process: 'condensation', trap: 'precipitation',
    en: 'Drops of water collect under the lid of a pot of phở broth.', vn: 'Giọt nước đọng dưới nắp nồi nước dùng phở.', fr: "Des gouttes d'eau se forment sous le couvercle d'une marmite de bouillon de phở.",
    why: 'Water vapour from the hot broth hits the cooler lid and turns back into liquid.', whyVn: 'Hơi nước từ nồi nước dùng nóng chạm vào nắp mát hơn và trở lại thành chất lỏng.', whyFr: "La vapeur d'eau du bouillon chaud touche le couvercle plus frais et redevient liquide." },
  { id: 'dew', process: 'condensation', trap: 'precipitation',
    en: 'Dew covers the grass on a cool, clear morning.', vn: 'Sương đọng trên cỏ vào một buổi sáng mát, trời quang.', fr: "La rosée couvre l'herbe par un matin frais et dégagé.",
    why: 'Dew did not fall from a cloud. Water vapour in the air condensed on the cold grass.', whyVn: 'Sương không rơi từ đám mây. Hơi nước trong không khí ngưng tụ trên cỏ lạnh.', whyFr: "La rosée n'est pas tombée d'un nuage. La vapeur d'eau de l'air s'est condensée sur l'herbe froide." },
  { id: 'kettle_cloud', process: 'condensation', trap: 'evaporation',
    en: 'A white cloud appears a little way above the spout of a boiling kettle.', vn: 'Một làn khói trắng xuất hiện cách vòi ấm đang sôi một khoảng nhỏ.', fr: "Un nuage blanc apparaît un peu au-dessus du bec d'une bouilloire qui bout.",
    why: 'The white cloud is tiny drops: the invisible vapour cooled and condensed. Right at the spout, where you see nothing, is the gas.', whyVn: 'Làn khói trắng là những giọt nước nhỏ: hơi nước vô hình đã lạnh đi và ngưng tụ. Ngay sát vòi ấm, nơi em không thấy gì, mới là chất khí.', whyFr: "Le nuage blanc, ce sont de minuscules gouttes : la vapeur invisible s'est refroidie et condensée. Juste au bec, là où tu ne vois rien, c'est le gaz." },
  // precipitation
  { id: 'hanoi_rain', process: 'precipitation', trap: 'condensation',
    en: 'Rain falls on Hà Nội.', vn: 'Mưa rơi xuống Hà Nội.', fr: 'La pluie tombe sur Hà Nội.',
    why: 'Water falling from a cloud.', whyVn: 'Nước rơi từ đám mây.', whyFr: "De l'eau qui tombe d'un nuage." },
  { id: 'hail', process: 'precipitation', trap: 'condensation',
    en: 'Hail bounces off the road in a storm.', vn: 'Mưa đá nảy trên mặt đường trong cơn bão.', fr: 'La grêle rebondit sur la route pendant un orage.',
    why: 'Rain, snow, hail and sleet are all water falling from clouds — all precipitation.', whyVn: 'Mưa, tuyết, mưa đá và mưa tuyết đều là nước rơi từ mây — đều là giáng thủy.', whyFr: "La pluie, la neige, la grêle et la neige fondue, c'est de l'eau qui tombe des nuages — ce sont toutes des précipitations." },
  { id: 'sapa_snow', process: 'precipitation', trap: 'condensation',
    en: 'Snow lands on a mountain in Sa Pa.', vn: 'Tuyết rơi xuống núi ở Sa Pa.', fr: 'La neige tombe sur une montagne à Sa Pa.',
    why: 'It is frozen, but it still fell from a cloud: precipitation.', whyVn: 'Nó đã đông đặc, nhưng vẫn rơi từ đám mây: giáng thủy.', whyFr: "Elle est gelée, mais elle est quand même tombée d'un nuage : ce sont des précipitations." },
  { id: 'halong', process: 'precipitation', trap: 'runoff',
    en: 'Rain falls straight into Hạ Long Bay.', vn: 'Mưa rơi thẳng xuống vịnh Hạ Long.', fr: "La pluie tombe directement dans la baie d'Hạ Long.",
    why: 'Water falling from a cloud — this time into open water.', whyVn: 'Nước rơi từ đám mây — lần này rơi xuống mặt nước hở.', whyFr: "De l'eau qui tombe d'un nuage — cette fois dans l'eau libre." },
  { id: 'sleet', process: 'precipitation', trap: 'condensation',
    en: 'Sleet falls on a cold, windy day.', vn: 'Mưa tuyết rơi vào một ngày lạnh, nhiều gió.', fr: 'De la neige fondue tombe par une journée froide et venteuse.',
    why: 'Sleet is rain and snow falling together — precipitation.', whyVn: 'Mưa tuyết là mưa và tuyết rơi cùng lúc — giáng thủy.', whyFr: "La neige fondue, c'est de la pluie et de la neige qui tombent ensemble — des précipitations." },
  // on the ground
  { id: 'hillside', process: 'runoff', trap: 'soaking',
    en: 'In a storm, muddy water rushes down a bare hillside into a river.', vn: 'Trong cơn bão, nước bùn chảy xiết xuống sườn đồi trọc vào sông.', fr: "Pendant un orage, de l'eau boueuse dévale une colline sans arbres jusqu'à une rivière.",
    why: 'Water flowing across the ground into a river — and carrying the soil with it.', whyVn: 'Nước chảy trên mặt đất vào sông — và cuốn đất đi theo.', whyFr: "De l'eau qui coule sur le sol jusqu'à une rivière — en emportant la terre avec elle." },
  { id: 'street', process: 'runoff', trap: 'gwflow',
    en: 'Rain runs along the street, into the drains and on to the river.', vn: 'Nước mưa chảy dọc con đường, vào cống rồi ra sông.', fr: "La pluie coule le long de la rue, dans les égouts, puis jusqu'à la rivière.",
    why: 'It flows over the surface to a river instead of soaking in.', whyVn: 'Nó chảy trên bề mặt ra sông thay vì thấm xuống.', whyFr: "Elle coule en surface jusqu'à une rivière au lieu de s'infiltrer." },
  { id: 'coffee_farm', process: 'soaking', trap: 'runoff',
    en: 'Rain soaks into the soil of a coffee farm in Đắk Lắk.', vn: 'Nước mưa thấm vào đất của một nông trại cà phê ở Đắk Lắk.', fr: "La pluie s'infiltre dans le sol d'une plantation de café à Đắk Lắk.",
    why: 'Down through the soil and into the rocks: it becomes groundwater.', whyVn: 'Thấm xuống qua lớp đất vào trong đá: nó trở thành nước ngầm.', whyFr: 'À travers le sol et jusque dans les roches : elle rejoint la nappe phréatique.' },
  { id: 'terraces', process: 'soaking', trap: 'runoff',
    en: 'Terraced rice fields hold the rain back, so it sinks into the ground.', vn: 'Ruộng bậc thang giữ nước mưa lại, nên nước thấm xuống đất.', fr: "Les rizières en terrasses retiennent la pluie, alors elle s'enfonce dans le sol.",
    why: 'Held back, the water has time to soak in instead of running off.', whyVn: 'Được giữ lại, nước có thời gian thấm xuống thay vì chảy đi.', whyFr: "Retenue, l'eau a le temps de s'infiltrer au lieu de ruisseler." },
  { id: 'spring', process: 'gwflow', trap: 'runoff',
    en: 'Water that soaked into a hill years ago seeps out of the rocks into a stream.', vn: 'Nước đã thấm vào một ngọn đồi từ nhiều năm trước rỉ ra khỏi đá vào một con suối.', fr: "De l'eau infiltrée dans une colline il y a des années ressort des roches dans un ruisseau.",
    why: 'Groundwater moving slowly through the rocks, back to rivers and the sea.', whyVn: 'Nước ngầm di chuyển chậm qua đất đá, trở lại sông và biển.', whyFr: "De l'eau souterraine qui avance lentement à travers les roches, jusqu'aux rivières et à la mer." },
];
export const EVERYDAY_BY_ID = Object.fromEntries(EVERYDAY.map((e) => [e.id, e]));

// ------------------------------------------------------------------ walking the graph

/** The places a particle can be after `pid`, from any of `places`. */
function stepFrom(places, pid) {
  const out = new Set();
  for (const e of EDGES) if (e.process === pid && places.has(e.from)) out.add(e.to);
  return out;
}

/**
 * Walk a particle from `from` through `order`. Precipitation branches, so the
 * walk carries every place the particle could be. → { ok, stuck, at }:
 * `stuck` is the index of the first process that cannot happen where the
 * particle is (null if none); `at` is where it could be when the walk stopped.
 */
export function walk(from, to, order) {
  let at = new Set([from]);
  for (let i = 0; i < order.length; i += 1) {
    const next = stepFrom(at, order[i]);
    if (!next.size) return { ok: false, stuck: i, at: [...at] };
    at = next;
  }
  return { ok: at.has(to), stuck: null, at: [...at] };
}

function permutations(list) {
  if (list.length <= 1) return [list.slice()];
  const out = [];
  list.forEach((x, i) => {
    for (const rest of permutations([...list.slice(0, i), ...list.slice(i + 1)])) out.push([x, ...rest]);
  });
  return out;
}

/** Every order of `steps` that takes a particle from `from` to `to`. */
export function validOrders(from, to, steps) {
  return permutations(steps).filter((o) => walk(from, to, o).ok);
}

/** The arrow ids a valid order travels (one per step), or null — for drawing the path. */
export function pathArrows(from, to, order) {
  const go = (place, i) => {
    if (i === order.length) return place === to ? [] : null;
    for (const a of ARROWS) {
      if (a.process !== order[i] || a.from !== place) continue;
      const rest = go(a.to, i + 1);
      if (rest) return [a.id, ...rest];
    }
    return null;
  };
  return go(from, 0);
}

// ------------------------------------------------------------------ rounds

export const MODES = ['arrow', 'tap', 'journey', 'state', 'everyday'];
export const CYCLE_ASKS = ['tap', 'arrow', 'journey'];

const pick = (rng, list) => list[Math.floor(rng() * list.length)];
function shuffle(rng, list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i -= 1) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const sameList = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);

/** Four process options: the right one, the likely mistake, two more. */
function optionsFor(rng, right, trap) {
  const opts = [right];
  if (trap && trap !== right && PROCESS[trap]) opts.push(trap);
  for (const id of shuffle(rng, PROCESSES.map((p) => p.id))) {
    if (opts.length >= 4) break;
    if (!opts.includes(id)) opts.push(id);
  }
  return shuffle(rng, opts);
}

/** A bank order that is not itself a right answer (so tapping in order never scores). */
function bankFor(rng, from, to, steps) {
  let bank = shuffle(rng, steps);
  for (let i = 0; i < 30 && walk(from, to, bank).ok; i += 1) bank = shuffle(rng, steps);
  if (walk(from, to, bank).ok) bank = [...bank.slice(1), bank[0]];
  return bank;
}

function roundJourney(rng) {
  for (let tries = 0; tries < 200; tries += 1) {
    const n = rng() < 0.5 ? 3 : 4;
    const from = pick(rng, Object.keys(PLACES));
    let place = from;
    const used = [];
    for (let i = 0; i < n; i += 1) {
      const choices = ARROWS.filter((a) => a.from === place && !used.includes(a.process));
      if (!choices.length) break;
      const a = pick(rng, choices);
      used.push(a.process);
      place = a.to;
    }
    if (used.length !== n) continue;
    return { mode: 'journey', from, to: place, steps: used, bank: bankFor(rng, from, place, used) };
  }
  throw new Error('no journey could be drawn');
}

export function makeJourneyRound(mode, rng = rngFrom()) {
  switch (mode) {
    case 'arrow': {
      const arrow = pick(rng, ARROWS);
      return { mode, arrow: arrow.id, process: arrow.process, options: optionsFor(rng, arrow.process, PROCESS[arrow.process].near) };
    }
    case 'tap': return { mode, process: pick(rng, PROCESSES).id };
    case 'journey': return roundJourney(rng);
    case 'state': return { mode, process: pick(rng, PROCESSES).id };
    case 'everyday': {
      const item = pick(rng, EVERYDAY);
      return { mode, item: item.id, process: item.process, options: optionsFor(rng, item.process, item.trap) };
    }
    default: throw new Error(`unknown Water Journey mode "${mode}"`);
  }
}

const signature = (r) => (r.mode === 'journey' ? `j:${r.from}:${r.to}:${[...r.steps].sort().join()}`
  : r.mode === 'arrow' ? `a:${r.arrow}` : r.mode === 'everyday' ? `e:${r.item}` : `${r.mode}:${r.process}`);

/** A session: `rounds` rounds cycling through the config's modes, no round twice. */
export function makeJourneySession(config, seed = Date.now()) {
  const rng = rngFrom(seed);
  const modes = (config?.modes || []).filter((m) => MODES.includes(m));
  if (!modes.length) return [];
  const n = Math.max(1, Math.min(16, Number(config?.rounds) || 10));
  const seen = new Set();
  const out = [];
  for (let i = 0; i < n; i += 1) {
    let r = makeJourneyRound(modes[i % modes.length], rng);
    for (let k = 0; k < 30 && seen.has(signature(r)); k += 1) r = makeJourneyRound(modes[i % modes.length], rng);
    seen.add(signature(r));
    out.push(r);
  }
  return out;
}

/** The round's own right answer (the validator proves the marker accepts it). */
export function answerOf(round) {
  switch (round.mode) {
    case 'arrow': case 'everyday': return round.process;
    case 'tap': return arrowsOf(round.process)[0]?.id;
    case 'journey': return [...round.steps];
    case 'state': return stateAnswerOf(round.process);
    default: return null;
  }
}

// ------------------------------------------------------------------ marking

const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);
const why = (p) => ({ en: p.why, vn: p.whyVn, fr: p.whyFr });

/**
 * Mark one round. → { ok, lines: [{ en, vn, fr }], … }. A wrong answer is answered
 * by name first — what the chosen process really is, or where the walk broke —
 * then the right answer's why.
 */
export function markRound(round, answer) {
  const right = PROCESS[round.process];
  if (round.mode === 'arrow' || round.mode === 'everyday') {
    const ok = answer === round.process;
    const chosen = PROCESS[answer];
    const lines = [];
    if (!ok && chosen) lines.push({ en: `Not ${chosen.en}: that is ${chosen.short}.`, vn: `Không phải ${chosen.vn}: đó là ${chosen.shortVn}.`, fr: `Ce n'est pas ${chosen.frThe} — ${chosen.frThe}, c'est ${chosen.shortFr}.` });
    if (round.mode === 'arrow') {
      const a = ARROW[round.arrow];
      lines.push({
        en: `This arrow goes from ${PLACES[a.from].en} to ${PLACES[a.to].en}: ${right.en}.`,
        vn: `Mũi tên này đi từ ${PLACES[a.from].vn} đến ${PLACES[a.to].vn}: ${right.vn}.`,
        fr: `Cette flèche va ${routeFr(a.from, a.to)} : ${right.frThe}.`,
      });
      lines.push(why(right));
    } else {
      const item = EVERYDAY_BY_ID[round.item];
      lines.push({ en: `${cap(right.en)}. ${item.why}`, vn: `${cap(right.vn)}. ${item.whyVn}`, fr: `${cap(right.frThe)}. ${item.whyFr}` });
    }
    return { ok, lines };
  }
  if (round.mode === 'tap') {
    const tapped = ARROW[answer];
    const ok = !!tapped && tapped.process === round.process;
    const lines = [];
    if (!ok && tapped) {
      const p = PROCESS[tapped.process];
      lines.push({
        en: `You tapped ${p.en}: the arrow from ${PLACES[tapped.from].en} to ${PLACES[tapped.to].en}.`,
        vn: `Em đã chạm vào ${p.vn}: mũi tên từ ${PLACES[tapped.from].vn} đến ${PLACES[tapped.to].vn}.`,
        fr: `Tu as touché ${p.frThe} : la flèche ${routeFr(tapped.from, tapped.to)}.`,
      });
    }
    const r = routeOf(round.process);
    lines.push({ en: `${cap(right.en)} goes ${r.en}.`, vn: `${cap(right.vn)} đi ${r.vn}.`, fr: `${cap(right.frThe)} : ${r.fr}.` }, why(right));
    return { ok, lines };
  }
  if (round.mode === 'state') {
    const want = stateAnswerOf(round.process);
    const parts = { state: answer?.state === want.state, heat: answer?.heat === want.heat };
    const s = STATE_OPTIONS.find((o) => o.id === want.state);
    const h = HEAT_OPTIONS.find((o) => o.id === want.heat);
    const first = want.state === 'none'
      ? { en: `${cap(right.en)}: no change of state, so heat energy is neither taken in nor given out.`, vn: `${cap(right.vn)}: không chuyển thể, nên nhiệt năng không được nhận vào cũng không tỏa ra.`, fr: `${cap(right.fr)} : pas de changement d'état, donc l'énergie thermique n'est ni absorbée ni libérée.` }
      : { en: `${cap(right.en)}: ${s.en}; ${h.en}.`, vn: `${cap(right.vn)}: ${s.vn}; ${h.vn}.`, fr: `${cap(right.fr)} : ${s.fr} ; ${h.fr}.` };
    const lines = [first, why(right)];
    return { ok: parts.state && parts.heat, parts, lines };
  }
  // journey
  const order = Array.isArray(answer) ? answer : [];
  const perm = order.length === round.steps.length && [...order].sort().join() === [...round.steps].sort().join();
  const w = perm ? walk(round.from, round.to, order) : { ok: false, stuck: null, at: [] };
  const ok = perm && w.ok;
  const lines = [];
  const name = (pid) => PROCESS[pid];
  if (!ok && perm) {
    if (w.stuck != null) {
      const p = name(order[w.stuck]);
      const here = w.at.map((pl) => PLACES[pl]);
      lines.push({
        en: `Step ${w.stuck + 1}, ${p.en}, cannot happen there: the particle is ${here.map((h) => h.at.en).join(' or ')}, but ${p.en} starts ${PLACES[p.from].at.en}.`,
        vn: `Bước ${w.stuck + 1}, ${p.vn}, không thể xảy ra ở đó: hạt nước đang ${here.map((h) => h.at.vn).join(' hoặc ')}, nhưng ${p.vn} bắt đầu ${PLACES[p.from].at.vn}.`,
        fr: `Étape ${w.stuck + 1} : ${p.frThe} ${p.frPl ? 'sont impossibles' : 'est impossible'} ici. La particule est ${here.map((h) => h.at.fr).join(' ou ')}, mais ${p.frThe} ${p.frPl ? 'commencent' : 'commence'} ${PLACES[p.from].at.fr}.`,
      });
    } else {
      lines.push({
        en: `That order ends ${w.at.map((pl) => PLACES[pl].at.en).join(' or ')}, not ${PLACES[round.to].at.en}.`,
        vn: `Thứ tự đó kết thúc ${w.at.map((pl) => PLACES[pl].at.vn).join(' hoặc ')}, không phải ${PLACES[round.to].at.vn}.`,
        fr: `Cet ordre se termine ${w.at.map((pl) => PLACES[pl].at.fr).join(' ou ')}, pas ${PLACES[round.to].at.fr}.`,
      });
    }
  }
  const shown = ok ? order : round.steps;
  lines.push({
    en: `${ok ? 'Your order' : 'A right order'}: ${shown.map((pid) => name(pid).en).join(' → ')}.`,
    vn: `${ok ? 'Thứ tự của em' : 'Một thứ tự đúng'}: ${shown.map((pid) => name(pid).vn).join(' → ')}.`,
    fr: `${ok ? 'Ton ordre' : 'Un ordre correct'} : ${shown.map((pid) => name(pid).fr).join(' → ')}.`,
  });
  return { ok, lines, path: pathArrows(round.from, round.to, shown) };
}

// ------------------------------------------------------------------ the deck activity
// { id, type: 'cycle', ask: 'tap' | 'arrow' | 'journey', process?, arrow?,
//   options?, from?, to?, steps?, prompt, promptVn, promptFr?, explain, explainVn, explainFr? }
// One round, fixed by the activity; anything shuffled is seeded by its id so
// the slide looks the same on every visit.

const hashOf = (s) => {
  let h = 2166136261;
  for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  return h || 1;
};

/** The round a `cycle` activity stands for. */
export function activityRound(a) {
  const rng = rngFrom(hashOf(a?.id || 'cycle'));
  if (a?.ask === 'arrow') {
    const arrow = a.arrow ? ARROW[a.arrow] : arrowsOf(a.process)[0];
    if (!arrow) return null;
    const options = Array.isArray(a.options) ? [...a.options] : optionsFor(rng, arrow.process, PROCESS[arrow.process].near);
    return { mode: 'arrow', arrow: arrow.id, process: arrow.process, options };
  }
  if (a?.ask === 'journey') {
    const steps = a.steps || [];
    return { mode: 'journey', from: a.from, to: a.to, steps: [...steps], bank: bankFor(rng, a.from, a.to, steps) };
  }
  if (!PROCESS[a?.process]) return null;
  return { mode: 'tap', process: a.process };
}

// ------------------------------------------------------------------ checks

/** Problems with the catalogue itself — the graph, the drawing, EVERYDAY. */
export function catalogueProblems() {
  const out = [];
  const places = Object.keys(PLACES);
  for (const [id, p] of Object.entries(PLACES)) {
    if (!p.en || !p.vn || !p.fr || !p.frThe || !p.at?.en || !p.at?.vn || !p.at?.fr) out.push(`place ${id} needs en/vn/fr/frThe and an "at" in every language`);
    if (!ANCHORS[id]) out.push(`place ${id} has no anchor in the drawing`);
  }
  const ids = new Set();
  for (const p of PROCESSES) {
    if (ids.has(p.id)) out.push(`duplicate process ${p.id}`);
    ids.add(p.id);
    for (const k of ['en', 'vn', 'fr', 'frThe', 'short', 'shortVn', 'shortFr', 'why', 'whyVn', 'whyFr']) if (!p[k]) out.push(`process ${p.id} needs ${k}`);
    if (!places.includes(p.from)) out.push(`process ${p.id} starts at unknown place ${p.from}`);
    for (const t of toList(p.to)) if (!places.includes(t)) out.push(`process ${p.id} ends at unknown place ${t}`);
    if (!['in', 'out', null].includes(p.heat)) out.push(`process ${p.id} heat must be in, out or null`);
    if ((p.state === null) !== (p.heat === null)) out.push(`process ${p.id}: a change of state takes in or gives out heat, and only then`);
    if (p.near && !PROCESS[p.near]) out.push(`process ${p.id} near "${p.near}" is not a process`);
    // every edge drawn exactly once
    for (const t of toList(p.to)) {
      const n = ARROWS.filter((a) => a.process === p.id && a.from === p.from && a.to === t).length;
      if (n !== 1) out.push(`process ${p.id} ${p.from} → ${t} is drawn ${n} times`);
    }
  }
  for (const a of ARROWS) {
    if (!EDGES.some((e) => e.process === a.process && e.from === a.from && e.to === a.to)) out.push(`arrow ${a.id} is not an edge of ${a.process}`);
    const [x, y] = midOf(a);
    if (x < HIT_R || y < HIT_R || x > VIEW.w - HIT_R || y > VIEW.h - HIT_R) out.push(`arrow ${a.id} target (${x}, ${y}) is too near the edge`);
  }
  for (let i = 0; i < ARROWS.length; i += 1) {
    for (let j = i + 1; j < ARROWS.length; j += 1) {
      const [ax, ay] = midOf(ARROWS[i]);
      const [bx, by] = midOf(ARROWS[j]);
      if (Math.hypot(ax - bx, ay - by) < 2 * HIT_R) out.push(`arrows ${ARROWS[i].id} and ${ARROWS[j].id}: tap targets overlap`);
    }
  }
  if (EVERYDAY.length < 20) out.push(`EVERYDAY has ${EVERYDAY.length} sentences — at least 20`);
  const eids = new Set();
  for (const e of EVERYDAY) {
    if (eids.has(e.id)) out.push(`duplicate everyday id ${e.id}`);
    eids.add(e.id);
    if (!PROCESS[e.process]) out.push(`everyday ${e.id}: unknown process ${e.process}`);
    if (e.trap && (!PROCESS[e.trap] || e.trap === e.process)) out.push(`everyday ${e.id}: trap "${e.trap}" must be a different process`);
    for (const k of ['en', 'vn', 'fr', 'why', 'whyVn', 'whyFr']) if (!e[k]) out.push(`everyday ${e.id} needs ${k}`);
  }
  return out;
}

/** Problems with one round: the marker must accept its own answer and nothing else. */
function roundProblems(r) {
  const out = [];
  const at = `${r.mode} round`;
  const accepts = (ans) => markRound(r, ans).ok;
  if (r.mode === 'arrow' || r.mode === 'everyday') {
    if (r.options.length !== 4 || new Set(r.options).size !== 4) out.push(`${at}: needs four different options`);
    if (!r.options.includes(r.process)) out.push(`${at}: the right process is not an option`);
    for (const o of r.options) {
      if (!PROCESS[o]) out.push(`${at}: option ${o} is not a process`);
      else if (accepts(o) !== (o === r.process)) out.push(`${at}: option ${o} is marked wrongly`);
    }
  } else if (r.mode === 'tap') {
    if (!arrowsOf(r.process).length) out.push(`${at}: ${r.process} has no arrow to tap`);
    for (const a of ARROWS) if (accepts(a.id) !== (a.process === r.process)) out.push(`${at}: tapping ${a.id} is marked wrongly`);
  } else if (r.mode === 'state') {
    const want = stateAnswerOf(r.process);
    for (const s of STATE_OPTIONS) {
      for (const h of HEAT_OPTIONS) {
        if (accepts({ state: s.id, heat: h.id }) !== (s.id === want.state && h.id === want.heat)) out.push(`${at}: ${r.process} ${s.id}/${h.id} is marked wrongly`);
      }
    }
  } else if (r.mode === 'journey') {
    if (r.steps.length < 3 || r.steps.length > 4 || new Set(r.steps).size !== r.steps.length) out.push(`${at}: needs 3–4 different processes`);
    const orders = validOrders(r.from, r.to, r.steps);
    if (!orders.length) out.push(`${at}: ${r.from} → ${r.to} has no valid order`);
    if (!orders.some((o) => sameList(o, r.steps))) out.push(`${at}: its own order is not a valid path`);
    if (walk(r.from, r.to, r.bank).ok) out.push(`${at}: the bank is already in a right order`);
    for (const o of permutations(r.steps)) {
      const valid = orders.some((v) => sameList(v, o));
      if (accepts(o) !== valid) out.push(`${at}: ${o.join(' → ')} is marked wrongly`);
      if (valid && !pathArrows(r.from, r.to, o)) out.push(`${at}: ${o.join(' → ')} cannot be drawn`);
    }
  }
  if (!accepts(answerOf(r))) out.push(`${at}: does not accept its own answer`);
  if (!markRound(r, answerOf(r)).lines.every((l) => l.en && l.vn && l.fr)) out.push(`${at}: a verdict line is missing a language`);
  return out;
}

/** Problems with a unit's `waterJourney` config (validator). Draws ≥ 50 rounds per mode. */
export function checkJourneyConfig(cfg) {
  const out = [];
  if (!cfg || typeof cfg !== 'object') return ['waterJourney must be an object'];
  if (!cfg.title) out.push('waterJourney is missing a title');
  const modes = cfg.modes || [];
  if (!Array.isArray(modes) || !modes.length) out.push('waterJourney.modes must list at least one mode');
  for (const m of modes) if (!MODES.includes(m)) out.push(`waterJourney mode "${m}" — known modes: ${MODES.join('/')}`);
  if (cfg.rounds !== undefined && !(Number(cfg.rounds) >= 1 && Number(cfg.rounds) <= 16)) out.push('waterJourney.rounds must be 1–16');
  out.push(...catalogueProblems().map((p) => `waterJourney catalogue: ${p}`));
  try {
    const rng = rngFrom(24);
    for (const m of modes.filter((x) => MODES.includes(x))) {
      for (let i = 0; i < 60; i += 1) for (const p of roundProblems(makeJourneyRound(m, rng))) out.push(`waterJourney ${p}`);
    }
    const session = makeJourneySession(cfg, 7);
    if (session.length !== Math.max(1, Math.min(16, Number(cfg.rounds) || 10))) out.push('waterJourney: a session has the wrong number of rounds');
  } catch (e) {
    out.push(`waterJourney threw: ${e.message}`);
  }
  return [...new Set(out)];
}

/** Problems with a `cycle` deck activity (utils/activity.js). */
export function checkCycleActivity(a, { bilingual = true, french = false } = {}) {
  const out = [];
  if (!a || typeof a !== 'object') return ['activity missing'];
  if (!CYCLE_ASKS.includes(a.ask)) return [`ask "${a.ask}" — ${CYCLE_ASKS.join('/')}`];
  if (bilingual && (!a.promptVn || !a.explainVn)) out.push('needs promptVn and explainVn');
  // only on a track that offers French (the caller says so)
  if (bilingual && french && (!a.promptFr || !a.explainFr)) out.push('needs promptFr and explainFr');
  if (a.ask === 'tap' && !PROCESS[a.process]) out.push(`tap needs a process (${PROCESSES.map((p) => p.id).join('/')})`);
  if (a.ask === 'arrow') {
    if (a.arrow !== undefined && !ARROW[a.arrow]) out.push(`arrow "${a.arrow}" — known arrows: ${ARROWS.map((x) => x.id).join('/')}`);
    if (a.arrow === undefined && !PROCESS[a.process]) out.push('arrow needs a process (or an arrow id)');
    if (a.arrow && a.process && ARROW[a.arrow] && ARROW[a.arrow].process !== a.process) out.push(`arrow ${a.arrow} is ${ARROW[a.arrow].process}, not ${a.process}`);
    if (a.options !== undefined) {
      const opts = a.options;
      if (!Array.isArray(opts) || opts.length < 2 || opts.length > 6 || new Set(opts).size !== opts.length) out.push('arrow options must be 2–6 different process ids');
      else if (!opts.every((o) => PROCESS[o])) out.push(`arrow options must be process ids (${opts.filter((o) => !PROCESS[o]).join(', ')})`);
    }
  }
  if (a.ask === 'journey') {
    if (!PLACES[a.from] || !PLACES[a.to]) out.push(`journey needs from and to places (${Object.keys(PLACES).join('/')})`);
    const steps = a.steps || [];
    if (steps.length < 2 || steps.length > 5 || new Set(steps).size !== steps.length) out.push('journey needs 2–5 different steps');
    if (!steps.every((s) => PROCESS[s])) out.push(`journey steps must be process ids (${steps.filter((s) => !PROCESS[s]).join(', ')})`);
    else if (PLACES[a.from] && PLACES[a.to] && !walk(a.from, a.to, steps).ok) out.push(`journey steps, in the order written, do not take a particle from ${a.from} to ${a.to}`);
  }
  if (!out.length) {
    const r = activityRound(a);
    if (!r) out.push('cannot be turned into a round');
    else {
      if (r.mode === 'arrow' && !r.options.includes(r.process)) out.push('arrow options must include the right process');
      if (r.mode === 'journey' && walk(r.from, r.to, r.bank).ok) out.push('the shuffled bank is already a right order');
      if (r.mode !== 'arrow' || r.options.includes(r.process)) if (!markRound(r, answerOf(r)).ok) out.push('does not accept its own answer');
    }
  }
  return out;
}
