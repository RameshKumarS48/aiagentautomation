#!/usr/bin/env node
/**
 * Simple sitemap generator - runs after build
 */

import { readdir, writeFile } from 'fs/promises';
import { join } from 'path';

const SITE_URL = 'https://aiagentautomation.site';
const DIST_DIR = './dist';

async function findHtmlFiles(dir, basePath = '') {
  const urls = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const urlPath = join(basePath, entry.name);

    if (entry.isDirectory()) {
      urls.push(...await findHtmlFiles(fullPath, urlPath));
    } else if (entry.name === 'index.html') {
      // Convert /foo/index.html to /foo/
      const cleanPath = basePath ? `/${basePath}/` : '/';
      urls.push(cleanPath);
    }
  }

  return urls;
}

async function generateSitemap() {
  const urls = await findHtmlFiles(DIST_DIR);
  const today = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${SITE_URL}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === '/' ? '1.0' : url.includes('/agents/') && url !== '/agents/' ? '0.8' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`;

  await writeFile(join(DIST_DIR, 'sitemap.xml'), sitemap);
  console.log(`Generated sitemap.xml with ${urls.length} URLs`);
}

generateSitemap().catch(console.error);
