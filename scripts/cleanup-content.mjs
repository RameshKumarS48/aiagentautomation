#!/usr/bin/env node
/**
 * Validates and removes content files with invalid YAML frontmatter
 * Also removes entries that are clearly not AI agents
 */

import { readdir, readFile, unlink } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';

const CONTENT_DIR = './src/content/agents';

// Names/slugs that are clearly not AI agents
const SKIP_PATTERNS = [
  /^getting-started/i,
  /^documentation$/i,
  /^discord/i,
  /^github$/i,
  /^twitter/i,
  /^facebook$/i,
  /^linkedin/i,
  /^website$/i,
  /^youtube/i,
  /^blog-?post$/i,
  /^paper$/i,
  /^web$/i,
  /^docs$/i,
  /^replit$/i,
  /^tweet$/i,
  /^founder/i,
  /^author/i,
  /^creator/i,
  /^co-?founder/i,
  /open-source-project/i,
  /closed-source/i,
  /thread-describing/i,
  /^x$/i,
  /^announcement/i,
  /^launch/i,
  /^roadmap$/i,
  /^community$/i,
  /^telegram$/i,
  /^slack/i,
  /^subreddit$/i,
  /^medium/i,
  /^article$/i,
  /^interview/i,
  /^hugging-?face/i,
  /^colab/i,
  /chrome-extension$/i,
  /vscode-extension$/i,
  /docker-image$/i,
  /^templates?$/i,
  /^playground$/i,
  /^waitlist$/i,
  /^profile/i,
  /^ycombinator/i,
  /^license/i,
  /^repo$/i,
  /^meme$/i,
  /step-by-step/i,
  /^use-cases?$/i,
  /^streamlit/i,
  /local-demo$/i,
  /project-(page|demo)$/i,
  /^data-analysis$/i,
  /^arxiv/i,
  /^hackernews/i,
  /^hit-us-up/i,
  /-linkedin$/i,
  /-twitter$/i,
  /^x-twitter$/i,
  /^x-post$/i,
  /ceo$/i,
  /cto$/i,
  /-at-/i, // "person-at-company" patterns
];

async function validateAndClean() {
  let files;
  try {
    files = await readdir(CONTENT_DIR);
  } catch (err) {
    console.log('Content directory not found, skipping cleanup');
    return;
  }

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
      let data;
      try {
        data = parse(yaml);
      } catch (yamlErr) {
        console.log(`Removing (YAML error): ${file}`);
        await unlink(filepath);
        removed++;
        continue;
      }

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

      // Check for malformed categories (containing markdown links)
      if (data.category.includes('[') || data.category.includes('(')) {
        console.log(`Removing (malformed category): ${file}`);
        await unlink(filepath);
        removed++;
        continue;
      }

      valid++;
    } catch (err) {
      console.log(`Removing (error): ${file} - ${err.message}`);
      await unlink(filepath);
      removed++;
    }
  }

  console.log(`\nCleanup complete! Valid: ${valid}, Removed: ${removed}`);
}

validateAndClean().catch(console.error);
