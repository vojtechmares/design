// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { toMarkdown } from './integrations/to-markdown/index.ts';

import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://design.mares.cz',
  adapter: vercel({
    imageService: true,
    devImageService: 'sharp',
  }),
  integrations: [mdx(), toMarkdown({ pages: ['design-system'] }), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});