import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // Phase 0 i18n foundation — ES stays at root, EN under /en/.
  // 'redirect' avoids request.headers access in static builds (rewrite triggers that).
  // /en/* pages are generated as meta-refresh redirects to the ES root equivalent.
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false,
      fallbackType: 'redirect',
    },
    fallback: { en: 'es' },
  },
  integrations: [tailwind()],
});
