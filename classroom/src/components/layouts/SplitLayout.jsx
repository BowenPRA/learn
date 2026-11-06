// Text + media panel, with knobs the old fixed `concept` never had: which side
// the media sits on, the text/media ratio, media = widget/svg/image, an optional
// worked-example box, typed notes, and Draw This. Generalizes concept + warmup.
import { Note, Media, HeaderBar, Ic, Reveal } from './primitives.jsx'
import { renderContent, toHex } from './helpers.jsx'

const RATIOS = {
  40: ['lg:w-[40%]', 'lg:w-[60%]'],
  45: ['lg:w-[45%]', 'lg:w-[55%]'],
  50: ['lg:w-1/2', 'lg:w-1/2'],
  55: ['lg:w-[55%]', 'lg:w-[45%]'],
  60: ['lg:w-[60%]', 'lg:w-[40%]'],
}

export default function SplitLayout({ slide: s, ctx }) {
  const { pick, lang, isDisplayMode } = ctx
  const accent = toHex(s.accent || s.color, '#1cb0f6')
  const title = pick(s.title, s.titleVn, s.titleFr)
  const content = pick(s.content, s.contentVn, s.contentFr)
  const example = pick(s.example, s.exampleVn, s.exampleFr)
  const exampleLabel = pick(s.exampleLabel || 'Example', s.exampleLabelVn, s.exampleLabelFr)

  const hasMedia = !!s.widget || !!s.inlineSvg || !!s.image
  const hasExample = !!example
  const hasText = !!content || (s.notes?.length > 0)
  const mediaLeft = s.side === 'left'
  const [textW, mediaW] = RATIOS[s.ratio] || RATIOS[45]
  const twoPane = hasMedia || hasExample

  const TextCol = (
    <div className={`flex-none h-[45%] lg:h-auto flex flex-col overflow-y-auto custom-scrollbar border-b-2 lg:border-b-0 border-slate-100 dark:border-slate-800 ${isDisplayMode ? 'p-[clamp(1.5rem,3vw,3rem)]' : 'p-4 sm:p-6 lg:p-10'} ${twoPane ? `${textW} ${mediaLeft ? 'lg:border-l-2' : 'lg:border-r-2'}` : 'w-full max-w-4xl mx-auto'}`}>
      {content && <div className={hasExample && hasMedia ? 'pb-4 lg:pb-6' : ''}>{renderContent(content, { isDisplayMode })}</div>}
      {s.notes?.length > 0 && (
        <div className="space-y-3 mt-2">
          {s.notes.map((note, i) => <Note key={i} note={note} lang={lang} isDisplayMode={isDisplayMode} />)}
        </div>
      )}
      {s.reveal && <div className="mt-4"><Reveal reveal={s.reveal} lang={lang} accent={accent} isDisplayMode={isDisplayMode} /></div>}
      {hasExample && hasMedia && (
        <div className={`bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 rounded-2xl lg:rounded-3xl relative shadow-sm shrink-0 ${isDisplayMode ? 'mt-6 p-[clamp(1.25rem,2vw,2rem)]' : 'mt-6 lg:mt-8 p-4 lg:p-6'}`}>
          <div className={`absolute -top-3.5 lg:-top-4 left-4 lg:left-6 text-white font-black uppercase tracking-widest rounded-lg lg:rounded-xl shadow-sm ${isDisplayMode ? 'text-[clamp(0.75rem,1.1vw,1.1rem)] px-5 py-2' : 'text-[9px] lg:text-xs px-3 lg:px-4 py-1'}`} style={{ backgroundColor: accent }}>{exampleLabel}</div>
          <div className={`font-bold text-slate-800 dark:text-slate-200 mt-1 lg:mt-2 leading-relaxed ${isDisplayMode ? 'text-[clamp(1.1rem,1.8vw,1.5rem)]' : 'text-sm sm:text-base lg:text-xl'}`}>{renderContent(example, { isDisplayMode, isExample: true })}</div>
        </div>
      )}
    </div>
  )

  const MediaCol = twoPane && (
    <div className={`flex-1 w-full ${hasText ? mediaW : 'lg:w-full'} bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center flex-shrink-0 min-h-0 ${isDisplayMode ? 'p-[clamp(1.5rem,3vw,3rem)]' : 'p-3 sm:p-4 lg:p-8'}`}>
      {hasMedia ? (
        <Media slide={s} ctx={ctx} />
      ) : (
        <div className="w-full h-full bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 rounded-2xl lg:rounded-[2rem] relative shadow-inner flex flex-col overflow-hidden">
          <div className={`w-full text-white font-black uppercase tracking-widest flex items-center shadow-md ${isDisplayMode ? 'text-[clamp(0.9rem,1.3vw,1.3rem)] px-8 py-5' : 'text-xs px-6 py-4'}`} style={{ backgroundColor: accent }}>
            <Ic name="Target" className="w-5 h-5 mr-3 opacity-80" />{exampleLabel}
          </div>
          <div className={`flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 font-bold text-slate-800 dark:text-slate-200 leading-relaxed ${isDisplayMode ? 'text-[clamp(1.1rem,1.8vw,1.5rem)]' : 'text-base lg:text-xl'}`}>{renderContent(example, { isDisplayMode, isExample: true })}</div>
        </div>
      )}
    </div>
  )

  return (
    <>
      <HeaderBar title={title || 'Concept'} icon={s.icon || 'BookOpen'} accent={accent} eyebrow={pick(s.eyebrow, s.eyebrowVn, s.eyebrowFr)} isDisplayMode={isDisplayMode} />
      <div className={`flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden ${mediaLeft ? 'lg:flex-row-reverse' : ''}`}>
        {hasText || !twoPane ? TextCol : null}
        {MediaCol}
      </div>
    </>
  )
}
