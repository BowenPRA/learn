import katex from 'katex';
import 'katex/dist/katex.min.css';

// Strip zero-width joiners/spaces (U+200B–U+200D, U+FEFF) that break KaTeX.
const ZERO_WIDTH = new RegExp('[\u200B-\u200D\uFEFF]', 'g');

/**
 * Render one expression, returning `{ html }` or `{ error }`.
 *
 * The try/catch has to wrap the KaTeX call and nothing else. Building JSX
 * inside a try/catch reads as if it guards the render, but JSX construction
 * only creates an element — React invokes it later, outside the block, so a
 * genuine render error escapes the catch entirely. Keeping the boundary around
 * the string work makes what is actually protected obvious.
 *
 * This lives apart from SafeMath.jsx so that file exports components only,
 * which is what fast refresh needs.
 */
export function renderMath(math, displayMode) {
  try {
    const k = katex.default || katex;
    const clean = String(math).replace(ZERO_WIDTH, '');
    return { html: k.renderToString(clean, { throwOnError: true, displayMode }) };
  } catch (err) {
    return { error: err.message };
  }
}
