import { useMemo, useRef, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Home, Pencil } from 'lucide-react'
import DoneScreen from '../components/DoneScreen.jsx'
import { nextPart, partLabels, partPath } from '../components/packs.jsx'
import StepPracticeSet from '../stepPractice/StepPracticeSet.jsx'
import { SLIP_KEY } from '../stepPractice/model.js'
import { CloseButton, LangSwitch, Loading, Notice } from '../components/ui.jsx'
import { api } from '../lib/api.js'
import { useAuth } from '../lib/auth.jsx'
import { pick, useT } from '../lib/i18n.jsx'
import { usePack } from '../lib/usePack.js'
import { assetSrc, contentLang, partOf, partsOf, scoreOf, starsFor } from '../pack/model.js'
import { sanitizeSvg } from '../pack/sanitizeSvg.js'

// Step-by-step practice: the host around the step engine (src/stepPractice, copied
// from the Dashboard, see SOURCE.md there). A pack's practice part holds `set`,
// which is exactly the Dashboard's `unit.stepPractice` and goes to the engine as
// its `set`. The engine reports each finished item; here that becomes a progress
// row through learn_save:
//   engine result        progress item
//   finished, no help    { ok: true,  shown: false }   (a wrong turn put right still counts, as in the engine)
//   needed help          { ok: false, shown: true }    (Show me, or a step filled in after two wrong answers)
// and on every row: tries (wrong answers + 1), hints opened, and slips: the keys of
// the slip rules the child's wrong answers matched ('s2.1', or a slip's own `key`), so
// the class page can name the misconception. Never what the child typed.
// The engine's `saved` blob ({ id: 1 } for items done without help) is rebuilt from
// those rows, so a child picks up where they stopped, on any device.

const SVG_KEYS = ['inlineSvg', 'inlineSvgVn', 'inlineSvgFr']

/** The set with every inline SVG cleaned and every "asset:" picture swapped for its signed link. */
function cleanSet(part, assets) {
  const set = part.set || {}
  const fixOption = (o) => {
    const c = { ...o }
    if (c.svg) c.svg = sanitizeSvg(c.svg)
    if (c.image) c.image = assetSrc(c.image, assets) || undefined
    return c
  }
  const items = (set.items || []).map((it) => {
    const c = { ...it }
    for (const k of SVG_KEYS) if (c[k]) c[k] = sanitizeSvg(c[k]) || undefined
    if (c.image) c.image = assetSrc(c.image, assets) || undefined
    c.steps = (it.steps || []).map((s) => (s.input?.options ? { ...s, input: { ...s.input, options: s.input.options.map(fixOption) } } : s))
    return c
  })
  return { ...set, title: part.title || set.title, titleVn: part.titleVn || set.titleVn, items }
}

const blobOf = (items) => Object.fromEntries(Object.entries(items || {}).filter(([, v]) => v?.ok).map(([k]) => [k, 1]))

export default function PracticePlayer() {
  const { slug } = useParams()
  const [search] = useSearchParams()
  const { t } = useT()
  const { loading, pack, progress, assets, error } = usePack(slug)
  if (loading) return <Loading />
  if (error) return <div className="mx-auto max-w-3xl p-4"><Notice tone="bad">{t(error === 'offline' ? 'offline' : 'notOpen')}</Notice></div>
  const asked = search.get('part')
  const part = asked ? partOf(pack.content, asked) : partsOf(pack.content).find((p) => p.kind === 'practice')
  if (!part || part.kind !== 'practice') return <div className="mx-auto max-w-3xl p-4"><Notice tone="bad">{t('notOpen')}</Notice></div>
  return <PracticeRun key={part.id} pack={pack} part={part} row={progress.find((g) => g.part === part.id)} progress={progress} assets={assets} />
}

function PracticeRun({ pack, part, row, progress, assets }) {
  const { t, lang: uiLang } = useT()
  const lang = contentLang(pack.content, uiLang)
  const oneLang = Array.isArray(pack.content.langs) && pack.content.langs.length === 1
  const { me } = useAuth()
  const student = me?.kind === 'student'
  const set = useMemo(() => cleanSet(part, assets), [part, assets])
  // What was saved before this sitting. Kept fixed during the run: the engine
  // works out its queue from it.
  const [stored] = useState(() => row?.items || {})
  const [saved] = useState(() => blobOf(row?.items))
  const merged = useRef(stored)
  const [pos, setPos] = useState({ at: 0, total: 0 })
  const [finished, setFinished] = useState(null)
  const [saveFailed, setSaveFailed] = useState(false)
  const back = `/p/${pack.slug}`

  const mergeIn = (summary) => {
    const fresh = Object.fromEntries((summary.items || []).map(({ itemId, correct, slips, shows, hints, wrong }) => [itemId, {
      ok: !!correct,
      tries: Math.min(99, (wrong ?? (correct ? 0 : 1)) + 1),
      hints: hints || 0,
      shown: !correct || Object.keys(shows || {}).length > 0,
      slips: (slips || []).filter((k) => SLIP_KEY.test(k)).slice(0, 10),
    }]))
    merged.current = { ...stored, ...fresh }
    return merged.current
  }
  const save = async (items, done) => {
    if (!student) return
    try { await api.save(pack.id, part.id, items, done); setSaveFailed(false) } catch { setSaveFailed(true) }
  }
  const onSave = (summary) => save(mergeIn(summary), false)
  const onFinish = (summary) => {
    const items = mergeIn(summary)
    save(items, true)
    setFinished({ score: scoreOf(pack.content, part.id, items), right: Object.values(items).filter((v) => v?.ok).length, total: summary.total })
  }

  if (finished) {
    const rows = { ...Object.fromEntries((progress || []).map((g) => [g.part, g])), [part.id]: { done: true } }
    const next = nextPart(pack.content, rows)
    const label = next ? partLabels(pack.content, t)[next.id] : ''
    return (
      <DoneScreen stars={starsFor(finished.score)} title={next ? t('practiceDone') : t('packDone')} whole={!next}
        line={finished.total ? t('rightFirst', { n: finished.right, total: finished.total }) : ''}
        notices={[!student && { text: t('preview') }, saveFailed && { tone: 'bad', text: t('notSaved') }]}
        actions={[
          next && { to: partPath(pack.slug, next), main: true, icon: <Pencil className="h-6 w-6" />, label: t('next_', { part: label }) },
          { to: student ? '/' : `/t/${encodeURIComponent(pack.class_key)}`, main: !next, icon: <Home className="h-6 w-6" />, label: t('home') },
        ]} />
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-20 border-b-2 border-pra-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2">
          <CloseButton to={back} label={t('back')} />
          <div className="min-w-0 flex-1">
            <p className="hidden truncate text-xs font-bold uppercase tracking-wider text-pra-ink-soft sm:block">{pick(pack.content, 'title', lang)}</p>
            <p className="truncate text-base font-extrabold text-pra-ink">{pick(part.set, 'title', lang) || pick(part, 'title', lang) || t('practice')}</p>
            {pos.total > 0 && (
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-pra-line">
                <div className="h-full rounded-full bg-pra-violet transition-all" style={{ width: `${(pos.at / pos.total) * 100}%` }} />
              </div>
            )}
          </div>
          {!oneLang && <LangSwitch />}
        </div>
      </header>
      {(!student || saveFailed) && (
        <div className="mx-auto w-full max-w-6xl px-4 pt-3">
          {!student && <Notice>{t('preview')}</Notice>}
          {saveFailed && <Notice tone="bad">{t('notSaved')}</Notice>}
        </div>
      )}
      <StepPracticeSet set={set} lang={lang} saved={saved} onSave={onSave} onFinish={onFinish}
        onPos={(at, total) => setPos({ at, total })} />
    </div>
  )
}
