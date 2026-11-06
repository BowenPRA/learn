import { useState } from 'react';
import {
  quickStages, DECIDE_FACTS, diagnoseFirst, diagnoseDecide, diagnosePick, diagnoseSum, diagnoseRest, diagnoseShare,
  diagnoseOpp, diagnoseTotal, diagnoseWhy, diagnoseValue,
} from '../../utils/angleSum';

/**
 * The step runner of Find It, Say Why — shared by the task (tasks/AngleSum.jsx)
 * and the deck activity (notes/AngleSumActivity.jsx). Mount it once per item
 * (key the component by the item id).
 *
 * A step is WALKED (its stages one by one) or opens QUICK (the angle and its
 * reason together, after "find first" when two letters are left). In quick, a
 * wrong angle opens the walk at the stage its slip belongs to — the earlier
 * stages are marked as given, a right reason is kept — and that wrong answer
 * counts as the stage's first; a right angle with a wrong reason opens only
 * "Say why". Everywhere: a
 * wrong answer is named and tried again; a second, a two-way choice got wrong,
 * or Show me fills the stage in, and the item is then `helped` (it pays ½).
 */

const FILLED = { en: 'It is filled in for you.', fr: 'C’est rempli pour toi.' };
const SHOWN = { en: 'Here it is. Read it, then carry on.', fr: 'Le voici. Lis-le, puis continue.' };
const join = (a, b) => ({ en: [a.en, b.en].filter(Boolean).join(' '), fr: [a.fr, b.fr].filter(Boolean).join(' ') });

/** The right answer of a stage, as the record shows it. */
function rightOf(step, stage) {
  switch (stage) {
    case 'first': return step.letters[0];
    case 'decide': return step.total;
    case 'add': return step.sum;
    case 'subtract': return step.rest;
    case 'total': return step.sum;
    case 'why': return step.reasons.find((r) => !r.code).id;
    default: return step.answer;
  }
}

export default function useAngleSteps(model, { onFinish } = {}) {
  const startMode = model.walk ? 'walk' : 'quick';
  const listOf = (step, mode) => (mode === 'walk' ? step.stages : quickStages(step));
  const [si, setSi] = useState(0);
  const [mode, setMode] = useState(startMode);
  const [stage, setStage] = useState(() => listOf(model.steps[0], startMode)[0]);
  const [wrongs, setWrongs] = useState(0);
  const [struck, setStruck] = useState({});
  const [picked, setPicked] = useState([]);
  const [done, setDone] = useState({});
  const [found, setFound] = useState({});
  const [finishedSteps, setFinishedSteps] = useState([]);
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [msg, setMsg] = useState(null);
  const [finished, setFinished] = useState(false);

  const step = model.steps[si];
  const stages = listOf(step, mode);

  const finishStep = (doneNow, wasHelped) => {
    const all = [...finishedSteps, { step, done: doneNow }];
    setFinishedSteps(all);
    setFound((f) => ({ ...f, ...Object.fromEntries(step.letters.map((l) => [l, step.answer])) }));
    setWrongs(0); setStruck({}); setPicked([]);
    if (si + 1 < model.steps.length) {
      const next = model.steps[si + 1];
      setSi(si + 1); setMode(startMode); setDone({}); setStage(listOf(next, startMode)[0]);
    } else {
      setFinished(true);
      onFinish?.({ helped: wasHelped });
    }
  };
  /** Leave the current stage on its right answer. */
  const advance = (mark, message, list = stages, from = stage, wasHelped = helped) => {
    const doneNow = { ...done, [from]: { value: rightOf(step, from), mark } };
    if (from === 'quick') doneNow.why = { value: rightOf(step, 'why'), mark };
    setDone(doneNow); setWrongs(0); setStruck({}); setMsg(message);
    // The next stage not already settled (a right reason given in quick is kept).
    const next = list.slice(list.indexOf(from) + 1).find((x) => !doneNow[x]);
    if (next) setStage(next);
    else finishStep(doneNow, wasHelped);
  };
  const fill = (d) => {
    setHelped(true); setSlipped(true);
    advance('shown', { tone: 'shown', ...join(d || {}, FILLED) }, stages, stage, true);
  };
  /** A wrong answer at this stage: named, or (second time / nothing left to choose) filled in. */
  const miss = (d, { key, left } = {}) => {
    setSlipped(true);
    if (wrongs + 1 >= 2 || (left != null && left <= 1)) { fill(d); return; }
    setWrongs(wrongs + 1);
    if (key != null) setStruck((s) => ({ ...s, [key]: true }));
    setMsg({ tone: 'bad', en: d.en, fr: d.fr, code: d.code });
  };
  const ok = (d) => advance('good', d?.en ? { tone: 'ok', en: d.en, fr: d.fr } : null);
  const soft = (d) => setMsg({ tone: 'info', en: d.en, fr: d.fr });

  /** Quick → walk, opening at `at`, every stage before it marked as given. */
  const openWalk = (at, message, firstWrongs = 1, strike = {}, whyRight = false) => {
    const walk = step.stages;
    const given = { ...done };
    for (const s of walk.slice(0, walk.indexOf(at))) if (!given[s]) given[s] = { value: rightOf(step, s), mark: 'given' };
    if (whyRight && at !== 'why') given.why = { value: rightOf(step, 'why'), mark: 'good' };
    setMode('walk'); setDone(given); setStage(at); setWrongs(firstWrongs); setStruck(strike); setMsg(message);
    if (at === 'add') setPicked([]);
  };

  const act = {
    chooseFirst: (letter) => {
      if (struck[letter]) return;
      const d = diagnoseFirst(step, letter);
      if (d.ok) ok(d); else miss(d, { key: letter, left: step.first.length - Object.keys(struck).length - 1 });
    },
    chooseTotal: (total) => {
      if (struck[total]) return;
      const d = diagnoseDecide(step, total);
      if (d.ok) ok(d); else miss(d, { key: total, left: 1 });
    },
    /** The "which fact" stage, answered with a fact card ('line' | 'point' | 'quad'). */
    chooseFact: (kind) => {
      if (struck[kind]) return;
      const d = diagnoseDecide(step, kind);
      if (d.ok) ok(d); else miss(d, { key: kind, left: DECIDE_FACTS.length - Object.keys(struck).length - 1 });
    },
    togglePick: (key) => setPicked((p) => (p.includes(key) ? p.filter((k) => k !== key) : [...p, key])),
    checkAdd: (typed) => {
      const p = diagnosePick(step, picked);
      if (!p.ok) { miss(p); if (wrongs + 1 >= 2) setPicked(step.knowns.map((k) => k.key)); return; }
      const d = diagnoseSum(step, typed);
      if (d.soft) soft(d); else if (d.ok) ok({ en: `${step.knowns.map((k) => `${k.value}°`).join(' + ')} = ${step.sum}°`, fr: `${step.knowns.map((k) => `${k.value}°`).join(' + ')} = ${step.sum}°` }); else miss(d);
    },
    checkTyped: (typed) => {
      const fn = { subtract: diagnoseRest, share: diagnoseShare, calc: diagnoseOpp, total: diagnoseTotal }[stage];
      const d = fn(step, typed);
      if (d.soft) soft(d); else if (d.ok) ok(null); else miss(d);
    },
    chooseWhy: (id) => {
      if (struck[id]) return;
      const d = diagnoseWhy(step, id);
      if (d.soft) return;
      if (d.ok) ok(d); else miss(d, { key: id, left: step.reasons.length - Object.keys(struck).length - 1 });
    },
    checkQuick: (typed, reasonId) => {
      const v = diagnoseValue(step, typed);
      if (v.soft) { soft(v); return; }
      if (!reasonId) { soft({ en: 'Choose the reason too.', fr: 'Choisis aussi la raison.' }); return; }
      setSlipped((x) => x || !v.ok);
      const w = diagnoseWhy(step, reasonId);
      if (!v.ok) { openWalk(v.stage, { tone: 'bad', en: v.en, fr: v.fr, code: v.code }, 1, {}, w.ok); return; }
      if (w.ok) { advance('good', { tone: 'ok', en: w.en, fr: w.fr }); return; }
      setSlipped(true);
      openWalk('why', { tone: 'bad', en: w.en, fr: w.fr, code: w.code }, 1, { [reasonId]: true });
    },
    showMe: () => {
      if (stage === 'quick') {
        // Open the walk at its first working stage, filled in.
        const walk = step.stages.filter((s) => s !== 'first');
        const at = walk[0];
        const given = { ...done, [at]: { value: rightOf(step, at), mark: 'shown' } };
        setHelped(true); setSlipped(true); setMode('walk'); setDone(given); setWrongs(0); setStruck({});
        setMsg({ tone: 'shown', ...SHOWN });
        const next = step.stages[step.stages.indexOf(at) + 1];
        if (next) setStage(next); else finishStep(given, true);
        return;
      }
      if (stage === 'add') setPicked(step.knowns.map((k) => k.key));
      setHelped(true); setSlipped(true);
      advance('shown', { tone: 'shown', ...SHOWN }, stages, stage, true);
    },
  };

  return { step, si, mode, stage, stages, done, found, picked, struck, msg, helped, slipped, finished, finishedSteps, act };
}
