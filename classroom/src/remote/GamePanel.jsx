// src/remote/GamePanel.jsx
// The pieces a game's phone screen is built from (content/games/*/remote.jsx),
// so every game on the phone has the same three bands as a lesson: where the
// game stands, pinned at the top; the board to read and tap, scrolling in the
// middle; and the next thing to press, pinned at the bottom where a thumb
// reaches, under the deck's own tools (Pick, Blank, Timer).
//
// A game's screen is handed `{ state, act, at, now, tools }` by DeckRemote:
// the game's state as the laptop last sent it, `act({ do: … })` to ask the
// laptop for something, when that state arrived and the phone's clock (for
// countdowns), and the deck's tools row to place above the main button.
//
// For the teacher only, so English only.
import { createElement, useEffect, useState } from 'react'

// How long a "Tap again" waits for the second tap.
const CONFIRM_MS = 3000

export function GamePanel({ top, children, actions, tools }) {
  return (
    <>
      {top && <section className="shrink-0 px-4 pb-3 space-y-2.5 border-b border-white/10">{top}</section>}
      <main className="flex-1 min-h-0 overflow-y-auto px-4 py-3">{children}</main>
      <footer className="shrink-0 px-4 pt-3 pb-[max(env(safe-area-inset-bottom),0.9rem)] border-t border-white/10 bg-[#0b1120] space-y-2.5">
        {tools}
        {actions}
      </footer>
    </>
  )
}

const MAIN_TONES = {
  blue: 'bg-[#1cb0f6] border-[#1899d6] text-white',
  green: 'bg-[#58cc02] border-[#46a302] text-white',
  violet: 'bg-[#8b5cf6] border-[#6d3fd8] text-white',
  grey: 'bg-white/10 border-white/5 text-slate-200',
}

/** The one big button: what to press next. */
export function MainButton({ tone = 'blue', icon, children, onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      data-game-main
      className={`w-full h-16 rounded-2xl border-b-[6px] flex items-center justify-center gap-2 px-3 text-lg font-black uppercase tracking-wider leading-tight active:border-b-0 active:translate-y-1 transition-all disabled:opacity-30 disabled:border-b-0 ${MAIN_TONES[tone]}`}
    >
      {icon && createElement(icon, { className: 'w-6 h-6 shrink-0', strokeWidth: 3 })}
      <span className="min-w-0">{children}</span>
    </button>
  )
}

/**
 * A smaller button, in a row above the big one. `on` shows a switch that is
 * on; `stacked` puts the icon over the word, for four in a row.
 */
export function SideButton({ icon, children, onClick, disabled = false, on = false, danger = false, stacked = false }) {
  const look = on
    ? 'bg-amber-300 border-amber-200 text-slate-950'
    : danger
      ? 'bg-rose-500/15 border-rose-400/40 text-rose-200'
      : 'bg-white/5 border-white/15 text-slate-200 active:bg-white/15'
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`min-w-0 rounded-xl border flex items-center justify-center px-2 text-[11px] font-black uppercase tracking-widest leading-tight transition-all active:scale-95 disabled:opacity-30 ${stacked ? 'h-14 flex-col gap-1' : 'h-12 gap-1.5'} ${look}`}
    >
      {icon && createElement(icon, { className: 'w-4 h-4 shrink-0', strokeWidth: 2.75 })}
      <span className="min-w-0 truncate">{children}</span>
    </button>
  )
}

/**
 * A SideButton for something that ends the game on the projector (Finish,
 * back to the puzzles): the first tap asks, a second within three seconds does
 * it. A phone in a pocket or a passing elbow must not end a round.
 */
export function ConfirmButton({ icon, children, onConfirm, disabled = false }) {
  const [asking, setAsking] = useState(false)
  useEffect(() => {
    if (!asking) return undefined
    const id = setTimeout(() => setAsking(false), CONFIRM_MS)
    return () => clearTimeout(id)
  }, [asking])
  const tap = () => {
    if (!asking) { setAsking(true); return }
    setAsking(false)
    onConfirm()
  }
  return <SideButton icon={icon} on={asking} disabled={disabled} onClick={tap}>{asking ? 'Tap again' : children}</SideButton>
}

/** The small capitals over a group of things. */
export function Label({ children, className = '' }) {
  return <div className={`text-[10px] font-black uppercase tracking-[0.18em] text-slate-500 ${className}`}>{children}</div>
}

/** One thing to read. `tone` colours its label. */
export function Panel({ label, tone = 'plan', children }) {
  const tones = { plan: 'text-slate-400', answer: 'text-amber-300/90', shown: 'text-[#7ee03b]' }
  return (
    <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-4">
      {label && <div className={`text-[11px] font-black uppercase tracking-widest ${tones[tone]}`}>{label}</div>}
      <div className={label ? 'mt-1' : ''}>{children}</div>
    </div>
  )
}
