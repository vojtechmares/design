# Colors

## Brand & semantic palette

| Role | Token | Hex | Use |
|---|---|---|---|
| Primary action | `orange-500` | `#F97316` | Primary button bg, CTAs, accent fills, hero accent word, callout border. **Text on top must be `black`.** |
| Primary hover | `orange-600` | `#EA580C` | Accent-button hover, link hover on dark. |
| Primary tint | `orange-50` | `#FFF7ED` | Accent-light surfaces, white-button hover, "soft emphasis" callout bg. |
| Text-link accent | `amber-800` | `#92400E` | Links on light backgrounds. WCAG AA contrast vs white. |
| Danger border | `red-500` | `#EF4444` | Error input border (2px), danger callout border, destructive-action accent. |
| Danger text | `red-700` | `#B91C1C` | Inline error messages. |
| Danger surface | `red-50` | `#FEF2F2` | Danger callout background. Do **not** use to fill inputs. |
| Heading / dark surface | `zinc-900` | `#18181B` | H1–H6 on light, dark page/section background, code-block bg. |
| Body on light | `zinc-700` | `#3F3F46` | Body paragraphs on light, default border accent (`border-zinc-700`). |
| Caption on light | `zinc-500` | `#71717A` | Captions, helper text, metadata. |
| Border / secondary on dark | `zinc-300` | `#D4D4D8` | Input borders (light), secondary text on dark. |
| Primary text on dark | `zinc-100` | `#F4F4F5` | Primary text on `zinc-900` surfaces. |

## Full palette (for completeness)

### Orange

| Token | Hex |
|---|---|
| `orange-50` | `#FFF7ED` |
| `orange-100` | `#FFEDD5` |
| `orange-200` | `#FED7AA` |
| `orange-300` | `#FDBA74` |
| `orange-400` | `#FB923C` |
| `orange-500` | `#F97316` |
| `orange-600` | `#EA580C` |
| `orange-700` | `#C2410C` |
| `orange-800` | `#9A3412` |
| `orange-900` | `#7C2D12` |

In MDS, only `orange-50`, `orange-300` (code syntax), `orange-500`, and `orange-600` are actively used. The rest are available but should not appear in component classes without justification.

### Amber

| Token | Hex |
|---|---|
| `amber-50` | `#FFFBEB` |
| `amber-100` | `#FEF3C7` |
| `amber-200` | `#FDE68A` |
| `amber-300` | `#FCD34D` |
| `amber-400` | `#FBBF24` |
| `amber-500` | `#F59E0B` |
| `amber-600` | `#D97706` |
| `amber-700` | `#B45309` |
| `amber-800` | `#92400E` |
| `amber-900` | `#78350F` |

Only `amber-300` (code syntax) and `amber-800` (text links) are actively used.

### Red

Only three steps exist in the theme: `red-50` (`#FEF2F2`), `red-500` (`#EF4444`), `red-700` (`#B91C1C`). Do not introduce other steps — they are not part of MDS.

### Zinc

| Token | Hex | Notes |
|---|---|---|
| `zinc-50` | `#FAFAFA` | Subtle surface tint. |
| `zinc-100` | `#F4F4F5` | Text on dark, neutral callout bg, inline-code chip bg. |
| `zinc-200` | `#E4E4E7` | Disabled border, skeleton block. |
| `zinc-300` | `#D4D4D8` | Input border (light), secondary text on dark, toggle track off (light). |
| `zinc-400` | `#A1A1AA` | Helper text on dark. |
| `zinc-500` | `#71717A` | Captions, helper text on light. |
| `zinc-600` | `#52525B` | Input border (dark), toggle track off (dark). |
| `zinc-700` | `#3F3F46` | Body on light, secondary heading color. |
| `zinc-800` | `#27272A` | Input bg (dark), elevated surface on dark. |
| `zinc-900` | `#18181B` | Dark page bg, headings on light, code-block bg. |
| `zinc-950` | `#09090B` | Available; not currently used. |

## Light vs dark pairing

| Surface | Primary text | Secondary text | Input border | Input bg | Focus border | Helper text |
|---|---|---|---|---|---|---|
| Light (`white` / `zinc-50`) | `text-zinc-900` (headings) / `text-zinc-700` (body) | `text-zinc-500` | `border-zinc-300` | `bg-white` | `focus:border-zinc-500` | `text-zinc-500` |
| Dark (`zinc-900`) | `text-zinc-100` (headings) / `text-zinc-300` (body) | `text-zinc-400` | `border-zinc-600` | `bg-zinc-800` | `focus:border-zinc-400` | `text-zinc-400` |
| Accent (`orange-500`) | `text-black` | `text-black/80` | — | — | — | — |

## Code syntax palette

Used only inside `<pre>` / `<code>` blocks for syntax highlighting. All five are the `*-300` step.

| Token | Hex | Applies to |
|---|---|---|
| `blue-300` | `#93C5FD` | Functions, methods, procedures |
| `emerald-300` | `#6EE7B7` | Strings, text values |
| `orange-300` | `#FDBA74` | Keywords, HTML tags |
| `amber-300` | `#FCD34D` | Numbers, constants, booleans |
| `purple-300` | `#D8B4FE` | Classes, types, special objects |

## Contrast rules ("Do's & Don'ts")

| Do | Don't |
|---|---|
| `bg-orange-500` + `text-black` | `bg-orange-500` + `text-white` (low contrast) |
| Error input: `border-2 border-red-500` + `text-red-700` message | Filling input with `bg-red-50` (breaks visual hierarchy) |
| Form field: rely on border + text + icon together | Use color (red border) as the sole signal |
| Links on light: `text-amber-800 underline` | `text-orange-500` for links (reserved for accents/CTAs) |
| Links on dark: `text-zinc-100 underline hover:text-orange-500` | Removing the underline |

## Hard rules

- No new hues. Anything outside `orange / amber / red / zinc` (plus the five `*-300` code colors) needs explicit justification.
- No new red steps. Stick to the three in the theme.
- Borders default to `zinc-300` (light) or `zinc-600` (dark). Use `orange-500` only for the hover-lift ring, callout left border, or hero stat divider.
