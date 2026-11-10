import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, CalendarDays, CheckCircle2, ChevronRight, Coins, Gamepad2, Hourglass, LayoutGrid, Play, Presentation, Sparkles, Star, Trophy } from 'lucide-react'
import { Bar, CourseTile, Loading, Notice, SectionHead as Head, SubjectTile } from '../components/ui.jsx'
import { ClassroomLessonList, classroomLessonsFor, classroomLink, classroomTitle, newestPerClass } from '../components/ClassroomLessons.jsx'
import { totalXP, unitsFor, useUnitProgress } from '../components/UnitCards.jsx'
import { UNIT_XP, nextTaskOf, taskTitle, unitHref, unitKey, unitXP } from '../data/units.js'
import Pip from '../components/Pip.jsx'
import { PackCard, nextPart, packDone, packStars, partLabels, partPath, partState, todayIso, weekEndIso } from '../components/packs.jsx'
import { api } from '../lib/api.js'
import { useT } from '../lib/i18n.jsx'
import { useAuth } from '../lib/auth.jsx'
import { byPack, partsOf } from '../pack/model.js'
import { className, splitClass, subjectLook, subjectName, subjectTone } from '../data/subjects.js'

const WEEK = 7 * 86400000

const BLUE = { face: '#116DFF', edge: '#0B4FBF' }

/** A number and what it counts, on the XP card. */
function Stat({ icon: Icon, value, label, iconClass }) {
  return (
    <li className="flex items-center gap-2 rounded-2xl bg-pra-paper px-3 py-2">
      <Icon className={`h-5 w-5 shrink-0 ${iconClass}`} strokeWidth={2.5} aria-hidden />
      <span className="whitespace-nowrap text-sm font-bold text-pra-ink-soft"><span className="font-black tabular-nums text-pra-ink">{value}</span> {label}</span>
    </li>
  )
}

/** The one thing to do next: a banner in the subject's colour, one tap to start. */
function GoBanner({ to, href, look, eyebrow, title }) {
  const cls = 'group flex w-full items-center gap-4 rounded-3xl border-b-[6px] p-4 text-left text-white transition duration-100 hover:brightness-105 active:mb-1 active:translate-y-1 active:border-b-2 sm:p-5'
  const style = { background: look.face, borderColor: look.edge }
  const body = (
    <>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black/15 sm:h-14 sm:w-14">
        <Play className="h-6 w-6 fill-current" strokeWidth={2.5} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-extrabold uppercase tracking-wider text-white/90">{eyebrow}</span>
        <span className="mt-0.5 line-clamp-2 text-xl font-black leading-tight tracking-tight sm:text-2xl">{title}</span>
      </span>
      <ChevronRight className="h-7 w-7 shrink-0 transition group-hover:translate-x-1" strokeWidth={3} aria-hidden />
    </>
  )
  return to ? <Link to={to} className={cls} style={style}>{body}</Link> : <a href={href} className={cls} style={style}>{body}</a>
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
  const unitOpen = [...units].reverse().find((u) => !unitXP(u, unitProgress[unitKey(u)]).done)
  const unitNext = unitOpen && (nextTaskOf(unitOpen, unitProgress[unitKey(unitOpen)])?.task || unitOpen.tasks[0])
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
  // The courses: one card a course that has units, with the XP held across them.
  const courses = [...new Set(units.map((u) => u.track))].map((track) => {
    const list = units.filter((u) => u.track === track)
    const sums = list.map((u) => unitXP(u, unitProgress[unitKey(u)] || {}))
    return { track, classKey: list[0].classKey, teacher: list[0].teacher, n: list.length, xp: sums.reduce((n, x) => n + x.xp, 0), done: sums.filter((x) => x.done).length }
  })
  const maxXp = units.length * UNIT_XP
  const unitsDone = courses.reduce((n, c) => n + c.done, 0)
  const unitsBase = `${import.meta.env.BASE_URL}unit/${window.location.search}`

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:pt-8">
      {/* Who is here, and one line about what is waiting. */}
      <header className="mb-6 flex items-center gap-4" aria-labelledby="h-hello">
        <span className="flex h-16 w-16 shrink-0 items-start justify-center overflow-hidden rounded-2xl border-2 border-pra-line bg-white shadow-edge sm:h-20 sm:w-20">
          <Pip mood={mood} size={128} className="mt-1.5 sm:mt-2" label={t('pipName')} />
        </span>
        <div className="min-w-0">
          <p className="eyebrow">{greeting}</p>
          <h1 id="h-hello" className="page-title break-words">{me?.name || ''}!</h1>
          <p className="mt-0.5 font-semibold text-pra-ink-soft">{summary}</p>
        </div>
      </header>

      {/* Everything earned so far: the child's own, never compared with anyone. */}
      {(units.length > 0 || data.packs.length > 0) && (
        <section className="card mb-6 p-4 sm:p-6" aria-label={t('yourXP')}>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            {maxXp > 0 && (
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-b-4 border-pra-sun-deep bg-pra-sun">
                  <Trophy className="h-6 w-6 text-pra-sun-ink" strokeWidth={2.5} aria-hidden />
                </span>
                <div>
                  <p className="eyebrow">{t('yourXP')}</p>
                  <p className="text-3xl font-black tabular-nums leading-none text-pra-ink">{xpAll}<span className="text-lg text-slate-400"> / {maxXp}</span></p>
                </div>
              </div>
            )}
            <ul className="flex flex-wrap gap-2">
              {data.packs.length > 0 && <Stat icon={Star} value={stars} label={t('starsTotal')} iconClass="fill-pra-sun text-pra-sun-deep" />}
              {data.packs.length > 0 && <Stat icon={CheckCircle2} value={`${partsDone}/${partsAll}`} label={t('partsDone')} iconClass="text-pra-green-deep" />}
              {units.length > 0 && <Stat icon={Sparkles} value={`${unitsDone}/${units.length}`} label={t('unitsFinished')} iconClass="text-pra-sun-deep" />}
            </ul>
          </div>
          {maxXp > 0 && <Bar value={xpAll / maxXp} tone="#F5A623" className="mt-4 h-4" />}
        </section>
      )}

      {/* The one thing to do next. */}
      {(part || unitBtn || decks.length > 0) && (
        <div className={`mb-8 grid gap-3 ${decks.length > 1 ? 'sm:grid-cols-2' : ''}`}>
          {part && (
            <GoBanner to={partPath(first.slug, part)} look={BLUE}
              eyebrow={t(started ? 'continuePart' : 'startPart', { part: partName })} title={firstTitle} />
          )}
          {unitBtn && (
            <GoBanner href={unitHref(unitOpen, window.location.search, unitNext.id)} look={subjectLook(splitClass(unitOpen.classKey)[0])}
              eyebrow={t(unitProgress[unitKey(unitOpen)]?.[unitNext.id] ? 'continuePart' : 'startPart', { part: taskTitle(unitNext, lang) })}
              title={`${unitOpen.label} ${lang === 'vn' ? unitOpen.titleVn || unitOpen.title : unitOpen.title}`} />
          )}
          {decks.map((deck) => (
            <GoBanner key={`${deck.course}/${deck.slug}`} href={classroomLink(deck)} look={subjectLook(splitClass(deck.classKey)[0])}
              eyebrow={`${subjectName(splitClass(deck.classKey)[0], lang)} · ${deck.unit}${deck.teacher ? ` · ${deck.teacher}` : ''}`}
              title={t('openLesson', { title: classroomTitle(deck, lang) })} />
          ))}
        </div>
      )}

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

      {/* The courses, as on the Dashboard's menu: one card a course, then the Arcade. */}
      {courses.length > 0 && (
        <section className="mb-8" aria-labelledby="h-units">
          <Head id="h-units" icon={LayoutGrid} tone="#116DFF" hint={t('unitsHint')}>{t('myCourses')}</Head>
          <div className="grid gap-4 md:grid-cols-2">
            {courses.map((c) => {
              const [subject] = splitClass(c.classKey)
              const look = subjectLook(subject)
              const all = c.done === c.n
              return (
                <a key={c.track} href={`${unitsBase}#/${c.track}`} className="card card-link group flex flex-col gap-4 p-5 sm:p-6">
                  <span className="flex items-center gap-4">
                    <CourseTile subject={subject} look={look} size="h-14 w-14 sm:h-16 sm:w-16" icon="h-7 w-7 sm:h-8 sm:w-8" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-2xl font-black leading-tight tracking-tight text-pra-ink">{className(c.classKey, lang)}</span>
                      <span className="block truncate text-sm font-bold text-pra-ink-soft">{c.teacher ? `${c.teacher} · ` : ''}{c.n === 1 ? t('oneUnit') : t('nUnits', { n: c.n })}</span>
                    </span>
                    <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-b-4 border-pra-line bg-pra-paper text-slate-400 transition group-hover:border-pra-blue-deep group-hover:bg-pra-blue group-hover:text-white sm:flex">
                      <ChevronRight className="h-5 w-5" strokeWidth={3} aria-hidden />
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <Bar value={c.xp / (c.n * UNIT_XP)} tone={all ? '#F5A623' : look.face} className="h-3 flex-1" />
                    <span className="whitespace-nowrap text-xs font-black tabular-nums text-pra-ink">{c.xp}<span className="text-slate-400"> / {c.n * UNIT_XP} XP</span></span>
                    <span className="flex items-center gap-1 whitespace-nowrap text-xs font-black tabular-nums text-slate-400">
                      {all && <CheckCircle2 className="h-4 w-4 text-pra-sun-deep" strokeWidth={3} aria-hidden />}{t('nOfDone', { n: c.done, total: c.n })}
                    </span>
                  </span>
                </a>
              )
            })}
          </div>
          {/* The Arcade is a play zone, not a course: its own dark banner under the courses. */}
          <a href={`${unitsBase}#/arcade`}
            className="group relative mt-4 flex items-center gap-4 overflow-hidden rounded-3xl border-b-[6px] border-[#1e1b4b] bg-[#0b1022] p-4 text-white transition duration-100 hover:brightness-110 active:mb-1 active:translate-y-1 active:border-b-2 sm:gap-5 sm:p-6">
            <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-pra-sun" />
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-b-4 border-[#4B2FCF] bg-pra-violet sm:h-16 sm:w-16">
              <Gamepad2 className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2.5} aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-2xl font-black leading-tight tracking-tight">{t('arcade')}</span>
              <span className="block text-sm font-bold text-slate-300">{t('arcadeHint')}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1.5 rounded-xl border-b-[3px] border-pra-sun-deep bg-pra-sun px-3 py-1.5 text-sm font-black tabular-nums text-pra-sun-ink">
              <Coins className="h-4 w-4" strokeWidth={2.6} aria-hidden /> {xpAll} XP
            </span>
            <ChevronRight className="hidden h-6 w-6 shrink-0 text-white/70 transition group-hover:translate-x-1 sm:block" strokeWidth={3} aria-hidden />
          </a>
        </section>
      )}

      {fromClass.length > 0 && (
        <section className="mb-8" aria-labelledby="h-class">
          <Head id="h-class" icon={Presentation} tone="#2196E3" hint={t('classLessonsHint')}>{t('classLessons')}</Head>
          
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
