// src/components/towerdefense/ExitConfirmModal.jsx
import { AlertTriangle, X } from 'lucide-react';

/**
 * Shared by both arcade cabinets, so what is being abandoned is a prop.
 *
 * The default is Tower Defense's wording, which is what every existing caller
 * gets without changing a line; Swarm Survivor passes its own, because "your
 * towers will be lost" is nonsense in a game where the towers are you.
 */
export default function ExitConfirmModal({
  open,
  onCancel,
  onConfirm,
  message = "Your towers will be lost and your wave progress won't be saved.",
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[2rem] border-b-8 border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
      >
        <div className="p-8 text-center">
          <div className="w-20 h-20 mx-auto bg-rose-100 border-b-4 border-rose-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <AlertTriangle className="w-10 h-10 text-rose-500" strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Leave the battle?</h2>
          <p className="text-base font-bold text-slate-500 leading-snug">
            {message}
          </p>
        </div>

        <div className="p-6 bg-slate-50 border-t-2 border-slate-100 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-4 rounded-2xl bg-slate-200 hover:bg-slate-300 border-b-[4px] border-slate-300 active:border-b-0 active:translate-y-[4px] text-slate-700 font-black transition-all uppercase tracking-widest text-sm"
          >
            Keep Playing
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 border-b-[4px] border-rose-700 active:border-b-0 active:translate-y-[4px] text-white font-black transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" strokeWidth={3} /> End Run
          </button>
        </div>
      </div>
    </div>
  );
}