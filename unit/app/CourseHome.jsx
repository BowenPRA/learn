// A course's page (/unit/#/<TRACK>), laid out like the Dashboard's track page: the
// course in its subject's colour with the XP held across its units, a banner for the
// unit to carry on with (one button straight into its next task, with Pip), the units
// as cards (an XP ring, the unit's tasks as small tiles, its XP bar), and the Arcade's
// dark banner with the gold that XP has earned.
import { useEffect, useState } from 'react'
import { Check, ChevronLeft, ChevronRight, Coins, Gamepad2, Moon, Play, Shield, Skull, Star, Sun, Trophy } from 'lucide-react'
import useDarkMode from '../src/hooks/useDarkMode.js'
import { tr } from '../src/utils/lang.js'
import { api } from '../../src/lib/api.js'
import { loadAllUnits } from '../../src/lib/unitProgress.js'
import { loadArcade } from '../../src/lib/arcade.js'
import { UNIT_XP, nextTaskOf, taskDone, taskTitle, taskXP, unitKey, unitXP } from '../../src/data/units.js'
import { className } from '../../src/data/subjects.js'
import { goldBalance, unitsFor } from './arcade/economy.js'
import { themeOf } from './theme.js'
import { taskLook } from './taskLook.js'
import Pip from '../../src/components/Pip.jsx'

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

      <main className="relative z-10 mx-auto max-w-4xl px-3 sm:px-6 pb-16 pt-5 sm:pt-8">
        {/* What to do now: the unit to carry on with, and one button into its next task. */}
        {go && next && (
          <section className="relative overflow-hidden rounded-3xl border-b-[6px] p-5 sm:p-7 text-white" style={{ background: theme.face, borderColor: theme.edge }}>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-black uppercase tracking-widest text-white/90">{sums[at].xp > 0 ? T('Continue where you left off', 'Reprends où tu en étais') : T('Start here', 'Commence ici')}</p>
                <h1 className="mt-1 text-2xl sm:text-3xl font-black leading-tight tracking-tight"><span className="mr-2 tabular-nums opacity-75">{go.label}</span>{T(go.title, go.titleFr)}</h1>
                <div className="mt-4 flex max-w-sm items-center gap-3">
                  <span className="h-4 flex-1 overflow-hidden rounded-full bg-black/20"><span className="block h-full rounded-full bg-white transition-all duration-700 motion-reduce:transition-none" style={{ width: `${sums[at].xp}%`, minWidth: sums[at].xp > 0 ? '1rem' : 0 }} /></span>
                  <span className="whitespace-nowrap text-xs font-black tabular-nums">{sums[at].xp} / {UNIT_XP} XP</span>
                </div>
              </div>
              <div className="flex items-end gap-3 sm:flex-col sm:items-end sm:gap-2">
                <Pip mood="happy" wave={sums[at].xp === 0} size={92} className="order-2 -mb-5 sm:order-1 sm:-mb-1 sm:mr-2" />
                <div className="order-1 flex min-w-0 flex-1 flex-col gap-1.5 sm:order-2 sm:flex-none sm:items-end">
                  <button type="button" onClick={() => onOpenTask(go, next.task.id)}
                    className="flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl border-b-4 border-black/20 bg-white py-3 pl-4 pr-5 text-lg font-black text-slate-800 transition-all duration-100 hover:bg-slate-50 active:translate-y-[3px] active:border-b">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white" style={{ background: taskLook(next.task).face }}><Play className="h-3.5 w-3.5 fill-current" strokeWidth={2.5} /></span>
                    <span className="truncate">{taskTitle(next.task, lang)}</span>
                  </button>
                  <button type="button" onClick={() => onOpenUnit(go)} className="flex min-h-[32px] items-center justify-center gap-1 rounded-lg text-xs font-black uppercase tracking-wider opacity-90 hover:opacity-100 sm:justify-end">
                    {T('See all tasks', 'Voir toutes les tâches')} <ChevronRight className="h-3.5 w-3.5" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* The units: one card a unit, with its tasks as small tiles and its XP bar. */}
        <div className="mb-3 mt-7 flex items-end justify-between gap-3 px-1">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{T('Units', 'Unités')}</h2>
          <p className="text-xs font-black tabular-nums text-slate-400 dark:text-slate-500">
            <span className="text-slate-700 dark:text-slate-200">{sums.filter((x) => x.done).length}</span> / {units.length} {T('finished', 'terminées')}
          </p>
        </div>
        <ul className="space-y-3">
          {units.map((u, i) => {
            const sum = sums[i]
            const full = sum.xp >= UNIT_XP
            const records = progress[unitKey(u)] || {}
            const upNext = !sum.done ? nextTaskOf(u, records)?.task : null
            return (
              <li key={unitKey(u)}>
                <button type="button" onClick={() => onOpenUnit(u)}
                  className="group block w-full rounded-3xl border-2 border-b-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-left transition-all duration-100 hover:border-slate-300 dark:hover:border-slate-700 active:translate-y-0.5 active:border-b-2 sm:p-5">
                  <span className="flex items-center gap-3 sm:gap-4">
                    <Ring value={sum.done ? 0 : sum.xp} color={theme.face}>
                      {full ? <span className="flex h-[76%] w-[76%] items-center justify-center rounded-full border-b-[3px] border-amber-600 bg-amber-400"><Star className="h-5 w-5 fill-white text-white" /></span>
                        : sum.done ? <span className="flex h-[76%] w-[76%] items-center justify-center rounded-full border-b-[3px] border-emerald-700 bg-emerald-500"><Check className="h-5 w-5 text-white" strokeWidth={4} /></span>
                          : <span className="text-sm font-black tabular-nums" style={{ color: sum.xp > 0 ? theme.ink : '#94a3b8' }}>{u.label}</span>}
                    </Ring>
                    <span className="min-w-0 flex-1">
                      <span className="block text-lg font-black leading-snug tracking-tight text-slate-800 dark:text-white sm:text-xl">
                        <span className="mr-1.5 tabular-nums" style={{ color: theme.ink }}>{u.label}</span>{T(u.title, u.titleFr)}
                      </span>
                      <span className="mt-0.5 hidden truncate text-sm font-semibold text-slate-500 dark:text-slate-400 sm:block">{T(u.subtitle, u.subtitleFr)}</span>
                    </span>
                    {full ? <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-black tabular-nums text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"><Star className="h-3.5 w-3.5 fill-current" /> 100</span>
                      : sum.done ? <span className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"><Check className="h-3.5 w-3.5" strokeWidth={4} /> {T('Done', 'Fini')} · {sum.xp}</span>
                        : <span className="shrink-0 whitespace-nowrap text-right leading-none"><span className={`text-lg font-black tabular-nums ${sum.xp > 0 ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400'}`}>{sum.xp}</span><span className="text-[11px] font-black text-slate-400">/100 XP</span></span>}
                    <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors group-hover:bg-slate-200 group-hover:text-slate-600 dark:bg-slate-800 dark:text-slate-500 sm:flex">
                      <ChevronRight className="h-5 w-5" strokeWidth={3} />
                    </span>
                  </span>
                  {/* The unit's tasks: a small tile each in the task's own colour, ticked once done. */}
                  <span className="mt-3.5 flex flex-wrap gap-2 border-t-2 border-slate-100 pt-3.5 dark:border-slate-800">
                    {u.tasks.map((task) => {
                      const look = taskLook(task)
                      const record = records[task.id]
                      const done = taskDone(record)
                      const isNext = upNext?.id === task.id
                      return (
                        <span key={task.id} className={`inline-flex items-center gap-2 rounded-xl border-2 py-1 pl-1 pr-2.5 text-xs font-black ${isNext ? 'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-500/60 dark:bg-amber-900/20 dark:text-amber-200' : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'}`}>
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-white" style={{ background: done ? '#10b981' : look.face }}>
                            {done ? <Check className="h-3.5 w-3.5" strokeWidth={4} /> : <look.Icon className="h-3.5 w-3.5" strokeWidth={2.6} />}
                          </span>
                          {taskTitle(task, lang)}
                          <span className="tabular-nums font-bold text-slate-400 dark:text-slate-500">{taskXP(task, record)}/{task.xp}</span>
                        </span>
                      )
                    })}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        {/* The Arcade is a play zone, not a course: its own dark banner under the units. */}
        <button type="button" onClick={onArcade}
          className="group relative mt-6 flex w-full items-center gap-4 overflow-hidden rounded-3xl border-b-[6px] border-[#1e1b4b] bg-[#0b1022] p-4 text-left text-white transition-all duration-100 hover:brightness-110 active:translate-y-1 active:border-b-2 sm:gap-5 sm:p-6">
          <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-amber-400" />
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-b-4 border-[#4B2FCF] bg-[#7C5CFF] sm:h-16 sm:w-16"><Gamepad2 className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2.5} /></span>
          <span className="min-w-0 flex-1">
            <span className="block text-2xl font-black leading-tight tracking-tight">Arcade</span>
            <span className="block text-sm font-bold text-slate-300">{T('Every XP you earn is 1 gold. Spend it on games.', 'Chaque XP gagné vaut 1 pièce d’or. Dépense-les en jouant.')}</span>
            <span className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/40 bg-sky-400/15 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-sky-200"><Shield className="h-3 w-3" strokeWidth={3} /> Tower Defense</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/40 bg-rose-400/15 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-rose-200"><Skull className="h-3 w-3" strokeWidth={3} /> Swarm Survivor</span>
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5 rounded-xl border-b-[3px] border-amber-600 bg-amber-400 px-3 py-1.5 text-sm font-black tabular-nums text-amber-950"><Coins className="h-4 w-4" strokeWidth={2.6} /> {gold}</span>
          <ChevronRight className="hidden h-6 w-6 shrink-0 text-white/70 transition-transform group-hover:translate-x-1 sm:block" strokeWidth={3} />
        </button>
      </main>
    </div>
  )
}
