/* eslint-disable react-refresh/only-export-components */
import { ChevronRight, Presentation } from 'lucide-react'
import { SubjectTile } from './ui.jsx'
import { useT } from '../lib/i18n.jsx'
import { DEMO } from '../lib/api.js'
import { CLASSROOM_LESSONS, classroomHref } from '../data/classroomLessons.js'
import { splitClass, subjectName, subjectTone } from '../data/subjects.js'

/** The classroom decks someone sees: a student, their year group's; staff and the demo, all of them. */
export function classroomLessonsFor(me) {
  if (DEMO || me?.kind !== 'student') return CLASSROOM_LESSONS
  return CLASSROOM_LESSONS.filter((l) => splitClass(l.classKey)[1] === me.year_group)
}

/** One of Mr. Bowen's classroom decks. It opens on its own page (classroom/index.html). */
function ClassroomCard({ lesson, lang }) {
  const { t } = useT()
  const [subject] = splitClass(lesson.classKey)
  const tone = subjectTone(subject)
  const title = lang === 'vn' ? lesson.titleVn || lesson.title : lesson.title
  return (
    <a href={classroomHref(lesson, window.location.search)}
      className="card card-link group relative flex items-center gap-3 overflow-hidden p-4 sm:gap-5 sm:p-5">
      <span aria-hidden className="absolute inset-y-0 left-0 w-1.5" style={{ background: tone }} />
      <SubjectTile subject={subject} tone={tone} size="hidden h-14 w-14 sm:inline-flex" />
      <div className="min-w-0 flex-1">
        <p className="mb-1 flex flex-wrap items-center gap-2">
          <span className="text-sm font-extrabold uppercase tracking-wide" style={{ color: tone }}>{subjectName(subject, lang)}</span>
          {lesson.teacher && <span className="chip bg-pra-blue-pale text-pra-blue-deep">{lesson.teacher}</span>}
        </p>
        <h3 className="break-words text-lg font-extrabold leading-snug text-pra-ink sm:text-xl">
          <span className="text-pra-ink-soft">{lesson.unit}</span> {title}
        </h3>
        <p className="mt-1 text-sm font-semibold text-pra-ink-soft">{t('classLessonSub')}</p>
      </div>
      <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full" style={{ background: `${tone}1A` }}>
        <Presentation className="h-6 w-6" style={{ color: tone }} strokeWidth={2.4} aria-hidden />
      </span>
      <ChevronRight className="hidden h-6 w-6 shrink-0 text-pra-ink-soft transition group-hover:translate-x-0.5 group-hover:text-pra-blue sm:block" aria-hidden />
    </a>
  )
}

/** "Lessons from class": the classroom decks, under a heading the page supplies. */
export function ClassroomLessonList({ lessons, lang }) {
  return (
    <div className="space-y-3">
      {lessons.map((l) => <ClassroomCard key={`${l.course}/${l.slug}`} lesson={l} lang={lang} />)}
    </div>
  )
}
