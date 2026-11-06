/**
 * Tide Lab (TIDE_LAB) — marking. Every diagnose* takes a round from
 * utils/tideLab.js and the student's answer to one stage, and returns
 * { ok, code, en, fr } (plus `per` for a stage with several parts). A wrong
 * answer gets a named slip (`code`) and one sentence that says why, in English
 * and French. `soft: true` means "not finished yet", never a wrong answer.
 */
import { SLOTS, DAYS, MOONS, VERDICTS, REASONS } from './tideLabData.js';
import { LATER_MIN } from './tideLab.js';

const OK = { ok: true, code: 'ok', en: '', fr: '' };
const slip = (code, en, fr, extra = {}) => ({ ok: false, code, en, fr, ...extra });
const soft = (en, fr) => ({ ok: false, soft: true, code: 'missing', en, fr });
const at = (i) => ({ en: SLOTS[i].en, fr: SLOTS[i].fr });

/** A typed reading: "85", "85 cm", "85,5" → { value, unit }; null if it is not a number. */
export function parseCm(text) {
  const s = String(text ?? '').trim().toLowerCase().replace(/\s+/g, '');
  const unit = /cm$/.test(s);
  const n = s.replace(/cm$/, '').replace(',', '.');
  if (!/^\d+(\.\d+)?$/.test(n)) return null;
  return { value: Number(n), unit };
}

/** A clock time, minutes after midnight → "9:10 a.m." / "9 h 10". */
export function clock(min) {
  const t = ((min % 1440) + 1440) % 1440;
  const h = Math.floor(t / 60);
  const mm = String(t % 60).padStart(2, '0');
  return { en: `${h % 12 === 0 ? 12 : h % 12}:${mm} ${h < 12 ? 'a.m.' : 'p.m.'}`, fr: `${h} h ${mm}` };
}

// ── the pole ────────────────────────────────────────────────────────────────
/** Every named wrong reading of a pole: [code, value]. */
export function poleSlips(m) {
  const { level: L, waves: a } = m.pole;
  const out = [];
  if (m.mark === 'unnumbered') out.push(['below', L - 10], ['above', L + 10], ['count', L - 9]);
  if (m.mark === 'half') out.push(['below', L - 5], ['above', L + 5]);
  if (m.mark === 'waves') out.push(['crest', L + a], ['trough', L - a]);
  out.push(['metres', L / 100]);
  return out;
}

export function diagnosePole(m, text) {
  const p = parseCm(text);
  if (!p) return soft('Type the reading: a number of centimetres.', 'Écris la mesure : un nombre de centimètres.');
  const L = m.pole.level;
  if (p.value === L) {
    return p.unit
      ? { ...OK, en: 'Right. The unit is already in the table’s heading, so the box only needs the number.', fr: 'Juste. L’unité est déjà dans le titre du tableau, donc la case n’a besoin que du nombre.' }
      : OK;
  }
  const hit = poleSlips(m).find(([, v]) => v === p.value);
  const code = hit ? hit[0] : 'other';
  const v = p.value;
  if (code === 'below' && m.mark === 'half') return slip(code, `${v} cm is the mark below the water. The water is halfway between two marks.`, `${v} cm, c’est le trait sous l’eau. L’eau est à mi-chemin entre deux traits.`);
  if (code === 'above' && m.mark === 'half') return slip(code, `${v} cm is the mark above the water. The water is halfway between two marks.`, `${v} cm, c’est le trait au-dessus de l’eau. L’eau est à mi-chemin entre deux traits.`);
  if (code === 'below') return slip(code, `${v} cm is the number below the water. The water is on a mark with no number: count on from ${v}.`, `${v} cm, c’est le nombre sous l’eau. L’eau est sur un trait sans nombre : compte à partir de ${v}.`);
  if (code === 'above') return slip(code, `${v} cm is the number above the water. The water is on a mark with no number, below it.`, `${v} cm, c’est le nombre au-dessus de l’eau. L’eau est sur un trait sans nombre, plus bas.`);
  if (code === 'count') return slip(code, 'Each small mark is 10 cm, not 1 cm.', 'Chaque petit trait vaut 10 cm, pas 1 cm.');
  if (code === 'crest') return slip(code, `${v} cm is the top of the wave. Read the middle, halfway between the top and the bottom.`, `${v} cm, c’est le haut de la vague. Lis le milieu, entre le haut et le bas.`);
  if (code === 'trough') return slip(code, `${v} cm is the bottom of the wave. Read the middle, halfway between the top and the bottom.`, `${v} cm, c’est le bas de la vague. Lis le milieu, entre le haut et le bas.`);
  if (code === 'metres') return slip(code, 'That is in metres. The table is in cm: write the number of centimetres.', 'C’est en mètres. Le tableau est en cm : écris le nombre de centimètres.');
  return slip(code, 'Find the line where the water touches the pole, then count up from the number below it.', 'Trouve la ligne où l’eau touche la perche, puis compte à partir du nombre en dessous.');
}

// ── one day ─────────────────────────────────────────────────────────────────
/** crosses: [cm | null] × 4, one per time. */
export function diagnosePlot(m, crosses) {
  const r = m.day.readings;
  if (!Array.isArray(crosses) || crosses.length !== 4 || crosses.some((v) => v == null)) {
    return soft('Put a cross at every time first.', 'Place d’abord une croix à chaque heure.');
  }
  const per = crosses.map((v, i) => {
    if (v === r[i]) return { i, ok: true, code: 'ok' };
    if (r.some((x, k) => k !== i && x === v)) return { i, ok: false, code: 'swap' };
    if (Math.abs(v - r[i]) === 10) return { i, ok: false, code: 'line' };
    return { i, ok: false, code: 'off' };
  });
  const first = per.find((p) => !p.ok);
  if (!first) return { ...OK, per };
  const t = at(first.i);
  const msg = {
    swap: [`The cross at ${t.en} is at another time’s reading. Each time has its own number in the table.`, `La croix de ${t.fr} est à la mesure d’une autre heure. Chaque heure a son nombre dans le tableau.`],
    line: [`The cross at ${t.en} is one line out. Each line is 10 cm: count up from the number below.`, `La croix de ${t.fr} est décalée d’une ligne. Chaque ligne vaut 10 cm : compte à partir du nombre en dessous.`],
    off: [`The cross at ${t.en} is not at its reading. Find the number on the side, then go across.`, `La croix de ${t.fr} n’est pas à sa mesure. Trouve le nombre sur le côté, puis va tout droit.`],
  }[first.code];
  return slip(first.code, msg[0], msg[1], { per });
}

export function diagnoseInOut(m, dir) {
  if (dir === m.day.dir) return OK;
  const { readings: r, pair: j } = m.day;
  const d = Math.abs(r[j + 1] - r[j]);
  const up = r[j + 1] > r[j];
  return slip('reversed',
    `From ${SLOTS[j].en} to ${SLOTS[j + 1].en} the water went ${up ? 'up' : 'down'} ${d} cm, so the tide was ${up ? 'coming in' : 'going out'}.`,
    `De ${SLOTS[j].fr} à ${SLOTS[j + 1].fr}, l’eau a ${up ? 'monté' : 'baissé'} de ${d} cm, donc la marée ${up ? 'montait' : 'descendait'}.`);
}

export function diagnoseHighest(m, i) {
  if (i === m.day.hi) return OK;
  if (i === m.day.lo) return slip('lowest', `${SLOTS[i].en} is the lowest reading. Look for the biggest number.`, `${SLOTS[i].fr}, c’est la mesure la plus basse. Cherche le plus grand nombre.`);
  if (i === 3) return slip('last', 'The last reading is not always the highest. Compare all four numbers.', 'La dernière mesure n’est pas toujours la plus haute. Compare les quatre nombres.');
  return slip('other', 'Not that one. The highest reading is the biggest number in the table.', 'Pas celle-là. La mesure la plus haute est le plus grand nombre du tableau.');
}

/** A day's change, typed: the highest reading minus the lowest. */
export function changeSlip(r, text) {
  const p = parseCm(text);
  if (!p) return soft('Type the change: a number of centimetres.', 'Écris la variation : un nombre de centimètres.');
  const v = p.value;
  if (v === Math.max(...r) - Math.min(...r)) return OK;
  if (v === Math.abs(r[3] - r[0])) return slip('ends', `${v} cm is the change from the first reading to the last. Use the LOWEST and the HIGHEST reading.`, `${v} cm, c’est la variation de la première à la dernière mesure. Prends la plus BASSE et la plus HAUTE.`);
  if (v === Math.max(...r) || v === Math.min(...r)) return slip('value', `${v} cm is one of the readings. The change is the highest reading minus the lowest.`, `${v} cm, c’est une des mesures. La variation, c’est la plus haute moins la plus basse.`);
  return slip('other', 'Find the highest and the lowest reading, then take one from the other.', 'Trouve la mesure la plus haute et la plus basse, puis soustrais.');
}

export const diagnoseChange = (m, text) => changeSlip(m.day.readings, text);

/** Find them: { hi, lo } slot indexes. */
export function diagnoseFind(m, pick) {
  if (pick?.hi == null || pick?.lo == null) return soft('Tap the highest reading and the lowest reading.', 'Touche la mesure la plus haute et la plus basse.');
  if (pick.hi !== m.day.hi) return slip('nothighest', 'That is not the highest reading: look for the biggest number.', 'Ce n’est pas la mesure la plus haute : cherche le plus grand nombre.');
  if (pick.lo !== m.day.lo) return slip('notlowest', 'That is not the lowest reading: look for the smallest number.', 'Ce n’est pas la mesure la plus basse : cherche le plus petit nombre.');
  return OK;
}

// ── Prediction 1: about 50 minutes later ────────────────────────────────────
export function diagnoseTomorrow(m, min) {
  const t = m.tomorrow.today;
  if (min === t + LATER_MIN) return OK;
  if (min === t) return slip('same', 'Not at the same time: the Moon moves on every day, so high tide comes about 50 minutes later.', 'Pas à la même heure : la Lune avance chaque jour, donc la marée haute arrive environ 50 minutes plus tard.');
  if (min === t - LATER_MIN) return slip('earlier', 'Later, not earlier: the Earth must turn a little MORE to face the Moon again.', 'Plus tard, pas plus tôt : la Terre doit tourner un peu PLUS pour être de nouveau face à la Lune.');
  if (min === t + 720) {
    const c = clock(min);
    return slip('twelve', `${c.en} is tonight’s high tide, about 12 hours after this morning’s. Tomorrow morning’s comes about 50 minutes later than today’s.`, `${c.fr}, c’est la marée haute de ce soir, environ 12 heures après celle du matin. Celle de demain matin arrive environ 50 minutes plus tard qu’aujourd’hui.`);
  }
  return slip('other', 'High tide comes about 50 minutes later every day.', 'La marée haute arrive environ 50 minutes plus tard chaque jour.');
}

/** picks: { [day]: slot } for the asked days. */
export function diagnoseTest(m, picks) {
  const { ask, days } = m.week;
  if (ask.some((d) => picks?.[d] == null)) {
    return soft('Tap the highest dot on each day with a box.', 'Touche le point le plus haut de chaque jour encadré.');
  }
  const per = ask.map((d) => ({ d, ok: picks[d] === days[d].hi, code: picks[d] === days[d].hi ? 'ok' : 'pick' }));
  const first = per.find((p) => !p.ok);
  if (!first) return { ...OK, per };
  const day = DAYS[first.d];
  return slip('pick', `On ${day.long}, that is not the highest reading. Find the dot that is highest up on that day.`, `Le ${day.longFr}, ce n’est pas la mesure la plus haute. Trouve le point le plus haut de ce jour-là.`, { per });
}

// ── Prediction 2: the biggest tides ─────────────────────────────────────────
/** texts: [week 1 change, week 2 change]. */
export function diagnoseChanges(m, texts) {
  const per = m.ask.map((c, w) => ({ w, ...changeSlip(m.weeks[w].days[c].readings, texts?.[w]) }));
  if (per.some((p) => p.soft)) return soft('Type the change for both days.', 'Écris la variation des deux jours.');
  const first = per.find((p) => !p.ok);
  if (!first) return { ...OK, per };
  const day = DAYS[m.ask[first.w]];
  return slip(first.code, `Week ${first.w + 1}, ${day.long}: ${first.en}`, `Semaine ${first.w + 1}, ${day.longFr} : ${first.fr}`, { per });
}

export function diagnoseWeek(m, w) {
  if (w === m.bigWeek) return OK;
  return slip('smaller', `In week ${w + 1} the water hardly goes up and down: that is the week with the SMALLER tides.`, `Pendant la semaine ${w + 1}, l’eau monte et descend à peine : c’est la semaine des PLUS PETITES marées.`);
}

export function diagnoseMoon(m, phase) {
  if (phase === m.phase) return OK;
  if (phase === 'half') return slip('halfmoon', 'The half moon was in the week with the SMALL tides. Look at the other week.', 'La demi-lune était pendant la semaine des PETITES marées. Regarde l’autre semaine.');
  return slip('misread', `Look at the calendar again: that week’s moon is the ${MOONS[m.phase].en.toLowerCase()}.`, `Regarde encore le calendrier : la lune de cette semaine-là, c’est la ${MOONS[m.phase].fr.toLowerCase()}.`);
}

// ── both predictions ────────────────────────────────────────────────────────
export function diagnoseVerdict(m, v) {
  if (v === 'supports') return OK;
  if (v === 'proves') return slip('proves', 'Readings can support a prediction, but they do not prove it: one river in one week is not every river, every week.', 'Des mesures peuvent confirmer une prédiction, mais pas la prouver : une rivière pendant une semaine, ce n’est pas toutes les rivières, toutes les semaines.');
  return slip('contradicts', 'The readings agree with the prediction, so they support it.', 'Les mesures sont d’accord avec la prédiction, donc elles la confirment.');
}

export function diagnoseWhy(m, id) {
  if (id === m.why.right) return OK;
  const trap = REASONS[m.kind].traps.find((t) => t.id === id);
  return trap ? slip(id, trap.why, trap.whyFr) : slip('other', 'Not that one.', 'Pas celle-là.');
}

export const VERDICT_TEXT = VERDICTS;
