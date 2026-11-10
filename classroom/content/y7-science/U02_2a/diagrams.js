// content/y7-science/U02_2a/diagrams.js
// Teaching diagrams for 2.2a Changes of state — same house style as 2.1a and
// Unit 1: flat line art on paper-white, thin ink outlines, pale flat fills, key
// words in the Learner's Book orange, and label <text> written out literally so
// `npm run audit:svg` can measure it.
//
// THE THREE STATES KEEP THE SAME THREE COLOURS as 2.1a and 2.1b: stone-brown is
// a solid, water-blue is a liquid, pale violet is a gas. A student who learned
// "violet means gas" in 2.1 should not have to relearn it here.
//
// One colour rule this deck adds: the CHANGE words are coloured by direction, not
// by state — the changes you get by HEATING (melting, boiling, evaporating) are
// warm red, and the changes you get by COOLING (freezing, condensing) are cool
// blue. That colouring is the argument the diagram is making, so it earns its
// place; it is not decoration.

const INK = '#2b2b2b'
const KEY = '#c25e12' // the book's key-word orange
const RULE = '#b6c1c9'
const TINT = '#f3f6f8'
const WARM = '#c8102e' // heating: melt / boil / evaporate
const COOL = '#1a5fa8' // cooling: freeze / condense

const SOLID_F = '#ded7c6', SOLID_S = '#8a7f68'
const LIQ_F = '#bfe0f2', LIQ_S = '#2f7fb0'
const GAS_F = '#ece1f6', GAS_S = '#8b6bb1'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const rule = (x1, x2, y) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${RULE}" stroke-width="1.6"/>`
const vrule = (x, y1, y2) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${RULE}" stroke-width="1.6"/>`

/** A straight arrow pointing right, ending in a fixed-size solid head. */
const arrowR = (x1, x2, y, c) => `<line x1="${x1}" y1="${y}" x2="${x2 - 11}" y2="${y}" stroke="${c}" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M ${x2} ${y} l -13 -8 l 0 16 z" fill="${c}"/>`
/** A straight arrow pointing left (x2 < x1). */
const arrowL = (x1, x2, y, c) => `<line x1="${x1}" y1="${y}" x2="${x2 + 11}" y2="${y}" stroke="${c}" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M ${x2} ${y} l 13 -8 l 0 16 z" fill="${c}"/>`

export const DIAGRAMS = {
  // ───────────────────────────────────────────────────────────────────────────
  // THE DRAW THIS. The p.36 "changing state" cycle, redrawn as three labelled
  // boxes with the change words on the arrows between them. Solid ⇄ liquid ⇄ gas,
  // heating to the right, cooling to the left. This is the reference diagram for
  // the whole section, so it is the one thing the class rules into the notebook.
  // ───────────────────────────────────────────────────────────────────────────
  STATE_CYCLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 470" class="w-full h-full">
    ${plate(900, 470)}

    <text x="450" y="46" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">The three states, and the words for changing between them</text>

    <rect x="40" y="150" width="210" height="140" rx="12" fill="${SOLID_F}" stroke="${SOLID_S}" stroke-width="2.4"/>
    <rect x="345" y="150" width="210" height="140" rx="12" fill="${LIQ_F}" stroke="${LIQ_S}" stroke-width="2.4"/>
    <rect x="650" y="150" width="210" height="140" rx="12" fill="${GAS_F}" stroke="${GAS_S}" stroke-width="2.4"/>

    <text x="145" y="212" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Solid</text>
    <text x="450" y="212" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Liquid</text>
    <text x="755" y="212" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Gas</text>

    <text x="145" y="252" font-family="${FONT}" font-size="17" fill="${INK}" text-anchor="middle">for example, ice</text>
    <text x="450" y="252" font-family="${FONT}" font-size="17" fill="${INK}" text-anchor="middle">for example, water</text>
    <text x="755" y="252" font-family="${FONT}" font-size="17" fill="${INK}" text-anchor="middle">for example, steam</text>

    ${arrowR(258, 337, 178, WARM)}
    ${arrowL(337, 258, 262, COOL)}
    ${arrowR(563, 642, 178, WARM)}
    ${arrowL(642, 563, 262, COOL)}

    <text x="297" y="166" font-family="${FONT}" font-size="17" font-weight="bold" fill="${WARM}" text-anchor="middle">melting</text>
    <text x="297" y="286" font-family="${FONT}" font-size="17" font-weight="bold" fill="${COOL}" text-anchor="middle">freezing</text>
    <text x="602" y="158" font-family="${FONT}" font-size="17" font-weight="bold" fill="${WARM}" text-anchor="middle">boiling</text>
    <text x="602" y="176" font-family="${FONT}" font-size="15" font-weight="bold" fill="${WARM}" text-anchor="middle">evaporating</text>
    <text x="602" y="286" font-family="${FONT}" font-size="17" font-weight="bold" fill="${COOL}" text-anchor="middle">condensing</text>

    <rect x="150" y="356" width="26" height="16" rx="3" fill="${WARM}"/>
    <text x="186" y="369" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}">heating — the changes to the right</text>
    <rect x="150" y="392" width="26" height="16" rx="3" fill="${COOL}"/>
    <text x="186" y="405" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}">cooling — the changes back to the left</text>

    <text x="450" y="446" font-family="${FONT}" font-size="16" fill="${KEY}" text-anchor="middle">Every one of these five words is a change of state.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The English spine of the lesson, as a reference table (NOT a Draw This — the
  // class copies the shorter list in the write panel beside it). Every change of
  // state has a DOING word (a verb) and a NAMING word (a noun), and Vietnamese
  // does not split them the same way, so this is the thing that actually needs
  // teaching. The "point" column is the temperature word that goes with two of
  // them.
  // ───────────────────────────────────────────────────────────────────────────
  VERB_NOUN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 400" class="w-full h-full">
    ${plate(820, 400)}

    <rect x="30" y="34" width="250" height="52" fill="${TINT}" stroke="${RULE}" stroke-width="1.6"/>
    <rect x="280" y="34" width="270" height="52" fill="${TINT}" stroke="${RULE}" stroke-width="1.6"/>
    <rect x="550" y="34" width="240" height="52" fill="${TINT}" stroke="${RULE}" stroke-width="1.6"/>

    <text x="155" y="66" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">The change</text>
    <text x="415" y="59" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Doing word</text>
    <text x="415" y="78" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">(a verb)</text>
    <text x="670" y="59" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Naming word</text>
    <text x="670" y="78" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">(a noun)</text>

    ${rule(30, 790, 86)}
    ${rule(30, 790, 148)}
    ${rule(30, 790, 210)}
    ${rule(30, 790, 272)}
    ${rule(30, 790, 334)}
    ${rule(30, 790, 372)}
    ${vrule(280, 34, 372)}
    ${vrule(550, 34, 372)}
    ${vrule(30, 34, 372)}
    ${vrule(790, 34, 372)}

    <text x="42" y="124" font-family="${FONT}" font-size="16" fill="${INK}">solid → liquid</text>
    <text x="292" y="124" font-family="${FONT}" font-size="16" font-weight="bold" fill="${WARM}">melt</text>
    <text x="562" y="124" font-family="${FONT}" font-size="16" fill="${INK}">melting (melting point)</text>

    <text x="42" y="186" font-family="${FONT}" font-size="16" fill="${INK}">liquid → solid</text>
    <text x="292" y="186" font-family="${FONT}" font-size="16" font-weight="bold" fill="${COOL}">freeze</text>
    <text x="562" y="186" font-family="${FONT}" font-size="16" fill="${INK}">freezing</text>

    <text x="42" y="248" font-family="${FONT}" font-size="16" fill="${INK}">liquid → gas (fast)</text>
    <text x="292" y="248" font-family="${FONT}" font-size="16" font-weight="bold" fill="${WARM}">boil</text>
    <text x="562" y="248" font-family="${FONT}" font-size="16" fill="${INK}">boiling (boiling point)</text>

    <text x="42" y="310" font-family="${FONT}" font-size="16" fill="${INK}">liquid → gas (slow)</text>
    <text x="292" y="310" font-family="${FONT}" font-size="16" font-weight="bold" fill="${WARM}">evaporate</text>
    <text x="562" y="310" font-family="${FONT}" font-size="16" fill="${INK}">evaporation</text>

    <text x="42" y="360" font-family="${FONT}" font-size="16" fill="${INK}">gas → liquid</text>
    <text x="292" y="360" font-family="${FONT}" font-size="16" font-weight="bold" fill="${COOL}">condense</text>
    <text x="562" y="360" font-family="${FONT}" font-size="16" fill="${INK}">condensation</text>
  </svg>`,
}
