// content/y7-math/T02_girl-math/diagrams.js
// Three bar models, and they are the whole of the teaching in this task.
//
// House rules (docs/LESSON-PLAYBOOK.md §5): white plate first so the artwork
// reads on a light OR dark slide; dark ink outlines with flat pale fills; every
// <text> written out literally, because `npm run audit:svg` cannot see text
// produced by a `${helper(...)}` call and will silently check nothing.
//
// THE BOX IS THE EXPRESSION. Each drawing names one box **n** and then writes
// every share in terms of it — n, 2n, n + 3 — before adding them up and solving.
// That is deliberate: this class met expressions and substitution in 2.1 and
// 2.2, so 2n is a word they already own, and the picture is what stops n from
// being a symbol with no meaning. The chain of equations under each drawing is
// the SAME chain the game reveals after every round, so the slide and the game
// speak one language.
//
// The numbers on these three appear in no round of the game, so the worked
// example does not spend a round.
//
//   BAR_TWICE   twice as many — two boxes, so three boxes altogether
//   BAR_PLUS    3 more than — a box plus a loose 3 that comes off the total
//   BAR_THREE   both moves at once, three girls

const INK = '#2b2b2b'
const KEY = '#c25e12'
const BLUE = '#1a5fa8'
const GREEN = '#4a8b23'
const PURPLE = '#5c2483'
const GREEN_T = '#eef6e6'
const ORANGE_T = '#fdf1e3'
const BLUE_T = '#eef4fb'
const PURPLE_T = '#f2ecf7'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

export const DIAGRAMS = {
  // ───────────────────────────────────────────────────────────────────────────
  // The first move: "twice as many" means two boxes the same size as the one
  // box, so the total is cut into THREE equal boxes, not two. Naming the box n
  // turns the picture straight into n + 2n = 12.
  // ───────────────────────────────────────────────────────────────────────────
  BAR_TWICE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500" class="w-full h-full">
    ${plate(840, 500)}

    <text x="420" y="44" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">Carrot gets twice as many as Erica</text>
    <text x="420" y="80" font-family="${FONT}" font-size="21" font-weight="bold" fill="${BLUE}" text-anchor="middle">12 pieces altogether</text>

    <text x="196" y="150" font-family="${FONT}" font-size="23" font-weight="bold" fill="${INK}" text-anchor="end">Erica</text>
    <rect x="216" y="118" width="150" height="50" rx="8" fill="${BLUE_T}" stroke="${INK}" stroke-width="3"/>
    <text x="291" y="152" font-family="${FONT}" font-size="26" font-weight="bold" fill="${BLUE}" text-anchor="middle">n</text>
    <text x="560" y="152" font-family="${FONT}" font-size="26" font-weight="bold" fill="${BLUE}">= n</text>

    <text x="196" y="226" font-family="${FONT}" font-size="23" font-weight="bold" fill="${INK}" text-anchor="end">Carrot</text>
    <rect x="216" y="194" width="150" height="50" rx="8" fill="${ORANGE_T}" stroke="${INK}" stroke-width="3"/>
    <text x="291" y="228" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">n</text>
    <rect x="376" y="194" width="150" height="50" rx="8" fill="${ORANGE_T}" stroke="${INK}" stroke-width="3"/>
    <text x="451" y="228" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">n</text>
    <text x="560" y="228" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">= 2n</text>

    <text x="420" y="308" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">n + 2n = 12  →  3n = 12  →  n = 4</text>

    <rect x="140" y="350" width="560" height="76" rx="14" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="420" y="398" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Erica gets 4. Carrot gets 8.</text>

    <text x="420" y="466" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">Three boxes, not two.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The second move. A class that has only met "twice as many" tries to share
  // 15 between 2 and gets stuck on the half. The loose 3 comes off the total
  // first, and goes back on at the end.
  // ───────────────────────────────────────────────────────────────────────────
  BAR_PLUS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500" class="w-full h-full">
    ${plate(840, 500)}

    <text x="420" y="44" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">Nam gets 3 more than Su</text>
    <text x="420" y="80" font-family="${FONT}" font-size="21" font-weight="bold" fill="${BLUE}" text-anchor="middle">15 pieces altogether</text>

    <text x="196" y="150" font-family="${FONT}" font-size="23" font-weight="bold" fill="${INK}" text-anchor="end">Su</text>
    <rect x="216" y="118" width="170" height="50" rx="8" fill="${PURPLE_T}" stroke="${INK}" stroke-width="3"/>
    <text x="301" y="152" font-family="${FONT}" font-size="26" font-weight="bold" fill="${PURPLE}" text-anchor="middle">n</text>
    <text x="560" y="152" font-family="${FONT}" font-size="26" font-weight="bold" fill="${PURPLE}">= n</text>

    <text x="196" y="226" font-family="${FONT}" font-size="23" font-weight="bold" fill="${INK}" text-anchor="end">Nam</text>
    <rect x="216" y="194" width="170" height="50" rx="8" fill="${BLUE_T}" stroke="${INK}" stroke-width="3"/>
    <text x="301" y="228" font-family="${FONT}" font-size="26" font-weight="bold" fill="${BLUE}" text-anchor="middle">n</text>
    <rect x="396" y="194" width="86" height="50" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3" stroke-dasharray="8 6"/>
    <text x="439" y="228" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">3</text>
    <text x="560" y="228" font-family="${FONT}" font-size="26" font-weight="bold" fill="${BLUE}">= n + 3</text>

    <text x="420" y="302" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">n + (n + 3) = 15  →  2n + 3 = 15</text>
    <text x="420" y="344" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">2n = 12  →  n = 6</text>

    <rect x="140" y="376" width="560" height="72" rx="14" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="420" y="422" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Su gets 6. Nam gets 9.</text>

    <text x="420" y="478" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">Take the loose 3 off the total first.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Both moves at once, which is every round from the fourth onwards. None of
  // these numbers appears in the game.
  // ───────────────────────────────────────────────────────────────────────────
  BAR_THREE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 540" class="w-full h-full">
    ${plate(840, 540)}

    <text x="420" y="42" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">Three girls, 26 pieces</text>
    <text x="420" y="76" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Tess gets twice as many as Su. Ana gets 2 more than Su.</text>

    <text x="186" y="138" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="end">Su</text>
    <rect x="206" y="108" width="140" height="46" rx="8" fill="${PURPLE_T}" stroke="${INK}" stroke-width="3"/>
    <text x="276" y="140" font-family="${FONT}" font-size="24" font-weight="bold" fill="${PURPLE}" text-anchor="middle">n</text>
    <text x="576" y="140" font-family="${FONT}" font-size="24" font-weight="bold" fill="${PURPLE}">= n</text>

    <text x="186" y="212" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="end">Tess</text>
    <rect x="206" y="182" width="140" height="46" rx="8" fill="${GREEN_T}" stroke="${INK}" stroke-width="3"/>
    <text x="276" y="214" font-family="${FONT}" font-size="24" font-weight="bold" fill="${GREEN}" text-anchor="middle">n</text>
    <rect x="356" y="182" width="140" height="46" rx="8" fill="${GREEN_T}" stroke="${INK}" stroke-width="3"/>
    <text x="426" y="214" font-family="${FONT}" font-size="24" font-weight="bold" fill="${GREEN}" text-anchor="middle">n</text>
    <text x="576" y="214" font-family="${FONT}" font-size="24" font-weight="bold" fill="${GREEN}">= 2n</text>

    <text x="186" y="286" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="end">Ana</text>
    <rect x="206" y="256" width="140" height="46" rx="8" fill="${BLUE_T}" stroke="${INK}" stroke-width="3"/>
    <text x="276" y="288" font-family="${FONT}" font-size="24" font-weight="bold" fill="${BLUE}" text-anchor="middle">n</text>
    <rect x="356" y="256" width="70" height="46" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3" stroke-dasharray="8 6"/>
    <text x="391" y="288" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">2</text>
    <text x="576" y="288" font-family="${FONT}" font-size="24" font-weight="bold" fill="${BLUE}">= n + 2</text>

    <text x="420" y="356" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="middle">n + 2n + (n + 2) = 26  →  4n + 2 = 26</text>
    <text x="420" y="398" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="middle">4n = 24  →  n = 6</text>

    <rect x="70" y="430" width="700" height="70" rx="14" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="420" y="474" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Su 6 · Tess 12 · Ana 8 · and 6 + 12 + 8 = 26</text>
  </svg>`,
}
