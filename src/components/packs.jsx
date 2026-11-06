/* eslint-disable react-refresh/only-export-components */
import { Link } from 'react-router-dom'
import { AlertCircle, BookOpen, CalendarClock, Check, ChevronRight, Pencil, Play, Star } from 'lucide-react'
import { shortDate, useT } from '../lib/i18n.jsx'
import { partIds, partsOf, starsFor } from '../pack/model.js'
import { splitClass, subjectName, subjectTone } from '../data/subjects.js'
import { Ring, SubjectTile } from './ui.jsx'

/** How far a whole pack has got, 0 to 1 (answered items over all items; a done part counts in full). */
export function packFraction(content, rows) {
  let n = 0
  let total = 0
  for (const p of partsOf(content)) {
    const s = partState(content, p.id, rows?.[p.id])
    n += s.n
    total += s.total
  }
  return total ? n / total : 0
}

/** Stars a child has earned in a pack: { got, max } (3 per part, from first-try answers). */
export function packStars(content, rows) {
  const parts = partsOf(content)
  const got = parts.reduce((sum, p) => sum + starsFor(rows?.[p.id]?.best_score ?? rows?.[p.id]?.score, !!rows?.[p.id]?.done), 0)
  return { got, max: parts.length * 3 }
}

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
          ? 'border-pra-green-tint bg-pra-green-pale text-pra-green-dark'
          : s.state === 'started'
            ? 'border-pra-blue-tint bg-pra-blue-pale text-pra-blue-ink'
            : 'border-pra-line bg-pra-paper text-pra-ink'
        const status = s.state === 'done' ? t('done') : s.state === 'started' ? t('nOfTotal', { n: s.n, total: s.total }) : t('notStarted')
        return (
          <li key={p.id} className={`flex min-h-[38px] items-center gap-2 rounded-full border px-3 py-1 ${cls}`}>
            {s.state === 'done'
              ? <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pra-green-deep text-white"><Check className="h-3.5 w-3.5" strokeWidth={3.5} /></span>
              : <Icon className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />}
            <span className="text-sm font-extrabold leading-tight">{labels[p.id]}</span>
            <span className={`text-sm font-semibold leading-tight ${s.state === 'new' ? 'text-pra-ink-soft' : ''}`}>
              <span aria-hidden>· </span>{status}
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
  const frac = packFraction(pack.content, rows)
  const stars = packStars(pack.content, rows)
  return (
    <Link to={`/p/${pack.slug}`}
      className={`card card-link group relative flex items-center gap-3 overflow-hidden p-4 sm:gap-5 sm:p-5 ${late ? 'border-[#F2B8AC] ring-2 ring-[#F2B8AC]/60' : ''} ${done ? 'bg-white/80' : ''}`}>
      <span aria-hidden className="absolute inset-y-0 left-0 w-1.5" style={{ background: late ? '#D2452F' : tone }} />
      <SubjectTile subject={subject} tone={tone} size="hidden h-14 w-14 sm:inline-flex" />
      <div className="min-w-0 flex-1">
        <p className="mb-1 flex flex-wrap items-center gap-2">
          <span className="text-sm font-extrabold uppercase tracking-wide" style={{ color: tone }}>{subjectName(subject, lang)}</span>
          {late && (
            <span className="chip bg-[#B3321F] font-extrabold text-white">
              <AlertCircle className="h-4 w-4" strokeWidth={3} /> {t('late')}
            </span>
          )}
          {pack.due_on && !done && (
            <span className={`chip ${late ? 'bg-pra-coral-pale text-[#A8321F]' : 'bg-pra-sun-pale text-pra-sun-ink'}`}>
              <CalendarClock className="h-4 w-4" /> {t('due', { date: shortDate(pack.due_on, lang) })}
            </span>
          )}
          {done && stars.got > 0 && (
            <span className="chip bg-pra-sun-pale text-pra-sun-ink" aria-label={t('stars', { n: stars.got })}>
              <Star className="h-4 w-4 fill-pra-sun text-pra-sun-deep" /> {stars.got}/{stars.max}
            </span>
          )}
        </p>
        <h3 className="mb-3 break-words text-lg font-extrabold leading-snug text-pra-ink sm:text-xl">{title}</h3>
        <PartChips pack={pack} rows={rows} />
      </div>
      <Ring value={frac > 0 ? frac : null} done={done} size={56} tone={late ? '#D2452F' : tone} label={`${Math.round(frac * 100)}%`}>
        {done
          ? <Check className="h-6 w-6 text-pra-green-deep" strokeWidth={3.5} />
          : frac > 0
            ? <span className="text-xs font-extrabold text-pra-ink">{Math.round(frac * 100)}%</span>
            : <Play className="ml-0.5 h-5 w-5" style={{ color: late ? '#D2452F' : tone, fill: late ? '#D2452F' : tone }} aria-hidden />}
      </Ring>
      <ChevronRight className="hidden h-6 w-6 shrink-0 text-pra-ink-soft transition group-hover:translate-x-0.5 group-hover:text-pra-blue sm:block" aria-hidden />
    </Link>
  )
}
