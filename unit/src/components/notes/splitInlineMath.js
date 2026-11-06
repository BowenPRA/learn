/**
 * Split a line of deck text into prose and `$inline maths$` runs.
 *
 *   splitInlineMath('A $12$-pack at $\\$0.30$ each')
 *   → [{ text: 'A ' }, { math: '12' }, { text: '-pack at ' }, { math: '\\$0.30' }, { text: ' each' }]
 *
 * A backslash-escaped dollar is a literal dollar sign, never a delimiter:
 * inside maths it is kept for KaTeX (`\$` is its dollar), outside it prints as
 * a plain "$". The one-line regex this replaces (`/(\$[\s\S]+?\$)/`) closed the
 * maths at the escaped dollar, so "$\$0.30$" rendered a KaTeX error followed
 * by raw text, and prose such as "(in \$1,000s): $30, 32$" came out inverted —
 * prose typeset as maths and the maths printed raw.
 *
 * Written as a scanner rather than a lookbehind regex because classroom iPads
 * on older Safari do not support lookbehind, and would fail to parse the file.
 * An unclosed `$` is left as ordinary text.
 */
export function splitInlineMath(input) {
  const s = String(input ?? '');
  const out = [];
  let text = '';
  let i = 0;

  const flushText = () => { if (text) { out.push({ text }); text = ''; } };

  while (i < s.length) {
    const ch = s[i];

    if (ch === '\\' && s[i + 1] === '$') { text += '$'; i += 2; continue; }

    if (ch === '$') {
      // Find the closing delimiter, stepping over any escaped character.
      let j = i + 1;
      while (j < s.length && s[j] !== '$') j += s[j] === '\\' ? 2 : 1;

      if (j < s.length && j > i + 1) {
        flushText();
        out.push({ math: s.slice(i + 1, j).trim() });
        i = j + 1;
        continue;
      }
    }

    text += ch;
    i += 1;
  }

  flushText();
  return out;
}
