// content/y7-science/U02_1a/slides.js
// Year 7 Science · 2.1a Solids, liquids and gases. Monday 7 September 2026.
//
// Section 2.1 in the Learner's Book runs from page 28 to page 34 and is far too
// much for one period taught properly, so it is split. THIS deck is pages 28-30:
// the three states, their properties, and the two words scientists use when they
// are trying to explain something (hypothesis, theory). 2.1b is pages 31-34: the
// particle theory itself, and using it to explain everything decided here.
//
// The split is not arbitrary. Everything in this deck is something the class can
// SEE — pour it, squash it, watch it fill a balloon. Nothing here needs a
// particle. That is what makes 2.1b land: they will have spent a whole lesson
// collecting behaviour, and then get one idea that explains all of it at once.
//
// THE SPINE IS ONE ARGUMENT, MADE THREE TIMES:
//   you cannot tell the state by looking — you have to test the properties.
// Sand pours, and is a solid. Mercury is a metal, and is a liquid. Air is
// invisible, and is absolutely something. Each of those is a slide where the
// class commits to a wrong answer first, and each one is a tile in the Word Wall
// at the end.
//
// THE COPY-DOWN PLAN, because this is what keeps a lesson from drowning.
// Seven written items, each written at the moment it is taught and nowhere else:
//   · matter + states of matter   (one panel, two lines)
//   · property                    (with the everyday English meaning beside it)
//   · the properties of a solid
//   · the properties of a liquid
//   · the properties of a gas
//   · hypothesis + theory         (one panel, two lines)
//   · the four-question table, ruled up — the deck's one Draw This.
// The Learner's Book "Getting started" table is also started here, but it is
// finished for homework, because filling it properly needs the vocabulary this
// lesson is only just handing over.
//
// SEVEN TIMES THE CLASS STOPS AND DOES SOMETHING: the six-substance starter, the
// hourglass argument in pairs, the sorting table, the syringe prediction (hands
// up before I push), the syringe itself if the kit is out, the mercury/sand
// re-sort, and the Word Wall at the end.
//
// Source: Learner's Book Unit 2.1, pages 28-30. Getting started, Questions 1-7
// and the p.30 list of observations are the book's own. Figures are drawn in
// diagrams.js; photographs are openly licensed (see images/CREDITS.json).
import { DIAGRAMS } from './diagrams.js'
import { WordWallLink } from './widgets.jsx'
import halong from './images/halong.jpg'
import hourglass from './images/hourglass.jpg'
import ice from './images/ice.jpg'
import mercury from './images/mercury.jpg'
import balloon from './images/balloon.jpg'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const RED = '#c8102e'
// The three state colours, kept identical in 2.1b and in both diagrams files.
const STONE = '#8a7f68'
const WATER = '#2f7fb0'
const VIOLET = '#8b6bb1'

export const slides = [
  // ── Section 1: a starter they can already do, then one they cannot ───────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Boxes',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    brandFr: 'Sciences 7e année',
    eyebrow: '2.1 Solids, liquids and gases · part 1 of 2',
    eyebrowVn: '2.1 Chất rắn, chất lỏng và chất khí · phần 1 trong 2',
    eyebrowFr: '2.1 Solides, liquides et gaz · partie 1 sur 2',
    date: '7 Sep 2026',
    title: 'Solids, Liquids and Gases',
    titleVn: 'Chất rắn, chất lỏng và chất khí',
    titleFr: 'Solides, liquides et gaz',
    card: {
      icon: 'Pencil',
      badge: 'Starter Task',
      badgeVn: 'Nhiệm vụ khởi động',
      badgeFr: 'Pour commencer',
      text: 'In your notebook, write **two solids, two liquids and two gases**. Six things. Three minutes. Rule: none of them may be water.',
      textVn: 'Viết vào vở **hai chất rắn, hai chất lỏng và hai chất khí**. Sáu thứ. Ba phút. Một điều kiện: không được chọn nước.',
      textFr: 'Dans ton cahier, écris **deux solides, deux liquides et deux gaz**. Six choses. Trois minutes. Règle : pas d’eau.',
    },
  },
  // The hook. No answer anywhere on this slide, and no second picture. The
  // hourglass alone IS the argument: it looks like a liquid being poured.
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Users',
    eyebrow: 'In pairs — two minutes, and no calling out',
    eyebrowVn: 'Theo cặp — hai phút, không nói to đáp án',
    eyebrowFr: 'À deux — deux minutes, sans crier la réponse',
    title: 'Sand Pours Like Water. Is Sand a Liquid?',
    titleVn: 'Cát chảy giống như nước. Vậy cát có phải chất lỏng không?',
    titleFr: 'Le sable coule comme l’eau. Le sable est-il un liquide ?',
    image: hourglass,
    caption: 'It flows through a narrow neck. It takes the shape of whatever you put it in. You can pour it from one hand to the other. Decide with your partner: **solid or liquid** — and be ready to say **why**.',
    captionVn: 'Nó chảy qua một cổ hẹp. Nó mang hình dạng của bất cứ thứ gì em đựng nó vào. Em có thể rót nó từ tay này sang tay kia. Hãy cùng bạn quyết định: **chất rắn hay chất lỏng** — và sẵn sàng nói **vì sao**.',
    captionFr: 'Il passe par un col étroit. Il prend la forme de ce qui le contient. Tu peux le verser d’une main dans l’autre. Décide avec ton voisin : **solide ou liquide** — et prépare-toi à dire **pourquoi**.',
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Globe',
    eyebrow: 'Hạ Long Bay — three states in one photograph',
    eyebrowVn: 'Vịnh Hạ Long — ba trạng thái trong một bức ảnh',
    eyebrowFr: 'Baie d’Hạ Long — trois états sur une seule photo',
    title: 'Everything Here Is Matter',
    titleVn: 'Mọi thứ ở đây đều là vật chất',
    titleFr: 'Tout ici est de la matière',
    ratio: 45,
    image: halong,
    content:
      'The rock is a **solid**. The sea is a **liquid**. The air above them is a **gas**. Three completely different ways of behaving — and every single one of them is **matter**.\n\n' +
      'Scientists sort all matter into those three groups. Nothing in this photograph is outside them.',
    contentVn:
      'Đá là **chất rắn**. Biển là **chất lỏng**. Không khí phía trên là **chất khí**. Ba cách hành xử hoàn toàn khác nhau — và tất cả đều là **vật chất**.\n\n' +
      'Các nhà khoa học chia mọi vật chất thành ba nhóm đó. Không có gì trong bức ảnh này nằm ngoài ba nhóm ấy.',
    contentFr:
      'Le rocher est un **solide**. La mer est un **liquide**. L’air au-dessus est un **gaz**. Trois façons de se comporter complètement différentes — et chacune est de la **matière**.\n\n' +
      'Les scientifiques classent toute la matière dans ces trois groupes. Rien sur cette photo n’est en dehors.',
    notes: [
      {
        tone: 'write',
        text: '**Matter:** everything you can see and feel.\n**States of matter:** the three groups we sort matter into — **solid, liquid** and **gas**.',
        textVn: '**Vật chất (matter):** mọi thứ em có thể nhìn thấy và chạm vào.\n**Trạng thái của vật chất (states of matter):** ba nhóm mà ta chia vật chất ra — **chất rắn, chất lỏng** và **chất khí**.',
        textFr: '**Matière (matter) :** tout ce que tu peux voir et toucher.\n**États de la matière (states of matter) :** les trois groupes où l’on classe la matière — **solide, liquide** et **gaz**.',
      },
    ],
  },
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Table',
    eyebrow: 'Learner’s Book, page 28 · Getting started, Question 2',
    eyebrowVn: 'Sách học sinh, trang 28 · Khởi động, Câu hỏi 2',
    eyebrowFr: 'Livre de l’élève, page 28 · Pour commencer, question 2',
    title: 'Rule Up This Table',
    titleVn: 'Hãy kẻ bảng này',
    titleFr: 'Trace ce tableau',
    ratio: 52,
    side: 'left',
    inlineSvg: DIAGRAMS.SORTING_TABLE,
    content:
      'Copy the table and put **your own six substances** into it — the ones you wrote at the start.\n\n' +
      'The third column is the one that matters. **“I know this because…”** is not a guess. It is the test you did in your head. *I can pour it. It stays in a lump. I cannot see it.*',
    contentVn:
      'Chép bảng này và điền **sáu chất của chính em** vào — những chất em đã viết lúc đầu giờ.\n\n' +
      'Cột thứ ba mới là cột quan trọng. **“I know this because…”** (Em biết vậy vì…) không phải là đoán. Đó là phép thử em đã làm trong đầu. *Em rót được nó. Nó vẫn thành một cục. Em không nhìn thấy nó.*',
    contentFr:
      'Recopie le tableau et mets-y **tes six substances** — celles que tu as écrites au début.\n\n' +
      'C’est la troisième colonne qui compte. **“I know this because…”** (Je le sais parce que…) n’est pas une devinette. C’est le test que tu as fait dans ta tête. *Je peux le verser. Il reste en bloc. Je ne le vois pas.*',
    notes: [
      {
        tone: 'task',
        badge: 'In your notebook',
        badgeVn: 'Làm vào vở',
        badgeFr: 'Dans ton cahier',
        icon: 'Pencil',
        text: 'Fill in **two rows now** — one solid and one liquid. Leave the rest. We will come back to it at the end.',
        textVn: 'Bây giờ điền **hai dòng** — một chất rắn và một chất lỏng. Phần còn lại để trống. Cuối giờ chúng ta sẽ quay lại.',
        textFr: 'Remplis **deux lignes maintenant** — un solide et un liquide. Laisse le reste. On y reviendra à la fin.',
      },
    ],
  },
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'BookOpen',
    eyebrow: 'Every science class is an English class',
    eyebrowVn: 'Mỗi tiết khoa học đều là tiết tiếng Anh',
    eyebrowFr: 'Les sciences, c’est aussi de l’anglais',
    title: 'The Word “Property”',
    titleVn: 'Từ “property”',
    titleFr: 'Le mot « property »',
    content:
      'Ask an adult what a **property** is and they will say a house, or a piece of land. That is the everyday meaning, and it is not the one we want.\n\n' +
      'In science, a **property** is a way a substance **behaves**. Can you pour it? Can you squash it? Does it keep its own shape? Each answer is one property.',
    contentVn:
      'Hỏi một người lớn **property** là gì thì họ sẽ nói: một căn nhà, một mảnh đất. Đó là nghĩa đời thường, và không phải nghĩa ta cần.\n\n' +
      'Trong khoa học, **property (tính chất)** là cách một chất **hành xử**. Rót được không? Nén được không? Nó có giữ hình dạng riêng không? Mỗi câu trả lời là một tính chất.',
    contentFr:
      'Demande à un adulte ce qu’est une **property** : il dira une maison, ou un terrain. C’est le sens de tous les jours, et ce n’est pas celui qu’on veut.\n\n' +
      'En sciences, une **property (propriété)** est une façon dont une substance **se comporte**. Peux-tu la verser ? Peux-tu l’écraser ? Garde-t-elle sa propre forme ? Chaque réponse est une propriété.',
    notes: [
      {
        tone: 'write',
        text: '**Property:** a way that a substance behaves. The three states of matter have different properties.',
        textVn: '**Tính chất (property):** cách mà một chất hành xử. Ba trạng thái của vật chất có những tính chất khác nhau.',
        textFr: '**Propriété (property) :** une façon dont une substance se comporte. Les trois états de la matière ont des propriétés différentes.',
      },
    ],
  },

  // ── Section 2: one state at a time, slowly ──────────────────────────────
  {
    layout: 'split',
    accent: STONE,
    icon: 'Box',
    eyebrow: 'State 1 of 3',
    eyebrowVn: 'Trạng thái 1 trong 3',
    eyebrowFr: 'État 1 sur 3',
    title: 'Solids Keep Their Own Shape',
    titleVn: 'Chất rắn giữ hình dạng riêng',
    titleFr: 'Les solides gardent leur propre forme',
    ratio: 45,
    image: ice,
    content:
      'Every cube in this picture is a **cube**. Tip them into a bowl and they are still cubes. Put one in your hand and squeeze — nothing happens.\n\n' +
      'That is what a solid does. It decides its own shape, and it keeps it. The **volume** — the amount of space it takes up — stays the same too.',
    contentVn:
      'Mỗi viên trong bức ảnh này đều là một **khối lập phương**. Đổ chúng vào bát thì chúng vẫn là khối lập phương. Cầm một viên trong tay và bóp — không có gì xảy ra.\n\n' +
      'Đó là điều chất rắn làm. Nó tự quyết định hình dạng của mình, và giữ nguyên hình dạng ấy. **Thể tích (volume)** — lượng không gian nó chiếm — cũng không đổi.',
    contentFr:
      'Chaque glaçon sur cette image est un **cube**. Verse-les dans un bol : ce sont toujours des cubes. Prends-en un dans ta main et serre — rien ne se passe.\n\n' +
      'C’est ce que fait un solide. Il choisit sa propre forme, et il la garde. Le **volume** — la place qu’il occupe — reste aussi le même.',
    notes: [
      {
        tone: 'write',
        text: '**A solid:** keeps the same **shape** · keeps the same **volume** · cannot be **compressed** (squashed) · cannot be **poured**.',
        textVn: '**Chất rắn:** giữ nguyên **hình dạng** · giữ nguyên **thể tích** · không thể **nén (compressed)** · không thể **rót (poured)**.',
        textFr: '**Un solide :** garde la même **forme** · garde le même **volume** · ne peut pas être **comprimé (compressed)** · ne peut pas être **versé (poured)**.',
      },
    ],
  },
  {
    layout: 'split',
    accent: WATER,
    icon: 'Droplets',
    eyebrow: 'State 2 of 3',
    eyebrowVn: 'Trạng thái 2 trong 3',
    eyebrowFr: 'État 2 sur 3',
    title: 'Liquids Borrow the Container’s Shape',
    titleVn: 'Chất lỏng mượn hình dạng của vật chứa',
    titleFr: 'Les liquides empruntent la forme du récipient',
    ratio: 52,
    side: 'left',
    inlineSvg: DIAGRAMS.SAME_LIQUID,
    content:
      'Pour the same water into a tall tube, a flat dish and a round beaker, and it looks different every time. It has **no shape of its own** — it takes whichever one it is given.\n\n' +
      'But look at the label on each container. It is **50 cm³ every time**. The shape changed. The volume did not.',
    contentVn:
      'Rót cùng một lượng nước vào một ống cao, một đĩa nông và một cốc tròn thì lần nào trông cũng khác. Nó **không có hình dạng riêng** — nó nhận hình dạng nào được đưa cho.\n\n' +
      'Nhưng hãy nhìn nhãn trên mỗi vật chứa. Lần nào cũng là **50 cm³**. Hình dạng đã đổi. Thể tích thì không.',
    contentFr:
      'Verse la même eau dans un tube haut, un plat bas et un bécher rond : elle a l’air différente à chaque fois. Elle n’a **pas de forme à elle** — elle prend celle qu’on lui donne.\n\n' +
      'Mais regarde l’étiquette de chaque récipient. C’est **50 cm³ à chaque fois**. La forme a changé. Le volume, non.',
    notes: [
      {
        tone: 'write',
        text: '**A liquid:** takes the **shape of its container** · keeps the same **volume** · can be **poured** · cannot be **compressed**.',
        textVn: '**Chất lỏng:** mang **hình dạng của vật chứa** · giữ nguyên **thể tích** · có thể **rót (poured)** · không thể **nén (compressed)**.',
        textFr: '**Un liquide :** prend la **forme de son récipient** · garde le même **volume** · peut être **versé (poured)** · ne peut pas être **comprimé (compressed)**.',
      },
    ],
  },
  {
    layout: 'split',
    accent: VIOLET,
    icon: 'Wind',
    eyebrow: 'State 3 of 3',
    eyebrowVn: 'Trạng thái 3 trong 3',
    eyebrowFr: 'État 3 sur 3',
    title: 'Gases Fill Everything They Are In',
    titleVn: 'Chất khí lấp đầy mọi thứ chứa nó',
    titleFr: 'Les gaz remplissent tout l’espace',
    ratio: 45,
    image: balloon,
    content:
      'There is a person standing inside that balloon, and the thing holding it open is **air**. You cannot see the air, you cannot pick it up, and it weighs very little — but it is filling every corner of a space the size of a house.\n\n' +
      'A gas will not sit in the bottom like a liquid. Give it a room and it takes the **whole room**.',
    contentVn:
      'Có một người đang đứng bên trong quả khinh khí cầu đó, và thứ giữ cho nó căng ra là **không khí**. Em không nhìn thấy không khí, không cầm được nó, và nó rất nhẹ — nhưng nó đang lấp đầy mọi góc của một không gian to bằng cả ngôi nhà.\n\n' +
      'Chất khí không nằm ở đáy như chất lỏng. Cho nó một căn phòng thì nó chiếm **cả căn phòng**.',
    contentFr:
      'Il y a une personne debout dans ce ballon, et ce qui le garde ouvert, c’est l’**air**. Tu ne vois pas l’air, tu ne peux pas le prendre, et il pèse très peu — mais il remplit chaque coin d’un espace grand comme une maison.\n\n' +
      'Un gaz ne reste pas au fond comme un liquide. Donne-lui une pièce et il prend **toute la pièce**.',
    notes: [
      {
        tone: 'write',
        text: '**A gas:** has **no shape of its own** · **fills** any closed container · can be **compressed** easily · its **volume can change** · it weighs very little.',
        textVn: '**Chất khí:** **không có hình dạng riêng** · **lấp đầy** mọi vật chứa kín · dễ dàng bị **nén (compressed)** · **thể tích có thể thay đổi** · nó rất nhẹ.',
        textFr: '**Un gaz :** n’a **pas de forme à lui** · **remplit** tout récipient fermé · peut être **comprimé (compressed)** facilement · son **volume peut changer** · il pèse très peu.',
      },
    ],
  },

  // ── Section 3: the practical, asked before it is answered ───────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Predict — hands up before I touch anything',
    eyebrowVn: 'Dự đoán — giơ tay trước khi thầy chạm vào',
    eyebrowFr: 'Prédis — main levée avant que je touche',
    title: 'Two Syringes',
    titleVn: 'Hai chiếc xi-lanh',
    titleFr: 'Deux seringues',
    text: 'One is full of **water**, one of **air**. I block both holes with my thumb and push hard.',
    textVn: 'Một chiếc đầy **nước**, một chiếc đầy **không khí**. Thầy bịt cả hai lỗ bằng ngón cái và đẩy mạnh.',
    textFr: 'Une pleine d’**eau**, une d’**air**. Je bouche les deux trous du pouce et je pousse fort.',
    sub: 'Which plunger moves — water, air, both, or neither? Everybody votes.',
    subVn: 'Cần đẩy nào sẽ di chuyển — nước, không khí, cả hai, hay không cái nào? Cả lớp đều bỏ phiếu.',
    subFr: 'Quel piston bouge — eau, air, les deux, aucun ? Tout le monde vote.',
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Zap',
    eyebrow: 'The answer',
    eyebrowVn: 'Đáp án',
    eyebrowFr: 'La réponse',
    title: 'Only the Air Moves',
    titleVn: 'Chỉ có không khí di chuyển',
    titleFr: 'Seul l’air bouge',
    ratio: 50,
    side: 'left',
    inlineSvg: DIAGRAMS.SYRINGES,
    content:
      'The water plunger will not budge, however hard you lean on it. The air plunger slides in easily — and springs back the moment you let go.\n\n' +
      'The air was **compressed**: it was squashed into a smaller space. Nothing escaped, and nothing was added. Only the amount of room it took up changed.\n\n' +
      'This is the one property that separates a gas from **both** of the others.',
    contentVn:
      'Cần đẩy bên nước không nhúc nhích, dù em có tì mạnh đến đâu. Cần đẩy bên không khí trượt vào dễ dàng — và bật ngược lại ngay khi em buông tay.\n\n' +
      'Không khí đã bị **nén (compressed)**: nó bị ép vào một khoảng nhỏ hơn. Không có gì thoát ra, cũng không có gì thêm vào. Chỉ có lượng không gian nó chiếm là thay đổi.\n\n' +
      'Đây là tính chất duy nhất tách chất khí ra khỏi **cả hai** trạng thái kia.',
    contentFr:
      'Le piston de l’eau ne bouge pas, même si tu appuies très fort. Le piston de l’air s’enfonce facilement — et revient dès que tu lâches.\n\n' +
      'L’air a été **comprimé** : il a été écrasé dans un espace plus petit. Rien ne s’est échappé, et rien n’a été ajouté. Seule la place qu’il occupait a changé.\n\n' +
      'C’est la seule propriété qui sépare un gaz des **deux** autres états.',
    notes: [
      {
        tone: 'write',
        text: '**Compressed:** squashed into a smaller space. **Only a gas can be compressed.**',
        textVn: '**Nén (compressed):** bị ép vào một khoảng không gian nhỏ hơn. **Chỉ chất khí mới có thể bị nén.**',
        textFr: '**Comprimé (compressed) :** écrasé dans un espace plus petit. **Seul un gaz peut être comprimé.**',
      },
    ],
  },

  // The hook is paid off here, and it is paid off TWICE, because one surprise
  // reads as a trick and two read as a rule.
  {
    layout: 'compare',
    accent: ORANGE,
    icon: 'ScanEye',
    eyebrow: 'Back to the hourglass — and one more like it',
    eyebrowVn: 'Quay lại chiếc đồng hồ cát — và thêm một ví dụ nữa',
    eyebrowFr: 'Retour au sablier — et un autre exemple',
    title: 'You Cannot Tell by Looking',
    titleVn: 'Nhìn thôi thì không thể biết được',
    titleFr: 'Regarder ne suffit pas',
    columns: [
      {
        heading: 'Sand pours — but it is a SOLID',
        headingVn: 'Cát chảy — nhưng nó là CHẤT RẮN',
        headingFr: 'Le sable coule — mais c’est un SOLIDE',
        accent: STONE,
        icon: 'Box',
        image: hourglass,
        caption: 'Look closer. Each **grain** keeps its own shape and cannot be squashed — so each grain is a solid. What is flowing is not the sand; it is **millions of tiny solids rolling over each other**. Sugar, salt and rice do exactly the same thing.',
        captionVn: 'Hãy nhìn kỹ hơn. Mỗi **hạt** cát giữ hình dạng riêng và không thể bị bóp nhỏ — nên mỗi hạt là một chất rắn. Thứ đang chảy không phải là cát; đó là **hàng triệu chất rắn tí hon lăn lên nhau**. Đường, muối và gạo cũng làm y hệt như vậy.',
        captionFr: 'Regarde de plus près. Chaque **grain** garde sa forme et ne peut pas être écrasé — donc chaque grain est un solide. Ce qui coule, ce n’est pas le sable ; ce sont **des millions de minuscules solides qui roulent les uns sur les autres**. Le sucre, le sel et le riz font exactement pareil.',
      },
      {
        heading: 'Mercury is a metal — but it is a LIQUID',
        headingVn: 'Thuỷ ngân là kim loại — nhưng nó là CHẤT LỎNG',
        headingFr: 'Le mercure est un métal — mais c’est un LIQUIDE',
        accent: WATER,
        icon: 'Droplets',
        image: mercury,
        caption: 'Every other metal you have held was hard and cold. This one pours, splashes, and takes the shape of the dish. It is a metal **and** a liquid, and there is no contradiction — **liquid** is not a kind of stuff, it is a way of behaving.',
        captionVn: 'Mọi kim loại khác em từng cầm đều cứng và lạnh. Kim loại này thì rót được, bắn toé, và mang hình dạng của cái đĩa. Nó vừa là kim loại **vừa** là chất lỏng, và không hề mâu thuẫn — **chất lỏng** không phải là một loại vật liệu, mà là một cách hành xử.',
        captionFr: 'Tous les autres métaux que tu as tenus étaient durs et froids. Celui-ci se verse, éclabousse et prend la forme du plat. C’est un métal **et** un liquide, sans contradiction — **liquide** n’est pas une sorte de matière, c’est une façon de se comporter.',
      },
    ],
  },

  // ── Section 4: the Draw This, and the book's questions ──────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Table',
    eyebrow: 'Rulers out — you will use this sheet all unit',
    eyebrowVn: 'Lấy thước ra — em sẽ dùng bảng này suốt cả chương',
    eyebrowFr: 'Sors ta règle — tu utiliseras cette feuille toute l’unité',
    title: 'Four Questions, Three States',
    titleVn: 'Bốn câu hỏi, ba trạng thái',
    titleFr: 'Quatre questions, trois états',
    inlineSvg: DIAGRAMS.STATES_TABLE,
    drawThis: true,
    caption: 'Everything on pages 28 and 29, on one grid. Rule it up properly, with a ruler, and copy the ticks and crosses exactly. Six minutes.',
    captionVn: 'Toàn bộ trang 28 và 29 gọn trong một bảng. Hãy kẻ cẩn thận bằng thước, và chép đúng các dấu tích và dấu chéo. Sáu phút.',
    captionFr: 'Tout ce qu’il y a aux pages 28 et 29, dans une seule grille. Trace-la proprement, à la règle, et recopie exactement les coches et les croix. Six minutes.',
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'HelpCircle',
    eyebrow: 'Learner’s Book, page 30 · Questions 1 to 4',
    eyebrowVn: 'Sách học sinh, trang 30 · Câu hỏi 1 đến 4',
    eyebrowFr: 'Livre de l’élève, page 30 · questions 1 à 4',
    title: 'Check the Table You Just Drew',
    titleVn: 'Kiểm tra lại bảng em vừa vẽ',
    titleFr: 'Vérifie le tableau que tu viens de tracer',
    ratio: 56,
    inlineSvg: DIAGRAMS.STATES_TABLE,
    content:
      '> **1.** What are the three states of matter?\n' +
      '> **2.** Which state of matter can be compressed (squashed) easily?\n' +
      '> **3.** Which state of matter cannot be poured?\n' +
      '> **4.** List the properties of solids.\n\n' +
      'Every answer is a row or a column of your own table. Find it there before you say it.',
    contentVn:
      '> **1.** What are the three states of matter?\n' +
      '> **2.** Which state of matter can be compressed (squashed) easily?\n' +
      '> **3.** Which state of matter cannot be poured?\n' +
      '> **4.** List the properties of solids.\n\n' +
      'Mỗi đáp án đều là một hàng hoặc một cột trong bảng của chính em. Hãy tìm nó ở đó trước khi trả lời.',
    contentFr:
      '> **1.** What are the three states of matter?\n' +
      '> **2.** Which state of matter can be compressed (squashed) easily?\n' +
      '> **3.** Which state of matter cannot be poured?\n' +
      '> **4.** List the properties of solids.\n\n' +
      'Chaque réponse est une ligne ou une colonne de ton tableau. Trouve-la avant de la dire.',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifie',
      answer:
        '**1.** Solid, liquid and gas.\n**2.** A gas.\n**3.** A solid.\n**4.** Keeps the same shape · keeps the same volume · cannot be compressed · cannot be poured.',
      answerVn:
        '**1.** Chất rắn, chất lỏng và chất khí.\n**2.** Chất khí.\n**3.** Chất rắn.\n**4.** Giữ nguyên hình dạng · giữ nguyên thể tích · không nén được · không rót được.',
      answerFr:
        '**1.** Solide, liquide et gaz.\n' +
        '**2.** Un gaz.\n' +
        '**3.** Un solide.\n' +
        '**4.** Garde la même forme · garde le même volume · ne peut pas être comprimé · ne peut pas être versé.',
    },
  },
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'BookOpen',
    eyebrow: 'Learner’s Book, page 30 · Questions 5 to 7',
    eyebrowVn: 'Sách học sinh, trang 30 · Câu hỏi 5 đến 7',
    eyebrowFr: 'Livre de l’élève, p. 30 · questions 5 à 7',
    title: 'The Word Doing the Work Is “Share”',
    titleVn: 'Từ quan trọng nhất ở đây là “share”',
    titleFr: 'Le mot qui compte, c’est « share »',
    ratio: 56,
    content:
      'To **share** a property means **both do it**. To **not share** means **one does and the other does not**. Answer out loud in a **full sentence**.\n\n' +
      '> **5.** Name a property of liquids that they do **not** share with solids.\n' +
      '> **6.** Name a property of gases that they **do** share with liquids.\n' +
      '> **7.** Name a property of gases that they do **not** share with solids **or** liquids.',
    contentVn:
      '**Share** nghĩa là **cả hai đều có**. **Not share** nghĩa là **một bên có, bên kia không**. Trả lời to bằng **một câu đầy đủ**.\n\n' +
      '> **5.** Name a property of liquids that they do **not** share with solids.\n' +
      '> **6.** Name a property of gases that they **do** share with liquids.\n' +
      '> **7.** Name a property of gases that they do **not** share with solids **or** liquids.',
    contentFr:
      '**Share** une propriété : **les deux l’ont**. **Not share** : **l’un l’a, l’autre non**. Réponds à voix haute par une **phrase complète**.\n\n' +
      '> **5.** Name a property of liquids that they do **not** share with solids.\n' +
      '> **6.** Name a property of gases that they **do** share with liquids.\n' +
      '> **7.** Name a property of gases that they do **not** share with solids **or** liquids.',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifie',
      answer:
        '**5.** A liquid can be poured, and it takes the shape of its container — a solid does neither.\n' +
        '**6.** Both a gas and a liquid can be poured, can flow, and take the shape of their container.\n' +
        '**7.** Only a gas can be compressed, and only a gas changes its volume to fill the whole container.',
      answerVn:
        '**5.** Chất lỏng rót được và mang hình dạng vật chứa — chất rắn thì không làm được cả hai điều đó.\n' +
        '**6.** Cả chất khí và chất lỏng đều rót được, chảy được, và mang hình dạng vật chứa.\n' +
        '**7.** Chỉ chất khí mới nén được, và chỉ chất khí mới đổi thể tích để lấp đầy cả vật chứa.',
      answerFr:
        '**5.** Un liquide se verse et prend la forme de son récipient — pas un solide.\n' +
        '**6.** Un gaz et un liquide se versent, coulent et prennent la forme du récipient.\n' +
        '**7.** Seul un gaz se comprime, et seul un gaz change de volume pour remplir tout le récipient.',
    },
  },

  // ── Section 5: page 30 — what scientists do with all of this ────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Nobody answers yet — just think about it',
    eyebrowVn: 'Chưa ai trả lời vội — chỉ cần suy nghĩ',
    eyebrowFr: 'Ne réponds pas encore — réfléchis',
    title: 'Dinner, Two Rooms Away',
    titleVn: 'Bữa tối, cách hai căn phòng',
    titleFr: 'Dîner, à deux pièces',
    text: 'Your bedroom door is shut. Somebody starts cooking. A minute later you can **smell it**.',
    textVn: 'Cửa phòng em đóng kín. Có người bắt đầu nấu ăn. Một phút sau em đã **ngửi thấy mùi**.',
    textFr: 'Ta porte est fermée. Quelqu’un se met à cuisiner. Une minute après, tu **le sens**.',
    sub: 'Something got to your nose, and nobody carried it. Keep your idea — we need it next lesson.',
    subVn: 'Có thứ gì đó đã đến mũi em, và không ai mang nó cả. Hãy giữ lấy ý tưởng đó — tiết sau ta cần đến.',
    subFr: 'Quelque chose a atteint ton nez tout seul. Garde ton idée pour le prochain cours.',
  },
  {
    layout: 'stack',
    accent: TEAL,
    icon: 'Telescope',
    columns: 2,
    eyebrow: 'Learner’s Book, page 30',
    eyebrowVn: 'Sách học sinh, trang 30',
    eyebrowFr: 'Livre de l’élève, page 30',
    title: 'Four Things Scientists Noticed',
    titleVn: 'Bốn điều các nhà khoa học đã để ý thấy',
    titleFr: 'Quatre choses que les scientifiques ont remarquées',
    content: 'None of these is strange. Every one of them has happened in your kitchen. What is strange is that **one single idea explains all four** — and that idea is next lesson.',
    contentVn: 'Không điều nào lạ lùng cả. Mỗi điều đều đã xảy ra trong bếp nhà em. Điều lạ là **chỉ một ý tưởng duy nhất giải thích được cả bốn** — và ý tưởng đó là bài tiết sau.',
    contentFr: 'Rien de tout cela n’est étrange. Tout s’est déjà passé dans ta cuisine. Ce qui est étrange, c’est qu’**une seule idée explique les quatre** — et cette idée, c’est pour le prochain cours.',
    notes: [
      { tone: 'info', badge: false, icon: 'Soup', text: 'You can smell food cooking in another room.', textVn: 'Em ngửi thấy mùi thức ăn đang nấu ở phòng khác.', textFr: 'Tu sens la cuisine depuis une autre pièce.' },
      { tone: 'info', badge: false, icon: 'Flame', text: 'Some substances get bigger when you heat them.', textVn: 'Một số chất nở to ra khi em đun nóng chúng.', textFr: 'Certaines substances grossissent quand on les chauffe.' },
      { tone: 'info', badge: false, icon: 'Droplets', text: 'Liquids, such as water, change to a gas when you heat them.', textVn: 'Chất lỏng, ví dụ như nước, biến thành chất khí khi em đun nóng.', textFr: 'Les liquides, comme l’eau, deviennent un gaz quand on les chauffe.' },
      { tone: 'info', badge: false, icon: 'Snowflake', text: 'Substances change from liquid to solid if you cool them.', textVn: 'Các chất biến từ lỏng thành rắn nếu em làm lạnh chúng.', textFr: 'Les substances passent de liquide à solide quand on les refroidit.' },
    ],
  },
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'BookOpen',
    eyebrow: 'Every science class is an English class',
    eyebrowVn: 'Mỗi tiết khoa học đều là tiết tiếng Anh',
    eyebrowFr: 'Les sciences, c’est aussi de l’anglais',
    title: '“Theory” Means the Opposite of What You Think',
    titleVn: '“Theory” nghĩa ngược với em nghĩ',
    titleFr: '« Theory » : le contraire de ce que tu crois',
    content:
      'In everyday English, *“it’s only a theory”* means **I am not sure**. A guess.\n\n' +
      'In science it means almost the opposite: an idea **tested again and again** until it passes **every time**. It is the strongest thing we have.',
    contentVn:
      'Trong tiếng Anh đời thường, *“it’s only a theory”* nghĩa là **tôi không chắc**. Trong khoa học thì ngược lại: một ý tưởng được **kiểm chứng nhiều lần** và **lần nào cũng đúng** — thứ chắc chắn nhất ta có.',
    contentFr:
      'En anglais courant, *“it’s only a theory”* veut dire **je ne suis pas sûr**. ' +
      'En sciences, c’est l’inverse : une idée **testée encore et encore**, qui réussit **à chaque fois**. Rien de plus solide.',
    notes: [
      {
        tone: 'write',
        text: '**Hypothesis:** a suggested explanation, which has not been tested yet.\n**Theory:** a hypothesis that has been tested many times and is accepted by scientists.',
        textVn: '**Giả thuyết (hypothesis):** cách giải thích được đề ra, chưa kiểm chứng.\n**Học thuyết (theory):** giả thuyết đã kiểm chứng nhiều lần, được công nhận.',
        textFr: '**Hypothèse :** une explication proposée, pas encore testée.\n**Théorie :** une hypothèse testée de nombreuses fois et acceptée par les scientifiques.',
      },
    ],
  },
  {
    layout: 'callout',
    accent: VIOLET,
    icon: 'Sparkles',
    eyebrow: 'The best theory we have — and it is one sentence long',
    eyebrowVn: 'Học thuyết tốt nhất mà ta có — và nó chỉ dài một câu',
    eyebrowFr: 'Notre meilleure théorie — et elle tient en une phrase',
    title: 'Everything Is Made of Particles',
    titleVn: 'Mọi thứ đều được tạo nên từ các hạt',
    titleFr: 'Tout est fait de particules',
    content:
      'All matter — the rock, the sea, the air, your hand, this room — is made of **particles**: pieces far too small to see.\n\n' +
      'That one sentence explains the last slide, the two syringes, the smell from the kitchen, and every row of your table. **Next lesson we prove it.**',
    contentVn:
      'Mọi vật chất — đá, biển, không khí, bàn tay em, căn phòng này — đều tạo nên từ các **hạt (particles)**: những mảnh quá nhỏ để nhìn thấy.\n\n' +
      'Chỉ một câu đó giải thích được trang trước, hai chiếc xi-lanh, mùi thức ăn từ bếp, và mọi hàng trong bảng của em. **Tiết sau ta sẽ chứng minh.**',
    contentFr:
      'Toute la matière — le rocher, la mer, l’air, ta main, cette salle — est faite de **particules (particles)** : des morceaux bien trop petits pour être vus.\n\n' +
      'Cette seule phrase explique la diapositive d’avant, les deux seringues, l’odeur de la cuisine, et chaque ligne de ton tableau. **Au prochain cours, on le prouve.**',
    notes: [
      {
        tone: 'write',
        text: '**Particle:** a tiny piece of matter, much too small to see. All matter is made of particles.',
        textVn: '**Hạt (particle):** một mảnh vật chất rất nhỏ, nhỏ đến mức không thể nhìn thấy. Mọi vật chất đều được tạo nên từ các hạt.',
        textFr: '**Particule (particle) :** un minuscule morceau de matière, bien trop petit pour être vu. Toute la matière est faite de particules.',
      },
    ],
  },

  // ── Section 6: the game, the recap and the homework ─────────────────────
  // The Word Wall is the last thinking the class does, and it is deliberately
  // the same thinking as the mercury slide: sort by BEHAVIOUR, not by looks.
  {
    layout: 'split',
    accent: '#f59e0b',
    icon: 'Gamepad2',
    eyebrow: 'Word Wall · sixteen tiles, four hidden groups',
    eyebrowVn: 'Bức Tường Từ · mười sáu ô, bốn nhóm ẩn',
    eyebrowFr: 'Mur de mots · seize cases, quatre groupes cachés',
    title: 'Solid, Liquid or Gas?',
    titleVn: 'Chất rắn, chất lỏng hay chất khí?',
    titleFr: 'Solide, liquide ou gaz ?',
    ratio: 52,
    content:
      'Sixteen substances. Four groups of four. Three of the groups are **solids, liquids and gases** — and the fourth is the trap from today: things that **pour like a liquid but are made of tiny solid pieces**.\n\n' +
      'Two tiles are not where you think. **ICE** is water, and **MERCURY** is a metal. Neither of those facts decides anything. Ask the only question that counts: **what does it do?**\n\n' +
      'Four hearts. Whole class, one board, and nobody shouts the answer.',
    contentVn:
      'Mười sáu chất. Bốn nhóm, mỗi nhóm bốn ô. Ba nhóm là **chất rắn, chất lỏng và chất khí** — nhóm thứ tư là cái bẫy của hôm nay: những thứ **chảy như chất lỏng nhưng thật ra gồm những mẩu rắn tí hon**.\n\n' +
      'Hai ô không nằm ở chỗ em tưởng. **ICE** là nước, và **MERCURY** là kim loại. Cả hai điều đó đều không quyết định gì cả. Hãy hỏi câu duy nhất quan trọng: **nó hành xử thế nào?**\n\n' +
      'Bốn tim. Cả lớp, một bảng, và không ai được hét đáp án.',
    contentFr:
      'Seize substances. Quatre groupes de quatre. Trois groupes sont les **solides, les liquides et les gaz** — et le quatrième est le piège d’aujourd’hui : des choses qui **coulent comme un liquide mais sont faites de minuscules morceaux solides**.\n\n' +
      'Deux cases ne sont pas là où tu penses. **ICE** est de l’eau, et **MERCURY** est un métal. Aucun de ces faits ne décide quoi que ce soit. Pose la seule question qui compte : **que fait-il ?**\n\n' +
      'Quatre cœurs. Toute la classe, un seul tableau, et personne ne crie la réponse.',
    widget: WordWallLink,
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
      '> Your notebook should now have **6 substances**, **1 sorting table started**, **6 written items**, and **1 ruled table** with ticks and crosses. Check.',
    contentVn:
      '> Trong vở của em bây giờ phải có **6 chất**, **1 bảng phân loại đã bắt đầu**, **6 mục đã ghi**, và **1 bảng kẻ thước** có dấu tích và dấu chéo. Hãy kiểm tra.',
    contentFr:
      '> Ton cahier doit maintenant contenir **6 substances**, **1 tableau de tri commencé**, **6 notes écrites** et **1 tableau tracé à la règle** avec coches et croix. Vérifie.',
    items: [
      { text: 'Name the **three states of matter**.', textVn: 'Kể tên **ba trạng thái của vật chất**.', textFr: 'Nomme les **trois états de la matière**.' },
      { text: 'List the properties of a **solid**, a **liquid** and a **gas**.', textVn: 'Liệt kê tính chất của **chất rắn**, **chất lỏng** và **chất khí**.', textFr: 'Donne les propriétés d’un **solide**, d’un **liquide** et d’un **gaz**.' },
      { text: 'Explain what **volume** means, and which states keep it the same.', textVn: 'Giải thích **thể tích** là gì, và trạng thái nào giữ nguyên thể tích.', textFr: 'Explique ce que veut dire **volume**, et quels états le gardent identique.' },
      { text: 'Say which state can be **compressed**, and how the syringes showed it.', textVn: 'Nói trạng thái nào **nén được**, và hai chiếc xi-lanh đã cho thấy điều đó ra sao.', textFr: 'Dis quel état peut être **comprimé**, et comment les seringues l’ont montré.' },
      { text: 'Explain why **sand is a solid** even though you can pour it.', textVn: 'Giải thích vì sao **cát là chất rắn** dù em rót được nó.', textFr: 'Explique pourquoi **le sable est un solide** même si on peut le verser.' },
      { text: 'Use **hypothesis** and **theory** correctly in a sentence.', textVn: 'Dùng đúng từ **hypothesis** và **theory** trong một câu.', textFr: 'Utilise correctement **hypothesis** et **theory** dans une phrase.' },
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
    content: 'Take your science notebook home with you. Both tasks are short.',
    contentVn: 'Hãy mang vở khoa học về nhà. Cả hai nhiệm vụ đều ngắn.',
    contentFr: 'Emporte ton cahier de sciences à la maison. Les deux tâches sont courtes.',
    notes: [
      {
        tone: 'homework',
        badge: 'Reading Task',
        badgeVn: 'Bài đọc',
        badgeFr: 'Lecture',
        icon: 'BookOpen',
        text: 'Read Unit 2.1, **pages 28 to 30**. Then read **page 31** once, slowly — that is where we start next time.',
        textVn: 'Đọc Bài 2.1, **trang 28 đến 30**. Rồi đọc **trang 31** một lượt thật chậm — đó là chỗ chúng ta sẽ bắt đầu tiết sau.',
        textFr: 'Lis l’unité 2.1, **pages 28 à 30**. Puis lis la **page 31** une fois, lentement — c’est là qu’on commence la prochaine fois.',
      },
      {
        tone: 'homework',
        badge: 'Finish the table',
        badgeVn: 'Hoàn thành bảng',
        badgeFr: 'Termine le tableau',
        icon: 'Pencil',
        text: 'Complete all **six rows** of your sorting table. In the last column give a **property** as your reason, not “I just know”.',
        textVn: 'Hoàn thành cả **sáu dòng** trong bảng phân loại. Ở cột cuối hãy nêu một **tính chất** làm lý do, đừng viết “em biết vậy”.',
        textFr: 'Remplis les **six lignes** de ton tableau de tri. Dans la dernière colonne, donne une **propriété** comme raison, pas « je le sais, c’est tout ».',
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
    subtitle: 'You can sort any substance by what it **does**, not by what it looks like. Exit question: **honey** pours, so slowly you can watch it. Is it a liquid, or a very soft solid? How would you settle the argument?',
    subtitleVn: 'Em xếp được bất kỳ chất nào dựa trên điều nó **làm được**, không dựa vào vẻ ngoài. Câu hỏi ra về: **mật ong** chảy, chậm đến mức nhìn thấy được. Nó là chất lỏng, hay chất rắn rất mềm? Em sẽ giải quyết tranh luận đó thế nào?',
    subtitleFr: 'Tu sais classer n’importe quelle substance selon ce qu’elle **fait**, pas selon son apparence. Question de sortie : le **miel** coule, si lentement qu’on peut le regarder. Est-ce un liquide, ou un solide très mou ? Comment trancherais-tu la question ?',
  },
]
