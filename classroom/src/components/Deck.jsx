import { useState, useEffect, useRef, useCallback, useMemo, createElement, lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'

import { dashboardUnitUrl } from '../lib/dashboardLink.js'
import { deckLangs, tr } from '../lib/lang.js'
import { useStudentPicker } from '../lib/useStudentPicker.js'
import { useDarkMode } from '../lib/useDarkMode.js'
import { useDisplayMode } from '../lib/useDisplayMode.js'
import { useDeckRemote } from '../lib/useDeckRemote.js'
import { RevealContext, SlideButtonsContext, GameRemoteContext, createButtonRegistry, createGameChannel } from '../lib/deckControls.js'
import { RandomStudentModal } from './RandomStudent.jsx'
import { getLayout, resolveSlide } from './layouts/index.js'
import { TopBar, BottomBar, ProjectorDock, ZoomModal, UnknownLayout, BlankScreen, TimerBadge } from './DeckChrome.jsx'

// The pairing panel brings the QR encoder with it, so it loads on first open.
const RemotePanel = lazy(() => import('./RemotePanel.jsx'))

// Keys that move the deck. A presenter clicker sends PageDown / PageUp (some
// send the arrows instead), and Space is the habit of anyone who has driven a
// PowerPoint, so all of them work.
const NEXT_KEYS = new Set(['ArrowRight', 'Enter', 'PageDown', ' '])
const PREV_KEYS = new Set(['ArrowLeft', 'PageUp'])

// The longest countdown the phone may set, in seconds.
const TIMER_MAX = 60 * 60

export default function Deck({ lesson, course }) {
  const slides = lesson.slides || []
  const bilingual = course?.bilingual !== false
  const langs = deckLangs(course, lesson)
  const navigate = useNavigate()
  const { isDark, toggle: toggleDark } = useDarkMode()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [zoomedImage, setZoomedImage] = useState(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [lang, setLang] = useState('en')
  const picker = useStudentPicker()
  const containerRef = useRef(null)
  const { isDisplayMode, isIdle, toggle: toggleDisplay, enter: enterDisplay, exit: exitDisplay, poke } = useDisplayMode(containerRef)

  // What the phone remote can reach besides the slide index: the slide's
  // answer box (closed again on every slide change), the slide's widget
  // buttons, a game on the slide, a blank screen and a countdown.
  const [revealOpen, setRevealOpen] = useState(false)
  const [buttons, setButtons] = useState([])
  const [registry] = useState(() => createButtonRegistry(setButtons))
  const [game, setGame] = useState(null)
  const [gameChannel] = useState(() => createGameChannel(setGame))
  const [blank, setBlank] = useState(false)
  const [timerEnd, setTimerEnd] = useState(null)
  const [remoteOpen, setRemoteOpen] = useState(false)
  const revealControl = useMemo(() => ({ open: revealOpen, setOpen: setRevealOpen }), [revealOpen])

  const goTo = useCallback((i) => {
    setCurrentIndex(i)
    setRevealOpen(false)
  }, [])

  const goBack = useCallback(() => {
    exitDisplay()
    navigate(`/course/${course.id}`)
  }, [exitDisplay, navigate, course.id])

  const handleNext = useCallback(() => {
    if (currentIndex < slides.length - 1) goTo(currentIndex + 1)
    else goBack()
  }, [currentIndex, slides.length, goBack, goTo])
  const handlePrev = useCallback(() => {
    if (currentIndex > 0) goTo(currentIndex - 1)
  }, [currentIndex, goTo])

  // ── The phone remote ──────────────────────────────────────────────────────
  // The laptop keeps every piece of state; the phone only asks. A request
  // names its deck, so one sent just before the laptop opened another deck is
  // dropped rather than applied to the wrong slides. Next on the last slide
  // does nothing from the phone: on the laptop it leaves the lesson.
  const deckId = `${course.id}/${lesson.slug}`
  const onRemoteRequest = (msg) => {
    if (msg.deck !== deckId) return
    const last = slides.length - 1
    switch (msg.type) {
      case 'next':
        setCurrentIndex((i) => Math.min(i + 1, last))
        setRevealOpen(false)
        return
      case 'prev':
        setCurrentIndex((i) => Math.max(i - 1, 0))
        setRevealOpen(false)
        return
      case 'go':
        if (Number.isInteger(msg.i) && msg.i >= 0 && msg.i <= last) goTo(msg.i)
        return
      case 'reveal':
        setRevealOpen(Boolean(msg.open))
        return
      case 'lang':
        if (langs.includes(msg.l)) setLang(msg.l)
        return
      case 'pick':
        // The name appears beside the dock's Pick button, as it does after R.
        if (picker.draw()) poke(6000)
        return
      case 'blank':
        setBlank(Boolean(msg.on))
        return
      // Full screen from the phone: display mode, without asking the browser
      // (it refuses anything but a click or key on the laptop itself).
      case 'proj':
        if (msg.on) enterDisplay(false)
        else exitDisplay()
        return
      case 'btn':
        registry.press(msg.k)
        return
      case 'game':
        gameChannel.act(msg.a)
        return
      case 'timer':
        setTimerEnd(msg.s > 0 ? Date.now() + Math.min(msg.s, TIMER_MAX) * 1000 : null)
        return
      default:
    }
  }
  const remote = useDeckRemote({
    deck: deckId,
    i: currentIndex,
    n: slides.length,
    lang,
    langs,
    // null: this slide has no answer box.
    rv: slides[currentIndex]?.reveal ? revealOpen : null,
    blank,
    proj: isDisplayMode,
    // The drawn name goes to the phone: Mr Bowen agreed to it (28 Oct 2026),
    // and it is already on the projector for the room.
    pick: picker.current ? { name: picker.current, c: picker.pickCount, left: picker.remaining, reset: picker.justReset } : null,
    names: picker.names.length,
    btns: buttons,
    // The game on this slide, as it describes itself (useGameRemote), or null.
    g: game,
    t: timerEnd,
  }, onRemoteRequest)
  const openRemote = () => {
    remote.start()
    setRemoteOpen(true)
  }
  const endTimer = useCallback(() => setTimerEnd(null), [])

  // A `game` slide owns the keyboard: Enter and the arrows belong to the game,
  // and on a one-slide game deck Enter would otherwise walk straight out of the
  // lesson mid-round. Full screen (`f`) and the on-screen controls still work.
  const navLocked = slides[currentIndex]?.layout === 'game'

  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      // Browser shortcuts (Ctrl+R, Ctrl+F …) are not ours.
      if (e.ctrlKey || e.metaKey || e.altKey) return
      // A blank screen lifts on any key, and that key does nothing else.
      if (blank) { e.preventDefault(); setBlank(false); return }
      // While the student picker or the pairing panel is open it owns the
      // keyboard (each handles its own Escape); don't navigate the deck or
      // toggle fullscreen underneath it.
      if (pickerOpen || remoteOpen) return
      if (NEXT_KEYS.has(e.key)) { if (navLocked) return; e.preventDefault(); handleNext() }
      else if (PREV_KEYS.has(e.key)) { if (navLocked) return; e.preventDefault(); handlePrev() }
      else if (e.key === 'Escape') {
        // Real fullscreen leaves on Esc by itself; the windowed fallback needs this.
        if (zoomedImage) setZoomedImage(null)
        else if (isDisplayMode) exitDisplay()
      }
      else if (e.key === 'f' || e.key === 'F') { e.preventDefault(); toggleDisplay() }
      // R draws a random student, same as the Pick button; a fresh machine
      // with no list yet opens the editor instead.
      else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault()
        if (!picker.draw()) setPickerOpen(true)
      }
      // B blanks the screen, as in PowerPoint; any key brings the slide back.
      else if (e.key === 'b' || e.key === 'B') { e.preventDefault(); setBlank(true) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleNext, handlePrev, toggleDisplay, exitDisplay, isDisplayMode, zoomedImage, navLocked, pickerOpen, remoteOpen, blank, picker])

  if (!slides.length) {
    return (
      <div className="app-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-4">Lesson has no slides yet</h2>
        <button onClick={goBack} className="px-6 py-3 bg-[#1cb0f6] text-white rounded-xl font-black uppercase tracking-widest border-b-4 border-[#1899d6] active:border-b-0 active:translate-y-1 transition-all">
          Back
        </button>
      </div>
    )
  }

  const s = resolveSlide(slides[currentIndex])
  const LayoutComp = getLayout(s.layout)
  const pick = (en, vn, fr) => tr(lang, en, vn, fr)
  const ctx = { lang, pick, isDisplayMode, bilingual, onZoom: setZoomedImage }
  const selfStudyUrl = dashboardUnitUrl(lesson.dashboard)

  const nav = {
    index: currentIndex, total: slides.length, bilingual, langs, lang, setLang, picker,
    onManage: () => setPickerOpen(true), onPrev: handlePrev, onNext: handleNext,
    remote: { on: remote.on, phones: remote.phones, onOpen: openRemote },
  }

  return (
    <div
      ref={containerRef}
      // The check scripts read this: display mode is on even where the browser
      // refuses real fullscreen (headless Chrome 157 does).
      data-display-mode={isDisplayMode ? 'on' : 'off'}
      // …and this, the slide on screen (1-based), which the windowed counter
      // shows but full screen does not.
      data-slide={currentIndex + 1}
      // A countdown is showing at the top centre (index.css hides what it covers).
      data-timer={timerEnd ? 'on' : 'off'}
      className={`app-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans overflow-hidden relative transition-colors duration-300 ${isDisplayMode && isIdle ? 'cursor-none' : ''}`}
    >
      {!isDisplayMode && (
        <TopBar {...nav} title={lesson.title} isDark={isDark} onToggleDark={toggleDark} onBack={goBack} />
      )}

      {/* The slide */}
      <div className={`flex-1 flex justify-center items-center z-10 overflow-hidden relative min-h-0 ${isDisplayMode ? 'p-0' : 'p-2 sm:p-4 lg:p-8'}`}>
        <RevealContext.Provider value={revealControl}>
          <SlideButtonsContext.Provider value={registry}>
            <GameRemoteContext.Provider value={gameChannel}>
              <div
                key={currentIndex}
                className={`w-full h-full flex flex-col bg-white dark:bg-slate-900 overflow-hidden animate-in fade-in zoom-in-[0.98] duration-500 ${isDisplayMode ? 'max-w-none' : 'max-w-7xl rounded-2xl sm:rounded-3xl lg:rounded-[2rem] shadow-sm border-2 border-slate-200 dark:border-slate-800'}`}
              >
                {LayoutComp
                  ? createElement(LayoutComp, { slide: s, ctx })
                  : <UnknownLayout slide={s} index={currentIndex} />}
              </div>
            </GameRemoteContext.Provider>
          </SlideButtonsContext.Provider>
        </RevealContext.Provider>
        {timerEnd && <TimerBadge key={timerEnd} end={timerEnd} isDisplayMode={isDisplayMode} onDone={endTimer} />}
      </div>

      {isDisplayMode
        ? <ProjectorDock {...nav} onExit={exitDisplay} idle={isIdle} />
        : (
          <BottomBar
            {...nav}
            onFullscreen={toggleDisplay}
            onPlan={lesson.plan ? () => navigate(`/plan/${course.id}/${lesson.slug}`) : null}
            selfStudyUrl={selfStudyUrl}
          />
        )}

      {blank && <BlankScreen lang={lang} teacher={course?.teacher} onLift={() => setBlank(false)} />}

      {/* Random-student picker (roster saved per-device; works in full screen) */}
      <RandomStudentModal open={pickerOpen} onClose={() => setPickerOpen(false)} lang={lang} picker={picker} />

      {remoteOpen && (
        <Suspense fallback={null}>
          <RemotePanel lang={lang} remote={remote} isDisplayMode={isDisplayMode} onClose={() => setRemoteOpen(false)} />
        </Suspense>
      )}

      {zoomedImage && (
        <ZoomModal zoomed={zoomedImage} lang={lang} isDisplayMode={isDisplayMode} onClose={() => setZoomedImage(null)} />
      )}
    </div>
  )
}
