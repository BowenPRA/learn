// content/y7-science/U02_1b/slides.js
// Year 7 Science · 2.1b Particle theory. Wednesday 9 September 2026.
//
// The second half of Learner's Book section 2.1: pages 31 to 34. 2.1a was pages
// 28-30 and collected BEHAVIOUR — pour it, squash it, watch it fill a balloon,
// all of it visible, none of it explained. This deck is the explanation, and it
// is one idea: matter is made of particles, arranged three different ways.
//
// THE SHAPE OF THE HOUR. It is the same journey three times, and the class
// should feel the repetition, because the repetition is the argument:
//   · here is how the particles are arranged   (page 31)
//   · here is the property that follows from it (page 33)
//   · here is the thing you already watched happen last lesson.
// Every explanation on page 33 is settling something the class already saw with
// their own eyes on Monday. The syringes are referred to by name four times.
//
// THE UNPAID DEBT FROM 2.1A opens the deck: how does the smell of dinner get
// from the kitchen to a bedroom with the door shut? It was asked on Monday and
// deliberately left hanging. The ink photograph answers it in one picture.
//
// THE COPY-DOWN PLAN. Seven written items and one drawing:
//   · particle theory                 (the one-sentence claim)
//   · particles in a solid
//   · particles in a liquid
//   · particles in a gas
//   · the two rules from page 33      (flow, and changing volume — one panel)
//   · attractive forces
//   · vacuum
//   · the three boxes, drawn          — the deck's one Draw This, and the
//     Learner's Book Activity on page 34.
// The book's "copy and complete" sentences on page 32 are done as SPEAKING
// first and writing second, because they are three sentences the class can now
// say out loud and copying them cold teaches nothing.
//
// THE SPONGE IS THE BEST QUESTION IN THE SECTION and it gets two slides. A
// sponge is a solid and it squashes, which is exactly what the theory says
// cannot happen — and the resolution (you are compressing the air in the holes,
// not the sponge) is the first time this class evaluates a scientific model
// rather than learning one. Do not cut it.
//
// Source: Learner's Book Unit 2.1, pages 31-34. Both "Think like a scientist"
// tasks, the Activity and the Summary checklist are the book's own. Figures are
// drawn in diagrams.js; photographs are openly licensed (images/CREDITS.json).
import { DIAGRAMS } from './diagrams.js'
import diffusion from './images/diffusion.jpg'
import salt from './images/salt.jpg'
import sponge from './images/sponge.jpg'
import earth from './images/earth.jpg'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const RED = '#c8102e'
// The three state colours, identical to 2.1a and to both diagrams files.
const STONE = '#8a7f68'
const WATER = '#2f7fb0'
const VIOLET = '#8b6bb1'

export const slides = [
  // ── Section 1: the debt from last lesson, and the idea that settles it ───
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Atom',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    brandFr: 'Sciences 7e année',
    eyebrow: '2.1 Solids, liquids and gases · part 2 of 2',
    eyebrowVn: '2.1 Chất rắn, chất lỏng và chất khí · phần 2 trong 2',
    eyebrowFr: '2.1 Solides, liquides et gaz · partie 2 sur 2',
    date: '9 Sep 2026',
    title: 'Particle Theory',
    titleVn: 'Thuyết hạt',
    titleFr: 'La théorie particulaire',
    card: {
      icon: 'Pencil',
      badge: 'Starter Task',
      badgeVn: 'Nhiệm vụ khởi động',
      badgeFr: 'Pour commencer',
      text: '**Books closed.** Write down **three things a gas can do that a solid cannot**. Two minutes, then open your notebook and check your table from last lesson.',
      textVn: '**Gấp sách lại.** Viết ra **ba điều chất khí làm được mà chất rắn không làm được**. Hai phút, rồi mở vở kiểm tra lại bảng của em từ tiết trước.',
      textFr: '**Livres fermés.** Écris **trois choses qu’un gaz peut faire et pas un solide**. Deux minutes, puis ouvre ton cahier et vérifie ton tableau du dernier cours.',
    },
  },
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'The question I left you with on Monday',
    eyebrowVn: 'Câu hỏi thầy để lại cho em hôm thứ Hai',
    eyebrowFr: 'La question que je t’ai laissée lundi',
    title: 'The Door Was Shut',
    titleVn: 'Cửa đã đóng kín',
    titleFr: 'La porte était fermée',
    text: 'Somebody cooks in the kitchen. Two rooms away, door closed, **you can smell it**.',
    textVn: 'Có người nấu ăn dưới bếp. Cách hai phòng, cửa đóng kín, **em vẫn ngửi thấy mùi**.',
    textFr: 'Quelqu’un fait à manger dans la cuisine. Deux pièces plus loin, porte fermée, **tu le sens**.',
    sub: 'Something travelled from the kitchen to your nose all by itself. Today we find out what.',
    subVn: 'Có thứ gì đó đã tự mình đi từ bếp đến mũi em. Hôm nay ta sẽ tìm ra đó là gì.',
    subFr: 'Quelque chose est allé tout seul de la cuisine jusqu’à ton nez. Aujourd’hui, on découvre quoi.',
  },
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Droplets',
    eyebrow: 'Nobody stirred this',
    eyebrowVn: 'Không ai khuấy cả',
    eyebrowFr: 'Personne n’a remué',
    title: 'One Drop of Ink, in Still Water',
    titleVn: 'Một giọt mực, trong nước đứng yên',
    titleFr: 'Une goutte d’encre dans l’eau immobile',
    image: diffusion,
    caption: 'The water was completely still. One drop of ink went in at the top, and it is spreading **by itself**, into every part of the glass. Leave it an hour and the whole glass will be pale grey. Whatever the ink is made of, it is **moving on its own** — and so is whatever came out of that kitchen.',
    captionVn: 'Nước hoàn toàn đứng yên. Một giọt mực rơi vào từ trên, và nó đang **tự lan ra**, đến mọi phần của cốc. Để một tiếng thì cả cốc sẽ ngả màu xám nhạt. Dù mực được tạo nên từ gì đi nữa, thứ đó **đang tự chuyển động** — và thứ bay ra từ căn bếp kia cũng vậy.',
    captionFr: 'L’eau était parfaitement immobile. Une goutte d’encre est tombée en haut, et elle se répand **toute seule** dans tout le verre. Dans une heure, tout le verre sera gris pâle. Quoi que soit l’encre, elle **bouge toute seule** — et ce qui est sorti de la cuisine aussi.',
  },
  {
    layout: 'callout',
    accent: VIOLET,
    icon: 'Sparkles',
    eyebrow: 'Learner’s Book, page 31',
    eyebrowVn: 'Sách học sinh, trang 31',
    eyebrowFr: 'Livre de l’élève, p. 31',
    title: 'One Idea Explains Everything',
    titleVn: 'Một ý tưởng giải thích tất cả',
    titleFr: 'Une seule idée explique tout',
    content:
      'All matter is made of **particles** — pieces far too small to see.\n\n' +
      'They are the **same particles** in a solid, a liquid and a gas; the only thing that changes is **how they are arranged and how they move**. That is the whole theory.',
    contentVn:
      'Mọi vật chất đều tạo nên từ các **hạt (particles)** — những mảnh quá nhỏ để nhìn thấy. Đó là **cùng những hạt ấy** trong chất rắn, chất lỏng và chất khí; thứ duy nhất thay đổi là **cách chúng sắp xếp và chuyển động**. Đó là toàn bộ học thuyết.',
    contentFr:
      'Toute la matière est faite de **particules** — des morceaux trop petits pour être vus.\n\n' +
      'Les **mêmes particules** forment un solide, un liquide et un gaz ; seuls changent **leur disposition et leur mouvement**. C’est toute la théorie.',
    notes: [
      {
        tone: 'write',
        text: '**Particle theory:** all matter is made up of tiny particles. The particles are **arranged differently** in solids, liquids and gases.',
        textVn: '**Thuyết hạt (particle theory):** mọi vật chất đều được tạo nên từ những hạt rất nhỏ. Các hạt được **sắp xếp khác nhau** trong chất rắn, chất lỏng và chất khí.',
        textFr: '**Théorie particulaire :** la matière est faite de minuscules particules, **rangées différemment** dans les solides, liquides et gaz.',
      },
    ],
  },
  {
    layout: 'split',
    accent: STONE,
    icon: 'Microscope',
    eyebrow: 'Evidence you can hold in your hand',
    eyebrowVn: 'Bằng chứng em có thể cầm trên tay',
    eyebrowFr: 'Une preuve que tu peux tenir dans ta main',
    title: 'Why Is Every Grain of Salt a Cube?',
    titleVn: 'Vì sao mỗi hạt muối đều là một khối lập phương?',
    titleFr: 'Pourquoi chaque grain de sel est-il un cube ?',
    ratio: 45,
    image: salt,
    content:
      'Nobody cut these. This is table salt from a kitchen, under a microscope — and the grains are **cubes**, with square corners, every single time.\n\n' +
      'Particles are far too small to see. But if the theory is right, and the particles of a solid really are stacked in a **fixed, regular pattern**, then that pattern should sometimes show up on the **outside**.\n\n' +
      'Here it is. The grain is a cube because the particles inside it are stacked in cubes.',
    contentVn:
      'Không ai cắt chúng cả. Đây là muối ăn trong bếp, nhìn dưới kính hiển vi — và các hạt đều là **khối lập phương**, góc vuông vắn, lần nào cũng vậy.\n\n' +
      'Các hạt thì quá nhỏ để nhìn thấy. Nhưng nếu học thuyết đúng, và các hạt trong chất rắn thật sự xếp theo một **khuôn mẫu cố định, đều đặn**, thì khuôn mẫu ấy đôi khi phải lộ ra ở **bên ngoài**.\n\n' +
      'Đây chính là nó. Hạt muối là khối lập phương vì các hạt bên trong nó xếp thành khối lập phương.',
    contentFr:
      'Personne ne les a taillés. C’est du sel de cuisine, au microscope — et les grains sont des **cubes**, avec des coins carrés, à chaque fois.\n\n' +
      'Les particules sont bien trop petites pour être vues. Mais si la théorie est juste, et que les particules d’un solide sont vraiment empilées selon un **motif fixe et régulier**, alors ce motif devrait parfois se voir à l’**extérieur**.\n\n' +
      'Le voici. Le grain est un cube parce que les particules à l’intérieur sont empilées en cubes.',
  },

  // ── Section 2: page 31 — the three arrangements, one slide each ─────────
  {
    layout: 'split',
    accent: STONE,
    icon: 'Box',
    eyebrow: 'Arrangement 1 of 3',
    eyebrowVn: 'Cách sắp xếp 1 trong 3',
    eyebrowFr: 'Disposition 1 sur 3',
    title: 'In a Solid, Nobody Moves',
    titleVn: 'Trong chất rắn, không hạt nào đi đâu cả',
    titleFr: 'Dans un solide, personne ne bouge',
    ratio: 48,
    side: 'left',
    inlineSvg: DIAGRAMS.PARTICLES_SOLID,
    content:
      'Packed tightly in a **fixed pattern** — rows and columns, touching, nothing between them.\n\n' +
      'They are not frozen. Each one **vibrates**: tiny movements on the spot, all the time. But it never leaves its place.\n\n' +
      'Look at the beaker: the block does not touch the walls. A solid keeps **its own** shape.',
    contentVn:
      'Xếp sát nhau theo **khuôn mẫu cố định** — hàng và cột, chạm nhau, không có gì ở giữa.\n\n' +
      'Chúng không đứng im: mỗi hạt **dao động (vibrate)** rất nhỏ tại chỗ, nhưng không rời vị trí.\n\n' +
      'Nhìn cốc: khối rắn không chạm thành cốc. Chất rắn giữ hình dạng **của chính nó**.',
    contentFr:
      'Serrées selon un **motif fixe** — en lignes et en colonnes, collées, rien entre elles.\n\n' +
      'Elles ne sont pas figées. Chacune **vibre** : de tout petits mouvements sur place, tout le temps. Mais elle ne quitte jamais sa place.\n\n' +
      'Regarde le bécher : le bloc ne touche pas les parois. Un solide garde **sa propre** forme.',
    notes: [
      {
        tone: 'write',
        text: '**In a solid:** the particles are in a **fixed pattern**, **tightly packed** and **held together strongly**. They can **vibrate** but they stay in the same place.',
        textVn: '**Trong chất rắn:** các hạt ở trong một **khuôn mẫu cố định**, **xếp sát nhau** và **liên kết chặt với nhau**. Chúng có thể **dao động** nhưng vẫn ở nguyên vị trí.',
        textFr: '**Dans un solide :** les particules sont dans un **motif fixe**, **serrées** et **fortement liées**. Elles peuvent **vibrer** mais restent à la même place.',
      },
    ],
  },
  {
    layout: 'split',
    accent: WATER,
    icon: 'Droplets',
    eyebrow: 'Arrangement 2 of 3',
    eyebrowVn: 'Cách sắp xếp 2 trong 3',
    eyebrowFr: 'Disposition 2 sur 3',
    title: 'In a Liquid, They Touch — but They Slide',
    titleVn: 'Trong chất lỏng, các hạt chạm nhau — nhưng trượt được',
    titleFr: 'Dans un liquide, elles se touchent — mais elles glissent',
    ratio: 48,
    side: 'left',
    inlineSvg: DIAGRAMS.PARTICLES_LIQUID,
    content:
      'Still touching, still no space between them — that has not changed from the solid.\n\n' +
      'What changed is the **hold**. It is only **weak** now, so particles slide past one another and change places. No pattern.\n\n' +
      'Look at the top: a **flat surface**. That is the container’s shape, not the liquid’s.',
    contentVn:
      'Vẫn chạm nhau, vẫn không có khoảng trống — điều đó không đổi so với chất rắn.\n\n' +
      'Thứ đã đổi là **độ bám giữ**. Giờ nó chỉ còn **yếu**, nên các hạt trượt qua nhau và đổi chỗ. Không còn khuôn mẫu.\n\n' +
      'Nhìn mặt trên: một **bề mặt phẳng**. Đó là hình dạng của vật chứa, không phải của chất lỏng.',
    contentFr:
      'Toujours collées, toujours sans espace entre elles — ça n’a pas changé par rapport au solide.\n\n' +
      'Ce qui a changé, c’est la **prise**. Elle est maintenant **faible**, donc les particules glissent les unes sur les autres et changent de place. Plus de motif.\n\n' +
      'Regarde le dessus : une **surface plate**. C’est la forme du récipient, pas celle du liquide.',
    notes: [
      {
        tone: 'write',
        text: '**In a liquid:** the particles **still touch** each other, but they are **held together weakly**. They can **move past one another** and change places.',
        textVn: '**Trong chất lỏng:** các hạt **vẫn chạm nhau**, nhưng chỉ **liên kết yếu**. Chúng có thể **trượt qua nhau** và đổi chỗ cho nhau.',
        textFr: '**Dans un liquide :** les particules **se touchent encore**, mais elles sont **faiblement liées**. Elles peuvent **glisser les unes sur les autres** et changer de place.',
      },
    ],
  },
  {
    layout: 'split',
    accent: VIOLET,
    icon: 'Wind',
    eyebrow: 'Arrangement 3 of 3',
    eyebrowVn: 'Cách sắp xếp 3 trong 3',
    eyebrowFr: 'Disposition 3 sur 3',
    title: 'In a Gas, Almost All of It Is Empty',
    titleVn: 'Trong chất khí, gần như toàn bộ là khoảng trống',
    titleFr: 'Dans un gaz, presque tout est vide',
    ratio: 48,
    side: 'left',
    inlineSvg: DIAGRAMS.PARTICLES_GAS,
    content:
      'Now the particles do **not** touch. They are far apart, moving quickly in every direction, and nothing holds them together.\n\n' +
      'A gas does not have fewer particles — the **space between them** has become enormous.\n\n' +
      'They spread out by themselves until every corner is filled. That is the ink, and that is the smell from the kitchen.',
    contentVn:
      'Bây giờ các hạt **không** chạm nhau. Chúng ở xa nhau, chuyển động nhanh theo mọi hướng, và không có gì giữ chúng lại.\n\n' +
      'Chất khí không hề có ít hạt hơn — mà **khoảng cách giữa chúng** đã trở nên rất lớn.\n\n' +
      'Chúng tự lan ra cho đến khi lấp đầy mọi góc. Đó là giọt mực, và đó là mùi thức ăn từ căn bếp.',
    contentFr:
      'Maintenant, les particules ne se touchent **pas**. Elles sont loin les unes des autres, bougent vite dans tous les sens, et rien ne les retient.\n\n' +
      'Un gaz n’a pas moins de particules — c’est l’**espace entre elles** qui est devenu énorme.\n\n' +
      'Elles s’étalent toutes seules jusqu’à remplir chaque coin. C’est l’encre, et c’est l’odeur de la cuisine.',
    notes: [
      {
        tone: 'write',
        text: '**In a gas:** the particles do **not touch**. They are **far apart** and **spread out by themselves** to fill the space they are in.',
        textVn: '**Trong chất khí:** các hạt **không chạm nhau**. Chúng ở **xa nhau** và **tự lan ra** để lấp đầy không gian chứa chúng.',
        textFr: '**Dans un gaz :** les particules ne se **touchent pas**. Elles sont **éloignées** et **s’étalent toutes seules** pour remplir l’espace où elles sont.',
      },
    ],
  },
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'Users',
    eyebrow: 'Learner’s Book, page 32 · Think like a scientist',
    eyebrowVn: 'Sách học sinh, trang 32 · Tư duy như nhà khoa học',
    eyebrowFr: 'Livre de l’élève, page 32 · Pense comme un scientifique',
    title: 'Everybody Stand Up. You Are the Particles.',
    titleVn: 'Cả lớp đứng lên. Em chính là các hạt.',
    titleFr: 'Tout le monde debout. Tu es une particule.',
    content:
      'In your group, arrange yourselves as the particles in a **solid**, then a **liquid**, then a **gas**. I will say when to change. Each time, ask: **regular rows? touching? can you change places?**',
    contentVn:
      'Theo nhóm, hãy xếp mình thành các hạt trong **chất rắn**, rồi **chất lỏng**, rồi **chất khí**. Thầy sẽ hô khi đổi. Mỗi lần hãy tự hỏi: **hàng đều không? chạm nhau không? đổi chỗ được không?**',
    contentFr:
      'Avec ton groupe, mets-toi comme les particules d’un **solide**, puis d’un **liquide**, puis d’un **gaz**. Je dirai quand changer. À chaque fois, demande-toi : **lignes régulières ? on se touche ? on peut changer de place ?**',
    notes: [
      {
        tone: 'write',
        badge: 'Page 32, Question 2 — say it, then write it',
        badgeVn: 'Trang 32, Câu hỏi 2 — nói trước, viết sau',
        badgeFr: 'Page 32, question 2 — dis-le, puis écris-le',
        text: 'Sit down and finish these **out loud** with your partner, then write all three in **your own English**: *In solids / In liquids / In gases, the particles are arranged…*',
        textVn: 'Ngồi xuống, hoàn thành các câu này **bằng lời** cùng bạn, rồi viết cả ba bằng **tiếng Anh của chính em**: *In solids / In liquids / In gases, the particles are arranged…*',
        textFr: 'Assieds-toi et termine ces phrases **à voix haute** avec ton voisin, puis écris les trois **avec tes mots, en anglais** : *In solids / In liquids / In gases, the particles are arranged…*',
      },
    ],
  },

  // ── Section 3: page 33 — the properties, explained ──────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Talk to your partner — one minute, no hands yet',
    eyebrowVn: 'Nói với bạn — một phút, chưa giơ tay',
    eyebrowFr: 'Parle à ton voisin — une minute, pas de mains',
    title: 'You Can Pour Water. You Cannot Pour a Brick.',
    titleVn: 'Rót được nước. Không rót được viên gạch.',
    titleFr: 'L’eau se verse. Une brique, non.',
    text: 'Both are made of particles. So **why does one flow and the other refuse?**',
    textVn: 'Cả hai đều tạo nên từ các hạt. Vậy **vì sao thứ này chảy được, thứ kia thì không?**',
    textFr: 'Les deux sont faits de particules. **Pourquoi seul l’un coule ?**',
    sub: 'Both pictures are already in your notebook. The answer is a difference between them.',
    subVn: 'Cả hai hình đã có trong vở em. Đáp án là một điểm khác nhau giữa chúng.',
    subFr: 'Les deux dessins sont déjà dans ton cahier. La réponse est une différence entre eux.',
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Scale',
    eyebrow: 'Learner’s Book, page 33',
    eyebrowVn: 'Sách học sinh, trang 33',
    eyebrowFr: 'Livre de l’élève, page 33',
    title: 'Two Rules That Explain the Whole Table',
    titleVn: 'Hai quy tắc giải thích cả cái bảng',
    titleFr: 'Deux règles qui expliquent tout le tableau',
    ratio: 52,
    side: 'left',
    inlineSvg: DIAGRAMS.THREE_ARRANGEMENTS,
    content:
      'Every tick and cross you drew last lesson comes out of these two sentences. Read them slowly — they are short, and they are doing a great deal of work.\n\n' +
      'Then hold them against the three boxes. A solid fails both. A liquid passes the first and fails the second. A gas passes both.',
    contentVn:
      'Mọi dấu tích và dấu chéo em vẽ tiết trước đều suy ra từ hai câu này. Hãy đọc chậm — chúng ngắn, nhưng làm được rất nhiều việc.\n\n' +
      'Rồi đối chiếu chúng với ba ô vuông. Chất rắn trượt cả hai. Chất lỏng đạt câu đầu và trượt câu sau. Chất khí đạt cả hai.',
    contentFr:
      'Chaque coche et chaque croix du dernier cours vient de ces deux phrases. Lis-les lentement — elles sont courtes, mais elles en disent beaucoup.\n\n' +
      'Puis compare-les aux trois cases. Un solide rate les deux. Un liquide réussit la première et rate la seconde. Un gaz réussit les deux.',
    notes: [
      {
        tone: 'write',
        text: 'Matter can only **flow** (be poured) if the particles can **move past one another**.\n\nMatter can only **change volume** if the particles can **spread out or move closer together**.',
        textVn: 'Vật chất chỉ **chảy** (rót được) khi các hạt có thể **trượt qua nhau**.\n\nVật chất chỉ **đổi thể tích** khi các hạt có thể **giãn ra hoặc xích lại gần nhau**.',
        textFr: 'La matière ne peut **couler** (être versée) que si les particules peuvent **glisser les unes sur les autres**.\n\nLa matière ne peut **changer de volume** que si les particules peuvent **s’écarter ou se rapprocher**.',
      },
    ],
  },
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Equal',
    eyebrow: 'Rule 1 · why one flows and the other does not',
    eyebrowVn: 'Quy tắc 1 · vì sao thứ này chảy còn thứ kia thì không',
    eyebrowFr: 'Règle 1 · pourquoi l’un coule et pas l’autre',
    title: 'The Difference Is the Pull Between Them',
    titleVn: 'Khác nhau là ở lực hút giữa các hạt',
    titleFr: 'La différence, c’est l’attraction entre elles',
    columns: [
      {
        heading: 'A solid cannot flow',
        headingVn: 'Chất rắn không chảy được',
        headingFr: 'Un solide ne peut pas couler',
        accent: STONE,
        icon: 'Box',
        inlineSvg: DIAGRAMS.PARTICLES_SOLID,
        caption: 'There is a **pull** between the particles — an **attractive force** — and in a solid it is strong. It holds every particle in its place, so they can only vibrate. Nothing can move past anything. So a solid cannot flow, and it keeps its own shape.',
        captionVn: 'Giữa các hạt có một **lực kéo** — gọi là **lực hút (attractive force)** — và trong chất rắn lực này rất mạnh. Nó giữ mỗi hạt ở đúng vị trí, nên chúng chỉ dao động được. Không hạt nào trượt qua hạt nào. Vì thế chất rắn không chảy được, và giữ hình dạng riêng.',
        captionFr: 'Il y a une **attraction** entre les particules — une **force d’attraction (attractive force)** — et dans un solide elle est forte. Elle tient chaque particule à sa place, donc elles peuvent seulement vibrer. Rien ne peut glisser. Donc un solide ne coule pas, et il garde sa propre forme.',
      },
      {
        heading: 'A liquid can flow',
        headingVn: 'Chất lỏng chảy được',
        headingFr: 'Un liquide peut couler',
        accent: WATER,
        icon: 'Droplets',
        inlineSvg: DIAGRAMS.PARTICLES_LIQUID,
        caption: 'The same pull is there, but it is **weak** — weak enough to let the particles slide past one another, and still strong enough to keep them touching. That is why a liquid flows into any shape but never spreads out to fill the room the way a gas does.',
        captionVn: 'Vẫn có lực kéo đó, nhưng nó **yếu** — đủ yếu để các hạt trượt qua nhau, mà vẫn đủ mạnh để giữ chúng chạm vào nhau. Vì thế chất lỏng chảy vào mọi hình dạng nhưng không bao giờ lan ra lấp đầy cả căn phòng như chất khí.',
        captionFr: 'La même attraction est là, mais elle est **faible** — assez faible pour laisser les particules glisser les unes sur les autres, et assez forte pour qu’elles restent collées. C’est pourquoi un liquide coule dans n’importe quelle forme, mais ne s’étale jamais dans toute la pièce comme un gaz.',
      },
    ],
  },
  {
    layout: 'split',
    accent: VIOLET,
    icon: 'Zap',
    eyebrow: 'Rule 2 · and this is Monday’s syringe',
    eyebrowVn: 'Quy tắc 2 · và đây chính là chiếc xi-lanh hôm thứ Hai',
    eyebrowFr: 'Règle 2 · c’est la seringue de lundi',
    title: 'Why the Air Plunger Moved',
    titleVn: 'Vì sao cần đẩy bên không khí lại di chuyển',
    titleFr: 'Pourquoi le piston bouge',
    ratio: 52,
    side: 'left',
    inlineSvg: DIAGRAMS.COMPRESSING_GAS,
    content:
      'In a gas almost **nothing holds the particles together**, and there is a lot of **space between them**. Push, and they move closer — the gas takes up less room. Nothing escaped: **the gaps got smaller**, and that is all “compressed” means.\n\n' +
      'Now the water syringe. Those particles already touch. No gap left to close, so the plunger does not move.',
    contentVn:
      'Trong chất khí gần như **không có gì giữ các hạt lại**, và có rất nhiều **khoảng trống giữa chúng**. Đẩy vào thì chúng xích lại gần nhau — chất khí chiếm ít chỗ hơn. Không có gì thoát ra: **các khoảng trống nhỏ lại**, và “nén” chỉ có nghĩa như vậy.\n\n' +
      'Giờ đến xi-lanh nước. Các hạt ở đó đã chạm nhau. Không còn khoảng trống để khép, nên cần đẩy không nhúc nhích.',
    contentFr:
      'Dans un gaz, presque **rien ne retient les particules**, avec beaucoup d’**espace entre elles**. Pousse : elles se rapprochent, le gaz prend moins de place. Rien ne s’échappe : **les espaces rétrécissent**, voilà ce que veut dire « comprimé ».\n\n' +
      'Et la seringue d’eau ? Ces particules se touchent déjà. Rien à fermer : le piston ne bouge pas.',
    notes: [
      {
        tone: 'write',
        text: '**Attractive forces:** the pull between particles. **Strong** in a solid · **weak** in a liquid · almost **none** in a gas.',
        textVn: '**Lực hút (attractive forces):** lực kéo giữa các hạt. **Mạnh** trong chất rắn · **yếu** trong chất lỏng · gần như **không có** trong chất khí.',
        textFr: '**Forces d’attraction :** ce qui attire les particules. **Fortes** (solide) · **faibles** (liquide) · quasi **nulles** (gaz).',
      },
    ],
  },

  // ── Section 4: no particles at all ──────────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'CircleSlash',
    eyebrow: 'Learner’s Book, page 33 · No particles?',
    eyebrowVn: 'Sách học sinh, trang 33 · Không có hạt nào?',
    eyebrowFr: 'Livre de l’élève, page 33 · Pas de particules ?',
    title: 'What if You Take Them All Away?',
    titleVn: 'Nếu lấy đi hết các hạt thì sao?',
    titleFr: 'Et si on les enlève toutes ?',
    ratio: 48,
    side: 'left',
    inlineSvg: DIAGRAMS.VACUUM_BOX,
    content:
      'A box of gas looks empty. It is not — it is mostly space, but there are particles in it, bouncing around.\n\n' +
      'Take every one of them out and you have something with a name of its own: a **vacuum**. Not thin air. Not almost nothing. **Nothing.**\n\n' +
      'A vacuum has no state of matter, because there is no matter in it to have a state.',
    contentVn:
      'Hộp chứa khí trông có vẻ trống rỗng. Nó không trống — phần lớn là khoảng không, nhưng vẫn có các hạt đang nảy qua nảy lại.\n\n' +
      'Lấy hết chúng ra thì em có một thứ có tên riêng: **chân không (vacuum)**. Không phải khí loãng, mà là **không có gì cả**.\n\n' +
      'Chân không không có trạng thái nào, vì trong đó không có vật chất.',
    contentFr:
      'Une boîte de gaz a l’air vide. Elle ne l’est pas — c’est surtout de l’espace, mais il y a des particules dedans, qui rebondissent.\n\n' +
      'Enlève-les toutes et tu obtiens quelque chose qui a son propre nom : le **vide (vacuum)**. Pas de l’air léger. Pas presque rien. **Rien.**\n\n' +
      'Le vide n’a pas d’état de la matière, parce qu’il n’y a pas de matière dedans.',
    notes: [
      {
        tone: 'write',
        text: '**Vacuum:** a space where there are **no particles at all**. A vacuum contains nothing.',
        textVn: '**Chân không (vacuum):** một khoảng không **hoàn toàn không có hạt nào**. Chân không không chứa gì cả.',
        textFr: '**Vide (vacuum) :** un espace où il n’y a **aucune particule**. Le vide ne contient rien.',
      },
    ],
  },
  {
    layout: 'showcase',
    accent: VIOLET,
    icon: 'Globe',
    eyebrow: 'The biggest vacuum you will ever be shown a picture of',
    eyebrowVn: 'Chân không lớn nhất mà em từng được xem ảnh',
    eyebrowFr: 'Le plus grand vide que tu verras jamais en photo',
    title: 'Everything Black Here Is a Vacuum',
    titleVn: 'Mọi chỗ đen ở đây đều là chân không',
    titleFr: 'Tout ce qui est noir ici est du vide',
    image: earth,
    caption: 'The blue and white is our **atmosphere** — a thin skin of gas, and every particle you have ever breathed is inside it. The black is **space**, and space is very close to a perfect vacuum. That is why astronauts carry their own air, and why **there is no sound out there**: sound needs particles to travel through, and there are none.',
    captionVn: 'Phần xanh và trắng là **khí quyển** của chúng ta — một lớp khí mỏng, và mọi hạt em từng hít thở đều nằm trong đó. Phần đen là **vũ trụ**, và vũ trụ gần như là chân không hoàn hảo. Vì thế phi hành gia phải mang theo không khí riêng, và vì thế **ngoài đó không có âm thanh**: âm thanh cần các hạt để truyền đi, mà ở đó thì không có hạt nào.',
    captionFr: 'Le bleu et le blanc, c’est notre **atmosphère** — une fine couche de gaz, et chaque particule que tu as respirée est dedans. Le noir, c’est l’**espace**, et l’espace est presque un vide parfait. C’est pourquoi les astronautes emportent leur propre air, et pourquoi **il n’y a aucun son là-haut** : le son a besoin de particules pour voyager, et il n’y en a pas.',
  },

  // ── Section 5: page 34 — testing the theory instead of learning it ──────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Learner’s Book, page 34 · Think like a scientist · in pairs',
    eyebrowVn: 'Sách học sinh, trang 34 · Tư duy như nhà khoa học · theo cặp',
    eyebrowFr: 'Livre de l’élève, page 34 · Pense comme un scientifique · à deux',
    title: 'A Sponge Is a Solid. So Why Can You Squash It?',
    titleVn: 'Miếng bọt biển là chất rắn. Vậy vì sao bóp được nó?',
    titleFr: 'Une éponge est un solide. Alors pourquoi peut-on l’écraser ?',
    image: sponge,
    caption: 'We wrote it down twice today: **a solid cannot be compressed**, because its particles are already touching. But you can squeeze a sponge to half its size with one hand, and a marshmallow with two fingers. Either the theory is **wrong**, or we have missed something. Three minutes, in pairs. **Which is it?**',
    captionVn: 'Hôm nay chúng ta đã viết điều này hai lần: **chất rắn không thể bị nén**, vì các hạt của nó đã chạm nhau rồi. Nhưng em có thể bóp miếng bọt biển nhỏ đi một nửa chỉ bằng một tay, và bóp kẹo dẻo bằng hai ngón. Hoặc là học thuyết **sai**, hoặc là chúng ta đã bỏ sót điều gì đó. Ba phút, theo cặp. **Là điều nào?**',
    captionFr: 'On l’a écrit deux fois aujourd’hui : **un solide ne peut pas être comprimé**, parce que ses particules se touchent déjà. Pourtant, tu peux écraser une éponge à la moitié de sa taille d’une seule main, et une guimauve avec deux doigts. Soit la théorie est **fausse**, soit on a raté quelque chose. Trois minutes, à deux. **Lequel des deux ?**',
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ShieldCheck',
    eyebrow: 'The answer — and it is not "the theory is wrong"',
    eyebrowVn: 'Đáp án — và không phải là "học thuyết sai"',
    eyebrowFr: 'La réponse — et non « la théorie est fausse »',
    title: 'You Are Not Squashing the Sponge',
    titleVn: 'Em không hề bóp miếng bọt biển',
    titleFr: 'Tu n’écrases pas l’éponge',
    ratio: 55,
    image: sponge,
    content:
      'Look at the holes. A sponge is not solid all the way through — it is a **thin skeleton of solid with air in every gap**.\n\n' +
      'When you squeeze it, the solid part is not compressed at all. **The air is.** You are compressing a gas, exactly as you did with the syringe, and the sponge simply folds up around the smaller gaps. Let go and the air pushes it back out.\n\n' +
      'So the theory survives — but only because we looked closely enough to see what was really being squashed.',
    contentVn:
      'Hãy nhìn những lỗ nhỏ. Miếng bọt biển không đặc từ trong ra ngoài — nó là một **bộ khung rắn mỏng với không khí trong mọi khe hở**.\n\n' +
      'Khi em bóp nó, phần chất rắn hoàn toàn không bị nén. **Không khí mới bị nén.** Em đang nén một chất khí, đúng như đã làm với chiếc xi-lanh, và miếng bọt biển chỉ gập lại quanh những khe hở nhỏ đi. Buông tay ra thì không khí lại đẩy nó bung ra.\n\n' +
      'Vậy là học thuyết vẫn đứng vững — nhưng chỉ vì chúng ta đã nhìn đủ kỹ để thấy thứ thật sự bị nén là gì.',
    contentFr:
      'Regarde les trous. Une éponge n’est pas pleine — c’est un **fin squelette solide, avec de l’air dans chaque trou**.\n\n' +
      'Quand tu la serres, la partie solide n’est pas comprimée. **L’air, si.** Tu comprimes un gaz, comme dans la seringue, et l’éponge se replie autour des trous rétrécis. Lâche-la : l’air la regonfle.\n\n' +
      'La théorie tient donc — parce qu’on a regardé d’assez près pour voir ce qui était vraiment écrasé.',
    reveal: {
      label: 'Page 34, Questions 3 and 4 — the strengths and the weaknesses',
      labelVn: 'Trang 34, Câu hỏi 3 và 4 — điểm mạnh và điểm yếu',
      labelFr: 'Page 34, questions 3 et 4 — points forts et points faibles',
      answer:
        '**Strengths:** one simple idea explains shape, volume, pouring, compressing, the smell from the kitchen and the ink in the glass — and it makes **predictions we can test**, like the two syringes.\n\n' +
        '**Weaknesses:** nobody has ever seen a particle, so we are believing in something invisible. The picture also makes particles look like hard little balls, which they are not. And it says nothing about **why** the forces between them are strong or weak — that is Year 8.',
      answerVn:
        '**Điểm mạnh:** một ý tưởng đơn giản giải thích được hình dạng, thể tích, việc rót, việc nén, mùi thức ăn từ bếp và giọt mực trong cốc — và nó đưa ra **dự đoán có thể kiểm chứng**, như hai chiếc xi-lanh.\n\n' +
        '**Điểm yếu:** chưa ai từng nhìn thấy một hạt, nên ta đang tin vào thứ vô hình. Hình vẽ cũng khiến các hạt trông như những viên bi cứng, mà thật ra không phải vậy. Và nó không nói gì về **vì sao** lực giữa chúng mạnh hay yếu — điều đó là của Lớp 8.',
      answerFr:
        '**Points forts :** une idée simple explique la forme, le volume, verser, comprimer, l’odeur de cuisine et l’encre — et elle fait des **prédictions testables**, comme les seringues.\n\n' +
        '**Points faibles :** personne n’a vu de particule : on croit à l’invisible. Le dessin montre des billes dures, ce qu’elles ne sont pas. Et elle ne dit pas **pourquoi** les forces sont fortes ou faibles — ça, c’est en 8e année.',
    },
  },

  // ── Section 6: the Draw This, the recap and the homework ────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Learner’s Book, page 34 · Activity · rulers out',
    eyebrowVn: 'Sách học sinh, trang 34 · Hoạt động · lấy thước ra',
    eyebrowFr: 'Livre de l’élève, page 34 · Activité · sors ta règle',
    title: 'Three Boxes, and the Space Around Them',
    titleVn: 'Ba ô vuông, và khoảng trống quanh chúng',
    titleFr: 'Trois cases, et l’espace autour',
    inlineSvg: DIAGRAMS.THREE_ARRANGEMENTS,
    drawThis: true,
    caption: 'Rule three large squares across a clean page and label them **Solid · Liquid · Gas**. Draw the particles inside each one. Then, in the space **around** each box, write that state’s properties from your table. Eight minutes, and leave real space around the squares — you will add to this in 2.2.',
    captionVn: 'Kẻ ba ô vuông lớn ngang một trang giấy sạch và ghi tên **Solid · Liquid · Gas**. Vẽ các hạt vào trong từng ô. Rồi ở khoảng trống **quanh** mỗi ô, viết các tính chất của trạng thái đó từ bảng của em. Tám phút, và hãy chừa khoảng trống thật rộng quanh các ô — em sẽ viết thêm vào đó ở bài 2.2.',
    captionFr: 'Trace trois grands carrés sur une page propre et nomme-les **Solid · Liquid · Gas**. Dessine les particules dans chacun. Puis, dans l’espace **autour** de chaque case, écris les propriétés de cet état d’après ton tableau. Huit minutes, et laisse vraiment de la place autour des carrés — tu y ajouteras des choses en 2.2.',
  },
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Learner’s Book, page 34 · Summary checklist',
    eyebrowVn: 'Sách học sinh, trang 34 · Bảng tự kiểm tra',
    eyebrowFr: 'Livre de l’élève, page 34 · Bilan',
    title: 'Can You Do All Six?',
    titleVn: 'Em làm được cả sáu điều này chứ?',
    titleFr: 'Sais-tu faire les six ?',
    content:
      '> Your notebook should now have **7 written items**, **3 sentences of your own English**, and **1 page of three labelled boxes**. Check.',
    contentVn:
      '> Trong vở của em bây giờ phải có **7 mục đã ghi**, **3 câu tiếng Anh của riêng em**, và **1 trang gồm ba ô vuông có ghi chú**. Hãy kiểm tra.',
    contentFr:
      '> Ton cahier doit maintenant contenir **7 notes écrites**, **3 phrases à toi en anglais** et **1 page avec trois cases légendées**. Vérifie.',
    items: [
      { text: 'Classify any substance as a **solid, liquid or gas**.', textVn: 'Phân loại bất kỳ chất nào thành **rắn, lỏng hay khí**.', textFr: 'Classer n’importe quelle substance en **solide, liquide ou gaz**.' },
      { text: 'List the **properties** of solids, liquids and gases.', textVn: 'Liệt kê **tính chất** của chất rắn, chất lỏng và chất khí.', textFr: 'Donner les **propriétés** des solides, des liquides et des gaz.' },
      { text: 'Describe how the **particles are arranged** in each of the three states.', textVn: 'Mô tả cách **các hạt được sắp xếp** trong mỗi trạng thái.', textFr: 'Décrire comment **les particules sont disposées** dans chacun des trois états.' },
      { text: 'Use particle theory to explain **why a liquid pours and a solid does not**.', textVn: 'Dùng thuyết hạt để giải thích **vì sao chất lỏng rót được còn chất rắn thì không**.', textFr: 'Utiliser la théorie particulaire pour expliquer **pourquoi un liquide se verse et pas un solide**.' },
      { text: 'Use particle theory to explain **why only a gas can be compressed**.', textVn: 'Dùng thuyết hạt để giải thích **vì sao chỉ chất khí mới nén được**.', textFr: 'Utiliser la théorie particulaire pour expliquer **pourquoi seul un gaz peut être comprimé**.' },
      { text: 'Say what a **vacuum** is, and name one **weakness** of the particle theory.', textVn: 'Nói **chân không** là gì, và nêu một **điểm yếu** của thuyết hạt.', textFr: 'Dire ce qu’est le **vide**, et donner un **point faible** de la théorie particulaire.' },
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
    content: 'Section 2.1 is finished — 2.2 is Changes of State.',
    contentVn: 'Bài 2.1 đã xong — bài 2.2 là Sự chuyển thể.',
    contentFr: 'La 2.1 est finie — la 2.2 : changements d’état.',
    notes: [
      {
        tone: 'homework',
        badge: 'Reading Task',
        badgeVn: 'Bài đọc',
        badgeFr: 'Lecture',
        icon: 'BookOpen',
        text: 'Read Unit 2.1, **pages 31 to 34**, and tick the page 34 checklist honestly.',
        textVn: 'Đọc Bài 2.1, **trang 31 đến 34**, và đánh dấu bảng tự kiểm tra trang 34 trung thực.',
        textFr: 'Lis l’unité 2.1, **pages 31 à 34**, et coche honnêtement le bilan p. 34.',
      },
      {
        tone: 'homework',
        badge: 'Explain it to somebody',
        badgeVn: 'Giải thích cho một người',
        badgeFr: 'Explique à quelqu’un',
        icon: 'Users',
        text: 'Explain to somebody at home, in **English**, why a bottle of water cannot be squashed but a balloon can. Write down what you said.',
        textVn: 'Giải thích cho một người ở nhà, bằng **tiếng Anh**, vì sao chai nước không bóp được còn bóng bay thì được. Viết lại điều em đã nói.',
        textFr: 'Explique chez toi, en **anglais**, pourquoi on ne peut pas écraser une bouteille d’eau, mais un ballon oui. Note ce que tu as dit.',
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
    subtitle: 'One idea — particles, arranged three ways — explained every row of Monday’s table. Exit question: a sealed bottle of air and a sealed bottle of water, both exactly full. **Which has more empty space inside?** Say why, using the word *particles*.',
    subtitleVn: 'Chỉ một ý tưởng — các hạt, sắp xếp theo ba cách — đã giải thích mọi hàng trong bảng hôm thứ Hai. Câu hỏi ra về: một chai không khí và một chai nước đậy kín, cả hai đều đầy. **Chai nào có nhiều khoảng trống hơn?** Hãy nói vì sao, dùng từ *particles*.',
    subtitleFr: 'Une idée — des particules rangées de trois façons — explique tout le tableau de lundi. Question de sortie : une bouteille fermée d’air, une d’eau, toutes deux pleines. **Laquelle a le plus d’espace vide ?** Dis pourquoi, avec le mot *particles*.',
  },
]
