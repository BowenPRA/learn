// Copied from BowenPRA/classroom src/lib/storyCharacter.js (commit 0989472) on 6 November 2026,
// unchanged below this note. Pip is PRA Learn's mascot as well as the decks' story character,
// so a child meets the same otter on the slides and on the portal. Keep the two copies in step.

// src/lib/storyCharacter.js
// PIP, the river otter: the made-up character for the "What happens next?"
// strips, word problems and diagrams in decks built for PRA teachers other
// than Mr Bowen.
//
// Why Pip exists: the Mr Bowen cartoon (src/lib/mrBowen.js) draws Mr Bowen,
// and a real teacher is never drawn without their consent. Pip is not anyone.
// An otter suits Palm River (otters live in rivers), is friendly for children,
// and is not a boy or a girl: in English say "Pip" or "they", never "he" or
// "she", so every teacher can use the same character. Say "Pip is an otter"
// the first time; many learners will not know the word.
//
// Look: a brown otter standing up, a cream face and tummy, round ears,
// whiskers, a long tail to the right (screen side) and a PRA-teal scarf. The
// flat style, the 2.5 dark outline and the white catch-light in the eyes
// match Mr Bowen, so the two can share a deck. The outline makes Pip read on a
// white plate and on a dark night-sky panel alike.
//
// One SVG string, so a JSX widget (StoryCharacter below, or
// <g dangerouslySetInnerHTML>) and a template-string diagram draw the same
// otter.
//
// The frame is Mr Bowen's: x = 0 is Pip's middle, y = 0 is the top of the
// head (the ears reach y = -6) and the soles are at y = 268, so stand Pip on a
// floor with y = FLOOR - 268 * scale. A strip drawn for one can take the
// other. Pip is about 116 wide, and the tail reaches x = +106.
//
//   mood       'happy' (open smile) · 'calm' (small smile) · 'sad' ·
//              'surprised' (round eyes, O mouth) · 'dizzy' (spiral eyes) ·
//              'asleep'
//   frozen     icy blue, eyes shut, a shivering mouth (cold, not hurt)
//   scarf      a colour, or false for no scarf (default PRA teal)
//   handLeft, handRight
//              where each paw goes, [x, y] in Pip's frame, by SCREEN side.
//              Both hang at the sides unless given. The elbow is worked out;
//              pass elbowLeft / elbowRight to place it yourself. A raised paw
//              reaches about y = 50. Draw a prop first, then Pip with the paw
//              on its handle, so the paw closes over it.
//   wear       an SVG string drawn in Pip's frame on top of everything (a hat,
//              a helmet, snow on the head). The top of the head is the curve
//              from (-44, 24) up to (0, 0) and down to (44, 24).
import { createElement } from 'react'

const INK = '#2b2b2b'
const TEAL = '#0087a8'
const WARM = {
  fur: '#8b5a3c', dark: '#6a4129', cream: '#f3dfc4', inner: '#e9b9a0', nose: '#2b2b2b',
  cheek: '#e58a7a', tongue: '#d9645a',
}
const ICE = {
  fur: '#a9c4d8', dark: '#8fa9bf', cream: '#e8f0f6', inner: '#cfe0ec', nose: '#6d8499',
  cheek: '#cfe0ec', tongue: '#b7cadb',
}
const ICE_SCARF = '#9db8cf'

const SHOULDER = [40, 112] // the right one; the left is mirrored
const UPPER = 34 // shoulder to elbow
const FORE = 32 // elbow to paw
const n = (v) => Math.round(v * 10) / 10
const pt = (p) => `${n(p[0])} ${n(p[1])}`

// Two bones, so the elbow sits where the arm can bend: out and down. Out of
// reach, the arm points straight at the paw. (The same rule as mrBowen.js.)
function elbowFor(s, h, side) {
  const dx = h[0] - s[0], dy = h[1] - s[1]
  const d = Math.hypot(dx, dy) || 1
  if (d >= UPPER + FORE) return [s[0] + (dx * UPPER) / (UPPER + FORE), s[1] + (dy * UPPER) / (UPPER + FORE)]
  const a = (UPPER ** 2 - FORE ** 2 + d ** 2) / (2 * d)
  const k = Math.sqrt(Math.max(0, UPPER ** 2 - a ** 2))
  const px = s[0] + (dx * a) / d, py = s[1] + (dy * a) / d
  const c1 = [px - (dy * k) / d, py + (dx * k) / d]
  const c2 = [px + (dy * k) / d, py - (dx * k) / d]
  const out = (e) => side * e[0] + 0.6 * e[1]
  return out(c1) >= out(c2) ? c1 : c2
}

function arm(side, hand, elbow, c) {
  const s = [side * SHOULDER[0], SHOULDER[1]]
  const h = hand || [side * 52, 172]
  const e = elbow || elbowFor(s, h, side)
  return `
    <path d="M ${pt(s)} L ${pt(e)} L ${pt(h)}" fill="none" stroke="${INK}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M ${pt(s)} L ${pt(e)} L ${pt(h)}" fill="none" stroke="${c.fur}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${n(h[0])}" cy="${n(h[1])}" r="9.5" fill="${c.dark}" stroke="${INK}" stroke-width="2.5"/>`
}

const spiral = (cx, cy) => `M ${cx} ${cy - 7} a 7 7 0 1 1 -7 7 a 5 5 0 1 1 5 5 a 3 3 0 1 1 -3 -3`

function face(mood, frozen, c) {
  const shut = frozen || mood === 'asleep'
  const brows = {
    happy: 'M -27 21 Q -20 16 -13 19 M 13 19 Q 20 16 27 21',
    calm: 'M -27 21 Q -20 18 -13 21 M 13 21 Q 20 18 27 21',
    sad: 'M -27 22 Q -20 20 -13 15 M 13 15 Q 20 20 27 22',
    surprised: 'M -27 16 Q -20 10 -13 15 M 13 15 Q 20 10 27 16',
    dizzy: 'M -27 19 Q -20 14 -13 18 M 13 22 Q 20 20 27 23',
  }[shut ? 'calm' : mood] || 'M -27 21 Q -20 16 -13 19 M 13 19 Q 20 16 27 21'
  let eyes
  if (shut) eyes = `<path d="M -26 35 q 6 4 12 0 M 14 35 q 6 4 12 0" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`
  else if (mood === 'dizzy') eyes = `<path d="${spiral(-20, 34)} ${spiral(20, 34)}" stroke="${INK}" stroke-width="2" fill="none"/>`
  else if (mood === 'surprised') eyes = `
    <circle cx="-20" cy="34" r="7" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/><circle cx="20" cy="34" r="7" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="-20" cy="35" r="3.4" fill="${INK}"/><circle cx="20" cy="35" r="3.4" fill="${INK}"/>`
  else eyes = `
    <ellipse cx="-20" cy="34" rx="5" ry="6" fill="${INK}"/><ellipse cx="20" cy="34" rx="5" ry="6" fill="${INK}"/>
    <circle cx="-18.4" cy="32" r="1.7" fill="#ffffff"/><circle cx="21.6" cy="32" r="1.7" fill="#ffffff"/>`
  // the nose sits at y 46-56; the mouth hangs from it
  const lip = `<path d="M 0 56 L 0 61" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>`
  let mouth
  if (frozen) mouth = `<path d="M -12 66 l 4 -3 l 4 3 l 4 -3 l 4 3 l 4 -3 l 4 3" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
  else if (mood === 'asleep') mouth = `${lip}<path d="M -9 63 Q -4.5 67 0 61 Q 4.5 67 9 63" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
  else if (mood === 'sad') mouth = `${lip}<path d="M -11 69 Q 0 61 11 69" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`
  else if (mood === 'surprised') mouth = `${lip}<ellipse cx="0" cy="69" rx="5.5" ry="6.5" fill="${c.tongue}" stroke="${INK}" stroke-width="2.4"/>`
  else if (mood === 'dizzy') mouth = `${lip}<path d="M -13 66 q 4.3 -5 8.6 0 q 4.3 5 8.6 0 q 4.3 -5 8.6 0" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
  else if (mood === 'calm') mouth = `${lip}<path d="M -12 62 Q -6 68 0 61 Q 6 68 12 62" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
  else mouth = `${lip}<path d="M -14 61 Q -7 64 0 61 Q 7 64 14 61 Q 12 76 0 76 Q -12 76 -14 61 Z" fill="${c.tongue}" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`
  const cheeks = frozen ? '' : `<ellipse cx="-33" cy="53" rx="7" ry="4.5" fill="${c.cheek}" opacity="0.45"/><ellipse cx="33" cy="53" rx="7" ry="4.5" fill="${c.cheek}" opacity="0.45"/>`
  return `
    <circle cx="-37" cy="9" r="13" fill="${c.fur}" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="37" cy="9" r="13" fill="${c.fur}" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="-37" cy="10" r="6.5" fill="${c.inner}"/><circle cx="37" cy="10" r="6.5" fill="${c.inner}"/>
    <ellipse cx="0" cy="44" rx="50" ry="44" fill="${c.fur}" stroke="${INK}" stroke-width="2.5"/>
    <path d="M -40 62 Q -38 40 -16 44 Q 0 38 16 44 Q 38 40 40 62 Q 34 86 0 87 Q -34 86 -40 62 Z" fill="${c.cream}"/>
    ${cheeks}
    <path d="M -24 55 L -52 49 M -25 60 L -54 61 M -24 65 L -51 72 M 24 55 L 52 49 M 25 60 L 54 61 M 24 65 L 51 72" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>
    ${eyes}
    <path d="M -10 47 Q 0 42 10 47 Q 8 55 0 56.5 Q -8 55 -10 47 Z" fill="${c.nose}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>
    <ellipse cx="-3" cy="47.5" rx="2.6" ry="1.4" fill="#ffffff" opacity="0.7"/>
    ${mouth}
    <path d="${brows}" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`
}

export function storyCharacterSvg({
  x = 0, y = 0, scale = 1, mood = 'happy', frozen = false, scarf = TEAL,
  handLeft, handRight, elbowLeft, elbowRight, wear = '',
} = {}) {
  const c = frozen ? ICE : WARM
  const scarfFill = scarf ? (frozen ? ICE_SCARF : scarf) : null
  return `<g transform="translate(${n(x)} ${n(y)}) scale(${scale})">
    <path d="M 22 246 Q 80 262 103 216 Q 111 196 102 182 Q 88 192 85 208 Q 72 226 36 206 Z" fill="${c.fur}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M -30 80 Q -60 116 -58 176 Q -57 236 -32 252 L 32 252 Q 57 236 58 176 Q 60 116 30 80 Z" fill="${c.fur}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="0" cy="182" rx="35" ry="58" fill="${c.cream}"/>
    <ellipse cx="-24" cy="258.5" rx="22" ry="9.5" fill="${c.dark}" stroke="${INK}" stroke-width="2.5"/>
    <ellipse cx="24" cy="258.5" rx="22" ry="9.5" fill="${c.dark}" stroke="${INK}" stroke-width="2.5"/>
    <path d="M -34 256 L -34 262 M -26 255 L -26 263 M 26 255 L 26 263 M 34 256 L 34 262" stroke="${INK}" stroke-width="1.6" stroke-linecap="round" opacity="0.6"/>
    ${scarfFill ? `<path d="M -36 84 Q 0 104 36 84 L 38 97 Q 0 118 -38 97 Z" fill="${scarfFill}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M -22 104 L -30 140 L -14 136 L -8 108 Z" fill="${scarfFill}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M -27 132 L -16 129" stroke="#ffffff" stroke-width="2" opacity="0.6"/>` : ''}
    ${arm(-1, handLeft, elbowLeft, c)}
    ${arm(1, handRight, elbowRight, c)}
    ${face(mood, frozen, c)}
    ${wear}
  </g>`
}

/** The JSX form, for widgets: <StoryCharacter x={…} y={…} scale={…} mood="sad" /> inside an <svg>. */
export function StoryCharacter(props) {
  return createElement('g', { dangerouslySetInnerHTML: { __html: storyCharacterSvg(props) } })
}

/** The character's name, for slide text and alt text. */
export const STORY_CHARACTER_NAME = 'Pip'
