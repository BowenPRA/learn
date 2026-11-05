import { Link } from 'react-router-dom'
import { BookOpen, CalendarClock, ChevronRight, Pencil } from 'lucide-react'
import { Ring } from './ui.jsx'
import { shortDate, useT } from '../lib/i18n.jsx'
import { partIds, partsOf } from '../pack/model.js'
import { splitClass, subjectName, subjectTone } from '../data/subjects.js'

/** A ring per part: review (book) and practice (pencil). */
export function PartRings({ pack, rows, size = 52 }) {
  const { t } = useT()
  return (
    <span className="flex items-center gap-2">
      {partsOf(pack.content).map((p) => {
        const g = rows?.[p.id]
        const Icon = p.kind === 'practice' ? Pencil : BookOpen
        const total = Math.max(1, partIds(pack.content, p.id).length)
        const v = g ? (g.done ? 1 : Math.max(0.12, Object.keys(g.items || {}).length / total)) : null
        return (
          <Ring key={p.id} value={v} done={g?.done} size={size} label={`${t(p.kind)}: ${g?.done ? t('done') : g ? t('started') : t('notDone')}`}>
            <Icon className={`h-5 w-5 ${g?.done ? 'text-pra-green-deep' : 'text-pra-ink-soft'}`} strokeWidth={2.5} />
          </Ring>
        )
      })}
    </span>
  )
}

export function PackCard({ pack, rows, lang, big = false }) {
  const { t } = useT()
  const [subject] = splitClass(pack.class_key)
  const tone = subjectTone(subject)
  const title = lang === 'vn' ? pack.title_vn || pack.title : pack.title
  return (
    <Link to={`/p/${pack.slug}`} className={`card group flex flex-wrap items-center gap-x-4 gap-y-3 p-4 transition hover:border-pra-blue ${big ? 'sm:p-6' : ''}`}>
      <div className="min-w-0 basis-full sm:basis-0 sm:flex-1">
        <p className="mb-1 flex flex-wrap items-center gap-2">
          <span className="rounded-full px-3 py-0.5 text-sm font-extrabold text-white" style={{ background: tone }}>{subjectName(subject, lang)}</span>
          {pack.due_on && (
            <span className="inline-flex items-center gap-1 rounded-full bg-pra-sun-pale px-3 py-0.5 text-sm font-bold text-pra-sun-ink">
              <CalendarClock className="h-4 w-4" /> {t('due', { date: shortDate(pack.due_on, lang) })}
            </span>
          )}
        </p>
        <h3 className={`font-extrabold leading-snug text-pra-ink ${big ? 'text-xl sm:text-2xl' : 'text-lg'}`}>{title}</h3>
      </div>
      <PartRings pack={pack} rows={rows} size={big ? 56 : 48} />
      <ChevronRight className="hidden h-7 w-7 text-pra-ink-soft group-hover:text-pra-blue sm:block" />
    </Link>
  )
}
