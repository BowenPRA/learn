// src/utils/stateChain.js
//
// Explain It — Year 7 Science 2.3, Explaining changes of state (EXPLAIN_IT,
// unit key `explainIt`, deck activity `chain`). Pure: no React. Spec:
// docs/y7-science/unit2-close-engines.md §2.
//
// Section 2.3 is one reasoning chain told five ways:
//
//   heat energy is transferred to (or away from) the particles
//   → they vibrate / move more (or slow down)
//   → they overcome the attractive forces (or the forces pull them together)
//   → so the substance expands / melts / evaporates / boils (or condenses / freezes)
//
// The exam marks it link by link, so the task does too. Everything here is
// data plus the functions that derive a round, its right answer and its
// verdict from that data:
//
//   SCENARIOS   37 everyday situations, each tagged with its change
//   LINKS       the canonical links, worded exactly as the deck's Key word cards
//   CHAINS      the ordered links for each change (3 for expand, 4 for the rest)
//   TRAPS       the misconception links, each with the one sentence that says
//               why it is wrong, the changes it is a believable mistake for,
//               and the role (heat · motion · forces · result) it pretends to fill
//   stateBoxSvg a drawn box of particles — the SAME size in every state
//
// Rounds (`makeRound`): build · fix · name · picture. `answerOf(round)` derives
// the right answer, `wrongAnswersOf(round)` lists the traps a student could
// fall into, and `markRound(round, answer)` returns `{ correct, perPart,
// explain }` with the trap's own why first. The validator (`checkExplainConfig`)
// draws dozens of rounds per mode and proves the marker accepts each round's own
// answer and rejects every trap.

import { rngFrom } from './labBench.js';

// ------------------------------------------------------------------ the changes

export const CHANGES = ['expand', 'melt', 'freeze', 'evaporate', 'boil', 'condense'];
export const HEATING = ['expand', 'melt', 'evaporate', 'boil'];
export const COOLING = ['freeze', 'condense'];
export const ROLES = ['heat', 'motion', 'forces', 'result'];
export const EXPLAIN_MODES = ['build', 'fix', 'name', 'picture'];

export const isHeating = (change) => HEATING.includes(change);

/**
 * Per change: its name (the button), which way the heat energy goes, the
 * particle picture before and after, the wrong-state picture the `picture`
 * round offers, and the one line that tells this change from the others.
 */
export const CHANGE_INFO = {
  expand: {
    name: { en: 'Expansion', vn: 'Sự giãn nở', fr: 'Dilatation' },
    heat: 'to', before: 'solid', after: 'solidHot', wrongState: 'liquid', frThe: 'la dilatation',
    tell: { en: 'a solid gets a little bigger but stays a solid — expansion.', vn: 'chất rắn to ra một chút nhưng vẫn là chất rắn — sự giãn nở.', fr: 'un solide devient un peu plus grand mais reste un solide — la dilatation.' },
  },
  melt: {
    name: { en: 'Melting', vn: 'Sự nóng chảy', fr: 'Fusion' },
    heat: 'to', before: 'solid', after: 'liquid', wrongState: 'gas', frThe: 'la fusion',
    tell: { en: 'a solid turns into a liquid — melting.', vn: 'chất rắn chuyển thành chất lỏng — sự nóng chảy.', fr: 'un solide se transforme en liquide — la fusion.' },
  },
  freeze: {
    name: { en: 'Freezing', vn: 'Sự đông đặc', fr: 'Solidification' },
    heat: 'away', before: 'liquid', after: 'solid', wrongState: 'gas', frThe: 'la solidification',
    tell: { en: 'a liquid turns into a solid — freezing.', vn: 'chất lỏng chuyển thành chất rắn — sự đông đặc.', fr: 'un liquide se transforme en solide — la solidification.' },
  },
  evaporate: {
    name: { en: 'Evaporation', vn: 'Sự bay hơi', fr: 'Évaporation' },
    heat: 'to', before: 'liquid', after: 'gas', wrongState: 'solid', frThe: "l'évaporation",
    tell: { en: 'a liquid slowly turns into a gas from its surface, below its boiling point — evaporation.', vn: 'chất lỏng từ từ chuyển thành chất khí từ bề mặt, dưới nhiệt độ sôi — sự bay hơi.', fr: "un liquide se transforme lentement en gaz à sa surface, en dessous de sa température d'ébullition — l'évaporation." },
  },
  boil: {
    name: { en: 'Boiling', vn: 'Sự sôi', fr: 'Ébullition' },
    heat: 'to', before: 'liquid', after: 'gas', wrongState: 'solid', frThe: "l'ébullition",
    tell: { en: 'a liquid at its boiling point turns into a gas all through, with bubbles — boiling.', vn: 'chất lỏng ở nhiệt độ sôi chuyển thành chất khí ở khắp trong lòng nó, có sủi bọt — sự sôi.', fr: "un liquide à sa température d'ébullition se transforme en gaz dans tout son volume, avec des bulles — l'ébullition." },
  },
  condense: {
    name: { en: 'Condensation', vn: 'Sự ngưng tụ', fr: 'Condensation' },
    heat: 'away', before: 'gas', after: 'liquid', wrongState: 'solid', frThe: 'la condensation',
    tell: { en: 'a gas turns into drops of liquid on something cold — condensation.', vn: 'chất khí chuyển thành các giọt chất lỏng trên vật lạnh — sự ngưng tụ.', fr: 'un gaz se transforme en gouttes de liquide sur quelque chose de froid — la condensation.' },
  },
};

/** What each drawn state looks like, for the `picture` verdicts. */
export const STATE_INFO = {
  solid: { en: 'a solid: particles touching in a fixed pattern, vibrating on the spot', vn: 'chất rắn: các hạt chạm nhau theo trật tự cố định, rung động tại chỗ', fr: 'un solide : des particules qui se touchent dans un arrangement fixe et vibrent sur place' },
  solidHot: { en: 'a heated solid: the same fixed pattern, the particles vibrating more and a little further apart', vn: 'chất rắn bị đun nóng: vẫn trật tự cố định đó, các hạt rung động nhiều hơn và xa nhau hơn một chút', fr: 'un solide chauffé : le même arrangement fixe, avec des particules qui vibrent davantage et un peu plus éloignées' },
  liquid: { en: 'a liquid: particles touching but in no pattern, able to slide past each other', vn: 'chất lỏng: các hạt chạm nhau nhưng không theo trật tự, có thể trượt qua nhau', fr: 'un liquide : des particules qui se touchent mais sans arrangement, et qui peuvent glisser les unes sur les autres' },
  gas: { en: 'a gas: particles far apart, moving fast in every direction', vn: 'chất khí: các hạt ở xa nhau, chuyển động nhanh theo mọi hướng', fr: 'un gaz : des particules éloignées, qui bougent vite dans toutes les directions' },
};

// ------------------------------------------------------------------ the links
// Worded exactly as the deck's Key word cards (src/data/Y7_SCI/U02_3/notes.js),
// so the task rehearses the sentences the student met there.

export const LINKS = {
  heat_to: { role: 'heat', en: 'Heat energy is transferred to the particles.', vn: 'Nhiệt năng được truyền đến các hạt.', fr: "De l'énergie thermique est transférée aux particules." },
  heat_away: { role: 'heat', en: 'Heat energy is transferred away from the particles.', vn: 'Nhiệt năng được truyền ra khỏi các hạt.', fr: "De l'énergie thermique est transférée hors des particules." },

  vib_more: { role: 'motion', en: 'The particles vibrate more.', vn: 'Các hạt rung động nhiều hơn.', fr: 'Les particules vibrent davantage.' },
  vib_lots: { role: 'motion', en: 'The particles vibrate more and more.', vn: 'Các hạt rung động ngày càng nhiều.', fr: 'Les particules vibrent de plus en plus.' },
  move_faster: { role: 'motion', en: 'The particles move faster and faster.', vn: 'Các hạt chuyển động ngày càng nhanh.', fr: 'Les particules bougent de plus en plus vite.' },
  slow_down: { role: 'motion', en: 'The particles slow down.', vn: 'Các hạt chuyển động chậm lại.', fr: 'Les particules ralentissent.' },

  forces_cant_hold: { role: 'forces', en: 'The attractive forces can no longer hold them in a fixed pattern.', vn: 'Lực hút không còn giữ được chúng trong trật tự cố định.', fr: "Les forces d'attraction ne peuvent plus les maintenir dans un arrangement fixe." },
  forces_surface: { role: 'forces', en: 'Some particles at the surface have enough energy to overcome the attractive forces.', vn: 'Một số hạt ở bề mặt có đủ năng lượng để vượt qua lực hút.', fr: "Certaines particules à la surface ont assez d'énergie pour vaincre les forces d'attraction." },
  forces_all: { role: 'forces', en: 'At the boiling point, particles all through the liquid have enough energy to overcome the attractive forces.', vn: 'Ở nhiệt độ sôi, các hạt ở khắp trong lòng chất lỏng có đủ năng lượng để vượt qua lực hút.', fr: "À la température d'ébullition, les particules de tout le liquide ont assez d'énergie pour vaincre les forces d'attraction." },
  forces_together: { role: 'forces', en: 'The attractive forces pull them close together.', vn: 'Lực hút kéo chúng lại sát nhau.', fr: "Les forces d'attraction les rapprochent les unes des autres." },
  forces_fix: { role: 'forces', en: 'The attractive forces pull them into a fixed pattern.', vn: 'Lực hút kéo chúng vào một trật tự cố định.', fr: "Les forces d'attraction les attirent dans un arrangement fixe." },

  expand_space: { role: 'result', en: 'They take up more space, so the solid expands.', vn: 'Chúng chiếm nhiều chỗ hơn, nên chất rắn giãn nở.', fr: 'Elles prennent plus de place, donc le solide se dilate.' },
  melt_slide: { role: 'result', en: 'They can slide past each other, so the solid melts.', vn: 'Chúng có thể trượt qua nhau, nên chất rắn nóng chảy.', fr: 'Elles peuvent glisser les unes sur les autres, donc le solide fond.' },
  evap_escape: { role: 'result', en: 'They escape into the air as a gas, so the liquid evaporates.', vn: 'Chúng thoát vào không khí dưới dạng khí, nên chất lỏng bay hơi.', fr: "Elles s'échappent dans l'air sous forme de gaz, donc le liquide s'évapore." },
  boil_bubbles: { role: 'result', en: 'They form bubbles of gas that escape, so the liquid boils.', vn: 'Chúng tạo thành các bọt khí rồi thoát ra, nên chất lỏng sôi.', fr: "Elles forment des bulles de gaz qui s'échappent, donc le liquide bout." },
  condense_drops: { role: 'result', en: 'They form drops of liquid, so the gas condenses.', vn: 'Chúng tạo thành các giọt chất lỏng, nên chất khí ngưng tụ.', fr: 'Elles forment des gouttes de liquide, donc le gaz se condense.' },
  freeze_vibrate: { role: 'result', en: 'They can only vibrate on the spot, so the liquid freezes.', vn: 'Chúng chỉ còn rung động tại chỗ, nên chất lỏng đông đặc.', fr: 'Elles ne peuvent plus que vibrer sur place, donc le liquide se solidifie.' },
};

/** The ordered links for each change: heat → motion → (forces →) result. */
export const CHAINS = {
  expand: ['heat_to', 'vib_more', 'expand_space'],
  melt: ['heat_to', 'vib_lots', 'forces_cant_hold', 'melt_slide'],
  evaporate: ['heat_to', 'move_faster', 'forces_surface', 'evap_escape'],
  boil: ['heat_to', 'move_faster', 'forces_all', 'boil_bubbles'],
  condense: ['heat_away', 'slow_down', 'forces_together', 'condense_drops'],
  freeze: ['heat_away', 'slow_down', 'forces_fix', 'freeze_vibrate'],
};

export const chainFor = (change) => (CHAINS[change] ? [...CHAINS[change]] : []);

// ------------------------------------------------------------------ the traps
// Each trap pretends to fill one ROLE and is a believable mistake for the
// changes in `fits`. A trap's text may be a real link from the OPPOSITE change
// (heat transferred away in a heating change) — it is wrong only where it fits,
// and the validator proves no trap ever reads the same as a link of a chain it
// fits. Every (change, role) has at least three traps, so a `fix` round can swap
// one in and still offer two wrong replacements.

const H = HEATING;
const C = COOLING;

export const TRAPS = {
  // heat ─ which way, and what is transferred
  dir_away: {
    role: 'heat', fits: H, en: 'Heat energy is transferred away from the particles.', vn: 'Nhiệt năng được truyền ra khỏi các hạt.', fr: "De l'énergie thermique est transférée hors des particules.",
    why: 'Wrong way round. This is a heating change, so heat energy is transferred TO the particles. Taking it away would cool them.',
    whyVn: 'Ngược chiều. Đây là sự thay đổi do đun nóng, nên nhiệt năng được truyền ĐẾN các hạt. Lấy nhiệt đi sẽ làm chúng lạnh đi.',
    whyFr: "C'est à l'envers. Ici on chauffe, donc l'énergie thermique est transférée AUX particules. La leur retirer les refroidirait.",
  },
  dir_to: {
    role: 'heat', fits: C, en: 'Heat energy is transferred to the particles.', vn: 'Nhiệt năng được truyền đến các hạt.', fr: "De l'énergie thermique est transférée aux particules.",
    why: 'Wrong way round. This is a cooling change, so heat energy is transferred AWAY from the particles, to something colder.',
    whyVn: 'Ngược chiều. Đây là sự thay đổi do làm lạnh, nên nhiệt năng được truyền RA KHỎI các hạt, sang một vật lạnh hơn.',
    whyFr: "C'est à l'envers. Ici on refroidit, donc l'énergie thermique est transférée HORS DES particules, vers quelque chose de plus froid.",
  },
  cold_in: {
    role: 'heat', fits: C, en: 'Cold energy is transferred to the particles.', vn: 'Năng lượng lạnh được truyền đến các hạt.', fr: "De l'énergie froide est transférée aux particules.",
    why: 'There is no such thing as cold energy. Cooling means heat energy is transferred AWAY from the particles.',
    whyVn: 'Không có thứ gọi là năng lượng lạnh. Làm lạnh nghĩa là nhiệt năng được truyền RA KHỎI các hạt.',
    whyFr: "L'énergie froide, ça n'existe pas. Refroidir, c'est transférer de l'énergie thermique HORS DES particules.",
  },
  cold_out: {
    role: 'heat', fits: H, en: 'Cold energy is transferred away from the particles.', vn: 'Năng lượng lạnh được truyền ra khỏi các hạt.', fr: "De l'énergie froide est transférée hors des particules.",
    why: 'There is no such thing as cold energy. Warming means heat energy is transferred TO the particles.',
    whyVn: 'Không có thứ gọi là năng lượng lạnh. Làm nóng nghĩa là nhiệt năng được truyền ĐẾN các hạt.',
    whyFr: "L'énergie froide, ça n'existe pas. Réchauffer, c'est transférer de l'énergie thermique AUX particules.",
  },
  heat_temp: {
    role: 'heat', fits: H, en: 'The temperature is transferred to the particles.', vn: 'Nhiệt độ được truyền đến các hạt.', fr: 'La température est transférée aux particules.',
    why: 'Temperature is not something that moves. Heat energy is transferred, and that makes the temperature go up.',
    whyVn: 'Nhiệt độ không phải là thứ di chuyển được. Nhiệt năng được truyền đi, và điều đó làm nhiệt độ tăng lên.',
    whyFr: "La température n'est pas quelque chose qui se déplace. C'est l'énergie thermique qui est transférée, et cela fait monter la température.",
  },
  heat_made: {
    role: 'heat', fits: H, en: 'The particles make their own heat energy.', vn: 'Các hạt tự tạo ra nhiệt năng.', fr: 'Les particules fabriquent leur propre énergie thermique.',
    why: 'Particles do not make heat energy. It is transferred to them from something hotter, like the Sun or a flame.',
    whyVn: 'Các hạt không tự tạo ra nhiệt năng. Nhiệt năng được truyền đến chúng từ một vật nóng hơn, như Mặt Trời hay ngọn lửa.',
    whyFr: "Les particules ne fabriquent pas d'énergie thermique. Elle leur est transférée par quelque chose de plus chaud, comme le Soleil ou une flamme.",
  },
  heat_destroyed: {
    role: 'heat', fits: C, en: 'The heat energy in the particles is destroyed.', vn: 'Nhiệt năng trong các hạt bị phá hủy.', fr: "L'énergie thermique des particules est détruite.",
    why: 'Energy is never destroyed. It is transferred away from the particles to something colder, like a cold glass or the freezer.',
    whyVn: 'Năng lượng không bao giờ bị phá hủy. Nó được truyền ra khỏi các hạt sang một vật lạnh hơn, như cốc lạnh hay ngăn đá.',
    whyFr: "L'énergie n'est jamais détruite. Elle est transférée hors des particules vers quelque chose de plus froid, comme un verre froid ou le congélateur.",
  },

  // motion ─ how the particles move, and their size
  motion_slow: {
    role: 'motion', fits: H, en: 'The particles slow down.', vn: 'Các hạt chuyển động chậm lại.', fr: 'Les particules ralentissent.',
    why: 'Wrong way round. Heat energy transferred to the particles makes them move MORE, not less.',
    whyVn: 'Ngược chiều. Nhiệt năng truyền đến các hạt làm chúng chuyển động NHIỀU HƠN, không phải ít hơn.',
    whyFr: "C'est à l'envers. L'énergie thermique transférée aux particules les fait bouger DAVANTAGE, pas moins.",
  },
  motion_fast: {
    role: 'motion', fits: C, en: 'The particles move faster and faster.', vn: 'Các hạt chuyển động ngày càng nhanh.', fr: 'Les particules bougent de plus en plus vite.',
    why: 'Wrong way round. When heat energy is transferred away, the particles move LESS: they slow down.',
    whyVn: 'Ngược chiều. Khi nhiệt năng bị truyền ra ngoài, các hạt chuyển động ÍT HƠN: chúng chậm lại.',
    whyFr: "C'est à l'envers. Quand l'énergie thermique leur est retirée, les particules bougent MOINS : elles ralentissent.",
  },
  motion_same: {
    role: 'motion', fits: CHANGES, en: 'The particles keep moving at the same speed.', vn: 'Các hạt vẫn chuyển động với tốc độ như cũ.', fr: 'Les particules continuent de bouger à la même vitesse.',
    why: 'Transferring heat energy always changes how much the particles move: more energy, more movement; less energy, less movement.',
    whyVn: 'Truyền nhiệt năng luôn làm thay đổi mức chuyển động của các hạt: nhiều năng lượng hơn thì chuyển động nhiều hơn; ít năng lượng hơn thì chuyển động ít hơn.',
    whyFr: "Transférer de l'énergie thermique change toujours le mouvement des particules : plus d'énergie, plus de mouvement ; moins d'énergie, moins de mouvement.",
  },
  bigger: {
    role: 'motion', fits: H, en: 'The particles themselves get bigger.', vn: 'Bản thân các hạt to ra.', fr: 'Les particules elles-mêmes deviennent plus grosses.',
    why: 'Particles never change size. Heated particles move more and spread out, but each particle stays the same size.',
    whyVn: 'Các hạt không bao giờ thay đổi kích thước. Hạt bị đun nóng chuyển động nhiều hơn và tản ra, nhưng mỗi hạt vẫn giữ nguyên kích thước.',
    whyFr: "Les particules ne changent jamais de taille. Chauffées, elles bougent davantage et s'écartent, mais chaque particule garde la même taille.",
  },
  smaller: {
    role: 'motion', fits: C, en: 'The particles themselves get smaller.', vn: 'Bản thân các hạt nhỏ lại.', fr: 'Les particules elles-mêmes deviennent plus petites.',
    why: 'Particles never change size. Cooled particles move less and are pulled closer together, but each particle stays the same size.',
    whyVn: 'Các hạt không bao giờ thay đổi kích thước. Hạt bị làm lạnh chuyển động ít hơn và bị kéo lại gần nhau, nhưng mỗi hạt vẫn giữ nguyên kích thước.',
    whyFr: 'Les particules ne changent jamais de taille. Refroidies, elles bougent moins et se rapprochent, mais chaque particule garde la même taille.',
  },
  stop_moving: {
    role: 'motion', fits: C, en: 'The particles stop moving.', vn: 'Các hạt ngừng chuyển động.', fr: 'Les particules arrêtent de bouger.',
    why: 'Particles never stop moving. Even in a solid they still vibrate on the spot; they just move less.',
    whyVn: 'Các hạt không bao giờ ngừng chuyển động. Ngay cả trong chất rắn chúng vẫn rung động tại chỗ; chúng chỉ chuyển động ít hơn.',
    whyFr: "Les particules ne s'arrêtent jamais de bouger. Même dans un solide, elles vibrent sur place ; elles bougent seulement moins.",
  },
  more_particles: {
    role: 'motion', fits: ['expand', 'melt'], en: 'New particles are made.', vn: 'Các hạt mới được tạo ra.', fr: 'De nouvelles particules sont fabriquées.',
    why: 'Heating never makes new particles. The same particles are there before and after; they just move more.',
    whyVn: 'Đun nóng không bao giờ tạo ra hạt mới. Trước và sau vẫn là những hạt đó; chúng chỉ chuyển động nhiều hơn.',
    whyFr: 'Chauffer ne fabrique jamais de nouvelles particules. Ce sont les mêmes particules avant et après ; elles bougent seulement davantage.',
  },

  // forces ─ what the attractive forces do
  forces_stronger: {
    role: 'forces', fits: ['melt', 'evaporate', 'boil'], en: 'Heating makes the attractive forces stronger.', vn: 'Đun nóng làm lực hút mạnh hơn.', fr: "Chauffer rend les forces d'attraction plus fortes.",
    why: 'Heating does not make the forces stronger. It gives the particles enough energy to overcome them.',
    whyVn: 'Đun nóng không làm lực hút mạnh hơn. Nó cho các hạt đủ năng lượng để vượt qua lực hút.',
    whyFr: "Chauffer ne rend pas les forces plus fortes. Cela donne aux particules assez d'énergie pour les vaincre.",
  },
  forces_push: {
    role: 'forces', fits: ['melt', 'evaporate', 'boil', 'condense', 'freeze'], en: 'The attractive forces push the particles apart.', vn: 'Lực hút đẩy các hạt ra xa nhau.', fr: "Les forces d'attraction écartent les particules les unes des autres.",
    why: 'Attractive forces only ever pull particles together. They never push them apart.',
    whyVn: 'Lực hút chỉ kéo các hạt lại gần nhau. Nó không bao giờ đẩy chúng ra xa.',
    whyFr: "Les forces d'attraction ne font que rapprocher les particules. Elles ne les écartent jamais.",
  },
  forces_gone: {
    role: 'forces', fits: ['melt'], en: 'The attractive forces disappear completely.', vn: 'Lực hút biến mất hoàn toàn.', fr: "Les forces d'attraction disparaissent complètement.",
    why: 'In a liquid the forces are still there: they keep the particles touching. They just cannot hold them in a fixed pattern any more.',
    whyVn: 'Trong chất lỏng lực hút vẫn còn: nó giữ các hạt chạm nhau. Chỉ là nó không còn giữ được chúng trong trật tự cố định nữa.',
    whyFr: 'Dans un liquide, les forces sont toujours là : elles gardent les particules en contact. Elles ne peuvent simplement plus les maintenir dans un arrangement fixe.',
  },
  evap_boil: {
    role: 'forces', fits: ['evaporate'], en: LINKS.forces_all.en, vn: LINKS.forces_all.vn, fr: LINKS.forces_all.fr,
    why: 'That is boiling. Evaporation happens only at the surface, well below the boiling point: a puddle or wet washing never reaches 100 °C.',
    whyVn: 'Đó là sự sôi. Sự bay hơi chỉ xảy ra ở bề mặt, dưới nhiệt độ sôi rất xa: vũng nước hay quần áo ướt không bao giờ đạt 100 °C.',
    whyFr: "Ça, c'est l'ébullition. L'évaporation se produit seulement à la surface, bien en dessous de la température d'ébullition : une flaque ou du linge mouillé n'atteignent jamais 100 °C.",
  },
  boil_surface: {
    role: 'forces', fits: ['boil'], en: 'Only the particles at the very top of the liquid escape.', vn: 'Chỉ những hạt ở trên cùng của chất lỏng thoát ra.', fr: "Seules les particules tout en haut du liquide s'échappent.",
    why: 'In boiling, particles ALL through the liquid escape. That is why bubbles form deep inside it. Escaping only from the surface is evaporation.',
    whyVn: 'Khi sôi, các hạt ở KHẮP trong lòng chất lỏng thoát ra. Vì thế bọt khí hình thành sâu bên trong. Chỉ thoát ra từ bề mặt là sự bay hơi.',
    whyFr: "Pendant l'ébullition, les particules s'échappent dans TOUT le liquide. C'est pour ça que des bulles se forment au fond. S'échapper seulement par la surface, c'est l'évaporation.",
  },
  cond_fixed: {
    role: 'forces', fits: ['condense'], en: LINKS.forces_fix.en, vn: LINKS.forces_fix.vn, fr: LINKS.forces_fix.fr,
    why: 'A fixed pattern makes a solid. That is freezing. Condensing makes a liquid, whose particles can still slide past each other.',
    whyVn: 'Trật tự cố định tạo ra chất rắn. Đó là sự đông đặc. Ngưng tụ tạo ra chất lỏng, các hạt của nó vẫn trượt qua nhau được.',
    whyFr: "Un arrangement fixe donne un solide. Ça, c'est la solidification. La condensation donne un liquide, dont les particules peuvent encore glisser les unes sur les autres.",
  },
  forces_vanish_cool: {
    role: 'forces', fits: C, en: 'Cooling makes the attractive forces disappear.', vn: 'Làm lạnh làm lực hút biến mất.', fr: "Refroidir fait disparaître les forces d'attraction.",
    why: 'The attractive forces are always there. When the particles slow down, the forces are strong enough to pull them together.',
    whyVn: 'Lực hút luôn tồn tại. Khi các hạt chậm lại, lực hút đủ mạnh để kéo chúng lại gần nhau.',
    whyFr: "Les forces d'attraction sont toujours là. Quand les particules ralentissent, les forces sont assez fortes pour les rapprocher.",
  },
  freeze_unhold: {
    role: 'forces', fits: ['freeze'], en: LINKS.forces_cant_hold.en, vn: LINKS.forces_cant_hold.vn, fr: LINKS.forces_cant_hold.fr,
    why: 'That is melting, the reverse. When a liquid freezes, the forces pull the particles INTO a fixed pattern.',
    whyVn: 'Đó là sự nóng chảy, quá trình ngược lại. Khi chất lỏng đông đặc, lực hút kéo các hạt VÀO trật tự cố định.',
    whyFr: "Ça, c'est la fusion, l'inverse. Quand un liquide se solidifie, les forces attirent les particules DANS un arrangement fixe.",
  },

  // result ─ what happens to the substance
  bigger_expand: {
    role: 'result', fits: ['expand'], en: 'The particles get bigger, so the solid expands.', vn: 'Các hạt to ra, nên chất rắn giãn nở.', fr: 'Les particules deviennent plus grosses, donc le solide se dilate.',
    why: 'The particles do not get bigger. They vibrate more and take up more space: the gaps between them grow.',
    whyVn: 'Các hạt không to ra. Chúng rung động nhiều hơn và chiếm nhiều chỗ hơn: khoảng cách giữa chúng tăng lên.',
    whyFr: "Les particules ne grossissent pas. Elles vibrent davantage et prennent plus de place : les espaces entre elles s'agrandissent.",
  },
  more_expand: {
    role: 'result', fits: ['expand'], en: 'More particles are made, so the solid expands.', vn: 'Nhiều hạt hơn được tạo ra, nên chất rắn giãn nở.', fr: 'De nouvelles particules sont fabriquées, donc le solide se dilate.',
    why: 'No new particles are made. The same particles take up more space because they vibrate more.',
    whyVn: 'Không có hạt mới nào được tạo ra. Vẫn những hạt đó chiếm nhiều chỗ hơn vì chúng rung động nhiều hơn.',
    whyFr: "Aucune nouvelle particule n'est fabriquée. Les mêmes particules prennent plus de place parce qu'elles vibrent davantage.",
  },
  air_gaps: {
    role: 'result', fits: ['expand'], en: 'Air gets into the gaps between the particles, so the solid expands.', vn: 'Không khí lọt vào khoảng trống giữa các hạt, nên chất rắn giãn nở.', fr: "De l'air entre dans les espaces entre les particules, donc le solide se dilate.",
    why: 'Nothing gets in. The same particles vibrate more and push a little further apart.',
    whyVn: 'Không có gì lọt vào. Vẫn những hạt đó rung động nhiều hơn và đẩy nhau ra xa hơn một chút.',
    whyFr: "Rien n'entre. Les mêmes particules vibrent davantage et s'écartent un peu plus.",
  },
  particles_melt: {
    role: 'result', fits: ['melt'], en: 'Each particle melts, so the solid melts.', vn: 'Từng hạt nóng chảy, nên chất rắn nóng chảy.', fr: 'Chaque particule fond, donc le solide fond.',
    why: 'A single particle cannot melt. Melting is what the whole solid does: the same particles, now able to slide past each other.',
    whyVn: 'Một hạt riêng lẻ không thể nóng chảy. Nóng chảy là điều cả chất rắn trải qua: vẫn những hạt đó, nay có thể trượt qua nhau.',
    whyFr: "Une particule seule ne peut pas fondre. La fusion, c'est ce qui arrive au solide entier : les mêmes particules, qui peuvent maintenant glisser les unes sur les autres.",
  },
  new_liquid: {
    role: 'result', fits: ['melt'], en: 'The solid particles change into new liquid particles.', vn: 'Các hạt chất rắn biến thành các hạt chất lỏng mới.', fr: 'Les particules du solide se changent en nouvelles particules de liquide.',
    why: 'The particles do not change. The solid and the liquid are made of exactly the same particles; only how they are arranged and how they move is different.',
    whyVn: 'Các hạt không thay đổi. Chất rắn và chất lỏng gồm đúng những hạt đó; chỉ cách sắp xếp và cách chuyển động là khác.',
    whyFr: 'Les particules ne changent pas. Le solide et le liquide sont faits exactement des mêmes particules ; seuls leur arrangement et leur mouvement sont différents.',
  },
  melt_bigger: {
    role: 'result', fits: ['melt'], en: 'The particles get bigger and push apart, so the solid melts.', vn: 'Các hạt to ra và đẩy nhau ra, nên chất rắn nóng chảy.', fr: "Les particules grossissent et s'écartent, donc le solide fond.",
    why: 'Particles never change size. The solid melts because they vibrate so much that the forces cannot hold them in place.',
    whyVn: 'Các hạt không bao giờ thay đổi kích thước. Chất rắn nóng chảy vì chúng rung động mạnh đến mức lực hút không giữ được chúng tại chỗ.',
    whyFr: "Les particules ne changent jamais de taille. Le solide fond parce qu'elles vibrent tellement que les forces ne peuvent plus les maintenir en place.",
  },
  disappear: {
    role: 'result', fits: ['evaporate', 'boil'], en: 'The particles disappear into the air.', vn: 'Các hạt biến mất vào không khí.', fr: "Les particules disparaissent dans l'air.",
    why: 'The particles do not disappear. They are still there as a gas, spread out and moving fast. You just cannot see a gas.',
    whyVn: 'Các hạt không biến mất. Chúng vẫn ở đó dưới dạng khí, tản ra và chuyển động nhanh. Chỉ là em không nhìn thấy chất khí.',
    whyFr: 'Les particules ne disparaissent pas. Elles sont toujours là sous forme de gaz, éloignées et rapides. On ne peut simplement pas voir un gaz.',
  },
  water_to_air: {
    role: 'result', fits: ['evaporate'], en: 'The particles change into air particles.', vn: 'Các hạt biến thành các hạt không khí.', fr: "Les particules se changent en particules d'air.",
    why: 'The particles stay the same. As a gas they mix with the air, but water vapour is still water.',
    whyVn: 'Các hạt vẫn như cũ. Ở dạng khí chúng trộn lẫn với không khí, nhưng hơi nước vẫn là nước.',
    whyFr: "Les particules restent les mêmes. Sous forme de gaz, elles se mélangent à l'air, mais la vapeur d'eau, c'est toujours de l'eau.",
  },
  gas_bigger: {
    role: 'result', fits: ['evaporate', 'boil'], en: 'The particles get bigger and lighter, so they float away.', vn: 'Các hạt to ra và nhẹ hơn, nên chúng bay đi.', fr: "Les particules deviennent plus grosses et plus légères, donc elles s'envolent.",
    why: 'Particles never change size. They escape because they move fast enough to overcome the attractive forces.',
    whyVn: 'Các hạt không bao giờ thay đổi kích thước. Chúng thoát ra vì chuyển động đủ nhanh để vượt qua lực hút.',
    whyFr: "Les particules ne changent jamais de taille. Elles s'échappent parce qu'elles bougent assez vite pour vaincre les forces d'attraction.",
  },
  bubbles_air: {
    role: 'result', fits: ['boil'], en: 'Bubbles of air rise out, so the liquid boils.', vn: 'Các bọt không khí nổi lên, nên chất lỏng sôi.', fr: "Des bulles d'air remontent, donc le liquide bout.",
    why: 'The bubbles are not air. They are the liquid itself as a gas: in boiling water, they are steam.',
    whyVn: 'Các bọt đó không phải không khí. Chúng chính là chất lỏng ở dạng khí: trong nước sôi, đó là hơi nước.',
    whyFr: "Les bulles ne sont pas de l'air. C'est le liquide lui-même sous forme de gaz : dans l'eau qui bout, c'est de la vapeur d'eau.",
  },
  steam_new: {
    role: 'result', fits: ['boil'], en: 'The particles change into new steam particles.', vn: 'Các hạt biến thành các hạt hơi nước mới.', fr: 'Les particules se changent en nouvelles particules de vapeur.',
    why: 'No new particles are made. Steam is the same water particles, far apart and moving fast.',
    whyVn: 'Không có hạt mới nào được tạo ra. Hơi nước vẫn là những hạt nước đó, ở xa nhau và chuyển động nhanh.',
    whyFr: "Aucune nouvelle particule n'est fabriquée. La vapeur, ce sont les mêmes particules d'eau, éloignées et rapides.",
  },
  leaks: {
    role: 'result', fits: ['condense'], en: 'The drops leak through from the other side of the cold surface.', vn: 'Các giọt nước rỉ qua từ phía bên kia của bề mặt lạnh.', fr: "Les gouttes traversent depuis l'autre côté de la surface froide.",
    why: 'Nothing leaks through. The drops come from water vapour in the air: its particles lose energy on the cold surface and condense.',
    whyVn: 'Không có gì rỉ qua. Các giọt nước đến từ hơi nước trong không khí: các hạt của nó mất năng lượng trên bề mặt lạnh và ngưng tụ.',
    whyFr: "Rien ne traverse. Les gouttes viennent de la vapeur d'eau de l'air : ses particules perdent de l'énergie sur la surface froide et se condensent.",
  },
  cond_new: {
    role: 'result', fits: ['condense'], en: 'The cold surface makes new water particles.', vn: 'Bề mặt lạnh tạo ra các hạt nước mới.', fr: "La surface froide fabrique de nouvelles particules d'eau.",
    why: 'No particles are made. The drops are water vapour that was already in the air, now a liquid.',
    whyVn: 'Không có hạt nào được tạo ra. Các giọt nước là hơi nước vốn đã có trong không khí, nay thành chất lỏng.',
    whyFr: "Aucune particule n'est fabriquée. Les gouttes, c'est de la vapeur d'eau qui était déjà dans l'air, devenue liquide.",
  },
  cond_smaller: {
    role: 'result', fits: ['condense'], en: 'The particles shrink and fall as drops.', vn: 'Các hạt co lại và rơi xuống thành giọt.', fr: 'Les particules rétrécissent et tombent en gouttes.',
    why: 'Particles never change size. They slow down and the forces pull them close together into drops.',
    whyVn: 'Các hạt không bao giờ thay đổi kích thước. Chúng chậm lại và lực hút kéo chúng sát lại thành giọt.',
    whyFr: 'Les particules ne changent jamais de taille. Elles ralentissent et les forces les rapprochent en gouttes.',
  },
  freeze_stop: {
    role: 'result', fits: ['freeze'], en: 'They stop moving completely, so the liquid freezes.', vn: 'Chúng ngừng chuyển động hoàn toàn, nên chất lỏng đông đặc.', fr: 'Elles arrêtent complètement de bouger, donc le liquide se solidifie.',
    why: 'Particles in a solid still move: they vibrate on the spot. They never stop completely.',
    whyVn: 'Các hạt trong chất rắn vẫn chuyển động: chúng rung động tại chỗ. Chúng không bao giờ dừng hẳn.',
    whyFr: "Les particules d'un solide bougent encore : elles vibrent sur place. Elles ne s'arrêtent jamais complètement.",
  },
  freeze_new: {
    role: 'result', fits: ['freeze'], en: 'The liquid particles change into new solid particles.', vn: 'Các hạt chất lỏng biến thành các hạt chất rắn mới.', fr: 'Les particules du liquide se changent en nouvelles particules de solide.',
    why: 'The particles do not change. The liquid and the solid are the same particles; only how they are arranged and how they move is different.',
    whyVn: 'Các hạt không thay đổi. Chất lỏng và chất rắn là cùng những hạt đó; chỉ cách sắp xếp và cách chuyển động là khác.',
    whyFr: 'Les particules ne changent pas. Le liquide et le solide sont faits des mêmes particules ; seuls leur arrangement et leur mouvement sont différents.',
  },
  freeze_smaller: {
    role: 'result', fits: ['freeze'], en: 'The particles get smaller and harder, so the liquid freezes.', vn: 'Các hạt nhỏ lại và cứng hơn, nên chất lỏng đông đặc.', fr: 'Les particules deviennent plus petites et plus dures, donc le liquide se solidifie.',
    why: 'Particles never change size. The liquid freezes because the forces pull the slow particles into a fixed pattern.',
    whyVn: 'Các hạt không bao giờ thay đổi kích thước. Chất lỏng đông đặc vì lực hút kéo các hạt chậm vào trật tự cố định.',
    whyFr: 'Les particules ne changent jamais de taille. Le liquide se solidifie parce que les forces attirent les particules lentes dans un arrangement fixe.',
  },
};

// ------------------------------------------------------------------ the scenarios
// Everyday situations, each one change the deck teaches. `name` is the short
// label (the summary row); `en`/`vn`/`fr` is the sentence the round shows. Every
// expansion is a SOLID, because the expansion chain says "the solid expands".

const S = (id, change, name, nameVn, en, vn, nameFr, fr) => ({ id, change, name, nameVn, nameFr, en, vn, fr });

export const SCENARIOS = [
  // expand
  S('bridge', 'expand', 'A steel bridge in summer', 'Cầu thép vào mùa hè',
    'A steel bridge is a little longer on a hot summer afternoon than on a cold winter morning.',
    'Một cây cầu thép dài hơn một chút vào buổi chiều hè nóng so với buổi sáng mùa đông lạnh.',
    'Un pont en acier en été', "Un pont en acier est un peu plus long par un après-midi chaud d'été que par un matin froid d'hiver."),
  S('rails', 'expand', 'Railway rails on a hot day', 'Đường ray vào ngày nóng',
    'On a hot day the steel rails of a railway get longer, so small gaps are left between them.',
    'Vào ngày nóng, các thanh ray thép của đường sắt dài ra, nên người ta để những khe hở nhỏ giữa chúng.',
    'Des rails par une journée chaude', "Par une journée chaude, les rails en acier d'une voie ferrée s'allongent, alors on laisse de petits espaces entre eux."),
  S('jar_lid', 'expand', 'A jar lid under hot water', 'Nắp lọ dưới nước nóng',
    'A metal lid stuck on a glass jar comes off easily after it is held under hot water.',
    'Một chiếc nắp kim loại bị kẹt trên lọ thủy tinh mở ra dễ dàng sau khi được giữ dưới vòi nước nóng.',
    "Un couvercle de bocal sous l'eau chaude", "Un couvercle en métal coincé sur un bocal en verre s'ouvre facilement après être passé sous l'eau chaude."),
  S('power_lines', 'expand', 'Power lines on a hot afternoon', 'Dây điện vào buổi chiều nóng',
    'Metal power lines hang lower between their poles on a hot afternoon.',
    'Dây điện bằng kim loại võng thấp hơn giữa các cột điện vào buổi chiều nóng.',
    'Des lignes électriques par un après-midi chaud', 'Les lignes électriques en métal pendent plus bas entre leurs poteaux par un après-midi chaud.'),
  S('roof', 'expand', 'A metal roof in the sun', 'Mái tôn dưới nắng',
    'A metal roof (mái tôn) ticks and creaks as the afternoon sun heats it.',
    'Mái tôn kêu lách tách khi nắng chiều làm nó nóng lên.',
    'Un toit en tôle au soleil', "Un toit en tôle (mái tôn) craque et claque quand le soleil de l'après-midi le chauffe."),
  S('ball_ring', 'expand', 'A heated metal ball and ring', 'Quả cầu kim loại bị hơ nóng',
    'A metal ball slides through a metal ring when it is cold, but gets stuck after the ball is heated in a flame.',
    'Một quả cầu kim loại lọt qua một chiếc vòng kim loại khi còn nguội, nhưng bị kẹt sau khi quả cầu được hơ nóng trên ngọn lửa.',
    'Une boule de métal chauffée et un anneau', 'Une boule de métal passe à travers un anneau de métal quand elle est froide, mais reste coincée après avoir été chauffée dans une flamme.'),
  S('pavement', 'expand', 'Concrete slabs in the heat', 'Tấm bê tông trong nắng nóng',
    'Concrete slabs on a pavement are laid with small gaps so they do not crack in the summer heat.',
    'Các tấm bê tông trên vỉa hè được lát với khe hở nhỏ để chúng không bị nứt trong cái nóng mùa hè.',
    'Des dalles de béton dans la chaleur', "Les dalles de béton d'un trottoir sont posées avec de petits espaces pour qu'elles ne se fissurent pas dans la chaleur de l'été."),
  // melt
  S('iced_tea', 'melt', 'Ice in iced tea', 'Đá trong cốc trà đá',
    'The ice in a glass of iced tea (trà đá) turns into water on a hot afternoon.',
    'Đá trong cốc trà đá tan thành nước vào buổi chiều nóng.',
    'De la glace dans un thé glacé', "La glace d'un verre de thé glacé (trà đá) se transforme en eau par un après-midi chaud."),
  S('chocolate', 'melt', 'Chocolate in a pocket', 'Sô-cô-la trong túi áo',
    'A bar of chocolate in your pocket goes soft and runny.',
    'Thanh sô-cô-la trong túi áo em trở nên mềm và chảy ra.',
    'Du chocolat dans une poche', 'Une barre de chocolat dans ta poche devient molle et coulante.'),
  S('butter', 'melt', 'Butter in a hot pan', 'Bơ trong chảo nóng',
    'A piece of butter in a hot pan turns into a yellow liquid.',
    'Miếng bơ trong chảo nóng biến thành chất lỏng màu vàng.',
    'Du beurre dans une poêle chaude', 'Un morceau de beurre dans une poêle chaude se transforme en liquide jaune.'),
  S('candle', 'melt', 'Candle wax near the flame', 'Sáp nến gần ngọn lửa',
    'The wax at the top of a burning candle turns into a liquid.',
    'Sáp ở đỉnh cây nến đang cháy chuyển thành chất lỏng.',
    'La cire près de la flamme', "La cire en haut d'une bougie allumée se transforme en liquide."),
  S('ice_cream', 'melt', 'Ice cream on a hot day', 'Kem vào ngày nóng',
    'An ice cream drips down its cone in the street on a hot day.',
    'Cây kem chảy nhỏ giọt xuống ốc quế ngoài đường vào ngày nóng.',
    'Une glace par une journée chaude', 'Une glace coule le long de son cornet dans la rue par une journée chaude.'),
  S('gold', 'melt', 'Gold in a jeweller’s furnace', 'Vàng trong lò thợ kim hoàn',
    'A jeweller heats gold in a small furnace until it can be poured into a mould.',
    'Thợ kim hoàn nung vàng trong lò nhỏ cho đến khi có thể rót vào khuôn.',
    "De l'or dans le four d'un bijoutier", "Un bijoutier chauffe de l'or dans un petit four jusqu'à pouvoir le verser dans un moule."),
  // freeze
  S('ice_tray', 'freeze', 'Water in an ice-cube tray', 'Nước trong khay đá',
    'Water in an ice-cube tray turns into ice cubes in the freezer.',
    'Nước trong khay đá biến thành những viên đá trong ngăn đá.',
    "De l'eau dans un bac à glaçons", "L'eau d'un bac à glaçons se transforme en glaçons dans le congélateur."),
  S('wax_drips', 'freeze', 'Drips of candle wax cooling', 'Giọt sáp nến nguội đi',
    'Drips of hot candle wax turn hard on the table.',
    'Những giọt sáp nến nóng cứng lại trên mặt bàn.',
    'Des gouttes de cire qui refroidissent', 'Des gouttes de cire chaude durcissent sur la table.'),
  S('lava', 'freeze', 'Lava flowing into the sea', 'Dung nham chảy xuống biển',
    'Lava flowing into the sea turns into solid rock.',
    'Dung nham chảy xuống biển biến thành đá rắn.',
    'De la lave qui coule dans la mer', 'De la lave qui coule dans la mer se transforme en roche solide.'),
  S('chocolate_set', 'freeze', 'Chocolate setting in the fridge', 'Sô-cô-la đông lại trong tủ lạnh',
    'Melted chocolate poured over a cake sets hard in the fridge.',
    'Sô-cô-la đã chảy được rưới lên bánh cứng lại trong tủ lạnh.',
    'Du chocolat qui durcit au frigo', 'Du chocolat fondu versé sur un gâteau durcit au réfrigérateur.'),
  S('sapa', 'freeze', 'A bucket on a freezing night in Sa Pa', 'Xô nước trong đêm giá rét ở Sa Pa',
    'Water in a bucket turns to ice on a freezing night in Sa Pa.',
    'Nước trong xô đóng thành băng vào một đêm giá rét ở Sa Pa.',
    'Un seau par une nuit glaciale à Sa Pa', "L'eau d'un seau se transforme en glace par une nuit glaciale à Sa Pa."),
  S('iron_mould', 'freeze', 'Liquid iron in a mould', 'Sắt lỏng trong khuôn',
    'Liquid iron poured into a sand mould turns into a solid gear.',
    'Sắt nóng chảy được rót vào khuôn cát biến thành một bánh răng rắn.',
    'Du fer liquide dans un moule', 'Du fer liquide versé dans un moule en sable se transforme en un engrenage solide.'),
  // evaporate
  S('puddle', 'evaporate', 'A puddle in the schoolyard', 'Vũng nước trong sân trường',
    'A puddle in the schoolyard is gone by the afternoon.',
    'Vũng nước trong sân trường biến mất vào buổi chiều.',
    'Une flaque dans la cour', "Une flaque dans la cour de l'école a disparu dans l'après-midi."),
  S('washing', 'evaporate', 'Washing on the line', 'Quần áo phơi trên dây',
    'Wet washing hung on the line is dry by the evening.',
    'Quần áo ướt phơi trên dây khô vào buổi tối.',
    'Du linge sur le fil', 'Le linge mouillé étendu sur le fil est sec le soir.'),
  S('sweat', 'evaporate', 'Sweat in front of a fan', 'Mồ hôi trước quạt',
    'Sweat on your skin dries while you sit in front of a fan.',
    'Mồ hôi trên da em khô đi khi em ngồi trước quạt.',
    'De la sueur devant un ventilateur', 'La sueur sur ta peau sèche pendant que tu es assis devant un ventilateur.'),
  S('mop', 'evaporate', 'A mopped floor', 'Sàn nhà vừa lau',
    'A freshly mopped floor is dry in a few minutes.',
    'Sàn nhà vừa lau khô sau vài phút.',
    "Un sol qui vient d'être lavé", "Un sol qui vient d'être lavé est sec en quelques minutes."),
  S('salt_field', 'evaporate', 'Sea water in the salt fields', 'Nước biển trên ruộng muối',
    'Salt farmers in Ninh Thuận leave sea water in shallow fields until only the salt is left.',
    'Diêm dân ở Ninh Thuận để nước biển trong những ruộng nông cho đến khi chỉ còn lại muối.',
    "De l'eau de mer dans les marais salants", "À Ninh Thuận, les sauniers laissent l'eau de mer dans des bassins peu profonds jusqu'à ce qu'il ne reste que le sel."),
  S('hair', 'evaporate', 'Wet hair on the way to school', 'Tóc ướt trên đường đến trường',
    'Your wet hair dries on the walk to school.',
    'Tóc ướt của em khô trên đường đi bộ đến trường.',
    "Des cheveux mouillés en allant à l'école", "Tes cheveux mouillés sèchent sur le chemin de l'école."),
  // boil
  S('kettle', 'boil', 'A kettle of water', 'Ấm nước',
    'Water in a kettle bubbles hard and steam pours out of the spout.',
    'Nước trong ấm sủi bọt mạnh và hơi nước phụt ra từ vòi ấm.',
    "Une bouilloire d'eau", "L'eau d'une bouilloire fait de grosses bulles et de la vapeur sort du bec."),
  S('pho', 'boil', 'A pot of phở broth', 'Nồi nước dùng phở',
    'A big pot of phở broth bubbles hard on the stove.',
    'Một nồi nước dùng phở lớn sôi sùng sục trên bếp.',
    'Une marmite de bouillon de phở', 'Une grande marmite de bouillon de phở bout à gros bouillons sur le feu.'),
  S('noodles', 'boil', 'Water for instant noodles', 'Nước nấu mì gói',
    'The water for instant noodles bubbles all through when it reaches 100 °C.',
    'Nước nấu mì gói sủi bọt khắp nơi khi đạt 100 °C.',
    "De l'eau pour des nouilles instantanées", "L'eau des nouilles instantanées fait des bulles partout quand elle atteint 100 °C."),
  S('rice_cooker', 'boil', 'A rice cooker', 'Nồi cơm điện',
    'Water in a rice cooker bubbles and pushes steam out of the hole in the lid.',
    'Nước trong nồi cơm điện sôi và đẩy hơi nước ra khỏi lỗ trên nắp.',
    'Un cuiseur à riz', "L'eau d'un cuiseur à riz bout et pousse de la vapeur par le trou du couvercle."),
  S('hotpot', 'boil', 'A hotpot (lẩu)', 'Nồi lẩu',
    'The soup in a hotpot (lẩu) bubbles hard in the middle of the table.',
    'Nước lẩu sôi sùng sục giữa bàn ăn.',
    'Une fondue chinoise (lẩu)', "Le bouillon d'une fondue chinoise (lẩu) bout à gros bouillons au milieu de la table."),
  // condense
  S('mirror', 'condense', 'A bathroom mirror', 'Gương phòng tắm',
    'The bathroom mirror mists up after a hot shower.',
    'Gương phòng tắm bị mờ hơi nước sau khi tắm nước nóng.',
    'Un miroir de salle de bain', 'Le miroir de la salle de bain se couvre de buée après une douche chaude.'),
  S('iced_coffee', 'condense', 'A glass of iced coffee', 'Cốc cà phê sữa đá',
    'Drops of water form on the outside of a glass of iced coffee (cà phê sữa đá).',
    'Những giọt nước đọng bên ngoài cốc cà phê sữa đá.',
    'Un verre de café glacé', "Des gouttes d'eau se forment sur l'extérieur d'un verre de café glacé (cà phê sữa đá)."),
  S('pot_lid', 'condense', 'The lid of a pot of rice', 'Nắp nồi cơm',
    'Drops of water form on the inside of the lid of a pot of rice.',
    'Những giọt nước đọng ở mặt trong nắp nồi cơm.',
    "Le couvercle d'une marmite de riz", "Des gouttes d'eau se forment à l'intérieur du couvercle d'une marmite de riz."),
  S('dew', 'condense', 'Dew on the grass', 'Sương trên cỏ',
    'Dew forms on the grass in the cool early morning.',
    'Sương đọng trên cỏ vào buổi sáng sớm mát mẻ.',
    "La rosée sur l'herbe", "La rosée se forme sur l'herbe tôt le matin, quand il fait frais."),
  S('glasses', 'condense', 'Glasses after an air-conditioned room', 'Kính sau khi ra khỏi phòng máy lạnh',
    'Your glasses mist up when you walk out of an air-conditioned room into hot, humid air.',
    'Kính của em bị mờ khi em bước ra khỏi phòng máy lạnh vào không khí nóng ẩm.',
    "Des lunettes en sortant d'une pièce climatisée", "Tes lunettes se couvrent de buée quand tu sors d'une pièce climatisée dans l'air chaud et humide."),
  S('bus_window', 'condense', 'An air-conditioned bus window', 'Cửa kính xe buýt có máy lạnh',
    'The windows of an air-conditioned bus are wet on the outside on a humid day.',
    'Cửa kính xe buýt có máy lạnh bị ướt ở mặt ngoài vào ngày trời ẩm.',
    "La vitre d'un bus climatisé", "Les vitres d'un bus climatisé sont mouillées à l'extérieur par une journée humide."),
  S('cold_can', 'condense', 'A cold can from the fridge', 'Lon nước lạnh từ tủ lạnh',
    'A cold can of drink from the fridge gets wet on the outside.',
    'Lon nước lạnh lấy từ tủ lạnh bị ướt ở mặt ngoài.',
    'Une canette froide sortie du frigo', "Une canette de boisson froide sortie du réfrigérateur devient mouillée à l'extérieur."),
];

export const scenarioById = (id) => SCENARIOS.find((s) => s.id === id) || null;

/** A link or a trap, by id (the two share one namespace; the validator proves it). */
export const itemOf = (id) => LINKS[id] || TRAPS[id] || null;
export const textOf = (id, L = 'en') => { const it = itemOf(id); return it ? it[L] || it.en : ''; };
export const isTrap = (id) => !!TRAPS[id];

/** The traps that are a believable mistake for this change (in this role). */
export function trapsFor(change, role = null) {
  return Object.keys(TRAPS).filter((id) => TRAPS[id].fits.includes(change) && (!role || TRAPS[id].role === role));
}

// ------------------------------------------------------------------ the drawing
// A box of particles, 220 × 170. Particles are the SAME size in every state —
// radius 10 × `size`, and `size` is only ever not 1 in the trap picture, which
// draws them bigger (or smaller) because that is the misconception.
//   solid     a regular lattice, touching, resting on the floor
//   solidHot  the same lattice a little more spaced, with vibration marks
//   liquid    touching but irregular, settled at the bottom
//   gas       far apart, with motion streaks
// `spacing` scales the lattice pitch (solid 1, solidHot 1.22); `seed` places
// the liquid and gas particles, so the same box always draws the same way.

export const BOX_W = 220;
export const BOX_H = 170;
export const STATES = ['solid', 'solidHot', 'liquid', 'gas'];
const R0 = 10;
const PAD = 9;
const PART_F = '#6e8fa8';
const PART_S = '#3d6580';
const VIB = '#c25e12';
const STREAK = '#94a3b8';
const N_DENSE = 20;
const N_GAS = 8;

const fx = (n) => n.toFixed(1);

export function stateBoxSvg(state, { spacing, size = 1, seed = 1 } = {}) {
  const rng = rngFrom(seed);
  const R = R0 * size;
  const sw = Math.max(1.4, 2 * size);
  const dot = (x, y) => `<circle cx="${fx(x)}" cy="${fx(y)}" r="${fx(R)}" fill="${PART_F}" stroke="${PART_S}" stroke-width="${fx(sw)}"/>`;
  let body = '';

  if (state === 'solid' || state === 'solidHot') {
    const hot = state === 'solidHot';
    const d = (2 * R + 1) * (spacing ?? (hot ? 1.22 : 1));
    const cols = 5;
    const rows = 4;
    const x0 = BOX_W / 2 - ((cols - 1) * d) / 2;
    const yBottom = BOX_H - PAD - R - (hot ? 3 : 0);
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const jx = hot ? (rng() - 0.5) * 3 : 0;
        const jy = hot ? (rng() - 0.5) * 3 : 0;
        const x = x0 + c * d + jx;
        const y = yBottom - r * d + jy;
        if (hot) {
          const a = R + 3;
          body += `<path d="M ${fx(x - a)} ${fx(y - 4)} q -3.5 4 0 8 M ${fx(x + a)} ${fx(y - 4)} q 3.5 4 0 8" fill="none" stroke="${VIB}" stroke-width="1.6" stroke-linecap="round"/>`;
        }
        body += dot(x, y);
      }
    }
  } else if (state === 'liquid') {
    const step = 2 * R + 0.6;
    const pts = [];
    let y = BOX_H - PAD - R;
    let row = 0;
    while (pts.length < N_DENSE && row < 12) {
      let x = PAD + R + (row % 2 ? R * 0.95 : rng() * R * 0.6);
      while (x <= BOX_W - PAD - R && pts.length < N_DENSE) {
        pts.push([x + (rng() - 0.5) * 1.6, y + (rng() - 0.5) * 2]);
        x += step + rng() * 5;
      }
      y -= step * 0.9 + rng() * 1.5;
      row += 1;
    }
    body = pts.map(([x, y2]) => dot(x, y2)).join('');
  } else {
    // gas: rejection-sample far-apart spots, then a streak behind each one
    // far apart, but never fewer than N_GAS: the gap relaxes if a big-particle
    // trap box cannot fit them all.
    const margin = R + 14;
    const pts = [];
    for (let gap = Math.max(3.6 * R, 40), tries = 0; pts.length < N_GAS && tries < 6000; tries += 1) {
      if (tries > 0 && tries % 1500 === 0) gap *= 0.85;
      const x = margin + rng() * (BOX_W - 2 * margin);
      const y = margin + rng() * (BOX_H - 2 * margin);
      if (pts.every(([px, py]) => Math.hypot(px - x, py - y) >= gap)) pts.push([x, y]);
    }
    for (const [x, y] of pts) {
      const a = rng() * Math.PI * 2;
      const ux = Math.cos(a);
      const uy = Math.sin(a);
      const s0 = R + 3;
      const nx = -uy * 4.5;
      const ny = ux * 4.5;
      body += `<path d="M ${fx(x - ux * s0)} ${fx(y - uy * s0)} L ${fx(x - ux * (s0 + 13))} ${fx(y - uy * (s0 + 13))} M ${fx(x - ux * s0 + nx)} ${fx(y - uy * s0 + ny)} L ${fx(x - ux * (s0 + 8) + nx)} ${fx(y - uy * (s0 + 8) + ny)} M ${fx(x - ux * s0 - nx)} ${fx(y - uy * s0 - ny)} L ${fx(x - ux * (s0 + 8) - nx)} ${fx(y - uy * (s0 + 8) - ny)}" stroke="${STREAK}" stroke-width="2" stroke-linecap="round"/>`;
      body += dot(x, y);
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${BOX_W} ${BOX_H}"><rect x="1" y="1" width="${BOX_W - 2}" height="${BOX_H - 2}" rx="14" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>${body}</svg>`;
}

/** How many particles a box draws (the validator checks the drawing kept them all). */
export const particlesIn = (svg) => (String(svg).match(/<circle/g) || []).length;
export const particlesExpected = (state) => (state === 'gas' ? N_GAS : N_DENSE);

// ------------------------------------------------------------------ rounds

const pickFrom = (rng, list) => list[Math.floor(rng() * list.length)];
const shuffled = (rng, list) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i -= 1) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
/** A stable number from a string, so a deck activity draws the same way every visit. */
export function hashOf(s) {
  let h = 2166136261;
  for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  return h || 1;
}

const roleIndex = (chain, role) => chain.findIndex((id) => LINKS[id]?.role === role);

/** Two traps for a build bank: different texts from the chain and each other, roles mixed when possible. */
function bankTraps(rng, change, forced = []) {
  const chainTexts = new Set(CHAINS[change].map((id) => LINKS[id].en));
  const out = forced.filter((id) => TRAPS[id]);
  const pool = shuffled(rng, trapsFor(change).filter((id) => !chainTexts.has(TRAPS[id].en) && !out.includes(id)));
  while (out.length < 2 && pool.length) {
    const roles = new Set(out.map((id) => TRAPS[id].role));
    const texts = new Set(out.map((id) => TRAPS[id].en));
    const at = pool.findIndex((id) => !roles.has(TRAPS[id].role) && !texts.has(TRAPS[id].en));
    const [id] = pool.splice(at >= 0 ? at : 0, 1);
    if (!texts.has(TRAPS[id].en)) out.push(id);
  }
  return out.slice(0, 2);
}

/** The two wrong replacements a fix round offers: other traps of the same role. */
function fixDistractors(rng, change, role, trap) {
  const right = LINKS[CHAINS[change][roleIndex(CHAINS[change], role)]].en;
  const seen = new Set([right, TRAPS[trap].en]);
  const out = [];
  for (const id of shuffled(rng, trapsFor(change, role))) {
    if (id === trap || seen.has(TRAPS[id].en)) continue;
    seen.add(TRAPS[id].en);
    out.push(id);
    if (out.length === 2) break;
  }
  return out;
}

const SIZE_TRAP = { heating: 1.35, gas: 1.45, cooling: 0.68 };

/** One round of `mode` about `scenario`. Every answer is derived later from it. */
export function makeRound(mode, scenario, rng = rngFrom(), opts = {}) {
  const sc = typeof scenario === 'string' ? scenarioById(scenario) : scenario;
  if (!sc) throw new Error(`unknown scenario "${scenario}"`);
  const change = sc.change;
  const chain = chainFor(change);
  const base = { mode, scenario: sc.id, change };

  if (mode === 'build') {
    const traps = bankTraps(rng, change, opts.traps || []);
    return { ...base, chain, traps, bank: shuffled(rng, [...chain, ...traps]) };
  }
  if (mode === 'fix') {
    let trap = opts.trap && TRAPS[opts.trap] ? opts.trap : null;
    if (!trap) {
      const roles = chain.map((id) => LINKS[id].role);
      trap = pickFrom(rng, trapsFor(change, pickFrom(rng, roles)));
    }
    const role = TRAPS[trap].role;
    const broken = roleIndex(chain, role);
    const shown = chain.map((id, i) => (i === broken ? trap : id));
    const options = shuffled(rng, [chain[broken], ...fixDistractors(rng, change, role, trap)]);
    return { ...base, chain, broken, trap, shown, options };
  }
  if (mode === 'name') return { ...base, heat: CHANGE_INFO[change].heat };
  if (mode === 'picture') {
    const info = CHANGE_INFO[change];
    const seed = () => 1 + Math.floor(rng() * 1e9);
    const heating = isHeating(change);
    const sizeOpt = change === 'expand'
      ? { state: 'solidHot', size: SIZE_TRAP.heating, spacing: 1 }
      : { state: info.after, size: heating ? (info.after === 'gas' ? SIZE_TRAP.gas : SIZE_TRAP.heating) : SIZE_TRAP.cooling };
    const draw = (o) => ({ ...o, svg: stateBoxSvg(o.state, o) });
    const before = draw({ state: info.before, size: 1, seed: seed() });
    const options = shuffled(rng, [
      draw({ id: 'right', state: info.after, size: 1, seed: seed() }),
      draw({ id: 'size', ...sizeOpt, seed: seed() }),
      draw({ id: 'state', state: info.wrongState, size: 1, seed: seed() }),
    ]);
    return { ...base, before, options, heating };
  }
  throw new Error(`unknown Explain It mode "${mode}"`);
}

/** The right answer to a round, derived from it. */
export function answerOf(round) {
  switch (round.mode) {
    case 'build': return { slots: [...round.chain] };
    case 'fix': return { pick: round.broken, replace: round.chain[round.broken] };
    case 'name': return { heat: CHANGE_INFO[round.change].heat, change: round.change };
    case 'picture': return { choice: 'right' };
    default: return null;
  }
}

/** Every wrong answer the round can be given that the marker must reject. */
export function wrongAnswersOf(round) {
  const out = [];
  if (round.mode === 'build') {
    round.chain.forEach((_, i) => {
      for (const t of round.traps) out.push({ slots: round.chain.map((id, j) => (j === i ? t : id)) });
    });
    for (let i = 0; i + 1 < round.chain.length; i += 1) {
      const s = [...round.chain];
      [s[i], s[i + 1]] = [s[i + 1], s[i]];
      out.push({ slots: s });
    }
  } else if (round.mode === 'fix') {
    for (const o of round.options) if (o !== round.chain[round.broken]) out.push({ pick: round.broken, replace: o });
    round.shown.forEach((_, i) => { if (i !== round.broken) out.push({ pick: i, replace: round.chain[round.broken] }); });
  } else if (round.mode === 'name') {
    const right = answerOf(round);
    out.push({ heat: right.heat === 'to' ? 'away' : 'to', change: right.change });
    for (const c of CHANGES) if (c !== right.change) out.push({ heat: right.heat, change: c });
  } else if (round.mode === 'picture') {
    out.push({ choice: 'size' }, { choice: 'state' });
  }
  return out;
}

// ------------------------------------------------------------------ marking

const quote = (id) => ({ en: `“${itemOf(id).en}”`, vn: `“${itemOf(id).vn}”`, fr: `« ${itemOf(id).fr} »` });
const line = (en, vn, fr) => ({ en, vn, fr });
const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/** "The chain always runs …" — said when right links sit in the wrong order. */
function orderRule(chain) {
  return chain.length === 3
    ? line('The order is always: heat energy → how the particles move → what happens to the solid.',
      'Thứ tự luôn là: nhiệt năng → cách các hạt chuyển động → điều xảy ra với chất rắn.',
      "L'ordre est toujours : énergie thermique → comment bougent les particules → ce qui arrive au solide.")
    : line('The order is always: heat energy → how the particles move → the attractive forces → what happens.',
      'Thứ tự luôn là: nhiệt năng → cách các hạt chuyển động → lực hút → điều xảy ra.',
      "L'ordre est toujours : énergie thermique → comment bougent les particules → les forces d'attraction → ce qui se passe.");
}

/** A wrong choice answered by name: a trap's own why. */
const trapLine = (id) => {
  const t = TRAPS[id];
  const q = quote(id);
  return line(`${q.en} ${t.why}`, `${q.vn} ${t.whyVn}`, `${q.fr} ${t.whyFr}`);
};

/** What the size-trap picture gets wrong. */
const sizeWhy = (heating) => (heating ? TRAPS.bigger : TRAPS.smaller);

/**
 * Mark one answer. Returns `{ correct, perPart, explain }`: `perPart` is one
 * boolean per part of the round (a slot, the link tapped and its replacement,
 * the heat and the change, the picture), and `explain` is a list of
 * `{ en, vn, fr }` lines — what was wrong, by name, first.
 */
export function markRound(round, answer = {}) {
  const info = CHANGE_INFO[round.change];
  const explain = [];

  if (round.mode === 'build') {
    const slots = answer.slots || [];
    const perPart = round.chain.map((id, i) => slots[i] === id);
    const chosenTraps = [...new Set(slots.filter((id) => TRAPS[id]))];
    // Each trap answered by name, by the step it sits in (the step shows its text).
    for (const id of chosenTraps) {
      const n = slots.indexOf(id) + 1;
      explain.push(line(`Step ${n}: ${TRAPS[id].why}`, `Bước ${n}: ${TRAPS[id].whyVn}`, `Étape ${n} : ${TRAPS[id].whyFr}`));
    }
    if (perPart.some((ok, i) => !ok && LINKS[slots[i]])) explain.push(orderRule(round.chain));
    return { correct: perPart.every(Boolean), perPart, explain, trapsChosen: chosenTraps };
  }

  if (round.mode === 'fix') {
    const pickOk = answer.pick === round.broken;
    const replaceOk = answer.replace === round.chain[round.broken];
    const n = round.broken + 1;
    if (!pickOk && Number.isInteger(answer.pick)) {
      explain.push(line(`Link ${answer.pick + 1} is fine: it is a true step in explaining ${lower(info.name.en)}. The broken link was link ${n}.`,
        `Mắt xích ${answer.pick + 1} không sai: đó là một bước đúng khi giải thích ${lower(info.name.vn)}. Mắt xích bị hỏng là mắt xích ${n}.`,
        `Le maillon ${answer.pick + 1} est juste : c'est une vraie étape pour expliquer ${info.frThe}. Le maillon cassé était le maillon ${n}.`));
    }
    const t = TRAPS[round.trap];
    explain.push(line(`Link ${n}: ${t.why}`, `Mắt xích ${n}: ${t.whyVn}`, `Maillon ${n} : ${t.whyFr}`));
    if (!replaceOk && TRAPS[answer.replace]) explain.push(trapLine(answer.replace));
    return { correct: pickOk && replaceOk, perPart: [pickOk, replaceOk], explain };
  }

  if (round.mode === 'name') {
    const heatOk = answer.heat === info.heat;
    const changeOk = answer.change === round.change;
    const heating = info.heat === 'to';
    if (!heatOk) {
      explain.push(heating
        ? line(`${info.name.en} is a heating change: heat energy is transferred TO the particles.`, `${info.name.vn} là sự thay đổi do đun nóng: nhiệt năng được truyền ĐẾN các hạt.`, `${cap(info.frThe)} se produit quand on chauffe : de l'énergie thermique est transférée AUX particules.`)
        : line(`${info.name.en} is a cooling change: heat energy is transferred AWAY from the particles.`, `${info.name.vn} là sự thay đổi do làm lạnh: nhiệt năng được truyền RA KHỎI các hạt.`, `${cap(info.frThe)} se produit quand on refroidit : de l'énergie thermique est transférée HORS DES particules.`));
    }
    if (!changeOk && CHANGE_INFO[answer.change]) {
      const other = CHANGE_INFO[answer.change];
      const when = (s) => `${s.split(' — ')[0]}.`;
      explain.push(line(`Not ${lower(other.name.en)}: that is when ${when(other.tell.en)}`, `Không phải ${lower(other.name.vn)}: đó là khi ${when(other.tell.vn)}`, `Ce n'est pas ${other.frThe} : ${other.frThe}, c'est quand ${when(other.tell.fr)}`));
    }
    explain.push(line(`Here ${info.tell.en}`, `Ở đây ${info.tell.vn}`, `Ici, ${info.tell.fr}`));
    return { correct: heatOk && changeOk, perPart: [heatOk, changeOk], explain };
  }

  if (round.mode === 'picture') {
    const ok = answer.choice === 'right';
    if (answer.choice === 'size') {
      const t = sizeWhy(round.heating);
      explain.push(line(`${t.why} Compare one particle before and after.`, `${t.whyVn} Hãy so sánh một hạt trước và sau.`, `${t.whyFr} Compare une particule avant et après.`));
    } else if (answer.choice === 'state') {
      const s = STATE_INFO[info.wrongState];
      explain.push(line(`That box shows ${s.en}. Here ${info.tell.en}`, `Hộp đó cho thấy ${s.vn}. Ở đây ${info.tell.vn}`, `Cette boîte montre ${s.fr}. Ici, ${info.tell.fr}`));
    }
    const right = STATE_INFO[info.after];
    explain.push(line(`The right box shows ${right.en}, and every particle is the same size as before.`,
      `Hộp đúng cho thấy ${right.vn}, và mỗi hạt vẫn có kích thước như trước.`,
      `La bonne boîte montre ${right.fr}, et chaque particule a la même taille qu'avant.`));
    return { correct: ok, perPart: [ok], explain };
  }
  return { correct: false, perPart: [], explain };
}

// ------------------------------------------------------------------ sessions

/**
 * A session: `rounds` rounds cycling through the config's modes. The changes
 * are dealt in shuffled sixes, so ten rounds meet all six changes, and never
 * the same change twice running; each round's scenario is fresh (none twice).
 */
export function makeExplainSession(config, seed = Date.now()) {
  const rng = rngFrom(seed);
  const modes = (config?.modes || []).filter((m) => EXPLAIN_MODES.includes(m));
  if (!modes.length) return [];
  const n = Math.max(1, Math.min(16, Number(config?.rounds) || 10));
  const order = [];
  while (order.length < n) {
    let six = shuffled(rng, CHANGES);
    if (six[0] === order[order.length - 1]) six = [...six.slice(1), six[0]];
    order.push(...six);
  }
  const used = new Set();
  const out = [];
  for (let i = 0; i < n; i += 1) {
    const mode = modes[i % modes.length];
    const fresh = SCENARIOS.filter((s) => s.change === order[i] && !used.has(s.id));
    const sc = pickFrom(rng, fresh.length ? fresh : SCENARIOS.filter((s) => s.change === order[i]));
    used.add(sc.id);
    out.push({ ...makeRound(mode, sc, rng), id: `${mode}-${i + 1}` });
  }
  return out;
}

/** The fixed round a `chain` deck activity shows: seeded by the activity id. */
export function chainActivityRound(activity) {
  const rng = rngFrom(hashOf(activity?.id || 'chain'));
  const ask = activity?.ask === 'fix' ? 'fix' : 'build';
  const forced = [...(activity?.traps || []), ...(activity?.trap && ask === 'build' ? [activity.trap] : [])];
  return makeRound(ask, activity?.scenario, rng, { trap: activity?.trap, traps: forced });
}

// ------------------------------------------------------------------ checkers

/** Problems with the catalogue itself — the same for every unit, so worked out once. */
let CATALOGUE = null;
export function catalogueProblems() {
  if (CATALOGUE) return CATALOGUE;
  const out = [];
  const bi = (o) => o && o.en && o.vn && o.fr;
  for (const id of Object.keys(TRAPS)) if (LINKS[id]) out.push(`"${id}" is both a link and a trap`);
  for (const [id, l] of Object.entries(LINKS)) {
    if (!bi(l)) out.push(`link ${id} needs en, vn and fr`);
    if (!ROLES.includes(l.role)) out.push(`link ${id} has unknown role "${l.role}"`);
  }
  for (const c of CHANGES) {
    const info = CHANGE_INFO[c];
    if (!info || !bi(info.name) || !bi(info.tell) || !info.frThe) out.push(`change ${c} needs a name and a tell in every language, and frThe`);
    const chain = CHAINS[c] || [];
    if (chain.length !== (c === 'expand' ? 3 : 4)) out.push(`chain ${c} has ${chain.length} links`);
    const roles = chain.map((id) => LINKS[id]?.role);
    if (chain.some((id) => !LINKS[id])) out.push(`chain ${c} names a link that does not exist`);
    if (roles.join() !== ROLES.filter((r) => roles.includes(r)).join()) out.push(`chain ${c} is out of order: ${roles.join(' → ')}`);
    const texts = new Set(chain.map((id) => LINKS[id]?.en));
    for (const role of roles) {
      const ts = trapsFor(c, role).filter((id) => !texts.has(TRAPS[id].en));
      if (ts.length < 3) out.push(`${c} / ${role}: ${ts.length} traps — a fix round needs at least 3`);
    }
    for (const id of trapsFor(c)) if (texts.has(TRAPS[id].en)) out.push(`trap ${id} reads the same as a link of the ${c} chain it fits`);
    const n = SCENARIOS.filter((s) => s.change === c).length;
    if (n < 4) out.push(`only ${n} scenarios for ${c} — at least 4`);
  }
  for (const [id, t] of Object.entries(TRAPS)) {
    if (!bi(t) || !t.why || !t.whyVn || !t.whyFr) out.push(`trap ${id} needs en, vn, fr, why, whyVn and whyFr`);
    if (!ROLES.includes(t.role)) out.push(`trap ${id} has unknown role "${t.role}"`);
    if (!(t.fits || []).length || t.fits.some((c) => !CHANGES.includes(c))) out.push(`trap ${id} fits an unknown change`);
  }
  if (SCENARIOS.length < 30) out.push(`only ${SCENARIOS.length} scenarios — at least 30`);
  const ids = new Set();
  for (const s of SCENARIOS) {
    if (ids.has(s.id)) out.push(`duplicate scenario id ${s.id}`);
    ids.add(s.id);
    if (!CHANGES.includes(s.change)) out.push(`scenario ${s.id} has unknown change ${s.change}`);
    if (!s.name || !s.nameVn || !s.nameFr || !s.en || !s.vn || !s.fr) out.push(`scenario ${s.id} needs name, nameVn, nameFr, en, vn and fr`);
  }
  for (const st of STATES) {
    const svg = stateBoxSvg(st, { seed: 7 });
    if (particlesIn(svg) !== particlesExpected(st)) out.push(`stateBoxSvg ${st} drew ${particlesIn(svg)} particles, not ${particlesExpected(st)}`);
  }
  CATALOGUE = out;
  return out;
}

/** Problems with one round: its own answer must pass, every trap must fail. */
export function roundProblems(round, at = round.mode) {
  const out = [];
  const right = markRound(round, answerOf(round));
  if (!right.correct) out.push(`${at}: the round's own answer is marked wrong (${round.scenario})`);
  for (const w of wrongAnswersOf(round)) {
    const m = markRound(round, w);
    if (m.correct) out.push(`${at}: a wrong answer is marked right (${round.scenario}: ${JSON.stringify(w)})`);
    if (!m.explain.length) out.push(`${at}: a wrong answer gets no explanation (${round.scenario})`);
    if (!m.explain.every((l) => l.en && l.vn && l.fr)) out.push(`${at}: a verdict line is missing a language (${round.scenario})`);
  }
  if (round.mode === 'build') {
    if (round.traps.length !== 2) out.push(`${at}: the bank has ${round.traps.length} traps, not 2 (${round.scenario})`);
    if (new Set(round.bank.map((id) => itemOf(id).en)).size !== round.bank.length) out.push(`${at}: two bank cards read the same (${round.scenario})`);
  }
  if (round.mode === 'fix') {
    if (round.options.length !== 3) out.push(`${at}: ${round.options.length} replacements, not 3 (${round.scenario})`);
    if (new Set(round.options.map((id) => itemOf(id).en)).size !== round.options.length) out.push(`${at}: two replacements read the same (${round.scenario})`);
  }
  if (round.mode === 'picture') {
    for (const o of [round.before, ...round.options]) {
      if (particlesIn(o.svg) !== particlesExpected(o.state)) out.push(`${at}: a ${o.state} box drew ${particlesIn(o.svg)} particles (${round.scenario})`);
    }
    if (new Set(round.options.map((o) => o.svg)).size !== 3) out.push(`${at}: two picture options are the same drawing (${round.scenario})`);
  }
  return out;
}

/** Problems with a unit's `explainIt` config (the validator). */
export function checkExplainConfig(cfg) {
  if (!cfg || typeof cfg !== 'object') return ['explainIt must be an object'];
  const out = catalogueProblems().map((p) => `explainIt catalogue: ${p}`);
  if (!cfg.title) out.push('explainIt is missing a title');
  const modes = cfg.modes || [];
  if (!Array.isArray(modes) || !modes.length) out.push('explainIt.modes must list at least one mode');
  for (const m of modes) if (!EXPLAIN_MODES.includes(m)) out.push(`explainIt mode "${m}" — known modes: ${EXPLAIN_MODES.join('/')}`);
  if (cfg.rounds !== undefined && !(Number.isInteger(Number(cfg.rounds)) && Number(cfg.rounds) >= 1 && Number(cfg.rounds) <= 16)) out.push('explainIt.rounds must be a whole number 1–16');
  try {
    const rng = rngFrom(23);
    for (const m of modes.filter((x) => EXPLAIN_MODES.includes(x))) {
      for (let i = 0; i < 60; i += 1) out.push(...roundProblems(makeRound(m, pickFrom(rng, SCENARIOS), rng), `explainIt ${m}`));
      // and every scenario at least once in this mode
      for (const sc of SCENARIOS) out.push(...roundProblems(makeRound(m, sc, rng), `explainIt ${m}`));
    }
    const s = makeExplainSession(cfg, 5);
    if (modes.some((m) => EXPLAIN_MODES.includes(m)) && s.length !== Math.max(1, Math.min(16, Number(cfg.rounds) || 10))) out.push('explainIt session has the wrong number of rounds');
  } catch (e) {
    out.push(`explainIt threw: ${e.message}`);
  }
  return [...new Set(out)];
}

/** Problems with a `chain` deck activity (utils/activity.js prefixes "chain "). */
export function checkChainActivity(activity) {
  const out = [];
  if (!activity || typeof activity !== 'object') return ['activity missing'];
  const ask = activity.ask;
  if (!['build', 'fix'].includes(ask)) out.push(`ask must be build or fix, not "${ask}"`);
  const sc = scenarioById(activity.scenario);
  if (!sc) { out.push(`scenario "${activity.scenario}" is not in SCENARIOS (utils/stateChain.js)`); return out; }
  const named = [...(activity.traps || []), ...(activity.trap ? [activity.trap] : [])];
  for (const id of named) {
    if (!TRAPS[id]) out.push(`trap "${id}" is not in TRAPS`);
    else if (!TRAPS[id].fits.includes(sc.change)) out.push(`trap "${id}" is not a mistake for ${sc.change} (fits ${TRAPS[id].fits.join('/')})`);
  }
  if (activity.traps && activity.traps.length > 2) out.push('a build bank takes at most 2 traps');
  if (out.length) return out;
  try {
    const round = chainActivityRound(activity);
    out.push(...roundProblems(round, activity.id || 'chain'));
  } catch (e) {
    out.push(`threw: ${e.message}`);
  }
  return out;
}
