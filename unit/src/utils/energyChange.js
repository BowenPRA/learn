/**
 * From… To… (ENERGY_CHANGE, p90) — Y7 Science 3.6 Changes in energy. The
 * model: an item's stages, every answer, and every named slip, all derived
 * from the scene tables in energyChangeData.js. Pure: no React. The proof is
 * energyChangeCheck.js (the validator runs it at the @@SCI_U03_6_CHECK@@
 * marker).
 *
 * Items (a unit's `energyChange.items`):
 *   { id, level, kind: 'one' | 'branch' | 'chain' | 'mixed', scene, walk?, happens? }
 *   { id, level, kind: 'read', diagram: [energy, …], options: [sceneId ×3] }
 *   { id, level, kind: 'heat', scene, walk? }
 * `walk` (default: level 1–2) runs every stage; otherwise the item opens
 * QUICK — fill the whole diagram (and pick its shape) and Check once — and a
 * wrong answer opens the walked stages at the stage its slip belongs to.
 * `happens` (default: a walked one-change item) asks "event or process?" first.
 *
 * A build's answer is `{ shape, fill }`: `fill[i]` is the energy in box i, in
 * the scene's order — the line first, then the outputs, which are marked as a
 * set (their order never matters).
 */
import { ENERGIES, ENERGY_IDS, HAPPENS, SCENES, SHAPES } from './energyChangeData.js';

export { ENERGIES, ENERGY_IDS, HAPPENS, SCENES, SHAPES };
export const BUILD_KINDS = ['one', 'branch', 'chain', 'mixed'];
export const KINDS = [...BUILD_KINDS, 'read', 'heat'];
export const WALK_UP_TO = 2;

const fr = (lang) => lang === 'fr';
const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);
/** An energy's name in one language. */
export const nameOf = (e, lang = 'en') => ENERGIES[e]?.[fr(lang) ? 'fr' : 'en'] || e;
const both = (f) => ({ en: f('en'), fr: f('fr') });
const listOf = (es, lang) => {
  const n = es.map((e) => nameOf(e, lang));
  const and = fr(lang) ? ' et ' : ' and ';
  return n.length < 2 ? n.join('') : `${n.slice(0, -1).join(', ')}${and}${n[n.length - 1]}`;
};

/** What shape a scene's diagram is: one change, a line, one box with arrows, or a line then arrows. */
export function shapeOf(scene) {
  const n = scene.slots.length;
  if (n === 2 && scene.chain === 2) return 'one';
  if (scene.chain === n) return 'chain';
  if (scene.chain === 1) return 'branch';
  return 'mixed';
}

/** How many boxes of a shape are a line (the rest are outputs from its last box). */
export const lineLength = (shape, n) => ({ one: 2, chain: n, branch: 1, mixed: 2 }[shape]);

/** The arrows of a shape with n boxes, as [from, to] box indices. */
export function skeleton(shape, n) {
  const c = lineLength(shape, n);
  const out = [];
  for (let i = 0; i + 1 < c; i++) out.push([i, i + 1]);
  for (let k = c; k < n; k++) out.push([c - 1, k]);
  return out;
}

/** The diagram as text: "electrical → sound and light", "chemical → thermal → kinetic → electrical". */
export function diagramText(slots, chain, lang = 'en') {
  const line = slots.slice(0, chain).map((e) => nameOf(e, lang));
  const outs = slots.slice(chain);
  return outs.length ? `${line.join(' → ')} → ${listOf(outs, lang)}` : line.join(' → ');
}

/** Everything the screens need for one item. Throws on an item it cannot build. */
export function energyModel(item) {
  const kind = item.kind;
  if (!KINDS.includes(kind)) throw new Error(`unknown kind "${kind}"`);
  const walk = item.walk ?? (item.level || 1) <= WALK_UP_TO;
  if (kind === 'read') {
    const options = (item.options || []).map((id) => ({ id, ...SCENES[id] }));
    if (options.some((o) => !o.slots)) throw new Error('read: every option must be a diagram scene');
    const right = options.filter((o) => sameList(o.slots, item.diagram) && o.chain === item.diagram.length);
    if (right.length !== 1) throw new Error(`read: ${right.length} options match the diagram`);
    return { id: item.id, level: item.level, kind, walk: true, diagram: item.diagram, options, answer: right[0].id, stages: ['pick'] };
  }
  const S = SCENES[item.scene];
  if (!S) throw new Error(`unknown scene "${item.scene}"`);
  if (kind === 'heat') {
    if (!S.heat) throw new Error(`scene "${item.scene}" has no heat`);
    const [a, b] = S.heat;
    const hot = a.t > b.t ? 0 : 1;
    return {
      id: item.id, level: item.level, kind, walk, scene: item.scene, S, things: S.heat, hot, cold: 1 - hot,
      way: hot === 0 ? 'aToB' : 'bToA',
      stages: walk ? ['hotter', 'way', 'then'] : ['way', 'then'],
      walkStages: ['hotter', 'way', 'then'],
    };
  }
  if (!S.slots) throw new Error(`scene "${item.scene}" has no diagram`);
  const shape = shapeOf(S);
  if (shape !== kind) throw new Error(`scene "${item.scene}" is a ${shape} diagram, not ${kind}`);
  const n = S.slots.length;
  const line = S.slots.slice(0, S.chain);
  const outputs = S.slots.slice(S.chain);
  const happens = (item.happens ?? (walk && shape === 'one')) && !!S.happens;
  const shapes = shape === 'one' ? [] : shape === 'mixed' ? ['chain', 'branch', 'mixed'] : ['chain', 'branch'];
  const walkStages = [...(shape === 'one' ? [] : ['shape']), ...line.map((_, i) => `slot${i}`), ...(outputs.length ? ['outputs'] : [])];
  return {
    id: item.id, level: item.level, kind, walk, scene: item.scene, S, shape, shapes, n, line, outputs, slots: S.slots, chain: S.chain,
    stages: walk ? [...(happens ? ['happens'] : []), ...walkStages] : ['build'],
    walkStages,
  };
}

function sameList(a, b) { return a.length === b.length && a.every((x, i) => x === b[i]); }
function sameSet(a, b) { return a.length === b.length && [...a].sort().join('|') === [...b].sort().join('|'); }
const slotIndex = (stage) => (/^slot\d+$/.test(stage) ? Number(stage.slice(4)) : -1);

// ── the slips, worded ────────────────────────────────────────────────────────

function say(m, code, ctx = {}) {
  const S = m.S || {};
  const p = ctx.pick;
  const E = (e, lang) => nameOf(e, lang);
  const prev = ctx.i > 0 ? m.line[ctx.i - 1] : null;
  if (code.startsWith('trap:')) {
    const t = (S.traps || []).find((x) => `trap:${x.id}` === code);
    return { en: t.why, fr: t.whyFr };
  }
  switch (code) {
    case 'happens': return both((l) => (fr(l)
      ? `${cap(S.nameFr)} : c’est ${S.happens === 'event' ? 'un événement — il arrive une fois, et c’est vite fini' : 'un processus — il continue'}.`
      : `${cap(S.name)} is ${S.happens === 'event' ? 'an event: it happens once, and it is over quickly' : 'a process: it keeps going'}.`));
    case 'fromWrong': return both((l) => (fr(l)
      ? `Pas ${E(p, l)} : ce n’est pas là que l’énergie commence pour ${S.nameFr}. Qu’est-ce qu’il y a, ou qu’est-ce qu’on utilise, avant que quelque chose se passe ?`
      : `Not ${E(p, l)}: that is not where the energy starts for ${S.name}. What is there, or what is used, before anything happens?`));
    case 'toWrong': return both((l) => (m.line.length > 2 && prev
      ? (fr(l) ? `Pas ${E(p, l)}. En quoi l’énergie ${E(prev, l)} se transforme-t-elle ensuite, pour ${S.nameFr} ?` : `Not ${E(p, l)}. What does ${E(prev, l)} energy change into next, for ${S.name}?`)
      : (fr(l) ? `Pas ${E(p, l)} : ce n’est pas ce que l’énergie devient pour ${S.nameFr}. Que vois-tu, entends-tu, sens-tu — ou qu’est-ce qui bouge ?` : `Not ${E(p, l)}: that is not what the energy changes into for ${S.name}. What do you see, hear or feel — or what moves?`)));
    case 'backwards': return S.backWhy ? { en: S.backWhy, fr: S.backWhyFr } : both((l) => (fr(l)
      ? `C’est à l’envers : l’énergie ${E(p, l)}, c’est ce que l’énergie DEVIENT. Lis chaque flèche comme « vers » : la première case, c’est là où l’énergie commence.`
      : `The wrong way round: ${E(p, l)} is what the energy changes INTO. Read each arrow as “to”: the first box is where the energy starts.`));
    case 'same': return both((l) => (fr(l)
      ? `Un CHANGEMENT d’énergie va d’une forme à une autre : ${E(p, l)} en ${E(p, l)}, ce n’est pas un changement.`
      : `An energy CHANGE goes from one kind of energy to a different kind: ${E(p, l)} to ${E(p, l)} is no change.`));
    case 'twice': return both((l) => (fr(l)
      ? `L’énergie ${E(p, l)} est déjà dans le schéma. Chaque case est une forme d’énergie différente.`
      : `${cap(E(p, l))} energy is already in the diagram. Each box is a different kind of energy.`));
    case 'skip': return both((l) => (prev
      ? (fr(l) ? `Pas encore : l’énergie ${E(p, l)} vient plus tard. En quoi l’énergie ${E(prev, l)} se transforme-t-elle D’ABORD ?` : `Not yet: ${E(p, l)} comes later. What does ${E(prev, l)} energy change into FIRST?`)
      : (fr(l) ? `Pas encore : l’énergie ${E(p, l)} vient plus tard. Où l’énergie COMMENCE-t-elle ?` : `Not yet: ${E(p, l)} comes later. Where does the energy START?`)));
    case 'notTheJob': return both((l) => (fr(l)
      ? `C’est vrai, il y a aussi un peu d’énergie ${E(p, l)} — mais ce n’est pas pour ça qu’on l’utilise. À quoi ça SERT ?`
      : `True, there is some ${E(p, l)} energy too — but that is not what we use it for. What is it FOR?`));
    case 'missing': return both((l) => (fr(l)
      ? `Pas tout à fait : l’une de ces cases ne va pas. En quelles énergies l’énergie ${E(m.line[m.line.length - 1], l)} se transforme-t-elle ici ?`
      : `Not quite: one of those boxes is not right. Which energies does ${E(m.line[m.line.length - 1], l)} energy change into here?`));
    case 'chained': {
      const from = m.line[m.line.length - 1];
      return both((l) => (fr(l)
        ? `Les énergies ${listOf(m.outputs, l)} ne se transforment pas l’une en l’autre : chacune vient de l’énergie ${E(from, l)}, donc leurs flèches partent toutes de la case ${E(from, l)}.`
        : `${cap(listOf(m.outputs, l))} do not change into each other: each one comes from ${E(from, l)} energy, so their arrows all start at the ${E(from, l)} box.`));
    }
    case 'branched': {
      const z = m.outputs.length ? m.outputs[0] : m.line[m.line.length - 1];
      return both((l) => (fr(l)
        ? `Pas une case avec des flèches : l’énergie ${E(m.line[0], l)} ne devient pas ${E(z, l)} toute seule — elle devient d’abord ${E(m.line[1], l)}.`
        : `Not one box with arrows: ${E(m.line[0], l)} energy does not change into ${E(z, l)} by itself — it becomes ${E(m.line[1], l)} first.`));
    }
    case 'order': return both((l) => (fr(l)
      ? 'Les bonnes énergies, dans le mauvais ordre. Quel changement arrive en premier ?'
      : 'The right energies, in the wrong order. Which change happens first?'));
    default: return { en: '', fr: '' };
  }
}

/** The worded slip for a read item's wrong scene. */
function sayRead(m, id, code) {
  const S2 = SCENES[id];
  const [a, b] = S2.slots;
  return both((l) => {
    if (code === 'backwards') return fr(l) ? `Pour ${S2.nameFr}, c’est à l’envers : ${nameOf(a, l)} en ${nameOf(b, l)}.` : `${cap(S2.name)} is the other way round: ${nameOf(a, l)} to ${nameOf(b, l)}.`;
    if (code === 'half') return fr(l) ? `Presque : pour ${S2.nameFr}, c’est ${nameOf(a, l)} en ${nameOf(b, l)}. Une seule case est pareille.` : `Close: ${S2.name} is ${nameOf(a, l)} to ${nameOf(b, l)}. Only one box is the same.`;
    return fr(l) ? `Pour ${S2.nameFr}, c’est ${nameOf(a, l)} en ${nameOf(b, l)}.` : `${cap(S2.name)} is ${nameOf(a, l)} to ${nameOf(b, l)}.`;
  });
}

function sayHeat(m, code) {
  const H = m.things[m.hot], C = m.things[m.cold];
  return both((l) => {
    const h = fr(l) ? H.fr : H.en, c = fr(l) ? C.fr : C.en;
    if (code === 'notHotter') return fr(l) ? `${cap(h)} : ${H.t} °C ; ${c} : ${C.t} °C. Le plus chaud, c’est ${h}.` : `${cap(h)} is at ${H.t} °C and ${c} is at ${C.t} °C, so ${h} is hotter.`;
    if (code === 'wrongWay') return fr(l) ? `L’énergie thermique passe des choses plus chaudes aux choses plus froides — jamais du plus froid au plus chaud toute seule. Ici, le plus chaud, c’est ${h}.` : `Thermal energy moves from hotter things to colder things — never from colder to hotter by itself. Here, ${h} is hotter.`;
    if (code === 'coldMoves') return fr(l) ? `Le froid n’est pas une chose qui bouge. Seule l’énergie thermique bouge : elle sort de ${h} et va dans ${c}.` : `Cold is not a thing that moves. Only thermal energy moves: out of ${h}, into ${c}.`;
    return fr(l) ? `${cap(h)} perd de l’énergie thermique, donc refroidit ; ${c} en gagne, donc se réchauffe.` : `${cap(h)} loses thermal energy, so it cools down; ${c} gains it, so it warms up.`;
  });
}

const OK = { ok: true, code: 'ok' };
const slip = (m, code, ctx) => ({ ok: false, code, ...say(m, code, ctx) });

// ── the stages ───────────────────────────────────────────────────────────────

export function diagnoseHappens(m, pick) {
  return pick === m.S.happens ? OK : slip(m, 'happens', {});
}

export function diagnoseShape(m, pick) {
  if (pick === m.shape) return OK;
  return slip(m, pick === 'chain' ? 'chained' : 'branched', {});
}

/** Box i of the line (0 = where the energy starts), given the boxes before it are right. */
export function diagnoseSlot(m, i, p) {
  if (!p) return { ok: false, soft: true, code: 'empty' };
  if (p === m.line[i]) return OK;
  const trap = (m.S.traps || []).find((t) => t.at === i && t.pick === p);
  if (trap) return slip(m, `trap:${trap.id}`, { i, pick: p });
  if (i > 0 && p === m.line[i - 1]) return slip(m, 'same', { i, pick: p });
  if (m.line.slice(0, i).includes(p)) return slip(m, 'twice', { i, pick: p });
  const last = m.outputs.length ? m.outputs : [m.line[m.line.length - 1]];
  if (i === 0 && last.includes(p)) return slip(m, 'backwards', { i, pick: p });
  if ([...m.line.slice(i + 1), ...m.outputs].includes(p)) return slip(m, 'skip', { i, pick: p });
  if (i === m.line.length - 1 && !m.outputs.length && (m.S.side || []).includes(p)) return slip(m, 'notTheJob', { i, pick: p });
  return slip(m, i === 0 ? 'fromWrong' : 'toWrong', { i, pick: p });
}

/** The output boxes, as a set, given the line is right. */
export function diagnoseOutputs(m, picks) {
  if (picks.length < m.outputs.length || picks.some((x) => !x)) return { ok: false, soft: true, code: 'empty' };
  const from = m.line[m.line.length - 1];
  if (new Set(picks).size < picks.length) return slip(m, 'twice', { pick: picks.find((x, k) => picks.indexOf(x) !== k) });
  if (picks.includes(from)) return slip(m, 'same', { pick: from });
  const earlier = picks.find((x) => m.line.includes(x));
  if (earlier) return slip(m, 'twice', { pick: earlier });
  if (sameSet(picks, m.outputs)) return OK;
  const trap = (m.S.traps || []).find((t) => t.at === 'outputs' && picks.includes(t.pick));
  if (trap) return slip(m, `trap:${trap.id}`, { pick: trap.pick });
  const side = picks.find((x) => (m.S.side || []).includes(x));
  if (side) return slip(m, 'notTheJob', { pick: side });
  return slip(m, 'missing', {});
}

/** A whole diagram at once (quick): the slip, and the stage it opens. */
export function diagnoseBuild(m, { shape, fill = [] }) {
  const s = m.shape === 'one' ? 'one' : shape;
  if (!s) return { ok: false, soft: true, code: 'noShape' };
  if (fill.length < m.n || fill.some((x) => !x)) return { ok: false, soft: true, code: 'empty' };
  if (s !== m.shape) return { ...diagnoseShape(m, s), stage: 'shape' };
  for (let i = 0; i < m.line.length; i++) {
    if (fill[i] === m.line[i]) continue;
    if (i === 0 && m.outputs.length === 0 && sameList(fill, [...m.line].reverse())) return { ...slip(m, 'backwards', { i: 0, pick: fill[0] }), stage: 'slot0' };
    if (m.shape === 'chain' && sameSet(fill, m.line)) return { ...slip(m, 'order', {}), stage: `slot${i}` };
    return { ...diagnoseSlot(m, i, fill[i]), stage: `slot${i}` };
  }
  if (m.outputs.length) {
    const d = diagnoseOutputs(m, fill.slice(m.chain));
    if (!d.ok) return { ...d, stage: 'outputs' };
  }
  return { ...OK, stage: null };
}

export function diagnosePick(m, id) {
  if (id === m.answer) return OK;
  const S2 = SCENES[id];
  const rev = sameList(S2.slots, [...m.diagram].reverse());
  const half = !rev && (S2.slots[0] === m.diagram[0] || S2.slots[S2.slots.length - 1] === m.diagram[m.diagram.length - 1]);
  const code = rev ? 'backwards' : half ? 'half' : 'other';
  return { ok: false, code, ...sayRead(m, id, code) };
}

export function diagnoseHotter(m, idx) {
  return idx === m.hot ? OK : { ok: false, code: 'notHotter', ...sayHeat(m, 'notHotter') };
}

export const WAY_IDS = ['aToB', 'bToA', 'cold'];
export function diagnoseWay(m, v) {
  if (v === m.way) return OK;
  const code = v === 'cold' ? 'coldMoves' : 'wrongWay';
  return { ok: false, code, ...sayHeat(m, code) };
}

export const THEN_IDS = ['right', 'colder', 'nothing'];
export function diagnoseThen(m, v) {
  return v === 'right' ? OK : { ok: false, code: 'then', ...sayHeat(m, 'then') };
}

/** The right answer for a stage (what "Show me" fills in). */
export function answerOf(m, stage) {
  if (stage === 'happens') return m.S.happens;
  if (stage === 'shape') return m.shape;
  if (stage === 'outputs') return [...m.outputs];
  if (stage === 'build') return { shape: m.shape, fill: [...m.slots] };
  if (stage === 'pick') return m.answer;
  if (stage === 'hotter') return m.hot;
  if (stage === 'way') return m.way;
  if (stage === 'then') return 'right';
  const i = slotIndex(stage);
  if (i >= 0) return m.line[i];
  return undefined;
}

/** The choices a heat stage offers, worded. */
export function heatOptions(m, stage, lang = 'en') {
  const L = (t) => (fr(lang) ? t.fr : t.en);
  const [A, B] = m.things;
  const H = m.things[m.hot], C = m.things[m.cold];
  if (stage === 'hotter') return m.things.map((t, k) => ({ val: k, label: `${cap(L(t))} · ${t.t} °C` }));
  if (stage === 'way') {
    return [
      { val: 'aToB', label: fr(lang) ? `Énergie thermique : ${L(A)} → ${L(B)}` : `Thermal energy: ${L(A)} → ${L(B)}` },
      { val: 'bToA', label: fr(lang) ? `Énergie thermique : ${L(B)} → ${L(A)}` : `Thermal energy: ${L(B)} → ${L(A)}` },
      { val: 'cold', label: fr(lang) ? `Le froid bouge : ${L(C)} → ${L(H)}` : `Cold moves: ${L(C)} → ${L(H)}` },
    ];
  }
  return [
    { val: 'right', label: fr(lang) ? `${cap(L(H))} refroidit et ${L(C)} se réchauffe` : `${cap(L(H))} cools down and ${L(C)} warms up` },
    { val: 'colder', label: fr(lang) ? `${cap(L(C))} devient encore plus froid` : `${cap(L(C))} gets even colder` },
    { val: 'nothing', label: fr(lang) ? 'Rien ne change' : 'Nothing changes' },
  ];
}

/** The sentence a finished heat item ends on. */
export const heatSummary = (m) => sayHeat(m, 'then');
