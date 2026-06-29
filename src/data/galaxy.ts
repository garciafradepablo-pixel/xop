// ════════════════════════════════════════════════════════════════════════
// THE GALAXY — single source of truth for MOONKEY LAB's learning constellations.
//
// The school is no longer one course. It is a galaxy: the Operator Core (the
// sun — how to operate AI) with specialised constellations orbiting it, each
// teaching the real skills behind one or more of our projects. Add a domain =
// add a constellation here. Nothing else needs to change: the galaxy map and
// every track page are generated from this file.
// ════════════════════════════════════════════════════════════════════════

import { galaxyI18n } from './galaxy.i18n';

export type ThemeName = 'emerald' | 'sky' | 'violet' | 'amber' | 'rose' | 'indigo';

export interface GalaxyModule {
  code: string;            // 'OC-01'
  title: string;
  blurb: string;           // one honest line on what you walk away able to do
  status: 'live' | 'forming';
  href?: string;           // set when a real page already teaches it
}

export interface Constellation {
  id: string;              // url slug: /constelacion/<id>
  name: string;
  tagline: string;         // 3–5 words
  mission: string;         // 2–3 lines: what you learn + why it matters
  theme: ThemeName;
  powers: string[];        // which projects this constellation feeds
  orbit: 0 | 1 | 2;        // ring on the map (0 = the core/sun)
  angle: number;           // degrees around its ring (0 = right, clockwise)
  modules: GalaxyModule[];
}

// Static (JIT-safe) class + colour tokens per theme. Never interpolate
// `bg-${theme}` into Tailwind — these explicit maps keep classes in the build.
export const THEME: Record<ThemeName, {
  dot: string; glow: string; text: string; border: string; bgSoft: string;
  ring: string; grad: string; chip: string;
}> = {
  emerald: { dot: '#10b981', glow: 'rgba(16,185,129,0.55)', text: 'text-emerald-600', border: 'border-emerald-300', bgSoft: 'bg-emerald-50', ring: 'ring-emerald-400', grad: 'from-emerald-500 to-emerald-300', chip: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  sky:     { dot: '#0ea5e9', glow: 'rgba(14,165,233,0.55)', text: 'text-sky-600',     border: 'border-sky-300',     bgSoft: 'bg-sky-50',     ring: 'ring-sky-400',     grad: 'from-sky-500 to-sky-300',         chip: 'bg-sky-50 text-sky-700 border-sky-200' },
  violet:  { dot: '#8b5cf6', glow: 'rgba(139,92,246,0.55)', text: 'text-violet-600',  border: 'border-violet-300',  bgSoft: 'bg-violet-50',  ring: 'ring-violet-400',  grad: 'from-violet-500 to-violet-300',   chip: 'bg-violet-50 text-violet-700 border-violet-200' },
  amber:   { dot: '#f59e0b', glow: 'rgba(245,158,11,0.55)', text: 'text-amber-600',   border: 'border-amber-300',   bgSoft: 'bg-amber-50',   ring: 'ring-amber-400',   grad: 'from-amber-500 to-amber-300',     chip: 'bg-amber-50 text-amber-700 border-amber-200' },
  rose:    { dot: '#f43f5e', glow: 'rgba(244,63,94,0.55)',  text: 'text-rose-600',    border: 'border-rose-300',    bgSoft: 'bg-rose-50',    ring: 'ring-rose-400',    grad: 'from-rose-500 to-rose-300',       chip: 'bg-rose-50 text-rose-700 border-rose-200' },
  indigo:  { dot: '#6366f1', glow: 'rgba(99,102,241,0.55)', text: 'text-indigo-600',  border: 'border-indigo-300',  bgSoft: 'bg-indigo-50',  ring: 'ring-indigo-400',  grad: 'from-indigo-500 to-indigo-300',   chip: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
};

export const constellations: Constellation[] = [
  // ── THE SUN ────────────────────────────────────────────────────────────
  {
    id: 'operator-core',
    name: 'Operator Core',
    tagline: 'Operar la IA',
    mission: 'El sol de la galaxia. Aprendes a operar Claude Code y sistemas IA como un profesional: entorno, contexto, prompts, versión y deploy. Todo lo demás orbita aquí.',
    theme: 'emerald',
    powers: ['Todos los proyectos'],
    orbit: 0,
    angle: 0,
    modules: [
      { code: 'OC-01', title: 'Entorno operativo', blurb: 'Terminal, VS Code y Claude Code listos para construir.', status: 'live', href: '/modulos' },
      { code: 'OC-02', title: 'CLAUDE.md: contexto persistente', blurb: 'Das memoria a la IA para que trabaje preciso, no genérico.', status: 'live', href: '/modulos' },
      { code: 'OC-03', title: 'Arsenal de prompts', blurb: 'Plantillas con rol, estructura e intención. Trabajo real.', status: 'live', href: '/prompts' },
      { code: 'OC-04', title: 'Git & GitHub para operadores', blurb: 'Versionas tu trabajo sin miedo a romper nada.', status: 'live', href: '/modulos' },
      { code: 'OC-05', title: 'Automatizaciones y deploy', blurb: 'De script manual a sistema que corre y publica solo.', status: 'live', href: '/advanced' },
      { code: 'OC-06', title: 'Migración ChatGPT → Claude', blurb: 'Trasladas tu contexto y montas un sistema documentado.', status: 'live', href: '/migrador' },
      { code: 'OC-07', title: 'Verificación y testing', blurb: 'No confías en "parece que funciona": lo verificas antes de publicar.', status: 'forming' },
      { code: 'OC-08', title: 'Sesiones largas y orquestación', blurb: 'Manejas el contexto, recuperas sesiones descarriladas y delegas en subagentes.', status: 'forming' },
    ],
  },

  // ── INNER RING — the cross-cutting craft ────────────────────────────────
  {
    id: 'data-systems',
    name: 'Data & Systems',
    tagline: 'Backend que aguanta',
    mission: 'Postgres, Supabase y RLS: dónde vive el dato y quién puede tocarlo. La seguridad como autoridad del servidor, no del cliente. El backbone de XHUB, Espejo y esta escuela.',
    theme: 'sky',
    powers: ['XHUB IRON', 'Espejo', 'MOONKEY LAB'],
    orbit: 1,
    angle: 205,
    modules: [
      { code: 'DS-01', title: 'Modelado en Postgres', blurb: 'Tablas, relaciones y tipos que no te traicionan luego.', status: 'forming' },
      { code: 'DS-02', title: 'RLS: la autoridad es el servidor', blurb: 'Por qué el gate del cliente es UX y la RLS es la seguridad real.', status: 'forming' },
      { code: 'DS-03', title: 'Auth magic-link & sesiones', blurb: 'Login sin contraseñas y manejo honesto de sesión.', status: 'forming' },
      { code: 'DS-04', title: 'SECURITY DEFINER, RPC y triggers', blurb: 'Lógica privilegiada sin abrir agujeros de escalación.', status: 'forming' },
      { code: 'DS-05', title: 'Sync local ↔ nube', blurb: 'Estado en localStorage que sube a la nube sin perder nada.', status: 'forming' },
      { code: 'DS-06', title: 'Advisors, migraciones y auditoría', blurb: 'Cambios versionados y un linter de seguridad como red.', status: 'forming' },
    ],
  },
  {
    id: 'builders',
    name: 'Builders',
    tagline: 'Enviar producto',
    mission: 'Convertir una idea en algo que carga, se ve bien y se despliega. Astro, componentes, multi-tenant, white-label e i18n. El oficio de Espejo y de las webs de XNLAB.',
    theme: 'violet',
    powers: ['Espejo', 'XNLAB'],
    orbit: 1,
    angle: 335,
    modules: [
      { code: 'BD-01', title: 'Astro & Vite que cargan rápido', blurb: 'Sitios estáticos veloces sin frameworks pesados.', status: 'forming' },
      { code: 'BD-02', title: 'Componentes y design tokens', blurb: 'Un sistema visual coherente, no CSS suelto.', status: 'forming' },
      { code: 'BD-03', title: 'Multi-tenant & white-label', blurb: 'Un producto, muchos clientes: el seam Store de Espejo.', status: 'forming' },
      { code: 'BD-04', title: 'i18n: una galaxia en 6 idiomas', blurb: 'Arquitectura de locales sin duplicar páginas.', status: 'forming' },
      { code: 'BD-05', title: 'Deploy: Cloudflare, dominios, env', blurb: 'De localhost a URL real con variables seguras.', status: 'forming' },
      { code: 'BD-06', title: 'De localStorage a backend', blurb: 'Cambiar la capa de datos sin reescribir la app.', status: 'forming' },
    ],
  },

  // ── OUTER RING — the specialised domains ────────────────────────────────
  {
    id: 'signal',
    name: 'Signal',
    tagline: 'Quant & research',
    mission: 'Sistemas de investigación que no se mienten a sí mismos: ingesta read-only, clasificación de régimen, memoria de mercado y calibración. La columna vertebral de XCAP.',
    theme: 'amber',
    powers: ['XCAP'],
    orbit: 2,
    angle: 35,
    modules: [
      { code: 'SG-01', title: 'Ingesta read-only & edge sin llaves', blurb: 'Traer datos del mundo sin exponer credenciales.', status: 'forming' },
      { code: 'SG-02', title: 'Clasificador de régimen de precio', blurb: 'Saber en qué estado está el mercado antes de decidir.', status: 'forming' },
      { code: 'SG-03', title: 'Market Memory: forecast + calibración', blurb: 'Un ledger que registra predicciones y mide aciertos.', status: 'forming' },
      { code: 'SG-04', title: 'Anti-fabricación por construcción', blurb: 'Diseñar el sistema para que no pueda inventarse datos.', status: 'forming' },
      { code: 'SG-05', title: 'Capital invariant', blurb: 'El capital solo se mueve en cierres reales, nunca se resetea.', status: 'forming' },
      { code: 'SG-06', title: 'Autopilot ticks & loops honestos', blurb: 'Bucles autónomos que acumulan aprendizaje, no ruido.', status: 'forming' },
    ],
  },
  {
    id: 'brand-surface',
    name: 'Brand & Surface',
    tagline: 'Marca y superficie',
    mission: 'Lo que se ve y cómo suena. Minimalismo radical, tipografía, voz de estudio y traducción que preserva el sentido. El criterio estético de XNLAB aplicado a todo.',
    theme: 'rose',
    powers: ['XNLAB', 'Todos los proyectos'],
    orbit: 2,
    angle: 155,
    modules: [
      { code: 'BS-01', title: 'Minimalismo radical', blurb: 'Editar y quitar antes que añadir. Cirugía, no decoración.', status: 'forming' },
      { code: 'BS-02', title: 'Tipografía con intención', blurb: 'Mezclar sans e itálica serif sin que chirríe.', status: 'forming' },
      { code: 'BS-03', title: 'Voz de estudio', blurb: 'Tono anónimo, directo, sin humo ni promesas vacías.', status: 'forming' },
      { code: 'BS-04', title: 'Traducir preservando el sentido', blurb: 'Que el inglés y el español digan lo mismo, no lo literal.', status: 'forming' },
      { code: 'BS-05', title: 'Color y profundidad', blurb: 'Glass, bandas y campos de color que dan vida sin ruido.', status: 'forming' },
    ],
  },
  {
    id: 'ops-security',
    name: 'Ops & Security',
    tagline: 'La disciplina',
    mission: 'La diferencia entre un proyecto y un incidente. Secretos, modelo de amenaza, auditoría adversarial y aislamiento entre proyectos. Disciplina que protege toda la galaxia.',
    theme: 'indigo',
    powers: ['Todos los proyectos'],
    orbit: 2,
    angle: 275,
    modules: [
      { code: 'OS-01', title: 'Secretos: público vs privado', blurb: 'Qué clave puede vivir en el cliente y cuál jamás.', status: 'forming' },
      { code: 'OS-02', title: 'Modelo de amenaza de una SSG', blurb: 'Pensar como atacante de un sitio estático + anon key.', status: 'forming' },
      { code: 'OS-03', title: 'Auditoría adversarial', blurb: 'Verificar cada hallazgo en vez de creerlo. Refutar primero.', status: 'forming' },
      { code: 'OS-04', title: 'Incident response & rollback', blurb: 'Qué haces cuando algo se rompe en producción.', status: 'forming' },
      { code: 'OS-05', title: 'Aislamiento entre proyectos', blurb: 'Una DB compartida sin que un proyecto pise a otro.', status: 'forming' },
      { code: 'OS-06', title: 'Observabilidad y coste', blurb: 'Logs, monitorización y el coste real de operar un sistema vivo.', status: 'forming' },
    ],
  },
];

// ── i18n ──────────────────────────────────────────────────────────────────
// Returns a constellation with tagline/mission/module-text resolved for the
// given locale. ES (or any missing translation) falls back to the canonical.
export function localizeConstellation(c: Constellation, locale: string): Constellation {
  if (locale === 'es') return c;
  const t = galaxyI18n[locale]?.[c.id];
  if (!t) return c;
  return {
    ...c,
    tagline: t.tagline ?? c.tagline,
    mission: t.mission ?? c.mission,
    modules: c.modules.map((m) => {
      const mt = t.modules?.[m.code];
      return mt ? { ...m, title: mt.title ?? m.title, blurb: mt.blurb ?? m.blurb } : m;
    }),
  };
}

export const localizedConstellations = (locale: string) =>
  constellations.map((c) => localizeConstellation(c, locale));

// "Todos los proyectos" is the only non-brand power value; brand names stay.
const POWER_ALL: Record<string, string> = {
  es: 'Todos los proyectos', en: 'All projects', th: 'ทุกโปรเจกต์',
  fr: 'Tous les projets', it: 'Tutti i progetti', ch: 'Alle Projekte',
};
export const localizePower = (p: string, locale: string): string =>
  p === 'Todos los proyectos' ? (POWER_ALL[locale] ?? p) : p;

// ── Derived helpers ───────────────────────────────────────────────────────
export const getConstellation = (id: string) => constellations.find((c) => c.id === id);

export const galaxyStats = () => {
  const modules = constellations.flatMap((c) => c.modules);
  return {
    constellations: constellations.length,
    modules: modules.length,
    live: modules.filter((m) => m.status === 'live').length,
    forming: modules.filter((m) => m.status === 'forming').length,
    projects: Array.from(new Set(constellations.flatMap((c) => c.powers))).filter((p) => p !== 'Todos los proyectos'),
  };
};

// Map geometry: pixel position of a constellation on the galaxy map, given the
// SVG centre and the radius of each orbit ring.
export const orbitRadius = (orbit: number, rings: [number, number, number]) => rings[orbit] ?? 0;
export const nodePosition = (
  cx: number, cy: number, orbit: number, angle: number, rings: [number, number, number]
) => {
  const r = orbitRadius(orbit, rings);
  const rad = (angle * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};
