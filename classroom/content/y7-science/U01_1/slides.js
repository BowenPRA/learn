// content/y7-science/U01_1/slides.js
// Year 7 Science · 1.1 Cells.
//
// Styled after the Cambridge Lower Secondary Learner's Book: teal section
// headers, purple activity boxes, red homework, and the book's orange for every
// key word the students are expected to copy down. Anything a student must
// write into their notebook is either an orange "Write This Down" panel or an
// orange-ruled bumper — never plain body text.
//
// Figures marked `lb-*` are scans from the Learner's Book (Unit 1.1, pp. 8–12);
// see images/CREDITS.json. Everything else is drawn in diagrams.js.
import { DIAGRAMS } from './diagrams.js'
import { ScaleChallengeWidget, CellExplorerWidget } from './widgets.jsx'
import lbPlantCell from './images/lb-plant-cell-diagram.jpg'
import lbLeaf from './images/lb-leaf-micrograph.jpg'
import lbMicroscope from './images/lb-microscope-labelled.jpg'
import hookeCork from './images/hooke-cork.jpg'
import prisonCell from './images/prison-cell.jpg'
import everest from './images/everest.jpg'
import electronMicroscope from './images/electron-microscope.jpg'
import onionCells from './images/onion-cells.jpg'
import cheekCells from './images/cheek-cells.jpg'
import chloroplastsPhoto from './images/chloroplasts.jpg'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const RED = '#c8102e'
const BLUE = '#1a5fa8'

export const slides = [
  // ── Section 1: the hook and the scale of life ────────────────────────────
  {
    layout: 'hero',
    color: '#5c2483',
    icon: 'Microscope',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    brandFr: 'Sciences 7e année',
    eyebrow: '1.1 Cells',
    eyebrowVn: '1.1 Tế bào',
    eyebrowFr: '1.1 Cellules',
    date: '5 Aug 2026',
    title: 'Cells: The Building Blocks of Life',
    titleVn: 'Tế bào: Đơn vị cơ bản của sự sống',
    titleFr: 'Cellules : les briques du vivant',
    card: {
      icon: 'Hourglass',
      badge: 'Starter Task',
      badgeVn: 'Nhiệm vụ khởi động',
      badgeFr: 'Pour commencer',
      text: 'Write a **complete sentence** describing how small a cell is. You must use a **measurement** (like mm) or a **real-world comparison**.',
      textVn: 'Viết một **câu hoàn chỉnh** mô tả tế bào nhỏ như thế nào. Em phải dùng một **đơn vị đo** (như mm) hoặc một **so sánh thực tế**.',
      textFr: 'Dis en une **phrase complète** combien une cellule est petite. Utilise une **mesure** (en mm) ou une **comparaison réelle**.',
    },
  },
  // The question on its own, with nothing to work from yet. Give the room a
  // couple of minutes to argue about it before any numbers appear.
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Scale',
    eyebrow: 'In pairs — no calculators yet',
    eyebrowVn: 'Theo cặp — chưa dùng máy tính',
    eyebrowFr: 'Par deux — pas encore de calculatrice',
    title: 'The Soda Can Challenge',
    titleVn: 'Thử thách Lon Nước Ngọt',
    titleFr: 'Le défi de la canette',
    label: 'Discuss',
    labelVn: 'Thảo luận',
    labelFr: 'Discussion',
    labelIcon: 'MessageSquare',
    text: 'Imagine one **average cell** in Mr Bowen’s body was magnified until it was the size of a **soda can**. How big would Mr Bowen be?',
    textVn: 'Hãy tưởng tượng một **tế bào trung bình** trong cơ thể thầy Bowen được phóng to đến khi bằng một **lon nước ngọt**. Khi đó thầy Bowen sẽ to cỡ nào?',
    textFr: 'Imagine qu’on agrandit une **cellule moyenne** du corps de M. Bowen jusqu’à la taille d’une **canette de soda**. Quelle serait la taille de M. Bowen ?',
    sub: 'Mr Bowen is **178 cm** tall. A building? A mountain? Agree with your partner, and be ready to say why.',
    subVn: 'Thầy Bowen cao **178 cm**. Một toà nhà? Một ngọn núi? Hãy thống nhất với bạn cùng cặp và sẵn sàng giải thích vì sao.',
    subFr: 'M. Bowen mesure **178 cm**. Un immeuble ? Une montagne ? Mets-toi d’accord avec ton voisin et prépare-toi à dire pourquoi.',
  },
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Scale',
    title: 'Working It Out',
    titleVn: 'Cùng tính toán',
    titleFr: 'Faisons le calcul',
    ratio: 45,
    content:
      'Now let’s find the real answer together. Everything you need is on the right — press through it one step at a time.\n\n' +
      '> **1.** A typical human cell is **0.02 mm** across.\n' +
      '> **2.** A soda can is about **120 mm** tall.\n' +
      '> **3.** Work out the **scale factor** — how many times bigger?',
    contentVn:
      'Bây giờ hãy cùng tìm đáp án thật. Mọi thứ em cần đều ở bên phải — bấm từng bước một.\n\n' +
      '> **1.** Một tế bào người thường rộng **0,02 mm**.\n' +
      '> **2.** Một lon nước ngọt cao khoảng **120 mm**.\n' +
      '> **3.** Hãy tính **hệ số phóng đại** — lớn hơn bao nhiêu lần?',
    contentFr:
      'Cherchons maintenant la vraie réponse ensemble. Tout est à droite — avance une étape à la fois.\n\n' +
      '> **1.** Une cellule humaine typique mesure **0.02 mm** de large.\n' +
      '> **2.** Une canette de soda mesure environ **120 mm** de haut.\n' +
      '> **3.** Calcule le **facteur d’échelle** — combien de fois plus grand ?',
    widget: ScaleChallengeWidget,
  },
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Sparkles',
    eyebrow: 'The answer',
    eyebrowVn: 'Đáp án',
    eyebrowFr: 'La réponse',
    title: 'Taller Than Everest',
    titleVn: 'Cao hơn cả Everest',
    titleFr: 'Plus grand que l’Everest',
    image: everest,
    caption: 'Magnified 6000×, Mr Bowen would be **10.68 km** tall. Everest is **8.85 km**. He would stand almost 2 km above the summit — and that is how much bigger a soda can is than one of your cells.',
    captionVn: 'Phóng đại 6000 lần, thầy Bowen sẽ cao **10,68 km**. Everest cao **8,85 km**. Thầy sẽ đứng cao hơn đỉnh núi gần 2 km — và đó chính là mức chênh lệch giữa một lon nước ngọt và một tế bào của em.',
    captionFr: 'Agrandi 6000×, M. Bowen mesurerait **10.68 km**. L’Everest mesure **8.85 km**. Il dépasserait le sommet de presque 2 km — voilà combien une canette est plus grande qu’une de tes cellules.',
  },
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Ruler',
    eyebrow: 'Getting a feel for it',
    eyebrowVn: 'Cảm nhận kích thước',
    eyebrowFr: 'Pour se faire une idée',
    title: 'How Small Is Small?',
    titleVn: 'Nhỏ đến mức nào?',
    titleFr: 'Petit, c’est petit comment ?',
    inlineSvg: DIAGRAMS.SCALE_LADDER,
    caption: 'Everything to the right of the hair needs a microscope. A cell is about **3 times thinner than a human hair**.',
    captionVn: 'Mọi thứ bên phải sợi tóc đều cần kính hiển vi. Một tế bào **mỏng hơn sợi tóc khoảng 3 lần**.',
    captionFr: 'Tout ce qui est à droite du cheveu demande un microscope. Une cellule est environ **3 fois plus fine qu’un cheveu**.',
  },

  // ── Section 2: defining the cell and where the word comes from ───────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    title: 'Defining the Cell',
    titleVn: 'Định nghĩa Tế bào',
    titleFr: 'La cellule',
    ratio: 50,
    side: 'left',
    inlineSvg: DIAGRAMS.TINY_ROOM,
    content: 'All living organisms — every plant, every animal, you — are built out of the same kind of tiny unit.',
    contentVn: 'Mọi sinh vật sống — mọi loài cây, mọi loài vật, và cả em — đều được tạo nên từ cùng một loại đơn vị tí hon.',
    contentFr: 'Tous les êtres vivants — plantes, animaux, toi — sont faits du même genre de minuscule unité.',
    notes: [
      {
        tone: 'write',
        text: '**Cell:** the smallest basic unit of all living organisms.',
        textVn: '**Tế bào:** đơn vị cơ bản nhỏ nhất của mọi sinh vật sống.',
        textFr: '**Cellule :** la plus petite unité de base du vivant.',
      },
    ],
    reveal: {
      label: 'Every class is an English class — where does "cell" come from?',
      labelVn: 'Mỗi tiết học đều là tiết tiếng Anh — từ "cell" đến từ đâu?',
      labelFr: 'Cours d’anglais : d’où vient le mot « cell » ?',
      prompt: '**Hint:** you already know this word. What are **prison cells**? What makes a prison cell a "cell"?',
      promptVn: '**Gợi ý:** em đã biết từ này rồi. **Prison cell** (phòng giam) là gì? Điều gì khiến một phòng giam được gọi là "cell"?',
      promptFr: '**Indice :** tu connais ce mot. Une **prison cell**, c’est quoi ? Pourquoi dit-on « cell » ?',
      answer: 'From the Latin word **cella**, meaning a "**small room**". A prison cell is a small bare room — and so was a monk’s cell. Robert Hooke looked at cork through an early microscope, saw rows of little empty boxes, and used the same word.',
      answerVn: 'Từ tiếng Latin **cella**, nghĩa là "**căn phòng nhỏ**". Phòng giam là một căn phòng nhỏ trống trải — phòng của tu sĩ cũng vậy. Robert Hooke quan sát nút bần qua kính hiển vi thời đầu, thấy những dãy hộp nhỏ trống rỗng, và dùng đúng từ đó.',
      answerFr: 'Du latin **cella**, « **petite pièce** ». Une cellule de prison est une petite pièce vide — comme celle d’un moine. Robert Hooke a vu, dans un des premiers microscopes, du liège fait de petites cases vides, et a pris le même mot.',
    },
  },
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Boxes',
    title: 'Same Word, Two Places',
    titleVn: 'Cùng một từ, hai nơi',
    titleFr: 'Un mot, deux endroits',
    columns: [
      {
        heading: 'A prison cell', headingVn: 'Phòng giam', headingFr: 'Une cellule de prison',
        accent: '#5c6570',
        icon: 'Home',
        image: prisonCell,
        caption: 'A small, bare room. This is the meaning you already knew.',
        captionVn: 'Một căn phòng nhỏ, trống trải. Đây là nghĩa em đã biết.',
        captionFr: 'Une petite pièce vide. C’est le sens que tu connaissais déjà.',
      },
      {
        heading: 'Hooke’s cork, 1665', headingVn: 'Nút bần của Hooke, 1665', headingFr: 'Le liège de Hooke, 1665',
        accent: PURPLE,
        icon: 'Microscope',
        image: hookeCork,
        caption: 'Robert Hooke’s own drawing of cork under his microscope — rows of little rooms. He named them **cells**, and the name stuck for 360 years.',
        captionVn: 'Bản vẽ của chính Robert Hooke về nút bần dưới kính hiển vi — những dãy phòng nhỏ. Ông gọi chúng là **cells**, và cái tên ấy tồn tại suốt 360 năm.',
        captionFr: 'Le dessin de Robert Hooke lui-même : du liège sous son microscope — des rangées de petites pièces. Il les a appelées **cells**, et le nom est resté depuis 360 ans.',
      },
    ],
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ScanEye',
    title: 'Seeing Them For Real',
    titleVn: 'Nhìn thấy chúng thật sự',
    titleFr: 'Les voir pour de vrai',
    ratio: 45,
    side: 'left',
    image: lbLeaf,
    content:
      'This is part of a **leaf**, photographed through a microscope. Every one of those pale boxes is a single living cell.\n\n' +
      'Look at the little **green circles** inside them. What do you think they are? Why are they green? What might happen inside them?',
    contentVn:
      'Đây là một phần của **chiếc lá**, chụp qua kính hiển vi. Mỗi ô nhạt màu đó là một tế bào sống.\n\n' +
      'Hãy nhìn những **chấm tròn xanh** bên trong. Em nghĩ đó là gì? Vì sao chúng có màu xanh? Bên trong chúng có thể xảy ra điều gì?',
    contentFr:
      'Voici une partie d’une **feuille**, photographiée au microscope. Chacune de ces cases pâles est une cellule vivante.\n\n' +
      'Regarde les petits **ronds verts** à l’intérieur. À ton avis, qu’est-ce que c’est ? Pourquoi sont-ils verts ? Que peut-il se passer dedans ?',
    reveal: {
      label: 'Discuss with your partner, then reveal',
      labelVn: 'Thảo luận với bạn, rồi hiện đáp án',
      labelFr: 'Discute avec ton voisin, puis regarde la réponse',
      answer: 'They are **chloroplasts**. They are green because they are full of a green substance called **chlorophyll**, and inside them the plant makes its own food using sunlight.',
      answerVn: 'Đó là **lục lạp**. Chúng có màu xanh vì chứa đầy chất màu xanh gọi là **diệp lục**, và bên trong chúng cây tự tạo ra thức ăn nhờ ánh sáng mặt trời.',
      answerFr: 'Ce sont des **chloroplastes**. Ils sont verts car ils sont pleins d’une substance verte, la **chlorophylle**. Dedans, la plante fabrique sa propre nourriture grâce à la lumière du soleil.',
    },
    caption: 'Part of a leaf seen through a microscope (Learner’s Book, p. 9)',
    captionVn: 'Một phần chiếc lá nhìn qua kính hiển vi (Sách học sinh, tr. 9)',
    captionFr: 'Une partie d’une feuille au microscope (manuel de l’élève, p. 9)',
  },

  // ── Section 3: inside the tiny room ──────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Boxes',
    title: 'Inside the Tiny Room',
    titleVn: 'Bên trong căn phòng nhỏ',
    titleFr: 'Dans la petite pièce',
    ratio: 45,
    content:
      'A classroom has furniture. A human body has organs. In the same way, a cell has tiny structures inside it, and each one has a job.\n\n' +
      'Tap a part on the right to find out what it does. 👉',
    contentVn:
      'Lớp học có bàn ghế. Cơ thể người có các cơ quan. Tương tự, tế bào có những cấu trúc nhỏ bên trong, và mỗi cái có một nhiệm vụ.\n\n' +
      'Chạm vào một bộ phận bên phải để xem nó làm gì. 👉',
    contentFr:
      'Une classe a des meubles. Le corps humain a des organes. De la même façon, une cellule contient de minuscules structures, et chacune a un travail.\n\n' +
      'Touche une partie à droite pour voir ce qu’elle fait. 👉',
    notes: [
      {
        tone: 'write',
        text: '**Organelle:** a tiny structure inside a cell that does one specific, important job to keep the cell alive.',
        textVn: '**Bào quan:** một cấu trúc nhỏ bên trong tế bào, đảm nhận một nhiệm vụ cụ thể, quan trọng để giữ tế bào sống.',
        textFr: '**Organite :** une minuscule structure dans une cellule, qui fait un travail précis et important pour garder la cellule en vie.',
      },
    ],
    widget: CellExplorerWidget,
  },
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Leaf',
    eyebrow: 'Learner’s Book, page 9',
    eyebrowVn: 'Sách học sinh, trang 9',
    eyebrowFr: 'Manuel de l’élève, page 9',
    title: 'Parts of a Plant Cell',
    titleVn: 'Các bộ phận của tế bào thực vật',
    titleFr: 'Les parties d’une cellule végétale',
    image: lbPlantCell,
    drawThis: true,
    caption: 'Copy this diagram into your notebook and label all **seven** parts. Take your time — neat lines, no shading.',
    captionVn: 'Chép hình này vào vở và chú thích đủ **bảy** bộ phận. Làm từ tốn — nét gọn, không tô bóng.',
    captionFr: 'Recopie ce schéma dans ton cahier et légende les **sept** parties. Prends ton temps — traits propres, pas d’ombres.',
  },

  // ── Section 4: the organelles every cell has ─────────────────────────────
  {
    layout: 'gallery',
    accent: TEAL,
    icon: 'Layers',
    tone: 'write',
    columns: 4,
    eyebrow: 'The standard features',
    eyebrowVn: 'Những bộ phận tiêu chuẩn',
    eyebrowFr: 'Les parties de base',
    title: 'Every Cell Has These Four',
    titleVn: 'Mọi tế bào đều có bốn bộ phận này',
    titleFr: 'Toutes les cellules ont ces quatre parties',
    content: 'Animal cells and plant cells both have all four. The highlighted part shows you where it sits.',
    contentVn: 'Cả tế bào động vật và thực vật đều có đủ bốn bộ phận. Phần được tô đậm cho em thấy vị trí của nó.',
    contentFr: 'Les cellules animales et végétales ont toutes les quatre. La partie en couleur montre où elle se trouve.',
    items: [
      {
        inlineSvg: DIAGRAMS.ORG_MEMBRANE,
        term: 'Cell membrane', termVn: 'Màng tế bào', termFr: 'Membrane cellulaire',
        text: 'A very thin, flexible layer that **controls what goes in and out** of the cell.',
        textVn: 'Lớp rất mỏng và linh hoạt, **kiểm soát những gì ra vào** tế bào.',
        textFr: 'Une couche très fine et souple qui **contrôle ce qui entre et sort** de la cellule.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_CYTOPLASM,
        term: 'Cytoplasm', termVn: 'Tế bào chất', termFr: 'Cytoplasme',
        text: 'A clear, jelly-like substance where the cell’s **chemical reactions** happen.',
        textVn: 'Chất trong suốt, dạng thạch, nơi diễn ra các **phản ứng hoá học** của tế bào.',
        textFr: 'Une substance claire, comme de la gelée, où se font les **réactions chimiques** de la cellule.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_NUCLEUS,
        term: 'Nucleus', termVn: 'Nhân', termFr: 'Noyau',
        text: 'The **control centre** — the "boss" that manages everything the cell does.',
        textVn: '**Trung tâm điều khiển** — "ông chủ" quản lý mọi hoạt động của tế bào.',
        textFr: 'Le **centre de contrôle** — le « chef » qui dirige tout ce que fait la cellule.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_MITOCHONDRIA,
        term: 'Mitochondria', termVn: 'Ti thể', termFr: 'Mitochondries',
        tag: 'plural', tagVn: 'số nhiều', tagFr: 'pluriel',
        text: 'Where **energy is released from food**. One of them is a mitochondrion.',
        textVn: 'Nơi **năng lượng được giải phóng từ thức ăn**. Số ít là "mitochondrion".',
        textFr: 'Là où **l’énergie est libérée à partir de la nourriture**. Au singulier : une mitochondrie.',
      },
    ],
  },

  // ── Section 5: the plant-only extras ─────────────────────────────────────
  // The five plant-only terms, split so each pair gets room to breathe and can
  // be paired with the real thing under a microscope.
  {
    layout: 'gallery',
    accent: GREEN,
    icon: 'Leaf',
    tone: 'plant',
    columns: 2,
    eyebrow: 'Plant cell exclusives · 1 of 2',
    eyebrowVn: 'Đặc quyền của tế bào thực vật · 1/2',
    eyebrowFr: 'Seulement chez les plantes · 1 sur 2',
    title: 'What Holds a Plant Up',
    titleVn: 'Điều gì giữ cho cây đứng vững',
    titleFr: 'Ce qui tient une plante debout',
    content: 'A plant cell has **everything** an animal cell has, **plus** some extras. An animal has a skeleton to hold it up — a plant does not, so every single cell needs a stiff box around it.',
    contentVn: 'Tế bào thực vật có **mọi thứ** mà tế bào động vật có, **cộng thêm** vài phần nữa. Động vật có bộ xương để nâng đỡ — cây thì không, nên mỗi tế bào cần một chiếc hộp cứng bao quanh.',
    contentFr: 'Une cellule végétale a **tout** ce qu’a une cellule animale, **plus** quelques extras. Un animal a un squelette pour le tenir — une plante non, alors chaque cellule a besoin d’une boîte rigide autour d’elle.',
    items: [
      {
        inlineSvg: DIAGRAMS.ORG_WALL,
        term: 'Cell wall', termVn: 'Thành tế bào', termFr: 'Paroi cellulaire',
        text: 'A strong, stiff outer layer that **holds the plant cell in shape**.',
        textVn: 'Lớp ngoài chắc và cứng, **giữ hình dạng cho tế bào thực vật**.',
        textFr: 'Une couche externe solide et rigide qui **garde la forme de la cellule végétale**.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_CELLULOSE,
        term: 'Cellulose', termVn: 'Xenlulozơ', termFr: 'Cellulose',
        text: 'The tough, fibrous substance that the **cell wall is made of**.',
        textVn: 'Chất dai, dạng sợi, **cấu tạo nên thành tế bào**.',
        textFr: 'La substance dure et fibreuse dont est **faite la paroi cellulaire**.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_VACUOLE,
        term: 'Sap vacuole', termVn: 'Không bào', termFr: 'Vacuole',
        text: 'A large space of cell sap — sugars and water — that **keeps the cell firm**, like air in a tyre.',
        textVn: 'Khoảng lớn chứa dịch tế bào — đường và nước — **giúp tế bào căng cứng**, như hơi trong lốp xe.',
        textFr: 'Un grand espace plein de suc cellulaire — sucres et eau — qui **garde la cellule ferme**, comme l’air dans un pneu.',
      },
      {
        image: onionCells,
        term: 'The real thing', termVn: 'Vật thật', termFr: 'Pour de vrai',
        text: 'Onion cells down a microscope. Those hard straight edges are **cell walls** — animal cells never look this boxy.',
        textVn: 'Tế bào hành dưới kính hiển vi. Những cạnh thẳng cứng đó là **thành tế bào** — tế bào động vật không bao giờ vuông vắn như vậy.',
        textFr: 'Des cellules d’oignon au microscope. Ces bords droits et durs sont des **parois cellulaires** — les cellules animales ne sont jamais aussi carrées.',
      },
    ],
  },
  {
    layout: 'gallery',
    accent: GREEN,
    icon: 'Sun',
    tone: 'plant',
    columns: 3,
    eyebrow: 'Plant cell exclusives · 2 of 2',
    eyebrowVn: 'Đặc quyền của tế bào thực vật · 2/2',
    eyebrowFr: 'Seulement chez les plantes · 2 sur 2',
    title: 'How a Plant Feeds Itself',
    titleVn: 'Cây tự nuôi mình bằng cách nào',
    titleFr: 'Comment une plante se nourrit',
    content: 'An animal has to go and find food. A plant makes its own, inside these — which is the whole reason plants are green.',
    contentVn: 'Động vật phải đi tìm thức ăn. Cây tự tạo ra thức ăn bên trong những bộ phận này — và đó chính là lý do cây có màu xanh.',
    contentFr: 'Un animal doit chercher sa nourriture. Une plante fabrique la sienne, à l’intérieur de ces parties — c’est pour ça que les plantes sont vertes.',
    items: [
      {
        inlineSvg: DIAGRAMS.ORG_CHLOROPLAST,
        term: 'Chloroplast', termVn: 'Lục lạp', termFr: 'Chloroplaste',
        text: 'Green structures where the plant **makes its food using sunlight**.',
        textVn: 'Cấu trúc màu xanh, nơi cây **tạo thức ăn nhờ ánh sáng mặt trời**.',
        textFr: 'Des structures vertes où la plante **fabrique sa nourriture grâce à la lumière du soleil**.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_CHLOROPHYLL,
        term: 'Chlorophyll', termVn: 'Diệp lục', termFr: 'Chlorophylle',
        text: 'The **green substance inside chloroplasts** that captures the sunlight.',
        textVn: '**Chất màu xanh bên trong lục lạp**, hấp thụ ánh sáng mặt trời.',
        textFr: 'La **substance verte dans les chloroplastes**, qui capte la lumière du soleil.',
      },
      {
        image: chloroplastsPhoto,
        term: 'The real thing', termVn: 'Vật thật', termFr: 'Pour de vrai',
        text: 'Chloroplasts inside a pondweed leaf. Every green dot is one chloroplast, packed with chlorophyll.',
        textVn: 'Lục lạp bên trong lá rong đuôi chó. Mỗi chấm xanh là một lục lạp, chứa đầy diệp lục.',
        textFr: 'Des chloroplastes dans une feuille de plante d’étang. Chaque point vert est un chloroplaste, plein de chlorophylle.',
      },
    ],
  },
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Scale',
    title: 'Side by Side',
    titleVn: 'So sánh trực tiếp',
    titleFr: 'Côte à côte',
    columns: [
      {
        heading: 'Animal cell', headingVn: 'Tế bào động vật', headingFr: 'Cellule animale',
        accent: '#c2185b',
        icon: 'Users',
        inlineSvg: DIAGRAMS.ANIMAL_CELL,
        caption: 'Round and soft. Membrane, cytoplasm, nucleus, mitochondria — and nothing else.',
        captionVn: 'Tròn và mềm. Màng, tế bào chất, nhân, ti thể — và không có gì thêm.',
        captionFr: 'Ronde et molle. Membrane, cytoplasme, noyau, mitochondries — et rien d’autre.',
      },
      {
        heading: 'Plant cell', headingVn: 'Tế bào thực vật', headingFr: 'Cellule végétale',
        accent: GREEN,
        icon: 'Leaf',
        inlineSvg: DIAGRAMS.PLANT_CELL,
        caption: 'Boxy and stiff. The same four parts, plus a wall, chloroplasts and a big sap vacuole.',
        captionVn: 'Vuông vắn và cứng. Vẫn bốn bộ phận đó, cộng thêm thành tế bào, lục lạp và không bào lớn.',
        captionFr: 'Carrée et rigide. Les mêmes quatre parties, plus une paroi, des chloroplastes et une grande vacuole.',
      },
    ],
  },
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'Not drawings — photographs',
    eyebrowVn: 'Không phải hình vẽ — ảnh chụp',
    eyebrowFr: 'Pas des dessins — des photos',
    title: 'The Same Two Cells, For Real',
    titleVn: 'Vẫn hai loại tế bào đó, ngoài đời thật',
    titleFr: 'Les deux mêmes cellules, pour de vrai',
    columns: [
      {
        heading: 'A human cheek cell', headingVn: 'Một tế bào má người', headingFr: 'Une cellule de joue humaine',
        accent: '#c2185b',
        icon: 'Users',
        image: cheekCells,
        caption: 'Scraped from the inside of someone’s cheek, then stained. Soft and shapeless, with no straight edges — the small dark dot near the middle is its **nucleus**.',
        captionVn: 'Lấy từ mặt trong má của một người rồi nhuộm màu. Mềm và không có hình dạng cố định, không có cạnh thẳng — chấm sẫm nhỏ ở giữa là **nhân** của nó.',
        captionFr: 'Prélevée à l’intérieur de la joue de quelqu’un, puis colorée. Molle et sans forme, sans bords droits — le petit point foncé au milieu est son **noyau**.',
      },
      {
        heading: 'Onion cells', headingVn: 'Tế bào hành', headingFr: 'Des cellules d’oignon',
        accent: GREEN,
        icon: 'Leaf',
        image: onionCells,
        caption: 'A single layer peeled off an onion. Stacked like bricks, because every one is inside a stiff **cell wall**.',
        captionVn: 'Một lớp mỏng bóc từ củ hành. Xếp chồng như những viên gạch, vì mỗi tế bào nằm trong một **thành tế bào** cứng.',
        captionFr: 'Une seule couche détachée d’un oignon. Rangées comme des briques, car chacune est dans une **paroi cellulaire** rigide.',
      },
    ],
  },

  // ── Section 6: beyond the book ───────────────────────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Zap',
    eyebrow: 'Expand your knowledge',
    eyebrowVn: 'Mở rộng kiến thức',
    eyebrowFr: 'Pour aller plus loin',
    title: 'The Cellular Highway',
    titleVn: 'Đường cao tốc của tế bào',
    titleFr: 'L’autoroute de la cellule',
    ratio: 45,
    inlineSvg: DIAGRAMS.ER_HIGHWAY,
    content:
      'Here is one bonus organelle that is not in your textbook: the **Endoplasmic Reticulum**, or **ER**.\n\n' +
      'Think of it as the cell’s **motorway system**. It folds around the nucleus and carries proteins and materials to wherever they are needed.',
    contentVn:
      'Đây là một bào quan thưởng thêm không có trong sách: **Lưới nội chất**, gọi tắt là **ER**.\n\n' +
      'Hãy hình dung nó như **hệ thống đường cao tốc** của tế bào. Nó cuộn quanh nhân và vận chuyển protein cùng vật liệu đến nơi cần thiết.',
    contentFr:
      'Voici un organite bonus qui n’est pas dans ton manuel : le **réticulum endoplasmique**, ou **ER**.\n\n' +
      'Imagine-le comme le **réseau d’autoroutes** de la cellule. Il se replie autour du noyau et transporte les protéines et les matériaux là où il en faut.',
    notes: [
      {
        tone: 'theory',
        text: 'You will not be tested on the ER this year — but scientists never stop at the syllabus.',
        textVn: 'Năm nay em sẽ không bị kiểm tra về ER — nhưng nhà khoa học thì không bao giờ dừng ở chương trình học.',
        textFr: 'Il n’y aura pas de contrôle sur l’ER cette année — mais un scientifique ne s’arrête jamais au programme.',
      },
    ],
  },

  // ── Section 7: the invisible world ───────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Microscope',
    eyebrow: 'Learner’s Book, page 10',
    eyebrowVn: 'Sách học sinh, trang 10',
    eyebrowFr: 'Manuel de l’élève, page 10',
    title: 'The Tool That Makes It Visible',
    titleVn: 'Công cụ giúp ta nhìn thấy',
    titleFr: 'L’outil qui rend visible',
    image: lbMicroscope,
    drawThis: true,
    caption: 'Find every one of these parts on a real microscope: **eyepiece · coarse and fine focussing knobs · three objective lenses · stage · mirror**.',
    captionVn: 'Hãy tìm đủ các bộ phận này trên kính hiển vi thật: **thị kính · núm chỉnh thô và chỉnh tinh · ba vật kính · bàn kính · gương**.',
    captionFr: 'Trouve chacune de ces parties sur un vrai microscope : **oculaire · vis de mise au point (grosse et fine) · trois objectifs · platine · miroir**.',
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Telescope',
    title: 'How Does It Magnify?',
    titleVn: 'Nó phóng đại bằng cách nào?',
    titleFr: 'Comment grossit-il ?',
    ratio: 45,
    side: 'left',
    inlineSvg: DIAGRAMS.MICROSCOPE_LIGHT,
    content:
      'Light shines up through the specimen. Two curved pieces of glass — **lenses** — bend that light, and the image reaching your eye is far bigger than the real thing.',
    contentVn:
      'Ánh sáng chiếu xuyên qua mẫu vật. Hai miếng thuỷ tinh cong — **thấu kính** — bẻ cong ánh sáng đó, và hình ảnh đến mắt em to hơn vật thật rất nhiều.',
    contentFr:
      'La lumière traverse l’échantillon d’en bas. Deux verres courbés — des **lentilles** — dévient la lumière, et l’image dans ton œil est bien plus grande que l’objet.',
    notes: [
      {
        tone: 'write',
        text: '**Microscope:** a scientific tool that uses curved pieces of glass, called lenses, to bend light and **magnify** an image — make it look much bigger than it really is.',
        textVn: '**Kính hiển vi:** dụng cụ khoa học dùng các miếng thuỷ tinh cong, gọi là thấu kính, để bẻ ánh sáng và **phóng đại** hình ảnh — làm nó trông to hơn thực tế rất nhiều.',
        textFr: '**Microscope :** outil scientifique dont les verres courbés, les lentilles, dévient la lumière pour **grossir** une image — la faire paraître bien plus grande.',
      },
      {
        tone: 'info',
        text: 'Once the lab kit arrives, we will use these ourselves on real onion cells.',
        textVn: 'Khi có thiết bị phòng thí nghiệm, chúng ta sẽ tự dùng chúng để quan sát tế bào hành thật.',
        textFr: 'Le matériel arrivé, on les utilisera sur de vraies cellules d’oignon.',
      },
    ],
  },
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'ScanEye',
    eyebrow: 'Pushing the limits',
    eyebrowVn: 'Vượt giới hạn',
    eyebrowFr: 'Repousser les limites',
    title: 'Smaller Than a Cell',
    titleVn: 'Nhỏ hơn cả tế bào',
    titleFr: 'Plus petit qu’une cellule',
    ratio: 45,
    side: 'left',
    image: electronMicroscope,
    content:
      'To see things smaller than a cell — **viruses**, or even single **molecules** — scientists use an **Electron Microscope** like this one. It fills a room and costs more than a house.\n\n' +
      'Here is the puzzle. If something is too small for a wave of light to bounce off it, how could this machine possibly see it?',
    contentVn:
      'Để nhìn những thứ nhỏ hơn tế bào — **virus**, hay thậm chí từng **phân tử** — các nhà khoa học dùng **Kính hiển vi điện tử** như chiếc này. Nó chiếm cả một căn phòng và đắt hơn một ngôi nhà.\n\n' +
      'Câu đố là đây. Nếu một vật quá nhỏ để sóng ánh sáng phản xạ lại, thì cỗ máy này nhìn thấy nó bằng cách nào?',
    contentFr:
      'Pour voir des choses plus petites qu’une cellule — des **virus**, ou même une seule **molécule** — les scientifiques utilisent un **microscope électronique** comme celui-ci. Il remplit une pièce et coûte plus cher qu’une maison.\n\n' +
      'Voici l’énigme. Si une chose est trop petite pour qu’une onde de lumière rebondisse dessus, comment cette machine peut-elle la voir ?',
    reveal: {
      label: 'Discuss, then reveal',
      labelVn: 'Thảo luận rồi hiện đáp án',
      labelFr: 'Discute, puis regarde la réponse',
      answer: 'It fires a beam of **electrons** instead of light. An electron is far smaller than a wave of light, so it can pick out detail that light simply slides past.',
      answerVn: 'Nó bắn một chùm **electron** thay cho ánh sáng. Electron nhỏ hơn sóng ánh sáng rất nhiều, nên nó thấy được những chi tiết mà ánh sáng lướt qua mất.',
      answerFr: 'Elle envoie un faisceau d’**électrons** au lieu de lumière. Un électron est bien plus petit qu’une onde de lumière, donc il voit des détails que la lumière ne voit pas.',
    },
    caption: 'A modern electron microscope.',
    captionVn: 'Một kính hiển vi điện tử hiện đại.',
    captionFr: 'Un microscope électronique moderne.',
  },

  // ── Section 8: models, limitations, and the recap ────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'GraduationCap',
    eyebrow: 'Moving forward',
    eyebrowVn: 'Bước tiếp theo',
    eyebrowFr: 'Étape suivante',
    title: 'Building Models with Mr Seth',
    titleVn: 'Làm mô hình với thầy Seth',
    titleFr: 'Des modèles avec M. Seth',
    ratio: 45,
    inlineSvg: DIAGRAMS.MODEL_LIMITS,
    content:
      'In class with **Mr Seth** you will build physical **models** of these cells out of boxes, bags, beads and modelling clay.\n\n' +
      'A model helps you think — but a model is never the real thing. Keep asking yourself what yours is missing.',
    contentVn:
      'Trong tiết học với **thầy Seth**, các em sẽ làm **mô hình** vật lý của tế bào từ hộp, túi, hạt và đất nặn.\n\n' +
      'Mô hình giúp em tư duy — nhưng mô hình không bao giờ là vật thật. Hãy luôn tự hỏi mô hình của mình còn thiếu gì.',
    contentFr:
      'En classe avec **M. Seth**, tu vas construire des **modèles** de ces cellules avec des boîtes, des sachets, des perles et de la pâte à modeler.\n\n' +
      'Un modèle t’aide à réfléchir — mais un modèle n’est jamais l’objet réel. Demande-toi toujours ce qui manque au tien.',
    notes: [
      {
        tone: 'write',
        text: '**Limitations:** the weaknesses of a scientific model — the ways it is different from the real object.',
        textVn: '**Hạn chế:** những điểm yếu của một mô hình khoa học — những chỗ nó khác với vật thật.',
        textFr: '**Limites :** les points faibles d’un modèle scientifique — ce en quoi il est différent de l’objet réel.',
      },
    ],
  },
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you leave',
    eyebrowVn: 'Trước khi ra về',
    eyebrowFr: 'Avant de partir',
    title: 'Can You Do All Six?',
    titleVn: 'Em làm được cả sáu điều này chứ?',
    titleFr: 'Sais-tu faire les six ?',
    content:
      'Read each line and be honest with yourself. If you could not explain one of them to a friend who missed today, that is the part to look at tonight.\n\n' +
      '> Your notebook should now have **13 definitions** and **2 labelled drawings** in it. Check.',
    contentVn:
      'Đọc từng dòng và thành thật với chính mình. Nếu có điều nào em chưa giải thích được cho một bạn vắng mặt hôm nay, thì tối nay hãy xem lại phần đó.\n\n' +
      '> Trong vở của em bây giờ phải có **13 định nghĩa** và **2 hình vẽ có chú thích**. Hãy kiểm tra lại.',
    contentFr:
      'Lis chaque ligne et sois honnête avec toi-même. Si tu ne peux pas expliquer une ligne à un ami absent aujourd’hui, revois cette partie ce soir.\n\n' +
      '> Ton cahier doit maintenant contenir **13 définitions** et **2 dessins légendés**. Vérifie.',
    items: [
      { text: 'Say **how small a cell is** — with a number or a comparison.', textVn: 'Nói được **tế bào nhỏ đến mức nào** — bằng con số hoặc phép so sánh.', textFr: 'Dire **à quel point une cellule est petite** — avec un nombre ou une comparaison.' },
      { text: 'Define a **cell** and an **organelle**, and say where the word "cell" came from.', textVn: 'Định nghĩa **tế bào** và **bào quan**, và nói được từ "cell" bắt nguồn từ đâu.', textFr: 'Définir une **cellule** et un **organite**, et dire d’où vient le mot « cell ».' },
      { text: 'Name the **four parts every cell has**, and what each one does.', textVn: 'Kể được **bốn bộ phận mọi tế bào đều có** và nhiệm vụ của từng cái.', textFr: 'Nommer les **quatre parties de toutes les cellules**, et le rôle de chacune.' },
      { text: 'Name the **five plant-only parts**, and why a plant needs them.', textVn: 'Kể được **năm bộ phận chỉ có ở thực vật**, và vì sao cây cần chúng.', textFr: 'Nommer les **cinq parties propres aux plantes**, et pourquoi la plante en a besoin.' },
      { text: 'Explain what a **microscope** does, and label its main parts.', textVn: 'Giải thích **kính hiển vi** làm gì, và chú thích các bộ phận chính.', textFr: 'Expliquer ce que fait un **microscope**, et légender ses parties principales.' },
      { text: 'Explain the **limitations** of a scientific model.', textVn: 'Giải thích **hạn chế** của một mô hình khoa học.', textFr: 'Expliquer les **limites** d’un modèle scientifique.' },
    ],
  },

  // ── Section 9: homework ──────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: RED,
    icon: 'Home',
    eyebrow: 'Homework Assignment',
    eyebrowVn: 'Bài tập về nhà',
    eyebrowFr: 'Devoirs',
    title: 'For Next Lesson',
    titleVn: 'Cho tiết học sau',
    titleFr: 'Pour le prochain cours',
    content: 'Take your science notebook home with you.',
    contentVn: 'Hãy mang vở khoa học về nhà.',
    contentFr: 'Emporte ton cahier de sciences à la maison.',
    notes: [
      {
        tone: 'homework',
        badge: 'Reading Task',
        badgeVn: 'Bài đọc',
        badgeFr: 'Lecture',
        icon: 'BookOpen',
        text: 'Read the whole of Unit 1.1, **pages 8 to 12**.',
        textVn: 'Đọc toàn bộ Bài 1.1, **trang 8 đến 12**.',
        textFr: 'Lis toute l’unité 1.1, **pages 8 à 12**.',
      },
      {
        tone: 'homework',
        badge: 'Writing Task',
        badgeVn: 'Bài viết',
        badgeFr: 'Écriture',
        icon: 'Pencil',
        text: 'Turn to **page 9** and copy the **2 Questions** into your notebook. Answer them in **full, complete English sentences** — not single words.',
        textVn: 'Mở **trang 9**, chép **2 câu hỏi** vào vở. Trả lời bằng **câu tiếng Anh đầy đủ, hoàn chỉnh** — không viết cụt ngủn.',
        textFr: 'Ouvre à la **page 9** et recopie les **2 questions** dans ton cahier. Réponds par des **phrases complètes, en anglais** — pas par un seul mot.',
      },
    ],
  },
]
