# MOONKEY LAB — CLAUDE.md

> Escuela modular para formar **operadores IA**. Un laboratorio de XNLAB Studio.
> Deploy: Cloudflare Pages (`xop-50a.pages.dev`) · Repo: `garciafradepablo-pixel/xop`.

## Visión
Academia por niveles (Operator Path) donde el progreso se mide en **entregables reales**,
no en teoría. Animal-progression: Monkey (N1) → Gorilla (N2) → Panda (N3) → … → Moonkey
(quien completa las 3 Keys). Público: principiantes ambiciosos de cualquier país.

## Stack (REAL — actualizado)
- **Astro 4** (SSG estático, sin SSR). El build genera HTML por locale vía rewrite.
- **Tailwind CSS 3** + tokens en `src/styles/global.css` (paleta CLARA: emerald/violet/amber
  sobre `--surface-base #f8fafc`; texto `--text-primary #0f172a`). NO es la paleta oscura vieja.
- **Supabase** (proyecto `moonkey-lab`, ref `wuchsslgbqlhyxljsmxi`): auth magic-link,
  sync de progreso, captura de proofs, referidos. Cliente en `src/lib/supabase.ts` (solo anon key).
- **i18n**: 6 locales `['es','en','th','fr','it','ch']`. ES en raíz, resto bajo `/en/ /th/ /fr/ /it/ /ch/`.

> ⚠️ La DB Supabase es COMPARTIDA con XHUB IRON (tablas `iron_*`, `world_*`, `focus_*`,
> `daily_focus_history`). Esas NO son de MOONKEY — no las toques. Tablas de MOONKEY:
> `profiles, progress, feedback, leads, proofs`. RPCs: `update_operator_rank`,
> `my_referral_stats`, `is_admin`. Triggers: `handle_new_user`, `guard_privileged_profile_columns`.

## Modelo de seguridad (autoridad = RLS, no el cliente)
Es un sitio estático: NO hay handler server-side. El límite real es Postgres RLS.
- `profiles/progress/feedback/proofs` SELECT = **self-or-admin** (`is_admin()` SECURITY DEFINER).
  Un no-admin no puede leer filas ajenas (verificado por impersonación).
- `proofs` INSERT exige sesión y liga `user_id = auth.uid()` (`proofs_insert_self`).
- `role` y `founder_badge` son **inmutables para no-admins** (trigger guard) → no hay
  auto-escalación al panel admin. Rangos solo vía `update_operator_rank` (revalida rol).
- `admin.astro` es UX (oculta el panel); la seguridad NO depende de ese gate.
- TRUNCATE revocado de anon/authenticated. RPCs operativos = `authenticated` only.

## i18n — TRES patrones (ojo a la inconsistencia)
1. `src/i18n/ui.ts` con `useTranslations(locale)` → `t('key')`. Para chrome/nav corto.
   Usado por index, cuenta, login, modulos. Fallback de key faltante → ES.
2. Objetos de contenido inline con `cLocale = (es|th) ? locale : 'en'` (FR/IT/CH→EN).
   Para contenido pesado: modulos (currículum). 
3. `src/pages/en/*.astro` (info, manifiesto, privacidad, prompts, soporte): override SOLO
   de EN. ⚠️ Las 5 páginas raíz siguen hardcodeadas en español → /th/fr/it/ch muestran ES.
   **Pendiente**: unificar a contenido locale-aware (EN/FR/IT ya traducidos) y borrar en/*.astro.

## La Galaxia (modelo de aprendizaje — punto de extensión clave)
La escuela NO es un curso plano. Es una **galaxia**: el `Operator Core` (operar IA = el sol)
con **constelaciones** orbitando, cada una enseñando las habilidades reales detrás de un
proyecto (Data & Systems→XHUB/Espejo, Builders→Espejo/XNLAB, Signal→XCAP, Brand & Surface→XNLAB,
Ops & Security→todos).
- **Fuente única**: `src/data/galaxy.ts` (constelaciones + módulos + `THEME` de colores JIT-safe).
- **Mapa**: `src/pages/galaxia.astro` (star-map SVG generado desde los datos + grid de cards).
- **Tracks**: `src/pages/constelacion/[id].astro` (UNA plantilla `getStaticPaths` → todas).
- **Añadir un dominio = añadir un objeto a `constellations[]`**. El mapa y su página se generan
  solos. Módulos marcan `status: 'live'|'forming'` (honesto sobre qué existe). Nuevos colores →
  añade la entrada a `THEME` (nunca interpoles `bg-${theme}`, rompe el JIT de Tailwind).

## Estructura
```
src/
  components/  — Layout, Header, LanguageBar, MoonkeyLogo, AnimalIcon, PromptBlock, FlowDiagram
  data/        — galaxy.ts (constelaciones/tracks — fuente única del aprendizaje), glosario.ts
  pages/       — index, galaxia, constelacion/[id], modulos(N1), advanced(N2), migrador(N3),
                 prompts, monkeys, planes, cuenta, login, admin, info, manifiesto, soporte, …
  i18n/        — config.ts (locales), ui.ts (~240 keys), utils.ts (resolveLocale/localizedPath/t)
  lib/         — supabase.ts
  styles/      — global.css (tokens, glass, reveal, parallax, blobs)
```

## Convenciones
- Headings h1–h3 / `.font-display` = Space Grotesk. Body = Inter. Labels mono = JetBrains Mono.
- `.label` = mono uppercase tracking-widest emerald-600. Cards = glass o `module-card`.
- Animaciones reveal: `data-reveal` (+ `data-delay` ms). El IntersectionObserver es **global**
  (en Layout.astro) — no lo dupliques por página.
- Rango interno se almacena como `'eagle'` (N3) por compatibilidad pero se MUESTRA como "Panda".
- Hrefs deben ser **locale-aware**: usa `localizedPath('/ruta', locale)`, nunca `/ruta` crudo
  (rompe bajo prefijo de idioma).

## Tono
Claro, directo, práctico. Sin lenguaje académico, sin humo, sin emojis.
Términos de marca NO se traducen: Monkey, Moonkey, Key, Operator Path, Arsenal, CLAUDE.md.

## Reglas de coste
- No añadir dependencias sin justificación. No JS donde basta HTML/CSS.
- No tocar tablas de otros proyectos en la DB compartida (ver aviso arriba).
- Cambios de RLS/seguridad: aplicar como migración versionada + `get_advisors` después.
