import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Trophy } from 'lucide-react'
import { Loading, Notice } from '../components/ui.jsx'
import { PackCard, packDone, todayIso, weekEndIso } from '../components/packs.jsx'
import { api } from '../lib/api.js'
import { useT } from '../lib/i18n.jsx'
import { useAuth } from '../lib/auth.jsx'
import { byPack } from '../pack/model.js'
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
  // Late (due before today, not finished) first, then due in the next 7 days, then the rest;
  // finished packs go to Done. Worked out from today's date in this browser.
  const today = todayIso(new Date(data.now))
  const sunday = weekEndIso(new Date(data.now))
  const byDue = (a, b) => String(a.due_on || '9999').localeCompare(String(b.due_on || '9999'))
  const done = data.packs.filter((p) => packDone(p.content, rows[p.id]))
  const open = data.packs.filter((p) => !done.includes(p)).sort(byDue)
  const late = open.filter((p) => p.due_on && p.due_on < today)
  const week = open.filter((p) => !late.includes(p) && (p.due_on ? p.due_on <= sunday : data.now - Date.parse(p.published_at || 0) < WEEK))
  const later = open.filter((p) => !late.includes(p) && !week.includes(p))
  const classes = [...new Set(data.packs.map((p) => p.class_key))]
  const list = (packs, opts = {}) => (
    <div className="space-y-3">{packs.map((p) => <PackCard key={p.id} pack={p} rows={rows[p.id]} lang={lang} {...opts} />)}</div>
  )

  return (
    <main className="mx-auto max-w-4xl px-4 pb-16 pt-6">
      <h1 className="mb-6 break-words text-3xl font-extrabold text-pra-ink sm:text-4xl">{t('hello', { name: me?.name || '' })}</h1>

      {late.length > 0 && (
        <section className="mb-8" aria-labelledby="h-late">
          <h2 id="h-late" className="mb-3 text-xl font-extrabold text-[#A8321F]">{t('lateHead')}</h2>
          {list(late, { late: true })}
        </section>
      )}

      {(week.length > 0 || !open.length) && (
        <section className="mb-8" aria-labelledby="h-week">
          <h2 id="h-week" className="mb-3 text-xl font-extrabold text-pra-ink">{t('thisWeek')}</h2>
          {week.length ? list(week) : (
            <div className="card p-6 text-lg font-semibold text-pra-ink-soft">{data.packs.length ? t('allCaughtUp') : t('nothingYet')}</div>
          )}
        </section>
      )}

      {later.length > 0 && (
        <section className="mb-8" aria-labelledby="h-later">
          <h2 id="h-later" className="mb-3 text-xl font-extrabold text-pra-ink">{t('comingUp')}</h2>
          {list(later)}
        </section>
      )}

      {done.length > 0 && (
        <section className="mb-8" aria-labelledby="h-done">
          <h2 id="h-done" className="mb-3 text-xl font-extrabold text-pra-green-dark">{t('doneList')}</h2>
          {list(done, { done: true })}
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
