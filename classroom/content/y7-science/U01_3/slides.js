// content/y7-science/U01_3/slides.js
// Year 7 Science · 1.3 Specialised cells. Wednesday 12 August 2026.
//
// Same house style as 1.1 and 1.2: teal section headers, crimson for animal
// cells, green for plant, purple for activities, red for homework, and the
// Learner's Book orange for every key word students copy down. Anything a
// student must write goes in an orange "Write This Down" panel or an orange `>`
// bumper — never plain body text.
//
// The spine is one idea, and it is both the science and the English: STRUCTURE
// FITS FUNCTION. A cell's shape is the reason it can do its job. The class
// already met the cell PARTS in 1.1 and 1.2; here those parts get a purpose.
//
// THE COPY-DOWN PLAN, because this is what keeps the lesson from drowning.
// An earlier version of this deck gave each of the five cells its own prose
// "write" panel AND finished with a table containing the same five facts AND
// set that table again for homework — every fact written three times. Now there
// is exactly one artefact per activity in the book:
//   · two short definitions (function; specialised/adapted),
//   · the ANIMAL table (Activity 1.3.1), ruled up right after the first cell and
//     filled in a row at a time as each cell is taught — each cell slide carries
//     an orange `>` bumper that IS its row, dictated,
//   · the PLANT table (Activity 1.3.2), which the book asks for separately,
//   · the sentence frame.
// Nothing else is copied. That is three short notes and two tables in 50 minutes.
//
// Ask-before-tell runs the opening: slide 3 shows three cells from one body with
// no names and no answer on it, and slide 4 pays it off with the number. Each
// drawn diagram is paired with the real cell under a microscope.
//
// Source: Learner's Book Unit 1.3, pages 17-21. Questions 1-4 and Activities
// 1.3.1 / 1.3.2 (including its peer assessment) are the book's own. Figures are
// drawn in diagrams.js; photographs are openly licensed (see images/CREDITS.json).
import { DIAGRAMS } from './diagrams.js'
import { SpecialisedCellWidget } from './widgets.jsx'
import blood from './images/blood.jpg'
import neuron from './images/neuron.jpg'
import trachea from './images/trachea.jpg'
import roothair from './images/roothair.jpg'
import leaf from './images/leaf.jpg'
import capillary from './images/capillary.jpg'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const RED = '#c8102e'
const CRIMSON = '#c2185b' // the animal-cell colour, carried from 1.1 and 1.2

export const slides = [
  // ── Section 1: reload the parts, then ask the question ───────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Dna',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    brandFr: 'Sciences 7e année',
    eyebrow: '1.3 Specialised cells',
    eyebrowVn: '1.3 Tế bào chuyên hoá',
    eyebrowFr: '1.3 Les cellules spécialisées',
    date: '12 Aug 2026',
    title: 'Cells With a Job to Do',
    titleVn: 'Những tế bào có nhiệm vụ riêng',
    titleFr: 'Des cellules qui ont un travail',
    card: {
      icon: 'Pencil',
      badge: 'Starter Task',
      badgeVn: 'Nhiệm vụ khởi động',
      badgeFr: 'Pour commencer',
      text: 'With a partner, finish each sentence: **Cell membranes …   ·   Cell walls …   ·   A nucleus …   ·   Chloroplasts …** Be ready to share.',
      textVn: 'Cùng bạn hoàn thành mỗi câu: **Cell membranes …   ·   Cell walls …   ·   A nucleus …   ·   Chloroplasts …** Hãy sẵn sàng chia sẻ.',
      textFr: 'Avec ton voisin, termine chaque phrase : **Cell membranes …   ·   Cell walls …   ·   A nucleus …   ·   Chloroplasts …** Prépare-toi à partager.',
    },
  },
  {
    layout: 'statement',
    accent: TEAL,
    eyebrow: 'Getting started · check your sentences',
    eyebrowVn: 'Khởi động · kiểm tra câu của em',
    eyebrowFr: 'Pour commencer · vérifie tes phrases',
    label: 'Share',
    labelVn: 'Chia sẻ',
    labelFr: 'Partage',
    labelIcon: 'CheckCircle2',
    text: 'Every one of those parts has a **job**.',
    textVn: 'Mỗi bộ phận đó đều có một **nhiệm vụ**.',
    textFr: 'Chacune de ces parties a un **travail**.',
    sub: 'A cell **membrane** controls what goes in and out. A cell **wall** holds a plant cell in shape. A **nucleus** controls the cell. **Chloroplasts** make food. Today: whole cells with jobs.',
    subVn: '**Màng** tế bào kiểm soát những gì ra vào. **Thành** tế bào giữ hình dạng cho tế bào thực vật. **Nhân** điều khiển tế bào. **Lục lạp** tạo thức ăn. Hôm nay: cả những tế bào có nhiệm vụ riêng.',
    subFr: 'La **membrane** cellulaire contrôle ce qui entre et sort. La **paroi** cellulaire garde la forme d’une cellule végétale. Le **noyau** contrôle la cellule. Les **chloroplastes** fabriquent la nourriture. Aujourd’hui : des cellules entières qui ont un travail.',
  },
  // The hook. No names, no numbers, no answer anywhere on this slide — the
  // picture is three bare silhouettes and the caption is a question. Take wild
  // guesses and put a few on the board before moving on; the gap between their
  // guess and slide 4 is the lesson.
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Users',
    eyebrow: 'In pairs — two minutes, and no calling out',
    eyebrowVn: 'Theo cặp — hai phút, không nói to đáp án',
    eyebrowFr: 'Par deux — deux minutes, sans crier la réponse',
    title: 'Why Are These Not the Same?',
    titleVn: 'Vì sao chúng không giống nhau?',
    titleFr: 'Pourquoi ne sont-elles pas pareilles ?',
    inlineSvg: DIAGRAMS.THREE_SHAPES,
    caption: 'All three of these came out of **one body** — and every one of them was built from the **same set of instructions**. So why do they look nothing alike? Agree on a reason with your partner.',
    captionVn: 'Cả ba đều lấy ra từ **một cơ thể** — và mỗi cái đều được tạo nên từ **cùng một bộ chỉ dẫn**. Vậy vì sao chúng trông chẳng giống nhau chút nào? Hãy cùng bạn thống nhất một lý do.',
    captionFr: 'Ces trois cellules viennent d’**un seul corps** — et chacune a été construite avec les **mêmes instructions**. Alors pourquoi ne se ressemblent-elles pas du tout ? Mets-toi d’accord avec ton voisin sur une raison.',
  },
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'The answer',
    eyebrowVn: 'Đáp án',
    eyebrowFr: 'La réponse',
    text: 'Your body builds about **200 different kinds** of cell.',
    textVn: 'Cơ thể em tạo ra khoảng **200 loại tế bào** khác nhau.',
    textFr: 'Ton corps fabrique environ **200 sortes** de cellules.',
    sub: 'Last lesson you learned you are about **100 trillion cells**. They are not 100 trillion copies of one thing — they come in about **200 kinds**, and each kind is a different shape, because each kind has a different **job**. Today you meet **five** of them.',
    subVn: 'Tiết trước em đã biết mình có khoảng **100 nghìn tỉ tế bào**. Đó không phải 100 nghìn tỉ bản sao của một thứ — chúng có khoảng **200 loại**, mỗi loại một hình dạng khác nhau, vì mỗi loại có một **nhiệm vụ** khác nhau. Hôm nay em sẽ gặp **năm** loại.',
    subFr: 'Au dernier cours : tu as environ **100 000 milliards de cellules**. Pas 100 000 milliards de copies d’une seule cellule — environ **200 sortes**, chacune de forme différente, car chacune a un **travail** différent. Aujourd’hui, tu en vois **cinq**.',
    notes: [
      {
        tone: 'write',
        text: '**Function:** the job a cell does, or the role it plays.',
        textVn: '**Chức năng (function):** nhiệm vụ mà tế bào làm, hay vai trò nó đảm nhận.',
        textFr: '**Fonction :** le travail ou le rôle d’une cellule.',
      },
    ],
  },
  // The unit's big word gets its own slide, the way "Stain" does in 1.2 — and it
  // earns a second job: "specialist" is a word the class already owns in English,
  // and it explains, before they meet it, why a red blood cell throws away its
  // own nucleus.
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Target',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khoá',
    eyebrowFr: 'Mot clé',
    title: 'Specialised',
    titleVn: 'Specialised — Chuyên hoá',
    titleFr: 'Specialised — Spécialisée',
    content: 'Each of those 200 kinds is **specialised**. Its structure is built for its own job — so it does that one job extremely well, and it cannot do the others.',
    contentVn: 'Mỗi loại trong số 200 loại đó đều **chuyên hoá**. Cấu trúc của nó được tạo ra cho nhiệm vụ riêng — nên nó làm nhiệm vụ đó cực kỳ tốt, và không làm được những việc khác.',
    contentFr: 'Chacune de ces 200 sortes est **spécialisée**. Sa structure est faite pour son travail — alors elle fait ce travail très bien, et elle ne peut pas faire les autres.',
    notes: [
      {
        tone: 'write',
        text: '**Specialised / adapted:** the cell has a structure that helps it carry out its function really well.',
        textVn: '**Chuyên hoá / thích nghi (specialised / adapted):** tế bào có cấu trúc giúp nó thực hiện chức năng của mình thật tốt.',
        textFr: '**Spécialisée / adaptée (specialised / adapted) :** la cellule a une structure qui l’aide à très bien remplir sa fonction.',
      },
    ],
    reveal: {
      label: 'English class: what is a specialist?',
      labelVn: 'Tiếng Anh: "specialist" là gì?',
      labelFr: 'Anglais : qu’est-ce qu’un « specialist » ?',
      answer: 'A **specialist** is a person who does **one** job very well — an eye doctor, a heart doctor. You would not go to an eye doctor for a broken leg. A **specialised cell** is exactly that: brilliant at one job, and no use at all for the rest. Watch what the first one gives up to be good at its job.',
      answerVn: '**Specialist** (chuyên gia) là người làm **một** việc rất giỏi — bác sĩ mắt, bác sĩ tim. Em sẽ không đến bác sĩ mắt để chữa gãy chân. **Tế bào chuyên hoá** đúng là như vậy: xuất sắc ở một nhiệm vụ, và vô dụng với mọi việc khác. Hãy xem tế bào đầu tiên đã từ bỏ thứ gì để giỏi nhiệm vụ của nó.',
      answerFr: 'Un **specialist** (spécialiste) est une personne qui fait **un seul** travail très bien — un médecin des yeux, un médecin du cœur. Tu n’irais pas chez un médecin des yeux pour une jambe cassée. Une **cellule spécialisée**, c’est pareil : excellente pour un travail, inutile pour le reste. Regarde ce que la première abandonne pour bien faire son travail.',
    },
  },

  // ── Section 2: three specialised animal cells ────────────────────────────
  {
    layout: 'split',
    accent: CRIMSON,
    icon: 'Droplet',
    eyebrow: 'Animal cell 1',
    eyebrowVn: 'Tế bào động vật 1',
    eyebrowFr: 'Cellule animale 1',
    title: 'Red Blood Cell',
    titleVn: 'Tế bào hồng cầu',
    titleFr: 'Globule rouge',
    ratio: 48,
    inlineSvg: DIAGRAMS.RED_BLOOD_CELL,
    content:
      'Its **function** is to carry **oxygen** around your body.\n\n' +
      'Two things make it good at that. Its cytoplasm is full of a red **pigment** (a colour) called **haemoglobin**, and haemoglobin is what actually holds the oxygen. And it is **smaller than almost every other cell** in you, so it fits through the very narrowest blood vessels — the **capillaries**.',
    contentVn:
      '**Chức năng** của nó là vận chuyển **oxy** đi khắp cơ thể.\n\n' +
      'Hai điều giúp nó làm tốt việc đó. Tế bào chất của nó chứa đầy một **sắc tố** (màu) đỏ tên là **haemoglobin**, và chính haemoglobin giữ lấy oxy. Và nó **nhỏ hơn hầu hết mọi tế bào khác** trong cơ thể, nên đi lọt qua những mạch máu hẹp nhất — các **mao mạch (capillary)**.',
    contentFr:
      'Sa **fonction** : transporter l’**oxygène** dans ton corps.\n\n' +
      'Deux choses l’aident. Son cytoplasme est plein d’un **pigment** rouge (une couleur), l’**hémoglobine**, qui retient l’oxygène. Et il est **plus petit que presque toutes tes autres cellules**, donc il passe dans les vaisseaux les plus fins — les **capillaires**.',
    reveal: {
      label: 'And why has it got no nucleus?',
      labelVn: 'Còn vì sao nó không có nhân?',
      labelFr: 'Et pourquoi pas de noyau ?',
      answer: 'Almost every other cell keeps its nucleus. This one **throws its own away** — that is its third adaptation, and it leaves **more room inside for haemoglobin**, so it can carry even more oxygen. A specialist gives things up to be better at one job.',
      answerVn: 'Gần như mọi tế bào khác đều giữ nhân. Tế bào này **vứt bỏ nhân của chính mình** — đó là đặc điểm thích nghi thứ ba, và nó để lại **nhiều chỗ hơn cho haemoglobin**, nhờ đó chở được nhiều oxy hơn. Một chuyên gia phải từ bỏ vài thứ để giỏi hơn ở một việc.',
      answerFr: 'Presque toutes les cellules gardent leur noyau. Celle-ci **jette le sien** — sa troisième adaptation. Cela laisse **plus de place pour l’hémoglobine**, donc plus d’oxygène. Un spécialiste renonce à des choses pour mieux faire un seul travail.',
    },
  },
  {
    layout: 'showcase',
    accent: CRIMSON,
    icon: 'ScanEye',
    eyebrow: 'The real thing',
    eyebrowVn: 'Vật thật',
    eyebrowFr: 'Pour de vrai',
    title: 'Small Enough to Bend Through',
    titleVn: 'Đủ nhỏ để lách qua',
    titleFr: 'Assez petit pour se plier',
    image: capillary,
    caption: 'One red blood cell, photographed inside a **capillary**. The vessel is so narrow that the cell has had to **bend in half** to get through it — and it can, because it is tiny, floppy, and has no nucleus in the way. That is structure fitting function, in one photograph.',
    captionVn: 'Một tế bào hồng cầu, chụp bên trong một **mao mạch**. Mạch hẹp đến mức tế bào phải **gập đôi lại** mới qua được — và nó làm được, vì nó nhỏ, mềm, và không có nhân cản đường. Đó chính là cấu trúc phù hợp với chức năng, gói trong một bức ảnh.',
    captionFr: 'Un globule rouge, photographié dans un **capillaire**. Le vaisseau est si étroit que la cellule a dû **se plier en deux** pour passer — et elle y arrive, car elle est minuscule, souple et sans noyau pour la gêner. La structure adaptée à la fonction, en une seule photo.',
  },
  // The Draw This, placed here rather than at the end on purpose. The table is
  // the ONE place the animal cells get written down, so it is ruled up now, with
  // the worked row already in it, and filled a row at a time as the lesson runs.
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Grid3x3',
    eyebrow: 'Learner’s Book, page 19 · Activity 1.3.1',
    eyebrowVn: 'Sách học sinh, trang 19 · Hoạt động 1.3.1',
    eyebrowFr: 'Manuel, page 19 · Activité 1.3.1',
    title: 'Rule Up the Table',
    titleVn: 'Kẻ bảng',
    titleFr: 'Trace le tableau',
    ratio: 40,
    inlineSvg: DIAGRAMS.ANIMAL_TABLE,
    drawThis: true,
    content:
      'This table is where the three animal cells go — **instead of** notes, not as well as them. Rule it up now, and we will fill in a row as we meet each cell.\n\n' +
      'The red blood cell is done for you, and it gets **three** lines, because you have just found all three of its adaptations.',
    contentVn:
      'Bảng này là nơi ghi ba tế bào động vật — **thay cho** ghi chép, chứ không phải ghi thêm. Hãy kẻ bảng ngay bây giờ, và ta sẽ điền từng dòng khi gặp từng tế bào.\n\n' +
      'Tế bào hồng cầu đã được làm sẵn, và nó có **ba** dòng, vì em vừa tìm ra đủ ba đặc điểm thích nghi của nó.',
    contentFr:
      'C’est dans ce tableau que vont les trois cellules animales — **à la place** des notes, pas en plus. Trace-le maintenant, et on remplira une ligne à chaque nouvelle cellule.\n\n' +
      'Le globule rouge est déjà fait, et il a **trois** lignes, car tu viens de trouver ses trois adaptations.',
    notes: [
      {
        tone: 'write',
        text: 'Copy the table. Give it a **title** and use a **ruler**. Leave the red blood cell **three** lines: haemoglobin · small enough for a capillary · no nucleus.',
        textVn: 'Chép bảng. Đặt **tiêu đề** và dùng **thước**. Chừa cho tế bào hồng cầu **ba** dòng: haemoglobin · đủ nhỏ để qua mao mạch · không có nhân.',
        textFr: 'Recopie le tableau, avec un **titre** et une **règle**. Laisse **trois** lignes au globule rouge : hémoglobine · passe dans un capillaire · pas de noyau.',
      },
    ],
  },
  {
    layout: 'split',
    accent: CRIMSON,
    icon: 'Zap',
    eyebrow: 'Animal cell 2',
    eyebrowVn: 'Tế bào động vật 2',
    eyebrowFr: 'Cellule animale 2',
    title: 'Neurone (Nerve Cell)',
    titleVn: 'Tế bào thần kinh (nơ-ron)',
    titleFr: 'Le neurone',
    ratio: 48,
    side: 'left',
    inlineSvg: DIAGRAMS.NEURONE,
    content:
      'Its **function** is to carry **electrical signals** around the body — from your brain to a muscle, to make it move.\n\n' +
      'The **axon** is a very long strand; the short **dendrites** collect signals from nearby cells. The longest neurone in you runs from the bottom of your back to your big toe — about **one metre**, all of it one cell.\n\n' +
      '> **Row 2 — Neurone.** Function: carries electrical signals. Structure: a very long **axon**. How this helps: signals travel far, and fast.',
    contentVn:
      '**Chức năng** của nó là truyền **tín hiệu điện** đi khắp cơ thể — từ não đến một cơ, để làm cơ cử động.\n\n' +
      '**Sợi trục (axon)** là một sợi rất dài; các **sợi nhánh (dendrite)** ngắn thu tín hiệu từ tế bào lân cận. Tế bào thần kinh dài nhất trong cơ thể em chạy từ cuối lưng xuống ngón chân cái — khoảng **một mét**, tất cả chỉ là một tế bào.\n\n' +
      '> **Dòng 2 — Tế bào thần kinh.** Chức năng: truyền tín hiệu điện. Cấu trúc: một **sợi trục** rất dài. Điều này giúp: tín hiệu đi xa, và nhanh.',
    contentFr:
      'Sa **fonction** : transporter des **signaux électriques** dans le corps — du cerveau à un muscle, pour qu’il bouge.\n\n' +
      'L’**axone** est un fil très long ; les courtes **dendrites** captent les signaux des cellules voisines. Ton plus long neurone va du bas du dos au gros orteil — environ **un mètre**, en une seule cellule.\n\n' +
      '> **Ligne 2 — Neurone.** Fonction : transmet des signaux électriques. Structure : un très long **axone**. Avantage : les signaux vont loin, et vite.',
  },
  {
    layout: 'split',
    accent: CRIMSON,
    icon: 'Move',
    eyebrow: 'Animal cell 3',
    eyebrowVn: 'Tế bào động vật 3',
    eyebrowFr: 'Cellule animale 3',
    title: 'Ciliated Cell',
    titleVn: 'Tế bào có lông rung',
    titleFr: 'Cellule ciliée',
    ratio: 48,
    inlineSvg: DIAGRAMS.CILIATED_CELL,
    content:
      'These cells line the tubes from your mouth down to your lungs, and along the top edge they have tiny moving hairs called **cilia**. Other cells there make sticky **mucus**, which traps dust and germs from the air — and the cilia sweep it up towards your mouth.\n\n' +
      '> **Row 3 — Ciliated cell.** Function: sweeps mucus out of the airways. Structure: moving **cilia** along the top. How this helps: dust and germs are carried away from the lungs.',
    contentVn:
      'Những tế bào này lót các ống từ miệng xuống phổi, và ở mép trên chúng có những sợi lông nhỏ biết chuyển động gọi là **lông rung (cilia)**. Các tế bào khác ở đó tạo ra **chất nhầy (mucus)** dính, giữ lại bụi và vi khuẩn trong không khí — và lông rung quét nó lên phía miệng.\n\n' +
      '> **Dòng 3 — Tế bào có lông rung.** Chức năng: quét chất nhầy ra khỏi đường thở. Cấu trúc: **lông rung** biết chuyển động ở mép trên. Điều này giúp: bụi và vi khuẩn bị đưa ra xa khỏi phổi.',
    contentFr:
      'Ces cellules tapissent les tubes de ta bouche à tes poumons. En haut, elles ont de minuscules poils mobiles : les **cils**. D’autres cellules font du **mucus** collant, qui piège poussière et microbes de l’air — et les cils le poussent vers ta bouche.\n\n' +
      '> **Ligne 3 — Cellule ciliée.** Fonction : chasse le mucus des voies respiratoires. Structure : des **cils** mobiles en haut. Avantage : poussière et microbes s’éloignent des poumons.',
    reveal: {
      label: 'So where does all that mucus go?',
      labelVn: 'Vậy tất cả chất nhầy đó đi đâu?',
      labelFr: 'Alors, où va tout ce mucus ?',
      answer: 'You **swallow** it. About **a litre of it, every day**. The cilia beat roughly **twelve times a second**, all day and all night, pushing the mucus and everything stuck in it up to the back of your mouth — and down it goes, without you ever noticing. That is what keeps the dust out of your lungs.',
      answerVn: 'Em **nuốt** nó xuống. Khoảng **một lít mỗi ngày**. Lông rung đập khoảng **mười hai lần một giây**, suốt ngày lẫn đêm, đẩy chất nhầy cùng mọi thứ dính trong đó lên cuối miệng — rồi trôi xuống, mà em chẳng hề hay biết. Chính điều đó giữ cho bụi không vào phổi.',
      answerFr: 'Tu l’**avales**. Environ **un litre, chaque jour**. Les cils battent à peu près **douze fois par seconde**, jour et nuit, et poussent le mucus et tout ce qui y est collé jusqu’au fond de ta bouche — puis il descend, sans que tu le remarques. C’est ce qui garde la poussière hors de tes poumons.',
    },
  },
  {
    layout: 'gallery',
    accent: CRIMSON,
    icon: 'Microscope',
    columns: 3,
    copy: false,
    eyebrow: 'The same three, for real',
    eyebrowVn: 'Chính ba loại đó, ngoài đời thực',
    eyebrowFr: 'Les trois mêmes, pour de vrai',
    title: 'Down a Real Microscope',
    titleVn: 'Nhìn qua kính hiển vi thật',
    titleFr: 'Au vrai microscope',
    content: 'Every cell in your table is a real thing. Here they are down a microscope — match each photograph to the drawing beside it.',
    contentVn: 'Mỗi tế bào trong bảng của em đều là vật thật. Đây là chúng qua kính hiển vi — hãy ghép mỗi bức ảnh với hình vẽ bên cạnh.',
    contentFr: 'Chaque cellule de ton tableau existe vraiment. Les voici au microscope — associe chaque photo au dessin à côté.',
    items: [
      {
        image: blood,
        term: 'Red blood cells', termVn: 'Tế bào hồng cầu', termFr: 'Globules rouges',
        text: 'Flat discs with a **pale dent** in the middle. The one small purple cell is a white blood cell.',
        textVn: 'Những đĩa dẹt có **vết lõm nhạt màu** ở giữa. Tế bào tím nhỏ là một bạch cầu.',
        textFr: 'Des disques plats avec un **creux pâle** au milieu. La petite cellule violette est un globule blanc.',
      },
      {
        image: neuron,
        term: 'A neurone', termVn: 'Một tế bào thần kinh', termFr: 'Un neurone',
        text: 'The green cell, with its **long arms** reaching far across the picture.',
        textVn: 'Tế bào màu xanh lá, với những **nhánh dài** vươn ra khắp bức ảnh.',
        textFr: 'La cellule verte, avec ses **longs bras** qui traversent l’image.',
      },
      {
        image: trachea,
        term: 'Ciliated cells', termVn: 'Tế bào có lông rung', termFr: 'Cellules ciliées',
        text: 'The lining of the windpipe. The **fuzzy dark edge** at the top is the cilia.',
        textVn: 'Lớp lót khí quản. **Mép sẫm lởm chởm** ở trên chính là lông rung.',
        textFr: 'L’intérieur de la trachée. Le **bord sombre et duveteux** en haut, ce sont les cils.',
      },
    ],
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'HelpCircle',
    eyebrow: 'Learner’s Book, page 19 · Questions 1 and 2',
    eyebrowVn: 'Sách học sinh, trang 19 · Câu hỏi 1 và 2',
    eyebrowFr: 'Manuel, page 19 · Questions 1 et 2',
    title: 'What Do They Share?',
    titleVn: 'Chúng có điểm gì chung?',
    titleFr: 'Points communs ?',
    ratio: 55,
    content:
      'Look back at the three animal cells.\n\n' +
      '> **1.** Name **two things** all three cells have in common.\n' +
      '> **2.** How can you tell they are all **animal** cells, not plant cells?',
    contentVn:
      'Hãy nhìn lại ba tế bào động vật.\n\n' +
      '> **1.** Kể **hai thứ** mà cả ba tế bào đều có chung.\n' +
      '> **2.** Làm sao em biết cả ba đều là tế bào **động vật**, không phải thực vật?',
    contentFr:
      'Revois les trois cellules animales.\n\n' +
      '> **1.** Cite **deux choses** communes aux trois cellules.\n' +
      '> **2.** Comment sais-tu qu’elles sont **animales**, pas végétales ?',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Les réponses',
      answer:
        '**1.** They all have **cytoplasm** and a **cell membrane** — and all three are **specialised**. Careful: they do **not** all have a nucleus, because the red blood cell has none!\n\n' +
        '**2.** They have **no cell wall, no chloroplasts and no big vacuole** — those are the plant-only parts from last lesson.',
      answerVn:
        '**1.** Cả ba đều có **tế bào chất** và **màng tế bào** — và cả ba đều **chuyên hoá**. Cẩn thận: chúng **không** đều có nhân, vì tế bào hồng cầu không có nhân!\n\n' +
        '**2.** Chúng **không có thành tế bào, không có lục lạp và không có không bào lớn** — đó là những bộ phận chỉ thực vật mới có, từ tiết trước.',
      answerFr:
        '**1.** Toutes ont du **cytoplasme** et une **membrane cellulaire** — et toutes sont **spécialisées**. Attention : le globule rouge n’a **pas** de noyau !\n\n' +
        '**2.** Elles n’ont **ni paroi cellulaire, ni chloroplastes, ni grande vacuole** — les parties propres aux plantes, vues au dernier cours.',
    },
  },

  // ── Section 3: two specialised plant cells ───────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Droplet',
    eyebrow: 'Plant cell 1',
    eyebrowVn: 'Tế bào thực vật 1',
    eyebrowFr: 'Cellule végétale 1',
    title: 'Root Hair Cell',
    titleVn: 'Tế bào lông hút',
    titleFr: 'Poil absorbant',
    ratio: 48,
    side: 'left',
    inlineSvg: DIAGRAMS.ROOT_HAIR_CELL,
    content:
      'Root hair cells grow on the outside of a plant’s **roots**. Their **function** is to **absorb** — soak up — water from the soil.\n\n' +
      'Each one has a long, thin **extension** pushing out between the soil grains — a big surface for water to move in through.\n\n' +
      '> **Root hair cell.** Function: absorbs water from the soil. Structure: a long, thin **root hair**. How this helps: a big surface, so water moves in easily.',
    contentVn:
      'Tế bào lông hút mọc ở mặt ngoài **rễ** cây. **Chức năng** của chúng là **hấp thụ** — hút — nước từ đất.\n\n' +
      'Mỗi tế bào có một phần **kéo dài** dài và mảnh, đẩy ra giữa các hạt đất — một bề mặt lớn để nước đi vào.\n\n' +
      '> **Tế bào lông hút.** Chức năng: hấp thụ nước từ đất. Cấu trúc: một **lông hút** dài và mảnh. Điều này giúp: bề mặt lớn, nên nước đi vào dễ dàng.',
    contentFr:
      'Les poils absorbants poussent à l’extérieur des **racines**. Leur **fonction** : **absorber** — aspirer — l’eau du sol.\n\n' +
      'Chacun a un **prolongement** long et fin entre les grains de terre — une grande surface pour faire entrer l’eau.\n\n' +
      '> **Poil absorbant.** Fonction : absorbe l’eau du sol. Structure : un **poil** long et fin. Avantage : grande surface, l’eau entre facilement.',
    reveal: {
      label: 'Page 20, Question 4 — which parts does the water pass through?',
      labelVn: 'Trang 20, Câu hỏi 4 — nước đi qua những bộ phận nào?',
      labelFr: 'Page 20, question 4 — par quelles parties passe l’eau ?',
      answer: 'Going from the soil to the sap vacuole, the water passes through the **cell wall → cell membrane → cytoplasm → vacuole**, in that order.',
      answerVn: 'Đi từ đất vào không bào, nước đi qua **thành tế bào → màng tế bào → tế bào chất → không bào**, theo đúng thứ tự đó.',
      answerFr: 'Du sol jusqu’à la vacuole, l’eau traverse la **paroi cellulaire → membrane cellulaire → cytoplasme → vacuole**, dans cet ordre.',
    },
  },
  {
    layout: 'statement',
    accent: GREEN,
    icon: 'Lightbulb',
    eyebrow: 'Page 20 · Question 3 — think about it',
    eyebrowVn: 'Trang 20 · Câu hỏi 3 — hãy suy nghĩ',
    eyebrowFr: 'Page 20 · Question 3 — réfléchis',
    title: 'Why No Chloroplasts?',
    titleVn: 'Vì sao không có lục lạp?',
    titleFr: 'Sans chloroplastes ?',
    text: 'A root hair cell is a **plant** cell — but it has **no chloroplasts**. Why not?',
    textVn: 'Tế bào lông hút là tế bào **thực vật** — nhưng nó **không có lục lạp**. Vì sao?',
    textFr: 'Le poil absorbant est **végétal** — **sans chloroplastes**. Pourquoi ?',
    reveal: {
      label: 'Reveal',
      labelVn: 'Hiện đáp án',
      labelFr: 'Réponse',
      answer: 'Chloroplasts use **sunlight** to make food. Roots are **underground, in the dark**, where no sunlight reaches — so chloroplasts would be useless there. A cell only builds the parts its job needs.',
      answerVn: 'Lục lạp dùng **ánh sáng mặt trời** để tạo thức ăn. Rễ nằm **dưới đất, trong bóng tối**, nơi không có ánh sáng — nên lục lạp sẽ vô dụng ở đó. Tế bào chỉ tạo những bộ phận mà nhiệm vụ của nó cần.',
      answerFr: 'Les chloroplastes captent la **lumière** pour faire la nourriture. Les racines sont **sous terre, dans le noir** : ils n’y serviraient à rien. Une cellule ne fait que ce que son travail demande.',
    },
  },
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Sun',
    eyebrow: 'Plant cell 2',
    eyebrowVn: 'Tế bào thực vật 2',
    eyebrowFr: 'Cellule végétale 2',
    title: 'Palisade Cell',
    titleVn: 'Tế bào mô giậu',
    titleFr: 'Cellule palissadique',
    ratio: 48,
    inlineSvg: DIAGRAMS.PALISADE_CELL,
    content:
      'Palisade cells are found in the **leaves**. Their **function** is to make food by **photosynthesis**.\n\n' +
      'They are packed with **chloroplasts**, which hold the green **chlorophyll** that absorbs energy from sunlight.\n\n' +
      '> **Palisade cell.** Function: makes food by photosynthesis. Structure: packed with **chloroplasts**, and tall. How this helps: it catches as much sunlight as possible.',
    contentVn:
      'Tế bào mô giậu nằm trong **lá** cây. **Chức năng** của chúng là tạo thức ăn bằng **quang hợp**.\n\n' +
      'Chúng chứa đầy **lục lạp**, bên trong có **diệp lục** màu xanh hấp thụ năng lượng từ ánh sáng mặt trời.\n\n' +
      '> **Tế bào mô giậu.** Chức năng: quang hợp tạo thức ăn. Cấu trúc: chứa đầy **lục lạp**, và cao. Điều này giúp: bắt được nhiều ánh sáng nhất có thể.',
    contentFr:
      'Les cellules palissadiques sont dans les **feuilles**. Leur **fonction** : faire la nourriture par **photosynthèse**.\n\n' +
      'Elles sont pleines de **chloroplastes**, dont la **chlorophylle** verte capte l’énergie du soleil.\n\n' +
      '> **Cellule palissadique.** Fonction : photosynthèse. Structure : haute, pleine de **chloroplastes**. Avantage : elle capte un maximum de lumière.',
    reveal: {
      label: 'Why tall — and why at the top of the leaf?',
      labelVn: 'Vì sao lại cao — và vì sao nằm ở mặt trên của lá?',
      labelFr: 'Pourquoi haute, et en haut de la feuille ?',
      answer: '**Tall** means one cell can stack more chloroplasts one above another, so it catches more light. At the **top** means the light reaches it **first**, before any other cell can shade it. The shape and the position were both chosen by the same job.',
      answerVn: '**Cao** nghĩa là một tế bào xếp được nhiều lục lạp chồng lên nhau, nên bắt được nhiều ánh sáng hơn. Ở **mặt trên** nghĩa là ánh sáng đến với nó **trước tiên**, trước khi có tế bào nào che mất. Cả hình dạng lẫn vị trí đều do cùng một nhiệm vụ quyết định.',
      answerFr: '**Haute** : la cellule empile plus de chloroplastes, donc capte plus de lumière. **En haut** : la lumière l’atteint **en premier**, avant qu’une autre cellule lui fasse de l’ombre. Forme et position viennent du même travail.',
    },
  },
  {
    layout: 'gallery',
    accent: GREEN,
    icon: 'Microscope',
    tone: 'plant',
    columns: 2,
    copy: false,
    eyebrow: 'The plant cells, for real',
    eyebrowVn: 'Tế bào thực vật, ngoài đời thực',
    eyebrowFr: 'Les cellules végétales, pour de vrai',
    title: 'Down a Real Microscope',
    titleVn: 'Nhìn qua kính hiển vi thật',
    titleFr: 'Au vrai microscope',
    content: 'And the two plant cells, as they really look. Match each one to the drawing you have just seen.',
    contentVn: 'Và hai tế bào thực vật, đúng như chúng trông thật. Hãy ghép mỗi cái với hình vẽ em vừa xem.',
    contentFr: 'Et les deux cellules végétales, telles qu’elles sont vraiment. Associe chacune au dessin que tu viens de voir.',
    items: [
      {
        image: roothair,
        term: 'Root hairs', termVn: 'Lông hút', termFr: 'Poils absorbants',
        text: 'Cress seeds sprouting in soil. The **white fuzz** on each young root is thousands of root hairs.',
        textVn: 'Hạt cải xoong nảy mầm trong đất. **Lớp lông trắng** trên mỗi rễ non là hàng nghìn lông hút.',
        textFr: 'Des graines de cresson qui germent dans la terre. Le **duvet blanc** sur chaque jeune racine, ce sont des milliers de poils absorbants.',
      },
      {
        image: leaf,
        term: 'Palisade cells', termVn: 'Tế bào mô giậu', termFr: 'Cellules palissadiques',
        text: 'A slice through a leaf. The **tall purple columns** just under the top are the palisade cells, full of chloroplasts.',
        textVn: 'Một lát cắt qua lá. Những **cột tím cao** ngay dưới mặt trên là tế bào mô giậu, chứa đầy lục lạp.',
        textFr: 'Une coupe de feuille. Les **hautes colonnes violettes** juste sous le dessus sont les cellules palissadiques, pleines de chloroplastes.',
      },
    ],
  },
  // The bookend: the opening question, now answerable. Same plant, same set of
  // parts available to both, opposite jobs — so opposite shapes. Media-only
  // columns, so each shape gets the full height of its panel.
  {
    layout: 'compare',
    accent: GREEN,
    icon: 'Scale',
    eyebrow: 'One plant, two cells',
    eyebrowVn: 'Một cái cây, hai tế bào',
    eyebrowFr: 'Une plante, deux cellules',
    title: 'Same Plant. Opposite Shapes.',
    titleVn: 'Cùng một cây. Hình dạng trái ngược.',
    titleFr: 'Même plante. Formes opposées.',
    columns: [
      {
        heading: 'Down in the dark',
        headingVn: 'Dưới lòng đất tối',
        headingFr: 'En bas, dans le noir',
        accent: '#a3762f',
        icon: 'Droplet',
        inlineSvg: DIAGRAMS.SHAPE_ROOTHAIR,
        caption: 'Job: **soak up water**. So it grows **long and thin**, out between the grains of soil — and builds **no chloroplasts**, because there is no light to use.',
        captionVn: 'Nhiệm vụ: **hút nước**. Nên nó mọc **dài và mảnh**, len ra giữa các hạt đất — và **không tạo lục lạp**, vì ở đó không có ánh sáng để dùng.',
        captionFr: 'Travail : **absorber l’eau**. Alors elle pousse **longue et fine**, entre les grains de terre — et ne fabrique **pas de chloroplastes**, car il n’y a pas de lumière.',
      },
      {
        heading: 'Up in the light',
        headingVn: 'Trên cao trong ánh sáng',
        headingFr: 'En haut, dans la lumière',
        accent: GREEN,
        icon: 'Sun',
        inlineSvg: DIAGRAMS.SHAPE_PALISADE,
        caption: 'Job: **catch sunlight**. So it grows **tall and packed with chloroplasts**, standing at the very top of the leaf where the light arrives first.',
        captionVn: 'Nhiệm vụ: **bắt ánh sáng**. Nên nó mọc **cao và chứa đầy lục lạp**, đứng ngay mặt trên của lá nơi ánh sáng đến đầu tiên.',
        captionFr: 'Travail : **capter la lumière du soleil**. Alors elle pousse **haute et pleine de chloroplastes**, tout en haut de la feuille, là où la lumière arrive en premier.',
      },
    ],
  },

  // ── Section 4: the second table, the English, the drill ──────────────────
  // Activity 1.3.2 is a SEPARATE table in the book, with its own peer assessment
  // — so it is a separate task here, and the peer assessment is the checking.
  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Grid3x3',
    eyebrow: 'Learner’s Book, page 21 · Activity 1.3.2',
    eyebrowVn: 'Sách học sinh, trang 21 · Hoạt động 1.3.2',
    eyebrowFr: 'Manuel, page 21 · Activité 1.3.2',
    title: 'Now the Plant Cells — On Your Own',
    titleVn: 'Giờ đến tế bào thực vật — em tự làm',
    titleFr: 'Cellules végétales — sans aide',
    inlineSvg: DIAGRAMS.PLANT_TABLE,
    drawThis: true,
    content: 'A **second** table, the same four columns. This time nothing is filled in for you — you already have both rows in your notes.',
    contentVn: 'Một bảng **thứ hai**, vẫn bốn cột như vậy. Lần này không có gì làm sẵn — em đã có sẵn cả hai dòng trong vở rồi.',
    contentFr: 'Un **deuxième** tableau, mêmes quatre colonnes. Cette fois, rien n’est rempli — tu as déjà les deux lignes dans tes notes.',
    steps: [
      {
        text: 'Rule up the four columns again, and give this table a **title** too.',
        textVn: 'Kẻ lại bốn cột, và cũng đặt **tiêu đề** cho bảng này.',
        textFr: 'Trace encore les quatre colonnes, et donne un **titre** au tableau.',
      },
      {
        text: 'Fill in the **root hair cell** row, then the **palisade cell** row.',
        textVn: 'Điền dòng **tế bào lông hút**, rồi dòng **tế bào mô giậu**.',
        textFr: 'Remplis la ligne **poil absorbant**, puis **cellule palissadique**.',
      },
      {
        text: 'Swap notebooks with your partner and check theirs against the four points below.',
        textVn: 'Đổi vở với bạn và kiểm tra bài của bạn theo bốn điểm dưới đây.',
        textFr: 'Échange les cahiers et vérifie celui de ton voisin avec les 4 points ci-dessous.',
      },
    ],
    reveal: {
      label: 'Peer assessment — what you are checking for',
      labelVn: 'Đánh giá bạn — em cần kiểm tra những gì',
      labelFr: 'Évaluation par un camarade — à vérifier',
      answer:
        'Give your partner a tick for each one:\n\n' +
        '**1.** The lines are **ruled**, not drawn freehand.\n' +
        '**2.** Every **column has a heading**, and the table has a title.\n' +
        '**3.** Each **row is named** with one of the two plant cells.\n' +
        '**4.** The descriptions are **short and clear** — not copied sentences from the book.',
      answerVn:
        'Cho bạn một dấu tích ở mỗi mục:\n\n' +
        '**1.** Các đường kẻ được **kẻ bằng thước**, không vẽ tay.\n' +
        '**2.** Mỗi **cột đều có tiêu đề**, và bảng có tên.\n' +
        '**3.** Mỗi **dòng được đặt tên** bằng một trong hai tế bào thực vật.\n' +
        '**4.** Phần mô tả **ngắn gọn và rõ ràng** — không chép nguyên câu từ sách.',
      answerFr:
        'Une coche par point réussi :\n\n' +
        '**1.** Lignes tracées **à la règle**, pas à main levée.\n' +
        '**2.** Chaque **colonne a un titre**, et le tableau aussi.\n' +
        '**3.** Chaque **ligne porte le nom** d’une cellule végétale.\n' +
        '**4.** Descriptions **courtes et claires** — pas copiées du livre.',
    },
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi tiết học đều là tiết tiếng Anh',
    eyebrowFr: 'Tout cours est un cours d’anglais',
    title: 'Structure Fits Function',
    titleVn: 'Cấu trúc phù hợp với chức năng',
    titleFr: 'La structure sert la fonction',
    ratio: 45,
    content:
      'Every cell today told the **same kind of story**: it has a job, and a special feature that helps it do that job.\n\n' +
      'There is one English sentence that says it every time. Learn the frame and you can describe **any** specialised cell — including ones you have never met.',
    contentVn:
      'Mọi tế bào hôm nay đều kể **cùng một kiểu câu chuyện**: nó có một nhiệm vụ, và một đặc điểm đặc biệt giúp nó làm nhiệm vụ đó.\n\n' +
      'Có một câu tiếng Anh nói điều đó mỗi lần. Học mẫu câu này thì em mô tả được **bất kỳ** tế bào chuyên hoá nào — kể cả loại em chưa từng gặp.',
    contentFr:
      'Chaque cellule du jour a raconté **la même histoire** : un travail, et une particularité qui l’aide à le faire.\n\n' +
      'Une seule phrase anglaise le dit à chaque fois. Apprends ce modèle pour décrire **n’importe quelle** cellule spécialisée — même inconnue.',
    notes: [
      {
        tone: 'write',
        text:
          '**The sentence frame:**\n' +
          'A [cell] is **adapted to** [its job] **because it has** [its special feature].\n' +
          '“A red blood cell is adapted to carry oxygen because it has no nucleus and is full of haemoglobin.”',
        textVn:
          '**Mẫu câu:**\n' +
          'A [cell] is **adapted to** [nhiệm vụ] **because it has** [đặc điểm đặc biệt].\n' +
          '“A red blood cell is adapted to carry oxygen because it has no nucleus and is full of haemoglobin.”',
        textFr:
          '**Modèle de phrase :**\n' +
          'A [cell] is **adapted to** [son travail] **because it has** [sa particularité].\n' +
          '“A red blood cell is adapted to carry oxygen because it has no nucleus and is full of haemoglobin.”',
      },
    ],
    reveal: {
      label: 'Your turn — finish this one out loud',
      labelVn: 'Đến lượt em — hãy hoàn thành câu này',
      labelFr: 'À toi — à voix haute, en anglais',
      prompt: '“A palisade cell is adapted to ______ because it has ______ .”',
      promptVn: '“A palisade cell is adapted to ______ because it has ______ .”',
      promptFr: '“A palisade cell is adapted to ______ because it has ______ .”',
      answer: 'A palisade cell is adapted to **make food by photosynthesis** because it has **lots of chloroplasts near the top of the leaf**.',
      answerVn: 'A palisade cell is adapted to **make food by photosynthesis** because it has **lots of chloroplasts near the top of the leaf**. (Tế bào mô giậu thích nghi để quang hợp vì nó có nhiều lục lạp gần mặt trên của lá.)',
      answerFr: 'A palisade cell is adapted to **make food by photosynthesis** because it has **lots of chloroplasts near the top of the leaf**.',
    },
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Repeat',
    title: 'Say It Before You See It',
    titleVn: 'Nói trước khi nhìn thấy',
    titleFr: 'Dis-le avant de le voir',
    ratio: 45,
    content: 'One cell at a time. For each photo, say its **job** and its **special feature** out loud **before** we reveal them — then check.',
    contentVn: 'Mỗi lần một tế bào. Với mỗi bức ảnh, hãy nói to **nhiệm vụ** và **đặc điểm đặc biệt** của nó **trước khi** ta hiện đáp án — rồi kiểm tra.',
    contentFr: 'Une cellule à la fois. Pour chaque photo, dis à voix haute son **travail** et sa **particularité** **avant** qu’on les montre — puis vérifie.',
    notes: [
      {
        tone: 'task',
        badge: 'On your whiteboard',
        badgeVn: 'Trên bảng con',
        badgeFr: 'Sur ton ardoise',
        text: 'Write the cell’s job **before** anyone presses the button. Use the sentence frame if it helps.',
        textVn: 'Viết nhiệm vụ của tế bào **trước khi** có ai bấm nút. Dùng mẫu câu nếu cần.',
        textFr: 'Écris le travail de la cellule **avant** qu’on appuie sur le bouton. Utilise le modèle de phrase si ça t’aide.',
      },
    ],
    widget: SpecialisedCellWidget,
  },

  // ── Section 5: recap and homework ────────────────────────────────────────
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
      '> Your notebook should now have **2 definitions**, the **sentence frame**, and **2 tables** — 3 animal rows and 2 plant rows. Check.',
    contentVn:
      '> Trong vở của em bây giờ phải có **2 định nghĩa**, **mẫu câu**, và **2 bảng** — 3 dòng động vật và 2 dòng thực vật. Hãy kiểm tra.',
    contentFr:
      '> Ton cahier doit maintenant contenir **2 définitions**, le **modèle de phrase** et **2 tableaux** — 3 lignes animales et 2 lignes végétales. Vérifie.',
    items: [
      { text: 'Say what **function** and **specialised** mean.', textVn: 'Nói được **chức năng** và **chuyên hoá** nghĩa là gì.', textFr: 'Dire ce que veulent dire **fonction** et **spécialisée**.' },
      { text: 'Name the **three** specialised animal cells and each one’s job.', textVn: 'Kể **ba** tế bào động vật chuyên hoá và nhiệm vụ của từng cái.', textFr: 'Nommer les **trois** cellules animales spécialisées et le travail de chacune.' },
      { text: 'Name the **two** specialised plant cells and each one’s job.', textVn: 'Kể **hai** tế bào thực vật chuyên hoá và nhiệm vụ của từng cái.', textFr: 'Nommer les **deux** cellules végétales spécialisées et le travail de chacune.' },
      { text: 'Use the frame: **adapted to ___ because it has ___**.', textVn: 'Dùng mẫu câu: **adapted to ___ because it has ___**.', textFr: 'Utiliser le modèle : **adapted to ___ because it has ___**.' },
      { text: 'Explain why a root hair cell has **no chloroplasts**.', textVn: 'Giải thích vì sao tế bào lông hút **không có lục lạp**.', textFr: 'Expliquer pourquoi une cellule de poil absorbant n’a **pas de chloroplastes**.' },
      { text: 'Build a clear **table** with ruled lines and column headings.', textVn: 'Lập được một **bảng** rõ ràng, kẻ thước và có tiêu đề cột.', textFr: 'Faire un **tableau** clair, tracé à la règle, avec des titres de colonnes.' },
    ],
  },
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
        text: 'Read the whole of Unit 1.3, **pages 17 to 21**.',
        textVn: 'Đọc toàn bộ Bài 1.3, **trang 17 đến 21**.',
        textFr: 'Lis toute l’unité 1.3, **pages 17 à 21**.',
      },
      {
        tone: 'homework',
        badge: 'Writing Task',
        badgeVn: 'Bài viết',
        badgeFr: 'Écriture',
        icon: 'Pencil',
        text: 'Neaten up **both tables** if you did not finish them. Then answer **Questions 1 to 4** (pages 19–20) in **full English sentences** — the word **because** should appear at least three times.',
        textVn: 'Hoàn thiện **cả hai bảng** nếu em chưa xong. Rồi trả lời **Câu hỏi 1 đến 4** (trang 19–20) bằng **câu tiếng Anh đầy đủ** — từ **because** phải xuất hiện ít nhất ba lần.',
        textFr: 'Termine **les deux tableaux** au propre. Puis réponds aux **questions 1 à 4** (pages 19–20) en **phrases complètes en anglais** — le mot **because** doit apparaître au moins trois fois.',
      },
    ],
  },
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
    subtitle: 'You can name five specialised cells and explain how each one’s structure fits its function. Exit question: that small purple **white blood cell** in the blood photograph chases germs and swallows them whole. Why would a **fixed** shape be no good for that job?',
    subtitleVn: 'Em có thể kể năm tế bào chuyên hoá và giải thích cấu trúc của mỗi cái phù hợp với chức năng ra sao. Câu hỏi ra về: con **bạch cầu** nhỏ màu tím trong bức ảnh máu đuổi theo vi khuẩn và nuốt trọn chúng. Vì sao một hình dạng **cố định** lại không phù hợp với nhiệm vụ đó?',
    subtitleFr: 'Tu sais nommer cinq cellules spécialisées et dire comment leur structure sert leur fonction. Question de sortie : le petit **globule blanc** violet de la photo de sang chasse les microbes et les avale entiers. Pourquoi une forme **fixe** le gênerait-elle ?',
  },
]
