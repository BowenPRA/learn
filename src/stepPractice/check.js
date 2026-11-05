// The validator's rules for a `stepPractice` pool (docs/step-practice.md §5).
// checkStepPractice(cfg, { vn, fr }) returns problem strings; those that start
// with "warning:" are advice, the rest fail `npm run validate`.

import { compileExpr } from './equivalence.js';
import { LEVELS, INPUT_TYPES, askedSteps, markStep, findSlip, slipTarget, slipResponse, gapParts, tapTargets, wordsOf, shownOrder } from './model.js';

const words = (s) => String(s || '').trim().split(/\s+/).filter(Boolean).length;
const dollarsOdd = (s) => typeof s === 'string' && (s.replace(/\\\$/g, '').match(/\$/g) || []).length % 2 === 1;

/** The response that answers a step, in the shape markStep takes. */
export function rightResponse(input) {
  switch (input.type) {
    case 'number': return String(input.answer);
    case 'text': return String([].concat(input.answer)[0]);
    case 'choice': return input.answer;
    case 'multi': return [...input.answer];
    case 'order': return input.items.map((o) => o.id);
    case 'gap': return (input.answers || []).map((a) => String([].concat(a)[0]));
    case 'tap': return tapTargets(input);
    default: return null;
  }
}

function checkInput(input, at, out) {
  if (!input || !INPUT_TYPES.includes(input.type)) { out.push(`${at}: input.type must be one of ${INPUT_TYPES.join(', ')}`); return; }
  const ids = (list) => (list || []).map((o) => o.id);
  const dupes = (list) => ids(list).filter((id, i, a) => !id || a.indexOf(id) !== i);
  switch (input.type) {
    case 'number':
      if (input.answer == null || input.answer === '') { out.push(`${at}: a number step needs an answer`); return; }
      if (!input.exact && !input.tol) {
        try { compileExpr(String(input.answer)); } catch { out.push(`${at}: answer "${input.answer}" is not a number the marker can read (use exact: true for a form like 3/4 that must be typed as written)`); }
      }
      break;
    case 'text':
      if (![].concat(input.answer).filter(Boolean).length) out.push(`${at}: a text step needs an answer`);
      break;
    case 'choice':
    case 'multi': {
      const opts = input.options || [];
      if (opts.length < 2 || opts.length > 6) out.push(`${at}: ${input.type} needs 2–6 options`);
      if (dupes(opts).length) out.push(`${at}: option ids must be present and different`);
      for (const o of opts) {
        if (!o.text && !o.svg && !o.image) out.push(`${at}: option ${o.id} has no text, svg or image`);
        if ((o.svg || o.image) && !o.alt && !o.text) out.push(`${at}: picture option ${o.id} needs alt or text`);
        if (o.svg && !/^\s*<svg[\s>]/.test(o.svg)) out.push(`${at}: option ${o.id} svg must start with <svg`);
      }
      if (input.type === 'choice' && !ids(opts).includes(input.answer)) out.push(`${at}: answer "${input.answer}" is not an option id`);
      if (input.type === 'multi') {
        const ans = input.answer || [];
        if (!ans.length || ans.some((a) => !ids(opts).includes(a))) out.push(`${at}: multi answer must list option ids`);
        if (ans.length === opts.length) out.push(`${at}: multi answer is every option — nothing to choose`);
      }
      break;
    }
    case 'order': {
      const items = input.items || [];
      if (items.length < 3 || items.length > 7) out.push(`${at}: order needs 3–7 items`);
      if (dupes(items).length) out.push(`${at}: order item ids must be present and different`);
      for (const o of items) if (!o.text) out.push(`${at}: order item ${o.id} has no text`);
      break;
    }
    case 'gap': {
      const n = gapParts(input.text).length - 1;
      if (n < 1) out.push(`${at}: gap text needs at least one ___`);
      if ((input.answers || []).length !== n) out.push(`${at}: gap text has ${n} gap(s) but ${(input.answers || []).length} answer(s)`);
      if (input.bank) for (const a of input.answers || []) if (!input.bank.map((b) => b.toLowerCase()).includes(String([].concat(a)[0]).toLowerCase())) out.push(`${at}: bank is missing the answer "${[].concat(a)[0]}"`);
      break;
    }
    case 'tap': {
      if (!wordsOf(input.sentence).length) out.push(`${at}: tap needs a sentence`);
      if (!(input.answer || []).length) out.push(`${at}: tap needs answer words`);
      tapTargets(input).forEach((n, k) => { if (n == null) out.push(`${at}: tap answer "${input.answer[k]}" is not a word that appears exactly once — give its place as a number (1 = first word)`); });
      break;
    }
    default:
  }
  const right = rightResponse(input);
  if (right != null && !markStep(input, right).ok) out.push(`${at}: its own answer is marked wrong`);
  if (input.type === 'number') for (const a of input.accept || []) if (!markStep(input, String(a)).ok) out.push(`${at}: accept "${a}" is marked wrong`);
}

function twin(obj, key, at, opt, out) {
  if (!obj?.[key]) return;
  if (opt.vn && !obj[`${key}Vn`]) out.push(`${at}: ${key} needs ${key}Vn`);
  if (opt.fr && !obj[`${key}Fr`]) out.push(`${at}: ${key} needs ${key}Fr`);
  for (const k of [key, `${key}Vn`, `${key}Fr`]) if (dollarsOdd(obj[k])) out.push(`${at}: ${k} has an unclosed $`);
}

export function checkStepPractice(cfg, opt = {}) {
  const out = [];
  if (!cfg || typeof cfg !== 'object') return ['stepPractice must be an object'];
  if (!cfg.title) out.push('needs a title');
  twin(cfg, 'title', 'title', opt, out);
  const items = cfg.items || [];
  if (!items.length) out.push('has no items');
  const seen = new Set();
  for (const item of items) {
    const at = `item ${item.id || '?'}`;
    if (!item.id || seen.has(item.id)) out.push(`${at}: id missing or repeated`);
    seen.add(item.id);
    if (!LEVELS.includes(item.level)) out.push(`${at}: level must be focus, practice or challenge`);
    if (!item.prompt) out.push(`${at}: needs a prompt`);
    twin(item, 'prompt', at, opt, out);
    if (item.inlineSvg && !/^\s*<svg[\s>]/.test(item.inlineSvg)) out.push(`${at}: inlineSvg must start with <svg`);
    if (item.image && !item.alt) out.push(`${at}: an image needs alt`);
    if (item.table) {
      const { head = [], rows = [] } = item.table;
      if (!rows.length || rows.some((r) => !Array.isArray(r) || (head.length && r.length !== head.length))) out.push(`${at}: table rows must be lists as long as head`);
    }
    const steps = item.steps || [];
    if (!steps.length || steps.length > 8) { out.push(`${at}: needs 1–8 steps`); continue; }
    const sids = steps.map((s) => s.id).filter(Boolean);
    if (new Set(sids).size !== sids.length) out.push(`${at}: step ids repeated`);
    steps.forEach((s, i) => {
      const sat = `${at} step ${i + 1}`;
      if (!s.title) out.push(`${sat}: needs a title`);
      else if (words(s.title) > 8) out.push(`${sat}: title "${s.title}" is longer than 8 words`);
      if (s.sub && (/\n/.test(s.sub) || words(s.sub) > 18)) out.push(`${sat}: sub must be one short line (18 words at most)`);
      if (!s.hint) out.push(`${sat}: needs a hint`);
      for (const k of ['title', 'sub', 'hint', 'line']) twin(s, k, sat, k === 'line' ? { vn: false, fr: false } : opt, out);
      if (s.why) twin(s, 'why', sat, opt, out);
      checkInput(s.input, sat, out);
      const vals = new Set();
      for (const sl of s.slips || []) {
        const key = JSON.stringify(sl.value);
        if (sl.value == null) out.push(`${sat}: a slip needs a value`);
        if (vals.has(key)) out.push(`${sat}: slip ${key} repeated`);
        vals.add(key);
        if (!sl.msg) out.push(`${sat}: slip ${key} needs a msg`);
        twin(sl, 'msg', `${sat} slip ${key}`, opt, out);
        const as = s.input && sl.value != null ? slipResponse(s.input, sl.value) : null;
        if (as != null && markStep(s.input, as).ok) out.push(`${sat}: slip ${key} is marked right`);
        else if (as != null && findSlip(s, as) !== sl) out.push(`${sat}: slip ${key} is not matched by its own value (an earlier slip with the same value, or a tap word not in the sentence)`);
        if (sl.step != null) {
          const t = slipTarget({ steps }, sl);
          if (t == null) out.push(`${sat}: slip ${key} points at step "${sl.step}", which is not in this item`);
          else if (t > i) out.push(`${sat}: slip ${key} points at a later step`);
        }
      }
      if (s.input?.type === 'order' && shownOrder(s.input, `${item.id}:${i}`).join() === s.input.items.map((o) => o.id).join()) out.push(`${sat}: order would be shown already sorted`);
    });
    if (item.level === 'practice') {
      const asked = askedSteps(item);
      if (steps.length < 2) out.push(`${at}: a practice item needs 2+ steps`);
      else if (asked.length >= steps.length) out.push(`${at}: every step is key — make it a focus item, or leave some steps unmarked`);
      else if (asked.length > 3) out.push(`${at}: practice asks ${asked.length} key steps; keep it to 2 or 3`);
    }
    if (item.level === 'challenge') {
      const last = steps[steps.length - 1];
      if (steps.length < 2) out.push(`${at}: a challenge item needs 2+ steps (the steps it can open)`);
      if (!(last.slips || []).some((sl) => { const t = slipTarget({ steps }, sl); return t != null && t < steps.length - 1; })) out.push(`${at}: a challenge item needs a slip on its last step that points at an earlier step`);
    }
  }
  for (const lv of LEVELS) if (items.length && !items.some((it) => it.level === lv)) out.push(`warning: no ${lv} items`);
  return out;
}
