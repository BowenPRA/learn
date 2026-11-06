/**
 * Slide activities — the pure parts. `ActivityBlock.jsx` renders them; this
 * file names the types and checks an authored block for the validator.
 * Schema in docs/y7-science/ENGAGEMENT-PLAN.md §2.1.
 */
import { rootsOf as curveRoots, levelOf, vertexOf, CURVE_KINDS } from './graphCurve.js';
import { parseInequality, normalize } from './interval.js';
import { checkCubicItems } from './cubic.js';
import { parseSet, lettersOf, regionsOf, regionKeys } from './sets.js';
import { collectModel, expandModel, equationModel, diagnoseSimplify, diagnoseExpand } from './algebra.js';
import { querySymbols } from './elements.js';
import { SUBSTANCES, classifyBox, countsOf } from './particles.js';
import { checkLineActivity } from './lineLab.js';
import { shiftModel } from './placeShift.js';
import { roundModel, checkPlaces } from './rounding.js';
import { shortDivModel } from './shortDivision.js';
import { ineqModel } from './ineqLine.js';
import { checkChainActivity } from './stateChain.js';
import { checkCycleActivity } from './waterCycle.js';
import { checkPhActivity } from './phLab.js';
// Unit 4 (decimals) and Science 3.1 deck activities, one block per unit:
// @@U04_1_ACT_IMPORT@@
import { checkDecOrderActivity } from './decOrder.js';

// @@U04_2_ACT_IMPORT@@
import { checkDecColumnActivity } from './decColumn.js';

// @@U04_3_ACT_IMPORT@@
import { checkPointBackActivity } from './pointBack.js';

// @@U04_4_ACT_IMPORT@@

// @@U04_5_ACT_IMPORT@@
// `makeeasy` (Maths 4.5) — Make It Easy on a slide: the words → the calculation,
// the easy way from 2–3, then each step's box. Checked by utils/makeEasy.js.
import { checkEasyActivity } from './makeEasy.js';

// @@SCI_U03_1_ACT_IMPORT@@

// @@U05_1_ACT_IMPORT@@
// `anglesum` (Maths 5.1) — Find It, Say Why on a slide. Proved by utils/angleSumCheck.js.
import { checkAngleSumActivity } from './angleSumCheck.js';

// @@U05_2_ACT_IMPORT@@
// `anglepair` (Maths 5.2) — X, F or Z? on a slide: name the pair, then the size.
import { checkAnglePairActivity } from './anglePairCheck.js';

// @@U05_3_ACT_IMPORT@@
// `zeroline` (Maths 5.3) — one Zero on the Line item on a slide: read an angle
// (estimate, then the reading) or draw one (which 0, then the mark).
import { checkZeroLineActivity } from './zeroLine.js';

// @@SCI_U03_2_ACT_IMPORT@@

// @@U06_1_ACT_IMPORT@@

// @@U06_2_ACT_IMPORT@@

// @@SCI_U03_3_ACT_IMPORT@@
// `orbitlab` (Science 3.3) — one Orbit Lab item on a slide: the pull and the
// no-pull path on an orbit, or a bar graph of orbit speeds and its pattern.
import { checkOrbitLabActivity } from './orbitLabCheck.js';

// @@SCI_U03_4_ACT_IMPORT@@

// @@SCI_U03_5_ACT_IMPORT@@

// @@SCI_U03_6_ACT_IMPORT@@
import { checkEnergyChangeActivity } from './energyChangeCheck.js';

// @@SCI_U03_7_ACT_IMPORT@@
// `energysplit` (Science 3.7) — one Where Did It Go? round on a slide: build the
// energy-change diagram, count the joules. Proved by utils/energySplitCheck.js.
import { checkEnergySplitActivity } from './energySplitCheck.js';


// The three maths types (plot / numberline / reflect) were added for the
// Additional Mathematics decks: an equation is answered by CLICKING its key
// points, an inequality by SHADING the line, a modulus graph by TAPPING the
// pieces to fold. Schemas in docs/add-math/notes-and-activities.md.
// `venn` (IGCSE Extended Mathematics) is set notation answered by SHADING the
// regions of a Venn diagram. Schema in docs/ext-math/notes-and-widgets.md.
// The Year 7 types. Maths 2.3–2.5: `terms` (sort an expression's signed terms
// into like-term baskets), `algebra` (type a simplified / expanded expression
// or a solution, marked by value AND form), `grid` (fill an expansion grid box
// by box), `flow` (reverse an equation's flow chart). Science 2.5–2.7:
// `periodic` (tap tiles on the first-20 table), `particles` (sort drawn boxes
// of particles into element / compound / mixture), `formula` (count the atoms
// in a formula, or write the formula of a drawn particle). Every answer is
// derived by utils/algebra.js, utils/elements.js or utils/particles.js.
// Schemas in docs/y7-math/algebra-engines.md and docs/y7-science/particle-engines.md.
// `line` (AOPS lines units) is one click step of the Line Lab on a slide —
// plot points, place points on a line, walk a slope, an intercept, a midpoint,
// where two lines meet. Schema at the top of utils/lineLab.js.
// The Year 7 number types (Maths 3.1–3.2): `shift` (slide the digits along a
// place-value table for × or ÷ 10ⁿ, a missing power or a mass conversion),
// `round` (tap the last digit kept, then type the rounded number), `busstop`
// (a short division — quotient digits, the carries up-left of the next digit,
// zeros added after the point). Derived by utils/placeShift.js, rounding.js
// and shortDivision.js. Schemas in docs/y7-math/number-engines.md §3.
// `ineq` (Maths 2.6) is an inequality on a number line: draw it (the open
// circle, then the arrow), read a drawn one, give the smallest or largest
// integer, or tap every integer between two. Derived by utils/ineqLine.js.
// The Year 7 science types that close Unit 2: `chain` (2.3 — build or fix the
// particle explanation of a change of state), `cycle` (2.4 — tap, name or
// order the arrows of the water cycle), `ph` (2.8 — indicator colours, litmus,
// a substance on the pH scale, neutralise drop by drop). Each is checked by its
// engine (utils/stateChain.js, waterCycle.js, phLab.js); schemas in
// docs/y7-science/unit2-close-engines.md.
export const ACTIVITY_TYPES = ['sort', 'order', 'estimate', 'hotspot', 'predict', 'plot', 'numberline', 'reflect', 'venn',
  'terms', 'algebra', 'grid', 'flow', 'periodic', 'particles', 'formula', 'line', 'shift', 'round', 'busstop', 'ineq',
  'chain', 'cycle', 'ph',
  // @@U04_1_ACT_TYPES@@
  'decorder',

  // @@U04_2_ACT_TYPES@@
  'deccol',

  // @@U04_3_ACT_TYPES@@
  'pointback',

  // @@U04_4_ACT_TYPES@@

  // @@U04_5_ACT_TYPES@@
  'makeeasy',

  // @@SCI_U03_1_ACT_TYPES@@

  // @@U05_1_ACT_TYPES@@
  'anglesum',

  // @@U05_2_ACT_TYPES@@
  'anglepair',

  // @@U05_3_ACT_TYPES@@
  'zeroline',

  // @@SCI_U03_2_ACT_TYPES@@

  // @@U06_1_ACT_TYPES@@

  // @@U06_2_ACT_TYPES@@

  // @@SCI_U03_3_ACT_TYPES@@
  'orbitlab',

  // @@SCI_U03_4_ACT_TYPES@@

  // @@SCI_U03_5_ACT_TYPES@@

  // @@SCI_U03_6_ACT_TYPES@@
  'energychange',

  // @@SCI_U03_7_ACT_TYPES@@
  'energysplit',

];

export const INEQ_ASKS = ['draw', 'read', 'integer', 'list'];

export const PARTICLE_ASKS = ['kind', 'pure', 'magnet', 'find'];
export const PARTICLE_FIND = ['element', 'compound', 'mixture', 'pure'];

const bilingualName = (o, bilingual) => o && o.name && (!bilingual || o.nameVn);

const PLOT_GRID = { xMin: -7, xMax: 7, yMin: -6, yMax: 8 };

/** The lattice points a `plot` activity wants clicked, derived from its curve. */
export function plotTargets(a) {
  const c = a.curve;
  const st = a.step || { kind: 'vertex' };
  if (st.kind === 'vertex') return [vertexOf(c)];
  if (st.kind === 'zeros') return curveRoots(c).map((x) => [x, 0]);
  if (st.kind === 'meets') return levelOf(c, st.at).map((x) => [x, st.at]);
  return [];
}

/** Problems with one activity block, as strings. Empty when it is sound. */
export function checkActivity(a, { bilingual = true } = {}) {
  const out = [];
  if (!a || typeof a !== 'object') return ['activity is not an object'];
  if (!ACTIVITY_TYPES.includes(a.type)) return [`type "${a.type}" — known types: ${ACTIVITY_TYPES.join('/')}`];
  if (!a.id) out.push('has no id');
  if (!a.prompt || (bilingual && !a.promptVn)) out.push(`needs a ${bilingual ? 'bilingual ' : ''}prompt`);
  if (!a.explain || (bilingual && !a.explainVn)) out.push(`needs a ${bilingual ? 'bilingual ' : ''}explain (shown after the answer)`);

  if (a.type === 'sort') {
    const bins = a.bins || []; const cards = a.cards || [];
    if (bins.length < 2) out.push('sort needs at least 2 bins');
    if (cards.length < 3) out.push('sort needs at least 3 cards');
    const binIds = new Set(bins.map((b) => b?.id));
    for (const b of bins) if (!b?.id || !bilingualName(b, bilingual)) out.push(`bin "${b?.id || '?'}" needs id and ${bilingual ? 'bilingual ' : ''}name`);
    const seen = new Set();
    for (const c of cards) {
      if (!c?.id || !bilingualName(c, bilingual)) out.push(`card "${c?.id || '?'}" needs id and ${bilingual ? 'bilingual ' : ''}name`);
      if (seen.has(c?.id)) out.push(`duplicate card id "${c.id}"`);
      seen.add(c?.id);
      if (!binIds.has(c?.bin)) out.push(`card "${c?.id}" bin "${c?.bin}" is not a bin`);
    }
    for (const b of bins) if (!cards.some((c) => c.bin === b.id)) out.push(`bin "${b.id}" has no cards`);
  }

  if (a.type === 'order') {
    const steps = a.steps || [];
    if (steps.length < 3) out.push('order needs at least 3 steps');
    const seen = new Set();
    for (const s of steps) {
      if (!s?.id || !bilingualName(s, bilingual)) out.push(`step "${s?.id || '?'}" needs id and ${bilingual ? 'bilingual ' : ''}name`);
      if (seen.has(s?.id)) out.push(`duplicate step id "${s.id}"`);
      seen.add(s?.id);
    }
  }

  if (a.type === 'estimate') {
    for (const k of ['min', 'max', 'answer']) if (!Number.isFinite(a[k])) out.push(`estimate needs numeric ${k}`);
    if (Number.isFinite(a.min) && Number.isFinite(a.max) && a.min >= a.max) out.push('estimate min must be below max');
    if (Number.isFinite(a.answer) && Number.isFinite(a.min) && Number.isFinite(a.max) && (a.answer < a.min || a.answer > a.max)) out.push('estimate answer is outside min..max');
    if (a.step !== undefined && !(a.step > 0)) out.push('estimate step must be positive');
    if (a.tolerance !== undefined && !(a.tolerance >= 0 && a.tolerance <= 1)) out.push('estimate tolerance is a fraction 0..1');
    // The slider starts at the middle of its range (EstimateActivity). If that
    // middle already counts as close, locking in without moving scores.
    if ([a.min, a.max, a.answer].every(Number.isFinite) && a.min < a.max) {
      const step = a.step > 0 ? a.step : 1;
      const start = Math.round(((a.min + a.max) / 2) / step) * step;
      if (Math.abs(start - a.answer) <= Math.max(Math.abs(a.answer) * (a.tolerance ?? 0.2), step / 2)) {
        out.push(`estimate slider starts at ${start}, already close enough to the answer ${a.answer} — move min/max so the middle is off`);
      }
    }
  }

  if (a.type === 'hotspot') {
    if (!a.svg) out.push('hotspot needs svg');
    const vb = String(a.viewBox || '').split(/[\s,]+/).map(Number);
    if (vb.length !== 4 || !vb.every(Number.isFinite) || vb[2] <= 0 || vb[3] <= 0) out.push('hotspot needs a viewBox "x y w h"');
    const targets = a.targets || [];
    if (targets.length < 2) out.push('hotspot needs at least 2 targets (the answer and at least one decoy)');
    for (const t of targets) {
      if (!t?.id || !Number.isFinite(t?.x) || !Number.isFinite(t?.y)) out.push(`target "${t?.id || '?'}" needs id, x, y`);
      if (!bilingualName(t, bilingual)) out.push(`target "${t?.id || '?'}" needs a ${bilingual ? 'bilingual ' : ''}name`);
      if (vb.length === 4 && Number.isFinite(t?.x) && (t.x < vb[0] || t.x > vb[0] + vb[2] || t.y < vb[1] || t.y > vb[1] + vb[3])) out.push(`target "${t.id}" is outside the viewBox`);
    }
    if (!targets.some((t) => t.id === a.correct)) out.push(`correct "${a.correct}" is not a target`);
  }

  if (a.type === 'predict') {
    const opts = a.options || [];
    if (opts.length < 2) out.push('predict needs at least 2 options');
    for (const o of opts) if (!o?.val || !bilingualName(o, bilingual)) out.push(`option "${o?.val || '?'}" needs val and ${bilingual ? 'bilingual ' : ''}name`);
    if (a.correct != null && !opts.some((o) => o.val === a.correct)) out.push(`correct "${a.correct}" is not an option`);
  }

  if (a.type === 'plot') {
    const c = a.curve || {};
    if (![c.a, c.h, c.k].every((v) => typeof v === 'number')) out.push('plot needs curve: { a, h, k } numbers (and kind: quadratic | modulus)');
    else {
      if (c.kind !== undefined && !CURVE_KINDS.includes(c.kind)) out.push(`plot curve kind "${c.kind}" — known kinds: ${CURVE_KINDS.join('/')}`);
      if (!c.a) out.push('plot curve a = 0 is a straight line');
      const st = a.step || {};
      if (!['vertex', 'zeros', 'meets'].includes(st.kind)) out.push(`plot step kind "${st.kind}" — vertex, zeros or meets`);
      if (st.kind === 'meets' && typeof st.at !== 'number') out.push('a meets step needs at: <number>');
      const grid = { ...PLOT_GRID, ...(a.grid || {}) };
      if (st.kind === 'meets' && typeof st.at === 'number' && (st.at < grid.yMin || st.at > grid.yMax)) out.push(`meets line y = ${st.at} is outside the grid`);
      if (!a.equation) out.push('plot needs equation (KaTeX, shown to the student)');
      if (['vertex', 'zeros', 'meets'].includes(st.kind) && (st.kind !== 'meets' || typeof st.at === 'number') && c.a) {
        for (const [x, y] of plotTargets(a)) {
          if (!Number.isInteger(x) || !Number.isInteger(y)) out.push(`target (${x}, ${y}) is not a whole-number point`);
          if (x < grid.xMin || x > grid.xMax || y < grid.yMin || y > grid.yMax) out.push(`target (${x}, ${y}) is outside the grid`);
        }
      }
    }
  }

  if (a.type === 'numberline') {
    let set;
    try { set = parseInequality(a.solution); } catch (e) { out.push(`numberline solution: ${e.message}`); }
    if (set) {
      const min = a.min ?? -8;
      const max = a.max ?? 8;
      if (!Number.isInteger(min) || !Number.isInteger(max) || min >= max) out.push('numberline needs integer min < max');
      const s = normalize(set);
      if (!s.length) out.push('numberline solution has no solutions, so there is nothing to shade');
      if (s.length > 2) out.push('numberline solution has more than two pieces');
      for (const iv of s) for (const end of [iv.lo, iv.hi]) {
        if (!Number.isFinite(end)) continue;
        if (!Number.isInteger(end)) out.push(`numberline endpoint ${end} is not on a tick`);
        if (end < min || end > max) out.push(`numberline endpoint ${end} is off the line ${min}..${max}`);
      }
    }
    if (!a.display) out.push('numberline needs display (the inequality, as KaTeX)');
  }

  if (a.type === 'reflect') {
    for (const p of checkCubicItems([{ id: a.id || 'reflect', factors: a.factors, k: a.k, expanded: a.expanded }])) out.push(`reflect ${p}`);
  }

  if (a.type === 'venn') {
    const sets = a.sets || ['A', 'B'];
    if (![2, 3].includes(sets.length)) out.push('venn sets must be two or three letters');
    try {
      const tree = parseSet(a.expr);
      if (tree.mixed) out.push(`venn expr "${a.expr}" mixes ∪ and ∩ without brackets`);
      for (const l of lettersOf(tree)) if (!sets.includes(l)) out.push(`venn expr uses ${l}, not one of ${sets.join(', ')}`);
      if (!out.length && !regionsOf(tree, sets).length) out.push('venn expr covers no region, so there is nothing to shade');
    } catch (e) {
      out.push(`venn expr: ${e.message}`);
    }
    if (a.counts) for (const k of regionKeys(sets.length)) if (!Number.isInteger(a.counts[k])) out.push(`venn counts["${k}"] must be a whole number`);
  }

  if (a.type === 'terms') {
    try {
      const m = collectModel(a.expr);
      if (m.written.length < 3) out.push('terms needs at least 3 terms to sort');
      if (m.written.length > 8) out.push('terms has more than 8 terms');
      if (m.baskets.length < 2) out.push('terms needs at least two kinds, or there is nothing to sort');
    } catch (e) { out.push(`terms expr: ${e.message}`); }
  }

  if (a.type === 'algebra') {
    if (!['simplify', 'expand', 'solve'].includes(a.mode)) out.push('algebra mode must be simplify, expand or solve');
    try {
      if (a.mode === 'simplify') {
        const m = collectModel(a.expr);
        if (!diagnoseSimplify(a.expr, m.answerText.replace(/−/g, '-')).ok) out.push('algebra: does not accept its own answer');
      }
      if (a.mode === 'expand') {
        const m = expandModel(a.expr);
        if (!diagnoseExpand(a.expr, m.answerText.replace(/−/g, '-')).ok) out.push('algebra: does not accept its own answer');
      }
      if (a.mode === 'solve') {
        const m = equationModel({ eq: a.eq });
        if (!m.integerSteps) out.push('algebra solve: undoing it passes through a fraction');
      }
    } catch (e) { out.push(`algebra ${a.mode === 'solve' ? 'eq' : 'expr'}: ${e.message}`); }
  }

  if (a.type === 'grid') {
    try {
      const m = expandModel(a.expr);
      if (m.pieces.length !== 1) out.push('grid expr must be ONE bracket, like 5(a + 3)');
      else if (m.brackets[0].inner.length > 3) out.push('grid bracket has more than three terms');
    } catch (e) { out.push(`grid expr: ${e.message}`); }
  }

  if (a.type === 'flow') {
    try {
      const m = equationModel({ eq: a.eq });
      if (m.ops.length > 3) out.push('flow has more than three operations');
      if (!m.integerSteps) out.push('flow: undoing it passes through a fraction');
    } catch (e) { out.push(`flow eq: ${e.message}`); }
  }

  if (a.type === 'periodic') {
    if (!a.query || typeof a.query !== 'object') out.push('periodic needs a query, like { sym: "Mg" } or { group: 2 }');
    else if (!querySymbols(a.query).length) out.push(`periodic query ${JSON.stringify(a.query)} picks out no element`);
  }

  if (a.type === 'particles') {
    const boxes = a.boxes || [];
    const ask = a.ask || 'kind';
    if (!PARTICLE_ASKS.includes(ask)) out.push(`particles ask "${ask}" — ${PARTICLE_ASKS.join('/')}`);
    if (!boxes.length || boxes.length > 4) out.push('particles needs 1–4 boxes');
    for (const [i, b] of boxes.entries()) {
      if (!Array.isArray(b) || b.length < 2 || b.length > 10) out.push(`particles box ${i + 1} needs 2–10 particles`);
      else if (!b.every((f) => SUBSTANCES[f]?.atoms)) out.push(`particles box ${i + 1}: every particle must be a drawable substance (${b.filter((f) => !SUBSTANCES[f]?.atoms).join(', ')})`);
    }
    if (ask === 'find') {
      if (!PARTICLE_FIND.includes(a.find)) out.push(`particles find "${a.find}" — ${PARTICLE_FIND.join('/')}`);
      else if (boxes.length < 2) out.push('particles find needs at least two boxes to choose from');
      else if (!out.length) {
        const hits = boxes.filter((b) => { const v = classifyBox(b); return a.find === 'pure' ? v.pure : v.kind === a.find; });
        if (!hits.length) out.push(`particles find "${a.find}": no box is one`);
      }
    }
    if (ask === 'kind' && a.choices) for (const c of a.choices) if (!['element', 'compound', 'mixture'].includes(c)) out.push(`particles choice "${c}"`);
    if (ask === 'kind' && a.choices && !out.length) {
      for (const b of boxes) if (!a.choices.includes(classifyBox(b).kind)) out.push(`particles: a box is a ${classifyBox(b).kind}, which is not one of the choices`);
    }
  }

  if (a.type === 'line') {
    for (const p of checkLineActivity(a, { bilingual })) out.push(`line ${p}`);
    // An optional circle drawn on the grid (swept on after the check, or
    // `always`): a whole-number centre and r², inside the grid.
    if (a.circle !== undefined) {
      const c = a.circle || {};
      const g = a.grid || { xMin: -8, xMax: 8, yMin: -8, yMax: 8 };
      if (!Array.isArray(c.centre) || c.centre.length !== 2 || !c.centre.every((v) => typeof v === 'number')) out.push('line circle needs centre: [x, y] numbers');
      else if (!(typeof c.r2 === 'number' && c.r2 > 0)) out.push('line circle needs r2: a positive number');
      else {
        const r = Math.sqrt(c.r2);
        if (c.centre[0] - r < g.xMin || c.centre[0] + r > g.xMax || c.centre[1] - r < g.yMin || c.centre[1] + r > g.yMax) out.push('line circle does not fit inside the grid');
      }
    }
  }

  if (a.type === 'shift') {
    if (a.kind === 'chain') out.push('shift: a chain of moves belongs in the Slide the Digits task, not on a slide');
    else {
      try {
        const m = shiftModel(a);
        if (m.cols.length > 9) out.push(`shift: the table would be ${m.cols.length} columns wide — at most 9 on a slide`);
      } catch (e) { out.push(`shift: ${e.message}`); }
    }
  }

  if (a.type === 'round') {
    if (!checkPlaces(a.to)) out.push('round: `to` must be a whole number from -3 (nearest 1000) to 5 (5 d.p.); 0 is the nearest whole number');
    else {
      try {
        if (roundModel(String(a.n), a.to).alreadyThere) out.push('round: the number is already written to that accuracy — nothing to round');
      } catch (e) { out.push(`round: ${e.message}`); }
    }
  }

  if (a.type === 'ineq') {
    const ask = a.ask || 'draw';
    if (!INEQ_ASKS.includes(ask)) out.push(`ineq ask "${ask}" — ${INEQ_ASKS.join('/')}`);
    else {
      try {
        if (ask === 'list') ineqModel({ id: a.id, kind: 'between', ineqs: a.ineqs });
        else ineqModel({ id: a.id, kind: ask === 'read' ? 'read' : 'draw', ineq: a.ineq });
      } catch (e) { out.push(`ineq: ${e.message}`); }
    }
  }

  if (a.type === 'busstop') {
    try {
      const m = shortDivModel(a);
      if (m.cols.length > 8) out.push(`busstop: ${m.cols.length} columns — at most 8 on a slide`);
      if (m.zerosNeeded > 4) out.push(`busstop: needs ${m.zerosNeeded} zeros added — at most 4 on a slide`);
      if (m.dp != null && m.stopsAt != null && m.stopsAt <= m.dp) out.push(`busstop: ${m.dividendText} ÷ ${m.divisor} stops within ${m.dp} places, so there is nothing to round — drop dp`);
    } catch (e) { out.push(`busstop: ${e.message}`); }
  }

  if (a.type === 'formula') {
    const ask = a.ask || 'count';
    if (!['count', 'write'].includes(ask)) out.push('formula ask must be count or write');
    try {
      countsOf(a.formula);
      if (ask === 'write' && !SUBSTANCES[a.formula]?.atoms) out.push(`formula write: ${a.formula} has no drawing in utils/particles.js`);
    } catch (e) { out.push(`formula: ${e.message}`); }
  }

  for (const [type, check] of [['chain', checkChainActivity], ['cycle', checkCycleActivity], ['ph', checkPhActivity]]) {
    if (a.type === type) for (const p of check(a, { bilingual })) out.push(`${type} ${p}`);
  }
  // @@U04_1_ACT_CHECK@@
  if (a.type === 'decorder') for (const p of checkDecOrderActivity(a)) out.push(p);

  // @@U04_2_ACT_CHECK@@
  // `deccol` (Maths 4.2): one written column sum — line up the points, zeros, columns.
  if (a.type === 'deccol') for (const p of checkDecColumnActivity(a)) out.push(`deccol ${p}`);

  // @@U04_3_ACT_CHECK@@
  if (a.type === 'pointback') for (const p of checkPointBackActivity(a)) out.push(`pointback: ${p}`);

  // @@U04_4_ACT_CHECK@@

  // @@U04_5_ACT_CHECK@@
  if (a.type === 'makeeasy') for (const p of checkEasyActivity(a, { bilingual })) out.push(`makeeasy ${p}`);

  // @@SCI_U03_1_ACT_CHECK@@

  // @@U05_1_ACT_CHECK@@
  if (a.type === 'anglesum') for (const p of checkAngleSumActivity(a, { bilingual })) out.push(`anglesum ${p}`);

  // @@U05_2_ACT_CHECK@@
  if (a.type === 'anglepair') for (const p of checkAnglePairActivity(a, { bilingual })) out.push(`anglepair ${p}`);

  // @@U05_3_ACT_CHECK@@
  if (a.type === 'zeroline') for (const p of checkZeroLineActivity(a)) out.push(`zeroline ${p}`);

  // @@SCI_U03_2_ACT_CHECK@@

  // @@U06_1_ACT_CHECK@@

  // @@U06_2_ACT_CHECK@@

  // @@SCI_U03_3_ACT_CHECK@@
  if (a.type === 'orbitlab') for (const p of checkOrbitLabActivity(a)) out.push(`orbitlab ${p}`);

  // @@SCI_U03_4_ACT_CHECK@@

  // @@SCI_U03_5_ACT_CHECK@@

  // @@SCI_U03_6_ACT_CHECK@@
  // `energychange` (Science 3.6): one From… To… diagram, walked; proved like the task's items.
  if (a.type === 'energychange') for (const p of checkEnergyChangeActivity(a)) out.push(`energychange ${p}`);

  // @@SCI_U03_7_ACT_CHECK@@
  if (a.type === 'energysplit') for (const p of checkEnergySplitActivity(a)) out.push(`energysplit ${p}`);

  return out;
}

// ── retrying an activity ────────────────────────────────────────────────────
// Notes lets a student reopen an activity they got wrong (the end-of-lesson
// "Fix my mistakes"); ActivityBlock and Y7Activities seed the retry from the
// previous result with these.

/** The entries of a saved `{ key: value }` answer map that pass `keep`. */
export function keepWhere(map, keep) {
  if (!map || typeof map !== 'object') return {};
  return Object.fromEntries(Object.entries(map).filter(([k, v]) => keep(k, v)));
}

/**
 * Does a retry of this activity keep the parts the student got right? True for
 * the several-part activities; a one-answer activity (a prediction, a slider,
 * one tap) simply starts again. Notes uses it to word its "second try" note.
 */
export function retryKeepsParts(activity) {
  if (!activity) return false;
  if (activity.type === 'formula') return activity.ask !== 'write';
  return ['sort', 'order', 'plot', 'reflect', 'venn', 'terms', 'grid', 'flow', 'particles', 'line', 'busstop'].includes(activity.type);
}
