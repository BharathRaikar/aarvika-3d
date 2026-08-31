// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // PLACEHOLDER — replace with the real domain before launch.
  site: 'https://aarvika3d.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
