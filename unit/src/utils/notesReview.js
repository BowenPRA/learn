/**
 * The scored items in a Notes deck and the resume blob that records them.
 * Shared by the Notes task (which saves and reopens the blob) and the unit
 * card (which shows "Fix 3" on a finished deck with mistakes left to put right).
 *
 * The blob Notes keeps in `progress[...].answers`, version 2:
 *   { v: 2, slide, total, checks: { [slideIndex]: result }, finished?: true }
 * `result` is a check's `{ val, correct }` or an activity's `{ done, correct, … }`;
 * `retried: true` marks one answered more than once (put right, or tried again
 * at the end of the lesson), `restored: true` one rebuilt from the item log,
 * which keeps right/wrong and nothing else.
 *
 * Before v2 a finished deck saved `{ slide: 0, checks: {} }` — every answer
 * thrown away, so the only way to fix one wrong check was to read the whole
 * deck again and get everything else right a second time. A finished v2 deck
 * keeps its answers, and the student redoes only what they got wrong.
 */

export const NOTES_BLOB_VERSION = 2;

/** The id a deck item is logged under (`items` in the progress record). */
export const itemIdOf = (slide, i) => slide?.check?.id || slide?.activity?.id || `slide-${i + 1}`;

/** Every scored item — a `check` or an `activity` — with the slide it sits on. */
export const deckItems = (slides) => (slides || [])
  .map((slide, i) => (slide?.check || slide?.activity
    ? { i, id: itemIdOf(slide, i), check: slide.check || null, activity: slide.check ? null : slide.activity || null }
    : null))
  .filter(Boolean);

/** Slide indexes of the items not (yet) answered right. */
export const mistakesOf = (slides, checks) =>
  deckItems(slides).filter(({ i }) => !checks?.[i]?.correct).map(({ i }) => i);

/**
 * A deck finished before v2 kept no answers, but its last save logged every
 * item right or wrong (`recordAttempt` stamps one session's rows with one
 * `at`). Rebuild the answers from that session, so a student who finished with
 * mistakes can fix them without reading the deck again. Null when the log does
 * not cover every item in the deck as it stands now.
 */
export function answersFromLog(slides, log) {
  const items = deckItems(slides);
  if (!items.length || !Array.isArray(log) || !log.length) return null;
  const ids = new Set(items.map((x) => x.id));
  const rows = log.filter((r) => r && ids.has(String(r.itemId)) && typeof r.at === 'string');
  if (!rows.length) return null;
  const lastAt = rows.reduce((m, r) => (r.at > m ? r.at : m), '');
  const byId = {};
  rows.filter((r) => r.at === lastAt).forEach((r) => { byId[String(r.itemId)] = !!r.correct; });
  if (!items.every((x) => x.id in byId)) return null;
  const checks = {};
  items.forEach((x) => { checks[x.i] = { correct: byId[x.id], done: true, restored: true }; });
  return checks;
}

/**
 * Where a deck reopens: `{ slide, checks, finished }`.
 *
 * `total` guards the restore — if the deck has been re-authored to a different
 * length since the save, the slide position and the answers no longer line up
 * with the slides they were made on, so both are dropped.
 */
export function restoreNotes(saved, slides, log) {
  const total = slides?.length || 0;
  const fresh = { slide: 0, checks: {}, finished: false };
  const blob = saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : null;
  const sameDeck = !!blob && blob.total === total;
  const slideOf = (b) => Math.min(Math.max(Number(b.slide) || 0, 0), Math.max(total - 1, 0));
  const checksOf = (b) => (b.checks && typeof b.checks === 'object' ? b.checks : {});

  if (blob?.v >= NOTES_BLOB_VERSION) {
    if (!sameDeck) return fresh;
    const finished = !!blob.finished;
    return { slide: finished ? 0 : slideOf(blob), checks: checksOf(blob), finished };
  }

  // A pre-v2 blob part way through: resume it as before.
  if (sameDeck && (slideOf(blob) > 0 || Object.keys(checksOf(blob)).length > 0)) {
    return { slide: slideOf(blob), checks: checksOf(blob), finished: false };
  }

  // A pre-v2 finished deck (or nothing saved): recover its last result from
  // the item log — but only for the same deck, and only if there is
  // something to fix. A clean sheet re-reads from the top, as it always did.
  if (!blob || blob.total == null || sameDeck) {
    const checks = answersFromLog(slides, log);
    if (checks && Object.values(checks).some((r) => !r.correct)) return { slide: 0, checks, finished: true };
  }
  return fresh;
}

/**
 * How many mistakes a finished deck has left to fix, for the unit card. Zero
 * while the deck is unfinished (the card says Continue instead) or once the
 * task is at full marks.
 */
export function notesToFix(slides, record, maxXP) {
  if (!record || !(maxXP > 0) || (Number(record.current) || 0) >= maxXP) return 0;
  const { finished, checks } = restoreNotes(record.answers, slides, record.items);
  return finished ? mistakesOf(slides, checks).length : 0;
}
