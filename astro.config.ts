import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { storyInNav } from './src/data/story';

export default defineConfig({
  site: 'https://radinkhayyam.github.io',
  output: 'static',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => storyInNav || !page.includes('/story'),
    }),
  ],
});
