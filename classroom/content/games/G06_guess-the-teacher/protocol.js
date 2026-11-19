// content/games/G06_guess-the-teacher/protocol.js
// What the TV and the phones share: the channel's name, the clock, the points,
// the avatars and the colours. No teacher's name is in here, so the phone's
// chunk never carries an answer.
//
// The wire (src/lib/remote/bus.js, topic `teacher-game-<ROOM>`):
//   phone → TV  hello { pid, name, avatar }     join, or come back after a reload
//               guess { pid, no, text }         a team's one locked-in guess for round `no`
//   TV → phone  state { … }                     the whole public game, after every change
//               locked { to, no }                the guess arrived (never whether it is right)
//               kick { to, why }                the TV took this team out (why 'name': a rude team name, words.js)
// Nothing is stored anywhere: when the TV closes, the teams are gone.

export const TOPIC = (room) => `teacher-game-${room}`

// The clock, in milliseconds.
// A round's length is a setting (Edit teachers, saved with the list): ROUND_MS
// unless the host picks another. Everything inside a round scales with it.
export const ROUND_MS = 35000
export const ROUND_SECS = { min: 15, max: 120, step: 5 }
export const ALL_UP_SHARE = 30 / 35 // the last emoji goes up here: 30 s of a 35 s round
// Every team has locked in: the cards still face down flip one by one, a
// beat, then the answer.
export const ALL_IN_FIRST_MS = 600
export const ALL_IN_GAP_MS = 900
export const ALL_IN_HOLD_MS = 1600
export const INTRO_MS = 2800 // the "Round 2 of 5" splash
export const SUSPENSE_MS = 2200 // "And the teacher is…" before the name
export const EMOJI_MAX = 6 // a teacher has one to six emojis; five is the usual

/** Points for a right answer with `left` ms of a `roundMs` round: 1000 at once, 100 at the buzzer, doubled in the last round. */
export function pointsFor(left, double = false, roundMs = ROUND_MS) {
  const share = Math.max(0, Math.min(1, left / roundMs))
  const pts = Math.round((100 + 900 * share) / 10) * 10
  return double ? pts * 2 : pts
}

/** How many of a teacher's `count` emojis are up after `elapsed` ms of a `roundMs` round:
 *  the first at once, the last at ALL_UP_SHARE of it (35 s, five emojis: 0, 7.5, 15, 22.5, 30 s). */
export function shownAt(elapsed, count, roundMs = ROUND_MS) {
  if (count <= 1) return 1
  const every = (roundMs * ALL_UP_SHARE) / (count - 1)
  return Math.max(1, Math.min(count, Math.floor(elapsed / every) + 1))
}

/** The cards up now, counting the ones flipped since every team locked in (`allInAgo` ms ago, or null). */
export function cardsUp(elapsed, count, roundMs, allInAgo = null) {
  const base = shownAt(elapsed, count, roundMs)
  if (allInAgo == null || allInAgo < ALL_IN_FIRST_MS) return base
  return Math.min(count, base + Math.floor((allInAgo - ALL_IN_FIRST_MS) / ALL_IN_GAP_MS) + 1)
}

/** How long after every team locks in the answer comes: the hidden cards flip, then a beat. */
export function allInLasts(elapsed, count, roundMs) {
  const hidden = count - shownAt(elapsed, count, roundMs)
  return hidden > 0 ? ALL_IN_FIRST_MS + (hidden - 1) * ALL_IN_GAP_MS + ALL_IN_HOLD_MS : ALL_IN_HOLD_MS - 400
}

/** A round length from the settings, in whole steps within the limits. */
export function roundSecsOf(value) {
  const n = Math.round(Number(value) / ROUND_SECS.step) * ROUND_SECS.step
  return Number.isFinite(n) && n > 0 ? Math.max(ROUND_SECS.min, Math.min(ROUND_SECS.max, n)) : ROUND_MS / 1000
}

// The animals a team picks from on the phone.
export const AVATARS = ['🦊', '🐼', '🐨', '🐯', '🦁', '🐸', '🐵', '🐧', '🦄', '🐙', '🐢', '🦋', '🐝', '🐬', '🦖', '🐳', '🦉', '🐰', '🐶', '🐱', '🐮', '🐷', '🦒', '🦩']

// A colour per team, by the order they joined.
// The website's colours, light enough for the animal to read on them.
export const COLORS = ['#9CC4FF', '#B9DC7E', '#FFD785', '#FFB0A3', '#BFAEFF', '#86D2BC', '#7FB2FF', '#D6EBA8', '#FFE4A0', '#FFD2C9', '#DDD3FF', '#B5E3D5']

export const NAME_MAX = 20

/** A team name as the TV shows it: no control characters, single spaces, NAME_MAX letters. */
export function cleanName(text) {
  return Array.from(String(text || '').replace(/[\p{C}]/gu, '').replace(/\s+/g, ' ').trim()).slice(0, NAME_MAX).join('')
}

/** 1st, 2nd, 3rd, 4th … 11th, 12th, 13th, 21st. */
export function ordinal(n) {
  const tens = n % 100
  if (tens >= 11 && tens <= 13) return `${n}th`
  return `${n}${['th', 'st', 'nd', 'rd'][n % 10] || 'th'}`
}

export const MEDALS = ['🥇', '🥈', '🥉']

// The website's fonts (src/fonts.css, imported by look.jsx): Poppins, and Be
// Vietnam Pro for anything a family types or reads in Vietnamese, because
// Poppins has no Vietnamese letters and "Minh & Mẹ" should read as one word.
export const FONT = "Poppins, 'Be Vietnam Pro', system-ui, -apple-system, 'Segoe UI', sans-serif"
export const VN_FONT = "'Be Vietnam Pro', Poppins, system-ui, -apple-system, 'Segoe UI', sans-serif"
