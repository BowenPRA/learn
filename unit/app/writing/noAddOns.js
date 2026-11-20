// Keep writing add-ons out of the timed writing (Bowen, 20 November 2026: "make sure
// the essay disables grammarly or other addons").
//
// Grammarly, LanguageTool, the browser's spell check and autocorrect, and Chrome's
// own writing suggestions all correct or rewrite a student's sentences, so the essay
// would no longer show their own English. A web page cannot switch an extension off;
// it can only ask it to leave a box alone, and the main ones honour these attributes.
// `addOnsOn` then looks for the marks an add-on leaves on a box it is working in
// anyway, so the student can be told and the teacher sees it on the report.
//
// Pure: no React here, so tests/noaddons.test.mjs can load it in Node.

/** Spread on every box a student writes in for an essay: the essay, the plan, the corrections. */
export const NO_ADDONS = {
  spellCheck: false,
  autoCorrect: 'off',
  autoCapitalize: 'off',
  autoComplete: 'off',
  'data-gramm': 'false',
  'data-gramm_editor': 'false',
  'data-enable-grammarly': 'false',
  'data-lt-active': 'false', // LanguageTool
  writingsuggestions: 'false', // Chrome's built-in writing suggestions
}

// What each add-on leaves on a box it has taken over. Grammarly stamps the box with
// data-gramm_id (and turns data-gramm to "true"); LanguageTool stamps data-lt-tmp-id
// and draws its own lt-* elements over the box.
const MARKS = [
  {
    name: 'Grammarly',
    on: (el, doc) => el.hasAttribute('data-gramm_id') || el.hasAttribute('data-txt_gramm_id')
      || el.getAttribute('data-gramm') === 'true' || !!doc?.querySelector?.('grammarly-extension'),
  },
  {
    name: 'LanguageTool',
    on: (el, doc) => el.hasAttribute('data-lt-tmp-id') || el.getAttribute('data-lt-active') === 'true'
      || !!doc?.querySelector?.('lt-mirror, lt-highlighter'),
  },
  {
    name: 'spell check',
    on: (el) => el.spellcheck === true,
  },
]

/** The add-ons working in `el` right now, by name ([] when none). */
export function addOnsOn(el, doc = globalThis.document) {
  if (!el) return []
  return MARKS.filter((m) => m.on(el, doc)).map((m) => m.name)
}

/** `known` with any names in `found` it lacks added, or `known` itself when nothing is new. */
export function addNames(known = [], found = []) {
  const fresh = found.filter((n) => !known.includes(n))
  return fresh.length ? [...known, ...fresh] : known
}
