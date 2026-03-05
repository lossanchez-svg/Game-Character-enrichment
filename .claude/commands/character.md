# Create Anime Character

Create a new anime character persona and generate an AI image prompt for the PitchDreams game ecosystem.

## Instructions

Read the following files to understand the system:
- `config.json` — pipeline configuration and deploy targets
- `characters/archetypes.json` — available archetypes with visual traits
- `prompts/style-guide.md` — base anime style guide
- `characters/roster.json` — existing character registry

Based on the user's request: $ARGUMENTS

1. **Determine character details** by asking clarifying questions if needed:
   - Name, age, gender
   - Role: player | coach | parent | npc
   - For players: archetype (from archetypes.json)
   - Appearance: hair style, hair color, eye color, skin tone, face shape
   - Jersey color and number (if applicable)
   - Personality keywords

2. **Generate the AI image prompt** by:
   - Reading the appropriate template from `prompts/` (player.md, coach.md, parent.md, or npc.md)
   - Filling in all template variables with the character details
   - Including the base style directive from style-guide.md
   - Adding the archetype-specific visual accents

3. **Create a character entry** and add it to `characters/roster.json`

4. **Output the completed prompt** formatted for copy-paste into the user's preferred AI image generator (check `config.json` ai_generators for format tips)

5. **Remind the user** of next steps:
   - Generate the image using the prompt
   - Save the raw image to `raw/{character_key}.png`
   - Run `/process-art` to convert and resize
   - Run `/deploy-assets` to copy to game projects

The character key should be snake_case derived from the name (e.g., "Kai Tanaka" → "kai_tanaka").
