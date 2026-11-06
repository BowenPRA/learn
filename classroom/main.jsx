/* eslint-disable react-refresh/only-export-components -- the page's entry file: nothing imports it */
// PRA Learn's classroom page (/classroom/#/lesson/<course>/<slug>): Mr. Bowen's
// classroom decks exactly as he teaches them, with every slide, widget, reveal and the
// EN/FR switch. The deck player and the lessons under src/ and content/ are copied
// unchanged from BowenPRA/classroom by scripts/sync-classroom.mjs. This file is PRA
// Learn's own: it asks for a PRA Learn sign-in, opens only the lessons listed in
// src/data/classroomLessons.js, and sends the deck's Back (and Next on the last
// slide) to the PRA Learn home instead of the classroom's course page.
import { StrictMode, Suspense, lazy, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes, useParams } from 'react-router-dom'
import './deck.css'
import Deck from './src/components/Deck.jsx'
import { getCourse, getLesson } from './content/registry.js'
import { api } from '../src/lib/api.js'
import { CLASSROOM_LESSONS } from '../src/data/classroomLessons.js'

// Mr. Bowen's phone remote (the QR on a deck's "Phone remote" panel opens
// /classroom/#/remote/<room>). Its own chunk, as in the classroom.
const DeckRemote = lazy(() => import('./src/remote/DeckRemote.jsx'))

/** Back to PRA Learn's home page (a different page from this one). */
function ToLearn() {
  // ?demo comes back too, so a demo stays in demo mode.
  useEffect(() => { window.location.replace(import.meta.env.BASE_URL + window.location.search) }, [])
  return null
}

/** Only for someone signed in to PRA Learn (a student or staff, or demo mode). */
function SignedIn({ children }) {
  const [state, setState] = useState('checking')
  useEffect(() => {
    let alive = true
    api.session().then((s) => alive && setState(s ? 'in' : 'out')).catch(() => alive && setState('out'))
    return () => { alive = false }
  }, [])
  if (state === 'out') return <ToLearn />
  return state === 'in' ? children : null
}

function LessonView() {
  const { courseId, slug } = useParams()
  const listed = CLASSROOM_LESSONS.some((l) => l.course === courseId && l.slug === slug)
  const course = getCourse(courseId)
  const lesson = getLesson(courseId, slug)
  // The browser tab names the lesson: "Tides · PRA Learn".
  const title = listed && lesson ? lesson.title : ''
  useEffect(() => { if (title) document.title = `${title} · PRA Learn` }, [title])
  if (!listed || !course || !lesson) return <ToLearn />
  // The deck as it is, without the teacher's lesson plan button and the old Dashboard link.
  return <Deck key={`${courseId}/${slug}`} lesson={{ ...lesson, plan: null, dashboard: null }} course={course} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/lesson/:courseId/:slug" element={<SignedIn><LessonView /></SignedIn>} />
        <Route path="/remote" element={<Suspense fallback={null}><DeckRemote /></Suspense>} />
        <Route path="/remote/:room" element={<Suspense fallback={null}><DeckRemote /></Suspense>} />
        {/* The deck's Back goes to #/course/<id>: here that is PRA Learn's home. */}
        <Route path="*" element={<ToLearn />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
