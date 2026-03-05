# Create Animation Sequence

Generate anime-style animation components for game cut-in sequences.

## Instructions

Read the animation template files:
- `animations/cutin-templates.json` — cut-in animation configs (goal celebration, dramatic moment, player intro, rivalry clash)
- `animations/sequence-templates.json` — multi-step sequence presets

Based on the user's request: $ARGUMENTS

1. **Determine animation type**:
   - Which template? (goal_celebration, dramatic_moment, player_intro, rivalry_clash)
   - Which character(s)?
   - Which game target? (sim = React/Framer Motion, parent = Canvas/vanilla JS)

2. **Look up character data** from `characters/roster.json` to get aura_color, archetype, etc.

3. **Generate the animation component**:

   **For coaching sim (React/Framer Motion)**:
   - Read existing animation patterns from `/Users/lossa/pitch-dreams-ultimate-manager-sim/src/components/anime/AnimeGoalCutin.tsx` for style reference
   - Generate a new React component using Framer Motion that implements the chosen template
   - Follow the existing component patterns and naming conventions

   **For pro-parent game (Canvas)**:
   - Read existing animation patterns from `/Users/lossa/pro-parent-soccer-league/src/engine/ScreenEffects.js` for style reference
   - Generate Canvas-based animation code that implements the chosen template
   - Follow the existing engine patterns

4. **Output the generated code** with instructions on where to add it in the target project

5. **If creating sprite-sheet based animations**, guide the user through:
   - Generating multiple frame images with AI
   - Using `node scripts/generate-spritesheet.mjs` to combine into a sheet
   - Integrating the sprite sheet into the game engine
