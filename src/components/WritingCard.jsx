// The My Writing card on the student home page: the latest mark and which way it went,
// how many pieces are marked, writing left unfinished, and the way into My Writing
// (/unit/#/writing). Shown when one of the student's units has timed writing. English
// only, like the English track it belongs to.
import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, ChevronRight, Minus, PenLine } from 'lucide-react'
import { essayStats, myEssays } from '../lib/essays.js'

const LOOK = { face: '#7C5CFF', edge: '#4B2FCF' }

export default function WritingCard() {
  const [list, setList] = useState(null)
  useEffect(() => {
    let alive = true
    myEssays().then((l) => alive && setList(l)).catch(() => alive && setList([]))
    return () => { alive = false }
  }, [])
  const stats = essayStats(list || [])
  const open = (list || []).filter((e) => e.status !== 'marked').length
  const notes = (list || []).filter((e) => e.teacherNote).length
  const href = `${import.meta.env.BASE_URL}unit/${window.location.search}#/writing`
  const Arrow = stats.change > 0 ? ArrowUpRight : stats.change < 0 ? ArrowDownRight : Minus
  const line = !list ? '' : stats.count === 0
    ? 'Every unit ends with timed writing. Your writing and marks are kept here.'
    : `${stats.count} marked${open ? ` · ${open} not finished` : ''}${notes ? ` · ${notes} teacher note${notes === 1 ? '' : 's'}` : ''}`

  return (
    <a href={href} className="group mb-8 flex items-center gap-4 rounded-3xl border-b-[6px] p-4 text-white transition duration-100 hover:brightness-105 active:mb-9 active:translate-y-1 active:border-b-2 sm:p-5" style={{ background: LOOK.face, borderColor: LOOK.edge }}>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black/15 sm:h-14 sm:w-14"><PenLine className="h-6 w-6" strokeWidth={2.5} aria-hidden /></span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-extrabold uppercase tracking-wider text-white/90">{'My Writing'}</span>
        <span className="mt-0.5 block text-xl font-black leading-tight tracking-tight sm:text-2xl">
          {stats.latest == null ? 'Your writing and your marks' : `Latest mark: ${stats.latest}/12`}
          {stats.change != null && <Arrow className="ml-1.5 inline h-6 w-6 -translate-y-0.5" strokeWidth={3} aria-label={stats.change > 0 ? 'up' : stats.change < 0 ? 'down' : 'same'} />}
        </span>
        {line && <span className="mt-0.5 block text-sm font-bold text-white/85">{line}</span>}
      </span>
      <ChevronRight className="h-7 w-7 shrink-0 transition group-hover:translate-x-1" strokeWidth={3} aria-hidden />
    </a>
  )
}
