/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react'
import { ChevronDown, FileText, ListTree, Presentation } from 'lucide-react'
import { SubjectTile } from './ui.jsx'
import { useT } from '../lib/i18n.jsx'
import { DEMO } from '../lib/api.js'
import { CLASSROOM_LESSONS, classroomGroups, classroomHref, classroomPlanHref, isListedLesson } from '../data/classroomLessons.js'
import { className, splitClass, subjectName, subjectTone } from '../data/subjects.js'

const norm = (s) => String(s || '').trim().replace(/\s+/g, ' ').toLowerCase()

/** The classroom decks someone sees, newest first: a student, their year group's;
 *  staff and the demo, all of them. `classKey` narrows to one class (a class page).
 *  A lesson with `hidden: true` is never listed (its address still opens it). */
export function classroomLessonsFor(me, classKey = null) {
  let list = CLASSROOM_LESSONS.filter(isListedLesson)
  if (classKey) list = list.filter((l) => l.classKey === classKey)
  else if (!DEMO && me?.kind === 'student') list = list.filter((l) => norm(splitClass(l.classKey)[1]) === norm(me.year_group))
  return [...list].reverse()
}

/** The newest lesson of each class, in subject order (Maths before Science). */
export const newestPerClass = (lessons) => classroomGroups(lessons).map((g) => g.lessons[0])

/** A classroom deck's address, keeping ?demo so the demo stays the demo. */
export const classroomLink = (lesson) => classroomHref(lesson, window.location.search)

/** The teacher's plan for a deck (staff pages only), keeping ?demo. */
export const classroomPlanLink = (lesson) => classroomPlanHref(lesson, window.location.search)

/** The title a learner reads: 'Tides' (the unit, '3.4', goes in its own chip). */
export const classroomTitle = (lesson, lang) => (lang === 'vn' ? lesson.titleVn || lesson.title : lesson.title)

const countText = (t, n) => (n === 1 ? t('classCount1') : t('classCountN', { n }))
const keyOf = (l) => `${l.course}/${l.slug}`

/** One lesson as a row: the unit label, the title and its line, and (staff) a Plan link.
 *  The title's link covers the whole row, so the row opens the deck from anywhere. */
function LessonRow({ lesson, lang, tone, newest = false, plan = false }) {
  const { t } = useT()
  const sub = (lang === 'vn' ? lesson.subtitleVn : null) || lesson.subtitle
  return (
    <li className="group relative flex items-center gap-3 px-4 py-3 transition-colors focus-within:bg-pra-paper hover:bg-pra-paper sm:gap-4 sm:px-5">
      <span className="flex min-h-[2.75rem] w-14 shrink-0 items-center justify-center self-start rounded-xl px-1 py-1 text-center text-[13px] font-extrabold leading-tight sm:self-center"
        style={{ background: `${tone}14`, color: tone }}>
        {lesson.unit}
      </span>
      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-4">
        <div className="min-w-0 flex-1">
          <h4 className="flex flex-wrap items-center gap-x-2 gap-y-1 font-extrabold leading-snug text-pra-ink">
            <a href={classroomLink(lesson)}
              className="break-words before:absolute before:inset-0 before:content-[''] focus-visible:outline-none focus-visible:before:ring-2 focus-visible:before:ring-inset focus-visible:before:ring-pra-blue">
              {classroomTitle(lesson, lang)}
            </a>
            {newest && (
              <span className="rounded-md px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white" style={{ background: tone }}>{t('classNewest')}</span>
            )}
          </h4>
          {sub && <p className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-pra-ink-soft sm:line-clamp-1">{sub}</p>}
        </div>
        {plan && (
          <div className="relative z-10 mt-2 shrink-0 sm:mt-0">
            <a href={classroomPlanLink(lesson)} title={t('classPlanTitle')}
              className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-pra-line bg-white px-3 text-sm font-bold text-pra-ink-soft shadow-sm transition hover:border-pra-blue-tint hover:text-pra-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pra-blue">
              <FileText className="h-4 w-4 text-pra-green-deep" strokeWidth={2.4} aria-hidden /> {t('classPlan')}
            </a>
          </div>
        )}
      </div>
      <Presentation className="h-5 w-5 shrink-0 transition group-hover:scale-110" style={{ color: tone }} strokeWidth={2.4} aria-hidden />
    </li>
  )
}

function Rows({ lessons, lang, tone, newestKey, plan }) {
  return (
    <ul className="divide-y divide-pra-line">
      {lessons.map((l) => (
        <LessonRow key={keyOf(l)} lesson={l} lang={lang} tone={tone} plan={plan} newest={keyOf(l) === newestKey} />
      ))}
    </ul>
  )
}

/** A class's lessons under its book units, newest unit first. The newest unit starts
 *  open and the earlier ones folded; each unit's heading opens and folds it. */
function UnitGroups({ group, lang, tone, plan }) {
  const { t } = useT()
  const [open, setOpen] = useState(() => new Set([group.units[0]?.unit]))
  const newestKey = keyOf(group.lessons[0])
  const headed = group.units.length > 1 && group.units.every((u) => u.unit != null)
  if (!headed) return <Rows lessons={group.lessons} lang={lang} tone={tone} newestKey={newestKey} plan={plan} />
  const toggle = (unit) => setOpen((s) => {
    const next = new Set(s)
    if (next.has(unit)) next.delete(unit)
    else next.add(unit)
    return next
  })
  return (
    <div className="divide-y divide-pra-line">
      {group.units.map((u) => {
        const isOpen = open.has(u.unit)
        const name = u.name && (lang === 'vn' ? u.name[1] : u.name[0])
        return (
          <section key={u.unit}>
            <button type="button" onClick={() => toggle(u.unit)} aria-expanded={isOpen}
              className="flex min-h-[56px] w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-pra-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pra-blue sm:px-5">
              <span className="min-w-0 flex-1">
                {name ? (
                  <>
                    <span className="block text-xs font-extrabold uppercase tracking-[0.14em]" style={{ color: tone }}>{t('classUnit', { n: u.unit })}</span>
                    <span className="block font-extrabold leading-snug text-pra-ink">{name}</span>
                  </>
                ) : (
                  <span className="block font-extrabold leading-snug text-pra-ink">{t('classUnit', { n: u.unit })}</span>
                )}
              </span>
              <span className="shrink-0 text-sm font-bold text-pra-ink-soft">{countText(t, u.lessons.length)}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 text-pra-ink-soft transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden />
            </button>
            {isOpen && (
              <div className="border-t border-pra-line">
                <Rows lessons={u.lessons} lang={lang} tone={tone} newestKey={newestKey} plan={plan} />
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}

/** One class's lessons in a card. Students see the newest few and a button that opens
 *  every lesson by unit; staff see every lesson by unit, with a Plan link on each. */
function ClassCard({ group, lang, showClass, staff, newestCount }) {
  const { t } = useT()
  const [all, setAll] = useState(false)
  const [subject] = splitClass(group.classKey)
  const tone = subjectTone(subject)
  const n = group.lessons.length
  const unitsCount = group.units.filter((u) => u.unit != null).length
  const headerCount = staff && unitsCount > 1 ? t('classCountUnits', { n, u: unitsCount }) : countText(t, n)
  const teacher = group.lessons[0].teacher
  const canExpand = !staff && n > newestCount
  return (
    <div className="card relative overflow-hidden">
      <span aria-hidden className="absolute inset-x-0 top-0 h-1.5" style={{ background: tone }} />
      <div className="flex items-center gap-3 border-b border-pra-line px-4 pb-3.5 pt-5 sm:px-5" style={{ background: `${tone}0A` }}>
        <SubjectTile subject={subject} tone={tone} size="h-11 w-11" icon="h-6 w-6" />
        <div className="min-w-0 flex-1">
          <h3 className="break-words text-lg font-extrabold leading-tight text-pra-ink">{showClass ? className(group.classKey, lang) : subjectName(subject, lang)}</h3>
          <p className="text-sm font-bold text-pra-ink-soft">{headerCount}{teacher ? ` · ${teacher}` : ''}</p>
        </div>
      </div>
      {staff || all
        ? <UnitGroups group={group} lang={lang} tone={tone} plan={staff} />
        : <Rows lessons={group.lessons.slice(0, newestCount)} lang={lang} tone={tone} newestKey={keyOf(group.lessons[0])} plan={false} />}
      {canExpand && (
        <button type="button" onClick={() => setAll((v) => !v)} aria-expanded={all}
          className="flex min-h-[56px] w-full items-center justify-center gap-2 border-t border-pra-line px-4 text-base font-extrabold text-pra-blue transition-colors hover:bg-pra-blue-pale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pra-blue">
          <ListTree className="h-5 w-5 shrink-0" strokeWidth={2.4} aria-hidden />
          <span>{all ? t('classFewer') : t('classAll', { n })}</span>
          <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${all ? 'rotate-180' : ''}`} aria-hidden />
        </button>
      )}
    </div>
  )
}

/**
 * The classroom decks under a heading the page supplies: one card per class (Maths,
 * then Science), each by book unit. `staff` lists every lesson with a Plan link;
 * otherwise (a student's home) each card shows the newest `newestCount` and opens the
 * rest on request. `showClass` names the class ('Year 7 Science') for staff.
 */
export function ClassroomLessonList({ lessons, lang, showClass = false, staff = false, newestCount = 3 }) {
  const groups = classroomGroups(lessons)
  return (
    <div className={`grid items-start gap-4 ${groups.length > 1 ? 'lg:grid-cols-2' : ''}`}>
      {groups.map((g) => (
        <ClassCard key={g.classKey} group={g} lang={lang} showClass={showClass} staff={staff} newestCount={newestCount} />
      ))}
    </div>
  )
}
