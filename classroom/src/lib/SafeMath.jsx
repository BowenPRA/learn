import katex from 'katex'
import 'katex/dist/katex.min.css'

const k = katex.default || katex

// Zero-width characters sometimes sneak in from copy-paste and break KaTeX.
const clean = (math) => math.replace(new RegExp(String.fromCharCode(0x200b,0x200c,0x200d,0xfeff).split('').join('|'),'g'), '')

// Render to an HTML string (or capture the error) outside JSX, so no JSX is
// constructed inside the try/catch.
function render(math, displayMode) {
  try {
    return { html: k.renderToString(clean(math), { throwOnError: true, displayMode }) }
  } catch (err) {
    return { error: err.message }
  }
}

export function SafeInlineMath({ math }) {
  const { html, error } = render(math, false)
  if (error) {
    return <span className="text-rose-500 font-mono text-sm px-1" title={error}>{math}</span>
  }
  return <span dangerouslySetInnerHTML={{ __html: html }} className="mx-0.5" />
}

export function SafeBlockMath({ math }) {
  const { html, error } = render(math, true)
  if (error) {
    return (
      <div className="flex flex-col items-center bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 max-w-full overflow-x-auto my-4 w-full">
        <span className="text-rose-500 font-black text-xs uppercase tracking-widest mb-2">KaTeX Error</span>
        <span className="text-rose-700 dark:text-rose-300 font-mono text-sm text-center mb-2">{error}</span>
        <span className="text-rose-800/50 dark:text-rose-200/50 font-mono text-xs text-center break-all">{math}</span>
      </div>
    )
  }
  return (
    <div
      className="overflow-x-auto overflow-y-hidden w-full py-4 my-2 px-4 flex justify-center custom-scrollbar"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
