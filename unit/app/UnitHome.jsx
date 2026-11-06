// A unit's own page: its XP out of 100 (and the bonus on top), and its five parts in
// order, each with the XP it holds and what earns its bonus. Nothing is locked; the
// first part not yet finished is marked "Up next". In the Dashboard tasks' look.
import { ArrowLeft, Check, ChevronRight, ClipboardCheck, FileText, Languages, Moon, NotebookPen, Presentation, Sparkles, Star, Sun, Waves } from 'lucide-react'
import useDarkMode from '../src/hooks/useDarkMode.js'
import { tr } from '../src/utils/lang.js'
import { UNIT_BONUS, UNIT_DONE_XP, UNIT_PARTS, nextPartOf, partXP, unitXP } from '../../src/data/units.js'
import { classroomHref } from '../../src/data/classroomLessons.js'

const LOOK = {
  lesson: { icon: FileText, face: '#64748b', edge: '#475569' },
  words: { icon: Languages, face: '#58cc02', edge: '#58a700' },
  practice: { icon: Waves, face: '#1a5fa8', edge: '#134a85' },
  workbook: { icon: NotebookPen, face: '#ff9600', edge: '#cc7800' },
  quiz: { icon: ClipboardCheck, face: '#2563eb', edge: '#1d4ed8' },
}

function about(part, ctx, lang) {
  switch (part.id) {
    case 'lesson': return tr(lang, 'The lesson, with questions to check as you go.', null, 'La leçon, avec des questions pour vérifier au fur et à mesure.')
    case 'words': return tr(lang, `Review the ${ctx.words} words, then take the vocab quiz.`, null, `Revois les ${ctx.words} mots, puis fais le quiz de vocabulaire.`)
    case 'practice': return tr(lang, `${ctx.engine}: the main activity of the unit.`, null, `${ctx.engineFr} : l’activité principale de l’unité.`)
    case 'workbook': return tr(lang, 'Step-by-step problems, like the Workbook.', null, 'Des problèmes pas à pas, comme dans le cahier.')
    case 'quiz': return tr(lang, `${ctx.questions} questions to finish the unit.`, null, `${ctx.questions} questions pour finir l’unité.`)
    default: return ''
  }
}
const BONUS_FOR = {
  words: ['Timed quiz, 80% or more', 'Quiz chronométré, 80 % ou plus'],
  practice: ['Full marks', 'Toutes les réponses justes'],
  workbook: ['Every problem without help', 'Tous les problèmes sans aide'],
  quiz: ['Full marks the first time', 'Tout juste du premier coup'],
}

function Ring({ value, max, done }) {
  const r = 52
  const c = 2 * Math.PI * r
  const frac = Math.max(0, Math.min(1, value / max))
  return (
    <svg viewBox="0 0 128 128" className="h-32 w-32 shrink-0" aria-hidden>
      <circle cx="64" cy="64" r={r} fill="none" strokeWidth="12" className="stroke-slate-200 dark:stroke-slate-800" />
      <circle cx="64" cy="64" r={r} fill="none" strokeWidth="12" strokeLinecap="round"
        stroke={done ? '#58cc02' : '#1cb0f6'} strokeDasharray={`${frac * c} ${c}`} transform="rotate(-90 64 64)"
        style={{ transition: 'stroke-dasharray 0.8s ease-out' }} />
      <text x="64" y="62" textAnchor="middle" className="fill-slate-800 dark:fill-slate-100" style={{ font: '900 30px ui-sans-serif, system-ui' }}>{value}</text>
      <text x="64" y="84" textAnchor="middle" className="fill-slate-400" style={{ font: '800 13px ui-sans-serif, system-ui', letterSpacing: '0.08em' }}>/ {max} XP</text>
    </svg>
  )
}

export default function UnitHome({ unit, data, records, lang, onLang, langs, error, onOpen, onBack }) {
  const [isDark, toggleDark] = useDarkMode()
  const sum = unitXP(records)
  const next = nextPartOf(records)
  const ctx = {
    words: (data.realWords || []).filter((w) => w.isReal !== false).length,
    questions: data.assessment?.questions?.length || 0,
    engine: unit.engineLabel || 'Practice',
    engineFr: unit.engineLabelFr || unit.engineLabel || 'Entraînement',
  }
  const title = tr(lang, unit.title, null, unit.titleFr)
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

      <main className="mx-auto max-w-4xl px-4 pb-16 pt-6 sm:pt-10">
        <section className="flex flex-col-reverse items-start gap-6 rounded-3xl border-2 border-b-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="min-w-0 flex-1">
            <p className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1899d6]">
              <span>{unit.groupLabel}</span>
              <span className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-slate-500">{unit.label}</span>
              {unit.teacher && <span className="text-slate-400">{unit.teacher}</span>}
            </p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-black text-slate-800 dark:text-slate-100">{title}</h1>
            <p className="mt-2 max-w-xl font-semibold text-slate-500 dark:text-slate-400">{unit.subtitle}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {sum.done
                ? <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d7ffb8] dark:bg-green-900/40 px-3 py-1 text-sm font-black text-[#3c8a00] dark:text-green-300"><Check className="h-4 w-4" strokeWidth={3} /> {tr(lang, 'Unit finished', null, 'Unité terminée')}</span>
                : <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-sm font-bold text-slate-500">{tr(lang, `Finish: ${UNIT_DONE_XP} XP and the quiz`, null, `Pour finir : ${UNIT_DONE_XP} XP et le quiz`)}</span>}
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-black ${sum.bonus ? 'bg-[#fff4cc] dark:bg-yellow-900/40 text-[#cc9a00]' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                <Sparkles className="h-4 w-4" /> +{sum.bonus} / {UNIT_BONUS} {tr(lang, 'bonus', null, 'bonus')}
              </span>
            </div>
          </div>
          <Ring value={sum.xp} max={100} done={sum.done} />
        </section>

        {error && <p className="mt-4 rounded-2xl border-2 border-[#ff4b4b] bg-[#ffdfe0] dark:bg-red-900/30 p-4 font-bold text-[#c03030] dark:text-red-300">{error}</p>}

        <ol className="mt-6 space-y-3">
          {UNIT_PARTS.map((p, i) => {
            const rec = records[p.id]
            const { xp, bonus } = partXP(p, rec)
            const look = LOOK[p.id]
            const Icon = look.icon
            const state = rec?.runs ? 'done' : rec ? 'started' : 'new'
            const isNext = next?.id === p.id
            return (
              <li key={p.id}>
                <button type="button" onClick={() => onOpen(p.id)}
                  className={`group flex w-full items-center gap-4 rounded-3xl border-2 border-b-4 bg-white dark:bg-slate-900 p-4 sm:p-5 text-left transition-all hover:-translate-y-0.5 active:translate-y-0.5 active:border-b-2 ${isNext ? 'border-[#1cb0f6]' : 'border-slate-200 dark:border-slate-800'}`}>
                  <span className="relative inline-flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl border-b-4 text-white" style={{ background: look.face, borderColor: look.edge }}>
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2.4} />
                    <span className="absolute -left-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white dark:border-slate-900 bg-slate-700 text-[11px] font-black text-white">{i + 1}</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100">{tr(lang, p.title, null, p.titleFr)}</span>
                      {isNext && <span className="rounded-full bg-[#1cb0f6] px-2.5 py-0.5 text-[11px] font-black uppercase tracking-widest text-white">{tr(lang, 'Up next', null, 'À faire')}</span>}
                      {state === 'done' && <Check className="h-5 w-5 text-[#58cc02]" strokeWidth={3.5} aria-label="done" />}
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold text-slate-500 dark:text-slate-400">{about(p, ctx, lang)}</span>
                    <span className="mt-2 flex items-center gap-3">
                      <span className="h-2.5 w-full max-w-[14rem] overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <span className="block h-full rounded-full transition-all duration-700" style={{ width: `${(xp / p.xp) * 100}%`, background: look.face }} />
                      </span>
                      <span className="shrink-0 text-sm font-black text-slate-600 dark:text-slate-300">{xp} / {p.xp} XP</span>
                      {p.bonus > 0 && (
                        <span title={tr(lang, BONUS_FOR[p.id][0], null, BONUS_FOR[p.id][1])}
                          className={`hidden sm:inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-black ${bonus ? 'bg-[#fff4cc] dark:bg-yellow-900/40 text-[#cc9a00]' : 'text-slate-400'}`}>
                          <Star className={`h-3.5 w-3.5 ${bonus ? 'fill-current' : ''}`} /> +{p.bonus} {bonus ? '' : `· ${tr(lang, BONUS_FOR[p.id][0], null, BONUS_FOR[p.id][1])}`}
                        </span>
                      )}
                    </span>
                  </span>
                  <ChevronRight className="h-6 w-6 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#1cb0f6]" />
                </button>
              </li>
            )
          })}
        </ol>

        {unit.classroom && (
          <a href={classroomHref(unit.classroom, window.location.search)}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl px-4 py-3 font-bold text-slate-500 hover:bg-white dark:hover:bg-slate-900">
            <Presentation className="h-5 w-5 text-[#1cb0f6]" /> {tr(lang, 'The slides from class', null, 'Les diapos du cours')}
          </a>
        )}
      </main>
    </div>
  )
}
