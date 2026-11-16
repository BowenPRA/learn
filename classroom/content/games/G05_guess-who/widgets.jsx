// content/games/G05_guess-who/widgets.jsx
// Guess Who on the projector. Ported from BowenPRA/classroom (src/guess-who/
// Board.jsx, the Halloween carnival's board) on 16 Nov 2026, in English and
// French, with two boards: 36 animals (Science 4.4 Using keys and more), and
// the carnival's 24 monsters.
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
//
// The look (Bowen, 16 Nov 2026: "more fun and engaging"): each board has its
// own scene, a jungle for the animals and a night sky for the monsters, drawn
// here in CSS and SVG, in a rounded game font (Fredoka, loaded on arrival;
// system fonts if offline). Cards deal in one by one and flip over to a
// patterned back when put down; YES / NO lands like a stamp; a coin pops off
// the meter when a Riverbuck is lost; the secret card flips over on the reveal,
// with a fact about the animal under it. The scene is the same in the deck's
// light and dark modes, so every colour is set here, not inherited.
import { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from 'react'
import { Volume2, VolumeX, Home, SendHorizontal, Undo2, Pencil, Check, ChevronRight, Lightbulb } from 'lucide-react'
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
const bucks = (n) => `${n} Riverbuck${n === 1 ? '' : 's'}`
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
    hero: 'text-6xl', body: 'text-base', lead: 'text-xl', label: 'text-xs', name: 'text-sm', chip: 'text-sm', count: 'text-4xl', splash: 'text-[4.5rem]', verdict: 'text-6xl',
  },
  big: {
    hero: 'text-[5rem]', body: 'text-[1.3rem]', lead: 'text-[1.7rem]', label: 'text-[1.2rem]', name: 'text-[1.25rem]', chip: 'text-[1.25rem]', count: 'text-[2.8rem]', splash: 'text-[7rem]', verdict: 'text-[5.5rem]',
  },
}

// ── The two scenes ──────────────────────────────────────────────────────────
// Read through CSS variables, so the class names stay fixed for Tailwind.
const svgUrl = (svg) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
const PAWS = svgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56"><g fill="#ffffff" fill-opacity="0.13"><ellipse cx="14" cy="18" rx="5" ry="4"/><circle cx="7" cy="10" r="2.4"/><circle cx="12" cy="7" r="2.4"/><circle cx="17" cy="7" r="2.4"/><circle cx="21" cy="10" r="2.4"/><ellipse cx="42" cy="44" rx="5" ry="4"/><circle cx="35" cy="36" r="2.4"/><circle cx="40" cy="33" r="2.4"/><circle cx="45" cy="33" r="2.4"/><circle cx="49" cy="36" r="2.4"/></g></svg>')
const STARS = svgUrl('<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56"><g fill="#ffffff" fill-opacity="0.18"><path d="M14 6l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/><path d="M42 32l1.5 4.5 4.5 1.5-4.5 1.5-1.5 4.5-1.5-4.5-4.5-1.5 4.5-1.5z"/><circle cx="40" cy="12" r="1.6"/><circle cx="12" cy="44" r="1.6"/></g></svg>')

const THEMES = {
  animals: {
    '--gw-bg': 'radial-gradient(120% 90% at 50% 0%, #34a05a 0%, #1d6b3a 48%, #0e3b21 100%)',
    '--gw-ink': '#3a2c17',
    '--gw-muted': '#86704a',
    '--gw-panel': '#fffaf0',
    '--gw-edge': '#ead7a4',
    '--gw-soft': '#f4e8c8',
    '--gw-accent': '#0f7a4a',
    '--gw-card-edge': '#fff1c9',
    '--gw-back': '#1f7a45',
    '--gw-back-pattern': PAWS,
    '--gw-veil': 'rgba(9, 38, 21, 0.9)',
    '--gw-title': '#ffd34d',
    '--gw-title-shadow': '#0b2e18',
  },
  monsters: {
    '--gw-bg': 'radial-gradient(120% 90% at 50% 0%, #5b2ab0 0%, #2e1065 48%, #10052a 100%)',
    '--gw-ink': '#2a1060',
    '--gw-muted': '#7c6aa6',
    '--gw-panel': '#f8f5ff',
    '--gw-edge': '#d6c9f5',
    '--gw-soft': '#ece5fc',
    '--gw-accent': '#6d28d9',
    '--gw-card-edge': '#e6dcff',
    '--gw-back': '#4c1d95',
    '--gw-back-pattern': STARS,
    '--gw-veil': 'rgba(16, 5, 42, 0.9)',
    '--gw-title': '#fde047',
    '--gw-title-shadow': '#1b0640',
  },
}

const FONTS_ID = 'guess-who-fonts'
const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&display=swap'
const FONT = "'Fredoka', 'Nunito', ui-rounded, system-ui, sans-serif"

const KEYFRAMES = `
@keyframes gw-deal { 0% { opacity: 0; transform: translateY(-46px) scale(.6) rotate(-10deg) } 70% { opacity: 1; transform: translateY(4px) scale(1.04) rotate(1deg) } 100% { opacity: 1; transform: none } }
@keyframes gw-wobble { 0%, 100% { transform: rotate(0) scale(1) } 25% { transform: rotate(-4deg) scale(1.04) } 75% { transform: rotate(4deg) scale(1.04) } }
@keyframes gw-stamp { 0% { opacity: 0; transform: scale(2.6) rotate(-16deg) } 55% { opacity: 1; transform: scale(.9) rotate(-7deg) } 75% { transform: scale(1.05) rotate(-7deg) } 100% { opacity: 1; transform: scale(1) rotate(-7deg) } }
@keyframes gw-rise { 0% { opacity: 0; transform: translateY(16px) } 100% { opacity: 1; transform: none } }
@keyframes gw-glow { 0%, 100% { box-shadow: 0 0 0 3px #fbbf24, 0 0 14px 2px rgba(251,191,36,.55) } 50% { box-shadow: 0 0 0 5px #fde047, 0 0 26px 6px rgba(253,224,71,.8) } }
@keyframes gw-bob { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
@keyframes gw-coin-drop { 0% { opacity: 1; transform: translate(-50%, 0) rotate(0) scale(1) } 30% { transform: translate(-50%, -38px) rotate(200deg) scale(1.25) } 100% { opacity: 0; transform: translate(-50%, 70px) rotate(560deg) scale(.7) } }
@keyframes gw-flip-in { 0% { transform: rotateY(180deg) } 100% { transform: rotateY(0) } }
@keyframes gw-shake { 0%, 100% { transform: translateX(0) } 20%, 60% { transform: translateX(-8px) } 40%, 80% { transform: translateX(8px) } }
@keyframes gw-fall { 0% { transform: translateY(-12vh); opacity: 0 } 8% { opacity: 1 } 100% { transform: translateY(112vh); opacity: 1 } }
@keyframes gw-spin { 0%, 100% { transform: scaleX(1) } 50% { transform: scaleX(.15) } }
@keyframes gw-twinkle { 0%, 100% { opacity: .25 } 50% { opacity: 1 } }
@keyframes gw-sway { 0%, 100% { transform: rotate(var(--r)) } 50% { transform: rotate(calc(var(--r) + 4deg)) } }
.gw-deal { animation: gw-deal .5s cubic-bezier(.2,.9,.3,1.2) both }
.gw-wobble { animation: gw-wobble .5s ease-in-out infinite }
.gw-stamp { animation: gw-stamp .5s cubic-bezier(.2,.9,.3,1.2) both }
.gw-rise { animation: gw-rise .45s ease-out both }
.gw-glow { animation: gw-glow 1.2s ease-in-out infinite }
.gw-bob { animation: gw-bob 1.6s ease-in-out infinite }
.gw-coin-drop { animation: gw-coin-drop 1s ease-in forwards }
.gw-flip-in { animation: gw-flip-in .8s cubic-bezier(.3,.7,.3,1.15) .15s both }
.gw-shake { animation: gw-shake .5s ease-in-out .1s both }
.gw-fall { position: absolute; top: 0; animation-name: gw-fall; animation-timing-function: linear; animation-iteration-count: infinite }
.gw-spin { animation: gw-spin .9s ease-in-out infinite }
.gw-twinkle { animation: gw-twinkle 2.6s ease-in-out infinite }
.gw-sway { animation: gw-sway 7s ease-in-out infinite; transform-origin: 0% 50% }
.gw-title { color: var(--gw-title); text-shadow: 0 .06em 0 var(--gw-title-shadow), 0 .12em .18em rgba(0,0,0,.35) }
@media (prefers-reduced-motion: reduce) {
  .gw-deal, .gw-glow, .gw-bob, .gw-twinkle, .gw-sway, .gw-wobble { animation: none }
}
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

  // The game font, added on arrival so the other decks never fetch it.
  useEffect(() => {
    if (document.getElementById(FONTS_ID)) return
    const link = document.createElement('link')
    link.id = FONTS_ID
    link.rel = 'stylesheet'
    link.href = FONTS_URL
    document.head.appendChild(link)
  }, [])

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
    const id = setTimeout(() => setSplash(null), 1800)
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
      <Shell board={game.board}>
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
    <Shell board={game.board}>
      <div className="relative flex-1 min-h-0 flex gap-3 p-3 lg:gap-4 lg:p-4">
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
          <Meter lang={lang} S={S} steps={game.steps} asked={game.log.length} tools={tools} game={game.game} />
          {game.phase === 'pick' ? (
            <Box className="flex items-center gap-3">
              <span className={`gw-bob ${big ? 'text-[3rem]' : 'text-4xl'}`} aria-hidden="true">🤫</span>
              <span className={`font-semibold text-[var(--gw-ink)] ${S.body}`}>
                {say(lang, `Mr Bowen is choosing a secret ${thingOf(game.board, lang)} on his phone.`, `Mr Bowen choisit un ${thingOf(game.board, lang)} secret sur son téléphone.`)}
              </span>
            </Box>
          ) : inGuess ? (
            <Box className="space-y-3 !border-amber-400 gw-rise">
              <div className={`font-bold text-[var(--gw-ink)] ${S.lead}`}>
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
              <span key={facesLeft} className={`gw-rise font-bold tabular-nums leading-none gw-title ${S.count}`}>{facesLeft}</span>
              <span className={`font-semibold leading-tight text-white/85 ${S.body}`}>
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

/** The scene: the board's colours as CSS variables, its background and decoration. */
function Shell({ board, children }) {
  return (
    <div
      className="relative flex-1 h-full min-h-0 flex flex-col overflow-hidden [background:var(--gw-bg)]"
      style={{ ...THEMES[board], fontFamily: FONT }}
    >
      <style>{KEYFRAMES}</style>
      {board === 'animals' ? <Jungle /> : <Night />}
      {children}
    </div>
  )
}

function LeafShape({ fill, className, style }) {
  return (
    <svg viewBox="0 0 220 110" className={className} style={style} aria-hidden="true">
      <path d="M4 55 C 46 -4, 160 -6, 216 55 C 160 116, 46 114, 4 55 Z" fill={fill} />
      <path d="M4 55 L 214 55" stroke="rgba(255,255,255,0.18)" strokeWidth="3" fill="none" />
      {[50, 90, 130, 170].map((x) => (
        <g key={x} stroke="rgba(255,255,255,0.12)" strokeWidth="2.5" fill="none">
          <path d={`M${x} 55 Q ${x + 18} 34 ${x + 34} 22`} />
          <path d={`M${x} 55 Q ${x + 18} 76 ${x + 34} 88`} />
        </g>
      ))}
    </svg>
  )
}

/** Big leaves reaching in from the edges, swaying a little, and patches of sunlight. */
function Jungle() {
  const leaves = [
    { left: '-90px', top: '-30px', w: 340, r: '35deg', fill: '#2f9e5a', delay: 0 },
    { left: '-110px', bottom: '-50px', w: 380, r: '-25deg', fill: '#155e33', delay: 1.5 },
    { right: '-120px', top: '-60px', w: 380, r: '150deg', fill: '#17703b', delay: 0.8 },
    { right: '-90px', bottom: '-40px', w: 340, r: '-150deg', fill: '#2f9e5a', delay: 2.2 },
    { left: '38%', bottom: '-80px', w: 300, r: '-80deg', fill: '#1a6a3a', delay: 3 },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(30% 25% at 22% 30%, rgba(255,240,170,.16), transparent), radial-gradient(25% 20% at 75% 65%, rgba(255,240,170,.12), transparent)' }} />
      {leaves.map(({ w, r, fill, delay, ...at }, i) => (
        <div key={i} className="absolute" style={{ ...at, width: w }}>
          <LeafShape fill={fill} className="gw-sway w-full h-auto" style={{ '--r': r, animationDelay: `${delay}s` }} />
        </div>
      ))}
    </div>
  )
}

// Stars at fixed places, so renders stay pure.
const STAR_FIELD = Array.from({ length: 46 }, (_, i) => ({
  left: (i * 47 + 13) % 100,
  top: (i * 29 + 7) % 100,
  size: 2 + (i % 3),
  delay: (i * 0.37) % 2.6,
}))

/** A night sky: twinkling stars and a crescent moon. */
function Night() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {STAR_FIELD.map((s, i) => (
        <span
          key={i}
          className="gw-twinkle absolute rounded-full bg-white"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
        />
      ))}
      <svg viewBox="0 0 100 100" className="absolute right-[3%] top-[4%] w-[11vmin] h-[11vmin] opacity-90">
        <defs>
          <mask id="gw-moon">
            <rect width="100" height="100" fill="white" />
            <circle cx="66" cy="38" r="40" fill="black" />
          </mask>
        </defs>
        <circle cx="50" cy="50" r="42" fill="#fde68a" mask="url(#gw-moon)" />
      </svg>
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
      className={`shrink-0 rounded-xl border-2 border-[var(--gw-edge)] bg-[var(--gw-soft)] text-[var(--gw-muted)] hover:text-[var(--gw-ink)] transition-colors ${big ? 'w-11 h-11 p-2' : 'w-9 h-9 p-1.5'}`}
    >
      {children}
    </button>
  )
}

function Box({ className = '', children }) {
  return (
    <div className={`shrink-0 rounded-2xl border-[3px] border-[var(--gw-edge)] bg-[var(--gw-panel)] p-3 shadow-[0_5px_0_rgba(0,0,0,0.22)] ${className}`}>
      {children}
    </div>
  )
}

/** The picture on a card: the photograph, or the monster's emoji sized to its box. */
function Face({ card, className = '' }) {
  if (!card) return <span className={className} />
  if (card.pic) {
    return (
      <span className={`relative block overflow-hidden bg-[var(--gw-soft)] ${className}`}>
        <img src={card.pic} alt="" draggable="false" className="absolute inset-0 w-full h-full object-cover" style={card.at ? { objectPosition: card.at } : undefined} />
      </span>
    )
  }
  return (
    <span className={`relative flex items-center justify-center overflow-hidden bg-[var(--gw-soft)] [container-type:size] ${className}`}>
      <span className="leading-none text-[72cqmin]" aria-hidden="true">{card.emoji}</span>
    </span>
  )
}

/** The back of a card: the board's pattern, a big question mark, and the name small. */
function CardBack({ card, lang, S, className = '' }) {
  return (
    <span className={`flex flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl border-[3px] border-white/25 [background:var(--gw-back-pattern),var(--gw-back)] ${className}`}>
      <span className="flex-1 min-h-0 w-full flex items-center justify-center [container-type:size]">
        <span className="flex items-center justify-center rounded-full bg-[var(--gw-title)] text-[var(--gw-title-shadow)] font-bold leading-none w-[52cqmin] h-[52cqmin] text-[36cqmin] shadow-[0_4px_0_rgba(0,0,0,0.3)]">?</span>
      </span>
      {card && <span className={`shrink-0 px-1.5 pb-1.5 text-center font-semibold leading-tight text-white/80 break-words ${S.name}`}>{nameOf(card, lang)}</span>}
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
      className="relative flex-1 min-w-0 min-h-0 grid gap-2 lg:gap-2.5"
      style={{ gridTemplateColumns: `repeat(${grid.cols}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${grid.rows}, minmax(0, 1fr))` }}
    >
      {game.cards.map((id, i) => {
        const card = byId.get(id)
        const down = game.down.includes(id)
        const glowing = inGuess && !down
        return (
          <div key={`${game.game}-${id}`} className="gw-deal min-w-0 min-h-0 [perspective:900px]" style={{ animationDelay: `${i * 35}ms` }}>
            <button
              type="button"
              onClick={() => onCard(id)}
              disabled={game.phase !== 'play' || (inGuess && down)}
              aria-pressed={down}
              aria-label={`${nameOf(card, lang)}${down ? say(lang, ', down', ', baissé') : ''}`}
              className={`group relative block w-full h-full text-left transition-transform duration-500 [transform-style:preserve-3d] disabled:cursor-default ${down ? '[transform:rotateY(180deg)]' : 'enabled:hover:-translate-y-1'}`}
            >
              <span className={`absolute inset-0 flex flex-col overflow-hidden rounded-2xl border-[3px] border-[var(--gw-card-edge)] bg-white shadow-[0_4px_0_rgba(0,0,0,0.28)] [backface-visibility:hidden] ${glowing ? 'gw-glow' : ''}`}>
                <Face card={card} className="flex-1 min-h-0 w-full rounded-t-[13px]" />
                <span className={`shrink-0 px-1.5 py-1 text-center font-bold leading-tight text-[var(--gw-ink)] break-words ${S.name}`}>
                  {nameOf(card, lang)}
                </span>
              </span>
              <CardBack card={card} lang={lang} S={S} className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]" />
            </button>
          </div>
        )
      })}
    </main>
  )
}

/**
 * Riverbucks: three tiers (3, 2 and 1), one segment per question in each. The
 * tier being played is lit and its coin bobs; when a question costs a
 * Riverbuck, that tier's coin pops off. One sentence underneath says how many
 * questions keep the prize.
 */
function Meter({ lang, S, steps, asked, tools, game }) {
  const tiers = [
    { value: 3, from: 0, to: steps[0] },
    { value: 2, from: steps[0], to: steps[1] },
    { value: 1, from: steps[1], to: steps[2] },
  ]
  // The next coin down is in the tiers, so the sentence does not say it.
  const { prize, left } = prizeStatus(asked, steps)
  // A coin pops when the prize drops within one game; never on a deal or a reload.
  const [drop, setDrop] = useState(null)
  const before = useRef({ prize, game })
  useEffect(() => {
    const was = before.current
    before.current = { prize, game }
    if (was.game !== game || prize >= was.prize) return undefined
    setDrop({ value: was.prize, key: Date.now() })
    play('coin')
    const id = setTimeout(() => setDrop(null), 1100)
    return () => clearTimeout(id)
  }, [prize, game])

  let line
  if (!prize) line = say(lang, 'No Riverbucks left. You can still win!', 'Plus de Riverbucks. Tu peux encore gagner !')
  else if (left) line = say(lang, `${left} more question${left === 1 ? '' : 's'} for ${bucks(prize)}.`, `Encore ${left} question${left === 1 ? '' : 's'} pour ${bucks(prize)}.`)
  else line = say(lang, `Guess now for ${bucks(prize)}!`, `Devine maintenant pour ${bucks(prize)} !`)
  return (
    <Box className="space-y-2">
      <div className={`flex items-center justify-between gap-2 font-bold uppercase tracking-widest text-[var(--gw-muted)] ${S.label}`}>
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
              className={`relative rounded-xl border-2 px-2 py-1.5 transition-opacity ${current ? 'border-amber-400 bg-amber-100' : 'border-[var(--gw-edge)]'} ${passed ? 'opacity-35' : ''}`}
            >
              <div className="flex items-center gap-1.5">
                <Coin n={tier.value} className={`${S.body} ${current ? 'gw-bob' : ''}`} />
                <div className="flex-1 min-w-0 flex gap-0.5">
                  {Array.from({ length: tier.to - tier.from }, (_, k) => {
                    const q = tier.from + k
                    return <span key={k} className={`flex-1 h-2 rounded-full ${q < asked ? 'bg-[var(--gw-muted)]' : q === asked ? 'bg-amber-400' : 'bg-[var(--gw-soft)]'}`} />
                  })}
                </div>
              </div>
              {drop?.value === tier.value && (
                <span key={drop.key} className="gw-coin-drop absolute left-1/2 top-1 z-10 pointer-events-none">
                  <Coin n={tier.value} className={S.body} />
                </span>
              )}
            </div>
          )
        })}
      </div>
      <div key={asked} className={`gw-rise font-semibold leading-snug ${!prize ? 'text-[var(--gw-muted)]' : !left ? 'text-amber-700' : 'text-[var(--gw-ink)]'} ${S.body}`}>
        {line}
      </div>
    </Box>
  )
}

function Coin({ n, className = '' }) {
  return (
    <span className={`shrink-0 inline-flex items-center justify-center rounded-full bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950 font-bold leading-none w-[1.6em] h-[1.6em] border-2 border-amber-600 shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)] ${className}`}>
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
      <Box className="space-y-1.5 !border-[var(--gw-accent)] gw-rise">
        <div className={`font-bold uppercase tracking-widest text-[var(--gw-accent)] ${S.label}`}>{say(lang, 'Your question', 'Ta question')}</div>
        <div className={`font-bold leading-snug text-[var(--gw-ink)] ${S.lead}`}>“{game.pending}”</div>
        <div className="flex items-center justify-between gap-3">
          <span className={`font-semibold text-[var(--gw-muted)] ${S.body}`}>
            {say(lang, 'Mr Bowen is thinking…', 'Mr Bowen réfléchit…')}
          </span>
          <button type="button" onClick={onChange} className={`font-bold text-[var(--gw-accent)] underline underline-offset-4 ${S.body}`}>
            {say(lang, 'Change it', 'La changer')}
          </button>
        </div>
      </Box>
    )
  }

  return (
    <Box>
      <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); onSend() }}>
        <label htmlFor="gw-question" className={`block font-bold uppercase tracking-widest text-[var(--gw-muted)] ${S.label}`}>
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
            className={`flex-1 min-w-0 rounded-xl border-2 border-[var(--gw-edge)] bg-white px-3 font-semibold text-[var(--gw-ink)] placeholder:text-[var(--gw-muted)] placeholder:opacity-70 focus:outline-none focus:border-[var(--gw-accent)] ${big ? 'py-2.5' : 'py-2'} ${S.body}`}
          />
          <button
            type="submit"
            disabled={!playing || !draft.trim()}
            title={say(lang, 'Ask', 'Demander')}
            aria-label={say(lang, 'Ask', 'Demander')}
            className={`shrink-0 rounded-xl bg-[var(--gw-accent)] border-b-4 border-black/25 text-white flex items-center justify-center active:border-b-0 active:translate-y-1 transition-all disabled:opacity-35 ${big ? 'w-14' : 'w-12'}`}
          >
            <SendHorizontal className={big ? 'w-7 h-7' : 'w-5 h-5'} strokeWidth={2.75} />
          </button>
        </div>
        {ideas.length > 0 && (
          <div className="flex flex-col items-start gap-1">
            {ideas.map((idea, i) => (
              <button
                key={idea.q}
                type="button"
                disabled={!playing}
                onClick={() => { onIdea(idea); input.current?.focus({ preventScroll: true }) }}
                className={`gw-rise max-w-full text-left rounded-lg px-2.5 py-0.5 font-semibold leading-snug bg-[var(--gw-soft)] text-[var(--gw-ink)] hover:bg-[var(--gw-accent)] hover:text-white transition-colors ${S.chip}`}
                style={{ animationDelay: `${i * 60}ms` }}
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
    <div className="flex-1 min-h-0 flex flex-col rounded-2xl border-[3px] border-[var(--gw-edge)] bg-[var(--gw-panel)] p-3 shadow-[0_5px_0_rgba(0,0,0,0.22)]">
      <div className={`shrink-0 font-bold uppercase tracking-widest text-[var(--gw-muted)] ${S.label}`}>
        {say(lang, 'Questions and answers', 'Questions et réponses')}
      </div>
      {log.length ? (
        <ol ref={list} className="flex-1 min-h-0 overflow-y-auto mt-1 space-y-0.5 pr-1">
          {log.map((e, i) => (
            <li key={i} className={`flex items-start gap-2 rounded-lg px-1.5 py-0.5 ${i === log.length - 1 ? 'gw-rise' : ''} ${note?.i === i ? 'bg-amber-100' : ''} ${S.chip}`}>
              <span className="shrink-0 w-[1.5em] text-right font-bold tabular-nums text-[var(--gw-muted)]">{i + 1}</span>
              <span className={`flex-1 min-w-0 font-semibold leading-snug ${e.q ? 'text-[var(--gw-ink)]' : 'italic text-[var(--gw-muted)]'}`}>
                {e.q || say(lang, 'Asked out loud', 'Posée à voix haute')}
              </span>
              <span className={`shrink-0 rounded-md px-1.5 font-bold text-white ${e.a === 'yes' ? 'bg-[#4a8b23]' : 'bg-[#c0392b]'}`}>{yesNo(lang, e.a)}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className={`mt-1.5 font-semibold text-[var(--gw-muted)] ${S.body}`}>{say(lang, 'No questions yet.', 'Pas encore de question.')}</p>
      )}
      {note && (
        <div key={note.key} className={`gw-rise shrink-0 mt-2 flex items-start gap-2 rounded-lg bg-amber-100 px-2 py-1.5 font-semibold text-amber-900 ${S.chip}`} aria-live="polite">
          <Pencil className="shrink-0 w-[1.1em] h-[1.1em] mt-0.5" strokeWidth={2.5} />
          {say(lang, note.en, note.fr)}
        </div>
      )}
    </div>
  )
}

// The faces on each board's tile in the start screen.
const PREVIEW = {
  animals: ['animal-lion', 'animal-ladybird', 'animal-penguin', 'animal-octopus', 'animal-spider', 'animal-giraffe'],
  monsters: ['monster-vampire', 'monster-ghost', 'monster-witch', 'monster-alien', 'monster-dragon', 'monster-pumpkin'],
}

function Lobby({ lang, S, big, game, tools, onBoard, onDeal }) {
  const [a, b, c] = game.steps
  const steps = [
    [say(lang, 'Ask a question.', 'Pose une question.'), say(lang, 'Mr Bowen can only say YES or NO.', 'Mr Bowen répond seulement OUI ou NON.')],
    [say(lang, 'Tap a card to put it down.', 'Touche une carte pour la baisser.'), null],
    [say(lang, 'Guess who it is!', 'Devine qui c’est !'), say(lang, 'You have ONE guess.', 'Tu as UN seul essai.')],
  ]
  return (
    <div className="relative flex-1 min-h-0 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4 lg:p-8">
        <div className="relative w-full max-w-6xl grid gap-6 lg:gap-10 md:grid-cols-2 items-center">
          <div className="absolute -top-1 right-0 z-10">{tools}</div>
          <div className="space-y-5">
            <div className="origin-left [transform:rotate(-3deg)]">
              <h1 key={game.board} className={`gw-rise gw-title font-bold tracking-tight leading-none ${S.hero}`}>
                {say(lang, 'Guess Who?', 'Qui est-ce ?')}
              </h1>
            </div>
            <Box className="space-y-3">
              <ol className="space-y-3">
                {steps.map(([line, small], i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`shrink-0 rounded-full bg-[var(--gw-accent)] text-white font-bold flex items-center justify-center w-[1.7em] h-[1.7em] ${S.lead}`}>{i + 1}</span>
                    <span className={`pt-0.5 font-bold leading-snug text-[var(--gw-ink)] ${S.lead}`}>
                      {line}
                      {small && <span className={`block font-semibold text-[var(--gw-muted)] ${S.body}`}>{small}</span>}
                    </span>
                  </li>
                ))}
              </ol>
            </Box>
            <Box className="space-y-2">
              <div className={`font-bold text-[var(--gw-ink)] ${S.body}`}>{say(lang, 'Fewer questions = more Riverbucks', 'Moins de questions = plus de Riverbucks')}</div>
              {[[3, a], [2, b], [1, c]].map(([value, max]) => (
                <div key={value} className={`flex items-center gap-2.5 font-semibold text-[var(--gw-ink)] ${S.body}`}>
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
                const cards = PREVIEW[id].map((cid) => bd.cards.find((card) => card.id === cid)).filter(Boolean)
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onBoard(id)}
                    aria-pressed={on}
                    className={`relative rounded-2xl border-4 p-2.5 text-left transition-all shadow-[0_6px_0_rgba(0,0,0,0.25)] ${on ? 'bg-[var(--gw-panel)] border-[var(--gw-title)] -translate-y-1' : 'bg-white/85 border-white/40 hover:-translate-y-0.5'}`}
                    style={THEMES[id]}
                  >
                    <div className="grid grid-cols-3 gap-1">
                      {cards.map((card) => (
                        <Face key={card.id} card={card} className="aspect-[4/3] rounded-md" />
                      ))}
                    </div>
                    <div className={`mt-2 flex items-center justify-between gap-2 font-bold text-[var(--gw-ink)] ${S.lead}`}>
                      <span>{say(lang, bd.title[0], bd.title[1])}</span>
                      {on && (
                        <span className="shrink-0 rounded-full bg-[var(--gw-accent)] text-white p-1">
                          <Check className="w-[0.8em] h-[0.8em]" strokeWidth={3.5} />
                        </span>
                      )}
                    </div>
                    <div className={`font-semibold text-[var(--gw-muted)] ${S.body}`}>
                      {bd.cards.length > BOARD_SIZE
                        ? say(lang, `${bd.cards.length} animals, 24 each round`, `${bd.cards.length} animaux, 24 par manche`)
                        : `${bd.cards.length} ${thingOf(id, lang, true)}`}
                    </div>
                  </button>
                )
              })}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Btn big={big} tone="orange" icon={ChevronRight} disabled={BOARDS[game.board].cards.length < MIN_BOARD} onClick={onDeal}>
                {say(lang, 'Deal the cards', 'Distribuer les cartes')}
              </Btn>
              <span className={`font-semibold text-white/85 ${S.body}`}>
                {say(lang, 'Mr Bowen picks the secret on his phone.', 'Mr Bowen choisit le secret sur son téléphone.')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** YES / NO, stamped across the board. */
function Splash({ lang, S, splash }) {
  const word = { yes: say(lang, 'YES!', 'OUI !'), no: say(lang, 'NO!', 'NON !'), again: say(lang, 'Try again!', 'Essaie encore !') }[splash.kind]
  const look = {
    yes: 'text-[#3f8f0e] border-[#3f8f0e] bg-[#effbe4]',
    no: 'text-[#c0392b] border-[#c0392b] bg-[#fff0ee]',
    again: 'text-amber-700 border-amber-600 bg-amber-50',
  }[splash.kind]
  return (
    <div key={splash.key} className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 bg-black/55 text-center px-6 pointer-events-none animate-in fade-in duration-150" aria-live="assertive">
      <div className={`gw-stamp rounded-[0.35em] border-[0.09em] px-[0.35em] pb-[0.06em] font-bold tracking-tight leading-none shadow-[0_10px_30px_rgba(0,0,0,0.45)] ${look} ${S.splash}`}>{word}</div>
      {splash.q && <div className={`gw-rise max-w-4xl font-bold text-white [text-shadow:0_2px_6px_rgba(0,0,0,0.6)] ${S.lead}`} style={{ animationDelay: '250ms' }}>“{splash.q}”</div>}
      <div className={`gw-rise font-semibold text-white/85 ${S.body}`} style={{ animationDelay: '350ms' }}>
        {splash.kind === 'again' ? say(lang, 'Ask a YES or NO question.', 'Pose une question OUI ou NON.') : `${say(lang, 'Question', 'Question')} ${splash.n}`}
      </div>
    </div>
  )
}

function ConfirmGuess({ lang, S, big, card, onYes, onNo }) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 p-6 animate-in fade-in duration-150" onClick={onNo}>
      <div className="gw-rise w-full max-w-md rounded-3xl bg-[var(--gw-panel)] border-[5px] border-amber-400 p-5 text-center space-y-4 shadow-[0_8px_0_rgba(0,0,0,0.3)]" onClick={(e) => e.stopPropagation()}>
        <Face card={card} className="mx-auto w-full aspect-[4/3] rounded-2xl" />
        <div className={`font-bold text-[var(--gw-ink)] ${S.lead}`}>
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

/** A big card for the reveal. `flip`: it starts face down and turns over. */
function RevealCard({ card, lang, S, tone = 'plain', flip = false, className = '' }) {
  const ring = { plain: 'border-white', win: 'border-[#58cc02]', wrong: 'border-[#ff5a4f]', answer: 'border-amber-400' }[tone]
  return (
    <div className={`[perspective:1200px] ${className}`}>
      <div className={`relative [transform-style:preserve-3d] ${flip ? 'gw-flip-in' : ''}`}>
        <div className={`rounded-3xl border-[6px] bg-white overflow-hidden shadow-[0_10px_0_rgba(0,0,0,0.3)] [backface-visibility:hidden] ${ring}`}>
          <Face card={card} className="w-full aspect-[4/3]" />
          <div className={`px-3 py-2 text-center font-bold text-[var(--gw-ink)] ${S.lead}`}>{nameOf(card, lang)}</div>
        </div>
        {flip && <CardBack lang={lang} S={S} className="absolute inset-0 rounded-3xl [backface-visibility:hidden] [transform:rotateY(180deg)]" />}
      </div>
    </div>
  )
}

// Coins and stars falling on a win, at fixed places so renders stay pure.
const SHOWER = Array.from({ length: 36 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  delay: (i * 0.29) % 2.4,
  duration: 2.6 + (i % 5) * 0.4,
  size: 2.6 + (i % 4) * 0.7,
  star: i % 4 === 3,
}))

function Reveal({ lang, S, big, board, guess, secret, gaveUp, won, questions, prize, onNext, onLobby }) {
  // Stage 1 (a guess was made): "Is it…?" with the guessed card shaking, for
  // the drum roll. Stage 2: the verdict, the secret card turning over, and a
  // fact about the animal.
  const [stage, setStage] = useState(gaveUp ? 2 : 1)
  useEffect(() => {
    if (stage !== 1) return undefined
    const id = setTimeout(() => setStage(2), 2300)
    return () => clearTimeout(id)
  }, [stage])
  const asked = `${questions} question${questions === 1 ? '' : 's'}`
  const cardSize = big ? 'w-[min(24vw,36vh)]' : 'w-[min(22vw,32vh)]'
  const fact = secret?.fact

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-3 p-6 text-center animate-in fade-in duration-200 [background:var(--gw-veil)]">
      {stage === 1 ? (
        <>
          <div className={`gw-title font-bold ${S.verdict}`}>{say(lang, 'Is it…', 'Est-ce…')}</div>
          <RevealCard card={guess} lang={lang} S={S} className={`gw-wobble ${cardSize}`} />
        </>
      ) : (
        <>
          <div
            className={`gw-stamp rounded-[0.3em] border-[0.08em] px-[0.3em] pb-[0.05em] font-bold tracking-tight leading-none ${
              won ? 'text-[#3f8f0e] border-[#3f8f0e] bg-[#effbe4]' : gaveUp ? 'text-amber-700 border-amber-600 bg-amber-50' : 'text-[#c0392b] border-[#c0392b] bg-[#fff0ee]'
            } ${S.verdict}`}
          >
            {won ? say(lang, 'YES!', 'OUI !') : gaveUp ? say(lang, 'It was…', 'C’était…') : say(lang, 'NO!', 'NON !')}
          </div>
          <div className="flex items-end justify-center gap-6 mt-1">
            {!won && !gaveUp && <RevealCard card={guess} lang={lang} S={S} tone="wrong" className={`gw-shake opacity-70 ${cardSize}`} />}
            <RevealCard card={secret} lang={lang} S={S} tone={won ? 'win' : 'answer'} flip={!won} className={cardSize} />
          </div>
          <div className={`gw-rise flex items-center gap-3 font-bold text-white ${S.lead}`} style={{ animationDelay: '0.8s' }}>
            {won && prize > 0 && <Coin n={prize} />}
            <span>
              {won
                ? prize > 0
                  ? say(lang, `${bucks(prize)}! In ${asked}.`, `${bucks(prize)} ! En ${asked}.`)
                  : say(lang, `Right, in ${asked}. No Riverbucks this time.`, `Bonne réponse, en ${asked}. Pas de Riverbucks cette fois.`)
                : gaveUp
                  ? say(lang, `The secret ${thingOf(board, lang)}.`, board === 'animals' ? 'L’animal secret.' : 'Le monstre secret.')
                  : say(lang, `The answer: ${nameOf(secret, lang)}.`, `La réponse : ${nameOf(secret, lang)}.`)}
            </span>
          </div>
          {fact && (
            <div className={`gw-rise max-w-3xl flex items-start gap-3 rounded-2xl border-[3px] border-[var(--gw-edge)] bg-[var(--gw-panel)] px-4 py-2.5 text-left shadow-[0_5px_0_rgba(0,0,0,0.25)] ${S.body}`} style={{ animationDelay: '1.1s' }}>
              <Lightbulb className="shrink-0 w-[1.4em] h-[1.4em] mt-0.5 text-amber-500" strokeWidth={2.5} />
              <span className="font-semibold leading-snug text-[var(--gw-ink)]">
                <b className="text-[var(--gw-accent)]">{say(lang, 'Did you know? ', 'Le savais-tu ? ')}</b>
                {say(lang, fact[0], fact[1])}
              </span>
            </div>
          )}
          <div className="gw-rise flex flex-wrap items-center justify-center gap-3 mt-1" style={{ animationDelay: '1.3s' }}>
            <Btn big={big} tone="orange" icon={ChevronRight} onClick={onNext}>{say(lang, 'Next round', 'Manche suivante')}</Btn>
            <Btn big={big} tone="slate" icon={Home} onClick={onLobby}>{say(lang, 'Back to the start', 'Retour au début')}</Btn>
          </div>
        </>
      )}

      {won && stage === 2 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {SHOWER.map((p, i) => (
            <span
              key={i}
              className="gw-fall"
              style={{ left: `${p.left}%`, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`, fontSize: `${p.size}vmin` }}
            >
              {p.star ? (
                <span className="gw-twinkle block leading-none">⭐</span>
              ) : (
                <span className="gw-spin block w-[1em] h-[1em] rounded-full bg-gradient-to-b from-amber-300 to-amber-500 border-[0.1em] border-amber-600" />
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
