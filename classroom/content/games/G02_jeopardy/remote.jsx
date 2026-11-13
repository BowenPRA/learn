// content/games/G02_jeopardy/remote.jsx
// Jeopardy on Mr Bowen's phone: the deck's phone remote draws this while the
// game is on the projector (src/remote/DeckRemote.jsx, through the slide's
// `remote`). The laptop keeps the game (widgets.jsx); this screen draws the
// state it sends and asks it for things.
//
// What the phone adds is the walk round the room. The board is in his hand, so
// a team calls "Forces for 300" and he taps it there. The clue opens with its
// answer on the phone only, so he can read the question aloud, listen to the
// arguing, and judge it without going back to the laptop. Then Show the
// answer, tap the teams that got it, Award.
//
// Team names are typed on the laptop; the phone picks the board, the number of
// teams, and corrects a score.
//
// For the teacher only, so English only.
import { useLayoutEffect, useRef, useState } from 'react'
import {
  Check, Eye, Flag, Pencil, Play, Minus, Plus, Timer, Pause, X, Trophy, Crown,
  RotateCcw, Users, RotateCw,
} from 'lucide-react'
import { Sheet } from '../../../src/lib/remote/Sheet.jsx'
import { GamePanel, MainButton, SideButton, ConfirmButton, Label, Panel } from '../../../src/remote/GamePanel.jsx'
import { BOARDS } from './boards.js'
import { TEAM_COLOURS, VALUES, MIN_TEAMS, MAX_TEAMS, SCORE_STEPS, cellKey } from './rules.js'

export default function JeopardyRemote({ state, act, at, now, tools }) {
  const [scoresOpen, setScoresOpen] = useState(false)
  const board = BOARDS[state.b]
  const teams = (state.tm || []).map(([name, score], i) => ({
    label: name || `Team ${i + 1}`,
    score,
    colour: TEAM_COLOURS[i % TEAM_COLOURS.length],
  }))

  if (!board) return <OlderCopy tools={tools} />

  let screen
  if (state.s === 'setup') screen = <SetupScreen state={state} teams={teams} act={act} tools={tools} />
  else if (state.s === 'final') screen = <FinalScreen teams={teams} act={act} tools={tools} />
  else if (state.o) screen = <ClueScreen state={state} board={board} teams={teams} act={act} at={at} now={now} tools={tools} />
  else screen = <BoardScreen state={state} board={board} teams={teams} act={act} tools={tools} onScores={() => setScoresOpen(true)} />

  return (
    <>
      {screen}
      {scoresOpen && state.s !== 'setup' && (
        <ScoresSheet teams={teams} act={act} onClose={() => setScoresOpen(false)} />
      )}
    </>
  )
}

function OlderCopy({ tools }) {
  return (
    <GamePanel tools={tools}>
      <div className="mt-10 rounded-3xl bg-white/5 border border-white/10 p-6 text-center">
        <RotateCw className="w-9 h-9 mx-auto text-[#1cb0f6]" strokeWidth={2.5} />
        <div className="mt-3 text-lg font-black">This phone has an older copy of the site</div>
        <p className="mt-2 font-bold text-slate-400">The laptop has a board this phone does not know yet.</p>
        <button onClick={() => window.location.reload()} className="mt-4 w-full rounded-2xl bg-[#1cb0f6] border-b-4 border-[#1899d6] py-3 font-black uppercase tracking-widest">Reload</button>
      </div>
    </GamePanel>
  )
}

function Heading({ title, line }) {
  return (
    <div className="min-w-0">
      <h1 className="text-[1.35rem] font-black leading-tight tracking-tight line-clamp-2">{title}</h1>
      {line && <div className="mt-0.5 text-sm font-bold text-slate-400">{line}</div>}
    </div>
  )
}

/** The teams and their scores, small, in their colours. */
function ScoreStrip({ teams }) {
  return (
    <div className={`grid gap-1.5 ${teams.length <= 4 ? 'grid-cols-2' : 'grid-cols-3'}`}>
      {teams.map((team, i) => (
        <div key={i} className="min-w-0 rounded-xl bg-white/[0.06] border border-white/10 border-l-[5px] px-2.5 py-1.5 flex items-center justify-between gap-2" style={{ borderLeftColor: team.colour }}>
          <span className="min-w-0 truncate text-sm font-black">{team.label}</span>
          <span className="shrink-0 text-base font-black tabular-nums" style={{ color: team.colour }}>{team.score}</span>
        </div>
      ))}
    </div>
  )
}

// ── Setup ───────────────────────────────────────────────────────────────────

function SetupScreen({ state, teams, act, tools }) {
  const n = teams.length
  return (
    <GamePanel
      top={<Heading title="Jeopardy" line="Choose a board, then start the game." />}
      tools={tools}
      actions={(
        <MainButton tone="green" icon={Play} disabled={n < MIN_TEAMS} onClick={() => act({ do: 'start' })}>
          Start the game
        </MainButton>
      )}
    >
      <Label className="mb-1.5">Teams</Label>
      <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => act({ do: 'teams', n: n - 1 })}
            disabled={n <= MIN_TEAMS}
            aria-label="One team fewer"
            className="shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center active:scale-95 disabled:opacity-30"
          >
            <Minus className="w-5 h-5" strokeWidth={3} />
          </button>
          <div className="flex-1 text-center text-xl font-black tabular-nums">{n} teams</div>
          <button
            onClick={() => act({ do: 'teams', n: n + 1 })}
            disabled={n >= MAX_TEAMS}
            aria-label="One more team"
            className="shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center active:scale-95 disabled:opacity-30"
          >
            <Plus className="w-5 h-5" strokeWidth={3} />
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {teams.map((team, i) => (
            <span key={i} className="max-w-full truncate rounded-lg px-2.5 py-1 text-sm font-black text-white" style={{ backgroundColor: team.colour }}>
              {team.label}
            </span>
          ))}
        </div>
        <p className="mt-2 text-xs font-bold text-slate-500">Type the team names on the laptop.</p>
      </div>

      <Label className="mt-4 mb-1.5">Board</Label>
      <div className="space-y-1.5 pb-1">
        {BOARDS.map((b, i) => {
          const on = i === state.b
          return (
            <button
              key={b.id}
              onClick={() => act({ do: 'board', i })}
              className={`w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left active:bg-white/10 border ${on ? 'bg-[#1cb0f6]/15 border-[#1cb0f6]/50' : 'bg-white/[0.04] border-white/10'}`}
            >
              <span className="shrink-0 w-3 self-stretch rounded-full" style={{ backgroundColor: b.accent }} />
              <span className="min-w-0 flex-1">
                <span className="block font-black leading-snug">{b.title}</span>
                <span className="block text-xs font-bold text-slate-400 leading-snug">{b.subtitle}</span>
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
    </GamePanel>
  )
}

// ── The board ───────────────────────────────────────────────────────────────

/**
 * A category name over its column. Six columns leave about 56px, and a word
 * like COMPOUNDS would break as COMPOUND / S, so the name is measured and set
 * smaller, half a pixel at a time, until its longest word fits. Measured, not
 * guessed from the letter count: an I is a third the width of an M. Again
 * once the web font has loaded, and when the phone turns.
 */
function CategoryName({ name }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const fit = () => {
      let px = 9.5
      el.style.fontSize = `${px}px`
      while (px > 6.5 && el.scrollWidth > el.clientWidth) {
        px -= 0.5
        el.style.fontSize = `${px}px`
      }
    }
    fit()
    let live = true
    document.fonts?.ready.then(() => { if (live) fit() })
    window.addEventListener('resize', fit)
    return () => {
      live = false
      window.removeEventListener('resize', fit)
    }
  }, [name])
  return <span ref={ref} className="block w-full font-black uppercase leading-tight text-[#ffd34d] [overflow-wrap:normal]">{name}</span>
}

function BoardScreen({ state, board, teams, act, tools, onScores }) {
  const used = new Set(state.u || [])
  const total = board.categories.length * VALUES.length
  const left = total - used.size
  return (
    <GamePanel
      top={(
        <>
          <Heading title={board.title} line={`${left} ${left === 1 ? 'clue' : 'clues'} left · tap one to open it`} />
          <ScoreStrip teams={teams} />
        </>
      )}
      tools={tools}
      actions={(
        <div className="grid grid-cols-2 gap-2">
          <SideButton icon={Pencil} onClick={onScores}>Fix a score</SideButton>
          <ConfirmButton icon={Flag} onConfirm={() => act({ do: 'finish' })}>Finish</ConfirmButton>
        </div>
      )}
    >
      {/* Navy and gold like the projector's, so a column on the phone is the
          column on the wall. */}
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${board.categories.length}, minmax(0, 1fr))` }}
      >
        {board.categories.map((category, c) => (
          <div key={`cat-${c}`} className="min-h-[3.4rem] rounded-lg bg-[#0a1e6b] px-0.5 py-1.5 flex items-center justify-center text-center">
            <CategoryName name={category.name} />
          </div>
        ))}
        {VALUES.map((value, r) => board.categories.map((category, c) => {
          const spent = used.has(cellKey(c, r))
          return (
            <button
              key={cellKey(c, r)}
              data-cell={cellKey(c, r)}
              disabled={spent}
              onClick={() => act({ do: 'open', c, r })}
              aria-label={`${category.name} for ${value}`}
              className={`h-12 rounded-lg flex items-center justify-center transition-all ${spent
                ? 'bg-white/[0.04] border border-white/5'
                : 'bg-[#0e3fa8] border-b-4 border-[#0a2f80] active:border-b-0 active:translate-y-1'}`}
            >
              {spent
                ? <Check className="w-4 h-4 text-slate-600" strokeWidth={3} />
                : <span className="text-base font-black tabular-nums text-[#ffc800]">{value}</span>}
            </button>
          )
        }))}
      </div>
    </GamePanel>
  )
}

// ── One clue ────────────────────────────────────────────────────────────────

function ClueScreen({ state, board, teams, act, at, now, tools }) {
  const [c, r] = state.o
  const category = board.categories[c]
  const clue = category?.clues[r]
  if (!clue) return <OlderCopy tools={tools} />
  const revealed = Boolean(state.rv)
  const picked = state.pk || []
  // null: not running; 0: time is up.
  const left = state.tl != null ? Math.max(0, Math.ceil((at + state.tl - now) / 1000)) : null

  let actions
  if (!revealed) {
    actions = <MainButton icon={Eye} onClick={() => act({ do: 'reveal' })}>Show the answer</MainButton>
  } else {
    actions = (
      <>
        <Label>Who answered correctly?</Label>
        <div className={`grid gap-2 ${teams.length <= 4 ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {teams.map((team, i) => {
            const on = picked.includes(i)
            return (
              <button
                key={i}
                data-team={i}
                onClick={() => act({ do: 'pick', i })}
                className={`min-w-0 h-12 rounded-xl border-2 px-2 font-black truncate transition-all active:scale-95 ${on ? 'text-white' : 'bg-white/[0.04] text-slate-200'}`}
                style={{ borderColor: team.colour, backgroundColor: on ? team.colour : undefined }}
              >
                {on ? '✓ ' : ''}{team.label}
              </button>
            )
          })}
        </div>
        <MainButton tone={picked.length ? 'green' : 'grey'} icon={Check} onClick={() => act({ do: 'award' })}>
          {picked.length ? `Award ${clue.value} points` : 'Nobody — no points'}
        </MainButton>
      </>
    )
  }

  return (
    <GamePanel
      top={(
        <div className="flex items-center gap-2.5">
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold text-sky-300 truncate">{category.name}</div>
            <div className="text-[1.45rem] font-black leading-tight tabular-nums">{clue.value} points</div>
          </div>
          <Clock left={left} act={act} />
          <button
            onClick={() => act({ do: 'close' })}
            aria-label="Close the clue without using it"
            className="shrink-0 w-11 h-11 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center active:scale-95"
          >
            <X className="w-5 h-5" strokeWidth={3} />
          </button>
        </div>
      )}
      tools={tools}
      actions={actions}
    >
      <div className="space-y-3">
        <Panel label="Question">
          <p className="text-[1.2rem] font-black leading-snug">{clue.q}</p>
          {clue.qImage && !clue.qImages && <Picture image={clue.qImage} />}
          {clue.qImages && (
            <div className="mt-3 flex gap-2">
              {clue.qImages.map((image, i) => {
                const right = clue.qImages.length > 1 && i === clue.aIndex
                return (
                  <figure key={i} className={`relative flex-1 min-w-0 m-0 rounded-xl p-1 border-2 ${right ? 'border-[#58cc02]' : 'border-white/10'}`}>
                    <img src={image.src} alt={image.alt} className="w-full h-20 object-contain" />
                    {image.label && <figcaption className="text-center text-xs font-black truncate">{image.label}</figcaption>}
                    {right && (
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#58cc02] flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" strokeWidth={4} />
                      </span>
                    )}
                  </figure>
                )
              })}
            </div>
          )}
        </Panel>
        <Panel label={revealed ? 'Answer · on the projector' : 'Answer · only on your phone'} tone={revealed ? 'shown' : 'answer'}>
          <p className="text-[1.05rem] leading-relaxed">{clue.a}</p>
          {clue.aImage && <Picture image={clue.aImage} />}
        </Panel>
      </div>
    </GamePanel>
  )
}

function Picture({ image }) {
  return <img src={image.src} alt={image.alt} className="mt-3 max-h-40 w-auto max-w-full rounded-xl border border-white/10 object-contain" />
}

/** The clue's countdown: start it, stop it, or run it again once time is up. */
function Clock({ left, act }) {
  const base = 'shrink-0 h-11 rounded-xl border flex items-center gap-1.5 px-3 font-black tabular-nums active:scale-95'
  if (left === null) {
    return (
      <button onClick={() => act({ do: 'clock', on: true })} className={`${base} bg-white/5 border-white/15 text-slate-200 text-xs uppercase tracking-widest`}>
        <Timer className="w-4 h-4" strokeWidth={3} />30 s
      </button>
    )
  }
  if (left === 0) {
    return (
      <button onClick={() => act({ do: 'clock', on: true })} className={`${base} bg-rose-500/20 border-rose-400/50 text-rose-200 text-xs uppercase tracking-widest`}>
        <Timer className="w-4 h-4" strokeWidth={3} />Time up
      </button>
    )
  }
  return (
    <button onClick={() => act({ do: 'clock', on: false })} aria-label="Stop the timer" className={`${base} text-lg ${left > 5 ? 'bg-white/5 border-white/15 text-slate-100' : 'bg-rose-500/20 border-rose-400/50 text-rose-200'}`}>
      <Pause className="w-4 h-4" strokeWidth={3} />{left}s
    </button>
  )
}

// ── Final scores ────────────────────────────────────────────────────────────

function FinalScreen({ teams, act, tools }) {
  const ranked = [...teams].sort((a, b) => b.score - a.score)
  const top = ranked[0]?.score ?? 0
  const winners = top > 0 ? ranked.filter((team) => team.score === top) : []
  const line = winners.length === 0 ? 'Nobody scored.' : winners.length > 1 ? 'It is a tie!' : `Winner: ${winners[0].label}`
  return (
    <GamePanel
      top={(
        <div className="flex items-center gap-3">
          <span className="shrink-0 w-12 h-12 rounded-2xl bg-amber-300/15 text-amber-300 flex items-center justify-center">
            <Trophy className="w-7 h-7" strokeWidth={2.5} />
          </span>
          <Heading title="Final scores" line={line} />
        </div>
      )}
      tools={tools}
      actions={(
        <>
          <SideButton icon={Users} onClick={() => act({ do: 'setup' })}>Choose another board</SideButton>
          <MainButton tone="green" icon={RotateCcw} onClick={() => act({ do: 'replay' })}>Play this board again</MainButton>
        </>
      )}
    >
      <div className="space-y-2">
        {ranked.map((team, place) => (
          <div key={`${team.label}-${place}`} className="rounded-2xl bg-white/[0.06] border border-white/10 border-l-[7px] px-4 py-3 flex items-center gap-3" style={{ borderLeftColor: team.colour }}>
            <span className="w-6 shrink-0 font-black text-slate-500 tabular-nums">{place + 1}</span>
            {top > 0 && team.score === top && <Crown className="w-5 h-5 shrink-0 text-amber-300" strokeWidth={2.5} />}
            <span className="min-w-0 flex-1 truncate text-lg font-black">{team.label}</span>
            <span className="shrink-0 text-xl font-black tabular-nums" style={{ color: team.colour }}>{team.score}</span>
          </div>
        ))}
      </div>
    </GamePanel>
  )
}

// ── Correcting a score ──────────────────────────────────────────────────────

function ScoresSheet({ teams, act, onClose }) {
  return (
    <Sheet title="Fix a score" onClose={onClose}>
      <div className="space-y-2 px-1 pb-2">
        {teams.map((team, i) => (
          <div key={i} className="rounded-2xl bg-white/[0.06] border border-white/10 border-l-[6px] p-3" style={{ borderLeftColor: team.colour }}>
            <div className="flex items-center justify-between gap-3">
              <span className="min-w-0 truncate font-black">{team.label}</span>
              <span className="shrink-0 text-xl font-black tabular-nums" style={{ color: team.colour }}>{team.score}</span>
            </div>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {SCORE_STEPS.map((d) => (
                <button
                  key={d}
                  onClick={() => act({ do: 'score', i, d })}
                  className="h-11 rounded-xl bg-white/5 border border-white/15 font-black tabular-nums active:bg-white/15 active:scale-95"
                >
                  {d > 0 ? `+${d}` : `−${-d}`}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Sheet>
  )
}
