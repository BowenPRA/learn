// A task with nothing in it yet: a picture, a line, and the way back.
export function EmptyState({ icon, iconClassName = '', title, message, onAction, actionLabel = 'Back' }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 p-6 text-center dark:bg-slate-950">
      <span className={iconClassName}>{icon}</span>
      <h2 className="text-2xl font-black text-slate-800 dark:text-white">{title}</h2>
      <p className="max-w-md font-semibold text-slate-500">{message}</p>
      {onAction && <button type="button" onClick={onAction} className="mt-2 rounded-2xl border-b-4 border-slate-300 bg-white px-6 py-3 font-black text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">{actionLabel}</button>}
    </div>
  )
}
