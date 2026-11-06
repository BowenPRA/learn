// src/remote/DeckRemote.jsx
// Mr Bowen's phone remote for the slide decks, at #/remote/<room>: scan the QR
// on a deck's "Phone remote" panel and the phone drives whatever deck that
// laptop has open. Built for one hand while walking round the room, in three
// bands: where we are (slide number, title, what's next) pinned at the top;
// what to read (the plan's notes and answers) scrolling in the middle; and
// everything to press (the slide's own buttons, the answer box, the tools,
// Back and Next) pinned at the bottom where a thumb reaches. Swiping left or
// right above the controls turns the slide, and every press buzzes. Added to
// the home screen it is an app of its own, with no address bar.
//
// The laptop owns the deck; this end only asks (src/lib/useDeckRemote.js
// answers). The phone has its own copy of the site, so slide titles, answer
// boxes and the teacher plan are read here and never travel: the wire carries
// a deck id, a slide number and a few flags. To spare The Current's realtime
// allowance the phone says hello every 10 seconds only while its screen is on
// and in use: it goes quiet when the screen locks, and pauses itself after 20
// minutes without a tap.
//
// A game on the slide (Jeopardy, Word Wall) brings its own screen instead: the
// slide's `remote`, handed the game's state (`g`, from useGameRemote on the
// laptop) and drawn in the same three bands (src/remote/GamePanel.jsx), with
// the deck's tools kept above its main button. Back and Next shrink to a row
// there, and go altogether on a deck that is only the game.
//
// For the teacher only, so English only.
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  ChevronLeft, ChevronRight, Shuffle, EyeOff, Eye, Timer, ListOrdered, Loader2,
  WifiOff, MonitorUp, RotateCw, Smartphone, Maximize2, Minimize2,
} from 'lucide-react'
import { getLesson } from '../../content/registry.js'
import { openBus } from '../lib/remote/bus.js'
import { cleanRoomCode } from '../lib/remote/room.js'
import { usePresence, useWakeLock, useRemoteAppTags, lastRoom, rememberRoom, buzz } from '../lib/remote/phone.js'
import { Sheet, Paused } from '../lib/remote/Sheet.jsx'
import { planNotes } from './planNotes.js'

const HELLO_MS = 10 * 1000
const LAPTOP_GONE_MS = 25 * 1000
const TIMER_MINUTES = [1, 2, 3, 5]
// How long a picked name stays up top on the phone.
const PICK_SHOWN_MS = 20 * 1000
// The last room joined, so the home-screen app opens straight into it.
const LAST_ROOM_KEY = 'classroom:remote:last-room'
// One id per page load: the laptop counts phones by it.
const ME = `phone-${Math.random().toString(36).slice(2, 8)}`

// Slide text is written for KaTeX and markdown-lite; the phone shows it plain.
const plain = (s) => String(s || '')
  .replace(/\*\*/g, '')
  .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '$1/$2')
  .replace(/\\times/g, '×').replace(/\\div/g, '÷').replace(/\\cdot/g, '·')
  .replace(/\^\\circ|\\circ/g, '°').replace(/\\le\b/g, '≤').replace(/\\ge\b/g, '≥')
  .replace(/\\[a-zA-Z]+/g, '').replace(/[{}$]/g, '')
  .replace(/[ \t]+/g, ' ')
  .trim()

const slideTitle = (slide, i) =>
  plain(slide?.title) || plain(slide?.eyebrow) || plain(slide?.text) || (slide?.layout === 'game' ? 'Game' : `Slide ${i + 1}`)

const clock = (secs) => `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`

export default function DeckRemote() {
  // Installs as its own app, opening on the last room (src/lib/remote/phone.js).
  useRemoteAppTags({ dir: 'remote', title: 'Remote', theme: '#0b1120' })
  const { room: param } = useParams()
  const room = cleanRoomCode(param)
  useEffect(() => {
    const before = document.title
    document.title = room.length === 4 ? `Remote ${room}` : 'Phone remote'
    // A sideways swipe turns the slide; it must never be taken as the
    // browser's swipe-to-go-back, which would leave the remote mid-lesson.
    const root = document.documentElement
    const overscroll = root.style.overscrollBehaviorX
    root.style.overscrollBehaviorX = 'none'
    return () => {
      document.title = before
      root.style.overscrollBehaviorX = overscroll
    }
  }, [room])
  if (room.length !== 4) return <RoomEntry />
  return <RemoteRoom key={room} room={room} />
}

function Shell({ children, className = '' }) {
  return (
    <div className={`app-screen flex flex-col bg-[#0b1120] text-slate-100 font-sans select-none ${className}`} style={{ touchAction: 'manipulation' }}>
      {children}
    </div>
  )
}

function RoomEntry() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [code, setCode] = useState('')
  const [saved] = useState(() => cleanRoomCode(lastRoom(LAST_ROOM_KEY)))
  const go = (e) => {
    e.preventDefault()
    const c = cleanRoomCode(code)
    if (c.length === 4) navigate(`/remote/${c}`)
  }
  // The home-screen app starts here: straight back into the last room, unless
  // Mr Bowen asked for another code (?code=new).
  if (saved.length === 4 && params.get('code') !== 'new') return <Navigate to={`/remote/${saved}`} replace />
  return (
    <Shell className="items-center justify-center px-5">
      <form onSubmit={go} className="w-full max-w-sm rounded-3xl bg-white/5 border border-white/10 p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Smartphone className="w-7 h-7 text-[#1cb0f6]" strokeWidth={2.5} />
          <div className="text-xl font-black">Phone remote</div>
        </div>
        <p className="font-bold text-slate-300">Type the room code from the deck’s Phone remote panel.</p>
        <input
          className="w-full rounded-2xl bg-slate-900 border-2 border-white/15 focus:border-[#1cb0f6] outline-none px-4 py-3 text-center text-4xl font-black tracking-[0.3em] uppercase"
          value={code}
          onChange={(e) => setCode(cleanRoomCode(e.target.value))}
          placeholder="ABCD"
          autoCapitalize="characters"
          autoComplete="off"
          spellCheck={false}
        />
        <button type="submit" className="w-full rounded-2xl bg-[#1cb0f6] border-b-4 border-[#1899d6] py-3.5 font-black uppercase tracking-widest active:border-b-0 active:translate-y-1 transition-all">
          Join
        </button>
      </form>
    </Shell>
  )
}

function RemoteRoom({ room }) {
  const [host, setHost] = useState(null) // the laptop's last state, plus `at`, when it came
  const [net, setNet] = useState('connecting')
  const [sheet, setSheet] = useState(null) // 'slides' | 'timer' | null
  const [pickAt, setPickAt] = useState(0) // when a new name was last picked
  const busRef = useRef(null)
  const touch = useRef(null)
  const lastPick = useRef(undefined)
  const navigate = useNavigate()

  useEffect(() => { rememberRoom(LAST_ROOM_KEY, room) }, [room])

  // Quiet when the screen locks, paused after twenty minutes without a tap.
  const { visible, idle, active, now, poke } = usePresence()
  const wake = useWakeLock(active)

  // Connected only while the screen is on and in use. Closing on a lock and
  // opening afresh on unlock is also how a dropped connection recovers.
  useEffect(() => {
    if (!active) return undefined
    // `let`: the status callback below fires later and needs the bus it belongs to.
    let bus
    bus = openBus(`deck-${room}`, ME, (msg) => {
      if (msg.from !== 'deck' || msg.type !== 'state' || typeof msg.deck !== 'string') return
      // A new pick (not the one already showing when the phone connected)
      // flashes up top for a while.
      const c = msg.pick?.c ?? null
      if (lastPick.current !== undefined && c !== null && c !== lastPick.current) setPickAt(Date.now())
      lastPick.current = c
      setHost({ ...msg, at: Date.now() })
    }, (status) => {
      setNet(status)
      if (status === 'live') bus?.send('hello')
    })
    busRef.current = bus
    bus.send('hello')
    // The hello doubles as a heartbeat: the laptop answers each one with the
    // whole state, which also says it is still there.
    const beat = setInterval(() => bus.send('hello'), HELLO_MS)
    return () => {
      clearInterval(beat)
      bus.close()
      busRef.current = null
    }
  }, [active, room])

  const [course, slug] = (host?.deck || '').split('/')
  const lesson = useMemo(() => (course && slug ? getLesson(course, slug) : null), [course, slug])
  const notes = useMemo(() => planNotes(lesson?.plan), [lesson])

  const laptopLive = Boolean(host) && now - host.at < LAPTOP_GONE_MS
  const ready = laptopLive && Boolean(lesson)
  const i = host?.i ?? 0
  const n = host?.n ?? 0

  const send = (type, body = {}) => {
    if (!host) return
    buzz()
    busRef.current?.send(type, { deck: host.deck, ...body })
  }
  const next = () => { if (ready && i < n - 1) send('next') }
  const prev = () => { if (ready && i > 0) send('prev') }

  // Swipes. The laptop's answer to one swipe can redraw the slide under the
  // finger during the next, and a finger whose element is redrawn away loses
  // the end of its gesture. So once a gesture is plainly sideways, the swipe
  // area captures the pointer itself (a tap is never captured, so buttons
  // inside still work).
  const onSwipeDown = (e) => {
    touch.current = { id: e.pointerId, x: e.clientX, y: e.clientY, held: false }
  }
  const onSwipeMove = (e) => {
    const s = touch.current
    if (!s || s.id !== e.pointerId || s.held) return
    const dx = e.clientX - s.x
    if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(e.clientY - s.y)) {
      try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* pointer already gone */ }
      s.held = true
    }
  }
  const onSwipeUp = (e) => {
    const s = touch.current
    touch.current = null
    if (!s || s.id !== e.pointerId) return
    const dx = e.clientX - s.x
    const dy = e.clientY - s.y
    if (Math.abs(dx) > 60 && Math.abs(dx) > 1.5 * Math.abs(dy)) {
      if (dx < 0) next()
      else prev()
    }
  }

  let status
  if (net === 'offline') status = { tone: 'warn', icon: WifiOff, text: 'No internet' }
  // Just unlocked: presses made now are held until the channel is back.
  else if (net !== 'live' && host) status = { tone: 'wait', spin: true, text: 'Reconnecting…' }
  else if (laptopLive) status = { tone: 'ok', text: `Connected · ${room}` }
  else if (host) status = { tone: 'warn', text: 'Laptop not answering' }
  else status = { tone: 'wait', spin: true, text: net === 'live' ? `Looking for ${room}…` : 'Connecting…' }

  const slides = lesson?.slides || []
  const slide = slides[i]
  const timerLeft = host?.tl != null ? Math.max(0, Math.ceil((host.at + host.tl - now) / 1000)) : null

  const hasReveal = host?.rv !== null && host?.rv !== undefined
  const slideButtons = ready && Array.isArray(host.btns) ? host.btns : []
  const revealText = plain(slide?.reveal?.answer)
  const pickShown = Boolean(host?.pick) && now - pickAt < PICK_SHOWN_MS
  // A game with a phone screen of its own, and its state from the laptop.
  const GameScreen = ready && slide?.layout === 'game' && slide.remote && host.g ? slide.remote : null

  // The middle of the screen is for reading: the plan's lines for this slide,
  // its answers, and what the answer box will show. Where we are is pinned
  // above it; everything to press is pinned below it, in thumb reach.
  let body
  if (!host) {
    body = (
      <Notice icon={Loader2} spin title={`Looking for the laptop (room ${room})`}>
        On the laptop, open a deck and press <b>Phone remote</b>. The panel shows this room code.
        <button onClick={() => navigate('/remote?code=new')} className="block mx-auto mt-4 text-sm font-black text-[#5cc8fa] underline underline-offset-4">
          Use a different code
        </button>
      </Notice>
    )
  } else if (!lesson) {
    body = (
      <Notice icon={RotateCw} title="This phone has an older copy of the site">
        The laptop has a deck this phone does not know yet.
        <button onClick={() => window.location.reload()} className="mt-4 w-full rounded-2xl bg-[#1cb0f6] border-b-4 border-[#1899d6] py-3 font-black uppercase tracking-widest">Reload</button>
      </Notice>
    )
  } else {
    const here = notes.get(i + 1)
    const empty = !here?.plan.length && !here?.answers.length && !revealText
    body = (
      <div key={i} className="space-y-3 py-3 animate-in fade-in duration-300">
        {here?.plan.map((p, k) => <Note key={`p${k}`} label={`Plan · ${p.when}`} text={p.text} />)}
        {here?.answers.map((a, k) => <Note key={`a${k}`} tone="answer" label={a.label ? `Answer · ${a.label}` : 'Answer'} text={a.text} />)}
        {revealText && <Note tone="reveal" label="In the answer box" text={revealText} />}
        {empty && <p className="pt-8 text-center text-sm font-bold text-slate-500">No notes for this slide in the plan.</p>}
      </div>
    )
  }

  const statusTone = { ok: 'text-[#7ee03b]', warn: 'text-amber-300', wait: 'text-slate-400' }[status.tone]
  const StatusIcon = status.icon || (status.spin ? Loader2 : null)

  // What has to be said whatever is on the slide.
  const banners = (
    <>
      {!laptopLive && (
        <Banner tone="warn" icon={WifiOff}>The laptop stopped answering. Is the deck still open, with Phone remote on?</Banner>
      )}
      {laptopLive && host.blank && (
        <Banner tone="warn" icon={EyeOff} action={{ label: 'Show slide', onClick: () => send('blank', { on: false }) }}>
          The screen is blank.
        </Banner>
      )}
      {laptopLive && !host.proj && (
        <Banner tone="info" icon={MonitorUp} action={{ label: 'Full screen', onClick: () => send('proj', { on: true }) }}>
          The projector shows the toolbars.
        </Banner>
      )}
      {pickShown && <PickFlash pick={host.pick} onClose={() => setPickAt(0)} />}
    </>
  )
  // The deck's tools. A deck that is only a game has no slides to jump between.
  const slidesTool = !GameScreen || n > 1
  const tools = (
    <div className={`grid gap-2 ${slidesTool ? 'grid-cols-4' : 'grid-cols-3'}`}>
      <Tool icon={Shuffle} label={host?.names === 0 ? 'No list' : 'Pick'} disabled={!ready || host.names === 0} onClick={() => send('pick')} />
      <Tool
        icon={host?.blank ? Eye : EyeOff}
        label={host?.blank ? 'Show' : 'Blank'}
        on={Boolean(host?.blank)}
        disabled={!ready}
        onClick={() => send('blank', { on: !host.blank })}
      />
      <Tool icon={Timer} label={timerLeft !== null ? clock(timerLeft) : 'Timer'} on={timerLeft !== null} disabled={!ready} onClick={() => setSheet('timer')} />
      {slidesTool && <Tool icon={ListOrdered} label="Slides" disabled={!ready} onClick={() => setSheet('slides')} />}
    </div>
  )
  const wakeNote = wake === 'unsupported' && (
    <p className="text-center text-[11px] font-bold text-slate-500">This browser cannot keep the screen on: tap now and then.</p>
  )

  return (
    <Shell>
      {/* data-wake: whether the screen is held on ('on' / 'off' / 'unsupported'), for checks. */}
      <div onPointerDown={poke} data-wake={wake} className="flex-1 min-h-0 flex flex-col">
        <header className="shrink-0 px-4 pt-[max(env(safe-area-inset-top),0.75rem)] pb-2 flex items-center justify-between gap-3">
          <span className={`flex items-center gap-2 text-sm font-black ${statusTone}`}>
            {StatusIcon
              ? <StatusIcon className={`w-4 h-4 ${status.spin ? 'animate-spin' : ''}`} strokeWidth={3} />
              : <span className="w-2.5 h-2.5 rounded-full bg-[#58cc02] shadow-[0_0_0_4px_rgba(88,204,2,0.2)]" />}
            {status.text}
          </span>
          {ready && (
            <div className="flex items-center gap-2">
              {/* Full screen on the projector: on (blue) or off. */}
              <button
                onClick={() => send('proj', { on: !host.proj })}
                aria-label={host.proj ? 'Leave full screen' : 'Full screen'}
                className={`p-2 rounded-xl border ${host.proj ? 'bg-[#1cb0f6] border-[#1cb0f6] text-white' : 'bg-white/5 border-white/10 text-slate-300'}`}
              >
                {host.proj ? <Minimize2 className="w-4 h-4" strokeWidth={3} /> : <Maximize2 className="w-4 h-4" strokeWidth={3} />}
              </button>
              {host.langs?.length > 1 && <LangSwitch langs={host.langs} lang={host.lang} onPick={(l) => send('lang', { l })} />}
            </div>
          )}
        </header>

        {GameScreen ? (
          // The game's own screen. No swipe here: a sideways drag across a
          // board is a finger on its way to a tile, not a slide turn.
          <>
            {(host.blank || !host.proj || pickShown) && (
              <section className="shrink-0 px-4 pb-3 space-y-2.5">{banners}</section>
            )}
            <Suspense fallback={<div className="flex-1 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-500" strokeWidth={2.5} /></div>}>
              <GameScreen
                state={host.g}
                act={(a) => send('game', { a })}
                at={host.at}
                now={now}
                tools={(
                  <>
                    {tools}
                    {n > 1 && (
                      <div className="grid grid-cols-2 gap-2">
                        <button onClick={prev} disabled={i === 0} className="h-12 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center gap-1 text-sm font-black uppercase tracking-widest text-slate-200 active:bg-white/15 disabled:opacity-30">
                          <ChevronLeft className="w-5 h-5" strokeWidth={3} />Back
                        </button>
                        <button onClick={next} disabled={i >= n - 1} className="h-12 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center gap-1 text-sm font-black uppercase tracking-widest text-slate-200 active:bg-white/15 disabled:opacity-30">
                          Next<ChevronRight className="w-5 h-5" strokeWidth={3} />
                        </button>
                      </div>
                    )}
                    {wakeNote}
                  </>
                )}
              />
            </Suspense>
          </>
        ) : (
          <>
          {/* A sideways swipe anywhere from here to the controls turns the slide.
              pan-y: the browser scrolls the notes up and down, and leaves
              sideways swipes to us (never its swipe-to-go-back). */}
          <div
            className="flex-1 min-h-0 flex flex-col"
            style={{ touchAction: 'pan-y', overscrollBehaviorX: 'none' }}
            onPointerDown={onSwipeDown}
            onPointerMove={onSwipeMove}
            onPointerUp={onSwipeUp}
            onPointerCancel={() => { touch.current = null }}
          >
            {host && lesson && (
              <section className="shrink-0 px-4 pb-3 space-y-2.5 border-b border-white/10">
                <div key={i} className="flex items-start gap-3 animate-in fade-in duration-300">
                  <div className="shrink-0 w-[4.25rem] rounded-2xl bg-white/[0.07] border border-white/10 py-2 text-center">
                    <div data-slide-number className="text-[2rem] font-black tabular-nums leading-none">{i + 1}</div>
                    <div className="mt-1 text-[11px] font-black text-slate-400 tabular-nums">of {n}</div>
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    {slide?.eyebrow && slide?.title && <div className="text-sm font-bold text-sky-300 truncate">{plain(slide.eyebrow)}</div>}
                    <h1 className="text-[1.45rem] font-black leading-tight tracking-tight line-clamp-2">{slideTitle(slide, i)}</h1>
                    <div className="mt-0.5 text-sm font-bold text-slate-400 truncate">
                      {i < n - 1 ? <>Next: <span className="text-slate-200">{slideTitle(slides[i + 1], i + 1)}</span></> : 'Last slide'}
                    </div>
                  </div>
                </div>
                {banners}
              </section>
            )}

            <main className="flex-1 min-h-0 overflow-y-auto px-4" style={{ touchAction: 'pan-y', overscrollBehaviorX: 'none' }}>
              {body}
            </main>
          </div>

          <footer className="shrink-0 px-4 pt-3 pb-[max(env(safe-area-inset-bottom),0.9rem)] border-t border-white/10 bg-[#0b1120] space-y-3">
            {ready && (slideButtons.length > 0 || hasReveal) && (
              <div className="space-y-2">
                {slideButtons.length > 0 && (
                  <div>
                    <div className="mb-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">On the slide</div>
                    <div className={`grid gap-2 ${slideButtons.length === 1 ? 'grid-cols-1' : slideButtons.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                      {slideButtons.map(([k, label, off]) => (
                        <button
                          key={k}
                          data-slide-button
                          disabled={Boolean(off)}
                          onClick={() => send('btn', { k })}
                          className="min-h-[3rem] rounded-xl bg-[#0087a8] border-b-4 border-[#00697f] px-2 py-1.5 font-black text-[0.8rem] uppercase tracking-wide leading-tight active:border-b-0 active:translate-y-1 transition-all disabled:opacity-30"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {hasReveal && (
                  <button
                    data-answer-box
                    onClick={() => send('reveal', { open: !host.rv })}
                    className={`w-full h-12 rounded-xl font-black uppercase tracking-widest text-sm transition-all active:scale-[0.98] ${host.rv ? 'bg-white/5 border border-white/20 text-slate-200' : 'bg-[#8b5cf6] border-b-4 border-[#6d3fd8] text-white'}`}
                  >
                    {host.rv ? 'Close the answer box' : 'Open the answer box'}
                  </button>
                )}
              </div>
            )}
            {tools}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={prev}
                disabled={!ready || i === 0}
                className="h-20 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center gap-1 font-black uppercase tracking-widest text-slate-200 active:bg-white/15 active:scale-[0.98] transition-all disabled:opacity-30"
              >
                <ChevronLeft className="w-7 h-7" strokeWidth={3} />
                Back
              </button>
              <button
                onClick={next}
                disabled={!ready || i >= n - 1}
                className="col-span-2 h-20 rounded-2xl bg-[#1cb0f6] border-b-[6px] border-[#1899d6] flex items-center justify-center gap-1 text-xl font-black uppercase tracking-widest text-white active:border-b-0 active:translate-y-1 transition-all disabled:opacity-30 disabled:border-b-0"
              >
                Next
                <ChevronRight className="w-8 h-8" strokeWidth={3} />
              </button>
            </div>
            {wakeNote}
          </footer>
          </>
        )}
      </div>

      {sheet === 'slides' && ready && (
        <SlidesSheet title={`${lesson.unit} · ${plain(lesson.title)}`} slides={slides} current={i} onClose={() => setSheet(null)} onGo={(k) => { send('go', { i: k }); setSheet(null) }} />
      )}
      {sheet === 'timer' && ready && (
        <TimerSheet
          running={timerLeft !== null}
          onClose={() => setSheet(null)}
          onSet={(mins) => { send('timer', { s: mins * 60 }); setSheet(null) }}
        />
      )}

      {visible && idle && <Paused onResume={poke} />}
    </Shell>
  )
}

function LangSwitch({ langs, lang, onPick }) {
  return (
    <div className="flex rounded-xl bg-white/5 border border-white/10 p-0.5">
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => onPick(l)}
          className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest ${lang === l ? 'bg-[#1cb0f6] text-white' : 'text-slate-400'}`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

function Card({ children }) {
  return <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-4">{children}</div>
}

function Notice({ icon: Icon, spin = false, title, children }) {
  return (
    <div className="mt-10 rounded-3xl bg-white/5 border border-white/10 p-6 text-center">
      <Icon className={`w-9 h-9 mx-auto text-[#1cb0f6] ${spin ? 'animate-spin' : ''}`} strokeWidth={2.5} />
      <div className="mt-3 text-lg font-black">{title}</div>
      <div className="mt-2 font-bold text-slate-400">{children}</div>
    </div>
  )
}

function Banner({ tone, icon: Icon, action, children }) {
  const tones = {
    warn: 'bg-amber-400/10 border-amber-300/30 text-amber-100',
    info: 'bg-sky-400/10 border-sky-300/25 text-sky-100',
  }
  return (
    <div className={`rounded-2xl border px-4 py-3 flex items-center gap-3 ${tones[tone]}`}>
      <Icon className="w-5 h-5 shrink-0" strokeWidth={2.5} />
      <div className="flex-1 text-sm font-bold leading-snug">{children}</div>
      {action && (
        <button onClick={action.onClick} className={`shrink-0 rounded-xl px-3 py-2 text-xs font-black uppercase tracking-widest active:scale-95 ${tone === 'warn' ? 'bg-amber-300 text-slate-950' : 'bg-[#1cb0f6] text-white'}`}>
          {action.label}
        </button>
      )}
    </div>
  )
}

/** A picked name, big, for a while after the pick. A tap puts it away. */
function PickFlash({ pick, onClose }) {
  return (
    <button onClick={onClose} className="w-full flex items-center gap-3 rounded-2xl bg-amber-300/10 border border-amber-300/30 px-4 py-2 text-left">
      <Shuffle className="w-5 h-5 shrink-0 text-amber-300" strokeWidth={2.75} />
      <span key={pick.c} className="min-w-0 flex-1 text-2xl font-black tracking-tight truncate animate-in zoom-in-95 fade-in duration-300">{pick.name}</span>
      <span className="shrink-0 text-xs font-black text-amber-200/80 tabular-nums">{pick.reset ? 'New round' : `${pick.left} left`}</span>
    </button>
  )
}

const NOTE_TONES = { plan: 'text-slate-400', answer: 'text-amber-300/90', reveal: 'text-violet-300' }

/** One thing to read: a line of the plan, an answer, or the answer box's text. */
function Note({ label, text, tone = 'plan' }) {
  return (
    <Card>
      <div className={`text-[11px] font-black uppercase tracking-widest ${NOTE_TONES[tone]}`}>{label}</div>
      <p className="mt-1 text-[1.02rem] leading-relaxed text-slate-100 whitespace-pre-line">{text}</p>
    </Card>
  )
}

function Tool({ icon: Icon, label, onClick, disabled = false, on = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-16 rounded-2xl border flex flex-col items-center justify-center gap-1 text-[11px] font-black uppercase tracking-widest tabular-nums transition-all active:scale-95 disabled:opacity-30 ${on ? 'bg-amber-300 border-amber-200 text-slate-950' : 'bg-white/5 border-white/15 text-slate-200 active:bg-white/15'}`}
    >
      <Icon className="w-5 h-5" strokeWidth={2.5} />
      {label}
    </button>
  )
}

function SlidesSheet({ title, slides, current, onGo, onClose }) {
  const currentRef = useRef(null)
  useEffect(() => { currentRef.current?.scrollIntoView({ block: 'center' }) }, [])
  return (
    <Sheet title={title} onClose={onClose}>
      <ol className="space-y-1">
        {slides.map((s, k) => (
          <li key={k}>
            <button
              ref={k === current ? currentRef : null}
              onClick={() => onGo(k)}
              className={`w-full flex items-center gap-3 rounded-2xl px-3 py-3 text-left active:bg-white/10 ${k === current ? 'bg-[#1cb0f6]/15 border border-[#1cb0f6]/40' : 'border border-transparent'}`}
            >
              <span className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black tabular-nums ${k === current ? 'bg-[#1cb0f6] text-white' : 'bg-white/10 text-slate-300'}`}>{k + 1}</span>
              <span className="min-w-0">
                <span className="block font-black leading-snug truncate">{slideTitle(s, k)}</span>
                {s.eyebrow && s.title && <span className="block text-xs font-bold text-slate-400 truncate">{plain(s.eyebrow)}</span>}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </Sheet>
  )
}

function TimerSheet({ running, onSet, onClose }) {
  return (
    <Sheet title="Timer on the projector" onClose={onClose}>
      <div className="grid grid-cols-2 gap-3 px-2 pb-2">
        {TIMER_MINUTES.map((m) => (
          <button
            key={m}
            onClick={() => onSet(m)}
            className="h-20 rounded-2xl bg-white/5 border border-white/15 text-2xl font-black active:bg-white/15 active:scale-[0.98] transition-all"
          >
            {m} min
          </button>
        ))}
        {running && (
          <button
            onClick={() => onSet(0)}
            className="col-span-2 h-14 rounded-2xl bg-rose-500/15 border border-rose-400/40 text-rose-200 font-black uppercase tracking-widest active:scale-[0.98] transition-all"
          >
            Stop the timer
          </button>
        )}
      </div>
    </Sheet>
  )
}
