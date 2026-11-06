// Quote/callout: a single emphasized "glass" card with an accent border, a big
// icon, heading, body, optional notes and reveal. For bonus asides, cross-
// curricular links, and homework.
import { Note, Reveal, Ic, Pill } from './primitives.jsx'
import { renderContent, toHex } from './helpers.jsx'

export default function CalloutLayout({ slide: s, ctx }) {
  const { pick, lang, isDisplayMode } = ctx
  const accent = toHex(s.accent || s.color, '#8b5cf6')
  const eyebrow = pick(s.eyebrow, s.eyebrowVn, s.eyebrowFr)
  const title = pick(s.title, s.titleVn, s.titleFr)
  const content = pick(s.content, s.contentVn, s.contentFr)

  return (
    <div className={`flex-1 flex flex-col items-center justify-center overflow-y-auto custom-scrollbar bg-slate-50 dark:bg-slate-900 min-h-0 ${isDisplayMode ? 'p-[clamp(2rem,5vw,5rem)]' : 'p-6 sm:p-10 lg:p-14'}`}>
      <div className="relative w-full max-w-4xl mx-auto rounded-[2rem] bg-white/90 dark:bg-slate-800/80 backdrop-blur border-2 shadow-lg"
        style={{ borderColor: accent }}>
        {/* accent glow bar */}
        <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-[2rem]" style={{ backgroundColor: accent }} />
        <div className={isDisplayMode ? 'p-[clamp(2rem,4vw,4rem)]' : 'p-6 sm:p-10'}>
          <div className="flex items-center gap-4 mb-5">
            <div className="rounded-2xl flex items-center justify-center shadow-inner shrink-0" style={{ backgroundColor: `${accent}1a`, padding: isDisplayMode ? '1rem' : '0.85rem' }}>
              <Ic name={s.icon || 'Sparkles'} className={isDisplayMode ? 'w-12 h-12' : 'w-9 h-9'} strokeWidth={2.5} style={{ color: accent }} />
            </div>
            <div className="min-w-0">
              {eyebrow && <div className="mb-1.5"><Pill accent={accent} isDisplayMode={isDisplayMode}>{eyebrow}</Pill></div>}
              {title && <h2 className={`font-black tracking-tight text-slate-800 dark:text-slate-100 leading-tight ${isDisplayMode ? 'text-[clamp(1.6rem,3vw,3rem)]' : 'text-2xl sm:text-3xl lg:text-4xl'}`}>{title}</h2>}
            </div>
          </div>

          {content && (
            <div className={`font-medium ${isDisplayMode ? 'text-[clamp(1.1rem,1.9vw,1.7rem)]' : 'text-base sm:text-lg lg:text-xl'}`}>
              {renderContent(content, { isDisplayMode })}
            </div>
          )}

          {s.notes?.length > 0 && (
            <div className="mt-5 space-y-3">
              {s.notes.map((note, i) => <Note key={i} note={note} lang={lang} isDisplayMode={isDisplayMode} />)}
            </div>
          )}

          {s.reveal && <div className="mt-5"><Reveal reveal={s.reveal} lang={lang} accent={accent} isDisplayMode={isDisplayMode} /></div>}
        </div>
      </div>
    </div>
  )
}
