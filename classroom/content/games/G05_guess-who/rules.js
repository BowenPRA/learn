// content/games/G05_guess-who/rules.js
// Guess Who's rules, with no React in it. Ported from BowenPRA/classroom
// (src/guess-who/game.js and match.js) on 16 Nov 2026.
//
// The laptop owns the game: it deals, keeps the secret Mr Bowen picks on his
// phone, counts his answers and judges the one final guess. The phone only
// asks it to do things (remote.jsx). The state holds ids only; each end looks
// the cards up in its own copy of boards.js.

export const BOARD_SIZE = 24
// Fewer cards than this is not a game.
export const MIN_BOARD = 4

// The most questions that still win 3, 2 and 1 Riverbucks. 21 animals or 24
// monsters take about five perfect halvings, so the top prize asks for luck as
// well as good questions. Mr Bowen moved it from 5 to 4 on 28 Oct 2026; he can
// change any of them from the phone.
export const DEFAULT_STEPS = [4, 7, 9]

/** Riverbucks for a right guess after `questions` answers. */
export function prizeFor(questions, steps) {
  if (questions <= steps[0]) return 3
  if (questions <= steps[1]) return 2
  if (questions <= steps[2]) return 1
  return 0
}

/**
 * Where the player stands after `asked` questions: `prize` if they guess right
 * now, and `left`, how many more they may ask and still win it.
 */
export function prizeStatus(asked, steps) {
  const prize = prizeFor(asked, steps)
  return { prize, left: prize ? steps[3 - prize] - asked : 0 }
}

/** A typed question, tidied: one line, at most 140 characters, or '' if empty. */
export const cleanQuestion = (text) => String(text || '').replace(/\s+/g, ' ').trim().slice(0, 140)

/**
 * The log with one answer put right: entry `i` set to `to` ('yes' / 'no'), or
 * taken out (`to` null). `q` and `a` are what the phone saw there; if the
 * entry no longer matches (an answer landed in between), null comes back.
 */
export function fixLog(log, { i, q = null, a, to }) {
  const e = log[i]
  if (!Number.isInteger(i) || !e || (e.q ?? null) !== (q ?? null) || e.a !== a) return null
  if (to === null) return log.filter((_, k) => k !== i)
  if (to !== 'yes' && to !== 'no') return null
  return log.map((x, k) => (k === i ? { ...x, a: to } : x))
}

/** Three whole numbers, each above the last, or null. */
export function cleanSteps(steps) {
  if (!Array.isArray(steps) || steps.length !== 3) return null
  const s = steps.map((n) => Math.round(Number(n)))
  if (s.some((n) => !Number.isFinite(n) || n < 1 || n > 30)) return null
  if (!(s[0] < s[1] && s[1] < s[2])) return null
  return s
}

export const blankGame = (board = 'animals') => ({
  phase: 'lobby', // lobby → pick → play → reveal
  board, // 'animals' | 'monsters' (boards.js)
  cards: [], // ids, in board order
  secret: null,
  down: [], // ids the player has put down
  pending: null, // the question the player typed, waiting for Mr Bowen's answer
  pendingTopic: null, // the idea it came from, when it was tapped (questions.js)
  log: [], // { q, a, t }: q is null if it was asked out loud; a is 'yes' / 'no'; t the idea's topic
  guess: null, // the id guessed, or null if Mr Bowen ended the game
  steps: DEFAULT_STEPS,
  game: 0, // bumped on every deal, so animations restart
})

function shuffle(list) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** A fresh board: up to BOARD_SIZE ids, in a random order. */
export const dealIds = (cards) => shuffle(cards.map((c) => c.id)).slice(0, BOARD_SIZE)

export const randomOf = (list) => list[Math.floor(Math.random() * list.length)]

/**
 * Rows × columns for `n` cards, keeping each card near `cell` (width over
 * height). `ratio` is the grid area's own width over its height.
 */
export function gridFor(n, ratio, cell) {
  let best = { cols: 6, rows: 4, score: Infinity }
  for (let rows = 1; rows <= 6; rows++) {
    const cols = Math.ceil(n / rows)
    if (cols < 1 || (rows - 1) * cols >= n) continue // would leave a whole row empty
    const score = Math.abs(Math.log(((ratio / cols) * rows) / cell))
    if (score < best.score) best = { cols, rows, score }
  }
  return best
}

// ── Kept on this laptop ─────────────────────────────────────────────────────
// The game survives a reload (a tripped cable, a browser crash mid-round).
// Every read and write is wrapped: storage throws in private windows, and a
// game that forgets beats a game that crashes.
const GAME_KEY = 'learn:guess-who:game'

export function loadGame(boards) {
  try {
    const g = JSON.parse(localStorage.getItem(GAME_KEY))
    if (g && boards[g.board] && Array.isArray(g.cards) && Array.isArray(g.down) && Array.isArray(g.log)) {
      const log = g.log.filter((e) => e && (e.a === 'yes' || e.a === 'no'))
      const pending = typeof g.pending === 'string' ? g.pending : null
      return { ...blankGame(g.board), ...g, log, pending, steps: cleanSteps(g.steps) || DEFAULT_STEPS }
    }
  } catch { /* nothing saved, or storage blocked */ }
  return blankGame()
}

export function saveGame(game) {
  try { localStorage.setItem(GAME_KEY, JSON.stringify(game)) } catch { /* storage blocked */ }
}
