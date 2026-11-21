// FIX IT YOUR WAY (Upper Secondary English): the student types a new version of a faulty
// sentence: a comma splice or run-on, a fragment, a sentence with no real verb.
//
// The box starts with the faulty sentence, so the student changes it and does not retype it.
// A wrong answer is named (rewrite.js says what is still wrong) and tried again; after two
// wrong answers "Show me" gives one right sentence. Right first time is 1, right after a hint
// is ½, shown is 0. The score is out of 10 and the progress blob is { [id]: 0 | ½ | 1 }.
//
// pool = the unit's `rewrite` list (see unit/src/data/UPPER_ENG/U01/data.js).
import { useMemo, useState } from 'react'
import { ArrowRight, Lightbulb, Trophy } from 'lucide-react'
import TopBar from '../../src/components/TopBar.jsx'
import { checkRewrite, fixName } from './rewrite.js'
import { NO_ADDONS } from '../writing/noAddOns.js'

const KEY = '#ff9600', KEY_DARK = '#cc7800', GREEN = '#58cc02', AMBER = '#f59e0b'
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none'

const ASK = {
  join: 'Two ideas are joined the wrong way. Fix the join: one correct sentence, or two.',
  attach: 'The second part cannot stand alone. Join it to the sentence before it.',
  exact: 'This sentence has no real verb. Fix it.',
}
// The lesson's four fixes, under every join item, so a weak writer has them in view.
const FOUR = [['Full stop', '.'], ['Semicolon', ';'], ['Comma + FANBOYS', ', so'], ['Subordinator', 'because']]
const kindOf = (item) => (item.kind === 'exact' ? 'exact' : item.allow?.length === 1 ? 'attach' : 'join')

const RESULTS = {
  clean: 'Right first time.',
  slipped: 'Right. You fixed it after a hint.',
  helped: 'Here is one right sentence.',
}

function Item({ item, index, total, earned, onScore, onNext, isLast }) {
  const [text, setText] = useState(item.given)
  const [tries, setTries] = useState(0)
  const [msg, setMsg] = useState('')
  const [result, setResult] = useState(null) // 'clean' | 'slipped' | 'helped'
  const [used, setUsed] = useState('')
  const [better, setBetter] = useState('')
  const kind = kindOf(item)
  const model = item.model || item.right

  const finish = (how, said = '', note = '') => {
    setResult(how)
    setUsed(said)
    setBetter(note)
    setMsg('')
    onScore(how === 'clean' ? 1 : how === 'slipped' ? 0.5 : 0)
  }
  const check = () => {
    if (result) return
    const r = checkRewrite(item, text)
    if (r.ok) return finish(tries ? 'slipped' : 'clean', kind === 'exact' ? '' : fixName(r), r.note || '')
    setTries(tries + 1)
    setMsg(r.hint)
  }
  const other = item.also && item.also !== text.trim() ? item.also : model !== text.trim() ? model : ''

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto p-3 sm:p-5 pb-10">
      <div className="rounded-2xl border-2 bg-white dark:bg-slate-900 shadow-sm overflow-hidden" style={{ borderColor: KEY }}>
        <div className="px-4 py-2 text-white flex items-center gap-3" style={{ backgroundColor: KEY }}>
          <div className="text-[11px] font-black uppercase tracking-widest">Sentence {index + 1} of {total}</div>
          <div className="text-[11px] font-black uppercase tracking-widest rounded-full bg-white/25 px-2.5 py-0.5">{item.label}</div>
          <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-90 whitespace-nowrap">{earned % 1 === 0 ? earned : earned.toFixed(1)} / {total}</div>
        </div>

        <div className="p-4 sm:p-6">
          <p className="text-lg font-black text-slate-800 dark:text-slate-100 leading-snug">{item.ask || ASK[kind]}</p>
          {kind === 'join' && (
            <ul aria-label="Four ways to fix it" className="mt-3 flex flex-wrap gap-2">
              {FOUR.map(([name, mark]) => (
                <li key={name} className="flex items-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[13px] font-bold text-slate-600 dark:text-slate-300">
                  {name} <span className="font-black text-slate-900 dark:text-white">{mark}</span>
                </li>
              ))}
            </ul>
          )}
          <textarea
            key={item.id}
            value={text}
            onChange={(e) => { setText(e.target.value); setMsg('') }}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); check() } }}
            readOnly={!!result}
            rows={3}
            autoFocus
            {...NO_ADDONS}
            aria-label="Your new sentence"
            className="mt-4 w-full resize-none rounded-xl border-2 border-b-[4px] border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-xl font-bold leading-relaxed text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#ff9600] read-only:bg-slate-50 dark:read-only:bg-slate-900" />

          {!result && (
            <>
              {msg && <p role="alert" className="mt-3 rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/30 p-3 text-base font-bold text-rose-700 dark:text-rose-200">{msg}</p>}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                {tries >= 2 ? (
                  <button type="button" onClick={() => { setText(model); finish('helped') }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-amber-300 dark:border-amber-700 text-[11px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">
                    <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> Show me
                  </button>
                ) : <span />}
                <button type="button" onClick={check} disabled={!text.trim()} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>Check</button>
              </div>
            </>
          )}

          {result && (
            <div className="mt-4 rounded-2xl border-2 overflow-hidden" style={{ borderColor: result === 'helped' ? AMBER : GREEN }}>
              <div className="px-4 py-2.5 flex items-center gap-3 text-white" style={{ backgroundColor: result === 'helped' ? AMBER : GREEN }}>
                {result === 'helped' ? <Lightbulb className="w-5 h-5 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-5 h-5 shrink-0" strokeWidth={2.5} />}
                <div className="font-black">{RESULTS[result]}</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 space-y-2 text-base font-semibold text-slate-700 dark:text-slate-200">
                {used && <p>You used {used}.</p>}
                {better && <p className="text-amber-700 dark:text-amber-300">{better}</p>}
                {kind === 'exact' && item.note && <p>{item.note}</p>}
                {result !== 'helped' && other && <p><span className="font-black">Another way:</span> {other}</p>}
                <div className="flex justify-end pt-1">
                  <button type="button" onClick={onNext} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: KEY, borderColor: KEY_DARK }}>
                    {isLast ? 'Finish' : 'Next'} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function RewriteTask({ pool, savedData = {}, onComplete, onProgress, onQuit }) {
  const items = useMemo(() => (Array.isArray(pool) ? pool : []).filter((it) => it?.id && it.given), [pool])
  const [results, setResults] = useState(() => Object.fromEntries(Object.entries(savedData || {}).map(([k, v]) => [k, Number(v) || 0])))
  const [pos, setPos] = useState(() => Math.max(0, items.findIndex((it) => savedData?.[it.id] == null)))
  const item = items[pos]

  if (!item) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">Nothing to fix yet</h2>
        <button type="button" onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: KEY, borderColor: KEY_DARK }}>Back</button>
      </div>
    )
  }
  const report = (res) => {
    const blob = Object.fromEntries(items.filter((it) => res[it.id] != null).map((it) => [it.id, res[it.id]]))
    const raw = (10 * items.reduce((s, it) => s + (res[it.id] || 0), 0)) / items.length
    return [raw, blob]
  }
  const record = (value) => {
    // A sentence done before keeps its better mark.
    const next = { ...results, [item.id]: Math.max(results[item.id] || 0, value) }
    setResults(next)
    onProgress?.(...report(next))
  }
  const earned = items.reduce((s, it) => s + (results[it.id] || 0), 0)
  const isLast = pos === items.length - 1
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={onQuit} modeTitle="Fix it your way" current={pos + 1} total={items.length} />
      <Item key={item.id} item={item} index={pos} total={items.length} earned={earned} onScore={record}
        onNext={() => (isLast ? onComplete?.(...report(results)) : setPos(pos + 1))} isLast={isLast} />
    </div>
  )
}
