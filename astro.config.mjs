import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://aiagentautomation.site',
  output: 'static',
  integrations: [tailwind()],
  build: {
    format: 'directory'
  }
});
