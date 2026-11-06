// The random-student picker's state. Lives in its own module (not beside the
// components in RandomStudent.jsx) so React Fast Refresh keeps working — a file
// that exports both components and a hook trips the only-export-components rule.
//
// The roster is saved on THIS DEVICE (localStorage) and nowhere else, so the
// classroom machine keeps Mr Bowen's list and it never leaves the room. Every
// read and write is wrapped, because localStorage throws in private windows and
// in the thumbnail/preview contexts, and a picker that crashes the deck is worse
// than one that forgets the list.
//
// "No repeats" is the point of the tool over a mental coin-flip: it draws
// without replacement until everyone has had a turn, so the quiet students get
// called on as often as the loud ones. That round-state is in-memory only —
// reloading starts a fresh round, which is the right behaviour for a new lesson.
import { useState, useCallback } from 'react'

const STORAGE_KEY = 'classroom:student-roster'

// Fired on window whenever the roster is saved, so anything else that reads the
// class list (the poster task's topic board) can follow an edit made in the
// picker's modal without a reload. `storage` events only reach OTHER tabs.
export const ROSTER_EVENT = 'classroom:roster-changed'

/** Read the saved roster. Never throws; returns [] when storage is unavailable. */
export function loadRoster() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw).filter((n) => typeof n === 'string' && n.trim())
  } catch {
    return []
  }
}

/** Persist the roster. Never throws. */
function saveRoster(names) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(names))
  } catch {
    /* private window / storage blocked — the list simply won't persist */
  }
  try {
    window.dispatchEvent(new Event(ROSTER_EVENT))
  } catch {
    /* no window (never in the app) — nothing is listening anyway */
  }
}

/**
 * The picker's state, owned by Deck so it survives slide changes and is shared
 * by every trigger. Returns the roster, the current pick, the round state and
 * the actions on them.
 */
export function useStudentPicker() {
  const [names, setNames] = useState(loadRoster)
  const [current, setCurrent] = useState(null)
  const [pickedThisRound, setPickedThisRound] = useState([])
  const [noRepeat, setNoRepeat] = useState(true)
  const [justReset, setJustReset] = useState(false)
  // Bumped on every draw so a repeat of the same name still re-animates.
  const [pickCount, setPickCount] = useState(0)

  const draw = useCallback(() => {
    if (!names.length) return false
    let pool = names
    let resetting = false
    if (noRepeat) {
      pool = names.filter((n) => !pickedThisRound.includes(n))
      if (!pool.length) {
        // Everyone has had a turn — start a new round this same press.
        pool = names
        resetting = true
      }
    }
    const choice = pool[Math.floor(Math.random() * pool.length)]
    setCurrent(choice)
    setPickedThisRound(resetting ? [choice] : [...new Set([...pickedThisRound, choice])])
    setJustReset(resetting)
    setPickCount((c) => c + 1)
    return true
  }, [names, noRepeat, pickedThisRound])

  const newRound = useCallback(() => {
    setPickedThisRound([])
    setCurrent(null)
    setJustReset(false)
  }, [])

  const replaceRoster = useCallback((next) => {
    setNames(next)
    saveRoster(next)
    setPickedThisRound([])
    setCurrent(null)
    setJustReset(false)
  }, [])

  const toggleNoRepeat = useCallback((on) => {
    setNoRepeat(on)
    setPickedThisRound([])
    setCurrent(null)
    setJustReset(false)
  }, [])

  const remaining = noRepeat ? names.length - pickedThisRound.length : names.length
  return {
    names, current, pickedThisRound, noRepeat, justReset, pickCount, remaining,
    draw, newRound, replaceRoster, toggleNoRepeat,
  }
}

