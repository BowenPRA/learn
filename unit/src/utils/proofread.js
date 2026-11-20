/**
 * Find & Fix — the engine behind src/tasks/Proofread.jsx.
 *
 * A passage carries a handful of errors. The student reads it, clicks the words
 * that are wrong, and types the correction. That is the skill the GED essay's
 * conventions trait actually pays for — not "which of these four is correct"
 * but "find the slip in your own paragraph and fix it" — and it is the skill
 * the essay task's revision workshop assumes the student already has.
 *
 * Only the passage and the errors are authored. Everything else — where each
 * error sits, which word the student clicked, whether the fix is right and if
 * not what is still wrong with it — is derived here, so an item cannot ship
 * with an error the screen cannot find (`checkProofreadItems` refuses it).
 */

import { tidy, bare } from '../../app/writing/revision.js';

/* -------------------------------------------------------------------------- *
 * Locating the errors
 * -------------------------------------------------------------------------- */

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Every occurrence of `needle` in `text` that starts and ends on a word
 * boundary. Two occurrences is an authoring error: the screen could not know
 * which one the student meant.
 */
export function occurrences(text, needle) {
  const src = String(text || '');
  const q = String(needle || '');
  if (!q.trim()) return [];
  const re = new RegExp(`(^|[^A-Za-z0-9])(${escapeRe(q)})(?=$|[^A-Za-z0-9])`, 'g');
  const out = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    const start = m.index + m[1].length;
    out.push({ start, end: start + q.length });
    re.lastIndex = start + 1;
  }
  return out;
}

/**
 * The item's errors pinned to character offsets in the passage, in document
 * order. Errors that cannot be placed (or overlap another) are dropped, but the
 * validator has already refused any item where that would happen.
 */
export function placeErrors(item) {
  const text = String(item?.passage || '');
  const placed = [];
  for (const e of item?.errors || []) {
    const hits = occurrences(text, e?.wrong);
    if (hits.length !== 1) continue;
    const span = hits[0];
    if (placed.some((p) => span.start < p.end && p.start < span.end)) continue;
    placed.push({ ...e, start: span.start, end: span.end });
  }
  return placed.sort((a, b) => a.start - b.start);
}

/* -------------------------------------------------------------------------- *
 * Tokens the student can click
 * -------------------------------------------------------------------------- */

/**
 * The passage as clickable tokens: words (with any punctuation stuck to them)
 * and the whitespace between. Each carries its offsets so a click can be mapped
 * to an error span without any string searching at render time.
 */
export function tokenize(text) {
  const src = String(text || '');
  const out = [];
  const re = /(\s+)|([^\s]+)/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    out.push({
      text: m[0],
      start: m.index,
      end: m.index + m[0].length,
      space: m[1] !== undefined,
    });
  }
  return out;
}

/** The placed error a token falls inside, or null. */
export function errorAt(placed, token) {
  return placed.find((e) => token.start < e.end && e.start < token.end) || null;
}

/* -------------------------------------------------------------------------- *
 * Marking the fix
 * -------------------------------------------------------------------------- */

/**
 * Is the typed correction right? Exact after tidy() against `right` or any
 * `accept` alternative. The hints name what is still off — case, punctuation,
 * or the phrase left unchanged — rather than just saying no.
 */
export function checkFix(input, error) {
  const typed = tidy(input);
  const targets = [error?.right, ...(error?.accept || [])].map(tidy).filter(Boolean);

  if (!typed) return { ok: false, hint: 'Type the corrected words.' };
  if (targets.includes(typed)) return { ok: true, hint: '' };
  if (typed === tidy(error?.wrong)) {
    return { ok: false, hint: 'That is still the original. Change the part that is wrong.' };
  }
  if (targets.some((t) => t.toLowerCase() === typed.toLowerCase())) {
    return { ok: false, hint: 'Almost — check your capital letters.' };
  }
  if (targets.some((t) => bare(t) === bare(typed))) {
    return { ok: false, hint: 'Almost — check the punctuation.' };
  }
  return { ok: false, hint: 'Not quite. Change only the words that are wrong and keep the rest.' };
}

/** How many wrong clicks a passage tolerates before the rest is revealed. */
export const missAllowance = (errorCount) => Math.max(3, errorCount + 2);

/** From this many mistakes in a task, one of them may be missed for full marks. */
export const ONE_MISS_FROM = 4;

/**
 * The task's mark out of 10: mistakes fixed over mistakes in every passage. Missing
 * just one across the whole task still earns 10 (Bowen, 20 November 2026: a little
 * more forgiving, the challenge kept), once there are at least ONE_MISS_FROM to find.
 */
export function proofreadScore(fixed, total) {
  if (!(total > 0)) return 0;
  if (total >= ONE_MISS_FROM && fixed >= total - 1) return 10;
  return Math.round((fixed / total) * 10);
}

/* -------------------------------------------------------------------------- *
 * Validation (run by scripts/validate-entry.js)
 * -------------------------------------------------------------------------- */

const WORD_LIMIT = 6;

/** Problems with a unit's `proofread` list, as strings. Empty means clean. */
export function checkProofreadItems(list) {
  const problems = [];
  if (list === undefined) return problems;
  if (!Array.isArray(list)) return ['proofread must be an array of passages'];

  const ids = new Set();
  list.forEach((item, i) => {
    const at = `proofread ${item?.id || `#${i + 1}`}`;
    if (!item?.id) problems.push(`${at}: missing id`);
    else if (ids.has(item.id)) problems.push(`${at}: duplicate id`);
    ids.add(item?.id);

    if (!item?.title || !item?.titleVn) problems.push(`${at}: needs a bilingual title (title/titleVn)`);
    const text = String(item?.passage || '');
    if (text.trim().split(/\s+/).length < 30) problems.push(`${at}: passage is too short to hide an error in (under 30 words)`);

    const errors = item?.errors || [];
    if (errors.length < 2) problems.push(`${at}: needs at least 2 errors`);

    const seenWrong = new Set();
    const spans = [];
    errors.forEach((e, j) => {
      const eat = `${at} error ${e?.id || `#${j + 1}`}`;
      if (!e?.id) problems.push(`${eat}: missing id`);
      const wrong = String(e?.wrong || '');
      const right = String(e?.right || '');
      if (!wrong.trim()) { problems.push(`${eat}: missing "wrong"`); return; }
      if (!right.trim()) problems.push(`${eat}: missing "right"`);
      if (tidy(wrong) === tidy(right)) problems.push(`${eat}: "right" is identical to "wrong"`);
      if (wrong.trim().split(/\s+/).length > WORD_LIMIT) problems.push(`${eat}: "wrong" is longer than ${WORD_LIMIT} words — quote only the phrase that is wrong`);
      if (!e?.kind) problems.push(`${eat}: missing kind`);
      if (!e?.expEn || !e?.expVn) problems.push(`${eat}: needs a bilingual explanation (expEn/expVn)`);

      const hits = occurrences(text, wrong);
      if (hits.length === 0) problems.push(`${eat}: "${wrong}" is not in the passage (must match exactly, on word boundaries)`);
      else if (hits.length > 1) problems.push(`${eat}: "${wrong}" appears ${hits.length} times in the passage — it must be unique`);
      else {
        const span = hits[0];
        if (spans.some((s) => span.start < s.end && s.start < span.end)) problems.push(`${eat}: overlaps another error`);
        spans.push(span);
      }
      if (seenWrong.has(wrong.toLowerCase())) problems.push(`${eat}: duplicate "wrong" phrase`);
      seenWrong.add(wrong.toLowerCase());
    });
  });
  return problems;
}
