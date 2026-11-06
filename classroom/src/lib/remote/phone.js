// src/lib/remote/phone.js
// What every phone remote needs from the phone itself, shared by the decks'
// remote (src/remote/DeckRemote.jsx) and Guess Who's (src/guess-who/Remote.jsx):
// keep the screen on, go quiet when the screen locks or nobody has tapped for
// a long while, install to the home screen, and reopen the last room.
import { useCallback, useEffect, useState } from 'react'

// Twenty minutes without a tap pauses a remote: a phone left on the desk with
// its screen held on would otherwise say hello all afternoon.
export const PAUSE_AFTER_MS = 20 * 60 * 1000

/**
 * Whether the remote should be connected: `active` while the page is on screen
 * and has been tapped in the last `pauseAfter`. `now` ticks each second while
 * active; `poke()` counts as a tap (call it on every press, and to wake from a
 * pause). Unlocking the phone counts as a tap too.
 */
export function usePresence(pauseAfter = PAUSE_AFTER_MS) {
  const [visible, setVisible] = useState(() => document.visibilityState !== 'hidden')
  const [now, setNow] = useState(() => Date.now())
  const [lastTap, setLastTap] = useState(() => Date.now())

  const poke = useCallback(() => {
    const t = Date.now()
    setLastTap(t)
    setNow(t)
  }, [])

  useEffect(() => {
    const onVisibility = () => {
      const shown = document.visibilityState !== 'hidden'
      setVisible(shown)
      // Unlocking the phone is a tap: it must reconnect, not wake up paused.
      if (shown) poke()
    }
    document.addEventListener('visibilitychange', onVisibility)
    // iOS can bring a page back from its cache without a visibility change.
    window.addEventListener('pageshow', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pageshow', onVisibility)
    }
  }, [poke])

  const idle = now - lastTap > pauseAfter
  const active = visible && !idle

  useEffect(() => {
    if (!active) return undefined
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [active])

  return { visible, idle, active, now, poke }
}

/** Keep the screen on while `active`. Returns 'on', 'off' or 'unsupported'. */
export function useWakeLock(active) {
  const supported = typeof navigator !== 'undefined' && 'wakeLock' in navigator
  const [held, setHeld] = useState(false)
  useEffect(() => {
    if (!active || !supported) return undefined
    let lock = null
    let dead = false
    // The browser lets go by itself when the page is hidden; `active` turns
    // false then and true again on return, which asks again.
    navigator.wakeLock.request('screen').then((l) => {
      if (dead) { l.release().catch(() => {}); return }
      lock = l
      setHeld(true)
      l.addEventListener('release', () => { if (!dead) setHeld(false) })
    }).catch(() => { if (!dead) setHeld(false) })
    return () => {
      dead = true
      lock?.release().catch(() => {})
    }
  }, [active, supported])
  if (!supported) return 'unsupported'
  return held && active ? 'on' : 'off'
}

/**
 * A remote installs as its own app (Chrome: Add to Home screen): a full-screen
 * window with no address bar, opening on the last room. The manifest is added
 * on the remote's page only, so a student who saves a lesson to their home
 * screen still gets the lesson site. `dir` is the folder under public/ that
 * holds manifest.webmanifest and apple-180.png.
 */
export function useRemoteAppTags({ dir, title, theme }) {
  useEffect(() => {
    const base = import.meta.env.BASE_URL
    const tags = [
      ['link', { rel: 'manifest', href: `${base}${dir}/manifest.webmanifest` }],
      ['link', { rel: 'apple-touch-icon', href: `${base}${dir}/apple-180.png` }],
      ['meta', { name: 'theme-color', content: theme }],
      ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
      ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
      ['meta', { name: 'apple-mobile-web-app-title', content: title }],
    ].map(([tag, attrs]) => {
      const el = document.createElement(tag)
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
      document.head.appendChild(el)
      return el
    })
    return () => tags.forEach((el) => el.remove())
  }, [dir, title, theme])
}

/** The room saved under `key`, or ''. Wrapped: storage throws in private windows. */
export function lastRoom(key) {
  try { return localStorage.getItem(key) || '' } catch { return '' }
}

export function rememberRoom(key, room) {
  try { localStorage.setItem(key, room) } catch { /* storage blocked */ }
}

/** A short buzz for a press. */
export const buzz = (pattern = 12) => { try { navigator.vibrate?.(pattern) } catch { /* not on this phone */ } }
