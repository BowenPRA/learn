/* eslint-disable react-refresh/only-export-components -- the page's entry file: nothing imports it */
// PRA Learn's unit page (/unit/#/<TRACK>/<UNIT>[/<part>]): a unit of five parts worth
// 100 XP with up to 20 bonus (src/data/units.js). The lesson deck, the main task and
// the quiz are the Dashboard's own components, copied unchanged into src/ by
// scripts/sync-dashboard.mjs; the words and workbook parts, the unit page and the
// saving are PRA Learn's own (app/). It asks for a PRA Learn sign-in, and Back goes
// to the PRA Learn home.
import { StrictMode, Suspense, useCallback, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import './unit.css'
import { api } from '../src/lib/api.js'
import { loadUnit, saveUnitPart } from '../src/lib/unitProgress.js'
import { UNIT_PARTS, findUnit, unitKey } from '../src/data/units.js'
import { className } from '../src/data/subjects.js'
import { langsFor } from './src/utils/lang.js'
import { ASSESSMENT, ENGINES, NOTES } from './app/engines.js'
import UnitHome from './app/UnitHome.jsx'
import Words from './app/Words.jsx'
import Workbook from './app/Workbook.jsx'

const DATA = import.meta.glob('./src/data/*/*/data.js')
const WORKBOOKS = import.meta.glob('./content/*/*/workbook.js')

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

/** The unit's Dashboard data ({ meta, notes, realWords, assessment, … }) and its workbook set. */
function useUnitData(u) {
  const [got, setGot] = useState(null)
  useEffect(() => {
    if (!u) return
    let alive = true
    const load = DATA[`./src/data/${u.track}/${u.unit}/data.js`]
    const book = WORKBOOKS[`./content/${u.track}/${u.unit}/workbook.js`]
    Promise.all([load ? load() : null, book ? book() : null]).then(([mod, wb]) => {
      if (!alive) return
      const data = mod && Object.entries(mod).find(([k]) => k.endsWith('_DATA'))?.[1]
      setGot({ data: data || null, workbook: wb?.workbook || null })
    })
    return () => { alive = false }
  }, [u])
  return got
}

function UnitRoute() {
  const { track, unit: unitId, part } = useParams()
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
  useEffect(() => { if (u) document.title = `${u.title} · PRA Learn` }, [u])

  if (!u) return <ToLearn />
  if (!got || !records) return <Spinner />
  if (!got.data) return <ToLearn />

  const data = got.data
  const langs = langsFor({ bilingual: true, french: true }, data)
  const engine = ENGINES[u.engine]
  const view = { ...u, groupLabel: className(u.classKey, 'en'), engineLabel: engine?.label, engineLabelFr: engine?.labelFr }
  const toUnit = () => { refresh(); navigate(`/${track}/${unitId}`, { replace: true }) }
  const save = (partId, patch) => saveUnitPart(key, partId, patch).catch((e) => setError(e.message))
  const finish = async (partId, patch) => { await save(partId, patch); toUnit() }

  if (!part) {
    return (
      <UnitHome unit={view} data={data} records={records} lang={lang} langs={langs} error={error}
        onLang={() => setLang((l) => (l === 'en' ? 'fr' : 'en'))}
        onOpen={(p) => navigate(`/${track}/${unitId}/${p}`)} onBack={home} />
    )
  }
  if (!UNIT_PARTS.some((p) => p.id === part)) return <ToLearn />
  const rec = records[part]
  const partDef = UNIT_PARTS.find((p) => p.id === part)

  if (part === 'words') {
    return <Words unit={data} track={track} unitId={unitId} part={partDef} record={rec}
      onSave={(patch) => save('words', patch)} onQuit={toUnit} />
  }
  if (part === 'workbook') {
    if (!got.workbook) { toUnit(); return <Spinner /> }
    return <Workbook set={got.workbook} record={rec} langs={langs}
      onSave={(patch) => save('workbook', patch)} onDone={toUnit} onQuit={toUnit} />
  }

  // The Dashboard's own tasks, handed what the Dashboard hands them.
  const t = part === 'lesson' ? NOTES : part === 'quiz' ? ASSESSMENT : engine
  if (!t) return <ToLearn />
  const scoreOf = (raw) => Math.max(0, Math.min(1, (Number(raw) || 0) / t.nativeMax))
  const ctxFor = {
    lesson: {
      onProgress: (raw, blob) => save('lesson', { score: scoreOf(raw), saved: blob, finished: !!blob?.finished }),
      onComplete: (raw, blob) => finish('lesson', { score: scoreOf(raw), saved: blob, finished: !!blob?.finished }),
    },
    practice: {
      onProgress: (raw, blob) => save('practice', { score: scoreOf(raw), saved: blob }),
      onComplete: (raw, blob) => finish('practice', { score: scoreOf(raw), saved: blob, finished: true, bonus: Number(raw) >= t.nativeMax }),
    },
    quiz: {
      onComplete: (raw) => finish('quiz', { score: scoreOf(raw), finished: true, bonus: Number(raw) >= t.nativeMax && !rec?.runs }),
    },
  }[part]
  const pool = t.pool(data, { track, unitId })
  const Comp = t.component
  return (
    <Suspense fallback={<Spinner />}>
      <Comp langs={langs} {...t.props({ pool, unit: data, saved: rec?.saved, onQuit: toUnit, onProgress: () => {}, ...ctxFor })} />
    </Suspense>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/:track/:unit" element={<SignedIn><UnitRoute /></SignedIn>} />
        <Route path="/:track/:unit/:part" element={<SignedIn><UnitRoute /></SignedIn>} />
        <Route path="*" element={<ToLearn />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
