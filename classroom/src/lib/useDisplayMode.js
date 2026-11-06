import { useState, useEffect, useCallback, useRef } from 'react'

// "Display mode" is what the class sees: no toolbars, type ~40% larger, the
// cursor hidden once the mouse stops. On a desktop or an iPad it is also real
// browser fullscreen. Where the Fullscreen API is missing or refused (an
// iPhone, an embedded frame) the same chrome-free view still works windowed,
// so the Full screen button never silently does nothing.
//
// iPadOS still spells the API with the WebKit prefix; both spellings are used.
const fullscreenElement = () => document.fullscreenElement || document.webkitFullscreenElement || null
const requestFullscreen = (el) => (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el)
const exitFullscreen = () => (document.exitFullscreen || document.webkitExitFullscreen)?.call(document)

/**
 * @param {React.RefObject<HTMLElement>} containerRef  the element to fill the screen
 * @param {{ idleMs?: number }} options  how long the pointer must rest before it hides
 */
export function useDisplayMode(containerRef, { idleMs = 3000 } = {}) {
  const [isDisplayMode, setIsDisplayMode] = useState(false)
  const [isIdle, setIsIdle] = useState(false)
  const pokeRef = useRef(null)

  // Leaving fullscreen by any route (Esc, the browser's own control, a system
  // gesture) also leaves display mode, so the toolbars come back.
  useEffect(() => {
    const onChange = () => { if (!fullscreenElement()) setIsDisplayMode(false) }
    document.addEventListener('fullscreenchange', onChange)
    document.addEventListener('webkitfullscreenchange', onChange)
    return () => {
      document.removeEventListener('fullscreenchange', onChange)
      document.removeEventListener('webkitfullscreenchange', onChange)
    }
  }, [])

  // Hide the cursor and the floating dock after a few idle seconds while
  // presenting. Any movement, key or touch brings them back.
  useEffect(() => {
    if (!isDisplayMode) return undefined
    let timeout
    const activity = (ms = idleMs) => {
      setIsIdle(false)
      clearTimeout(timeout)
      timeout = setTimeout(() => setIsIdle(true), ms)
    }
    const onActivity = () => activity()
    pokeRef.current = activity
    activity()
    window.addEventListener('mousemove', onActivity)
    window.addEventListener('keydown', onActivity)
    window.addEventListener('touchstart', onActivity)
    return () => {
      pokeRef.current = null
      clearTimeout(timeout)
      window.removeEventListener('mousemove', onActivity)
      window.removeEventListener('keydown', onActivity)
      window.removeEventListener('touchstart', onActivity)
    }
  }, [isDisplayMode, idleMs])

  // Show the dock for `ms` without a mouse: the phone remote's pick, so the
  // drawn name appears beside the Pick button as it does after R.
  const poke = useCallback((ms) => pokeRef.current?.(ms), [])

  // Display mode is switched on first and fullscreen asked for second, without
  // waiting on it: a request that is refused (no API, no user gesture, a frame
  // policy) or that never settles (some embedded browsers) must not leave the
  // button doing nothing. The request is still made synchronously, inside the
  // click or keypress that counts as the user gesture.
  //
  // `askBrowser: false` is the phone remote's route: a request from the phone
  // is not a user gesture, so the browser would refuse it anyway. Display mode
  // then fills the browser window, which is the whole screen once the laptop's
  // browser is in its own full screen (F11).
  const enter = useCallback((askBrowser = true) => {
    setIsDisplayMode(true)
    const el = containerRef.current
    if (!askBrowser || !el || fullscreenElement()) return
    const warn = (err) => console.warn('Fullscreen unavailable, showing display mode windowed:', err)
    try {
      requestFullscreen(el)?.catch?.(warn)
    } catch (err) {
      warn(err)
    }
  }, [containerRef])

  const exit = useCallback(async () => {
    if (fullscreenElement()) {
      try { await exitFullscreen() } catch { /* already gone */ }
    }
    setIsDisplayMode(false)
  }, [])

  const toggle = useCallback(() => (isDisplayMode ? exit() : enter()), [isDisplayMode, enter, exit])

  return { isDisplayMode, isIdle, enter, exit, toggle, poke }
}
