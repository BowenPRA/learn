// src/lib/useDeckRemote.js
// The laptop's end of the phone remote. Deck owns the slides; this hook only
// carries them to Mr Bowen's phone and brings his requests back.
//
// Off until "Phone remote" is pressed, and the realtime code is not even
// downloaded before then (a dynamic import), because students open these decks
// on their own devices and none of them may connect by themselves. Once
// pressed it stays on in this tab until the tab closes (sessionStorage), so
// every deck opened that day connects; the room code is kept in localStorage,
// so the same phone link works every lesson.
//
// Messages are kept small and few, because the realtime project is The
// Current's, on the free plan: the phone says hello every 10 seconds and the
// laptop answers with the whole state (a slide index, a language, a few flags
// and short labels). Between hellos the laptop sends only when something
// changes, and only while a phone has been heard in the last 30 seconds.
import { useState, useEffect, useRef, useCallback } from 'react'
import { keptRoom, replaceRoom } from './remote/room.js'

const ROOM_KEY = 'classroom:deck-remote:room'
const ON_KEY = 'classroom:deck-remote:on' // sessionStorage: this tab only
const PHONE_GONE_MS = 30000

const readOn = () => {
  try { return sessionStorage.getItem(ON_KEY) === '1' } catch { return false }
}
const writeOn = (on) => {
  try {
    if (on) sessionStorage.setItem(ON_KEY, '1')
    else sessionStorage.removeItem(ON_KEY)
  } catch { /* storage blocked: on for this page only */ }
}

/** The phone's link for a room: this site, #/remote/<room>. */
export const remoteUrl = (room) => `${window.location.origin}${window.location.pathname}#/remote/${room}`

// A clock's end on this laptop, as the milliseconds left when it is sent.
const msLeft = (end) => (end ? Math.max(0, end - Date.now()) : null)

/**
 * @param {object} snapshot  what the phone shows: plain values only. A `t`
 *   field is the timer's end on this laptop's clock; it travels as `tl`, the
 *   milliseconds left, so the two clocks never need to agree. The game's own
 *   state (`g`) may carry a `t` of its own (a clue's countdown), sent the same way.
 * @param {(msg: object) => void} onRequest  a request from the phone
 * @returns {{ on, room, status, phones, start, stop, renew }}
 *   status: 'off' | 'connecting' | 'live' | 'offline'; phones: how many phones
 *   were heard in the last 30 seconds.
 */
export function useDeckRemote(snapshot, onRequest) {
  const [on, setOn] = useState(readOn)
  const [room, setRoom] = useState(() => (readOn() ? keptRoom(ROOM_KEY) : null))
  // Bumped by every start and new code, so a status from an older connection
  // is never shown for a newer one.
  const [session, setSession] = useState(0)
  const [net, setNet] = useState({ session: -1, status: 'connecting' })
  const [phones, setPhones] = useState(0)

  const busRef = useRef(null)
  const seen = useRef(new Map())
  const snapRef = useRef(snapshot)
  const requestRef = useRef(onRequest)
  const lastKey = useRef('')

  useEffect(() => { requestRef.current = onRequest })

  const sendState = useCallback(() => {
    const { t, g, ...rest } = snapRef.current
    let game = g ?? null
    if (game && 't' in game) {
      const { t: end, ...play } = game
      game = { ...play, tl: msLeft(end) }
    }
    busRef.current?.send('state', { ...rest, g: game, tl: msLeft(t) })
  }, [])

  const countPhones = useCallback(() => {
    const now = Date.now()
    for (const [from, at] of seen.current) if (now - at > PHONE_GONE_MS) seen.current.delete(from)
    setPhones(seen.current.size)
  }, [])

  useEffect(() => {
    if (!on || !room) return undefined
    let dead = false
    let bus = null
    const onMessage = (msg) => {
      if (!String(msg.from).startsWith('phone-')) return
      const fresh = !seen.current.has(msg.from)
      seen.current.set(msg.from, Date.now())
      if (fresh) countPhones()
      if (msg.type === 'hello') sendState()
      else requestRef.current?.(msg)
    }
    import('./remote/bus.js')
      .then(({ openBus }) => {
        if (dead) return
        bus = openBus(`deck-${room}`, 'deck', onMessage, (status) => setNet({ session, status }))
        busRef.current = bus
      })
      .catch(() => { if (!dead) setNet({ session, status: 'offline' }) })
    const tick = setInterval(countPhones, 5000)
    const known = seen.current
    return () => {
      dead = true
      clearInterval(tick)
      bus?.close()
      busRef.current = null
      known.clear()
    }
  }, [on, room, session, sendState, countPhones])

  // Push a change to the phone straight away, rather than at its next hello.
  const key = JSON.stringify(snapshot)
  useEffect(() => {
    snapRef.current = snapshot
    if (key === lastKey.current) return
    lastKey.current = key
    const now = Date.now()
    if ([...seen.current.values()].some((at) => now - at < PHONE_GONE_MS)) sendState()
  }, [key, snapshot, sendState])

  const start = useCallback(() => {
    if (on) return
    setRoom((r) => r || keptRoom(ROOM_KEY))
    setOn(true)
    setSession((s) => s + 1)
    writeOn(true)
  }, [on])
  const stop = useCallback(() => {
    setOn(false)
    setPhones(0)
    writeOn(false)
  }, [])
  // A fresh code locks out every phone holding the old one.
  const renew = useCallback(() => {
    setRoom(replaceRoom(ROOM_KEY))
    setSession((s) => s + 1)
    setPhones(0)
  }, [])

  const status = !on ? 'off' : net.session === session ? net.status : 'connecting'
  return { on, room, status, phones: on ? phones : 0, start, stop, renew }
}
