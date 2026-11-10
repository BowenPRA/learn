// content/y7-science/U01_2/slides.js
// Year 7 Science · 1.2 Animal Cells. Monday 10 August 2026.
//
// Same house style as 1.1: teal section headers, purple activity boxes, red
// homework, green for plant-only, and the Learner's Book orange for every key
// word students are expected to copy down. Anything a student must write into
// their notebook is either an orange "Write This Down" panel or an orange-ruled
// bumper — never plain body text.
//
// The teaching spine is the same too: ask the question on its own slide before
// any numbers appear, pair every drawn diagram with the real thing under a
// microscope, and stop for the English whenever a word is doing more work than
// it looks.
//
// Figures marked `lb-*` are scans from the Learner's Book (Unit 1.2, pp. 13–16);
// see images/CREDITS.json. Everything else is drawn in diagrams.js or is an
// openly-licensed photograph.
import { DIAGRAMS } from './diagrams.js'
import { PlantOrAnimalWidget } from './widgets.jsx'
import lbAnimalCell from './images/lb-animal-cell.jpg'
import lbCellArtwork from './images/lb-cell-artwork.jpg'
import milkyWay from './images/milky-way.jpg'
import cheekCells from './images/cheek-cells.jpg'
import neuron from './images/neuron.jpg'
import slideCoverslip from './images/slide-coverslip.jpg'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const RED = '#c8102e'
const BLUE = '#1a5fa8'
const CRIMSON = '#c2185b' // the animal-cell colour, used all through 1.1 too

export const slides = [
  // ── Section 1: pick up where 1.1 stopped ─────────────────────────────────
  {
    layout: 'hero',
    color: CRIMSON,
    icon: 'Dna',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    brandFr: 'Sciences 7e année',
    eyebrow: '1.2 Animal Cells',
    eyebrowVn: '1.2 Tế bào động vật',
    eyebrowFr: '1.2 Les cellules animales',
    date: '10 Aug 2026',
    // The eyebrow above already says "1.2 Animal Cells", so the title does not
    // need to repeat it — and this fits on one line at every projector size.
    title: 'What You Are Made Of',
    titleVn: 'Em được tạo nên từ gì',
    titleFr: 'Ce qui forme ton corps',
    card: {
      icon: 'Hourglass',
      badge: 'Starter Task',
      badgeVn: 'Nhiệm vụ khởi động',
      badgeFr: 'Pour commencer',
      text: 'Several parts of a **plant cell** begin with **c**. How many can you list? **Write your answer as a full sentence.**',
      textVn: 'Nhiều bộ phận của **tế bào thực vật** bắt đầu bằng **c**. Em kể được bao nhiêu? **Viết câu trả lời thành một câu hoàn chỉnh.**',
      textFr: 'En anglais, plusieurs parties d’une **cellule végétale** commencent par **c**. Combien peux-tu en citer ? **Écris ta réponse en une phrase complète.**',
    },
  },
  {
    layout: 'statement',
    accent: GREEN,
    eyebrow: 'Getting started · from the book',
    eyebrowVn: 'Khởi động · trong sách',
    eyebrowFr: 'Pour commencer · dans le manuel',
    label: 'Check your list',
    labelVn: 'Kiểm tra danh sách',
    labelFr: 'Vérifie ta liste',
    labelIcon: 'CheckCircle2',
    text: 'The book asks for **five**. You found **six** — because two of them are not **organelles**.',
    textVn: 'Sách hỏi **năm** từ. Em tìm ra **sáu** — vì hai trong số đó không phải là **bào quan**.',
    textFr: 'Le livre en demande **cinq**. Tu en as trouvé **six** — car deux d’entre eux ne sont pas des **organites**.',
    sub: '**Organelles:** cell wall, cell membrane, cytoplasm, chloroplast.  **Substances:** cellulose and chlorophyll — the materials those organelles are made of.',
    subVn: '**Bào quan:** thành tế bào, màng tế bào, tế bào chất, lục lạp.  **Chất:** xenlulozơ và diệp lục — vật liệu cấu tạo nên các bào quan đó.',
    subFr: '**Organites :** paroi cellulaire, membrane cellulaire, cytoplasme, chloroplaste.  **Substances :** cellulose et chlorophylle — les matériaux dont ces organites sont faits.',
  },

  // ── Section 2: the hook — ask first, count afterwards ─────────────────────
  // The question slide carries no numbers on purpose. Take wild guesses and
  // write a few on the board before moving on; the gap between their guess and
  // 100 trillion is the lesson.
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Users',
    eyebrow: 'In pairs — no calculators, just a guess',
    eyebrowVn: 'Theo cặp — không dùng máy tính, chỉ đoán',
    eyebrowFr: 'Par deux — pas de calculatrice, juste une estimation',
    title: 'How Many Cells Is Mr Bowen?',
    titleVn: 'Thầy Bowen có bao nhiêu tế bào?',
    titleFr: 'Combien de cellules dans M. Bowen ?',
    label: 'Discuss',
    labelVn: 'Thảo luận',
    labelFr: 'Discussion',
    labelIcon: 'MessageSquare',
    text: '**Guess** how many cells are inside Mr Bowen.',
    textVn: 'Hãy **đoán** xem thầy Bowen có bao nhiêu tế bào.',
    textFr: '**Devine** combien de cellules il y a dans M. Bowen.',
    sub: 'Nobody has ever counted them. A thousand? A million? A billion? Agree on **one** number.',
    subVn: 'Chưa ai từng đếm hết. Một nghìn? Một triệu? Một tỉ? Hãy thống nhất **một** con số.',
    subFr: 'Personne ne les a jamais comptées. Mille ? Un million ? Un milliard ? Mets-toi d’accord avec ton voisin sur **un seul** nombre.',
  },
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'The answer',
    eyebrowVn: 'Đáp án',
    eyebrowFr: 'La réponse',
    text: 'About **100 trillion** cells.',
    textVn: 'Khoảng **100 nghìn tỉ** tế bào.',
    textFr: 'Environ **100 000 milliards** de cellules.',
    sub: '100 000 000 000 000 — in one person.',
    subVn: '100 000 000 000 000 — trong một người.',
    subFr: '100 000 000 000 000 — dans une seule personne.',
    notes: [
      {
        tone: 'task',
        badge: 'Discuss',
        badgeVn: 'Thảo luận',
        badgeFr: 'Discussion',
        icon: 'MessageSquare',
        text: 'How big is a trillion?\nHow long would it take you to count to a trillion?',
        textVn: 'Một nghìn tỉ lớn đến mức nào?\nEm sẽ mất bao lâu để đếm đến một nghìn tỉ?',
        textFr: 'C’est grand comment, mille milliards ?\nCombien de temps te faudrait-il pour compter jusqu’à mille milliards ?',
      },
    ],
  },
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Sparkles',
    eyebrow: 'The answer',
    eyebrowVn: 'Đáp án',
    eyebrowFr: 'La réponse',
    title: 'More Cells Than Stars',
    titleVn: 'Nhiều tế bào hơn cả số sao',
    titleFr: 'Plus de cellules que d’étoiles',
    image: milkyWay,
    caption: 'Our whole galaxy holds about **400 billion stars**. You are built from about **100 trillion cells** — at least **250 times more**. Every one of them is doing a job right now, while you sit there.',
    captionVn: 'Cả thiên hà của chúng ta có khoảng **400 tỉ ngôi sao**. Còn em được tạo nên từ khoảng **100 nghìn tỉ tế bào** — nhiều gấp ít nhất **250 lần**. Mỗi tế bào đều đang làm việc ngay lúc này, khi em ngồi đây.',
    captionFr: 'Toute notre galaxie contient environ **400 milliards d’étoiles**. Ton corps contient environ **100 000 milliards de cellules** — au moins **250 fois plus**. Chacune d’elles fait un travail en ce moment même.',
  },
  {
    layout: 'showcase',
    accent: CRIMSON,
    icon: 'Microscope',
    eyebrow: 'Learner’s Book, page 13',
    eyebrowVn: 'Sách học sinh, trang 13',
    eyebrowFr: 'Manuel de l’élève, page 13',
    title: 'One of Them, Close Up',
    titleVn: 'Nhìn gần một tế bào',
    titleFr: 'L’une d’elles, de près',
    image: lbCellArtwork,
    caption: 'An artist’s picture of animal cells. The purple lump is the **nucleus**; the small pale sausages floating around it are **mitochondria**. You already met both of those last lesson.',
    captionVn: 'Hình vẽ minh hoạ tế bào động vật. Khối màu tím là **nhân**; những hạt nhỏ nhạt màu hình xúc xích quanh nó là **ti thể**. Em đã gặp cả hai trong tiết học trước.',
    captionFr: 'Un dessin d’artiste de cellules animales. La masse violette est le **noyau** ; les petites saucisses pâles autour sont des **mitochondries**. Tu as déjà vu les deux au dernier cours.',
  },

  // ── Section 3: the parts of an animal cell ───────────────────────────────
  {
    layout: 'split',
    accent: CRIMSON,
    icon: 'Boxes',
    title: 'Parts of an Animal Cell',
    titleVn: 'Các bộ phận của tế bào động vật',
    titleFr: 'La cellule animale',
    ratio: 45,
    inlineSvg: DIAGRAMS.ANIMAL_CELL,
    content:
      'All animals are made of cells. **You are an animal**, so your body is made of cells too.\n\n' +
      'An animal cell is **similar** to a plant cell in several ways — and we will come back to that word.',
    contentVn:
      'Mọi loài vật đều được tạo nên từ tế bào. **Em cũng là một động vật**, nên cơ thể em cũng được tạo nên từ tế bào.\n\n' +
      'Tế bào động vật **tương tự** tế bào thực vật ở nhiều điểm — và chúng ta sẽ quay lại với từ này.',
    contentFr:
      'Tous les animaux sont faits de cellules. **Tu es un animal**, donc toi aussi.\n\n' +
      'Une cellule animale est **semblable** à une cellule végétale sur plusieurs points — on reviendra sur ce mot.',
    notes: [
      {
        tone: 'write',
        text: '**An animal cell has:** a cell membrane, cytoplasm, mitochondria and a nucleus.',
        textVn: '**Tế bào động vật có:** màng tế bào, tế bào chất, ti thể và nhân.',
        textFr: '**Cellule animale :** membrane cellulaire, cytoplasme, mitochondries et noyau.',
      },
    ],
    reveal: {
      label: 'Quick check — what does each one do?',
      labelVn: 'Kiểm tra nhanh — mỗi bộ phận làm nhiệm vụ gì?',
      labelFr: 'Vite — que fait chaque partie ?',
      answer:
        '**Cell membrane:** controls what goes in and out of the cell.\n' +
        '**Cytoplasm:** where the cell’s chemical reactions happen.\n' +
        '**Mitochondria:** where energy is released from food.\n' +
        '**Nucleus:** the control centre that manages everything.',
      answerVn:
        '**Màng tế bào:** kiểm soát những gì ra vào tế bào.\n' +
        '**Tế bào chất:** nơi diễn ra các phản ứng hoá học của tế bào.\n' +
        '**Ti thể:** nơi năng lượng được giải phóng từ thức ăn.\n' +
        '**Nhân:** trung tâm điều khiển mọi hoạt động.',
      answerFr:
        '**Membrane cellulaire :** contrôle ce qui entre et sort.\n' +
        '**Cytoplasme :** lieu des réactions chimiques de la cellule.\n' +
        '**Mitochondries :** libèrent l’énergie de la nourriture.\n' +
        '**Noyau :** le centre de contrôle qui dirige tout.',
    },
  },
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Learner’s Book, page 14',
    eyebrowVn: 'Sách học sinh, trang 14',
    eyebrowFr: 'Manuel de l’élève, page 14',
    title: 'Draw It and Label It',
    titleVn: 'Vẽ và chú thích',
    titleFr: 'Dessine et légende',
    image: lbAnimalCell,
    drawThis: true,
    caption: 'Copy this drawing into your notebook and label all **four** parts. Neat lines, no shading — and give your drawing a title.',
    captionVn: 'Chép hình này vào vở và chú thích đủ **bốn** bộ phận. Nét gọn, không tô bóng — và nhớ đặt tên cho hình vẽ.',
    captionFr: 'Recopie ce dessin dans ton cahier et légende les **quatre** parties. Traits propres, pas d’ombres — et donne un titre à ton dessin.',
  },

  // ── Section 4: the difference — asked before it is answered ──────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Scale',
    eyebrow: 'In pairs — two minutes, and no calling out',
    eyebrowVn: 'Theo cặp — hai phút, không nói to đáp án',
    eyebrowFr: 'Par deux — deux minutes, sans crier la réponse',
    title: 'Spot the Difference',
    titleVn: 'Tìm điểm khác nhau',
    titleFr: 'Trouve les différences',
    inlineSvg: DIAGRAMS.SPOT_THE_DIFFERENCE,
    caption: 'The plant cell has **three things** the animal cell has not got. Find all three, and **write them down** — do not say them out loud yet.',
    captionVn: 'Tế bào thực vật có **ba thứ** mà tế bào động vật không có. Hãy tìm đủ cả ba và **viết ra giấy** — chưa nói to vội.',
    captionFr: 'La cellule végétale a **trois choses** que la cellule animale n’a pas. Trouve les trois et **écris-les** — ne les dis pas encore à voix haute.',
  },
  {
    layout: 'gallery',
    accent: GREEN,
    icon: 'Leaf',
    tone: 'plant',
    columns: 3,
    eyebrow: 'The answer',
    eyebrowVn: 'Đáp án',
    eyebrowFr: 'La réponse',
    title: 'Three Things an Animal Cell Has Not Got',
    titleVn: 'Ba thứ tế bào động vật không có',
    titleFr: 'Trois choses qu’une cellule animale n’a pas',
    copyLabel: 'Write This Down',
    copyLabelVn: 'Chép vào vở',
    copyLabelFr: 'À recopier',
    content: 'A plant cell has **everything** an animal cell has, **plus** these three. In each picture the rest of the cell is greyed out, so you can see exactly where the part sits.',
    contentVn: 'Tế bào thực vật có **mọi thứ** tế bào động vật có, **cộng thêm** ba phần này. Trong mỗi hình, phần còn lại của tế bào được làm mờ để em thấy rõ vị trí của bộ phận đó.',
    contentFr: 'Une cellule végétale a **tout** ce qu’a une cellule animale, **plus** ces trois parties. Sur chaque image, le reste de la cellule est en gris, pour bien voir où se trouve la partie.',
    items: [
      {
        inlineSvg: DIAGRAMS.ORG_WALL,
        term: 'Cell wall', termVn: 'Thành tế bào', termFr: 'Paroi cellulaire',
        text: 'A strong, stiff outer layer made of **cellulose**. It holds the plant cell in shape.',
        textVn: 'Lớp ngoài chắc và cứng, làm bằng **xenlulozơ**. Nó giữ hình dạng cho tế bào thực vật.',
        textFr: 'Une couche externe solide et rigide, faite de **cellulose**. Elle garde la forme de la cellule végétale.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_CHLOROPLAST,
        term: 'Chloroplasts', termVn: 'Lục lạp', termFr: 'Chloroplastes',
        text: 'Green structures where the plant **makes its own food** using sunlight.',
        textVn: 'Cấu trúc màu xanh, nơi cây **tự tạo ra thức ăn** nhờ ánh sáng mặt trời.',
        textFr: 'Des structures vertes où la plante **fabrique sa propre nourriture** grâce à la lumière du soleil.',
      },
      {
        inlineSvg: DIAGRAMS.ORG_VACUOLE,
        term: 'Sap vacuole', termVn: 'Không bào', termFr: 'Vacuole',
        text: 'A large space of cell sap that **keeps the cell firm**, like air inside a tyre.',
        textVn: 'Khoảng lớn chứa dịch tế bào, **giúp tế bào căng cứng**, như hơi trong lốp xe.',
        textFr: 'Un grand espace plein de suc cellulaire qui **garde la cellule ferme**, comme l’air dans un pneu.',
      },
    ],
  },
  {
    layout: 'split',
    accent: CRIMSON,
    icon: 'Droplet',
    title: 'No Wall, No Fixed Shape',
    titleVn: 'Không có thành, không có hình dạng cố định',
    titleFr: 'Pas de paroi, pas de forme fixe',
    ratio: 45,
    side: 'left',
    inlineSvg: DIAGRAMS.SHAPE_FREEDOM,
    content:
      'A plant stands still. Every one of its cells is locked inside a stiff box, and that is what holds a whole tree up.\n\n' +
      'An animal **moves**. Your cells have to bend, squeeze and change shape all day — a stiff box would stop them.',
    contentVn:
      'Cây đứng yên một chỗ. Mỗi tế bào của nó nằm trong một chiếc hộp cứng, và chính điều đó nâng đỡ cả một cái cây.\n\n' +
      'Động vật thì **di chuyển**. Tế bào của em phải uốn, ép và đổi hình dạng suốt ngày — một chiếc hộp cứng sẽ cản trở điều đó.',
    contentFr:
      'Une plante ne bouge pas. Chacune de ses cellules est enfermée dans une boîte rigide, et c’est ce qui tient tout un arbre debout.\n\n' +
      'Un animal **bouge**. Tes cellules doivent se plier, se serrer et changer de forme toute la journée — une boîte rigide les en empêcherait.',
    notes: [
      {
        tone: 'write',
        text: '**An animal cell has no cell wall,** so it has **no fixed shape**. Animal cells look soft and rounded, with no straight edges.',
        textVn: '**Tế bào động vật không có thành tế bào,** nên nó **không có hình dạng cố định**. Tế bào động vật trông mềm và tròn, không có cạnh thẳng.',
        textFr: '**Une cellule animale n’a pas de paroi cellulaire,** donc elle n’a **pas de forme fixe**. Les cellules animales semblent molles et arrondies, sans bords droits.',
      },
    ],
  },

  // ── Section 5: beyond the book ───────────────────────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Zap',
    eyebrow: 'Expand your knowledge',
    eyebrowVn: 'Mở rộng kiến thức',
    eyebrowFr: 'Pour aller plus loin',
    title: 'Not All Animal Cells Look Alike',
    titleVn: 'Không phải tế bào động vật nào cũng giống nhau',
    titleFr: 'Les cellules animales ne se ressemblent pas toutes',
    ratio: 45,
    image: neuron,
    content:
      'Here is something that is not in your textbook. Because an animal cell is not locked inside a box, it can grow into **whatever shape its job needs**.\n\n' +
      'This is a **nerve cell**. Those long arms carry messages around your body. The longest nerve cell in a person runs from the bottom of the back all the way to the big toe — about **one metre**, and all of it is a single cell.',
    contentVn:
      'Đây là điều không có trong sách giáo khoa. Vì tế bào động vật không bị nhốt trong một chiếc hộp, nó có thể phát triển thành **bất kỳ hình dạng nào mà nhiệm vụ của nó cần**.\n\n' +
      'Đây là một **tế bào thần kinh**. Những nhánh dài đó truyền tín hiệu đi khắp cơ thể. Tế bào thần kinh dài nhất trong cơ thể người chạy từ cuối lưng xuống tận ngón chân cái — dài khoảng **một mét**, và tất cả chỉ là **một** tế bào.',
    contentFr:
      'Voici quelque chose qui n’est pas dans ton manuel. Une cellule animale n’est pas enfermée dans une boîte, alors elle peut prendre **la forme dont son travail a besoin**.\n\n' +
      'Voici une **cellule nerveuse**. Ces longs bras transportent des messages dans tout ton corps. La plus longue cellule nerveuse d’une personne va du bas du dos jusqu’au gros orteil — environ **un mètre**, et c’est une seule cellule.',
    notes: [
      {
        tone: 'theory',
        text: 'You will not be tested on nerve cells this year — but scientists never stop at the syllabus.',
        textVn: 'Năm nay em sẽ không bị kiểm tra về tế bào thần kinh — nhưng nhà khoa học thì không bao giờ dừng ở chương trình học.',
        textFr: 'Il n’y aura pas de contrôle sur les cellules nerveuses cette année — mais un scientifique ne s’arrête jamais au programme.',
      },
    ],
  },

  // ── Section 6: every class is an English class ───────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi tiết học đều là tiết tiếng Anh',
    eyebrowFr: 'Tout cours est un cours d’anglais',
    title: 'Similar Is Not the Same',
    titleVn: '"Similar" không phải là "the same"',
    titleFr: '« Similar » ≠ « the same »',
    content:
      'Your book says: "Animal cells are **similar** to plant cells in several ways."\n\n' +
      'It does not say **the same**. **Similar** means alike in some ways, different in others.',
    contentVn:
      'Sách viết: "Animal cells are **similar** to plant cells in several ways."\n\n' +
      'Sách không viết **the same** (giống hệt). **Similar** là giống một số điểm, khác một số điểm.',
    contentFr:
      'Ton livre dit : « Animal cells are **similar** to plant cells in several ways. »\n\n' +
      'Il ne dit pas **the same**. **Similar** : pareil en partie, différent en partie.',
    notes: [
      {
        tone: 'write',
        text:
          '**Sentences for comparing two things:**\n' +
          '**Both** a plant cell **and** an animal cell **have** a nucleus.\n' +
          'A plant cell has a cell wall, **but** an animal cell does not.\n' +
          '**Unlike** a plant cell, an animal cell has no fixed shape.',
        textVn:
          '**Mẫu câu so sánh hai vật:**\n' +
          '**Both** a plant cell **and** an animal cell **have** a nucleus. (Cả… và… đều có…)\n' +
          'A plant cell has a cell wall, **but** an animal cell does not. (…, nhưng… thì không)\n' +
          '**Unlike** a plant cell, an animal cell has no fixed shape. (Khác với…, …)',
        textFr:
          '**Phrases pour comparer :**\n' +
          '**Both** a plant cell **and** an animal cell **have** a nucleus.\n' +
          'A plant cell has a cell wall, **but** an animal cell does not.\n' +
          '**Unlike** a plant cell, an animal cell has no fixed shape.',
      },
    ],
    reveal: {
      label: 'Your turn — finish the sentence out loud',
      labelVn: 'Đến lượt em — hãy hoàn thành câu này',
      labelFr: 'À toi — termine la phrase, en anglais',
      prompt: '"Both cells have ______ , but only the plant cell has ______ ."',
      promptVn: '"Both cells have ______ , but only the plant cell has ______ ."',
      promptFr: '"Both cells have ______ , but only the plant cell has ______ ."',
      answer: 'Both cells have **a cell membrane, cytoplasm, mitochondria and a nucleus**, but only the plant cell has **a cell wall, chloroplasts and a sap vacuole**.',
      answerVn: 'Both cells have **a cell membrane, cytoplasm, mitochondria and a nucleus**, but only the plant cell has **a cell wall, chloroplasts and a sap vacuole**. (Cả hai loại tế bào đều có màng tế bào, tế bào chất, ti thể và nhân, nhưng chỉ tế bào thực vật mới có thành tế bào, lục lạp và không bào.)',
      answerFr: 'Both cells have **a cell membrane, cytoplasm, mitochondria and a nucleus**, but only the plant cell has **a cell wall, chloroplasts and a sap vacuole**.',
    },
  },

  // ── Section 7: the real photographs (Learner's Book p. 15, Question 1) ───
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'ScanEye',
    eyebrow: 'Learner’s Book, page 15 · Question 1',
    eyebrowVn: 'Sách học sinh, trang 15 · Câu hỏi 1',
    eyebrowFr: 'Manuel de l’élève, page 15 · Question 1',
    title: 'Plant or Animal?',
    titleVn: 'Thực vật hay động vật?',
    titleFr: 'Végétale ou animale ?',
    ratio: 40,
    content:
      'Eight real photographs, all taken down a microscope. The **first four** we read together. The **next four** you decide: plant cell or animal cell — and say **how you know**.\n\n' +
      '> Answer in a full sentence: "Photograph 1 shows plant cells **because** ... "',
    contentVn:
      'Tám tấm ảnh thật, đều chụp qua kính hiển vi. **Bốn ảnh đầu** chúng ta cùng đọc. **Bốn ảnh sau** em tự quyết định: tế bào thực vật hay động vật — và nói **vì sao em biết**.\n\n' +
      '> Trả lời bằng câu hoàn chỉnh: "Photograph 1 shows plant cells **because** ... "',
    contentFr:
      'Huit vraies photos, toutes prises au microscope. Les **quatre premières**, on les lit ensemble. Les **quatre suivantes**, c’est toi qui décides : cellule végétale ou animale — et dis **comment tu le sais**.\n\n' +
      '> Réponds par une phrase complète, en anglais : « Photograph 1 shows plant cells **because** ... »',
    widget: PlantOrAnimalWidget,
  },

  // ── Section 8: the practical ─────────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Beaker',
    eyebrow: 'Think like a scientist',
    eyebrowVn: 'Tư duy như nhà khoa học',
    eyebrowFr: 'Pense comme un scientifique',
    title: 'Looking at Your Own Cells',
    titleVn: 'Quan sát tế bào của chính em',
    titleFr: 'Observer tes propres cellules',
    ratio: 55,
    side: 'left',
    image: slideCoverslip,
    content: 'The book asks you to take cells from **inside your own cheek** and look at them down a microscope. **We will do this lab when our microscope arrives** — today, learn the method.',
    contentVn: 'Sách yêu cầu em lấy tế bào từ **mặt trong má của chính mình** và quan sát qua kính hiển vi. **Chúng ta sẽ làm bài thực hành này khi có kính hiển vi** — hôm nay hãy học cách làm.',
    contentFr: 'Le livre te demande de prélever des cellules **à l’intérieur de ta joue** et de les observer au microscope. **Nous ferons cette expérience quand notre microscope arrivera** — aujourd’hui, apprends la méthode.',
    notes: [
      {
        tone: 'task',
        badge: 'You Will Need',
        badgeVn: 'Em sẽ cần',
        badgeFr: 'Il te faut',
        icon: 'Beaker',
        text: 'microscope · slide · cover slip · cotton bud · methylene blue · dropper pipette · safety glasses',
        textVn: 'kính hiển vi · lam kính · lamen · tăm bông · xanh methylen · ống nhỏ giọt · kính bảo hộ',
        textFr: 'microscope · lame · lamelle · coton-tige · bleu de méthylène · pipette compte-gouttes · lunettes de protection',
      },
      {
        tone: 'homework',
        badge: 'Safety',
        badgeVn: 'An toàn',
        badgeFr: 'Sécurité',
        icon: 'ShieldCheck',
        text: '**Safety glasses on** before you start. Use your **own** cotton bud, **once**, then bin it.',
        textVn: '**Đeo kính bảo hộ** trước khi bắt đầu. Dùng tăm bông **của riêng em**, **một lần**, rồi bỏ đi.',
        textFr: '**Mets tes lunettes de protection** avant de commencer. Utilise ton **propre** coton-tige, **une seule fois**, puis jette-le.',
      },
    ],
  },
  // The unit's one and only Key Word gets its own slide. It also earns a second
  // job: "stain" is a word they already own in English, with the opposite
  // feeling attached to it.
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Droplet',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khoá',
    eyebrowFr: 'Mot clé',
    title: 'Stain',
    titleVn: 'Stain — thuốc nhuộm',
    titleFr: 'Stain',
    content: 'Your cheek cells are almost see-through. Untreated, you would see an empty grey circle and decide there was nothing there. So we add a dye that colours the parts.',
    contentVn: 'Tế bào má của em gần như trong suốt. Không xử lý gì, em chỉ thấy vòng tròn xám trống và tưởng chẳng có gì. Vậy nên ta thêm phẩm màu để tô màu các bộ phận.',
    contentFr: 'Tes cellules de joue sont presque transparentes. Sans rien, tu verrais un rond gris vide et croirais qu’il n’y a rien. Alors on colore les parties.',
    notes: [
      {
        tone: 'write',
        text: '**Stain:** a coloured dye added to a specimen to make its parts **easier to see**.',
        textVn: '**Thuốc nhuộm (stain):** phẩm màu thêm vào mẫu vật để các bộ phận **dễ nhìn thấy hơn**.',
        textFr: '**Colorant :** teinture qui rend les parties d’un échantillon **plus visibles**.',
      },
    ],
    reveal: {
      label: 'English class: what is a stain on your school shirt?',
      labelVn: 'Tiếng Anh: vết "stain" trên áo đồng phục là gì?',
      labelFr: 'Anglais : une « stain » sur ta chemise, c’est quoi ?',
      answer: 'A mark you did **not** want — coffee, ink, mud. In a laboratory it is the exact opposite: a scientist stains something **on purpose**, because the colour is the whole point. Same word, opposite feeling.',
      answerVn: 'Là vết bẩn em **không** hề muốn — cà phê, mực, bùn. Trong phòng thí nghiệm thì ngược lại hoàn toàn: nhà khoa học nhuộm màu **có chủ ý**, vì màu sắc chính là điều họ cần. Cùng một từ, cảm giác trái ngược.',
      answerFr: 'Une tache que tu ne voulais **pas** — café, encre, boue. Au laboratoire, c’est tout le contraire : un scientifique colore quelque chose **exprès**, car la couleur est le but. Même mot, sens opposé.',
    },
  },
  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Layers',
    eyebrow: 'Steps 1 to 4',
    eyebrowVn: 'Bước 1 đến 4',
    eyebrowFr: 'Étapes 1 à 4',
    title: 'Making the Slide',
    titleVn: 'Chuẩn bị tiêu bản',
    titleFr: 'Préparer la lame',
    inlineSvg: DIAGRAMS.SLIDE_PREP,
    steps: [
      {
        text: 'Very gently rub a cotton bud along the **inside of your cheek**.',
        textVn: 'Nhẹ nhàng chà tăm bông dọc theo **mặt trong má**.',
        textFr: 'Frotte très doucement un coton-tige **à l’intérieur de ta joue**.',
      },
      {
        text: 'Rub the bud on a clean **microscope slide**. You still will not see anything.',
        textVn: 'Chà tăm bông lên một **lam kính** sạch. Em vẫn chưa thấy gì cả.',
        textFr: 'Frotte le coton-tige sur une **lame de microscope** propre. Tu ne vois toujours rien.',
      },
      {
        text: 'Add one drop of **methylene blue** with a dropper pipette.',
        textVn: 'Nhỏ một giọt **xanh methylen** bằng ống nhỏ giọt.',
        textFr: 'Ajoute une goutte de **bleu de méthylène** avec une pipette compte-gouttes.',
      },
      {
        text: 'Carefully lower a **cover slip** over the drop.',
        textVn: 'Cẩn thận hạ **lamen** xuống phủ lên giọt thuốc nhuộm.',
        textFr: 'Pose doucement une **lamelle** sur la goutte.',
      },
    ],
  },
  {
    layout: 'steps',
    accent: TEAL,
    icon: 'Microscope',
    eyebrow: 'Steps 5 to 7',
    eyebrowVn: 'Bước 5 đến 7',
    eyebrowFr: 'Étapes 5 à 7',
    title: 'Setting Up the Microscope',
    titleVn: 'Lắp đặt kính hiển vi',
    titleFr: 'Régler le microscope',
    content: 'The last step here matters more than it looks. Get it wrong and you break the slide.',
    contentVn: 'Bước cuối ở đây quan trọng hơn vẻ ngoài của nó. Làm sai là em làm vỡ lam kính.',
    contentFr: 'La dernière étape est plus importante qu’elle n’en a l’air. Si tu te trompes, tu casses la lame.',
    steps: [
      {
        text: 'Put the **smallest objective lens** over the stage.',
        textVn: 'Đưa **vật kính nhỏ nhất** vào vị trí trên bàn kính.',
        textFr: 'Place le **plus petit objectif** au-dessus de la platine.',
      },
      {
        text: 'Put the slide on the stage, with the part you want to look at **over the hole**.',
        textVn: 'Đặt lam kính lên bàn kính, sao cho phần em muốn quan sát nằm **ngay trên lỗ sáng**.',
        textFr: 'Pose la lame sur la platine, avec la partie à observer **au-dessus du trou**.',
      },
      {
        text: '**Looking from the side**, turn the focussing knob until the lens is close to the slide.',
        textVn: '**Nhìn từ bên cạnh**, vặn núm chỉnh cho tới khi vật kính gần sát lam kính.',
        textFr: '**En regardant de côté**, tourne la vis de mise au point jusqu’à ce que l’objectif soit près de la lame.',
      },
    ],
    reveal: {
      label: 'Why does step 7 say to look from the side?',
      labelVn: 'Vì sao bước 7 lại bảo phải nhìn từ bên cạnh?',
      labelFr: 'Pourquoi l’étape 7 dit-elle de regarder de côté ?',
      answer: 'Because with your eye at the top of the eyepiece you cannot tell how close the lens is. Looking from the side is the only way to be sure you are not about to drive it through the slide.',
      answerVn: 'Vì khi mắt em ở trên thị kính, em không thể biết vật kính đang cách lam kính bao xa. Nhìn từ bên cạnh là cách duy nhất để chắc chắn em không đâm vật kính xuyên qua lam kính.',
      answerFr: 'Parce qu’avec l’œil sur l’oculaire, tu ne vois pas à quelle distance est l’objectif. Regarder de côté est le seul moyen d’être sûr de ne pas l’enfoncer dans la lame.',
    },
  },
  {
    layout: 'steps',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'Steps 8 to 10',
    eyebrowVn: 'Bước 8 đến 10',
    eyebrowFr: 'Étapes 8 à 10',
    title: 'Finding the Cells',
    titleVn: 'Tìm ra tế bào',
    titleFr: 'Trouver les cellules',
    content: 'We will do this lab when our microscope arrives. Today, learn the order.',
    contentVn: 'Chúng ta sẽ làm bài thực hành này khi có kính hiển vi. Hôm nay, hãy học thuộc thứ tự.',
    contentFr: 'Nous ferons cette expérience quand notre microscope arrivera. Aujourd’hui, apprends l’ordre.',
    steps: [
      {
        text: 'Look down the eyepiece. Slowly turn the knob to move the lens **upwards**, and stop when you can see the cells.',
        textVn: 'Nhìn qua thị kính. Từ từ vặn núm để đưa vật kính **lên trên**, và dừng lại khi em thấy được tế bào.',
        textFr: 'Regarde dans l’oculaire. Tourne lentement la vis pour faire **monter** l’objectif, et arrête-toi quand tu vois les cellules.',
      },
      {
        text: 'Turn the lenses until a **larger one** is over the stage. The view should be more magnified.',
        textVn: 'Xoay cụm vật kính cho tới khi một **vật kính lớn hơn** nằm trên bàn kính. Hình ảnh sẽ được phóng to hơn.',
        textFr: 'Tourne les objectifs jusqu’à ce qu’un **plus grand** soit au-dessus de la platine. L’image doit être plus grossie.',
      },
      {
        text: '**Draw** one or two of the cells you can see, and label your drawing.',
        textVn: '**Vẽ** một hoặc hai tế bào em nhìn thấy, và chú thích hình vẽ.',
        textFr: '**Dessine** une ou deux des cellules que tu vois, et légende ton dessin.',
      },
    ],
  },
  {
    layout: 'showcase',
    accent: CRIMSON,
    icon: 'ScanEye',
    eyebrow: 'What you are looking for',
    eyebrowVn: 'Thứ em cần tìm',
    eyebrowFr: 'Ce que tu cherches',
    title: 'Your Own Cells, Stained Blue',
    titleVn: 'Tế bào của chính em, nhuộm xanh',
    titleFr: 'Tes propres cellules, colorées en bleu',
    image: cheekCells,
    caption: 'Real human cheek cells after methylene blue. Soft, shapeless, not one straight edge — and the **dark blue dot** inside each one is its nucleus. Without the stain you would see almost nothing at all.',
    captionVn: 'Tế bào má người thật sau khi nhuộm xanh methylen. Mềm, không có hình dạng cố định, không một cạnh thẳng — và **chấm xanh đậm** bên trong mỗi tế bào là nhân của nó. Không có thuốc nhuộm thì em gần như chẳng thấy gì.',
    captionFr: 'De vraies cellules de joue humaine après le bleu de méthylène. Molles, sans forme, pas un seul bord droit — et le **point bleu foncé** dans chacune est son noyau. Sans colorant, tu ne verrais presque rien.',
  },

  // ── Section 9: the group activity ────────────────────────────────────────
  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Users',
    eyebrow: 'Activity · groups of two or three',
    eyebrowVn: 'Hoạt động · nhóm hai hoặc ba bạn',
    eyebrowFr: 'Activité · groupes de 2 ou 3',
    title: 'Build a Cell, Then Take It Apart',
    titleVn: 'Dựng một tế bào, rồi tháo bớt đi',
    titleFr: 'Fais une cellule, puis défais-la',
    content: 'Each group gets **fifteen card ovals** (five red, ten green), **one grey circle**, string, tape, glue and a big sheet of paper. Your group decides what each piece stands for.',
    contentVn: 'Mỗi nhóm nhận **mười lăm hình bầu dục bằng bìa** (năm đỏ, mười xanh), **một hình tròn xám**, dây, băng dính, keo và một tờ giấy lớn. Nhóm em tự quyết định mỗi mảnh là bộ phận nào.',
    contentFr: 'Chaque groupe a **quinze ovales en carton** (cinq rouges, dix verts), **un cercle gris**, ficelle, scotch, colle, une grande feuille. Le groupe décide du rôle des pièces.',
    steps: [
      {
        text: 'Use the materials to build a picture of a **plant cell** on the big sheet of paper.',
        textVn: 'Dùng các vật liệu để dựng hình một **tế bào thực vật** trên tờ giấy lớn.',
        textFr: 'Avec le matériel, construis une **cellule végétale** sur la grande feuille.',
      },
      {
        text: 'Ask another group, or Mr Bowen, to check that every piece is in the right place.',
        textVn: 'Nhờ một nhóm khác, hoặc thầy Bowen, kiểm tra xem mọi mảnh đã đúng vị trí chưa.',
        textFr: 'Demande à un autre groupe, ou à M. Bowen, de vérifier chaque pièce.',
      },
      {
        text: 'Now **remove some pieces** to turn your picture into an **animal cell**.',
        textVn: 'Bây giờ **bỏ bớt một số mảnh** để biến hình của em thành một **tế bào động vật**.',
        textFr: 'Puis **enlève des pièces** pour en faire une **cellule animale**.',
      },
    ],
    reveal: {
      label: 'Page 15, Question 2 — what did you have to take away?',
      labelVn: 'Trang 15, Câu hỏi 2 — em đã phải bỏ đi những gì?',
      labelFr: 'Page 15, question 2 — qu’as-tu dû enlever ?',
      answer: 'The **cell wall**, the **chloroplasts** and the **sap vacuole**. Everything else stays exactly where it was — and now your cell is free to be any shape at all.',
      answerVn: '**Thành tế bào**, **lục lạp** và **không bào**. Mọi thứ khác giữ nguyên vị trí — và giờ tế bào của em được tự do mang bất kỳ hình dạng nào.',
      answerFr: 'La **paroi cellulaire**, les **chloroplastes** et la **vacuole**. Tout le reste ne bouge pas — et maintenant ta cellule peut avoir n’importe quelle forme.',
    },
  },

  // ── Section 10: the rule that always works ───────────────────────────────
  {
    layout: 'statement',
    accent: GREEN,
    eyebrow: 'Think about it',
    eyebrowVn: 'Hãy suy nghĩ',
    eyebrowFr: 'Réfléchis',
    title: 'The One Clue That Always Works',
    titleVn: 'Dấu hiệu luôn luôn đúng',
    titleFr: 'Le seul indice qui marche toujours',
    label: 'Discuss',
    labelVn: 'Thảo luận',
    labelFr: 'Discussion',
    labelIcon: 'MessageSquare',
    text: 'Can you **always** tell whether a picture shows a plant cell or an animal cell?',
    textVn: 'Em có **luôn luôn** biết một bức ảnh là tế bào thực vật hay động vật không?',
    textFr: 'Peux-tu **toujours** dire si une image montre une cellule végétale ou animale ?',
    sub: 'What is the **most reliable** thing to look for?',
    subVn: 'Dấu hiệu **đáng tin cậy nhất** cần tìm là gì?',
    subFr: 'Quel est l’indice **le plus fiable** ?',
    reveal: {
      label: 'Reveal',
      labelVn: 'Hiện đáp án',
      labelFr: 'Voir la réponse',
      answer:
        'The **cell wall**: a straight, stiff edge, with cells packed together like bricks. Only plants have one, so it never lets you down.\n\n' +
        'Green is the clue that does. **No chloroplasts does not mean animal.** Photograph C was an onion — and an onion bulb grows underground, in the dark.',
      answerVn:
        '**Thành tế bào**: đường viền thẳng và cứng, các tế bào xếp sát nhau như những viên gạch. Chỉ thực vật mới có, nên dấu hiệu này không bao giờ sai.\n\n' +
        'Màu xanh mới là dấu hiệu đánh lừa em. **Không có lục lạp không có nghĩa là tế bào động vật.** Ảnh C là củ hành — mà củ hành mọc dưới đất, trong bóng tối.',
      answerFr:
        'La **paroi cellulaire** : un bord droit et rigide, avec des cellules serrées comme des briques. Seules les plantes en ont une, donc elle ne te trompe jamais.\n\n' +
        'C’est le vert qui peut te tromper. **Pas de chloroplastes ne veut pas dire animal.** La photo C était un oignon — et un bulbe d’oignon pousse sous terre, dans le noir.',
    },
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
      '> Your notebook should now have **7 things written down** and **1 labelled drawing** in it. Check.',
    contentVn:
      'Đọc từng dòng và thành thật với chính mình. Điều nào em chưa giải thích được cho bạn vắng mặt hôm nay, tối nay hãy xem lại.\n\n' +
      '> Trong vở của em bây giờ phải có **7 mục đã chép** và **1 hình vẽ có chú thích**.',
    contentFr:
      'Lis chaque ligne et sois honnête avec toi-même. Si tu ne peux pas expliquer une ligne à un ami absent aujourd’hui, revois cette partie ce soir.\n\n' +
      '> Ton cahier doit maintenant contenir **7 choses recopiées** et **1 dessin légendé**. Vérifie.',
    items: [
      { text: 'Name the **four parts** every animal cell has, and say what each one does.', textVn: 'Kể **bốn bộ phận** mọi tế bào động vật đều có, và nhiệm vụ của từng cái.', textFr: 'Nommer les **quatre parties** de toute cellule animale, et dire ce que fait chacune.' },
      { text: 'Name the **three parts** a plant cell has that an animal cell has not.', textVn: 'Kể **ba bộ phận** tế bào thực vật có mà tế bào động vật không có.', textFr: 'Nommer les **trois parties** qu’a une cellule végétale mais pas une cellule animale.' },
      { text: 'Explain why an animal cell has **no fixed shape**.', textVn: 'Giải thích vì sao tế bào động vật **không có hình dạng cố định**.', textFr: 'Expliquer pourquoi une cellule animale n’a **pas de forme fixe**.' },
      { text: 'Look at a photograph and say **plant or animal** — with a reason.', textVn: 'Nhìn một bức ảnh và nói được **thực vật hay động vật** — kèm lý do.', textFr: 'Regarder une photo et dire **végétale ou animale** — avec une raison.' },
      { text: 'Say what a **stain** is and why scientists use one.', textVn: 'Nói **thuốc nhuộm** là gì và vì sao các nhà khoa học dùng nó.', textFr: 'Dire ce qu’est un **colorant** et pourquoi les scientifiques en utilisent.' },
      { text: 'Put the steps of **making a slide** in the right order.', textVn: 'Sắp xếp đúng thứ tự các bước **làm tiêu bản**.', textFr: 'Remettre dans l’ordre les étapes pour **préparer une lame**.' },
    ],
  },

  // ── Section 11: homework ─────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: RED,
    icon: 'Home',
    eyebrow: 'Homework Assignment',
    eyebrowVn: 'Bài tập về nhà',
    eyebrowFr: 'Devoirs',
    title: 'For Next Lesson',
    titleVn: 'Cho tiết học sau',
    titleFr: 'Prochain cours',
    content: 'Take your science notebook home with you.',
    contentVn: 'Hãy mang vở khoa học về nhà.',
    contentFr: 'Emporte ton cahier de sciences chez toi.',
    notes: [
      {
        tone: 'homework',
        badge: 'Reading Task',
        badgeVn: 'Bài đọc',
        badgeFr: 'Lecture',
        icon: 'BookOpen',
        text: 'Read the whole of Unit 1.2, **pages 13 to 16**.',
        textVn: 'Đọc toàn bộ Bài 1.2, **trang 13 đến 16**.',
        textFr: 'Lis toute l’unité 1.2, **pages 13 à 16**.',
      },
      {
        tone: 'homework',
        badge: 'Writing Task',
        badgeVn: 'Bài viết',
        badgeFr: 'Écriture',
        icon: 'Pencil',
        text: 'Turn to **page 15** and copy **Questions 1 and 2** into your notebook. Answer in **full English sentences**. For Question 1, give a **reason** for every photograph — the word **because** should appear three times.',
        textVn: 'Mở **trang 15**, chép **Câu hỏi 1 và 2** vào vở. Trả lời bằng **câu tiếng Anh đầy đủ**. Với Câu hỏi 1, nêu **lý do** cho từng ảnh — từ **because** phải xuất hiện ba lần.',
        textFr: 'Ouvre à la **page 15** et recopie les **questions 1 et 2**. Réponds en **phrases complètes en anglais**. Pour la question 1, donne une **raison** par photo — le mot **because** doit apparaître trois fois.',
      },
    ],
  },
]
