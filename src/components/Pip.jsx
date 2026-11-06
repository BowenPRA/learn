import { storyCharacterSvg } from './pip/storyCharacter.js'

// Pip the river otter, PRA Learn's mascot (the same otter as in the classroom decks).
// Pip is not a boy or a girl: "Pip" or "they". Moods: happy, calm, sad, surprised,
// dizzy, asleep. `wave` raises a paw (screen left, clear of the tail).
//
// Pip's frame: x = 0 is the middle, the ears reach y = -6, the feet y = 268 and the
// tail x = +106; the viewBox below holds all of that with a little room.
const VIEW = { x: -72, y: -14, w: 186, h: 290 }

export default function Pip({ mood = 'happy', wave = false, size = 160, label = '', className = '', float = false }) {
  const svg = storyCharacterSvg({ mood, handLeft: wave ? [-60, 54] : undefined })
  const width = Math.round((size * VIEW.w) / VIEW.h)
  return (
    <span className={`inline-block shrink-0 ${float ? 'motion-safe:animate-pip-float' : ''} ${className}`} style={{ width, height: size }}>
      <svg viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} width={width} height={size}
        role={label ? 'img' : undefined} aria-label={label || undefined} aria-hidden={label ? undefined : true}
        className={wave ? 'pip-wave' : ''} dangerouslySetInnerHTML={{ __html: svg }} />
    </span>
  )
}
