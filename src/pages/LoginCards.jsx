import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Printer } from 'lucide-react'
import { Notice } from '../components/ui.jsx'
import { CARDS_KEY } from '../lib/cards.js'
import { useT } from '../lib/i18n.jsx'
import { className } from '../data/subjects.js'

// The login cards for the logins just made or reset: name, username, PIN and the
// address. The PINs exist only here, once; "Done" forgets them.
export default function LoginCards() {
  const { classKey: raw } = useParams()
  const classKey = decodeURIComponent(raw)
  const { t, lang } = useT()
  const navigate = useNavigate()
  const [cards] = useState(() => {
    try {
      const got = JSON.parse(sessionStorage.getItem(CARDS_KEY) || 'null')
      return got?.class_key === classKey ? got.cards || [] : []
    } catch { return [] }
  })
  const back = `/t/${encodeURIComponent(classKey)}`
  const done = () => { try { sessionStorage.removeItem(CARDS_KEY) } catch { /* ignore */ } navigate(back) }

  return (
    <main className="print-sheet mx-auto max-w-5xl px-4 pb-16 pt-6">
      <div className="no-print mb-6">
        <Link to={back} className="btn-ghost -ml-3 mb-2"><ArrowLeft className="h-5 w-5" /> {className(classKey, lang)}</Link>
        <h1 className="mb-2 text-3xl font-extrabold text-pra-ink">{t('cardsTitle')}</h1>
        {cards.length ? <Notice>{t('cardsNote')}</Notice> : <Notice tone="bad">{t('cardsEmpty')}</Notice>}
        {cards.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" className="btn-primary" onClick={() => window.print()}><Printer className="h-5 w-5" /> {t('print')}</button>
            <button type="button" className="btn-soft" onClick={done}><Check className="h-5 w-5" /> {t('done')}</button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <div key={c.student_id} className="login-card rounded-3xl border-2 border-dashed border-pra-ink-soft bg-white p-5">
            <div className="mb-3 flex items-center gap-2">
              <img src="/logo.png" alt="" className="h-8 w-auto" />
              <span className="font-extrabold text-pra-blue-ink">PRA <span className="text-pra-green-deep">Learn</span></span>
              <span className="ml-auto text-sm font-bold text-pra-ink-soft">{className(classKey, 'en')}</span>
            </div>
            <p className="mb-3 text-2xl font-extrabold text-pra-ink">{c.name}</p>
            <dl className="grid grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-2">
              <dt className="text-sm font-bold text-pra-ink-soft">Username · Tên đăng nhập</dt>
              <dd className="font-mono text-2xl font-extrabold tracking-wide text-pra-blue-ink">{c.username}</dd>
              <dt className="text-sm font-bold text-pra-ink-soft">PIN · Mã PIN</dt>
              <dd className="font-mono text-3xl font-extrabold tracking-[0.3em] text-pra-ink">{c.pin}</dd>
            </dl>
            <p className="mt-3 border-t-2 border-pra-line pt-2 text-sm font-bold text-pra-ink-soft">{t('goTo')}: <span className="text-pra-blue">learn.pra.edu.vn</span></p>
          </div>
        ))}
      </div>
    </main>
  )
}
