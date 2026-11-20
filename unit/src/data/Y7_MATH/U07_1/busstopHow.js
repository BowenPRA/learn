// unit/src/data/Y7_MATH/U07_1/busstopHow.js
// The picture on the notes' "How to Divide on the Bus Stop" slide (Bowen, 20 November
// 2026: "give instructions how to do the division towards the end"): 3 ÷ 4 = 0.75
// finished, the short way, with an orange 1 to 5 beside the part each step makes.
// No words, so it reads the same in English and French. In the classroom deck's
// picture language (classroom/content/y7-math/U07_1a/diagrams.js): a white plate,
// ink for the sum, orange for what the steps point at. Every <text> is literal.
//
//          0 . 7  5
//        ┌─────────
//      4 │ 3 . ³0 ²0

const INK = '#2b2b2b';
const KEY = '#c25e12';
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";

const marker = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="19" fill="${KEY}"/>`;

export const BUSSTOP_HOW = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340" class="w-full h-full">
    <rect x="0" y="0" width="600" height="340" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="598.5" height="338.5" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>

    <text x="186" y="140" font-family="${FONT}" font-size="64" font-weight="900" fill="${INK}" text-anchor="middle">0</text>
    <text x="240" y="140" font-family="${FONT}" font-size="64" font-weight="900" fill="${KEY}" text-anchor="middle">.</text>
    <text x="364" y="140" font-family="${FONT}" font-size="64" font-weight="900" fill="${INK}" text-anchor="middle">7</text>
    <text x="490" y="140" font-family="${FONT}" font-size="64" font-weight="900" fill="${INK}" text-anchor="middle">5</text>

    <path d="M 122 282 Q 140 224 122 164 L 530 164" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="82" y="256" font-family="${FONT}" font-size="64" font-weight="900" fill="${INK}" text-anchor="middle">4</text>

    <text x="186" y="256" font-family="${FONT}" font-size="64" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
    <text x="240" y="256" font-family="${FONT}" font-size="64" font-weight="900" fill="${KEY}" text-anchor="middle">.</text>
    <text x="364" y="256" font-family="${FONT}" font-size="64" font-weight="900" fill="${KEY}" text-anchor="middle">0</text>
    <text x="334" y="214" font-family="${FONT}" font-size="34" font-weight="900" fill="${KEY}" text-anchor="middle">3</text>
    <text x="490" y="256" font-family="${FONT}" font-size="64" font-weight="900" fill="${KEY}" text-anchor="middle">0</text>
    <text x="460" y="214" font-family="${FONT}" font-size="34" font-weight="900" fill="${KEY}" text-anchor="middle">2</text>

    <line x1="240" y1="230" x2="240" y2="154" stroke="${KEY}" stroke-width="4" stroke-dasharray="8 7" stroke-linecap="round"/>

    ${marker(186, 54)}
    <text x="186" y="62" font-family="${FONT}" font-size="24" font-weight="900" fill="#ffffff" text-anchor="middle">1</text>
    ${marker(302, 302)}
    <text x="302" y="310" font-family="${FONT}" font-size="24" font-weight="900" fill="#ffffff" text-anchor="middle">2</text>
    ${marker(296, 202)}
    <text x="296" y="210" font-family="${FONT}" font-size="24" font-weight="900" fill="#ffffff" text-anchor="middle">3</text>
    ${marker(240, 54)}
    <text x="240" y="62" font-family="${FONT}" font-size="24" font-weight="900" fill="#ffffff" text-anchor="middle">4</text>
    ${marker(556, 236)}
    <text x="556" y="244" font-family="${FONT}" font-size="24" font-weight="900" fill="#ffffff" text-anchor="middle">5</text>
  </svg>`;
