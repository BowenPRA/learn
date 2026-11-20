// The button the fraction steppers use (cut.jsx, slices.jsx). The classroom's own
// (classroom/content/y7-science/U03_models/ui.jsx) also answers the projector
// remote; a self-study deck has no remote, so this one is a plain button.
export function Btn({ onClick, disabled, tone = 'teal', icon: Icon, children, big = false }) {
  const tones = {
    teal: 'bg-[#0087a8] border-[#00697f]',
    orange: 'bg-[#c25e12] border-[#a04a0e]',
    blue: 'bg-[#1a5fa8] border-[#134a85]',
    purple: 'bg-[#5c2483] border-[#43195f]',
    green: 'bg-[#4a8b23] border-[#386a1a]',
    slate: 'bg-slate-500 border-slate-700',
  }
  return (
    <button
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
