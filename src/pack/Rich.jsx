import StepText from '../stepPractice/StepText.jsx'

// Slide text, as the classroom decks write it: **bold**, *italic*, $maths$, a line
// starting with ">" is a "write this down" note, a blank line starts a new
// paragraph. Inline marks go through the step engine's StepText, so slides and
// practice draw text the same way ({{given}}, [[find]], <<found>> work here too).

const ITALIC = /(?<!\*)\*(?!\*)([^*\n]+?)(?<!\*)\*(?!\*)/g

/** One line of text with its inline marks. */
export function Inline({ text, className = '' }) {
  if (text == null || text === '') return null
  const s = String(text)
  const out = []
  let last = 0
  for (const m of s.matchAll(ITALIC)) {
    if (m.index > last) out.push(<StepText key={`t${last}`} text={s.slice(last, m.index)} />)
    out.push(<em key={`i${m.index}`} className="italic"><StepText text={m[1]} /></em>)
    last = m.index + m[0].length
  }
  if (last < s.length) out.push(<StepText key={`t${last}`} text={s.slice(last)} />)
  return <span className={className}>{out}</span>
}

/** A block of slide text: paragraphs and > notes. */
export function Rich({ text, className = '' }) {
  if (text == null || text === '') return null
  const blocks = String(text).split(/\n\s*\n/)
  return (
    <div className={`space-y-3 ${className}`}>
      {blocks.map((block, i) => {
        const lines = block.split('\n')
        if (lines.every((l) => l.trim().startsWith('>'))) {
          return (
            <p key={i} className="rounded-2xl border-l-8 border-pra-sun-deep bg-pra-sun-pale px-4 py-2 font-bold text-pra-sun-ink">
              {lines.map((l, j) => <span key={j} className="block"><Inline text={l.trim().replace(/^>\s?/, '')} /></span>)}
            </p>
          )
        }
        return <p key={i}>{lines.map((l, j) => <span key={j} className="block"><Inline text={l} /></span>)}</p>
      })}
    </div>
  )
}
