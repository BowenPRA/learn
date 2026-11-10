// src/data/Y7_MATH/U05_3/ui.jsx
// The house button the ported 5.3 widgets use (the classroom's Btn from
// y7-science/U03_models/ui.jsx, without the phone-remote registration). Kept
// local to this unit, like Science 3.1's.
const TONES = {
  teal: 'bg-[#0087a8] border-[#00697f]',
  orange: 'bg-[#c25e12] border-[#a04a0e]',
  purple: 'bg-[#5c2483] border-[#43195f]',
  slate: 'bg-slate-500 border-slate-700',
};

export function Btn({ onClick, disabled, tone = 'teal', icon: Icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all px-3 py-2 text-xs sm:px-4 sm:text-sm lg:px-5 lg:py-2.5 disabled:opacity-35 disabled:pointer-events-none ${TONES[tone] || TONES.teal}`}
    >
      {Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={3} />}
      {children}
    </button>
  );
}
