/**
 * The shape of `students.progress`, in one place.
 *
 * Until now a task record was `{ current, answers }` — a permanent high-water
 * mark with no time dimension, which made spaced review, retention measurement
 * and any "you're improving" signal impossible to build. This module adds the
 * memory without changing what `current` means, so every existing XP
 * calculation keeps working untouched.
 *
 *   progress[track][unitId][dbKey] = {
 *     current,    // high-water mark — XP maths reads this and nothing else
 *     last,       // most recent score: what they know NOW, not their best day
 *     answers,    // resume blob, unchanged
 *     updatedAt,  // ISO — "when was this last touched"
 *     attempts,   // [{ score, at }], newest last, capped
 *     items,      // [{ itemId, correct, retried?, at }] — per-item log for targeted review
 *   }
 *
 *   progress[track][VOCAB_KEY] = {
 *     [word]: { seen, right, wrong, lastSeen }
 *   }
 *
 * The vocabulary bank sits beside the units rather than inside one because a
 * word is met in one unit and needs to come back in every later review.
 */

/** Reserved key beside the unit ids in a track's progress. Never a unit id. */
export const VOCAB_KEY = '__vocab';

/**
 * The arcade wallet, kept in the ARCADE track's progress beside its level
 * scores: `{ spent }`, the running total of gold a student has paid to play.
 *
 * Gold EARNED is derived from XP and never stored (see arcade/economy.js), so
 * this single number is the whole persisted economy. It sits under the arcade
 * track because that bucket is preserved verbatim by the loader — a top-level
 * key would be dropped when progress is normalised to the track list.
 */
export const WALLET_KEY = '__wallet';

/**
 * Where a unit's raw arcade high scores live, beside the task records.
 *
 * They are deliberately not dbKeys: the GAMES task's XP is clamped to a few
 * points, so the unclamped score needs its own home for the per-unit
 * leaderboard to be able to rank anyone. Never counted as unit XP.
 *
 * ONE KEY PER CABINET. The arcade has two games that score on completely
 * different scales and reward completely different skills, so pooling them into
 * one board would rank a good Tower Defense run against a good Survivor run and
 * mean nothing. `ARCADE_KEY` keeps its historic name and its historic contents —
 * every Tower Defense score ever saved is already under `GAMES`, so splitting
 * the boards needed a NEW key rather than a migration of the old one.
 */
export const ARCADE_KEY = 'GAMES';
export const SURVIVOR_KEY = 'SURVIVOR';

/**
 * The arcade's leaderboards, declared once.
 *
 * `key` is where the score lives in a unit's progress and what the server's
 * `get_unit_leaderboard(target_unit_id, target_key)` reads; `id` is what the
 * hub's tab state uses. Adding a third cabinet means adding a row here, adding
 * the key to the SQL function's allow-list, and nothing else.
 */
export const ARCADE_BOARDS = [
  { id: 'TD',       key: ARCADE_KEY,   label: 'Tower Defense' },
  { id: 'SURVIVOR', key: SURVIVOR_KEY, label: 'Swarm Survivor' },
];

/** Every progress key that holds a raw arcade score. */
export const ARCADE_KEYS = ARCADE_BOARDS.map(b => b.key);

/**
 * True for a key that names a real leaderboard.
 *
 * Guards the write in `saveScore`: which board a score lands on arrives inside
 * `meta`, and an unchecked value there would let a caller write any key it liked
 * into a unit's progress — including one that shadows a task's dbKey.
 */
export const isArcadeKey = (key) => ARCADE_KEYS.includes(key);

/**
 * The essay archive — every GED essay the student has written, with its score,
 * the examiner's report and the errors marked. Kept beside the units like the
 * vocabulary bank, because an essay belongs to the student's writing history
 * rather than to one unit's score. Shape and helpers: utils/essayArchive.js.
 */
export const ESSAYS_KEY = '__essays';

/** Keys inside a track's progress that are not units. */
const RESERVED_TRACK_KEYS = [VOCAB_KEY, WALLET_KEY, ESSAYS_KEY];

/**
 * What the student typed each time the AI grader flagged an answer, beside the
 * unit's `strikes` count:
 *
 *   progress[track][unitId].strikeLog = [
 *     { at, task, question, text, reason: 'harmful' | 'garbage', clearedAt? }
 *   ]
 *
 * The count alone told a teacher THAT a student was locked out, never WHY — the
 * flagged text was discarded the moment the warning showed. The teacher's
 * drawer reads this; `clearedAt` is stamped by the clearStrikes admin action
 * when a teacher resets the unit, so the history survives the reset.
 */
export const STRIKE_LOG_KEY = 'strikeLog';
export const MAX_STRIKE_LOG = 20;
const MAX_STRIKE_TEXT = 4000;

/** Appends one flagged answer to a unit's log, newest last, capped. */
export function appendStrike(log, detail = {}) {
  const entry = {
    at: new Date().toISOString(),
    task: String(detail.task || ''),
    question: String(detail.question || '').slice(0, 600),
    text: String(detail.text || '').slice(0, MAX_STRIKE_TEXT),
    reason: detail.reason === 'harmful' ? 'harmful' : 'garbage',
  };
  return [...(Array.isArray(log) ? log : []), entry].slice(-MAX_STRIKE_LOG);
}

/** Keys inside a unit's progress that are not task dbKeys. */
const RESERVED_UNIT_KEYS = ['strikes', STRIKE_LOG_KEY, ...ARCADE_KEYS];

/** True for keys that address a real unit. Use before iterating a track. */
export const isUnitKey = (key) => !RESERVED_TRACK_KEYS.includes(key);

/** True for keys that address a real task inside a unit. */
export const isTaskKey = (key) => !RESERVED_UNIT_KEYS.includes(key);

// The record lives in a JSON column that is rewritten in full on every save, so
// the logs are capped. Both are far more than a six-week sprint will produce.
export const MAX_ATTEMPTS = 30;
export const MAX_ITEMS = 300;

/**
 * Folds one completed attempt into a task's record.
 *
 * `current` stays `max(existing, score)` because phase thresholds and the unit
 * XP total are built on it — a student must never lose access to a phase by
 * re-doing a task and scoring worse. `last` carries the honest number.
 *
 * meta.items — `[{ itemId, correct }]` — is what makes targeted review possible:
 * which item, right or wrong, when.
 */
export function recordAttempt(prev, score, answers = null, meta = {}) {
  const at = new Date().toISOString();
  const value = Number(score) || 0;
  const previous = prev || {};

  // A checkpoint save (`meta.partial`) persists progress in the MIDDLE of a task
  // — the updated high-water XP and the resume blob — but appends neither a new
  // attempt nor item rows, so saving after every question never floods those
  // logs. Quitting or completing the task saves normally, logging one attempt for
  // the whole session. `current` still climbs on a checkpoint, so partial work
  // counts toward the unit XP and phase gates immediately. The study plan dates
  // that XP by `updatedAt`, since there is no attempt to read a time from.
  const partial = !!meta.partial;

  const attempts = partial
    ? (previous.attempts || [])
    : [...(previous.attempts || []), { score: value, at }].slice(-MAX_ATTEMPTS);

  const logged = (partial ? [] : (meta.items || []))
    .filter((i) => i && i.itemId != null)
    // `retried`: answered more than once (Notes lets a student fix a wrong
    // check at the end of the lesson), so a right answer here can still mark
    // an item that was missed the first time.
    .map((i) => ({ itemId: String(i.itemId), correct: !!i.correct, ...(i.retried ? { retried: true } : null), at }));
  const items = [...(previous.items || []), ...logged].slice(-MAX_ITEMS);

  return {
    ...previous,
    current: Math.max(Number(previous.current) || 0, value),
    last: value,
    answers: answers ?? previous.answers ?? null,
    updatedAt: at,
    attempts,
    ...(items.length ? { items } : null),
  };
}

/**
 * Folds vocabulary results into a track's word bank.
 *
 * Keyed by lowercased word so the same term met in two units accumulates one
 * history — which is the point: a word is only known if it survives the gap
 * between the unit that taught it and the review that asks again.
 */
export function mergeVocab(store, entries = []) {
  const at = new Date().toISOString();
  const next = { ...(store || {}) };

  for (const entry of entries) {
    const word = String(entry?.word || '').trim().toLowerCase();
    if (!word) continue;
    const prev = next[word] || { seen: 0, right: 0, wrong: 0, lastSeen: null };
    next[word] = {
      seen: (prev.seen || 0) + 1,
      right: (prev.right || 0) + (entry.correct ? 1 : 0),
      wrong: (prev.wrong || 0) + (entry.correct ? 0 : 1),
      lastSeen: at,
    };
  }

  return next;
}

/** A track's vocabulary bank, or `{}` if nothing has been logged yet. */
export const vocabBank = (trackProgress) => (trackProgress || {})[VOCAB_KEY] || {};
