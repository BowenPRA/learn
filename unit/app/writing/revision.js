/**
 * Turning a grader's list of errors into edits the student can actually make.
 *
 * The GED grader returns `revisions` — each one a phrase quoted from the
 * student's own response and the phrase that should replace it. That is the raw
 * material, not the lesson. The lesson is the student typing the corrected
 * sentence themselves, which needs three things this module provides:
 *
 *   1. Every quote pinned to real character offsets in their essay, so a
 *      correction can be shown in place instead of floating in a list.
 *   2. Those offsets grouped into whole sentences, because a sentence is the
 *      smallest unit a person can rewrite and still hear whether it works — and
 *      because two errors in one sentence are one edit, not two.
 *   3. The corrected essay rebuilt from the sentences the student typed, so what
 *      they carry away is their own writing, not the model's.
 *
 * All pure functions, all offset-based: nothing here mutates or re-renders.
 */

/* -------------------------------------------------------------------------- *
 * Text normalisation
 * -------------------------------------------------------------------------- */

// Character-for-character replacements only, so an index into the normalised
// string is still a valid index into the original. Smart quotes and dashes are
// the whole problem here: a student's phone types ’ where the grader echoes '.
const SAME_LENGTH_SWAPS = [
  [/[‘’‚‛]/g, "'"],
  [/[“”„‟]/g, '"'],
  [/[‐‑‒–—―]/g, '-'],
  // Non-breaking, figure and narrow spaces, as escapes: a literal one here is
  // invisible in a diff and trips the linter's irregular-whitespace rule.
  [/[\u00a0\u2007\u202f]/g, ' '],
];

/** Unifies quotes, dashes and hard spaces without changing the string length. */
export const canonical = (s) =>
  SAME_LENGTH_SWAPS.reduce((acc, [re, to]) => acc.replace(re, to), String(s ?? ''));

/** Canonical, trimmed, and with runs of whitespace collapsed to one space. */
export const tidy = (s) => canonical(s).replace(/\s+/g, ' ').trim();

/** tidy(), and with punctuation and case thrown away too. */
export const bare = (s) =>
  tidy(s).toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();

export const countWords = (s) => String(s || '').trim().split(/\s+/).filter(Boolean).length;

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/* -------------------------------------------------------------------------- *
 * Locating a quote
 * -------------------------------------------------------------------------- */

/**
 * Where `quote` sits inside `text`, at or after `from`.
 *
 * Four attempts, each looser than the last, because a fix anchored to the wrong
 * words is worse than a fix quietly dropped. Returns null rather than guessing.
 */
export function locate(text, quote, from = 0) {
  const src = String(text || '');
  const q = String(quote || '').trim();
  if (q.length < 2) return null;

  const at = (start) => (start === -1 ? null : { start, end: start + q.length });

  // 1. exactly, ahead of the cursor — then anywhere, in case the grader listed
  //    two errors out of order.
  let hit = at(src.indexOf(q, from)) || at(src.indexOf(q));
  if (hit) return hit;

  // 2. same characters once smart punctuation is unified.
  const cSrc = canonical(src);
  const cQ = canonical(q);
  hit = at(cSrc.indexOf(cQ, from)) || at(cSrc.indexOf(cQ));
  if (hit) return hit;

  // 3. same words, any case.
  const lower = cSrc.toLowerCase();
  const lowerQ = cQ.toLowerCase();
  hit = at(lower.indexOf(lowerQ, from)) || at(lower.indexOf(lowerQ));
  if (hit) return hit;

  // 4. same words, however they were spaced or line-broken.
  const parts = cQ.split(/\s+/).filter(Boolean).map(escapeRe);
  if (parts.length < 2) return null;
  const re = new RegExp(parts.join('\\s+'), 'i');
  const m = cSrc.slice(from).match(re) || cSrc.match(re);
  if (!m) return null;
  const start = cSrc.indexOf(m[0], m.input === cSrc ? 0 : from);
  return start === -1 ? null : { start, end: start + m[0].length };
}

/* -------------------------------------------------------------------------- *
 * Sentences
 * -------------------------------------------------------------------------- */

/** Trims a raw span down to its non-whitespace content, or null if empty. */
function spanOf(src, start, end) {
  let a = start;
  let b = end;
  while (a < b && /\s/.test(src[a])) a++;
  while (b > a && /\s/.test(src[b - 1])) b--;
  return b > a ? { start: a, end: b, text: src.slice(a, b) } : null;
}

/**
 * The essay cut into sentences, with offsets.
 *
 * A newline ends a sentence as firmly as a full stop does, because the students
 * who need this most are exactly the ones whose sentences do not always end in
 * one — and a missing full stop must not swallow the next three sentences into
 * a single unreadable rewrite box.
 */
export function splitSentences(text) {
  const src = String(text || '');
  const out = [];
  const re = /([.!?]+["'”’)\]]*(?=\s|$)|\n+)/g;
  let start = 0;
  let m;

  while ((m = re.exec(src)) !== null) {
    const end = m.index + m[0].length;
    const span = spanOf(src, start, end);
    if (span) out.push(span);
    start = end;
  }
  const tail = spanOf(src, start, src.length);
  if (tail) out.push(tail);

  return out;
}

/* -------------------------------------------------------------------------- *
 * The plan
 * -------------------------------------------------------------------------- */

/** Replaces every issue span inside one card's text, right to left. */
function applyIssues(cardText, cardStart, issues) {
  return [...issues]
    .sort((a, b) => b.start - a.start)
    .reduce(
      (acc, i) => acc.slice(0, i.start - cardStart) + i.correction + acc.slice(i.end - cardStart),
      cardText
    );
}

/**
 * Groups the grader's revisions into one editable card per affected sentence.
 *
 * Returns { cards, dropped }. A card is what the student is asked to retype:
 * the original sentence(s), the target with every correction applied, and the
 * issues inside it with offsets relative to the card so they can be highlighted.
 */
export function buildRevisionPlan(originalText, revisions = []) {
  const text = String(originalText || '');
  const sentences = splitSentences(text);
  if (!sentences.length) return { cards: [], dropped: (revisions || []).length };

  // Pin each revision to real offsets, walking forward so a phrase the student
  // used twice is claimed once, in order.
  const placed = [];
  let cursor = 0;
  let dropped = 0;

  for (const r of revisions || []) {
    const span = locate(text, r?.quote, cursor);
    if (!span) { dropped += 1; continue; }
    if (placed.some((p) => span.start < p.end && p.start < span.end)) { dropped += 1; continue; }

    placed.push({
      start: span.start,
      end: span.end,
      quote: text.slice(span.start, span.end),
      correction: String(r?.correction || '').trim(),
      kind: String(r?.kind || '').trim() || 'Correction',
      why: String(r?.why || '').trim(),
      rule: String(r?.rule || '').trim(),
    });
    cursor = span.end;
  }

  placed.sort((a, b) => a.start - b.start);

  // Group into cards. An issue that straddles a sentence boundary — a comma
  // splice being broken into two sentences, typically — pulls both sentences
  // into one card, and any card it now touches merges with it.
  const groups = [];
  for (const p of placed) {
    let first = sentences.findIndex((s) => p.start < s.end && s.start < p.end);
    let last = first;
    for (let i = first; i >= 0 && i < sentences.length; i++) {
      if (sentences[i].start < p.end) last = i; else break;
    }
    if (first === -1) { first = 0; last = 0; }

    const touching = groups.filter((g) => !(g.last < first || g.first > last));
    if (touching.length) {
      const merged = touching[0];
      merged.first = Math.min(first, ...touching.map((g) => g.first));
      merged.last = Math.max(last, ...touching.map((g) => g.last));
      merged.issues.push(p);
      for (const other of touching.slice(1)) {
        merged.issues.push(...other.issues);
        groups.splice(groups.indexOf(other), 1);
      }
    } else {
      groups.push({ first, last, issues: [p] });
    }
  }

  groups.sort((a, b) => sentences[a.first].start - sentences[b.first].start);

  const cards = groups.map((g, i) => {
    const start = sentences[g.first].start;
    const end = sentences[g.last].end;
    const original = text.slice(start, end);
    const issues = g.issues
      .sort((a, b) => a.start - b.start)
      .map((issue) => ({ ...issue, relStart: issue.start - start, relEnd: issue.end - start }));

    return {
      id: `fix${i + 1}`,
      start,
      end,
      original,
      target: applyIssues(original, start, issues),
      issues,
    };
  });

  return { cards, dropped };
}

/**
 * The essay rebuilt with each card replaced by what the student typed.
 * Right to left, so earlier offsets stay valid as later ones are spliced.
 */
export function assembleEssay(originalText, cards = [], typed = {}) {
  const text = String(originalText || '');
  return [...cards]
    .sort((a, b) => b.start - a.start)
    .reduce((acc, c) => {
      const replacement = (typed[c.id] ?? c.target ?? c.original).trim();
      return acc.slice(0, c.start) + replacement + acc.slice(c.end);
    }, text);
}

/* -------------------------------------------------------------------------- *
 * Marking the student's rewrite
 * -------------------------------------------------------------------------- */

/**
 * Is the retyped sentence right, and if not, what is the most useful thing to
 * say about it?
 *
 * The bar is the target typed out exactly, because the target is the student's
 * own sentence with only the flagged phrases swapped — matching it means making
 * the corrections and changing nothing else.
 *
 * An earlier version also passed any rewrite that merely contained every
 * correction. That accepted "Source 2 gives evidence from Marsdon instead" —
 * the flagged verb fixed and a fresh misspelling introduced — which is exactly
 * the sentence this screen exists to catch. A student who wants to improve the
 * sentence further can do it in the editable essay at the end; here the job is
 * the correction and nothing else, and every rejection below says precisely
 * what is still wrong.
 */
export function checkSentence(input, card) {
  const typed = tidy(input);
  const target = tidy(card?.target);
  const issues = card?.issues || [];

  const resolved = issues.map(
    (i) => typed.includes(tidy(i.correction)) && !typed.includes(tidy(i.quote))
  );

  if (typed === target) return { ok: true, resolved, hint: '' };

  if (!typed) return { ok: false, resolved, hint: 'Type the whole sentence out, with the corrections made.' };
  if (typed === tidy(card?.original)) {
    return { ok: false, resolved, hint: 'Nothing has changed yet. Make the corrections listed above, then check again.' };
  }

  // Capitals first: a sentence that is right apart from its case would
  // otherwise be reported as a missing correction, which sends the student
  // hunting for a word that is already there.
  if (typed.toLowerCase() === target.toLowerCase()) {
    return { ok: false, resolved, hint: 'Almost — check your capital letters.' };
  }

  const missing = resolved.findIndex((r) => !r);
  if (missing !== -1) {
    return {
      ok: false,
      resolved,
      hint: `Correction ${missing + 1} is not in your sentence yet — you need "${issues[missing].correction}".`,
    };
  }
  if (bare(typed) === bare(target)) {
    return { ok: false, resolved, hint: 'Almost — check the punctuation at the end and inside the sentence.' };
  }
  return { ok: false, resolved, hint: 'Not quite. Keep the rest of the sentence exactly as you wrote it, and change only the parts listed above.' };
}

/* -------------------------------------------------------------------------- *
 * Word diff, for showing what changed
 * -------------------------------------------------------------------------- */

/**
 * A word-level diff as a flat list of { type: 'same' | 'del' | 'ins', text }.
 * Whitespace travels with the tokens so the rendered diff still reads as prose.
 */
export function wordDiff(before, after) {
  const split = (s) => String(s || '').split(/(\s+)/).filter((t) => t !== '');
  const a = split(before);
  const b = split(after);

  // Longest common subsequence over tokens. Sentences are short; the whole-essay
  // view is composed from per-card diffs rather than run over the full text.
  const n = a.length;
  const m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const out = [];
  const push = (type, text) => {
    const last = out[out.length - 1];
    if (last && last.type === type) last.text += text;
    else out.push({ type, text });
  };

  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { push('same', a[i]); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { push('del', a[i]); i++; }
    else { push('ins', b[j]); j++; }
  }
  while (i < n) { push('del', a[i]); i++; }
  while (j < m) { push('ins', b[j]); j++; }

  return out;
}

/**
 * The whole essay as a diff, composed from the cards rather than run over the
 * full text: everything between two cards is untouched by definition, so only
 * the rewritten sentences need diffing. Keeps a 500-word essay cheap and stops
 * the LCS from finding imaginative "matches" across unrelated paragraphs.
 */
export function essayDiff(originalText, cards = [], typed = {}) {
  const text = String(originalText || '');
  const ordered = [...cards].sort((a, b) => a.start - b.start);
  const out = [];
  let at = 0;

  for (const card of ordered) {
    if (card.start > at) out.push({ type: 'same', text: text.slice(at, card.start) });
    out.push(...wordDiff(card.original, (typed[card.id] ?? card.target ?? card.original).trim()));
    at = card.end;
  }
  if (at < text.length) out.push({ type: 'same', text: text.slice(at) });

  return out;
}

/**
 * The error types the student actually made, commonest first — the one part of
 * this worth carrying into the next essay.
 */
export function summariseKinds(cards = []) {
  const counts = new Map();
  for (const card of cards) {
    for (const issue of card.issues || []) {
      const key = issue.kind || 'Correction';
      const entry = counts.get(key) || { kind: key, count: 0, rule: issue.rule };
      entry.count += 1;
      if (!entry.rule && issue.rule) entry.rule = issue.rule;
      counts.set(key, entry);
    }
  }
  return [...counts.values()].sort((a, b) => b.count - a.count);
}
