import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Backdrop + centered panel, matching the AddStudentModal shape. Handles the
 * backdrop click, Escape key, and body scroll-lock so callers don't re-implement
 * them. Pass `title`/`subtitle`/`icon` for the standard header, or omit and
 * render your own header inside children.
 *
 * size: sm | md | lg | xl  (max-width of the panel)
 */
const SIZES = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-xl',
  xl: 'max-w-3xl',
};

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  size = 'md',
  showClose = true,
  className = '',
  children,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-slate-900/50 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose} />
      <div
        className={[
          'relative w-full bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-slate-200 dark:border-slate-800',
          'shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto',
          SIZES[size] || SIZES.md,
          className,
        ].join(' ')}
      >
        {(title || showClose) && (
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              {icon}
              {title && (
                <div>
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">{title}</h2>
                  {subtitle && (
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{subtitle}</p>
                  )}
                </div>
              )}
            </div>
            {showClose && (
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-rose-500 border-2 border-slate-200 dark:border-slate-700 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/40"
              >
                <X className="w-5 h-5" strokeWidth={2.5} />
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
