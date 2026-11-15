import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://radinkhayyam.github.io',
  output: 'static',
  devToolbar: { enabled: false },
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !/^\/404(?:\/|\.html)?$/.test(new URL(page).pathname) })],
});
