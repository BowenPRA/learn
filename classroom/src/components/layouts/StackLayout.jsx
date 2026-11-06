// Vertical/stacked: a heading + optional intro, then a responsive grid of typed
// note cards. `variant:'checklist'` renders ticked summary items instead. For
// organelle definition lists and lesson recaps.
import { Note, HeaderBar, Ic } from './primitives.jsx'
import { parseInlineText, renderContent, toHex } from './helpers.jsx'

export default function StackLayout({ slide: s, ctx }) {
  const { pick, lang, isDisplayMode } = ctx
  const accent = toHex(s.accent || s.color, '#3b82f6')
  const title = pick(s.title, s.titleVn, s.titleFr)
  const content = pick(s.content, s.contentVn, s.contentFr)
  const columns = s.columns === 1 ? 1 : 2
  const isChecklist = s.variant === 'checklist'

  return (
    <>
      <HeaderBar title={title || ''} icon={s.icon || 'Boxes'} accent={accent} eyebrow={pick(s.eyebrow, s.eyebrowVn, s.eyebrowFr)} isDisplayMode={isDisplayMode} />
      <div className={`flex-1 min-h-0 overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-slate-900/50 ${isDisplayMode ? 'p-[clamp(1.5rem,3vw,3rem)]' : 'p-4 sm:p-6 lg:p-8'}`}>
        <div className="max-w-6xl mx-auto">
          {content && <div className="mb-5">{renderContent(content, { isDisplayMode })}</div>}

          {isChecklist ? (
            <div className={`grid gap-3 sm:gap-4 ${columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              {(s.items || []).map((item, i) => {
                const text = pick(item.text ?? item, item.textVn, item.textFr)
                return (
                  <div key={i} className="flex items-center gap-3 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm p-4">
                    <span className="shrink-0 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: accent, width: isDisplayMode ? 40 : 32, height: isDisplayMode ? 40 : 32 }}>
                      <Ic name="CheckCircle2" className={isDisplayMode ? 'w-6 h-6 text-white' : 'w-5 h-5 text-white'} strokeWidth={3} />
                    </span>
                    <span className={`font-bold text-slate-700 dark:text-slate-200 leading-snug ${isDisplayMode ? 'text-[clamp(1.05rem,1.7vw,1.5rem)]' : 'text-[15px] sm:text-base lg:text-lg'}`}>{parseInlineText(text)}</span>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className={`grid gap-3 sm:gap-4 ${columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              {(s.notes || []).map((note, i) => <Note key={i} note={note} lang={lang} isDisplayMode={isDisplayMode} />)}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
