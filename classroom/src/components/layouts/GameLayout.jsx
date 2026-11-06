// A game fills the whole slide. No header strip, no padding, no card inside a
// card — a header bar would eat the vertical space the board needs, and the
// board carries its own title. Used by the `games` course, where one "unit" is
// one game rather than a sequence of slides.
//
// The widget gets the deck's language like any other, plus `isDisplayMode` so
// it can scale its own type up on the projector the way the layouts do.
import WidgetRenderer, { WidgetErrorBoundary } from '../WidgetRenderer.jsx'

export default function GameLayout({ slide: s, ctx }) {
  const { lang, isDisplayMode } = ctx
  if (!s.widget) return null
  const Widget = s.widget

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-slate-50 dark:bg-slate-950">
      <WidgetErrorBoundary>
        {typeof Widget === 'function'
          ? <Widget lang={lang} isDisplayMode={isDisplayMode} />
          : <WidgetRenderer config={s.widget} lang={lang} isDisplayMode={isDisplayMode} />}
      </WidgetErrorBoundary>
    </div>
  )
}
