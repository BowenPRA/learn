import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './lib/auth.jsx'
import { LangProvider, useT } from './lib/i18n.jsx'
import { DemoBand, Loading, Notice, TopBar } from './components/ui.jsx'
import SignIn from './pages/SignIn.jsx'
import StudentHome from './pages/StudentHome.jsx'
import PackPage from './pages/PackPage.jsx'
import ReviewPlayer from './pages/ReviewPlayer.jsx'
import PracticePlayer from './pages/PracticePlayer.jsx'
import MyResults from './pages/MyResults.jsx'
import TeacherHome from './pages/TeacherHome.jsx'
import ClassView from './pages/ClassView.jsx'
import LoginCards from './pages/LoginCards.jsx'

// Hash routes (/#/...): GitHub Pages has no server rewrites.
//   /                      sign-in, or the student's home, or the teacher's classes
//   /p/:slug               a lesson (review + practice)
//   /p/:slug/review        the guided review
//   /p/:slug/practice      step-by-step practice
//   /me                    a student's results
//   /t/:classKey           a class page (staff)
//   /t/:classKey/cards     login cards to print (staff)

function Shell({ children, players = false }) {
  const { me, signOut } = useAuth()
  if (players) return <><DemoBand />{children}</>
  return (
    <>
      <DemoBand />
      <TopBar name={me?.name} onSignOut={signOut} />
      {children}
    </>
  )
}

function Routed() {
  const { loading, session, me, error, signOut } = useAuth()
  const { t } = useT()
  const location = useLocation()
  const player = /^\/p\/[^/]+\/(review|practice)/.test(location.pathname)
  if (loading) return <Loading />
  if (!session) return <SignIn />
  if (error || !me || me.kind === 'none') {
    return (
      <Shell>
        <div className="mx-auto max-w-xl p-6">
          <Notice tone="bad">{error ? t(error === 'offline' ? 'offline' : 'failed', { msg: error }) : t('notStaff')}</Notice>
          <button type="button" className="btn-soft mt-4" onClick={signOut}>{t('signOut')}</button>
        </div>
      </Shell>
    )
  }
  const student = me.kind === 'student'
  return (
    <Shell players={player}>
      <Routes>
        <Route path="/" element={student ? <StudentHome /> : <TeacherHome />} />
        <Route path="/p/:slug" element={<PackPage />} />
        <Route path="/p/:slug/review" element={<ReviewPlayer />} />
        <Route path="/p/:slug/practice" element={<PracticePlayer />} />
        <Route path="/me" element={student ? <MyResults /> : <Navigate to="/" replace />} />
        <Route path="/t/:classKey" element={student ? <Navigate to="/" replace /> : <ClassView />} />
        <Route path="/t/:classKey/cards" element={student ? <Navigate to="/" replace /> : <LoginCards />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Shell>
  )
}

export default function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <HashRouter>
          <Routed />
        </HashRouter>
      </AuthProvider>
    </LangProvider>
  )
}
