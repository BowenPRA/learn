/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react'
import { Check, ChevronRight, Sparkles } from 'lucide-react'
import { SubjectTile } from './ui.jsx'
import { DEMO } from '../lib/api.js'
import { loadAllUnits } from '../lib/unitProgress.js'
import { UNITS, UNIT_PARTS, nextPartOf, unitHref, unitKey, unitXP } from '../data/units.js'
import { className, splitClass, subjectName, subjectTone } from '../data/subjects.js'

const norm = (s) => String(s || '').trim().replace(/\s+/g, ' ').toLowerCase()

/** The units someone sees, newest first: a student, their year group's; staff and the demo, all. */
export function unitsFor(me) {
  const list = !DEMO && me?.kind === 'student'
    ? UNITS.filter((u) => norm(splitClass(u.classKey)[1]) === norm(me.year_group))
    : UNITS
  return [...list].reverse()
}

/** Every unit's progress for the signed-in student ({} for staff, or before units are set up). */
export function useUnitProgress(enabled = true) {
  const [all, setAll] = useState(null)
  useEffect(() => {
    if (!enabled) return undefined
    let alive = true
    loadAllUnits().then((a) => alive && setAll(a)).catch(() => alive && setAll({}))
    return () => { alive = false }
  }, [enabled])
  return enabled ? all : {}
}

/** The XP ring: core XP out of 100, green once the unit is finished. */
function XPRing({ xp, done, tone }) {
  const r = 22
  const c = 2 * Math.PI * r
  return (
    <span className="relative inline-flex h-14 w-14 shrink-0 items-center justify-center" aria-label={`${xp} / 100 XP`}>
      <svg viewBox="0 0 56 56" className="absolute inset-0 h-14 w-14" aria-hidden>
        <circle cx="28" cy="28" r={r} fill="none" strokeWidth="5" stroke="#E3EAF2" />
        <circle cx="28" cy="28" r={r} fill="none" strokeWidth="5" strokeLinecap="round" stroke={done ? '#2F7D14' : tone}
          strokeDasharray={`${(Math.min(xp, 100) / 100) * c} ${c}`} transform="rotate(-90 28 28)" />
      </svg>
      {done ? <Check className="h-6 w-6 text-pra-green-deep" strokeWidth={3.5} /> : <span className="text-sm font-black text-pra-ink">{xp}</span>}
    </span>
  )
}

/** One unit: its XP, the parts done, what is up next. Opens the unit page (unit/index.html). */
function UnitCard({ unit, records, lang, showClass }) {
  const [subject] = splitClass(unit.classKey)
  const tone = subjectTone(subject)
  const sum = unitXP(records)
  const next = nextPartOf(records)
  const title = lang === 'vn' ? unit.titleVn || unit.title : unit.title
  const partName = (p) => (lang === 'vn' ? p.titleVn : p.title)
  return (
    <a href={unitHref(unit, window.location.search)}
      className="card card-link group relative flex items-center gap-3 overflow-hidden p-4 sm:gap-5 sm:p-5">
      <span aria-hidden className="absolute inset-y-0 left-0 w-1.5" style={{ background: tone }} />
      <SubjectTile subject={subject} tone={tone} size="hidden h-14 w-14 sm:inline-flex" />
      <div className="min-w-0 flex-1">
        <p className="mb-1 flex flex-wrap items-center gap-2">
          <span className="text-sm font-extrabold uppercase tracking-wide" style={{ color: tone }}>
            {showClass ? className(unit.classKey, lang) : subjectName(subject, lang)}
          </span>
          <span className="chip bg-pra-paper font-extrabold text-pra-ink-soft ring-1 ring-inset ring-pra-line">{unit.label}</span>
          {sum.bonus > 0 && <span className="chip bg-pra-sun-pale text-pra-sun-ink"><Sparkles className="h-4 w-4" /> +{sum.bonus}</span>}
        </p>
        <h3 className="break-words text-lg font-extrabold leading-snug text-pra-ink sm:text-xl">{title}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {UNIT_PARTS.map((p) => {
            const r = records?.[p.id]
            const state = r?.runs ? 'done' : r ? 'started' : 'new'
            return (
              <span key={p.id} title={partName(p)}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-extrabold ${state === 'done' ? 'bg-pra-green-pale text-pra-green-dark' : state === 'started' ? 'bg-pra-blue-pale text-pra-blue-deep' : next?.id === p.id ? 'bg-white text-pra-blue ring-2 ring-inset ring-pra-blue' : 'bg-pra-paper text-pra-ink-soft'}`}>
                {state === 'done' && <Check className="h-3.5 w-3.5" strokeWidth={3.5} />}{partName(p)}
              </span>
            )
          })}
        </div>
      </div>
      <XPRing xp={sum.xp} done={sum.done} tone={tone} />
      <ChevronRight className="hidden h-6 w-6 shrink-0 text-pra-ink-soft transition group-hover:translate-x-0.5 group-hover:text-pra-blue sm:block" aria-hidden />
    </a>
  )
}

/** The units as cards, under a heading the page supplies. `progress` = loadAllUnits()'s result. */
export function UnitList({ units, progress, lang, showClass = false }) {
  return (
    <div className="space-y-3">
      {units.map((u) => <UnitCard key={unitKey(u)} unit={u} records={progress?.[unitKey(u)] || {}} lang={lang} showClass={showClass} />)}
    </div>
  )
}

/** XP across all of someone's units (core + bonus). */
export const totalXP = (units, progress) => units.reduce((s, u) => s + unitXP(progress?.[unitKey(u)] || {}).total, 0)
