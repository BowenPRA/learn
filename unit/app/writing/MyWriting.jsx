// My Writing (/unit/#/writing): the student's timed writing, read back: the best piece
// for each unit's writing task (essays.js shownEssays; the others are kept, not shown).
// The marks over time, the mistakes that keep coming back, writing still waiting
// (a draft, or handed in and not marked), and each essay with its report and any note
// from the teacher (/unit/#/writing/<id>). Reads src/lib/essays.js; never writes.
import { useEffect, useMemo, useState } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, ChevronLeft, Clock, FileText, Loader2, MessageSquare, Minus, Moon, PenLine, Sun, Trophy } from 'lucide-react'
import useDarkMode from '../../src/hooks/useDarkMode.js'
import { essayStats, markOf, markedOldestFirst, mistakeKinds, myEssays, shownEssays } from '../../../src/lib/essays.js'
import { UNITS, unitHref, unitKey } from '../../../src/data/units.js'
import Pip from '../../../src/components/Pip.jsx'
import EssayReport from './EssayReport.jsx'
import { TRAITS, fmtDate, fmtMinutes, markTone } from './look.js'

const VIOLET = { face: '#7C5CFF', edge: '#4B2FCF' }

const unitOf = (e) => UNITS.find((u) => unitKey(u) === e.unitKey)

/** The marks over time: the total out of 12 as a line, each part as a faint line under it. */
function Trend({ essays }) {
  const [showParts, setShowParts] = useState(false)
  if (essays.length < 2) {
    return <p className="text-[15px] font-semibold text-slate-500 dark:text-slate-400">Your marks will show here as a line once you have two pieces of writing.</p>
  }
  const W = 640, H = 220, L = 34, R = 34, T = 14, B = 34
  const x = (i) => L + (essays.length === 1 ? 0 : (i * (W - L - R)) / (essays.length - 1))
  const y = (v, max = 12) => T + (1 - v / max) * (H - T - B)
  const path = (vals, max) => vals.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v, max).toFixed(1)}`).join(' ')
  const totals = essays.map(markOf)
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={'Marks over time'}>
        {[0, 3, 6, 9, 12].map((v) => (
          <g key={v}>
            <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" />
            <text x={L - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fontWeight="700" fill="currentColor" className="text-slate-400">{v}</text>
          </g>
        ))}
        {showParts && TRAITS.map((t) => (
          <path key={t.key} d={path(essays.map((e) => e.report.traits[t.key] * 3), 12)} fill="none" stroke={t.ink} strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
        ))}
        <path d={path(totals, 12)} fill="none" stroke={VIOLET.face} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
        {totals.map((v, i) => (
          <g key={i}>
            <circle cx={x(i)} cy={y(v)} r="7" fill={markTone(v).face} stroke="white" strokeWidth="2.5" />
            <text x={x(i)} y={H - 12} textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor" className="text-slate-400">{fmtDate(essays[i].submittedAt).replace(/ \d{4}$/, '')}</text>
          </g>
        ))}
      </svg>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-slate-500">
        <span className="flex items-center gap-1.5"><span className="h-1 w-5 rounded-full" style={{ background: VIOLET.face }} />Mark out of 12</span>
        {showParts && TRAITS.map((t) => <span key={t.key} className="flex items-center gap-1.5"><span className="h-0.5 w-5 border-t-2 border-dashed" style={{ borderColor: t.ink }} />{t.label}</span>)}
        <button type="button" onClick={() => setShowParts((s) => !s)} className="ml-auto rounded-lg px-2 py-1 font-black uppercase tracking-widest text-violet-600 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-950/40">
          {showParts ? 'Hide the three parts' : 'Show the three parts'}
        </button>
      </div>
    </div>
  )
}

function Stat({ icon: Icon, label, value, sub, tone }) {
  return (
    <div className="rounded-3xl border-2 border-b-4 border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <p className="mb-1 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400"><Icon className="h-3.5 w-3.5" strokeWidth={3} />{label}</p>
      <p className="text-3xl font-black tabular-nums tracking-tight text-slate-800 dark:text-white" style={tone ? { color: tone } : undefined}>{value}</p>
      {sub && <p className="mt-0.5 text-xs font-bold text-slate-400">{sub}</p>}
    </div>
  )
}

function EssayRow({ e, onOpen }) {
  const u = unitOf(e)
  const mark = markOf(e)
  return (
    <button type="button" onClick={() => onOpen(e.id)}
      className="flex w-full items-center gap-4 rounded-2xl border-2 border-b-4 border-slate-200 bg-white px-4 py-3 text-left transition hover:border-violet-300 active:translate-y-0.5 active:border-b-2 dark:border-slate-800 dark:bg-slate-900">
      <span className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl text-white" style={{ background: markTone(mark).face }}>
        <span className="text-lg font-black leading-none">{e.report?.notMarked ? '–' : mark}</span>
        <span className="text-[9px] font-black text-white/80">/12</span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-black text-slate-800 dark:text-white">{e.prompt?.title}</span>
        <span className="block truncate text-sm font-semibold text-slate-500">
          {u ? `Unit ${u.label} · ` : ''}{fmtDate(e.submittedAt || e.startedAt)} · {e.wordCount} words
          {e.secondsUsed != null && <> · <Clock className="-mt-0.5 inline h-3.5 w-3.5" /> {fmtMinutes(e.secondsUsed)}</>}
        </span>
      </span>
      {e.teacherNote && <MessageSquare className="h-5 w-5 shrink-0 text-amber-500" strokeWidth={2.5} aria-label={'Note from your teacher'} />}
      <ArrowRight className="h-5 w-5 shrink-0 text-slate-300" />
    </button>
  )
}

/**
 * The student's own writing, or, for a teacher, one student's (`essays` handed in, with
 * `title` the student's name): the same page without the parts only the writer can use.
 */
export default function MyWriting({ id, onOpen, onBack, essays = null, title = '' }) {
  const [isDark, toggleDark] = useDarkMode()
  const [fetched, setFetched] = useState(null)
  const [error, setError] = useState('')
  const teacher = !!essays
  useEffect(() => {
    if (essays) return undefined
    let alive = true
    myEssays().then((l) => alive && setFetched(l)).catch((e) => { if (alive) { setError(e.message); setFetched([]) } })
    return () => { alive = false }
  }, [essays])
  const all = essays || fetched
  const list = useMemo(() => (all ? shownEssays(all) : null), [all])
  useEffect(() => { document.title = `${title || 'My Writing'} · PRA Learn`; window.scrollTo(0, 0) }, [id, title])

  const marked = useMemo(() => markedOldestFirst(list || []), [list])
  const stats = useMemo(() => essayStats(list || []), [list])
  // The mistakes that keep coming back count every marked piece, practice paragraphs too.
  const kinds = useMemo(() => mistakeKinds(markedOldestFirst(list || [], true).slice(-5)).slice(0, 5), [list])
  const waiting = teacher ? [] : (list || []).filter((e) => e.status !== 'marked')
  const done = (list || []).filter((e) => e.status === 'marked')
  const one = id ? (all || []).find((e) => e.id === id) : null
  const writingUnits = UNITS.filter((u) => !u.hidden && u.tasks.some((t) => t.kind === 'writing'))
  const search = window.location.search

  const header = (
    <header className="sticky top-0 z-20 border-b-2 border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
        <button type="button" onClick={onBack} aria-label={'Back'} className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><ChevronLeft className="h-6 w-6" strokeWidth={3} /></button>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ background: VIOLET.face }}><PenLine className="h-5 w-5" strokeWidth={2.5} /></span>
        <h1 className="flex-1 truncate text-xl font-black tracking-tight text-slate-800 dark:text-white">{title || 'My Writing'}</h1>
        <button type="button" onClick={toggleDark} aria-label="Light or dark" className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">{isDark ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}</button>
      </div>
    </header>
  )

  if (!list) {
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-950">{header}<div className="flex justify-center pt-24"><Loader2 className="h-10 w-10 animate-spin text-violet-500" /></div></div>
  }

  if (id) {
    return (
      <div className="min-h-screen bg-slate-50 pb-20 dark:bg-slate-950">
        {header}
        <main className="mx-auto max-w-5xl px-4 pt-6">
          {one?.report ? <EssayReport essay={one} /> : <p className="pt-16 text-center font-bold text-slate-500">That piece of writing is not here.</p>}
          <button type="button" onClick={() => onOpen(null)} className="mt-8 inline-flex items-center gap-2 rounded-2xl border-2 border-b-4 border-slate-200 bg-white px-5 py-3 font-black text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <ChevronLeft className="h-5 w-5" strokeWidth={3} />All my writing
          </button>
        </main>
      </div>
    )
  }

  const change = stats.change
  return (
    <div className="min-h-screen bg-slate-50 pb-20 dark:bg-slate-950">
      {header}
      <main className="mx-auto max-w-5xl space-y-6 px-4 pt-6">
        {error && <p className="rounded-2xl bg-rose-50 p-4 font-bold text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">{error}</p>}

        {done.length === 0 && waiting.length === 0 ? (
          <section className="flex flex-col items-center rounded-[2rem] border-2 border-b-4 border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
            <Pip mood="calm" size={120} />
            <h2 className="mt-3 text-2xl font-black text-slate-800 dark:text-white">No writing yet</h2>
            <p className="mt-1 max-w-md font-semibold text-slate-500">{teacher ? 'Nothing handed in yet.' : 'Every unit ends with a timed piece of writing. When you have done one, your marks and your writing will be here.'}</p>
            {!teacher && writingUnits[0] && (
              <a href={unitHref(writingUnits[0], search, writingUnits[0].tasks.find((t) => t.kind === 'writing').id)} className="mt-5 inline-flex items-center gap-2 rounded-2xl border-b-[5px] px-6 py-3.5 font-black uppercase tracking-widest text-white" style={{ background: VIOLET.face, borderColor: VIOLET.edge }}>
                Start writing <ArrowRight className="h-5 w-5" />
              </a>
            )}
          </section>
        ) : (
          <>
            <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <Stat icon={FileText} label={'Marked'} value={stats.count} sub={'pieces of writing'} />
              <Stat icon={change > 0 ? ArrowUpRight : change < 0 ? ArrowDownRight : Minus} label={'Latest'} value={stats.latest == null ? '–' : `${stats.latest}/12`} tone={markTone(stats.latest).face}
                sub={change == null ? '' : change > 0 ? `up ${change} from the one before` : change < 0 ? `down ${-change} from the one before` : 'same as the one before'} />
              <Stat icon={Trophy} label={'Best'} value={stats.best == null ? '–' : `${stats.best}/12`} tone={markTone(stats.best).face} />
              <Stat icon={PenLine} label={'Words written'} value={done.reduce((n, e) => n + (e.wordCount || 0), 0)} />
            </section>

            <section className="rounded-[2rem] border-2 border-b-4 border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="mb-4 text-lg font-black text-slate-800 dark:text-white">{teacher ? 'Marks over time' : 'Your marks over time'}</h2>
              <Trend essays={marked} />
            </section>

            {kinds.length > 0 && (
              <section className="rounded-[2rem] border-2 border-b-4 border-amber-200 bg-amber-50 p-5 sm:p-6 dark:border-amber-900 dark:bg-amber-950/30">
                <h2 className="text-lg font-black text-amber-900 dark:text-amber-100">What keeps coming back</h2>
                <p className="mb-3 text-sm font-semibold text-amber-800/80 dark:text-amber-300/80">{`In ${teacher ? 'the' : 'your'} last ${Math.min(5, marked.length) === 1 ? 'piece' : `${Math.min(5, marked.length)} pieces`} of writing.`}</p>
                <ul className="space-y-2">
                  {kinds.map((k) => (
                    <li key={k.kind} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 rounded-2xl bg-white/70 px-4 py-2.5 dark:bg-slate-900/50">
                      <span className="font-black text-slate-800 dark:text-white">{k.kind}</span>
                      <span className="text-sm font-bold text-amber-700 dark:text-amber-400">{`in ${k.essays} of ${Math.min(5, marked.length)}`}</span>
                      {k.rule && <span className="w-full text-sm font-semibold text-slate-500 dark:text-slate-400">{k.rule}</span>}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {waiting.length > 0 && (
              <section>
                <h2 className="mb-2 px-1 text-[11px] font-black uppercase tracking-widest text-slate-400">Not finished</h2>
                <div className="space-y-2">
                  {waiting.map((e) => {
                    const u = unitOf(e)
                    return (
                      <a key={e.id} href={u ? unitHref(u, search, e.taskId) : '#'} className="flex items-center gap-4 rounded-2xl border-2 border-b-4 border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900 dark:bg-amber-950/30">
                        <PenLine className="h-6 w-6 shrink-0 text-amber-600" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-black text-slate-800 dark:text-white">{e.prompt?.title}</span>
                          <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                            {e.status === 'draft' ? `Started ${fmtDate(e.startedAt)} · ${e.wordCount} words` : 'Handed in, waiting to be marked'}
                          </span>
                        </span>
                        <ArrowRight className="h-5 w-5 text-amber-500" />
                      </a>
                    )
                  })}
                </div>
              </section>
            )}

            {done.length > 0 && (
              <section>
                <h2 className="mb-2 px-1 text-[11px] font-black uppercase tracking-widest text-slate-400">{teacher ? 'All their writing' : 'All my writing'}</h2>
                <div className="space-y-2">{done.map((e) => <EssayRow key={e.id} e={e} onOpen={onOpen} />)}</div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  )
}
