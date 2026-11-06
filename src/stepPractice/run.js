// How one item runs, as plain state changes (no React), so the rules can be
// tested in Node and the screen stays a drawing of this state.
//
// state = {
//   visible  step indices shown as pills (in order)
//   at       the step in hand, or null when the item is finished
//   status   { [step]: 'done' | 'shown' | 'head' }   head = skipped, worked in your head
//   tries    { [step]: wrong answers so far }
//   msg      { tone: 'ok' | 'shown' | 'bad' | 'info', kind, step, slip?, nudge?, hint? }
//   look     a step a slip points back at (its pill pulses), or null
//   lines    [{ step, tag? }]  the working written so far
//   fresh    the step whose line was written last
//   helped   a step was filled in (Show me, or a second wrong answer)
//   slipped  a wrong answer was given at least once
//   slips    keys of the slips hit, in order, each once (slipKey in model.js)
//   shows    { [step]: Show me presses }
//   hints    hints opened
//   wrong    wrong answers given (nudges are not counted)
// }

import { askedSteps, markStep, findSlip, slipTarget, slipKey } from './model.js';

export function initRun(item) {
  const visible = askedSteps(item);
  return { visible, at: visible[0], status: {}, tries: {}, msg: null, look: null, lines: [], fresh: null, helped: false, slipped: false, hintOpen: false, slips: [], shows: {}, hints: 0, wrong: 0 };
}

const notYetSeen = (s, j) => !s.status[j];

function writeLine(s, j, tag) {
  return { ...s, status: { ...s.status, [j]: tag === 'shown' ? 'shown' : tag === 'head' ? 'head' : 'done' }, lines: [...s.lines, { step: j, tag }] };
}

/** Finish step i ('done' or 'shown'); steps skipped before it are written as worked in your head. */
function complete(state, item, i, how) {
  let s = state;
  for (let j = 0; j < i; j += 1) if (notYetSeen(s, j)) s = writeLine(s, j, 'head');
  s = writeLine(s, i, how === 'shown' ? 'shown' : undefined);
  const next = s.visible.find((j) => j > i && notYetSeen(s, j));
  const step = item.steps[i];
  const msg = how === 'shown' ? { tone: 'shown', kind: 'shown', step: i } : step.why ? { tone: 'ok', kind: 'why', step: i } : null;
  return { ...s, at: next ?? null, fresh: i, msg, look: null, hintOpen: false, helped: s.helped || how === 'shown' };
}

/** A response to the step in hand. */
export function submit(state, item, resp) {
  const i = state.at;
  if (i == null) return state;
  const step = item.steps[i];
  const mark = markStep(step.input, resp);
  if (mark.nudge) return { ...state, msg: { tone: 'info', kind: 'nudge', nudge: mark.nudge, step: i } };
  if (mark.ok) return complete(state, item, i, 'done');

  const slip = findSlip(step, resp);
  const target = slipTarget(item, slip);
  const key = slip ? slipKey(step, i, slip) : null;
  state = { ...state, wrong: (state.wrong || 0) + 1, slips: key && !(state.slips || []).includes(key) ? [...(state.slips || []), key] : (state.slips || []) };
  const hidden = item.steps.map((_, j) => j).filter((j) => j < i && !state.visible.includes(j) && notYetSeen(state, j));
  const tries = (state.tries[i] || 0) + 1;

  // Practice and Challenge: a wrong answer opens the steps it skipped — from the
  // step its slip points at when that step was skipped, else from the first.
  if (hidden.length) {
    const from = target != null && hidden.includes(target) ? target : hidden[0];
    let s = state;
    for (const j of hidden) if (j < from) s = writeLine(s, j, 'head');
    const visible = [...new Set([...s.visible, ...hidden.filter((j) => j >= from)])].sort((a, b) => a - b);
    return { ...s, visible, at: from, slipped: true, look: null, hintOpen: false, fresh: null, msg: { tone: 'info', kind: slip ? 'slip' : 'opened', step: i, slip, resp } };
  }

  if (tries >= 2) return complete({ ...state, slipped: true, tries: { ...state.tries, [i]: tries } }, item, i, 'shown');
  return {
    ...state,
    tries: { ...state.tries, [i]: tries },
    slipped: true,
    look: target != null && target < i ? target : null,
    msg: { tone: 'bad', kind: slip ? 'slip' : 'notYet', step: i, slip, hint: !slip },
  };
}

/** Show me: fill the step in and move on. */
export const showMe = (state, item) => (state.at == null ? state
  : complete({ ...state, shows: { ...state.shows, [state.at]: ((state.shows || {})[state.at] || 0) + 1 } }, item, state.at, 'shown'));

/** Open the hint of the step in hand. */
export const openHint = (state) => (state.hintOpen ? state : { ...state, hintOpen: true, hints: (state.hints || 0) + 1 });

/** The pills: [{ key, label, state }]. */
export function pillsOf(state, item, answerWord, lang) {
  const only = state.visible.length === 1 && item.level === 'challenge';
  return state.visible.map((j) => {
    const step = item.steps[j];
    const label = only ? answerWord : (lang === 'vn' ? step.labelVn : lang === 'fr' ? step.labelFr : null) || step.label || '';
    const st = state.status[j] === 'shown' ? 'shown' : state.status[j] ? 'done' : j === state.at ? 'now' : 'todo';
    return { key: j, label, state: st };
  }).map((p) => (p.key === state.look ? { ...p, state: 'look' } : p));
}

/**
 * The item's result once finished: score 1 clean (even after a wrong turn put right), 0.5 helped.
 * Also what a teacher may see: the slip keys hit, Show me presses per step, hints opened,
 * wrong answers. Nothing the child typed.
 */
export const resultOf = (state) => ({
  helped: state.helped, slipped: state.slipped, score: state.helped ? 0.5 : 1,
  slips: [...(state.slips || [])], shows: { ...(state.shows || {}) }, hints: state.hints || 0, wrong: state.wrong || 0,
});
