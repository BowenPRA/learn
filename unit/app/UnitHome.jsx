// A unit's own page, laid out like the Dashboard's track page and unit card:
//   - a top bar with the class in its subject's colour and the unit's XP;
//   - a banner in the subject's colour: the unit, its XP bar, and one big button for
//     the task to do next (with Pip, PRA Learn's otter);
//   - the tasks as coloured tiles under numbered steps (Learn, Practice, Quiz), each
//     tile with the XP it holds out of the XP it is worth.
// Nothing is locked.
import { useEffect, useState } from 'react'
import { Check, ChevronLeft, Coins, History, MonitorPlay, Moon, Play, Star, Sun, Trophy, Wrench } from 'lucide-react'
import useDarkMode from '../src/hooks/useDarkMode.js'
import { tr } from '../src/utils/lang.js'
import { UNIT_DONE_XP, UNIT_XP, nextTaskOf, taskDone, taskTitle, taskXP, unitXP } from '../../src/data/units.js'
import { classroomHref } from '../../src/data/classroomLessons.js'
import { themeOf } from './theme.js'
import Pip from '../../src/components/Pip.jsx'
import { taskLook } from './taskLook.js'

// The steps a unit's tasks are grouped under, by kind (a task may name its own `step`).
const STEPS = [
  { id: 'learn', kinds: ['notes', 'words'], name: ['Learn', 'Apprendre'] },
  { id: 'practice', kinds: ['engine', 'steps'], name: ['Practice', 'S’entraîner'] },
  { id: 'quiz', kinds: ['quiz'], name: ['Quiz', 'Quiz'] },
]
const stepOf = (task) => task.step || STEPS.find((s) => s.kinds.includes(task.kind))?.id || 'practice'

/** Why the next task is the next one, in a few words. */
function whyNote(next, records, lang) {
  const { task, why } = next
  const left = task.xp - taskXP(task, records[task.id])
  if (why === 'start') return tr(lang, 'Start here', null, 'Commence ici')
  if (why === 'continue') return tr(lang, 'Carry on where you stopped', null, 'Reprends où tu t’es arrêté')
  if (why === 'next') return tr(lang, `Worth ${task.xp} XP`, null, `Vaut ${task.xp} XP`)
  return tr(lang, `${left} more XP to win here`, null, `Encore ${left} XP à gagner ici`)
}

function Tile({ task, record, note, fix = 0, isNext, lang, onOpen }) {
  const { Icon, face, edge } = taskLook(task)
  const xp = taskXP(task, record)
  const full = xp >= task.xp
  const half = !!record && !taskDone(record)
  const name = taskTitle(task, lang)
  return (
    <button type="button" onClick={onOpen} title={name}
      className={`relative flex h-full min-h-[10rem] sm:min-h-[11rem] w-full flex-col items-center justify-between gap-2 rounded-3xl border-b-[6px] p-3 sm:p-4 text-white transition-all duration-100 hover:brightness-105 active:translate-y-[4px] active:border-b-2 ${isNext ? 'ring-4 ring-amber-300 ring-offset-2 ring-offset-white dark:ring-offset-slate-900' : ''}`}
      style={{ background: face, borderColor: edge }}>
      {isNext && (
        <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-amber-300 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-amber-950 shadow-sm">
          <Play className="h-2.5 w-2.5 fill-current" strokeWidth={3} /> {tr(lang, 'Next', null, 'Ensuite')}
        </span>
      )}
      {/* A finished lesson with mistakes left: it reopens on its results, one tap from redoing just those. */}
      {fix > 0 && !isNext && (
        <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-amber-300 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-amber-950 shadow-sm">
          <Wrench className="h-3 w-3" strokeWidth={3} /> {tr(lang, `Fix ${fix}`, null, `Corriger ${fix}`)}
        </span>
      )}
      {full && (
        <span className="absolute right-2.5 top-2.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-emerald-600 shadow-sm" title={tr(lang, 'Full marks', null, 'Tout juste')}>
          <Check className="h-3.5 w-3.5" strokeWidth={4} />
        </span>
      )}
      {half && !full && !isNext && !fix && (
        <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-slate-700 shadow-sm">
          <History className="h-3 w-3" strokeWidth={3} /> {tr(lang, 'Continue', null, 'Continuer')}
        </span>
      )}
      <span className="mt-4 flex flex-col items-center">
        <Icon className="mb-1.5 h-9 w-9 sm:h-10 sm:w-10" strokeWidth={2.5} />
        <span className="text-center text-base sm:text-lg font-black leading-tight">{name}</span>
        {note && <span className="mt-0.5 text-xs font-bold text-white/90">{note}</span>}
      </span>
      <span className="relative mt-auto flex w-full items-center justify-center overflow-hidden rounded-xl bg-black/20 py-1.5">
        <span className="absolute inset-y-0 left-0 bg-white/30 transition-all duration-700 motion-reduce:transition-none" style={{ width: `${(xp / task.xp) * 100}%` }} />
        <span className="relative text-[11px] font-black uppercase tracking-[0.15em] tabular-nums text-white/95">{xp} / {task.xp} XP</span>
      </span>
    </button>
  )
}

/**
 * `notes` = { [taskId]: 'what is in it' } ("21 slides"); `fixes` = { [taskId]: mistakes a
 * finished lesson still has to fix }; `gold` = the gold to spend in the arcade (null hides
 * the chip); `gained` = the XP just won in a
 * task (shown for a few seconds), `onGainSeen` clears it.
 */
export default function UnitHome({ unit, records, notes = {}, fixes = {}, gold = null, gained = 0, onGainSeen, lang, onLang, langs, error, onOpen, onArcade, onBack }) {
  const [isDark, toggleDark] = useDarkMode()
  const [flash, setFlash] = useState(0)
  useEffect(() => {
    if (!gained) return undefined
    const show = setTimeout(() => setFlash(gained), 0)
    const hide = setTimeout(() => { setFlash(0); onGainSeen?.() }, 4200)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [gained, onGainSeen])

  const theme = themeOf(unit.classKey)
  const sum = unitXP(unit, records)
  const full = sum.xp >= UNIT_XP
  const next = nextTaskOf(unit, records)
  const started = unit.tasks.some((t) => records[t.id])
  const title = tr(lang, unit.title, null, unit.titleFr)
  const subtitle = tr(lang, unit.subtitle, null, unit.subtitleFr)
  const quiz = unit.tasks.some((t) => t.kind === 'quiz')
  const steps = STEPS.map((s) => ({ ...s, tasks: unit.tasks.filter((t) => stepOf(t) === s.id) })).filter((s) => s.tasks.length)
  const eyebrow = full ? tr(lang, 'Full marks', null, 'Tout juste')
    : sum.done ? tr(lang, 'Unit finished', null, 'Unité terminée')
      : started ? tr(lang, 'Continue where you left off', null, 'Reprends où tu en étais')
        : tr(lang, 'New unit', null, 'Nouvelle unité')
  const finishNote = quiz
    ? tr(lang, `Finished at ${UNIT_DONE_XP} XP with the quiz done`, null, `Terminée à ${UNIT_DONE_XP} XP, quiz fait`)
    : tr(lang, `Finished at ${UNIT_DONE_XP} XP`, null, `Terminée à ${UNIT_DONE_XP} XP`)

  return (
    <div className="pra-ui relative min-h-screen overflow-hidden bg-[#F7FAFE] dark:bg-slate-950 transition-colors">

      <header className="sticky top-0 z-20 border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="mx-auto flex h-14 sm:h-16 max-w-4xl items-center gap-3 px-3 sm:px-6">
          <button type="button" onClick={onBack} aria-label={tr(lang, 'Back to the course', null, 'Retour au cours')} title={unit.groupLabel}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 transition-all hover:bg-slate-100 dark:hover:bg-slate-700 active:translate-y-0.5 active:border-b-2">
            <ChevronLeft className="h-5 w-5" strokeWidth={3} />
          </button>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-base sm:text-xl font-black tracking-tight" style={{ color: theme.ink }}>{unit.groupLabel}</p>
            {unit.teacher && <p className="truncate text-[10px] font-black uppercase tracking-widest text-slate-400">{unit.teacher}</p>}
          </div>
          <span className="relative inline-flex shrink-0 items-center gap-1.5 rounded-xl border-2 border-amber-200 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1.5 text-xs sm:text-sm font-black tabular-nums text-amber-700 dark:text-amber-300" aria-label={`${sum.xp} / ${UNIT_XP} XP`}>
            <Trophy className="h-4 w-4" strokeWidth={2.5} /> {sum.xp}<span className="font-bold opacity-60"><span className="hidden sm:inline">/ {UNIT_XP} </span>XP</span>
            {flash > 0 && (
              <span role="status" className="absolute -bottom-9 right-0 z-30 whitespace-nowrap rounded-full bg-emerald-500 px-3 py-1 text-sm font-black text-white shadow-lg animate-in fade-in zoom-in-50 slide-in-from-top-2 duration-500">
                +{flash} XP
              </span>
            )}
          </span>
          {gold != null && (
            <button type="button" onClick={onArcade} title={tr(lang, 'Arcade: play with your gold', null, 'Arcade : joue avec ton or')}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border-b-[3px] border-amber-600 bg-amber-400 px-2.5 py-1.5 text-xs sm:text-sm font-black tabular-nums text-amber-950 transition-all hover:brightness-105 active:translate-y-0.5 active:border-b">
              <Coins className="h-4 w-4" strokeWidth={2.6} /> {gold}
            </button>
          )}
          {langs.length > 1 && (
            <button type="button" onClick={onLang} className="inline-flex h-11 min-w-[44px] shrink-0 items-center justify-center rounded-xl border-2 border-slate-200 dark:border-slate-700 px-2.5 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
              {lang === 'fr' ? 'FR' : 'EN'}
            </button>
          )}
          <button type="button" onClick={toggleDark} aria-label={tr(lang, 'Light or dark', null, 'Clair ou sombre')} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            {isDark ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-4xl px-3 sm:px-6 pb-16 pt-5 sm:pt-8">
        {/* The banner: the unit, its XP, and the one thing to do next. */}
        <section className="relative overflow-hidden rounded-3xl border-b-[6px] p-5 sm:p-7 text-white" style={{ background: theme.face, borderColor: theme.edge }}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest opacity-85">
                {full ? <Star className="h-3.5 w-3.5 fill-current" /> : sum.done ? <Check className="h-3.5 w-3.5" strokeWidth={4} /> : null} {eyebrow}
              </p>
              <h1 className="mt-1 text-2xl sm:text-3xl font-black leading-tight tracking-tight">
                <span className="mr-2 tabular-nums opacity-75">{unit.label}</span>{title}
              </h1>
              {subtitle && <p className="mt-1.5 max-w-xl text-sm font-bold leading-snug text-white/85">{subtitle}</p>}
              <div className="mt-4 flex max-w-sm items-center gap-3">
                <span className="h-4 flex-1 overflow-hidden rounded-full bg-black/20">
                  <span className="block h-full rounded-full bg-white transition-all duration-700 ease-out motion-reduce:transition-none" style={{ width: `${sum.xp}%`, minWidth: sum.xp > 0 ? '1rem' : 0 }} />
                </span>
                <span className="whitespace-nowrap text-xs font-black tabular-nums">{sum.xp} / {UNIT_XP} XP</span>
              </div>
              {!sum.done && <p className="mt-1.5 text-[11px] font-bold text-white/75">{finishNote}</p>}
            </div>

            <div className="flex items-end gap-3 sm:flex-col sm:items-end sm:gap-2">
              <Pip mood="happy" wave={sum.done || !started} size={92} className="order-2 -mb-5 sm:order-1 sm:-mb-1 sm:mr-2" />
              {next && (() => {
                const look = taskLook(next.task)
                return (
                  <div className="order-1 flex min-w-0 flex-1 flex-col gap-1.5 sm:order-2 sm:flex-none sm:items-end">
                    <button type="button" onClick={() => onOpen(next.task.id)}
                      className="group flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl border-b-4 border-black/20 bg-white py-3 pl-4 pr-5 text-lg font-black text-slate-800 transition-all duration-100 hover:bg-slate-50 active:translate-y-[3px] active:border-b">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white" style={{ background: look.face }}>
                        <Play className="h-3.5 w-3.5 fill-current" strokeWidth={2.5} />
                      </span>
                      <span className="truncate">{taskTitle(next.task, lang)}</span>
                    </button>
                    <p className="text-center text-xs font-bold opacity-90 sm:text-right">{whyNote(next, records, lang)}</p>
                  </div>
                )
              })()}
            </div>
          </div>
        </section>

        {error && <p className="mt-4 rounded-2xl border-2 border-[#ff4b4b] bg-[#ffdfe0] dark:bg-red-900/30 p-4 font-bold text-[#c03030] dark:text-red-300">{error}</p>}

        {/* The tasks, as numbered steps down a path. */}
        <section className="mt-5 rounded-3xl border-2 border-b-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 pb-5 pt-5 sm:px-6 sm:pb-6">
          <ol className="space-y-6">
            {steps.map((step, i) => {
              const max = step.tasks.reduce((s, t) => s + t.xp, 0)
              const got = step.tasks.reduce((s, t) => s + taskXP(t, records[t.id]), 0)
              const done = got >= max
              return (
                <li key={step.id} className="relative">
                  {i < steps.length - 1 && <span aria-hidden className="absolute left-4 top-10 -bottom-5 hidden w-0.5 -translate-x-1/2 rounded-full bg-slate-100 dark:bg-slate-800 sm:block" />}
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black text-white" style={{ background: done ? '#10b981' : theme.face }}>
                      {done ? <Check className="h-4 w-4" strokeWidth={4} /> : i + 1}
                    </span>
                    <h2 className="min-w-0 text-base sm:text-lg font-black tracking-tight text-slate-800 dark:text-slate-100">{tr(lang, step.name[0], null, step.name[1])}</h2>
                    <span className="flex-1" />
                    <span className={`whitespace-nowrap text-[11px] sm:text-xs font-black tabular-nums ${done ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>{got} / {max} XP</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 sm:pl-11">
                    {step.tasks.map((task) => (
                      <Tile key={task.id} task={task} record={records[task.id]} note={notes[task.id]} fix={fixes[task.id] || 0} isNext={next?.task.id === task.id} lang={lang} onOpen={() => onOpen(task.id)} />
                    ))}
                  </div>
                </li>
              )
            })}
          </ol>

          {unit.classroom && (
            <div className="mt-6 flex flex-wrap items-center gap-2 border-t-2 border-slate-100 dark:border-slate-800 pt-4">
              <span className="mr-1 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                <MonitorPlay className="h-4 w-4" strokeWidth={2.5} /> {tr(lang, 'From the classroom', null, 'Vu en classe')}
              </span>
              <a href={classroomHref(unit.classroom, window.location.search)}
                className="flex items-center gap-1.5 rounded-xl border-2 border-b-[3px] border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-black text-slate-600 dark:text-slate-300 transition-all hover:border-[#1cb0f6] hover:text-[#1899d6] active:translate-y-[1px] active:border-b-2">
                {tr(lang, 'The slides from class', null, 'Les diapos du cours')}
              </a>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
