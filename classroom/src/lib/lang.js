// The deck's languages. English is the source; every other language is a
// twin field written beside it (`title` / `titleVn` / `titleFr`), and a missing
// twin falls back to English — never to another translation.
//
//   en  English      always
//   vn  Vietnamese   every bilingual course, unless the lesson sets
//                    `meta.vietnamese: false` (Year 7 from Unit 4, 15 Oct 2026)
//   fr  French       lessons that set `meta.french: true`

/** The languages a deck offers, in toggle order. */
export function deckLangs(course, lesson) {
  if (course?.bilingual === false) return ['en']
  const langs = ['en']
  if (lesson?.vietnamese !== false) langs.push('vn')
  if (lesson?.french) langs.push('fr')
  return langs
}

/** Choose one of three strings for `lang`, falling back to English. */
export function tr(lang, en, vn, fr) {
  if (lang === 'vn') return vn || en
  if (lang === 'fr') return fr || en
  return en
}

/** The `key` field of `obj` in `lang`: `obj.keyVn` / `obj.keyFr`, else `obj.key`. */
export function field(obj, key, lang) {
  if (!obj) return undefined
  return tr(lang, obj[key], obj[`${key}Vn`], obj[`${key}Fr`])
}
