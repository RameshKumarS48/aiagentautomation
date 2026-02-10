#!/usr/bin/env node
/**
 * Validates and removes content files with invalid YAML frontmatter
 */

import { readdir, readFile, unlink } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';

const CONTENT_DIR = './src/content/agents';

// Names that are clearly not AI agents (navigation, meta entries)
const SKIP_PATTERNS = [
  /^getting-started/i,
  /^documentation$/i,
  /^discord$/i,
  /^github$/i,
  /^twitter$/i,
  /^facebook$/i,
  /^linkedin$/i,
  /^website$/i,
  /^youtube/i,
  /^blog-post$/i,
  /^paper$/i,
  /^web$/i,
  /^docs$/i,
  /^replit$/i,
  /^tweet$/i,
  /^founder/i,
  /^author/i,
  /open-source-projects/i,
  /closed-source/i,
  /thread-describing/i,
  /^x$/i,
];

async function validateAndClean() {
  const files = await readdir(CONTENT_DIR);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  let removed = 0;
  let valid = 0;

  for (const file of mdFiles) {
    const filepath = join(CONTENT_DIR, file);
    const slug = file.replace('.md', '');

    // Check if filename matches skip patterns
    if (SKIP_PATTERNS.some(p => p.test(slug))) {
      console.log(`Removing (skip pattern): ${file}`);
      await unlink(filepath);
      removed++;
      continue;
    }

    try {
      const content = await readFile(filepath, 'utf-8');

      // Extract frontmatter
      const match = content.match(/^---\n([\s\S]*?)\n---/);
      if (!match) {
        console.log(`Removing (no frontmatter): ${file}`);
        await unlink(filepath);
        removed++;
        continue;
      }

      // Try to parse YAML
      const yaml = match[1];
      const data = parse(yaml);

      // Check for required fields
      if (!data.name || !data.category || !data.description) {
        console.log(`Removing (missing fields): ${file}`);
        await unlink(filepath);
        removed++;
        continue;
      }

      // Check if name looks like a real agent name (not a sentence/tweet)
      if (data.name.length > 80 || data.name.includes('%') || data.name.split(' ').length > 8) {
        console.log(`Removing (name too long/invalid): ${file}`);
        await unlink(filepath);
        removed++;
        continue;
      }

      valid++;
    } catch (err) {
      console.log(`Removing (YAML error): ${file} - ${err.message}`);
      await unlink(filepath);
      removed++;
    }
  }

  console.log(`\nDone! Valid: ${valid}, Removed: ${removed}`);
}

validateAndClean().catch(console.error);
