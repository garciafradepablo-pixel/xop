# XN AI OPERATOR PORTAL

Escuela práctica para operadores IA. En español. Gratis. Sin teoría infinita.

## Qué es

Un portal estático que sirve como:
- Guía de aprendizaje para operar sistemas IA (Claude Code, GitHub, automatizaciones)
- Onboarding para futuros colaboradores del ecosistema XN
- Referencia de prompts, glosario y ruta de entrenamiento estructurada

## Stack

- [Astro](https://astro.build) — framework de sitios estáticos
- [Tailwind CSS](https://tailwindcss.com) — utilidades de estilo
- Sin base de datos. Sin login. Sin backend.

## Requisitos

Node.js 18 o superior.

## Instalar

```bash
cd xop
npm install
```

## Correr en local

```bash
npm run dev
```

Abre http://localhost:4321 en tu navegador.

## Build de producción

```bash
npm run build
npm run preview   # para previsualizar el build antes de desplegar
```

Los archivos estáticos quedan en `dist/`.

## Deploy gratuito

### Cloudflare Pages (recomendado)
1. Sube el proyecto a GitHub
2. Entra en dash.cloudflare.com → Workers & Pages → Create
3. Conecta el repositorio
4. Framework preset: Astro
5. Build command: `npm run build`
6. Output directory: `dist`

### Vercel
```bash
npx vercel
```
O conecta el repo desde vercel.com. Detección automática de Astro.

### Netlify
Conecta el repo desde app.netlify.com.
Build command: `npm run build` / Publish directory: `dist`

## Estructura

```
src/
├── components/
│   ├── Layout.astro      — Wrapper HTML global
│   ├── Header.astro      — Navegación sticky
│   ├── Card.astro        — Card reutilizable con/sin enlace
│   └── PromptBlock.astro — Bloque de prompt con botón copiar
├── pages/
│   ├── index.astro       — Home
│   ├── ruta-7-dias.astro — Ruta de 8 días (Día 0–7)
│   ├── prompts.astro     — 5 prompts de trabajo
│   ├── glosario.astro    — 15 términos esenciales
│   └── onboarding.astro  — Para futuros colaboradores
└── styles/
    └── global.css        — Base Tailwind + overrides mínimos
```

## Cómo contribuir o ampliar

Ver `CLAUDE.md` para reglas de estilo, coste y estructura.
