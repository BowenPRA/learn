// The plan before the writing (part of the time allowed), and the frames pane beside the
// writing box. Both follow the kind of writing the prompt asks for (frames.js).
import { useState } from 'react'
import { ArrowRight, ClipboardList, Plus } from 'lucide-react'
import { framesByStage, planFields } from './frames.js'

const noPaste = (e) => e.preventDefault()

export function Planner({ type, plan, onChange, onStart, compact = false }) {
  const fields = planFields(type)
  return (
    <div className={compact ? '' : 'rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900'}>
      {!compact && (
        <>
          <p className="mb-1 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-violet-600 dark:text-violet-400">
            <ClipboardList className="h-4 w-4" strokeWidth={2.5} /> Plan · about 5 minutes
          </p>
          <h2 className="mb-5 text-2xl font-black text-slate-800 dark:text-white">A few words for each line. Each line becomes part of your writing.</h2>
        </>
      )}
      <div className="space-y-4">
        {fields.map((f) => (
          <label key={f.id} className="block">
            <span className="mb-1 block text-sm font-black text-slate-700 dark:text-slate-200">{f.label}</span>
            <textarea
              rows={compact ? 2 : 2}
              value={plan?.[f.id] || ''}
              onChange={(e) => onChange({ ...plan, [f.id]: e.target.value })}
              onPaste={noPaste} onDrop={noPaste}
              spellCheck={false} autoComplete="off" data-gramm="false"
              placeholder={f.placeholder}
              className="w-full resize-none rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-2.5 text-[15px] font-medium text-slate-800 placeholder:text-slate-400 focus:border-violet-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>
        ))}
      </div>
      {onStart && (
        <div className="mt-6 flex justify-end">
          <button type="button" onClick={onStart}
            className="flex items-center rounded-2xl border-b-[5px] border-violet-800 bg-violet-600 px-8 py-4 text-lg font-black uppercase tracking-widest text-white transition-all hover:bg-violet-700 active:translate-y-[5px] active:border-b-0">
            Start writing <ArrowRight className="ml-3 h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  )
}

export function FramesPane({ type, extra, onInsert }) {
  const stages = framesByStage(type, extra)
  const [open, setOpen] = useState(stages[0]?.id)
  return (
    <div className="space-y-3 px-5 py-5 sm:px-6">
      <p className="text-[12px] font-bold text-slate-400">Tap a frame to put it in your writing, then fill the ___ gaps.</p>
      {stages.map((s) => (
        <div key={s.id} className="rounded-2xl border border-slate-200 dark:border-slate-800">
          <button type="button" onClick={() => setOpen(open === s.id ? null : s.id)} className="flex w-full items-start justify-between gap-2 px-4 py-3 text-left">
            <span>
              <span className="block text-sm font-black text-slate-800 dark:text-white">{s.label}</span>
              <span className="block text-[12px] font-semibold text-slate-500 dark:text-slate-400">{s.hint}</span>
            </span>
          </button>
          {open === s.id && (
            <ul className="space-y-1.5 px-3 pb-3">
              {s.frames.map((f, i) => (
                <li key={i}>
                  <button type="button" disabled={!onInsert} onClick={() => onInsert?.(f.text)}
                    className="flex w-full items-start gap-2 rounded-xl bg-slate-50 px-3 py-2 text-left text-[14px] font-semibold text-slate-700 transition hover:bg-violet-50 hover:text-violet-800 disabled:cursor-default disabled:hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-violet-950/40">
                    {onInsert && <Plus className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" strokeWidth={3} />}
                    <span>{f.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
