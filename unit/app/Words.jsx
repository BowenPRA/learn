// The unit's words (Bowen, 6 November 2026): look through them, then take a vocab quiz
// on every word of the unit, untimed or timed. The quiz's best score is the task's
// score. Review is never scored.
//
// The words are the Dashboard unit's own (`realWords`: word, fr, def, frDef, sent,
// frSent) with its recorded audio (public/audio/<track>/<unit>/word_…, def_…, sentence_…).
// It wears the Dashboard tasks' top bar and buttons, so it looks like them.
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, Check, Clock, Play, RotateCcw, Timer, Trophy, Volume2, X } from 'lucide-react'
import TopBar from '../src/components/TopBar.jsx'
import { audioUrl } from '../src/utils/assetPaths.js'
import { tr } from '../src/utils/lang.js'

const SECONDS = 12 // per question, timed quiz
const BONUS_AT = 0.8

const shuffle = (list) => {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
const play = (url) => { try { new Audio(url).play().catch(() => {}) } catch { /* no audio */ } }
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** The example sentence with the word blanked out, or null when the word is not in it. */
function gapped(w) {
  const re = new RegExp(`\\b${escapeRe(w.word)}(s|es)?\\b`, 'i')
  return w.sent && re.test(w.sent) ? w.sent.replace(re, '_____') : null
}

/** One question per word, three kinds in turn: word -> meaning, meaning -> word, fill the gap. */
function buildQuiz(words) {
  return shuffle(words).map((w, i) => {
    const others = shuffle(words.filter((o) => o !== w)).slice(0, 3)
    let kind = ['meaning', 'word', 'gap'][i % 3]
    const gap = kind === 'gap' ? gapped(w) : null
    if (kind === 'gap' && !gap) kind = 'word'
    const options = shuffle([w, ...others]).map((o) => ({ key: o.word, text: kind === 'meaning' ? o.def : o.word }))
    return { w, kind, gap, options }
  })
}

function Btn({ tone = 'blue', onClick, children, disabled, className = '' }) {
  const tones = {
    blue: 'bg-[#1cb0f6] border-[#1899d6] text-white',
    green: 'bg-[#58cc02] border-[#58a700] text-white',
    white: 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200',
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-b-4 px-5 py-3 font-black uppercase tracking-widest text-sm transition-all active:translate-y-1 active:border-b-2 disabled:opacity-40 ${tones[tone]} ${className}`}>
      {children}
    </button>
  )
}

function Review({ words, track, unitId, sound, lang, onLang, onDone }) {
  const [i, setI] = useState(0)
  const w = words[i]
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setI((n) => Math.min(n + 1, words.length - 1))
      if (e.key === 'ArrowLeft') setI((n) => Math.max(n - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [words.length])
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <TopBar onQuit={onDone} quitLabel={tr(lang, 'Back', null, 'Retour')} modeTitle={tr(lang, 'Review the words', null, 'Revoir les mots')} current={i + 1} total={words.length} lang={lang} onLangToggle={onLang} />
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <div key={w.word} className="w-full max-w-2xl rounded-3xl border-2 border-b-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-sm animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-800 dark:text-slate-100">{w.word}</h2>
            {sound && (
              <button type="button" onClick={() => play(audioUrl(track, unitId, 'word', w.word))} aria-label={tr(lang, 'Listen', null, 'Écouter')}
                className="shrink-0 rounded-2xl border-2 border-b-4 border-[#1899d6] bg-[#1cb0f6] p-3 text-white active:translate-y-1 active:border-b-2">
                <Volume2 className="h-6 w-6" />
              </button>
            )}
          </div>
          {lang === 'fr' && w.fr && <p className="mt-1 text-lg font-bold text-[#1cb0f6]">{w.fr}</p>}
          <div className="mt-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-4">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">{tr(lang, 'Meaning', null, 'Sens')}</p>
            <p className="mt-1 text-lg sm:text-xl font-bold text-slate-700 dark:text-slate-200">{w.def}</p>
            {lang === 'fr' && w.frDef && <p className="mt-1 font-semibold italic text-slate-500 dark:text-slate-400">{w.frDef}</p>}
          </div>
          {w.sent && (
            <div className="mt-3 flex items-start gap-3 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-4">
              {sound && (
                <button type="button" onClick={() => play(audioUrl(track, unitId, 'sentence', w.word))} aria-label={tr(lang, 'Listen to the sentence', null, 'Écouter la phrase')}
                  className="mt-0.5 shrink-0 text-[#1cb0f6]"><Volume2 className="h-5 w-5" /></button>
              )}
              <div>
                <p className="font-semibold text-slate-700 dark:text-slate-200">{w.sent}</p>
                {lang === 'fr' && w.frSent && <p className="mt-1 text-sm italic text-slate-500 dark:text-slate-400">{w.frSent}</p>}
              </div>
            </div>
          )}
        </div>
        <div className="mt-5 flex w-full max-w-2xl items-center justify-between gap-3">
          <Btn tone="white" onClick={() => setI(i - 1)} disabled={i === 0}><ArrowLeft className="h-5 w-5" /></Btn>
          <div className="flex flex-wrap justify-center gap-1.5">
            {words.map((x, n) => (
              <button key={x.word} type="button" onClick={() => setI(n)} aria-label={x.word}
                className={`h-2.5 rounded-full transition-all ${n === i ? 'w-6 bg-[#1cb0f6]' : 'w-2.5 bg-slate-300 dark:bg-slate-700'}`} />
            ))}
          </div>
          {i < words.length - 1
            ? <Btn tone="blue" onClick={() => setI(i + 1)}><ArrowRight className="h-5 w-5" /></Btn>
            : <Btn tone="green" onClick={onDone}><Check className="h-5 w-5" /> {tr(lang, 'Done', null, 'Fini')}</Btn>}
        </div>
      </main>
    </div>
  )
}

function Quiz({ words, track, unitId, sound, lang, timed, onFinish, onQuit }) {
  const [questions] = useState(() => buildQuiz(words))
  const [n, setN] = useState(0)
  const [picked, setPicked] = useState(null) // the option key, or '' when time ran out
  const [right, setRight] = useState(0)
  const [missed, setMissed] = useState([])
  const [left, setLeft] = useState(SECONDS)
  const q = questions[n]
  const answered = picked !== null

  const choose = (key) => {
    if (answered) return
    setPicked(key)
    if (key === q.w.word) setRight((r) => r + 1)
    else setMissed((m) => [...m, q.w])
  }

  // The clock: one per question, stopped while the answer shows. At 0 the question
  // counts as missed and the answer shows ('' = no choice made).
  useEffect(() => {
    if (!timed || answered) return undefined
    const id = setTimeout(() => {
      if (left > 1) { setLeft(left - 1); return }
      setLeft(0)
      setPicked('')
      setMissed((m) => [...m, questions[n].w])
    }, 1000)
    return () => clearTimeout(id)
  }, [timed, answered, left, n, questions])

  const next = () => {
    if (n + 1 >= questions.length) { onFinish({ right, total: questions.length, missed }); return }
    setN(n + 1)
    setPicked(null)
    setLeft(SECONDS)
  }

  useEffect(() => {
    const onKey = (e) => {
      if (answered && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); next() }
      const k = Number(e.key)
      if (!answered && k >= 1 && k <= q.options.length) choose(q.options[k - 1].key)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const prompt = q.kind === 'meaning'
    ? { ask: tr(lang, 'What does this word mean?', null, 'Que veut dire ce mot ?'), big: q.w.word, audio: audioUrl(track, unitId, 'word', q.w.word) }
    : q.kind === 'gap'
      ? { ask: tr(lang, 'Which word goes in the gap?', null, 'Quel mot va dans le trou ?'), text: q.gap }
      : { ask: tr(lang, 'Which word means this?', null, 'Quel mot veut dire cela ?'), text: q.w.def, audio: audioUrl(track, unitId, 'def', q.w.word) }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <TopBar onQuit={onQuit} quitLabel={tr(lang, 'Exit', null, 'Quitter')} modeTitle={timed ? tr(lang, 'Vocab quiz · timed', null, 'Quiz de vocabulaire · chronométré') : tr(lang, 'Vocab quiz', null, 'Quiz de vocabulaire')} current={n + (answered ? 1 : 0)} total={questions.length} timeLeft={timed ? left : undefined} />
      {timed && (
        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800">
          <div className={`h-full transition-all duration-1000 ease-linear ${left <= 3 ? 'bg-[#ff4b4b]' : 'bg-[#ffc800]'}`} style={{ width: `${(left / SECONDS) * 100}%` }} />
        </div>
      )}
      <main className="flex-1 flex flex-col items-center p-4 sm:p-8">
        <div key={n} className="w-full max-w-2xl animate-in fade-in slide-in-from-right-4 duration-300">
          <p className="text-center text-sm font-black uppercase tracking-widest text-slate-400">{prompt.ask}</p>
          <div className="mt-3 flex items-center justify-center gap-3 rounded-3xl border-2 border-b-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 text-center">
            {prompt.big
              ? <span className="text-4xl sm:text-5xl font-black text-slate-800 dark:text-slate-100">{prompt.big}</span>
              : <span className="text-xl sm:text-2xl font-bold leading-snug text-slate-700 dark:text-slate-200">{prompt.text}</span>}
            {sound && prompt.audio && (
              <button type="button" onClick={() => play(prompt.audio)} aria-label={tr(lang, 'Listen', null, 'Écouter')} className="shrink-0 text-[#1cb0f6]"><Volume2 className="h-7 w-7" /></button>
            )}
          </div>
          <div className={`mt-5 grid gap-3 ${q.kind === 'meaning' ? '' : 'sm:grid-cols-2'}`}>
            {q.options.map((o, k) => {
              const isRight = o.key === q.w.word
              const state = !answered ? 'idle' : isRight ? 'right' : picked === o.key ? 'wrong' : 'dim'
              const cls = {
                idle: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#1cb0f6] hover:bg-sky-50 dark:hover:bg-slate-800',
                right: 'bg-[#d7ffb8] dark:bg-green-900/40 border-[#58cc02] text-[#3c8a00] dark:text-green-300',
                wrong: 'bg-[#ffdfe0] dark:bg-red-900/40 border-[#ff4b4b] text-[#c03030] dark:text-red-300',
                dim: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600',
              }[state]
              return (
                <button key={o.key} type="button" disabled={answered} onClick={() => choose(o.key)}
                  className={`flex items-center gap-3 rounded-2xl border-2 border-b-4 p-4 text-left font-bold transition-all ${q.kind === 'meaning' ? 'text-base' : 'text-lg'} ${cls}`}>
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 border-current text-xs font-black opacity-70">{k + 1}</span>
                  <span className="min-w-0 flex-1">{o.text}</span>
                  {state === 'right' && <Check className="h-5 w-5 shrink-0" strokeWidth={3} />}
                  {state === 'wrong' && <X className="h-5 w-5 shrink-0" strokeWidth={3} />}
                </button>
              )
            })}
          </div>
          {answered && (
            <div className={`mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4 animate-in fade-in slide-in-from-bottom-2 ${picked === q.w.word ? 'bg-[#d7ffb8] dark:bg-green-900/30' : 'bg-[#ffdfe0] dark:bg-red-900/30'}`}>
              <p className={`font-black ${picked === q.w.word ? 'text-[#3c8a00] dark:text-green-300' : 'text-[#c03030] dark:text-red-300'}`}>
                {picked === q.w.word ? tr(lang, 'Correct!', null, 'Juste !')
                  : `${picked === '' ? tr(lang, 'Time is up! ', null, 'Temps écoulé ! ') : ''}${tr(lang, 'The answer is', null, 'La réponse est')} “${q.w.word}”.`}
              </p>
              <Btn tone={picked === q.w.word ? 'green' : 'blue'} onClick={next}>{n + 1 >= questions.length ? tr(lang, 'See my score', null, 'Voir mon score') : tr(lang, 'Next', null, 'Suivant')} <ArrowRight className="h-4 w-4" /></Btn>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function Result({ result, timed, task, lang, onAgain, onReview, onBack }) {
  const pct = result.total ? result.right / result.total : 0
  const xp = Math.round(pct * task.xp)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 sm:p-8">
      <div className="w-full max-w-xl rounded-3xl border-2 border-b-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 text-center animate-in fade-in zoom-in-95">
        <Trophy className={`mx-auto h-14 w-14 ${pct >= BONUS_AT ? 'text-[#ffc800]' : 'text-slate-300'}`} strokeWidth={2.2} />
        <p className="mt-3 text-sm font-black uppercase tracking-widest text-slate-400">{timed ? tr(lang, 'Timed vocab quiz', null, 'Quiz de vocabulaire chronométré') : tr(lang, 'Vocab quiz', null, 'Quiz de vocabulaire')}</p>
        <p className="mt-1 text-5xl font-black text-slate-800 dark:text-slate-100">{result.right} / {result.total}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-[#ddf4ff] dark:bg-sky-900/40 px-4 py-1.5 font-black text-[#1899d6]">+{xp} XP</span>
        </div>
        {result.missed.length > 0 && (
          <div className="mt-6 text-left">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">{tr(lang, 'Words to look at again', null, 'Mots à revoir')}</p>
            <ul className="mt-2 space-y-2">
              {result.missed.map((w) => (
                <li key={w.word} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 px-4 py-2">
                  <span className="font-black text-slate-800 dark:text-slate-100">{w.word}</span>
                  <span className="text-slate-500 dark:text-slate-400"> — {w.def}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Btn tone="white" onClick={onReview}><BookOpen className="h-4 w-4" /> {tr(lang, 'Review', null, 'Revoir')}</Btn>
          <Btn tone="blue" onClick={onAgain}><RotateCcw className="h-4 w-4" /> {tr(lang, 'Try again', null, 'Réessayer')}</Btn>
          <Btn tone="green" onClick={onBack}>{tr(lang, 'Back to the unit', null, 'Retour à l’unité')}</Btn>
        </div>
      </div>
    </div>
  )
}

/**
 * The key words task. `record` is its progress; `onSave({ score, finished })`
 * stores a finished quiz; `onQuit` goes back to the unit.
 */
export default function Words({ unit, track, unitId, task, record, onSave, onQuit }) {
  const words = useMemo(() => (unit.realWords || []).filter((w) => w.isReal !== false && w.word && w.def), [unit])
  const [view, setView] = useState('menu')
  const [timed, setTimed] = useState(false)
  const [result, setResult] = useState(null)
  const [run, setRun] = useState(0)
  const [lang, setLang] = useState('en')
  const toggleLang = () => setLang((l) => (l === 'en' ? 'fr' : 'en'))
  // A unit with no recordings (meta.audio: false) shows no Listen buttons.
  const sound = unit.meta?.audio !== false

  if (view === 'review') return <Review words={words} track={track} unitId={unitId} sound={sound} lang={lang} onLang={toggleLang} onDone={() => setView('menu')} />
  if (view === 'quiz') {
    return (
      <Quiz key={run} words={words} track={track} unitId={unitId} sound={sound} lang={lang} timed={timed} onQuit={() => setView('menu')}
        onFinish={(r) => {
          const score = r.total ? r.right / r.total : 0
          setResult(r)
          setView('result')
          onSave({ score, finished: true })
        }} />
    )
  }
  if (view === 'result') {
    return <Result result={result} timed={timed} task={task} lang={lang}
      onAgain={() => { setRun(run + 1); setView('quiz') }} onReview={() => setView('review')} onBack={onQuit} />
  }

  const best = record?.best ? Math.round(record.best * words.length) : null
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <TopBar onQuit={onQuit} quitLabel={tr(lang, 'Back', null, 'Retour')} modeTitle={tr(lang, 'Key words', null, 'Mots clés')} current={best ?? 0} total={words.length} lang={lang} onLangToggle={toggleLang} />
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl text-center">
          <p className="text-sm font-black uppercase tracking-widest text-[#58a700]">{words.length} {tr(lang, 'words', null, 'mots')}</p>
          <h1 className="mt-1 text-3xl sm:text-4xl font-black text-slate-800 dark:text-slate-100">{tr(lang, 'Learn the words, then take the quiz', null, 'Apprends les mots, puis fais le quiz')}</h1>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {words.map((w) => <span key={w.word} className="rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 px-3 py-1 text-sm font-bold text-slate-600 dark:text-slate-300">{w.word}</span>)}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <button type="button" onClick={() => setView('review')}
              className="group rounded-3xl border-2 border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-left transition-all hover:border-[#1cb0f6] active:translate-y-1 active:border-b-2">
              <BookOpen className="h-9 w-9 text-[#1cb0f6]" strokeWidth={2.4} />
              <p className="mt-3 text-xl font-black text-slate-800 dark:text-slate-100">{tr(lang, 'Review the words', null, 'Revoir les mots')}</p>
              <p className="mt-1 font-semibold text-slate-500 dark:text-slate-400">{sound ? tr(lang, 'Meanings, examples and French. Listen to each one. No score.', null, 'Sens, exemples et français. Écoute chaque mot. Sans score.') : tr(lang, 'Meanings, examples and French. No score.', null, 'Sens, exemples et français. Sans score.')}</p>
            </button>
            <div className="rounded-3xl border-2 border-b-4 border-[#58a700] bg-[#58cc02] p-6 text-left text-white">
              <Trophy className="h-9 w-9" strokeWidth={2.4} />
              <p className="mt-3 text-xl font-black">{tr(lang, 'Vocab quiz', null, 'Quiz de vocabulaire')}</p>
              <p className="mt-1 font-semibold text-white/90">{tr(lang, `${words.length} questions. Your best score gives up to ${task.xp} XP.`, null, `${words.length} questions. Ton meilleur score donne jusqu’à ${task.xp} XP.`)}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-black/10 p-1">
                {[[false, tr(lang, 'No clock', null, 'Sans chrono'), Clock], [true, tr(lang, 'Timed', null, 'Chrono'), Timer]].map(([t, label, Icon]) => (
                  <button key={label} type="button" onClick={() => setTimed(t)} aria-pressed={timed === t}
                    className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-black uppercase tracking-wider transition ${timed === t ? 'bg-white text-[#58a700]' : 'text-white/90'}`}>
                    <Icon className="h-4 w-4" /> {label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs font-bold text-white/90">{timed ? tr(lang, `${SECONDS} seconds a question.`, null, `${SECONDS} secondes par question.`) : tr(lang, 'Take your time.', null, 'Prends ton temps.')}</p>
              <button type="button" onClick={() => { setRun(run + 1); setView('quiz') }}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-b-4 border-slate-200 bg-white px-5 py-3 font-black uppercase tracking-widest text-[#58a700] active:translate-y-1 active:border-b-2">
                <Play className="h-4 w-4" /> {tr(lang, 'Start', null, 'Commencer')}
              </button>
            </div>
          </div>
          {record?.runs > 0 && (
            <p className="mt-5 font-bold text-slate-500 dark:text-slate-400">
              {tr(lang, 'Best so far', null, 'Meilleur score')}: {best} / {words.length}
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
