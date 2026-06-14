import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // Phase 0 i18n foundation — ES stays at root, EN under /en/.
  // fallback rewrite: every page is available at /en/* serving ES content
  // until it is translated, so the switcher never 404s and URLs don't move.
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false,
      fallbackType: 'rewrite',
    },
    fallback: { en: 'es' },
  },
  integrations: [tailwind()],
});
