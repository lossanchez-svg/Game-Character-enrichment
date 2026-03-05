# Process Character Art

Convert raw AI-generated images into game-ready webp assets with multiple size variants.

## Instructions

Based on the user's request: $ARGUMENTS

1. **Check for raw images**:
   - If a specific file is mentioned, process that file
   - If no file specified, list all images in `raw/` directory and ask which to process
   - If `--all` is mentioned, process everything in `raw/`

2. **Determine the character key**:
   - If the filename matches a character in `characters/roster.json`, use that key
   - Otherwise, derive the key from the filename (snake_case)
   - Ask the user to confirm the key if ambiguous

3. **Run the processing script**:
   ```bash
   node scripts/process-image.mjs <input_file> --key <character_key> [--variants portrait,card,thumb]
   ```

   Default variants from `config.json`: portrait (400x560), card (300x420), thumb (80x80)

4. **Show results**: Display the generated files with sizes

5. **Suggest next step**: Run `/deploy-assets` to copy to game project folders

If `sharp` is not installed, run `npm install` first in the project root.
