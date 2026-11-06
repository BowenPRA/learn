// content/y7-science/U03_models/ui.jsx
// Controls shared by this unit's widgets. Two families:
//
//   Glass*   for the space models (solar system, formation, the Sun): a dark
//            viewport needs dark, translucent controls that sit on top of it
//            without hiding the picture. Space is black in light mode too.
//   Btn      the house button from the other science decks, for the widgets
//            drawn on a white plate (the dating models, the steppers).
//
// Every size has a projector step (`big`), because full screen is what the
// class sees and the type there runs about 40% larger.
//
// Btn and GlassButton register with the slide (useSlideButton), so Mr Bowen
// can press them from the phone remote; their words are the label he sees.
import { Children, useRef } from 'react'
import { useSlideButton } from '../../../src/lib/deckControls.js'

export function GlassPanel({ className = '', children, style }) {
  return (
    <div
      className={`rounded-2xl border border-white/15 bg-slate-950/70 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.45)] text-slate-100 ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

/** A labelled group of buttons, one of which is on. */
export function Segmented({ label, options, value, onChange, big = false }) {
  return (
    <div className="flex flex-col gap-1 min-w-0">
      {label && (
        <span className={`font-black uppercase tracking-[0.18em] text-slate-400 px-1 ${big ? 'text-[0.8rem]' : 'text-[0.62rem]'}`}>{label}</span>
      )}
      <div className="flex rounded-xl bg-white/5 border border-white/10 p-0.5">
        {options.map((o) => {
          const on = o.value === value
          return (
            <button
              key={String(o.value)}
              type="button"
              onClick={() => onChange(o.value)}
              title={o.title}
              className={`rounded-[0.6rem] font-bold whitespace-nowrap transition-colors ${big ? 'px-3.5 py-2 text-[1.02rem]' : 'px-2.5 py-1.5 text-[0.8rem]'} ${on ? 'bg-sky-400 text-slate-950 shadow' : 'text-slate-200 hover:bg-white/10'}`}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/** A round icon button for the transport controls. */
export function GlassIconButton({ icon: Icon, onClick, title, active = false, big = false, accent = false, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      disabled={disabled}
      className={`shrink-0 rounded-full flex items-center justify-center transition-colors border disabled:opacity-35 disabled:pointer-events-none ${big ? 'w-12 h-12' : 'w-10 h-10'} ${accent ? 'bg-amber-400 border-amber-300 text-slate-950 hover:bg-amber-300' : active ? 'bg-sky-400 border-sky-300 text-slate-950' : 'bg-white/5 border-white/15 text-slate-100 hover:bg-white/15'}`}
    >
      <Icon className={big ? 'w-6 h-6' : 'w-5 h-5'} strokeWidth={2.5} />
    </button>
  )
}

/** A pill button with an icon and words. */
export function GlassButton({ icon: Icon, onClick, children, big = false, tone = 'plain', active = false, disabled = false, title }) {
  const tones = {
    plain: active ? 'bg-sky-400 border-sky-300 text-slate-950' : 'bg-white/5 border-white/15 text-slate-100 hover:bg-white/15',
    amber: 'bg-amber-400 border-amber-300 text-slate-950 hover:bg-amber-300',
    sky: 'bg-sky-400 border-sky-300 text-slate-950 hover:bg-sky-300',
  }
  const ref = useRef(null)
  useSlideButton(ref, onClick)
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`inline-flex items-center gap-2 rounded-xl border font-bold whitespace-nowrap transition-colors disabled:opacity-35 disabled:pointer-events-none ${big ? 'px-4 py-2.5 text-[1.05rem]' : 'px-3 py-2 text-[0.85rem]'} ${tones[tone]}`}
    >
      {Icon && <Icon className={big ? 'w-5 h-5' : 'w-4 h-4'} strokeWidth={2.5} />}
      {children}
    </button>
  )
}

/** A small on/off chip for map layers. */
export function LayerChip({ on, onClick, children, color = '#38bdf8', big = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border font-bold whitespace-nowrap transition-colors ${big ? 'px-3.5 py-1.5 text-[1rem]' : 'px-3 py-1 text-[0.8rem]'} ${on ? 'border-white/30 bg-white/10 text-white' : 'border-white/10 bg-transparent text-slate-400 hover:text-slate-200'}`}
    >
      <span className="inline-block rounded-full" style={{ width: big ? 12 : 10, height: big ? 12 : 10, background: on ? color : 'transparent', border: `2px solid ${color}` }} />
      {children}
    </button>
  )
}

/** A thin vertical rule between control groups. */
export function Divider() {
  return <div className="hidden md:block w-px self-stretch bg-white/10 mx-1" />
}

/** Lay control groups out in a row that wraps on a narrow screen. */
export function Dock({ children, className = '' }) {
  return (
    <div className={`flex flex-wrap items-end justify-center gap-x-3 gap-y-2 ${className}`}>
      {Children.toArray(children)}
    </div>
  )
}

/** The house button (matches 3.1 and 2.5), for widgets on a white plate. */
export function Btn({ onClick, disabled, tone = 'teal', icon: Icon, children, big = false }) {
  const tones = {
    teal: 'bg-[#0087a8] border-[#00697f]',
    orange: 'bg-[#c25e12] border-[#a04a0e]',
    blue: 'bg-[#1a5fa8] border-[#134a85]',
    purple: 'bg-[#5c2483] border-[#43195f]',
    green: 'bg-[#4a8b23] border-[#386a1a]',
    slate: 'bg-slate-500 border-slate-700',
  }
  const ref = useRef(null)
  useSlideButton(ref, onClick)
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-35 disabled:pointer-events-none ${big ? 'px-6 py-3 text-lg' : 'px-4 py-2 text-sm lg:px-5 lg:py-2.5 lg:text-base'} ${tones[tone]}`}
    >
      {Icon && <Icon className={big ? 'w-5 h-5' : 'w-4 h-4 lg:w-5 lg:h-5'} strokeWidth={3} />}
      {children}
    </button>
  )
}
