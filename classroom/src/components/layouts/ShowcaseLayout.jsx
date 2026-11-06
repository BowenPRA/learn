// Media-forward: a compact header bar over a diagram/photo/widget that fills the
// slide edge-to-edge, with an optional caption footer. For one big visual.
import { Media, HeaderBar } from './primitives.jsx'
import { parseInlineText, toHex } from './helpers.jsx'

export default function ShowcaseLayout({ slide: s, ctx }) {
  const { pick, isDisplayMode } = ctx
  const accent = toHex(s.accent || s.color, '#1cb0f6')
  const title = pick(s.title, s.titleVn, s.titleFr)
  const caption = pick(s.caption, s.captionVn, s.captionFr)

  return (
    <>
      <HeaderBar title={title || ''} icon={s.icon || 'Microscope'} accent={accent} eyebrow={pick(s.eyebrow, s.eyebrowVn, s.eyebrowFr)} isDisplayMode={isDisplayMode} />
      <div className={`flex-1 min-h-0 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col ${isDisplayMode ? 'p-[clamp(1.25rem,2.5vw,2.5rem)]' : 'p-3 sm:p-5 lg:p-8'}`}>
        <div className="flex-1 min-h-0">
          <Media slide={s} ctx={ctx} />
        </div>
        {caption && (
          <div className={`shrink-0 text-center font-bold text-slate-500 dark:text-slate-400 ${isDisplayMode ? 'text-[clamp(0.95rem,1.5vw,1.4rem)] mt-4' : 'text-sm sm:text-base mt-3'}`}>
            {parseInlineText(caption)}
          </div>
        )}
      </div>
    </>
  )
}
