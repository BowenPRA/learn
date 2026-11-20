/* eslint-disable react-refresh/only-export-components -- the page's entry file: nothing imports it */
// PRA Learn's classroom page (/classroom/#/lesson/<course>/<slug>): Mr. Bowen's
// classroom decks exactly as he teaches them, with every slide, widget, reveal and the
// EN/FR switch. The deck player (src/) and the lessons (content/) came from
// BowenPRA/classroom on 10 Nov 2026 and are edited here now (README.md). This file
// opens only the lessons listed in src/data/classroomLessons.js, downloads one
// lesson's code at a time, and sends the deck's Back (and Next on the last slide) to
// the PRA Learn home instead of the classroom's course page. A deck needs no sign-in
// (Bowen, 20 Nov 2026: a link to his slides works for anyone); the games, the
// teacher's plan (#/plan/<course>/<slug>) and the plan's notes on the phone are for
// staff only, and the Phone remote button for anyone signed in.
import { StrictMode, Suspense, lazy, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import './deck.css'
import Deck from './src/components/Deck.jsx'
import { getCourse, hasLesson, loadLesson } from './content/registry.js'
import { useViewer } from './viewer.js'
import { CLASSROOM_GAMES, CLASSROOM_LESSONS } from '../src/data/classroomLessons.js'

// Mr. Bowen's phone remote (the QR on a deck's "Phone remote" panel opens
// /classroom/#/remote/<room>). Its own chunk, as in the classroom.
const DeckRemote = lazy(() => import('./src/remote/DeckRemote.jsx'))
// The teacher's plan: its own chunk, which a student never downloads.
const Plan = lazy(() => import('./src/pages/Plan.jsx'))
// Guess the Teacher's player screen (#/play/<room>, from the QR on the TV):
// open to anyone, since parents have no login. It holds no answers.
const TeacherGamePhone = lazy(() => import('./content/games/G06_guess-the-teacher/phone.jsx'))

/** Back to PRA Learn's home page (a different page from this one). */
function ToLearn() {
  // ?demo comes back too, so a demo stays in demo mode.
  useEffect(() => { window.location.replace(import.meta.env.BASE_URL + window.location.search) }, [])
  return null
}

/** While the sign-in check or the lesson's code is on its way, or when the download failed. */
function Waiting({ failed = false, onRetry }) {
  return (
    <div className="app-screen flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-950 font-sans text-slate-500 dark:text-slate-400 p-6 text-center">
      {failed ? (
        <>
          <p className="font-bold">The lesson did not load. Check the internet connection and try again.</p>
          <button onClick={onRetry} className="px-4 py-2 bg-[#1cb0f6] text-white rounded-xl font-black uppercase tracking-widest text-xs border-b-4 border-[#1899d6] active:border-b-0 active:translate-y-1 transition-all">
            Try again
          </button>
        </>
      ) : (
        <>
          <Loader2 className="w-10 h-10 animate-spin text-[#1cb0f6]" strokeWidth={2.5} />
          <p className="font-bold text-sm">Loading the lesson…</p>
        </>
      )}
    </div>
  )
}

/** A game from CLASSROOM_GAMES: staff only, because it holds its own answers. */
const isGame = (courseId, slug) => CLASSROOM_GAMES.some((g) => g.course === courseId && g.slug === slug)

/** In src/data/classroomLessons.js, with a course in courses.js and a folder in content/. */
const canOpen = (courseId, slug) =>
  (CLASSROOM_LESSONS.some((l) => l.course === courseId && l.slug === slug) || isGame(courseId, slug))
  && Boolean(getCourse(courseId)) && hasLesson(courseId, slug)

/** The lesson's code, downloaded once `enabled`: [{ lesson } | { failed: true } | null while loading, retry]. */
function useLesson(courseId, slug, enabled) {
  const [state, setState] = useState({ key: null, value: null })
  const [attempt, setAttempt] = useState(0)
  const key = `${courseId}/${slug}#${attempt}`
  useEffect(() => {
    if (!enabled) return undefined
    let alive = true
    loadLesson(courseId, slug).then(
      (lesson) => alive && setState({ key, value: { lesson } }),
      () => alive && setState({ key, value: { failed: true } }),
    )
    return () => { alive = false }
  }, [courseId, slug, enabled, key])
  return [state.key === key ? state.value : null, () => setAttempt((n) => n + 1)]
}

/** A deck, for anyone with the link: signed in or not (Bowen, 20 Nov 2026).
 *  A game opens for staff only; anyone else goes back to the PRA Learn home. */
function LessonView() {
  const { courseId, slug } = useParams()
  const viewer = useViewer()
  const game = isGame(courseId, slug)
  const ok = canOpen(courseId, slug) && (!game || viewer === 'checking' || viewer === 'staff')
  const [got, retry] = useLesson(courseId, slug, ok && viewer !== 'checking')
  // The browser tab names the lesson: "Tides · PRA Learn".
  const title = got?.lesson?.title || ''
  useEffect(() => { if (title) document.title = `${title} · PRA Learn` }, [title])
  if (!ok || (got && !got.failed && !got.lesson)) return <ToLearn />
  if (!got || got.failed) return <Waiting failed={Boolean(got?.failed)} onRetry={retry} />
  const { lesson } = got
  // A game that is its own page (Guess the Teacher): the whole window, none of the deck's bars.
  if (lesson.slides.length === 1 && lesson.slides[0].bare) return <BareGame slide={lesson.slides[0]} />
  // The deck as it is, never with the old Dashboard link. The teacher's plan (and
  // its button) only for staff: it holds the answers. The Phone remote button only
  // for someone signed in: a visitor with a shared link has no use for it.
  const plan = viewer === 'staff' ? lesson.plan : null
  return (
    <Deck
      key={`${courseId}/${slug}`}
      lesson={{ ...lesson, plan, dashboard: null }}
      course={getCourse(courseId)}
      remoteButton={viewer !== 'out'}
    />
  )
}

/** A one-slide game marked `bare`, filling the window, with its own Exit back to PRA Learn's home. */
function BareGame({ slide }) {
  const Widget = slide.widget
  // ?demo comes back too, so a demo stays in demo mode.
  const exit = () => window.location.assign(import.meta.env.BASE_URL + window.location.search)
  return (
    <div className="app-screen flex flex-col bg-[#160d4d]">
      <Widget lang="en" isDisplayMode onExit={exit} />
    </div>
  )
}

/** The teacher's plan, for staff only: anyone else goes to the PRA Learn home. */
function PlanView() {
  const { courseId, slug } = useParams()
  const navigate = useNavigate()
  const viewer = useViewer()
  const ok = canOpen(courseId, slug)
  const [got, retry] = useLesson(courseId, slug, ok && viewer === 'staff')
  const title = got?.lesson?.title || ''
  useEffect(() => { if (title) document.title = `${title}: teacher's plan · PRA Learn` }, [title])
  if (!ok || (viewer !== 'checking' && viewer !== 'staff') || (got && !got.failed && !got.lesson)) return <ToLearn />
  if (!got || got.failed) return <Waiting failed={Boolean(got?.failed)} onRetry={retry} />
  return (
    <Suspense fallback={<Waiting />}>
      <Plan lesson={got.lesson} course={getCourse(courseId)} onBack={() => navigate(`/lesson/${courseId}/${slug}`)} />
    </Suspense>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/lesson/:courseId/:slug" element={<LessonView />} />
        <Route path="/plan/:courseId/:slug" element={<PlanView />} />
        <Route path="/remote" element={<Suspense fallback={null}><DeckRemote /></Suspense>} />
        <Route path="/remote/:room" element={<Suspense fallback={null}><DeckRemote /></Suspense>} />
        <Route path="/play" element={<Suspense fallback={null}><TeacherGamePhone /></Suspense>} />
        <Route path="/play/:room" element={<Suspense fallback={null}><TeacherGamePhone /></Suspense>} />
        {/* The deck's Back goes to #/course/<id>: here that is PRA Learn's home. */}
        <Route path="*" element={<ToLearn />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
