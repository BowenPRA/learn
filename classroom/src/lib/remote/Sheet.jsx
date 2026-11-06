// src/lib/remote/Sheet.jsx
// Pieces both phone remotes draw: a sheet that slides up from the bottom (the
// thumb's end of the screen), and the "Paused" cover usePresence() asks for.
// Each remote passes its own colours; the shape and behaviour are shared.
import { X, Pause } from 'lucide-react'

/** A bottom sheet. A tap outside it, or on the cross, closes it. */
export function Sheet({ title, onClose, children, className = 'bg-slate-900 border-t border-white/10' }) {
  return (
    <div className="fixed inset-0 z-40 bg-black/60 flex flex-col justify-end animate-in fade-in duration-200" onClick={onClose}>
      <div
        className={`max-h-[85dvh] flex flex-col rounded-t-3xl animate-in slide-in-from-bottom-4 duration-300 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 flex items-center justify-between gap-3 px-5 pt-4 pb-3">
          <div className="min-w-0 text-lg font-black truncate">{title}</div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/10 active:bg-white/20" aria-label="Close">
            <X className="w-5 h-5" strokeWidth={3} />
          </button>
        </div>
        <div className="overflow-y-auto px-3 pb-[max(env(safe-area-inset-bottom),1rem)]">{children}</div>
      </div>
    </div>
  )
}

/** Shown while the remote is paused for want of a tap. A tap carries on. */
export function Paused({ onResume, className = 'bg-[#0b1120]/95' }) {
  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 px-8 text-center ${className}`} onClick={onResume}>
      <Pause className="w-12 h-12 text-slate-400" strokeWidth={2.5} />
      <div className="text-2xl font-black">Paused</div>
      <p className="font-bold text-slate-400">Twenty minutes without a tap, so the remote stopped to save data. Tap to carry on.</p>
    </div>
  )
}
