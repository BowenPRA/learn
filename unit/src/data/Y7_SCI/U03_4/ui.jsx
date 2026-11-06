// src/data/Y7_SCI/U03_4/ui.jsx
// The two shared pieces the 3.4 widgets need, kept local to the unit (as 3.2
// and Maths 5.3 do): the house button, and Mr Bowen as an SVG group.
import { mrBowenSvg } from './mrBowen.js';

/** The house button (matches 3.1 and 3.2), for widgets on a white plate. */
export function Btn({ onClick, disabled, tone = 'teal', icon: Icon, children }) {
  const tones = {
    teal: 'bg-[#0087a8] border-[#00697f]',
    orange: 'bg-[#c25e12] border-[#a04a0e]',
    blue: 'bg-[#1a5fa8] border-[#134a85]',
    slate: 'bg-slate-500 border-slate-700',
  };
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-35 disabled:pointer-events-none px-3 py-2 text-xs sm:px-4 sm:text-sm lg:px-5 lg:py-2.5 lg:text-base ${tones[tone]}`}
    >
      {Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={3} />}
      {children}
    </button>
  );
}

/** Mr Bowen inside an SVG (his frame is described in mrBowen.js). */
export function MrBowen(props) {
  return <g dangerouslySetInnerHTML={{ __html: mrBowenSvg(props) }} />;
}
