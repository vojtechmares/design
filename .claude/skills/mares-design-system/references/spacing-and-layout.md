# Spacing & layout

## Container widths

| Container | Max width | When |
|---|---|---|
| Standard | `1280px` | Homepage, portfolio, contact, services — the default page container. |
| Prose | `65ch` | Blog posts, talks, docs — any text-heavy reading layout. |

```tsx
// Standard
<div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">…</div>

// Prose
<article className="mx-auto" style={{ maxWidth: '65ch' }}>…</article>
```

## Breakpoints

| Token | Min width | Use |
|---|---|---|
| `sm:` | `640px` | Minor tweaks. |
| `md:` | `768px` | Tablet portrait. |
| `lg:` | `1024px` | **Primary breakpoint.** Switch hero/content from stacked column to two-column row. |

Mobile-first: write the mobile layout first, then add `lg:` modifiers for desktop. The standard hero pattern is:

```tsx
<div className="flex flex-col gap-y-8 lg:flex-row lg:justify-between">…</div>
```

## Grid

The grid is optional — most pages use containers with responsive widths. Use grid only when you need explicit column control.

| Setting | Value |
|---|---|
| Columns | 12 |
| Gap | `32px` (`gap-[32px]`) |

Common layouts:

| Pattern | Classes |
|---|---|
| 3-6-3 | `grid grid-cols-12 gap-[32px]` + `col-span-3 / col-span-6 / col-span-3` |
| 8-4 | `col-span-8 / col-span-4` |
| 9-3 | `col-span-9 / col-span-3` |
| 4-4-4 | `col-span-4 / col-span-4 / col-span-4` |
| 6-6 | `col-span-6 / col-span-6` |

## Border radius — global rule

**`0px` everywhere.** The base layer applies `* { border-radius: 0 }`. Do not use any `rounded-*` Tailwind class. If you find an element with rounded corners in your component, remove the class — the base reset will override it but the class is dead code and signals drift.

## Shadows

| Class | Use | Example |
|---|---|---|
| `inset-shadow-sm inset-shadow-zinc-900/10` | Default card | `bg-white inset-shadow-sm inset-shadow-zinc-900/10 overflow-hidden p-6` |
| `shadow-xl shadow-zinc-900/10` | Surface (elevated) card | `bg-white shadow-xl shadow-zinc-900/10 overflow-hidden p-6` |
| (none) | Inverse, Accent, Accent-Light cards | `bg-zinc-900 overflow-hidden p-6` |

No shadow scale beyond these three slots. Drop shadows on dark surfaces — they read as smudges.

## Form spacing rules

| Relationship | Value | Class |
|---|---|---|
| Label → input | `6px` | `mb-1.5` (on the label) |
| Between fields | `20px` | `space-y-5` (on the `<form>`) |
| Inline field gap (grids of inputs) | `16px` | `gap-4` |
| Form padding (inside a card) | `32px` | `p-8` |
| Helper text → input | `4px` | `mt-1` (on the helper paragraph) |

Forms never use ad-hoc margins; the values above are the only ones expected.

## Card composition

Base classes for every card variant: `overflow-hidden p-6`. The variant only changes background / shadow / text colors — padding and overflow stay constant.

Optional hover-lift addon (clickable cards only):

```
transition duration-300 ease hover:-translate-y-0.5 ring-1 ring-transparent hover:ring-orange-500
```

## Hero composition

```
py-10                                       — vertical padding on the hero block
flex flex-col gap-y-8 lg:flex-row lg:justify-between  — stack on mobile, two-col on lg
```

Left column: `max-w-xl`. Right column (stats): `flex flex-col gap-6 lg:pt-2`. Each stat: `border-l-2 border-orange-500 pl-6`.

## Button alignment

Buttons sit inside a `flex justify-end` wrapper inside cards and forms. The wrapper carries the alignment, not the button itself. The exception is heroes — there buttons follow the content flow inside the left column (no `justify-end`).

## Section padding

Sections in this design system do not enforce vertical padding — that is the page's responsibility. The Section component is a thin background+container wrapper (see `components.md#section`); you compose padding with `py-*` at the page level.
