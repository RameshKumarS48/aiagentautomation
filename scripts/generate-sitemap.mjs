#!/usr/bin/env node
/**
 * Enhanced sitemap generator with SEO optimizations
 * - Proper priorities for different content types
 * - Changefreq based on content freshness
 * - Blog posts get higher priority for indexing
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
      const cleanPath = basePath ? `/${basePath}/` : '/';
      urls.push(cleanPath);
    }
  }

  return urls;
}

function getUrlMetadata(url) {
  const today = new Date().toISOString().split('T')[0];

  // Homepage - highest priority
  if (url === '/') {
    return { priority: '1.0', changefreq: 'daily', lastmod: today };
  }

  // Blog listing page
  if (url === '/blog/') {
    return { priority: '0.9', changefreq: 'daily', lastmod: today };
  }

  // Individual blog posts - high priority for SEO
  if (url.startsWith('/blog/') && url !== '/blog/') {
    return { priority: '0.8', changefreq: 'weekly', lastmod: today };
  }

  // Agents listing page
  if (url === '/agents/') {
    return { priority: '0.9', changefreq: 'daily', lastmod: today };
  }

  // Individual agent pages
  if (url.startsWith('/agents/') && url !== '/agents/') {
    return { priority: '0.7', changefreq: 'weekly', lastmod: today };
  }

  // Categories page
  if (url === '/categories/' || url.startsWith('/categories/')) {
    return { priority: '0.8', changefreq: 'weekly', lastmod: today };
  }

  // About page
  if (url === '/about/') {
    return { priority: '0.5', changefreq: 'monthly', lastmod: today };
  }

  // Default for other pages
  return { priority: '0.5', changefreq: 'weekly', lastmod: today };
}

async function generateSitemap() {
  const urls = await findHtmlFiles(DIST_DIR);

  // Sort URLs: homepage first, then blogs, then agents, then others
  urls.sort((a, b) => {
    const order = (url) => {
      if (url === '/') return 0;
      if (url === '/blog/') return 1;
      if (url.startsWith('/blog/')) return 2;
      if (url === '/agents/') return 3;
      if (url.startsWith('/agents/')) return 4;
      if (url.startsWith('/categories/')) return 5;
      return 6;
    };
    return order(a) - order(b);
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(url => {
  const meta = getUrlMetadata(url);
  return `  <url>
    <loc>${SITE_URL}${url}</loc>
    <lastmod>${meta.lastmod}</lastmod>
    <changefreq>${meta.changefreq}</changefreq>
    <priority>${meta.priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  await writeFile(join(DIST_DIR, 'sitemap.xml'), sitemap);

  // Count by type
  const blogCount = urls.filter(u => u.startsWith('/blog/') && u !== '/blog/').length;
  const agentCount = urls.filter(u => u.startsWith('/agents/') && u !== '/agents/').length;

  console.log(`Generated sitemap.xml with ${urls.length} URLs`);
  console.log(`  - ${blogCount} blog posts`);
  console.log(`  - ${agentCount} agent pages`);
}

generateSitemap().catch(console.error);
