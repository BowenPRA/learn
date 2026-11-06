// STEP_PRACTICE — the data-driven step practice (docs/step-practice.md).
//
// A unit's `stepPractice` is a set of Workbook-style problems, each broken into
// short steps. The item's level decides how much of the method is asked:
//
//   focus      every step, in order
//   practice   only the key steps (`key: true`, and always the last one); a wrong
//              answer opens the steps before it
//   challenge  only the answer (the last step); a wrong answer opens the step its
//              slip points at, or every step when no slip matches
//
// This file holds everything that is not drawing: reading the data, marking a
// response, naming a slip, the order a sequence is shown in, the working line a
// finished step writes, and `checkStepPractice`, which `npm run validate` runs on
// every unit's pool and on the samples in src/stepPractice/samples.
//
// PORTABLE CORE: nothing in src/stepPractice imports Dashboard code except
// equivalence.js (one re-export of src/utils/mathEquivalence.js, which itself
// imports nothing). Copy the folder and that file into another React + Tailwind
// app and it runs.

import { answersEquivalent } from './equivalence.js';


export const LEVELS = ['focus', 'practice', 'challenge'];
export const INPUT_TYPES = ['number', 'text', 'choice', 'multi', 'order', 'gap', 'tap'];

/** Pick one of three strings for `lang` ('en' | 'vn' | 'fr'), English when the twin is missing. */
export const tr = (lang, en, vn, fr) => (lang === 'vn' ? vn ?? en : lang === 'fr' ? fr ?? en : en);

/** A string field in `lang`: `obj.key`, `obj.keyVn`, `obj.keyFr`, English when the twin is missing. */
export const txt = (obj, key, lang) => (obj ? tr(lang, obj[key], obj[`${key}Vn`], obj[`${key}Fr`]) : undefined);

/** The step indices asked first, by level. */
export function askedSteps(item) {
  const n = item.steps.length;
  if (item.level === 'focus') return item.steps.map((_, i) => i);
  if (item.level === 'challenge') return [n - 1];
  const keys = item.steps.map((s, i) => (s.key || i === n - 1 ? i : -1)).filter((i) => i >= 0);
  return keys;
}

/* ------------------------------------------------------------------ words and gaps */

const CORE = /^[^\p{L}\p{N}'’-]+|[^\p{L}\p{N}'’-]+$/gu;
/** A sentence as tap-able words: [{ pre, word, post, n }] — n counts the words from 1. */
export function wordsOf(sentence) {
  const out = [];
  let n = 0;
  for (const tok of String(sentence || '').split(/\s+/).filter(Boolean)) {
    const word = tok.replace(CORE, '');
    if (!word) { if (out.length) out[out.length - 1].post += ` ${tok}`; continue; }
    const at = tok.indexOf(word);
    n += 1;
    out.push({ pre: tok.slice(0, at), word, post: tok.slice(at + word.length), n });
  }
  return out;
}

/** The word numbers a `tap` step's answer names: a string is the word (once in the sentence), a number its place. */
export function tapTargets(input) {
  const words = wordsOf(input.sentence);
  return (input.answer || []).map((a) => {
    if (typeof a === 'number') return words[a - 1] ? a : null;
    const hits = words.filter((w) => norm(w.word) === norm(a));
    return hits.length === 1 ? hits[0].n : null;
  });
}

/** The gaps of a `gap` sentence ("___", three or more underscores). */
export const gapParts = (text) => String(text || '').split(/_{3,}/);
const gapAnswers = (input) => (input.answers || []).map((a) => (Array.isArray(a) ? a : [a]).map(String));

/* ------------------------------------------------------------------ order */

function hash(s) {
  let h = 2166136261;
  for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
/** A fixed shuffle of `list` (same every time for the same seed), never the list as written. */
export function shuffled(list, seed) {
  const a = [...list];
  let h = hash(seed);
  for (let i = a.length - 1; i > 0; i -= 1) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    const j = h % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  if (a.length > 1 && a.every((x, i) => x === list[i])) a.push(a.shift());
  return a;
}
/** The order an `order` or `choice` step shows its cards in. Choice options keep the authored order unless `shuffle`. */
export const shownOrder = (input, seed) => {
  const ids = (input.items || input.options || []).map((o) => o.id);
  return input.type === 'order' || input.shuffle ? shuffled(ids, seed) : ids;
};

/* ------------------------------------------------------------------ marking */

const norm = (s) => String(s ?? '').trim().toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ').replace(/[.!?]+$/, '');
const sameSet = (a, b) => a.length === b.length && [...a].sort().join('|') === [...b].sort().join('|');

/** Take a unit typed after the number ("24 kg", "6 degrees") off before marking: the step's `unit` or its plain `after` word. */
function stripUnit(raw, input) {
  let s = String(raw ?? '').trim();
  const plain = (u) => (typeof u === 'string' && !/[{[<$=]/.test(u) ? u.trim() : null);
  const units = [input.unit, input.after, input.afterVn, input.afterFr].map(plain).filter(Boolean);
  for (const u of units) {
    const re = new RegExp(`\\s*${u.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'i');
    s = s.replace(re, '');
  }
  return s.trim();
}

/** Whether a typed number matches `want` (with `tol`, `exact`, `accept`). */
function numberMatches(input, typed, want, accept = []) {
  const t = stripUnit(typed, input);
  if (input.exact) return [want, ...accept].some((w) => norm(t).replace(/\s/g, '') === norm(w).replace(/\s/g, ''));
  if (input.tol) {
    const v = Number(t);
    if (Number.isFinite(v) && Math.abs(v - Number(want)) <= input.tol + 1e-9) return true;
  }
  return answersEquivalent(t, String(want), accept.map(String));
}

/**
 * Mark a response. `resp` is what the input gives back: a string (number, text),
 * an option id (choice), a list of ids (multi, order), a list of strings (gap) or
 * a list of word numbers (tap). Returns { ok } or { nudge } (a format slip that
 * does not count as a try: an empty box, a decimal comma).
 */
export function markStep(input, resp) {
  switch (input.type) {
    case 'number': {
      const s = String(resp ?? '').trim();
      if (!s) return { nudge: 'empty' };
      if (/^\d+,\d{1,2}$/.test(stripUnit(s, input)) && !input.exact) return { nudge: 'comma' };
      return { ok: numberMatches(input, s, input.answer, input.accept || []) };
    }
    case 'text': {
      const s = norm(resp);
      if (!s) return { nudge: 'empty' };
      const ok = [...[].concat(input.answer), ...(input.accept || [])].some((a) => (input.caseSensitive ? String(resp).trim() === String(a) : s === norm(a)));
      return { ok };
    }
    case 'choice':
      return resp == null ? { nudge: 'empty' } : { ok: resp === input.answer };
    case 'multi':
      return !resp?.length ? { nudge: 'empty' } : { ok: sameSet(resp, input.answer) };
    case 'order': {
      const want = input.items.map((o) => o.id);
      if (!resp || resp.length < want.length) return { nudge: 'order' };
      return { ok: resp.every((id, i) => id === want[i]) };
    }
    case 'gap': {
      const want = gapAnswers(input);
      if (!resp || resp.some((g) => !norm(g))) return { nudge: 'gaps' };
      return { ok: want.every((acc, i) => acc.some((a) => norm(a) === norm(resp[i]))) };
    }
    case 'tap': {
      if (!resp?.length) return { nudge: 'empty' };
      return { ok: sameSet(resp.map(String), tapTargets(input).map(String)) };
    }
    default:
      return { ok: false };
  }
}

/** The slip a wrong response matches, or null. A slip's `value` has the shape of a response. */
export function findSlip(step, resp) {
  const { input } = step;
  return (step.slips || []).find((sl) => {
    const v = sl.value;
    switch (input.type) {
      case 'number': return numberMatches(input, resp, v);
      case 'text': return norm(resp) === norm(v);
      case 'choice': return resp === v;
      case 'multi': case 'order': return Array.isArray(v) && (input.type === 'multi' ? sameSet(resp || [], v) : (resp || []).join('|') === v.join('|'));
      case 'gap': return [].concat(v).every((g, i) => norm(g) === norm(resp?.[i]));
      case 'tap': return sameSet((resp || []).map(String), [].concat(v).map((w) => String(typeof w === 'number' ? w : wordsOf(input.sentence).find((x) => norm(x.word) === norm(w))?.n)));
      default: return false;
    }
  }) || null;
}

/** A slip value as the response the input would give: tap words become word numbers. */
export function slipResponse(input, value) {
  if (input?.type !== 'tap') return value;
  const words = wordsOf(input.sentence);
  return [].concat(value).map((w) => (typeof w === 'number' ? w : words.find((x) => norm(x.word) === norm(w))?.n));
}

/** Where a slip points: a step index (`step` is a step id or a number counted from 1), else null. */
export function slipTarget(item, slip) {
  if (slip?.step == null) return null;
  const i = typeof slip.step === 'number' ? slip.step - 1 : item.steps.findIndex((s) => s.id === slip.step);
  return i >= 0 && i < item.steps.length ? i : null;
}

/** What a slip key may look like (PRA Learn's learn_save keeps only keys of this shape). */
export const SLIP_KEY = /^[A-Za-z0-9_.:-]{1,40}$/;

/**
 * The key a slip is reported by: its own `key` when it has one, else "s<step>.<slip>"
 * counted from 1 ("s2.1" = the first slip on step 2). Never what the child typed.
 */
export function slipKey(step, i, slip) {
  if (slip?.key != null && SLIP_KEY.test(String(slip.key))) return String(slip.key);
  const n = (step?.slips || []).indexOf(slip);
  return `s${i + 1}.${n + 1}`;
}

/** Every slip of an item by its key: { key: { step, slip } } (a teacher page reads the message from here). */
export function slipsByKey(item) {
  const out = {};
  (item?.steps || []).forEach((st, i) => (st.slips || []).forEach((sl) => { out[slipKey(st, i, sl)] = { step: i, slip: sl }; }));
  return out;
}

/* ------------------------------------------------------------------ what a finished step shows */

const optText = (o, lang) => txt(o, 'text', lang) || o.alt || o.id;

/** The answer of a step as words, for the working line and Show me. */
export function answerText(input, lang) {
  switch (input.type) {
    case 'number': return `${input.answer}`;
    case 'text': return String([].concat(input.answer)[0]);
    case 'choice': return optText(input.options.find((o) => o.id === input.answer) || {}, lang);
    case 'multi': return input.answer.map((id) => optText(input.options.find((o) => o.id === id) || {}, lang)).join(', ');
    case 'order': return input.items.map((o) => optText(o, lang)).join(' → ');
    case 'gap': return gapAnswers(input).map((a) => a[0]).join(' … ');
    case 'tap': return tapTargets(input).map((n) => wordsOf(input.sentence)[n - 1]?.word).join(', ');
    default: return '';
  }
}

/**
 * The working line a finished step writes, as markup for StepText: `@` in the
 * step's `line` is the answer (drawn green). Without a `line`, a number or text
 * step writes "before @ after", a gap step its sentence filled in, and any other
 * step "title: @".
 */
export function lineOf(step, lang) {
  const { input } = step;
  const found = `<<${answerText(input, lang)}>>`;
  const line = txt(step, 'line', lang);
  if (line) return line.replace(/@/g, found);
  if (input.type === 'gap') {
    const parts = gapParts(input.text);
    const ans = gapAnswers(input);
    return parts.map((p, i) => (i < ans.length ? `${p}<<${ans[i][0]}>>` : p)).join('');
  }
  if ((input.type === 'number' || input.type === 'text') && (input.before || input.after || input.unit)) {
    const after = txt(input, 'after', lang) || (typeof input.unit === 'string' ? input.unit : '');
    return [txt(input, 'before', lang), found, after].filter(Boolean).join(' ');
  }
  const title = txt(step, 'title', lang);
  return /[?？]$/.test(title) ? `${title} ${found}` : `${title}: ${found}`;
}
