import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, KeyRound, Layers, Users } from 'lucide-react'
import { Loading, Notice } from '../components/ui.jsx'
import { api } from '../lib/api.js'
import { useAuth } from '../lib/auth.jsx'
import { useT } from '../lib/i18n.jsx'
import { splitClass, subjectName, subjectTone } from '../data/subjects.js'

// A teacher's classes (office and head teachers: every class), grouped by year group.
export default function TeacherHome() {
  const { t, lang } = useT()
  const { me } = useAuth()
  const [classes, setClasses] = useState(null)
  const [err, setErr] = useState('')
  useEffect(() => { api.classes().then(setClasses).catch((e) => setErr(e.message)) }, [])
  if (err) return <div className="mx-auto max-w-3xl p-4"><Notice tone="bad">{t('failed', { msg: err })}</Notice></div>
  if (!classes) return <Loading />

  const groups = new Map()
  for (const c of classes) {
    const [, yg] = splitClass(c.class_key)
    if (!groups.has(yg)) groups.set(yg, [])
    groups.get(yg).push(c)
  }

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-6">
      <p className="eyebrow mb-1">{me?.name}</p>
      <h1 className="mb-6 text-3xl font-extrabold text-pra-ink">{t('myClassesStaff')}</h1>
      {[...groups.entries()].map(([yg, list]) => (
        <section key={yg} className="mb-6">
          <h2 className="mb-2 text-sm font-extrabold uppercase tracking-widest text-pra-ink-soft">{yg}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((c) => {
              const [s] = splitClass(c.class_key)
              return (
                <Link key={c.class_key} to={`/t/${encodeURIComponent(c.class_key)}`} className="card group flex flex-col gap-3 p-5 transition hover:border-pra-blue">
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full" style={{ background: subjectTone(s) }} />
                    <span className="text-xl font-extrabold text-pra-ink">{subjectName(s, lang)}</span>
                    <ChevronRight className="ml-auto h-5 w-5 text-pra-ink-soft group-hover:text-pra-blue" />
                  </span>
                  <span className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-bold text-pra-ink-soft">
                    <span className="inline-flex items-center gap-1"><Users className="h-4 w-4" /> {t('nStudents', { n: c.students })}</span>
                    <span className="inline-flex items-center gap-1"><KeyRound className="h-4 w-4" /> {t('nLogins', { n: c.logins })}</span>
                    <span className="inline-flex items-center gap-1"><Layers className="h-4 w-4" /> {t('nLessons', { n: c.packs })}</span>
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </main>
  )
}
