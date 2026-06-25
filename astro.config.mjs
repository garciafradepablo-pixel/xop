import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // Phase 0 i18n foundation — ES stays at root, EN under /en/.
  // 'rewrite' regenerates /en/* pages with EN locale context so t() calls produce EN content.
  // Triggers a cosmetic Astro.request.headers warning in static builds — harmless, build passes.
  i18n: {
    locales: ['es', 'en', 'th', 'fr', 'it', 'ch'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false,
      fallbackType: 'rewrite',
    },
    // Any key missing in a locale's dictionary falls back to ES at render time.
    fallback: { en: 'es', th: 'es', fr: 'es', it: 'es', ch: 'es' },
  },
  integrations: [tailwind()],
});
