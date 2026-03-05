# Game Character Enrichment Pipeline

Central hub for creating, processing, and deploying anime character art across the PitchDreams game ecosystem.

## Target Projects
- **pitch-dreams-ultimate-manager-sim** (`/Users/lossa/pitch-dreams-ultimate-manager-sim`) — Next.js coaching sim, assets at `assets/images/characters/`
- **pro-parent-soccer-league** (`/Users/lossa/pro-parent-soccer-league`) — Vanilla JS game, assets at `assets/images/characters/`
- **pitch-dreams-landingsite** (`/Users/lossa/pitch-dreams-landingsite`) — Marketing site, assets at `public/`

## Art Style
Blue Lock / Captain Tsubasa anime aesthetic: intense eyes, dynamic hair, angular features, neon accents, dramatic speed lines.

## Workflow
1. `/character` — Create persona + AI prompt
2. Generate image in Gemini / other AI tool using the prompt
3. Drop raw image into `raw/` folder
4. `/process-art` — Convert to webp, resize, create variants
5. `/deploy-assets` — Copy to game project folders
6. `/animate` — Generate animation components (cut-ins, sequences)

## Image Specs
- **Portrait**: 400x560px webp (2x render for crisp display at 200x280)
- **Card**: 300x420px webp (legend/scout cards)
- **Thumbnail**: 80x80px webp (roster lists, chat bubbles)
- **Quality**: 85 for portraits/cards, 90 for thumbnails

## Character Keys
Use snake_case: `char_coach`, `char_karen`, `kai_tanaka`, etc.
Must match keys in game data files.

## File Naming
`{character_key}_{variant}.webp` — e.g., `kai_tanaka_portrait.webp`, `kai_tanaka_card.webp`
