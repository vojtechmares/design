// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { toMarkdown } from './integrations/to-markdown/index.ts';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://design.mares.cz',
  integrations: [mdx(), toMarkdown({ pages: ['design-system'] }), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});