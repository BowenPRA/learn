import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, ArrowRight, CalendarDays, CheckCircle2, ChevronRight, Hourglass, Presentation, Sparkles, Star, Trophy, Zap } from 'lucide-react'
import { Loading, Notice, SubjectTile } from '../components/ui.jsx'
import { ClassroomLessonList, classroomLessonsFor, classroomLink, classroomTitle, newestPerClass } from '../components/ClassroomLessons.jsx'
import { UnitList, totalXP, unitsFor, useUnitProgress } from '../components/UnitCards.jsx'
import { UNIT_PARTS, nextPartOf, unitHref, unitKey, unitXP } from '../data/units.js'
import Pip from '../components/Pip.jsx'
import { PackCard, nextPart, packDone, packStars, partLabels, partPath, partState, todayIso, weekEndIso } from '../components/packs.jsx'
import { api } from '../lib/api.js'
import { useT } from '../lib/i18n.jsx'
import { useAuth } from '../lib/auth.jsx'
import { byPack, partsOf } from '../pack/model.js'
import { splitClass, subjectName, subjectTone } from '../data/subjects.js'

const WEEK = 7 * 86400000

/** A section heading with a coloured icon badge. */
function Head({ id, icon: Icon, tone, children }) {
  return (
    <h2 id={id} className="mb-3 flex items-center gap-2.5 text-xl font-extrabold text-pra-ink">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${tone}1A` }}>
        <Icon className="h-5 w-5" style={{ color: tone }} strokeWidth={2.6} aria-hidden />
      </span>
      {children}
    </h2>
  )
}

/** A small see-through tile on the blue welcome card: a number and what it counts. */
function Stat({ icon: Icon, value, label, iconClass }) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl bg-white/15 px-3.5 py-2.5 ring-1 ring-inset ring-white/25 backdrop-blur">
      <Icon className={`h-6 w-6 ${iconClass}`} strokeWidth={2.4} aria-hidden />
      <span className="leading-tight">
        <span className="block text-xl font-black text-white">{value}</span>
        <span className="block text-xs font-bold uppercase tracking-wide text-white/80">{label}</span>
      </span>
    </div>
  )
}

export default function StudentHome() {
  const { t, lang } = useT()
  const { me } = useAuth()
  const [data, setData] = useState(null)
  const [err, setErr] = useState('')
  const unitProgress = useUnitProgress()
  useEffect(() => {
    api.myPacks().then((d) => setData({ ...d, now: Date.now() })).catch((e) => setErr(e.code === 'offline' ? t('offline') : e.message))
  }, [t])
  if (err) return <div className="mx-auto max-w-3xl p-4"><Notice tone="bad">{err}</Notice></div>
  if (!data || !unitProgress) return <Loading />

  const rows = byPack(data.progress)
  // Late (due before today, not finished) first, then due in the next 7 days, then the rest;
  // finished packs go to Done. Worked out from today's date in this browser.
  const today = todayIso(new Date(data.now))
  const sunday = weekEndIso(new Date(data.now))
  const byDue = (a, b) => String(a.due_on || '9999').localeCompare(String(b.due_on || '9999'))
  const done = data.packs.filter((p) => packDone(p.content, rows[p.id]))
  const open = data.packs.filter((p) => !done.includes(p)).sort(byDue)
  const late = open.filter((p) => p.due_on && p.due_on < today)
  const week = open.filter((p) => !late.includes(p) && (p.due_on ? p.due_on <= sunday : data.now - Date.parse(p.published_at || 0) < WEEK))
  const later = open.filter((p) => !late.includes(p) && !week.includes(p))
  // The classroom decks for this year group, newest first (src/data/classroomLessons.js).
  const fromClass = classroomLessonsFor(me)
  // The units for this year group, newest first (src/data/units.js), and the XP in them.
  const units = unitsFor(me)
  const xpAll = totalXP(units, unitProgress)
  const unitOpen = [...units].reverse().find((u) => !unitXP(unitProgress[unitKey(u)]).done)
  const unitNext = unitOpen && (nextPartOf(unitProgress[unitKey(unitOpen)]) || UNIT_PARTS[0])
  const classes = [...new Set([...data.packs.map((p) => p.class_key), ...units.map((u) => u.classKey), ...newestPerClass(fromClass).map((l) => l.classKey)])]
  const teacherOf = (k) => data.packs.find((p) => p.class_key === k)?.content?.teacher || units.find((u) => u.classKey === k)?.teacher || fromClass.find((l) => l.classKey === k)?.teacher
  const list = (packs, opts = {}) => (
    <div className="space-y-3">{packs.map((p) => <PackCard key={p.id} pack={p} rows={rows[p.id]} lang={lang} {...opts} />)}</div>
  )

  // The welcome card: a greeting for the time of day, one line about what is waiting,
  // the stars and parts so far (the child's own, never compared), and ONE big button:
  // the next part of the most urgent lesson.
  const hour = new Date(data.now).getHours()
  const greeting = t(hour < 12 ? 'goodMorning' : hour < 18 ? 'goodAfternoon' : 'goodEvening')
  const summary = late.length
    ? t(late.length === 1 ? 'heroLate1' : 'heroLateN', { n: late.length })
    : week.length
      ? t(week.length === 1 ? 'heroWeek1' : 'heroWeekN', { n: week.length })
      : open.length ? t('heroLater') : unitOpen ? t('heroUnit') : data.packs.length ? t('allCaughtUp') : fromClass.length ? t('heroClass') : t('nothingYet')
  const stars = data.packs.reduce((sum, p) => sum + packStars(p.content, rows[p.id]).got, 0)
  const partsAll = data.packs.reduce((sum, p) => sum + partsOf(p.content).length, 0)
  const partsDone = data.packs.reduce((sum, p) => sum + partsOf(p.content).filter((x) => rows[p.id]?.[x.id]?.done).length, 0)
  const first = [...late, ...week, ...later][0]
  const part = first && nextPart(first.content, rows[first.id])
  const started = part && partState(first.content, part.id, rows[first.id]?.[part.id]).state === 'started'
  const partName = part && partLabels(first.content, t)[part.id]
  const firstTitle = first && (lang === 'vn' ? first.title_vn || first.title : first.title)
  const mood = late.length ? 'surprised' : !data.packs.length && !fromClass.length && !units.length ? 'calm' : 'happy'
  // With nothing to do in a pack, the big button opens the next part of the oldest
  // unfinished unit; with no unit either, the newest lesson from class. A year group
  // with lessons in two subjects gets one button per subject (Maths, then Science),
  // each opening that subject's newest lesson: the list has no dates, so which of the
  // two was taught last cannot be told, and the child picks the one they just had.
  const unitBtn = !part && unitOpen
  const decks = !part && !unitBtn ? newestPerClass(fromClass) : []

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-6">
      <section className="relative isolate mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-pra-blue via-[#1A6FE8] to-pra-navy p-6 text-white shadow-hero sm:p-8" aria-labelledby="h-hello">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-10 -top-24 h-72 w-72 rounded-full bg-pra-sky/40 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-pra-lime/25 blur-3xl" />
          <div className="frond absolute -bottom-16 -left-10 h-64 w-64 bg-white/10" />
        </div>
        <Pip wave mood={mood} size={92} className="absolute right-3 top-4 sm:hidden" label={t('pipName')} />
        <div className="flex items-end gap-4 sm:gap-6">
          <div className="min-w-0 flex-1">
            <p className="pr-20 text-sm font-extrabold uppercase tracking-[0.16em] text-white/80 sm:pr-0">{greeting}</p>
            <h1 id="h-hello" className="mt-1 break-words pr-20 text-3xl font-black leading-tight sm:pr-0 sm:text-5xl">{me?.name || ''}!</h1>
            <p className="mt-2 max-w-xl pr-16 text-base font-semibold text-white/90 sm:pr-0 sm:text-lg">{summary}</p>
            {(stars > 0 || partsDone > 0 || xpAll > 0) && (
              <div className="mt-4 flex flex-wrap gap-2.5">
                {xpAll > 0 && <Stat icon={Zap} value={xpAll} label="XP" iconClass="fill-pra-sun text-pra-sun" />}
                <Stat icon={Star} value={stars} label={t('starsTotal')} iconClass="fill-pra-sun text-pra-sun" />
                <Stat icon={CheckCircle2} value={`${partsDone}/${partsAll}`} label={t('partsDone')} iconClass="text-pra-lime" />
              </div>
            )}
          </div>
          <Pip wave float mood={mood} size={150} className="-mb-2 hidden sm:inline-block lg:hidden" label={t('pipName')} />
          <Pip wave float mood={mood} size={200} className="-mb-3 mr-4 hidden lg:inline-block" label={t('pipName')} />
        </div>
        {part && (
          <Link to={partPath(first.slug, part)} className="btn-white btn-big mt-5 w-full justify-between gap-3 text-left sm:w-auto sm:min-w-[22rem]">
            <span className="min-w-0">
              <span className="block truncate text-lg font-extrabold">{t(started ? 'continuePart' : 'startPart', { part: partName })}</span>
              <span className="block truncate text-sm font-semibold text-pra-ink-soft">{firstTitle}</span>
            </span>
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pra-blue text-white">
              <ArrowRight className="h-6 w-6" strokeWidth={3} />
            </span>
          </Link>
        )}
        {unitBtn && (
          <a href={unitHref(unitOpen, window.location.search, unitNext.id)} className="btn-white btn-big mt-5 w-full justify-between gap-3 text-left sm:w-auto sm:min-w-[22rem]">
            <span className="min-w-0">
              <span className="block truncate text-lg font-extrabold">{t(unitProgress[unitKey(unitOpen)]?.[unitNext.id] ? 'continuePart' : 'startPart', { part: lang === 'vn' ? unitNext.titleVn : unitNext.title })}</span>
              <span className="block truncate text-sm font-semibold text-pra-ink-soft">{unitOpen.label} {lang === 'vn' ? unitOpen.titleVn || unitOpen.title : unitOpen.title}</span>
            </span>
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pra-blue text-white">
              <ArrowRight className="h-6 w-6" strokeWidth={3} />
            </span>
          </a>
        )}
        {decks.length > 0 && (
          <div className={decks.length > 1 ? 'mt-5 grid gap-3 sm:grid-cols-2' : ''}>
            {decks.map((deck) => (
              <a key={`${deck.course}/${deck.slug}`} href={classroomLink(deck)}
                className={`btn-white btn-big w-full justify-between gap-3 text-left ${decks.length > 1 ? 'min-w-0 px-5' : 'mt-5 sm:w-auto sm:min-w-[22rem]'}`}>
                <span className="min-w-0">
                  <span className="block truncate text-lg font-extrabold">{t('openLesson', { title: classroomTitle(deck, lang) })}</span>
                  <span className="block truncate text-sm font-semibold text-pra-ink-soft">{subjectName(splitClass(deck.classKey)[0], lang)} · {deck.unit}{deck.teacher ? ` · ${deck.teacher}` : ''}</span>
                </span>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pra-blue text-white">
                  <Presentation className="h-5 w-5" strokeWidth={2.6} />
                </span>
              </a>
            ))}
          </div>
        )}
      </section>

      {late.length > 0 && (
        <section className="mb-8" aria-labelledby="h-late">
          <Head id="h-late" icon={AlertCircle} tone="#D2452F"><span className="text-[#A8321F]">{t('lateHead')}</span></Head>
          {list(late, { late: true })}
        </section>
      )}

      {(week.length > 0 || (!open.length && !done.length && !fromClass.length && !units.length)) && (
        <section className="mb-8" aria-labelledby="h-week">
          <Head id="h-week" icon={CalendarDays} tone="#116DFF">{t('thisWeek')}</Head>
          {week.length ? list(week) : (
            <div className="card flex items-center gap-4 p-6">
              <Pip mood="calm" size={84} />
              <p className="text-lg font-semibold text-pra-ink-soft">{t('nothingYet')}</p>
            </div>
          )}
        </section>
      )}

      {units.length > 0 && (
        <section className="mb-8" aria-labelledby="h-units">
          <Head id="h-units" icon={Sparkles} tone="#F5A623">{t('units')}</Head>
          <p className="-mt-1 mb-3 font-semibold text-pra-ink-soft">{t('unitsHint')}</p>
          <UnitList units={units} progress={unitProgress} lang={lang} />
        </section>
      )}

      {fromClass.length > 0 && (
        <section className="mb-8" aria-labelledby="h-class">
          <Head id="h-class" icon={Presentation} tone="#2196E3">{t('classLessons')}</Head>
          <p className="-mt-1 mb-3 font-semibold text-pra-ink-soft">{t('classLessonsHint')}</p>
          <ClassroomLessonList lessons={fromClass} lang={lang} />
        </section>
      )}

      {later.length > 0 && (
        <section className="mb-8" aria-labelledby="h-later">
          <Head id="h-later" icon={Hourglass} tone="#7C5CFF">{t('comingUp')}</Head>
          {list(later)}
        </section>
      )}

      {done.length > 0 && (
        <section className="mb-8" aria-labelledby="h-done">
          <Head id="h-done" icon={CheckCircle2} tone="#2F7D14"><span className="text-pra-green-dark">{t('doneList')}</span></Head>
          {list(done, { done: true })}
        </section>
      )}

      {classes.length > 0 && (
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="card p-5">
            <h2 className="mb-3 text-lg font-extrabold text-pra-ink">{t('myClasses')}</h2>
            <ul className="space-y-2">
              {classes.map((k) => {
                const [s, yg] = splitClass(k)
                const teacher = teacherOf(k)
                return (
                  <li key={k} className="flex items-center gap-3">
                    <SubjectTile subject={s} tone={subjectTone(s)} size="h-10 w-10" icon="h-5 w-5" />
                    <span className="min-w-0">
                      <span className="block font-extrabold text-pra-ink">{subjectName(s, lang)} <span className="font-bold text-pra-ink-soft">· {yg}</span></span>
                      {teacher && <span className="block text-sm font-semibold text-pra-ink-soft">{teacher}</span>}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
          <Link to="/me" className="card card-link group flex items-center gap-4 p-5">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-pra-sun-pale"><Trophy className="h-8 w-8 text-pra-sun-deep" /></span>
            <span className="min-w-0">
              <span className="block text-lg font-extrabold text-pra-ink">{t('myResults')}</span>
              {stars > 0 && <span className="flex items-center gap-1 text-sm font-bold text-pra-sun-ink"><Star className="h-4 w-4 fill-pra-sun text-pra-sun-deep" /> {stars} {t('starsTotal')}</span>}
            </span>
            <ChevronRight className="ml-auto h-6 w-6 text-pra-ink-soft transition group-hover:translate-x-0.5 group-hover:text-pra-blue" />
          </Link>
        </section>
      )}
    </main>
  )
}
