// Multi-step: a numbered sequence with accent-tinted step chips, plus an optional
// media panel and a final reveal (answer box). For processes and derivations.
import { Media, Reveal, HeaderBar } from './primitives.jsx'
import { parseInlineText, renderContent, toHex } from './helpers.jsx'

export default function StepsLayout({ slide: s, ctx }) {
  const { pick, lang, isDisplayMode } = ctx
  const accent = toHex(s.accent || s.color, '#ff9600')
  const title = pick(s.title, s.titleVn, s.titleFr)
  const content = pick(s.content, s.contentVn, s.contentFr)
  const steps = s.steps || []
  const hasMedia = !!s.widget || !!s.inlineSvg || !!s.image

  return (
    <>
      <HeaderBar title={title || ''} icon={s.icon || 'Layers'} accent={accent} eyebrow={pick(s.eyebrow, s.eyebrowVn, s.eyebrowFr)} isDisplayMode={isDisplayMode} />
      <div className={`flex-1 min-h-0 overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-slate-900/50 ${isDisplayMode ? 'p-[clamp(1.5rem,3vw,3rem)]' : 'p-4 sm:p-6 lg:p-10'}`}>
        <div className={`mx-auto flex flex-col ${hasMedia ? 'max-w-6xl lg:flex-row lg:items-start gap-6' : 'max-w-3xl'}`}>
          <div className="flex-1 min-w-0">
            {content && <div className="mb-5">{renderContent(content, { isDisplayMode })}</div>}
            <ol className="space-y-3 sm:space-y-4">
              {steps.map((step, i) => {
                const text = pick(step.text ?? step, step.textVn, step.textFr)
                return (
                  <li key={i} className="flex items-start gap-3 sm:gap-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm p-4 sm:p-5 animate-in fade-in slide-in-from-bottom-1">
                    <span className={`shrink-0 rounded-full text-white font-black flex items-center justify-center shadow-sm ${isDisplayMode ? 'w-11 h-11 text-[clamp(1.1rem,1.6vw,1.5rem)]' : 'w-9 h-9 text-base'}`} style={{ backgroundColor: accent }}>{i + 1}</span>
                    <div className={`pt-1 font-bold text-slate-700 dark:text-slate-200 leading-snug ${isDisplayMode ? 'text-[clamp(1.05rem,1.7vw,1.55rem)]' : 'text-[15px] sm:text-base lg:text-lg'}`}>{parseInlineText(text)}</div>
                  </li>
                )
              })}
            </ol>
            {s.reveal && <div className="mt-5"><Reveal reveal={s.reveal} lang={lang} accent={accent} isDisplayMode={isDisplayMode} /></div>}
          </div>
          {hasMedia && (
            <div className={`shrink-0 w-full lg:w-[42%] ${isDisplayMode ? 'h-[22rem]' : 'h-64 sm:h-80'}`}>
              <Media slide={s} ctx={ctx} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
