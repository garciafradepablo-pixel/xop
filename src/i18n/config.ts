// i18n constants — single source of truth for locales.
export const LOCALES = ['es', 'en', 'th', 'fr', 'it', 'ch'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';
// Labels shown in the switcher. 'ch' = Swiss German (de-CH), labelled CH.
export const LOCALE_LABELS: Record<Locale, string> = {
  es: 'ES', en: 'EN', th: 'TH', fr: 'FR', it: 'IT', ch: 'CH',
};

// Full native names shown in the language dropdown.
export const LOCALE_NAMES: Record<Locale, string> = {
  es: 'Español', en: 'English', th: 'ไทย', fr: 'Français', it: 'Italiano', ch: 'Deutsch (CH)',
};

// Non-default locales that own a URL prefix (/en/, /th/, /fr/, /it/, /ch/).
export const PREFIX_LOCALES = LOCALES.filter((l) => l !== DEFAULT_LOCALE);

// localStorage key for the user's chosen / detected language.
export const LOCALE_STORAGE_KEY = 'moonkey_lang';
