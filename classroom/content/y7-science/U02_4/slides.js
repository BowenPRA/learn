// content/y7-science/U02_4/slides.js
// Year 7 Science · 2.4 The water cycle. Monday 21 September 2026.
// Source: Learner's Book pages 46–50.
//
// Built to the exemplars (Science 2.5, Maths 2.3): short sentences, one idea
// each, and no slide body that repeats its write note.
//
// THE SHAPE: this class already has all the science. 2.2 named the changes of
// state; 2.3 explained every one of them with particles. 2.4 is those same
// changes happening outdoors at the size of a planet — so the lesson is not new
// physics, it is eight English words and where each one happens. Slide 4 says
// that out loud, and every stage after it is introduced as something they can
// already explain.
//
// The one piece of real science that is new is the misconception on slides 7–8:
// water vapour is an invisible GAS, and everything you can actually see — cloud,
// mist, steam, your breath — is liquid drops that have already condensed. It
// gets a vote, because guessing wrong first is the point.
//
// COPY-DOWN: 7 written panels covering the book's 8 key words (water cycle and
// atmosphere · water vapour · transpiration · precipitation · open water ·
// surface run-off · groundwater) and the Draw This of the whole cycle.

import { DIAGRAMS } from './diagrams.js'
import { WhichStage } from './widgets.jsx'
import clouds from './images/clouds.jpg'
import mist from './images/mist.jpg'
import windowDrops from './images/window.jpg'
import rain from './images/rain.jpg'
import halong from './images/halong.jpg'
import paddy from './images/paddy.jpg'
import pump from './images/pump.jpg'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const BLUE = '#1a5fa8'
const RED = '#c8102e'

export const slides = [
  // ── 1. Hero + starter (the book's Getting Started, p. 46) ──────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Droplets',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    brandFr: 'Sciences 7e année',
    date: '21 Sep 2026',
    eyebrow: '2.4 The water cycle',
    eyebrowVn: '2.4 Vòng tuần hoàn của nước',
    eyebrowFr: '2.4 Le cycle de l’eau',
    title: 'The Water Cycle',
    titleVn: 'Vòng tuần hoàn của nước',
    titleFr: 'Le cycle de l’eau',
    card: {
      icon: 'Pencil',
      badge: 'Starter · one minute alone, two with a partner',
      badgeVn: 'Khởi động · một phút một mình, hai phút với bạn',
      badgeFr: 'Pour commencer · une minute seul, deux à deux',
      text: 'Where does **rain** come from? Write your idea down.',
      textVn: 'Mưa từ đâu mà có? Viết ý kiến của em ra.',
      textFr: 'D’où vient la **pluie** ? Écris ton idée.',
    },
  },

  // ── 2. Ask before you tell. No answer on this slide. ───────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Think',
    eyebrowVn: 'Suy nghĩ',
    eyebrowFr: 'Réfléchis',
    title: 'Where Has This Water Been?',
    titleVn: 'Nước này đã ở những đâu?',
    titleFr: 'Par où cette eau est-elle passée ?',
    text: 'Mr Bowen drinks a glass of water.',
    textVn: 'Thầy Bowen uống một ly nước.',
    textFr: 'M. Bowen boit un verre d’eau.',
    sub: 'Where was that water **2000 years ago**?',
    subVn: 'Nước đó đã ở đâu **2000 năm trước**?',
    subFr: 'Où était cette eau **il y a 2000 ans** ?',
  },

  // ── 3. The answer + the two big key words ──────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Repeat',
    eyebrow: "Learner's Book, page 47",
    eyebrowVn: 'Sách học sinh, trang 47',
    eyebrowFr: 'Manuel de l’élève, page 47',
    title: 'The Earth Never Makes New Water',
    titleVn: 'Trái Đất không tạo ra nước mới',
    titleFr: 'La Terre ne fabrique jamais d’eau nouvelle',
    ratio: 45,
    image: clouds,
    content:
      'It uses the **same water** again and again, for four billion years.\n\n' +
      'The Romans drank this water. So did the dinosaurs.',
    contentVn:
      'Trái Đất dùng **cùng một lượng nước** lặp đi lặp lại, suốt bốn tỉ năm.\n\n' +
      'Người La Mã đã uống nước này. Khủng long cũng vậy.',
    contentFr:
      'Elle utilise la **même eau** encore et encore, depuis quatre milliards d’années.\n\n' +
      'Les Romains ont bu cette eau. Les dinosaures aussi.',
    notes: [
      {
        tone: 'write',
        text: '**Water cycle:** water moving round and round between the land, the sea and the sky.\n**Atmosphere:** the air around the Earth.',
        textVn: '**Vòng tuần hoàn của nước (water cycle):** nước di chuyển vòng quanh giữa đất, biển và bầu trời.\n**Khí quyển (atmosphere):** lớp không khí bao quanh Trái Đất.',
        textFr: '**Cycle de l’eau (water cycle) :** l’eau qui tourne sans fin entre la terre, la mer et le ciel.\n**Atmosphère :** l’air autour de la Terre.',
      },
    ],
  },

  // ── 4. The frame for the whole lesson ──────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Sparkles',
    eyebrow: 'Good news',
    eyebrowVn: 'Tin vui',
    eyebrowFr: 'Bonne nouvelle',
    title: 'You Already Know the Science',
    titleVn: 'Em đã biết phần khoa học rồi',
    titleFr: 'Tu connais déjà la science',
    text: 'Evaporating. Condensing. Melting. Freezing.',
    textVn: 'Bay hơi. Ngưng tụ. Nóng chảy. Đông đặc.',
    textFr: 'Évaporation. Condensation. Fusion. Solidification.',
    sub: 'You learned all four in 2.2 and 2.3. Today: **where** each one happens, and what to **call** it.',
    subVn: 'Em đã học cả bốn ở bài 2.2 và 2.3. Hôm nay: mỗi quá trình xảy ra **ở đâu**, và **gọi tên** nó là gì.',
    subFr: 'Tu as appris les quatre en 2.2 et 2.3. Aujourd’hui : **où** chacun se passe, et comment l’**appeler**.',
  },

  // ── 5. Draw This: the whole cycle (p. 47) ──────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Rulers out — copy this diagram',
    eyebrowVn: 'Lấy thước ra — chép sơ đồ này',
    eyebrowFr: 'Sors ta règle — recopie ce schéma',
    title: 'The Whole Cycle',
    titleVn: 'Toàn bộ vòng tuần hoàn',
    titleFr: 'Tout le cycle',
    inlineSvg: DIAGRAMS.WATER_CYCLE,
    drawThis: true,
    caption: 'Land, sea, clouds. Then the **six arrows**, each with its label.',
    captionVn: 'Đất, biển, mây. Rồi **sáu mũi tên**, mỗi mũi tên có nhãn.',
    captionFr: 'La terre, la mer, les nuages. Puis les **six flèches**, chacune avec sa légende.',
  },

  // ── UP: water goes into the air ────────────────────────────────────────────
  // 6. Evaporation and transpiration, two ways up (p. 48)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Sun',
    eyebrow: 'Two ways up',
    eyebrowVn: 'Hai đường đi lên',
    eyebrowFr: 'Deux façons de monter',
    title: 'Water Goes Into the Air',
    titleVn: 'Nước đi vào không khí',
    titleFr: 'L’eau monte dans l’air',
    ratio: 42,
    image: mist,
    content: 'The Sun heats the sea. The particles gain energy and break free.',
    contentVn: 'Mặt Trời làm nóng biển. Các hạt nhận năng lượng và thoát ra.',
    contentFr: 'Le Soleil chauffe la mer. Les particules gagnent de l’énergie et s’échappent.',
    notes: [
      {
        tone: 'write',
        text: '**Water vapour:** water as a gas.',
        textVn: '**Hơi nước (water vapour):** nước ở thể khí.',
        textFr: '**Vapeur d’eau (water vapour) :** l’eau sous forme de gaz.',
      },
      {
        tone: 'write',
        text: '**Transpiration:** water leaving a plant through its leaves.',
        textVn: '**Thoát hơi nước (transpiration):** nước đi ra khỏi cây qua lá.',
        textFr: '**Transpiration :** l’eau qui sort d’une plante par ses feuilles.',
      },
    ],
  },

  // 7. Vote. No answer on this slide.
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowVn: 'Biểu quyết bằng một tay',
    eyebrowFr: 'Vote avec une main',
    title: 'Can You See Water Vapour?',
    titleVn: 'Em có nhìn thấy hơi nước không?',
    titleFr: 'Vois-tu la vapeur d’eau ?',
    text: 'Water vapour is all around you right now. Can you see it?',
    textVn: 'Hơi nước đang ở quanh em ngay lúc này. Em có nhìn thấy nó không?',
    textFr: 'La vapeur d’eau est tout autour de toi en ce moment. Peux-tu la voir ?',
    columns: [
      { heading: 'A · left hand up', headingVn: 'A · giơ tay trái', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_YES },
      { heading: 'B · right hand up', headingVn: 'B · giơ tay phải', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_NO },
    ],
  },

  // 8. The answer: no. Everything you can see is already liquid.
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'The answer is no',
    eyebrowVn: 'Câu trả lời là không',
    eyebrowFr: 'La réponse est non',
    title: 'Never. It Is a Gas.',
    titleVn: 'Không bao giờ. Nó là chất khí.',
    titleFr: 'Jamais. C’est un gaz.',
    inlineSvg: DIAGRAMS.VAPOUR_GAP,
    caption: 'Cloud, mist, steam, your breath on a cold day — all of them are **liquid** already.',
    captionVn: 'Mây, sương mù, khói ấm, hơi thở ngày lạnh — tất cả đều **đã là chất lỏng**.',
    captionFr: 'Nuage, brume, « fumée » d’une casserole, ton souffle quand il fait froid — tout ça est déjà **liquide**.',
  },

  // ── ACROSS AND DOWN ────────────────────────────────────────────────────────
  // 9. Condensation (p. 48)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'CloudFog',
    eyebrow: 'Up high, the air is cold',
    eyebrowVn: 'Trên cao, không khí lạnh',
    eyebrowFr: 'En haut, l’air est froid',
    title: 'Clouds Are Made of Drops',
    titleVn: 'Mây được tạo từ những giọt nước',
    titleFr: 'Les nuages sont faits de gouttes',
    ratio: 45,
    image: windowDrops,
    content:
      'The vapour rises and cools. The particles slow down and pull together.\n\n' +
      'Same change as the drops on this window — just five kilometres higher.',
    contentVn:
      'Hơi nước bay lên và lạnh đi. Các hạt chậm lại và hút nhau.\n\n' +
      'Cùng một quá trình với những giọt nước trên cửa sổ này — chỉ là cao hơn năm ki-lô-mét.',
    contentFr:
      'La vapeur monte et se refroidit. Les particules ralentissent et se rapprochent.\n\n' +
      'Le même changement que les gouttes sur cette vitre — juste cinq kilomètres plus haut.',
  },

  // 10. Precipitation (p. 48)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Droplets',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Too Heavy to Hold',
    titleVn: 'Nặng quá, không giữ được',
    titleFr: 'Trop lourdes pour tenir',
    ratio: 42,
    image: rain,
    content: 'The drops join up. The air cannot hold them, and they fall.',
    contentVn: 'Các giọt nước nhập lại. Không khí không giữ nổi, và chúng rơi xuống.',
    contentFr: 'Les gouttes se rejoignent. L’air ne peut plus les porter, et elles tombent.',
    notes: [
      {
        tone: 'write',
        text: '**Precipitation:** water falling from clouds — rain, snow, hail or sleet.',
        textVn: '**Giáng thủy (precipitation):** nước rơi từ đám mây — mưa, tuyết, mưa đá hoặc mưa tuyết.',
        textFr: '**Précipitations (precipitation) :** l’eau qui tombe des nuages — pluie, neige, grêle ou grésil.',
      },
    ],
  },

  // 11. The kinds, photographed
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Snowflake',
    eyebrow: 'One word for all of them',
    eyebrowVn: 'Một từ cho tất cả',
    eyebrowFr: 'Un seul mot pour tous',
    title: 'Four Kinds, One Word',
    titleVn: 'Bốn loại, một từ',
    titleFr: 'Quatre sortes, un mot',
    inlineSvg: DIAGRAMS.PRECIP_KINDS,
    caption: 'And **sleet**: rain and snow falling together.',
    captionVn: 'Và **mưa tuyết (sleet)**: mưa và tuyết rơi cùng lúc.',
    captionFr: 'Et le **grésil (sleet)** : pluie et neige qui tombent ensemble.',
  },

  // 12. English check: the four -ation words
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    eyebrowFr: 'Point d’anglais',
    title: 'Doing Word, Naming Word',
    titleVn: 'Từ chỉ hành động, từ chỉ tên gọi',
    titleFr: 'Le verbe, le nom',
    inlineSvg: DIAGRAMS.ATIONS,
    caption: 'Every one ends in **-ation**. Say all four out loud.',
    captionVn: 'Tất cả đều kết thúc bằng **-ation**. Đọc to cả bốn từ.',
    captionFr: 'Chacun finit par **-ation**. Dis les quatre à voix haute, en anglais.',
  },

  // ── WHERE IT LANDS ─────────────────────────────────────────────────────────
  // 13. Open water (p. 49)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Waves',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Straight Back Down',
    titleVn: 'Rơi thẳng trở lại',
    titleFr: 'Retour direct',
    ratio: 42,
    image: halong,
    content: 'Rain that falls here evaporates again, and the cycle starts over.',
    contentVn: 'Mưa rơi xuống đây rồi lại bay hơi, và vòng tuần hoàn bắt đầu lại.',
    contentFr: 'La pluie qui tombe ici s’évapore à nouveau, et le cycle recommence.',
    notes: [
      {
        tone: 'write',
        text: '**Open water:** big water you can see — rivers, large lakes and the oceans.',
        textVn: '**Mặt nước hở (open water):** vùng nước lớn nhìn thấy được — sông, hồ lớn và đại dương.',
        textFr: '**Eaux de surface (open water) :** de grandes étendues d’eau visibles — rivières, grands lacs et océans.',
      },
    ],
  },

  // 14–15. Rain that lands on soil does one of two things (p. 49).
  // Two `split` slides rather than one `compare`: a compare column carrying a
  // photo AND a write note shrinks the photo to a thumbnail on the projector.
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ArrowRight',
    eyebrow: 'Rain on soil does one of two things · this is the first',
    eyebrowVn: 'Mưa trên đất đi theo một trong hai đường · đây là đường thứ nhất',
    eyebrowFr: 'La pluie sur le sol a deux chemins · voici le premier',
    title: 'Over the Ground',
    titleVn: 'Chảy trên mặt đất',
    titleFr: 'Sur le sol',
    ratio: 42,
    image: paddy,
    content: 'These terraces hold the water back, so it soaks in instead of running away.',
    contentVn: 'Những thửa ruộng bậc thang giữ nước lại, để nước thấm xuống thay vì chảy đi mất.',
    contentFr: 'Ces terrasses retiennent l’eau, pour qu’elle s’infiltre au lieu de s’écouler.',
    notes: [
      {
        tone: 'write',
        text: '**Surface run-off:** water flowing across the ground into rivers. It carries the soil away.',
        textVn: '**Dòng chảy bề mặt (surface run-off):** nước chảy trên mặt đất vào sông. Nó cuốn đất đi.',
        textFr: '**Ruissellement (surface run-off) :** l’eau qui coule sur le sol jusqu’aux rivières. Elle emporte la terre.',
      },
    ],
  },

  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Droplet',
    eyebrow: 'And this is the second',
    eyebrowVn: 'Và đây là đường thứ hai',
    eyebrowFr: 'Et voici le second',
    title: 'Into the Ground',
    titleVn: 'Thấm vào đất',
    titleFr: 'Dans le sol',
    ratio: 42,
    image: pump,
    content: 'It can sit underground for years. Then a well brings it back up.',
    contentVn: 'Nước có thể nằm dưới lòng đất nhiều năm. Rồi một cái giếng đưa nó lên lại.',
    contentFr: 'Elle peut rester sous terre pendant des années. Puis un puits la fait remonter.',
    notes: [
      {
        tone: 'write',
        text: '**Groundwater:** water that soaks into the soil and rocks. We pump it back up to drink.',
        textVn: '**Nước ngầm (groundwater):** nước thấm vào đất và đá. Ta bơm nó lên để uống.',
        textFr: '**Eau souterraine (groundwater) :** l’eau qui s’infiltre dans le sol et les roches. On la pompe pour la boire.',
      },
    ],
  },

  // ── BOOK QUESTIONS (p. 50) ─────────────────────────────────────────────────
  // 15. Questions 1–2
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: "Learner's Book, page 50",
    eyebrowVn: 'Sách học sinh, trang 50',
    eyebrowFr: 'Manuel de l’élève, page 50',
    title: 'Questions 1–2',
    titleVn: 'Câu hỏi 1–2',
    titleFr: 'Questions 1–2',
    content:
      '> **1.** What are the different types of precipitation?\n' +
      '> **2.** How does rain form?',
    contentVn:
      '> **1.** Có những loại giáng thủy nào?\n' +
      '> **2.** Mưa hình thành như thế nào?',
    contentFr:
      '> **1.** Quels sont les différents types de précipitations ?\n' +
      '> **2.** Comment la pluie se forme-t-elle ?',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifie',
      answer:
        '**1.** Rain, snow, hail and sleet.\n' +
        '**2.** Water vapour rises, cools and condenses into drops. The drops join up until they are too heavy, and fall.',
      answerVn:
        '**1.** Mưa, tuyết, mưa đá và mưa tuyết.\n' +
        '**2.** Hơi nước bay lên, lạnh đi và ngưng tụ thành giọt. Các giọt nhập lại đến khi quá nặng thì rơi xuống.',
      answerFr:
        '**1.** La pluie, la neige, la grêle et le grésil.\n' +
        '**2.** La vapeur d’eau monte, se refroidit et se condense en gouttes. Les gouttes se rejoignent jusqu’à être trop lourdes, et tombent.',
    },
  },

  // 16. Question 3 — the 2.3 callback, on its own because it is the hard one
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'Atom',
    eyebrow: "Learner's Book, page 50",
    eyebrowVn: 'Sách học sinh, trang 50',
    eyebrowFr: 'Manuel de l’élève, page 50',
    title: 'Question 3',
    titleVn: 'Câu hỏi 3',
    titleFr: 'Question 3',
    content: '> **3.** Use **particle theory** to explain how a pool of water on the road disappears.',
    contentVn: '> **3.** Dùng **lý thuyết hạt** để giải thích vì sao vũng nước trên đường biến mất.',
    contentFr: '> **3.** Utilise la **théorie des particules** pour expliquer comment une flaque d’eau sur la route disparaît.',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifie',
      answer:
        'The Sun transfers heat energy to the particles. They move faster. Some break the attractive forces holding them together and escape as a gas. The pool evaporates.',
      answerVn:
        'Mặt Trời truyền nhiệt năng cho các hạt. Chúng chuyển động nhanh hơn. Một số phá vỡ lực hút giữ chúng lại và thoát ra thành khí. Vũng nước bay hơi.',
      answerFr:
        'Le Soleil transfère de l’énergie thermique aux particules. Elles bougent plus vite. Certaines brisent les forces d’attraction qui les retiennent et s’échappent sous forme de gaz. La flaque s’évapore.',
    },
  },

  // 17. Questions 4, 6, 7 — the everyday ones
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'Users',
    eyebrow: "Learner's Book, page 50",
    eyebrowVn: 'Sách học sinh, trang 50',
    eyebrowFr: 'Manuel, page 50',
    title: 'Questions 4, 6 and 7',
    titleVn: 'Câu hỏi 4, 6 và 7',
    titleFr: 'Questions 4, 6 et 7',
    content:
      '> **4.** Where does your drinking water come from?\n' +
      '> **6.** What do we use water for **inside our bodies**?\n' +
      '> **7.** What else do we use water for?',
    contentVn:
      '> **4.** Nước uống của em đến từ đâu?\n' +
      '> **6.** Cơ thể chúng ta dùng nước để làm gì?\n' +
      '> **7.** Chúng ta còn dùng nước để làm gì nữa?',
    contentFr:
      '> **4.** D’où vient ton eau potable ?\n' +
      '> **6.** À quoi sert l’eau **dans notre corps** ?\n' +
      '> **7.** À quoi d’autre sert l’eau ?',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Voir',
      answer:
        '**4.** A river, a lake or groundwater from a well, then a treatment works.\n' +
        '**6.** Blood, carrying food and waste, sweating, digesting. We are over 60% water.\n' +
        '**7.** Washing, cooking, rice fields, factories, putting out fires.',
      answerVn:
        '**4.** Từ sông, hồ hoặc nước ngầm từ giếng, rồi qua nhà máy xử lý nước.\n' +
        '**6.** Máu, vận chuyển thức ăn và chất thải, đổ mồ hôi, tiêu hóa. Cơ thể ta hơn 60% là nước.\n' +
        '**7.** Giặt giũ, nấu ăn, ruộng lúa, nhà máy, chữa cháy.',
      answerFr:
        '**4.** Rivière, lac ou eau souterraine (puits), puis usine de traitement.\n' +
        '**6.** Sang, sueur, digérer, transporter aliments et déchets. Corps : plus de 60% d’eau.\n' +
        '**7.** Laver, cuisiner, rizières, usines, éteindre les feux.',
    },
  },

  // ── 18. Game ───────────────────────────────────────────────────────────────
  {
    layout: 'game',
    title: 'Which Stage?',
    titleVn: 'Giai đoạn nào?',
    titleFr: 'Quelle étape ?',
    widget: WhichStage,
  },

  // ── CLOSE ──────────────────────────────────────────────────────────────────
  // 19. Homework: the book's Activity 2.4.1
  {
    layout: 'callout',
    accent: RED,
    icon: 'Home',
    eyebrow: 'At home',
    eyebrowVn: 'Ở nhà',
    eyebrowFr: 'À la maison',
    title: 'Water Cycle Poster',
    titleVn: 'Áp phích vòng tuần hoàn của nước',
    titleFr: 'Affiche du cycle de l’eau',
    notes: [
      {
        tone: 'homework',
        badge: 'Homework',
        badgeVn: 'Bài tập về nhà',
        badgeFr: 'Devoirs',
        icon: 'Pencil',
        text: '1. Draw the water cycle on one page. Make it big and colourful.\n2. Label it with all eight key words.\n3. Bring it in. You will swap with a partner and say **two** things you like about theirs.',
        textVn: '1. Vẽ vòng tuần hoàn của nước trên một trang giấy. Vẽ to và nhiều màu.\n2. Ghi chú đủ cả tám từ khóa.\n3. Mang đến lớp. Em sẽ đổi bài với bạn và nói **hai** điều em thích ở bài của bạn.',
        textFr: '1. Dessine le cycle de l’eau sur une page. Fais-le grand et coloré.\n2. Légende-le avec les huit mots clés.\n3. Apporte-le. Tu l’échangeras avec un camarade et diras **deux** choses que tu aimes dans le sien.',
      },
    ],
  },

  // 20. Checklist (the book's summary checklist, p. 50)
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 1,
    eyebrow: 'Before you leave',
    eyebrowVn: 'Trước khi ra về',
    eyebrowFr: 'Avant de partir',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    titleFr: 'Sais-tu faire ceci ?',
    content: '> Check your notebook: **7 written panels** and **1 diagram**.',
    contentVn: '> Kiểm tra vở: **7 khung ghi chép** và **1 sơ đồ**.',
    contentFr: '> Vérifie ton cahier : **7 encadrés écrits** et **1 schéma**.',
    items: [
      { text: 'Use the **eight key words** to describe the water cycle.', textVn: 'Dùng **tám từ khóa** để mô tả vòng tuần hoàn của nước.', textFr: 'Utilise les **huit mots clés** pour décrire le cycle de l’eau.' },
      { text: 'Use **particle theory** to explain each part of the cycle.', textVn: 'Dùng **lý thuyết hạt** để giải thích từng phần của vòng tuần hoàn.', textFr: 'Utilise la **théorie des particules** pour expliquer chaque partie du cycle.' },
    ],
  },

  // 21. Exit question
  {
    layout: 'hero',
    color: TEAL,
    icon: 'CheckCircle2',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    brandFr: 'Sciences 7e année',
    title: 'Lesson Complete!',
    titleVn: 'Hoàn thành bài học!',
    titleFr: 'Leçon terminée !',
    subtitle: 'Exit question: wet clothes on the line **dry faster on a sunny day**. Use particles to explain why.',
    subtitleVn: 'Câu hỏi ra về: quần áo ướt phơi trên dây **khô nhanh hơn vào ngày nắng**. Dùng kiến thức về hạt để giải thích.',
    subtitleFr: 'Question de sortie : le linge mouillé sur le fil **sèche plus vite quand il fait soleil**. Utilise les particules pour expliquer pourquoi.',
  },
]
