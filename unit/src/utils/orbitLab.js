/**
 * Orbit Lab (ORBIT_LAB, p87) — Year 7 Science 3.3 Movement in Space. The
 * engine: it builds every round from an item and marks every answer, naming
 * the slip. Pure functions, no React; orbitLabCheck.js proves them, and the
 * screens are in components/science/orbitlab/.
 *
 * Three kinds, one per book objective (docs/y7-science/plans/U03_3.md):
 *   pull   { id, level, kind: 'pull', scene, orbiter?, at, dir: 'acw'|'cw', ask?, walk? }
 *          Tap the arrow for the pull, then the way it goes with no pull.
 *   graph  { id, level, kind: 'graph', set, given?: [rowId] | 'all', ask: [...] }
 *          Draw the bar graph, the pattern, the reason, a prediction.
 *   coast  { id, level, kind: 'coast', scene, walk? }
 *          The forces against its movement, then its speed and why.
 *
 * Arrows are the eight directions round the object: index k is k × 45°,
 * anticlockwise from "right" (east), with up = 90°.
 */
import { PULL_SCENES, ORBITERS, PULL_SLIPS, PULL_REASONS, COAST_SCENES, COAST_SLIPS, SPEED_REASONS } from './orbitLabData.js';
import { GRAPH_SETS, PATTERN_IDS } from './orbitLabSets.js';

export const WALK_UP_TO = 2;
export const ARROWS = [0, 1, 2, 3, 4, 5, 6, 7];
export const PULL_STAGES = ['pull', 'path', 'why'];
export const GRAPH_STAGES = ['draw', 'pattern', 'why', 'predict'];

// ── Small helpers ─────────────────────────────────────────────────────────
const norm = (deg) => ((Math.round(deg) % 360) + 360) % 360;
const idxOf = (deg) => {
  const d = norm(deg);
  if (d % 45 !== 0) throw new Error(`a key direction (${d}°) is not one of the eight arrows`);
  return d / 45;
};
export const arrowVec = (k) => ({ x: Math.cos((k * Math.PI) / 4), y: -Math.sin((k * Math.PI) / 4) });

function hash(s) {
  let h = 2166136261;
  for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  // finalise (murmur3 fmix32), so ids one letter apart do not shuffle alike
  h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16;
  return h >>> 0;
}
/** The same shuffle every time for the same item id. */
export function seeded(list, seed) {
  const out = [...list];
  let h = hash(seed);
  for (let i = out.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    const j = h % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
/** Fill a template's {placeholders} from a word table, in one language. */
export function fill(tpl, words, lang = 'en') {
  return String(tpl || '').replace(/\{(\w+)\}/g, (all, key) => {
    const w = words[key] ?? words[key.charAt(0).toLowerCase() + key.slice(1)];
    if (w == null) return all;
    const text = typeof w === 'string' ? w : (w[lang] ?? w.en);
    return /^[A-Z]/.test(key) ? cap(text) : text;
  });
}
/** A message in both languages, from a { en, fr } template pair. */
export const both = (pair, words) => ({ en: fill(pair.en, words, 'en'), fr: fill(pair.fr, words, 'fr') });

// ── pull: the geometry and the eight arrows ───────────────────────────────
export const STAGE_W = 560;
export const STAGE_H = 480;
const CX = 280;
const CY = 240;
const R = 130;
const COMET_A = 200;
const COMET_B = 141.42;
const URANUS_R = 95;
const NEPTUNE_R = 190;

/** Where everything is drawn, in the picture's own units (y down). */
export function pullGeometry(scene, at) {
  const shape = PULL_SCENES[scene].shape;
  const on = (r, deg) => ({ x: CX + r * Math.cos((deg * Math.PI) / 180), y: CY - r * Math.sin((deg * Math.PI) / 180) });
  if (shape === 'comet') {
    if (at !== 90 && at !== 270) throw new Error('a comet sits at 90 or 270 (an end of the short axis)');
    return { shape, centre: { x: CX, y: CY }, rx: COMET_A, ry: COMET_B, attractor: { x: CX + COMET_B, y: CY }, obj: on(COMET_B, at) };
  }
  if (shape === 'neptune') {
    return { shape, centre: { x: CX, y: CY }, r: URANUS_R, rOuter: NEPTUNE_R, attractor: on(NEPTUNE_R, at), obj: on(URANUS_R, at) };
  }
  return { shape, centre: { x: CX, y: CY }, r: R, attractor: { x: CX, y: CY }, obj: on(R, at) };
}
const angleTo = (from, to) => (Math.atan2(-(to.y - from.y), to.x - from.x) * 180) / Math.PI;

/** The arrow (0–7) for each named direction, and the code every arrow gets at each stage. */
export function arrowCodes(scene, at, dir) {
  const g = pullGeometry(scene, at);
  const sign = dir === 'cw' ? -1 : 1;
  let fwdDeg;
  if (g.shape === 'comet') fwdDeg = (at === 90) === (dir === 'acw') ? 180 : 0;
  else fwdDeg = at + sign * 90;
  const to = idxOf(angleTo(g.obj, g.attractor));
  const fwd = idxOf(fwdDeg);
  const opp = (k) => (k + 4) % 8;
  const pullNamed = { [to]: 'ok' };
  const name = (map, k, code) => { if (map[k] === undefined) map[k] = code; };
  if (g.shape === 'neptune') name(pullNamed, idxOf(angleTo(g.obj, g.centre)), 'sun');
  if (g.shape === 'comet') name(pullNamed, idxOf(angleTo(g.obj, g.centre)), 'middle');
  name(pullNamed, opp(to), 'away');
  name(pullNamed, fwd, 'along');
  name(pullNamed, opp(fwd), 'against');
  const pathNamed = { [fwd]: 'ok' };
  name(pathNamed, opp(to), 'away');
  name(pathNamed, to, 'inward');
  name(pathNamed, opp(fwd), 'backwards');
  const pull = ARROWS.map((k) => pullNamed[k] || 'off');
  const path = ARROWS.map((k) => pathNamed[k] || 'off');
  return { g, to, fwd, pull, path };
}

/** The words a pull picture's messages are filled with. */
export function pullWords(scene, orbiter) {
  const s = PULL_SCENES[scene];
  const o = ORBITERS[orbiter];
  return { obj: { en: o.en, fr: o.fr }, force: s.force, toward: s.toward, awayFrom: s.awayFrom, into: s.into, without: s.without };
}

function pullModel(item, walkUpTo) {
  const s = PULL_SCENES[item.scene];
  if (!s) throw new Error(`pull scene "${item.scene}" is not one of ${Object.keys(PULL_SCENES).join(', ')}`);
  const orbiter = item.orbiter || s.orbiters[0];
  if (!s.orbiters.includes(orbiter)) throw new Error(`${orbiter} does not go round in the ${item.scene} picture`);
  if (item.dir !== 'acw' && item.dir !== 'cw') throw new Error('dir must be acw or cw');
  if (!Number.isInteger(item.at) || item.at % 45 !== 0) throw new Error('at must be a multiple of 45°');
  const ask = item.ask || (s.onlyPull ? ['pull'] : PULL_STAGES);
  for (const st of ask) if (!PULL_STAGES.includes(st)) throw new Error(`pull ask "${st}" is not one of ${PULL_STAGES.join(', ')}`);
  if (s.onlyPull && ask.some((st) => st !== 'pull')) throw new Error(`the ${item.scene} picture only asks for the pull`);
  if (ask.includes('why') && !ask.includes('path')) throw new Error('why needs path before it');
  const codes = arrowCodes(item.scene, item.at, item.dir);
  const walk = item.walk ?? (item.level || 1) <= walkUpTo;
  const stages = walk || !(ask.includes('pull') && ask.includes('path')) ? ask.filter((st) => st !== 'why' || walk) : ['both'];
  const reasons = seeded(['keeps', ...s.traps], `${item.id}:why`);
  return { kind: 'pull', id: item.id, level: item.level, scene: item.scene, orbiter, at: item.at, dir: item.dir, ask, walk, stages, ...codes, reasons, words: pullWords(item.scene, orbiter) };
}

// ── graph ─────────────────────────────────────────────────────────────────
function graphModel(item) {
  const set = GRAPH_SETS[item.set];
  if (!set) throw new Error(`graph set "${item.set}" is not one of ${Object.keys(GRAPH_SETS).join(', ')}`);
  const ask = item.ask || ['draw', 'pattern', 'why'];
  for (const st of ask) if (!GRAPH_STAGES.includes(st)) throw new Error(`graph ask "${st}" is not one of ${GRAPH_STAGES.join(', ')}`);
  const given = item.given === 'all' ? set.rows.map((r) => r.id) : (item.given || []);
  for (const g of given) if (!set.rows.some((r) => r.id === g)) throw new Error(`given "${g}" is not a row of ${item.set}`);
  if (ask.includes('draw') && given.length === set.rows.length) throw new Error('every bar is given, so there is nothing to draw');
  if (!ask.includes('draw') && given.length !== set.rows.length) throw new Error('without draw, every bar must be given ("all")');
  const rows = set.rows.map((r) => ({ ...r, given: given.includes(r.id) }));
  const reasons = ask.includes('why') ? [set.reasons[0].id, ...seeded(set.reasons.slice(1).map((x) => x.id), `${item.id}:traps`).slice(0, 3)] : [];
  let predict = null;
  if (ask.includes('predict')) {
    const p = set.predict;
    if (!p) throw new Error(`${item.set} has nothing to predict`);
    const above = [...set.rows].reverse().find((r) => r.d < p.d);  // the nearest row closer in
    const below = set.rows.find((r) => r.d > p.d);                  // the nearest row further out
    if (!above || !below) throw new Error('the object to predict must sit between two rows');
    if (!(p.v < above.v && p.v > below.v)) throw new Error('the predicted speed must lie between its two neighbours');
    const options = [{ val: above.v + 2, code: 'faster' }, { val: p.v, code: 'ok' }, { val: below.v - 1, code: 'slower' }];
    predict = { ...p, above, below, options: seeded(options, `${item.id}:predict`) };
  }
  return {
    kind: 'graph', id: item.id, level: item.level, set: item.set, title: set.title, centre: set.centre,
    per: set.per, max: set.max, rows, ask, stages: ask, pattern: seeded(PATTERN_IDS, `${item.id}:pattern`),
    reasonIds: seeded(reasons, `${item.id}:why`), reasonTable: set.reasons, predict,
  };
}

// ── coast ─────────────────────────────────────────────────────────────────
export function coastAnswer(where) { return where === 'space' ? ['none'] : ['air', 'friction']; }

function coastModel(item, walkUpTo) {
  const sc = COAST_SCENES[item.scene];
  if (!sc) throw new Error(`coast scene "${item.scene}" is not one of ${Object.keys(COAST_SCENES).join(', ')}`);
  const walk = item.walk ?? (item.level || 1) <= walkUpTo;
  return {
    kind: 'coast', id: item.id, level: item.level, scene: item.scene, where: sc.where, walk,
    stages: walk ? ['forces', 'speed'] : ['both'], answer: coastAnswer(sc.where),
    speeds: seeded(Object.keys(SPEED_REASONS[sc.where]), `${item.id}:speed`),
  };
}

/** A round from an item: its stages, its answers, and everything the screens draw. */
export function roundModel(item, { walkUpTo = WALK_UP_TO } = {}) {
  if (!item || !item.id) throw new Error('an item needs an id');
  if (item.kind === 'pull') return pullModel(item, walkUpTo);
  if (item.kind === 'graph') return graphModel(item);
  if (item.kind === 'coast') return coastModel(item, walkUpTo);
  throw new Error(`kind "${item.kind}" is not pull, graph or coast`);
}

// ── Marking ───────────────────────────────────────────────────────────────
// Every diagnose* returns { ok, code, en, fr }: `code` is 'ok' or the named
// slip, and en/fr say why. `soft: true` means "not an answer yet" (nothing
// drawn or tapped): it is not counted as a try.
const OK = { ok: true, code: 'ok', en: '', fr: '' };
const slip = (code, msg) => ({ ok: false, code, en: msg.en, fr: msg.fr });
const soft = (en, fr) => ({ ok: false, soft: true, code: 'missing', en, fr });

/** One arrow at the Pull or the Let go stage. */
export function diagnoseArrow(m, stage, k) {
  if (k == null) return soft('Tap an arrow first.', 'Touche d’abord une flèche.');
  const code = m[stage][k];
  if (code === 'ok') return OK;
  return slip(code, both(PULL_SLIPS[stage][code], m.words));
}

/**
 * Both arrows at once (the quick round from level 3). `open`: the stages to
 * open, where the slips happened — a Let go slip opens Why too, if asked.
 */
export function diagnoseBoth(m, { pull, path }) {
  if (pull == null || path == null) return soft('Tap two arrows: the pull first, then the way it goes.', 'Touche deux flèches : l’attraction d’abord, puis le sens où elle part.');
  const dp = diagnoseArrow(m, 'pull', pull);
  const dq = diagnoseArrow(m, 'path', path);
  if (dp.ok && dq.ok) return { ...OK, pull: dp, path: dq, open: [] };
  const open = [];
  if (!dp.ok) open.push('pull');
  if (!dq.ok) open.push('path', ...(m.ask.includes('why') ? ['why'] : []));
  const first = dp.ok ? dq : dp;
  return { ok: false, code: dp.ok ? `path:${dq.code}` : `pull:${dp.code}`, en: first.en, fr: first.fr, pull: dp, path: dq, open };
}

/** The reason for the Let go arrow. */
export function diagnoseWhy(m, val) {
  if (val === 'keeps') return OK;
  const r = PULL_REASONS[val];
  if (!r || !m.reasons.includes(val)) return slip('unknown', { en: '', fr: '' });
  return slip(val, both({ en: r.why, fr: r.whyFr }, m.words));
}

/** The bars drawn: `heights` is { rowId: km/s }. `per`: { rowId: true | false }. */
export function diagnoseDraw(m, heights = {}) {
  const todo = m.rows.filter((r) => !r.given);
  if (todo.some((r) => !(heights[r.id] > 0))) return soft('Draw every bar first: drag it up, or use ▲ and ▼.', 'Trace d’abord toutes les barres : tire-les vers le haut, ou utilise ▲ et ▼.');
  const per = Object.fromEntries(todo.map((r) => [r.id, heights[r.id] === r.v]));
  if (todo.every((r) => per[r.id])) return { ...OK, per };
  const wrong = todo.filter((r) => !per[r.id]);
  // Swapped: the bars drawn are the right heights, in the wrong places.
  const sorted = (xs) => [...xs].sort((a, b) => a - b).join();
  if (wrong.length >= 2 && sorted(todo.map((r) => heights[r.id])) === sorted(todo.map((r) => r.v))) {
    return { ...slip('swap', { en: 'Two bars are swapped. Read each name and its number in the table again.', fr: 'Deux barres sont échangées. Relis chaque nom et son nombre dans le tableau.' }), per };
  }
  // The scale misread: every bar drawn is the right value times the same factor.
  for (const k of scaleFactors(m)) {
    if (wrong.length >= 2 && todo.every((r) => heights[r.id] === Math.round(r.v * k))) {
      return { ...slip('scale', { en: `Every bar is out by the same amount: read the scale again. One big square is ${m.per} km/s.`, fr: `Toutes les barres sont fausses de la même façon : relis l’échelle. Un grand carreau vaut ${m.per} km/s.` }), per };
    }
  }
  return { ...slip('bar', { en: 'Not every bar is right yet. Each red bar shows its right height as a dashed outline.', fr: 'Toutes les barres ne sont pas encore justes. Chaque barre rouge montre sa bonne hauteur en pointillés.' }), per };
}
/** The factors a misread scale gives (one big square read as 1 km/s, or as 2). */
export function scaleFactors(m) {
  return [1 / m.per, 2, 0.5].filter((k) => k !== 1);
}
/** How a bar's height is counted on the grid: big squares and small lines. */
export function barWorking(m, v) {
  const big = Math.floor(v / m.per);
  const small = v - big * m.per;
  return { big, small };
}

export function diagnosePattern(m, val) {
  if (val === 'down') return OK;
  const from = { en: m.centre.en, fr: m.centre.fromFr };
  if (val === 'up') return slip('up', { en: `Look at the bars: they get shorter from left to right, and the left one is closest to ${from.en}.`, fr: `Regarde les barres : elles raccourcissent de gauche à droite, et celle de gauche est la plus proche ${from.fr}.` });
  return slip('same', { en: 'The bars are not the same height: the closest one is the tallest.', fr: 'Les barres n’ont pas la même hauteur : la plus proche est la plus haute.' });
}

export function diagnoseReason(m, val) {
  const r = m.reasonTable.find((x) => x.id === val);
  if (!r || !m.reasonIds.includes(val)) return slip('unknown', { en: '', fr: '' });
  if (r.ok) return OK;
  return slip(val, { en: r.why, fr: r.whyFr });
}

/** A row's name inside a sentence ("the space station", "Titan"). */
export const sayOf = (r) => r.say || { en: r.en, fr: r.fr };
const vowel = (s) => /^[aeiouyéèêhAEIOUYÉ]/.test(s);
const que = (s) => (vowel(s) ? `qu’${s}` : `que ${s}`);
const de = (s) => (vowel(s) ? `d’${s}` : `de ${s}`);

export function diagnosePredict(m, val) {
  const o = m.predict.options.find((x) => x.val === val);
  if (!o) return slip('unknown', { en: '', fr: '' });
  if (o.code === 'ok') return OK;
  const { above, below, pronFr } = m.predict;
  const a = sayOf(above);
  const b = sayOf(below);
  if (o.code === 'faster') return slip('faster', { en: `It is further out than ${a.en}, so it must be slower than ${a.en} (${above.v} km/s).`, fr: `${pronFr} est plus loin ${que(a.fr)} : sa vitesse doit donc être plus faible que celle ${de(a.fr)} (${above.v} km/s).` });
  return slip('slower', { en: `It is closer in than ${b.en}, so it must be faster than ${b.en} (${below.v} km/s).`, fr: `${pronFr} est plus proche ${que(b.fr)} : sa vitesse doit donc être plus grande que celle ${de(b.fr)} (${below.v} km/s).` });
}

/** The chips tapped for "which forces act against its movement". */
export function diagnoseForces(m, picked = []) {
  if (!picked.length) return soft('Tap at least one: a force, or Nothing.', 'Touche au moins une case : une force, ou Rien.');
  const has = (x) => picked.includes(x);
  const exact = picked.length === m.answer.length && m.answer.every(has);
  if (exact) return OK;
  if (m.where === 'space') {
    if (has('air')) return slip('air', COAST_SLIPS.air);
    if (has('friction')) return slip('friction', COAST_SLIPS.friction);
    return slip('gravity', COAST_SCENES[m.scene].gravity);
  }
  if (has('none')) return slip('nothing', COAST_SLIPS.nothing);
  if (has('gravity')) return slip('gravity', COAST_SLIPS.roadGravity);
  if (!has('air')) return slip('noair', COAST_SLIPS.noair);
  return slip('nofriction', COAST_SLIPS.nofriction);
}

export function diagnoseSpeed(m, val) {
  const r = SPEED_REASONS[m.where][val];
  if (!r) return slip('unknown', { en: '', fr: '' });
  if (r.ok) return OK;
  return slip(val, { en: r.why, fr: r.whyFr });
}

/** The quick coast round: the chips and the speed together. */
export function diagnoseCoastBoth(m, { forces, speed }) {
  if (!forces?.length || speed == null) return soft('Answer both: tap the forces, then choose what happens to its speed.', 'Réponds aux deux : touche les forces, puis choisis ce que devient sa vitesse.');
  const df = diagnoseForces(m, forces);
  const ds = diagnoseSpeed(m, speed);
  if (df.ok && ds.ok) return { ...OK, open: [] };
  const open = [...(df.ok ? [] : ['forces']), ...(ds.ok ? [] : ['speed'])];
  const first = df.ok ? ds : df;
  return { ok: false, code: df.ok ? `speed:${ds.code}` : `forces:${df.code}`, en: first.en, fr: first.fr, forces: df, speed: ds, open };
}

/** The right answer for a stage (Show me fills it in with this). */
export function answerOf(m, stage) {
  if (stage === 'pull') return m.to;
  if (stage === 'path') return m.fwd;
  if (stage === 'both' && m.kind === 'pull') return { pull: m.to, path: m.fwd };
  if (stage === 'why') return m.kind === 'pull' ? 'keeps' : 'weaker';
  if (stage === 'draw') return Object.fromEntries(m.rows.filter((r) => !r.given).map((r) => [r.id, r.v]));
  if (stage === 'pattern') return 'down';
  if (stage === 'predict') return m.predict.v;
  if (stage === 'forces') return m.answer;
  if (stage === 'speed') return m.where === 'space' ? 'keeps' : 'slows';
  if (stage === 'both') return { forces: m.answer, speed: m.where === 'space' ? 'keeps' : 'slows' };
  throw new Error(`no stage "${stage}"`);
}
