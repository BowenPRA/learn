/* eslint-disable react-refresh/only-export-components */
import { Link } from 'react-router-dom'
import { AlertCircle, BookOpen, CalendarClock, Check, ChevronRight, Pencil } from 'lucide-react'
import { shortDate, useT } from '../lib/i18n.jsx'
import { partIds, partsOf } from '../pack/model.js'
import { splitClass, subjectName, subjectTone } from '../data/subjects.js'

/** A short name a child can read for each part: "Review", "Practice 1", "Practice 2" ("Practice" when there is one). */
export function partLabels(content, t) {
  const parts = partsOf(content)
  const practices = parts.filter((p) => p.kind === 'practice')
  const out = {}
  for (const p of parts) {
    if (p.kind === 'practice') out[p.id] = practices.length > 1 ? t('practiceN', { n: practices.indexOf(p) + 1 }) : t('practice')
    else out[p.id] = t(p.kind)
  }
  return out
}

/** How far a part has got: { state: 'new' | 'started' | 'done', n, total }. */
export function partState(content, partId, row) {
  const total = partIds(content, partId).length
  if (row?.done) return { state: 'done', n: total, total }
  const n = row ? Object.keys(row.items || {}).length : 0
  return { state: n > 0 ? 'started' : 'new', n, total }
}

export const packDone = (content, rows) => partsOf(content).length > 0 && partsOf(content).every((p) => rows?.[p.id]?.done)

/** The first part not done yet, or null. */
export const nextPart = (content, rows) => partsOf(content).find((p) => !rows?.[p.id]?.done) || null

/** Where a part is played. */
export const partPath = (slug, part) =>
  `/p/${slug}/${part.kind === 'practice' ? 'practice' : 'review'}${part.kind === 'practice' && part.id !== 'practice' ? `?part=${encodeURIComponent(part.id)}` : ''}`

/** Today in this browser as 'YYYY-MM-DD'. */
export function todayIso(now = new Date()) {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

/** The last day of "this week": today and the six days after it, as 'YYYY-MM-DD'. */
export function weekEndIso(now = new Date()) {
  const d = new Date(now)
  d.setDate(d.getDate() + 6)
  return todayIso(d)
}

/** Each part as a labelled chip: name and "not started" / "3 of 12" / "Done ✓". */
export function PartChips({ pack, rows }) {
  const { t } = useT()
  const labels = partLabels(pack.content, t)
  return (
    <ul className="flex flex-wrap gap-2">
      {partsOf(pack.content).map((p) => {
        const s = partState(pack.content, p.id, rows?.[p.id])
        const Icon = p.kind === 'practice' ? Pencil : BookOpen
        const cls = s.state === 'done'
          ? 'border-pra-green-deep bg-pra-green-pale text-pra-green-dark'
          : s.state === 'started'
            ? 'border-pra-blue bg-pra-blue-pale text-pra-blue-ink'
            : 'border-pra-line bg-white text-pra-ink'
        const status = s.state === 'done' ? t('done') : s.state === 'started' ? t('nOfTotal', { n: s.n, total: s.total }) : t('notStarted')
        return (
          <li key={p.id} className={`flex min-h-[44px] items-center gap-2 rounded-2xl border-2 px-3 py-1.5 ${cls}`}>
            {s.state === 'done'
              ? <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pra-green-deep text-white"><Check className="h-4 w-4" strokeWidth={3.5} /></span>
              : <Icon className="h-5 w-5 shrink-0" strokeWidth={2.5} aria-hidden />}
            <span className="text-base font-extrabold leading-tight">{labels[p.id]}</span>
            <span className={`text-sm font-bold leading-tight ${s.state === 'new' ? 'text-pra-ink-soft' : ''}`}>
              <span aria-hidden>· </span>{status}{s.state === 'done' ? ' ✓' : ''}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export function PackCard({ pack, rows, lang, late = false, done = false }) {
  const { t } = useT()
  const [subject] = splitClass(pack.class_key)
  const tone = subjectTone(subject)
  const title = lang === 'vn' ? pack.title_vn || pack.title : pack.title
  return (
    <Link to={`/p/${pack.slug}`}
      className={`card group flex items-center gap-3 p-4 transition hover:border-pra-blue sm:gap-4 sm:p-5 ${late ? 'border-[#D2452F]' : ''} ${done ? 'bg-white/70' : ''}`}>
      <div className="min-w-0 flex-1">
        <p className="mb-1 flex flex-wrap items-center gap-2">
          <span className="rounded-full px-3 py-0.5 text-sm font-extrabold text-white" style={{ background: tone }}>{subjectName(subject, lang)}</span>
          {late && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#B3321F] px-3 py-0.5 text-sm font-extrabold text-white">
              <AlertCircle className="h-4 w-4" strokeWidth={3} /> {t('late')}
            </span>
          )}
          {pack.due_on && !done && (
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-sm font-bold ${late ? 'bg-pra-coral-pale text-[#A8321F]' : 'bg-pra-sun-pale text-pra-sun-ink'}`}>
              <CalendarClock className="h-4 w-4" /> {t('due', { date: shortDate(pack.due_on, lang) })}
            </span>
          )}
        </p>
        <h3 className="mb-3 break-words text-xl font-extrabold leading-snug text-pra-ink sm:text-2xl">{title}</h3>
        <PartChips pack={pack} rows={rows} />
      </div>
      <ChevronRight className="h-7 w-7 shrink-0 text-pra-ink-soft group-hover:text-pra-blue" aria-hidden />
    </Link>
  )
}
