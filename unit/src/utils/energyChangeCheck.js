/**
 * From… To… (ENERGY_CHANGE) — the proof. scripts/validate-entry.js calls
 * checkEnergyChangeConfig on a unit's `energyChange` and utils/activity.js
 * calls checkEnergyChangeActivity on each deck `energychange` block; an empty
 * list means every right answer is accepted, every named slip fires on its own
 * canonical wrong answer, no two slips claim the same answer, and every slip
 * and scene is worded in English and French.
 */
import {
  ENERGY_IDS, SCENES, SHAPES, HAPPENS, BUILD_KINDS, KINDS, WAY_IDS, THEN_IDS,
  energyModel, diagnoseHappens, diagnoseShape, diagnoseSlot, diagnoseOutputs, diagnoseBuild,
  diagnosePick, diagnoseHotter, diagnoseWay, diagnoseThen, heatOptions,
} from './energyChange.js';

const has = (s) => typeof s === 'string' && s.trim() !== '';
const swap = (list, i, j) => { const o = [...list]; [o[i], o[j]] = [o[j], o[i]]; return o; };

/** Problems with the engine's own tables (the same for every unit). */
export function checkEnergyTables() {
  const out = [];
  for (const [k, t] of Object.entries({ ...HAPPENS, ...SHAPES })) if (!has(t.en) || !has(t.fr)) out.push(`${k} needs en and fr`);
  for (const [id, S] of Object.entries(SCENES)) {
    const at = `scene ${id}`;
    for (const f of ['en', 'fr', 'name', 'nameFr', 'note', 'noteFr']) if (!has(S[f])) out.push(`${at}: needs ${f}`);
    if (S.heat) {
      if (S.heat.length !== 2 || S.heat.some((x) => !has(x.en) || !has(x.fr) || !Number.isFinite(x.t))) out.push(`${at}: heat needs two things with en, fr and t`);
      else if (S.heat[0].t === S.heat[1].t) out.push(`${at}: the two things are at the same temperature, so no heat moves`);
      continue;
    }
    const slots = S.slots || [];
    if (slots.length < 2) { out.push(`${at}: a diagram needs at least two boxes`); continue; }
    if (slots.some((e) => !ENERGY_IDS.includes(e))) out.push(`${at}: slots must be among ${ENERGY_IDS.join('/')}`);
    if (new Set(slots).size < slots.length) out.push(`${at}: an energy appears twice`);
    if (!(S.chain >= 1 && S.chain <= slots.length) || (slots.length === 2 && S.chain !== 2)) out.push(`${at}: chain must be 1..${slots.length} (2 for one change)`);
    if (!['event', 'process'].includes(S.happens)) out.push(`${at}: happens must be event or process`);
    for (const e of S.side || []) {
      if (!ENERGY_IDS.includes(e)) out.push(`${at}: side "${e}" is not an energy`);
      if (slots.includes(e)) out.push(`${at}: side "${e}" is in the diagram`);
    }
    if (S.backWhy !== undefined && (!has(S.backWhy) || !has(S.backWhyFr))) out.push(`${at}: backWhy needs English and French`);
    const lineLen = S.chain;
    for (const t of S.traps || []) {
      if (!t.id || !has(t.why) || !has(t.whyFr)) out.push(`${at}: trap ${t.id || '?'} needs id, why and whyFr`);
      if (!ENERGY_IDS.includes(t.pick)) out.push(`${at}: trap ${t.id} pick "${t.pick}" is not an energy`);
      if (!(t.at === 'outputs' ? slots.length > lineLen : Number.isInteger(t.at) && t.at >= 0 && t.at < lineLen)) out.push(`${at}: trap ${t.id} at ${t.at} is not a box`);
      // A trap names its own wrong answer and wins over the generic slip there
      // (the power station's "kinetic" first is the windmill, not just "too
      // soon"). It may not be the right answer at its box, or a box already
      // filled before it — those are never a misconception about this box.
      const before = t.at === 'outputs' ? slots : slots.slice(0, (Number.isInteger(t.at) ? t.at : 0) + 1);
      if (before.includes(t.pick)) out.push(`${at}: trap ${t.id} pick "${t.pick}" is the right answer or an earlier box`);
    }
  }
  return out;
}

/** An energy in none of the scene's boxes, side effects or traps: a plain wrong answer. */
function foreign(m) {
  const used = new Set([...(m.slots || []), ...(m.S.side || []), ...(m.S.traps || []).map((t) => t.pick)]);
  return ENERGY_IDS.find((e) => !used.has(e));
}

/** Every wrong answer that can be named for an item, with the code it must get. */
export function slipCases(m) {
  const cases = [];
  // A scene's trap wins over the generic slip at its input, so the generic
  // case is not listed there (the trap's own case is).
  const trapped = new Set((m.S?.traps || []).map((t) => `${t.at === 'outputs' ? 'outputs' : `slot${t.at}`}:${t.pick}`));
  const add = (stage, input, code) => {
    if (!code.startsWith('trap:') && typeof input === 'string' && trapped.has(`${stage}:${input}`)) return;
    cases.push({ stage, input, code });
  };
  if (m.kind === 'read') {
    for (const o of m.options) {
      const rev = o.slots.join('|') === [...m.diagram].reverse().join('|');
      const half = !rev && (o.slots[0] === m.diagram[0] || o.slots[o.slots.length - 1] === m.diagram[m.diagram.length - 1]);
      add('pick', o.id, o.id === m.answer ? 'ok' : rev ? 'backwards' : half ? 'half' : 'other');
    }
    return cases;
  }
  if (m.kind === 'heat') {
    add('hotter', m.hot, 'ok'); add('hotter', m.cold, 'notHotter');
    for (const v of WAY_IDS) add('way', v, v === m.way ? 'ok' : v === 'cold' ? 'coldMoves' : 'wrongWay');
    for (const v of THEN_IDS) add('then', v, v === 'right' ? 'ok' : 'then');
    return cases;
  }
  const S = m.S;
  const f = foreign(m);
  if (S.happens) for (const v of ['event', 'process']) add('happens', v, v === S.happens ? 'ok' : 'happens');
  for (const s of m.shapes) add('shape', s, s === m.shape ? 'ok' : s === 'chain' ? 'chained' : 'branched');
  for (let i = 0; i < m.line.length; i++) {
    const st = `slot${i}`;
    add(st, m.line[i], 'ok');
    for (const t of (S.traps || []).filter((x) => x.at === i)) add(st, t.pick, `trap:${t.id}`);
    if (i > 0) add(st, m.line[i - 1], 'same');
    if (i > 1) add(st, m.line[i - 2], 'twice');
    const later = [...m.line.slice(i + 1), ...m.outputs];
    const lastBoxes = m.outputs.length ? m.outputs : [m.line[m.line.length - 1]];
    for (const e of later) add(st, e, i === 0 && lastBoxes.includes(e) ? 'backwards' : 'skip');
    if (i === m.line.length - 1 && !m.outputs.length) for (const e of S.side || []) add(st, e, 'notTheJob');
    if (f) add(st, f, i === 0 ? 'fromWrong' : 'toWrong');
  }
  if (m.outputs.length) {
    const outs = m.outputs;
    add('outputs', outs, 'ok');
    add('outputs', [...outs].reverse(), 'ok');
    add('outputs', [outs[0], outs[0], ...outs.slice(2)], 'twice');
    add('outputs', [m.line[m.line.length - 1], ...outs.slice(1)], 'same');
    for (const e of S.side || []) add('outputs', [e, ...outs.slice(1)], 'notTheJob');
    for (const t of (S.traps || []).filter((x) => x.at === 'outputs')) add('outputs', [t.pick, ...outs.slice(1)], `trap:${t.id}`);
    if (f) add('outputs', [...outs.slice(0, -1), f], 'missing');
  }
  // The whole diagram at once (quick), with the stage each slip opens.
  add('build', { shape: m.shape, fill: m.slots }, 'ok@');
  if (!m.outputs.length) add('build', { shape: m.shape, fill: [...m.slots].reverse() }, 'backwards@slot0');
  for (const s of m.shapes.filter((x) => x !== m.shape)) add('build', { shape: s, fill: m.slots }, `${s === 'chain' ? 'chained' : 'branched'}@shape`);
  if (m.shape === 'chain') for (let k = 1; k + 1 < m.line.length; k++) add('build', { shape: m.shape, fill: swap(m.slots, k, k + 1) }, `order@slot${k}`);
  if (f) add('build', { shape: m.shape, fill: [f, ...m.slots.slice(1)] }, 'fromWrong@slot0');
  if (f && m.outputs.length) add('build', { shape: m.shape, fill: [...m.slots.slice(0, -1), f] }, 'missing@outputs');
  if (f && !m.outputs.length) add('build', { shape: m.shape, fill: [...m.slots.slice(0, -1), f] }, `toWrong@slot${m.line.length - 1}`);
  return cases;
}

/** Run one case against the engine; the code it gets (build cases: code@stage). */
export function runCase(m, c) {
  const { stage, input } = c;
  if (stage === 'pick') return diagnosePick(m, input);
  if (stage === 'hotter') return diagnoseHotter(m, input);
  if (stage === 'way') return diagnoseWay(m, input);
  if (stage === 'then') return diagnoseThen(m, input);
  if (stage === 'happens') return diagnoseHappens(m, input);
  if (stage === 'shape') return diagnoseShape(m, input);
  if (stage === 'outputs') return diagnoseOutputs(m, input);
  if (stage === 'build') { const d = diagnoseBuild(m, input); return { ...d, code: `${d.code}@${d.stage || ''}` }; }
  return diagnoseSlot(m, Number(stage.slice(4)), input);
}

const key = (c) => `${c.stage}:${JSON.stringify(c.input)}`;

/** Problems with one item's model: wrong codes, collisions, unworded slips. */
export function checkModel(m) {
  const out = [];
  const seen = new Map();
  for (const c of slipCases(m)) {
    const k = key(c);
    if (seen.has(k) && seen.get(k) !== c.code) out.push(`${c.stage}: ${JSON.stringify(c.input)} is claimed by both "${seen.get(k)}" and "${c.code}"`);
    seen.set(k, c.code);
    let d;
    try { d = runCase(m, c); } catch (e) { out.push(`${c.stage}: ${JSON.stringify(c.input)} throws ${e.message}`); continue; }
    if (d.code !== c.code) out.push(`${c.stage}: ${JSON.stringify(c.input)} should be "${c.code}" but the engine says "${d.code}"`);
    if (!d.ok && !d.soft && (!has(d.en) || !has(d.fr))) out.push(`${c.stage}: slip "${d.code}" has no English or French words`);
  }
  if (m.kind === 'heat') {
    for (const st of ['hotter', 'way', 'then']) for (const o of heatOptions(m, st, 'fr')) if (!has(o.label)) out.push(`heat ${st}: an option has no French`);
  }
  return out;
}

/** Every one-box answer at every stage of every diagram scene: the engine never throws and always words a slip. */
export function sweepScenes() {
  const out = [];
  for (const [id, S] of Object.entries(SCENES)) {
    if (!S.slots) continue;
    const kind = S.slots.length === 2 ? 'one' : S.chain === S.slots.length ? 'chain' : S.chain === 1 ? 'branch' : 'mixed';
    let m;
    try { m = energyModel({ id, level: 1, kind, scene: id }); } catch (e) { out.push(`scene ${id}: ${e.message}`); continue; }
    for (let i = 0; i < m.line.length; i++) {
      for (const e of ENERGY_IDS) {
        const d = diagnoseSlot(m, i, e);
        if (!d.ok && (!has(d.en) || !has(d.fr))) out.push(`scene ${id} box ${i}: "${e}" gets an unworded slip ${d.code}`);
      }
    }
    for (const e of ENERGY_IDS) {
      if (!m.outputs.length) continue;
      const d = diagnoseOutputs(m, [e, ...m.outputs.slice(1)]);
      if (!d.ok && (!has(d.en) || !has(d.fr))) out.push(`scene ${id} outputs: "${e}" gets an unworded slip ${d.code}`);
    }
  }
  return out;
}

/** Problems with a unit's `energyChange`, as strings. */
export function checkEnergyChangeConfig(cfg) {
  const out = [...checkEnergyTables()];
  if (!cfg || typeof cfg !== 'object') return ['energyChange is not an object'];
  if (!has(cfg.title) || !has(cfg.titleFr)) out.push('needs title and titleFr');
  if (cfg.intro !== undefined && (!has(cfg.intro) || !has(cfg.introFr))) out.push('intro needs English and French');
  const items = cfg.items || [];
  if (!items.length) out.push('has no items');
  const ids = new Set();
  for (const it of items) {
    const at = `item ${it.id || '?'}`;
    if (!it.id || ids.has(it.id)) out.push(`${at}: needs a unique id`);
    ids.add(it.id);
    const lv = cfg.levels?.[it.level];
    if (!has(lv?.en) || !has(lv?.fr)) out.push(`${at}: level ${it.level} has no English and French name in levels`);
    if (!KINDS.includes(it.kind)) { out.push(`${at}: kind must be ${KINDS.join('/')}`); continue; }
    let m;
    try { m = energyModel(it); } catch (e) { out.push(`${at}: ${e.message}`); continue; }
    if (m.kind === 'read') {
      if (new Set(it.options).size !== 3) out.push(`${at}: read needs three different options`);
      if ((it.diagram || []).some((e) => !ENERGY_IDS.includes(e))) out.push(`${at}: the diagram must be energies`);
    }
    const pics = m.kind === 'read' ? it.options : [it.scene];
    for (const p of pics) if (!cfg.pictures?.[p]) out.push(`${at}: no picture for scene "${p}" in pictures`);
    for (const p of checkModel(m)) out.push(`${at}: ${p}`);
  }
  for (const p of sweepScenes()) out.push(p);
  return out;
}

/** Problems with one deck `energychange` activity (walked, no event/process stage). */
export function checkEnergyChangeActivity(a) {
  const out = [];
  if (!BUILD_KINDS.includes(a.kind) && a.kind !== 'heat') return [`kind must be ${[...BUILD_KINDS, 'heat'].join('/')}`];
  let m;
  try { m = energyModel({ id: a.id, level: 1, kind: a.kind, scene: a.scene, walk: a.walk ?? true, happens: false }); } catch (e) { return [e.message]; }
  if (!has(a.promptFr) || !has(a.explainFr)) out.push('needs promptFr and explainFr');
  for (const p of checkModel(m)) out.push(p);
  return out;
}
