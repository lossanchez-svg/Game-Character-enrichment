#!/usr/bin/env node
/**
 * Asset Deployment Script
 * Copies processed character assets to game project directories.
 *
 * Usage:
 *   node scripts/deploy-assets.mjs <character_key> [--target sim|parent|landing|all]
 *   node scripts/deploy-assets.mjs --all [--target sim]
 *   node scripts/deploy-assets.mjs kai_tanaka --target sim
 *   node scripts/deploy-assets.mjs char_coach --target all
 */

import { readdir, copyFile, mkdir, access, stat, readFile } from 'fs/promises';
import { join, resolve, basename } from 'path';

const ROOT = resolve(import.meta.dirname, '..');

// Load config for reusability across projects
let config;
try {
  config = JSON.parse(await readFile(join(ROOT, 'config.json'), 'utf-8'));
} catch {
  config = {};
}

const PROCESSED_DIR = join(ROOT, config.pipeline?.processed_dir || 'processed');

// Deploy targets from config, with defaults
const TARGETS = config.deploy_targets || {
  sim: {
    name: 'pitch-dreams-ultimate-manager-sim',
    path: '/Users/lossa/pitch-dreams-ultimate-manager-sim/assets/images/characters',
    variants: ['portrait', 'card', 'thumb', 'full'],
  },
  parent: {
    name: 'pro-parent-soccer-league',
    path: '/Users/lossa/pro-parent-soccer-league/assets/images/characters',
    variants: ['portrait', 'thumb', 'full'],
  },
  landing: {
    name: 'pitch-dreams-landingsite',
    path: '/Users/lossa/pitch-dreams-landingsite/public/characters',
    variants: ['portrait', 'square', 'banner'],
  },
};

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { keys: [], target: 'all', all: false, dryRun: false };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--all') {
      opts.all = true;
    } else if (args[i] === '--target' && args[i + 1]) {
      opts.target = args[++i];
    } else if (args[i] === '--dry-run') {
      opts.dryRun = true;
    } else if (!args[i].startsWith('--')) {
      opts.keys.push(args[i]);
    }
  }
  return opts;
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function deployCharacter(key, targetNames, dryRun) {
  const srcDir = join(PROCESSED_DIR, key);

  if (!(await exists(srcDir))) {
    console.error(`  ✗ No processed assets for "${key}". Run process-image first.`);
    return false;
  }

  const files = await readdir(srcDir);
  let deployed = 0;

  for (const [targetKey, target] of Object.entries(TARGETS)) {
    if (targetNames !== 'all' && targetKey !== targetNames) continue;

    if (!(await exists(target.path.replace(/\/characters$/, '')))) {
      console.warn(`  ⚠ Project not found: ${target.name} — skipping`);
      continue;
    }

    await mkdir(target.path, { recursive: true });

    for (const file of files) {
      const variantMatch = file.match(new RegExp(`${key}_(\\w+)\\.webp$`));
      if (!variantMatch) continue;

      const variant = variantMatch[1];
      if (!target.variants.includes(variant) && variant !== 'full') continue;

      const destFile = join(target.path, file);

      if (dryRun) {
        console.log(`  [dry-run] ${file} → ${target.name}`);
      } else {
        await copyFile(join(srcDir, file), destFile);
        const s = await stat(destFile);
        console.log(`  ✓ ${file} → ${target.name} (${(s.size / 1024).toFixed(1)}KB)`);
      }
      deployed++;
    }
  }

  return deployed > 0;
}

async function main() {
  const opts = parseArgs();

  let keys = opts.keys;

  if (opts.all) {
    if (!(await exists(PROCESSED_DIR))) {
      console.log('No processed assets found. Run process-image first.');
      process.exit(0);
    }
    const entries = await readdir(PROCESSED_DIR, { withFileTypes: true });
    keys = entries.filter(e => e.isDirectory()).map(e => e.name);
    if (keys.length === 0) {
      console.log('No processed character directories found.');
      process.exit(0);
    }
  }

  if (keys.length === 0) {
    console.log('Usage: node scripts/deploy-assets.mjs <character_key> [--target sim|parent|landing|all]');
    console.log('       node scripts/deploy-assets.mjs --all');
    console.log(`\nTargets: ${Object.keys(TARGETS).join(', ')}, all`);
    process.exit(0);
  }

  console.log(`Deploying to: ${opts.target === 'all' ? 'all projects' : TARGETS[opts.target]?.name || opts.target}`);

  for (const key of keys) {
    console.log(`\n${key}:`);
    await deployCharacter(key, opts.target, opts.dryRun);
  }

  console.log('\nDeployment complete!');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
