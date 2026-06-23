# near.org motion R&D — CLAUDE.md

## Propósito

Sandbox de experimentos de animación (GSAP) que sirve como R&D para el
rediseño de near.org. No es el sitio final — es para probar motion design
y mostrarle avances al equipo en rutas sueltas (`/exp1`, `/exp2`, etc.).

## Stack

- **Framework**: Next.js (App Router, TypeScript)
- **CSS**: Tailwind CSS v4 + design tokens propios (`styles/tokens.css`)
- **Animación**: GSAP 3 + `@gsap/react` (`useGSAP` hook)
- **Fuentes**: Space Grotesk (Google Fonts, placeholder de FKGrotesk) + Mona Sans (self-hosted, open source)

## Estructura de carpetas

```
/app
  layout.tsx          — nav global + carga de fuentes
  page.tsx            — landing con lista de experimentos
  /exp1/page.tsx      — experimento 1: hero text reveal (on-load word stagger)
  /exp2/page.tsx      — experimento 2: landing home (scroll pinning + counters)
  /exp3/page.tsx      — experimento 3: ecosystem grid (batch stagger + H-scroll + marquee)
  /exp4/page.tsx      — experimento 4: blog article (progress bar + SVG line-draw + heading reveals)
  /components/ui/     — componentes compartidos (vacío por ahora)
/lib
  /gsap/register.ts   — registerPlugin() UNA sola vez; exporta gsap y plugins
/styles
  tokens.css          — design tokens extraídos de near.org (ver sección abajo)
  globals.css         — estilos base usando tokens
/public
  /fonts/MonaSans-Variable.woff2
```

## Fuentes

- **`--font-family-primary`** → Space Grotesk (variable `--font-space-grotesk`)
  - Es un **placeholder** de FKGrotesk (comercial, Fontwerk).
  - Reemplazar por FKGrotesk en cuanto el equipo de diseño entregue los archivos con licencia.
- **`--font-family-secondary`** → Mona Sans (variable `--font-mona-sans`)
  - Self-hosted. Licencia SIL. Repo: github.com/github/mona-sans

## Convenciones de animación (GSAP)

- **Registro de plugins**: solo en `lib/gsap/register.ts`. Nunca dentro de un componente.
- **Hook**: `useGSAP` con `scope` apuntando al `ref` del contenedor — limpia automáticamente al desmontar.
- **`prefers-reduced-motion`**: usar `gsap.matchMedia()`. Si está activo → fade simple, sin movimiento.
- **Duraciones**: micro-interacciones 0.2–0.4s · reveals de entrada 0.6–1s.
- **Easing**: `power3.out` para entradas · `power2.inOut` para movimiento continuo. Evitar `linear`.
- **Stagger**: 0.05–0.12s entre elementos de un grupo.
- **Ancla por sección**: una animación principal por sección, sin varios efectos compitiendo.
- **Propiedades**: animar `transform`/`opacity`. Evitar `width`, `height`, `top`, `left` (disparan layout).

## Registro de animaciones

Todas las técnicas usadas en cada sección de cada página están documentadas en `ANIMATIONS.md`.
**Antes de añadir una animación nueva, consulta ese archivo para evitar repeticiones.**
Cada sección tiene exactamente una técnica protagonista; no hay repeticiones entre páginas.

## Agregar un experimento nuevo

1. Crear `app/expN/page.tsx` con `'use client'` en la primera línea.
2. Importar `gsap` desde `../../lib/gsap/register` (ya tiene los plugins registrados).
3. Usar `useGSAP` con un `containerRef` como `scope`.
4. Agregar la ruta al array `experiments` en `app/layout.tsx` y `app/page.tsx`.

## Experimentos

| Ruta | Contenido real | Técnica protagonista |
|---|---|---|
| `/exp1` | — (demo original) | Clip-path word stagger on load |
| `/exp2` | near.org home — "The currency of agents", 6 secciones del NEAR Stack, stats ($19B, 35+ chains, 1M TPS, 5y uptime), 8 integraciones reales | Scroll pinning con timeline + scrub, contadores animados |
| `/exp3` | near.org/ecosystem — 30 proyectos reales de nearcatalog.xyz en 6 categorías | `ScrollTrigger.batch` por lotes, scroll horizontal atado al vertical, GSAP marquee |
| `/exp4` | near.org/blog — artículo "Confidential Intents" (Feb 24 2026, fuente: KuCoin/NEAR) | Barra progreso de lectura fija, SVG line-draw en divisores, 5 variantes de reveal por heading |

## Design tokens disponibles (`styles/tokens.css`)

### Colores
| Token | Valor |
|---|---|
| `--color-bg-primary` | `#ffffff` |
| `--color-bg-dark` | `#000000` |
| `--color-bg-cream` | `#faf9f5` |
| `--color-bg-warm-white` | `#fffdf6` |
| `--color-text-primary` | `#000000` |
| `--color-text-on-dark` | `#ffffff` |
| `--color-text-secondary` | `#757575` |
| `--color-text-muted` | `#595959` |
| `--color-accent` | `#00ec97` |
| `--color-accent-light` | `#c7f5d8` |
| `--color-accent-teal` | `#17d9d4` |

### Tipografía
| Token | Valor |
|---|---|
| `--font-size-h1-display` | `80px` |
| `--font-size-h1-page` | `40px` |
| `--font-size-h2` | `44px` |
| `--font-size-body-lg` | `20px` |
| `--font-size-body` | `16px` |
| `--font-size-small` | `14px` |

### Espaciado
| Token | Valor |
|---|---|
| `--content-max-width` | `1280px` |
| `--section-padding-h` | `112px` |
| `--section-padding-v` | `128px` |
| `--nav-height` | `73px` |
| `--border-radius` | `4px` |

### Botones
| Token | Descripción |
|---|---|
| `--btn-secondary-*` | Outline blanco, invierte en hover |
| `--btn-accent-*` | Fondo `#00ec97`, sin border-radius |
| `--btn-primary-transition` | `0.15s cubic-bezier(0.4, 0, 0.2, 1)` |
