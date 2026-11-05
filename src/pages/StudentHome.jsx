import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Trophy } from 'lucide-react'
import { Loading, Notice } from '../components/ui.jsx'
import { PackCard } from '../components/packs.jsx'
import { api } from '../lib/api.js'
import { useT } from '../lib/i18n.jsx'
import { useAuth } from '../lib/auth.jsx'
import { byPack, partsOf } from '../pack/model.js'
import { splitClass, subjectName, subjectTone } from '../data/subjects.js'

const WEEK = 7 * 86400000

export default function StudentHome() {
  const { t, lang } = useT()
  const { me } = useAuth()
  const [data, setData] = useState(null)
  const [err, setErr] = useState('')
  useEffect(() => {
    api.myPacks().then((d) => setData({ ...d, now: Date.now() })).catch((e) => setErr(e.code === 'offline' ? t('offline') : e.message))
  }, [t])
  if (err) return <div className="mx-auto max-w-3xl p-4"><Notice tone="bad">{err}</Notice></div>
  if (!data) return <Loading />

  const rows = byPack(data.progress)
  const allDone = (p) => partsOf(p.content).every((part) => rows[p.id]?.[part.id]?.done)
  // This week: open packs not finished, or published in the last 7 days.
  const recent = data.packs.filter((p) => !allDone(p) || data.now - Date.parse(p.published_at || 0) < WEEK)
  const older = data.packs.filter((p) => !recent.includes(p))
  const classes = [...new Set(data.packs.map((p) => p.class_key))]

  return (
    <main className="mx-auto max-w-4xl px-4 pb-16 pt-6">
      <h1 className="mb-6 text-3xl font-extrabold text-pra-ink sm:text-4xl">{t('hello', { name: me?.name || '' })}</h1>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-extrabold text-pra-ink">{t('thisWeek')}</h2>
        {recent.length ? (
          <div className="space-y-3">{recent.map((p) => <PackCard key={p.id} pack={p} rows={rows[p.id]} lang={lang} big />)}</div>
        ) : (
          <div className="card p-6 text-lg font-semibold text-pra-ink-soft">{t('nothingYet')}</div>
        )}
      </section>

      {older.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-xl font-extrabold text-pra-ink">{t('lessons')}</h2>
          <div className="space-y-3">{older.map((p) => <PackCard key={p.id} pack={p} rows={rows[p.id]} lang={lang} />)}</div>
        </section>
      )}

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-3 text-lg font-extrabold text-pra-ink">{t('myClasses')}</h2>
          <ul className="flex flex-wrap gap-2">
            {classes.map((k) => {
              const [s, yg] = splitClass(k)
              const teacher = data.packs.find((p) => p.class_key === k)?.content?.teacher
              return (
                <li key={k} className="rounded-2xl border-2 px-3 py-2 font-bold" style={{ borderColor: subjectTone(s), color: subjectTone(s) }}>
                  {subjectName(s, lang)} <span className="text-pra-ink-soft">· {yg}{teacher ? ` · ${teacher}` : ''}</span>
                </li>
              )
            })}
          </ul>
        </div>
        <Link to="/me" className="card flex items-center gap-4 p-5 transition hover:border-pra-blue">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-pra-sun-pale"><Trophy className="h-8 w-8 text-pra-sun-deep" /></span>
          <span className="text-lg font-extrabold text-pra-ink">{t('myResults')}</span>
          <ChevronRight className="ml-auto h-6 w-6 text-pra-ink-soft" />
        </Link>
      </section>
    </main>
  )
}
