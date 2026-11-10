// content/y7-science/U02_first20/slides.js
// Year 7 Science · The first 20 elements, one slide each.
// Follows 2.5 (where the class met atoms, elements, symbols and the table).
//
// COPY-DOWN: 2 key words (atomic number, state) + a 20-row table in the
// notebook: Number · Symbol · Name · State. Every element slide's write note
// is one row of that table, so the table builds as the deck goes.
//
// State is at room temperature. Of the first 20: 12 solids, 8 gases, no liquids.

import { TableExplore, SymbolSnap } from '../U02_5/widgets.jsx'
import hydrogen from './images/hydrogen.jpg'
import helium from './images/helium.jpg'
import lithium from './images/lithium.jpg'
import beryllium from './images/beryllium.jpg'
import boron from './images/boron.jpg'
import carbon from './images/carbon.jpg'
import nitrogen from './images/nitrogen.jpg'
import oxygen from './images/oxygen.jpg'
import fluorine from './images/fluorine.jpg'
import neon from './images/neon.jpg'
import sodium from './images/sodium.jpg'
import magnesium from './images/magnesium.jpg'
import aluminium from './images/aluminium.jpg'
import silicon from './images/silicon.jpg'
import phosphorus from './images/phosphorus.jpg'
import sulfur from './images/sulfur.jpg'
import chlorine from './images/chlorine.jpg'
import argon from './images/argon.jpg'
import potassium from './images/potassium.jpg'
import calcium from './images/calcium.jpg'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'

const STATE = {
  solid: { en: 'solid', vn: 'rắn' },
  gas: { en: 'gas', vn: 'khí' },
}

// One row per element. `special`, `found` and `care` are one short sentence each.
const ELEMENTS = [
  {
    z: 1, sym: 'H', name: 'Hydrogen', nameVn: 'hiđro', state: 'gas', image: hydrogen,
    special: 'The **lightest** element. Number 1 of all.',
    specialVn: 'Nguyên tố **nhẹ nhất**. Số 1 trong tất cả.',
    found: 'In **water** and in the **Sun**. The most common element in space.',
    foundVn: 'Trong **nước** và trong **Mặt Trời**. Nguyên tố phổ biến nhất trong vũ trụ.',
    care: 'The Sun uses it to make our **light**.',
    careVn: 'Mặt Trời dùng nó để tạo ra **ánh sáng** cho chúng ta.',
  },
  {
    z: 2, sym: 'He', name: 'Helium', nameVn: 'heli', state: 'gas', image: helium,
    special: '**Lighter than air**. It never reacts.',
    specialVn: '**Nhẹ hơn không khí**. Nó không bao giờ phản ứng.',
    found: 'In the **Sun**. "Helios" means Sun.',
    foundVn: 'Trong **Mặt Trời**. "Helios" nghĩa là Mặt Trời.',
    care: 'It makes **balloons** float.',
    careVn: 'Nó làm **bóng bay** bay lên.',
  },
  {
    z: 3, sym: 'Li', name: 'Lithium', nameVn: 'liti', state: 'solid', image: lithium,
    special: 'The **lightest metal**. Soft — you can cut it with a knife.',
    specialVn: '**Kim loại nhẹ nhất**. Mềm — có thể cắt bằng dao.',
    found: 'In rocks and **salt lakes**.',
    foundVn: 'Trong đá và **hồ muối**.',
    care: '**Batteries** in phones and electric cars.',
    careVn: '**Pin** trong điện thoại và ô tô điện.',
  },
  {
    z: 4, sym: 'Be', name: 'Beryllium', nameVn: 'beri', state: 'solid', image: beryllium,
    special: 'A metal that is **light** but very **strong**.',
    specialVn: 'Một kim loại **nhẹ** nhưng rất **cứng chắc**.',
    found: 'In the green gem **emerald**.',
    foundVn: 'Trong đá quý màu xanh **ngọc lục bảo**.',
    care: 'Mirrors in **space telescopes**.',
    careVn: 'Gương trong **kính thiên văn không gian**.',
  },
  {
    z: 5, sym: 'B', name: 'Boron', nameVn: 'bo', state: 'solid', image: boron,
    special: 'Black and **very hard**.',
    specialVn: 'Màu đen và **rất cứng**.',
    found: 'In a white mineral called **borax**.',
    foundVn: 'Trong một khoáng chất màu trắng tên là **borax**.',
    care: 'Strong **glass** that does not crack in an oven.',
    careVn: '**Thủy tinh** chịu nhiệt, không nứt trong lò nướng.',
  },
  {
    z: 6, sym: 'C', name: 'Carbon', nameVn: 'cacbon', state: 'solid', image: carbon,
    special: '**Diamond** and pencil **graphite** are both carbon.',
    specialVn: '**Kim cương** và **than chì** của bút chì đều là cacbon.',
    found: 'In **every living thing** — and in you.',
    foundVn: 'Trong **mọi sinh vật** — và trong cơ thể em.',
    care: '**Life** is built from carbon.',
    careVn: '**Sự sống** được tạo nên từ cacbon.',
  },
  {
    z: 7, sym: 'N', name: 'Nitrogen', nameVn: 'nitơ', state: 'gas', image: nitrogen,
    special: '**78%** of the air is nitrogen.',
    specialVn: '**78%** không khí là nitơ.',
    found: 'In the **air** all around you.',
    foundVn: 'Trong **không khí** quanh em.',
    care: 'Plants need it to **grow**.',
    careVn: 'Cây cần nó để **lớn lên**.',
  },
  {
    z: 8, sym: 'O', name: 'Oxygen', nameVn: 'oxi', state: 'gas', image: oxygen,
    special: '**21%** of the air. Liquid oxygen is pale **blue**.',
    specialVn: '**21%** không khí. Oxi lỏng có màu **xanh nhạt**.',
    found: 'In air, water, rocks — and **most of your body**.',
    foundVn: 'Trong không khí, nước, đá — và **phần lớn cơ thể em**.',
    care: 'We **breathe** it. Fire needs it too.',
    careVn: 'Chúng ta **hít thở** nó. Lửa cũng cần nó.',
  },
  {
    z: 9, sym: 'F', name: 'Fluorine', nameVn: 'flo', state: 'gas', image: fluorine,
    special: 'The **most reactive** element. Very dangerous.',
    specialVn: 'Nguyên tố **phản ứng mạnh nhất**. Rất nguy hiểm.',
    found: 'In a mineral called **fluorite**.',
    foundVn: 'Trong một khoáng chất tên là **fluorit**.',
    care: '**Fluoride** in toothpaste keeps teeth strong.',
    careVn: '**Florua** trong kem đánh răng giúp răng chắc khỏe.',
  },
  {
    z: 10, sym: 'Ne', name: 'Neon', nameVn: 'neon', state: 'gas', image: neon,
    special: 'It **glows** orange-red with electricity. It never reacts.',
    specialVn: 'Nó **phát sáng** đỏ cam khi có điện. Nó không bao giờ phản ứng.',
    found: 'A **tiny** amount in the air.',
    foundVn: 'Một lượng **rất nhỏ** trong không khí.',
    care: 'Bright **neon signs**.',
    careVn: '**Biển hiệu đèn neon** sáng rực.',
  },
  {
    z: 11, sym: 'Na', name: 'Sodium', nameVn: 'natri', state: 'solid', image: sodium,
    special: 'A soft metal. It **fizzes** in water.',
    specialVn: 'Một kim loại mềm. Nó **sủi bọt** trong nước.',
    found: 'In **salt** and sea water.',
    foundVn: 'Trong **muối** và nước biển.',
    care: 'Table salt. Your **body** needs a little.',
    careVn: 'Muối ăn. **Cơ thể** em cần một ít.',
  },
  {
    z: 12, sym: 'Mg', name: 'Magnesium', nameVn: 'magie', state: 'solid', image: magnesium,
    special: 'Burns with a very **bright white** light.',
    specialVn: 'Cháy với ánh sáng **trắng rất chói**.',
    found: 'In sea water and in the **green** part of plants.',
    foundVn: 'Trong nước biển và trong phần **màu xanh** của cây.',
    care: '**Fireworks**, and light metal for bikes.',
    careVn: '**Pháo hoa**, và kim loại nhẹ làm xe đạp.',
  },
  {
    z: 13, sym: 'Al', name: 'Aluminium', nameVn: 'nhôm', state: 'solid', image: aluminium,
    special: 'A **light** metal that does not rust.',
    specialVn: 'Một kim loại **nhẹ** không bị gỉ.',
    found: 'The most common **metal** in the ground.',
    foundVn: '**Kim loại** phổ biến nhất trong lòng đất.',
    care: '**Cans**, foil and aeroplanes.',
    careVn: '**Lon nước**, giấy bạc và máy bay.',
  },
  {
    z: 14, sym: 'Si', name: 'Silicon', nameVn: 'silic', state: 'solid', image: silicon,
    special: 'Shiny like a metal — but it is **not** a metal.',
    specialVn: 'Sáng bóng như kim loại — nhưng **không phải** kim loại.',
    found: 'In **sand** and rocks.',
    foundVn: 'Trong **cát** và đá.',
    care: '**Computer chips** and glass.',
    careVn: '**Chip máy tính** và thủy tinh.',
  },
  {
    z: 15, sym: 'P', name: 'Phosphorus', nameVn: 'photpho', state: 'solid', image: phosphorus,
    special: 'White phosphorus **glows** in the dark.',
    specialVn: 'Photpho trắng **phát sáng** trong bóng tối.',
    found: 'In your **bones** and teeth.',
    foundVn: 'Trong **xương** và răng của em.',
    care: '**Matches** and plant food.',
    careVn: '**Diêm** và phân bón cho cây.',
  },
  {
    z: 16, sym: 'S', name: 'Sulfur', nameVn: 'lưu huỳnh', state: 'solid', image: sulfur,
    special: '**Yellow**. Some of its compounds smell like bad eggs.',
    specialVn: 'Màu **vàng**. Một số hợp chất của nó có mùi trứng thối.',
    found: 'Near **volcanoes**.',
    foundVn: 'Gần **núi lửa**.',
    care: 'Matches, and strong **tyres**.',
    careVn: 'Diêm, và **lốp xe** bền chắc.',
  },
  {
    z: 17, sym: 'Cl', name: 'Chlorine', nameVn: 'clo', state: 'gas', image: chlorine,
    special: 'A **yellow-green**, poisonous gas.',
    specialVn: 'Một chất khí **vàng lục**, độc.',
    found: 'In **salt** and sea water, with sodium.',
    foundVn: 'Trong **muối** và nước biển, cùng với natri.',
    care: 'It kills germs in **swimming pools**.',
    careVn: 'Nó diệt vi khuẩn trong **bể bơi**.',
  },
  {
    z: 18, sym: 'Ar', name: 'Argon', nameVn: 'agon', state: 'gas', image: argon,
    special: 'It **never reacts**, like helium and neon.',
    specialVn: 'Nó **không bao giờ phản ứng**, giống heli và neon.',
    found: 'About **1%** of the air.',
    foundVn: 'Khoảng **1%** không khí.',
    care: 'Inside **light bulbs**.',
    careVn: 'Bên trong **bóng đèn**.',
  },
  {
    z: 19, sym: 'K', name: 'Potassium', nameVn: 'kali', state: 'solid', image: potassium,
    special: 'A soft metal. It **catches fire** in water!',
    specialVn: 'Một kim loại mềm. Nó **bốc cháy** trong nước!',
    found: 'In **bananas**, soil and rocks.',
    foundVn: 'Trong **chuối**, đất và đá.',
    care: 'Your **heart** and muscles need it.',
    careVn: '**Tim** và cơ bắp của em cần nó.',
  },
  {
    z: 20, sym: 'Ca', name: 'Calcium', nameVn: 'canxi', state: 'solid', image: calcium,
    special: 'A metal — but you know it from **bones**.',
    specialVn: 'Một kim loại — nhưng em biết nó qua **xương**.',
    found: 'In bones, **milk**, shells and the rocks of Ha Long Bay.',
    foundVn: 'Trong xương, **sữa**, vỏ sò và đá ở Vịnh Hạ Long.',
    care: 'Strong **bones** and teeth.',
    careVn: '**Xương** và răng chắc khỏe.',
  },
]

// The element's Periodic Table box above its photograph. Text here is emitted
// per element, so audit:svg cannot measure it: the box is sized for the
// longest name (phosphorus) at 30px.
const tileSvg = (el) => `<svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" class="w-full h-full" role="img">
  <rect width="900" height="600" fill="#ffffff"/>
  <rect x="10" y="10" width="250" height="250" rx="14" fill="#e6f4f7" stroke="#2b2b2b" stroke-width="3"/>
  <text x="30" y="58" font-size="38" font-weight="700" fill="#2b2b2b" font-family="system-ui, sans-serif">${el.z}</text>
  <text x="135" y="180" font-size="120" font-weight="800" fill="#0087a8" text-anchor="middle" font-family="system-ui, sans-serif">${el.sym}</text>
  <text x="135" y="235" font-size="32" font-weight="600" fill="#2b2b2b" text-anchor="middle" font-family="system-ui, sans-serif">${el.name.toLowerCase()}</text>
  <image href="${el.image}" x="280" y="10" width="610" height="580" preserveAspectRatio="xMidYMid meet"/>
</svg>`

const elementSlide = (el) => ({
  layout: 'split',
  accent: TEAL,
  icon: 'Atom',
  eyebrow: `Atomic number ${el.z}`,
  eyebrowVn: `Số hiệu nguyên tử ${el.z}`,
  title: `${el.name} · ${el.sym}`,
  titleVn: `${el.name} (${el.nameVn}) · ${el.sym}`,
  ratio: 40,
  inlineSvg: tileSvg(el),
  content:
    `**Special:** ${el.special}\n\n` +
    `**Found:** ${el.found}\n\n` +
    `**Why we care:** ${el.care}`,
  contentVn:
    `**Đặc biệt:** ${el.specialVn}\n\n` +
    `**Có ở đâu:** ${el.foundVn}\n\n` +
    `**Vì sao quan trọng:** ${el.careVn}`,
  notes: [
    {
      tone: 'write',
      text: `**${el.z} · ${el.sym} · ${el.name.toLowerCase()}** · ${STATE[el.state].en}`,
      textVn: `**${el.z} · ${el.sym} · ${el.name.toLowerCase()}** · ${STATE[el.state].vn}`,
    },
  ],
})

const period = (from, to) => ELEMENTS.filter((el) => el.z >= from && el.z <= to).map(elementSlide)

export const slides = [
  // ── 1. Hero + starter ──────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Atom',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    date: '1 Oct 2026',
    eyebrow: '2.5 The Periodic Table',
    eyebrowVn: '2.5 Bảng tuần hoàn',
    title: 'The First 20 Elements',
    titleVn: '20 nguyên tố đầu tiên',
    card: {
      icon: 'Pencil',
      badge: 'Starter',
      badgeVn: 'Khởi động',
      text: 'One minute. Write every **element** you can name.',
      textVn: 'Một phút. Viết tất cả **nguyên tố** mà em biết tên.',
    },
  },

  // ── 2. Question first: what does the number mean? ─────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Think',
    eyebrowVn: 'Suy nghĩ',
    title: 'Every Element Has a Number',
    titleVn: 'Mỗi nguyên tố có một con số',
    text: 'Hydrogen is **1**. Calcium is **20**.',
    textVn: 'Hiđro là **1**. Canxi là **20**.',
    sub: 'What do you think the number means?',
    subVn: 'Em nghĩ con số đó có nghĩa là gì?',
  },

  // ── 3. Key words + the notebook table ─────────────────────────────────────
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Key words',
    eyebrowVn: 'Từ khóa',
    title: 'Atomic Number and State',
    titleVn: 'Số hiệu nguyên tử và trạng thái',
    content:
      '> Draw a table with 4 columns: **Number · Symbol · Name · State**. Leave 20 rows.',
    contentVn:
      '> Kẻ một bảng 4 cột: **Number · Symbol · Name · State**. Để 20 hàng.',
    notes: [
      {
        tone: 'write',
        text:
          '**Atomic number:** the number of an element in the Periodic Table. Every element has its own.\n' +
          '**State:** solid, liquid or gas, at room temperature.',
        textVn:
          '**Số hiệu nguyên tử (atomic number):** số thứ tự của một nguyên tố trong Bảng tuần hoàn. Mỗi nguyên tố có một số riêng.\n' +
          '**Trạng thái (state):** rắn, lỏng hoặc khí, ở nhiệt độ phòng.',
      },
    ],
  },

  // ── 4. The map ─────────────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'LayoutGrid',
    eyebrow: 'Tap any element',
    eyebrowVn: 'Chạm vào một nguyên tố',
    title: 'Our 20 Elements',
    titleVn: '20 nguyên tố của chúng ta',
    widget: TableExplore,
    caption: 'We go in order: **1** to **20**, left to right, row by row.',
    captionVn: 'Ta đi theo thứ tự: **1** đến **20**, trái sang phải, từng hàng.',
  },

  // ── PERIOD 1 ───────────────────────────────────────────────────────────────
  ...period(1, 2),

  // ── PERIOD 2 ───────────────────────────────────────────────────────────────
  ...period(3, 10),

  // Quick check after 10
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Cover your table',
    eyebrowVn: 'Che bảng của em lại',
    title: 'Number to Name',
    titleVn: 'Từ số đến tên',
    text: 'Number **6**? Number **8**? Number **2**?',
    textVn: 'Số **6**? Số **8**? Số **2**?',
    sub: 'Say the **name** and the **symbol**.',
    subVn: 'Nói **tên** và **kí hiệu**.',
    reveal: {
      label: 'Answer',
      labelVn: 'Đáp án',
      answer: '**6** carbon, C\n**8** oxygen, O\n**2** helium, He',
      answerVn: '**6** carbon, C\n**8** oxygen, O\n**2** helium, He',
    },
  },

  // ── PERIOD 3 ───────────────────────────────────────────────────────────────
  ...period(11, 18),

  // Quick check after 18
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Which element?',
    eyebrowVn: 'Nguyên tố nào?',
    title: 'Where Is It?',
    titleVn: 'Nó ở đâu?',
    text: 'Which element is in **sand**? In **swimming pools**? In **cans**?',
    textVn: 'Nguyên tố nào có trong **cát**? Trong **bể bơi**? Trong **lon nước**?',
    reveal: {
      label: 'Answer',
      labelVn: 'Đáp án',
      answer: '**Sand:** silicon, Si\n**Pools:** chlorine, Cl\n**Cans:** aluminium, Al',
      answerVn: '**Cát:** silicon, Si\n**Bể bơi:** chlorine, Cl\n**Lon nước:** aluminium, Al',
    },
  },

  // ── PERIOD 4 ───────────────────────────────────────────────────────────────
  ...period(19, 20),

  // ── PATTERN: states ────────────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Look at your table',
    eyebrowVn: 'Nhìn bảng của em',
    title: 'Solid, Liquid or Gas?',
    titleVn: 'Rắn, lỏng hay khí?',
    text: 'How many of the 20 are **liquids**?',
    textVn: 'Có bao nhiêu trong 20 nguyên tố là chất **lỏng**?',
    sub: 'Count the **gases** too.',
    subVn: 'Đếm cả các chất **khí** nữa.',
    reveal: {
      label: 'Answer',
      labelVn: 'Đáp án',
      answer: '**No liquids!** 12 solids and 8 gases.\nGases: H, He, N, O, F, Ne, Cl, Ar.',
      answerVn: '**Không có chất lỏng nào!** 12 chất rắn và 8 chất khí.\nCác chất khí: H, He, N, O, F, Ne, Cl, Ar.',
    },
  },

  // ── GAME ───────────────────────────────────────────────────────────────────
  {
    layout: 'game',
    title: 'Symbol Snap',
    titleVn: 'Đoán nhanh kí hiệu',
    widget: SymbolSnap,
  },

  // ── CLOSE ──────────────────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you leave',
    eyebrowVn: 'Trước khi ra về',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    content: '> Check your notebook: **2 key words** and a table with **20 rows**.',
    contentVn: '> Kiểm tra vở: **2 từ khóa** và một bảng có **20 hàng**.',
    items: [
      { text: 'Give the **name** and **symbol** for numbers 1 to 20.', textVn: 'Nói **tên** và **kí hiệu** của các số từ 1 đến 20.' },
      { text: 'Say if each one is a **solid** or a **gas**.', textVn: 'Nói mỗi nguyên tố là chất **rắn** hay **khí**.' },
      { text: 'Tell one **use** of five elements.', textVn: 'Nói một **công dụng** của năm nguyên tố.' },
      { text: 'Explain **atomic number**.', textVn: 'Giải thích **số hiệu nguyên tử**.' },
    ],
  },

  {
    layout: 'hero',
    color: TEAL,
    icon: 'CheckCircle2',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    title: 'Lesson Complete!',
    titleVn: 'Hoàn thành bài học!',
    subtitle: 'Exit question: write the **name** and **symbol** for numbers **11**, **17** and **20**.',
    subtitleVn: 'Câu hỏi ra về: viết **tên** và **kí hiệu** của số **11**, **17** và **20**.',
  },
]
