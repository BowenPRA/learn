/**
 * Storyboard (SOLAR_STORY, p84) — the engine behind src/tasks/Storyboard.jsx,
 * for Y7 Science 3.2 Formation of the Solar System. The book's own Activity
 * (p. 89) is a storyboard: a nebula, how the Sun forms, how the planets form,
 * and the reasons why. This marks it.
 *
 * An item is the question only; everything else is derived here:
 *   { id, level, kind: 'story', from, to, ask? }  frames `from`…`to` (3+), in order,
 *        then a reason for each step in `ask` (default: every step after the first)
 *   { id, level, kind: 'evidence', fact }         supports or seems to contradict?
 *        then which step it shows (supports) or what scientists do (contradicts)
 *   { id, level, kind: 'model', model }           four statements: strength or limitation
 * Tables: utils/solarStoryData.js (steps, causes, traps) and
 * utils/solarEvidenceData.js (facts, verdicts, models). The frames are the
 * unit's own drawings (pool.frames), so this file knows no pictures.
 *
 * Every wrong answer is named: `order:<step>` (the first frame out of place, and
 * the cause that puts the right one there), `trap:<id>` (a misconception, with
 * its own why), `elsewhere` (a true reason on the wrong step), `verdict`,
 * `proves` (one fact taken as proof), `frame`, `drop` / `ignore` (what to do
 * with a fact that seems to contradict), `mixed` (a strength called a
 * limitation, or the reverse). `checkStoryConfig` proves every item's cases in
 * the validator, and every possible window of the story besides.
 */
import { STEP_IDS, STEPS, CAUSES, TRAPS } from './solarStoryData.js';
import { EVIDENCE_FRAMES, FACTS, VERDICTS, PROVES_WHY, CONTRADICT_WHY, ACTS, SORT_BINS, MODELS } from './solarEvidenceData.js';
import { scrambleOrder } from './sequence.js';

export const KINDS = ['story', 'evidence', 'model'];
export const TRAP_IDS = Object.keys(TRAPS);
export const VERDICT_IDS = Object.keys(VERDICTS);
export { STEP_IDS, STEPS, CAUSES, TRAPS, EVIDENCE_FRAMES, FACTS, VERDICTS, ACTS, SORT_BINS, MODELS };

/* ------------------------------------------------------------------ seeding */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const hash = (s) => {
  let h = 2166136261;
  for (const ch of String(s)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return h >>> 0;
};
const shuffle = (list, rand) => {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

/* ------------------------------------------------------------------ models */
/** The text of a bank card: `c:<step>` is that step's cause, `t:<trap>` a trap. */
export function cardText(card) {
  const [k, id] = String(card).split(':');
  const src = k === 'c' ? CAUSES[id] : TRAPS[id];
  return src ? { en: src.en, fr: src.fr } : { en: '', fr: '' };
}

export function storyModel(item) {
  const a = STEP_IDS.indexOf(item.from);
  const b = STEP_IDS.indexOf(item.to);
  if (a < 0 || b < 0) throw new Error(`from/to must be steps: ${STEP_IDS.join(', ')}`);
  if (b - a < 2) throw new Error('a story needs at least 3 frames');
  const frames = STEP_IDS.slice(a, b + 1);
  const links = frames.slice(1);
  const asked = item.ask || links;
  for (const s of asked) if (!links.includes(s)) throw new Error(`ask "${s}" is not a step after the first frame (${links.join(', ')})`);
  const ask = links.filter((s) => asked.includes(s));
  if (!ask.length) throw new Error('ask names no step');
  const rand = rng(hash(`${item.id}:bank`));
  const near = TRAP_IDS.filter((t) => ask.includes(TRAPS[t].fits));
  const far = TRAP_IDS.filter((t) => !ask.includes(TRAPS[t].fits) && links.includes(TRAPS[t].fits));
  const traps = [...shuffle(near, rand), ...shuffle(far, rand)].slice(0, 2);
  if (!traps.length) throw new Error('no trap fits these steps');
  const bank = shuffle([...ask.map((s) => `c:${s}`), ...traps.map((t) => `t:${t}`)], rand);
  const start = scrambleOrder(frames.length, item.id).map((i) => frames[i]);
  return { kind: 'story', id: item.id, frames, ask, traps, bank, start, stages: ['order', 'cause'] };
}

export function evidenceModel(item) {
  const fact = FACTS[item.fact];
  if (!fact) throw new Error(`unknown fact "${item.fact}" — known: ${Object.keys(FACTS).join(', ')}`);
  const rand = rng(hash(`${item.id}:acts`));
  return {
    kind: 'evidence', id: item.id, factId: item.fact, fact, verdict: fact.verdict,
    stages: ['verdict', fact.verdict === 'supports' ? 'frame' : 'act'],
    acts: shuffle(Object.keys(ACTS), rand),
  };
}

export function judgeModel(item) {
  const model = MODELS[item.model];
  if (!model) throw new Error(`unknown model "${item.model}" — known: ${Object.keys(MODELS).join(', ')}`);
  return {
    kind: 'model', id: item.id, modelId: item.model, model,
    statements: shuffle(model.statements, rng(hash(`${item.id}:sort`))), stages: ['sort'],
  };
}

/** The derived round for any item; throws on a malformed one. */
export function roundModel(item) {
  if (!item || !item.id) throw new Error('item needs an id');
  if (item.kind === 'story') return storyModel(item);
  if (item.kind === 'evidence') return evidenceModel(item);
  if (item.kind === 'model') return judgeModel(item);
  throw new Error(`kind must be one of ${KINDS.join(', ')}`);
}

/* ------------------------------------------------------------------ marking */
/** `arrangement`: the step ids in the order the student put the frames. */
export function diagnoseOrder(m, arrangement) {
  const slots = m.frames.map((s, i) => arrangement[i] === s);
  if (slots.every(Boolean)) return { ok: true, code: 'ok', slots };
  const i = slots.indexOf(false);
  const want = m.frames[i];
  const got = arrangement[i];
  const W = STEPS[want];
  const G = STEPS[got] || { en: '?', fr: '?' };
  if (i === 0) {
    return {
      ok: false, code: `order:${want}`, want, slots,
      en: want === 'cloud' ? 'Everything starts as a cloud of dust and gas: Cloud comes first.' : `The story starts with ${W.en}: ${W.says}`,
      fr: want === 'cloud' ? 'Tout commence par un nuage de poussière et de gaz : Nuage vient en premier.' : `L’histoire commence par ${W.fr} : ${W.saysFr}`,
    };
  }
  return {
    ok: false, code: `order:${want}`, want, slots,
    en: `${G.en} comes too soon. Next is ${W.en}, because: ${CAUSES[want].en}`,
    fr: `${G.fr} vient trop tôt. Ensuite, c’est ${W.fr}, parce que : ${CAUSES[want].fr}`,
  };
}

/** `placed`: { [step]: card } for every asked step. */
export function diagnoseCauses(m, placed = {}) {
  const per = m.ask.map((s) => {
    const card = placed[s];
    if (!card) return { step: s, ok: false, code: 'missing' };
    if (card === `c:${s}`) return { step: s, ok: true, code: 'ok' };
    const [k, id] = card.split(':');
    if (k === 'c') {
      return {
        step: s, ok: false, code: 'elsewhere',
        en: `True, but that is why ${STEPS[id].en} happens, not ${STEPS[s].en}.`,
        fr: `C’est vrai, mais c’est la raison de l’étape ${STEPS[id].fr}, pas ${STEPS[s].fr}.`,
      };
    }
    return { step: s, ok: false, code: `trap:${id}`, en: TRAPS[id].why, fr: TRAPS[id].whyFr };
  });
  if (per.some((p) => p.code === 'missing')) {
    return { ok: false, soft: true, code: 'missing', per, en: 'Put a reason in every gap first.', fr: 'Mets d’abord une raison dans chaque case.' };
  }
  const bad = per.find((p) => !p.ok);
  if (!bad) return { ok: true, code: 'ok', per };
  return { ok: false, code: bad.code, per, en: bad.en, fr: bad.fr };
}

export function diagnoseVerdict(m, v) {
  if (v === m.verdict) return { ok: true, code: 'ok' };
  if (v === 'provesTrue' || v === 'provesWrong') return { ok: false, code: 'proves', ...PROVES_WHY };
  if (m.verdict === 'contradicts') return { ok: false, code: 'verdict', ...CONTRADICT_WHY };
  return { ok: false, code: 'verdict', en: `It fits the story. ${m.fact.link}`, fr: `Il va avec l’histoire. ${m.fact.linkFr}` };
}

export function diagnoseFrame(m, f) {
  if (f === m.fact.frame) return { ok: true, code: 'ok' };
  const S = STEPS[f] || { en: '?', fr: '?' };
  return { ok: false, code: 'frame', en: `Not ${S.en}. ${m.fact.link}`, fr: `Pas ${S.fr}. ${m.fact.linkFr}` };
}

export function diagnoseAct(m, a) {
  if (a === 'keep') return { ok: true, code: 'ok' };
  const act = ACTS[a];
  if (!act) return { ok: false, code: 'unknown', en: '', fr: '' };
  return { ok: false, code: a, en: act.why, fr: act.whyFr };
}

/** `picks`: { [statementId]: 'strength' | 'limitation' }. */
export function diagnoseSort(m, picks = {}) {
  const per = m.statements.map((st) => {
    const p = picks[st.id];
    if (!p) return { id: st.id, ok: false, code: 'missing' };
    if (p === st.kind) return { id: st.id, ok: true, code: 'ok' };
    const bin = SORT_BINS[st.kind];
    return {
      id: st.id, ok: false, code: 'mixed',
      en: `That one is a ${bin.en.toLowerCase()}: ${st.why}`,
      fr: `Celle-ci est ${st.kind === 'strength' ? 'un point fort' : 'une limite'} : ${st.whyFr}`,
    };
  });
  if (per.some((p) => p.code === 'missing')) {
    return { ok: false, soft: true, code: 'missing', per, en: 'Sort all four first.', fr: 'Trie d’abord les quatre.' };
  }
  const bad = per.find((p) => !p.ok);
  if (!bad) return { ok: true, code: 'ok', per };
  return { ok: false, code: 'mixed', per, en: bad.en, fr: bad.fr };
}

/** The right answer to a stage, so "Show me" (or a second wrong) can fill it in. */
export function answerOf(m, stage) {
  if (stage === 'order') return [...m.frames];
  if (stage === 'cause') return Object.fromEntries(m.ask.map((s) => [s, `c:${s}`]));
  if (stage === 'verdict') return m.verdict;
  if (stage === 'frame') return m.fact.frame;
  if (stage === 'act') return 'keep';
  if (stage === 'sort') return Object.fromEntries(m.statements.map((st) => [st.id, st.kind]));
  return null;
}

// The proof (slipCases, runCase, checkStoryConfig) is in utils/solarStoryCheck.js.
