import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Pencil } from 'lucide-react'
import { Loading, Notice, Stars } from '../components/ui.jsx'
import { api } from '../lib/api.js'
import { pick, useT } from '../lib/i18n.jsx'
import { byPack, partIds, partsOf, starsFor } from '../pack/model.js'
import { splitClass, subjectName, subjectTone } from '../data/subjects.js'

// A child's own results: stars per part, no class ranking.
export default function MyResults() {
  const { t, lang } = useT()
  const [data, setData] = useState(null)
  const [err, setErr] = useState('')
  useEffect(() => { api.myPacks().then(setData).catch((e) => setErr(e.code === 'offline' ? t('offline') : e.message)) }, [t])
  if (err) return <div className="mx-auto max-w-3xl p-4"><Notice tone="bad">{err}</Notice></div>
  if (!data) return <Loading />
  const rows = byPack(data.progress)

  return (
    <main className="mx-auto max-w-4xl px-4 pb-16 pt-6">
      <Link to="/" className="btn-ghost -ml-3 mb-2"><ArrowLeft className="h-5 w-5" /> {t('home')}</Link>
      <h1 className="mb-6 text-3xl font-extrabold text-pra-ink">{t('myResults')}</h1>
      {!data.packs.length && <div className="card p-6 text-lg font-semibold text-pra-ink-soft">{t('nothingYet')}</div>}
      <ul className="space-y-3">
        {data.packs.map((p) => {
          const [subject] = splitClass(p.class_key)
          return (
            <li key={p.id} className="card p-4 sm:p-5">
              <Link to={`/p/${p.slug}`} className="mb-3 block">
                <span className="mr-2 rounded-full px-3 py-0.5 text-sm font-extrabold text-white" style={{ background: subjectTone(subject) }}>{subjectName(subject, lang)}</span>
                <span className="text-lg font-extrabold text-pra-ink">{pick(p.content, 'title', lang)}</span>
              </Link>
              <div className="grid gap-2 sm:grid-cols-2">
                {partsOf(p.content).map((part) => {
                  const g = rows[p.id]?.[part.id]
                  const Icon = part.kind === 'practice' ? Pencil : BookOpen
                  const total = partIds(p.content, part.id).length
                  const right = Object.values(g?.first_items || g?.items || {}).filter((v) => v.ok).length
                  return (
                    <div key={part.id} className="flex items-center gap-3 rounded-2xl bg-pra-paper px-4 py-3">
                      <Icon className="h-6 w-6 text-pra-ink-soft" />
                      <span className="flex-1 font-bold text-pra-ink">{pick(part, 'title', lang) || t(part.kind)}</span>
                      {g?.done
                        ? <span className="flex flex-col items-end"><Stars n={starsFor(g.best_score ?? g.score)} size="h-5 w-5" label={t('stars', { n: starsFor(g.best_score ?? g.score) })} /><span className="text-xs font-bold text-pra-ink-soft">{t('rightFirst', { n: right, total })}</span></span>
                        : <span className="text-sm font-bold text-pra-ink-soft">{g ? t('started') : t('notDone')}</span>}
                    </div>
                  )
                })}
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
