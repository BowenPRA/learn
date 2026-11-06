/**
 * Orbit Lab (ORBIT_LAB) — the proof. scripts/validate-entry.js calls
 * checkOrbitLabConfig on a unit's `orbitLab` (the @@SCI_U03_3_CHECK@@ marker),
 * and utils/activity.js calls checkOrbitLabActivity on an `orbitlab` slide
 * activity. An empty list means every right answer is accepted, every named
 * slip fires on its own canonical wrong answer, and every table is whole.
 */
import {
  ARROWS, roundModel, arrowCodes, pullGeometry, fill,
  diagnoseArrow, diagnoseBoth, diagnoseWhy, diagnoseDraw, diagnosePattern, diagnoseReason, diagnosePredict,
  diagnoseForces, diagnoseSpeed, diagnoseCoastBoth, answerOf, scaleFactors,
} from './orbitLab.js';
import { PULL_SCENES, ORBITERS, PULL_SLIPS, PULL_REASONS, COAST_SCENES, FORCE_CHIPS, COAST_SLIPS, SPEED_REASONS } from './orbitLabData.js';
import { GRAPH_SETS, PATTERNS, PATTERN_IDS } from './orbitLabSets.js';

const opp = (k) => (k + 4) % 8;

/**
 * The right arrows worked out a second way, from the picture alone: on a
 * circle the pull points back along the radius and the path is a quarter turn
 * on; on the comet the Sun is 45° below the level of the comet (the short
 * axis equals the Sun's distance from the middle); Neptune is straight out.
 */
function expectedArrows(scene, at, dir) {
  const turn = dir === 'acw' ? 2 : -2;
  const shape = PULL_SCENES[scene].shape;
  if (shape === 'comet') {
    const top = at === 90;
    return { to: top ? 7 : 1, fwd: top === (dir === 'acw') ? 4 : 0 };
  }
  const a = at / 45;
  if (shape === 'neptune') return { to: a % 8, fwd: (a + turn + 8) % 8 };
  return { to: (a + 4) % 8, fwd: (a + turn + 8) % 8 };
}

/** Every answer a round can get, with the code it must get. */
export function slipCases(m) {
  const cases = [];
  const add = (stage, input, code) => cases.push({ stage, input, code });
  if (m.kind === 'pull') {
    for (const st of ['pull', 'path']) if (m.ask.includes(st)) for (const k of ARROWS) add(st, k, m[st][k]);
    if (m.stages.includes('both')) {
      add('both', { pull: m.to, path: m.fwd }, 'ok');
      add('both', { pull: opp(m.to), path: m.fwd }, 'pull:away');
      add('both', { pull: m.to, path: opp(m.to) }, 'path:away');
    }
    if (m.ask.includes('why')) for (const r of m.reasons) add('why', r, r === 'keeps' ? 'ok' : r);
  } else if (m.kind === 'graph') {
    const todo = m.rows.filter((r) => !r.given);
    const right = answerOf(m, 'draw');
    if (m.ask.includes('draw')) {
      add('draw', right, 'ok');
      add('draw', {}, 'missing');
      const i = todo.findIndex((r, j) => j + 1 < todo.length && r.v !== todo[j + 1].v);
      if (i >= 0) add('draw', { ...right, [todo[i].id]: todo[i + 1].v, [todo[i + 1].id]: todo[i].v }, 'swap');
      const k = scaleFactors(m).find((f) => todo.every((r) => Math.round(r.v * f) >= 1 && Math.round(r.v * f) <= m.max)
        && todo.filter((r) => Math.round(r.v * f) !== r.v).length >= 2);
      if (k) add('draw', Object.fromEntries(todo.map((r) => [r.id, Math.round(r.v * k)])), 'scale');
      const one = todo[todo.length - 1];
      add('draw', { ...right, [one.id]: one.v === m.max ? one.v - 1 : one.v + 1 }, 'bar');
    }
    if (m.ask.includes('pattern')) for (const p of PATTERN_IDS) add('pattern', p, p === 'down' ? 'ok' : p);
    if (m.ask.includes('why')) for (const r of m.reasonIds) add('reason', r, r === 'weaker' ? 'ok' : r);
    if (m.ask.includes('predict')) for (const o of m.predict.options) add('predict', o.val, o.code);
  } else {
    if (m.where === 'space') {
      add('forces', ['none'], 'ok');
      add('forces', ['air'], 'air');
      add('forces', ['friction'], 'friction');
      add('forces', ['gravity'], 'gravity');
    } else {
      add('forces', ['air', 'friction'], 'ok');
      add('forces', ['none'], 'nothing');
      add('forces', ['air', 'friction', 'gravity'], 'gravity');
      add('forces', ['friction'], 'noair');
      add('forces', ['air'], 'nofriction');
    }
    add('forces', [], 'missing');
    for (const s of m.speeds) add('speed', s, SPEED_REASONS[m.where][s].ok ? 'ok' : s);
    if (m.stages.includes('both')) add('coastBoth', answerOf(m, 'both'), 'ok');
  }
  return cases;
}

const RUN = {
  pull: (m, x) => diagnoseArrow(m, 'pull', x),
  path: (m, x) => diagnoseArrow(m, 'path', x),
  both: (m, x) => diagnoseBoth(m, x),
  why: (m, x) => diagnoseWhy(m, x),
  draw: (m, x) => diagnoseDraw(m, x),
  pattern: (m, x) => diagnosePattern(m, x),
  reason: (m, x) => diagnoseReason(m, x),
  predict: (m, x) => diagnosePredict(m, x),
  forces: (m, x) => diagnoseForces(m, x),
  speed: (m, x) => diagnoseSpeed(m, x),
  coastBoth: (m, x) => diagnoseCoastBoth(m, x),
};

/** Run every case; a wrong code, or a wrong answer with nothing to say, is a problem. */
export function runAll(m) {
  const out = [];
  for (const c of slipCases(m)) {
    let d;
    try { d = RUN[c.stage](m, c.input); } catch (e) { out.push(`${c.stage}: ${e.message}`); continue; }
    if (d.code !== c.code) out.push(`${c.stage} ${JSON.stringify(c.input)} should be "${c.code}" but the engine says "${d.code}"`);
    else if (!d.ok && (!d.en || !d.fr)) out.push(`${c.stage} "${c.code}" has no English and French message`);
  }
  if (m.kind === 'pull') {
    const want = expectedArrows(m.scene, m.at, m.dir);
    if (want.to !== m.to) out.push(`the pull should be arrow ${want.to}, the engine says ${m.to}`);
    if (want.fwd !== m.fwd) out.push(`the path should be arrow ${want.fwd}, the engine says ${m.fwd}`);
    const need = { pull: m.scene === 'neptune' ? ['sun', 'along', 'against'] : ['away', 'along', 'against'], path: ['away', 'inward', 'backwards'] };
    if (m.scene === 'comet') need.pull.push('middle');
    for (const st of ['pull', 'path']) {
      if (st === 'path' && !m.ask.includes('path')) continue;
      for (const code of need[st]) if (m[st].filter((c) => c === code).length !== 1) out.push(`${st}: "${code}" must be exactly one arrow`);
      if (m[st].filter((c) => c === 'ok').length !== 1) out.push(`${st}: exactly one arrow must be right`);
    }
  }
  return out;
}

const need = (out, at, o, keys) => { for (const k of keys) if (!o?.[k]) out.push(`${at} has no ${k}`); };
const sentences = (s) => String(s || '').split(/[.!?](?:\s|$)/).filter((x) => x.trim()).length;

/** Problems with the engine's own tables (the same for every unit). */
export function checkOrbitTables() {
  const out = [];
  const words = (sc) => ({ obj: 'x', force: sc.force, toward: sc.toward, awayFrom: sc.awayFrom, into: sc.into, without: sc.without });
  for (const [id, o] of Object.entries(ORBITERS)) { need(out, `orbiter ${id}`, o, ['en', 'fr', 'fill']); need(out, `orbiter ${id} label`, o.label, ['en', 'fr']); }
  for (const [id, sc] of Object.entries(PULL_SCENES)) {
    for (const k of ['centre', 'force', 'toward', 'awayFrom', 'into', 'without']) need(out, `scene ${id} ${k}`, sc[k], ['en', 'fr']);
    if (!sc.onlyPull) need(out, `scene ${id} release`, sc.release, ['en', 'fr']);
    for (const t of sc.traps) if (!PULL_REASONS[t]) out.push(`scene ${id}: trap "${t}" is not a reason`);
    for (const o of sc.orbiters) if (!ORBITERS[o]) out.push(`scene ${id}: "${o}" is not an orbiter`);
    for (const st of Object.keys(PULL_SLIPS)) {
      for (const [code, msg] of Object.entries(PULL_SLIPS[st])) {
        for (const lang of ['en', 'fr']) if (/\{\w+\}/.test(fill(msg[lang], words(sc), lang))) out.push(`slip ${st}.${code} (${lang}) has a placeholder ${id} cannot fill`);
      }
    }
  }
  for (const [id, r] of Object.entries(PULL_REASONS)) need(out, `reason ${id}`, r, id === 'keeps' ? ['en', 'fr'] : ['en', 'fr', 'why', 'whyFr']);
  for (const [id, sc] of Object.entries(COAST_SCENES)) {
    need(out, `coast ${id}`, sc, ['en', 'fr']);
    if (sc.where === 'space') need(out, `coast ${id} gravity`, sc.gravity, ['en', 'fr']);
    else if (sc.where !== 'road') out.push(`coast ${id}: where must be space or road`);
  }
  for (const [id, c] of Object.entries(FORCE_CHIPS)) need(out, `chip ${id}`, c, ['en', 'fr']);
  for (const [id, s] of Object.entries(COAST_SLIPS)) need(out, `coast slip ${id}`, s, ['en', 'fr']);
  for (const [where, table] of Object.entries(SPEED_REASONS)) {
    if (Object.values(table).filter((r) => r.ok).length !== 1) out.push(`speed ${where}: exactly one reason must be right`);
    for (const [id, r] of Object.entries(table)) {
      need(out, `speed ${where}.${id}`, r, r.ok ? ['en', 'fr'] : ['en', 'fr', 'why', 'whyFr']);
      if (!r.ok && (sentences(r.why) > 2 || sentences(r.whyFr) > 2)) out.push(`speed ${where}.${id}: its why is more than two sentences`);
    }
  }
  for (const p of PATTERN_IDS) need(out, `pattern ${p}`, PATTERNS[p], ['en', 'fr']);
  for (const [id, set] of Object.entries(GRAPH_SETS)) {
    const at = `graph set ${id}`;
    need(out, `${at} title`, set.title, ['en', 'fr']);
    need(out, `${at} centre`, set.centre, ['en', 'fr', 'distFr', 'fromFr']);
    if (set.max % set.per !== 0) out.push(`${at}: max ${set.max} is not a whole number of big squares of ${set.per}`);
    set.rows.forEach((r, i) => {
      need(out, `${at} row ${r.id}`, r, ['en', 'fr']);
      if (!Number.isInteger(r.v) || r.v < 1 || r.v > set.max) out.push(`${at} row ${r.id}: ${r.v} km/s must be a whole number from 1 to ${set.max}`);
      const prev = set.rows[i - 1];
      if (prev && !(r.d > prev.d)) out.push(`${at}: the rows must go outwards (${r.id} is not further than ${prev.id})`);
      if (prev && !(r.v < prev.v)) out.push(`${at}: the speeds must fall outwards (${r.id} is not slower than ${prev.id})`);
    });
    const reasons = set.reasons || [];
    if (!reasons[0]?.ok || reasons.filter((r) => r.ok).length !== 1) out.push(`${at}: the first reason, and only it, must be right`);
    for (const r of reasons) need(out, `${at} reason ${r.id}`, r, r.ok ? ['en', 'fr'] : ['en', 'fr', 'why', 'whyFr']);
    if (reasons.length < 4 && reasons.length !== 3) out.push(`${at}: needs 3 or 4 reasons`);
    // "Bigger is slower" may only be offered where the set itself refutes it.
    if (reasons.some((r) => r.id === 'size')) {
      const biggest = set.rows.reduce((a, b) => (b.size > a.size ? b : a));
      if (biggest === set.rows[set.rows.length - 1]) out.push(`${at}: the size trap is offered, but the biggest is also the slowest`);
      if (!set.rows.some((r, i) => set.rows.slice(i + 1).some((s) => r.size > s.size))) out.push(`${at}: the size trap is offered, but nothing closer is bigger`);
    }
    if (set.predict) {
      need(out, `${at} predict`, set.predict, ['en', 'fr', 'pronFr']);
      try { roundModel({ id: `prove-${id}`, kind: 'graph', set: id, given: 'all', ask: ['predict'] }); } catch (e) { out.push(`${at} predict: ${e.message}`); }
    }
  }
  return out;
}

/** Every picture, place and direction the pull engine can draw. */
export function provePull() {
  const out = [];
  let rounds = 0;
  for (const scene of Object.keys(PULL_SCENES)) {
    const places = PULL_SCENES[scene].shape === 'comet' ? [90, 270] : [0, 45, 90, 135, 180, 225, 270, 315];
    for (const at of places) {
      for (const dir of ['acw', 'cw']) {
        try {
          pullGeometry(scene, at);
          arrowCodes(scene, at, dir);
          const m = roundModel({ id: `prove-${scene}-${at}-${dir}`, kind: 'pull', scene, at, dir, level: 1 });
          rounds++;
          for (const p of runAll(m)) out.push(`${scene} at ${at}° ${dir}: ${p}`);
        } catch (e) { out.push(`${scene} at ${at}° ${dir}: ${e.message}`); }
      }
    }
  }
  return { problems: out, rounds };
}

/** Problems with a unit's `orbitLab.items`, as strings. */
export function checkOrbitLabItems(items) {
  const out = [];
  const ids = new Set();
  let lastLevel = 0;
  for (const [i, it] of (items || []).entries()) {
    const at = `item ${it?.id || i + 1}`;
    if (!it?.id) out.push(`item ${i + 1} has no id`);
    else if (ids.has(it.id)) out.push(`duplicate item id "${it.id}"`);
    ids.add(it?.id);
    if (!Number.isInteger(it?.level) || it.level < 1) out.push(`${at}: level must be a whole number ≥ 1`);
    else if (it.level < lastLevel) out.push(`${at}: level ${it.level} comes after level ${lastLevel} — levels only climb`);
    else lastLevel = it.level;
    let m;
    try { m = roundModel(it); } catch (e) { out.push(`${at}: ${e.message}`); continue; }
    for (const p of runAll(m)) out.push(`${at}: ${p}`);
  }
  return out;
}

/** Problems with a unit's whole `orbitLab` config (title, levels, items). */
export function checkOrbitLabConfig(cfg) {
  const out = [];
  if (!cfg || typeof cfg !== 'object') return ['orbitLab must be an object'];
  if (!cfg.title || !cfg.titleFr) out.push('needs a title and titleFr');
  if (cfg.intro && !cfg.introFr) out.push('intro needs introFr');
  const items = cfg.items || [];
  if (items.length < 6) out.push(`has ${items.length} items — at least 6`);
  for (const kind of ['pull', 'graph', 'coast']) if (!items.some((it) => it.kind === kind)) out.push(`has no ${kind} item`);
  for (const it of items) {
    const lv = cfg.levels?.[it.level];
    if (!lv?.en || !lv?.fr) out.push(`item ${it.id}: level ${it.level} has no English and French name in levels`);
  }
  out.push(...checkOrbitTables());
  out.push(...checkOrbitLabItems(items));
  out.push(...provePull().problems.slice(0, 10));
  return out;
}

export const ORBIT_ACTIVITY_KEYS = ['kind', 'scene', 'orbiter', 'at', 'dir', 'ask', 'walk', 'set', 'given'];

/** The engine item an `orbitlab` slide activity stands for. A deck item walks unless walk: false. */
export function orbitItemOf(a) {
  const it = { id: a.id, level: 1 };
  for (const k of ORBIT_ACTIVITY_KEYS) if (a[k] !== undefined) it[k] = a[k];
  return it;
}

/** Problems with an `orbitlab` slide activity (utils/activity.js). */
export function checkOrbitLabActivity(a) {
  let m;
  try { m = roundModel(orbitItemOf(a)); } catch (e) { return [e.message]; }
  return runAll(m);
}

