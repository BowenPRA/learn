// src/components/layouts/primitives.jsx
// Shared component building blocks for the flexible slide layouts: an icon
// resolver, typed note cards, a reveal box, media frames, header bars, and pills.
// Everything here is theme-safe (light + dark) and eslint-clean (no setState in
// effects; icons via createElement). Non-component helpers live in helpers.jsx.
import { useState, useContext, createElement } from 'react'
import {
  BookOpen, Microscope, FlaskConical, Leaf, Pencil, Hourglass, Home, Sparkles,
  Zap, Info, CheckCircle2, Lightbulb, Ruler, Maximize2, Quote, Boxes, Sprout,
  Building2, Dna, Atom, ScanEye, Telescope, GraduationCap, Beaker, TestTube,
  Layers, ArrowRight, Target, Users, MessageSquare, Scale, Equal, AlertTriangle,
  ShieldCheck, Repeat, HelpCircle, ChevronDown, Sun, Droplet,
  // Added for the Algebra Track (coordinate geometry).
  Sigma, Grid3x3, LayoutGrid, RotateCcw, Move, PenLine, Box, Triangle, Bug,
  Calculator, Timer, Hammer, ArrowLeftRight, Spline,
  // Added for slides built around a film clip (Y7 Maths 1.3).
  Clapperboard,
  // Added for circles and constructions (Algebra Track 1.3).
  Compass, Globe, Circle, MapPin,
  // Added for changes of state and measuring (Y7 Science 2.2). Several of these
  // (Droplets, Wind, Flame, Snowflake) were already referenced by 2.1a's slides
  // and were silently falling back to the Info circle until now.
  Thermometer, Droplets, Wind, Flame, Snowflake, Waves, CloudFog, Gauge,
  // Added for left-hand / right-hand vote slides (Y7 Maths 2.3).
  Hand,
  // Added for expanding brackets (Y7 Maths 2.4).
  Parentheses, Square,
  // Added for the four operations on decimals (Y7 Maths 4.1–4.4). Minus and
  // Divide were already referenced by 2.2 and 3.1–3.2 and fell back to Info.
  Plus, Minus, X, Divide, ArrowUp, ArrowDown, Trophy, Coins,
  // Already referenced by older decks (Algebra Track 1.1 and 1.4, Y7 Maths 2.1,
  // 2.2 and 3.1–3.2, Y7 Science 2.1a, 2.1b and 2.3) and falling back to Info.
  Table, ListChecks, PenTool, Coffee, Languages, Search, Superscript,
  ListOrdered, Hash, ArrowLeft, ArrowDownUp, Gamepad2, Soup, CircleSlash,
  ArrowUpRight, SlidersHorizontal, TrendingUp, MoveUp, FlipVertical, MoveRight,
  // Added for tides (Y7 Science 3.4).
  Moon, Anchor,
} from 'lucide-react'
import WidgetRenderer, { WidgetErrorBoundary } from '../WidgetRenderer.jsx'
import { parseInlineText, renderContent, NOTE_TONES } from './helpers.jsx'
import { field, tr } from '../../lib/lang.js'
import { RevealContext } from '../../lib/deckControls.js'

// ── Icon resolver ──────────────────────────────────────────────────────────
const ICONS = {
  BookOpen, Microscope, FlaskConical, Leaf, Pencil, Hourglass, Home, Sparkles,
  Zap, Info, CheckCircle2, Lightbulb, Ruler, Quote, Boxes, Sprout, Building2,
  Dna, Atom, ScanEye, Telescope, GraduationCap, Beaker, TestTube, Layers,
  ArrowRight, Target, Users, MessageSquare, Scale, Equal, AlertTriangle,
  ShieldCheck, Repeat, HelpCircle, Sun, Droplet,
  Sigma, Grid3x3, LayoutGrid, RotateCcw, Move, PenLine, Box, Triangle, Bug,
  Calculator, Timer, Hammer, ArrowLeftRight, Spline, Clapperboard,
  Compass, Globe, Circle, MapPin,
  Thermometer, Droplets, Wind, Flame, Snowflake, Waves, CloudFog, Gauge,
  Hand,
  Parentheses, Square,
  Plus, Minus, X, Divide, ArrowUp, ArrowDown, Trophy, Coins,
  Table, ListChecks, PenTool, Coffee, Languages, Search, Superscript,
  ListOrdered, Hash, ArrowLeft, ArrowDownUp, Gamepad2, Soup, CircleSlash,
  ArrowUpRight, SlidersHorizontal, TrendingUp, MoveUp, FlipVertical, MoveRight,
  Moon, Anchor,
}

/** Render a lucide icon by name (falls back to Info). */
export function Ic({ name, ...props }) {
  return createElement(ICONS[name] || Info, props)
}

// ── Typed note cards (the `.note-*` boxes) ───────────────────────────────────
/**
 * A typed note card, shaped like a Cambridge Learner's Book panel: a solid
 * colour header strip over a tinted body with a matching hairline border.
 * `note` = { tone, text, badge, icon } (+ `…Vn` / `…Fr` twins). `badge: false` hides the strip.
 * **Bold** runs inside the body take the tone's key-word colour.
 */
export function Note({ note, lang = 'en', isDisplayMode = false }) {
  const tone = NOTE_TONES[note.tone] || NOTE_TONES.write
  const text = field(note, 'text', lang)
  const showBadge = note.badge !== false
  const badgeText = note.badge != null && note.badge !== true && note.badge !== false
    ? field(note, 'badge', lang)
    : field(tone, 'label', lang)
  const iconName = note.icon || tone.icon
  const lines = String(text || '').split('\n').filter((l) => l.trim())

  return (
    <div className={`overflow-hidden rounded-xl border-2 ${tone.border} shadow-sm`}>
      {showBadge && (
        <div className={`flex items-center gap-2 text-white font-black uppercase tracking-[0.15em] ${isDisplayMode ? 'text-[clamp(0.7rem,1vw,1rem)] px-4 py-2' : 'text-[10px] sm:text-[11px] px-3.5 py-2'}`}
          style={{ backgroundColor: tone.accent }}>
          <Ic name={iconName} className={isDisplayMode ? 'w-4 h-4' : 'w-3.5 h-3.5'} strokeWidth={3} />
          {badgeText}
        </div>
      )}
      <div className={`${tone.card} ${tone.text} font-semibold leading-relaxed space-y-2 ${isDisplayMode ? 'p-[clamp(1rem,1.7vw,1.6rem)]' : 'p-3.5 sm:p-5'}`}>
        {lines.map((line, i) => (
          <p key={i} className={isDisplayMode ? 'text-[clamp(1.05rem,1.7vw,1.55rem)]' : 'text-[15px] sm:text-base lg:text-lg'}>
            {parseInlineText(line, { strongClass: tone.strong })}
          </p>
        ))}
      </div>
    </div>
  )
}

/** A row/grid of note cards. */
export function NoteStack({ notes = [], lang = 'en', isDisplayMode = false, columns = 1 }) {
  if (!notes.length) return null
  return (
    <div className={`grid gap-3 sm:gap-4 ${columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
      {notes.map((note, i) => (
        <Note key={i} note={note} lang={lang} isDisplayMode={isDisplayMode} />
      ))}
    </div>
  )
}

// ── Reveal box (answer-box / flip-card) ──────────────────────────────────────
/**
 * `reveal` = { label, answer, prompt } (+ `…Vn` / `…Fr` twins). Inside a deck
 * the open state is the deck's (RevealContext), so the phone remote can open
 * and close it; anywhere else the box keeps its own.
 */
export function Reveal({ reveal, lang = 'en', accent = '#8b5cf6', isDisplayMode = false }) {
  const control = useContext(RevealContext)
  const [ownOpen, setOwnOpen] = useState(false)
  const open = control ? control.open : ownOpen
  const setOpen = control ? control.setOpen : setOwnOpen
  if (!reveal) return null
  const label = field(reveal, 'label', lang) || tr(lang, 'Reveal the answer', 'Hiện đáp án', 'Voir la réponse')
  const prompt = field(reveal, 'prompt', lang)
  const answer = field(reveal, 'answer', lang)

  return (
    <div className="w-full">
      {prompt && (
        <p className={`text-slate-600 dark:text-slate-300 font-bold mb-3 ${isDisplayMode ? 'text-[clamp(1.05rem,1.7vw,1.5rem)]' : 'text-base lg:text-lg'}`}>
          {parseInlineText(prompt)}
        </p>
      )}
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className={`inline-flex items-center gap-2 rounded-2xl font-black text-white uppercase tracking-widest shadow-sm border-b-4 active:border-b-0 active:translate-y-1 transition-all ${isDisplayMode ? 'text-[clamp(0.85rem,1.3vw,1.2rem)] px-7 py-4' : 'text-sm px-6 py-3.5'}`}
          style={{ backgroundColor: accent, borderColor: 'rgba(0,0,0,0.25)' }}>
          <ChevronDown className={isDisplayMode ? 'w-5 h-5' : 'w-4 h-4'} strokeWidth={3} />
          {label}
        </button>
      ) : (
        <div className="rounded-2xl border-2 bg-slate-50 dark:bg-slate-800/60 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300"
          style={{ borderColor: accent, borderLeftWidth: 6 }}>
          <div className={isDisplayMode ? 'p-[clamp(1.25rem,2vw,2rem)]' : 'p-4 sm:p-6'}>
            <div className={`font-bold text-slate-800 dark:text-slate-100 leading-relaxed ${isDisplayMode ? 'text-[clamp(1.1rem,1.8vw,1.6rem)]' : 'text-base lg:text-xl'}`}>
              {renderContent(answer, { isDisplayMode })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Media frame (widget · inline SVG · real image) ───────────────────────────
/**
 * The framed media element used by layouts. Chooses widget / inlineSvg / image
 * from `source` (defaults to the slide). `drawThis` adds the amber badge.
 */
export function Media({ slide, source, ctx, drawThis = (source || slide).drawThis, className = '' }) {
  const { lang, isDisplayMode, onZoom } = ctx
  const src = source || slide
  const hasWidget = !!src.widget
  const hasSvg = !!src.inlineSvg
  const hasImage = !!src.image
  if (!hasWidget && !hasSvg && !hasImage) return null
  const title = field(src, 'title', lang)

  const onExpand = () => {
    if (hasWidget) onZoom({ type: 'widget', config: src.widget })
    else if (hasSvg) onZoom({ type: 'svg', content: src.inlineSvg })
    else onZoom({ type: 'img', src: src.image })
  }

  return (
    <div className={`relative w-full h-full bg-white dark:bg-slate-800 shadow-sm flex flex-col items-center justify-center overflow-hidden group transition-all ${isDisplayMode ? 'rounded-[2rem]' : 'rounded-2xl lg:rounded-[2rem]'} ${drawThis ? 'border-[3px] lg:border-[4px] border-[#ffc800]' : 'border-2 border-slate-200 dark:border-slate-700'} ${className}`}>
      {drawThis && (
        <div className={`absolute top-0 right-0 bg-[#ffc800] text-amber-950 font-black uppercase tracking-widest rounded-bl-2xl lg:rounded-bl-3xl z-20 shadow-sm flex items-center border-b-2 border-l-2 border-[#cca000] ${isDisplayMode ? 'text-[clamp(0.75rem,1vw,1.1rem)] px-5 py-2.5' : 'text-[9px] sm:text-xs px-3 lg:px-4 py-1.5 lg:py-2'}`}>
          <Pencil className={isDisplayMode ? 'w-4 h-4 mr-2' : 'w-3 h-3 lg:w-4 lg:h-4 mr-1.5 lg:mr-2'} strokeWidth={3} />
          {tr(lang, 'Draw This', 'Vẽ Hình Này', 'À dessiner')}
        </div>
      )}
      {hasWidget ? (
        <div className={`w-full h-full flex items-center justify-center ${isDisplayMode ? 'p-6' : 'p-2 sm:p-4'}`}>
          <WidgetErrorBoundary><WidgetRenderer config={src.widget} lang={lang} isDisplayMode={isDisplayMode} /></WidgetErrorBoundary>
        </div>
      ) : hasSvg ? (
        // text-slate-* matters: diagram labels use fill="currentColor", which
        // would otherwise inherit near-black and vanish on a dark panel.
        <div className={`w-full h-full flex items-center justify-center text-slate-800 dark:text-slate-100 ${isDisplayMode ? 'p-6' : 'p-3 sm:p-4'}`} dangerouslySetInnerHTML={{ __html: src.inlineSvg }} />
      ) : (
        <img src={src.image} alt={title || 'Diagram'} className={`w-full h-full object-contain ${isDisplayMode ? 'p-4' : 'p-2 sm:p-3'}`} draggable={false} />
      )}
      <button
        onClick={onExpand}
        className="absolute top-2 lg:top-4 right-2 lg:right-4 p-2.5 lg:p-3 bg-white/90 backdrop-blur hover:bg-slate-100 text-slate-600 hover:text-[#1cb0f6] rounded-xl shadow-sm border-2 border-slate-200 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all z-30 active:scale-95 border-b-4 active:border-b-2 active:translate-y-0.5"
        title="Expand">
        <Maximize2 className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={2.5} />
      </button>
    </div>
  )
}

// ── Header bar (accent strip + icon + title) ─────────────────────────────────
export function HeaderBar({ title, icon = 'BookOpen', accent = '#1cb0f6', eyebrow, isDisplayMode = false }) {
  return (
    <div className={`text-white flex items-center relative overflow-hidden flex-shrink-0 border-b-4 border-black/10 ${isDisplayMode ? 'p-2 sm:p-3 lg:p-4' : 'p-4 lg:p-6'}`}
      style={{ backgroundColor: accent }}>
      <div className={`bg-white/20 rounded-xl mr-3 sm:mr-4 shadow-inner border border-white/30 z-10 ${isDisplayMode ? 'p-2' : 'p-2.5 lg:p-3'}`}>
        <Ic name={icon} className={`drop-shadow-sm ${isDisplayMode ? 'w-6 h-6' : 'w-5 h-5 lg:w-8 lg:h-8'}`} strokeWidth={2.5} />
      </div>
      <div className="z-10 min-w-0">
        {eyebrow && (
          <div className={`font-black uppercase tracking-[0.2em] opacity-80 ${isDisplayMode ? 'text-[clamp(0.6rem,0.9vw,0.95rem)]' : 'text-[10px] sm:text-xs'}`}>{eyebrow}</div>
        )}
        <h2 className={`font-black tracking-tight drop-shadow-md truncate ${isDisplayMode ? 'text-[clamp(1.25rem,2vw,2rem)]' : 'text-xl sm:text-2xl lg:text-4xl'}`}>{title}</h2>
      </div>
    </div>
  )
}

/** Small pill used above titles on hero / statement layouts. */
export function Pill({ children, filled = false, accent = '#1cb0f6', isDisplayMode = false }) {
  if (!children) return null
  return (
    <span
      className={`inline-block font-black uppercase tracking-[0.2em] rounded-full border ${isDisplayMode ? 'text-[clamp(0.7rem,1.1vw,1.1rem)] px-5 py-2' : 'text-[10px] sm:text-xs px-4 py-1.5'} ${filled ? 'text-white border-transparent shadow-sm' : 'border-current'}`}
      style={filled ? { backgroundColor: accent } : { color: accent }}>
      {children}
    </span>
  )
}
