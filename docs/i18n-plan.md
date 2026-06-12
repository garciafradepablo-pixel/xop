# MOONKEY LAB — Plan de Internacionalización

Estrategia para añadir inglés sin rehacer el proyecto.

---

## Principio

Traducción por sentido, no traducción literal.
El objetivo no es un espejo en inglés — es que un operador anglófono entienda el sistema y quiera usarlo.

---

## Términos que NO se traducen

Estos son términos propios del sistema y se mantienen en inglés en todas las versiones:

| Término | Razón |
|---------|-------|
| `Monkey` / `Monkeys` | Identidad del usuario/comunidad |
| `Moonkey` | Marca del nivel completado |
| `Keys` | Progreso desbloqueado — metáfora visual |
| `Operator Path` | Sistema de aprendizaje |
| `Connect` | Capa de conexión/aplicación |
| `XN` | Metodología madre |
| `CLAUDE.md` | Término técnico |

---

## Ruta propuesta

El inglés vivirá en `/en/`. Las URLs en español no cambian.

```
/            → ES (actual)
/en/         → EN Home
/en/modules  → EN Nivel 1
/en/info     → EN Info
/en/planes   → EN Plans
/en/monkeys  → EN Monkeys
```

No duplicar el árbol completo desde el inicio — priorizar las 5 páginas más visitadas.

---

## Páginas prioritarias para traducir

1. **Home** (`/en/index.astro`) — primera impresión
2. **Info** (`/en/info.astro`) — explica el sistema
3. **Nivel 1** (`/en/modules.astro`) — contenido principal
4. **Planes** (`/en/plans.astro`) — captación internacional
5. **Monkeys** (`/en/monkeys.astro`) — comunidad

---

## Estrategia de implementación

### Opción A — Páginas duplicadas (recomendada para piloto)

Crear `/src/pages/en/index.astro`, etc. como páginas Astro independientes.

Ventajas:
- Sin complejidad técnica añadida
- Cada página ES/EN puede tener copy adaptado, no literal
- No rompe el build actual
- Fácil de mantener para un equipo pequeño

Desventajas:
- Duplica archivos
- Actualizaciones de estructura requieren cambios en ambos

### Opción B — i18n con Astro + archivos de traducción

Usar el sistema i18n de Astro 4 con `getRelativeLocaleUrl()` y archivos `.json` de traducciones.

Recomendada cuando haya más de 10 páginas activas en ambos idiomas.

---

## LanguageBar actual

- ES: activo
- EN: próximamente
- CAT: eliminado del roadmap hasta validar demanda

---

## Copy tone en inglés

El tono en inglés debe ser:
- Directo y operativo (no académico)
- Sin jerga de startup vacía
- Confiante pero honesto sobre el estado piloto
- Mismo nivel de exigencia que el español

Ejemplo:
- ES: "Convierte prompts en sistemas."
- EN: "Turn prompts into systems." (no: "AI-powered workflow automation solutions")

---

## Trigger para empezar

Iniciar traducción cuando:
- Al menos 3 usuarios anglófonos pregunten por el producto en inglés, o
- El piloto en español supere 20 Monkeys activos.
