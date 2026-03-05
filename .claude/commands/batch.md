# Batch Character Pipeline

Run the full character creation pipeline for one or more characters end-to-end.

## Instructions

Based on the user's request: $ARGUMENTS

This command orchestrates the full workflow:

### Step 1: Character Creation
For each character requested:
- Follow the `/character` workflow to create personas and prompts
- Add all characters to `characters/roster.json`
- Output all prompts together so the user can generate images in batch

### Step 2: Wait for Images
- Remind the user to generate images and save them to `raw/` with matching character keys
- Example: `raw/kai_tanaka.png`, `raw/coach_martinez.png`

### Step 3: Process All Images
```bash
node scripts/process-image.mjs --all
```
- Convert all raw images to webp variants
- Show summary of all processed files

### Step 4: Deploy All Assets
```bash
node scripts/deploy-assets.mjs --all --target all
```
- Copy all processed assets to all game projects
- Update roster.json with deployment status

### Step 5: Summary
- List all characters created with their keys
- List all files deployed to each game project
- Suggest any animation sequences that would work with the new characters
- Note any game data files that need updating to reference new character keys

### Batch Tips
- Process characters in groups by role (all players, then coaches, then parents)
- Use consistent style across a batch for visual coherence
- Name raw files with the exact character key for automatic matching
