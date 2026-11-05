import { useState } from 'react'
import { GraduationCap, KeyRound, Loader2, Mail, Lock, User, Users } from 'lucide-react'
import { DemoBand, LangSwitch, Logo, Notice } from '../components/ui.jsx'
import { DEMO, api } from '../lib/api.js'
import { useT } from '../lib/i18n.jsx'

// Two empty boxes for a child (username + PIN from the login card) or an email and
// password for staff. Never a list of names: anyone can open this page.
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
      className={`flex min-h-[64px] flex-1 items-center justify-center gap-2 rounded-2xl text-lg font-extrabold transition ${who === key ? 'bg-pra-blue text-white shadow-[0_4px_0_#0B4FBF]' : 'bg-white text-pra-ink-soft hover:text-pra-blue'}`}>
      <Icon className="h-6 w-6" strokeWidth={2.5} /> {label}
    </button>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <DemoBand />
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Logo />
        <LangSwitch />
      </div>
      <main className="flex flex-1 items-start justify-center px-4 pb-10 pt-4 sm:items-center">
        <div className="w-full max-w-md">
          <div className="mb-4 flex gap-2 rounded-3xl border-2 border-pra-line bg-pra-blue-pale p-2">
            {tab('student', GraduationCap, t('imStudent'))}
            {tab('teacher', Users, t('imTeacher'))}
          </div>

          <div className="card p-6 sm:p-8">
            {who === 'student' ? (
              <form onSubmit={submitStudent} className="space-y-5">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-base font-extrabold text-pra-ink"><User className="h-5 w-5 text-pra-blue" strokeWidth={2.5} /> {t('username')}</span>
                  <input className="field text-2xl" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username"
                    autoCapitalize="none" autoCorrect="off" spellCheck={false} placeholder="otter27" disabled={busy} />
                </label>
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-base font-extrabold text-pra-ink"><KeyRound className="h-5 w-5 text-pra-blue" strokeWidth={2.5} /> {t('pin')}</span>
                  <input className="field text-3xl tracking-[0.5em]" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    type="password" inputMode="numeric" pattern="[0-9]*" autoComplete="current-password" placeholder="••••" disabled={busy} />
                </label>
                <label className="flex min-h-[44px] cursor-pointer items-center gap-3 text-base font-bold text-pra-ink-soft">
                  <input type="checkbox" className="h-6 w-6 accent-pra-blue" checked={shared} onChange={(e) => setShared(e.target.checked)} />
                  {t('shared')}
                </label>
                {err && <Notice tone="bad">{err}</Notice>}
                <button className="btn-primary btn-big w-full" disabled={busy || !username.trim() || pin.length < 4}>
                  {busy ? <Loader2 className="h-6 w-6 animate-spin" /> : t('go')}
                </button>
                <p className="text-center text-sm font-semibold text-pra-ink-soft">{t('cardHint')}</p>
              </form>
            ) : (
              <form onSubmit={submitStaff} className="space-y-5">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-base font-extrabold text-pra-ink"><Mail className="h-5 w-5 text-pra-blue" strokeWidth={2.5} /> {t('email')}</span>
                  <input className="field" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" autoCapitalize="none" disabled={busy} />
                </label>
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-base font-extrabold text-pra-ink"><Lock className="h-5 w-5 text-pra-blue" strokeWidth={2.5} /> {t('password')}</span>
                  <input className="field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" disabled={busy} />
                </label>
                {err && <Notice tone="bad">{err}</Notice>}
                <button className="btn-primary btn-big w-full" disabled={busy || !email.trim() || !password}>
                  {busy ? <Loader2 className="h-6 w-6 animate-spin" /> : t('signIn')}
                </button>
              </form>
            )}
          </div>

          {DEMO && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button type="button" className="btn-green" onClick={() => api.signInAs('student')}><GraduationCap className="h-5 w-5" /> {t('tryStudent')}</button>
              <button type="button" className="btn-soft" onClick={() => api.signInAs('teacher')}><Users className="h-5 w-5" /> {t('tryTeacher')}</button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
