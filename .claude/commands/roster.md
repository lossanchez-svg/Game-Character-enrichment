# View Character Roster

Display the current character roster and asset status.

## Instructions

Read `characters/roster.json` and present a formatted summary.

$ARGUMENTS

For each character, show:
- **Key** and **Name**
- **Role** and **Archetype** (if player)
- **Status**: Created | Processed | Deployed
- **Deployed to**: Which game projects have the assets

Also show:
- Total characters in roster
- Characters pending image generation (created but no raw image)
- Characters pending processing (raw image exists but not processed)
- Characters pending deployment (processed but not deployed to all targets)

If `--detail <key>` is provided, show full character data including appearance, prompt used, and all asset file paths.

Check the actual filesystem to verify status:
- `raw/{key}.*` exists → has raw image
- `processed/{key}/` exists → has been processed
- Target directories contain `{key}_*.webp` → has been deployed
