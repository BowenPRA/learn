// content/y7-science/U00_1/diagrams.js
// Teaching diagrams for Day One, drawn in the same house style as the Unit 1
// figures: flat line art on a white plate, thin dark ink outlines, pale flat
// fills, and labels set in the book's orange out in the margin on a hairline
// leader line.
//
// These two are procedural, not scientific: they show a student exactly what
// the finished binder and the taped Learner's Book must look like, so "put in
// three sleeves" stops being an instruction and becomes a picture to copy.
//
// House rules (see docs/LESSON-PLAYBOOK.md §5):
//  · open with a white plate so the artwork reads on a light OR dark slide;
//  · write label <text> out literally so `npm run audit:svg` can measure it;
//  · labels live in the margins, never on top of the drawing.

const INK = '#2b2b2b'
const KEY = '#c25e12' // the book's key-word orange
const LEAD = '#7c8a95'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

// Sleeve colours — one per subject, matching the three course accents.
const MATH_F = '#dbeafe', MATH_S = '#1cb0f6'
const SCI_F = '#d9f2ef', SCI_S = '#14b8a6'
const ENG_F = '#ede4f7', ENG_S = '#5c2483'
const PAPER_F = '#ffffff', PAPER_S = '#94a3b8'
const BIND_F = '#e8edf2', BIND_S = '#64748b'
const TAPE_F = '#fdf1e3', TAPE_S = '#e0a55e'

export const DIAGRAMS = {
  // ─────────────────────────────────────────────────────────────────────────
  // The finished binder: an open ring binder with the expectation letter at
  // the front and three labelled subject sleeves behind it. This is the
  // target students are copying while they build theirs.
  // ─────────────────────────────────────────────────────────────────────────
  BINDER_SETUP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 340" class="w-full h-full">
    <rect x="0" y="0" width="700" height="340" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="698.5" height="338.5" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>

    <rect x="150" y="60" width="330" height="240" rx="8" fill="${BIND_F}" stroke="${BIND_S}" stroke-width="2.5"/>
    <line x1="176" y1="60" x2="176" y2="300" stroke="${BIND_S}" stroke-width="2"/>
    <circle cx="163" cy="118" r="9" fill="none" stroke="${BIND_S}" stroke-width="2.5"/>
    <circle cx="163" cy="180" r="9" fill="none" stroke="${BIND_S}" stroke-width="2.5"/>
    <circle cx="163" cy="242" r="9" fill="none" stroke="${BIND_S}" stroke-width="2.5"/>

    <rect x="196" y="74" width="266" height="46" rx="4" fill="${PAPER_F}" stroke="${PAPER_S}" stroke-width="2"/>
    <line x1="212" y1="90" x2="380" y2="90" stroke="${PAPER_S}" stroke-width="2"/>
    <line x1="212" y1="104" x2="430" y2="104" stroke="${PAPER_S}" stroke-width="2"/>

    <rect x="196" y="132" width="266" height="46" rx="4" fill="${MATH_F}" stroke="${MATH_S}" stroke-width="2.5"/>
    <rect x="196" y="190" width="266" height="46" rx="4" fill="${SCI_F}" stroke="${SCI_S}" stroke-width="2.5"/>
    <rect x="196" y="248" width="266" height="46" rx="4" fill="${ENG_F}" stroke="${ENG_S}" stroke-width="2.5"/>

    <text x="216" y="161" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="start">Math</text>
    <text x="216" y="219" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="start">Science</text>
    <text x="216" y="277" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="start">English</text>

    <line x1="196" y1="97" x2="120" y2="76" stroke="${LEAD}" stroke-width="1.6"/>
    <circle cx="196" cy="97" r="3.2" fill="${LEAD}"/>
    <text x="16" y="62" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="start">letter</text>
    <text x="16" y="80" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="start">at the front</text>

    <line x1="462" y1="155" x2="560" y2="132" stroke="${LEAD}" stroke-width="1.6"/>
    <circle cx="462" cy="155" r="3.2" fill="${LEAD}"/>
    <text x="570" y="126" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="start">three</text>
    <text x="570" y="144" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="start">sleeves</text>

    <line x1="300" y1="60" x2="300" y2="34" stroke="${LEAD}" stroke-width="1.6"/>
    <circle cx="300" cy="60" r="3.2" fill="${LEAD}"/>
    <text x="300" y="26" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">your name on the cover</text>

    <text x="350" y="326" font-family="${FONT}" font-size="14" font-weight="normal" fill="${LEAD}" text-anchor="middle">one binder, one folder, three sleeves</text>
  </svg>`,

  // ─────────────────────────────────────────────────────────────────────────
  // The taped Learner's Book: where the tape goes, and what is written on it.
  // Drawn big because the whole instruction is "this, exactly here".
  // ─────────────────────────────────────────────────────────────────────────
  BOOK_TAPE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 320" class="w-full h-full">
    <rect x="0" y="0" width="640" height="320" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="638.5" height="318.5" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>

    <rect x="190" y="52" width="250" height="230" rx="8" fill="${SCI_F}" stroke="${SCI_S}" stroke-width="3"/>
    <rect x="190" y="52" width="24" height="230" rx="8" fill="${SCI_S}" opacity="0.35"/>
    <rect x="236" y="80" width="180" height="70" rx="5" fill="${PAPER_F}" stroke="${PAPER_S}" stroke-width="2"/>
    <line x1="252" y1="104" x2="392" y2="104" stroke="${PAPER_S}" stroke-width="2.5"/>
    <line x1="252" y1="126" x2="352" y2="126" stroke="${PAPER_S}" stroke-width="2.5"/>

    <rect x="236" y="196" width="180" height="52" rx="4" fill="${TAPE_F}" stroke="${TAPE_S}" stroke-width="2.5"/>
    <text x="326" y="228" font-family="${FONT}" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">Mr Bowen</text>

    <line x1="236" y1="222" x2="176" y2="200" stroke="${LEAD}" stroke-width="1.6"/>
    <circle cx="236" cy="222" r="3.2" fill="${LEAD}"/>
    <text x="14" y="192" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="start">one strip of tape</text>
    <text x="14" y="212" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="start">your full name on it</text>

    <line x1="416" y1="115" x2="512" y2="92" stroke="${LEAD}" stroke-width="1.6"/>
    <circle cx="416" cy="115" r="3.2" fill="${LEAD}"/>
    <text x="522" y="86" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="start">the front</text>
    <text x="522" y="104" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="start">cover</text>

    <text x="320" y="300" font-family="${FONT}" font-size="14" font-weight="normal" fill="${LEAD}" text-anchor="middle">tape goes on the cover, never on a page</text>
  </svg>`,
}
