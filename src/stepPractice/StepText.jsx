import 'katex/dist/katex.min.css';
import { markParts, mathParts, mathHtml } from './text';

const KIND = {
  given: 'font-black text-[#0087a8] dark:text-cyan-300',
  find: 'font-black text-[#e8590c] dark:text-orange-400 underline decoration-2 decoration-dotted underline-offset-4',
  found: 'font-black text-[#2f7d12] dark:text-lime-300',
  bold: 'font-black',
  plain: '',
};

function Prose({ text }) {
  return mathParts(text).map((m, i) => {
    if (m.text != null) return <span key={i}>{m.text}</span>;
    const html = mathHtml(m.math);
    return html ? <span key={i} className="mx-0.5" dangerouslySetInnerHTML={{ __html: html }} /> : <span key={i}>{m.math}</span>;
  });
}

/**
 * A line of step-practice text with its colours (see text.js): teal given,
 * orange to find, green found. `done` turns the orange [[…]] green — the item
 * is finished, so what was being found is found.
 */
export default function StepText({ text, done = false, className = '' }) {
  if (text == null || text === '') return null;
  return (
    <span className={className}>
      {markParts(text).map((p, i) => {
        const kind = p.kind === 'find' && done ? 'found' : p.kind;
        return kind === 'plain'
          ? <Prose key={i} text={p.text} />
          : <span key={i} className={`${KIND[kind]} ${p.text.length <= 14 ? 'whitespace-nowrap' : ''}`}><Prose text={p.text} /></span>;
      })}
    </span>
  );
}
