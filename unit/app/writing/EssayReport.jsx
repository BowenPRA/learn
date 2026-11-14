// One marked essay, read back: the mark out of 12, the three parts with the marker's
// reasons, the unit's grammar focus, what to do next, any caps and flags, the teacher's
// note, and the essay with each mistake marked. The writing task shows it the moment
// the mark arrives; My Writing and the teacher's view show the same thing later.
import { useState } from 'react'
import { AlertTriangle, ChevronDown, Clock, MessageSquare, Sparkles, Target, ThumbsUp, TrendingUp } from 'lucide-react'
import { tr } from '../../src/utils/lang.js'
import { markOf } from '../../../src/lib/essays.js'
import { TRAITS, flagLines, fmtDate, fmtMinutes, markTone } from './look.js'

/** The essay's text with each quoted mistake underlined; a number links it to the list. */
export function MarkedText({ text, revisions = [] }) {
  const spans = []
  let from = 0
  revisions.forEach((r, n) => {
    if (!r.quote) return
    const at = text.indexOf(r.quote, from) >= 0 ? text.indexOf(r.quote, from) : text.indexOf(r.quote)
    if (at < 0 || spans.some((s) => at < s.end && at + r.quote.length > s.start)) return
    spans.push({ start: at, end: at + r.quote.length, n: n + 1 })
    from = at + r.quote.length
  })
  spans.sort((a, b) => a.start - b.start)
  const out = []
  let i = 0
  for (const s of spans) {
    if (s.start > i) out.push(<span key={`t${i}`}>{text.slice(i, s.start)}</span>)
    out.push(
      <mark key={`m${s.start}`} className="rounded bg-rose-100 px-0.5 text-inherit underline decoration-rose-400 decoration-2 underline-offset-4 dark:bg-rose-900/40">
        {text.slice(s.start, s.end)}<sup className="ml-0.5 text-[10px] font-black text-rose-500">{s.n}</sup>
      </mark>,
    )
    i = s.end
  }
  if (i < text.length) out.push(<span key="end">{text.slice(i)}</span>)
  return <p className="whitespace-pre-wrap text-[17px] font-medium leading-[1.9] text-slate-800 dark:text-slate-100">{out}</p>
}

function Dots({ value, max = 4, face }) {
  return (
    <span className="flex gap-1" aria-label={`${value} of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className="h-2.5 w-6 rounded-full" style={{ background: i < value ? face : 'rgb(148 163 184 / 0.3)' }} />
      ))}
    </span>
  )
}

export default function EssayReport({ essay, lang = 'en', showText = true, teacherView = false }) {
  const [openRevised, setOpenRevised] = useState(false)
  const r = essay?.report
  if (!r) return null
  const mark = markOf(essay)
  const tone = markTone(mark)
  const flags = flagLines(essay, lang)
  const p = essay.prompt || {}

  return (
    <div className="space-y-5">
      {/* The mark, and what the essay was. */}
      <section className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-5 p-6 sm:p-7">
          <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-3xl border-b-[5px] text-white" style={{ background: tone.face, borderColor: tone.edge }}>
            <span className="text-4xl font-black tabular-nums leading-none">{r.notMarked ? '–' : mark}</span>
            <span className="text-xs font-black uppercase tracking-widest text-white/80">/ 12</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">{fmtDate(essay.submittedAt || essay.startedAt, lang)}</p>
            <h3 className="mt-1 text-2xl font-black leading-tight text-slate-800 dark:text-white">{tr(lang, p.title, p.titleVn)}</h3>
            <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-bold text-slate-500 dark:text-slate-400">
              <span>{r.wordCount} {tr(lang, 'words', 'từ')}</span>
              <span>{r.paragraphs} {tr(lang, r.paragraphs === 1 ? 'paragraph' : 'paragraphs', 'đoạn')}</span>
              {essay.secondsUsed != null && <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" strokeWidth={3} />{fmtMinutes(essay.secondsUsed)} / {essay.minutesAllowed} min</span>}
            </p>
            {essay.teacherScore != null && essay.teacherScore !== essay.score && (
              <p className="mt-1 text-xs font-bold text-slate-400">{teacherView ? `The teacher's mark. The AI gave ${essay.score}.` : tr(lang, `Your teacher's mark. The AI gave ${essay.score}.`, `Điểm của giáo viên. AI cho ${essay.score}.`)}</p>
            )}
          </div>
        </div>
        {r.notMarked && (
          <p className="flex items-start gap-2 border-t border-rose-200 bg-rose-50 px-6 py-4 text-[15px] font-bold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2.5} /> {r.notMarked}
          </p>
        )}
      </section>

      {essay.teacherNote && (
        <section className="rounded-[1.5rem] border-2 border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/30">
          <p className="mb-1 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-400">
            <MessageSquare className="h-4 w-4" strokeWidth={2.5} /> {essay.teacherBy || tr(lang, 'Your teacher', 'Giáo viên')}
          </p>
          <p className="whitespace-pre-wrap text-[16px] font-semibold leading-relaxed text-amber-900 dark:text-amber-100">{essay.teacherNote}</p>
        </section>
      )}

      {/* The three parts. */}
      {!r.notMarked && (
        <section className="grid gap-4 md:grid-cols-3">
          {TRAITS.map((t) => (
            <div key={t.key} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-2 flex items-center justify-between gap-2">
                <h4 className="text-sm font-black uppercase tracking-widest" style={{ color: t.ink }}>{tr(lang, t.label, t.labelVn)}</h4>
                <span className="text-lg font-black tabular-nums text-slate-800 dark:text-white">{r.traits[t.key]}<span className="text-sm text-slate-400">/4</span></span>
              </div>
              <Dots value={r.traits[t.key]} face={t.ink} />
              <p className="mt-3 text-[15px] font-medium leading-relaxed text-slate-600 dark:text-slate-300">{r.feedback[t.key]}</p>
            </div>
          ))}
        </section>
      )}

      {(r.focus?.label || r.nextStep || r.strengths?.length > 0) && !r.notMarked && (
        <section className="grid gap-4 md:grid-cols-2">
          {r.strengths?.length > 0 && (
            <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/30">
              <p className="mb-2 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400"><ThumbsUp className="h-4 w-4" strokeWidth={2.5} /> {tr(lang, 'What worked', 'Điểm tốt')}</p>
              <ul className="space-y-1 text-[15px] font-semibold text-emerald-900 dark:text-emerald-100">{r.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
          )}
          {r.focus?.label && (
            <div className="rounded-[1.5rem] border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/30">
              <p className="mb-2 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-violet-700 dark:text-violet-400"><Target className="h-4 w-4" strokeWidth={2.5} /> {tr(lang, 'This unit', 'Bài này')}: {r.focus.label}</p>
              <p className="text-[15px] font-semibold text-violet-900 dark:text-violet-100">
                {r.focus.count === 0 ? tr(lang, 'No mistakes of this kind. ', 'Không có lỗi loại này. ') : tr(lang, `${r.focus.count} mistake${r.focus.count === 1 ? '' : 's'} of this kind. `, `${r.focus.count} lỗi loại này. `)}
                {r.focus.note}
              </p>
            </div>
          )}
          {r.nextStep && (
            <div className="rounded-[1.5rem] border border-sky-200 bg-sky-50 p-5 md:col-span-2 dark:border-sky-900 dark:bg-sky-950/30">
              <p className="mb-1 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-700 dark:text-sky-400"><TrendingUp className="h-4 w-4" strokeWidth={2.5} /> {tr(lang, 'Next time', 'Lần sau')}</p>
              <p className="text-[16px] font-bold text-sky-900 dark:text-sky-100">{r.nextStep}</p>
            </div>
          )}
        </section>
      )}

      {(r.scoreNotes?.length > 0 || flags.length > 0) && (
        <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/60">
          <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-slate-500">{tr(lang, 'Worth knowing', 'Lưu ý')}</p>
          <ul className="space-y-1.5 text-[14px] font-semibold text-slate-600 dark:text-slate-300">
            {r.scoreNotes.map((n, i) => <li key={`n${i}`}>{n}</li>)}
            {flags.map((f, i) => <li key={`f${i}`} className={f.warn ? 'text-rose-600 dark:text-rose-400' : ''}>{f.text}</li>)}
          </ul>
        </section>
      )}

      {/* The essay itself, with every mistake numbered. */}
      {showText && (
        <section className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="border-b border-slate-200 bg-slate-50 px-6 py-3 text-[11px] font-black uppercase tracking-widest text-slate-500 dark:border-slate-800 dark:bg-slate-800/50">
            {teacherView ? tr(lang, 'What the student wrote', 'Bài học viên viết') : tr(lang, 'What you wrote', 'Bài bạn viết')}
          </p>
          <div className="px-6 py-5 sm:px-8"><MarkedText text={essay.body} revisions={r.revisions} /></div>
          {r.revisions.length > 0 && (
            <ol className="divide-y divide-slate-100 border-t border-slate-200 dark:divide-slate-800 dark:border-slate-800">
              {r.revisions.filter((x) => x.quote).map((x, i) => (
                <li key={i} className="flex gap-3 px-6 py-3 sm:px-8">
                  <span className="mt-0.5 text-xs font-black text-rose-500">{i + 1}</span>
                  <div className="min-w-0 text-[15px]">
                    <p className="font-bold text-slate-800 dark:text-slate-100">
                      <span className="text-rose-600 line-through decoration-rose-400 dark:text-rose-400">{x.quote}</span>
                      <span className="mx-2 text-slate-400">→</span>
                      <span className="text-emerald-700 dark:text-emerald-300">{x.correction}</span>
                    </p>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                      <span className="mr-2 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-black uppercase tracking-wider text-slate-500 dark:bg-slate-800">{x.kind}</span>
                      {x.why}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </section>
      )}

      {showText && essay.revision?.revisedText && (
        <section className="overflow-hidden rounded-[1.5rem] border border-emerald-200 bg-white shadow-sm dark:border-emerald-900 dark:bg-slate-900">
          <button type="button" onClick={() => setOpenRevised((o) => !o)} className="flex w-full items-center justify-between px-6 py-4 text-left">
            <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              <Sparkles className="h-4 w-4" strokeWidth={2.5} />
              {tr(lang, 'Corrected version', 'Bản đã sửa')} · {essay.revision.fixed}/{essay.revision.total} {tr(lang, 'fixed', 'đã sửa')}
            </span>
            <ChevronDown className={`h-5 w-5 text-slate-400 transition ${openRevised ? 'rotate-180' : ''}`} />
          </button>
          {openRevised && <p className="whitespace-pre-wrap border-t border-emerald-100 px-6 py-5 text-[17px] font-medium leading-[1.9] text-slate-800 sm:px-8 dark:border-emerald-900 dark:text-slate-100">{essay.revision.revisedText}</p>}
        </section>
      )}
    </div>
  )
}
