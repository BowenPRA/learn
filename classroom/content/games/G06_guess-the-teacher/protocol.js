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
export const COLORS = ['#f472b6', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa', '#fb923c', '#22d3ee', '#f87171', '#a3e635', '#e879f9', '#2dd4bf', '#facc15']

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

// The game's font: rounded, and it has every Vietnamese letter, so a team
// called "Minh & Mẹ" reads as one word. Added on arrival, so no other page
// fetches it; system fonts if offline.
const FONTS_ID = 'teacher-game-fonts'
export const FONT = "'Baloo 2', 'Be Vietnam Pro', ui-rounded, system-ui, sans-serif"

export function loadFont() {
  if (document.getElementById(FONTS_ID)) return
  const link = document.createElement('link')
  link.id = FONTS_ID
  link.rel = 'stylesheet'
  link.href = 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&display=swap'
  document.head.appendChild(link)
}
