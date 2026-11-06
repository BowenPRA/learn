// The furniture around a slide: the top bar and bottom bar shown while
// previewing, the floating dock shown while presenting, the zoom overlay, the
// blank screen and countdown the phone remote can call up, and the notice for
// a slide with no layout. Deck.jsx owns the state; this file only draws it, so
// the deck's logic and its buttons can be read separately.
import { useState, useEffect } from 'react'
import {
  ChevronLeft, ChevronRight, ArrowLeft, Sun, Moon, Maximize, Minimize,
  FileText, Rocket, X, AlertTriangle, Smartphone, Timer,
} from 'lucide-react'
import WidgetRenderer, { WidgetErrorBoundary } from './WidgetRenderer.jsx'
import { PickButton } from './RandomStudent.jsx'
import { tr } from '../lib/lang.js'

// Secondary toolbar buttons: an icon always, a label only where there is room.
const SECONDARY = 'shrink-0 flex items-center gap-2 px-3 lg:px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 transition-all border-2 border-slate-200 dark:border-slate-700 active:scale-95'
const LABEL = 'text-xs font-black uppercase tracking-widest whitespace-nowrap'

/**
 * Language switch: EN / VN, plus FR on a lesson that has French (`langs`, from
 * deckLangs). `tone` picks the light (toolbar) or dark (dock) styling.
 */
export function LangToggle({ langs = ['en', 'vn'], lang, setLang, tone = 'light' }) {
  if (tone === 'dark') {
    return (
      <div className="flex items-center gap-1 px-1.5 border-r border-l border-white/20">
        {langs.map((l) => (
          <button key={l} onClick={() => setLang(l)} className={`px-2.5 py-1.5 rounded-lg font-black text-xs tracking-wider ${lang === l ? 'bg-[#1cb0f6] text-white' : 'text-white/50 hover:text-white'}`}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    )
  }
  return (
    <div className="flex bg-slate-100 dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-1">
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 sm:px-4 py-1.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${lang === l ? 'bg-white dark:bg-slate-700 text-[#1cb0f6] shadow-sm border-2 border-slate-200 dark:border-slate-600' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 border-2 border-transparent'}`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

/**
 * Opens the phone remote's pairing panel. The dot says how it stands: green,
 * a phone is connected; amber, listening but no phone yet; none, off.
 * `tone` picks the light (toolbar) or dark (dock) styling.
 */
function RemoteButton({ remote, lang, tone = 'light' }) {
  if (!remote) return null
  const { on, phones, onOpen } = remote
  const title = tr(lang, 'Phone remote', 'Điều khiển bằng điện thoại', 'Télécommande sur téléphone')
  const dot = phones > 0 ? 'bg-[#58cc02]' : on ? 'bg-amber-400' : ''
  const ring = tone === 'light' ? 'ring-white dark:ring-slate-900' : 'ring-slate-900'
  const badge = dot && <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ring-2 ${ring} ${dot}`} />
  if (tone === 'dark') {
    return (
      <button onClick={onOpen} className="relative p-2 rounded-xl bg-white/10 text-white hover:bg-white/20" title={title}>
        <Smartphone className="w-5 h-5" strokeWidth={2.5} />
        {badge}
      </button>
    )
  }
  return (
    // Hidden on a phone-sized screen: a student reading the deck on a phone
    // has no use for it.
    <button onClick={onOpen} className={`${SECONDARY} relative hidden md:flex hover:text-[#1cb0f6]`} title={title}>
      <Smartphone className="w-5 h-5" strokeWidth={2.5} />
      {badge}
    </button>
  )
}

function Progress({ index, total, className = '' }) {
  return (
    <div className={`bg-slate-200 dark:bg-slate-800 rounded-full h-3 border-2 border-slate-300 dark:border-slate-700 overflow-hidden ${className}`}>
      <div className="bg-[#58cc02] h-full transition-all duration-500" style={{ width: `${((index + 1) / total) * 100}%` }} />
    </div>
  )
}

/**
 * Top bar while previewing. The slide counter is always visible; the progress
 * bar appears from `sm`, the lesson title from `md`. On a phone the EN/VN
 * switch lives here because the bottom bar has no room for it.
 */
export function TopBar({ title, index, total, bilingual, langs, lang, setLang, isDark, onToggleDark, onBack }) {
  return (
    <div className="flex items-center gap-3 px-3 sm:px-4 h-14 sm:h-16 lg:h-20 border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm z-20 shrink-0">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 dark:text-slate-300 hover:text-[#1cb0f6] font-black uppercase tracking-widest text-xs sm:text-sm transition-colors active:scale-95 shrink-0">
        <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
        <span className="hidden sm:inline">Back</span>
      </button>
      <div className="flex-1 min-w-0 max-w-2xl mx-auto flex items-center justify-end sm:justify-center gap-3">
        <span className="hidden md:block text-slate-700 dark:text-slate-200 font-black text-sm truncate">{title}</span>
        <Progress index={index} total={total} className="hidden sm:block flex-1" />
        <span className="text-xs font-black text-slate-400 tabular-nums shrink-0">{index + 1}/{total}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {bilingual && <div className="sm:hidden"><LangToggle langs={langs} lang={lang} setLang={setLang} /></div>}
        <button onClick={onToggleDark} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 transition-colors active:scale-95 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700" title="Toggle dark mode">
          {isDark ? <Sun className="w-5 h-5 text-amber-400" strokeWidth={2.5} /> : <Moon className="w-5 h-5" strokeWidth={2.5} />}
        </button>
      </div>
    </div>
  )
}

/**
 * Bottom bar while previewing: back, the teaching controls, forward. It must
 * stay one row on a laptop (1024 px and up), with three languages and a long
 * picked name: only the language switch, Pick and Full screen carry words, the
 * teacher shortcuts (Phone remote, Plan, Self-study) are icons with a tooltip
 * and drop out below `md`, and a long name ends in "…" rather than wrapping
 * the row. On a narrow tablet the middle cluster wraps instead.
 */
export function BottomBar({ index, total, bilingual, langs, lang, setLang, picker, onManage, onPrev, onNext, onFullscreen, onPlan, selfStudyUrl, remote }) {
  const last = index === total - 1
  return (
    <div className="bg-white dark:bg-slate-900 border-t-2 border-slate-200 dark:border-slate-800 px-3 sm:px-5 pt-3 sm:pt-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-[max(1.25rem,env(safe-area-inset-bottom))] z-20 shrink-0">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        <button onClick={onPrev} disabled={index === 0} className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center rounded-xl border-2 border-b-4 border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 active:border-b-2 active:translate-y-0.5 transition-all disabled:opacity-30 bg-white dark:bg-slate-900" title="Back (←)">
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={3} />
        </button>

        <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-2 sm:gap-3 min-w-0">
          {bilingual && <div className="hidden sm:block shrink-0"><LangToggle langs={langs} lang={lang} setLang={setLang} /></div>}
          <PickButton picker={picker} lang={lang} onManage={onManage} shrink />
          <button onClick={onFullscreen} className={`${SECONDARY} hover:text-[#1cb0f6]`} title="Full screen (F)">
            <Maximize className="w-5 h-5" strokeWidth={2.5} />
            <span className={`hidden xl:inline ${LABEL}`}>Full screen</span>
          </button>
          <RemoteButton remote={remote} lang={lang} />
          {onPlan && (
            <button onClick={onPlan} className={`${SECONDARY} hidden md:flex hover:text-[#8b5cf6]`} title="Teacher lesson plan">
              <FileText className="w-5 h-5" strokeWidth={2.5} />
            </button>
          )}
          {/* The self-study twin on the Dashboard: a teacher-side shortcut, and
              the place to send a student who missed the lesson. */}
          {selfStudyUrl && (
            <a href={selfStudyUrl} target="_blank" rel="noopener noreferrer" className={`${SECONDARY} hidden md:flex hover:text-[#58cc02]`} title="Self-study version on the Dashboard">
              <Rocket className="w-5 h-5" strokeWidth={2.5} />
            </a>
          )}
        </div>

        <button onClick={onNext} className={`shrink-0 flex items-center px-5 sm:px-8 py-3 sm:py-4 rounded-xl font-black text-sm sm:text-lg tracking-widest uppercase transition-all border-b-4 active:border-b-0 active:translate-y-1 ${last ? 'bg-[#58cc02] border-[#58a700] text-white hover:bg-[#46a802]' : 'bg-[#1cb0f6] border-[#1899d6] text-white hover:bg-[#159bd9]'}`} title={last ? 'Finish' : 'Continue (→)'}>
          <span className="hidden sm:inline">{last ? 'Finish' : 'Continue'}</span>
          <span className="sm:hidden">{last ? 'End' : 'Next'}</span>
          {!last && <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 ml-1 sm:ml-2 -mr-1 sm:-mr-2" strokeWidth={3} />}
        </button>
      </div>
    </div>
  )
}

/**
 * The floating dock in full screen, plus the thin progress line along the
 * bottom edge. Both fade out with the cursor once the presenter goes idle.
 */
export function ProjectorDock({ index, total, bilingual, langs, lang, setLang, picker, onManage, onPrev, onNext, onExit, idle, remote }) {
  return (
    <>
      <div className={`absolute top-2.5 sm:top-3 right-3 sm:right-4 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl shadow-2xl border border-white/15 z-50 transition-all duration-500 ${idle ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100'}`}>
        <button onClick={onPrev} disabled={index === 0} className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 disabled:opacity-30" title="Back (←)"><ChevronLeft className="w-5 h-5" strokeWidth={3} /></button>
        {bilingual && <LangToggle langs={langs} lang={lang} setLang={setLang} tone="dark" />}
        <PickButton picker={picker} lang={lang} onManage={onManage} tone="dark" large />
        <RemoteButton remote={remote} lang={lang} tone="dark" />
        <button onClick={onExit} className="p-2 rounded-xl bg-white/10 text-slate-300 hover:bg-rose-500 hover:text-white" title="Exit full screen (Esc)"><Minimize className="w-5 h-5" strokeWidth={2.5} /></button>
        <button onClick={onNext} className="p-2 rounded-xl bg-[#58cc02] text-white hover:bg-[#46a802] ml-0.5" title="Continue (→)"><ChevronRight className="w-5 h-5" strokeWidth={3} /></button>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-slate-200/20 z-50 transition-opacity duration-500 ${idle ? 'opacity-0' : 'opacity-100'}`}>
        <div className="h-full bg-[#58cc02] transition-all duration-500 shadow-[0_-1px_10px_rgba(88,204,2,0.4)]" style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>
    </>
  )
}

/**
 * The blank screen (B on the laptop, or Blank on the phone): a calm dark
 * screen over everything, for when the teacher needs the room's attention. A
 * click or any key brings the slide back. `teacher` is the course's
 * `teacher` field from content/courses.js ('Mr. David'); without one it is
 * Mr Bowen, as on every deck before teacher courses.
 */
export function BlankScreen({ lang, teacher, onLift }) {
  return (
    <div onClick={onLift} className="absolute inset-0 z-[60] bg-[#0b1120] flex items-center justify-center p-8 text-center animate-in fade-in duration-500">
      <p className="text-slate-400 font-black tracking-tight text-[clamp(1.75rem,4vw,4rem)]">
        {eyesOn(lang, teacher)}
      </p>
    </div>
  )
}

/** "Eyes on …" in the deck's language. Vietnamese says thầy for Mr and cô for Ms / Mrs / Miss. */
function eyesOn(lang, teacher) {
  if (!teacher) return tr(lang, 'Eyes on Mr Bowen', 'Hãy nhìn thầy Bowen', 'Les yeux sur Mr Bowen')
  const vn = teacher.replace(/^Mr\.?\s+/, 'thầy ').replace(/^(Ms|Mrs|Miss)\.?\s+/, 'cô ')
  return tr(lang, `Eyes on ${teacher}`, `Hãy nhìn ${vn}`, `Les yeux sur ${teacher}`)
}

const clock = (secs) => `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`

/**
 * The countdown the phone remote starts, at the top centre of the slide (Mr
 * Bowen's choice, 28 Oct 2026), clear of the header's icon and title on the
 * left and the projector dock on the right. Bright
 * blue with a white ring so it reads on any header colour; the last ten
 * seconds turn yellow; at zero it turns orange, pulses, and goes ten seconds
 * later (a click dismisses it sooner). Numbers only, so it needs no
 * translation.
 */
export function TimerBadge({ end, isDisplayMode, onDone }) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(t)
  }, [])
  const left = Math.max(0, Math.ceil((end - now) / 1000))
  const over = left === 0
  useEffect(() => {
    if (!over) return undefined
    const t = setTimeout(onDone, 10000)
    return () => clearTimeout(t)
  }, [over, onDone])
  const tone = over
    ? 'bg-[#c25e12] border-[#8f430c] text-white animate-pulse'
    : left <= 10
      ? 'bg-[#ffc800] border-[#cca000] text-slate-900'
      : 'bg-[#1cb0f6] border-[#1899d6] text-white'
  return (
    <button
      onClick={onDone}
      // Short enough to stay above a question slide's top label, which sits as
      // little as 5vw from the top (StatementLayout's padding) when the slide is full.
      className={`absolute z-30 left-1/2 -translate-x-1/2 flex items-center gap-[0.35em] rounded-2xl border-b-4 ring-4 ring-white shadow-[0_6px_18px_rgba(15,23,42,0.3)] font-black tabular-nums tracking-tight leading-none transition-colors ${tone} ${isDisplayMode ? 'top-2 px-[0.55em] py-[0.22em] text-[clamp(1.6rem,2.6vw,2.8rem)]' : 'top-1 px-3 py-1.5 text-xl'}`}
      title="Timer"
    >
      <Timer className="w-[0.85em] h-[0.85em]" strokeWidth={2.75} />
      {clock(left)}
    </button>
  )
}

/** The expanded view of a slide's media. `zoomed` = { type, config | content | src }. */
export function ZoomModal({ zoomed, lang, isDisplayMode, onClose }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-3 sm:p-8 animate-in fade-in duration-200" onClick={onClose}>
      <button onClick={onClose} className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2 sm:p-3 bg-white hover:bg-slate-100 text-slate-800 rounded-xl shadow-xl border-2 border-slate-200 active:scale-95 z-50 border-b-4 active:border-b-2 active:translate-y-0.5" title="Close (Esc)">
        <X className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={3} />
      </button>
      <div className="relative w-full h-full max-w-7xl flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-2xl sm:rounded-[2rem] shadow-2xl overflow-hidden p-2 sm:p-6 animate-in zoom-in-95 duration-300 border-4 border-slate-200 dark:border-slate-700" onClick={(e) => e.stopPropagation()}>
        {zoomed.type === 'widget' ? (
          <WidgetErrorBoundary><WidgetRenderer config={zoomed.config} lang={lang} isDisplayMode={isDisplayMode} /></WidgetErrorBoundary>
        ) : zoomed.type === 'svg' ? (
          <div className="w-full h-full flex items-center justify-center bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl shadow-sm" dangerouslySetInnerHTML={{ __html: zoomed.content }} />
        ) : zoomed.type === 'img' ? (
          <img src={zoomed.src} alt="Expanded" className="w-full h-full object-contain rounded-xl bg-white dark:bg-slate-800 p-4" draggable={false} />
        ) : (
          <iframe src={zoomed.src} title="Expanded" className="w-full h-full pointer-events-none rounded-xl bg-white dark:bg-slate-800" scrolling="no" />
        )}
      </div>
    </div>
  )
}

/**
 * Shown in place of a slide whose `layout` names nothing in the registry (a
 * typo, usually). A blank card would pass every check and only be noticed in
 * front of the class.
 */
export function UnknownLayout({ slide, index }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-rose-50 dark:bg-rose-950/30">
      <div className="w-14 h-14 rounded-full bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center mb-4">
        <AlertTriangle className="w-7 h-7 text-rose-500" strokeWidth={2.5} />
      </div>
      <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">Slide {index + 1} has no layout</h2>
      <p className="font-bold text-slate-500 dark:text-slate-400 max-w-md">
        {slide.layout ? `“${slide.layout}” is not a registered layout.` : 'Give this slide a `layout` (see README, "The layouts").'}
        {slide.title && <span className="block mt-2 text-slate-400 dark:text-slate-500">{slide.title}</span>}
      </p>
    </div>
  )
}
