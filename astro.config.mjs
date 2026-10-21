// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Served from the domain root on Cloudflare Pages.
// https://astro.build/config
export default defineConfig({
  site: 'https://aarvika3d.in',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
