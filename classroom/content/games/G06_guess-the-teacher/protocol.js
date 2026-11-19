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
//               kick { to }                     the TV took this team out
// Nothing is stored anywhere: when the TV closes, the teams are gone.

export const TOPIC = (room) => `teacher-game-${room}`

// The clock, in milliseconds.
export const ROUND_MS = 60000 // a round, before any +10 s
export const ALL_UP_MS = 45000 // by now every emoji is up, evenly spaced from the first at 0 s
export const INTRO_MS = 2800 // the "Round 2 of 5" splash
export const SUSPENSE_MS = 2200 // "And the teacher is…" before the name
export const EMOJI_MAX = 6 // a teacher has one to six emojis; five is the usual

/** Points for a right answer with `left` ms on the clock: 1000 at once, 100 at the buzzer, doubled in the last round. */
export function pointsFor(left, double = false) {
  const share = Math.max(0, Math.min(1, left / ROUND_MS))
  const pts = Math.round((100 + 900 * share) / 10) * 10
  return double ? pts * 2 : pts
}

/** How many of a teacher's `count` emojis are up after `elapsed` ms of a round: the
 *  first at once, the last at ALL_UP_MS (five emojis: 0, 11, 22, 34 and 45 s). */
export function shownAt(elapsed, count) {
  if (count <= 1) return 1
  const every = ALL_UP_MS / (count - 1)
  return Math.max(1, Math.min(count, Math.floor(elapsed / every) + 1))
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
