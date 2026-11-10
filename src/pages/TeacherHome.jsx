import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, KeyRound, Layers, Presentation, Sparkles, Users } from 'lucide-react'
import { Loading, Notice, SectionHead, SubjectTile } from '../components/ui.jsx'
import { ClassroomLessonList, classroomLessonsFor } from '../components/ClassroomLessons.jsx'
import { UnitList, unitsFor } from '../components/UnitCards.jsx'
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

  const decks = classroomLessonsFor(me)
  const units = unitsFor(me)
  const fromClass = (key) => decks.filter((l) => l.classKey === key).length
  const groups = new Map()
  for (const c of classes) {
    const [, yg] = splitClass(c.class_key)
    if (!groups.has(yg)) groups.set(yg, [])
    groups.get(yg).push(c)
  }

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-6">
      <p className="eyebrow mb-1">{me?.name}</p>
      <h1 className="page-title mb-6">{t('myClassesStaff')}</h1>
      {[...groups.entries()].map(([yg, list]) => (
        <section key={yg} className="mb-6">
          <h2 className="eyebrow mb-2">{yg}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((c) => {
              const [s] = splitClass(c.class_key)
              return (
                <Link key={c.class_key} to={`/t/${encodeURIComponent(c.class_key)}`} className="card card-link group flex flex-col gap-3 p-4 sm:p-5">
                  <span className="flex items-center gap-3">
                    <SubjectTile subject={s} tone={subjectTone(s)} size="h-12 w-12" icon="h-6 w-6" />
                    <span className="min-w-0 flex-1 text-xl font-extrabold text-pra-ink">{subjectName(s, lang)}</span>
                    <ChevronRight className="h-6 w-6 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-pra-blue" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="flex flex-wrap gap-x-4 gap-y-1 border-t-2 border-pra-line pt-3 text-sm font-bold text-pra-ink-soft">
                    <span className="inline-flex items-center gap-1"><Users className="h-4 w-4" /> {t('nStudents', { n: c.students })}</span>
                    <span className="inline-flex items-center gap-1"><KeyRound className="h-4 w-4" /> {t('nLogins', { n: c.logins })}</span>
                    <span className="inline-flex items-center gap-1"><Layers className="h-4 w-4" /> {t('nLessons', { n: c.packs })}</span>
                    {fromClass(c.class_key) > 0 && (
                      <span className="inline-flex items-center gap-1 text-pra-sky"><Presentation className="h-4 w-4" /> {t('nFromClass', { n: fromClass(c.class_key) })}</span>
                    )}
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      ))}
      {/* The units (src/data/units.js): staff open them as a student would, nothing saved for them. */}
      {units.length > 0 && (
        <section className="mb-6 mt-10" aria-labelledby="h-units">
          <SectionHead id="h-units" icon={Sparkles} tone="#F5A623" hint={t('unitsStaffHint')}>{t('units')}</SectionHead>
          <UnitList units={units} progress={{}} lang={lang} showClass />
        </section>
      )}
      {/* The classroom decks, as the students see them (src/data/classroomLessons.js). */}
      {decks.length > 0 && (
        <section className="mb-6 mt-10" aria-labelledby="h-class">
          <SectionHead id="h-class" icon={Presentation} tone="#2196E3" hint={t('classLessonsStaffHint')}>{t('classLessons')}</SectionHead>
          <ClassroomLessonList lessons={decks} lang={lang} showClass staff />
        </section>
      )}
    </main>
  )
}
