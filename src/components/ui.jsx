import { createElement } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, BookOpen, Building2, Calculator, CheckCircle2, CircleDot, Eye, FlaskConical, Footprints, Globe2,
  GraduationCap, Languages, Lightbulb, Loader2, LogOut, Pencil, Scale, Sparkles, Star, Target, Thermometer, TrendingDown,
  TrendingUp, Users, X, Zap,
} from 'lucide-react'
// The icons the classroom decks use most (README "icon"), so a converted deck keeps its icons.
import {
  AlertTriangle, ArrowLeftRight, Atom, Beaker, Box, Boxes, Circle, Coffee, Coins, Divide, Droplet, Droplets, Equal, Flame, Gauge, Globe, Grid3x3, Hammer, Hand, HelpCircle, Home, Layers, LayoutGrid, Leaf, ListChecks, MapPin, MessageSquare, Microscope, Minus, Move, PenLine, Plus, Repeat, RotateCcw, Ruler, ScanEye, Search, ShieldCheck, Sigma, Snowflake, Square, Sun, Table, Telescope, Timer, Triangle, Trophy, Waves, Wind,
} from 'lucide-react'
import { useT } from '../lib/i18n.jsx'
import { DEMO, api } from '../lib/api.js'

// The lucide icons a slide may name in `icon`. A name not here draws Sparkles.
const ICONS = {
  ArrowLeft, ArrowRight, BookOpen, Building2, Calculator, CheckCircle2, CircleDot, Eye, FlaskConical, Footprints, Globe2,
  GraduationCap, Lightbulb, Pencil, Scale, Sparkles, Star, Target, Thermometer, TrendingDown, TrendingUp, Users, Zap,
  AlertTriangle, ArrowLeftRight, Atom, Beaker, Box, Boxes, Circle, Coffee, Coins, Divide, Droplet, Droplets, Equal, Flame, Gauge, Globe, Grid3x3, Hammer, Hand, HelpCircle, Home, Layers, LayoutGrid, Leaf, ListChecks, MapPin, MessageSquare, Microscope, Minus, Move, PenLine, Plus, Repeat, RotateCcw, Ruler, ScanEye, Search, ShieldCheck, Sigma, Snowflake, Square, Sun, Table, Telescope, Timer, Triangle, Trophy, Waves, Wind,
}
/** A lucide icon by its name (a slide's `icon`). */
export function NamedIcon({ name, ...props }) {
  return createElement(ICONS[name] || Sparkles, props)
}

export function Logo({ small = false }) {
  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      <img src="/logo.png" alt="" className={small ? 'h-7 w-auto sm:h-8' : 'h-9 w-auto sm:h-10'} />
      <span className={`font-extrabold tracking-tight text-pra-blue-ink ${small ? 'text-base' : 'text-lg'}`}>PRA <span className="text-pra-green-deep">Learn</span></span>
    </span>
  )
}

export function LangSwitch() {
  const { lang, setLang } = useT()
  const opt = (code, label) => (
    <button type="button" onClick={() => setLang(code)} aria-pressed={lang === code}
      className={`min-h-[40px] min-w-[44px] rounded-xl px-3 text-sm font-extrabold transition ${lang === code ? 'bg-pra-blue text-white' : 'text-pra-ink-soft hover:bg-pra-blue-pale hover:text-pra-blue'}`}>
      {label}
    </button>
  )
  return (
    <div className="flex items-center gap-1 rounded-2xl border-2 border-pra-line bg-white p-1" role="group" aria-label="Language">
      <Languages className="ml-1 hidden h-4 w-4 text-pra-ink-soft sm:block" aria-hidden />
      {opt('en', 'EN')}
      {opt('vn', 'VI')}
    </div>
  )
}

/** A round badge with someone's first letter. */
export function Avatar({ name, size = 'h-9 w-9 text-base' }) {
  const letter = String(name || '?').trim().charAt(0).toUpperCase() || '?'
  return (
    <span aria-hidden className={`inline-flex shrink-0 items-center justify-center rounded-full bg-pra-blue font-extrabold text-white ${size}`}>
      {letter}
    </span>
  )
}

/** The bar at the top of the signed-in pages: logo (home), who is signed in, language, sign out. */
export function TopBar({ name, onSignOut, home = '/' }) {
  const { t } = useT()
  return (
    <header className="no-print sticky top-0 z-20 border-b-2 border-pra-line bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2">
        <Link to={home} className="mr-auto rounded-xl p-1" aria-label={t('home')}><Logo small /></Link>
        {name && (
          <span className="hidden items-center gap-2 rounded-full border-2 border-pra-line bg-white py-1 pl-1 pr-3 sm:inline-flex">
            <Avatar name={name} size="h-8 w-8 text-sm" />
            <span className="max-w-[12rem] truncate text-sm font-bold text-pra-ink">{name}</span>
          </span>
        )}
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
      {api.reset && <button type="button" className="underline" onClick={() => { api.reset(); window.location.reload() }}>{t('resetDemo')}</button>}
    </div>
  )
}

/** A progress ring: value 0 to 1, or null for "not started". */
export function Ring({ value, done = false, size = 56, tone = '#116DFF', children, label }) {
  const r = (size - 9) / 2
  const c = 2 * Math.PI * r
  const v = value == null ? 0 : Math.max(0, Math.min(1, value))
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }} role="img" aria-label={label}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E3EAF2" strokeWidth="7" />
        {v > 0 && <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={done ? '#48971D' : tone} strokeWidth="7" strokeLinecap="round" strokeDasharray={`${v * c} ${c}`} />}
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

// One icon per learning area, beside its accent colour (subjectTone).
const SUBJECT_ICONS = { math: Calculator, english: MessageSquare, science: FlaskConical, history: Globe2, technology: Box }

/** A rounded tile with the subject's icon in its accent colour. */
export function SubjectTile({ subject, tone, size = 'h-14 w-14', icon = 'h-7 w-7' }) {
  const Icon = SUBJECT_ICONS[subject] || Sparkles
  return (
    <span aria-hidden className={`inline-flex shrink-0 items-center justify-center rounded-2xl ${size}`}
      style={{ background: `${tone}1F` }}>
      <Icon className={icon} style={{ color: tone }} strokeWidth={2.4} />
    </span>
  )
}

/** Two palm fronds behind a page (the website's motif). Decoration only. */
export function Backdrop() {
  return (
    <div aria-hidden className="no-print pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="frond absolute -bottom-10 -left-16 h-72 w-72 bg-pra-green/10 sm:h-96 sm:w-96" />
      <div className="frond absolute -right-20 -top-16 hidden h-80 w-80 rotate-180 bg-pra-blue/[0.07] md:block" />
    </div>
  )
}

/**
 * A progress bar: value 0 to 1. A thick rounded track, the fill with a lighter stripe
 * along its top. `onDark` is for a coloured banner (white on a darker track).
 */
export function Bar({ value, tone = '#48971D', onDark = false, className = 'h-4', ...aria }) {
  const v = Math.max(0, Math.min(1, value || 0))
  return (
    <div className={`overflow-hidden rounded-full ${onDark ? 'bg-black/20' : 'bg-pra-line'} ${className}`} {...aria}>
      <div className="relative h-full rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none"
        style={{ width: `${v * 100}%`, minWidth: v > 0 ? '1rem' : 0, background: onDark ? '#fff' : tone }}>
        {!onDark && <span aria-hidden className="absolute inset-x-2 top-[3px] h-[3px] rounded-full bg-white/30" />}
      </div>
    </div>
  )
}

/** A section heading with a coloured icon tile, and an optional line under it. */
export function SectionHead({ id, icon: Icon, tone = '#116DFF', hint, children }) {
  return (
    <div className="mb-3">
      <h2 id={id} className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-pra-ink">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: `${tone}1F` }}>
          <Icon className="h-5 w-5" style={{ color: tone }} strokeWidth={2.6} aria-hidden />
        </span>
        {children}
      </h2>
      {hint && <p className="mt-1.5 max-w-3xl font-semibold text-pra-ink-soft">{hint}</p>}
    </div>
  )
}

/** The way back at the top of a page: a square key with an arrow, and where it goes. */
export function BackLink({ to, children }) {
  return (
    <Link to={to} className="group mb-4 inline-flex items-center gap-3 rounded-2xl text-base font-extrabold text-pra-ink-soft hover:text-pra-blue">
      <span className="btn-icon h-11 w-11 min-h-0 rounded-xl group-hover:border-pra-blue-tint group-hover:text-pra-blue"><ArrowLeft className="h-5 w-5" strokeWidth={3} aria-hidden /></span>
      {children}
    </Link>
  )
}

/** The close (X) button of a player, back to where the child came from. */
export function CloseButton({ to, label }) {
  return (
    <Link to={to} className="btn-icon" aria-label={label} title={label}>
      <X className="h-6 w-6" strokeWidth={3} />
    </Link>
  )
}
