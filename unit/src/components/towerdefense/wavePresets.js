// src/components/towerdefense/wavePresets.js

export const MAP_LAYOUTS = {
  WAVE: {
    rows: 10,
    cols: 15,
    path: [
      [2, 0], [2, 3], [7, 3], [7, 7], [2, 7], [2, 11], [7, 11], [7, 14]
    ]
  },
  STRAIGHT: {
    rows: 10,
    cols: 15,
    path: [
      [5, 0], [5, 14]
    ]
  },
  SPIRAL: {
    rows: 10,
    cols: 15,
    path: [
      [1, 0], [1, 13], [8, 13], [8, 2], [3, 2],
      [3, 11], [6, 11], [6, 4], [4, 4], [4, 9], [5, 9]
    ]
  },
  // Enters from the top edge and drops out of the bottom, so the two ends sit
  // far apart and towers placed for the entrance cannot also cover the exit.
  CIRCUIT: {
    rows: 10,
    cols: 15,
    path: [
      [0, 1], [5, 1], [5, 5], [1, 5], [1, 9], [8, 9], [8, 4], [9, 4]
    ]
  },

  // Two long runs cross near (5,3): a road down col 3 and a road along row 5
  // share that corner, so a single well-placed cluster there is hit by the enemy
  // stream twice. Rewards holding the junction over spreading thin.
  JUNCTION: {
    rows: 10,
    cols: 15,
    path: [
      [5, 0], [5, 7], [1, 7], [1, 3], [8, 3], [8, 11], [4, 11], [4, 14]
    ]
  },

  // A comb: three long horizontal runs stacked rows 1 / 5 / 8, linked at the
  // ends. A tower parked mid-board on the linking columns covers three lanes of
  // road at once, so density of coverage beats raw range here.
  COMB: {
    rows: 10,
    cols: 15,
    path: [
      [1, 0], [1, 12], [5, 12], [5, 2], [8, 2], [8, 13], [9, 13]
    ]
  },

  // The longest road on the grid — five folded horizontal runs. Maximum tower
  // dwell time, which is the point: the boss-rush finale needs every second of
  // fire it can get on a queen before she reaches the end.
  GAUNTLET: {
    rows: 10,
    cols: 15,
    path: [
      [0, 1], [0, 13], [2, 13], [2, 1], [4, 1], [4, 13],
      [6, 13], [6, 1], [8, 1], [8, 13], [9, 13]
    ]
  }
};

// =====================================================================
// Wave modifiers
//
// The 50-wave SET_1 is the same for everyone; a modifier reshapes the ENEMY
// COMPOSITION of that set so a level feels like a different *kind* of fight
// rather than just a bigger-numbers version of the same one. Each modifier
// scales the count and/or spawn interval of specific enemy types. `buildWaveSet`
// applies it to a fresh copy; with no modifier it returns SET_1 untouched, so
// every level and track that doesn't opt in is completely unaffected.
// =====================================================================
// A modifier changes the KIND of fight, not its raw magnitude — the tier alone
// sets how hard a unit is, so these are tuned to keep the wave-10 HP pressure
// roughly in line with an unmodified wave at the same tier (verified in the
// balance model). Over-inflating counts here is what made unit 1.4 spike harder
// than 1.5; keep additions modest and let the flavour do the work.
export const WAVE_MODIFIERS = {
  SWARM: {
    label: 'Swarm',
    icon: '🐜',
    blurb: 'Light infantry floods the road. Splash, chain and frost towers earn their keep.',
    // More bodies, but ants are cheap HP — this tests crowd-clear, not raw tonnage.
    scale: {
      ANT:  { count: 1.6, interval: 0.65 },
      WASP: { count: 1.35, interval: 0.75 },
    },
  },
  SIEGE: {
    label: 'Siege',
    icon: '🛡️',
    blurb: 'Armored heavies lead every assault. Snipers punch through armor; light fire bounces off.',
    // Thin the trash, thicken the armour — a strategy shift toward armour pen,
    // only a small net HP bump so it never out-muscles the next (higher) tier.
    scale: {
      ANT:    { count: 0.6 },
      BEETLE: { count: 1.35 },
    },
  },
  TIDE: {
    label: 'Relentless',
    icon: '🌊',
    blurb: 'No breathing room — every wave presses in faster than the last. Slows buy you time.',
    // Pure tempo: same enemies, tighter spacing. Adds zero HP, all pressure.
    scale: {
      ANT:    { interval: 0.6 },
      WASP:   { interval: 0.6 },
      BEETLE: { interval: 0.7 },
      QUEEN:  { interval: 0.75 },
    },
  },
  BOSS: {
    label: 'Boss Rush',
    icon: '👑',
    blurb: 'Queens and broods on every front. Concentrate your firepower — spread thin and they walk through.',
    // The finale leans heavy on purpose, but moderated so it stays a hard fight
    // rather than an instant wall (crowd-clear is NOT banned here — see U01_6).
    scale: {
      QUEEN:     { count: 1.5 },
      GIANT_ANT: { count: 1.6 },
      BEETLE:    { count: 1.2 },
    },
  },
};

// Smallest spawn gap a modifier may compress an interval to, so "faster" never
// becomes an unspawnable zero.
const MIN_INTERVAL = 60;

/**
 * The 50-wave set for a level, with an optional composition modifier applied.
 *
 * Returns the shared SET_1 reference unchanged when there is no modifier, so the
 * common path allocates nothing and behaves exactly as before modifiers existed.
 */
export function buildWaveSet(modifierId) {
  const mod = modifierId ? WAVE_MODIFIERS[modifierId] : null;
  if (!mod) return WAVE_PRESETS.SET_1;

  return WAVE_PRESETS.SET_1.map(wave =>
    wave.map(group => {
      const s = mod.scale[group.type];
      if (!s) return { ...group };
      const next = { ...group };
      if (s.count) next.count = Math.max(1, Math.round(group.count * s.count));
      if (s.interval) next.interval = Math.max(MIN_INTERVAL, Math.round(group.interval * s.interval));
      return next;
    })
  );
}

export const WAVE_PRESETS = {
  SET_1: [
    // --- EARLY GAME (1-10) --- 
    [{ type: 'ANT',  count: 8,  interval: 1500 }],
    [{ type: 'ANT',  count: 12, interval: 1200 }],
    // Wasps enter 3 seconds after Ants start
    [{ type: 'ANT',  count: 10, interval: 1000 }, { type: 'WASP', count: 5,  interval: 800, delay: 3000 }],
    [{ type: 'WASP', count: 12, interval: 700  }],
    // Beetle acts as a mini-boss 4 seconds in
    [{ type: 'ANT',  count: 15, interval: 600  }, { type: 'BEETLE', count: 1,  interval: 2000, delay: 4000 }],
    [{ type: 'ANT',  count: 20, interval: 800  }, { type: 'WASP', count: 8,  interval: 600, delay: 3500 }],
    [{ type: 'BEETLE', count: 3,  interval: 1500 }, { type: 'WASP', count: 8,  interval: 500, delay: 2500 }],
    [{ type: 'ANT',  count: 25, interval: 400  }],
    [{ type: 'WASP', count: 20, interval: 400  }, { type: 'BEETLE', count: 3,  interval: 1000, delay: 4000 }],
    [{ type: 'BEETLE', count: 5,  interval: 1000 }, { type: 'QUEEN',   count: 1,  interval: 3000, delay: 6000 }],
    
    // --- MID GAME (11-20) ---
    [{ type: 'ANT',  count: 35, interval: 350  }],
    [{ type: 'WASP', count: 25, interval: 300  }, { type: 'BEETLE', count: 6,  interval: 1000, delay: 3500 }],
    [{ type: 'ANT',  count: 20, interval: 300  }, { type: 'WASP', count: 20, interval: 250, delay: 2000 }],
    [{ type: 'BEETLE', count: 10, interval: 1000 }],
    [{ type: 'WASP', count: 30, interval: 200  }, { type: 'QUEEN',   count: 1,  interval: 2000, delay: 5000 }],
    [{ type: 'ANT',  count: 40, interval: 250  }, { type: 'BEETLE', count: 8,  interval: 800, delay: 3000 }],
    [{ type: 'WASP', count: 40, interval: 200  }],
    [{ type: 'BEETLE', count: 18, interval: 600  }],
    [{ type: 'ANT',  count: 30, interval: 200  }, { type: 'WASP', count: 30, interval: 200, delay: 2500 }],
    [{ type: 'BEETLE', count: 15, interval: 500  }, { type: 'QUEEN',   count: 3,  interval: 1500, delay: 5500 }],

    // --- LATE GAME ESCALATION (21-30) ---
    [{ type: 'ANT',  count: 45, interval: 200  }, { type: 'WASP', count: 25, interval: 250, delay: 3000 }],
    [{ type: 'WASP', count: 35, interval: 200  }, { type: 'BEETLE', count: 15, interval: 600, delay: 4000 }],
    [{ type: 'ANT',  count: 50, interval: 150  }],
    [{ type: 'BEETLE', count: 20, interval: 450  }, { type: 'QUEEN',   count: 2,  interval: 2000, delay: 6000 }],
    [{ type: 'GIANT_ANT', count: 1, interval: 2000 }], 
    [{ type: 'QUEEN',   count: 4,  interval: 2000 }],
    [{ type: 'BEETLE', count: 30, interval: 400  }],
    [{ type: 'ANT',  count: 65, interval: 100  }, { type: 'WASP', count: 35, interval: 150, delay: 3500 }],
    [{ type: 'WASP', count: 50, interval: 150  }, { type: 'QUEEN',   count: 4,  interval: 1500, delay: 4500 }],
    [{ type: 'BEETLE', count: 25, interval: 350  }, { type: 'QUEEN',   count: 5,  interval: 1800, delay: 5000 }],

    // --- THE GAUNTLET (31-40) ---
    [{ type: 'ANT',  count: 75, interval: 100  }],
    [{ type: 'WASP', count: 65, interval: 120  }],
    [{ type: 'BEETLE', count: 35, interval: 300  }],
    [{ type: 'ANT',  count: 55, interval: 100  }, { type: 'WASP', count: 55, interval: 100, delay: 2000 }],
    [{ type: 'QUEEN',   count: 6,  interval: 1500 }, { type: 'BEETLE', count: 20, interval: 500, delay: 3000 }],
    [{ type: 'WASP', count: 70, interval: 100  }, { type: 'QUEEN',   count: 3,  interval: 2000, delay: 4000 }],
    [{ type: 'BEETLE', count: 45, interval: 250  }],
    [{ type: 'ANT',  count: 90, interval: 80   }],
    [{ type: 'WASP', count: 60, interval: 120  }, { type: 'BEETLE', count: 30, interval: 300, delay: 3500 }],
    [{ type: 'QUEEN',   count: 8,  interval: 1200 }, { type: 'WASP', count: 40, interval: 200, delay: 4500 }],

    // --- BRUTAL FINAL WAVES (41-50) ---
    [{ type: 'ANT',  count: 100,interval: 80   }, { type: 'WASP', count: 40, interval: 150, delay: 2500 }],
    [{ type: 'BEETLE', count: 55, interval: 250  }],
    [{ type: 'WASP', count: 85, interval: 100  }],
    [{ type: 'QUEEN',   count: 10, interval: 1000 }],
    [{ type: 'ANT',  count: 120,interval: 70   }],
    [{ type: 'WASP', count: 95, interval: 90   }, { type: 'BEETLE', count: 25, interval: 400, delay: 3500 }],
    [{ type: 'BEETLE', count: 60, interval: 200  }, { type: 'QUEEN',   count: 6,  interval: 1500, delay: 4000 }],
    [{ type: 'ANT',  count: 100,interval: 80   }, { type: 'WASP', count: 90, interval: 80, delay: 2000 }],
    [{ type: 'BEETLE', count: 70, interval: 180  }],
    // Final scripted wave: Ants instantly, Queens at 4s, Beetles at 7s, Wasps at 10s
    [
      { type: 'GIANT_ANT', count: 2, interval: 3000 }, 
      { type: 'QUEEN', count: 5, interval: 1500, delay: 4000 }, 
      { type: 'BEETLE', count: 25, interval: 350, delay: 7000 }, 
      { type: 'WASP', count: 30, interval: 200, delay: 10000 }
    ]
  ],

  // --- INFINITE QUADRATIC SCALING (51+) ---
  INFINITE_GENERATOR: (waveIndex) => {
    // Exact Override Requirement (as requested previously)
    if (waveIndex === 67) {
      return [{ type: 'GIANT_ANT', count: 67, interval: 350 }];
    }

    const x = waveIndex - 50; 
    const linear = x;
    const quad = Math.pow(x, 2);

    const wave = [
      { 
        type: 'ANT',  
        count: Math.floor(Math.min(1200, 80 + (10 * linear) + (0.5 * quad))), 
        interval: Math.max(15, 100 - (linear * 2) - (quad * 0.05)) 
      },
      { 
        type: 'WASP', 
        count: Math.floor(Math.min(900, 60 + (8 * linear) + (0.4 * quad))), 
        interval: Math.max(20, 120 - (linear * 2.5) - (quad * 0.05)),
        delay: 3500 // Wasps enter the track 3.5 seconds in
      },
      { 
        type: 'BEETLE', 
        count: Math.floor(Math.min(600, 40 + (5 * linear) + (0.25 * quad))),  
        interval: Math.max(40, 250 - (linear * 3) - (quad * 0.1)),
        delay: 7500 // Heavies enter 7.5 seconds in
      },
      { 
        type: 'QUEEN',   
        count: Math.floor(Math.min(200, 10 + (1.5 * linear) + (0.1 * quad))),     
        interval: Math.max(80, 1000 - (linear * 15) - (quad * 0.5)),
        delay: 12000 // Bosses enter 12 seconds in
      }
    ];

    if (waveIndex >= 55 && waveIndex % 5 === 0) {
      const bossTier = (waveIndex - 50) / 5; 
      const broodCount = Math.floor(Math.min(75, 2 + bossTier + (Math.pow(bossTier, 2) * 0.5)));
      wave.push({ 
        type: 'GIANT_ANT', 
        count: broodCount, 
        interval: Math.max(400, 4000 - (quad * 2)),
        delay: 15000 // Broodmothers deploy 15 seconds in
      });
    }

    return wave;
  }
};