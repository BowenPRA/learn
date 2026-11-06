// src/lib/deckControls.js
// The parts of a slide that the phone remote can reach, owned by Deck and
// handed down through context so the layouts and widgets need no new props:
//
//  - RevealContext: the current slide's answer box ("Check your answer"), open
//    or closed. Deck holds it, so the phone can open and close it; it closes
//    again whenever the slide changes, as it always has.
//  - SlideButtonsContext: the current slide's widget buttons. The shared `Btn`
//    (content/y7-science/U03_models/ui.jsx) registers itself here, so every
//    stepper built on it (Next step, Show, Undo …) can be pressed from the
//    phone with no change to the widget. Buttons outside the slide — the zoom
//    view, the toolbars — have no provider and register nothing.
//  - GameRemoteContext: a whole game on the slide (Jeopardy, Word Wall). A
//    board of thirty clues is not a row of buttons, so a game instead hands
//    Deck a small picture of where it stands (`useGameRemote`), Deck carries it
//    to the phone, and the phone's own screen for that game (the slide's
//    `remote`, drawn by src/remote/DeckRemote.jsx) sends back what to do.
//
// No provider (a page that is not a deck) means all three fall back to what
// they did before: a reveal keeps its own state, a button registers nowhere, a
// game publishes nothing.
import { createContext, useContext, useEffect, useId, useRef } from 'react'

export const RevealContext = createContext(null)
export const SlideButtonsContext = createContext(null)
export const GameRemoteContext = createContext(null)

// Longer labels are cut: the phone shows them on a button, and they travel in
// every state message.
const LABEL_MAX = 32

/**
 * The register Deck keeps of the current slide's buttons. `onChange` hears the
 * list as `[[id, label, disabled], …]` in the order the buttons sit on the
 * slide, and only when it really changed. The label is read from the button's
 * own text, so it follows the deck's language.
 */
export function createButtonRegistry(onChange) {
  const entries = new Map()
  let last = '[]'
  let queued = false
  const list = () =>
    [...entries.entries()]
      .filter(([, e]) => e.el?.isConnected)
      .sort(([, a], [, b]) => (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
      .map(([id, e]) => [id, e.el.textContent.trim().replace(/\s+/g, ' ').slice(0, LABEL_MAX), e.el.disabled ? 1 : 0])
      .filter(([, label]) => label)
  const flush = () => {
    queued = false
    const next = list()
    const key = JSON.stringify(next)
    if (key === last) return
    last = key
    onChange(next)
  }
  const changed = () => {
    if (queued) return
    queued = true
    queueMicrotask(flush)
  }
  return {
    set(id, el, press) { entries.set(id, { el, press }); changed() },
    remove(id) { entries.delete(id); changed() },
    changed,
    press(id) {
      const e = entries.get(id)
      if (e?.el?.isConnected && !e.el.disabled) e.press()
    },
  }
}

/** Register a widget button (its element and its click handler) with the slide. */
export function useSlideButton(ref, onClick) {
  const registry = useContext(SlideButtonsContext)
  const id = useId()
  const handler = useRef(onClick)
  useEffect(() => { handler.current = onClick })
  useEffect(() => {
    if (!registry || !ref.current) return undefined
    registry.set(id, ref.current, () => handler.current?.())
    return () => registry.remove(id)
  }, [registry, id, ref])
  // The label or the disabled state may change on any render; the registry
  // reports only a real change.
  useEffect(() => { registry?.changed() })
}

/**
 * The line Deck keeps open to the game on the current slide. `onState` hears
 * the game's state (null when no game is on the slide); `act` passes a request
 * from the phone to whichever game is listening.
 */
export function createGameChannel(onState) {
  let listener = null
  return {
    publish: onState,
    listen(fn) {
      listener = fn
      return () => { if (listener === fn) listener = null }
    },
    act(action) {
      if (action && typeof action === 'object' && typeof action.do === 'string') listener?.(action)
    },
  }
}

/**
 * Put a game on the phone remote. `state` is what the phone needs to draw the
 * game: plain values only — indexes, ids, flags and short strings, because it
 * travels in every state message. A `t` field is a clock's end on this
 * laptop, sent as the milliseconds left (src/lib/useDeckRemote.js). `onAction`
 * hears the phone's requests as `{ do: 'open', … }`; check each one against the
 * game as it stands, because a request can be a moment out of date.
 */
export function useGameRemote(state, onAction) {
  const channel = useContext(GameRemoteContext)
  const handler = useRef(onAction)
  const sent = useRef(null)
  useEffect(() => { handler.current = onAction })
  useEffect(() => {
    if (!channel) return undefined
    const off = channel.listen((action) => handler.current?.(action))
    return () => {
      off()
      sent.current = null
      channel.publish(null)
    }
  }, [channel])
  // A new object every render; only a real change goes to Deck (and so to the phone).
  const key = JSON.stringify(state)
  useEffect(() => {
    if (!channel || key === sent.current) return
    sent.current = key
    channel.publish(state)
  }, [channel, key, state])
}
