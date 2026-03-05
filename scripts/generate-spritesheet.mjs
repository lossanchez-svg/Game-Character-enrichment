#!/usr/bin/env node
/**
 * Sprite Sheet Generator
 * Combines multiple character frames into a sprite sheet for animations.
 *
 * Usage:
 *   node scripts/generate-spritesheet.mjs <input-dir> [--cols 4] [--frame-size 256x256]
 *   node scripts/generate-spritesheet.mjs raw/kai_frames/ --cols 4 --key kai_tanaka_run
 *
 * Input: Directory of numbered frame images (frame_001.png, frame_002.png, ...)
 * Output: Sprite sheet webp + JSON metadata
 */

import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'fs/promises';
import { join, resolve, extname } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const OUT_DIR = join(ROOT, 'processed', 'spritesheets');
const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { inputDir: null, cols: 4, frameWidth: 256, frameHeight: 256, key: 'spritesheet', fps: 12 };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--cols' && args[i + 1]) {
      opts.cols = parseInt(args[++i]);
    } else if (args[i] === '--frame-size' && args[i + 1]) {
      const [w, h] = args[++i].split('x').map(Number);
      opts.frameWidth = w;
      opts.frameHeight = h || w;
    } else if (args[i] === '--key' && args[i + 1]) {
      opts.key = args[++i];
    } else if (args[i] === '--fps' && args[i + 1]) {
      opts.fps = parseInt(args[++i]);
    } else if (!args[i].startsWith('--')) {
      opts.inputDir = args[i];
    }
  }
  return opts;
}

async function main() {
  const opts = parseArgs();

  if (!opts.inputDir) {
    console.log('Usage: node scripts/generate-spritesheet.mjs <frame-directory> [options]');
    console.log('  --cols N         Columns in sheet (default: 4)');
    console.log('  --frame-size WxH Frame dimensions (default: 256x256)');
    console.log('  --key name       Output filename key');
    console.log('  --fps N          Playback framerate (default: 12)');
    process.exit(0);
  }

  const inputDir = resolve(opts.inputDir);
  const entries = await readdir(inputDir);
  const frames = entries
    .filter(f => IMAGE_EXTS.has(extname(f).toLowerCase()))
    .sort();

  if (frames.length === 0) {
    console.error('No image frames found in', inputDir);
    process.exit(1);
  }

  console.log(`Found ${frames.length} frames`);

  const cols = opts.cols;
  const rows = Math.ceil(frames.length / cols);
  const sheetWidth = cols * opts.frameWidth;
  const sheetHeight = rows * opts.frameHeight;

  console.log(`Sheet: ${sheetWidth}x${sheetHeight} (${cols}x${rows} grid, ${opts.frameWidth}x${opts.frameHeight} frames)`);

  // Build composite operations
  const composites = [];
  for (let i = 0; i < frames.length; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const resized = await sharp(join(inputDir, frames[i]))
      .resize(opts.frameWidth, opts.frameHeight, { fit: 'cover' })
      .toBuffer();

    composites.push({
      input: resized,
      left: col * opts.frameWidth,
      top: row * opts.frameHeight,
    });
  }

  await mkdir(OUT_DIR, { recursive: true });

  // Create sprite sheet
  const outPath = join(OUT_DIR, `${opts.key}.webp`);
  await sharp({
    create: {
      width: sheetWidth,
      height: sheetHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite(composites)
    .webp({ quality: 85 })
    .toFile(outPath);

  // Write metadata JSON
  const meta = {
    key: opts.key,
    frameCount: frames.length,
    cols,
    rows,
    frameWidth: opts.frameWidth,
    frameHeight: opts.frameHeight,
    sheetWidth,
    sheetHeight,
    fps: opts.fps,
    frameDuration: Math.round(1000 / opts.fps),
  };

  const metaPath = join(OUT_DIR, `${opts.key}.json`);
  await writeFile(metaPath, JSON.stringify(meta, null, 2));

  console.log(`\n✓ Sprite sheet: ${outPath}`);
  console.log(`✓ Metadata: ${metaPath}`);
  console.log(JSON.stringify(meta, null, 2));
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
