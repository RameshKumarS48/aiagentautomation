import { defineConfig } from 'astro/config';
// Sitemap will be generated via build script

export default defineConfig({
  site: 'https://aiagentautomation.site',
  output: 'static',
  build: {
    format: 'directory'
  }
});
