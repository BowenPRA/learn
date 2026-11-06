// A grid of labelled picture cards: one small diagram per item, with the key
// word underneath in the textbook's glossary colour and the definition below
// it. Built for "here are the four parts of a cell, copy each one" slides,
// where a wall of note cards reads as text soup but a picture per term doesn't.
//
// Four cards or fewer stack picture-over-text. Five or more switch to a
// picture-beside-text card so a second row still fits on a projector without
// scrolling.
import { HeaderBar, Ic } from './primitives.jsx'
import { parseInlineText, renderContent, toHex, NOTE_TONES } from './helpers.jsx'
import { field } from '../../lib/lang.js'

const COLS = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
}

export default function GalleryLayout({ slide: s, ctx }) {
  const { pick, lang, isDisplayMode } = ctx
  const tone = NOTE_TONES[s.tone] || NOTE_TONES.write
  const accent = toHex(s.accent, tone.accent)
  const title = pick(s.title, s.titleVn, s.titleFr)
  const content = pick(s.content, s.contentVn, s.contentFr)
  const items = s.items || []
  const colCount = COLS[s.columns] ? s.columns : 4
  const grid = COLS[colCount]
  // Anything that needs a second row switches to picture-beside-text, so the
  // whole set still fits on a projector without scrolling.
  const dense = Math.ceil(items.length / colCount) > 1
  const copyLabel = s.copy === false ? null
    : pick(s.copyLabel, s.copyLabelVn, s.copyLabelFr) || field(tone, 'label', lang)

  const mediaBox = dense
    ? `shrink-0 border-r-2 ${isDisplayMode ? 'w-[clamp(5.5rem,9vw,8rem)]' : 'w-24 sm:w-28 lg:w-32'}`
    : `w-full border-b-2 ${isDisplayMode ? 'h-[clamp(7rem,15vh,12rem)]' : 'h-28 sm:h-32 lg:h-40'}`

  return (
    <>
      <HeaderBar title={title || ''} icon={s.icon || 'Boxes'} accent={accent} eyebrow={pick(s.eyebrow, s.eyebrowVn, s.eyebrowFr)} isDisplayMode={isDisplayMode} />
      <div className={`flex-1 min-h-0 overflow-y-auto custom-scrollbar bg-slate-50/60 dark:bg-slate-900/50 flex flex-col ${isDisplayMode ? 'p-[clamp(1.25rem,2.5vw,2.5rem)]' : 'p-4 sm:p-6'}`}>
        {/* my-auto centres the grid when it fits and collapses to 0 when it
            doesn't, so a tall set scrolls instead of being clipped. */}
        <div className="max-w-7xl w-full mx-auto my-auto">
          {content && <div className="mb-4">{renderContent(content, { isDisplayMode })}</div>}

          {copyLabel && (
            <div className={`inline-flex items-center gap-2 text-white font-black uppercase tracking-[0.15em] rounded-lg mb-4 ${isDisplayMode ? 'text-[clamp(0.7rem,1vw,1rem)] px-4 py-2' : 'text-[10px] sm:text-[11px] px-3.5 py-2'}`}
              style={{ backgroundColor: tone.accent }}>
              <Ic name={tone.icon} className={isDisplayMode ? 'w-4 h-4' : 'w-3.5 h-3.5'} strokeWidth={3} />
              {copyLabel}
            </div>
          )}

          <div className={`grid gap-3 sm:gap-4 ${grid}`}>
            {items.map((item, i) => {
              const term = pick(item.term, item.termVn, item.termFr)
              const text = pick(item.text, item.textVn, item.textFr)
              const tag = pick(item.tag, item.tagVn, item.tagFr)
              return (
                <div key={i} className={`flex overflow-hidden rounded-xl border-2 ${tone.border} bg-white dark:bg-slate-800 shadow-sm ${dense ? 'flex-row' : 'flex-col'}`}>
                  <div className={`relative ${tone.card} ${tone.border} ${mediaBox} flex items-center justify-center text-slate-800 dark:text-slate-100 ${isDisplayMode ? 'p-3' : 'p-2 sm:p-3'}`}>
                    {item.inlineSvg
                      ? <div className="w-full h-full flex items-center justify-center [&>svg]:max-h-full [&>svg]:w-auto" dangerouslySetInnerHTML={{ __html: item.inlineSvg }} />
                      : item.image
                        ? <img src={item.image} alt={term || ''} className="w-full h-full object-contain" draggable={false} />
                        : null}
                    {tag && (
                      <span className="absolute top-1.5 right-1.5 rounded-md text-white font-black uppercase tracking-widest text-[8px] sm:text-[9px] px-2 py-1"
                        style={{ backgroundColor: tone.accent }}>{tag}</span>
                    )}
                  </div>
                  <div className={`flex-1 min-w-0 ${isDisplayMode ? 'p-[clamp(0.75rem,1.2vw,1.15rem)]' : 'p-3 sm:p-4'}`}>
                    {term && (
                      <div className={`${tone.strong} leading-tight mb-1 ${isDisplayMode ? 'text-[clamp(1rem,1.6vw,1.45rem)]' : 'text-base sm:text-lg'}`}>{term}</div>
                    )}
                    {text && (
                      <p className={`font-semibold text-slate-700 dark:text-slate-300 leading-snug ${isDisplayMode ? 'text-[clamp(0.85rem,1.3vw,1.15rem)]' : 'text-[13px] sm:text-sm lg:text-[15px]'}`}>
                        {parseInlineText(text, { strongClass: tone.strong })}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
