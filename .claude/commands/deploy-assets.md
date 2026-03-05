# Deploy Character Assets

Copy processed character assets to game project directories.

## Instructions

Based on the user's request: $ARGUMENTS

1. **Read config.json** to get deploy target paths and variant mappings

2. **Determine what to deploy**:
   - If a character key is specified, deploy only that character
   - If `--all` is mentioned, deploy all processed characters
   - Default target: all game projects (sim, parent, landing)

3. **Run the deployment script**:
   ```bash
   node scripts/deploy-assets.mjs <character_key> --target <sim|parent|landing|all>
   ```

4. **Verify deployment**: Check that files were copied to the correct locations:
   - sim → `/Users/lossa/pitch-dreams-ultimate-manager-sim/assets/images/characters/`
   - parent → `/Users/lossa/pro-parent-soccer-league/assets/images/characters/`
   - landing → `/Users/lossa/pitch-dreams-landingsite/public/characters/`

5. **Update roster.json**: Mark which targets this character has been deployed to

6. **Remind user**: The game code may need to reference the new character key in its data files (players.ts, regions.js, etc.)
