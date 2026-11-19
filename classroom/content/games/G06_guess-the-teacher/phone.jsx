// content/games/G06_guess-the-teacher/phone.jsx
// Guess the Teacher on a player's phone, at /classroom/#/play/<ROOM> (the QR
// code on the TV), or /classroom/#/play to type the code. No sign-in: parents
// have no PRA Learn login. A team picks a name and an animal, then for each
// teacher sees the emojis, types a name and locks it in: one guess, and no
// word of right or wrong until the reveal on the TV. Then the phone shows the
// answer, what the team said, its points and its place.
//
// English with a short Vietnamese line under it, for the parents.
//
// The phone never holds a teacher's name before the reveal: it sends what was
// typed, and the TV judges it and keeps the verdict (widgets.jsx). The team
// and its locked-in guess are remembered on this phone, so a reload or a
// locked screen comes back as the same team.
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { openBus } from '../../../src/lib/remote/bus.js'
import { cleanRoomCode } from '../../../src/lib/remote/room.js'
import { buzz, useWakeLock } from '../../../src/lib/remote/phone.js'
import { Avatar, BASE_CSS, Backdrop, Confetti } from './look.jsx'
import { AVATARS, MEDALS, NAME_MAX, SUSPENSE_MS, TOPIC, cleanName, loadFont, ordinal, pointsFor, shownAt } from './protocol.js'

const ME_KEY = 'learn:teacher-game:me'
const GUESS_KEY = 'learn:teacher-game:guess'
// No word from the TV in this long: the code is probably wrong.
const LOST_MS = 9000

const PHONE_CSS = `
.gp { position: fixed; inset: 0; display: flex; flex-direction: column }
.gp-in { position: relative; z-index: 1; flex: 1; min-height: 0; overflow-y: auto; width: 100%; max-width: 460px; margin: 0 auto;
  display: flex; flex-direction: column; gap: 14px; padding: max(12px, env(safe-area-inset-top)) 16px max(18px, env(safe-area-inset-bottom)) }
.gp-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; min-height: 44px }
.gp-logo { font-size: 23px }
.gp-me { display: inline-flex; align-items: center; gap: 8px; min-width: 0; background: rgba(255,255,255,.13); border: 1px solid rgba(255,255,255,.18);
  border-radius: 999px; padding: 4px 12px 4px 4px; font-weight: 700; font-size: 16px }
.gp-me span:last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap }
.gp-score { font-size: 17px; font-weight: 800; color: #fde047; white-space: nowrap; font-variant-numeric: tabular-nums }
.gp-card { background: #fff; color: #1e1b4b; border-radius: 22px; padding: 20px; box-shadow: 0 6px 0 #a5b4fc, 0 14px 30px rgba(0,0,0,.28) }
.gp-h { font-size: 26px; font-weight: 800; line-height: 1.08; margin: 0 }
.gp-vn { display: block; font-size: 15px; font-weight: 600; color: #6b7280; line-height: 1.3; margin-top: 2px }
.gp-dark .gp-vn, .gp-vn.d { color: #c7d2fe }
.gp-label { display: block; font-size: 17px; font-weight: 800; margin: 16px 0 8px }
.gp-label:first-child { margin-top: 0 }
.gp-label .gp-vn { display: inline; margin-left: 6px; font-size: 14px }
.gp-input { display: block; width: 100%; font: inherit; font-size: 22px; font-weight: 700; padding: 12px 16px; border-radius: 16px; border: 3px solid #c7d2fe;
  color: #1e1b4b; background: #fff; outline: none; transition: border-color .15s }
.gp-input:focus { border-color: #6366f1 }
.gp-input.bad { border-color: #ef4444 }
.gp-code { text-align: center; letter-spacing: .35em; text-transform: uppercase; font-size: 34px; font-weight: 800 }
.gp-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; margin-top: 14px; font: inherit; font-size: 23px; font-weight: 800;
  padding: 13px; border-radius: 16px; border: none; background: #fde047; color: #3b0764; box-shadow: 0 5px 0 #b45309; cursor: pointer }
.gp-btn:active { transform: translateY(5px); box-shadow: none }
.gp-btn:disabled { opacity: .45; cursor: default; transform: none; box-shadow: 0 5px 0 #b45309 }
.gp-btn.ghost { background: transparent; color: #e0e7ff; box-shadow: none; font-size: 16px; font-weight: 700; padding: 8px; margin-top: 4px; text-decoration: underline }
.gp-avatars { display: grid; grid-template-columns: repeat(6, 1fr); gap: 7px }
.gp-av { aspect-ratio: 1; border-radius: 14px; border: 3px solid transparent; background: #eef2ff; font-size: 27px; line-height: 1; padding: 0;
  display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform .12s }
.gp-av.on { border-color: #6366f1; background: #e0e7ff; transform: scale(1.08) }
.gp-note { border-radius: 14px; padding: 10px 14px; font-size: 16px; font-weight: 700; background: rgba(255,255,255,.14) }
.gp-note.warn { background: #fef3c7; color: #92400e }
.gp-status { text-align: center; font-size: 14px; font-weight: 700; color: #c7d2fe }
.gp-status i { display: inline-block; width: 9px; height: 9px; border-radius: 999px; margin-right: 6px; background: #fbbf24; vertical-align: 1px }
.gp-status.live i { background: #34d399 }
.gp-status.offline i { background: #ef4444 }
.gp-center { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 10px }
.gp-hero { font-size: 40px }
.gp-sub { font-size: 19px; font-weight: 700; color: #e0e7ff; margin: 0 }
.gp-roundbar { display: flex; align-items: center; justify-content: space-between; gap: 8px }
.gp-pill { display: inline-flex; align-items: center; gap: 6px; font-size: 15px; font-weight: 800; padding: 5px 12px; border-radius: 999px;
  background: rgba(255,255,255,.14) }
.gp-pill.hot { background: #fde047; color: #4c1d95 }
.gp-secs { font-size: 30px; font-weight: 800; font-variant-numeric: tabular-nums; min-width: 2ch; text-align: right }
.gp-timer { height: 12px; border-radius: 999px; background: rgba(255,255,255,.15); overflow: hidden }
.gp-timer i { display: block; height: 100%; border-radius: 999px; transition: width .25s linear, background .3s }
.gp-emojis { display: grid; gap: 8px }
.gp-emojis span { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; border-radius: 14px; background: #fff; font-size: min(9vw, 40px);
  line-height: 1; box-shadow: 0 4px 0 #c7d2fe }
.gp-emojis span.down { background: linear-gradient(145deg, #8b5cf6, #4f46e5); color: rgba(255,255,255,.6); font-weight: 800; box-shadow: 0 4px 0 #312e81 }
.gp-worth { margin-top: 12px; text-align: center; font-size: 15px; font-weight: 700; color: #6b7280 }
.gp-worth .gp-vn { font-size: 13px }
.gp-worth b { color: #4338ca }
.gp-good { background: linear-gradient(160deg, #34d399, #059669); color: #fff; text-align: center; box-shadow: 0 6px 0 #047857, 0 14px 30px rgba(0,0,0,.28) }
.gp-good .gp-vn, .gp-bad .gp-vn { color: rgba(255,255,255,.88) }
.gp-bad { background: linear-gradient(160deg, #94a3b8, #64748b); color: #fff; text-align: center; box-shadow: 0 6px 0 #475569, 0 14px 30px rgba(0,0,0,.28) }
.gp-tick { font-size: 64px; line-height: 1 }
.gp-locked { background: linear-gradient(160deg, #818cf8, #4f46e5); color: #fff; text-align: center; box-shadow: 0 6px 0 #3730a3, 0 14px 30px rgba(0,0,0,.28) }
.gp-locked .gp-vn { color: rgba(255,255,255,.85) }
.gp-said { margin: 12px auto 4px; display: inline-block; max-width: 100%; padding: 8px 16px; border-radius: 14px; background: rgba(255,255,255,.18);
  font-size: 26px; font-weight: 800; overflow-wrap: anywhere }
.gp-small { margin: 6px 0 0; font-size: 15px; font-weight: 700; opacity: .92 }
.gp-pts { font-size: 46px; font-weight: 800; line-height: 1; font-variant-numeric: tabular-nums }
.gp-answer { font-size: 44px; text-align: center }
.gp-place { font-size: 76px; line-height: 1 }
.gp-paused { position: fixed; inset: 0; z-index: 20; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
  background: rgba(13,8,51,.8); backdrop-filter: blur(5px); text-align: center; padding: 24px }
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

export default function TeacherGamePhone() {
  const { room: raw } = useParams()
  const room = cleanRoomCode(raw)
  useEffect(() => {
    loadFont()
    document.title = 'Guess the Teacher · PRA Learn'
  }, [])
  return (
    <div className="gt gp">
      <style>{BASE_CSS + PHONE_CSS}</style>
      <Backdrop count={10} />
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
      <div className="gp-head"><span className="gp-logo gt-title">Guess the Teacher 🤔</span></div>
      <div className="gp-center">
        <form
          className="gp-card"
          style={{ width: '100%' }}
          onSubmit={(e) => { e.preventDefault(); if (ok) navigate(`/play/${cleanRoomCode(code)}`) }}
        >
          <p className="gp-h">Game code</p>
          <span className="gp-vn">Mã trò chơi: xem trên TV</span>
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
          <button type="submit" className="gp-btn" disabled={!ok}>Go <span aria-hidden="true">▶</span></button>
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
      setNote('kicked')
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
        <Avatar emoji={me.avatar} color={row?.c || '#6366f1'} size="34px" />
        <span>{me.name}</span>
      </span>
      {row && s.phase !== 'lobby' && <span className="gp-score">{shownScore.toLocaleString('en-US')} pts</span>}
    </div>
  )
  const status = net !== 'live' && (
    <div className={`gp-status ${net}`}><i />{net === 'offline' ? 'No connection. Trying again…' : 'Connecting…'}<span className="gp-vn d">{net === 'offline' ? 'Mất kết nối. Đang thử lại…' : 'Đang kết nối…'}</span></div>
  )

  if (!s || !row) {
    return (
      <div className="gp-in">
        {head}
        <div className="gp-center">
          {lost ? (
            <div className="gp-card" style={{ width: '100%' }}>
              <p className="gp-h">No game with code {room}</p>
              <span className="gp-vn">Không tìm thấy trò chơi. Kiểm tra mã trên TV.</span>
              <button type="button" className="gp-btn" onClick={() => navigate('/play')}>Change code</button>
            </div>
          ) : (
            <>
              <span className="gt-blink" style={{ fontSize: 44 }}>📺</span>
              <p className="gp-sub">Finding the TV…</p>
              <span className="gp-vn d">Đang tìm TV…</span>
            </>
          )}
        </div>
        {status}
      </div>
    )
  }

  const elapsed = s.phase === 'round' && !s.paused ? s.elapsed + (now - stateAt) : s.elapsed
  const total = s.players.length
  // This team's guess for the teacher on screen, if it locked one in.
  const myGuess = mine && mine.gid === s.gid && mine.no === s.no && mine.pid === me.pid ? mine : null

  const lockIn = () => {
    const text = draft.trim().slice(0, 40)
    if (!text || s.phase !== 'round' || myGuess || row.l) return
    const left = Math.max(0, s.dur - elapsed)
    const g = { room, gid: s.gid, no: s.no, pid: me.pid, text, pts: pointsFor(left, s.double), sure: false }
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
        <Avatar emoji={me.avatar} color={row.c} size="120px" className="gt-bob" />
        <p className="gp-hero gt-title">You're in!</p>
        <span className="gp-vn d" style={{ fontSize: 17 }}>Bạn đã vào game!</span>
        <p className="gp-sub" style={{ marginTop: 12 }}>Watch the TV. The game starts soon.</p>
        <span className="gp-vn d">Hãy nhìn lên TV. Trò chơi sắp bắt đầu.</span>
        <p className="gp-sub" style={{ fontSize: 16, color: '#c7d2fe', marginTop: 8 }}>{total} {total === 1 ? 'team' : 'teams'} here · {total} đội</p>
        <button type="button" className="gp-btn ghost" onClick={() => setMe({ ...me, joined: false })}>Change name or animal</button>
      </div>
    )
  } else if (s.phase === 'intro') {
    body = (
      <div className="gp-center">
        <p className="gp-sub" style={{ letterSpacing: '.2em', textTransform: 'uppercase' }}>{s.no === s.count ? 'Last teacher' : 'Teacher'}</p>
        <p className="gt-title gt-stamp" style={{ fontSize: 120, margin: 0 }}>{s.no}</p>
        <p className="gp-sub">of {s.count}</p>
        {s.double && <span className="gp-pill hot gt-pulse" style={{ fontSize: 20, marginTop: 8 }}>×2 Double points!</span>}
        <p className="gp-sub" style={{ marginTop: 14 }}>Get ready!</p>
        <span className="gp-vn d">Chuẩn bị!</span>
      </div>
    )
  } else if (s.phase === 'round') {
    body = (
      <Round
        s={s}
        row={row}
        elapsed={elapsed}
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
  const ok = cleanName(name).length > 0
  return (
    <div className="gp-in">
      <div className="gp-head">
        <span className="gp-logo gt-title">Guess the Teacher 🤔</span>
        <span className="gp-pill">{room}</span>
      </div>
      {note === 'kicked' && (
        <div className="gp-note warn">The host took that name out. Please choose another name.<span className="gp-vn" style={{ color: '#b45309' }}>Vui lòng chọn tên khác.</span></div>
      )}
      {note === 'reset' && (
        <div className="gp-note">The TV has started a new game. Join again!<span className="gp-vn d">TV đã bắt đầu trò chơi mới. Hãy tham gia lại!</span></div>
      )}
      {lost && (
        <div className="gp-note warn">
          No game with code {room} yet. Check the code on the TV.
          <span className="gp-vn" style={{ color: '#b45309' }}>Chưa tìm thấy trò chơi. Kiểm tra mã trên TV.</span>
        </div>
      )}
      <form className="gp-card" onSubmit={(e) => { e.preventDefault(); if (ok) onJoin(name, avatar) }}>
        <label className="gp-label" htmlFor="gp-name">Team name <span className="gp-vn">Tên đội</span></label>
        <input
          id="gp-name"
          className="gp-input"
          value={name}
          maxLength={NAME_MAX + 4}
          onChange={(e) => setName(e.target.value)}
          placeholder="Minh & Mum"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="done"
        />
        <span className="gp-label">Your animal <span className="gp-vn">Chọn con vật</span></span>
        <div className="gp-avatars">
          {AVATARS.map((a) => (
            <button key={a} type="button" className={`gp-av ${a === avatar ? 'on' : ''}`} onClick={() => setAvatar(a)} aria-label={a} aria-pressed={a === avatar}>{a}</button>
          ))}
        </div>
        <button type="submit" className="gp-btn" disabled={!ok}>Join <span className="gp-vn" style={{ display: 'inline', color: '#6b21a8', fontSize: 16 }}>Tham gia</span></button>
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

function Round({ s, row, elapsed, guess, draft, onDraft, onLock, inputRef }) {
  const left = Math.max(0, s.dur - elapsed)
  const secs = Math.ceil(left / 1000)
  const color = secs > 10 ? '#34d399' : secs > 5 ? '#fbbf24' : '#f87171'
  const locked = Boolean(guess) || row.l
  const timeUp = left <= 0

  let card
  if (locked) {
    card = (
      <div className="gp-card gp-locked gt-pop">
        <div className="gp-tick">🔒</div>
        <p className="gp-h" style={{ marginTop: 6 }}>Locked in!</p>
        <span className="gp-vn">Đã chốt đáp án!</span>
        {guess && <div className="gp-said">{guess.text}</div>}
        <p className="gp-small">
          {guess && !guess.sure ? 'Sending to the TV…' : `If you're right: ${guess ? guess.pts : '?'} points`}
        </p>
        <p style={{ margin: '12px 0 0', fontWeight: 800 }}>Find out at the end!</p>
        <span className="gp-vn">Đáp án sẽ có ở cuối!</span>
      </div>
    )
  } else if (timeUp) {
    card = (
      <div className="gp-card gp-bad gt-pop">
        <div className="gp-tick">⏰</div>
        <p className="gp-h" style={{ marginTop: 6 }}>Time's up!</p>
        <span className="gp-vn">Hết giờ!</span>
      </div>
    )
  } else {
    card = (
      <form className="gp-card" onSubmit={(e) => { e.preventDefault(); onLock() }}>
        <p className="gp-h" style={{ fontSize: 22 }}>Who is this teacher?</p>
        <span className="gp-vn">Đây là giáo viên nào?</span>
        <input
          ref={inputRef}
          className="gp-input"
          style={{ marginTop: 12 }}
          value={draft}
          onChange={(e) => onDraft(e.target.value)}
          placeholder="Teacher's name · Tên giáo viên"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="words"
          spellCheck={false}
          enterKeyHint="done"
          maxLength={40}
          aria-label="The teacher's name"
        />
        <button type="submit" className="gp-btn" disabled={!draft.trim()}>🔒 Lock it in</button>
        <div className="gp-worth">
          One guess only. Lock in now for <b>{pointsFor(left, s.double)} points</b>
          <span className="gp-vn">Chỉ được đoán một lần. Chốt càng sớm, càng nhiều điểm.</span>
        </div>
      </form>
    )
  }

  return (
    <>
      <div className="gp-roundbar">
        <span className="gp-pill">Teacher {s.no} of {s.count}</span>
        {s.double && <span className="gp-pill hot">×2</span>}
        <span className="gp-secs" style={{ color }}>{secs}</span>
      </div>
      <div className="gp-timer"><i style={{ width: `${(left / s.dur) * 100}%`, background: color }} /></div>
      <Emojis emojis={s.emojis} shown={shownAt(elapsed, s.emojis.length)} />
      {card}
      {s.paused && (
        <div className="gp-paused">
          <p className="gt-title" style={{ fontSize: 54, margin: 0 }}>Paused</p>
          <p className="gp-sub">Look at the TV</p>
          <span className="gp-vn d">Hãy nhìn lên TV</span>
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

function Result({ s, row, guess, named }) {
  if (!named) {
    return (
      <div className="gp-center">
        <div style={{ width: '100%' }}><Emojis emojis={s.emojis} /></div>
        {guess && <p className="gp-sub" style={{ marginTop: 16 }}>You said: <b>{guess.text}</b></p>}
        <p className="gp-hero gt-title gt-blink" style={{ fontSize: 30, marginTop: 14 }}>And the teacher is…</p>
        <span className="gp-vn d">Và giáo viên đó là…</span>
      </div>
    )
  }
  const got = row.g != null
  const line = placeLine(row, s.players)
  const last = s.no >= s.count
  return (
    <div className="gp-center">
      {s.answer && (
        <>
          <p className="gp-sub" style={{ letterSpacing: '.2em', textTransform: 'uppercase', fontSize: 15 }}>It's · Đó là</p>
          <p className="gp-answer gt-title gt-stamp" style={{ margin: 0 }}>{s.answer}</p>
        </>
      )}
      <div className={`gp-card ${got ? 'gp-good' : 'gp-bad'} gt-rise`} style={{ width: '100%', marginTop: 10, animationDelay: '.3s' }}>
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
        <div className="gp-place">{row.s <= 0 ? '⏱️' : row.k <= 3 ? MEDALS[row.k - 1] : ordinal(row.k)}</div>
        <p className="gp-h" style={{ marginTop: 6 }}>{row.s.toLocaleString('en-US')} points</p>
        <p style={{ margin: '6px 0 0', fontWeight: 700 }}>{line.en}</p>
        <span className="gp-vn">{line.vn}</span>
      </div>
      <p className="gp-sub" style={{ fontSize: 15, color: '#c7d2fe' }}>
        {last ? 'Final results next' : 'Next teacher soon'}: watch the TV · Hãy nhìn lên TV
      </p>
    </div>
  )
}

function Final({ row, total }) {
  const top = row.k <= 3 && row.s > 0
  return (
    <div className="gp-center">
      <div className="gp-place gt-pop" style={{ fontSize: 110 }}>{top ? MEDALS[row.k - 1] : '🎉'}</div>
      <p className="gp-hero gt-title" style={{ margin: 0 }}>You came {ordinal(row.k)}!</p>
      <span className="gp-vn d" style={{ fontSize: 17 }}>Bạn đứng hạng {row.k} / {total}</span>
      <p className="gp-sub" style={{ marginTop: 8 }}>{row.s.toLocaleString('en-US')} points</p>
      <p className="gp-sub" style={{ marginTop: 16 }}>Thanks for playing!</p>
      <span className="gp-vn d">Cảm ơn bạn đã chơi!</span>
    </div>
  )
}
