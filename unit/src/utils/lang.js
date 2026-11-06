// The languages a task screen can show. English is the source; every other
// language is a twin field written beside it, and a missing twin falls back to
// English — never to another translation.
//
//   en  English     always
//   vn  Vietnamese  every track, unless it declares `bilingual: false` — and
//                   not in a unit whose meta says `vietnamese: false`
//   fr  French      tracks that declare `french: true` (Y7_MATH, Y7_SCI)
//
// Year 7 is English and French from Maths Unit 4 and Science Unit 3 (October
// 2026), as the classroom decks are: those units set `meta.vietnamese: false`,
// write a `…Fr` twin beside every English string and no `…Vn` one, and their
// screens toggle EN → FR. The units before them keep EN / VN / FR.
//
// Twin names follow the Vietnamese one they sit beside: a `…Vn` suffix becomes
// `…Fr` (`title` / `titleVn` / `titleFr`), and the older `vn…` prefix becomes
// `fr…` (`vnDef` → `frDef`, `vnTranslation` → `frTranslation`, `vn` → `fr`).
// Interface text inside a component takes all three at once:
// `tr(lang, 'Check', 'Kiểm tra', 'Vérifier')`, or an `{ en, vn, fr }` table.
//
// The French matches the course, not France: numbers, decimal points, units
// and every `$…$` span stay exactly as the English has them. The validator
// refuses a French twin whose maths differs (scripts/validate-entry.js).

/**
 * The languages a unit offers, in toggle order. `cfg` is its track's registry
 * entry; `unit` (optional) is the unit's data, whose `meta.vietnamese: false`
 * takes VN off an EN / VN / FR track.
 */
export function langsFor(cfg, unit) {
  if (cfg?.bilingual === false) return ['en'];
  const langs = cfg?.french ? ['en', 'vn', 'fr'] : ['en', 'vn'];
  return isEnFr(unit) && langs.includes('fr') ? langs.filter((l) => l !== 'vn') : langs;
}

/** An English / French unit: `meta.vietnamese: false` — it has no Vietnamese. */
export const isEnFr = (unit) => unit?.meta?.vietnamese === false;

/**
 * The translations a screen can show BESIDE the English (Short Answers,
 * Reading, Diagrams, the word card): every language offered but English.
 */
export const besideLangs = (langs) => resolveLangs(langs).filter((l) => l !== 'en');

/**
 * The languages a task screen offers when its host passed `langs` — or, from a
 * host that predates French, only `bilingual` (false → English alone).
 */
export function resolveLangs(langs, bilingual = true) {
  if (Array.isArray(langs) && langs.length) return langs;
  return bilingual === false ? ['en'] : ['en', 'vn'];
}

/** The language after `lang` in `langs`, wrapping round — the TopBar toggle. */
export function nextLang(langs, lang) {
  const i = langs.indexOf(lang);
  return langs[(i + 1) % langs.length] || 'en';
}

/** Choose one of three strings for `lang`, falling back to English. */
export function tr(lang, en, vn, fr) {
  if (lang === 'vn') return vn ?? en;
  if (lang === 'fr') return fr ?? en;
  return en;
}

/** The French twin's key for a Vietnamese key: `textVn` → `textFr`, `vnDef` → `frDef`. */
export function frKeyOf(vnKey) {
  if (/Vn$/.test(vnKey)) return vnKey.replace(/Vn$/, 'Fr');
  if (/^vn(?=[A-Z]|$)/.test(vnKey)) return vnKey.replace(/^vn/, 'fr');
  return null;
}

/**
 * The `key` field of `obj` in `lang` — `obj.keyVn` / `obj.keyFr`, else `obj.key`.
 * For a prefix-style twin pass the Vietnamese key as well:
 * `field(word, 'def', lang, 'vnDef')` reads `vnDef` / `frDef`.
 */
export function field(obj, key, lang, vnKey = `${key}Vn`) {
  if (!obj) return undefined;
  return tr(lang, obj[key], obj[vnKey], obj[frKeyOf(vnKey)]);
}

/** A `{ en, vn, fr }` table's entry for `lang`, English when it has none. */
export function pickTable(table, lang) {
  return (table && (table[lang] ?? table.en)) || undefined;
}
