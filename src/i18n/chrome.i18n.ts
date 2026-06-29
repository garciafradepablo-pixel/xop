// Site chrome strings (footer + reset control) localized for all 6 locales.
// These live outside ui.ts because they're shared by Layout/LayoutLevel/index and
// were previously hardcoded Spanish (leaking onto every non-ES page). Brand terms
// stay untranslated per CLAUDE.md: MOONKEY LAB, MMXXVI, Operator Path, Keys, Monkeys,
// Arsenal, XNLAB Studio, XN, Connect, Foundations/Builder/Mastery (level codenames).
import type { Locale } from './config';

export interface ChromeStrings {
  tagline: string;          // footer brand tagline
  lab: string;              // "A laboratory by XNLAB Studio"
  level1: string; level2: string; level3: string;
  opTest: string;           // "Operator Test"
  arsenal: string;          // "Prompt arsenal"
  ecosystem: string;        // section heading
  account: string;          // section heading / link
  myAccount: string; signIn: string; support: string; privacy: string;
  manifesto: string; info: string; plans: string; glossary: string;
  builtOn: string;          // "Operator Path on XN & Connect"
  resetLabel: string;       // "Reset progress"
  resetConfirm: string;     // confirm() dialog
  logout: string;           // "Log out"
  syncPrompt: string;       // logged-out account sync hint
}

const chrome: Record<Locale, ChromeStrings> = {
  es: {
    tagline: 'Aprende, desbloquea Keys y convierte la IA en sistemas reales de trabajo.',
    lab: 'Un laboratorio de XNLAB Studio',
    level1: 'Nivel 1 · Foundations', level2: 'Nivel 2 · Builder', level3: 'Nivel 3 · Mastery',
    opTest: 'Test de Operador', arsenal: 'Arsenal de prompts',
    ecosystem: 'Ecosistema', account: 'Cuenta',
    myAccount: 'Mi cuenta', signIn: 'Entrar', support: 'Soporte', privacy: 'Privacidad',
    manifesto: 'Manifiesto', info: 'Info', plans: 'Planes', glossary: 'Glosario',
    builtOn: 'Operator Path sobre XN & Connect',
    resetLabel: 'Reiniciar progreso',
    resetConfirm: '¿Reiniciar todo el progreso de MOONKEY LAB?',
    logout: 'Cerrar sesión',
    syncPrompt: 'Inicia sesión para sincronizar tu progreso entre dispositivos.',
  },
  en: {
    tagline: 'Learn, unlock Keys and turn AI into real working systems.',
    lab: 'A laboratory by XNLAB Studio',
    level1: 'Level 1 · Foundations', level2: 'Level 2 · Builder', level3: 'Level 3 · Mastery',
    opTest: 'Operator Test', arsenal: 'Prompt arsenal',
    ecosystem: 'Ecosystem', account: 'Account',
    myAccount: 'My account', signIn: 'Sign in', support: 'Support', privacy: 'Privacy',
    manifesto: 'Manifesto', info: 'Info', plans: 'Plans', glossary: 'Glossary',
    builtOn: 'Operator Path on XN & Connect',
    resetLabel: 'Reset progress',
    resetConfirm: 'Reset all your MOONKEY LAB progress?',
    logout: 'Log out',
    syncPrompt: 'Sign in to sync your progress across devices.',
  },
  th: {
    tagline: 'เรียนรู้ ปลดล็อก Keys และเปลี่ยน AI ให้เป็นระบบทำงานจริง',
    lab: 'ห้องแล็บโดย XNLAB Studio',
    level1: 'ระดับ 1 · Foundations', level2: 'ระดับ 2 · Builder', level3: 'ระดับ 3 · Mastery',
    opTest: 'แบบทดสอบผู้ปฏิบัติการ', arsenal: 'คลัง Prompt',
    ecosystem: 'ระบบนิเวศ', account: 'บัญชี',
    myAccount: 'บัญชีของฉัน', signIn: 'เข้าสู่ระบบ', support: 'ฝ่ายสนับสนุน', privacy: 'ความเป็นส่วนตัว',
    manifesto: 'แถลงการณ์', info: 'ข้อมูล', plans: 'แผน', glossary: 'อภิธานศัพท์',
    builtOn: 'Operator Path บน XN & Connect',
    resetLabel: 'รีเซ็ตความคืบหน้า',
    resetConfirm: 'รีเซ็ตความคืบหน้าทั้งหมดใน MOONKEY LAB หรือไม่?',
    logout: 'ออกจากระบบ',
    syncPrompt: 'เข้าสู่ระบบเพื่อซิงค์ความคืบหน้าข้ามอุปกรณ์',
  },
  fr: {
    tagline: "Apprends, débloque des Keys et transforme l'IA en systèmes de travail réels.",
    lab: 'Un laboratoire de XNLAB Studio',
    level1: 'Niveau 1 · Foundations', level2: 'Niveau 2 · Builder', level3: 'Niveau 3 · Mastery',
    opTest: "Test d'opérateur", arsenal: 'Arsenal de prompts',
    ecosystem: 'Écosystème', account: 'Compte',
    myAccount: 'Mon compte', signIn: 'Se connecter', support: 'Support', privacy: 'Confidentialité',
    manifesto: 'Manifeste', info: 'Infos', plans: 'Offres', glossary: 'Glossaire',
    builtOn: 'Operator Path sur XN & Connect',
    resetLabel: 'Réinitialiser la progression',
    resetConfirm: 'Réinitialiser toute ta progression sur MOONKEY LAB ?',
    logout: 'Se déconnecter',
    syncPrompt: 'Connecte-toi pour synchroniser ta progression entre appareils.',
  },
  it: {
    tagline: "Impara, sblocca le Keys e trasforma l'IA in sistemi di lavoro reali.",
    lab: 'Un laboratorio di XNLAB Studio',
    level1: 'Livello 1 · Foundations', level2: 'Livello 2 · Builder', level3: 'Livello 3 · Mastery',
    opTest: 'Test operatore', arsenal: 'Arsenale di prompt',
    ecosystem: 'Ecosistema', account: 'Account',
    myAccount: 'Il mio account', signIn: 'Accedi', support: 'Supporto', privacy: 'Privacy',
    manifesto: 'Manifesto', info: 'Info', plans: 'Piani', glossary: 'Glossario',
    builtOn: 'Operator Path su XN & Connect',
    resetLabel: 'Reimposta i progressi',
    resetConfirm: 'Reimpostare tutti i tuoi progressi su MOONKEY LAB?',
    logout: 'Esci',
    syncPrompt: 'Accedi per sincronizzare i tuoi progressi tra dispositivi.',
  },
  ch: {
    tagline: 'Lerne, schalte Keys frei und mach KI zu echten Arbeitssystemen.',
    lab: 'Ein Labor von XNLAB Studio',
    level1: 'Stufe 1 · Foundations', level2: 'Stufe 2 · Builder', level3: 'Stufe 3 · Mastery',
    opTest: 'Operator-Test', arsenal: 'Prompt-Arsenal',
    ecosystem: 'Ökosystem', account: 'Konto',
    myAccount: 'Mein Konto', signIn: 'Anmelden', support: 'Support', privacy: 'Datenschutz',
    manifesto: 'Manifest', info: 'Info', plans: 'Pläne', glossary: 'Glossar',
    builtOn: 'Operator Path auf XN & Connect',
    resetLabel: 'Fortschritt zurücksetzen',
    resetConfirm: 'Den gesamten MOONKEY-LAB-Fortschritt zurücksetzen?',
    logout: 'Abmelden',
    syncPrompt: 'Melde dich an, um deinen Fortschritt geräteübergreifend zu synchronisieren.',
  },
};

export function chromeT(locale: Locale): ChromeStrings {
  return chrome[locale] ?? chrome.es;
}
