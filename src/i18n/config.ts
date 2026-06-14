// i18n constants — single source of truth for locales.
export const LOCALES = ['es', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';
export const LOCALE_LABELS: Record<Locale, string> = { es: 'ES', en: 'EN' };

// localStorage key for the user's chosen / detected language.
export const LOCALE_STORAGE_KEY = 'moonkey_lang';
