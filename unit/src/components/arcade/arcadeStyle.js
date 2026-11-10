// src/components/arcade/arcadeStyle.js
//
// Bits of the Arcade's look shared by more than one component. Kept out of the
// component files so fast refresh keeps working (a file must export only
// components for that).

/** The dot grid behind every arcade surface — the "cabinet glass" texture. */
export const ARCADE_GRID_STYLE = {
  backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)',
  backgroundSize: '20px 20px',
};
