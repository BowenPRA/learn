// A unit's timed writing task (kind 'writing' in src/data/units.js): pick a prompt from
// the unit's bank, plan, write against the clock, have it marked, then fix every mistake
// in the revision workshop. Every attempt is kept (src/lib/essays.js) and read back in
// My Writing (/unit/#/writing).
//
// The rules while writing, as on the Dashboard and stricter:
//   - paste, cut, copy and drag-and-drop are blocked, and spell check, autocomplete and
//     writing add-ons (Grammarly, LanguageTool, Chrome's suggestions) off (noAddOns.js);
//   - leaving the page, paste tries and big blocks of text appearing at once are counted
//     and shown to the teacher (and the student) beside the essay;
//   - the clock is the server's: it starts when the essay is started and keeps running if
//     the student leaves. At 0:00 the writing is handed in as it is.
//
// The task's XP: 8 parts for the mark out of 12, 2 for fixing the mistakes (marking.js
// essayScore). Saved when the mark arrives, and again after the corrections.
import { useEffect, useMemo, useRef, useState } from 'react'
import { AlertTriangle, ArrowRight, Bot, CheckCircle2, ClipboardList, Clock, EyeOff, FileText, Lock, PenLine, Redo2, RotateCcw, ScrollText, Sparkles, Undo2 } from 'lucide-react'
import TopBar from '../../src/components/TopBar.jsx'
import { essayScore } from '../../../supabase/functions/learn-grade-essay/marking.js'
import { markEssay, markOf, mistakeKinds, myEssays, newEssayId, saveEssay, saveRevision } from '../../../src/lib/essays.js'
import EssayReport from './EssayReport.jsx'
import { NO_ADDONS, addNames } from './noAddOns.js'
import { useAddOnWatch } from './useAddOnWatch.js'
import RevisionWorkshop from './RevisionWorkshop.jsx'
import { FramesPane, Planner } from './Planner.jsx'
import { kindOf } from './frames.js'
import { fmtDate, markTone } from './look.js'

const countWords = (s) => String(s || '').trim().split(/\s+/).filter(Boolean).length
const MIN_TO_SEND = 50          // the marker will not mark less (marking.js NON_SCORABLE_WORDS)
const BIG_INSERT = 60           // characters arriving in one change: counted as a block
const AUTOSAVE_MS = 12000
const HISTORY = 120

const mmss = (s) => `${String(Math.floor(Math.max(0, s) / 60)).padStart(2, '0')}:${String(Math.max(0, s) % 60).padStart(2, '0')}`

/** The prompt as saved with the essay: what the marker reads, and the title for lists. */
function promptRecord(cfg, p) {
  return {
    id: p.id, title: p.title, task: p.task, guidelines: p.guidelines || [],
    type: cfg.type, focus: cfg.focus ? { label: cfg.focus.label, look: cfg.focus.look } : null,
    minWords: cfg.minWords || 150, paragraphs: cfg.paragraphs || 1, practice: !!cfg.practice,
  }
}

function Button({ children, onClick, disabled, tone = 'violet', className = '' }) {
  const tones = {
    violet: 'bg-violet-600 hover:bg-violet-700 border-violet-800',
    green: 'bg-[#58cc02] hover:bg-[#61d800] border-[#58a700]',
    amber: 'bg-amber-500 hover:bg-amber-600 border-amber-700',
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      className={`flex items-center justify-center rounded-2xl border-b-[5px] px-8 py-4 text-lg font-black uppercase tracking-widest text-white transition-all active:translate-y-[5px] active:border-b-0 disabled:opacity-50 disabled:active:translate-y-0 disabled:active:border-b-[5px] ${tones[tone]} ${className}`}>
      {children}
    </button>
  )
}

export default function WritingTask({ unit, data, task, onSave, onQuit, onOpenEssay }) {
  // A unit's end-of-unit writing is `writing`; a short practice write (`practice: true`) is
  // named by its task (`task.writing`), may be shorter than 30 minutes, and is left out of
  // the marks-over-time line (essays.js markedOldestFirst).
  const cfg = useMemo(() => data[task.writing] || data.writing || {}, [data, task.writing])
  const prompts = useMemo(() => cfg.prompts || [], [cfg])
  const kind = kindOf(cfg.type)
  const unitKey = `${unit.track}/${unit.unit}`
  const minutes = Math.max(cfg.practice ? 5 : 30, cfg.minutes || 30)
  const planMinutes = cfg.practice ? 2 : 5
  const paras = cfg.paragraphs || 1
  const lengthLine = `At least ${cfg.minWords || 150} words in ${paras === 1 ? 'one paragraph' : `${paras} paragraphs`}.`

  const [stage, setStage] = useState('loading')   // loading start plan write marking report revise error
  const [mine, setMine] = useState([])
  const [pick, setPick] = useState(0)
  const [essay, setEssay] = useState(null)          // the saved row being written or read
  const [body, setBody] = useState('')
  const [plan, setPlan] = useState({})
  const [pane, setPane] = useState('task')
  const [deadline, setDeadline] = useState(0)
  const [now, setNow] = useState(() => Date.now())
  const [problem, setProblem] = useState('')
  const [hist, setHist] = useState({ stack: [''], i: 0 })

  const flags = useRef({ pasteTries: 0, tabAways: 0, secondsAway: 0, bigInserts: 0 })
  const hiddenAt = useRef(0)
  const lastSaved = useRef('')
  const boxRef = useRef(null)
  const inserting = useRef(false)
  const histTimer = useRef(null)
  const submitting = useRef(false)
  // The latest handIn and saveDraft, for the clock and the autosave timers.
  const latest = useRef({})

  const attempts = useMemo(() => mine.filter((e) => e.unitKey === unitKey && e.taskId === task.id), [mine, unitKey, task.id])
  const watch = useMemo(() => mistakeKinds(mine.filter((e) => e.status === 'marked').slice(0, 5)).slice(0, 3), [mine])
  const current = prompts[pick]

  /* ---- loading: past attempts, and a draft or unmarked essay to go back to ---- */
  useEffect(() => {
    let alive = true
    myEssays().then((list) => {
      if (!alive) return
      setMine(list)
      const done = new Set(list.filter((e) => e.unitKey === unitKey && e.taskId === task.id).map((e) => e.promptId))
      const fresh = prompts.findIndex((p) => !done.has(p.id))
      setPick(fresh >= 0 ? fresh : 0)
      setStage('start')
    }).catch((e) => { if (alive) { setProblem(e.message); setStage('start') } })
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitKey, task.id])

  const pending = attempts.find((e) => e.status === 'draft' || e.status === 'submitted' || e.status === 'error')
  const running = stage === 'plan' || stage === 'write'
  const secondsLeft = deadline ? Math.ceil((deadline - now) / 1000) : minutes * 60

  /* ---- the clock ---- */
  useEffect(() => {
    if (!running) return undefined
    const id = setInterval(() => setNow(Date.now()), 500)
    return () => clearInterval(id)
  }, [running])

  const record = (patch = {}) => ({
    id: essay?.id, unitKey, taskId: task.id, classKey: unit.classKey, promptId: essay?.promptId || current?.id,
    prompt: essay?.prompt || promptRecord(cfg, current), minutesAllowed: minutes, body, plan, flags: { ...flags.current }, ...patch,
  })

  /* ---- marking ---- */
  const sendForMarking = async (id) => {
    setStage('marking')
    setProblem('')
    try {
      const marked = await markEssay(id)
      setEssay(marked)
      setMine((list) => [marked, ...list.filter((e) => e.id !== marked.id)])
      onSave?.({ score: essayScore(marked.report, null), finished: true, saved: { essay: marked.id } })
      setStage('report')
    } catch (e) {
      setProblem(e.message)
      setStage('error')
    }
  }

  const handIn = async (timedOut = false) => {
    if (submitting.current) return
    submitting.current = true
    try {
      if (timedOut) flags.current.timedOut = true
      const saved = await saveEssay(record({ flags: { ...flags.current } }), { submit: true })
      setEssay(saved)
      await sendForMarking(saved.id)
    } catch (e) {
      setProblem(e.message)
      setStage('error')
    } finally {
      submitting.current = false
    }
  }

  // At 0:00 the writing is handed in as it is.
  useEffect(() => {
    if (running && deadline && secondsLeft <= 0) latest.current.handIn?.(true)
  }, [running, deadline, secondsLeft])

  /* ---- saving as they write ---- */
  const saveDraft = async () => {
    if (!essay?.id || !running) return
    const sig = `${body}\u0000${JSON.stringify(plan)}\u0000${JSON.stringify(flags.current)}`
    if (sig === lastSaved.current) return
    lastSaved.current = sig
    try {
      const saved = await saveEssay(record())
      // Past the server's deadline it hands the essay in itself: go straight to marking.
      if (saved && saved.status !== 'draft') { setEssay(saved); sendForMarking(saved.id) }
    } catch (e) { setProblem(e.message) }
  }
  useEffect(() => { latest.current = { handIn, saveDraft } })

  useEffect(() => {
    if (!running) return undefined
    const id = setInterval(() => latest.current.saveDraft?.(), AUTOSAVE_MS)
    return () => clearInterval(id)
  }, [running])

  // Leaving the page: counted, and the draft saved on the way out.
  useEffect(() => {
    if (!running) return undefined
    const onVis = () => {
      if (document.visibilityState === 'hidden') {
        flags.current.tabAways += 1
        hiddenAt.current = Date.now()
        latest.current.saveDraft?.()
      } else if (hiddenAt.current) {
        flags.current.secondsAway += Math.round((Date.now() - hiddenAt.current) / 1000)
        hiddenAt.current = 0
      }
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [running])

  // A writing add-on working in the box anyway (Grammarly, LanguageTool): the student
  // is told to turn it off, and it is noted for the teacher (flags.addOns).
  const addOns = useAddOnWatch(boxRef, stage === 'write')
  useEffect(() => {
    if (addOns.length) flags.current.addOns = addNames(flags.current.addOns || [], addOns)
  }, [addOns])

  /* ---- starting and going back ---- */
  const start = async () => {
    setProblem('')
    flags.current = { pasteTries: 0, tabAways: 0, secondsAway: 0, bigInserts: 0 }
    setBody(''); setPlan({}); setHist({ stack: [''], i: 0 }); lastSaved.current = ''
    try {
      const fresh = { id: newEssayId(), unitKey, taskId: task.id, classKey: unit.classKey, promptId: current.id, prompt: promptRecord(cfg, current), minutesAllowed: minutes, body: '', plan: {}, flags: { ...flags.current } }
      const saved = await saveEssay(fresh)
      setEssay(saved)
      setDeadline(Date.parse(saved.startedAt) + minutes * 60000)
      setNow(Date.now())
      setStage('plan')
    } catch (e) { setProblem(e.message) }
  }

  const resume = async (e) => {
    if (e.status !== 'draft') { setEssay(e); sendForMarking(e.id); return }
    const end = Date.parse(e.startedAt) + e.minutesAllowed * 60000
    flags.current = { pasteTries: 0, tabAways: 0, secondsAway: 0, bigInserts: 0, ...e.flags }
    setEssay(e); setBody(e.body || ''); setPlan(e.plan || {}); setHist({ stack: [e.body || ''], i: 0 })
    setPick(Math.max(0, prompts.findIndex((p) => p.id === e.promptId)))
    setDeadline(end); setNow(Date.now())
    if (end <= Date.now()) {
      flags.current.timedOut = true
      try { const saved = await saveEssay({ ...e, flags: { ...flags.current } }, { submit: true }); setEssay(saved); sendForMarking(saved.id) } catch (err) { setProblem(err.message); setStage('error') }
      return
    }
    setStage('write')
  }

  const quit = async () => {
    if (running) await saveDraft()
    onQuit?.()
  }

  /* ---- the writing box ---- */
  const pushHist = (val) => setHist((h) => (h.stack[h.i] === val ? h : { stack: h.stack.slice(0, h.i + 1).concat(val).slice(-HISTORY), i: Math.min(h.i + 1, HISTORY - 1) }))
  const change = (val) => {
    if (!inserting.current && val.length - body.length > BIG_INSERT) flags.current.bigInserts += 1
    inserting.current = false
    setBody(val)
    clearTimeout(histTimer.current)
    histTimer.current = setTimeout(() => pushHist(val), 500)
  }
  useEffect(() => () => clearTimeout(histTimer.current), [])
  const undo = () => {
    clearTimeout(histTimer.current)
    let { stack, i } = hist
    if (stack[i] !== body) { stack = stack.slice(0, i + 1).concat(body).slice(-HISTORY); i = stack.length - 1 }
    if (i <= 0) { setHist({ stack, i }); return }
    setHist({ stack, i: i - 1 }); setBody(stack[i - 1])
  }
  const redo = () => { if (hist.i < hist.stack.length - 1) { setHist({ ...hist, i: hist.i + 1 }); setBody(hist.stack[hist.i + 1]) } }
  const onKeyDown = (e) => {
    if (!(e.ctrlKey || e.metaKey)) return
    const k = e.key.toLowerCase()
    if (k === 'z' && !e.shiftKey) { e.preventDefault(); undo() } else if ((k === 'z' && e.shiftKey) || k === 'y') { e.preventDefault(); redo() } else if (k === 'v') { e.preventDefault(); flags.current.pasteTries += 1 }
  }
  const block = (e) => { e.preventDefault(); if (e.type === 'paste' || e.type === 'drop') flags.current.pasteTries += 1 }
  const onBeforeInput = (e) => {
    const t = e.nativeEvent?.inputType || ''
    if (t === 'insertFromPaste' || t === 'insertFromDrop' || t === 'insertFromPasteAsQuotation') { e.preventDefault(); flags.current.pasteTries += 1 }
  }
  const insertFrame = (text) => {
    const box = boxRef.current
    const startAt = box ? box.selectionStart ?? body.length : body.length
    const endAt = box ? box.selectionEnd ?? startAt : startAt
    const before = body.slice(0, startAt)
    const lead = before && !/\s$/.test(before) ? ' ' : ''
    const next = `${before}${lead}${text}${body.slice(endAt)}`
    inserting.current = true
    setBody(next); pushHist(next)
    const caret = before.length + lead.length + text.length
    setTimeout(() => { boxRef.current?.focus(); boxRef.current?.setSelectionRange(caret, caret) }, 0)
  }

  /* ---- after the mark ---- */
  const finishRevision = async (revision) => {
    try {
      const saved = await saveRevision(essay.id, revision)
      if (saved) setEssay(saved)
      onSave?.({ score: essayScore(essay.report, revision), finished: false, saved: { essay: essay.id } })
    } catch (e) { setProblem(e.message) }
    onQuit?.()
  }

  /* ---- screens ---- */
  const words = countWords(body)
  const minWords = cfg.minWords || 150
  const p = essay?.prompt || (current ? promptRecord(cfg, current) : {})
  const taskText = (pr) => pr.task
  const guide = (pr) => pr.guidelines || []
  const promptSrc = prompts.find((x) => x.id === p.id) || current || {}
  const quitLabel = running ? 'Save & leave' : stage === 'start' ? 'Back' : 'Done'
  const top = (
    <TopBar onQuit={quit} current={0} total={1} progress={running ? Math.min(100, 100 - (secondsLeft / (minutes * 60)) * 100) : stage === 'report' || stage === 'revise' ? 100 : 0}
      modeTitle={cfg.practice ? 'One paragraph' : 'Timed writing'} timeLeft={running ? Math.max(0, secondsLeft) : undefined}
      quitLabel={quitLabel} />
  )

  if (stage === 'loading') return <div className="min-h-screen bg-slate-50 dark:bg-slate-950">{top}</div>

  if (!current) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">{top}
        <p className="mx-auto mt-16 max-w-xl text-center text-lg font-bold text-slate-500">This unit has no writing task yet.</p>
      </div>
    )
  }

  if (stage === 'start') {
    return (
      <div className="min-h-screen bg-slate-50 pb-24 dark:bg-slate-950">
        {top}
        <div className="mx-auto max-w-4xl space-y-5 px-4 pt-6 sm:px-6">
          <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-[11px] font-black uppercase tracking-widest text-violet-600 dark:text-violet-400">{kind.label} · {minutes} minutes</p>
            <h1 className="mt-1 text-3xl font-black leading-tight text-slate-800 sm:text-4xl dark:text-white">{current.title}</h1>
            <p className="mt-4 text-lg font-bold leading-relaxed text-slate-700 dark:text-slate-200">{taskText(current)}</p>
            {guide(current).length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {guide(current).map((g, i) => <li key={i} className="flex items-start gap-3 text-[15px] font-semibold text-slate-600 dark:text-slate-300"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-violet-500" />{g}</li>)}
              </ul>
            )}
            <p className="mt-5 border-t border-slate-100 pt-4 text-sm font-bold text-slate-500 dark:border-slate-800 dark:text-slate-400">
              {lengthLine}
              {cfg.focus && <> This unit: <span className="text-violet-600 dark:text-violet-400">{cfg.focus.label}</span>.</>}
            </p>
            {prompts.length > 1 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {prompts.map((x, i) => {
                  const tries = attempts.filter((e) => e.promptId === x.id && e.status === 'marked')
                  return (
                    <button key={x.id} type="button" onClick={() => setPick(i)}
                      className={`rounded-xl border-2 px-3 py-2 text-left text-sm font-bold transition ${i === pick ? 'border-violet-500 bg-violet-50 text-violet-800 dark:bg-violet-950/40 dark:text-violet-200' : 'border-slate-200 text-slate-600 hover:border-violet-300 dark:border-slate-700 dark:text-slate-300'}`}>
                      {x.title}{tries.length > 0 && <span className="ml-2 text-xs text-slate-400">✓ {Math.max(...tries.map(markOf))}/12</span>}
                    </button>
                  )
                })}
              </div>
            )}
          </section>

          <section className="rounded-[1.5rem] border-2 border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-slate-500">The rules</p>
            <ul className="grid gap-3 text-[15px] font-semibold text-slate-700 sm:grid-cols-2 dark:text-slate-200">
              <li className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-violet-500" strokeWidth={2.5} />{`${minutes} minutes, with about ${planMinutes} to plan. The clock keeps going if you leave.`}</li>
              <li className="flex gap-3"><Lock className="h-5 w-5 shrink-0 text-violet-500" strokeWidth={2.5} />No copy and paste, no spell check, no Grammarly or other add-ons.</li>
              <li className="flex gap-3"><EyeOff className="h-5 w-5 shrink-0 text-violet-500" strokeWidth={2.5} />Leaving this page is noted for your teacher.</li>
              <li className="flex gap-3"><PenLine className="h-5 w-5 shrink-0 text-violet-500" strokeWidth={2.5} />At 0:00 your writing is handed in as it is.</li>
            </ul>
          </section>

          {watch.length > 0 && (
            <section className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/30">
              <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-400">Watch for these: they keep coming back</p>
              <ul className="space-y-1 text-[15px] font-semibold text-amber-900 dark:text-amber-100">
                {watch.map((w) => <li key={w.kind}><b>{w.kind}</b>{w.rule ? `: ${w.rule}` : ''}</li>)}
              </ul>
            </section>
          )}

          {problem && <p className="flex items-start gap-2 rounded-2xl bg-rose-50 p-4 font-bold text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"><AlertTriangle className="h-5 w-5 shrink-0" />{problem}</p>}

          {pending ? (
            <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border-2 border-amber-200 bg-amber-50 px-5 py-4 sm:flex-row dark:border-amber-800 dark:bg-amber-900/20">
              <span className="text-sm font-bold text-amber-800 dark:text-amber-300">
                {pending.status === 'draft'
                  ? `You have unfinished writing: "${pending.prompt?.title}", ${countWords(pending.body)} words.`
                  : `"${pending.prompt?.title}" was handed in but not marked yet.`}
              </span>
              <Button tone="amber" onClick={() => resume(pending)} className="!px-5 !py-2.5 !text-sm">
                {pending.status === 'draft' ? 'Go back to it' : 'Mark it now'}
              </Button>
            </div>
          ) : (
            <div className="flex justify-end">
              <Button onClick={start}>{`Start: ${minutes} minutes`} <ArrowRight className="ml-3 h-6 w-6" /></Button>
            </div>
          )}

          {attempts.filter((e) => e.status === 'marked').length > 0 && (
            <section>
              <p className="mb-2 px-1 text-[11px] font-black uppercase tracking-widest text-slate-400">Your writing in this unit</p>
              <div className="space-y-2">
                {attempts.filter((e) => e.status === 'marked').map((e) => (
                  <button key={e.id} type="button" onClick={() => onOpenEssay?.(e.id)}
                    className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-violet-300 dark:border-slate-800 dark:bg-slate-900">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-black text-white" style={{ background: markTone(markOf(e)).face }}>{markOf(e)}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-black text-slate-800 dark:text-white">{e.prompt?.title}</span>
                      <span className="text-sm font-semibold text-slate-500">{fmtDate(e.submittedAt)} · {e.wordCount} words</span>
                    </span>
                    <FileText className="h-5 w-5 text-slate-300" />
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    )
  }

  if (stage === 'plan') {
    return (
      <div className="min-h-screen bg-slate-50 pb-24 dark:bg-slate-950">
        {top}
        <div className="mx-auto grid max-w-6xl gap-6 px-4 pt-6 sm:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <section className="h-fit rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">{p.title}</p>
            <p className="mt-2 text-[17px] font-bold leading-relaxed text-slate-800 dark:text-white">{taskText(promptSrc)}</p>
            <ul className="mt-3 space-y-1">{guide(promptSrc).map((g, i) => <li key={i} className="text-[14px] font-semibold text-slate-500 dark:text-slate-400">· {g}</li>)}</ul>
          </section>
          <Planner type={cfg.type} minutes={planMinutes} examples={promptSrc.plan} plan={plan} onChange={setPlan} onStart={() => { setStage('write'); setTimeout(() => boxRef.current?.focus(), 50) }} />
        </div>
      </div>
    )
  }

  if (stage === 'write') {
    const panes = [['task', ScrollText, 'Task'], ['frames', Sparkles, 'Frames'], ['plan', ClipboardList, 'My plan']]
    const low = secondsLeft <= 300
    return (
      <div className="min-h-screen bg-slate-50 pb-24 dark:bg-slate-950">
        {top}
        <div className="mx-auto flex max-w-[92rem] flex-col gap-6 px-4 pt-6 sm:px-6 lg:flex-row">
          <aside className="w-full lg:w-[38%]">
            <div className="flex max-h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm lg:sticky lg:top-24 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex gap-1 border-b border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-800/50">
                {panes.map(([id, Icon, label]) => (
                  <button key={id} type="button" onClick={() => setPane(id)}
                    className={`flex items-center rounded-lg px-3 py-1.5 text-[11px] font-black uppercase tracking-widest transition ${pane === id ? 'bg-violet-600 text-white' : 'text-slate-500 hover:bg-white dark:text-slate-400 dark:hover:bg-slate-800'}`}>
                    <Icon className="mr-1.5 h-3.5 w-3.5" strokeWidth={2.5} />{label}
                  </button>
                ))}
              </div>
              <div className="overflow-y-auto">
                {pane === 'task' && (
                  <div className="px-6 py-5">
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">{p.title}</p>
                    <p className="mt-2 text-[17px] font-bold leading-relaxed text-slate-800 dark:text-white">{taskText(promptSrc)}</p>
                    <ul className="mt-3 space-y-1.5">{guide(promptSrc).map((g, i) => <li key={i} className="flex gap-2 text-[15px] font-semibold text-slate-600 dark:text-slate-300"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />{g}</li>)}</ul>
                    <p className="mt-4 border-t border-slate-100 pt-3 text-xs font-bold text-slate-400 dark:border-slate-800">{paras === 1 ? lengthLine : `${lengthLine} Press Enter to start a new paragraph.`}</p>
                  </div>
                )}
                {pane === 'frames' && <FramesPane type={cfg.type} extra={cfg.frames} onInsert={insertFrame} />}
                {pane === 'plan' && <div className="px-6 py-5"><Planner type={cfg.type} examples={promptSrc.plan} plan={plan} onChange={setPlan} compact /></div>}
              </div>
            </div>
          </aside>

          <section className="w-full lg:w-[62%]">
            <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-800/50">
                <div className="flex items-center gap-1">
                  <button type="button" onClick={undo} title="Undo (Ctrl+Z)" className="rounded-lg p-2 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"><Undo2 className="h-4 w-4" strokeWidth={2.5} /></button>
                  <button type="button" onClick={redo} title="Redo (Ctrl+Y)" className="rounded-lg p-2 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"><Redo2 className="h-4 w-4" strokeWidth={2.5} /></button>
                  <span className="mx-1.5 h-5 w-px bg-slate-200 dark:bg-slate-700" />
                  <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400"><Lock className="mr-1.5 h-3.5 w-3.5" strokeWidth={2.5} />No paste · no spell check · no add-ons</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-black uppercase tracking-widest tabular-nums ${words >= minWords ? 'text-emerald-600' : 'text-slate-400'}`}>{words} / {minWords}</span>
                  <span className={`flex items-center rounded-xl border-2 px-3 py-1 text-sm font-black tabular-nums ${low ? 'border-rose-300 bg-rose-100 text-rose-600 dark:border-rose-800 dark:bg-rose-950/40' : 'border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                    <Clock className="mr-1.5 h-4 w-4" strokeWidth={3} />{mmss(secondsLeft)}
                  </span>
                </div>
              </div>
              {addOns.length > 0 && (
                <div role="alert" className="flex items-start gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-bold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.5} />
                  <span>{`${addOns.join(' and ')} ${addOns.length > 1 ? 'are' : 'is'} working in this box. Turn it off for this site: your writing must be your own. Your teacher sees this on the report.`}</span>
                </div>
              )}
              <textarea
                ref={boxRef}
                data-role="response"
                value={body}
                onChange={(e) => change(e.target.value)}
                onKeyDown={onKeyDown}
                onBeforeInput={onBeforeInput}
                onPaste={block} onCopy={block} onCut={block} onDrop={block} onDragOver={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
                {...NO_ADDONS}
                placeholder={'Start writing here…'}
                className="h-[28rem] w-full resize-none bg-transparent px-6 py-6 text-lg font-medium leading-[1.9] text-slate-800 placeholder:text-slate-400 focus:outline-none sm:px-8 dark:text-slate-100"
              />
            </div>
            <div className="mt-5 flex flex-col items-center justify-between gap-3 sm:flex-row">
              <span className={`text-sm font-bold ${words >= minWords ? 'text-emerald-600' : 'text-slate-400'}`}>
                {words < MIN_TO_SEND
                  ? `${MIN_TO_SEND - words} more words before you can hand in.`
                  : words < minWords
                    ? `You can hand in, but ${minWords}+ words scores better.`
                    : 'Read it through once, then hand it in.'}
              </span>
              <Button onClick={() => handIn(false)} disabled={words < MIN_TO_SEND}>Hand in <ArrowRight className="ml-3 h-6 w-6" /></Button>
            </div>
          </section>
        </div>
      </div>
    )
  }

  if (stage === 'marking') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {top}
        <div className="mx-auto mt-16 flex max-w-md flex-col items-center rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="mb-4 rounded-full bg-violet-100 p-4 dark:bg-violet-900/40"><Bot className="h-9 w-9 animate-bounce text-violet-600" /></span>
          <h2 className="text-xl font-black text-slate-800 dark:text-white">Your writing is being marked…</h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">This takes up to a minute. Your writing is already saved.</p>
        </div>
      </div>
    )
  }

  if (stage === 'error') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {top}
        <div className="mx-auto mt-16 max-w-lg rounded-[1.5rem] border border-orange-200 bg-orange-50 p-8 dark:border-orange-900 dark:bg-orange-950/30">
          <h2 className="flex items-center gap-2 text-xl font-black text-orange-800 dark:text-orange-300"><AlertTriangle className="h-6 w-6" />Not marked yet</h2>
          <p className="mt-2 font-semibold text-orange-800 dark:text-orange-300">{problem}</p>
          <p className="mt-1 text-sm font-semibold text-orange-700/80 dark:text-orange-400">Your writing is saved. You can try again now or later from this task.</p>
          {essay?.id && <Button tone="amber" className="mt-5" onClick={() => sendForMarking(essay.id)}><RotateCcw className="mr-2 h-5 w-5" />Try again</Button>}
        </div>
      </div>
    )
  }

  if (stage === 'revise') {
    return (
      <div className="min-h-screen bg-slate-50 pb-24 dark:bg-slate-950">
        {top}
        <RevisionWorkshop originalText={essay.body} revisions={essay.report?.revisions || []} onBackToScore={() => setStage('report')} onFinish={finishRevision} />
      </div>
    )
  }

  // The report, then Part 2.
  const r = essay?.report
  const n = r?.revisions?.length || 0
  return (
    <div className="min-h-screen bg-slate-50 pb-24 dark:bg-slate-950">
      {top}
      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
        <EssayReport essay={essay} />
        {r && !r.notMarked ? (
          <section className="mt-8 rounded-[1.5rem] border-2 border-violet-200 bg-white p-6 shadow-sm sm:p-8 dark:border-violet-900 dark:bg-slate-900">
            <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-violet-600 dark:text-violet-400">Part 2 of 2 · Corrections</p>
            <h2 className="mb-2 text-2xl font-black text-slate-800 dark:text-white">
              {n ? `Now fix the ${n} mistake${n === 1 ? '' : 's'}` : 'No mistakes to fix'}
            </h2>
            <p className="mb-6 max-w-2xl text-[15px] font-medium text-slate-500 dark:text-slate-400">
              {n ? 'One sentence at a time: you see what is wrong and what to write instead, and you type the sentence again. Fixing them earns the last of this task’s XP.' : 'Collect the last of this task’s XP.'}
            </p>
            <div className="flex justify-end"><Button onClick={() => setStage('revise')}>{n ? 'Start corrections' : 'Finish'} <ArrowRight className="ml-3 h-6 w-6" /></Button></div>
          </section>
        ) : (
          <div className="mt-8 flex justify-end"><Button onClick={onQuit}>Back to the unit</Button></div>
        )}
      </div>
    </div>
  )
}
