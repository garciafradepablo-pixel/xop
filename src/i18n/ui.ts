// Minimal translation dictionaries — Phase 0 seed.
// EN falls back to ES (via useTranslations) for any key not yet translated,
// so the site never shows blank strings while migration is incomplete.
import { DEFAULT_LOCALE } from './config';

export const ui = {
  es: {
    'nav.home': 'Inicio',
    'switcher.note': 'Traducción con sentido, no literal',
    'switcher.terms': 'Monkey, Moonkey, Keys y Operator Path no se traducen',
    'hero.cta.primary': 'Empezar Nivel 1',
    'hero.cta.secondary': 'Entrar al Lab',
  },
  en: {
    'nav.home': 'Home',
    'switcher.note': 'Translated for meaning, not word for word',
    'switcher.terms': 'Monkey, Moonkey, Keys and Operator Path stay untranslated',
    'hero.cta.primary': 'Start Level 1',
    'hero.cta.secondary': 'Enter the Lab',
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof DEFAULT_LOCALE];
