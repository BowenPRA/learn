// Two-up comparison: two independently themeable columns, each with its own
// accent header, body, notes, and optional media. For animal vs plant, shared vs
// exclusive, same vs different signs, diagram vs micrograph.
import { Note, Media, HeaderBar, Ic } from './primitives.jsx'
import { parseInlineText, renderContent, toHex } from './helpers.jsx'

function Column({ col, ctx }) {
  const { pick, lang, isDisplayMode } = ctx
  const accent = toHex(col.accent, '#0087a8')
  const heading = pick(col.heading, col.headingVn, col.headingFr)
  const content = pick(col.content, col.contentVn, col.contentFr)
  const hasMedia = !!col.widget || !!col.inlineSvg || !!col.image
  const caption = pick(col.caption, col.captionVn, col.captionFr)
  const hasText = !!content || col.notes?.length > 0

  return (
    <div className="flex-1 min-h-0 flex flex-col rounded-2xl lg:rounded-[1.75rem] bg-white dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      {heading && (
        <div className={`flex items-center gap-2.5 text-white font-black tracking-tight shadow-sm shrink-0 ${isDisplayMode ? 'text-[clamp(1rem,1.6vw,1.6rem)] px-5 py-3.5' : 'text-base sm:text-lg lg:text-xl px-4 py-3'}`} style={{ backgroundColor: accent }}>
          {col.icon && <Ic name={col.icon} className={isDisplayMode ? 'w-6 h-6' : 'w-5 h-5'} strokeWidth={2.5} />}
          {heading}
        </div>
      )}
      {/* The media takes the space left over, and the caption is always pinned
          below it — an image-only column used to push its caption off-slide. */}
      <div className={`flex-1 min-h-0 flex flex-col gap-3 ${isDisplayMode ? 'p-[clamp(1rem,2vw,2rem)]' : 'p-4 sm:p-5'}`}>
        {hasMedia && (
          <div className={`w-full min-h-0 ${hasText ? 'h-[42%] shrink-0' : 'flex-1'}`}>
            <Media slide={col} source={col} ctx={ctx} drawThis={col.drawThis} />
          </div>
        )}
        {hasText && (
          <div className={`min-h-0 overflow-y-auto custom-scrollbar flex flex-col gap-3 ${hasMedia ? 'flex-1' : ''}`}>
            {content && <div>{renderContent(content, { isDisplayMode })}</div>}
            {col.notes?.length > 0 && col.notes.map((note, i) => <Note key={i} note={note} lang={lang} isDisplayMode={isDisplayMode} />)}
          </div>
        )}
        {caption && (
          <div className={`shrink-0 text-center font-bold text-slate-500 dark:text-slate-400 leading-snug ${isDisplayMode ? 'text-[clamp(0.85rem,1.3vw,1.2rem)]' : 'text-xs sm:text-sm'}`}>
            {parseInlineText(caption)}
          </div>
        )}
      </div>
    </div>
  )
}

export default function CompareLayout({ slide: s, ctx }) {
  const { pick, isDisplayMode } = ctx
  const accent = toHex(s.accent || s.color, '#8b5cf6')
  const title = pick(s.title, s.titleVn, s.titleFr)
  const text = pick(s.text, s.textVn, s.textFr)
  const columns = s.columns || []

  return (
    <>
      {title && <HeaderBar title={title} icon={s.icon || 'Scale'} accent={accent} eyebrow={pick(s.eyebrow, s.eyebrowVn, s.eyebrowFr)} isDisplayMode={isDisplayMode} />}
      <div className={`flex-1 min-h-0 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col gap-3 sm:gap-4 lg:gap-5 ${isDisplayMode ? 'p-[clamp(1.25rem,2.5vw,2.5rem)]' : 'p-3 sm:p-5 lg:p-6'}`}>
        {/* The problem both columns answer, printed as big as a statement slide's
            line. On a vote slide the class must be able to read the question
            from the back row — an eyebrow is far too small for it. */}
        {text && (
          <div className="shrink-0 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm text-center"
            style={{ borderLeftWidth: 8, borderLeftColor: accent }}>
            <p className={`font-black text-slate-900 dark:text-slate-50 leading-tight tracking-tight ${isDisplayMode ? 'text-[clamp(1.75rem,3.6vw,3.6rem)] px-6 py-[clamp(0.75rem,1.6vh,1.5rem)]' : 'text-3xl lg:text-4xl px-5 py-3'}`}>
              {parseInlineText(text)}
            </p>
          </div>
        )}
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-5">
          {columns.map((col, i) => <Column key={i} col={col} ctx={ctx} />)}
        </div>
      </div>
    </>
  )
}
