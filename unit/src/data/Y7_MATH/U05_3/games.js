// src/data/Y7_MATH/U05_3/games.js
// The arcade reward. GAMES is worth 0 XP — it opens with the quiz at 80 XP.
// The level is TRACK_LEVELS.Y7_MATH.U05_3 in unitDifficulty.js ("The Drawing
// Board", tier 3). No Maths Bolt generator: the section's skill is reading a
// scale, which a text card cannot ask.
import { arcadeConfig } from '../../../components/towerdefense/unitDifficulty';

export const games = {
  gameConfig: arcadeConfig('Y7_MATH', 'U05_3'),
};
