# Typography

## Font families

| Token | Family | Use |
|---|---|---|
| `font-display` | IBM Plex Sans | Headings H1–H3 only |
| `font-heading` | Inter | H4–H6, labels, UI text, form labels, callout labels |
| `font-body` | Inter | Paragraphs, body copy |
| `font-mono` | JetBrains Mono | Code, inline `<code>`, button text, monospaced metadata (prices, dates) |

Never substitute. If a project does not have these fonts loaded, treat the absence as a setup bug, not a license to swap families.

## Type scale

| Element | Size | Font / Weight | Line-height | Usage |
|---|---|---|---|---|
| H1 | `48px / 3rem` | IBM Plex Sans · Bold (700) | `1.1` | Hero sections |
| H2 | `36px / 2.25rem` | IBM Plex Sans · SemiBold (600) | `1.2` | Main sections |
| H3 | `28px / 1.75rem` | IBM Plex Sans · SemiBold (600) | `1.3` | Subsections, cards |
| H4 | `20px / 1.25rem` | Inter · Medium (500) | `1.4` | Smaller headings |
| H5 | `18px / 1.125rem` | Inter · SemiBold (600) | `1.5` | UI components |
| H6 | `16px / 1rem` | Inter · SemiBold (600) | `1.5` | Inline headings |
| `<p>` | `16px / 1rem` | Inter · Regular (400) | `1.6` | Body text |
| `<small>` | `14px / 0.875rem` | Inter · Regular (400) | `1.5` | Captions, metadata |
| `<a>` | inherit | Inter · Medium (500) | inherit | Amber-800 on light, Zinc-100 on dark |

All sizes apply via the `@layer base` block in `tokens.md`. You should not need to override headings with size utilities unless you are intentionally departing from the scale (hero variants do — see `components.md#hero`).

## Responsive scaling

| Breakpoint | H1–H3 |
|---|---|
| Desktop (≥1024px) | 100% (use the scale above) |
| Tablet (640–1024px) | 90% |
| Mobile (<640px) | 80% — but never below 24px |

Body, small, and H4–H6 do not scale.

## Heading color rule

- Light surface: headings inherit `color: zinc-900` from the base layer.
- Dark surface: wrap the page (or section) in `data-theme="dark"` to flip H1–H6 to `zinc-100`. Alternatively, set the color explicitly with `text-zinc-100` / `text-white`.

Headings inside light "islands" on a dark page (a `bg-white` callout, an `bg-orange-50` panel) should stay on the dark scale (`text-zinc-900`) so contrast holds.

## Link styles

| Surface | Class string |
|---|---|
| Light background | `font-medium underline text-amber-800 hover:text-orange-600` |
| Dark background | `font-medium underline text-zinc-100 hover:text-orange-500` |

Underlines are always present — never remove the underline to "clean up" link styling.

## Common Tailwind class recipes

```tsx
// Page title (hero H1, light)
<h1 className="font-display font-bold text-zinc-900 text-3xl sm:text-5xl lg:text-6xl leading-[1.1]">

// Page title (hero H1, dark)
<h1 className="font-display font-bold text-white text-3xl md:text-4xl leading-tight">

// Section heading (H2)
<h2 className="font-display font-semibold text-zinc-900">

// Card heading (H4 — inherits font-heading from base layer)
<h4>...</h4>

// Body paragraph
<p className="text-zinc-700">...</p>          // light
<p className="text-zinc-400">...</p>          // dark — supporting copy
<p className="text-zinc-300">...</p>          // dark — primary body

// Caption / metadata
<p className="text-sm text-zinc-500 mt-1">...</p>   // light
<p className="text-sm text-zinc-400 mt-1">...</p>   // dark

// Inline code chip
<code className="bg-zinc-100 px-1.5 py-0.5 text-xs font-mono text-zinc-700">

// Uppercase eyebrow label
<span className="block font-heading text-xs font-semibold uppercase tracking-wider text-zinc-500">
```

## Accent words inside a heading

The brand pattern is to color a single word or short phrase in `text-orange-500`:

```tsx
<h1>DevOps services <span className="text-orange-500">tailored</span></h1>
```

Do this sparingly — one accent per heading.
