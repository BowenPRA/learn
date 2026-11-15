// content/games/G05_guess-who/widgets.jsx
// Guess Who on the projector. Ported from BowenPRA/classroom (src/guess-who/
// Board.jsx, the Halloween carnival's board) on 16 Nov 2026, in the decks' own
// look, in English and French, with two built-in boards: the 21 animals of
// Science 4.4 Using keys, and the carnival's 24 monsters.
//
// The laptop owns the game (rules.js): it deals, keeps the secret Mr Bowen
// picks on his phone (remote.jsx, through the deck's phone remote), counts his
// YES / NO answers, lets the player put cards down with a tap, and judges the
// one final guess. Fewer questions win more Riverbucks.
//
// A question is asked out loud or typed in the box; three ideas sit under the
// box (questions.js). On the animal board the ideas are the key's questions, so
// the class is choosing between key questions: the one that splits the animals
// most evenly gets to one animal soonest (the start of Science 4.5).
//
// The board never answers and never puts cards down by itself: deciding which
// animals a YES rules out is the class's job, as on 4.4's slide 3.
import { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from 'react'
import { Volume2, VolumeX, Home, SendHorizontal, Undo2, Pencil, Check, X, ChevronRight } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { useGameRemote } from '../../../src/lib/deckControls.js'
import { Btn } from '../../y7-science/U03_models/ui.jsx'
import { BOARDS, BOARD_IDS, nameOf } from './boards.js'
import {
  BOARD_SIZE, MIN_BOARD, blankGame, cleanQuestion, cleanSteps, dealIds, fixLog, gridFor, loadGame, prizeFor, prizeStatus, saveGame,
} from './rules.js'
import { suggestions } from './questions.js'
import { play, unlockAudio, isMuted, setMuted } from './sfx.js'

const say = (lang, en, fr) => tr(lang, en, null, fr)
const thingOf = (board, lang, plural = false) => BOARDS[board].thing[lang === 'fr' ? 1 : 0][plural ? 1 : 0]
const bucks = (lang, n) => `${n} Riverbuck${n === 1 ? '' : 's'}`
const yesNo = (lang, a) => (a === 'yes' ? say(lang, 'YES', 'OUI') : say(lang, 'NO', 'NON'))

function reducer(g, a) {
  switch (a.type) {
    case 'board':
      return g.phase === 'lobby' && BOARDS[a.board] ? { ...blankGame(a.board), steps: g.steps, game: g.game } : g
    case 'deal':
      return { ...g, phase: 'pick', cards: a.cards, secret: null, down: [], pending: null, pendingTopic: null, log: [], guess: null, game: g.game + 1 }
    case 'pick':
      return g.phase === 'pick' && g.cards.includes(a.id) ? { ...g, phase: 'play', secret: a.id } : g
    case 'toggle':
      if (g.phase !== 'play') return g
      return { ...g, down: g.down.includes(a.id) ? g.down.filter((x) => x !== a.id) : [...g.down, a.id] }
    case 'ask':
      return g.phase === 'play' && !g.pending && a.text ? { ...g, pending: a.text, pendingTopic: a.topic || null } : g
    case 'unask':
      return { ...g, pending: null, pendingTopic: null }
    case 'answer':
      // The answer goes with the typed question; with none, it was asked out loud.
      return g.phase === 'play' ? { ...g, log: [...g.log, { q: g.pending, a: a.answer, t: g.pendingTopic }], pending: null, pendingTopic: null } : g
    case 'undo':
      return g.phase === 'play' && g.log.length ? { ...g, log: g.log.slice(0, -1) } : g
    case 'fix': {
      const log = g.phase === 'play' ? fixLog(g.log, a) : null
      return log ? { ...g, log } : g
    }
    case 'reveal':
      return g.phase === 'play' ? { ...g, phase: 'reveal', guess: a.guess } : g
    case 'steps': {
      const steps = cleanSteps(a.steps)
      return steps ? { ...g, steps } : g
    }
    case 'lobby':
      return { ...g, phase: 'lobby', cards: [], secret: null, down: [], pending: null, pendingTopic: null, log: [], guess: null }
    default:
      return g
  }
}

// Type sizes: windowed, and the projector (full screen), where the class reads.
const SIZES = {
  small: {
    hero: 'text-5xl', body: 'text-base', lead: 'text-xl', label: 'text-xs', name: 'text-sm', chip: 'text-sm', count: 'text-4xl', splash: 'text-[5rem]', verdict: 'text-6xl',
  },
  big: {
    hero: 'text-[4.2rem]', body: 'text-[1.3rem]', lead: 'text-[1.7rem]', label: 'text-[1.2rem]', name: 'text-[1.25rem]', chip: 'text-[1.25rem]', count: 'text-[2.8rem]', splash: 'text-[8rem]', verdict: 'text-[6rem]',
  },
}

// Falling stars for a win. Fixed rather than random at render, so React renders stay pure.
const CONFETTI = Array.from({ length: 40 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  delay: ((i * 0.29) % 2.4),
  duration: 3 + (i % 5) * 0.45,
  size: 2.2 + (i % 4) * 0.6,
  emoji: ['⭐', '🎉', '✨', '🟡', '🔵', '🟢'][i % 6],
}))

const KEYFRAMES = `
@keyframes gw-wobble { 0%, 100% { transform: rotate(0) scale(1) } 25% { transform: rotate(-4deg) scale(1.03) } 75% { transform: rotate(4deg) scale(1.03) } }
@keyframes gw-fall { 0% { transform: translateY(-10vh) rotate(0); opacity: 0 } 10% { opacity: 1 } 100% { transform: translateY(110vh) rotate(360deg); opacity: 1 } }
@keyframes gw-pop { 0% { transform: scale(0.6); opacity: 0 } 60% { transform: scale(1.08); opacity: 1 } 100% { transform: scale(1) } }
.gw-wobble { animation: gw-wobble 0.5s ease-in-out infinite }
.gw-pop { animation: gw-pop 0.35s ease-out both }
.gw-fall { position: absolute; top: 0; animation-name: gw-fall; animation-timing-function: linear; animation-iteration-count: infinite }
`

export function GuessWhoGame({ lang = 'en', isDisplayMode = false }) {
  const big = isDisplayMode
  const S = big ? SIZES.big : SIZES.small
  const [game, dispatch] = useReducer(reducer, BOARDS, loadGame)
  const board = BOARDS[game.board]
  const byId = useMemo(() => new Map(board.cards.map((c) => [c.id, c])), [board])

  const [splash, setSplash] = useState(null)
  const [guessing, setGuessing] = useState(false)
  const [confirmId, setConfirmId] = useState(null)
  const [muted, setMutedState] = useState(isMuted)
  // The question being typed, and the idea it came from if one was tapped.
  const [draft, setDraft] = useState('')
  const [chip, setChip] = useState(null)
  // A note under the log when Mr Bowen puts an answer right: { en, fr, i, key }.
  const [note, setNote] = useState(null)

  const inGuess = guessing && game.phase === 'play'
  const confirming = inGuess && confirmId ? confirmId : null
  const upCards = useMemo(() => game.cards.filter((id) => !game.down.includes(id)).map((id) => byId.get(id)).filter(Boolean), [game.cards, game.down, byId])

  const ideas = useMemo(() => {
    if (game.phase !== 'play') return []
    return suggestions({
      board: game.board,
      asked: [...game.log.map((e) => e.q), game.pending],
      topics: [...game.log.map((e) => e.t), game.pendingTopic],
      cards: upCards.map((c) => ({ ...c, label: nameOf(c, lang) })),
      game: game.game,
      lang,
    })
  }, [game.phase, game.board, game.log, game.pending, game.pendingTopic, game.game, upCards, lang])

  useEffect(() => { saveGame(game) }, [game])

  const deal = useCallback(() => {
    dispatch({ type: 'deal', cards: dealIds(BOARDS[game.board].cards) })
    setGuessing(false)
    setConfirmId(null)
    setDraft('')
    setChip(null)
    setNote(null)
    play('deal')
  }, [game.board])

  // ── The phone ─────────────────────────────────────────────────────────────
  // Mr Bowen's phone (remote.jsx) draws its own copy of the game from this; the
  // cards come from its copy of boards.js, so only ids travel. Its requests are
  // checked against the game as it stands, because one can arrive late.
  useGameRemote({
    k: 'guesswho',
    ph: game.phase,
    b: game.board,
    c: game.cards,
    s: game.secret,
    d: game.down,
    p: game.pending,
    l: game.log.map((e) => [e.q, e.a]),
    g: game.guess,
    st: game.steps,
    n: game.game,
    gs: inGuess ? 1 : 0,
    cf: confirming,
  }, (a) => {
    switch (a.do) {
      case 'board':
        if (game.phase === 'lobby' && BOARDS[a.b]) dispatch({ type: 'board', board: a.b })
        return
      case 'deal':
        deal()
        return
      case 'pick':
        dispatch({ type: 'pick', id: a.id })
        return
      case 'answer': {
        if (game.phase !== 'play') return
        if (a.a === 'yes' || a.a === 'no') {
          dispatch({ type: 'answer', answer: a.a })
          setSplash({ kind: a.a, n: game.log.length + 1, q: game.pending, key: Date.now() })
          play(a.a)
        } else if (game.pending) {
          // Not a yes / no question: it goes back in the box to be reworded.
          dispatch({ type: 'unask' })
          setDraft(game.pending)
          setChip(game.pendingTopic ? { q: game.pending, topic: game.pendingTopic } : null)
          setSplash({ kind: 'again', key: Date.now() })
          play('again')
        }
        return
      }
      case 'undo':
        dispatch({ type: 'undo' })
        return
      case 'fix': {
        // Mr Bowen putting an answer right: say so under the log, so the
        // player can turn back any cards the wrong answer made them put down.
        const fix = { i: a.i, q: a.q, a: a.a, to: a.to ?? null }
        if (game.phase !== 'play' || !fixLog(game.log, fix)) return
        dispatch({ type: 'fix', ...fix })
        const n = fix.i + 1
        setNote(fix.to
          ? { en: `Mr Bowen changed answer ${n} to ${fix.to === 'yes' ? 'YES' : 'NO'}.`, fr: `Mr Bowen a changé la réponse ${n} en ${fix.to === 'yes' ? 'OUI' : 'NON'}.`, i: fix.i, key: Date.now() }
          : { en: `Mr Bowen took out question ${n}.`, fr: `Mr Bowen a retiré la question ${n}.`, i: null, key: Date.now() })
        play('ask')
        return
      }
      case 'giveUp':
        if (game.phase !== 'play') return
        dispatch({ type: 'reveal', guess: null })
        setGuessing(false)
        setConfirmId(null)
        return
      case 'steps':
        dispatch({ type: 'steps', steps: a.st })
        return
      case 'lobby':
        dispatch({ type: 'lobby' })
        setGuessing(false)
        setConfirmId(null)
        return
      default:
    }
  })

  useEffect(() => {
    if (!splash) return undefined
    const id = setTimeout(() => setSplash(null), 1700)
    return () => clearTimeout(id)
  }, [splash])

  useEffect(() => {
    if (!note) return undefined
    const id = setTimeout(() => setNote(null), 7000)
    return () => clearTimeout(id)
  }, [note])

  const won = game.phase === 'reveal' && game.guess !== null && game.guess === game.secret
  useEffect(() => {
    if (game.phase !== 'reveal') return undefined
    if (game.guess === null) { play('again'); return undefined }
    play('drum')
    const id = setTimeout(() => play(won ? 'win' : 'lose'), 2300)
    return () => clearTimeout(id)
  }, [game.phase, game.guess, game.game, won])

  const toggleMute = () => {
    setMuted(!muted)
    setMutedState(!muted)
    if (muted) unlockAudio()
  }
  const toLobby = () => {
    // The player stands at this laptop, so a stray tap must not end their game.
    if (game.phase === 'reveal' || window.confirm(say(lang, 'End this game and go back to the start screen?', 'Terminer cette partie et revenir à l’écran de départ ?'))) {
      dispatch({ type: 'lobby' })
      setGuessing(false)
      setConfirmId(null)
    }
  }

  const tools = (
    <div className="flex items-center gap-1.5">
      <ToolButton big={big} onClick={toggleMute} title={muted ? say(lang, 'Sound on', 'Activer le son') : say(lang, 'Sound off', 'Couper le son')}>
        {muted ? <VolumeX className="w-full h-full" strokeWidth={2.5} /> : <Volume2 className="w-full h-full" strokeWidth={2.5} />}
      </ToolButton>
      {game.phase !== 'lobby' && (
        <ToolButton big={big} onClick={toLobby} title={say(lang, 'Back to the start', 'Retour au début')}>
          <Home className="w-full h-full" strokeWidth={2.5} />
        </ToolButton>
      )}
    </div>
  )

  if (game.phase === 'lobby') {
    return (
      <Shell>
        <Lobby
          lang={lang}
          S={S}
          big={big}
          game={game}
          tools={tools}
          onBoard={(b) => { unlockAudio(); dispatch({ type: 'board', board: b }) }}
          onDeal={() => { unlockAudio(); deal() }}
        />
      </Shell>
    )
  }

  const facesLeft = upCards.length
  const sendQuestion = () => {
    const text = cleanQuestion(draft)
    if (!text || game.phase !== 'play' || game.pending) return
    unlockAudio()
    dispatch({ type: 'ask', text, topic: chip && chip.q === text ? chip.topic : null })
    setDraft('')
    setChip(null)
    play('ask')
  }
  const onCard = (id) => {
    unlockAudio()
    if (game.phase !== 'play') return
    if (inGuess) {
      if (!game.down.includes(id)) setConfirmId(id)
      return
    }
    dispatch({ type: 'toggle', id })
    play('flip')
  }

  return (
    <Shell>
      <div className="flex-1 min-h-0 flex gap-3 p-3 lg:gap-4 lg:p-4">
        <CardGrid
          lang={lang}
          S={S}
          game={game}
          byId={byId}
          inGuess={inGuess}
          onCard={onCard}
        />

        {/* No title row: the height goes to the question log. */}
        <aside className={`shrink-0 min-h-0 flex flex-col gap-2.5 ${big ? 'w-[32%] max-w-[520px]' : 'w-[30%] min-w-[280px] max-w-[420px]'}`}>
          <Meter lang={lang} S={S} steps={game.steps} asked={game.log.length} tools={tools} />
          {game.phase === 'pick' ? (
            <Box className="flex items-center gap-3">
              <span className={big ? 'text-[3rem]' : 'text-4xl'} aria-hidden="true">🤫</span>
              <span className={`font-bold text-slate-700 dark:text-slate-200 ${S.body}`}>
                {say(lang, `Mr Bowen is choosing a secret ${thingOf(game.board, lang)} on his phone.`, `Mr Bowen choisit un ${thingOf(game.board, lang)} secret sur son téléphone.`)}
              </span>
            </Box>
          ) : inGuess ? (
            <Box className="space-y-3 border-amber-400 dark:border-amber-400">
              <div className={`font-black text-slate-800 dark:text-slate-100 ${S.lead}`}>
                {say(lang, `Tap the ${thingOf(game.board, lang)} you think it is.`, game.board === 'animals' ? 'Touche l’animal que tu choisis.' : 'Touche le monstre que tu choisis.')}
              </div>
              <Btn big={big} tone="slate" icon={Undo2} onClick={() => setGuessing(false)}>{say(lang, 'Not yet', 'Pas encore')}</Btn>
            </Box>
          ) : (
            <AskBox
              key={game.game}
              lang={lang}
              S={S}
              big={big}
              game={game}
              ideas={ideas}
              draft={draft}
              onDraft={(text) => { setDraft(text); if (chip && chip.q !== cleanQuestion(text)) setChip(null) }}
              onIdea={(idea) => { setDraft(idea.q); setChip(idea) }}
              onSend={sendQuestion}
              onChange={() => {
                setDraft(game.pending || '')
                setChip(game.pendingTopic ? { q: game.pending, topic: game.pendingTopic } : null)
                dispatch({ type: 'unask' })
              }}
            />
          )}
          <QuestionLog lang={lang} S={S} log={game.log} note={note} />
          <div className="shrink-0 flex items-center justify-between gap-3 pt-1">
            <div className="flex items-baseline gap-2 min-w-0">
              <span className={`font-black tabular-nums leading-none text-slate-800 dark:text-slate-100 ${S.count}`}>{facesLeft}</span>
              <span className={`font-bold leading-tight text-slate-500 dark:text-slate-400 ${S.body}`}>
                {say(lang, `${thingOf(game.board, lang, facesLeft !== 1)} left`, `${thingOf(game.board, lang, facesLeft !== 1)} ${facesLeft === 1 ? 'restant' : 'restants'}`)}
              </span>
            </div>
            <span className={facesLeft === 1 && !inGuess && game.phase === 'play' ? 'animate-pulse' : ''}>
              <Btn big={big} tone="orange" disabled={game.phase !== 'play' || inGuess} onClick={() => { unlockAudio(); setGuessing(true) }}>
                {say(lang, 'Final guess!', 'Réponse finale !')}
              </Btn>
            </span>
          </div>
        </aside>
      </div>

      {splash && <Splash lang={lang} S={S} splash={splash} />}
      {confirming && (
        <ConfirmGuess
          lang={lang}
          S={S}
          big={big}
          card={byId.get(confirming)}
          onYes={() => { dispatch({ type: 'reveal', guess: confirming }); setConfirmId(null); setGuessing(false) }}
          onNo={() => setConfirmId(null)}
        />
      )}
      {game.phase === 'reveal' && (
        <Reveal
          key={game.game}
          lang={lang}
          S={S}
          big={big}
          board={game.board}
          guess={byId.get(game.guess)}
          secret={byId.get(game.secret)}
          gaveUp={game.guess === null}
          won={won}
          questions={game.log.length}
          prize={won ? prizeFor(game.log.length, game.steps) : 0}
          onNext={deal}
          onLobby={toLobby}
        />
      )}
    </Shell>
  )
}

function Shell({ children }) {
  return (
    <div className="relative flex-1 h-full min-h-0 flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans">
      <style>{KEYFRAMES}</style>
      {children}
    </div>
  )
}

function ToolButton({ onClick, title, big, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`shrink-0 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white ${big ? 'w-11 h-11 p-2' : 'w-9 h-9 p-1.5'}`}
    >
      {children}
    </button>
  )
}

function Box({ className = '', children }) {
  return (
    <div className={`shrink-0 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 ${className}`}>
      {children}
    </div>
  )
}

/** The picture on a card: the photograph, or the monster's emoji sized to its box. */
function Face({ card, className = '' }) {
  if (!card) return <span className={className} />
  if (card.pic) {
    return (
      <span className={`relative block overflow-hidden ${className}`}>
        <img src={card.pic} alt="" draggable="false" className="absolute inset-0 w-full h-full object-cover" style={card.at ? { objectPosition: card.at } : undefined} />
      </span>
    )
  }
  return (
    <span className={`relative flex items-center justify-center overflow-hidden bg-slate-100 dark:bg-slate-800 [container-type:size] ${className}`}>
      <span className="leading-none text-[72cqmin]" aria-hidden="true">{card.emoji}</span>
    </span>
  )
}

/** The cards, as big as the space allows: rows and columns chosen to fit it. */
function CardGrid({ lang, S, game, byId, inGuess, onCard }) {
  const ref = useRef(null)
  const [ratio, setRatio] = useState(1.4)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const measure = () => { if (el.clientHeight) setRatio(el.clientWidth / el.clientHeight) }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const n = game.cards.length || BOARD_SIZE
  const grid = gridFor(n, ratio, game.board === 'animals' ? 1.05 : 0.9)
  return (
    <main
      ref={ref}
      className="flex-1 min-w-0 min-h-0 grid gap-2 lg:gap-2.5"
      style={{ gridTemplateColumns: `repeat(${grid.cols}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${grid.rows}, minmax(0, 1fr))` }}
    >
      {game.cards.map((id) => {
        const card = byId.get(id)
        const down = game.down.includes(id)
        return (
          <button
            key={`${game.game}-${id}`}
            type="button"
            onClick={() => onCard(id)}
            disabled={game.phase !== 'play' || (inGuess && down)}
            aria-pressed={down}
            aria-label={`${nameOf(card, lang)}${down ? say(lang, ', down', ', baissé') : ''}`}
            className={`group relative min-w-0 min-h-0 flex flex-col overflow-hidden rounded-xl border-2 bg-white dark:bg-slate-900 text-left transition-all duration-300 disabled:cursor-default ${
              down
                ? 'border-slate-200 dark:border-slate-800 opacity-25 grayscale scale-[0.94]'
                : inGuess
                  ? 'border-amber-400 ring-4 ring-amber-400/60 hover:scale-[1.03]'
                  : 'border-slate-200 dark:border-slate-700 enabled:hover:border-[#0087a8]'
            }`}
          >
            <Face card={card} className="flex-1 min-h-0 w-full" />
            <span className={`shrink-0 px-1.5 py-1 text-center font-black leading-tight text-slate-800 dark:text-slate-100 break-words ${S.name}`}>
              {nameOf(card, lang)}
            </span>
            {down && (
              <span className="absolute inset-0 flex items-center justify-center text-slate-700 dark:text-slate-300" aria-hidden="true">
                <X className="w-1/2 h-1/2" strokeWidth={3} />
              </span>
            )}
          </button>
        )
      })}
    </main>
  )
}

/**
 * Riverbucks: three tiers (3, 2 and 1), one segment per question in each. The
 * tier being played is lit; a used-up tier fades. One sentence underneath says
 * how many questions keep the prize.
 */
function Meter({ lang, S, steps, asked, tools }) {
  const tiers = [
    { value: 3, from: 0, to: steps[0] },
    { value: 2, from: steps[0], to: steps[1] },
    { value: 1, from: steps[1], to: steps[2] },
  ]
  // The next coin down is in the tiers, so the sentence does not say it.
  const { prize, left } = prizeStatus(asked, steps)
  let line
  if (!prize) line = say(lang, 'No Riverbucks left. You can still win!', 'Plus de Riverbucks. Tu peux encore gagner !')
  else if (left) line = say(lang, `${left} more question${left === 1 ? '' : 's'} for ${bucks(lang, prize)}.`, `Encore ${left} question${left === 1 ? '' : 's'} pour ${bucks(lang, prize)}.`)
  else line = say(lang, `Guess now for ${bucks(lang, prize)}!`, `Devine maintenant pour ${bucks(lang, prize)} !`)
  return (
    <Box className="space-y-2">
      <div className={`flex items-center justify-between gap-2 font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ${S.label}`}>
        <span className="min-w-0 truncate">Riverbucks</span>
        {tools}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {tiers.map((tier) => {
          const passed = asked >= tier.to && prize < tier.value
          const current = prize === tier.value
          return (
            <div
              key={tier.value}
              className={`rounded-xl border-2 px-2 py-1.5 transition-opacity ${current ? 'border-amber-400 bg-amber-50 dark:bg-amber-400/10' : 'border-slate-200 dark:border-slate-700'} ${passed ? 'opacity-35' : ''}`}
            >
              <div className="flex items-center gap-1.5">
                <Coin n={tier.value} className={S.body} />
                <div className="flex-1 min-w-0 flex gap-0.5">
                  {Array.from({ length: tier.to - tier.from }, (_, k) => {
                    const q = tier.from + k
                    return <span key={k} className={`flex-1 h-2 rounded-full ${q < asked ? 'bg-slate-400 dark:bg-slate-500' : q === asked ? 'bg-amber-400' : 'bg-slate-200 dark:bg-slate-700'}`} />
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div key={asked} className={`font-bold leading-snug ${!prize ? 'text-slate-500 dark:text-slate-400' : !left ? 'text-amber-700 dark:text-amber-300' : 'text-slate-700 dark:text-slate-200'} ${S.body}`}>
        {line}
      </div>
    </Box>
  )
}

function Coin({ n, className = '' }) {
  return (
    <span className={`shrink-0 inline-flex items-center justify-center rounded-full bg-amber-400 text-amber-950 font-black leading-none w-[1.6em] h-[1.6em] border-2 border-amber-500 ${className}`}>
      {n}
    </span>
  )
}

function AskBox({ lang, S, big, game, ideas, draft, onDraft, onIdea, onSend, onChange }) {
  const input = useRef(null)
  const playing = game.phase === 'play'
  // Ready for the next question as soon as the last one is answered.
  useEffect(() => { if (playing && !game.pending) input.current?.focus({ preventScroll: true }) }, [playing, game.pending, game.log.length])

  if (game.pending) {
    return (
      <Box className="space-y-1.5 border-[#0087a8] dark:border-[#0087a8]">
        <div className={`font-black uppercase tracking-widest text-[#0087a8] ${S.label}`}>{say(lang, 'Your question', 'Ta question')}</div>
        <div className={`font-black leading-snug text-slate-800 dark:text-slate-100 ${S.lead}`}>“{game.pending}”</div>
        <div className="flex items-center justify-between gap-3">
          <span className={`font-bold text-slate-500 dark:text-slate-400 ${S.body}`}>
            {say(lang, 'Mr Bowen is thinking…', 'Mr Bowen réfléchit…')}
          </span>
          <button type="button" onClick={onChange} className={`font-black text-[#0087a8] underline underline-offset-4 ${S.body}`}>
            {say(lang, 'Change it', 'La changer')}
          </button>
        </div>
      </Box>
    )
  }

  return (
    <Box>
      <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); onSend() }}>
        <label htmlFor="gw-question" className={`block font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ${S.label}`}>
          {say(lang, 'Type your question', 'Écris ta question')}
        </label>
        <div className="flex gap-2">
          <input
            ref={input}
            id="gw-question"
            value={draft}
            onChange={(e) => onDraft(e.target.value)}
            disabled={!playing}
            maxLength={140}
            autoComplete="off"
            placeholder={game.board === 'animals' ? say(lang, 'Does it…?', 'A-t-il… ?') : say(lang, 'Is your monster…?', 'Ton monstre est-il… ?')}
            className={`flex-1 min-w-0 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#0087a8] ${big ? 'py-2.5' : 'py-2'} ${S.body}`}
          />
          <button
            type="submit"
            disabled={!playing || !draft.trim()}
            title={say(lang, 'Ask', 'Demander')}
            aria-label={say(lang, 'Ask', 'Demander')}
            className={`shrink-0 rounded-xl bg-[#0087a8] border-b-4 border-[#00697f] text-white flex items-center justify-center active:border-b-0 active:translate-y-1 transition-all disabled:opacity-35 ${big ? 'w-14' : 'w-12'}`}
          >
            <SendHorizontal className={big ? 'w-7 h-7' : 'w-5 h-5'} strokeWidth={2.75} />
          </button>
        </div>
        {ideas.length > 0 && (
          <div className="flex flex-col items-start gap-1">
            {ideas.map((idea) => (
              <button
                key={idea.q}
                type="button"
                disabled={!playing}
                onClick={() => { onIdea(idea); input.current?.focus({ preventScroll: true }) }}
                className={`max-w-full text-left rounded-lg px-2.5 py-0.5 font-bold leading-snug bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#0087a8]/10 hover:text-[#00697f] dark:hover:text-[#5cc8e0] ${S.chip}`}
              >
                {idea.q}
              </button>
            ))}
          </div>
        )}
      </form>
    </Box>
  )
}

function QuestionLog({ lang, S, log, note }) {
  const list = useRef(null)
  const shown = note?.i ?? log.length - 1
  // The newest answer (or the one Mr Bowen changed) in view, after every
  // render: the list's height changes whenever the box above it does. By hand,
  // not scrollIntoView, which would also scroll the slide itself.
  useLayoutEffect(() => {
    const el = list.current
    const item = el?.children[shown]
    if (el && item) el.scrollTop = Math.max(0, item.offsetTop - el.offsetTop - el.clientHeight + item.offsetHeight + 4)
  })
  return (
    <div className="flex-1 min-h-0 flex flex-col rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3">
      <div className={`shrink-0 font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ${S.label}`}>
        {say(lang, 'Questions and answers', 'Questions et réponses')}
      </div>
      {log.length ? (
        <ol ref={list} className="flex-1 min-h-0 overflow-y-auto mt-1 space-y-0.5 pr-1">
          {log.map((e, i) => (
            <li key={i} className={`flex items-start gap-2 rounded-lg px-1.5 py-0.5 ${note?.i === i ? 'bg-amber-100 dark:bg-amber-400/15' : ''} ${S.chip}`}>
              <span className="shrink-0 w-[1.5em] text-right font-black tabular-nums text-slate-400">{i + 1}</span>
              <span className={`flex-1 min-w-0 font-bold leading-snug ${e.q ? 'text-slate-700 dark:text-slate-200' : 'italic text-slate-400'}`}>
                {e.q || say(lang, 'Asked out loud', 'Posée à voix haute')}
              </span>
              <span className={`shrink-0 rounded-md px-1.5 font-black text-white ${e.a === 'yes' ? 'bg-[#4a8b23]' : 'bg-[#c0392b]'}`}>{yesNo(lang, e.a)}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className={`mt-1.5 font-bold text-slate-400 ${S.body}`}>{say(lang, 'No questions yet.', 'Pas encore de question.')}</p>
      )}
      {note && (
        <div key={note.key} className={`shrink-0 mt-2 flex items-start gap-2 rounded-lg bg-amber-100 dark:bg-amber-400/15 px-2 py-1.5 font-bold text-amber-900 dark:text-amber-200 ${S.chip}`} aria-live="polite">
          <Pencil className="shrink-0 w-[1.1em] h-[1.1em] mt-0.5" strokeWidth={2.5} />
          {say(lang, note.en, note.fr)}
        </div>
      )}
    </div>
  )
}

function Lobby({ lang, S, big, game, tools, onBoard, onDeal }) {
  const [a, b, c] = game.steps
  const steps = [
    [say(lang, 'Ask a question.', 'Pose une question.'), say(lang, 'Mr Bowen can only say YES or NO.', 'Mr Bowen répond seulement OUI ou NON.')],
    [say(lang, 'Tap a card to put it down.', 'Touche une carte pour la baisser.'), null],
    [say(lang, 'Guess who it is!', 'Devine qui c’est !'), say(lang, 'You have ONE guess.', 'Tu as UN seul essai.')],
  ]
  return (
    <div className="flex-1 min-h-0 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4 lg:p-8">
        <div className="relative w-full max-w-6xl grid gap-6 lg:gap-10 md:grid-cols-2 items-center">
          <div className="absolute -top-1 right-0">{tools}</div>
          <div className="space-y-5">
            <h1 className={`font-black tracking-tight text-slate-800 dark:text-slate-100 ${S.hero}`}>{say(lang, 'Guess Who?', 'Qui est-ce ?')}</h1>
            <ol className="space-y-3">
              {steps.map(([line, small], i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`shrink-0 rounded-full bg-[#0087a8] text-white font-black flex items-center justify-center w-[1.7em] h-[1.7em] ${S.lead}`}>{i + 1}</span>
                  <span className={`pt-0.5 font-black leading-snug text-slate-800 dark:text-slate-100 ${S.lead}`}>
                    {line}
                    {small && <span className={`block font-bold text-slate-500 dark:text-slate-400 ${S.body}`}>{small}</span>}
                  </span>
                </li>
              ))}
            </ol>
            <Box className="space-y-2">
              <div className={`font-black text-slate-800 dark:text-slate-100 ${S.body}`}>{say(lang, 'Fewer questions = more Riverbucks', 'Moins de questions = plus de Riverbucks')}</div>
              {[[3, a], [2, b], [1, c]].map(([value, max]) => (
                <div key={value} className={`flex items-center gap-2.5 font-bold text-slate-600 dark:text-slate-300 ${S.body}`}>
                  <Coin n={value} />
                  <span>{say(lang, `${max} questions or fewer`, `${max} questions ou moins`)}</span>
                </div>
              ))}
            </Box>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {BOARD_IDS.map((id) => {
                const bd = BOARDS[id]
                const on = game.board === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onBoard(id)}
                    aria-pressed={on}
                    className={`rounded-2xl border-4 bg-white dark:bg-slate-900 p-2.5 text-left transition-colors ${on ? 'border-[#0087a8]' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}`}
                  >
                    <div className="grid grid-cols-3 gap-1">
                      {bd.cards.slice(id === 'animals' ? 3 : 0, (id === 'animals' ? 3 : 0) + 6).map((card) => (
                        <Face key={card.id} card={card} className="aspect-[4/3] rounded-md" />
                      ))}
                    </div>
                    <div className={`mt-2 flex items-center justify-between gap-2 font-black text-slate-800 dark:text-slate-100 ${S.lead}`}>
                      <span>{say(lang, bd.title[0], bd.title[1])}</span>
                      {on && <Check className="w-[1em] h-[1em] text-[#0087a8]" strokeWidth={3.5} />}
                    </div>
                    <div className={`font-bold text-slate-500 dark:text-slate-400 ${S.body}`}>
                      {bd.cards.length} {thingOf(id, lang, true)}
                    </div>
                  </button>
                )
              })}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Btn big={big} tone="orange" icon={ChevronRight} disabled={BOARDS[game.board].cards.length < MIN_BOARD} onClick={onDeal}>
                {say(lang, 'Deal the cards', 'Distribuer les cartes')}
              </Btn>
              <span className={`font-bold text-slate-500 dark:text-slate-400 ${S.body}`}>
                {say(lang, 'Mr Bowen picks the secret on his phone.', 'Mr Bowen choisit le secret sur son téléphone.')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Splash({ lang, S, splash }) {
  const word = { yes: say(lang, 'YES!', 'OUI !'), no: say(lang, 'NO!', 'NON !'), again: say(lang, 'Try again!', 'Essaie encore !') }[splash.kind]
  const colour = { yes: 'text-[#58cc02]', no: 'text-[#ff5a4f]', again: 'text-amber-300' }[splash.kind]
  return (
    <div key={splash.key} className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-slate-950/70 text-center px-6 pointer-events-none animate-in fade-in duration-150" aria-live="assertive">
      <div className={`gw-pop font-black tracking-tight leading-none drop-shadow-lg ${colour} ${S.splash}`}>{word}</div>
      {splash.q && <div className={`max-w-4xl font-black text-white ${S.lead}`}>“{splash.q}”</div>}
      <div className={`font-bold text-slate-300 ${S.body}`}>
        {splash.kind === 'again' ? say(lang, 'Ask a YES or NO question.', 'Pose une question OUI ou NON.') : `${say(lang, 'Question', 'Question')} ${splash.n}`}
      </div>
    </div>
  )
}

function ConfirmGuess({ lang, S, big, card, onYes, onNo }) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/70 p-6 animate-in fade-in duration-150" onClick={onNo}>
      <div className="gw-pop w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border-4 border-amber-400 p-5 text-center space-y-4" onClick={(e) => e.stopPropagation()}>
        <Face card={card} className="mx-auto w-full aspect-[4/3] rounded-2xl" />
        <div className={`font-black text-slate-800 dark:text-slate-100 ${S.lead}`}>
          {say(lang, 'Your answer:', 'Ta réponse :')} <span className="text-[#c25e12]">{nameOf(card, lang)}</span>{say(lang, '?', ' ?')}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Btn big={big} tone="slate" onClick={onNo}>{say(lang, 'Go back', 'Retour')}</Btn>
          <Btn big={big} tone="orange" icon={Check} onClick={onYes}>{say(lang, 'Yes, final answer!', 'Oui, réponse finale !')}</Btn>
        </div>
      </div>
    </div>
  )
}

function RevealCard({ card, lang, S, tone = 'plain', className = '' }) {
  const ring = { plain: 'border-white', win: 'border-[#58cc02]', wrong: 'border-[#ff5a4f] opacity-70', answer: 'border-amber-400' }[tone]
  return (
    <div className={`rounded-3xl border-[6px] bg-white dark:bg-slate-900 overflow-hidden ${ring} ${className}`}>
      <Face card={card} className="w-full aspect-[4/3]" />
      <div className={`px-3 py-2 text-center font-black text-slate-800 dark:text-slate-100 ${S.lead}`}>{nameOf(card, lang)}</div>
    </div>
  )
}

function Reveal({ lang, S, big, board, guess, secret, gaveUp, won, questions, prize, onNext, onLobby }) {
  // Stage 1 (a guess was made): "Is it…" with the guessed card shaking, for
  // the drum roll. Stage 2: the verdict.
  const [stage, setStage] = useState(gaveUp ? 2 : 1)
  useEffect(() => {
    if (stage !== 1) return undefined
    const id = setTimeout(() => setStage(2), 2300)
    return () => clearTimeout(id)
  }, [stage])
  const asked = `${questions} question${questions === 1 ? '' : 's'}`
  const cardSize = big ? 'w-[min(26vw,44vh)]' : 'w-[min(24vw,38vh)]'

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-slate-950/90 p-6 text-center animate-in fade-in duration-200">
      {stage === 1 ? (
        <>
          <div className={`font-black text-white ${S.verdict}`}>{say(lang, 'Is it…', 'Est-ce…')}</div>
          <RevealCard card={guess} lang={lang} S={S} className={`gw-wobble ${cardSize}`} />
        </>
      ) : (
        <>
          <div className={`gw-pop font-black tracking-tight leading-none ${won ? 'text-[#58cc02]' : gaveUp ? 'text-amber-300' : 'text-[#ff5a4f]'} ${S.verdict}`}>
            {won ? say(lang, 'YES!', 'OUI !') : gaveUp ? say(lang, 'It was…', 'C’était…') : say(lang, 'NO!', 'NON !')}
          </div>
          <div className="flex items-end justify-center gap-6">
            {!won && !gaveUp && <RevealCard card={guess} lang={lang} S={S} tone="wrong" className={cardSize} />}
            <RevealCard card={secret} lang={lang} S={S} tone={won ? 'win' : 'answer'} className={cardSize} />
          </div>
          <div className={`flex items-center gap-3 font-bold text-white ${S.lead}`}>
            {won && prize > 0 && <Coin n={prize} />}
            <span>
              {won
                ? prize > 0
                  ? say(lang, `${bucks(lang, prize)}! In ${asked}.`, `${bucks(lang, prize)} ! En ${asked}.`)
                  : say(lang, `Right, in ${asked}. No Riverbucks this time.`, `Bonne réponse, en ${asked}. Pas de Riverbucks cette fois.`)
                : gaveUp
                  ? say(lang, `The secret ${thingOf(board, lang)}.`, board === 'animals' ? 'L’animal secret.' : 'Le monstre secret.')
                  : say(lang, `The answer: ${nameOf(secret, lang)}.`, `La réponse : ${nameOf(secret, lang)}.`)}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Btn big={big} tone="orange" icon={ChevronRight} onClick={onNext}>{say(lang, 'Next round', 'Manche suivante')}</Btn>
            <Btn big={big} tone="slate" icon={Home} onClick={onLobby}>{say(lang, 'Back to the start', 'Retour au début')}</Btn>
          </div>
        </>
      )}

      {won && stage === 2 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {CONFETTI.map((p, i) => (
            <span
              key={i}
              className="gw-fall"
              style={{ left: `${p.left}%`, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`, fontSize: `${p.size}vmin` }}
            >
              {p.emoji}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
