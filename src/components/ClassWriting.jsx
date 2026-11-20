// A class's timed writing, for staff (the class page): one table a unit, a row a student,
// a column a writing task, each cell the mark of the student's best piece for it (essays.js
// shownEssays: English 1 had three prompts, and many wrote more than one; ×n says how
// many). A cell opens the essay in the reader (/unit/#/writing/class/<class>/<essay>),
// where the teacher can change the mark, leave a note, and go to the next student's best
// piece; a name opens that student's writing over time. Read-only here.
import { useEffect, useMemo, useState } from 'react'
import { AlertTriangle, MessageSquare, PenLine } from 'lucide-react'
import { SectionHead } from './ui.jsx'
import { bestOf, classEssays, markOf, needsALook, shownEssays } from '../lib/essays.js'
import { UNITS, unitKey } from '../data/units.js'
import { markTone } from '../../unit/app/writing/look.js'

const TEXT = {
  title: ['Writing', 'Bài viết'],
  hint: ['Every piece of timed writing, marked by the AI. Open one to read it, change the mark or leave a note.', 'Mọi bài viết có giờ, được AI chấm. Mở một bài để đọc, sửa điểm hoặc ghi chú.'],
  student: ['Student', 'Học viên'],
  task: ['Timed writing', 'Bài viết có giờ'],
  average: ['Class average', 'Trung bình lớp'],
  none: ['Nobody has handed in writing for this unit yet.', 'Chưa có học viên nào nộp bài viết cho bài này.'],
  inOrder: ['Read them in order', 'Đọc lần lượt'],
  all: ['All', 'Tất cả'],
  look: ['Needs a look', 'Cần xem'],
  unnoted: ['No note yet', 'Chưa ghi chú'],
  handed: ['handed in', 'đã nộp'],
  noted: ['with your note', 'có ghi chú'],
  key: ['flag: left the page often, tried to paste, matches a classmate, or not marked · note: you left a note', 'cờ: rời trang nhiều lần, thử dán, giống bài bạn khác, hoặc không chấm được · ghi chú: bạn đã ghi chú'],
}

const enc = encodeURIComponent
const readerHref = (classKey, id) => `${import.meta.env.BASE_URL}unit/${window.location.search}#/writing/class/${enc(classKey)}/${id}`
const studentHref = (classKey, studentId) => `${import.meta.env.BASE_URL}unit/${window.location.search}#/writing/class/${enc(classKey)}/student/${studentId}`

/** `students` = the class page's list ({ id, name }). Shows nothing for a class with no timed writing. */
export default function ClassWriting({ classKey, students, lang }) {
  const units = UNITS.filter((u) => u.classKey === classKey && !u.hidden && u.tasks.some((t) => t.kind === 'writing'))
  const [all, setAll] = useState(null)
  const [filter, setFilter] = useState('all')
  useEffect(() => {
    if (!units.length) return undefined
    let alive = true
    classEssays(classKey, students).then((l) => alive && setAll(l)).catch(() => alive && setAll([]))
    return () => { alive = false }
    // The units of a class never change while the page is open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classKey, students])
  const t = (k) => TEXT[k][lang === 'vn' ? 1 : 0]
  const sorted = useMemo(() => [...students].sort((a, b) => String(a.name).localeCompare(String(b.name))), [students])
  const list = useMemo(() => (all ? shownEssays(all) : null), [all])
  if (!units.length || !list) return null

  const shown = list.filter((e) => (filter === 'look' ? needsALook(e) : filter === 'unnoted' ? !e.teacherNote : true))
  const counts = { handed: list.length, look: list.filter(needsALook).length, noted: list.filter((e) => e.teacherNote).length }

  return (
    <section className="mb-8" aria-labelledby="h-writing">
      <SectionHead id="h-writing" icon={PenLine} tone="#7C5CFF" hint={t('hint')}>{t('title')}</SectionHead>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {[['all', `${t('all')} · ${counts.handed}`], ['look', `${t('look')} · ${counts.look}`], ['unnoted', `${t('unnoted')} · ${counts.handed - counts.noted}`]].map(([id, label]) => (
          <button key={id} type="button" onClick={() => setFilter(id)} aria-pressed={filter === id}
            className={`chip py-1.5 font-extrabold ${filter === id ? 'bg-[#7C5CFF] text-white' : 'bg-white text-pra-ink-soft ring-2 ring-pra-line'}`}>
            {id === 'look' && <AlertTriangle className="h-4 w-4" aria-hidden />}{label}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {units.map((u) => {
          const key = unitKey(u)
          const mine = shown.filter((e) => e.unitKey === key)
          // A column a writing task (most units have one), each with a title.
          const tasks = u.tasks.filter((x) => x.kind === 'writing').map((x) => [x.id, x.title || t('task')])
          const cell = (sid, tid) => bestOf(mine.filter((e) => e.studentId === sid && e.taskId === tid))
          // Every piece handed in for the task, the hidden ones too.
          const tries = (sid, tid) => all.filter((e) => e.studentId === sid && e.unitKey === key && e.taskId === tid).length
          const ordered = sorted.flatMap((s) => tasks.map(([tid]) => cell(s.id, tid)).filter(Boolean))
          const avg = (tid) => {
            const marks = sorted.map((s) => cell(s.id, tid)).filter((e) => e && e.status === 'marked' && !e.report?.notMarked).map(markOf)
            return marks.length ? (marks.reduce((a, b) => a + b, 0) / marks.length).toFixed(1) : '–'
          }
          return (
            <div key={key} className="card overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-pra-line px-4 py-3">
                <h3 className="text-lg font-extrabold text-pra-ink"><span className="mr-2 text-[#7C5CFF]">{u.label}</span>{u.title}</h3>
                {ordered[0] && <a href={readerHref(classKey, ordered[0].id)} className="text-sm font-extrabold text-[#6C4DF2] hover:underline">{t('inOrder')}</a>}
              </div>
              {!list.some((e) => e.unitKey === key) ? <p className="px-4 py-4 font-semibold text-pra-ink-soft">{t('none')}</p> : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[30rem] border-collapse text-left">
                    <thead>
                      <tr className="bg-pra-paper text-xs font-extrabold uppercase tracking-wide text-pra-ink-soft">
                        <th scope="col" className="px-4 py-2">{t('student')}</th>
                        {tasks.map(([tid, title]) => <th key={tid} scope="col" className="px-2 py-2 text-center normal-case tracking-normal">{title}<span className="block font-bold opacity-70">/ 12</span></th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {sorted.map((s) => (
                        <tr key={s.id} className="border-t-2 border-pra-line">
                          <th scope="row" className="px-4 py-2 font-extrabold text-pra-ink">
                            <a href={studentHref(classKey, s.id)} className="hover:text-[#6C4DF2] hover:underline">{s.name}</a>
                          </th>
                          {tasks.map(([tid]) => {
                            const e = cell(s.id, tid)
                            if (!e) return <td key={tid} className="px-2 py-2 text-center text-pra-ink-soft">–</td>
                            const mark = e.status === 'marked' && !e.report?.notMarked ? markOf(e) : null
                            const n = tries(s.id, tid)
                            return (
                              <td key={tid} className="px-2 py-2 text-center">
                                <a href={readerHref(classKey, e.id)} title={e.prompt?.title}
                                  className="inline-flex min-w-[3.25rem] items-center justify-center gap-1 rounded-lg border-b-[3px] px-2 py-1 text-sm font-black tabular-nums text-white hover:brightness-105"
                                  style={{ background: markTone(mark).face, borderColor: markTone(mark).edge }}>
                                  {mark ?? (e.status === 'marked' ? '–' : '…')}
                                  {e.teacherScore != null && <span className="text-[10px] font-black opacity-80">T</span>}
                                  {needsALook(e) && <AlertTriangle className="h-3.5 w-3.5" strokeWidth={3} aria-label={t('look')} />}
                                  {e.teacherNote && <MessageSquare className="h-3.5 w-3.5" strokeWidth={3} aria-label={t('noted')} />}
                                </a>
                                {n > 1 && <span className="ml-1 text-xs font-bold text-pra-ink-soft">×{n}</span>}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                      <tr className="border-t-2 border-pra-line bg-pra-paper">
                        <th scope="row" className="px-4 py-2 text-sm font-extrabold text-pra-ink-soft">{t('average')}</th>
                        {tasks.map(([tid]) => <td key={tid} className="px-2 py-2 text-center text-sm font-black tabular-nums text-pra-ink">{avg(tid)}</td>)}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )
        })}
      </div>
      <p className="mt-2 text-xs font-semibold text-pra-ink-soft">{t('key')}</p>
    </section>
  )
}
