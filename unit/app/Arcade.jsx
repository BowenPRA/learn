// The Arcade (/unit/#/arcade): the Dashboard's two games, Tower Defense and Swarm
// Survivor, paid for with the gold a student's XP earns (arcade/economy.js). The hub,
// the level picker and the leaderboard are the Dashboard's own screens
// (src/components/arcade/ArcadeHub.jsx); this file is what the Dashboard's
// views/Arcade.jsx was, on PRA Learn's saving (src/lib/arcade.js).
//
// The games quiz the student on the key words of the units they are working on
// (started and not finished; else every unit of theirs).
import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { api } from '../../src/lib/api.js'
import { loadAllUnits } from '../../src/lib/unitProgress.js'
import { arcadeBoard, loadArcade, saveArcadeScore, spendGold } from '../../src/lib/arcade.js'
import { unitKey, unitXP } from '../../src/data/units.js'
import { ArcadeShell, ArcadeHub, ArcadeLeaderboard, ArcadeLoading } from '../src/components/arcade/ArcadeHub.jsx'
import { arcadeConfig, ARCADE_LEVELS } from '../src/components/towerdefense/unitDifficulty.js'
import { hasMathChallenge } from '../src/components/towerdefense/mathChallenges.js'
import { ARCADE_KEY, SURVIVOR_KEY, ARCADE_BOARDS } from '../src/utils/progressSchema.js'
import { audioUrl } from '../src/utils/assetPaths.js'
import { FREE_PLAY_RATIO, GOLD_PER_XP, PLAY_COST, freePlayState, goldBalance, goldEarned, unitsFor } from './arcade/economy.js'

const TowerDefense = lazy(() => import('../src/tasks/games/TowerDefense.jsx'))
const Survivor = lazy(() => import('../src/tasks/games/Survivor.jsx'))
const DATA = import.meta.glob('../src/data/*/*/data.js')

const ARCADE = 'ARCADE'
const ECONOMY = { PLAY_COST, GOLD_PER_XP, FREE_PLAY_RATIO }
const LEVELS = ARCADE_LEVELS.map((l) => ({ ...l, cfg: arcadeConfig(ARCADE, l.id) }))
// The Dashboard's board keys, and the game each is saved under here.
const GAME_OF = { [ARCADE_KEY]: 'td', [SURVIVOR_KEY]: 'survivor' }

/** The key words of the units a run should quiz on, with their recordings where a unit has them. */
async function loadQuestions(units, progress) {
  const going = units.filter((u) => { const s = unitXP(u, progress[unitKey(u)] || {}); return s.xp > 0 && !s.done })
  const source = going.length ? going : units
  const pool = []
  const seen = new Set()
  let mathUnitId = null
  for (const u of source) {
    const mod = await DATA[`../src/data/${u.track}/${u.unit}/data.js`]?.()
    const data = mod && Object.entries(mod).find(([k]) => k.endsWith('_DATA'))?.[1]
    const sound = data?.meta?.audio !== false
    for (const w of data?.realWords || []) {
      const key = String(w.word || '').trim().toLowerCase()
      if (!key || seen.has(key)) continue
      seen.add(key)
      pool.push({ ...w, isReal: true, ...(sound ? { audio: audioUrl(u.track, u.unit, 'word', w.word), defAudio: audioUrl(u.track, u.unit, 'def', w.word), sentAudio: audioUrl(u.track, u.unit, 'sentence', w.word) } : null) })
    }
    if (!mathUnitId && hasMathChallenge(u.track, u.unit)) mathUnitId = u.unit
  }
  return { pool, mathUnitId }
}

export default function Arcade({ onBack }) {
  const [state, setState] = useState(null) // { units, progress, arcade, questions }
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(ARCADE_LEVELS[0].id)
  const [activeGame, setActiveGame] = useState(null) // null | 'TD' | 'SURVIVOR'
  const [view, setView] = useState('HUB')
  const [toast, setToast] = useState(null)
  const [boardId, setBoardId] = useState(ARCADE_BOARDS[0].id)
  const [board, setBoard] = useState({ rows: [], loading: false, error: null })

  useEffect(() => {
    let alive = true
    ;(async () => {
      const me = await api.me(await api.session())
      const units = unitsFor(me)
      const [progress, arcade] = await Promise.all([loadAllUnits().catch(() => ({})), loadArcade()])
      const questions = await loadQuestions(units, progress)
      if (alive) setState({ units, progress, arcade, questions })
    })().catch((e) => alive && setError(e.message))
    return () => { alive = false }
  }, [])
  useEffect(() => { document.title = 'Arcade · PRA Learn' }, [])

  const toastTimer = useRef(null)
  useEffect(() => () => clearTimeout(toastTimer.current), [])
  const flash = useCallback((msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 3200)
  }, [])

  const level = useMemo(() => arcadeConfig(ARCADE, selectedId), [selectedId])
  const banked = useRef(0)
  const boardRequest = useRef(0)

  if (error) {
    return (
      <ArcadeShell toast={null}>
        <div className="mx-auto max-w-md p-8 text-center">
          <p className="rounded-2xl border-2 border-rose-400 bg-rose-950/60 p-4 font-bold text-rose-100">{error}</p>
          <button type="button" onClick={onBack} className="mt-4 rounded-xl border-2 border-slate-600 px-4 py-2 font-black uppercase tracking-widest text-slate-200">PRA Learn</button>
        </div>
      </ArcadeShell>
    )
  }
  if (!state) return <ArcadeLoading />

  const { units, progress, arcade, questions } = state
  const earned = goldEarned(units, progress)
  const balance = goldBalance(units, progress, arcade.spent)
  const free = freePlayState(units, progress)
  const levelNo = ARCADE_LEVELS.find((l) => l.id === selectedId)?.level || 1
  const bestOf = (levelId, boardKey) => Number(arcade.scores?.[levelId]?.[GAME_OF[boardKey]]) || 0
  const startingCredits = Math.max(100, Math.round(150 * (level.creditMultiplier || 1)))

  // Paying shows at once; the save follows, and a failed save says so.
  const charge = () => {
    setState((s) => ({ ...s, arcade: { ...s.arcade, spent: s.arcade.spent + PLAY_COST } }))
    spendGold(PLAY_COST).catch((e) => flash(e.message))
  }
  // Survivor opens on a kit screen with a Back button, so it is charged when the run
  // starts (onStart), not here; Tower Defense starts straight away.
  const play = (game) => {
    if (!free.unlocked) {
      if (balance < PLAY_COST) { flash(`Not enough gold: you need ${PLAY_COST}. Earn gold by doing tasks in your units.`); return }
      if (game !== 'SURVIVOR') charge()
    }
    setActiveGame(game)
  }
  // A score is banked the moment its run ends, not only on Exit, so "Play again"
  // followed by a closed tab cannot lose it; `banked` stops the same score saving twice.
  const bankScore = (score, boardKey) => {
    if (!(score > banked.current)) return
    banked.current = score
    const game = GAME_OF[boardKey]
    setState((s) => ({ ...s, arcade: { ...s.arcade, scores: { ...s.arcade.scores, [selectedId]: { ...s.arcade.scores?.[selectedId], [game]: Math.max(s.arcade.scores?.[selectedId]?.[game] || 0, Math.floor(score)) } } } }))
    saveArcadeScore(selectedId, game, score).catch((e) => flash(e.message))
  }
  const finishGame = (score, boardKey) => { bankScore(score, boardKey); banked.current = 0; setActiveGame(null) }
  const replay = free.unlocked ? null : { cost: PLAY_COST, canAfford: balance >= PLAY_COST, onCharge: charge }

  // Only the latest request may fill the board.
  const fetchScores = async (id = boardId) => {
    const request = ++boardRequest.current
    const key = (ARCADE_BOARDS.find((b) => b.id === id) || ARCADE_BOARDS[0]).key
    setBoardId(id)
    setBoard({ rows: [], loading: true, error: null })
    try {
      const rows = await arcadeBoard(selectedId, GAME_OF[key])
      if (request === boardRequest.current) setBoard({ rows, loading: false, error: null })
    } catch (e) {
      if (request === boardRequest.current) setBoard({ rows: [], loading: false, error: e.message })
    }
  }

  const common = { gameConfig: level, pool: questions.pool, unitId: selectedId, mathUnitId: questions.mathUnitId, startingCredits, replay, onQuit: () => setActiveGame(null) }
  if (activeGame === 'TD') {
    return (
      <Suspense fallback={<ArcadeLoading />}>
        <TowerDefense {...common} themeId={level.themeId}
          onRunEnd={(score) => bankScore(score, ARCADE_KEY)} onComplete={(score) => finishGame(score, ARCADE_KEY)} />
      </Suspense>
    )
  }
  if (activeGame === 'SURVIVOR') {
    return (
      <Suspense fallback={<ArcadeLoading />}>
        <Survivor {...common} onStart={() => { if (!free.unlocked) charge() }}
          purseNote="Your kit budget for this run. None of it carries over."
          onRunEnd={(score) => bankScore(score, SURVIVOR_KEY)} onComplete={(score) => finishGame(score, SURVIVOR_KEY)} />
      </Suspense>
    )
  }

  return (
    <ArcadeShell toast={toast}>
      {view === 'HUB' ? (
        <ArcadeHub balance={balance} earned={earned} free={free} economy={ECONOMY} levels={LEVELS}
          selectedId={selectedId} onSelect={setSelectedId} bestOf={bestOf} onPlay={play}
          onLeaderboard={() => { fetchScores(boardId); setView('LEADERBOARD') }} onBack={onBack} />
      ) : (
        <ArcadeLeaderboard levelNo={levelNo} mapName={level.mapName} boardId={boardId} onBoard={fetchScores}
          onBack={() => setView('HUB')} loading={board.loading} error={board.error} pending={false} rows={board.rows} />
      )}
    </ArcadeShell>
  )
}
