# Tokens

MDS tokens are expressed as Tailwind v4 `@theme` custom properties in the host project's global stylesheet. The exact block that defines them in the source project is reproduced below for diff-checking.

If your project uses Tailwind v4: you should have an equivalent `@theme { ... }` block in `global.css` (or wherever Tailwind picks it up). If your project uses a different styling layer, map the values into your own CSS custom properties under the same names — the rest of this skill refers to them by their Tailwind class equivalents (`bg-orange-500`, `text-zinc-700`, `font-mono`, etc.).

## Assumed setup

- Tailwind CSS v4 with the `@theme` directive.
- Google Fonts imported for `IBM Plex Sans` (600, 700), `Inter` (400, 500, 600, 700), `JetBrains Mono` (400, 700).
- A `@layer base` block that applies the type stack, link color, and the global `* { border-radius: 0 }` reset.
- An optional `[data-theme="dark"]` scoped override that flips heading color from `zinc-900` to `zinc-100`.

## Source-of-truth `@theme` block

```css
@theme {
  --font-display: 'IBM Plex Sans', sans-serif;
  --font-heading: 'Inter', sans-serif;
  --font-body:    'Inter', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  /* Zinc — neutral spine */
  --color-zinc-50:  #FAFAFA;
  --color-zinc-100: #F4F4F5;
  --color-zinc-200: #E4E4E7;
  --color-zinc-300: #D4D4D8;
  --color-zinc-400: #A1A1AA;
  --color-zinc-500: #71717A;
  --color-zinc-600: #52525B;
  --color-zinc-700: #3F3F46;
  --color-zinc-800: #27272A;
  --color-zinc-900: #18181B;
  --color-zinc-950: #09090B;

  /* Amber — text-link accent */
  --color-amber-50:  #FFFBEB;
  --color-amber-100: #FEF3C7;
  --color-amber-200: #FDE68A;
  --color-amber-300: #FCD34D;
  --color-amber-400: #FBBF24;
  --color-amber-500: #F59E0B;
  --color-amber-600: #D97706;
  --color-amber-700: #B45309;
  --color-amber-800: #92400E;
  --color-amber-900: #78350F;

  /* Orange — brand accent */
  --color-orange-50:  #FFF7ED;
  --color-orange-100: #FFEDD5;
  --color-orange-200: #FED7AA;
  --color-orange-300: #FDBA74;
  --color-orange-400: #FB923C;
  --color-orange-500: #F97316;
  --color-orange-600: #EA580C;
  --color-orange-700: #C2410C;
  --color-orange-800: #9A3412;
  --color-orange-900: #7C2D12;

  /* Red — danger */
  --color-red-50:  #FEF2F2;
  --color-red-500: #EF4444;
  --color-red-700: #B91C1C;

  /* Motion */
  --animate-fade-in-up: fadeInUp 0.6s ease-out;
  --animate-shimmer:    shimmer 1.5s infinite;
  --animate-typewriter: typewriter 3s steps(40) forwards;
  --animate-blink:      blink 0.8s step-end infinite;
}
```

The keyframes (`fadeInUp`, `shimmer`, `typewriter`, `blink`) are defined alongside this block — see `motion.md` for their bodies.

## CSS custom properties you may want to grep for

| Variable | Tailwind class equivalent |
|---|---|
| `--font-display` | `font-display` |
| `--font-heading` | `font-heading` |
| `--font-body` | `font-body` |
| `--font-mono` | `font-mono` |
| `--color-orange-500` | `bg-orange-500` / `text-orange-500` / `border-orange-500` |
| `--color-orange-600` | `bg-orange-600` (hover) |
| `--color-orange-50` | `bg-orange-50` |
| `--color-amber-800` | `text-amber-800` (links) |
| `--color-red-500` | `border-red-500` |
| `--color-red-700` | `text-red-700` |
| `--color-red-50` | `bg-red-50` |
| `--color-zinc-900` | `bg-zinc-900` / `text-zinc-900` |
| `--color-zinc-700` | `text-zinc-700` (body on light) |
| `--color-zinc-500` | `text-zinc-500` (captions) |
| `--color-zinc-300` | `text-zinc-300` (secondary on dark) / `border-zinc-300` |
| `--color-zinc-100` | `text-zinc-100` (primary on dark) / `bg-zinc-100` |
| `--animate-fade-in-up` | `animate-[fadeInUp_0.6s_ease-out]` |
| `--animate-shimmer` | inline `animation: shimmer 1.5s infinite` |

## Base layer expectations

The host project should apply this base layer (or an equivalent):

```css
@layer base {
  body, p, span, a, small, label { font-family: var(--font-body); }
  body  { font-size: 1rem; line-height: 1.6; color: var(--color-zinc-700); }

  h1, h2, h3 { font-family: var(--font-display); font-weight: 700; color: var(--color-zinc-900); }
  h4, h5, h6 { font-family: var(--font-heading); font-weight: 600; color: var(--color-zinc-900); }

  h1 { font-size: 3rem;    line-height: 1.1; }
  h2 { font-size: 2.25rem; line-height: 1.2; }
  h3 { font-size: 1.75rem; line-height: 1.3; }
  h4 { font-size: 1.25rem; line-height: 1.4; }
  h5 { font-size: 1.125rem; line-height: 1.5; }
  h6 { font-size: 1rem;    line-height: 1.5; }

  a       { color: var(--color-amber-800); text-decoration: underline; }
  a:hover { color: var(--color-orange-600); }

  code, pre { font-family: var(--font-mono); }

  * { border-radius: 0; }

  [data-theme="dark"] h1,
  [data-theme="dark"] h2,
  [data-theme="dark"] h3,
  [data-theme="dark"] h4,
  [data-theme="dark"] h5,
  [data-theme="dark"] h6 { color: var(--color-zinc-100); }
}
```

If any of these are missing, headings will fall back to the browser sans default and the sharp-corners rule will not hold — fix the global stylesheet before doing component work.
