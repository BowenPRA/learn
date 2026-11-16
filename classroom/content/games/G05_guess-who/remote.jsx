// content/games/G05_guess-who/remote.jsx
// Guess Who on Mr Bowen's phone: the deck's phone remote draws this while the
// game is on the projector (src/remote/DeckRemote.jsx, through the slide's
// `remote`). The laptop keeps the game (widgets.jsx); this screen draws the
// state it sends and asks it for things. Ported from BowenPRA/classroom
// src/guess-who/Remote.jsx on 16 Nov 2026, without its own room, sign-in and
// booth tally: the deck's remote already joins the room.
//
// The secret lives here and never on the projector. Mr Bowen picks it (or
// lets the phone pick at random), then answers each question YES or NO, sends
// a question back to be reworded, and can put any answer right. He sees the
// player about to make the final guess, and which card they are on.
//
// For the teacher only, so English only.
import { useEffect, useState } from 'react'
import {
  Check, X, Dices, Eye, RotateCcw, Home, MessageCircleQuestion, Undo2, Minus, Plus, Play, TriangleAlert, Hourglass, Trash2,
} from 'lucide-react'
import { Sheet } from '../../../src/lib/remote/Sheet.jsx'
import { GamePanel, MainButton, SideButton, ConfirmButton, Label, Panel } from '../../../src/remote/GamePanel.jsx'
import { buzz } from '../../../src/lib/remote/phone.js'
import { BOARDS, BOARD_IDS } from './boards.js'
import { cleanSteps, prizeFor, randomOf } from './rules.js'

const SHEET_LOOK = 'bg-slate-900 border-t border-white/10 text-white'
const name = (card) => card?.name[0] || '…'
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`

export default function GuessWhoRemote({ state, act, tools }) {
  const board = BOARDS[state.b] || BOARDS.animals
  const byId = new Map(board.cards.map((c) => [c.id, c]))
  if (state.ph === 'pick') return <PickScreen key={state.n} state={state} board={board} byId={byId} act={act} tools={tools} />
  if (state.ph === 'play') return <PlayScreen state={state} board={board} byId={byId} act={act} tools={tools} />
  if (state.ph === 'reveal') return <RevealScreen state={state} byId={byId} act={act} tools={tools} />
  return <LobbyScreen state={state} act={act} tools={tools} />
}

/** Deal → Secret → Play → Reveal, with this phase lit. */
function Steps({ phase }) {
  const phases = [['lobby', 'Deal'], ['pick', 'Secret'], ['play', 'Play'], ['reveal', 'Reveal']]
  const at = phases.findIndex(([p]) => p === phase)
  return (
    <div className="grid grid-cols-4 gap-1">
      {phases.map(([p, label], i) => (
        <span key={p} className={`rounded-lg py-1 text-center text-[11px] font-black uppercase tracking-widest ${i === at ? 'bg-[#1cb0f6] text-white' : i < at ? 'bg-white/10 text-slate-300' : 'bg-white/[0.04] text-slate-500'}`}>
          {label}
        </span>
      ))}
    </div>
  )
}

function Face({ card, className = '' }) {
  if (!card) return <span className={className} />
  if (card.pic) {
    return (
      <span className={`relative block overflow-hidden bg-slate-800 ${className}`}>
        <img src={card.pic} alt="" className="absolute inset-0 w-full h-full object-cover" style={card.at ? { objectPosition: card.at } : undefined} />
      </span>
    )
  }
  return <span className={`flex items-center justify-center bg-slate-800 ${className}`}><span className="text-[2.2rem] leading-none">{card.emoji}</span></span>
}

function Alert({ tone, icon: Icon, children }) {
  const tones = { rose: 'bg-rose-500/15 border-rose-400/40 text-rose-100', gold: 'bg-amber-400/15 border-amber-300/40 text-amber-100' }
  return (
    <div className={`flex items-start gap-2 rounded-xl border px-3 py-2 text-sm font-bold ${tones[tone]}`}>
      <Icon className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={3} />
      <span>{children}</span>
    </div>
  )
}

// ── Before the deal ─────────────────────────────────────────────────────────

function LobbyScreen({ state, act, tools }) {
  return (
    <GamePanel
      top={<Steps phase="lobby" />}
      tools={tools}
      actions={<MainButton tone="green" icon={Play} onClick={() => act({ do: 'deal' })}>Deal the cards</MainButton>}
    >
      <Label className="mb-1.5">Board</Label>
      <div className="space-y-1.5">
        {BOARD_IDS.map((id) => {
          const b = BOARDS[id]
          const on = state.b === id
          return (
            <button
              key={id}
              onClick={() => act({ do: 'board', b: id })}
              className={`w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left active:bg-white/10 border ${on ? 'bg-[#1cb0f6]/15 border-[#1cb0f6]/50' : 'bg-white/[0.04] border-white/10'}`}
            >
              <Face card={b.cards[id === 'animals' ? 12 : 0]} className="shrink-0 w-12 h-12 rounded-xl" />
              <span className="min-w-0 flex-1">
                <span className="block font-black leading-snug">{b.title[0]}</span>
                <span className="block text-xs font-bold text-slate-400 leading-snug">{id === 'animals' ? '36 animals, 24 a round: Science 4.4 and more' : '24 Halloween monsters'}</span>
              </span>
              {on && (
                <span className="shrink-0 w-7 h-7 rounded-lg bg-[#58cc02] flex items-center justify-center">
                  <Check className="w-4 h-4" strokeWidth={3.5} />
                </span>
              )}
            </button>
          )
        })}
      </div>
      <Label className="mt-4 mb-1.5">Riverbucks</Label>
      <StepsEditor key={(state.st || []).join()} steps={state.st || [4, 7, 9]} act={act} />
    </GamePanel>
  )
}

/** The most questions that still win 3, 2 and 1 Riverbucks. */
function StepsEditor({ steps, act }) {
  const [draft, setDraft] = useState(steps)
  const clean = cleanSteps(draft)
  const changed = clean && clean.join() !== steps.join()
  const nudge = (i, d) => setDraft((s) => s.map((n, k) => (k === i ? Math.max(1, Math.min(30, n + d)) : n)))
  return (
    <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-3 space-y-2">
      {[3, 2, 1].map((prize, i) => (
        <div key={prize} className="flex items-center gap-3">
          <span className="shrink-0 w-8 h-8 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center">{prize}</span>
          <span className="flex-1 text-sm font-bold text-slate-300">up to <b className="text-white text-base tabular-nums">{draft[i]}</b> questions</span>
          <button onClick={() => nudge(i, -1)} aria-label="One fewer" className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center active:scale-95">
            <Minus className="w-4 h-4" strokeWidth={3} />
          </button>
          <button onClick={() => nudge(i, 1)} aria-label="One more" className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center active:scale-95">
            <Plus className="w-4 h-4" strokeWidth={3} />
          </button>
        </div>
      ))}
      {!clean && <p className="text-xs font-bold text-rose-300">Each number must be bigger than the one above.</p>}
      {changed && (
        <button onClick={() => act({ do: 'steps', st: clean })} className="w-full h-11 rounded-xl bg-[#1cb0f6] border-b-4 border-[#1899d6] font-black uppercase tracking-widest text-sm active:border-b-0 active:translate-y-1">
          Use these
        </button>
      )}
    </div>
  )
}

// ── Choosing the secret ─────────────────────────────────────────────────────

function PickScreen({ state, board, byId, act, tools }) {
  const [chosen, setChosen] = useState(null)
  const cards = state.c || []
  const chosenCard = cards.includes(chosen) ? byId.get(chosen) : null
  const random = () => act({ do: 'pick', id: randomOf(cards) })
  return (
    <GamePanel
      top={(
        <>
          <Steps phase="pick" />
          <div className="text-sm font-bold text-slate-400">Tap the secret {board.thing[0][0]}. Only this phone sees it.</div>
        </>
      )}
      tools={tools}
      actions={(
        <>
          <div className="grid grid-cols-2 gap-2">
            <SideButton icon={Dices} onClick={random}>Random</SideButton>
            <ConfirmButton icon={Home} onConfirm={() => act({ do: 'lobby' })}>Start screen</ConfirmButton>
          </div>
          {chosenCard ? (
            <MainButton tone="green" icon={Play} onClick={() => act({ do: 'pick', id: chosen })}>Start with {name(chosenCard)}</MainButton>
          ) : (
            <MainButton tone="violet" icon={Dices} onClick={random}>Random secret</MainButton>
          )}
        </>
      )}
    >
      <div className="grid grid-cols-4 gap-1.5 pb-1">
        {cards.map((id) => {
          const card = byId.get(id)
          const on = chosen === id
          return (
            <button key={id} onClick={() => setChosen(id)} className={`min-w-0 rounded-xl overflow-hidden border-2 text-left ${on ? 'border-[#58cc02] bg-[#58cc02]/15' : 'border-white/10 bg-white/[0.04]'}`}>
              <Face card={card} className="w-full aspect-[4/3]" />
              <span className="block px-1 py-0.5 text-[11px] font-black leading-tight truncate">{name(card)}</span>
            </button>
          )
        })}
      </div>
    </GamePanel>
  )
}

// ── Playing ─────────────────────────────────────────────────────────────────

function PlayScreen({ state, board, byId, act, tools }) {
  const [sheet, setSheet] = useState(null) // 'end' | { fix: i } | null
  const [answeredAt, setAnsweredAt] = useState(null)
  const log = state.l || []
  const asked = log.length
  const down = state.d || []
  const secret = byId.get(state.s)
  const prize = prizeFor(asked, state.st || [4, 7, 9])
  const facesUp = (state.c || []).filter((id) => !down.includes(id)).length
  const secretDown = down.includes(state.s)
  const guessing = Boolean(state.gs)
  const considering = byId.get(state.cf)

  // Buzzes worth looking up for.
  useEffect(() => { if (state.p) buzz([60, 40, 60]) }, [state.p])
  useEffect(() => { if (secretDown) buzz([140, 70, 140]) }, [secretDown])
  useEffect(() => { if (guessing) buzz([40, 30, 40, 30, 40]) }, [guessing])

  // One press, one answer: YES and NO wait for the laptop to count it, so a
  // double tap cannot cost the class a question.
  const waiting = answeredAt !== null && answeredAt === asked
  useEffect(() => {
    if (answeredAt === null) return undefined
    const id = setTimeout(() => setAnsweredAt(null), 2500)
    return () => clearTimeout(id)
  }, [answeredAt])
  const answer = (a) => {
    if (waiting) return
    act({ do: 'answer', a })
    if (a !== 'again') setAnsweredAt(asked)
  }

  const fix = sheet?.fix
  const fixEntry = Number.isInteger(fix) ? log[fix] : null

  return (
    <>
      <GamePanel
        top={(
          <>
            <div className="flex items-center gap-3">
              <Face card={secret} className="shrink-0 w-20 h-16 rounded-xl" />
              <div className="min-w-0">
                <Label>The secret</Label>
                <div className="text-2xl font-black leading-tight truncate">{name(secret)}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-center">
              <Cell n={asked} label="Asked" />
              <Cell n={prize ? `${prize}` : '0'} label={prize ? 'Riverbucks now' : 'No Riverbucks'} gold={prize > 0} />
              <Cell n={facesUp} label={`${board.thing[0][1]} up`} />
            </div>
            {secretDown && <Alert tone="rose" icon={TriangleAlert}>They put down the secret {board.thing[0][0]}!</Alert>}
            {guessing && (
              <Alert tone="gold" icon={Hourglass}>
                Final guess coming{considering ? <>: they tapped <b>{name(considering)}</b></> : '.'}
              </Alert>
            )}
            {!secretDown && !guessing && facesUp === 1 && <Alert tone="gold" icon={Hourglass}>One left: expect a guess.</Alert>}
          </>
        )}
        tools={tools}
        actions={(
          <>
            {state.p && (
              <Panel label="Their question" tone="answer">
                <div className="text-lg font-black leading-snug">“{state.p}”</div>
              </Panel>
            )}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => answer('yes')}
                disabled={waiting || guessing}
                className="h-20 rounded-2xl bg-[#58cc02] border-b-[6px] border-[#46a302] flex items-center justify-center gap-2 text-2xl font-black active:border-b-0 active:translate-y-1 disabled:opacity-30"
              >
                <Check className="w-8 h-8" strokeWidth={3.5} />YES
              </button>
              <button
                onClick={() => answer('no')}
                disabled={waiting || guessing}
                className="h-20 rounded-2xl bg-[#ff4b4b] border-b-[6px] border-[#d33131] flex items-center justify-center gap-2 text-2xl font-black active:border-b-0 active:translate-y-1 disabled:opacity-30"
              >
                <X className="w-8 h-8" strokeWidth={3.5} />NO
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <SideButton icon={MessageCircleQuestion} disabled={!state.p || guessing} onClick={() => answer('again')} stacked>Reword</SideButton>
              <SideButton icon={Undo2} disabled={!asked} onClick={() => act({ do: 'undo' })} stacked>Undo last</SideButton>
              <SideButton icon={Eye} onClick={() => setSheet('end')} stacked>End game</SideButton>
            </div>
          </>
        )}
      >
        {asked ? (
          <>
            <ol className="space-y-1.5">
              {log.map(([q, a], i) => (
                <li key={i}>
                  <button onClick={() => setSheet({ fix: i })} className="w-full flex items-start gap-2 rounded-xl bg-white/[0.05] border border-white/10 px-2.5 py-2 text-left active:bg-white/10">
                    <span className="shrink-0 w-5 text-right text-sm font-black text-slate-500 tabular-nums">{i + 1}</span>
                    <span className={`flex-1 min-w-0 text-sm font-bold leading-snug ${q ? '' : 'italic text-slate-400'}`}>{q || 'Asked out loud'}</span>
                    <span className={`shrink-0 rounded-md px-1.5 text-xs font-black ${a === 'yes' ? 'bg-[#58cc02]' : 'bg-[#ff4b4b]'}`}>{a === 'yes' ? 'YES' : 'NO'}</span>
                  </button>
                </li>
              ))}
            </ol>
            <p className="mt-2 text-xs font-bold text-slate-500">Tap an answer to change it.</p>
          </>
        ) : (
          <p className="text-sm font-bold text-slate-500">Their questions show here. A question asked out loud: just tap YES or NO.</p>
        )}
      </GamePanel>

      {sheet === 'end' && (
        <Sheet title="End this game?" onClose={() => setSheet(null)} className={SHEET_LOOK}>
          <div className="space-y-2.5 px-2 pb-2">
            <Option icon={Eye} title="Show the answer" line="The projector shows the secret. No Riverbucks." onClick={() => { setSheet(null); act({ do: 'giveUp' }) }} />
            <Option icon={RotateCcw} title="Deal a new board" line="Starts again straight away, with no reveal." onClick={() => { setSheet(null); act({ do: 'deal' }) }} />
            <Option icon={Home} title="Back to the start screen" line="Choose the other board." onClick={() => { setSheet(null); act({ do: 'lobby' }) }} />
          </div>
        </Sheet>
      )}
      {fixEntry && (
        <Sheet title={`Answer ${fix + 1}`} onClose={() => setSheet(null)} className={SHEET_LOOK}>
          <div className="space-y-2.5 px-2 pb-2">
            <p className="px-1 font-bold text-slate-300">{fixEntry[0] ? `“${fixEntry[0]}”` : 'Asked out loud'}</p>
            <div className="grid grid-cols-2 gap-2">
              {['yes', 'no'].map((to) => (
                <button
                  key={to}
                  disabled={fixEntry[1] === to}
                  onClick={() => { setSheet(null); act({ do: 'fix', i: fix, q: fixEntry[0], a: fixEntry[1], to }) }}
                  className={`h-14 rounded-xl font-black text-lg disabled:opacity-30 ${to === 'yes' ? 'bg-[#58cc02]' : 'bg-[#ff4b4b]'}`}
                >
                  Make it {to === 'yes' ? 'YES' : 'NO'}
                </button>
              ))}
            </div>
            <Option icon={Trash2} title="Take this question out" line="It no longer counts." onClick={() => { setSheet(null); act({ do: 'fix', i: fix, q: fixEntry[0], a: fixEntry[1], to: null }) }} />
          </div>
        </Sheet>
      )}
    </>
  )
}

function Cell({ n, label, gold = false }) {
  return (
    <div className={`rounded-xl border px-1 py-1.5 ${gold ? 'bg-amber-400/15 border-amber-300/40' : 'bg-white/[0.06] border-white/10'}`}>
      <div className={`text-xl font-black tabular-nums leading-none ${gold ? 'text-amber-300' : ''}`}>{n}</div>
      <div className="mt-1 text-[10px] font-black uppercase tracking-wider text-slate-400 leading-tight">{label}</div>
    </div>
  )
}

function Option({ icon: Icon, title, line, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/10 px-3.5 py-3 text-left active:bg-white/10">
      <Icon className="w-6 h-6 shrink-0 text-slate-300" strokeWidth={2.5} />
      <span className="min-w-0">
        <span className="block font-black">{title}</span>
        <span className="block text-sm font-bold text-slate-400">{line}</span>
      </span>
    </button>
  )
}

// ── After the guess ─────────────────────────────────────────────────────────

function RevealScreen({ state, byId, act, tools }) {
  const asked = (state.l || []).length
  const won = state.g !== null && state.g === state.s
  const gaveUp = state.g === null
  const prize = won ? prizeFor(asked, state.st || [4, 7, 9]) : 0
  const secret = byId.get(state.s)
  const guess = byId.get(state.g)
  return (
    <GamePanel
      top={<Steps phase="reveal" />}
      tools={tools}
      actions={(
        <>
          <div className="grid">
            <ConfirmButton icon={Home} onConfirm={() => act({ do: 'lobby' })}>Start screen</ConfirmButton>
          </div>
          <MainButton tone="green" icon={RotateCcw} onClick={() => act({ do: 'deal' })}>Next round</MainButton>
        </>
      )}
    >
      <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-4 text-center space-y-3">
        <div className={`text-3xl font-black ${won ? 'text-[#7ee03b]' : gaveUp ? 'text-amber-300' : 'text-rose-300'}`}>
          {won ? 'Right!' : gaveUp ? 'Answer shown' : 'Wrong guess'}
        </div>
        <div className="flex justify-center gap-3">
          {!won && !gaveUp && (
            <div className="w-28">
              <Face card={guess} className="w-full aspect-[4/3] rounded-xl opacity-60" />
              <div className="mt-1 text-sm font-black truncate">Guess: {name(guess)}</div>
            </div>
          )}
          <div className="w-28">
            <Face card={secret} className="w-full aspect-[4/3] rounded-xl" />
            <div className="mt-1 text-sm font-black truncate">Secret: {name(secret)}</div>
          </div>
        </div>
        <div className="font-bold text-slate-300">
          {plural(asked, 'question')}{won ? (prize ? ` · ${plural(prize, 'Riverbuck')}` : ' · no Riverbucks') : ''}
        </div>
      </div>
    </GamePanel>
  )
}
