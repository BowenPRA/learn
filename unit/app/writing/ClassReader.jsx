// A teacher reading a class's writing (/unit/#/writing/class/<class>/<essay>): the essay
// and the AI's report on the left; the teacher's own mark and note on the right; Previous
// and Next through the class's latest essays on the same prompt, by student name, so a
// set can be marked in one sitting. /unit/#/writing/class/<class>/student/<id> is one
// student's writing over time (My Writing, read by the teacher).
import { useEffect, useMemo, useState } from 'react'
import { AlertTriangle, ArrowLeft, ArrowRight, Check, ChevronLeft, Loader2, Moon, PenLine, Save, Sun, UserRound } from 'lucide-react'
import useDarkMode from '../../src/hooks/useDarkMode.js'
import { api } from '../../../src/lib/api.js'
import { classEssays, markOf, needsALook, noteEssay } from '../../../src/lib/essays.js'
import { className } from '../../../src/data/subjects.js'
import EssayReport from './EssayReport.jsx'
import MyWriting from './MyWriting.jsx'
import { flagLines, markTone } from './look.js'

const classPage = (classKey) => `${import.meta.env.BASE_URL}${window.location.search}#/t/${encodeURIComponent(classKey)}`

function useClass(classKey) {
  const [got, setGot] = useState(null)
  useEffect(() => {
    let alive = true
    ;(async () => {
      const [overview, me] = await Promise.all([api.classOverview(classKey), api.session().then((s) => api.me(s))])
      const students = overview?.students || []
      const list = await classEssays(classKey, students)
      if (alive) setGot({ students, list, me })
    })().catch((e) => alive && setGot({ students: [], list: [], me: null, error: e.message }))
    return () => { alive = false }
  }, [classKey])
  return [got, setGot]
}

function Panel({ essay, me, onSaved }) {
  const [score, setScore] = useState(essay.teacherScore ?? '')
  const [note, setNote] = useState(essay.teacherNote || '')
  const [state, setState] = useState('')
  const changed = String(score) !== String(essay.teacherScore ?? '') || note.trim() !== (essay.teacherNote || '')
  const save = async () => {
    setState('saving')
    try {
      const saved = await noteEssay(essay.id, { score: score === '' ? null : Number(score), note, by: me?.name || '' })
      onSaved(saved)
      setState('saved')
    } catch (e) { setState(e.message) }
  }
  const flags = flagLines(essay).filter((f) => f.warn)
  return (
    <div className="space-y-4 rounded-[1.5rem] border-2 border-violet-200 bg-white p-5 shadow-sm dark:border-violet-900 dark:bg-slate-900">
      <div>
        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">The AI&apos;s mark</p>
        <p className="text-2xl font-black text-slate-800 dark:text-white">{essay.report?.notMarked ? 'Not marked' : `${essay.score}/12`}</p>
      </div>
      {flags.length > 0 && (
        <ul className="space-y-1 rounded-xl bg-rose-50 p-3 text-sm font-bold text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
          {flags.map((f, i) => <li key={i} className="flex gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{f.text}</li>)}
        </ul>
      )}
      <label className="block">
        <span className="mb-1 block text-sm font-black text-slate-700 dark:text-slate-200">Your mark</span>
        <select value={score} onChange={(e) => { setScore(e.target.value); setState('') }}
          className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-3 py-2.5 font-bold text-slate-800 focus:border-violet-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
          <option value="">Keep the AI&apos;s mark</option>
          {Array.from({ length: 13 }, (_, i) => 12 - i).map((n) => <option key={n} value={n}>{n} / 12</option>)}
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-black text-slate-700 dark:text-slate-200">Note to the student</span>
        <textarea rows={5} value={note} onChange={(e) => { setNote(e.target.value); setState('') }} maxLength={4000}
          placeholder="What they did well, and the one thing to fix next time."
          className="w-full resize-y rounded-xl border-2 border-slate-200 bg-slate-50 px-3 py-2.5 text-[15px] font-medium text-slate-800 placeholder:text-slate-400 focus:border-violet-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
      </label>
      <button type="button" onClick={save} disabled={!changed || state === 'saving'}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border-b-[5px] border-violet-800 bg-violet-600 px-5 py-3 font-black uppercase tracking-widest text-white transition hover:bg-violet-700 active:translate-y-[3px] active:border-b-2 disabled:opacity-50">
        {state === 'saving' ? <Loader2 className="h-5 w-5 animate-spin" /> : state === 'saved' && !changed ? <Check className="h-5 w-5" strokeWidth={3} /> : <Save className="h-5 w-5" />}
        {state === 'saved' && !changed ? 'Saved' : 'Save'}
      </button>
      {state && !['saving', 'saved'].includes(state) && <p className="text-sm font-bold text-rose-600">{state}</p>}
      <p className="text-xs font-semibold text-slate-400">The student sees your mark and note in My Writing.</p>
    </div>
  )
}

export default function ClassReader({ classKey, id, studentId, onOpen, onStudent }) {
  const [isDark, toggleDark] = useDarkMode()
  const [got, setGot] = useClass(classKey)
  const essay = got?.list.find((e) => e.id === id) || null
  const nameOf = (sid) => got?.students.find((s) => s.id === sid)?.name || 'Student'
  // The class's latest essay from each student on the same prompt, by name.
  const set = useMemo(() => {
    if (!got || !essay) return []
    const latest = new Map()
    for (const e of got.list) if (e.unitKey === essay.unitKey && e.promptId === essay.promptId && !latest.has(e.studentId)) latest.set(e.studentId, e)
    if (!latest.has(essay.studentId) || latest.get(essay.studentId).id !== essay.id) latest.set(`${essay.studentId}:${essay.id}`, essay)
    const name = (e) => got.students.find((s) => s.id === e.studentId)?.name || ''
    return [...latest.values()].sort((a, b) => name(a).localeCompare(name(b)) || String(a.submittedAt).localeCompare(String(b.submittedAt)))
  }, [got, essay])
  const at = set.findIndex((e) => e.id === id)
  useEffect(() => { window.scrollTo(0, 0); document.title = 'Writing · PRA Learn' }, [id, studentId])

  const onSaved = (saved) => setGot((g) => ({ ...g, list: g.list.map((e) => (e.id === saved.id ? { ...e, ...saved, studentId: e.studentId } : e)) }))

  if (studentId && got) {
    const theirs = got.list.filter((e) => e.studentId === studentId)
    return <MyWriting essays={theirs} title={nameOf(studentId)} onOpen={(eid) => (eid ? onOpen(eid) : onStudent(studentId))} onBack={() => window.location.assign(classPage(classKey))} />
  }

  const header = (
    <header className="sticky top-0 z-20 border-b-2 border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <a href={classPage(classKey)} aria-label="Back to the class" className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><ChevronLeft className="h-6 w-6" strokeWidth={3} /></a>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C5CFF] text-white"><PenLine className="h-5 w-5" strokeWidth={2.5} /></span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-black uppercase tracking-widest text-slate-400">{className(classKey, 'en')} · Writing</p>
          <h1 className="truncate text-xl font-black tracking-tight text-slate-800 dark:text-white">{essay ? nameOf(essay.studentId) : 'Writing'}</h1>
        </div>
        <button type="button" onClick={toggleDark} aria-label="Light or dark" className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">{isDark ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}</button>
      </div>
    </header>
  )

  if (!got) return <div className="min-h-screen bg-slate-50 dark:bg-slate-950">{header}<div className="flex justify-center pt-24"><Loader2 className="h-10 w-10 animate-spin text-violet-500" /></div></div>
  if (!essay) return <div className="min-h-screen bg-slate-50 dark:bg-slate-950">{header}<p className="pt-16 text-center font-bold text-slate-500">{got.error || 'That piece of writing is not here.'}</p></div>

  const prev = set[at - 1]
  const next = set[at + 1]
  const navBtn = 'inline-flex items-center gap-2 rounded-2xl border-2 border-b-4 border-slate-200 bg-white px-4 py-2.5 font-black text-slate-600 transition hover:border-violet-300 active:translate-y-0.5 active:border-b-2 disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
  return (
    <div className="min-h-screen bg-slate-50 pb-20 dark:bg-slate-950">
      {header}
      <div className="mx-auto max-w-7xl px-4 pt-5">
        {/* Through the set: who is next, and where we are. */}
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <button type="button" className={navBtn} disabled={!prev} onClick={() => onOpen(prev.id)}><ArrowLeft className="h-5 w-5" strokeWidth={3} />{prev ? nameOf(prev.studentId) : 'Previous'}</button>
          <p className="flex-1 text-center text-sm font-bold text-slate-500">
            <span className="text-slate-800 dark:text-white">{essay.prompt?.title}</span> · {at + 1} of {set.length}
          </p>
          <button type="button" className={navBtn} disabled={!next} onClick={() => onOpen(next.id)}>{next ? nameOf(next.studentId) : 'Next'}<ArrowRight className="h-5 w-5" strokeWidth={3} /></button>
        </div>
        <div className="mb-5 flex flex-wrap gap-1.5">
          {set.map((e) => {
            const m = e.status === 'marked' && !e.report?.notMarked ? markOf(e) : null
            return (
              <button key={e.id} type="button" onClick={() => onOpen(e.id)} title={nameOf(e.studentId)}
                className={`flex h-9 min-w-[2.5rem] items-center justify-center gap-0.5 rounded-lg px-1.5 text-sm font-black text-white ${e.id === id ? 'ring-4 ring-violet-300 dark:ring-violet-700' : ''}`}
                style={{ background: markTone(m).face }}>
                {m ?? '–'}{needsALook(e) && <AlertTriangle className="h-3 w-3" strokeWidth={3} />}{e.teacherNote && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </button>
            )
          })}
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <EssayReport essay={essay} teacherView />
          <aside className="space-y-3 lg:sticky lg:top-24 lg:self-start">
            <Panel key={essay.id} essay={essay} me={got.me} onSaved={onSaved} />
            <button type="button" onClick={() => onStudent(essay.studentId)} className={`${navBtn} w-full justify-center`}>
              <UserRound className="h-5 w-5" />All writing by {nameOf(essay.studentId)}
            </button>
          </aside>
        </div>
      </div>
    </div>
  )
}
