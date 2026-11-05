import { createElement } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, BookOpen, Building2, Calculator, CheckCircle2, CircleDot, Eye, FlaskConical, Footprints, Globe2,
  GraduationCap, Languages, Lightbulb, Loader2, LogOut, Pencil, Scale, Sparkles, Star, Target, Thermometer, TrendingDown,
  TrendingUp, Users, X, Zap,
} from 'lucide-react'
import { useT } from '../lib/i18n.jsx'
import { DEMO, api } from '../lib/api.js'

// The lucide icons a slide may name in `icon`. A name not here draws Sparkles.
const ICONS = {
  ArrowLeft, ArrowRight, BookOpen, Building2, Calculator, CheckCircle2, CircleDot, Eye, FlaskConical, Footprints, Globe2,
  GraduationCap, Lightbulb, Pencil, Scale, Sparkles, Star, Target, Thermometer, TrendingDown, TrendingUp, Users, Zap,
}
/** A lucide icon by its name (a slide's `icon`). */
export function NamedIcon({ name, ...props }) {
  return createElement(ICONS[name] || Sparkles, props)
}

export function Logo({ small = false }) {
  return (
    <span className="flex items-center gap-2">
      <img src="/logo.png" alt="" className={small ? 'h-8 w-auto' : 'h-10 w-auto'} />
      <span className={`font-extrabold tracking-tight text-pra-blue-ink ${small ? 'text-base' : 'text-lg'}`}>PRA <span className="text-pra-green-deep">Learn</span></span>
    </span>
  )
}

export function LangSwitch() {
  const { lang, setLang } = useT()
  const opt = (code, label) => (
    <button type="button" onClick={() => setLang(code)} aria-pressed={lang === code}
      className={`min-h-[40px] min-w-[44px] rounded-xl px-3 text-sm font-extrabold transition ${lang === code ? 'bg-pra-blue text-white' : 'text-pra-ink-soft hover:text-pra-blue'}`}>
      {label}
    </button>
  )
  return (
    <div className="flex items-center gap-1 rounded-2xl border-2 border-pra-line bg-white p-1" role="group" aria-label="Language">
      <Languages className="ml-1 h-4 w-4 text-pra-ink-soft" aria-hidden />
      {opt('en', 'EN')}
      {opt('vn', 'VI')}
    </div>
  )
}

/** The bar at the top of the signed-in pages: logo (home), language, sign out. */
export function TopBar({ name, onSignOut, home = '/' }) {
  const { t } = useT()
  return (
    <header className="no-print sticky top-0 z-20 border-b-2 border-pra-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2">
        <Link to={home} className="mr-auto rounded-xl p-1" aria-label={t('home')}><Logo small /></Link>
        {name && <span className="hidden text-sm font-bold text-pra-ink-soft sm:inline">{name}</span>}
        <LangSwitch />
        {onSignOut && (
          <button type="button" onClick={onSignOut} className="btn-ghost" title={t('signOut')} aria-label={t('signOut')}>
            <LogOut className="h-5 w-5" /><span className="hidden md:inline">{t('signOut')}</span>
          </button>
        )}
      </div>
    </header>
  )
}

export function DemoBand() {
  const { t } = useT()
  if (!DEMO) return null
  return (
    <div className="no-print bg-pra-sun-pale px-4 py-1.5 text-center text-xs font-bold text-pra-sun-ink">
      {t('demoBand')}{' '}
      {api.reset && <button type="button" className="underline" onClick={() => { api.reset(); window.location.reload() }}>Reset</button>}
    </div>
  )
}

/** A progress ring: value 0 to 1, or null for "not started". */
export function Ring({ value, done = false, size = 56, tone = '#116DFF', children, label }) {
  const r = (size - 8) / 2
  const c = 2 * Math.PI * r
  const v = value == null ? 0 : Math.max(0, Math.min(1, value))
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }} role="img" aria-label={label}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E3EAF2" strokeWidth="6" />
        {v > 0 && <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={done ? '#2F7D14' : tone} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${v * c} ${c}`} />}
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">{children}</span>
    </span>
  )
}

export function Stars({ n, size = 'h-6 w-6', label }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={label}>
      {[1, 2, 3].map((i) => (
        <Star key={i} className={`${size} ${i <= n ? 'fill-pra-sun text-pra-sun-deep' : 'fill-pra-line text-pra-line'}`} strokeWidth={2} />
      ))}
    </span>
  )
}

export function Loading() {
  const { t } = useT()
  return (
    <div className="flex min-h-[50vh] items-center justify-center gap-3 text-pra-ink-soft" role="status">
      <Loader2 className="h-7 w-7 animate-spin" /> <span className="font-bold">{t('loading')}</span>
    </div>
  )
}

export function Notice({ tone = 'info', children }) {
  const cls = tone === 'bad' ? 'border-pra-coral bg-pra-coral-pale text-pra-coral-deep' : tone === 'ok' ? 'border-pra-green bg-pra-green-pale text-pra-green-dark' : 'border-pra-blue-tint bg-pra-blue-pale text-pra-blue-ink'
  return <div className={`rounded-2xl border-2 px-4 py-3 text-sm font-bold ${cls}`} role={tone === 'bad' ? 'alert' : 'status'}>{children}</div>
}

/** The close (X) button of a player, back to where the child came from. */
export function CloseButton({ to, label }) {
  return (
    <Link to={to} className="btn-ghost h-12 w-12 rounded-2xl border-2 border-pra-line bg-white p-0" aria-label={label} title={label}>
      <X className="h-6 w-6" strokeWidth={2.5} />
    </Link>
  )
}
