# XN AI OPERATOR PORTAL — CLAUDE.md

## Visión
Portal educativo gratuito en español para formar operadores IA.
Público: principiantes ambiciosos, creativos, futuros colaboradores del ecosistema XN.
Filosofía: menos teoría, más ejercicios que producen entregables reales.

## Stack
- Astro 4 (SSG, sin SSR)
- Tailwind CSS 3
- Sin backend, sin base de datos, sin login, sin autenticación
- Deploy en Cloudflare Pages, Vercel o Netlify

## Estructura
```
src/
  components/   — Layout, Header, PromptBlock
  pages/        — index, ruta-7-dias, prompts, glosario, onboarding
  styles/       — global.css (imports Tailwind + custom base)
public/         — favicon.svg
```

## Paleta y diseño
- Fondo: #080808
- Superficie/cards: #0d0d0d – #111111
- Bordes: #141414 – #1f1f1f
- Texto principal: #e5e5e5
- Texto muted: #525252 – #737373
- Acento verde: #86efac
- Monospace para etiquetas, labels y código
- Labels: uppercase, tracking-widest, text-xs, verde acento

## Tono del contenido
- Claro, directo, práctico
- Sin lenguaje académico
- Sin humo ni promesas vacías
- Sin emojis

## Reglas de coste
- No añadir dependencias sin justificación clara
- No crear archivos que puedan fusionarse en uno
- No usar JavaScript donde basta HTML/CSS
- No añadir animaciones complejas
- No generar contenido sin que se haya pedido explícitamente
- Si algo puede ser Markdown, que sea Markdown

## Cómo añadir un módulo nuevo
1. Crear la página en `src/pages/nombre-modulo.astro`
2. Usar Layout como componente envoltorio
3. Añadir el link al array `navLinks` en `Header.astro`
4. Seguir la misma estructura visual: label → h1 → descripción → contenido

## Cómo añadir términos al glosario
Editar el array `terminos` en `src/data/glosario.ts` (fuente única).
Cada término tiene `term` (string) y `def` (string).
La página `glosario.astro` muestra todos; `MiniGlossary.astro` muestra el
subconjunto definido por `MINI_GLOSARIO_KEYS`. Para que un término aparezca
también en el "Glosario rápido" inline, añade su `term` a ese array.

## Cómo añadir prompts
Editar el array `prompts` en `src/pages/prompts.astro`.
Cada prompt tiene `tag`, `title` y `prompt` (string multilínea con backticks).

## Qué no sobrecomplicar
- No crear sistema de rutas dinámicas hasta que haya más de 10 páginas de contenido
- No migrar a MDX hasta que el contenido sea tan largo que no quepa en .astro
- No añadir búsqueda hasta que haya al menos 50 entradas de contenido
- No añadir internacionalización en fase 1
- No añadir sistema de autenticación bajo ninguna circunstancia
