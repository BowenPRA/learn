import { useState } from 'react'
import { ArrowRight, BookOpen, GraduationCap, KeyRound, Loader2, Lock, Mail, Pencil, Star, User, Users } from 'lucide-react'
import { Backdrop, DemoBand, LangSwitch, Logo, Notice } from '../components/ui.jsx'
import Pip from '../components/Pip.jsx'
import { DEMO, api } from '../lib/api.js'
import { useT } from '../lib/i18n.jsx'

// Two empty boxes for a child (their name and secret code, as on the old Dashboard)
// or an email and password for staff. Never a list of names: anyone can open this page.
// Pip the otter waves from the left; on a phone Pip sits small beside the title so the
// boxes stay on the first screen.

/** A label above a box that has its icon inside, on the left (the old Dashboard's boxes). */
function Box({ icon: Icon, label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block pl-1 text-xs font-extrabold uppercase tracking-[0.14em] text-pra-ink-soft">{label}</span>
      <span className="group relative block">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400 transition group-focus-within:text-pra-blue" strokeWidth={2.5} aria-hidden />
        {children}
      </span>
    </label>
  )
}

function Feature({ icon: Icon, tone, children }) {
  return (
    <li className="flex flex-col items-start gap-2 rounded-2xl border-2 border-pra-line bg-white p-4 shadow-edge">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: `${tone}1F` }}>
        <Icon className="h-6 w-6" style={{ color: tone }} strokeWidth={2.6} />
      </span>
      <span className="text-base font-bold leading-snug text-pra-ink">{children}</span>
    </li>
  )
}

export default function SignIn() {
  const { t } = useT()
  const [who, setWho] = useState('student')
  const [username, setUsername] = useState('')
  const [pin, setPin] = useState('')
  const [shared, setShared] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const fail = (e, wrongKey) => setErr(t(e.code === 'wrong' ? wrongKey : e.code === 'notStudent' ? 'notStudent' : 'offline'))
  const submitStudent = async (e) => {
    e.preventDefault()
    setBusy(true); setErr('')
    try { await api.signInStudent(username, pin, shared) } catch (ex) { fail(ex, 'wrongStudent') } finally { setBusy(false) }
  }
  const submitStaff = async (e) => {
    e.preventDefault()
    setBusy(true); setErr('')
    try { await api.signInStaff(email, password) } catch (ex) { fail(ex, 'wrongStaff') } finally { setBusy(false) }
  }
  const tab = (key, Icon, label) => (
    <button type="button" onClick={() => { setWho(key); setErr('') }} aria-pressed={who === key}
      className={`flex min-h-[52px] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-2xl px-2 text-[15px] font-extrabold transition sm:gap-2 sm:px-3 sm:text-lg ${who === key ? 'bg-white text-pra-blue shadow-edge-blue' : 'text-pra-ink-soft hover:text-pra-blue'}`}>
      <Icon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" strokeWidth={2.5} /> {label}
    </button>
  )
  const go = (
    <span className="inline-flex items-center gap-2">{t('go')} <ArrowRight className="h-6 w-6" strokeWidth={3} /></span>
  )

  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-hidden">
      <Backdrop />
      <DemoBand />
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
        <Logo />
        <LangSwitch />
      </div>

      <main className="mx-auto grid w-full max-w-5xl flex-1 items-center gap-6 px-4 pb-10 pt-2 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pt-0">
        {/* Welcome: Pip, the name of the site and three things to do here */}
        <section className="min-w-0">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative">
              <Pip wave float size={112} className="lg:hidden" label={t('pipName')} />
              <Pip wave float size={190} className="hidden lg:inline-block" label={t('pipName')} />
            </div>
            <div className="min-w-0">
              <p className="mb-2 inline-block rounded-xl bg-pra-blue-pale px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-pra-blue">{t('welcomeTo')}</p>
              <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-pra-blue-ink sm:text-5xl lg:text-6xl">
                PRA <span className="text-pra-green-deep">Learn</span>
              </h1>
            </div>
          </div>
          <p className="mt-4 hidden max-w-lg text-lg font-semibold text-pra-ink-soft sm:block lg:text-xl">{t('heroLine')}</p>
          <ul className="mt-6 hidden max-w-xl grid-cols-3 gap-3 lg:grid">
            <Feature icon={BookOpen} tone="#116DFF">{t('featReview')}</Feature>
            <Feature icon={Pencil} tone="#2F7D14">{t('featPractice')}</Feature>
            <Feature icon={Star} tone="#F5A623">{t('featStars')}</Feature>
          </ul>
        </section>

        {/* The sign-in card */}
        <section className="w-full max-w-md justify-self-center lg:justify-self-end">
          <div className="card p-2">
            <div className="mb-2 flex gap-1.5 rounded-[1.25rem] bg-pra-blue-pale p-1.5">
              {tab('student', GraduationCap, t('imStudent'))}
              {tab('teacher', Users, t('imTeacher'))}
            </div>

            <div className="p-4 sm:p-6">
              {who === 'student' ? (
                <form onSubmit={submitStudent} className="space-y-5">
                  <Box icon={User} label={t('username')}>
                    <input className="field min-h-[60px] pl-14 text-2xl" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username"
                      autoCapitalize="none" autoCorrect="off" spellCheck={false} placeholder={t('namePlaceholder')} disabled={busy} />
                  </Box>
                  <Box icon={KeyRound} label={t('pin')}>
                    <input className="field min-h-[60px] pl-14 text-3xl tracking-[0.5em] placeholder:tracking-[0.5em]" value={pin}
                      onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      type="password" inputMode="numeric" pattern="[0-9]*" autoComplete="current-password" placeholder="000" disabled={busy} />
                  </Box>
                  <label className="flex min-h-[44px] cursor-pointer items-center gap-3 pl-1 text-base font-bold text-pra-ink-soft">
                    <input type="checkbox" className="h-6 w-6 accent-pra-blue" checked={shared} onChange={(e) => setShared(e.target.checked)} />
                    {t('shared')}
                  </label>
                  {err && <Notice tone="bad">{err}</Notice>}
                  <button className="btn-primary btn-big w-full text-xl" disabled={busy || !username.trim() || pin.length < 3}>
                    {busy ? <Loader2 className="h-6 w-6 animate-spin" /> : go}
                  </button>
                  <p className="text-center text-sm font-semibold text-pra-ink-soft">{t('cardHint')}</p>
                </form>
              ) : (
                <form onSubmit={submitStaff} className="space-y-5">
                  <Box icon={Mail} label={t('email')}>
                    <input className="field min-h-[56px] pl-14" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" autoCapitalize="none" disabled={busy} />
                  </Box>
                  <Box icon={Lock} label={t('password')}>
                    <input className="field min-h-[56px] pl-14" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" disabled={busy} />
                  </Box>
                  {err && <Notice tone="bad">{err}</Notice>}
                  <button className="btn-primary btn-big w-full" disabled={busy || !email.trim() || !password}>
                    {busy ? <Loader2 className="h-6 w-6 animate-spin" /> : t('signIn')}
                  </button>
                  <p className="text-center text-sm font-semibold text-pra-ink-soft">{t('staffHint')}</p>
                </form>
              )}
            </div>
          </div>

          {DEMO && (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button type="button" className="btn-green" onClick={() => api.signInAs('student')}><GraduationCap className="h-5 w-5" /> {t('tryStudent')}</button>
              <button type="button" className="btn-soft" onClick={() => api.signInAs('teacher')}><Users className="h-5 w-5" /> {t('tryTeacher')}</button>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
