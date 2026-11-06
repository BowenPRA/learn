// Non-component helpers shared by the layout components: markdown-lite text
// rendering, the Cambridge design tokens, note-tone tokens, and colour parsing.
// Kept out of primitives.jsx so each component file only exports components
// (fast-refresh / eslint clean).
import { Pencil } from 'lucide-react'
import { SafeInlineMath, SafeBlockMath } from '../../lib/SafeMath.jsx'

// ── Cambridge Learner's Book palette ────────────────────────────────────────
// Sampled from the printed Lower Secondary Science books: teal section rules,
// purple "Think like a scientist" boxes, red question numbers, orange key
// words, green reflection arrows. Every value is dark enough to carry white
// text at 4.5:1, so header strips stay legible on a projector.
export const CAMBRIDGE = {
  teal: '#0087a8', tealDark: '#00697f', tealTint: '#e2f2f6',
  purple: '#5c2483', purpleTint: '#f2ecf7',
  red: '#c8102e', redTint: '#fdecee',
  orange: '#c25e12', orangeInk: '#b4530c', orangeTint: '#fdf1e3',
  green: '#4a8b23', greenTint: '#eef6e6',
  blue: '#1a5fa8', blueTint: '#e9f1fa',
  ink: '#2b2b2b', rule: '#a7b6bd',
}

const STRONG_DEFAULT = 'font-black text-slate-900 dark:text-slate-100'

// `**bold**`, `$inline$` / `$$block$$` KaTeX, `>` note bumper, blank line =
// spacer. `strongClass` recolours the **bold** runs — used to give key words the
// textbook's orange (or a note's own accent) instead of plain black.
export function parseInlineText(text, { strongClass = STRONG_DEFAULT } = {}) {
  if (!text) return null
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2)
      const mathParts = inner.split(/(\$[\s\S]+?\$)/g)
      return (
        <strong key={`b-${i}`} className={strongClass}>
          {mathParts.map((m, j) =>
            m.startsWith('$') && m.endsWith('$')
              ? <SafeInlineMath key={`m-${j}`} math={m.slice(1, -1).trim()} />
              : <span key={`t-${j}`}>{m}</span>,
          )}
        </strong>
      )
    }
    const mathParts = part.split(/(\$[\s\S]+?\$)/g)
    return mathParts.map((m, j) =>
      m.startsWith('$') && m.endsWith('$')
        ? <SafeInlineMath key={`m-${i}-${j}`} math={m.slice(1, -1).trim()} />
        : <span key={`t-${i}-${j}`}>{italicise(m, `${i}-${j}`)}</span>,
    )
  })
}

// `*italic*` inside a plain-text run. Decks write quoted words and sentence
// frames this way (*"This is …"*), and until now the asterisks printed
// literally on the slide. A single asterisk with no closing partner is left
// alone, and a run never crosses a line break, so a stray `*` stays a `*`.
function italicise(text, key) {
  if (!text || !text.includes('*')) return text
  const parts = text.split(/(\*[^*\n]+?\*)/g)
  if (parts.length === 1) return text
  return parts.map((p, k) =>
    p.length > 2 && p.startsWith('*') && p.endsWith('*')
      ? <em key={`i-${key}-${k}`}>{p.slice(1, -1)}</em>
      : p,
  )
}

// The `>` bumper: the "copy this into your notebook" cue. Styled as the
// textbook's orange key-word rule so it reads as the same instruction
// everywhere it appears (body copy, reveals, steps).
const BUMPER_STRONG = 'font-black text-[#b4530c] dark:text-amber-300'

export function renderContent(text, { isDisplayMode = false, isExample = false } = {}) {
  if (!text || typeof text !== 'string') return null
  const blockParts = text.split(/(\$\$[\s\S]+?\$\$)/g)
  const elements = []
  let bumpers = []

  const flush = () => {
    if (bumpers.length) {
      elements.push(
        <div key={`bump-${elements.length}`} className={`my-4 bg-[#fdf1e3] dark:bg-amber-950/30 border-2 border-[#e8c9a6] dark:border-amber-800/50 border-l-[7px] border-l-[#c25e12] dark:border-l-[#e0842a] p-4 sm:p-5 rounded-r-xl relative animate-in fade-in ${isDisplayMode ? 'ml-[clamp(1rem,1.5vw,1.5rem)]' : 'ml-0'}`}>
          <div className={`absolute ${isDisplayMode ? '-left-[19px]' : '-left-[15px]'} top-4 p-1.5 bg-[#c25e12] text-white rounded-full shadow-sm border-2 border-white dark:border-slate-900 z-10`}>
            <Pencil className={isDisplayMode ? 'w-5 h-5' : 'w-4 h-4'} strokeWidth={3} />
          </div>
          <div className="space-y-3 ml-3">
            {bumpers.map((line, idx) => (
              <p key={idx} className={`text-slate-800 dark:text-amber-50 font-semibold leading-relaxed ${isDisplayMode ? 'text-[clamp(1.15rem,1.8vw,1.6rem)]' : 'text-sm sm:text-base lg:text-lg'}`}>
                {parseInlineText(line, { strongClass: BUMPER_STRONG })}
              </p>
            ))}
          </div>
        </div>,
      )
      bumpers = []
    }
  }

  blockParts.forEach((block, i) => {
    if (block.startsWith('$$') && block.endsWith('$$')) {
      flush()
      elements.push(
        <div key={`mb-${i}`} className={`w-full text-slate-800 dark:text-slate-100 ${isDisplayMode ? 'text-4xl' : 'text-xl lg:text-2xl'}`}>
          <SafeBlockMath math={block.slice(2, -2).trim()} />
        </div>,
      )
    } else {
      block.split('\n').forEach((line, j) => {
        if (!line.trim()) {
          flush()
          elements.push(<div key={`sp-${i}-${j}`} className={isDisplayMode ? 'h-[clamp(0.75rem,1.5vh,1.5rem)]' : 'h-3'} />)
        } else if (line.trim().startsWith('>')) {
          bumpers.push(line.replace('>', '').trim())
        } else {
          flush()
          elements.push(
            <p key={`p-${i}-${j}`} className={`${isExample ? 'mb-1' : 'mb-3'} text-slate-700 dark:text-slate-300 font-medium ${isDisplayMode ? 'text-[clamp(1rem,1.8vw,1.6rem)] leading-relaxed tracking-tight' : 'text-[15px] sm:text-base lg:text-lg leading-relaxed'}`}>
              {parseInlineText(line)}
            </p>,
          )
        }
      })
    }
  })
  flush()
  return elements
}

// ── Typed note cards ────────────────────────────────────────────────────────
// Each tone mirrors one of the Learner's Book panels: a solid colour header
// strip over a tinted body with a matching hairline border. `strong` recolours
// the **key word** inside the card the way the book prints its glossary terms.
export const NOTE_TONES = {
  write: {
    accent: '#c25e12',
    card: 'bg-[#fdf1e3] dark:bg-amber-950/30',
    border: 'border-[#e8c9a6] dark:border-amber-800/60',
    text: 'text-slate-800 dark:text-amber-50',
    strong: 'font-black text-[#b4530c] dark:text-amber-300',
    icon: 'Pencil', label: 'Write This Down', labelVn: 'Chép vào vở', labelFr: 'À recopier',
  },
  task: {
    accent: '#5c2483',
    card: 'bg-[#f2ecf7] dark:bg-violet-950/35',
    border: 'border-[#d3c1e2] dark:border-violet-800/60',
    text: 'text-slate-800 dark:text-violet-50',
    strong: 'font-black text-[#5c2483] dark:text-violet-300',
    icon: 'Hourglass', label: 'Starter Task', labelVn: 'Nhiệm vụ khởi động', labelFr: 'Pour commencer',
  },
  plant: {
    accent: '#4a8b23',
    card: 'bg-[#eef6e6] dark:bg-green-950/35',
    border: 'border-[#c4dcae] dark:border-green-800/60',
    text: 'text-slate-800 dark:text-green-50',
    strong: 'font-black text-[#3d731c] dark:text-green-300',
    icon: 'Leaf', label: 'Plant Only', labelVn: 'Chỉ ở thực vật', labelFr: 'Seulement chez les plantes',
  },
  homework: {
    accent: '#c8102e',
    card: 'bg-[#fdecee] dark:bg-rose-950/35',
    border: 'border-[#f0bcc3] dark:border-rose-800/60',
    text: 'text-slate-800 dark:text-rose-50',
    strong: 'font-black text-[#c8102e] dark:text-rose-300',
    icon: 'Home', label: 'Homework', labelVn: 'Bài tập về nhà', labelFr: 'Devoirs',
  },
  theory: {
    accent: '#1a5fa8',
    card: 'bg-[#e9f1fa] dark:bg-blue-950/35',
    border: 'border-[#bcd3ea] dark:border-blue-800/60',
    text: 'text-slate-800 dark:text-blue-50',
    strong: 'font-black text-[#1a5fa8] dark:text-blue-300',
    icon: 'Sparkles', label: 'Think Deeper', labelVn: 'Suy nghĩ sâu hơn', labelFr: 'Pour aller plus loin',
  },
  info: {
    accent: '#0087a8',
    card: 'bg-[#e2f2f6] dark:bg-cyan-950/35',
    border: 'border-[#b3d9e3] dark:border-cyan-800/60',
    text: 'text-slate-800 dark:text-cyan-50',
    strong: 'font-black text-[#00697f] dark:text-cyan-300',
    icon: 'Info', label: 'Note', labelVn: 'Ghi chú', labelFr: 'Remarque',
  },
}

/** Extract a raw hex from an accent hex or a `bg-[#hex]` string. */
export function toHex(value, fallback = '#0087a8') {
  if (!value) return fallback
  const m = /#([0-9a-fA-F]{3,8})/.exec(value)
  return m ? `#${m[1]}` : fallback
}
