// A unit's own page, in the look of the Dashboard's unit card: the unit's XP out of 100,
// the one task to do next, and the unit's tasks as coloured tiles, each with the XP it
// holds out of the XP it is worth. Nothing is locked.
import { ArrowLeft, Check, ChevronRight, History, MonitorPlay, Moon, Play, Star, Sun } from 'lucide-react'
import useDarkMode from '../src/hooks/useDarkMode.js'
import { tr } from '../src/utils/lang.js'
import { UNIT_DONE_XP, UNIT_XP, nextTaskOf, taskDone, taskTitle, taskXP, unitXP } from '../../src/data/units.js'
import { classroomHref } from '../../src/data/classroomLessons.js'
import { taskLook } from './taskLook.js'

function Ring({ value, done, full }) {
  const r = 52
  const c = 2 * Math.PI * r
  const frac = Math.max(0, Math.min(1, value / UNIT_XP))
  return (
    <svg viewBox="0 0 128 128" className="h-28 w-28 sm:h-32 sm:w-32 shrink-0" role="img" aria-label={`${value} / ${UNIT_XP} XP`}>
      <circle cx="64" cy="64" r={r} fill="none" strokeWidth="12" className="stroke-slate-200 dark:stroke-slate-800" />
      {frac > 0 && (
        <circle cx="64" cy="64" r={r} fill="none" strokeWidth="12" strokeLinecap="round"
          stroke={full ? '#fbbf24' : done ? '#58cc02' : '#1cb0f6'} strokeDasharray={`${frac * c} ${c}`} transform="rotate(-90 64 64)"
          style={{ transition: 'stroke-dasharray 0.8s ease-out' }} />
      )}
      <text x="64" y="62" textAnchor="middle" className="fill-slate-800 dark:fill-slate-100" style={{ font: '900 30px ui-sans-serif, system-ui' }}>{value}</text>
      <text x="64" y="84" textAnchor="middle" className="fill-slate-400" style={{ font: '800 13px ui-sans-serif, system-ui', letterSpacing: '0.08em' }}>/ {UNIT_XP} XP</text>
    </svg>
  )
}

/** Why the next task is the next one, in a few words. */
function whyNote(next, records, lang) {
  const { task, why } = next
  const left = task.xp - taskXP(task, records[task.id])
  if (why === 'start') return tr(lang, 'Start here', null, 'Commence ici')
  if (why === 'continue') return tr(lang, 'Carry on where you stopped', null, 'Reprends où tu t’es arrêté')
  if (why === 'next') return tr(lang, `Worth ${task.xp} XP`, null, `Vaut ${task.xp} XP`)
  return tr(lang, `${left} more XP to win here`, null, `Encore ${left} XP à gagner ici`)
}

function Tile({ task, n, record, lang, onOpen }) {
  const { Icon, face, edge } = taskLook(task)
  const xp = taskXP(task, record)
  const full = xp >= task.xp
  const half = !!record && !taskDone(record)
  const name = taskTitle(task, lang)
  return (
    <button type="button" onClick={onOpen} title={name}
      className="relative flex h-36 sm:h-40 w-full flex-col items-center justify-between rounded-[1.5rem] border-b-[6px] p-3 sm:p-4 text-white transition-all duration-150 hover:brightness-110 active:translate-y-[6px] active:border-b-0"
      style={{ background: face, borderColor: edge }}>
      <span className="absolute left-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/20 text-[11px] font-black tabular-nums" aria-hidden>{n}</span>
      {full && (
        <span className="absolute right-2.5 top-2.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-emerald-600 shadow-sm" title={tr(lang, 'Full marks', null, 'Tout juste')}>
          <Check className="h-3.5 w-3.5" strokeWidth={4} />
        </span>
      )}
      {half && !full && (
        <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-slate-700 shadow-sm">
          <History className="h-3 w-3" strokeWidth={3} /> {tr(lang, 'Continue', null, 'Continuer')}
        </span>
      )}
      <span className="mt-3 flex flex-col items-center">
        <Icon className="mb-1.5 h-8 w-8 sm:h-9 sm:w-9 drop-shadow-sm" strokeWidth={2.5} />
        <span className="text-center text-base sm:text-lg font-black leading-tight tracking-wide drop-shadow-sm">{name}</span>
      </span>
      <span className="relative mt-auto flex w-full items-center justify-center overflow-hidden rounded-xl bg-black/15 py-1.5">
        <span className="absolute inset-y-0 left-0 bg-white/25 transition-all duration-500" style={{ width: `${(xp / task.xp) * 100}%` }} />
        <span className="relative text-[11px] font-black uppercase tracking-[0.15em] tabular-nums text-white/95">{xp} / {task.xp} XP</span>
      </span>
    </button>
  )
}

export default function UnitHome({ unit, records, lang, onLang, langs, error, onOpen, onBack }) {
  const [isDark, toggleDark] = useDarkMode()
  const sum = unitXP(unit, records)
  const full = sum.xp >= UNIT_XP
  const next = nextTaskOf(unit, records)
  const title = tr(lang, unit.title, null, unit.titleFr)
  const subtitle = tr(lang, unit.subtitle, null, unit.subtitleFr)
  const quiz = unit.tasks.some((t) => t.kind === 'quiz')
  const cols = unit.tasks.length === 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-3'
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <header className="sticky top-0 z-20 flex h-14 sm:h-16 items-center justify-between border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 sm:px-6">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 font-black uppercase tracking-widest text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="h-5 w-5" /> PRA Learn
        </button>
        <div className="flex items-center gap-2">
          {langs.length > 1 && (
            <button type="button" onClick={onLang} className="rounded-xl border-2 border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-slate-500">
              {lang === 'fr' ? 'FR' : 'EN'}
            </button>
          )}
          <button type="button" onClick={toggleDark} aria-label="Light or dark" className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-3 sm:px-4 pb-16 pt-5 sm:pt-8">
        <div className="rounded-3xl border-2 border-b-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <section className="flex items-center gap-4 p-5 sm:gap-6 sm:p-7">
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1899d6]">
                <span>{unit.groupLabel}</span>
                {unit.teacher && <span className="text-slate-400">{unit.teacher}</span>}
              </p>
              <h1 className="mt-1.5 text-2xl sm:text-4xl font-black leading-tight tracking-tight text-slate-800 dark:text-slate-100">
                <span className="mr-2 tabular-nums text-[#1cb0f6]">{unit.label}</span>{title}
              </h1>
              {subtitle && <p className="mt-2 max-w-xl text-sm sm:text-base font-bold text-slate-500 dark:text-slate-400">{subtitle}</p>}
              <p className="mt-3">
                {full ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 px-3 py-1 text-sm font-black text-amber-700 dark:text-amber-300"><Star className="h-4 w-4 fill-current" /> {tr(lang, 'Full marks', null, 'Tout juste')}</span>
                ) : sum.done ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 text-sm font-black text-emerald-700 dark:text-emerald-400"><Check className="h-4 w-4" strokeWidth={4} /> {tr(lang, 'Unit finished', null, 'Unité terminée')}</span>
                ) : (
                  <span className="text-sm font-bold text-slate-400">
                    {quiz
                      ? tr(lang, `Finished at ${UNIT_DONE_XP} XP with the quiz done`, null, `Terminée à ${UNIT_DONE_XP} XP, quiz fait`)
                      : tr(lang, `Finished at ${UNIT_DONE_XP} XP`, null, `Terminée à ${UNIT_DONE_XP} XP`)}
                  </span>
                )}
              </p>
            </div>
            <Ring value={sum.xp} done={sum.done} full={full} />
          </section>

          <div className="space-y-5 border-t-2 border-slate-100 dark:border-slate-800 px-3 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
            {error && <p className="rounded-2xl border-2 border-[#ff4b4b] bg-[#ffdfe0] dark:bg-red-900/30 p-4 font-bold text-[#c03030] dark:text-red-300">{error}</p>}

            {next && (() => {
              const { face, edge } = taskLook(next.task)
              return (
                <button type="button" onClick={() => onOpen(next.task.id)}
                  className="group flex w-full items-center gap-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-2.5 pr-3 text-left transition-colors hover:border-slate-300 dark:hover:border-slate-600">
                  <span className="hidden sm:block shrink-0 pl-1 text-[10px] font-black uppercase tracking-widest text-slate-400">{tr(lang, 'Next', null, 'Ensuite')}</span>
                  <span className="flex shrink-0 items-center gap-1.5 rounded-lg border-b-[3px] py-1 pl-2 pr-2.5 text-xs sm:text-sm font-black tracking-wide text-white" style={{ background: face, borderColor: edge }}>
                    <Play className="h-3 w-3 fill-current" strokeWidth={2.5} /> {taskTitle(next.task, lang)}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400">{whyNote(next, records, lang)}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 dark:text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-500" strokeWidth={3} />
                </button>
              )
            })()}

            <div className={`grid grid-cols-2 gap-2.5 sm:gap-3 ${cols}`}>
              {unit.tasks.map((task, i) => (
                <Tile key={task.id} task={task} n={i + 1} record={records[task.id]} lang={lang} onOpen={() => onOpen(task.id)} />
              ))}
            </div>

            {unit.classroom && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  <MonitorPlay className="h-4 w-4" strokeWidth={2.5} /> {tr(lang, 'From the classroom', null, 'Vu en classe')}
                </span>
                <a href={classroomHref(unit.classroom, window.location.search)}
                  className="flex items-center gap-1.5 rounded-xl border-2 border-b-[3px] border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-black text-slate-600 dark:text-slate-300 transition-all hover:border-[#1cb0f6] hover:text-[#1899d6] active:translate-y-[1px] active:border-b-2">
                  {tr(lang, 'The slides from class', null, 'Les diapos du cours')}
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
