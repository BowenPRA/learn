// Year 7 Science · 5.2 Comparing metals and non-metals · "Mystery substances",
// played by the step engine (unit/src/stepPractice).
//
// In the question type of Workbook Exercise 5.2C: read what is known about a
// substance, decide whether it is a metal or a non-metal, name it and give a use.
// Six substances of our own (iron, nitrogen, gold, aluminium, chlorine, iodine), with
// their real melting and boiling points; none of the book's six, none of its wording.
// The last one, iodine, is a non-metal that looks a little shiny: one property is
// not enough.
//
// ENGLISH AND FRENCH ONLY: every string the student reads has an …Fr twin.
// Check: checkStepPractice(mystery, { fr: true }) from unit/src/stepPractice/check.js.

const opt = (id, text, textFr) => ({ id, text, textFr })
const KIND = [opt('metal', 'A metal', 'Un métal'), opt('non', 'A non-metal', 'Un non-métal')]

/** One substance: three steps (metal or non-metal, which one, a use). */
const substance = (s) => ({
  id: s.id, level: 'focus', prompt: s.prompt, promptFr: s.promptFr,
  steps: [
    {
      title: `Is substance ${s.letter} a metal?`, titleFr: `La substance ${s.letter} est-elle un métal ?`,
      input: { type: 'choice', answer: s.kind, options: KIND },
      line: s.why, lineFr: s.whyFr,
      hint: s.kindHint, hintFr: s.kindHintFr,
      ...(s.kindSlip ? { slips: [{ value: s.kind === 'metal' ? 'non' : 'metal', key: 'kind', msg: s.kindSlip, msgFr: s.kindSlipFr }] } : null),
    },
    {
      title: `Which substance is ${s.letter}?`, titleFr: `Quelle substance est ${s.letter} ?`,
      input: { type: 'choice', answer: s.name[0], options: s.names },
      line: `Substance ${s.letter} is ${s.name[1]}.`, lineFr: `La substance ${s.letter} est ${s.name[2]}.`,
      hint: s.nameHint, hintFr: s.nameHintFr,
    },
    {
      title: `What is ${s.name[1]} used for?`, titleFr: `À quoi sert ${s.name[2]} ?`,
      input: { type: 'choice', answer: 'use', options: s.uses },
      line: s.useLine, lineFr: s.useLineFr,
      hint: s.useHint, hintFr: s.useHintFr,
    },
  ],
})

const items = [
  substance({
    id: 'a', letter: 'A',
    prompt: 'Substance A is a {{grey, shiny solid}}. A {{magnet pulls it}}. It conducts heat and electricity. It melts at {{1538 °C}}. [[What is it?]]',
    promptFr: 'La substance A est un {{solide gris et brillant}}. Un {{aimant l’attire}}. Elle conduit la chaleur et l’électricité. Elle fond à {{1538 °C}}. [[Qu’est-ce que c’est ?]]',
    kind: 'metal',
    why: 'A metal: shiny, conducts, and has a very high melting point.', whyFr: 'Un métal : brillant, conducteur, avec un point de fusion très élevé.',
    kindHint: 'Shiny, and it conducts electricity.', kindHintFr: 'Brillante, et elle conduit l’électricité.',
    name: ['iron', 'iron', 'le fer'],
    names: [opt('iron', 'Iron', 'Le fer'), opt('copper', 'Copper', 'Le cuivre'), opt('alu', 'Aluminium', 'L’aluminium')],
    nameHint: 'Only one of these is pulled by a magnet.', nameHintFr: 'Un seul de ces trois est attiré par un aimant.',
    uses: [opt('use', 'Nails, bridges and steel', 'Les clous, les ponts et l’acier'), opt('b', 'Balloons that float', 'Les ballons qui flottent'), opt('c', 'Cleaning the water in a pool', 'Nettoyer l’eau d’une piscine')],
    useLine: 'Iron is used for nails, bridges and steel.', useLineFr: 'Le fer sert aux clous, aux ponts et à l’acier.',
    useHint: 'It is strong and hard.', useHintFr: 'Il est solide et dur.',
  }),
  substance({
    id: 'b', letter: 'B',
    prompt: 'Substance B is a {{gas with no colour}}. It boils at {{−196 °C}}. It does {{not conduct}} electricity. Most of the air is made of it. [[What is it?]]',
    promptFr: 'La substance B est un {{gaz sans couleur}}. Elle bout à {{−196 °C}}. Elle {{ne conduit pas}} l’électricité. L’air en est surtout fait. [[Qu’est-ce que c’est ?]]',
    kind: 'non',
    why: 'A non-metal: a gas that does not conduct, with a very low boiling point.', whyFr: 'Un non-métal : un gaz qui ne conduit pas, avec un point d’ébullition très bas.',
    kindHint: 'It is a gas, and it does not conduct.', kindHintFr: 'C’est un gaz, et elle ne conduit pas.',
    name: ['nitrogen', 'nitrogen', 'l’azote'],
    names: [opt('oxygen', 'Oxygen', 'L’oxygène'), opt('nitrogen', 'Nitrogen', 'L’azote'), opt('helium', 'Helium', 'L’hélium')],
    nameHint: 'About four fifths of the air is this gas.', nameHintFr: 'Environ quatre cinquièmes de l’air sont ce gaz.',
    uses: [opt('a', 'Electric wires', 'Les fils électriques'), opt('use', 'Keeping food fresh in its packet', 'Garder les aliments frais dans leur sachet'), opt('c', 'Jewellery', 'Les bijoux')],
    useLine: 'Nitrogen fills food packets to keep the food fresh.', useLineFr: 'L’azote remplit les sachets pour garder les aliments frais.',
    useHint: 'A gas cannot be a wire or a ring.', useHintFr: 'Un gaz ne peut pas être un fil ni une bague.',
  }),
  substance({
    id: 'c', letter: 'C',
    prompt: 'Substance C is a {{yellow, shiny solid}}. It {{never goes dull}}, even after hundreds of years. It conducts electricity. It melts at {{1064 °C}}. [[What is it?]]',
    promptFr: 'La substance C est un {{solide jaune et brillant}}. Elle {{ne ternit jamais}}, même après des centaines d’années. Elle conduit l’électricité. Elle fond à {{1064 °C}}. [[Qu’est-ce que c’est ?]]',
    kind: 'metal',
    why: 'A metal: shiny, conducts, and has a high melting point.', whyFr: 'Un métal : brillant, conducteur, avec un point de fusion élevé.',
    kindHint: 'Sulfur is yellow too, but it is dull and does not conduct.', kindHintFr: 'Le soufre est jaune aussi, mais il est terne et ne conduit pas.',
    kindSlip: 'Yellow does not make it a non-metal. It is shiny and it conducts.', kindSlipFr: 'Le jaune n’en fait pas un non-métal. Elle brille et elle conduit.',
    name: ['gold', 'gold', 'l’or'],
    names: [opt('sulfur', 'Sulfur', 'Le soufre'), opt('iron', 'Iron', 'Le fer'), opt('gold', 'Gold', 'L’or')],
    nameHint: 'Iron goes dull and rusty. This metal stays shiny.', nameHintFr: 'Le fer ternit et rouille. Ce métal reste brillant.',
    uses: [opt('use', 'Jewellery', 'Les bijoux'), opt('b', 'Filling balloons', 'Gonfler des ballons'), opt('c', 'Bridges', 'Les ponts')],
    useLine: 'Gold is used for jewellery: it stays shiny.', useLineFr: 'L’or sert aux bijoux : il reste brillant.',
    useHint: 'People wear it.', useHintFr: 'On le porte sur soi.',
  }),
  substance({
    id: 'd', letter: 'D',
    prompt: 'Substance D is a {{silver, shiny solid}}. It is {{light}} for its size and a magnet does {{not}} pull it. It conducts heat well. It melts at {{660 °C}}. [[What is it?]]',
    promptFr: 'La substance D est un {{solide argenté et brillant}}. Elle est {{légère}} pour sa taille et un aimant ne l’attire {{pas}}. Elle conduit bien la chaleur. Elle fond à {{660 °C}}. [[Qu’est-ce que c’est ?]]',
    kind: 'metal',
    why: 'A metal: shiny and a good conductor of heat. Not every metal is magnetic.', whyFr: 'Un métal : brillant et bon conducteur de chaleur. Tous les métaux ne sont pas magnétiques.',
    kindHint: 'Only some metals are magnetic.', kindHintFr: 'Seuls certains métaux sont magnétiques.',
    kindSlip: 'Not magnetic does not mean non-metal. It is shiny and conducts heat.', kindSlipFr: 'Non magnétique ne veut pas dire non-métal. Elle brille et conduit la chaleur.',
    name: ['alu', 'aluminium', 'l’aluminium'],
    names: [opt('iron', 'Iron', 'Le fer'), opt('alu', 'Aluminium', 'L’aluminium'), opt('gold', 'Gold', 'L’or')],
    nameHint: 'Iron is magnetic. Gold is yellow and heavy.', nameHintFr: 'Le fer est magnétique. L’or est jaune et lourd.',
    uses: [opt('a', 'Magnets', 'Les aimants'), opt('b', 'Killing germs in water', 'Tuer les microbes dans l’eau'), opt('use', 'Drinks cans and kitchen foil', 'Les canettes et le papier d’aluminium')],
    useLine: 'Aluminium is used for drinks cans and kitchen foil.', useLineFr: 'L’aluminium sert aux canettes et au papier d’aluminium.',
    useHint: 'It is light and easy to press thin.', useHintFr: 'Il est léger et facile à aplatir.',
  }),
  substance({
    id: 'e', letter: 'E',
    prompt: 'Substance E is a {{yellow-green gas}}. It is {{toxic}}. It boils at {{−34 °C}}. It does {{not conduct}} electricity. [[What is it?]]',
    promptFr: 'La substance E est un {{gaz jaune-vert}}. Elle est {{toxique}}. Elle bout à {{−34 °C}}. Elle {{ne conduit pas}} l’électricité. [[Qu’est-ce que c’est ?]]',
    kind: 'non',
    why: 'A non-metal: a gas that does not conduct.', whyFr: 'Un non-métal : un gaz qui ne conduit pas.',
    kindHint: 'It is a gas, and it does not conduct.', kindHintFr: 'C’est un gaz, et elle ne conduit pas.',
    name: ['chlorine', 'chlorine', 'le chlore'],
    names: [opt('chlorine', 'Chlorine', 'Le chlore'), opt('nitrogen', 'Nitrogen', 'L’azote'), opt('oxygen', 'Oxygen', 'L’oxygène')],
    nameHint: 'Nitrogen and oxygen have no colour, and we breathe them.', nameHintFr: 'L’azote et l’oxygène n’ont pas de couleur, et nous les respirons.',
    uses: [opt('a', 'Cooking pots', 'Les casseroles'), opt('use', 'Killing germs in swimming pool water', 'Tuer les microbes dans l’eau des piscines'), opt('c', 'Coins', 'Les pièces de monnaie')],
    useLine: 'Chlorine kills germs in swimming pool water.', useLineFr: 'Le chlore tue les microbes dans l’eau des piscines.',
    useHint: 'You can smell it at the pool.', useHintFr: 'On le sent à la piscine.',
  }),
  substance({
    id: 'f', letter: 'F',
    prompt: 'Substance F is a {{dark grey solid}} that looks a little shiny. It is {{brittle}} and does {{not conduct}} electricity. It melts at only {{114 °C}}. [[What is it?]]',
    promptFr: 'La substance F est un {{solide gris foncé}} un peu brillant. Elle est {{cassante}} et {{ne conduit pas}} l’électricité. Elle fond à seulement {{114 °C}}. [[Qu’est-ce que c’est ?]]',
    kind: 'non',
    why: 'A non-metal: brittle, does not conduct, low melting point. The shine is the odd one out.', whyFr: 'Un non-métal : cassant, non conducteur, point de fusion bas. L’éclat est l’exception.',
    kindHint: 'Count the properties: three of the four point one way.', kindHintFr: 'Compte les propriétés : trois sur quatre vont dans le même sens.',
    kindSlip: 'A little shine is not enough. It is brittle, does not conduct and melts at a low temperature.', kindSlipFr: 'Un peu d’éclat ne suffit pas. Elle est cassante, ne conduit pas et fond à basse température.',
    name: ['iodine', 'iodine', 'l’iode'],
    names: [opt('iron', 'Iron', 'Le fer'), opt('iodine', 'Iodine', 'L’iode'), opt('alu', 'Aluminium', 'L’aluminium')],
    nameHint: 'The other two are metals.', nameHintFr: 'Les deux autres sont des métaux.',
    uses: [opt('use', 'Cleaning a cut, to kill germs', 'Nettoyer une coupure, pour tuer les microbes'), opt('b', 'Electric wires', 'Les fils électriques'), opt('c', 'Drinks cans', 'Les canettes')],
    useLine: 'Iodine is used to clean a cut and kill germs.', useLineFr: 'L’iode sert à nettoyer une coupure et à tuer les microbes.',
    useHint: 'It cannot be a wire: it does not conduct.', useHintFr: 'Ce ne peut pas être un fil : elle ne conduit pas.',
  }),
]

export default {
  title: 'Mystery substances',
  titleFr: 'Substances mystère',
  items,
}
