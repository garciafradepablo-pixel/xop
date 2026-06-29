// One-shot generator: reads the galaxy-i18n workflow output and writes
// src/data/galaxy.i18n.ts with all 5 locales (modules keyed by code).
import fs from 'node:fs';

const SRC = process.argv[2];
const OUT = new URL('../src/data/galaxy.i18n.ts', import.meta.url);

const j = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const byLocale = (j.byLocale ? j : (j.result || {})).byLocale;

// Decode the HTML entities some translators emitted (we render as text; Astro
// escapes, so values must hold literal &, <, >, ", ').
const decode = (s) => String(s)
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'");

const LOCALES = ['en', 'th', 'fr', 'it', 'ch'];
const out = {};
for (const loc of LOCALES) {
  out[loc] = {};
  const cons = byLocale[loc] || {};
  for (const id of Object.keys(cons)) {
    const c = cons[id];
    const modules = {};
    for (const m of (c.modules || [])) modules[m.code] = { title: decode(m.title), blurb: decode(m.blurb) };
    out[loc][id] = { tagline: decode(c.tagline), mission: decode(c.mission), modules };
  }
}

const header = `// ════════════════════════════════════════════════════════════════════════
// Galaxy translations overlay. \`galaxy.ts\` holds the ES canonical content;
// this file provides en/th/fr/it/ch for the translatable fields (tagline,
// mission, per-module title/blurb). Constellation NAMES and module CODES stay
// canonical. \`localizeConstellation()\` in galaxy.ts merges this over canonical;
// any missing entry falls back to Spanish.
//
// GENERATED from the galaxy-i18n workflow. Re-run scripts/gen-galaxy-i18n.mjs
// to regenerate; edit translations there or here, but keep the shape.
// ════════════════════════════════════════════════════════════════════════

export interface ModuleT { title?: string; blurb?: string }
export interface ConstellationT { tagline?: string; mission?: string; modules?: Record<string, ModuleT> }
export type GalaxyI18n = Record<string, Record<string, ConstellationT>>;

export const galaxyI18n: GalaxyI18n = `;

fs.writeFileSync(OUT, header + JSON.stringify(out, null, 2) + ';\n', 'utf8');

// Report coverage
const report = LOCALES.map((l) => {
  const ids = Object.keys(out[l]);
  const mods = ids.reduce((n, id) => n + Object.keys(out[l][id].modules).length, 0);
  return `${l}: ${ids.length} constellations, ${mods} modules`;
}).join('\n');
console.log('Wrote galaxy.i18n.ts\n' + report);
