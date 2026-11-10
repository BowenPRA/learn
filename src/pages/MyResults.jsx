import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ChevronRight, Pencil, Star } from 'lucide-react'
import { BackLink, Loading, Notice, Stars, SubjectTile } from '../components/ui.jsx'
import Pip from '../components/Pip.jsx'
import { api } from '../lib/api.js'
import { pick, useT } from '../lib/i18n.jsx'
import { byPack, partIds, partsOf, starsFor } from '../pack/model.js'
import { splitClass, subjectName, subjectTone } from '../data/subjects.js'
import { packStars, partLabels } from '../components/packs.jsx'

// A child's own results: stars per part, no class ranking.
export default function MyResults() {
  const { t, lang } = useT()
  const [data, setData] = useState(null)
  const [err, setErr] = useState('')
  useEffect(() => { api.myPacks().then(setData).catch((e) => setErr(e.code === 'offline' ? t('offline') : e.message)) }, [t])
  if (err) return <div className="mx-auto max-w-3xl p-4"><Notice tone="bad">{err}</Notice></div>
  if (!data) return <Loading />
  const rows = byPack(data.progress)
  const stars = data.packs.reduce((sum, p) => { const s = packStars(p.content, rows[p.id]); return { got: sum.got + s.got, max: sum.max + s.max } }, { got: 0, max: 0 })

  return (
    <main className="mx-auto max-w-4xl px-4 pb-16 pt-6">
      <BackLink to="/">{t('home')}</BackLink>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="page-title">{t('myResults')}</h1>
        {stars.max > 0 && (
          <span className="inline-flex items-center gap-2 rounded-2xl bg-pra-sun-pale px-4 py-2 text-lg font-black tabular-nums text-pra-sun-ink" aria-label={t('stars', { n: stars.got })}>
            <Star className="h-6 w-6 fill-pra-sun text-pra-sun-deep" aria-hidden /> {stars.got}<span className="text-sm font-extrabold opacity-70">/ {stars.max}</span>
          </span>
        )}
      </div>
      {!data.packs.length && (
        <div className="card flex items-center gap-4 p-6">
          <Pip mood="calm" size={84} />
          <p className="text-lg font-semibold text-pra-ink-soft">{t('nothingYet')}</p>
        </div>
      )}
      <ul className="space-y-3">
        {data.packs.map((p) => {
          const [subject] = splitClass(p.class_key)
          const labels = partLabels(p.content, t)
          return (
            <li key={p.id} className="card p-4 sm:p-5">
              <Link to={`/p/${p.slug}`} className="group mb-3 flex items-center gap-3 rounded-2xl">
                <SubjectTile subject={subject} tone={subjectTone(subject)} size="h-11 w-11" icon="h-6 w-6" />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-extrabold uppercase tracking-wider" style={{ color: subjectTone(subject) }}>{subjectName(subject, lang)}</span>
                  <span className="block break-words text-lg font-extrabold leading-snug text-pra-ink group-hover:text-pra-blue">{pick(p.content, 'title', lang)}</span>
                </span>
                <ChevronRight className="h-6 w-6 shrink-0 text-slate-300 group-hover:text-pra-blue" strokeWidth={3} aria-hidden />
              </Link>
              <div className="grid gap-2 sm:grid-cols-2">
                {partsOf(p.content).map((part) => {
                  const g = rows[p.id]?.[part.id]
                  const Icon = part.kind === 'practice' ? Pencil : BookOpen
                  const total = partIds(p.content, part.id).length
                  const right = Object.values(g?.first_items || g?.items || {}).filter((v) => v.ok).length
                  return (
                    <div key={part.id} className={`flex min-h-[60px] items-center gap-3 rounded-2xl px-4 py-2.5 ${g?.done ? 'bg-pra-green-pale' : 'bg-pra-paper'}`}>
                      <Icon className={`h-6 w-6 shrink-0 ${g?.done ? 'text-pra-green-deep' : 'text-pra-ink-soft'}`} strokeWidth={2.4} aria-hidden />
                      <span className="min-w-0 flex-1 font-bold text-pra-ink">{labels[part.id]}</span>
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
