import { Component } from 'react'
import { Construction } from 'lucide-react'

/**
 * Renders a slide's `widget`. Two forms are supported:
 *   1. A React component reference:  widget: MyWidget
 *   2. A config object:              widget: { type: 'Name', params: {...} }
 * Only the component-reference form is used today; the config branch is a
 * stub for future generic, registry-based widgets.
 *
 * Every widget receives two props and may ignore either:
 *   `lang`           'en' | 'vn' | 'fr' — so its own interface text follows
 *                    the deck's language like the rest of a slide. Use
 *                    `tr(lang, en, vn, fr)` from src/lib/lang.js.
 *   `isDisplayMode`  true in full screen, where the layouts scale their type
 *                    up ~40%; a widget with HTML text can do the same.
 */
export default function WidgetRenderer({ config, lang = 'en', isDisplayMode = false }) {
  if (!config) return null

  // Component reference (function) or already-created element.
  if (typeof config === 'function' || (typeof config === 'object' && config.$$typeof)) {
    const Widget = config
    return <Widget lang={lang} isDisplayMode={isDisplayMode} />
  }

  // Config object — no generic widgets registered yet.
  const { type } = config
  return (
    <div className="p-6 border-2 border-dashed border-rose-300 bg-rose-50 dark:bg-rose-900/20 rounded-2xl text-rose-500 font-bold flex flex-col items-center text-center">
      <span>Widget type "{type}" not found</span>
      <span className="text-sm font-medium mt-2 text-rose-400">Register it in WidgetRenderer.jsx</span>
    </div>
  )
}

export class WidgetErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Interactive widget crashed:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border-2 border-dashed border-slate-300 dark:border-slate-700 text-center animate-in fade-in">
          <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-3 shadow-inner">
            <Construction className="w-6 h-6 text-rose-500 dark:text-rose-400" strokeWidth={2.5} />
          </div>
          <h3 className="text-lg font-black text-slate-700 dark:text-slate-200 mb-1 tracking-tight">Widget Unavailable</h3>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 max-w-[250px]">
            This interactive tool hit an error. Please continue with the lesson.
          </p>
        </div>
      )
    }
    return this.props.children
  }
}
