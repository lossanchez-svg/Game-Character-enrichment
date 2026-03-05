#!/usr/bin/env node
/**
 * Image Processing Pipeline
 * Converts raw AI-generated images to game-ready webp assets.
 *
 * Usage:
 *   node scripts/process-image.mjs <input> [--key char_name] [--variants portrait,card,thumb]
 *   node scripts/process-image.mjs --all                    # process everything in raw/
 *   node scripts/process-image.mjs raw/kai.png --key kai_tanaka
 *   node scripts/process-image.mjs raw/kai.png --key kai_tanaka --variants portrait
 */

import sharp from 'sharp';
import { readdir, mkdir, stat, readFile } from 'fs/promises';
import { join, basename, extname, resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');

// Load config for reusability across projects
let config;
try {
  config = JSON.parse(await readFile(join(ROOT, 'config.json'), 'utf-8'));
} catch {
  config = {};
}

const RAW_DIR = join(ROOT, config.pipeline?.raw_dir || 'raw');
const OUT_DIR = join(ROOT, config.pipeline?.processed_dir || 'processed');

// Variants from config, with sensible defaults
const VARIANTS = config.image_variants
  ? Object.fromEntries(
      Object.entries(config.image_variants).map(([k, v]) => [k, { width: v.width, height: v.height, quality: v.quality }])
    )
  : {
      portrait: { width: 400, height: 560, quality: 85 },
      card:     { width: 300, height: 420, quality: 85 },
      thumb:    { width: 80,  height: 80,  quality: 90 },
      square:   { width: 256, height: 256, quality: 85 },
      banner:   { width: 600, height: 200, quality: 80 },
    };

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.bmp', '.tiff', '.webp']);

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { files: [], key: null, variants: Object.keys(VARIANTS), all: false };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--all') {
      opts.all = true;
    } else if (args[i] === '--key' && args[i + 1]) {
      opts.key = args[++i];
    } else if (args[i] === '--variants' && args[i + 1]) {
      opts.variants = args[++i].split(',').map(v => v.trim());
    } else if (!args[i].startsWith('--')) {
      opts.files.push(args[i]);
    }
  }
  return opts;
}

function deriveKey(filepath) {
  return basename(filepath, extname(filepath))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}

async function processImage(inputPath, characterKey, variantNames) {
  const keyDir = join(OUT_DIR, characterKey);
  await mkdir(keyDir, { recursive: true });

  const image = sharp(inputPath);
  const meta = await image.metadata();
  console.log(`  Source: ${meta.width}x${meta.height} ${meta.format}`);

  const results = [];

  for (const name of variantNames) {
    const v = VARIANTS[name];
    if (!v) {
      console.warn(`  Skipping unknown variant: ${name}`);
      continue;
    }

    const outFile = join(keyDir, `${characterKey}_${name}.webp`);

    await sharp(inputPath)
      .resize(v.width, v.height, {
        fit: 'cover',
        position: name === 'thumb' ? 'top' : 'attention',
      })
      .webp({ quality: v.quality })
      .toFile(outFile);

    const outStat = await stat(outFile);
    const kb = (outStat.size / 1024).toFixed(1);
    console.log(`  ✓ ${name}: ${v.width}x${v.height} → ${kb}KB`);
    results.push({ variant: name, path: outFile, size: outStat.size });
  }

  // Also create a full-res webp for archive
  const fullOut = join(keyDir, `${characterKey}_full.webp`);
  await sharp(inputPath).webp({ quality: 90 }).toFile(fullOut);
  const fullStat = await stat(fullOut);
  console.log(`  ✓ full: ${meta.width}x${meta.height} → ${(fullStat.size / 1024).toFixed(1)}KB`);

  return results;
}

async function main() {
  const opts = parseArgs();

  await mkdir(OUT_DIR, { recursive: true });

  let files = opts.files;

  if (opts.all) {
    const entries = await readdir(RAW_DIR);
    files = entries
      .filter(f => IMAGE_EXTS.has(extname(f).toLowerCase()))
      .map(f => join(RAW_DIR, f));
    if (files.length === 0) {
      console.log('No images found in raw/ directory.');
      console.log('Drop your AI-generated images into the raw/ folder first.');
      process.exit(0);
    }
  }

  if (files.length === 0) {
    console.log('Usage: node scripts/process-image.mjs <image> [--key name] [--variants portrait,card,thumb]');
    console.log('       node scripts/process-image.mjs --all');
    console.log(`\nAvailable variants: ${Object.keys(VARIANTS).join(', ')}`);
    process.exit(0);
  }

  for (const file of files) {
    const key = opts.key || deriveKey(file);
    console.log(`\nProcessing: ${basename(file)} → ${key}`);
    await processImage(resolve(file), key, opts.variants);
  }

  console.log(`\nDone! Processed assets in: ${OUT_DIR}`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
