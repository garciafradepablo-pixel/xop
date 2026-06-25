// Locale helpers — derive locale from URL, translate with EN->ES fallback,
// and map any path to its equivalent in another locale.
import { ui } from './ui';
import { DEFAULT_LOCALE, LOCALES, type Locale } from './config';

/** Reads the locale from the first path segment ("/en/..." -> "en"), else default. */
export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0];
  return (LOCALES as readonly string[]).includes(seg) ? (seg as Locale) : DEFAULT_LOCALE;
}

/**
 * Resolves locale preferring Astro.currentLocale (correct during fallback rewrites)
 * over pathname-based detection (which loses locale when rewrite changes the URL).
 */
export function resolveLocale(currentLocale: string | undefined, pathname: string): Locale {
  if (currentLocale && (LOCALES as readonly string[]).includes(currentLocale)) {
    return currentLocale as Locale;
  }
  return getLocaleFromPath(pathname);
}

/** Returns t(key); missing keys in the active locale fall back to ES, then to the key itself. */
export function useTranslations(locale: Locale) {
  const dict = ui[locale] as Record<string, string>;
  const base = ui[DEFAULT_LOCALE] as Record<string, string>;
  return (key: string): string => dict[key] ?? base[key] ?? key;
}

/** Maps a pathname to its equivalent in `target` locale (ES at root, others under /<locale>/). */
export function localizedPath(pathname: string, target: Locale): string {
  const parts = pathname.split('/').filter(Boolean);
  if ((LOCALES as readonly string[]).includes(parts[0])) parts.shift();
  const rest = parts.length ? '/' + parts.join('/') : '/';
  if (target === DEFAULT_LOCALE) return rest;
  return rest === '/' ? `/${target}/` : `/${target}${rest}`;
}
