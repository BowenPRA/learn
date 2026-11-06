// src/data/Y7_SCI/U03_4/assessment.js
// Eight questions, one sitting, ten minutes. 1 why a harbour cannot be used at
// low tide (the book's page 100), 2 the deepest water from an average and a
// range (Question 6 with new numbers), 3 the far side, 4 six hours from high to
// low, 5 why 50 minutes later, 6 why the Moon beats the Sun, 7 a week after full
// moon (transfer), 8 a river's four readings (the lab). Every distractor is a
// misconception the unit names: the whole range added, the Moon's side only,
// the Earth slowing down, the Sun's pull, a full moon pulling harder, the first
// minus the last. No item copies a deck check, Tide Lab or the Questions.
// Correct letters: C A D B A C B D.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_harbour',
      type: 'mcq',
      title: '1. Some harbours cannot be used at low tide. Why not?',
      options: [
        { val: 'A', text: 'A. At low tide the water is too salty.' },
        { val: 'B', text: 'B. Boats cannot float when the tide is going out.' },
        { val: 'C', text: 'C. The water is not deep enough: boats would hit the bottom or sit on the mud.' },
        { val: 'D', text: 'D. At low tide the Moon pulls the boats out to sea.' },
      ],
      correct: 'C',
      expEn: 'At low tide the water is **shallow**: a boat would touch the bottom, like Mr Bowen’s boat left hanging from the wall. The salt does not change with the tide (A), boats float whichever way the tide is going (B), and the Moon pulls the water, not the boats (D).',
      expFr: 'À marée basse, l’eau est **peu profonde** : un bateau toucherait le fond, comme le bateau de M. Bowen resté pendu au mur. Le sel ne change pas avec la marée (A), les bateaux flottent que la marée monte ou descende (B), et la Lune tire l’eau, pas les bateaux (D).',
    },
    {
      id: 'a2_deepest',
      type: 'mcq',
      title: '2. At a harbour, the average depth of the water is 8.0 m and the tidal range is 3.0 m. How deep is the water at high tide?',
      options: [
        { val: 'A', text: 'A. 9.5 m' },
        { val: 'B', text: 'B. 11.0 m' },
        { val: 'C', text: 'C. 6.5 m' },
        { val: 'D', text: 'D. 5.0 m' },
      ],
      correct: 'A',
      expEn: 'The range is shared: the water goes **1.5 m above** the average and 1.5 m below. 8.0 + 1.5 = **9.5 m**. 11.0 m adds the whole range (B); 6.5 m is the depth at low tide (C); 5.0 m is 8.0 − 3.0 (D).',
      expFr: 'Le marnage se partage : l’eau monte de **1.5 m au-dessus** de la moyenne et descend de 1.5 m en dessous. 8.0 + 1.5 = **9.5 m**. 11.0 m ajoute tout le marnage (B) ; 6.5 m est la profondeur à marée basse (C) ; 5.0 m, c’est 8.0 − 3.0 (D).',
    },
    {
      id: 'a3_far_side',
      type: 'mcq',
      title: '3. A harbour is on the side of the Earth facing AWAY from the Moon. What is the tide there?',
      options: [
        { val: 'A', text: 'A. Low tide: the Moon pulls the water to the other side.' },
        { val: 'B', text: 'B. Halfway between high tide and low tide.' },
        { val: 'C', text: 'C. No tide: the Moon’s pull cannot reach it.' },
        { val: 'D', text: 'D. High tide: there is a bulge on the far side too.' },
      ],
      correct: 'D',
      expEn: 'The Moon stretches the Earth, so the water bulges on **both** sides: the far side has a **high tide** too. The low tides are at right angles to the Moon (A, B), and the Moon’s gravity reaches the whole Earth (C).',
      expFr: 'La Lune étire la Terre, donc l’eau fait une bosse des **deux** côtés : le côté éloigné a aussi une **marée haute**. Les marées basses sont à angle droit par rapport à la Lune (A, B), et la gravité de la Lune atteint toute la Terre (C).',
    },
    {
      id: 'a4_next_low',
      type: 'mcq',
      title: '4. High tide at a harbour is at 3 a.m. At about what time is the next low tide?',
      options: [
        { val: 'A', text: 'A. About 3 p.m.' },
        { val: 'B', text: 'B. About 9 a.m.' },
        { val: 'C', text: 'C. About 4 a.m.' },
        { val: 'D', text: 'D. About 3:50 a.m.' },
      ],
      correct: 'B',
      expEn: 'From high tide to low tide takes about **6 hours** (a quarter of a turn of the Earth), so about 9 a.m. About 3 p.m. is the next **high** tide, 12 hours later (A). One hour (C) is far too short, and 50 minutes later (D) is how much later tomorrow’s high tide comes.',
      expFr: 'De la marée haute à la marée basse, il faut environ **6 heures** (un quart de tour de la Terre), donc vers 9 h. Vers 15 h, c’est la marée **haute** suivante, 12 heures plus tard (A). Une heure (C), c’est beaucoup trop court, et 50 minutes (D), c’est le retard de la marée haute du lendemain.',
    },
    {
      id: 'a5_later',
      type: 'mcq',
      title: '5. Why does high tide come about 50 minutes later each day?',
      options: [
        { val: 'A', text: 'A. The Moon moves on along its orbit, so the Earth must turn a little more to face it again.' },
        { val: 'B', text: 'B. The Earth spins a little more slowly every day.' },
        { val: 'C', text: 'C. The Sun pulls the water back a little more every day.' },
        { val: 'D', text: 'D. The oceans get a little deeper every day.' },
      ],
      correct: 'A',
      expEn: 'The Moon goes round the Earth once in about 29 days, the same way as the Earth spins. After one turn the harbour has to turn **a little more** to face the Moon: about 50 minutes. The Earth still turns once every 24 hours (B), the Sun does not make the tide late (C), and the oceans do not get deeper (D).',
      expFr: 'La Lune fait le tour de la Terre en environ 29 jours, dans le même sens que la Terre tourne. Après un tour, le port doit tourner **un peu plus** pour être face à la Lune : environ 50 minutes. La Terre fait toujours un tour en 24 heures (B), le Soleil ne retarde pas la marée (C), et les océans ne deviennent pas plus profonds (D).',
    },
    {
      id: 'a6_sun_moon',
      type: 'mcq',
      title: '6. The Sun pulls on the Earth much harder than the Moon does. Why does the Moon still make bigger tides?',
      options: [
        { val: 'A', text: 'A. The Moon is made of rock, and the Sun is made of gas.' },
        { val: 'B', text: 'B. The Moon is bigger than the Sun.' },
        { val: 'C', text: 'C. The Moon is much closer, so it stretches the Earth more.' },
        { val: 'D', text: 'D. The Sun only pulls on the Earth in the daytime.' },
      ],
      correct: 'C',
      expEn: 'Tides come from the **stretch**: the difference between the pull on the near side and on the far side. The Sun is 390 times further away, so its pull is almost the same on both sides, and it stretches the Earth less. What things are made of does not decide it (A); the Moon is much smaller than the Sun (B); and gravity pulls all the time (D).',
      expFr: 'Les marées viennent de l’**étirement** : la différence entre l’attraction sur le côté proche et sur le côté éloigné. Le Soleil est 390 fois plus loin, donc il tire presque pareil des deux côtés, et il étire moins la Terre. La matière ne décide pas (A) ; la Lune est bien plus petite que le Soleil (B) ; et la gravité tire tout le temps (D).',
    },
    {
      id: 'a7_week_later',
      type: 'mcq',
      title: '7. At full moon, the tidal range at a harbour is 5 m. One week later it is half moon. What will the tidal range be like then?',
      options: [
        { val: 'A', text: 'A. Bigger than 5 m' },
        { val: 'B', text: 'B. Smaller than 5 m' },
        { val: 'C', text: 'C. The same: 5 m' },
        { val: 'D', text: 'D. Zero: there are no tides at half moon' },
      ],
      correct: 'B',
      expEn: 'At full moon the Sun, the Moon and the Earth are in a line, so their tides add: the **biggest** range. At half moon they are at right angles, so the range is **smaller** — but the Moon still makes tides (D). It changes through the month (C), and it is biggest at full and new moon, not half moon (A).',
      expFr: 'À la pleine lune, le Soleil, la Lune et la Terre sont alignés, donc leurs marées s’ajoutent : le **plus grand** marnage. À la demi-lune, ils sont à angle droit, donc le marnage est **plus petit** — mais la Lune fait toujours des marées (D). Il change au cours du mois (C), et il est le plus grand à la pleine et à la nouvelle lune, pas à la demi-lune (A).',
    },
    {
      id: 'a8_river',
      type: 'mcq',
      title: '8. A river is read at 8:30, 10:30, 12:30 and 2:30. The water levels are 140 cm, 115 cm, 75 cm and 50 cm. Which sentence is right?',
      options: [
        { val: 'A', text: 'A. The tide is coming in. The water changed by 90 cm.' },
        { val: 'B', text: 'B. The tide is going out. The water changed by 65 cm.' },
        { val: 'C', text: 'C. High tide was at 2:30.' },
        { val: 'D', text: 'D. The tide is going out. The water changed by 90 cm.' },
      ],
      correct: 'D',
      expEn: 'The level goes **down** all day, so the tide is **going out**, and the change is the highest minus the lowest: 140 − 50 = **90 cm**. Coming in would be going up (A); 65 cm is 115 − 50, which leaves out the highest reading (B); and 2:30 has the lowest reading, not the highest (C).',
      expFr: 'Le niveau **baisse** toute la journée, donc la marée **descend**, et la variation est la plus haute moins la plus basse : 140 − 50 = **90 cm**. Monter, ce serait augmenter (A) ; 65 cm, c’est 115 − 50, sans la mesure la plus haute (B) ; et 14 h 30 a la mesure la plus basse, pas la plus haute (C).',
    },
  ],
};
