/* eslint-disable react-refresh/only-export-components -- the page's entry file: nothing imports it */
// PRA Learn's unit page (/unit/#/<TRACK>/<UNIT>[/<task>]): a unit is a list of tasks,
// each worth its own XP, as on Mr. Bowen's Dashboard (src/data/units.js, README.md
// here). It asks for a PRA Learn sign-in, and Back goes to the PRA Learn home.
import { StrictMode, Suspense, useCallback, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import './unit.css'
import { api } from '../src/lib/api.js'
import { loadUnit, saveUnitTask } from '../src/lib/unitProgress.js'
import { findTask, findUnit, taskTitle, unitKey } from '../src/data/units.js'
import { className } from '../src/data/subjects.js'
import { langsFor } from './src/utils/lang.js'
import { ASSESSMENT, ENGINES, NOTES } from './app/engines.js'
import UnitHome from './app/UnitHome.jsx'
import Words from './app/Words.jsx'
import Workbook from './app/Workbook.jsx'

const DATA = import.meta.glob('./src/data/*/*/data.js')
const SETS = import.meta.glob('./content/*/*/*.js')

// The saves still on their way (one unit page, one queue): each waits for the one before.
const saves = { last: Promise.resolve() }
const queueSave = (run) => { saves.last = saves.last.then(run); return saves.last }
const savesDone = () => saves.last

const home = () => window.location.assign(import.meta.env.BASE_URL + window.location.search)

function ToLearn() {
  useEffect(() => { window.location.replace(import.meta.env.BASE_URL + window.location.search) }, [])
  return null
}

function Spinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950" role="status" aria-label="Loading">
      <Loader2 className="h-10 w-10 animate-spin text-[#1cb0f6]" />
    </div>
  )
}

/** Only for someone signed in to PRA Learn (a student or staff, or demo mode). */
function SignedIn({ children }) {
  const [state, setState] = useState('checking')
  useEffect(() => {
    let alive = true
    api.session().then((s) => alive && setState(s ? 'in' : 'out')).catch(() => alive && setState('out'))
    return () => { alive = false }
  }, [])
  if (state === 'out') return <ToLearn />
  return state === 'in' ? children : <Spinner />
}

/** The unit's own data ({ meta, notes, realWords, assessment, … }) and its step-practice sets. */
function useUnitData(u) {
  const [got, setGot] = useState(null)
  useEffect(() => {
    if (!u) return
    let alive = true
    const load = DATA[`./src/data/${u.track}/${u.unit}/data.js`]
    const sets = u.tasks.filter((t) => t.kind === 'steps')
    Promise.all([load ? load() : null, ...sets.map((t) => SETS[`./content/${u.track}/${u.unit}/${t.set}.js`]?.())]).then(([mod, ...mods]) => {
      if (!alive) return
      const data = mod && Object.entries(mod).find(([k]) => k.endsWith('_DATA'))?.[1]
      setGot({ data: data || null, sets: Object.fromEntries(sets.map((t, i) => [t.id, mods[i]?.default || mods[i]?.workbook || null])) })
    })
    return () => { alive = false }
  }, [u])
  return got
}

function UnitRoute() {
  const { track, unit: unitId, task: taskId } = useParams()
  const navigate = useNavigate()
  const u = findUnit(track, unitId)
  const got = useUnitData(u)
  const [records, setRecords] = useState(null)
  const [error, setError] = useState('')
  const [lang, setLang] = useState('en')
  const key = u ? unitKey(u) : ''

  const refresh = useCallback(() => {
    loadUnit(key).then(setRecords).catch((e) => { setRecords({}); setError(e.message) })
  }, [key])
  useEffect(() => { if (u) refresh() }, [u, refresh])
  useEffect(() => { if (u) document.title = `${u.label} ${u.title} · PRA Learn` }, [u])

  if (!u) return <ToLearn />
  if (!got || !records) return <Spinner />
  if (!got.data) return <ToLearn />

  const data = got.data
  const langs = langsFor({ bilingual: true, french: true }, data)
  const view = { ...u, groupLabel: className(u.classKey, 'en') }
  // Saves go one after another, and going back to the unit waits for the last one, so
  // the unit page always shows the XP just earned.
  const save = (id, patch) => { queueSave(() => saveUnitTask(key, id, patch).catch((e) => setError(e.message))) }
  const toUnit = async () => { await savesDone(); refresh(); navigate(`/${track}/${unitId}`, { replace: true }) }
  const finish = (id, patch) => { save(id, patch); toUnit() }

  if (!taskId) {
    return (
      <UnitHome unit={view} records={records} lang={lang} langs={langs} error={error}
        onLang={() => setLang((l) => (l === 'en' ? 'fr' : 'en'))}
        onOpen={(id) => navigate(`/${track}/${unitId}/${id}`)} onBack={home} />
    )
  }
  const task = findTask(u, taskId)
  if (!task) return <ToLearn />
  const rec = records[task.id]
  const name = (l) => taskTitle(task, l)

  if (task.kind === 'words') {
    return <Words unit={data} track={track} unitId={unitId} task={task} record={rec}
      onSave={(patch) => save(task.id, patch)} onQuit={toUnit} />
  }
  if (task.kind === 'steps') {
    const set = got.sets[task.id]
    if (!set) return <ToLearn />
    return <Workbook set={set} record={rec} langs={langs} title={name}
      onSave={(patch) => save(task.id, patch)} onDone={toUnit} onQuit={toUnit} />
  }

  // The tasks that are their own screens: the lesson deck, the quiz, an interactive task.
  const t = task.kind === 'notes' ? NOTES : task.kind === 'quiz' ? ASSESSMENT : ENGINES[task.engine]
  if (!t) return <ToLearn />
  const scoreOf = (raw) => Math.max(0, Math.min(1, (Number(raw) || 0) / t.nativeMax))
  // The lesson deck says for itself when it is finished (its last slide); the others
  // are finished when they hand in. The quiz saves nothing until then.
  const done = (blob) => (task.kind === 'notes' ? !!blob?.finished : true)
  const onProgress = task.kind === 'quiz' ? () => {}
    : (raw, blob) => save(task.id, { score: scoreOf(raw), saved: blob, finished: task.kind === 'notes' && !!blob?.finished })
  const onComplete = (raw, blob) => finish(task.id, { score: scoreOf(raw), finished: done(blob), ...(task.kind === 'quiz' ? {} : { saved: blob }) })
  const pool = t.pool(data, { track, unitId })
  const Comp = t.component
  return (
    <Suspense fallback={<Spinner />}>
      <Comp langs={langs} {...t.props({ pool, unit: data, saved: rec?.saved, onQuit: toUnit, onProgress, onComplete })} />
    </Suspense>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/:track/:unit" element={<SignedIn><UnitRoute /></SignedIn>} />
        <Route path="/:track/:unit/:task" element={<SignedIn><UnitRoute /></SignedIn>} />
        <Route path="*" element={<ToLearn />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
