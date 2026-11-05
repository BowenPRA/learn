import { useState } from 'react'
import { Eye } from 'lucide-react'
import { NamedIcon } from '../components/ui.jsx'
import { pick, useT } from '../lib/i18n.jsx'
import { Inline, Rich } from './Rich.jsx'
import { sanitizeSvg } from './sanitizeSvg.js'
import { assetSrc } from './model.js'

// The classroom layouts (C:\Users\sbowe\code\classroom\README.md, "Slide schema"),
// redrawn for a child working alone on a laptop or phone: one column on a phone,
// big type, the media beside the text from a tablet up. No widgets (a pack replaces
// them with an image or a question). Fields may have …Vn twins.

const NOTE = {
  write: { bar: '#C25E12', tint: '#FDF1E3', ink: '#8A3F06', en: 'Write this down', vn: 'Ghi vào vở' },
  task: { bar: '#5C2483', tint: '#F2ECF7', ink: '#4A1C6B', en: 'Your turn', vn: 'Đến lượt em' },
  plant: { bar: '#4A8B23', tint: '#EEF6E6', ink: '#2F5F14', en: 'Did you know?', vn: 'Em có biết?' },
  homework: { bar: '#C8102E', tint: '#FDECEE', ink: '#8F0B21', en: 'Homework', vn: 'Bài tập về nhà' },
  theory: { bar: '#1A5FA8', tint: '#E9F1FA', ink: '#123F70', en: 'The idea', vn: 'Ý chính' },
  info: { bar: '#0087A8', tint: '#E2F2F6', ink: '#005A70', en: 'Good to know', vn: 'Cần biết' },
}

function Notes({ notes, lang }) {
  if (!Array.isArray(notes) || !notes.length) return null
  return (
    <div className="space-y-3">
      {notes.map((n, i) => {
        const tone = NOTE[n.tone] || NOTE.info
        return (
          <div key={i} className="overflow-hidden rounded-2xl border-2" style={{ borderColor: tone.bar, background: tone.tint }}>
            {n.badge !== false && (
              <div className="px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-white" style={{ background: tone.bar }}>
                {typeof n.badge === 'string' ? n.badge : lang === 'vn' ? tone.vn : tone.en}
              </div>
            )}
            <div className="px-4 py-3 text-lg font-semibold leading-snug" style={{ color: tone.ink }}><Rich text={pick(n, 'text', lang)} /></div>
          </div>
        )
      })}
    </div>
  )
}

/** Width over height of an inline SVG (its viewBox), or 0. A wide figure (a number line) is drawn under the text, full width. */
function svgAspect(svg) {
  const m = /viewBox\s*=\s*["']\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)/i.exec(svg || '')
  return m && Number(m[2]) > 0 ? Number(m[1]) / Number(m[2]) : 0
}
const WIDE = 2.2

function Media({ obj, lang, assets, caption, big = false }) {
  const svg = sanitizeSvg(pick(obj, 'inlineSvg', lang))
  const img = assetSrc(obj?.image, assets)
  const alt = obj?.image ? (assets?.[`${obj.image}`.slice(6)]?.alt || obj.alt || '') : ''
  if (!svg && !img) return null
  return (
    <figure className="w-full">
      <div className={`flex items-center justify-center rounded-2xl bg-white p-3 ${big && svgAspect(svg) < WIDE ? 'min-h-[220px]' : ''}`}>
        {svg
          ? <div className="svg-fit w-full [&>svg]:max-h-[46vh]" dangerouslySetInnerHTML={{ __html: svg }} />
          : <img src={img} alt={alt} className="max-h-[46vh] w-auto rounded-xl" />}
      </div>
      {caption && <figcaption className="mt-2 text-center text-sm font-semibold text-pra-ink-soft"><Inline text={caption} /></figcaption>}
    </figure>
  )
}

function Reveal({ reveal, lang }) {
  const { t } = useT()
  const [open, setOpen] = useState(false)
  if (!reveal) return null
  return (
    <div className="rounded-2xl border-2 border-dashed border-pra-violet bg-pra-violet-pale p-4">
      {pick(reveal, 'prompt', lang) && <p className="mb-3 text-lg font-bold text-pra-ink"><Inline text={pick(reveal, 'prompt', lang)} /></p>}
      {open
        ? <div className="text-lg font-semibold text-pra-ink"><Rich text={pick(reveal, 'answer', lang)} /></div>
        : (
          <button type="button" className="btn-soft border-pra-violet text-pra-violet" onClick={() => setOpen(true)}>
            <Eye className="h-5 w-5" /> {pick(reveal, 'label', lang) || t('showMe')}
          </button>
        )}
    </div>
  )
}

function Title({ slide, lang }) {
  const accent = slide.accent || '#116DFF'
  return (
    <div className="mb-4">
      {pick(slide, 'eyebrow', lang) && <p className="eyebrow mb-1" style={{ color: accent }}>{pick(slide, 'eyebrow', lang)}</p>}
      <h2 className="flex items-start gap-3 text-2xl font-extrabold leading-tight text-pra-ink sm:text-3xl">
        {slide.icon && (
          <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-white" style={{ background: accent }}>
            <NamedIcon name={slide.icon} className="h-6 w-6" strokeWidth={2.5} />
          </span>
        )}
        <Inline text={pick(slide, 'title', lang)} />
      </h2>
    </div>
  )
}

const Body = ({ slide, lang }) => (
  <div className="space-y-4 text-lg font-medium leading-relaxed text-pra-ink sm:text-xl">
    <Rich text={pick(slide, 'content', lang)} />
    {pick(slide, 'example', lang) && (
      <div className="rounded-2xl bg-pra-blue-pale px-4 py-3">
        {pick(slide, 'exampleLabel', lang) && <p className="eyebrow mb-1 text-pra-blue">{pick(slide, 'exampleLabel', lang)}</p>}
        <Rich text={pick(slide, 'example', lang)} />
      </div>
    )}
  </div>
)

function Hero({ slide, lang }) {
  const card = slide.card
  return (
    <div className="flex min-h-[320px] flex-col justify-center rounded-3xl bg-gradient-to-br from-pra-blue to-pra-blue-deep p-6 text-white sm:p-10">
      {pick(slide, 'eyebrow', lang) && <p className="mb-2 text-sm font-extrabold uppercase tracking-[0.16em] text-white/85">{pick(slide, 'eyebrow', lang)}</p>}
      <h2 className="text-3xl font-extrabold leading-tight sm:text-5xl"><Inline text={pick(slide, 'title', lang)} /></h2>
      {(pick(slide, 'objective', lang) || pick(slide, 'subtitle', lang)) && (
        <p className="mt-4 max-w-2xl text-lg font-semibold text-white/90 sm:text-xl"><Inline text={pick(slide, 'objective', lang) || pick(slide, 'subtitle', lang)} /></p>
      )}
      {card && (
        <div className="mt-6 max-w-xl rounded-2xl bg-white p-4 text-pra-ink">
          {card.badge && <p className="eyebrow mb-1 text-pra-green-deep">{pick(card, 'badge', lang)}</p>}
          <p className="text-lg font-semibold"><Inline text={pick(card, 'text', lang)} /></p>
        </div>
      )}
    </div>
  )
}

function Statement({ slide, lang }) {
  const accent = slide.accent || '#116DFF'
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl p-6 text-center sm:p-10" style={{ background: `${accent}12` }}>
      {pick(slide, 'eyebrow', lang) && <p className="eyebrow mb-2" style={{ color: accent }}>{pick(slide, 'eyebrow', lang)}</p>}
      {pick(slide, 'title', lang) && <h2 className="mb-4 text-xl font-extrabold text-pra-ink-soft sm:text-2xl"><Inline text={pick(slide, 'title', lang)} /></h2>}
      {pick(slide, 'label', lang) && <span className="mb-3 rounded-full px-3 py-1 text-sm font-extrabold text-white" style={{ background: accent }}>{pick(slide, 'label', lang)}</span>}
      <p className="text-3xl font-extrabold leading-tight text-pra-ink sm:text-5xl"><Inline text={pick(slide, 'text', lang)} /></p>
      {pick(slide, 'sub', lang) && <p className="mt-4 text-lg font-semibold text-pra-ink-soft sm:text-xl"><Inline text={pick(slide, 'sub', lang)} /></p>}
    </div>
  )
}

function Split({ slide, lang, assets }) {
  const media = <Media obj={slide} lang={lang} assets={assets} caption={pick(slide, 'caption', lang)} big />
  if (svgAspect(pick(slide, 'inlineSvg', lang)) >= WIDE) {
    return (
      <div>
        <Title slide={slide} lang={lang} />
        <Body slide={slide} lang={lang} />
        <div className="mx-auto mt-5 max-w-3xl">{media}</div>
        <div className="mt-4"><Notes notes={slide.notes} lang={lang} /></div>
      </div>
    )
  }
  const ratio = { 40: 'md:grid-cols-[2fr_3fr]', 45: 'md:grid-cols-[9fr_11fr]', 50: 'md:grid-cols-2', 55: 'md:grid-cols-[11fr_9fr]', 60: 'md:grid-cols-[3fr_2fr]' }[slide.ratio] || 'md:grid-cols-2'
  return (
    <div className={`grid items-center gap-6 ${ratio}`}>
      <div className={slide.side === 'left' ? 'md:order-2' : ''}>
        <Title slide={slide} lang={lang} />
        <Body slide={slide} lang={lang} />
        <div className="mt-4"><Notes notes={slide.notes} lang={lang} /></div>
      </div>
      <div className={slide.side === 'left' ? 'md:order-1' : ''}>{media}</div>
    </div>
  )
}

function Steps({ slide, lang, assets }) {
  const accent = slide.accent || '#116DFF'
  const steps = Array.isArray(slide.steps) ? slide.steps : []
  const hasMedia = Boolean(slide.inlineSvg || slide.image)
  return (
    <div className={`grid gap-6 ${hasMedia ? 'md:grid-cols-2' : ''}`}>
      <div>
        <Title slide={slide} lang={lang} />
        <Body slide={slide} lang={lang} />
        <ol className="mt-5 space-y-3">
          {steps.map((s, i) => (
            <li key={i} className="flex items-start gap-3 rounded-2xl border-2 border-pra-line bg-white p-3 text-lg font-semibold">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg font-extrabold text-white" style={{ background: accent }}>{i + 1}</span>
              <span className="pt-1"><Inline text={pick(s, 'text', lang)} /></span>
            </li>
          ))}
        </ol>
      </div>
      {hasMedia && <Media obj={slide} lang={lang} assets={assets} />}
    </div>
  )
}

function Stack({ slide, lang }) {
  const items = Array.isArray(slide.items) ? slide.items : []
  return (
    <div>
      <Title slide={slide} lang={lang} />
      <Body slide={slide} lang={lang} />
      {slide.variant === 'checklist' && (
        <ul className="mt-4 space-y-2">
          {items.map((it, i) => (
            <li key={i} className="flex items-start gap-3 text-lg font-semibold">
              <span className="mt-1 inline-block h-5 w-5 shrink-0 rounded-md border-2 border-pra-green-deep" />
              <Inline text={typeof it === 'string' ? it : pick(it, 'text', lang)} />
            </li>
          ))}
        </ul>
      )}
      <div className={`mt-4 grid gap-3 ${slide.columns === 2 ? 'md:grid-cols-2' : ''}`}><Notes notes={slide.notes} lang={lang} /></div>
    </div>
  )
}

function Callout({ slide, lang }) {
  const accent = slide.accent || '#2F7D14'
  return (
    <div className="rounded-3xl border-2 p-5 sm:p-8" style={{ borderColor: accent, background: `${accent}0d` }}>
      <Title slide={slide} lang={lang} />
      <Body slide={slide} lang={lang} />
      <div className="mt-4 space-y-4">
        <Notes notes={slide.notes} lang={lang} />
        <Reveal key={pick(slide.reveal, 'answer', lang)} reveal={slide.reveal} lang={lang} />
      </div>
    </div>
  )
}

function Compare({ slide, lang, assets }) {
  const cols = Array.isArray(slide.columns) ? slide.columns : []
  return (
    <div>
      <Title slide={slide} lang={lang} />
      {pick(slide, 'text', lang) && <p className="mb-4 text-2xl font-extrabold text-pra-ink"><Inline text={pick(slide, 'text', lang)} /></p>}
      <div className="grid gap-4 md:grid-cols-2">
        {cols.map((c, i) => {
          const accent = c.accent || '#116DFF'
          return (
            <div key={i} className="overflow-hidden rounded-3xl border-2 bg-white" style={{ borderColor: accent }}>
              <div className="flex items-center gap-2 px-4 py-3 text-lg font-extrabold text-white" style={{ background: accent }}>
                {c.icon && <NamedIcon name={c.icon} className="h-6 w-6" strokeWidth={2.5} />} <Inline text={pick(c, 'heading', lang)} />
              </div>
              <div className="space-y-3 p-4 text-lg font-semibold">
                <Rich text={pick(c, 'content', lang)} />
                <Media obj={c} lang={lang} assets={assets} caption={pick(c, 'caption', lang)} />
                <Notes notes={c.notes} lang={lang} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Showcase({ slide, lang, assets }) {
  return (
    <div>
      <Title slide={slide} lang={lang} />
      <Media obj={slide} lang={lang} assets={assets} caption={pick(slide, 'caption', lang)} big />
    </div>
  )
}

function Gallery({ slide, lang, assets }) {
  const items = Array.isArray(slide.items) ? slide.items : []
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 md:grid-cols-3', 4: 'sm:grid-cols-2 md:grid-cols-4' }[slide.columns] || 'sm:grid-cols-2 md:grid-cols-3'
  return (
    <div>
      <Title slide={slide} lang={lang} />
      <Body slide={slide} lang={lang} />
      <div className={`mt-4 grid gap-4 ${cols}`}>
        {items.map((it, i) => (
          <div key={i} className="rounded-2xl border-2 border-pra-line bg-white p-3 text-center">
            <Media obj={it} lang={lang} assets={assets} />
            <p className="mt-2 text-lg font-extrabold text-pra-ink"><Inline text={pick(it, 'term', lang)} /></p>
            {pick(it, 'text', lang) && <p className="text-base font-semibold text-pra-ink-soft"><Inline text={pick(it, 'text', lang)} /></p>}
          </div>
        ))}
      </div>
    </div>
  )
}

/** One slide of a review. */
export default function Slide({ slide, lang, assets }) {
  switch (slide?.layout) {
    case 'hero': return <Hero slide={slide} lang={lang} />
    case 'statement': return <Statement slide={slide} lang={lang} />
    case 'split': return <Split slide={slide} lang={lang} assets={assets} />
    case 'steps': return <Steps slide={slide} lang={lang} assets={assets} />
    case 'stack': return <Stack slide={slide} lang={lang} />
    case 'callout': return <Callout slide={slide} lang={lang} />
    case 'compare': return <Compare slide={slide} lang={lang} assets={assets} />
    case 'showcase': return <Showcase slide={slide} lang={lang} assets={assets} />
    case 'gallery': return <Gallery slide={slide} lang={lang} assets={assets} />
    default: return <p className="rounded-2xl border-2 border-pra-coral p-4 font-bold text-pra-coral-deep">This slide has no layout the portal knows ({String(slide?.layout)}).</p>
  }
}
