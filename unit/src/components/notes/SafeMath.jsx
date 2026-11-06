// Shared KaTeX components for the Notes task and the ported lesson layouts.
// Notes.jsx and Workbook.jsx used to carry their own verbatim copies of this.
// The render/fallback decision itself lives in ./renderMath.js.
import { renderMath } from './renderMath';

export const SafeInlineMath = ({ math }) => {
  const { html, error } = renderMath(math, false);

  if (error) {
    return <span className="text-rose-500 font-mono text-sm px-1" title={error}>{math}</span>;
  }
  return <span dangerouslySetInnerHTML={{ __html: html }} className="mx-0.5" />;
};

export const SafeBlockMath = ({ math }) => {
  const { html, error } = renderMath(math, true);

  if (error) {
    return (
      <div className="flex flex-col items-center bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 max-w-full overflow-x-auto my-4 w-full">
        <span className="text-rose-500 font-black text-xs uppercase tracking-widest mb-2">KaTeX Error</span>
        <span className="text-rose-700 dark:text-rose-300 font-mono text-sm text-center mb-2">{error}</span>
        <span className="text-rose-800/50 dark:text-rose-200/50 font-mono text-xs text-center break-all">{math}</span>
      </div>
    );
  }
  return (
    <div
      className="overflow-x-auto overflow-y-hidden w-full py-4 my-2 px-4 flex justify-center custom-scrollbar"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
