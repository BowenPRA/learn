// Year 7 Science · 5.2 Comparing metals and non-metals · "Test it", played by the
// step engine (unit/src/stepPractice).
//
// In the question types of Workbook Exercise 5.2B: the circuit that tests whether a
// material conducts electricity, and true or false about metals and non-metals. Our
// own circuit drawing, statements and rods; nothing copied from the book.
//
// ENGLISH AND FRENCH ONLY: every string the student reads has an …Fr twin.
// Check: checkStepPractice(test, { fr: true }) from unit/src/stepPractice/check.js.
import { circuit } from './pictures.js'

const opt = (id, text, textFr) => ({ id, text, textFr })
const tf = (answer) => ({ type: 'choice', answer, options: [opt('true', 'True', 'Vrai'), opt('false', 'False', 'Faux')] })

const CIRCUIT = circuit(['cell', 'lamp', 'gap'], 'A circuit: a cell at the top, a lamp on the right, and a gap at the bottom between two clips.')
const CIRCUIT_FR = circuit(['pile', 'lampe', 'espace'], 'Un circuit : une pile en haut, une lampe à droite, et un espace en bas entre deux pinces.')

const items = [
  {
    id: 'f1', level: 'focus', inlineSvg: CIRCUIT, inlineSvgFr: CIRCUIT_FR,
    prompt: 'Mr Bowen builds this circuit to find out if a material {{conducts electricity}}. [[How does the test work?]]',
    promptFr: 'M. Bowen monte ce circuit pour savoir si un matériau {{conduit l’électricité}}. [[Comment marche le test ?]]',
    steps: [
      {
        title: 'What goes in the gap?', titleFr: 'Que met-on dans l’espace ?',
        input: {
          type: 'choice', answer: 'material',
          options: [opt('material', 'The material to test', 'Le matériau à tester'), opt('lamp', 'A second lamp', 'Une deuxième lampe'), opt('nothing', 'Nothing', 'Rien')],
        },
        line: 'The material to test goes in the gap, between the two clips.', lineFr: 'Le matériau à tester se place dans l’espace, entre les deux pinces.',
        hint: 'The circuit is broken at the gap. Something must join the two clips.', hintFr: 'Le circuit est coupé à l’espace. Il faut relier les deux pinces.',
      },
      {
        title: 'The lamp lights. What does that show?', titleFr: 'La lampe s’allume. Qu’est-ce que cela montre ?',
        input: {
          type: 'choice', answer: 'conducts',
          options: [opt('conducts', 'The material conducts electricity', 'Le matériau conduit l’électricité'), opt('magnetic', 'The material is magnetic', 'Le matériau est magnétique'), opt('hot', 'The material is hot', 'Le matériau est chaud')],
        },
        line: 'Lamp on: the material conducts electricity.', lineFr: 'Lampe allumée : le matériau conduit l’électricité.',
        hint: 'Electricity must pass through the material to reach the lamp.', hintFr: 'L’électricité doit traverser le matériau pour arriver à la lampe.',
      },
      {
        title: 'A plastic spoon is in the gap.', titleFr: 'Une cuillère en plastique est dans l’espace.',
        sub: 'Does the lamp light?', subFr: 'La lampe s’allume-t-elle ?',
        input: { type: 'choice', answer: 'no', options: [opt('yes', 'Yes', 'Oui'), opt('no', 'No', 'Non')] },
        line: 'Lamp off: plastic does not conduct electricity.', lineFr: 'Lampe éteinte : le plastique ne conduit pas l’électricité.',
        hint: 'Wires are covered in plastic to keep the electricity in.', hintFr: 'Les fils sont recouverts de plastique pour garder l’électricité à l’intérieur.',
      },
    ],
  },
  {
    id: 'f2', level: 'focus',
    prompt: 'Five sentences about metals and non-metals. [[True or false?]]',
    promptFr: 'Cinq phrases sur les métaux et les non-métaux. [[Vrai ou faux ?]]',
    steps: [
      {
        title: 'Every metal is a solid.', titleFr: 'Tous les métaux sont solides.',
        sub: 'At room temperature.', subFr: 'À la température de la pièce.',
        input: tf('false'),
        line: 'False: mercury is a metal, and it is a liquid.', lineFr: 'Faux : le mercure est un métal, et il est liquide.',
        hint: 'Think of the silver liquid in an old thermometer.', hintFr: 'Pense au liquide argenté d’un vieux thermomètre.',
      },
      {
        title: 'Copper conducts heat.', titleFr: 'Le cuivre conduit la chaleur.',
        input: tf('true'),
        line: 'True: metals conduct heat. Cooking pots are made of metal.', lineFr: 'Vrai : les métaux conduisent la chaleur. Les casseroles sont en métal.',
        hint: 'What are cooking pots made of?', hintFr: 'En quoi sont faites les casseroles ?',
      },
      {
        title: 'Sulfur conducts electricity well.', titleFr: 'Le soufre conduit bien l’électricité.',
        input: tf('false'),
        line: 'False: sulfur is a non-metal. It does not conduct electricity.', lineFr: 'Faux : le soufre est un non-métal. Il ne conduit pas l’électricité.',
        hint: 'Sulfur is a non-metal.', hintFr: 'Le soufre est un non-métal.',
      },
      {
        title: 'Only some metals are magnetic.', titleFr: 'Seuls certains métaux sont magnétiques.',
        input: tf('true'),
        line: 'True: iron is magnetic, but copper and aluminium are not.', lineFr: 'Vrai : le fer est magnétique, mais pas le cuivre ni l’aluminium.',
        hint: 'Does a magnet pick up a copper coin?', hintFr: 'Un aimant attire-t-il une pièce en cuivre ?',
      },
      {
        title: 'A solid non-metal bends easily.', titleFr: 'Un non-métal solide se plie facilement.',
        input: tf('false'),
        line: 'False: solid non-metals are brittle. They break.', lineFr: 'Faux : les non-métaux solides sont cassants. Ils se brisent.',
        hint: 'What happens to a stick of charcoal when you bend it?', hintFr: 'Que fait un bâton de charbon de bois quand on le plie ?',
      },
    ],
  },
  {
    id: 'p1', level: 'practice',
    prompt: 'Mr Bowen tests four rods in the circuit: {{iron}}, {{aluminium}}, {{sulfur}} and {{graphite}} (a kind of carbon). The lamp lights for three of them. [[What does the test tell him?]]',
    promptFr: 'M. Bowen teste quatre tiges dans le circuit : {{fer}}, {{aluminium}}, {{soufre}} et {{graphite}} (une sorte de carbone). La lampe s’allume pour trois d’entre elles. [[Que lui apprend le test ?]]',
    steps: [
      {
        title: 'Which rod leaves the lamp off?', titleFr: 'Avec quelle tige la lampe reste-t-elle éteinte ?',
        input: { type: 'choice', answer: 'sulfur', options: [opt('iron', 'Iron', 'Fer'), opt('alu', 'Aluminium', 'Aluminium'), opt('sulfur', 'Sulfur', 'Soufre'), opt('graphite', 'Graphite', 'Graphite')] },
        line: 'Sulfur: the lamp stays off.', lineFr: 'Soufre : la lampe reste éteinte.',
        hint: 'Two rods are metals. One of the others is a special non-metal.', hintFr: 'Deux tiges sont des métaux. Une des autres est un non-métal spécial.',
      },
      {
        key: true,
        title: 'Graphite lights the lamp. So…', titleFr: 'Le graphite allume la lampe. Donc…',
        input: {
          type: 'choice', answer: 'one',
          options: [
            opt('one', 'One non-metal can conduct electricity', 'Un non-métal peut conduire l’électricité'),
            opt('metal', 'Graphite must be a metal', 'Le graphite doit être un métal'),
            opt('wrong', 'The test went wrong', 'Le test a mal marché'),
          ],
        },
        line: 'Graphite is a non-metal that conducts electricity.', lineFr: 'Le graphite est un non-métal qui conduit l’électricité.',
        hint: 'Graphite is carbon, and carbon is a non-metal.', hintFr: 'Le graphite, c’est du carbone, et le carbone est un non-métal.',
        why: 'One test is not enough. Look at more than one property.', whyFr: 'Un seul test ne suffit pas. Regarde plus d’une propriété.',
        slips: [{ value: 'metal', key: 'conducts-so-metal', step: 1, msg: 'Graphite is black, dull and brittle: a non-metal. It is the odd one out.', msgFr: 'Le graphite est noir, terne et cassant : un non-métal. C’est l’exception.' }],
      },
      {
        key: true,
        title: 'Which test tells iron from aluminium?', titleFr: 'Quel test distingue le fer de l’aluminium ?',
        input: { type: 'choice', answer: 'magnet', options: [opt('circuit', 'The circuit', 'Le circuit'), opt('magnet', 'A magnet', 'Un aimant'), opt('shine', 'Looking for a shine', 'Regarder si ça brille')] },
        line: 'A magnet: it pulls iron, not aluminium.', lineFr: 'Un aimant : il attire le fer, pas l’aluminium.',
        hint: 'Both conduct and both are shiny. Which property is different?', hintFr: 'Les deux conduisent et les deux brillent. Quelle propriété est différente ?',
        slips: [{ value: 'circuit', key: 'both-conduct', msg: 'Both are metals, so both light the lamp.', msgFr: 'Les deux sont des métaux, donc les deux allument la lampe.' }],
      },
    ],
  },
]

export default {
  title: 'Test it',
  titleFr: 'Teste-le',
  items,
}
