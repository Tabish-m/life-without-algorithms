# Design Brief: Life Without Algorithms

## Tone & Aesthetic
Futuristic, provocative commentary on algorithm-free living. Bold minimalism with neon accents. Raw, unpolished glitch effects. Playful yet intellectually probing. Anti-perfection aesthetic celebrating randomness and unpredictability.

## Color Palette (OKLCH)
| Purpose | Color | OKLCH | Usage |
|---------|-------|-------|-------|
| Background | Deep Black | `0.12 0 0` | Page base, card bg in dark mode |
| Foreground | Off-white | `0.93 0 0` | Primary text, readable on dark |
| Primary | Purple | `0.65 0.12 290` | Section headers, structural emphasis |
| Accent/Cyan | Neon Cyan | `0.70 0.15 200` | Interactive highlights, glow effects |
| Accent/Magenta | Neon Magenta | `0.65 0.22 320` | Secondary interactive, glitch layer 1 |
| Accent/Lime | Neon Lime | `0.75 0.18 130` | Tertiary interactive, glitch layer 2 |
| Muted | Dark Grey | `0.20 0 0` | Secondary bg, reduced emphasis |
| Border | Subtle Grey | `0.24 0 0` | Card borders, dividers |

## Typography
| Style | Font | Scale | Usage |
|-------|------|-------|-------|
| Display | Space Grotesk | 2.5rem, 2rem | Hero title, section headers, emphasis |
| Body | DM Sans | 1rem, 0.875rem | Body copy, UI text, descriptions |
| Mono | Geist Mono | 0.875rem | Code-like elements, random feeds, stats |

## Structural Zones
| Zone | Background | Border | Details |
|------|-----------|--------|---------|
| Header/Nav | `card` (0.16 0 0) | Top lime accent | Logo + navigation, sticky top |
| Hero Section | `background` (0.12 0 0) | None | Full-width animated bg, centered title |
| Content Sections | Alternating: `background` / `muted/20` | Subtle `border` | Cards use `card` (0.16 0 0) |
| Interactive Cards | `card` | Neon on hover | Lift animation, glitch on focus |
| Footer | `background` | Top `border` | Minimal, centered text, low contrast |

## Elevation & Depth
- No stacked shadows; use border + color contrast for depth
- Glitch layers (`::before` / `::after`) create pseudo-depth via color offset
- Neon glow via `box-shadow` on accent elements only (not overused)
- Lifted cards: `scale(1.02)` + `shadow-md` on hover

## Component Patterns
| Pattern | Implementation | Constraint |
|---------|----------------|-----------|
| Buttons | Primary (purple), Secondary (muted), Neon CTAs (cyan/magenta/lime) | No rounded corners (radius: 4–8px only) |
| Cards | Dark bg, thin border, neon accent on left edge or top | Avoid white cards entirely |
| Interactive Elements | Hover: scale + glitch animation, Focus: neon ring | All via `transition-smooth` |
| Random Generators | Mono font, display results in neon text, spinner animation | No loading bars, use pulse animation |
| Glitch Effect | Text offset (±2px), color shift (cyan/magenta/lime layers), duration 0.4s | Only on user interaction, not ambient |

## Motion & Animation
- **Default Transition**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` for all state changes (hover, focus, active)
- **Glitch Duration**: 0.4s, eased entry/exit
- **Ambient Motion**: Pulse animation (2s loop) for section headers, no bounce
- **Hero Background**: Subtle random particle drift (JavaScript-driven, not CSS-only)
- **Micro-interactions**: Hover scale (1.02), focus ring glow, click feedback via glitch

## Spacing & Rhythm
- Base unit: 0.5rem (8px). Use multiples: 8, 16, 24, 32, 48px
- Dense sections (feed cards): 8px gaps, 16px padding
- Spacious sections (hero, insights): 32–48px padding, 24–32px gaps
- Alignment: 12-column grid, container max-width 1400px

## Signature Detail
**Glitch Effect on Interactive Elements**: On hover or focus, buttons/cards trigger:
1. Text offset (±2px left/right, ±2px up/down)
2. Layered color shift using neon accents (cyan overlay on left, magenta on right)
3. 0.4s eased animation with staggered `::before` / `::after` pseudo-elements
4. Creates sense of instability and randomness — reinforces "Life Without Algorithms" theme

## Constraints
- No Bootstrap-style defaults; every color is intentional
- No arbitrary Tailwind classes; use semantic tokens (`text-accent`, `bg-card`, `border-border`)
- No full-page gradients; use layered surfaces only
- No bouncy animations; all easing is ease-in-out cubic-bezier
- No clutter; minimize decoration to glitch effects + neon accents only
- All transitions use `transition-smooth` utility class

## Implementation Notes
- Light mode disabled; dark mode only (`0.12 0 0` background)
- Fonts loaded from `/assets/fonts/` via `@font-face`
- Glitch utilities (`.glitch`, `.neon-glow`, `.neon-text*`) defined in `index.css` `@layer utilities`
- All neon effects sparingly applied to avoid visual noise
- Random generators (feed, music, products) use JavaScript, not CSS animation
