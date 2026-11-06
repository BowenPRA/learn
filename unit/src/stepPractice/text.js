// Markup for step-practice text (no React here, so StepText.jsx exports components only).
//
//   {{24 sweets}}   given        teal
//   [[how many]]    to find      orange (green once the item is done)
//   <<6>>           found        green
//   **word**        bold
//   $-3 + 5$        KaTeX maths  (\$ is a plain dollar sign)

import katex from 'katex';

const MARKS = /(\{\{[\s\S]+?\}\}|\[\[[\s\S]+?\]\]|<<[\s\S]+?>>|\*\*[\s\S]+?\*\*)/g;

/** Split on the markers: [{ kind: 'plain' | 'given' | 'find' | 'found' | 'bold', text }]. */
export function markParts(s) {
  return String(s ?? '').split(MARKS).filter((p) => p !== '').map((p) => {
    if (p.startsWith('{{')) return { kind: 'given', text: p.slice(2, -2) };
    if (p.startsWith('[[')) return { kind: 'find', text: p.slice(2, -2) };
    if (p.startsWith('<<')) return { kind: 'found', text: p.slice(2, -2) };
    if (p.startsWith('**')) return { kind: 'bold', text: p.slice(2, -2) };
    return { kind: 'plain', text: p };
  });
}

/** Split prose and $maths$: [{ text } | { math }]. An escaped \$ is a dollar sign; an unclosed $ stays text. */
export function mathParts(s) {
  const out = [];
  let buf = '';
  let i = 0;
  const str = String(s ?? '');
  while (i < str.length) {
    if (str[i] === '\\' && str[i + 1] === '$') { buf += '$'; i += 2; continue; }
    if (str[i] === '$') {
      let j = i + 1;
      while (j < str.length && !(str[j] === '$' && str[j - 1] !== '\\')) j += 1;
      if (j < str.length) {
        if (buf) out.push({ text: buf });
        buf = '';
        out.push({ math: str.slice(i + 1, j) });
        i = j + 1;
        continue;
      }
    }
    buf += str[i];
    i += 1;
  }
  if (buf) out.push({ text: buf });
  return out;
}

/** KaTeX to an HTML string, or null when it will not render. */
export function mathHtml(math) {
  try {
    const k = katex.default || katex;
    return k.renderToString(String(math), { throwOnError: true });
  } catch {
    return null;
  }
}

/** Markup taken out, for alt text and comparisons. */
export const plainText = (s) => markParts(s).map((p) => p.text).join('').replace(/\$/g, '');
