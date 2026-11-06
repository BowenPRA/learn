import { useState } from 'react';
import { resolveLangs, nextLang } from '../utils/lang';

/**
 * A task screen's language: opens in the first language offered — English,
 * from every real host — and the TopBar toggle steps through the rest
 * (EN → VN → FR → EN on Year 7). A preview harness can open a screen in French
 * by passing `['fr', 'en', 'vn']`.
 *
 * `langs` comes from the host (YearDashboard passes `langsOf(track, unit)` to every
 * task); a screen mounted by an older harness may only have `bilingual`.
 * `toggleLang` is undefined when there is nothing to switch to, which is what
 * TopBar's `onLangToggle` reads to leave the button out.
 */
export default function useLang({ langs, bilingual } = {}) {
  const offered = resolveLangs(langs, bilingual);
  const [lang, setLang] = useState(offered[0]);
  const toggleLang = offered.length > 1 ? () => setLang((l) => nextLang(offered, l)) : undefined;
  return { lang, setLang, langs: offered, toggleLang };
}
