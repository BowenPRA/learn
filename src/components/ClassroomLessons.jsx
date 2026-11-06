/* eslint-disable react-refresh/only-export-components */
import { ChevronRight, Presentation } from 'lucide-react'
import { SubjectTile } from './ui.jsx'
import { useT } from '../lib/i18n.jsx'
import { DEMO } from '../lib/api.js'
import { CLASSROOM_LESSONS, classroomHref } from '../data/classroomLessons.js'
import { className, splitClass, subjectName, subjectTone } from '../data/subjects.js'

const norm = (s) => String(s || '').trim().replace(/\s+/g, ' ').toLowerCase()

/** The classroom decks someone sees, newest first: a student, their year group's;
 *  staff and the demo, all of them. `classKey` narrows to one class (a class page). */
export function classroomLessonsFor(me, classKey = null) {
  let list = CLASSROOM_LESSONS
  if (classKey) list = list.filter((l) => l.classKey === classKey)
  else if (!DEMO && me?.kind === 'student') list = list.filter((l) => norm(splitClass(l.classKey)[1]) === norm(me.year_group))
  return [...list].reverse()
}

/** A classroom deck's address, keeping ?demo so the demo stays the demo. */
export const classroomLink = (lesson) => classroomHref(lesson, window.location.search)

/** The title a learner reads: 'Tides' (the unit, '3.4', goes in its own chip). */
export const classroomTitle = (lesson, lang) => (lang === 'vn' ? lesson.titleVn || lesson.title : lesson.title)

/** One of Mr. Bowen's classroom decks. It opens on its own page (classroom/index.html).
 *  `showClass` names the class ('Year 7 Science') for staff, who see every class. */
function ClassroomCard({ lesson, lang, showClass = false }) {
  const { t } = useT()
  const [subject] = splitClass(lesson.classKey)
  const tone = subjectTone(subject)
  const sub = (lang === 'vn' ? lesson.subtitleVn : null) || lesson.subtitle
  return (
    <a href={classroomLink(lesson)}
      className="card card-link group relative flex items-center gap-3 overflow-hidden p-4 sm:gap-5 sm:p-5">
      <span aria-hidden className="absolute inset-y-0 left-0 w-1.5" style={{ background: tone }} />
      <SubjectTile subject={subject} tone={tone} size="hidden h-14 w-14 sm:inline-flex" />
      <div className="min-w-0 flex-1">
        <p className="mb-1 flex flex-wrap items-center gap-2">
          <span className="text-sm font-extrabold uppercase tracking-wide" style={{ color: tone }}>
            {showClass ? className(lesson.classKey, lang) : subjectName(subject, lang)}
          </span>
          <span className="chip bg-pra-paper font-extrabold text-pra-ink-soft ring-1 ring-inset ring-pra-line">{lesson.unit}</span>
          {lesson.teacher && <span className="chip bg-pra-blue-pale text-pra-blue-deep">{lesson.teacher}</span>}
        </p>
        <h3 className="break-words text-lg font-extrabold leading-snug text-pra-ink sm:text-xl">{classroomTitle(lesson, lang)}</h3>
        <p className="mt-1 text-sm font-semibold leading-snug text-pra-ink-soft">{sub || t('classLessonSub')}</p>
      </div>
      <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition group-hover:scale-105" style={{ background: `${tone}1A` }}>
        <Presentation className="h-6 w-6" style={{ color: tone }} strokeWidth={2.4} aria-hidden />
      </span>
      <ChevronRight className="hidden h-6 w-6 shrink-0 text-pra-ink-soft transition group-hover:translate-x-0.5 group-hover:text-pra-blue sm:block" aria-hidden />
    </a>
  )
}

/** The classroom decks as cards, under a heading the page supplies. */
export function ClassroomLessonList({ lessons, lang, showClass = false }) {
  return (
    <div className="space-y-3">
      {lessons.map((l) => <ClassroomCard key={`${l.course}/${l.slug}`} lesson={l} lang={lang} showClass={showClass} />)}
    </div>
  )
}
