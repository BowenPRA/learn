/**
 * Where Did It Go? (ENERGY_SPLIT) — the proof. scripts/validate-entry.js calls
 * checkEnergySplitConfig on a unit's `energySplit`, and utils/activity.js calls
 * checkEnergySplitActivity on an `energysplit` deck activity. An empty list
 * means every stage accepts its own answer and every named slip fires on its
 * own canonical wrong answer (and opens the stage it belongs to, in a quick item).
 */
import {
  ENERGIES, DEVICES, CHASE, SORT_STAGES, energyOf, splitModel, answerOf, countSlips,
  diagnoseFrom, diagnoseBox, diagnoseNumber, diagnoseChase, diagnoseDecide, diagnoseQuick, stageAsk,
} from './energySplit.js';
import { CHASE_WHY } from './energySplitData.js';

const COUNT = ['usefulJ', 'wastedJ', 'inJ', 'inA', 'inB'];
const whole = (n) => Number.isInteger(n);

/** Every case a round can meet: { stage, input, code, open? }. */
export function slipCases(m) {
  const cases = [];
  const add = (stage, input, code, open) => cases.push({ stage, input, code, open });
  if (m.kind === 'pair') {
    for (const s of ['inA', 'inB']) {
      add(s, String(answerOf(m, s)), 'ok');
      for (const sl of countSlips(m, s)) add(s, String(sl.value), sl.code);
    }
    for (const o of m.decideOptions) add('decide', o.id, o.id === 'right' ? 'ok' : o.id);
    return cases;
  }
  const { answer } = m;
  if (m.sort) {
    for (const o of m.fromOptions) add('from', o, o === answer.from ? 'ok' : o === m.device.fromWrong ? 'fromWrong' : 'fromOutput');
    add('useful', answer.useful, 'ok');
    for (const w of answer.wasted) add('useful', [...answer.useful, w], 'want');
    for (const d of m.device.decoys) add('useful', [...answer.useful, d.chip], 'notMade');
    if (answer.useful.length > 1) add('useful', answer.useful.slice(1), 'missed');
    add('wasted', answer.wasted, 'ok');
    for (const d of m.device.decoys) add('wasted', [...answer.wasted, d.chip], 'notMade');
    if (answer.wasted.length > 1) add('wasted', answer.wasted.slice(1), 'missed');
  }
  for (const s of m.countStages) {
    add(s, String(answerOf(m, s)), 'ok');
    for (const sl of countSlips(m, s)) add(s, String(sl.value), sl.code);
  }
  if (m.chase) for (const o of m.chaseOptions) add('chase', o.id, o.id === CHASE[m.chase].right ? 'ok' : o.id);
  if (m.entry.includes('quick')) {
    const right = answerOf(m, 'quick');
    add('quick', right, 'ok');
    if (m.sort) {
      const without = (chip) => Object.fromEntries(Object.entries(right.boxes).filter(([c]) => c !== chip));
      add('quick', { ...right, boxes: { ...without(answer.from), [m.device.fromWrong]: 'from' } }, 'fromWrong', 'from');
      add('quick', { ...right, boxes: { ...right.boxes, [answer.wasted[0]]: 'useful', [answer.useful[0]]: 'wasted' } }, 'want', 'useful');
      if (answer.wasted.length > 1) add('quick', { ...right, boxes: { ...right.boxes, [answer.wasted[0]]: 'useful' } }, 'want', 'useful');
      add('quick', { ...right, boxes: { ...right.boxes, [m.device.decoys[0].chip]: 'wasted' } }, 'notMade', 'wasted');
      if (answer.wasted.length > 1) add('quick', { ...right, boxes: without(answer.wasted[0]) }, 'missed', 'wasted');
    }
    if (m.quickNum) for (const sl of countSlips(m, m.quickNum)) add('quick', { ...right, num: String(sl.value) }, sl.code, sl.openAt);
  }
  return cases;
}

/** Run one case; the code the engine gives (and, for quick, the stage it opens). */
export function runCase(m, c) {
  switch (c.stage) {
    case 'from': return { code: diagnoseFrom(m, c.input).code };
    case 'useful': case 'wasted': return { code: diagnoseBox(m, c.stage, c.input).code };
    case 'chase': return { code: diagnoseChase(m, c.input).code };
    case 'decide': return { code: diagnoseDecide(m, c.input).code };
    case 'quick': { const d = diagnoseQuick(m, c.input); return { code: d.code, open: d.open?.[0] }; }
    default: return { code: diagnoseNumber(m, c.stage, c.input).code };
  }
}

function itemShapeProblems(item) {
  const out = [];
  if (item.kind === 'pair') {
    for (const k of ['a', 'b']) if (!DEVICES[item[k]]?.pct) out.push(`pair needs two devices with a percentage (${k}: "${item[k]}")`);
    if (!(item.useful > 0)) out.push('pair needs `useful` joules');
    return out;
  }
  const d = DEVICES[item.device];
  if (!d) return [`unknown device "${item.device}"`];
  const ask = item.ask ?? (item.total != null ? 'both' : null);
  if (ask && !['both', 'useful', 'wasted', 'in'].includes(ask)) out.push(`ask "${ask}" is not both / useful / wasted / in`);
  const pct = item.pct ?? d.pct;
  if (ask && !(whole(pct) && pct >= 1 && pct <= 99)) out.push(`asks for joules but ${item.device} has no percentage`);
  if (ask && ask !== 'in' && !(whole(item.total) && item.total > 0 && item.total % 100 === 0)) out.push(`total ${item.total} J is not a multiple of 100`);
  if (ask === 'in' && !(item.useful > 0)) out.push('ask "in" needs `useful` joules');
  if (item.chase && !CHASE[item.chase]) out.push(`chase "${item.chase}" is not where / recover`);
  if (item.sort === false && !ask && !item.chase) out.push('asks nothing (sort: false, no numbers, no chase)');
  return out;
}

function modelProblems(m) {
  const out = [];
  if (m.kind === 'pair') {
    for (const v of ['inA', 'inB']) if (!whole(m[v])) out.push(`${v} = ${m[v]} J is not a whole number`);
    if (!(m.wA > 0 && m.wB > 0)) out.push('each lamp must waste something');
    if (m.diff === 0) out.push('the two devices waste the same: nothing to decide');
    return out;
  }
  const d = m.device;
  const outputs = [...d.useful, ...d.wasted];
  if (m.sort) {
    if (outputs.map(energyOf).includes(d.from)) out.push(`${m.deviceId}: what goes in (${d.from}) is also an output`);
    if (m.fromOptions.length !== 3) out.push(`${m.deviceId}: the From stage needs three different choices (has ${m.fromOptions.join(', ')})`);
    if (!d.decoys.some((x) => x.chip === d.fromWrong)) out.push(`${m.deviceId}: fromWrong "${d.fromWrong}" is not one of its decoys`);
    for (const x of d.decoys) if (outputs.includes(x.chip) || x.chip === d.from) out.push(`${m.deviceId}: decoy "${x.chip}" is something it really makes`);
    if (!m.walk && !m.quickNum && m.ask) out.push('a quick item asks one number: ask "useful" or "wasted"');
  }
  if (!m.walk && !m.sort && !m.quickNum) out.push('a quick item with no diagram must ask one number');
  for (const s of m.countStages) {
    const a = answerOf(m, s);
    if (!whole(a)) out.push(`${s} = ${a} J is not a whole number`);
    const vals = countSlips(m, s).map((x) => x.value);
    const dup = vals.find((v, i) => vals.indexOf(v) !== i);
    if (dup != null) out.push(`${s}: two slips give the same value (${dup})`);
  }
  for (const c of outputs) if (!ENERGIES[energyOf(c)]) out.push(`${m.deviceId}: "${c}" is not an energy`);
  for (const c of outputs.filter((x) => x.includes(':'))) if (!d.where?.[c]?.en || !d.where?.[c]?.fr) out.push(`${m.deviceId}: chip "${c}" needs its place in both languages (where)`);
  return out;
}

/** Problems with the engine's own tables (the same for every unit). */
export function checkEnergySplitTables() {
  const out = [];
  for (const [id, d] of Object.entries(DEVICES)) {
    for (const k of ['the', 'source', 'want']) if (!d[k]?.en || !d[k]?.fr) out.push(`device ${id}: ${k} needs English and French`);
    if (!d.en || !d.fr) out.push(`device ${id}: its name needs English and French`);
    for (const x of d.decoys) if (!x.en || !x.fr) out.push(`device ${id}: decoy ${x.chip} needs its why in English and French`);
    if (!ENERGIES[d.from]) out.push(`device ${id}: from "${d.from}" is not an energy`);
  }
  for (const [id, q] of Object.entries(CHASE)) {
    if (!q.en || !q.fr) out.push(`chase ${id}: the question needs English and French`);
    for (const o of q.options) {
      if (!o.en || !o.fr) out.push(`chase ${id}: option ${o.id} needs English and French`);
      if (!CHASE_WHY[o.id]?.en || !CHASE_WHY[o.id]?.fr) out.push(`chase ${id}: option ${o.id} has no why`);
    }
  }
  return out;
}

/** Every problem with one item: its shape, its derived numbers, and every case. */
export function checkEnergySplitItem(item) {
  const label = `item ${item.id || '?'}`;
  const shape = itemShapeProblems(item);
  if (shape.length) return shape.map((p) => `${label}: ${p}`);
  let m;
  try { m = splitModel(item); } catch (e) { return [`${label}: ${e.message}`]; }
  const out = modelProblems(m).map((p) => `${label}: ${p}`);
  if (out.length) return out;
  for (const c of slipCases(m)) {
    let got;
    try { got = runCase(m, c); } catch (e) { got = { code: `error: ${e.message}` }; }
    if (got.code !== c.code) out.push(`${label}: ${c.stage} ${JSON.stringify(c.input)} should be "${c.code}" but the engine says "${got.code}"`);
    else if (c.open && got.open !== c.open) out.push(`${label}: quick "${c.code}" should open ${c.open} but opens ${got.open}`);
  }
  for (const s of [...(m.entry || []), ...(m.stages || [])]) {
    const q = stageAsk(m, s);
    if (!q?.en || !q?.fr) out.push(`${label}: stage ${s} has no question in both languages`);
  }
  return out;
}

/** A unit's `energySplit`: its title, levels and every item proved. */
export function checkEnergySplitConfig(cfg) {
  const out = [];
  if (!cfg?.title || !cfg?.titleFr) out.push('needs a title and titleFr');
  if (!(cfg?.items || []).length) out.push('has no items');
  const ids = new Set();
  for (const it of cfg?.items || []) {
    if (ids.has(it.id)) out.push(`item ${it.id}: duplicate id`);
    ids.add(it.id);
    const lv = cfg.levels?.[it.level];
    if (!lv?.en || !lv?.fr) out.push(`item ${it.id}: level ${it.level} needs a name in English and French`);
    out.push(...checkEnergySplitItem(it));
    const dev = it.kind === 'pair' ? [it.a, it.b] : [it.device];
    for (const k of dev) if (cfg.pictures && !cfg.pictures[k]) out.push(`item ${it.id}: no picture for "${k}"`);
  }
  out.push(...checkEnergySplitTables());
  return out;
}

/** An `energysplit` deck activity: one item, proved, with its words in both languages. */
export function checkEnergySplitActivity(a) {
  const out = [];
  for (const k of ['prompt', 'explain']) if (!a[k] || !a[`${k}Fr`]) out.push(`needs ${k} and ${k}Fr`);
  if (a.kind === 'pair') out.push('a deck activity is one device, not a pair');
  out.push(...checkEnergySplitItem({ ...a, level: 1 }));
  return out;
}

export { SORT_STAGES, COUNT };
