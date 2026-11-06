// src/components/towerdefense/unitDifficulty.js
//
// The one place the arcade's per-track and per-unit rules are decided.
//
// Two independent axes:
//
//   ARENA      comes from the TRACK. Every track defends a different map with a
//              different look, so "the Maths game" and "the English game" are
//              visibly different games rather than the same board twice.
//
//   TIER       comes from the UNIT. Later units in a track field tougher waves,
//              fewer lives and (eventually) a restricted armoury, and pay a
//              bigger score multiplier for surviving them.
//
// A unit's games.js calls `arcadeConfig(track, unitId)` and gets the whole
// config; it only needs to pass overrides when it wants to break the pattern.

import { MAP_LAYOUTS, WAVE_MODIFIERS } from './wavePresets';

/** Map + theme + flavour for each track that has the arcade switched on. */
export const TRACK_ARENAS = {
  GED_MATH: {
    mapId: 'WAVE',
    themeId: 'STANDARD',
    mapName: 'Serpentine Valley',
    blurb: 'A long switchback road through open grassland.',
  },
  GED_ENG: {
    mapId: 'SPIRAL',
    themeId: 'NIGHT',
    mapName: 'The Labyrinth',
    blurb: 'A winding night maze that folds back on itself.',
  },
  GED_SCIENCE: {
    mapId: 'CIRCUIT',
    themeId: 'ICE',
    mapName: 'Cryo Lab',
    blurb: 'Coolant channels cut in hard right angles across the lab floor.',
  },
  ACELLUS: {
    mapId: 'SPIRAL',
    themeId: 'STANDARD',
    mapName: 'The Long Road',
    blurb: 'One road that never quite arrives — like an inequality, it keeps going.',
  },
  PRIMARY_TECH: {
    mapId: 'CIRCUIT',
    themeId: 'NIGHT',
    mapName: 'The Motherboard',
    blurb: 'Traces run the board in hard right angles. Hold the lanes and the machine keeps running.',
  },
};

const DEFAULT_ARENA = {
  mapId: 'WAVE',
  themeId: 'STANDARD',
  mapName: 'Serpentine Valley',
  blurb: 'A long switchback road through open grassland.',
};

/**
 * Hand-authored campaigns.
 *
 * Where `TRACK_ARENAS` gives a whole track one map and derives the tier from the
 * unit id, a `TRACK_LEVELS` track instead spells out every unit as its own
 * *level* — a distinct map, theme, difficulty tier and (optionally) an enemy
 * modifier — so the units read as a designed sequence rather than the same board
 * getting quietly tougher. A unit listed here ignores the id-suffix tier and
 * takes the tier written on its level. Tracks with no entry are untouched.
 *
 * Y7 Maths, Unit 1 (Integers), sections 1.1–1.6: the tier climbs 0 → 5 for a
 * clean escalation, while the map and modifier change what *kind* of fight each
 * one is, so consecutive units never feel like a re-run.
 */
export const TRACK_LEVELS = {
  // Acellus Physics. One level per Acellus module; the first opens gently. The
  // spiral is the point for circular motion — a road that goes round and
  // round and is falling toward the middle the whole time.
  PHYSICS: {
    PHY_CIRC: {
      mapId: 'SPIRAL', themeId: 'NIGHT', tier: 1,
      mapName: 'The Orbit',
      blurb: 'Everything here goes round and round, and it is falling toward the centre the whole time. Hold the inside of the curve.',
    },
    // Collisions: two roads that meet head-on, on ice (Anna and Paul). One
    // tier up from the orbit.
    PHY_MOM: {
      mapId: 'JUNCTION', themeId: 'ICE', tier: 2,
      mapName: 'The Crash Junction',
      blurb: 'Two roads meet head-on at the junction, and whatever arrives there shares its momentum. Hold the meeting point.',
    },
    // Rotation: a closed loop that goes round and round, one tier up again.
    // Desert, because a lazy susan and a merry-go-round are summer-fair things.
    PHY_ROT: {
      mapId: 'CIRCUIT', themeId: 'DESERT', tier: 3,
      mapName: 'The Merry-Go-Round',
      blurb: 'The road loops back on itself like a wheel — the further out you build, the more ground each tower turns through. Balance both sides of the loop.',
    },
  },
  // IGCSE Additional Mathematics. AM_3A is the first unit, so it opens on the
  // gentlest board with the full armoury; later chapters climb from here.
  ADD_MATH: {
    AM_3A: {
      mapId: 'JUNCTION', themeId: 'NIGHT', tier: 1,
      mapName: 'The Factor Works',
      blurb: 'Two roads split at the junction — like a cubic splitting into its factors. Cover both, or neither holds.',
    },
    // Chapter 4 steps up to tier 2. The map is the point: a modulus inequality
    // splits the number line into an inside and an outside, and the spiral is
    // the board where holding the middle and holding the edge are two different
    // jobs.
    AM_4A: {
      mapId: 'SPIRAL', themeId: 'DESERT', tier: 2,
      mapName: 'The Absolute Line',
      blurb: 'Distance from the centre is all that counts here — and it is never negative. Hold the inside, or hold both ends.',
    },
    // Cubic sketching stays at tier 2 on a new board: a cubic's path crosses
    // the axis three times and the gauntlet is the map with three choke
    // points, one at each crossing.
    AM_4B: {
      mapId: 'GAUNTLET', themeId: 'NIGHT', tier: 2,
      mapName: 'Three Crossings',
      blurb: 'The road crosses the line three times, and where it only touches, nothing gets through. Know your intercepts.',
    },
    // Chapter 5 steps up to tier 3. The comb's evenly spaced teeth are the
    // power ladder: every lane is the same step along, and every step
    // multiplies what is coming by the base.
    AM_5A: {
      mapId: 'COMB', themeId: 'ICE', tier: 3,
      mapName: 'The Power Ladder',
      blurb: 'Every rung is the same step up, and every step multiplies the wave. Count the rungs, not the enemies.',
    },
    // Chapter 7 stays at tier 3. The circuit is the board that is a closed
    // loop: everything on it is the same distance from the middle, which is
    // the whole of what a circle is.
    AM_7A: {
      mapId: 'CIRCUIT', themeId: 'NIGHT', tier: 3,
      mapName: 'The Ring Road',
      blurb: 'The road runs in a ring, always the same distance from the centre. Hold the middle and everything is one radius away.',
    },
    // Exponential equations stay at tier 3. The junction is the board where the
    // road splits in two, like the two values of y a hidden quadratic gives —
    // and only one branch is real, because a power is never negative.
    AM_5B: {
      mapId: 'JUNCTION', themeId: 'ICE', tier: 3,
      mapName: 'The Fork in the Road',
      blurb: 'The road splits in two, like the two answers a hidden quadratic gives. Only one branch is real: a power is never negative. Guard that one.',
    },
    // Log equations stay at tier 3. The gauntlet is the board of checkpoints:
    // every root that comes down the road is stopped and checked, and one that
    // puts a negative number inside a log does not get through.
    AM_5C: {
      mapId: 'GAUNTLET', themeId: 'STANDARD', tier: 3,
      mapName: 'The Checkpoint',
      blurb: 'Every root that comes down this road is stopped and checked. A negative inside a log does not get through, so hold the gates.',
    },
    // Graphs and inverses stay at tier 3. The wave is the board whose road
    // swings out and runs back alongside itself — a curve and its mirror
    // image, each hugging a line it never reaches.
    AM_5D: {
      mapId: 'WAVE', themeId: 'DESERT', tier: 3,
      mapName: 'The Asymptote',
      blurb: 'The road runs closer and closer to a line it never touches. The enemies bunch up along it: that is where to build.',
    },
  },
  // IGCSE Mathematics (Extended). One level per Wolsey Hall assignment. EM_06
  // opens at tier 1: the student has met the arcade on other tracks, and the
  // junction is the board for this unit — two roads that split and meet again,
  // like the two circles of a Venn diagram, or a bracket and its conjugate.
  EXT_MATH: {
    EM_06: {
      mapId: 'JUNCTION', themeId: 'DESERT', tier: 1,
      mapName: 'The Overlap',
      blurb: 'Two roads cross in the middle. Hold the overlap and you hold both — miss it and neither is covered.',
    },
    // Assignment 07 is two units, and both step up to tier 2. Part A is the
    // comb: every lane is a strip between two lines — a region — and the
    // question is always which side you are on. Part B is the spiral: a road
    // that keeps turning is a run of bearings, navigated at night by compass.
    EM_07A: {
      mapId: 'COMB', themeId: 'STANDARD', tier: 2,
      mapName: 'Between the Lines',
      blurb: 'Every lane is a region between two lines. Know which side you are on — and whether the line itself counts.',
    },
    EM_07B: {
      mapId: 'SPIRAL', themeId: 'NIGHT', tier: 2,
      mapName: 'The Bearing Run',
      blurb: 'The road turns, and turns again. Face north, count clockwise, and hold every corner.',
    },
  },
  // IGCSE Coordinated Science. First unit is a tier-0 introduction — the "lab"
  // ICE theme suits electrolysis. Additive: adding a unit here shifts nothing on
  // any other track. Extend this table (map/theme/tier/waveMod) as units ship.
  COORD_SCI: {
    U04_1: {
      mapId: 'CIRCUIT', themeId: 'ICE', tier: 0,
      mapName: 'The Electrolysis Lab',
      blurb: 'Current runs the coolant channels — hold the line while the cell does its work.',
    },
    // C5.01 is the second unit, so it steps up to tier 1 on a harder board. The
    // DESERT theme is the point: this unit is about heat leaving and entering a
    // system, and the gauntlet is the hottest run on the campaign.
    U05_1: {
      mapId: 'GAUNTLET', themeId: 'DESERT', tier: 1,
      mapName: 'The Furnace Run',
      blurb: 'A long open corridor with nowhere to hide from the heat. Everything you release has to go somewhere.',
    },
    // Biology, chapters B10 and B11 (Wolsey Hall Assignment 10). A reflex arc is
    // a circuit with one way round it; pollen is carried on the wind; and the
    // menstrual cycle is a road that comes back to where it began.
    B10_1: {
      mapId: 'CIRCUIT', themeId: 'NIGHT', tier: 1,
      mapName: 'The Reflex Arc',
      blurb: 'Receptor, sensory, relay, motor, effector — one way round, and no time to think. Hold every junction.',
    },
    B11_1: {
      mapId: 'WAVE', themeId: 'STANDARD', tier: 1,
      mapName: 'The Pollen Drift',
      blurb: 'They come on the wind in their thousands, and most never land. Stop the ones that would.',
    },
    B11_2: {
      mapId: 'SPIRAL', themeId: 'DESERT', tier: 2,
      mapName: 'The Twenty-Eight Days',
      blurb: 'The road turns back on itself and starts again. Know what each day of the cycle brings.',
    },
  },
  // IGCSE Chemistry (Wolsey Hall modules). Hand-authored like every science
  // track: `tierForUnit` cannot parse `M05_2`. Module 5 sits at tier 1 and
  // Module 6 at tier 2, so the campaign climbs with the course.
  IGCSE_CHEM: {
    // Bond energies: every bond broken is paid for before any bond made pays
    // back — a gauntlet where you spend first and earn later.
    M05_2: {
      mapId: 'GAUNTLET', themeId: 'NIGHT', tier: 1,
      mapName: 'The Bond Breaker',
      blurb: 'Energy in first, energy out after. Pay to break the line, then collect when the new one forms.',
    },
    // Rate of reaction: the curve is steepest at the start and flattens to
    // nothing — so does the wave that runs this road.
    M05_3: {
      mapId: 'WAVE', themeId: 'STANDARD', tier: 1,
      mapName: 'The Steepest Minute',
      blurb: 'They come fastest at the start and thin out as the reactants run down. Hold the first minute.',
    },
    // Acids and bases: two roads meet in the middle, and what is left when
    // they cancel is water.
    M06_2: {
      mapId: 'JUNCTION', themeId: 'ICE', tier: 2,
      mapName: 'The Neutral Point',
      blurb: 'Acid down one road, alkali down the other. Where they meet, only the spectators walk away.',
    },
    M06_1: {
      mapId: 'CIRCUIT', themeId: 'ICE', tier: 2,
      mapName: 'The Indicator Line',
      blurb: 'Red on one side, blue on the other. Read the colour before you place a tower.',
    },
    M06_3: {
      mapId: 'COMB', themeId: 'DESERT', tier: 2,
      mapName: 'The Oxide Fields',
      blurb: 'Metals on the left, non-metals on the right — and one lane in the middle that answers to both.',
    },
    M06_4A: {
      mapId: 'SPIRAL', themeId: 'STANDARD', tier: 2,
      mapName: 'The Crystallising Dish',
      blurb: 'Filter, evaporate, cool. The road winds in until only the crystals are left.',
    },
    M06_4B: {
      mapId: 'GAUNTLET', themeId: 'ICE', tier: 2,
      mapName: 'The End-Point',
      blurb: 'One drop too many and it is over. Add slowly, swirl, and stop on the colour change.',
    },
    M06_5: {
      mapId: 'COMB', themeId: 'STANDARD', tier: 2,
      mapName: 'Groups and Periods',
      blurb: 'Eight columns, and every lane behaves like the others in its group.',
    },
    M06_6: {
      mapId: 'WAVE', themeId: 'DESERT', tier: 3,
      mapName: 'Down Group One',
      blurb: 'Each wave reacts harder than the last. By the bottom of the group, nothing is calm.',
    },
    M06_7: {
      mapId: 'JUNCTION', themeId: 'NIGHT', tier: 3,
      mapName: 'The Displacement',
      blurb: 'The more reactive one takes the road, and pushes the other out.',
    },
    M06_8: {
      mapId: 'SPIRAL', themeId: 'NIGHT', tier: 3,
      mapName: 'The Coloured Core',
      blurb: 'Hard, dense and slow to react. Hold the middle of the table.',
    },
  },
  // O Level Physics (Complete Physics chapters). Hand-authored like every
  // science track: `tierForUnit` cannot parse `C09_1`. Chapter 9 climbs from
  // tier 1 (magnets) to tier 2 (motors and induction) with the physics.
  OLEVEL_PHYS: {
    // Magnets and fields: two like poles face each other across the road, and
    // the one place the pull cancels is where the enemy walks.
    C09_1: {
      mapId: 'JUNCTION', themeId: 'NIGHT', tier: 1,
      mapName: 'The Neutral Point',
      blurb: 'Two like poles, one road between them. Where the fields cancel, nothing is pulled either way — hold that spot.',
    },
    // Coils and electromagnets: the road winds round and round like a
    // solenoid, and every extra turn makes the field stronger.
    C09_2: {
      mapId: 'SPIRAL', themeId: 'STANDARD', tier: 1,
      mapName: 'The Solenoid',
      blurb: 'Round and round the coil the road winds. More turns, more current, more pull — switch it on.',
    },
    // Motors and induction: the loop closes on itself like a circuit, and the
    // current flips every half turn to keep the motor going the same way.
    C09_3: {
      mapId: 'CIRCUIT', themeId: 'NIGHT', tier: 2,
      mapName: 'The Split Ring',
      blurb: 'Half a turn, then the current flips. Keep the coil turning the same way, wave after wave.',
    },
  },
  // The standalone Arcade track (see src/views/Arcade.jsx). Its "units" are not
  // lessons — they are the game's own campaign, a designed six-level ladder both
  // cabinets share. Level ids are `ARC_*`, deliberately unlike any lesson unit
  // id, so each level keeps its own per-cabinet leaderboard without colliding
  // with a real unit. The in-game vocab/maths questions are NOT drawn from these
  // levels; they come from what the student is currently studying (see
  // arcade/questionSource.js), which is why no realWords live here.
  ARCADE: {
    ARC_1: {
      mapId: 'WAVE', themeId: 'STANDARD', tier: 0,
      mapName: 'Serpentine Valley',
      blurb: 'A long switchback through open grassland — room to warm up with the full armoury.',
    },
    ARC_2: {
      mapId: 'JUNCTION', themeId: 'DESERT', tier: 1,
      mapName: 'The Crossroads',
      blurb: 'Two roads cross in the dunes. Hold the junction — the stream passes it twice — and you hold the field.',
    },
    ARC_3: {
      mapId: 'SPIRAL', themeId: 'NIGHT', tier: 2, waveMod: 'SWARM',
      mapName: 'The Labyrinth',
      blurb: 'A winding night maze, and it is crawling.',
    },
    ARC_4: {
      mapId: 'CIRCUIT', themeId: 'ICE', tier: 3, waveMod: 'SIEGE',
      mapName: 'Cryo Lab',
      blurb: 'Armored heavies grind down the coolant channels.',
    },
    ARC_5: {
      mapId: 'COMB', themeId: 'STANDARD', tier: 4, waveMod: 'TIDE',
      mapName: 'The Foundry',
      blurb: 'Wave after wave folds through the works, and they never slow down.',
    },
    ARC_6: {
      mapId: 'GAUNTLET', themeId: 'NIGHT', tier: 5, waveMod: 'BOSS',
      mapName: 'The Long March',
      blurb: 'The final march. Queens and broods, the whole way down.',
      bannedTowers: ['NITRO'],
    },
  },
  Y7_MATH: {
    U01_1: {
      mapId: 'WAVE', themeId: 'STANDARD', tier: 0,
      mapName: 'Serpentine Valley',
      blurb: 'A long switchback through open grassland — room to learn the ropes with the full armoury.',
    },
    U01_2: {
      mapId: 'JUNCTION', themeId: 'DESERT', tier: 1,
      mapName: 'The Crossroads',
      blurb: 'Two roads cross in the dunes. Hold the junction — the stream passes it twice — and you hold the field.',
    },
    U01_3: {
      mapId: 'SPIRAL', themeId: 'NIGHT', tier: 2, waveMod: 'SWARM',
      mapName: 'The Labyrinth',
      blurb: 'A winding night maze, and it is crawling.',
    },
    U01_4: {
      mapId: 'CIRCUIT', themeId: 'ICE', tier: 3, waveMod: 'SIEGE',
      mapName: 'Cryo Lab',
      blurb: 'Armored heavies grind down the coolant channels.',
    },
    U01_5: {
      mapId: 'COMB', themeId: 'STANDARD', tier: 4, waveMod: 'TIDE',
      mapName: 'The Foundry',
      blurb: 'Wave after wave folds through the works, and they never slow down.',
    },
    U01_6: {
      mapId: 'GAUNTLET', themeId: 'NIGHT', tier: 5, waveMod: 'BOSS',
      mapName: 'The Long March',
      blurb: 'The final march. Queens and broods, the whole way down.',
      // Tier 5 would also ban SPLASH; keep it. Against a boss rush that spawns
      // swarms of adds, removing crowd-clear makes the finale unwinnable rather
      // than hard — the very trap the difficulty ladder warns about. NITRO only.
      bannedTowers: ['NITRO'],
    },
    // Unit 2 (Expressions) opens a second chapter. It restarts low — a fresh
    // campaign should not begin where the last one peaked — and climbs again.
    U02_1: {
      mapId: 'JUNCTION', themeId: 'STANDARD', tier: 1,
      mapName: 'The Crossroads',
      blurb: 'A new chapter. Two roads cross in open country — hold the junction and you hold the field.',
    },
    U02_2: {
      mapId: 'SPIRAL', themeId: 'DESERT', tier: 2, waveMod: 'SWARM',
      mapName: 'The Sand Maze',
      blurb: 'A winding maze in the dunes, and it is crawling.',
    },
    U02_3: {
      mapId: 'CIRCUIT', themeId: 'NIGHT', tier: 3, waveMod: 'SIEGE',
      mapName: 'The Sorting Yard',
      blurb: 'Every kind in its own basket. Armored heavies grind down the night channels.',
    },
    U02_4: {
      mapId: 'COMB', themeId: 'ICE', tier: 4, waveMod: 'TIDE',
      mapName: 'The Grid Works',
      blurb: 'One box, one multiplication — and wave after wave that never slows down.',
    },
    U02_5: {
      mapId: 'GAUNTLET', themeId: 'DESERT', tier: 5, waveMod: 'BOSS',
      mapName: 'The Long Way Back',
      blurb: 'Undo every step, last one first. Queens and broods, the whole way down.',
      bannedTowers: ['NITRO'],
    },
    // 2.6 came after the chapter's finale was built, so it is an epilogue one
    // step down from it rather than a second boss rush.
    U02_6: {
      mapId: 'WAVE', themeId: 'ICE', tier: 4, waveMod: 'TIDE',
      mapName: 'The Cold Line',
      blurb: 'Less than means left — and colder. Wave after wave along a frozen number line.',
    },
    // Unit 3 (Place value and rounding) is a third chapter: low again, then up.
    U03_1: {
      mapId: 'JUNCTION', themeId: 'ICE', tier: 1,
      mapName: 'The Sliding Lanes',
      blurb: 'A new chapter. Every digit slides one column at a time — hold the crossing while they move.',
    },
    U03_2: {
      mapId: 'SPIRAL', themeId: 'STANDARD', tier: 2, waveMod: 'SWARM',
      mapName: 'The Round Tower',
      blurb: 'A winding climb, and it is crawling. Five or more, and up they come.',
    },
    // Unit 4 (Decimals): a fourth chapter, five sections, low again and up to
    // the boss rush at 4.5.
    U04_1: {
      mapId: 'WAVE', themeId: 'DESERT', tier: 1,
      mapName: 'The Starting Line',
      blurb: 'A new chapter. Fill the gaps with zeros and line them up — fastest first.',
    },
    U04_2: {
      mapId: 'JUNCTION', themeId: 'NIGHT', tier: 2, waveMod: 'SWARM',
      mapName: 'The Point Crossing',
      blurb: 'Every lane lines up on the point. Hold the crossing, and it is crawling.',
    },
    U04_3: {
      mapId: 'CIRCUIT', themeId: 'STANDARD', tier: 3, waveMod: 'SIEGE',
      mapName: 'The Metre Track',
      blurb: 'Take the point out, put it back. Armored heavies grind round the track.',
    },
    U04_4: {
      mapId: 'COMB', themeId: 'DESERT', tier: 4, waveMod: 'TIDE',
      mapName: 'The Bus Station',
      blurb: 'The point goes straight up. Wave after wave, and they never slow down.',
    },
    U04_5: {
      mapId: 'GAUNTLET', themeId: 'ICE', tier: 5, waveMod: 'BOSS',
      mapName: 'The Shortcut',
      blurb: 'There is always an easier way through. Queens and broods, the whole way down.',
      bannedTowers: ['NITRO'],
    },
    // Unit 5 (Angles & constructions), one entry per section:
    // @@U05_1_TD@@
    U05_1: {
      mapId: 'SPIRAL', themeId: 'NIGHT', tier: 1,
      mapName: 'The Full Turn',
      blurb: 'A new chapter. The track goes all the way round — 360°, and not one degree less.',
    },
    // @@U05_2_TD@@
    U05_2: {
      mapId: 'JUNCTION', themeId: 'DESERT', tier: 2, waveMod: 'SWARM',
      mapName: 'The Level Crossing',
      blurb: 'Two tracks that never meet, and a road across them. Hold the crossing while they pour over.',
    },
    // @@U05_3_TD@@
    U05_3: {
      mapId: 'COMB', themeId: 'NIGHT', tier: 3, waveMod: 'SIEGE',
      mapName: 'The Drawing Board',
      blurb: 'Start at 0 on the line, every time. Armored heavies grind down the ruled lanes.',
    },
    // Unit 6 (Collecting data), one entry per section:
    // @@U06_1_TD@@
    // @@U06_2_TD@@
  },
  // Year 7 Science: its own campaign, one level per section, climbing 0 → 5
  // like the Maths one. Cells, then particles.
  Y7_SCI: {
    U01_1: {
      mapId: 'WAVE', themeId: 'STANDARD', tier: 0,
      mapName: 'The Petri Dish',
      blurb: 'Open ground under the microscope — room to learn the ropes.',
    },
    U01_2: {
      mapId: 'JUNCTION', themeId: 'STANDARD', tier: 1,
      mapName: 'The Capillary',
      blurb: 'Two vessels cross. Hold the junction and nothing gets through.',
    },
    U01_3: {
      mapId: 'SPIRAL', themeId: 'NIGHT', tier: 2, waveMod: 'SWARM',
      mapName: 'The Root Hair',
      blurb: 'A winding channel through the dark, and it is crawling.',
    },
    U01_4: {
      mapId: 'CIRCUIT', themeId: 'ICE', tier: 3, waveMod: 'SIEGE',
      mapName: 'The Organ System',
      blurb: 'Armored heavies grind down the channels.',
    },
    U02_1: {
      mapId: 'COMB', themeId: 'DESERT', tier: 4, waveMod: 'TIDE',
      mapName: 'The Particle Lattice',
      blurb: 'Wave after wave through a fixed lattice, and they never slow down.',
    },
    U02_2: {
      mapId: 'GAUNTLET', themeId: 'ICE', tier: 5, waveMod: 'BOSS',
      mapName: 'The Boiling Point',
      blurb: 'The final march through the cold. Queens and broods, the whole way down.',
      bannedTowers: ['NITRO'],
    },
    // 2.5–2.7 (atoms, compounds, mixtures) climb again from the middle of the
    // ladder rather than staying pinned at the top.
    U02_5: {
      mapId: 'CIRCUIT', themeId: 'NIGHT', tier: 3, waveMod: 'SIEGE',
      mapName: 'The Periodic Grid',
      blurb: 'Rows and columns in the dark. Armored heavies grind down the channels.',
    },
    U02_6: {
      mapId: 'COMB', themeId: 'STANDARD', tier: 4, waveMod: 'TIDE',
      mapName: 'The Bonding Works',
      blurb: 'Atoms joined tight — and wave after wave that never slows down.',
    },
    U02_7: {
      mapId: 'GAUNTLET', themeId: 'DESERT', tier: 5, waveMod: 'BOSS',
      mapName: 'The Sulfur Crater',
      blurb: 'Iron and sulfur, stirred then heated. Queens and broods, the whole way down.',
      bannedTowers: ['NITRO'],
    },
    // 2.3, 2.4 and 2.8 were built after 2.5–2.7 (they close Unit 2); they sit
    // in the upper half of the ladder, with 2.8 at the top as the unit's end.
    U02_3: {
      mapId: 'SPIRAL', themeId: 'DESERT', tier: 4, waveMod: 'TIDE',
      mapName: 'The Melting Point',
      blurb: 'Heat in, forces broken — and wave after wave that never slows down.',
    },
    U02_4: {
      mapId: 'JUNCTION', themeId: 'ICE', tier: 4, waveMod: 'SWARM',
      mapName: 'The Watershed',
      blurb: 'Rain from every side runs to one river. Hold the junction.',
    },
    U02_8: {
      mapId: 'GAUNTLET', themeId: 'NIGHT', tier: 5, waveMod: 'BOSS',
      mapName: 'The Acid Lake',
      blurb: 'Both ends of the scale burn. Queens and broods, the whole way down.',
      bannedTowers: ['NITRO'],
    },
    // Unit 3 (Forces and energy) opens a new chapter, low again.
    U03_1: {
      mapId: 'WAVE', themeId: 'NIGHT', tier: 1,
      mapName: 'The Drop Zone',
      blurb: 'A new chapter. Everything falls at the same rate — hold the valley while it lands.',
    },
    // @@SCI_U03_2_TD@@
    U03_2: {
      mapId: 'SPIRAL', themeId: 'NIGHT', tier: 2,
      mapName: 'The Spinning Disc',
      blurb: 'Everything goes round the same way. Hold the centre while the disc turns.',
    },
    // @@SCI_U03_3_TD@@
    U03_3: {
      mapId: 'CIRCUIT', themeId: 'NIGHT', tier: 2, waveMod: 'TIDE',
      mapName: 'The Long Coast',
      blurb: 'Nothing out here slows them down. Hold the loop.',
    },
    // @@SCI_U03_4_TD@@
    U03_4: {
      mapId: 'WAVE', themeId: 'STANDARD', tier: 3, waveMod: 'TIDE',
      mapName: 'High Water',
      blurb: 'Two tides a day, and the next one always comes. Hold the harbour wall.',
    },
    // @@SCI_U03_5_TD@@
    U03_5: {
      mapId: 'CIRCUIT', themeId: 'DESERT', tier: 3,
      mapName: 'The Uphill Bus',
      blurb: 'Eight kinds of energy on one road. Hold the hill.',
    },
    // @@SCI_U03_6_TD@@
    U03_6: {
      mapId: 'CIRCUIT', themeId: 'NIGHT', tier: 4,
      mapName: 'The Power Station',
      blurb: 'Chemical, thermal, kinetic, electrical. Hold every link of the chain.',
    },
    // @@SCI_U03_7_TD@@
    // 3.7 closes Unit 3, as 2.8 closed Unit 2: the top of the chapter's ladder.
    U03_7: {
      mapId: 'GAUNTLET', themeId: 'DESERT', tier: 5, waveMod: 'BOSS',
      mapName: 'The Lost Heat',
      blurb: 'Every wave leaks a little, and none of it comes back. Hold out to the end of the chapter.',
    },
  },
};

/**
 * The difficulty ladder. Index is the tier; a unit is placed on it by
 * `tierForUnit`.
 *
 * `hpMul`/`speedMul` toughen the waves, `rewardMul` tightens the economy and
 * `lives`/`creditMul` set how much slack the student starts with. `scoreMul`
 * exists so a harder unit is worth grinding — the leaderboard is per unit, so
 * it never puts two units in competition with each other.
 *
 * Tower bans arrive late and stay light: banning the crowd-clear towers on top
 * of doubled enemy HP makes the late waves unwinnable rather than hard.
 */
// Balance pass (Y7 feedback: "too hard"). The ladder is gentler across the board:
// more starting lives, a flatter HP curve (top tier 1.68× rather than 1.95×), a
// looser economy, and — crucially — the top tier no longer bans SPLASH. Banning
// the crowd-clear tower on top of scaled-up swarms is exactly the "hard becomes
// unwinnable" trap the notes below warn about, so only the support tower (NITRO)
// is ever taken away, and only from the mid tiers up. scoreMul is untouched: a
// harder unit is still worth more on the leaderboard.
export const DIFFICULTY_TIERS = [
  { label: 'Recruit',   lives: 30, creditMul: 1.25, hpMul: 1.00, speedMul: 1.00, rewardMul: 1.00, scoreMul: 1.00, bannedTowers: [] },
  { label: 'Cadet',     lives: 26, creditMul: 1.15, hpMul: 1.10, speedMul: 1.00, rewardMul: 1.00, scoreMul: 1.15, bannedTowers: [] },
  { label: 'Operative', lives: 24, creditMul: 1.05, hpMul: 1.22, speedMul: 1.00, rewardMul: 1.00, scoreMul: 1.30, bannedTowers: [] },
  { label: 'Specialist',lives: 20, creditMul: 1.00, hpMul: 1.38, speedMul: 1.03, rewardMul: 0.95, scoreMul: 1.50, bannedTowers: ['NITRO'] },
  { label: 'Veteran',   lives: 18, creditMul: 0.95, hpMul: 1.52, speedMul: 1.06, rewardMul: 0.92, scoreMul: 1.75, bannedTowers: ['NITRO'] },
  { label: 'Commander', lives: 16, creditMul: 0.90, hpMul: 1.68, speedMul: 1.08, rewardMul: 0.90, scoreMul: 2.00, bannedTowers: ['NITRO'] },
];

const MAX_TIER = DIFFICULTY_TIERS.length - 1;

/**
 * The arcade campaign's levels, in play order. The view resolves each one's
 * full config with `arcadeConfig('ARCADE', id)`; this list only fixes the order
 * and the level number a student sees.
 */
export const ARCADE_LEVELS = Object.keys(TRACK_LEVELS.ARCADE).map((id, i) => ({
  id,
  level: i + 1,
}));

/**
 * Places a unit on the ladder from its id.
 *
 * Unit ids are `<SUBJECT>_<level><letter>` — MATH_0B, ENG_1C, SCI_0A — where the
 * digit is the course level and the letter is the position inside it. Reading
 * the id keeps the ladder stable: publishing a new unit shifts nothing, unlike
 * deriving the tier from a unit's index in the track listing.
 */
export function tierForUnit(unitId = '') {
  const m = /_(\d)([A-Z])$/i.exec(String(unitId).trim());
  if (!m) return 0;
  const level = Number(m[1]);
  const letter = m[2].toUpperCase().charCodeAt(0) - 65; // A -> 0
  return Math.max(0, Math.min(MAX_TIER, level * 3 + letter));
}

/** The arena a track defends, falling back to the Maths one for tracks with no entry. */
export const arenaForTrack = (track) => TRACK_ARENAS[track] || DEFAULT_ARENA;

/**
 * The full gameConfig for one unit's arcade.
 *
 * `overrides` is a shallow merge on top, so a unit that wants (say) a different
 * map or an extra ban writes only that key in its games.js.
 */
export function arcadeConfig(track, unitId, overrides = {}) {
  const arena = arenaForTrack(track);

  // A hand-authored level (Y7 campaign) wins over the arena/ladder default.
  const level = TRACK_LEVELS[track]?.[unitId] || null;

  // The ladder is opt-in per track. Tracks with no arena entry AND no authored
  // level (Y8, Y9, ESL…) stay on tier 0 — flat, exactly as they played before
  // the ladder existed — unless a unit asks for a tier by hand.
  const laddered = !!level || Object.prototype.hasOwnProperty.call(TRACK_ARENAS, track);
  const tier = overrides.tier ?? level?.tier ?? (laddered ? tierForUnit(unitId) : 0);
  const rules = DIFFICULTY_TIERS[Math.max(0, Math.min(MAX_TIER, tier))];

  const mapId = overrides.mapId || level?.mapId || arena.mapId;
  const themeId = overrides.themeId || level?.themeId || arena.themeId;
  const mapName = overrides.mapName || level?.mapName || arena.mapName;
  const mapBlurb = level?.blurb || arena.blurb;

  // The enemy-composition modifier for this level (see wavePresets). Null on
  // everything that doesn't opt in, so the wave set is the untouched SET_1.
  const waveMod = overrides.waveMod ?? level?.waveMod ?? null;
  const mod = waveMod ? WAVE_MODIFIERS[waveMod] : null;

  return {
    mapId: MAP_LAYOUTS[mapId] ? mapId : DEFAULT_ARENA.mapId,
    themeId,
    mapName,
    mapBlurb,

    tier,
    tierLabel: rules.label,

    lives: rules.lives,
    creditMultiplier: rules.creditMul,
    bannedTowers: level?.bannedTowers || rules.bannedTowers,

    // The composition modifier and the briefing text the arcade hub shows.
    waveMod,
    modifierLabel: mod?.label || null,
    modifierIcon: mod?.icon || null,
    briefing: mod?.blurb || mapBlurb,

    // Handed straight to the engine — see useGameEngine.
    difficulty: {
      hpMul: rules.hpMul,
      speedMul: rules.speedMul,
      rewardMul: rules.rewardMul,
      scoreMul: rules.scoreMul,
    },

    ...overrides,
  };
}
