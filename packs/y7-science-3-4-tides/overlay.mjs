// Overlay for Mr. Bowen's Year 7 Science lesson "3.4 Tides" (classroom
// content/y7-science/U03_4). Read by scripts/deck-to-pack.mjs:
//   CDP_PORT=9521 node scripts/deck-to-pack.mjs C:/Users/sbowe/code/wt-learn-y7/content/y7-science/U03_4 \
//        --overlay packs/y7-science-3-4-tides/overlay.mjs --server http://localhost:5213/classroom/
//
// Slide numbers are the deck's (1-24). All 24 slides are kept, in the teaching order.
//
// THE CHECKS (10): on the slides where the class was asked something: the starter's
// answer (4), tidal range (7), the deepest-water question (8), the boat story (9), the
// two votes (11, 17), the far-side harbour (15, the game's trap round), 50 minutes later
// (16), Line Them Up (19) and the exit question (24). The answers are the deck's reveals
// and plan.js's answer list. The wrong options are the slips plan.js names: 7.0 m (the
// whole range added), one bulge on the Moon's side only, low tide on the far side, the
// same time tomorrow, the Sun's stronger pull, the half moon.
//
// THE WIDGETS. The first states mean little alone (one dot on a graph, one panel and
// three "?", an empty month), so each still is a LATER state, captured with headless
// Chrome from the classroom app (scratch script stills-tides.mjs) and kept in stills/:
//   3  HarbourClock  the whole day: 6, 4, 2, 4, 6, 4, 2, 4, 6 m and the curve.
//   5  TideFilm      a video, so no drawing: its first and last frames side by side.
//   9  BoatStory     all four panels, laid out 2 x 2 so the captions stay readable.
//   13 SpinEarth     two steps on: 6 p.m., the harbour on the far side, high tide.
//   19 LineThemUp    the whole month played, then back to day 15 (full moon).
//   15 HighOrLow     a standing game ("Arms up", "Wrong? Sit down"), so no still: a
//                    hand-drawn Earth with the harbour on the far side and a check.
// A still with a check uses widget: 'check'; one without (3, 5, 13) uses
// widget: 'drop' with the still as patch.image, so the log has no "check missing" line.
//
// ROOM WORDS cleared: "press" (3, 13), "whiteboards" (8, 16), the three students (12),
// the standing game (15). Book references cleared: "Question 6", "page 98/99/100".
//
// PRACTICE: one part, 12 new items (4 focus, 4 practice, 4 challenge) on the lesson's
// two skills with numbers: reading depths and times (tidal range, the deepest and
// shallowest water from an average, 6 hours to low tide, 12 hours to high tide, 50
// minutes later each day) and using the model (where the harbour is, which days have
// the biggest tides). Pip's harbour and every number are made up.
import { fileURLToPath } from 'node:url'

const still = (f) => 'asset-file:' + fileURLToPath(new URL(`./stills/${f}`, import.meta.url))

// ------------------------------------------------------------------ an Earth figure
// The Earth from above the North Pole, the Moon on the right, the harbour as a red dot.
// deg: where the harbour is (0 = facing the Moon, 90 = top, 180 = far side).
// Labels 24-26 in a 600-wide drawing stay above 12 px on a 390 px phone.
function earthFig({ deg, lx, ly, anchor = 'middle', title }) {
  const cx = 220, cy = 160, r = 100
  const a = (deg * Math.PI) / 180
  const hx = Math.round(cx + r * Math.cos(a)), hy = Math.round(cy - r * Math.sin(a))
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" role="img" aria-label="${title}">
<rect x="0" y="0" width="600" height="320" rx="16" fill="#ffffff"/>
<circle cx="${cx}" cy="${cy}" r="${r}" fill="#a8d18d" stroke="#2b2b2b" stroke-width="4"/>
<path d="M175 105 q20 -15 35 5 q-10 25 -30 15 z M240 190 q25 -5 30 20 q-20 15 -35 -5 z M160 185 q15 10 5 30 q-20 -5 -5 -30 z" fill="#7fb36a"/>
<circle cx="${cx}" cy="${cy}" r="5" fill="#2b2b2b"/>
<circle cx="500" cy="${cy}" r="36" fill="#d9dde3" stroke="#2b2b2b" stroke-width="4"/>
<circle cx="490" cy="${cy - 10}" r="7" fill="#bcc3cc"/><circle cx="510" cy="${cy + 10}" r="9" fill="#bcc3cc"/>
<text x="500" y="${cy + 72}" font-family="Inter, Segoe UI, sans-serif" font-size="26" font-weight="800" fill="#2b2b2b" text-anchor="middle">Moon</text>
<circle cx="${hx}" cy="${hy}" r="17" fill="none" stroke="#d63b2f" stroke-width="4" opacity="0.5"/>
<circle cx="${hx}" cy="${hy}" r="10" fill="#d63b2f" stroke="#ffffff" stroke-width="3"/>
<text x="${lx}" y="${ly}" font-family="Inter, Segoe UI, sans-serif" font-size="26" font-weight="800" fill="#b3261e" text-anchor="${anchor}">harbour</text>
<text x="590" y="308" font-family="Inter, Segoe UI, sans-serif" font-size="20" fill="#5b6770" text-anchor="end">not to scale</text>
</svg>`
}
const FAR_SIDE = earthFig({ deg: 180, lx: 70, ly: 118, title: 'The Earth with the harbour on the side away from the Moon' })
const TOP_SIDE = earthFig({ deg: 90, lx: 236, ly: 40, anchor: 'start', title: 'The Earth with the harbour at the top, at right angles to the Moon' })
const NEAR_SIDE = earthFig({ deg: 0, lx: 336, ly: 128, anchor: 'start', title: 'The Earth with the harbour facing the Moon' })

// ------------------------------------------------------------------ review
const slides = {
  1: {
    patch: {
      subtitle: 'Go back through the lesson. Answer each question to go on.',
      card: { text: 'At the beach, the sea goes **up** and **down**. How many times a day is the water at its **highest**? **Guess a number.** Then go on.' },
    },
  },
  2: { patch: { title: 'In This Lesson You Will…' } },
  3: {
    widget: 'drop',
    alt: 'Mr Bowen’s harbour: a wall with a tide board and a boat on the water, and a graph of the water depth from 6 a.m. to 6 a.m. the next morning. The dots go 6, 4, 2, 4, 6, 4, 2, 4, 6 metres, joined by a wavy line. A box says: High to high: 12 hours.',
    patch: {
      eyebrow: 'One day',
      image: still('s03-harbour-day.png'),
      caption: 'The depth every **3 hours**: 6, 4, 2, 4, 6, 4, 2, 4, 6 m. The tide **goes out**, then it **comes in**.',
    },
  },
  4: {
    check: {
      q: 'Mr Bowen’s harbour: how many times a day is the water at **high tide**?',
      options: ['Once', '*Twice', 'Four times'],
      exp: 'Twice: at 6 a.m. and at 6 p.m. Low tide is twice too: at 12 noon and at midnight. High to low takes **6 hours**. High to high takes **12 hours**.',
    },
  },
  5: {
    widget: 'drop',
    alt: 'Two photos of the road to Holy Island, England, from a car. Left: the road is dry, with mud and weed beside it. Right, later the same day: the sea covers the road and the mud.',
    patch: {
      image: still('s05-holy-island.png'),
      content: '**high tide** · **low tide** · the **depth**\n\nThe two photos are from a film of one afternoon.',
    },
  },
  6: {
    alt: 'Two photos of the same harbour in the Bay of Fundy, Canada. High tide: the fishing boats float on deep water. Low tide, 6 hours later: the same boats sit on the mud.',
    patch: {
      eyebrow: 'Real photos',
      caption: 'The Bay of Fundy, Canada: the **biggest** tides in the world. At low tide the boats sit on the mud. The **depth** of the water changed.',
    },
  },
  7: {
    check: {
      q: 'What is the **tidal range**?',
      options: [
        '*The difference in depth between high tide and low tide',
        'The depth of the water at high tide',
        'The time from high tide to low tide',
      ],
      exp: 'The tidal range is a **difference**: high tide depth − low tide depth. At Mr Bowen’s harbour: 6 m − 2 m = 4 m. It is not the depth at high tide (6 m), and it is not a time.',
    },
  },
  8: {
    patch: { eyebrow: 'Think' },
    check: {
      q: 'The average depth of the water is **5.0 m**. The tidal range is **2.0 m**. What is the **maximum** depth?',
      options: ['7.0 m', '*6.0 m', '3.0 m'],
      exp: 'The range is shared: the water goes **1.0 m above** the average and 1.0 m below. Maximum: 5.0 + 1.0 = 6.0 m. 7.0 m adds the whole range to the average.',
    },
  },
  9: {
    widget: 'check',
    alt: 'A story in four pictures. 1: 6 a.m. Mr Bowen ties up his boat. Very tight. 2: 12 noon. He comes back. His boat is hanging from the wall. 3: He climbs down to look and falls asleep on the mud. 4: 6 p.m. The sea comes back. He is now very wet.',
    patch: {
      eyebrow: 'A story',
      image: still('s09-boat-strip.png'),
      caption: 'Read the four pictures. Where does the sea go? And why does it come back? The next slides tell you.',
    },
    check: {
      q: 'At 6 a.m. it is high tide. Mr Bowen ties his boat to the wall with a short rope. Why is the boat hanging from the wall at 12 noon?',
      options: [
        '*It is low tide: the water is much lower',
        'It is high tide: the water pushed the boat up',
        'The tide is coming in',
      ],
      exp: 'From high tide to low tide takes about **6 hours**. 6 a.m. + 6 hours = 12 noon: low tide. The water went down, but the short rope did not. Sailors tie up with a **long** rope.',
    },
  },
  11: {
    check: {
      merge: true,
      q: 'The Moon pulls the oceans. How many **high tides** does the Earth have **at the same time**?',
      exp: '**Two:** one on the side facing the Moon and one on the **far side**. The Moon pulls the near side most. The far side is left behind. So the Earth is stretched, and the water bulges on both sides.',
    },
  },
  12: {
    patch: {
      eyebrow: 'Answer: B',
      notes: [{
        tone: 'info',
        badge: false,
        text: 'Think of three runners in a line, facing the Moon. The Moon pulls. The near one moves **3 steps**, the middle one **2 steps**, the far one **1 step**. Now they are further apart: **stretched**.',
      }],
    },
  },
  13: {
    widget: 'drop',
    alt: 'The Earth from above the North Pole, with the water stretched into two bulges: high tide on the side facing the Moon and on the far side, low tide at the top and bottom. Mr Bowen’s harbour (red) is on the far side. Time: 6:00 p.m. Water at the harbour: 6.0 m, HIGH TIDE. The graph goes from 6 m at 6 a.m. down to 2 m at 12 noon and back up to 6 m at 6 p.m.',
    patch: {
      image: still('s13-spin-6pm.png'),
      caption: 'At 6 a.m. the harbour faced the Moon: high tide. The Earth spins. At **6 p.m.** the harbour is on the **far side**: high tide again. The graph is the harbour’s graph.',
    },
  },
  14: {
    patch: {
      eyebrow: 'Draw this',
      content: 'Copy the drawing and its labels into your notebook: the Earth, seen from above the **North Pole**.',
    },
  },
  15: {
    widget: 'check',
    patch: {
      layout: 'split',
      ratio: 50,
      icon: 'Moon',
      eyebrowFr: null,
      inlineSvg: FAR_SIDE,
      caption: null,
      content: 'Look at the picture. Where is the harbour? Where is the Moon?\n\nIs it **high tide** or **low tide** at the harbour?',
    },
    check: {
      q: 'A harbour is on the side of the Earth **away from** the Moon. Is it high tide or low tide there?',
      options: [
        '*High tide: there is a bulge on the far side too',
        'Low tide: the Moon pulls the water to the other side',
        'No tide: the Moon’s pull does not reach it',
      ],
      exp: 'The Moon stretches the Earth, so the water bulges on **both** sides: facing the Moon and on the far side. Low tide is at right angles to the Moon (the top and the bottom of the picture).',
    },
  },
  16: {
    patch: { eyebrow: 'Think' },
    check: {
      q: 'High tide is at **6 a.m.** today. When is high tide **tomorrow**?',
      options: ['At 6 a.m. again', '*At about 6:50 a.m.', 'At about 5:10 a.m.'],
      exp: 'About **50 minutes later**. The Moon moves on a little every day. After one turn, the Earth must turn a little more to face the Moon again: 24 hours ÷ 29 ≈ 50 minutes.',
    },
  },
  17: {
    check: {
      merge: true,
      q: 'The Sun has the **strongest gravity** in the Solar System. Which makes **bigger** tides: the Sun or the Moon?',
      exp: '**The Moon.** The Sun **pulls** the Earth harder, but it is 390 times further away, so it **stretches** the Earth less. Tides come from the stretch.',
    },
  },
  19: {
    widget: 'check',
    alt: 'A model of one month. Left: the Sun far away on the right, the Earth with its water stretched into bulges, and the Moon on the far side of the Earth, all in a line. A green box says: Sun, Moon and Earth in a line: the BIGGEST tides! Right: full moon, day 14, tidal range 6.0 m, and a graph of the tidal range for the whole month: 6 m on day 0, 2 m near day 7, 6 m near day 15, 2 m near day 22, 6 m on day 29.',
    patch: {
      image: still('s19-month.png'),
      caption: 'The model played for a whole month. Every dot is one day’s **tidal range**. In the picture it is **day 15**: the Moon is on the far side of the Earth.',
    },
    check: {
      q: 'When are the tides **biggest**?',
      options: [
        '*At full moon and new moon',
        'At half moon',
        'Only at full moon',
      ],
      exp: 'The tides are biggest when the Sun, the Moon and the Earth are in a **line**: at **new moon** (day 0) and **full moon** (day 15). At half moon they are at right angles, and the range is only 2 m.',
    },
  },
  20: {
    alt: 'Four photos. Harbours: boats stuck on the sand at low tide. Coastal floods: St Mark’s Square in Venice, Italy, under water at a high tide with strong wind. Food: a black and white bird with an orange beak that eats shellfish at low tide. Electricity: a tidal power station in France, where moving water turns turbines.',
    patch: {
      eyebrow: 'Effects of tides',
      caption: 'Which one happened to Mr Bowen’s boat? **Harbours:** at low tide the water is not deep enough for boats.',
    },
  },
  24: {
    keepReveal: true,
    patch: {
      eyebrowFr: null,
      subtitle: 'It is a **full moon**. High tide is at **7 a.m.** When is the **next** high tide? Will the tides be **big** or **small**?',
      reveal: { label: 'Big or small?', answer: '**Big:** at full moon, the Sun, the Moon and the Earth are in a line.' },
    },
    check: {
      q: 'High tide is at **7 a.m.** When is the **next** high tide?',
      options: ['At about 1 p.m.', '*At about 7 p.m.', 'At 7 a.m. tomorrow'],
      exp: 'High to high takes about **12 hours**: 7 a.m. + 12 hours = 7 p.m. 1 p.m. is 6 hours later: that is low tide.',
    },
  },
}

// The French twins of every field patched above would keep the old words ("page 99",
// "ardoises", "Bras en haut"), so each patched field loses its …Fr twin (the portal
// shows English and Vietnamese only). The two vote eyebrows go the same way.
function dropFrTwins(patch) {
  for (const [k, v] of Object.entries({ ...patch })) {
    if (k.endsWith('Fr') || Array.isArray(v)) continue
    if (v && typeof v === 'object') dropFrTwins(v)
    else if (!(`${k}Fr` in patch)) patch[`${k}Fr`] = null
  }
}
for (const o of Object.values(slides)) if (o.patch) dropFrTwins(o.patch)
for (const n of [11, 17]) slides[n].patch = { eyebrowFr: null }
slides[11].check.options = ['One: only on the side facing the Moon', '*Two: on both sides']
slides[17].check.options = ['The Sun', '*The Moon']

// ------------------------------------------------------------------ practice
const opt =(id, text) => ({ id, text })
// One day at Pip's harbour (made-up numbers).
const DAY = {
  head: ['Time', 'Depth (m)'],
  caption: 'Pip’s harbour, one day',
  rows: [['3 a.m.', '5.0'], ['6 a.m.', '3.5'], ['9 a.m.', '2.0'], ['12 noon', '3.5'], ['3 p.m.', '5.0'], ['6 p.m.', '3.5'], ['9 p.m.', '2.0']],
}
const highLow = () => [opt('high', 'High tide'), opt('low', 'Low tide')]

const items = [
  // ---------------- focus
  {
    id: 'tf1', level: 'focus',
    prompt: 'Pip measures the depth of the water at the harbour every 3 hours. [[What is the tidal range?]]',
    table: DAY,
    steps: [
      {
        title: 'Find the depth at high tide',
        input: { type: 'number', before: 'High tide:', after: 'm', answer: '5' },
        hint: 'High tide is the deepest water. Find the biggest number.',
        slips: [{ value: '3.5', msg: '3.5 m is not the deepest. Find the biggest number in the table.' }],
      },
      {
        title: 'Find the depth at low tide',
        input: { type: 'number', before: 'Low tide:', after: 'm', answer: '2' },
        hint: 'Low tide is the shallowest water. Find the smallest number.',
      },
      {
        title: 'Subtract to find the range',
        input: { type: 'number', before: '<<5.0>> − <<2.0>> =', after: 'm', answer: '3' },
        line: 'Tidal range: 5.0 m − 2.0 m = @ m',
        hint: 'Tidal range = high tide depth − low tide depth.',
        why: 'The tidal range is the difference between high tide and low tide.',
        slips: [
          { value: '7', msg: '7 m adds the depths. The range is a difference: subtract.' },
          { value: '5', step: 1, msg: '5 m is the depth at high tide. Now take away the low tide depth.' },
        ],
      },
    ],
  },
  {
    id: 'tf2', level: 'focus',
    prompt: 'Look at Pip’s table. [[How many hours is it from one high tide to the next?]]',
    table: DAY,
    steps: [
      {
        title: 'When is the first high tide?',
        input: { type: 'choice', options: [opt('a', '3 a.m.'), opt('b', '9 a.m.'), opt('c', '12 noon')], answer: 'a' },
        line: 'First high tide: 3 a.m. (5.0 m).',
        hint: 'High tide is the deepest water: 5.0 m.',
        slips: [{ value: 'b', msg: '9 a.m. has the smallest depth, 2.0 m. That is low tide.' }],
      },
      {
        title: 'When is the next high tide?',
        input: { type: 'choice', options: [opt('a', '9 a.m.'), opt('b', '3 p.m.'), opt('c', '9 p.m.')], answer: 'b' },
        line: 'Next high tide: 3 p.m. (5.0 m).',
        hint: 'Find 5.0 m again, lower in the table.',
        slips: [{ value: 'a', msg: '9 a.m. is low tide (2.0 m). Find the next 5.0 m.' }],
      },
      {
        title: 'Count the hours between them',
        input: { type: 'number', before: 'From 3 a.m. to 3 p.m. is', after: 'hours', answer: '12' },
        line: 'High tide to high tide: @ hours.',
        hint: 'Count on from 3 a.m.: 6 a.m., 9 a.m., 12 noon, 3 p.m. Each row is 3 hours.',
        why: 'High to high is about 12 hours, so there are two high tides a day.',
        slips: [{ value: '6', msg: '6 hours is high tide to low tide. Count on to the next high tide.' }],
      },
    ],
  },
  {
    id: 'tf3', level: 'focus',
    prompt: 'The key words of the lesson. [[Choose the right meaning for each word.]]',
    steps: [
      {
        title: 'What is a tide?',
        input: { type: 'choice', options: [opt('a', 'The change in the depth of the sea during the day'), opt('b', 'A big wave in a storm'), opt('c', 'The wind on the sea')], answer: 'a' },
        line: 'Tide: the change in the depth of the sea during the day.',
        hint: 'Think of the road to Holy Island: dry, then under the sea.',
        slips: [{ value: 'b', msg: 'A wave comes and goes in seconds. A tide is a slow change in depth over hours.' }],
      },
      {
        title: 'What is low tide?',
        input: { type: 'choice', options: [opt('a', 'The deepest water'), opt('b', 'The shallowest water'), opt('c', 'The water coming in')], answer: 'b' },
        line: 'Low tide: the shallowest water.',
        hint: 'Low means the water is down.',
        slips: [{ value: 'a', msg: 'The deepest water is high tide. Low tide is the shallowest.' }],
      },
      {
        title: 'What is tidal force?',
        input: { type: 'choice', options: [opt('a', 'The pull of the wind on the oceans'), opt('b', 'The pull of the Moon’s gravity on the oceans'), opt('c', 'The spin of the Earth')], answer: 'b' },
        line: 'Tidal force: the pull of the Moon’s gravity on the oceans.',
        hint: 'What is pulling the sea? Something big in the sky.',
        why: 'The Moon’s gravity pulls the oceans into two bulges.',
        slips: [{ value: 'c', msg: 'The Earth spins through the bulges, but the pull comes from the Moon’s gravity.' }],
      },
    ],
  },
  {
    id: 'tf4', level: 'focus',
    prompt: 'This is the Earth from above the North Pole. The harbour is at the top. [[Is it high tide or low tide at the harbour?]]',
    inlineSvg: TOP_SIDE,
    steps: [
      {
        title: 'Where are the two bulges of water?',
        input: { type: 'choice', options: [opt('a', 'Facing the Moon and on the far side'), opt('b', 'Only on the side facing the Moon'), opt('c', 'At the top and the bottom')], answer: 'a' },
        line: 'The bulges: facing the Moon and on the far side.',
        hint: 'The Moon stretches the Earth along the line to the Moon.',
        slips: [{ value: 'b', msg: 'The far side is left behind, so there is a bulge there too.' }],
      },
      {
        title: 'Is the harbour in a bulge?',
        input: { type: 'choice', options: [opt('yes', 'Yes'), opt('no', 'No: it is at right angles to the Moon')], answer: 'no' },
        line: 'The harbour is at right angles to the Moon.',
        hint: 'Is the harbour on the line from the Earth to the Moon?',
      },
      {
        title: 'High tide or low tide?',
        input: { type: 'choice', options: highLow(), answer: 'low' },
        line: 'At the top: @.',
        hint: 'No bulge means the water is shallow.',
        why: 'High tide is in line with the Moon. Low tide is at right angles to it.',
        slips: [{ value: 'high', step: 1, msg: 'The bulges are on the line to the Moon. The top is at right angles: low tide.' }],
      },
    ],
  },
  // ---------------- practice
  {
    id: 'tp1', level: 'practice',
    prompt: 'At a harbour the average depth is {{7.0 m}}. The tidal range is {{3.0 m}}. [[What is the maximum depth?]]',
    steps: [
      {
        title: 'When is the water deepest?',
        input: { type: 'choice', options: highLow(), answer: 'high' },
        line: 'The maximum depth is at high tide.',
        hint: 'Maximum means the biggest depth.',
        slips: [{ value: 'low', msg: 'Low tide is the shallowest water. The maximum is at high tide.' }],
      },
      {
        key: true,
        title: 'How far above the average?',
        input: { type: 'number', before: 'Half of {{3.0}} =', after: 'm', answer: '1.5' },
        hint: 'The range is shared: half above the average, half below.',
        slips: [{ value: '3', msg: 'The water does not go the whole range above the average. Half is above, half is below.' }],
      },
      {
        title: 'Add it to the average',
        input: { type: 'number', before: '{{7.0}} + <<1.5>> =', after: 'm', answer: '8.5' },
        line: 'Maximum depth: 7.0 + 1.5 = @ m',
        hint: 'The maximum is above the average, so add.',
        why: 'Half the range above the average: 7.0 + 1.5 = 8.5 m.',
        slips: [
          { value: '10', step: 1, msg: '10 m adds the whole range. Only half of it is above the average.' },
          { value: '5.5', msg: '5.5 m is below the average: that is low tide. The maximum is 7.0 + 1.5.' },
        ],
      },
    ],
  },
  {
    id: 'tp2', level: 'practice',
    prompt: 'High tide at a harbour is at {{2 a.m.}} [[When is the next low tide?]]',
    steps: [
      {
        key: true,
        title: 'How long from high to low?',
        input: { type: 'number', before: 'High tide to low tide:', after: 'hours', answer: '6' },
        hint: 'High to high is 12 hours. Low tide comes halfway.',
        slips: [{ value: '12', msg: '12 hours is high tide to the next high tide. Low tide comes halfway.' }],
      },
      {
        title: 'Add the hours to 2 a.m.',
        input: { type: 'number', before: '2 + <<6>> =', answer: '8' },
        hint: 'Count on 6 hours from 2 a.m.',
      },
      {
        title: 'Choose the time',
        input: { type: 'choice', options: [opt('a', '8 a.m.'), opt('b', '2 p.m.'), opt('c', '3 a.m.')], answer: 'a' },
        line: 'Next low tide: about @.',
        hint: '2 a.m. + 6 hours.',
        why: 'A quarter turn of the Earth takes 6 hours: from high tide to low tide.',
        slips: [
          { value: 'b', step: 1, msg: '2 p.m. is 12 hours later: the next high tide.' },
          { value: 'c', step: 1, msg: 'One hour is too short. High to low takes about 6 hours.' },
        ],
      },
    ],
  },
  {
    id: 'tp3', level: 'practice',
    prompt: 'Today high tide is at {{9:00 a.m.}} [[When is high tide tomorrow morning?]]',
    steps: [
      {
        key: true,
        title: 'Same time, earlier or later?',
        input: { type: 'choice', options: [opt('same', 'At the same time'), opt('later', 'A little later'), opt('earlier', 'A little earlier')], answer: 'later' },
        line: 'Tomorrow high tide is a little later.',
        hint: 'The Moon moves on a little every day. The Earth must turn a little more.',
        slips: [{ value: 'same', msg: 'The Moon moves on every day, so the Earth must turn a little more to face it again.' }],
      },
      {
        title: 'How many minutes later?',
        input: { type: 'number', before: 'About', after: 'minutes later', answer: '50' },
        hint: '24 hours ÷ 29 days is about this many minutes.',
      },
      {
        title: 'Choose the time',
        input: { type: 'choice', options: [opt('a', '9:00 a.m.'), opt('b', '9:50 a.m.'), opt('c', '8:10 a.m.')], answer: 'b' },
        line: 'High tide tomorrow: about @.',
        hint: '9:00 a.m. + 50 minutes.',
        slips: [
          { value: 'a', step: 1, msg: '9:00 a.m. is the same time. High tide comes about 50 minutes later each day.' },
          { value: 'c', step: 1, msg: '8:10 a.m. is 50 minutes earlier. It comes later, not earlier.' },
        ],
      },
    ],
  },
  {
    id: 'tp4', level: 'practice',
    prompt: 'Pip writes the tidal range at the harbour once a week. [[On which days are the Sun, the Moon and the Earth in a line?]]',
    table: {
      head: ['Day', 'The Moon', 'Tidal range (m)'],
      caption: 'Pip’s harbour, one month',
      rows: [['Day 1', 'new moon', '5.6'], ['Day 8', 'half moon', '2.4'], ['Day 15', 'full moon', '5.8'], ['Day 22', 'half moon', '2.2']],
    },
    steps: [
      {
        title: 'Find the biggest tidal range',
        input: { type: 'number', before: 'Biggest:', after: 'm', answer: '5.8' },
        hint: 'Look down the last column for the biggest number.',
      },
      {
        key: true,
        title: 'Which days have big ranges?',
        input: { type: 'multi', options: [opt('d1', 'Day 1'), opt('d8', 'Day 8'), opt('d15', 'Day 15'), opt('d22', 'Day 22')], answer: ['d1', 'd15'] },
        line: 'Big ranges: day 1 (5.6 m) and day 15 (5.8 m).',
        hint: 'Two days have ranges over 5 m.',
        slips: [{ value: ['d15'], msg: 'Day 1 has a big range too: 5.6 m. There are two big days.' }],
      },
      {
        title: 'What is the Moon like then?',
        input: { type: 'choice', options: [opt('a', 'New moon and full moon'), opt('b', 'Half moon'), opt('c', 'Only full moon')], answer: 'a' },
        line: 'In a line: at @.',
        hint: 'Read the Moon column for day 1 and day 15.',
        why: 'The tides are biggest when the Sun, the Moon and the Earth are in a line: new moon and full moon.',
        slips: [
          { value: 'b', step: 2, msg: 'At half moon the ranges are small (2.4 m and 2.2 m). They are at right angles then.' },
          { value: 'c', step: 2, msg: 'Day 1 is a new moon, and its range is big too. New moon and full moon.' },
        ],
      },
    ],
  },
  // ---------------- challenge
  {
    id: 'tc1', level: 'challenge',
    prompt: 'At a river mouth the average depth is {{4.0 m}}. The tidal range is {{2.6 m}}. [[How deep is the water at low tide?]]',
    steps: [
      {
        title: 'How far below the average?',
        input: { type: 'number', before: 'Half of {{2.6}} =', after: 'm', answer: '1.3' },
        hint: 'The range is shared: half above the average, half below.',
      },
      {
        title: 'Take it away from the average',
        input: { type: 'number', before: '{{4.0}} − <<1.3>> =', after: 'm', answer: '2.7' },
        line: 'Low tide depth: 4.0 − 1.3 = @ m',
        hint: 'Low tide is below the average, so subtract.',
        slips: [
          { value: '1.4', step: 1, msg: '1.4 m takes away the whole range. Only half of it is below the average: 1.3 m.' },
          { value: '5.3', step: 2, msg: '5.3 m is above the average: that is high tide. Low tide is 4.0 − 1.3.' },
          { value: '6.6', step: 1, msg: '6.6 m adds the whole range. Low tide is below the average, by half the range.' },
        ],
      },
    ],
  },
  {
    id: 'tc2', level: 'challenge',
    prompt: 'Tonight high tide is at {{11:30 p.m.}} [[When is high tide tomorrow night?]]',
    steps: [
      {
        title: 'How much later each day?',
        input: { type: 'number', before: 'About', after: 'minutes later', answer: '50' },
        hint: 'High tide comes a little later every day.',
      },
      {
        title: 'Count on past midnight',
        input: { type: 'number', before: '11:30 p.m. to midnight is', after: 'minutes', answer: '30' },
        hint: 'How many minutes from 11:30 to 12:00?',
      },
      {
        title: 'Choose the time',
        input: { type: 'choice', options: [opt('a', '12:20 a.m.'), opt('b', '11:30 p.m.'), opt('c', '10:40 p.m.'), opt('d', '12:50 a.m.')], answer: 'a' },
        line: 'High tide tomorrow night: about @ (after midnight).',
        hint: '30 minutes gets to midnight. Then 20 more.',
        why: '50 minutes = 30 to midnight + 20 more: 12:20 a.m.',
        slips: [
          { value: 'b', step: 1, msg: '11:30 p.m. is the same time. High tide is about 50 minutes later each day.' },
          { value: 'c', step: 1, msg: '10:40 p.m. is 50 minutes earlier. It comes later, not earlier.' },
          { value: 'd', step: 2, msg: '12:50 a.m. adds 50 minutes to midnight. 30 of the 50 minutes get you to midnight.' },
        ],
      },
    ],
  },
  {
    id: 'tc3', level: 'challenge',
    prompt: 'At harbour A, high tide is {{8.2 m}} deep and low tide is {{1.4 m}}. At harbour B, high tide is {{3.1 m}} and low tide is {{2.3 m}}. [[How much bigger is the tidal range at harbour A?]]',
    table: { head: ['Harbour', 'High tide (m)', 'Low tide (m)'], rows: [['A', '{{8.2}}', '{{1.4}}'], ['B', '{{3.1}}', '{{2.3}}']] },
    steps: [
      {
        title: 'Find the range at harbour A',
        input: { type: 'number', before: '8.2 − 1.4 =', after: 'm', answer: '6.8' },
        hint: 'Range = high tide depth − low tide depth.',
      },
      {
        title: 'Find the range at harbour B',
        input: { type: 'number', before: '3.1 − 2.3 =', after: 'm', answer: '0.8' },
        hint: 'Do the same for harbour B.',
      },
      {
        title: 'Find the difference between the ranges',
        input: { type: 'number', before: '<<6.8>> − <<0.8>> =', after: 'm', answer: '6' },
        line: 'Harbour A’s range is @ m bigger (6.8 m and 0.8 m).',
        hint: 'Subtract the smaller range from the bigger one.',
        slips: [
          { value: '5.1', step: 1, msg: '5.1 m compares the high tides only (8.2 − 3.1). Find each tidal range first.' },
          { value: '0.9', step: 1, msg: '0.9 m compares the low tides only (2.3 − 1.4). Find each tidal range first.' },
          { value: '7.6', step: 2, msg: '7.6 m adds the two ranges. How much bigger means subtract.' },
        ],
      },
    ],
  },
  {
    id: 'tc4', level: 'challenge',
    prompt: 'At 6 a.m. the harbour faces the Moon. It is high tide. The Earth spins once in 24 hours. [[What is the tide at the harbour 12 hours later, at 6 p.m.?]]',
    inlineSvg: NEAR_SIDE,
    steps: [
      {
        title: 'How much does the Earth turn?',
        input: { type: 'choice', options: [opt('q', 'A quarter turn'), opt('h', 'Half a turn'), opt('w', 'A whole turn')], answer: 'h' },
        line: '12 hours is half a turn.',
        hint: '24 hours is one whole turn.',
        slips: [{ value: 'q', msg: 'A quarter turn is 6 hours. 12 hours is half of 24.' }],
      },
      {
        title: 'Where is the harbour now?',
        input: { type: 'choice', options: [opt('far', 'On the far side, away from the Moon'), opt('top', 'At right angles to the Moon'), opt('near', 'Facing the Moon')], answer: 'far' },
        line: 'At 6 p.m. the harbour is on the far side.',
        hint: 'Half a turn takes it to the other side of the Earth.',
      },
      {
        title: 'High tide or low tide?',
        input: { type: 'choice', options: highLow(), answer: 'high' },
        line: 'At 6 p.m.: @.',
        hint: 'Is there a bulge on the far side?',
        why: 'There is a bulge on the far side too, so it is high tide again: two high tides a day.',
        slips: [{ value: 'low', step: 2, msg: 'The far side has a bulge too: the Earth is stretched. So it is high tide.' }],
      },
    ],
  },
]

export default {
  slug: 'y7-science-3-4-tides',
  class_key: 'science:Year 7',
  title: '3.4 Tides',
  teacher: 'Mr. Bowen',
  unit: 'Unit 3',
  langs: ['en'],
  request_id: null,
  from: { bank: 'new items by the operator; ideas from Dashboard Y7_SCI/U03_4 notes.js and assessment.js @ origin/main, and the deck’s plan.js' },
  slides,
  practice: [
    { id: 'practice', title: 'Practice: tide times, depths and the Moon', set: { title: 'Tides: step by step', items } },
  ],
}
