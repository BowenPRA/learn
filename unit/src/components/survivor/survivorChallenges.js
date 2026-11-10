// src/components/survivor/survivorChallenges.js
//
// The study half of Swarm Survivor.
//
// Tower Defense interrupts play with a "bolt" the student has fifteen seconds to
// answer. That works there because the board keeps running and the pressure IS
// the game. Survivor asks its questions at the one moment the genre already
// stops: the level-up screen. Nothing is chasing you, nothing is on a timer, and
// the question is not a toll — it decides whether you CHOOSE your upgrade or the
// game rolls one for you. Getting it wrong still levels you up.
//
// That inversion matters for a classroom: the student who cannot answer is not
// punished into a death spiral, and the student who can gets the thing that
// actually makes this genre fun, which is agency over the build.
//
// The question bank is the unit's own: the same vocabulary pool the Vocab task
// uses, and the same per-unit arithmetic generator Tower Defense draws its Maths
// Bolts from.

import { mathChallengeFor } from '../towerdefense/mathChallenges';

/** Maths-track units draw maths a little more often than vocabulary. */
const MATH_RATIO = 0.6;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Four plausible options around a numeric answer, including its sign flip.
 * Returns null when the answer is not a number, so the caller falls back.
 */
function numericChoices(answer) {
  const n = Number(answer);
  if (!Number.isFinite(n)) return null;
  const opts = new Set([n]);
  for (const c of [n + 1, n - 1, n + 2, -n, n - 2, n + 3, n + 5, n - 5]) {
    if (opts.size >= 4) break;
    opts.add(c);
  }
  let k = 4;
  while (opts.size < 4) opts.add(n + k++);
  return [...opts].map(String);
}

/** Same loose matching the board uses: case, spaces and any flavour of minus. */
export function normalizeAnswer(s) {
  return String(s ?? '').trim().toLowerCase().replace(/[−–—]/g, '-').replace(/\s+/g, '');
}

/** "sketch" → "s·····": the first letter, then a dot for each letter after it. */
export function letterHint(word) {
  return String(word || '').trim().split(' ')
    .map((w, i) => (i === 0 ? w.slice(0, 1) + '·'.repeat(Math.max(0, w.length - 1)) : '·'.repeat(w.length)))
    .join('  ');
}

/**
 * How many edits apart two strings are: a letter added, dropped or changed, or
 * two neighbours swapped ("recieve"), each count as one. Gives up early (returns
 * max + 1) once the answer is clearly further away than `max`.
 */
export function editDistance(a, b, max = 2) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev2 = null;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      const same = a[i - 1] === b[j - 1];
      let d = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (same ? 0 : 1));
      if (prev2 && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d = Math.min(d, prev2[j - 2] + 1);
      cur[j] = d;
      if (d < best) best = d;
    }
    if (best > max) return max + 1;
    prev2 = prev; prev = cur;
  }
  return prev[b.length];
}

/** Letters only, accents folded: "Évaporation " and "evaporation" are the same word. */
function lettersOf(s) {
  return String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Marks a TYPED vocabulary answer, forgiving a spelling slip.
 *
 * The question is "do you know this word?", not a spelling test, and these are
 * students writing in a second language. So a near miss counts: one slip in a
 * word of 4 to 7 letters, two in a longer one, none in a word of 3 or fewer
 * (one letter out of three is a different word). Two guards keep it honest:
 * the first letter must be right (it is given as the hint), and an answer that
 * is nearer to, or exactly, another word in the unit is wrong.
 *
 * Returns 'exact', 'close' (right, but show the spelling) or null (wrong).
 * Maths answers never come here: a number is right or it is not.
 */
export function matchTyped(input, answer, others = []) {
  const typed = lettersOf(input);
  const want = lettersOf(answer);
  if (!typed || !want) return null;
  if (typed === want) return 'exact';
  const allowed = want.length <= 3 ? 0 : want.length <= 7 ? 1 : 2;
  if (allowed === 0 || typed[0] !== want[0]) return null;
  const d = editDistance(typed, want, allowed);
  if (d > allowed) return null;
  for (const o of others) {
    const other = lettersOf(o);
    if (!other || other === want) continue;
    if (editDistance(typed, other, d) <= d) return null;
  }
  return 'close';
}

/**
 * Whether a term is fair to ask the student to TYPE. A term of several words is
 * not: typing a whole phrase exactly, in a second language, is a spelling test
 * the game has no business setting. Those are always multiple choice.
 */
export function canType(word) {
  return !/\s/.test(String(word || '').trim());
}

/**
 * Builds the question bank for one run.
 *
 * `pool` is the unit's word list exactly as taskRegistry hands it to the arcade;
 * `unitId` selects the arithmetic generator. A unit with neither returns null,
 * and the level-up screen then simply offers a free choice — a track with no
 * question bank should still be playable, not silently harder.
 */
export function makeChallengeBank(pool, unitId) {
  const vocab = (pool || [])
    .filter(w => w?.word && (w.def || w.vnDef))
    .map(w => ({ word: w.word, def: w.def || w.vnDef || '', sent: w.sent || '', vn: w.vn || '', fr: w.fr || '' }));
  const mathGen = mathChallengeFor(unitId);

  if (vocab.length === 0 && !mathGen) return null;

  // Every word is asked both ways before any is repeated, so a short list still
  // covers the whole run without feeling like a loop.
  let used = {};

  function nextVocab() {
    let available = [];
    for (const v of vocab) {
      const u = used[v.word] || {};
      if (!u.TYPE && canType(v.word)) available.push({ item: v, mode: 'TYPE' });
      if (!u.CHOICE) available.push({ item: v, mode: 'CHOICE' });
    }
    if (available.length === 0) {
      used = {};
      for (const v of vocab) {
        if (canType(v.word)) available.push({ item: v, mode: 'TYPE' });
        available.push({ item: v, mode: 'CHOICE' });
      }
    }
    const { item, mode } = available[Math.floor(Math.random() * available.length)];
    if (!used[item.word]) used[item.word] = {};
    used[item.word][mode] = true;

    let choices = null;
    if (mode === 'CHOICE') {
      const others = vocab.filter(x => x.word.toLowerCase() !== item.word.toLowerCase());
      choices = shuffle([item.word, ...shuffle(others).slice(0, 3).map(x => x.word)]);
    }
    return {
      kind: 'VOCAB',
      mode,
      prompt: item.def,
      answer: item.word,
      choices,
      reveal: { word: item.word, sent: item.sent, vn: item.vn, fr: item.fr },
      // The unit's other words, so a typed answer that is really one of them
      // is not waved through as a typo of this one.
      others: vocab.filter(x => x !== item).map(x => x.word),
    };
  }

  function nextMath() {
    const q = mathGen();
    let mode, choices = null;
    if (q.choices) {
      mode = 'CHOICE';
      choices = shuffle(q.choices);
    } else {
      mode = Math.random() < 0.5 ? 'TYPE' : 'CHOICE';
      if (mode === 'CHOICE') {
        choices = numericChoices(q.answer);
        if (!choices) mode = 'TYPE';
      }
    }
    return { kind: 'MATH', mode, prompt: q.prompt, answer: String(q.answer), choices, reveal: null };
  }

  return function nextChallenge() {
    const hasVocab = vocab.length > 0;
    const useMath = mathGen && (!hasVocab || Math.random() < MATH_RATIO);
    return useMath ? nextMath() : nextVocab();
  };
}
