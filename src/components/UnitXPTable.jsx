// A class's XP in its units, for staff (the class page): one table a unit, a row a
// student, a column a task with the XP held out of the XP it is worth, and the unit's
// total (capped at 100). Like the Dashboard's gradebook. Read-only.
import { useEffect, useState } from 'react'
import { Check, Trophy } from 'lucide-react'
import { SectionHead } from './ui.jsx'
import { loadClassUnits } from '../lib/unitProgress.js'
import { UNITS, UNIT_XP, taskDone, taskTitle, taskXP, unitHref, unitKey, unitXP } from '../data/units.js'

const TEXT = {
  title: ['XP in units', 'XP theo chủ đề'],
  hint: ['The XP each student holds in every task, out of the XP the task is worth.', 'Số XP mỗi học viên đang có ở từng nhiệm vụ, trên số XP tối đa của nhiệm vụ.'],
  student: ['Student', 'Học viên'],
  total: ['Total', 'Tổng'],
  none: ['Nobody has started this unit yet.', 'Chưa có học viên nào bắt đầu chủ đề này.'],
  open: ['Open the unit', 'Mở chủ đề'],
}

/** `students` = the class page's list ({ id, name }). Shows nothing for a class with no units. */
export default function UnitXPTable({ classKey, students, lang }) {
  const units = UNITS.filter((u) => u.classKey === classKey && !u.hidden)
  const [rows, setRows] = useState(null)
  useEffect(() => {
    if (!units.length) return undefined
    let alive = true
    loadClassUnits(classKey, students).then((r) => alive && setRows(r)).catch(() => alive && setRows({}))
    return () => { alive = false }
    // The units of a class never change while the page is open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classKey, students])
  if (!units.length || !rows) return null
  const t = (k) => TEXT[k][lang === 'vn' ? 1 : 0]
  const sorted = [...students].sort((a, b) => String(a.name).localeCompare(String(b.name)))

  return (
    <section className="mb-8" aria-labelledby="h-unit-xp">
      <SectionHead id="h-unit-xp" icon={Trophy} tone="#F5A623" hint={t('hint')}>{t('title')}</SectionHead>
      <div className="space-y-4">
        {units.map((u) => {
          const key = unitKey(u)
          const started = sorted.filter((s) => rows[s.id]?.[key])
          return (
            <div key={key} className="card overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-pra-line px-4 py-3">
                <h3 className="text-lg font-extrabold text-pra-ink"><span className="mr-2 text-pra-blue">{u.label}</span>{u.title}</h3>
                <a href={unitHref(u, window.location.search)} className="text-sm font-extrabold text-pra-blue hover:underline">{t('open')}</a>
              </div>
              {started.length === 0 ? <p className="px-4 py-4 font-semibold text-pra-ink-soft">{t('none')}</p> : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[34rem] border-collapse text-left">
                    <thead>
                      <tr className="bg-pra-paper text-xs font-extrabold uppercase tracking-wide text-pra-ink-soft">
                        <th scope="col" className="px-4 py-2">{t('student')}</th>
                        {u.tasks.map((task) => (
                          <th key={task.id} scope="col" className="px-2 py-2 text-center">{taskTitle(task, lang)}<span className="block font-bold normal-case tracking-normal opacity-70">/ {task.xp}</span></th>
                        ))}
                        <th scope="col" className="px-4 py-2 text-right">{t('total')}<span className="block font-bold normal-case tracking-normal opacity-70">/ {UNIT_XP}</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {sorted.map((s) => {
                        const recs = rows[s.id]?.[key] || {}
                        const sum = unitXP(u, recs)
                        return (
                          <tr key={s.id} className="border-t-2 border-pra-line">
                            <th scope="row" className="px-4 py-2 font-extrabold text-pra-ink">{s.name}</th>
                            {u.tasks.map((task) => {
                              const r = recs[task.id]
                              const xp = taskXP(task, r)
                              const tone = !r ? 'text-pra-ink-soft' : xp >= task.xp ? 'bg-pra-green-pale text-pra-green-dark' : taskDone(r) ? 'bg-pra-blue-pale text-pra-blue-deep' : 'bg-pra-sun-pale text-pra-sun-ink'
                              return <td key={task.id} className="px-2 py-2 text-center"><span className={`inline-block min-w-[2.5rem] rounded-lg px-2 py-1 text-sm font-extrabold tabular-nums ${tone}`}>{r ? xp : '–'}</span></td>
                            })}
                            <td className="px-4 py-2 text-right font-black tabular-nums text-pra-ink">
                              {sum.done && <Check className="mr-1 inline h-4 w-4 text-pra-green-deep" strokeWidth={3.5} aria-label="finished" />}{sum.xp}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
