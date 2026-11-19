// content/games/G06_guess-the-teacher/phone.jsx
// Guess the Teacher on a player's phone, at /classroom/#/play/<ROOM> (the QR
// code on the TV), or /classroom/#/play to type the code. No sign-in: parents
// have no PRA Learn login. A team picks a name and an animal, then for each
// teacher sees the emojis, types a name and locks it in: one guess, and no
// word of right or wrong until the reveal on the TV. Then the phone shows the
// teacher's portrait from pra.edu.vn, the answer, what the team said, its
// points and its place.
//
// English with a short Vietnamese line under it, for the parents. The look is
// the website's, as on the TV (look.jsx).
//
// The phone never holds a teacher's name before the reveal: it sends what was
// typed, and the TV judges it and keeps the verdict (widgets.jsx). The team
// and its locked-in guess are remembered on this phone, so a reload or a
// locked screen comes back as the same team.
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Lock, Timer } from 'lucide-react'
import { openBus } from '../../../src/lib/remote/bus.js'
import { cleanRoomCode } from '../../../src/lib/remote/room.js'
import { buzz, useWakeLock } from '../../../src/lib/remote/phone.js'
import { Avatar, BASE_CSS, Backdrop, Confetti, Portrait } from './look.jsx'
import { AVATARS, NAME_MAX, SUSPENSE_MS, TOPIC, cardsUp, cleanName, ordinal, pointsFor } from './protocol.js'
import { isRude } from './words.js'

const ME_KEY = 'learn:teacher-game:me'
const GUESS_KEY = 'learn:teacher-game:guess'
// No word from the TV in this long: the code is probably wrong.
const LOST_MS = 9000

const PHONE_CSS = `
.gp { position: fixed; inset: 0; display: flex; flex-direction: column; --vn-font: 'Be Vietnam Pro', Poppins, system-ui, sans-serif }
.gp-in { position: relative; z-index: 1; flex: 1; min-height: 0; overflow-y: auto; width: 100%; max-width: 460px; margin: 0 auto;
  display: flex; flex-direction: column; gap: 14px; padding: max(12px, env(safe-area-inset-top)) 16px max(18px, env(safe-area-inset-bottom)) }
.gp-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; min-height: 48px; padding: 6px 8px 6px 14px;
  background: rgba(255,255,255,.94); border: 1px solid var(--line); border-radius: 999px; box-shadow: var(--shadow-sm) }
.gp-brand { display: flex; align-items: center; gap: 10px; min-width: 0 }
.gp-brand img { height: 26px; width: auto; display: block }
.gp-brand b { font-size: 15px; font-weight: 700; color: var(--blue-ink); padding-left: 10px; border-left: 2px solid var(--line); white-space: nowrap }
.gp-me { display: inline-flex; align-items: center; gap: 8px; min-width: 0; font-weight: 600; font-size: 16px; color: var(--blue-ink); margin-left: -8px }
.gp-me > span:last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap }
.gp-score { font-size: 15px; font-weight: 700; color: var(--blue-ink); background: var(--sun-pale); box-shadow: inset 0 0 0 1.5px var(--sun);
  border-radius: 999px; padding: 5px 12px; white-space: nowrap; font-variant-numeric: tabular-nums }
.gp-code-pill { font-size: 14px; font-weight: 700; letter-spacing: .12em; color: var(--blue-deep); background: var(--blue-tint); border-radius: 999px; padding: 5px 12px }
.gp-card { background: #fff; color: var(--ink); border: 1px solid var(--line); border-radius: 22px; padding: 20px; box-shadow: var(--shadow) }
.gp-h { font-size: 24px; font-weight: 800; line-height: 1.12; margin: 0; color: var(--blue-ink); letter-spacing: -.01em }
.gp-vn { display: block; font-size: 14.5px; line-height: 1.35; margin-top: 3px }
.gp-label { display: block; font-size: 16px; font-weight: 700; color: var(--blue-ink); margin: 18px 0 8px }
.gp-label:first-child { margin-top: 0 }
.gp-label .gp-vn { display: inline; margin-left: 6px; font-size: 13.5px }
.gp-input { display: block; width: 100%; font: inherit; font-family: var(--vn-font); font-size: 21px; font-weight: 600; padding: 12px 16px; border-radius: 14px;
  border: 2px solid var(--line); color: var(--ink); background: #fff; outline: none; transition: border-color .15s, box-shadow .15s }
.gp-input:focus { border-color: var(--blue); box-shadow: 0 0 0 4px var(--blue-tint) }
.gp-input.bad, .gp-input.bad:focus { border-color: var(--coral-deep); box-shadow: 0 0 0 4px var(--coral-pale) }
.gp-hint { margin: 8px 0 0; font-size: 14.5px; font-weight: 600; color: var(--coral-deep) }
.gp-hint .gp-vn { color: var(--coral-deep) }
.gp-code { text-align: center; letter-spacing: .35em; text-transform: uppercase; font-family: inherit; font-size: 34px; font-weight: 800; color: var(--blue-ink) }
.gp-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; min-height: 56px; margin-top: 16px; font: inherit; font-size: 20px; font-weight: 700;
  padding: 12px; border-radius: 999px; border: none; background: var(--blue); color: #fff; box-shadow: 0 8px 20px rgba(17,109,255,.3); cursor: pointer;
  transition: background .2s, transform .2s var(--bounce) }
.gp-btn:active { transform: scale(.97) }
.gp-btn:disabled { opacity: .45; cursor: default; transform: none; box-shadow: none }
.gp-btn svg { width: 22px; height: 22px }
.gp-btn small { font-family: var(--vn-font); font-size: 15px; font-weight: 500; opacity: .85 }
.gp-btn.ghost { background: transparent; color: var(--blue-deep); box-shadow: none; font-size: 15px; font-weight: 600; min-height: 0; padding: 8px; margin-top: 2px;
  text-decoration: underline; text-underline-offset: 3px }
.gp-avatars { display: grid; grid-template-columns: repeat(6, 1fr); gap: 7px }
.gp-av { aspect-ratio: 1; border-radius: 14px; border: 2px solid transparent; background: var(--blue-pale); font-size: 26px; line-height: 1; padding: 0;
  display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform .2s var(--bounce), border-color .15s, background .15s }
.gp-av.on { border-color: var(--blue); background: #fff; transform: scale(1.08); box-shadow: 0 4px 12px rgba(17,109,255,.22) }
.gp-note { border-radius: 16px; padding: 12px 14px; font-size: 15px; font-weight: 600; background: #fff; border: 1px solid var(--line); color: var(--blue-ink) }
.gp-note.warn { background: var(--sun-pale); border-color: var(--sun-tint); color: var(--sun-ink) }
.gp-note.warn .gp-vn { color: var(--sun-ink) }
.gp-status { text-align: center; font-size: 13.5px; font-weight: 600; color: var(--ink-soft); margin: 0 }
.gp-status i { display: inline-block; width: 9px; height: 9px; border-radius: 999px; margin-right: 6px; background: var(--sun-deep); vertical-align: 1px }
.gp-status.live i { background: var(--green) }
.gp-status.offline i { background: var(--coral-deep) }
.gp-center { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 8px }
.gp-big { margin: 0; font-size: 38px; font-weight: 800; letter-spacing: -.03em; line-height: 1.05; color: var(--blue-ink) }
.gp-sub { font-size: 18px; font-weight: 600; color: var(--blue-ink); margin: 0 }
.gp-roundbar { display: flex; align-items: center; justify-content: space-between; gap: 8px }
.gp-pill { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; padding: 6px 13px; border-radius: 999px;
  background: #fff; border: 1px solid var(--line); color: var(--blue-ink) }
.gp-pill.hot { background: var(--sun); border-color: var(--sun); color: var(--sun-ink) }
.gp-secs { font-size: 30px; font-weight: 700; font-variant-numeric: tabular-nums; min-width: 2ch; text-align: right; color: var(--blue-ink); margin-left: auto }
.gp-timer { height: 10px; border-radius: 999px; background: #fff; box-shadow: inset 0 0 0 1px var(--line); overflow: hidden }
.gp-timer i { display: block; width: 100%; height: 100%; border-radius: 999px; transform-origin: left center; transition: background .4s; will-change: transform }
.gp-emojis { display: grid; gap: 8px }
.gp-emojis span { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; border-radius: 14px; background: #fff; border: 1px solid var(--line);
  font-size: min(9vw, 40px); line-height: 1; box-shadow: var(--shadow-sm) }
.gp-emojis span.down { background: linear-gradient(165deg, var(--blue), var(--teal)); border: none; color: rgba(255,255,255,.85); font-weight: 800; font-size: min(7vw, 28px) }
.gp-worth { margin-top: 12px; text-align: center; font-size: 14.5px; font-weight: 500; color: var(--ink-soft) }
.gp-worth .gp-vn { font-size: 13px }
.gp-worth b { color: var(--blue-ink); font-weight: 700 }
.gp-locked { background: linear-gradient(165deg, var(--blue), var(--blue-deep)); border: none; color: #fff; text-align: center; box-shadow: 0 14px 32px rgba(17,109,255,.3) }
.gp-locked .gp-h, .gp-good .gp-h, .gp-bad .gp-h { color: #fff }
.gp-locked .gp-vn, .gp-good .gp-vn, .gp-bad .gp-vn { color: rgba(255,255,255,.88) }
.gp-good { background: linear-gradient(165deg, var(--green), var(--green-deep)); border: none; color: #fff; text-align: center; box-shadow: 0 14px 32px rgba(47,125,20,.28) }
.gp-bad { background: linear-gradient(165deg, #6B7C93, #4A5A70); border: none; color: #fff; text-align: center }
.gp-badge { width: 60px; height: 60px; margin: 0 auto; border-radius: 50%; background: rgba(255,255,255,.18); display: flex; align-items: center; justify-content: center }
.gp-badge svg { width: 30px; height: 30px }
.gp-said { margin: 12px auto 4px; display: inline-block; max-width: 100%; padding: 8px 16px; border-radius: 14px; background: rgba(255,255,255,.18);
  font-family: var(--vn-font); font-size: 24px; font-weight: 700; overflow-wrap: anywhere }
.gp-small { margin: 6px 0 0; font-size: 14.5px; font-weight: 500; opacity: .92 }
.gp-small b { font-family: var(--vn-font) }
.gp-reveal { display: flex; align-items: center; gap: 16px; width: 100%; text-align: left }
.gp-reveal .gt-portrait { width: 118px; flex: none; --frame: 5px; --radius: 18px; --q: 40px; transform: rotate(-2deg) }
.gp-answer { margin: 6px 0 0; font-size: 34px; font-weight: 800; letter-spacing: -.03em; line-height: 1.02; color: var(--blue-ink); overflow-wrap: anywhere }
.gp-rank { width: 92px; height: 92px; margin: 0 auto; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 30px; font-weight: 800; letter-spacing: -.02em; color: var(--ink-soft); background: var(--row); box-shadow: inset 0 0 0 1px var(--line) }
.gp-rank.r1 { background: var(--sun); color: var(--sun-ink); box-shadow: 0 8px 20px rgba(245,166,35,.35) }
.gp-rank.r2 { background: #CFD8E3; color: #3B4A5E }
.gp-rank.r3 { background: #F4BC9A; color: #7A3412 }
.gp-rank.big { width: 132px; height: 132px; font-size: 42px }
.gp-paused { position: fixed; inset: 0; z-index: 20; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
  background: rgba(238,245,255,.84); backdrop-filter: blur(6px); text-align: center; padding: 24px }
`

const newPid = () => (globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`).slice(0, 36)
const randomAvatar = () => AVATARS[Math.floor(Math.random() * AVATARS.length)]

/** This phone's team for `room`: saved if it joined before, else a new one. */
function loadMe(room) {
  try {
    const saved = JSON.parse(localStorage.getItem(ME_KEY))
    if (saved?.room === room && saved.pid && saved.name) return { pid: saved.pid, name: saved.name, avatar: saved.avatar, joined: true }
    if (saved?.name) return { pid: newPid(), name: saved.name, avatar: saved.avatar || randomAvatar(), joined: false }
  } catch { /* nothing saved, or storage blocked */ }
  return { pid: newPid(), name: '', avatar: randomAvatar(), joined: false }
}

function saveMe(room, me) {
  try { localStorage.setItem(ME_KEY, JSON.stringify({ room, pid: me.pid, name: me.name, avatar: me.avatar })) } catch { /* storage blocked */ }
}

/** The logo and the game's name, along the top before a team has joined. */
function Brand({ children }) {
  return (
    <div className="gp-head">
      <span className="gp-brand">
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Palm River Academy" />
        <b>Guess the Teacher</b>
      </span>
      {children}
    </div>
  )
}

export default function TeacherGamePhone() {
  const { room: raw } = useParams()
  const room = cleanRoomCode(raw)
  useEffect(() => {
    document.title = 'Guess the Teacher · PRA Learn'
  }, [])
  return (
    <div className="gt gp">
      <style>{BASE_CSS + PHONE_CSS}</style>
      <Backdrop />
      {room.length === 4 ? <Player key={room} room={room} /> : <CodeEntry />}
    </div>
  )
}

function CodeEntry() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const ok = cleanRoomCode(code).length === 4
  return (
    <div className="gp-in">
      <Brand />
      <div className="gp-center">
        <form
          className="gp-card"
          style={{ width: '100%', textAlign: 'left' }}
          onSubmit={(e) => { e.preventDefault(); if (ok) navigate(`/play/${cleanRoomCode(code)}`) }}
        >
          <p className="gp-h">Game code</p>
          <span className="gp-vn gt-vn">Mã trò chơi: xem trên TV</span>
          <input
            className="gp-input gp-code"
            style={{ marginTop: 14 }}
            value={code}
            onChange={(e) => setCode(cleanRoomCode(e.target.value))}
            placeholder="ABCD"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="characters"
            spellCheck={false}
            enterKeyHint="go"
            aria-label="Game code"
          />
          <button type="submit" className="gp-btn" disabled={!ok}>Go</button>
        </form>
      </div>
    </div>
  )
}

/** The guess this phone locked in, kept through a reload: { room, gid, no, pid, text, pts, sure }. */
function loadGuess(room) {
  try {
    const g = JSON.parse(localStorage.getItem(GUESS_KEY))
    return g?.room === room ? g : null
  } catch {
    return null
  }
}

function saveGuess(g) {
  try { localStorage.setItem(GUESS_KEY, JSON.stringify(g)) } catch { /* storage blocked */ }
}

function Player({ room }) {
  const navigate = useNavigate()
  const [me, setMe] = useState(() => loadMe(room))
  const [s, setS] = useState(null) // the TV's last state
  const [stateAt, setStateAt] = useState(0) // when it arrived, on this phone's clock
  const [mine, setMine] = useState(() => loadGuess(room)) // this team's locked-in guess
  const [net, setNet] = useState('connecting')
  const [note, setNote] = useState(null) // 'kicked' | 'reset' | null
  const [lost, setLost] = useState(false)
  const [now, setNow] = useState(() => Date.now())
  const [draft, setDraft] = useState('')
  const busRef = useRef(null)
  const meRef = useRef(me)
  const mineRef = useRef(mine)
  const helloAt = useRef(0)
  const roundKey = useRef('')
  const guessRef = useRef(null)
  const [from] = useState(() => `phone-${newPid().slice(0, 8)}`)

  useEffect(() => { meRef.current = me }, [me])
  useEffect(() => {
    mineRef.current = mine
    if (mine) saveGuess(mine)
  }, [mine])
  useWakeLock(me.joined)

  const hello = useCallback(() => {
    const m = meRef.current
    if (!m.joined || !busRef.current) return
    helloAt.current = Date.now()
    busRef.current.send('hello', { pid: m.pid, name: m.name, avatar: m.avatar })
  }, [])

  // The locked-in guess, (re)sent until the TV says it has it.
  const sendMine = useCallback(() => {
    const g = mineRef.current
    if (!g || g.sure || !busRef.current) return
    busRef.current.send('guess', { pid: g.pid, no: g.no, text: g.text })
  }, [])

  const onMessage = useCallback((msg) => {
    const m = meRef.current
    if (msg.type === 'state') {
      setS(msg)
      setStateAt(Date.now())
      setLost(false)
      const key = `${msg.gid}:${msg.no}`
      if (key !== roundKey.current) {
        roundKey.current = key
        setDraft('')
      }
      // The TV lists this team as locked in: the guess arrived.
      const row = msg.players.find((p) => p.p === m.pid)
      if (row?.l) setMine((g) => (g && g.gid === msg.gid && g.no === msg.no && !g.sure ? { ...g, sure: true } : g))
      // The TV started again with new teams: back to the join screen, name kept.
      if (m.joined && !row && Date.now() - helloAt.current > 4000) {
        setMe({ ...m, pid: newPid(), joined: false })
        setNote('reset')
      }
    } else if (msg.type === 'locked' && msg.to === m.pid) {
      setMine((g) => (g && g.no === msg.no && !g.sure ? { ...g, sure: true } : g))
    } else if (msg.type === 'kick' && msg.to === m.pid) {
      try { localStorage.removeItem(ME_KEY) } catch { /* storage blocked */ }
      setMe({ pid: newPid(), name: '', avatar: m.avatar, joined: false })
      setNote(msg.why === 'name' ? 'rude' : 'kicked')
    }
  }, [])

  useEffect(() => {
    const bus = openBus(TOPIC(room), from, (msg) => onMessage(msg), (status) => {
      setNet(status)
      if (status === 'live') {
        hello()
        sendMine()
      }
    })
    busRef.current = bus
    hello()
    const onShow = () => {
      if (document.visibilityState === 'hidden') return
      hello()
      sendMine()
    }
    document.addEventListener('visibilitychange', onShow)
    window.addEventListener('pageshow', onShow)
    return () => {
      document.removeEventListener('visibilitychange', onShow)
      window.removeEventListener('pageshow', onShow)
      bus.close()
      busRef.current = null
    }
  }, [room, from, onMessage, hello, sendMine])

  const waiting = Boolean(mine && !mine.sure)
  useEffect(() => {
    if (!waiting) return undefined
    const t = setInterval(sendMine, 2500)
    return () => clearInterval(t)
  }, [waiting, sendMine])

  // No word from the TV at all: say so, and offer to change the code.
  useEffect(() => {
    if (s) return undefined
    const t = setTimeout(() => setLost(true), LOST_MS)
    return () => clearTimeout(t)
  }, [s])

  const fastTick = s?.phase === 'round' || s?.phase === 'reveal'
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), fastTick ? 200 : 1000)
    return () => clearInterval(t)
  }, [fastTick])

  const join = (name, avatar) => {
    const next = { ...meRef.current, name: cleanName(name), avatar, joined: true }
    meRef.current = next
    setMe(next)
    setNote(null)
    saveMe(room, next)
    hello()
  }

  if (!me.joined) {
    return (
      <JoinForm
        room={room}
        me={me}
        note={note}
        net={net}
        lost={lost && !s}
        onJoin={join}
        onChangeCode={() => navigate('/play')}
      />
    )
  }

  const row = s?.players.find((p) => p.p === me.pid)
  const since = s ? s.ago + (now - stateAt) : 0
  // At the reveal the points land on the TV after the drumroll; so do they here.
  const named = s?.phase === 'board' || (s?.phase === 'reveal' && since >= SUSPENSE_MS)
  const shownScore = row ? (s.phase === 'reveal' && !named ? row.s - (row.g || 0) : row.s) : 0
  const head = (
    <div className="gp-head">
      <span className="gp-me">
        <Avatar emoji={me.avatar} color={row?.c || 'var(--blue-tint)'} size="36px" />
        <span className="gt-team-name">{me.name}</span>
      </span>
      {row && s.phase !== 'lobby' && <span className="gp-score">{shownScore.toLocaleString('en-US')} pts</span>}
    </div>
  )
  const status = net !== 'live' && (
    <div className={`gp-status ${net}`}><i />{net === 'offline' ? 'No connection. Trying again…' : 'Connecting…'}<span className="gp-vn gt-vn">{net === 'offline' ? 'Mất kết nối. Đang thử lại…' : 'Đang kết nối…'}</span></div>
  )

  if (!s || !row) {
    return (
      <div className="gp-in">
        {head}
        <div className="gp-center">
          {lost ? (
            <div className="gp-card" style={{ width: '100%' }}>
              <p className="gp-h">No game with code {room}</p>
              <span className="gp-vn gt-vn">Không tìm thấy trò chơi. Kiểm tra mã trên TV.</span>
              <button type="button" className="gp-btn" onClick={() => navigate('/play')}>Change code</button>
            </div>
          ) : (
            <>
              <span className="gt-ellipsis" style={{ fontSize: 44, fontWeight: 800, color: 'var(--blue)', lineHeight: 0.6 }} aria-hidden="true"><i>•</i><i>•</i><i>•</i></span>
              <p className="gp-sub">Finding the TV…</p>
              <span className="gp-vn gt-vn">Đang tìm TV…</span>
            </>
          )}
        </div>
        {status}
      </div>
    )
  }

  // The clock stands still while paused, and once every team has locked in.
  const elapsed = s.phase === 'round' && !s.paused && s.allInAgo == null ? s.elapsed + (now - stateAt) : s.elapsed
  const total = s.players.length
  // This team's guess for the teacher on screen, if it locked one in.
  const myGuess = mine && mine.gid === s.gid && mine.no === s.no && mine.pid === me.pid ? mine : null

  const lockIn = () => {
    const text = draft.trim().slice(0, 40)
    if (!text || s.phase !== 'round' || myGuess || row.l) return
    const left = Math.max(0, s.dur - elapsed)
    const g = { room, gid: s.gid, no: s.no, pid: me.pid, text, pts: pointsFor(left, s.double, s.base), sure: false }
    mineRef.current = g
    setMine(g)
    busRef.current?.send('guess', { pid: g.pid, no: g.no, text })
    buzz([30, 40, 60])
    guessRef.current?.blur()
  }

  let body = null
  if (s.phase === 'lobby') {
    body = (
      <div className="gp-center">
        <Avatar emoji={me.avatar} color={row.c} size="112px" className="gt-pop" style={{ boxShadow: '0 0 0 6px #fff, var(--shadow)' }} />
        <p className="gp-big" style={{ marginTop: 18 }}>You're in!</p>
        <span className="gp-vn gt-vn" style={{ fontSize: 16 }}>Bạn đã vào game!</span>
        <p className="gp-sub" style={{ marginTop: 14 }}>Watch the TV. The game starts soon.</p>
        <span className="gp-vn gt-vn">Hãy nhìn lên TV. Trò chơi sắp bắt đầu.</span>
        <span className="gp-pill" style={{ marginTop: 10 }}>{total} {total === 1 ? 'team' : 'teams'} here · {total} đội</span>
        <button type="button" className="gp-btn ghost" onClick={() => setMe({ ...me, joined: false })}>Change name or animal</button>
      </div>
    )
  } else if (s.phase === 'intro') {
    body = (
      <div className="gp-center">
        <span className={`gt-eyebrow ${s.no === s.count ? 'sun' : ''}`} style={{ fontSize: 13 }}>{s.no === s.count ? 'Last teacher' : 'Next teacher'}</span>
        <p className="gt-stamp" style={{ fontSize: 120, fontWeight: 800, color: 'var(--blue)', margin: 0, lineHeight: 0.95, letterSpacing: '-.04em' }}>{s.no}</p>
        <p className="gp-sub" style={{ color: 'var(--ink-soft)' }}>of {s.count}</p>
        {s.double && <span className="gp-pill hot gt-pulse" style={{ fontSize: 18, marginTop: 8 }}>Double points ×2</span>}
        <p className="gp-sub" style={{ marginTop: 14 }}>Get ready!</p>
        <span className="gp-vn gt-vn">Chuẩn bị!</span>
      </div>
    )
  } else if (s.phase === 'round') {
    body = (
      <Round
        s={s}
        row={row}
        elapsed={elapsed}
        now={now}
        stateAt={stateAt}
        guess={myGuess}
        draft={draft}
        onDraft={setDraft}
        onLock={lockIn}
        inputRef={guessRef}
      />
    )
  } else if (s.phase === 'reveal' || s.phase === 'board') {
    body = <Result s={s} row={row} guess={myGuess} named={named} />
  } else if (s.phase === 'final') {
    body = <Final row={row} total={total} />
  }

  return (
    <div className="gp-in">
      {head}
      {body}
      {status}
      {s.phase === 'final' && row.k <= 3 && row.s > 0 && <Confetti rain count={60} seed={row.k} />}
    </div>
  )
}

function JoinForm({ room, me, note, net, lost, onJoin, onChangeCode }) {
  const [name, setName] = useState(me.name)
  const [avatar, setAvatar] = useState(me.avatar)
  // A rude name cannot join (words.js); the TV checks again.
  const rude = isRude(name)
  const ok = cleanName(name).length > 0 && !rude
  return (
    <div className="gp-in">
      <Brand><span className="gp-code-pill">{room}</span></Brand>
      {note === 'kicked' && (
        <div className="gp-note warn">The host took that name out. Please choose another name.<span className="gp-vn gt-vn">Vui lòng chọn tên khác.</span></div>
      )}
      {note === 'rude' && (
        <div className="gp-note warn">That team name is not allowed. Please choose another.<span className="gp-vn gt-vn">Tên đội này không được phép. Vui lòng chọn tên khác.</span></div>
      )}
      {note === 'reset' && (
        <div className="gp-note">The TV has started a new game. Join again!<span className="gp-vn gt-vn">TV đã bắt đầu trò chơi mới. Hãy tham gia lại!</span></div>
      )}
      {lost && (
        <div className="gp-note warn">
          No game with code {room} yet. Check the code on the TV.
          <span className="gp-vn gt-vn">Chưa tìm thấy trò chơi. Kiểm tra mã trên TV.</span>
        </div>
      )}
      <form className="gp-card" onSubmit={(e) => { e.preventDefault(); if (ok) onJoin(name, avatar) }}>
        <label className="gp-label" htmlFor="gp-name">Team name <span className="gp-vn gt-vn">Tên đội</span></label>
        <input
          id="gp-name"
          className={`gp-input ${rude ? 'bad' : ''}`}
          value={name}
          maxLength={NAME_MAX + 4}
          onChange={(e) => setName(e.target.value)}
          placeholder="Minh & Mum"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="done"
          aria-invalid={rude}
          aria-describedby={rude ? 'gp-name-hint' : undefined}
        />
        {rude && (
          <p className="gp-hint" id="gp-name-hint">
            Please choose a kinder team name.
            <span className="gp-vn gt-vn">Vui lòng chọn tên đội lịch sự hơn.</span>
          </p>
        )}
        <span className="gp-label">Your animal <span className="gp-vn gt-vn">Chọn con vật</span></span>
        <div className="gp-avatars">
          {AVATARS.map((a) => (
            <button key={a} type="button" className={`gp-av ${a === avatar ? 'on' : ''}`} onClick={() => setAvatar(a)} aria-label={a} aria-pressed={a === avatar}>{a}</button>
          ))}
        </div>
        <button type="submit" className="gp-btn" disabled={!ok}>Join <small>Tham gia</small></button>
      </form>
      <div className={`gp-status ${net}`}><i />{net === 'live' ? 'Connected' : net === 'offline' ? 'No connection' : 'Connecting…'}</div>
      <button type="button" className="gp-btn ghost" onClick={onChangeCode}>Different game code</button>
    </div>
  )
}

function Emojis({ emojis, shown = emojis.length }) {
  return (
    <div className="gp-emojis" style={{ gridTemplateColumns: `repeat(${Math.max(1, emojis.length)}, 1fr)` }}>
      {emojis.map((e, i) => (i < shown ? <span key={i} className="gt-pop">{e}</span> : <span key={i} className="down">?</span>))}
    </div>
  )
}

const clockColor = (secs) => (secs > 20 ? '#116DFF' : secs > 10 ? '#F5A623' : '#D2452F')

/** The time bar, shrinking on every screen frame rather than in steps (and on each re-render, should frames pause). */
function TimerBar({ s, stateAt, left }) {
  const barRef = useRef(null)
  const at = useRef({ s, stateAt })
  useEffect(() => { at.current = { s, stateAt } }, [s, stateAt])
  useEffect(() => {
    let frame = 0
    const draw = () => {
      const { s: st, stateAt: t0 } = at.current
      const elapsed = st.paused || st.allInAgo != null ? st.elapsed : st.elapsed + (Date.now() - t0)
      const ms = Math.max(0, st.dur - elapsed)
      if (barRef.current) barRef.current.style.transform = `scaleX(${ms / st.dur})`
      frame = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(frame)
  }, [])
  return <div className="gp-timer"><i ref={barRef} style={{ transform: `scaleX(${left / s.dur})`, background: clockColor(Math.ceil(left / 1000)) }} /></div>
}

function Round({ s, row, elapsed, now, stateAt, guess, draft, onDraft, onLock, inputRef }) {
  const left = Math.max(0, s.dur - elapsed)
  const secs = Math.ceil(left / 1000)
  const locked = Boolean(guess) || row.l
  const timeUp = left <= 0

  let card
  if (locked) {
    card = (
      <div className="gp-card gp-locked gt-pop">
        <div className="gp-badge"><Lock /></div>
        <p className="gp-h" style={{ marginTop: 10 }}>Locked in!</p>
        <span className="gp-vn">Đã chốt đáp án!</span>
        {guess && <div className="gp-said">{guess.text}</div>}
        <p className="gp-small">
          {guess && !guess.sure ? 'Sending to the TV…' : `If you're right: ${guess ? guess.pts : '?'} points`}
        </p>
        <p style={{ margin: '12px 0 0', fontWeight: 700 }}>Find out at the end!</p>
        <span className="gp-vn">Đáp án sẽ có ở cuối!</span>
      </div>
    )
  } else if (timeUp) {
    card = (
      <div className="gp-card gp-bad gt-pop">
        <div className="gp-badge"><Timer /></div>
        <p className="gp-h" style={{ marginTop: 10 }}>Time's up!</p>
        <span className="gp-vn">Hết giờ!</span>
      </div>
    )
  } else {
    card = (
      <form className="gp-card" onSubmit={(e) => { e.preventDefault(); onLock() }}>
        <p className="gp-h" style={{ fontSize: 21 }}>Who is this teacher?</p>
        <span className="gp-vn gt-vn">Đây là giáo viên nào?</span>
        <input
          ref={inputRef}
          className="gp-input"
          style={{ marginTop: 12 }}
          value={draft}
          onChange={(e) => onDraft(e.target.value)}
          placeholder="Teacher's name"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="words"
          spellCheck={false}
          enterKeyHint="done"
          maxLength={40}
          aria-label="The teacher's name"
        />
        <button type="submit" className="gp-btn" disabled={!draft.trim()}><Lock /> Lock it in</button>
        <div className="gp-worth">
          One guess only. Lock in now for <b>{pointsFor(left, s.double, s.base)} points</b>
          <span className="gp-vn gt-vn">Chỉ được đoán một lần. Chốt càng sớm, càng nhiều điểm.</span>
        </div>
      </form>
    )
  }

  return (
    <>
      <div className="gp-roundbar">
        <span className="gp-pill">Teacher {s.no} of {s.count}</span>
        {s.double && <span className="gp-pill hot">×2</span>}
        <span className="gp-secs" style={{ color: secs <= 10 ? clockColor(secs) : undefined }}>{secs}</span>
      </div>
      <TimerBar s={s} stateAt={stateAt} left={left} />
      <Emojis emojis={s.emojis} shown={cardsUp(elapsed, s.emojis.length, s.base, s.allInAgo == null ? null : s.allInAgo + (now - stateAt))} />
      {card}
      {s.paused && (
        <div className="gp-paused">
          <p className="gp-big" style={{ fontSize: 52 }}>Paused</p>
          <p className="gp-sub">Look at the TV</p>
          <span className="gp-vn gt-vn">Hãy nhìn lên TV</span>
        </div>
      )}
    </>
  )
}

function placeLine(row, players) {
  // No points yet: no place to boast or worry about.
  if (row.s <= 0) return { en: 'Get the next one!', vn: 'Cố lên ở lượt sau!' }
  if (row.k === 1) return { en: 'You are in the lead!', vn: 'Bạn đang dẫn đầu!' }
  const above = players.find((p) => p.k === row.k - 1)
  const gap = above ? above.s - row.s : 0
  if (!above || gap <= 0) return { en: `${ordinal(row.k)} of ${players.length}`, vn: `Hạng ${row.k} / ${players.length}` }
  return { en: `${gap.toLocaleString('en-US')} points behind ${above.a} ${above.n}`, vn: `Kém đội trên ${gap.toLocaleString('en-US')} điểm` }
}

/** A place as a circle: gold, silver and bronze for the top three. */
function Place({ row, big = false }) {
  const top = row.s > 0 && row.k <= 3
  return <div className={`gp-rank ${top ? `r${row.k}` : ''} ${big ? 'big' : ''}`}>{ordinal(row.k)}</div>
}

function Result({ s, row, guess, named }) {
  if (!named) {
    return (
      <div className="gp-center">
        <div style={{ width: '100%' }}><Emojis emojis={s.emojis} /></div>
        {guess && <p className="gp-sub" style={{ marginTop: 16, fontWeight: 500 }}>You said: <b className="gt-team-name">{guess.text}</b></p>}
        <p className="gp-big" style={{ fontSize: 30, marginTop: 14 }}>
          And the teacher is<span className="gt-ellipsis"><i>.</i><i>.</i><i>.</i></span>
        </p>
        <span className="gp-vn gt-vn">Và giáo viên đó là…</span>
      </div>
    )
  }
  const got = row.g != null
  const line = placeLine(row, s.players)
  const last = s.no >= s.count
  return (
    <div className="gp-center" style={{ gap: 12 }}>
      {s.answer && (
        <div className="gp-reveal">
          {s.pic && <Portrait src={s.pic.src} tone={s.pic.tone} className="gt-pop" />}
          <div style={{ minWidth: 0, flex: 1, textAlign: s.pic ? 'left' : 'center' }}>
            <span className="gt-eyebrow green" style={{ fontSize: 12 }}>It's · Đó là</span>
            <p className="gp-answer gt-stamp">{s.answer}</p>
          </div>
        </div>
      )}
      <div className={`gp-card ${got ? 'gp-good' : 'gp-bad'} gt-rise`} style={{ width: '100%', animationDelay: '.3s' }}>
        {guess && <p className="gp-small" style={{ margin: '0 0 4px' }}>You said: <b>{guess.text}</b></p>}
        {got ? (
          <>
            <p className="gp-h">Right! +{row.g}</p>
            <span className="gp-vn">Chính xác!</span>
          </>
        ) : row.l || guess ? (
          <>
            <p className="gp-h">Not this time</p>
            <span className="gp-vn">Lần này chưa đúng</span>
          </>
        ) : (
          <>
            <p className="gp-h">No answer locked in</p>
            <span className="gp-vn">Bạn chưa chốt đáp án</span>
          </>
        )}
      </div>
      <div className="gp-card gt-rise" style={{ width: '100%', animationDelay: '.6s', textAlign: 'center' }}>
        <Place row={row} />
        <p className="gp-h" style={{ marginTop: 10 }}>{row.s.toLocaleString('en-US')} points</p>
        <p style={{ margin: '6px 0 0', fontWeight: 600, color: 'var(--blue-ink)' }}>{line.en}</p>
        <span className="gp-vn gt-vn">{line.vn}</span>
      </div>
      <p className="gp-status">
        {last ? 'Final results next' : 'Next teacher soon'}: watch the TV · Hãy nhìn lên TV
      </p>
    </div>
  )
}

function Final({ row, total }) {
  return (
    <div className="gp-center">
      <div className="gt-pop"><Place row={row} big /></div>
      <p className="gp-big" style={{ marginTop: 14 }}>You came {ordinal(row.k)}!</p>
      <span className="gp-vn gt-vn" style={{ fontSize: 16 }}>Bạn đứng hạng {row.k} / {total}</span>
      <p className="gp-sub" style={{ marginTop: 8 }}>{row.s.toLocaleString('en-US')} points</p>
      <p className="gp-sub" style={{ marginTop: 16 }}>Thanks for playing!</p>
      <span className="gp-vn gt-vn">Cảm ơn bạn đã chơi!</span>
    </div>
  )
}
