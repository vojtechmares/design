---
name: mares-design-system
description: Follow the Mareš Design System (MDS) when creating or modifying React UI. Use whenever building or editing React components, pages, forms, cards, buttons, heroes, callouts, or any UI in a React project (Astro, Next, TanStack, Vite). Covers tokens (colors, typography, spacing, motion), component anatomies, and the sharp 0px aesthetic with Inter / IBM Plex Sans / JetBrains Mono. Triggers on any UI work in projects that have adopted MDS.
allowed-tools: Read, Grep, Glob
---

# Mareš Design System (MDS)

A portable, agentic specification of the design language used at design.mares.cz. This skill is the source of truth for the visual rules a React project should follow once it has adopted MDS. It does **not** install tokens, fonts, or components — it assumes the host project has already set up a Tailwind v4 theme (or equivalent CSS-variable layer) that matches the values in `references/tokens.md`.

## When this skill applies

Read this skill before doing any of the following in a React project that uses MDS:

- Creating a new component (button, card, hero, form, callout, section, skeleton, etc.).
- Modifying an existing component's styling, variants, or states.
- Authoring a new page or layout.
- Reviewing UI work for consistency with the design system.
- Picking a color, font, spacing value, or motion token.

If the project clearly does not use MDS (different palette, rounded UI, different fonts), do not retrofit — defer to the project's conventions.

## Core principles (must follow)

1. **Sharp design — 0px radii everywhere.** Never use `rounded-*` Tailwind classes or non-zero `border-radius`. The global stylesheet applies `* { border-radius: 0 }`; honor it.
2. **Fixed type stack.** `IBM Plex Sans` for H1–H3 (`font-display`), `Inter` for H4–H6 and body (`font-heading` / `font-body`), `JetBrains Mono` for code and buttons (`font-mono`). Never substitute.
3. **Buttons use `font-mono` and right-align.** Buttons differ from badges by font (JetBrains Mono vs Inter) and are always pulled right inside their parent (`flex justify-end`).
4. **Black text on orange — never white.** `bg-orange-500` always pairs with `text-black`. White text on orange is the canonical "Don't".
5. **Color is never the sole signal.** Error states combine border (`border-2 border-red-500`) + text (`text-red-700`) + icon. Do not fill inputs with `bg-red-50`.
6. **Single accent.** `orange-500` is the only brand accent; `amber-800` is reserved for text links on light surfaces. Do not introduce new hues.
7. **Mobile-first.** Stack on mobile, switch to `lg:flex-row` at 1024px. H1–H3 scale down (Desktop 100% · Tablet 90% · Mobile 80%, min 24px).
8. **Pick the closest existing variant before inventing.** Section, Card, Button, Callout each have a fixed variant set documented in `references/components.md`. Adding new variants is almost never the answer.

## Quick token cheat sheet

The full catalogue lives in `references/`. The minimum to have in working memory:

| Token | Value | Use |
|---|---|---|
| `orange-500` | `#F97316` | Primary actions, accents. Pair with `text-black`. |
| `orange-600` | `#EA580C` | Accent button hover. |
| `orange-50` | `#FFF7ED` | Accent-light surfaces, white-button hover. |
| `amber-800` | `#92400E` | Text links on light. |
| `red-500` | `#EF4444` | Error borders, destructive accents. |
| `red-700` | `#B91C1C` | Inline error text. |
| `red-50` | `#FEF2F2` | Danger callout background. |
| `zinc-900` | `#18181B` | Headings on light, dark surfaces. |
| `zinc-700` | `#3F3F46` | Body text on light. |
| `zinc-500` | `#71717A` | Captions, helper text on light. |
| `zinc-300` | `#D4D4D8` | Borders, secondary text on dark. |
| `zinc-100` | `#F4F4F5` | Primary text on dark. |
| `font-display` | `'IBM Plex Sans'` | H1–H3 (700 / 600 / 600). |
| `font-heading` | `'Inter'` | H4–H6, labels, UI. |
| `font-body` | `'Inter'` | Body text. |
| `font-mono` | `'JetBrains Mono'` | Code, buttons. |

## Where to read next

| If you need to … | Open |
|---|---|
| Confirm a token value or its CSS-variable name | `references/tokens.md` |
| Pick a heading size / weight, or style a link | `references/typography.md` |
| Pick a color, check a contrast rule, or syntax-highlight code | `references/colors.md` |
| Lay out a container, grid, or spacing | `references/spacing-and-layout.md` |
| Add a fade-in, shimmer, or hover-lift | `references/motion.md` |
| Build a Section, Hero, Card, Button, Form, Callout, or Skeleton | `references/components.md` |
| Resolve a "should I invent a new variant?" question | `references/principles.md` |

## How to use the templates

`templates/*.tsx` are reference implementations — one self-contained React component per file (Button, Card, Hero, Section, Callout, TextInput, Skeleton). They are not auto-installed. Read them when you need the canonical class string, copy them into the host project when you need a starting point, and adapt freely as long as you keep the variant set, the class strings, and the principles above.

Each template:

- Uses only React + Tailwind classes (no extra deps).
- Accepts a `variant` prop where the source DS documents multiple variants.
- Mirrors the exact class strings from the source design system so a copy-paste does not drift.

## Self-check before reporting UI work done

Run through this list mentally (or grep) for any component you wrote or changed:

- [ ] No `rounded-*` classes and no inline `border-radius` other than `0`.
- [ ] Buttons carry `font-mono` and live inside a `flex justify-end` wrapper (unless inside a Hero where buttons follow the content flow).
- [ ] Headings use `font-display` (H1–H3) or `font-heading` (H4–H6) — not the default sans stack.
- [ ] No white text on `bg-orange-500`. Accent backgrounds always use `text-black` (or `text-black/80` for secondary).
- [ ] Error states use `border-2 border-red-500` + `text-red-700` text. Inputs are NOT filled with `bg-red-50`.
- [ ] On dark surfaces (`bg-zinc-900`): inputs are `border-zinc-600 bg-zinc-800 text-zinc-100`, labels `text-zinc-100`, helper `text-zinc-400`, focus `focus:border-zinc-400`.
- [ ] Spacing inside forms: label→input `mb-1.5`, between fields `space-y-5`, inline gap `gap-4`, form-in-card `p-8`.
- [ ] Cards use `overflow-hidden p-6` and one of the five documented variants; clickable cards add the hover-lift addon verbatim.
- [ ] Hero left column is `max-w-xl`; stats sit in a right column with `border-l-2 border-orange-500 pl-6`.
- [ ] No new color hue introduced. Anything outside `orange / amber / red / zinc` (plus the 5 code-syntax 300s) needs explicit justification.

If any item fails, fix it before saying the work is done.
