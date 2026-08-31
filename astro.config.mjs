// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// TEMPORARY: this site + base pair targets the GitHub Pages review deploy
// (a project site served from /aarvika-3d/). The real launch target is
// Cloudflare Pages at the domain root — switch site back to the real domain
// and drop `base` before that deploy.
// https://astro.build/config
export default defineConfig({
  site: 'https://bharathraikar.github.io',
  base: '/aarvika-3d',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
