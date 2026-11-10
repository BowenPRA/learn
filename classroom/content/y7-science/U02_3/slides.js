// content/y7-science/U02_3/slides.js
// Year 7 Science · 2.3 Explaining changes of state.
//
// 2.2a named the five changes. This lesson explains WHY each one happens,
// using particle theory. Source: Learner's Book pages 41-43.
//
// COPY-DOWN: four key words, the melting explanation, the heating-to-melting
// diagram (Draw This). The widget drills all five scenarios so boiling and
// condensing are teacher-led with no copy-down.

import { DIAGRAMS } from './diagrams.js'
import { ParticleExplainer } from './widgets.jsx'
import expansion from './images/expansion.jpg'
import condensation from './images/condensation.jpg'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const HEAT = '#c25e12'

export const slides = [
  // ── 1. Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Atom',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    brandFr: 'Sciences 7e année',
    eyebrow: '2.3 Explaining changes of state',
    eyebrowVn: '2.3 Giải thích sự chuyển thể',
    eyebrowFr: '2.3 Changer d’état : pourquoi ?',
    title: 'Explaining Changes of State',
    titleVn: 'Giải thích sự chuyển thể',
    titleFr: 'Changer d’état : pourquoi ?',
    card: {
      icon: 'Pencil',
      badge: 'Starter',
      badgeVn: 'Khởi động',
      badgeFr: 'Pour commencer',
      text: 'Write the **five changes of state** as: from [state] to [state]. Two minutes, from memory.',
      textVn: 'Viết **năm sự chuyển thể** dưới dạng: from [trạng thái] to [trạng thái]. Hai phút, từ trí nhớ.',
      textFr: 'Écris les **cinq changements d’état** : from [état] to [état]. Deux minutes, de mémoire.',
    },
  },

  // ── 2. Bridge ──────────────────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'You know WHAT happens.',
    eyebrowVn: 'Em biết điều gì xảy ra.',
    eyebrowFr: 'Tu sais CE QUI se passe.',
    title: 'Why?',
    titleVn: 'Tại sao?',
    titleFr: 'Pourquoi ?',
    sub: 'Today we explain each change using the **particles**.',
    subVn: 'Hôm nay ta giải thích mỗi sự chuyển thể bằng **các hạt**.',
    subFr: 'Aujourd’hui, on explique chaque changement avec les **particules**.',
  },

  // ── 3. Key words ───────────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: HEAT,
    icon: 'BookOpen',
    eyebrow: 'Four words you need today',
    eyebrowVn: 'Bốn từ em cần hôm nay',
    eyebrowFr: 'Les quatre mots du jour',
    title: 'Key Words',
    titleVn: 'Từ khóa',
    titleFr: 'Mots clés',
    content:
      '**Heat energy** — the energy that makes particles move.\n' +
      '**Transferred** — moved from one place to another.\n' +
      '**Attractive force** — the force that holds particles together.\n' +
      '**Expand** — get bigger.',
    contentVn:
      '**Nhiệt năng (heat energy)** — năng lượng làm các hạt chuyển động.\n' +
      '**Truyền (transferred)** — di chuyển từ nơi này sang nơi khác.\n' +
      '**Lực hút (attractive force)** — lực giữ các hạt với nhau.\n' +
      '**Giãn nở (expand)** — to ra.',
    contentFr:
      '**Énergie thermique** — fait bouger les particules.\n' +
      '**Transférée** — déplacée d’un lieu à un autre.\n' +
      '**Force d’attraction** — tient les particules ensemble.\n' +
      '**Se dilater** — grossir.',
    notes: [
      {
        tone: 'write',
        text: '**Heat energy:** the energy that makes particles move.\n**Transferred:** moved from one place to another.\n**Attractive force:** the force that holds particles together.\n**Expand:** to get bigger.',
        textVn: '**Nhiệt năng (heat energy):** năng lượng làm các hạt chuyển động.\n**Truyền (transferred):** di chuyển từ nơi này sang nơi khác.\n**Lực hút (attractive force):** lực giữ các hạt với nhau.\n**Giãn nở (expand):** to ra.',
        textFr: '**Énergie thermique :** fait bouger les particules.\n**Transférée :** déplacée d’un lieu à un autre.\n**Force d’attraction :** tient les particules ensemble.\n**Se dilater :** grossir.',
      },
    ],
  },

  // ── 4. Expansion photo ─────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: HEAT,
    icon: 'ArrowUpRight',
    eyebrow: 'Heating solids',
    eyebrowVn: 'Đun nóng chất rắn',
    eyebrowFr: 'Chauffer les solides',
    title: 'Why Do Solids Expand?',
    titleVn: 'Tại sao chất rắn giãn nở?',
    titleFr: 'Pourquoi les solides se dilatent ?',
    image: expansion,
    content:
      'Heat energy is **transferred** to the particles. They vibrate more and take up more space. The solid **expands**.\n\n' +
      'Engineers leave gaps in bridges so the metal has room to grow in summer.',
    contentVn:
      'Nhiệt năng được **truyền** đến các hạt. Chúng rung động nhiều hơn và chiếm nhiều chỗ hơn. Chất rắn **giãn nở**.\n\n' +
      'Kỹ sư để khoảng trống trên cầu để kim loại có chỗ giãn ra vào mùa hè.',
    contentFr:
      'L’énergie thermique est **transférée** aux particules. Elles vibrent plus et prennent plus de place. Le solide se **dilate**.\n\n' +
      'Les ingénieurs laissent des espaces dans les ponts pour que le métal puisse s’allonger en été.',
  },

  // ── 5. Heating-to-melting diagram (Draw This) ──────────────────────────────
  {
    layout: 'showcase',
    accent: HEAT,
    icon: 'Flame',
    eyebrow: 'Rulers out — copy this diagram',
    eyebrowVn: 'Lấy thước ra — chép sơ đồ này',
    eyebrowFr: 'Sors ta règle — recopie ce schéma',
    title: 'Heating a Solid Until It Melts',
    titleVn: 'Đun nóng chất rắn đến khi nóng chảy',
    titleFr: 'Chauffer un solide jusqu’à ce qu’il fonde',
    inlineSvg: DIAGRAMS.HEATING_TO_MELTING,
    drawThis: true,
    caption: 'Three panels. Solid, expanding, liquid. Copy the arrows and labels.',
    captionVn: 'Ba ô. Rắn, giãn nở, lỏng. Chép các mũi tên và nhãn.',
    captionFr: 'Trois cases. Solide, dilatation, liquide. Recopie les flèches et les légendes.',
  },

  // ── 6. Melting explanation (write note) ────────────────────────────────────
  {
    layout: 'callout',
    accent: HEAT,
    icon: 'Droplets',
    eyebrow: 'Say it, then write it',
    eyebrowVn: 'Nói ra, rồi viết lại',
    eyebrowFr: 'Dis-le, puis écris-le',
    title: 'Why Does a Solid Melt?',
    titleVn: 'Tại sao chất rắn nóng chảy?',
    titleFr: 'Pourquoi un solide fond ?',
    content:
      'Heat energy is transferred to the particles. They vibrate so much that the **attractive forces** can no longer hold them in a fixed pattern. They slide past each other — the solid **melts**.',
    contentVn:
      'Nhiệt năng được truyền đến các hạt. Chúng rung động nhiều đến mức **lực hút** không còn giữ được chúng trong trật tự cố định. Chúng trượt qua nhau — chất rắn **nóng chảy**.',
    contentFr:
      'L’énergie thermique est transférée aux particules. Elles vibrent tellement que les **forces d’attraction** ne peuvent plus les tenir en place. Elles glissent les unes sur les autres — le solide **fond**.',
    notes: [
      {
        tone: 'write',
        text: '**Why does a solid melt?** Heat energy is transferred to the particles. They vibrate more and more. The attractive forces can no longer hold them in a fixed pattern. They slide past each other. The solid melts.',
        textVn: '**Tại sao chất rắn nóng chảy?** Nhiệt năng được truyền đến các hạt. Chúng rung động ngày càng nhiều. Lực hút không còn giữ được chúng trong trật tự cố định. Chúng trượt qua nhau. Chất rắn nóng chảy.',
        textFr: '**Pourquoi un solide fond ?** L’énergie thermique est transférée aux particules. Elles vibrent de plus en plus. Les forces d’attraction ne peuvent plus les tenir en place. Elles glissent les unes sur les autres. Le solide fond.',
      },
    ],
  },

  // ── 7. Boiling diagram ─────────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Flame',
    eyebrow: 'Keep adding heat energy',
    eyebrowVn: 'Tiếp tục thêm nhiệt năng',
    eyebrowFr: 'On ajoute encore de l’énergie thermique',
    title: 'Why Does a Liquid Boil?',
    titleVn: 'Tại sao chất lỏng sôi?',
    titleFr: 'Pourquoi un liquide bout ?',
    inlineSvg: DIAGRAMS.BOILING,
    caption: 'Particles move faster and faster. Some break the attractive forces and escape as a gas.',
    captionVn: 'Các hạt chuyển động ngày càng nhanh. Một số phá vỡ lực hút và thoát ra dưới dạng khí.',
    captionFr: 'Les particules bougent de plus en plus vite. Certaines brisent les forces d’attraction et s’échappent sous forme de gaz.',
  },

  // ── 8. Condensation photo + reverse ────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Repeat',
    eyebrow: 'Cooling is the reverse',
    eyebrowVn: 'Làm lạnh là ngược lại',
    eyebrowFr: 'Refroidir, c’est l’inverse',
    title: 'Condensing and Freezing',
    titleVn: 'Ngưng tụ và đông đặc',
    titleFr: 'Condensation et solidification',
    image: condensation,
    content:
      'Take **heat energy away** and particles slow down.\n\n' +
      '**Condensing:** gas particles hit a cold surface, lose energy, slow down. The attractive forces pull them together into a liquid.\n\n' +
      '**Freezing:** liquid particles slow so much they lock into a fixed pattern — a solid.',
    contentVn:
      'Lấy **nhiệt năng đi** thì các hạt chậm lại.\n\n' +
      '**Ngưng tụ:** các hạt khí chạm bề mặt lạnh, mất năng lượng, chậm lại. Lực hút kéo chúng lại thành chất lỏng.\n\n' +
      '**Đông đặc:** các hạt lỏng chậm đến mức chúng xếp vào trật tự cố định — thành chất rắn.',
    contentFr:
      '**Retire de l’énergie thermique** et les particules ralentissent.\n\n' +
      '**Condensation :** les particules de gaz touchent une surface froide, perdent de l’énergie, ralentissent. Les forces d’attraction les rassemblent en un liquide.\n\n' +
      '**Solidification :** les particules du liquide ralentissent tant qu’elles se bloquent en place — un solide.',
  },

  // ── 9. Game: ParticleExplainer ─────────────────────────────────────────────
  {
    layout: 'game',
    title: 'Explain It With Particles',
    titleVn: 'Giải thích bằng hạt',
    titleFr: 'Explique avec les particules',
    widget: ParticleExplainer,
  },

  // ── 10. Book questions ─────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: "Learner's Book, page 43",
    eyebrowVn: 'Sách học sinh, trang 43',
    eyebrowFr: 'Manuel, page 43',
    title: 'Questions 1–3',
    titleVn: 'Câu hỏi 1–3',
    titleFr: 'Questions 1–3',
    ratio: 56,
    content:
      '> **1.** Explain why a solid expands when it is heated.\n' +
      '> **2.** Use particle theory to explain why solids and liquids cannot be compressed.\n' +
      '> **3.** Use particle theory to explain why liquids and gases can flow.',
    contentVn:
      '> **1.** Giải thích vì sao chất rắn giãn nở khi bị đun nóng.\n' +
      '> **2.** Dùng lý thuyết hạt giải thích vì sao chất rắn và chất lỏng không thể bị nén.\n' +
      '> **3.** Dùng lý thuyết hạt giải thích vì sao chất lỏng và chất khí có thể chảy.',
    contentFr:
      '> **1.** Pourquoi un solide chauffé se dilate ?\n' +
      '> **2.** Avec les particules, explique pourquoi solides et liquides ne se compriment pas.\n' +
      '> **3.** Avec les particules, explique pourquoi liquides et gaz coulent.',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Voir',
      answer:
        '**1.** Heat energy is transferred to the particles. They vibrate more and take up more space — the solid expands.\n' +
        '**2.** In solids and liquids the particles are already touching. There is no space to squash into.\n' +
        '**3.** In liquids the particles slide past each other. In gases they move freely. Both can flow because the particles are not locked in a fixed pattern.',
      answerVn:
        '**1.** Nhiệt năng được truyền đến các hạt. Chúng rung động nhiều hơn và chiếm nhiều chỗ hơn — chất rắn giãn nở.\n' +
        '**2.** Trong chất rắn và lỏng, các hạt đã chạm nhau. Không có khoảng trống để ép vào.\n' +
        '**3.** Trong chất lỏng, các hạt trượt qua nhau. Trong chất khí, chúng chuyển động tự do. Cả hai đều có thể chảy vì các hạt không bị khóa trong trật tự cố định.',
      answerFr:
        '**1.** Les particules reçoivent de l’énergie thermique, vibrent plus et prennent plus de place : le solide se dilate.\n' +
        '**2.** Solides et liquides : les particules se touchent déjà. Pas de place pour les serrer.\n' +
        '**3.** Liquide : les particules glissent les unes sur les autres. Gaz : elles bougent librement. Les deux coulent car rien ne bloque les particules.',
    },
  },

  // ── 11. Checklist ──────────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you leave',
    eyebrowVn: 'Trước khi ra về',
    eyebrowFr: 'Avant de partir',
    title: 'Can You Do All Four?',
    titleVn: 'Em làm được cả bốn chưa?',
    titleFr: 'Sais-tu faire les quatre ?',
    content:
      '> Check your notebook: **four key words**, the **melting explanation**, and the **diagram**.',
    contentVn:
      '> Kiểm tra vở: **bốn từ khóa**, **giải thích nóng chảy**, và **sơ đồ**.',
    contentFr:
      '> Vérifie ton cahier : **quatre mots clés**, l’**explication de la fusion** et le **schéma**.',
    items: [
      { text: 'Explain why a solid **expands** when heated.', textVn: 'Giải thích vì sao chất rắn **giãn nở** khi đun nóng.', textFr: 'Explique pourquoi un solide se **dilate** quand on le chauffe.' },
      { text: 'Explain why a solid **melts**.', textVn: 'Giải thích vì sao chất rắn **nóng chảy**.', textFr: 'Explique pourquoi un solide **fond**.' },
      { text: 'Explain why a liquid **boils**.', textVn: 'Giải thích vì sao chất lỏng **sôi**.', textFr: 'Explique pourquoi un liquide **bout**.' },
      { text: 'Explain condensing and freezing as the **reverse**.', textVn: 'Giải thích ngưng tụ và đông đặc là quá trình **ngược lại**.', textFr: 'Explique la condensation et la solidification comme l’**inverse**.' },
    ],
  },

  // ── 12. Exit question ──────────────────────────────────────────────────────
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
    subtitle: 'Exit question: a metal bridge is **longer in summer** than in winter. Use particle theory to explain why.',
    subtitleVn: 'Câu hỏi ra về: một cầu kim loại **dài hơn vào mùa hè** so với mùa đông. Dùng lý thuyết hạt giải thích vì sao.',
    subtitleFr: 'Question de sortie : un pont en métal est **plus long en été** qu’en hiver. Utilise la théorie des particules pour expliquer pourquoi.',
  },
]
