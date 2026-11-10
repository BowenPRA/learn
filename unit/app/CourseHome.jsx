// A course's page (/unit/#/<TRACK>), laid out like the Dashboard's track page: the
// course in its subject's colour with the XP held across its units, a banner for the
// unit to carry on with (one button straight into its next task), the units as cards
// with an XP ring, and the way into the Arcade with the gold that XP has earned.
import { useEffect, useState } from 'react'
import { Check, ChevronLeft, ChevronRight, Coins, Gamepad2, Moon, Play, Star, Sun, Trophy } from 'lucide-react'
import useDarkMode from '../src/hooks/useDarkMode.js'
import { tr } from '../src/utils/lang.js'
import { api } from '../../src/lib/api.js'
import { loadAllUnits } from '../../src/lib/unitProgress.js'
import { loadArcade } from '../../src/lib/arcade.js'
import { UNIT_XP, nextTaskOf, taskTitle, unitKey, unitXP } from '../../src/data/units.js'
import { className } from '../../src/data/subjects.js'
import { goldBalance, unitsFor } from './arcade/economy.js'
import { themeOf } from './theme.js'
import { taskLook } from './taskLook.js'

function Ring({ value, color, children }) {
  const r = 25
  const c = 2 * Math.PI * r
  return (
    <span className="relative h-12 w-12 shrink-0 sm:h-14 sm:w-14">
      <svg viewBox="0 0 56 56" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="28" cy="28" r={r} fill="none" strokeWidth="5" className="stroke-slate-200 dark:stroke-slate-800" />
        {value > 0 && <circle cx="28" cy="28" r={r} fill="none" strokeWidth="5" strokeLinecap="round" stroke={color} strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(value, UNIT_XP) / UNIT_XP)} />}
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">{children}</span>
    </span>
  )
}

export default function CourseHome({ track, onOpenUnit, onOpenTask, onArcade, onBack }) {
  const [isDark, toggleDark] = useDarkMode()
  const [state, setState] = useState(null)
  useEffect(() => {
    let alive = true
    ;(async () => {
      const me = await api.me(await api.session())
      const mine = unitsFor(me)
      const [progress, arcade] = await Promise.all([loadAllUnits().catch(() => ({})), loadArcade().catch(() => ({ spent: 0 }))])
      if (alive) setState({ units: mine.filter((u) => u.track === track), all: mine, progress, spent: arcade.spent || 0 })
    })().catch(() => alive && setState({ units: [], all: [], progress: {}, spent: 0 }))
    return () => { alive = false }
  }, [track])

  const [lang, setLang] = useState('en')
  const first = state?.units[0]
  useEffect(() => {
    if (first) document.title = `${className(first.classKey, 'en')} · PRA Learn`
    else if (state) onBack() // no unit of this course for this student
  }, [state, first, onBack])
  if (!first) return <div className="min-h-screen bg-slate-50 dark:bg-slate-950" role="status" aria-label="Loading" />
  const units = state.units
  const T = (en, fr) => tr(lang, en, null, fr)

  const { progress } = state
  const theme = themeOf(units[0].classKey)
  const sums = units.map((u) => unitXP(u, progress[unitKey(u)] || {}))
  const total = sums.reduce((s, x) => s + x.xp, 0)
  const gold = goldBalance(state.all, progress, state.spent)
  // The unit to carry on with: the newest one started and not finished, else the newest not finished.
  const order = units.map((u, i) => i).reverse()
  const at = order.find((i) => sums[i].xp > 0 && !sums[i].done) ?? order.find((i) => !sums[i].done)
  const go = at == null ? null : units[at]
  const next = go && nextTaskOf(go, progress[unitKey(go)] || {})

  return (
    <div className="pra-ui relative min-h-screen overflow-hidden bg-[#F7FAFE] dark:bg-slate-950 transition-colors">

      <header className="sticky top-0 z-20 border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="mx-auto flex h-14 sm:h-16 max-w-4xl items-center gap-3 px-3 sm:px-6">
          <button type="button" onClick={onBack} aria-label="Back to PRA Learn" title="PRA Learn"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 transition-all hover:bg-slate-100 dark:hover:bg-slate-700 active:translate-y-0.5 active:border-b-2">
            <ChevronLeft className="h-5 w-5" strokeWidth={3} />
          </button>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-base sm:text-xl font-black tracking-tight" style={{ color: theme.ink }}>{className(units[0].classKey, 'en')}</p>
            <p className="truncate text-[10px] font-black uppercase tracking-widest text-slate-400">{units[0].teacher}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border-2 border-amber-200 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1.5 text-xs sm:text-sm font-black tabular-nums text-amber-700 dark:text-amber-300">
            <Trophy className="h-4 w-4" strokeWidth={2.5} /> {total}<span className="font-bold opacity-60"><span className="hidden sm:inline">/ {units.length * UNIT_XP} </span>XP</span>
          </span>
          <button type="button" onClick={() => setLang(lang === 'en' ? 'fr' : 'en')} className="inline-flex h-11 min-w-[44px] shrink-0 items-center justify-center rounded-xl border-2 border-slate-200 dark:border-slate-700 px-2.5 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            {lang === 'fr' ? 'FR' : 'EN'}
          </button>
          <button type="button" onClick={toggleDark} aria-label="Light or dark" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            {isDark ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-4xl space-y-4 px-3 sm:px-6 pb-16 pt-5 sm:pt-8">
        {go && next && (
          <section className="rounded-3xl border-b-[6px] p-5 sm:p-7 text-white" style={{ background: theme.face, borderColor: theme.edge }}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-black uppercase tracking-widest opacity-85">{sums[at].xp > 0 ? T('Continue where you left off', 'Reprends où tu en étais') : T('Start here', 'Commence ici')}</p>
                <h1 className="mt-1 text-2xl sm:text-3xl font-black leading-tight tracking-tight"><span className="mr-2 tabular-nums opacity-75">{go.label}</span>{T(go.title, go.titleFr)}</h1>
                <div className="mt-3 flex max-w-sm items-center gap-3">
                  <span className="h-4 flex-1 overflow-hidden rounded-full bg-black/20"><span className="block h-full rounded-full bg-white transition-all duration-700 motion-reduce:transition-none" style={{ width: `${sums[at].xp}%`, minWidth: sums[at].xp > 0 ? '1rem' : 0 }} /></span>
                  <span className="whitespace-nowrap text-xs font-black tabular-nums">{sums[at].xp} / {UNIT_XP} XP</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:items-end">
                <button type="button" onClick={() => onOpenTask(go, next.task.id)}
                  className="flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl border-b-4 border-black/20 bg-white py-3 pl-4 pr-5 text-lg font-black text-slate-800 transition-all duration-100 hover:bg-slate-50 active:translate-y-[3px] active:border-b">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg text-white" style={{ background: taskLook(next.task).face }}><Play className="h-3.5 w-3.5 fill-current" strokeWidth={2.5} /></span>
                  {taskTitle(next.task, lang)}
                </button>
                <button type="button" onClick={() => onOpenUnit(go)} className="flex min-h-[32px] items-center justify-center gap-1 rounded-lg text-xs font-black uppercase tracking-wider opacity-90 hover:opacity-100 sm:justify-end">
                  {T('See all tasks', 'Voir toutes les tâches')} <ChevronRight className="h-3.5 w-3.5" strokeWidth={3} />
                </button>
              </div>
            </div>
          </section>
        )}

        <ul className="space-y-3">
          {units.map((u, i) => {
            const sum = sums[i]
            const full = sum.xp >= UNIT_XP
            return (
              <li key={unitKey(u)}>
                <button type="button" onClick={() => onOpenUnit(u)}
                  className="group flex w-full items-center gap-3 rounded-3xl border-2 border-b-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-left transition-all duration-100 hover:border-slate-300 dark:hover:border-slate-700 active:translate-y-0.5 active:border-b-2 sm:gap-4 sm:p-5">
                  <Ring value={sum.done ? 0 : sum.xp} color={theme.face}>
                    {full ? <span className="flex h-[76%] w-[76%] items-center justify-center rounded-full border-b-[3px] border-amber-600 bg-amber-400"><Star className="h-5 w-5 fill-white text-white" /></span>
                      : sum.done ? <span className="flex h-[76%] w-[76%] items-center justify-center rounded-full border-b-[3px] border-emerald-700 bg-emerald-500"><Check className="h-5 w-5 text-white" strokeWidth={4} /></span>
                        : <span className="text-sm font-black tabular-nums" style={{ color: sum.xp > 0 ? theme.ink : '#94a3b8' }}>{u.label}</span>}
                  </Ring>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-black leading-snug tracking-tight text-slate-800 dark:text-white sm:text-xl">
                      <span className="mr-1.5 tabular-nums" style={{ color: theme.ink }}>{u.label}</span>{T(u.title, u.titleFr)}
                    </span>
                    <span className="mt-0.5 hidden truncate text-sm font-semibold text-slate-500 dark:text-slate-400 sm:block">{T(u.subtitle, u.subtitleFr)}</span>
                  </span>
                  {full ? <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-black tabular-nums text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"><Star className="h-3.5 w-3.5 fill-current" /> 100</span>
                    : sum.done ? <span className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"><Check className="h-3.5 w-3.5" strokeWidth={4} /> {T('Done', 'Fini')} · {sum.xp}</span>
                      : <span className="shrink-0 whitespace-nowrap text-right leading-none"><span className={`text-base font-black tabular-nums sm:text-lg ${sum.xp > 0 ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400'}`}>{sum.xp}</span><span className="text-[11px] font-black text-slate-400">/100 XP</span></span>}
                  <ChevronRight className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 dark:text-slate-600" strokeWidth={3} />
                </button>
              </li>
            )
          })}
        </ul>

        <button type="button" onClick={onArcade}
          className="flex w-full items-center gap-4 rounded-3xl border-b-[6px] border-[#4327C4] bg-[#6C4DF2] p-4 text-left text-white transition-all duration-100 hover:brightness-105 active:translate-y-[4px] active:border-b-2 sm:p-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black/15"><Gamepad2 className="h-7 w-7" strokeWidth={2.4} /></span>
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-black tracking-tight sm:text-xl">Arcade</span>
            <span className="block text-xs font-bold text-white/90 sm:text-sm">{T('Every XP you earn is 1 gold. Spend it on Tower Defense and Swarm Survivor.', 'Chaque XP gagné vaut 1 pièce d’or. Dépense-les à Tower Defense et Swarm Survivor.')}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5 rounded-xl border-b-[3px] border-amber-600 bg-amber-400 px-3 py-1.5 text-sm font-black tabular-nums text-amber-950"><Coins className="h-4 w-4" strokeWidth={2.6} /> {gold}</span>
        </button>
      </main>
    </div>
  )
}
