/**
 * Storyboard (SOLAR_STORY, Y7 Science 3.2) — the evidence and the models.
 * utils/solarStory.js derives the evidence and model rounds from these.
 *
 * A FACT supports the hypothesis (and then `frame` is the step of the story it
 * shows, `link` says how) or seems to contradict it (and then `after` says what
 * scientists think happened). A MODEL has four statements, two strengths and
 * two limitations, each with the one plain sentence that says why.
 */

/** The four frames an evidence round offers: which step does the fact show? */
export const EVIDENCE_FRAMES = ['cloud', 'disc', 'sun', 'planets'];

export const FACTS = {
  orion: {
    verdict: 'supports', frame: 'cloud',
    en: 'We can see new stars forming today, inside clouds of dust and gas such as the Orion Nebula.',
    fr: 'On voit aujourd’hui de nouvelles étoiles se former dans des nuages de poussière et de gaz, comme la nébuleuse d’Orion.',
    link: 'Stars really do form in clouds of dust and gas: the first step of the story.',
    linkFr: 'Les étoiles se forment vraiment dans des nuages de poussière et de gaz : la première étape de l’histoire.',
  },
  hltau: {
    verdict: 'supports', frame: 'disc',
    en: 'Young stars such as HL Tauri have a flat disc of dust round them.',
    fr: 'De jeunes étoiles comme HL Tauri ont un disque plat de poussière autour d’elles.',
    link: 'A flat disc round a young star is the disc step, happening somewhere else today.',
    linkFr: 'Un disque plat autour d’une jeune étoile, c’est l’étape du disque, en train de se passer ailleurs aujourd’hui.',
  },
  rocky: {
    verdict: 'supports', frame: 'planets',
    en: 'The four planets nearest the Sun are small and rocky. The four far out are giants.',
    fr: 'Les quatre planètes les plus proches du Soleil sont petites et rocheuses. Les quatre plus lointaines sont des géantes.',
    link: 'Near the young Sun it was too hot for ice, so only rock and metal clumped. Far out, ice made big cores that pulled in gas.',
    linkFr: 'Près du jeune Soleil, il faisait trop chaud pour la glace : seuls la roche et le métal se sont collés. Plus loin, la glace a fait de gros noyaux qui ont attiré du gaz.',
  },
  sunMass: {
    verdict: 'supports', frame: 'sun',
    en: 'The Sun, in the middle, has 99.8% of all the mass in the Solar System.',
    fr: 'Le Soleil, au centre, a 99.8% de toute la masse du système solaire.',
    link: 'Gravity pulled most of the cloud’s mass into its middle, and that became the Sun.',
    linkFr: 'La gravité a rassemblé presque toute la masse du nuage en son centre, et c’est devenu le Soleil.',
  },
  venus: {
    verdict: 'contradicts',
    en: 'Venus spins on its axis the opposite way to most planets.',
    fr: 'Vénus tourne sur son axe dans le sens opposé à la plupart des planètes.',
    after: 'Scientists think a crash, or the Sun’s pull on its thick air, turned Venus round. Nobody is sure yet.',
    afterFr: 'Les scientifiques pensent qu’une collision, ou l’attraction du Soleil sur son atmosphère épaisse, a retourné Vénus. Personne n’en est encore sûr.',
  },
  uranus: {
    verdict: 'contradicts',
    en: 'Uranus spins on its side.',
    fr: 'Uranus tourne couchée sur le côté.',
    after: 'Scientists think a giant crash knocked Uranus over, long after it formed.',
    afterFr: 'Les scientifiques pensent qu’une énorme collision a renversé Uranus, longtemps après sa formation.',
  },
};

/** How a fact can relate to the hypothesis. Only the first two are ever right. */
export const VERDICTS = {
  supports: { en: 'It supports the hypothesis.', fr: 'Il confirme l’hypothèse.' },
  contradicts: { en: 'It seems to contradict the hypothesis.', fr: 'Il semble contredire l’hypothèse.' },
  provesTrue: { en: 'It proves the hypothesis is true.', fr: 'Il prouve que l’hypothèse est vraie.' },
  provesWrong: { en: 'It proves the hypothesis is wrong.', fr: 'Il prouve que l’hypothèse est fausse.' },
};
export const PROVES_WHY = {
  en: 'One fact cannot prove it either way: nobody was there to observe it. A fact can support a hypothesis, or seem to contradict it.',
  fr: 'Un seul fait ne peut rien prouver : personne n’était là pour l’observer. Un fait peut confirmer une hypothèse, ou sembler la contredire.',
};
export const CONTRADICT_WHY = {
  en: 'One spinning cloud should make every planet spin the same way. This one does not, so it seems to contradict the hypothesis.',
  fr: 'Un seul nuage qui tourne devrait faire tourner toutes les planètes dans le même sens. Celle-ci non, donc le fait semble contredire l’hypothèse.',
};

/** After a fact that seems to contradict: what do scientists do? */
export const ACTS = {
  keep: {
    en: 'Keep the hypothesis, and look for an explanation.', fr: 'Garder l’hypothèse, et chercher une explication.',
  },
  drop: {
    en: 'Throw the hypothesis away.', fr: 'Jeter l’hypothèse.',
    why: 'One odd fact is not enough: most of the evidence still supports it. Remember the cake: first look for an open window.',
    whyFr: 'Un seul fait bizarre ne suffit pas : la plupart des preuves la confirment encore. Souviens-toi du gâteau : cherche d’abord une fenêtre ouverte.',
  },
  ignore: {
    en: 'Say the fact must be wrong.', fr: 'Dire que le fait est forcément faux.',
    why: 'The fact is real: we can measure the spin. Scientists keep the fact, and look for an explanation.',
    whyFr: 'Le fait est réel : on peut mesurer la rotation. Les scientifiques gardent le fait, et cherchent une explication.',
  },
};

export const SORT_BINS = {
  strength: { en: 'Strength', fr: 'Point fort' },
  limitation: { en: 'Limitation', fr: 'Limite' },
};

export const MODELS = {
  dust: {
    en: 'The dust model', fr: 'Le modèle de poussière',
    desc: 'The model in the lesson: 240 dust grains on a screen pull on each other and stick when they touch.',
    descFr: 'Le modèle de la leçon : 240 grains de poussière sur un écran s’attirent et se collent quand ils se touchent.',
    statements: [
      { id: 'd1', kind: 'strength', en: 'It shows millions of years in a few seconds.', fr: 'Il montre des millions d’années en quelques secondes.',
        why: 'Nobody could watch the real cloud: it took millions of years.', whyFr: 'Personne ne pourrait regarder le vrai nuage : il a fallu des millions d’années.' },
      { id: 'd2', kind: 'strength', en: 'The pull between every two grains is worked out, as in a real cloud.', fr: 'L’attraction entre chaque paire de grains est calculée, comme dans un vrai nuage.',
        why: 'Its gravity is calculated, so the clumping really happens in it. Nobody drew the answer in.', whyFr: 'Sa gravité est calculée, donc les amas s’y forment vraiment. Personne n’a dessiné la réponse.' },
      { id: 'd3', kind: 'limitation', en: 'It is flat, but a real cloud is three-dimensional.', fr: 'Il est plat, mais un vrai nuage est en trois dimensions.',
        why: 'A real cloud has depth. The model leaves a whole direction out.', whyFr: 'Un vrai nuage a de la profondeur. Le modèle oublie toute une direction.' },
      { id: 'd4', kind: 'limitation', en: 'It has only 240 grains, and no gas and no heat.', fr: 'Il n’a que 240 grains, et ni gaz ni chaleur.',
        why: 'A real cloud has more grains than anyone could count, and gas, and it heats up.', whyFr: 'Un vrai nuage a plus de grains qu’on ne peut en compter, du gaz, et il chauffe.' },
    ],
  },
  drawing: {
    en: 'The book’s drawing of the Solar System', fr: 'Le dessin du système solaire dans le livre',
    desc: 'Eight planets on eight orbits round the Sun, with arrows.',
    descFr: 'Huit planètes sur huit orbites autour du Soleil, avec des flèches.',
    statements: [
      { id: 'w1', kind: 'strength', en: 'It shows every planet going round the Sun the same way.', fr: 'Il montre toutes les planètes tourner autour du Soleil dans le même sens.',
        why: 'The arrows all point the same way round: a fact we use as evidence.', whyFr: 'Les flèches tournent toutes dans le même sens : un fait qui nous sert de preuve.' },
      { id: 'w2', kind: 'strength', en: 'It shows all eight orbits in one flat plane.', fr: 'Il montre les huit orbites dans un seul plan.',
        why: 'The orbits lie in one flat layer, as they do in space.', whyFr: 'Les orbites sont dans une seule couche plate, comme dans l’espace.' },
      { id: 'w3', kind: 'limitation', en: 'The planets are drawn far too big.', fr: 'Les planètes sont dessinées beaucoup trop grosses.',
        why: 'To scale, a football Sun would have an Earth the size of a pinhead.', whyFr: 'À l’échelle, avec un Soleil-ballon, la Terre aurait la taille d’une tête d’épingle.' },
      { id: 'w4', kind: 'limitation', en: 'The planets are drawn far too close together.', fr: 'Les planètes sont dessinées beaucoup trop près les unes des autres.',
        why: 'To scale, the pinhead Earth would be 24 m from the football Sun.', whyFr: 'À l’échelle, la Terre tête d’épingle serait à 24 m du Soleil-ballon.' },
    ],
  },
};
