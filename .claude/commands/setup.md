# Setup for New Project

Configure this character enrichment pipeline for a new game project.

## Instructions

$ARGUMENTS

Help the user adapt this pipeline for a new game or application by:

1. **Read current config.json** to understand the existing setup

2. **Ask the user about their new project**:
   - Project name and path on disk
   - Art style (can keep Blue Lock/anime or change)
   - Image size requirements (portrait dimensions, variants needed)
   - Where character assets should be deployed in the project

3. **Update config.json**:
   - Add new deploy target under `deploy_targets`
   - Adjust `image_variants` if new sizes are needed
   - Update `style` section if art direction differs

4. **Create/update prompt templates** if the art style is different:
   - Update `prompts/style-guide.md` or create a new style guide
   - Create new role-specific prompt templates if needed

5. **Update archetypes** if the game has different character roles:
   - Add new archetypes to `characters/archetypes.json`
   - Include visual traits, aura colors, and prompt accents

6. **Test the configuration**:
   - Verify the deploy target path exists
   - Confirm variant sizes are appropriate for the game's UI

The system is designed to be project-agnostic. The core scripts (`process-image.mjs`, `deploy-assets.mjs`, `generate-spritesheet.mjs`) all read from `config.json`, so adding a new project is just a config change — no code modifications needed.
