/**
 * Order It — the engine behind src/tasks/Sequence.jsx.
 *
 * The sentences of a paragraph, or the paragraphs of an essay, handed over
 * scrambled; the student puts them back. Only the correct order is authored.
 * The scramble, the marking and the "which ones are already right" feedback
 * are derived here — and the scramble is deterministic per item, so re-opening
 * the task shows the same puzzle rather than a fresh one to guess at.
 *
 * Why this exists: Trait 2 of the GED essay rubric (development and
 * organisation) is scored on the ORDER ideas arrive in and the transitions
 * that carry the reader between them. Ordering someone else's sentences is the
 * cheapest way to make that visible before the student has to do it in his own
 * writing under a clock.
 */

/* -------------------------------------------------------------------------- *
 * Deterministic scramble
 * -------------------------------------------------------------------------- */

/** A small seeded PRNG (mulberry32) so a scramble is repeatable per item id. */
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

/**
 * A permutation of 0..n-1 that puts NO item in its correct position (a
 * derangement), seeded by `key`. Nothing in the scrambled list is a free mark,
 * and the puzzle is the same every time the item opens.
 */
export function scrambleOrder(n, key = 'seq') {
  if (n < 2) return Array.from({ length: n }, (_, i) => i);
  const rand = rng(hash(key));
  for (let attempt = 0; attempt < 50; attempt++) {
    const order = Array.from({ length: n }, (_, i) => i);
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    if (order.every((v, i) => v !== i)) return order;
  }
  // Rotation is always a derangement; used only if the loop above is unlucky.
  return Array.from({ length: n }, (_, i) => (i + 1) % n);
}

/* -------------------------------------------------------------------------- *
 * Marking
 * -------------------------------------------------------------------------- */

/**
 * `order` is the student's arrangement as a list of original indices. Returns
 * which slots are right and how many — position-by-position, which is what
 * the student needs to see to fix it.
 */
export function markOrder(order) {
  const slots = (order || []).map((v, i) => v === i);
  return { slots, correct: slots.filter(Boolean).length, total: slots.length, ok: slots.length > 0 && slots.every(Boolean) };
}

/** `order` with the item at `from` moved to `to`. */
export function moveItem(order, from, to) {
  const next = [...order];
  if (from < 0 || from >= next.length || to < 0 || to >= next.length) return next;
  const [v] = next.splice(from, 1);
  next.splice(to, 0, v);
  return next;
}

/* -------------------------------------------------------------------------- *
 * Validation (run by scripts/validate-entry.js)
 * -------------------------------------------------------------------------- */

/** Problems with a unit's `sequence` list, as strings. Empty means clean. */
export function checkSequenceItems(list, { bilingual = true } = {}) {
  const problems = [];
  if (list === undefined) return problems;
  if (!Array.isArray(list)) return ['sequence must be an array of exercises'];

  const ids = new Set();
  list.forEach((item, i) => {
    const at = `sequence ${item?.id || `#${i + 1}`}`;
    if (!item?.id) problems.push(`${at}: missing id`);
    else if (ids.has(item.id)) problems.push(`${at}: duplicate id`);
    ids.add(item?.id);

    if (!item?.title || (bilingual && !item?.titleVn)) problems.push(`${at}: needs a ${bilingual ? 'bilingual ' : ''}title`);
    if (!item?.prompt || (bilingual && !item?.promptVn)) problems.push(`${at}: needs a ${bilingual ? 'bilingual ' : ''}prompt`);
    if (!item?.expEn || (bilingual && !item?.expVn)) problems.push(`${at}: needs a ${bilingual ? 'bilingual ' : ''}explanation (expEn/expVn)`);

    const items = item?.items || [];
    if (items.length < 3) problems.push(`${at}: needs at least 3 items to order (has ${items.length})`);
    if (items.length > 8) problems.push(`${at}: ${items.length} items is too many to hold in mind — split it`);
    const seen = new Set();
    items.forEach((it, j) => {
      const text = String(it?.text || '').trim();
      if (!text) problems.push(`${at} item ${j + 1}: missing text`);
      if (bilingual && !it?.textVn) problems.push(`${at} item ${j + 1}: missing textVn`);
      if (seen.has(text.toLowerCase())) problems.push(`${at} item ${j + 1}: duplicate text — two identical items cannot be ordered`);
      seen.add(text.toLowerCase());
    });
  });
  return problems;
}
