---
name: simplified-design-system
description: Derive the Simplified Design System (SDS) page from src/pages/design-system.mdx using a fixed set of trimming rules. Use when the user asks to "build SDS", "regenerate the simplified design system", "update SDS", or runs /build-sds. Produces src/pages/simplified-design-system.mdx and src/data/simplified-design-system-nav.ts, and may patch Layout.astro and Sidebar.astro to support theme="dark".
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
---

# Simplified Design System (SDS)

Self-contained recipe for deriving the SDS from the Mares Design System. This skill is the **source of truth** for what the SDS is; do not consult `src/pages/design-system.mdx` for the shape of the SDS — consult it only to copy exact class strings for sections marked "unchanged" or "copy verbatim".

## Inputs

| Path | Role |
|---|---|
| `src/pages/design-system.mdx` | Read-only source. 1853 lines; use paged Read (offset/limit). |
| `src/layouts/Layout.astro` | Must accept `theme?: 'light' \| 'dark'`. Patch if missing. |
| `src/components/Sidebar.astro` | Must accept `theme?: 'light' \| 'dark'` and set `data-theme` on `#sidebar-root`. Patch if missing. |
| `src/data/design-system-nav.ts` | Schema reference for the new nav file. |

## Outputs

| Path | Behaviour |
|---|---|
| `src/pages/simplified-design-system.mdx` | **Always overwritten** on each run. |
| `src/data/simplified-design-system-nav.ts` | **Always overwritten** on each run. |

## Workflow

1. Read `src/pages/design-system.mdx` in pages (e.g., 1–400, 400–800, …) to gather the verbatim recipes you need below.
2. Verify Layout and Sidebar accept `theme="dark"`. If not, apply patches in "Layout requirements".
3. Write `src/data/simplified-design-system-nav.ts` from the template in "Nav file".
4. Write `src/pages/simplified-design-system.mdx` from the section recipes below.
5. Run `pnpm astro check` (or report the command was skipped — never fall back to `npm`).
6. Run the **Self-check** at the end of this file. Fix any deviations before reporting done.

## Derivation rules

### Page chrome
- The SDS page renders dark via `theme="dark"` on Layout and Sidebar.
- Body becomes `bg-neutral-900 text-neutral-100`; sidebar chrome swaps to `bg-neutral-900`, borders `border-neutral-800`, idle link `text-neutral-300`, hover `hover:bg-neutral-800`, active link `bg-neutral-800 + border-orange-500`.
- `<body>` must carry `data-theme={theme}` so the global scoped overrides apply (see "Stylesheet requirements" below). Patched via Layout requirements.
- Page metadata: `title="Simplified Design System — Mares Design"`, `description="Trimmed visual style specification derived from the main Design System. Dark surface, fewer variants."`, `canonical="https://design.mares.cz/simplified-design-system/"`.
- Sidebar title: `Simplified Design System`.

### Text color rule (light scale only)

On the dark surface, all text uses the **light neutral scale**:

- `text-neutral-100` — primary emphasis (headings, labels, link text on dark).
- `text-neutral-200` — inline code chips on dark backgrounds.
- `text-neutral-300` — body prose.
- `text-neutral-400` — subtitles, helper text, secondary labels.
- `text-neutral-500` — captions, metadata, low-priority text.
- `text-white` — text on the orange-500 accent fill (button "Accent" is the documented exception — it uses `text-black` per the existing button recipe).

**Exception — light islands.** Surfaces with a light fill (callouts: `bg-orange-50`, `bg-white`, `bg-neutral-100`, `bg-red-50`; any "On Light Background" demo; the light "DO" / "DON'T" panels in Do's & Don'ts) deliberately sit as bright islands on the dark page. Text inside them must stay on the dark scale (`text-neutral-700` / `text-neutral-900`) for contrast. These overrides are applied with Tailwind utility classes at the call site and win via Tailwind's layer order (utilities is a later layer than base).

**Implementation.** Components that render heading elements without a color prop (`TypeSample`, `ColorSwatch`'s `<h4>{name}</h4>`) inherit from a global scoped override defined in `src/styles/global.css` — see "Stylesheet requirements" below. The TypeSample h1–h6 samples and the ColorSwatch color names (e.g. "Red-500", "Orange-500") therefore render `neutral-100` automatically with no per-call className needed.

### Sections kept (in order)

| Group | Section | `id` | Rule |
|---|---|---|---|
| Foundations | Typography | `typography` | Same fonts + scale. Render samples on dark — text colors swap (`text-neutral-100` for emphasis, `text-neutral-300` for body, `text-neutral-500` for captions). |
| Foundations | Color Palette | `colors` | Trimmed (see "Color palette" below). |
| Foundations | Code Colors | `code-colors` | **Copy verbatim** from DS — all 5 swatches + code example demo. |
| Foundations | Container & Spacing | `grid-layout` | Container/grid demos kept; demo blocks for "Standard Container" / "Prose Mode" use `variant="dark"` on `DemoBlock`. |
| Foundations | Shapes & Radius | `shapes` | Sharp 0px. Demo button = Dark variant, demo input = dark assembly. |
| Components | Hero | `hero` | Only the dark "Service Page" variant. No typewriter. |
| Components | Section | `section` | Dark variant only. |
| Components | Card | `card` | **Inverse** + **Accent** + the **Hover Highlight** addon. Drop Default, Surface, Accent Light. |
| Components | Buttons | `buttons` | 3 colors: Dark (shown first), Accent, White. Drop "On Light Background" demos; keep "On Dark Background" demo. Keep size demos, state table, alignment rule. |
| Components | Forms & Inputs | `forms-inputs` | Keep **only** the dark assembly. Use `border-neutral-600 bg-neutral-800 text-neutral-100`. Labels `text-neutral-100`. Helper `text-neutral-400`. Focus border `border-neutral-400`. |
| Components | Loading & Skeletons | `loading-skeletons` | **Copy verbatim** — shimmer is exempt from "no animations". |
| Components | Callout | `callout-box` | 4 variants only: `accent` (orange-50 bg), `accent-light` (white bg), `neutral` (neutral-100 bg), `danger` (red-50 bg). Drop Accent Dark. Light-fill callouts intentionally sit as bright islands on the dark page. |
| Guidelines | States | `states` | Errors adapted to dark: `border-2 border-red-500 bg-neutral-800 text-red-300`. **No `bg-red-50` fill.** Inline error message: `text-red-300`. |
| Guidelines | Do's & Don'ts | `dos-donts` | Re-derive for the dark page: contrast demos compare orange text on dark vs. white vs. neutral, using `bg-neutral-900` and `bg-neutral-800` panels. |

### Sections dropped
- **Animations** (`animations`) — the whole `DocSection` is removed.

### Color palette (the SDS Colors section)
Show:
- **Primary**: Orange-500 (`#f97316`), Orange-50 (`#fff7ed`), Orange-600 (`#ea580c`).
- **Danger**: Red-500 (`#EF4444`), Red-50 (`#FEF2F2`).
- **Dark / default**: Neutral-900 (`#171717`).
- **Implicit shades** (smaller subsection): Neutral-100 (`#F5F5F5`) text on dark, Neutral-300 (`#D4D4D4`) secondary text on dark, Neutral-700 (`#404040`) borders/dividers, Neutral-800 (`#262626`) elevated surfaces.

Drop from DS: the Amber-800 "Text Accent" swatch, the "Background Combinations" demo.

Color names rendered by `ColorSwatch` (e.g. "Red-500", "Orange-500") are `<h4>` elements with no class. They pick up `text-neutral-100` from the global scoped override — no per-swatch className override is needed. Metadata text (`text-neutral-500`) stays as-is and is within the allowed light scale.

### Animation rules (exact)
- Drop the whole `<DocSection id="animations">`.
- Do **not** `import FadeInDemo from '../components/ui/FadeInDemo.tsx'`.
- Do **not** include any typewriter span (the DS hero contains one; the SDS hero must not).
- **Keep** (these are micro-transitions, not animations):
  - Button transitions: `transition duration-150 ease-in-out`.
  - Input focus: `transition-colors`.
  - Card hover highlight: `transition-all duration-300 hover:-translate-y-0.5 ring-1 ring-transparent hover:ring-orange-500`.
  - Loading shimmer keyframe: `animation: 'shimmer 1.5s infinite'`.

### Components / imports
Import unchanged: `Layout`, `Sidebar`, `DocSection`, `DemoBlock`, `ColorSwatch`, `TypeSample`, `Section`.
**Do not import** `FadeInDemo`.
Nav: `import { navGroups } from '../data/simplified-design-system-nav';`.

## Layout requirements

If `src/layouts/Layout.astro` or `src/components/Sidebar.astro` does not yet accept a `theme="dark"` prop, patch them as follows. Both patches are backward-compatible — the existing `/design-system/` page passes no `theme` and stays light.

### `src/layouts/Layout.astro`

Add `theme?: 'light' | 'dark'` (default `'light'`) to `Props`. Compute a body class string:

```ts
const { title = 'Mares Design', description, canonical, hasSidebar = false, theme = 'light' } = Astro.props;
const bodyClass = theme === 'dark' ? 'min-h-screen bg-neutral-900 text-neutral-100' : 'min-h-screen bg-white';
```

Replace `<body class="min-h-screen bg-white">` with `<body class={bodyClass} data-theme={theme}>`. The `data-theme` attribute is what the global scoped overrides in `src/styles/global.css` select against; light pages get `data-theme="light"`, which the override ignores — no regression for the existing `/design-system/` page.

### `src/components/Sidebar.astro`

Add `theme?: 'light' | 'dark'` (default `'light'`) to `Props`. Build a `chrome` map:

```ts
const isDark = theme === 'dark';
const chrome = {
  panelBg: isDark ? 'bg-neutral-900' : 'bg-white',
  border:  isDark ? 'border-neutral-800' : 'border-neutral-200',
  titleText: isDark ? 'text-neutral-100' : 'text-neutral-900',
  iconBtn: isDark ? 'text-neutral-400 hover:text-neutral-100' : 'text-neutral-600 hover:text-neutral-900',
  link: isDark
    ? 'text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800'
    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100',
};
```

Put `data-theme={theme}` on `#sidebar-root`. Swap hardcoded chrome classes (`bg-white`, `border-neutral-200`, `text-neutral-900` for title, link colors) for the `chrome.*` bindings using `class:list={[...]}`.

In the inline `<script>`, derive the active-link recipe from `root.dataset.theme`:

```ts
const theme = root?.dataset.theme === 'dark' ? 'dark' : 'light';
const activeClasses = theme === 'dark'
  ? ['bg-neutral-800', 'text-neutral-100', 'border-l-2', 'border-orange-500']
  : ['bg-orange-50', 'text-neutral-900', 'border-l-2', 'border-orange-500'];
const idleClass = theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600';
```

…and replace the old hardcoded `classList.add/remove` arguments with `...activeClasses` / `idleClass`.

## Stylesheet requirements

### `src/styles/global.css`

Append the following inside `@layer base` (NOT at top level, NOT in `@layer utilities`). Placing it in `@layer base` is deliberate: Tailwind's utility layer loads after base, so any explicit `text-neutral-900` / `text-neutral-700` utility class on a heading inside a callout still wins by layer order even though our scoped selector has higher specificity.

```css
@layer base {
  [data-theme="dark"] h1,
  [data-theme="dark"] h2,
  [data-theme="dark"] h3,
  [data-theme="dark"] h4,
  [data-theme="dark"] h5,
  [data-theme="dark"] h6 {
    color: var(--color-neutral-100);
  }
}
```

Idempotent: if a block matching this selector list already exists, leave it alone. Do not duplicate.

## Page shell

```mdx
---
layout: false
---
import Layout from '../layouts/Layout.astro';
import Sidebar from '../components/Sidebar.astro';
import { navGroups } from '../data/simplified-design-system-nav';
import DocSection from '../components/ui/DocSection.tsx';
import DemoBlock from '../components/ui/DemoBlock.tsx';
import ColorSwatch from '../components/ui/ColorSwatch.tsx';
import TypeSample from '../components/ui/TypeSample.tsx';
import Section from '../components/ui/Section.tsx';

<Layout title="Simplified Design System — Mares Design" description="Trimmed visual style specification derived from the main Design System. Dark surface, fewer variants." canonical="https://design.mares.cz/simplified-design-system/" hasSidebar theme="dark">
  <Sidebar slot="sidebar" title="Simplified Design System" navGroups={navGroups} theme="dark" />

  <section className="hero pb-4">
    <h1 className="text-neutral-100">Simplified Design System</h1>
    <p className="mt-2 text-base text-neutral-400">A trimmed surface of the main Design System: fewer colors, fewer variants, dark by default. Derived mechanically from <code className="bg-neutral-800 px-1.5 py-0.5 font-mono text-xs text-neutral-200">design-system.mdx</code>.</p>
  </section>

  <div className="mt-20 mb-2">
    <span className="uppercase text-xs font-heading font-semibold text-neutral-500 tracking-wider">Foundations</span>
  </div>

  {/* DocSections go here */}

  <div className="mt-20 mb-2">
    <span className="uppercase text-xs font-heading font-semibold text-neutral-500 tracking-wider">Components</span>
  </div>

  {/* DocSections go here */}

  <div className="mt-20 mb-2">
    <span className="uppercase text-xs font-heading font-semibold text-neutral-500 tracking-wider">Guidelines</span>
  </div>

  {/* DocSections go here */}
</Layout>
```

## Per-section recipes

For each section: prose text follows the DS phrasing but adapts color references to the dark page. Use `text-neutral-300` for body prose, `text-neutral-100` for headings/emphasis, `text-neutral-500` for captions.

### Buttons (SDS recipe)

Order: **Dark, Accent, White** in every demo row.

```jsx
{/* Dark */}
<button className="group inline-flex items-center justify-center font-semibold focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 bg-neutral-900 text-white hover:bg-neutral-700 active:bg-neutral-800 focus-visible:outline-neutral-900 px-8 py-4 text-base transition duration-150 ease-in-out font-mono cursor-pointer">Dark</button>

{/* Accent */}
<button className="group inline-flex items-center justify-center font-semibold focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 bg-orange-500 text-black hover:bg-orange-600 active:bg-orange-500 focus-visible:outline-orange-500 px-8 py-4 text-base transition duration-150 ease-in-out font-mono cursor-pointer">Accent</button>

{/* White */}
<button className="group inline-flex items-center justify-center font-semibold focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 bg-white text-neutral-900 hover:bg-orange-50 active:bg-orange-500 focus-visible:outline-white px-8 py-4 text-base transition duration-150 ease-in-out font-mono cursor-pointer">White</button>
```

Small size: `px-4 py-2 text-sm` swap. Wrap every demo row in `<div className="flex items-center justify-end gap-4">` (right-aligned per the project rule). Only render `variant="dark"` DemoBlocks; do not include the "On Light Background" demo.

State table: Dark row first (neutral-900 default / neutral-700 hover / neutral-800 active / white text), then Accent, then White. Lead the section copy with: "**Dark is the default button on the simplified surface.** Use Accent for primary brand emphasis, White for inverted CTAs."

### Forms & Inputs (SDS recipe)

Use **only** the dark assembly. Keep all input types from the DS (text, email, phone, checkbox, radio, toggle, textarea, address form). Every `DemoBlock` uses `variant="dark"`.

```jsx
<label className="block font-heading text-sm font-semibold text-neutral-100 mb-1.5">Label</label>
<input type="text" placeholder="…" className="border border-neutral-600 bg-neutral-800 px-4 py-2.5 text-sm text-neutral-100 w-full focus:outline-none focus:border-neutral-400 transition-colors" />
<p className="text-xs text-neutral-400 mt-1">Helper</p>
```

Checkbox/radio: keep `appearance-none w-5 h-5 border border-neutral-600 bg-neutral-800 checked:bg-orange-500 checked:border-orange-500 transition-colors`.

Toggle: track `bg-neutral-600 peer-checked:bg-orange-500`, knob `bg-white`.

### Callouts (SDS recipe — 4 variants)

```jsx
{/* accent */}
<div className="border-l-4 border-orange-500 bg-orange-50 p-6">
  <p className="font-heading font-semibold text-neutral-900">…</p>
  <p className="mt-2 font-heading text-neutral-700">…</p>
</div>

{/* accent-light */}
<div className="border-l-4 border-orange-500 bg-white p-6">…</div>

{/* neutral */}
<div className="border-l-4 border-neutral-900 bg-neutral-100 p-6">…</div>

{/* danger */}
<div className="border-l-4 border-red-500 bg-red-50 p-6">…</div>
```

These are intentionally light "islands" on the dark page — do not adapt their fills.

### States (SDS recipe — dark error)

```jsx
<div>
  <label className="block font-heading text-sm font-semibold text-neutral-100 mb-1.5">Email</label>
  <input type="email" defaultValue="not-an-email" className="border-2 border-red-500 bg-neutral-800 px-4 py-2.5 text-sm text-neutral-100 w-full focus:outline-none transition-colors" />
  <p className="text-xs text-red-300 mt-1">Please enter a valid email address.</p>
</div>
```

No `bg-red-50` anywhere in this section.

### Hero (SDS recipe — Service Page only)

Render the Service Page hero verbatim (dark bg, two-column with stats and orange left border). **Do not** include any typewriter span.

### Card (SDS recipe — Inverse + Accent + Hover Highlight)

- **Inverse**: `bg-neutral-900 text-neutral-100 p-6 border border-neutral-800`.
- **Accent**: `bg-orange-500 text-black p-6`.
- **Hover Highlight addon** (apply to either card): `transition-all duration-300 hover:-translate-y-0.5 ring-1 ring-transparent hover:ring-orange-500`.

### Sections kept verbatim from DS

For these, copy the source DemoBlocks unchanged: **Code Colors**, **Loading & Skeletons**. For **Shapes & Radius**, use Dark + dark input as the in-section demos.

### Container & Spacing

Use `variant="dark"` on both demos. The "Mobile First" callout at the bottom uses the SDS `accent` callout recipe (orange-50 light island).

### Typography

Render each TypeSample / inline display on dark. Because the global scoped override applies `color: var(--color-neutral-100)` to h1–h6 inside `[data-theme="dark"]`, the TypeSample h1–h6 samples render `neutral-100` automatically with no per-call className needed. Use the light scale explicitly for non-heading text: emphasis `text-neutral-100`, body `text-neutral-300`, helper / labels `text-neutral-400`, captions `text-neutral-500`. Keep the same fonts, scale, and weights.

### Do's & Don'ts (SDS recipe)

Two contrast demos:

1. Orange text on **white** vs. orange text on **black** — keep the DS message (black wins) but show both side by side as small dark-page panels (`bg-white` panel vs `bg-neutral-900` panel) framed inside the dark page.
2. Error input handling: DO = `border-2 border-red-500 bg-neutral-800 text-red-300`; DON'T = solid red fill (`bg-red-500 text-white`) shown as the anti-pattern.

## Nav file

Write `src/data/simplified-design-system-nav.ts` verbatim:

```ts
export interface NavItem {
  label: string;
  id: string;
  icon: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    title: 'FOUNDATIONS',
    items: [
      { label: 'Typography', id: 'typography', icon: 'Type' },
      { label: 'Color Palette', id: 'colors', icon: 'Palette' },
      { label: 'Code Colors', id: 'code-colors', icon: 'Code' },
      { label: 'Container & Spacing', id: 'grid-layout', icon: 'LayoutGrid' },
      { label: 'Shapes & Radius', id: 'shapes', icon: 'Triangle' },
    ],
  },
  {
    title: 'COMPONENTS',
    items: [
      { label: 'Hero', id: 'hero', icon: 'PanelTop' },
      { label: 'Section', id: 'section', icon: 'Square' },
      { label: 'Card', id: 'card', icon: 'CreditCard' },
      { label: 'Buttons', id: 'buttons', icon: 'MousePointerClick' },
      { label: 'Forms & Inputs', id: 'forms-inputs', icon: 'TextCursorInput' },
      { label: 'Loading & Skeletons', id: 'loading-skeletons', icon: 'Loader' },
      { label: 'Callout', id: 'callout-box', icon: 'MessageSquareQuote' },
    ],
  },
  {
    title: 'GUIDELINES',
    items: [
      { label: 'States', id: 'states', icon: 'ToggleLeft' },
      { label: "Do's & Don'ts", id: 'dos-donts', icon: 'CheckCircle' },
    ],
  },
];

export const sectionIds: string[] = navGroups.flatMap((g) => g.items.map((i) => i.id));
```

## Self-check

After writing `simplified-design-system.mdx`, run each of these checks (via `grep -n` or equivalent). All must hold; if any fail, fix and re-write.

| # | Check | Expected |
|---|---|---|
| 1 | `grep -n 'FadeInDemo' simplified-design-system.mdx` | no match |
| 2 | `grep -n 'id="animations"' simplified-design-system.mdx` | no match |
| 3 | `grep -n 'typewriter' simplified-design-system.mdx` | no match |
| 4 | `grep -n 'border-l-4 border-orange-500 bg-neutral-900' simplified-design-system.mdx` | no match (Accent Dark callout removed) |
| 5 | `grep -n 'Amber-800' simplified-design-system.mdx` | no match |
| 6 | `grep -n 'Background Combinations' simplified-design-system.mdx` | no match |
| 7 | `grep -n 'theme="dark"' simplified-design-system.mdx` | matches Layout + Sidebar lines |
| 8 | `grep -n 'navGroups' simplified-design-system.mdx` | imports from `simplified-design-system-nav` |
| 9 | `grep -c 'border-l-4 border-orange-500 bg-orange-50' simplified-design-system.mdx` | ≥ 1 (accent callout present) |
| 10 | `grep -c 'border-l-4 border-red-500 bg-red-50' simplified-design-system.mdx` | ≥ 1 (danger callout present) |
| 11 | `grep -c '<DocSection' simplified-design-system.mdx` | exactly 14 (5 foundations + 7 components + 2 guidelines) |
| 12 | `grep -n 'bg-red-50' simplified-design-system.mdx` (within the `<DocSection id="states">` block) | no match (states use dark error recipe) |
| 13 | Buttons section: first button in the first DemoBlock row is the Dark variant (`bg-neutral-900`) | yes |
| 14 | `pnpm astro check` (run after the `global.css` and `Layout.astro` edits) | exits 0 |
| 15 | `grep -n 'data-theme={theme}' src/layouts/Layout.astro` | one match on the `<body>` tag |
| 16 | `grep -n '\[data-theme="dark"\] h1' src/styles/global.css` | one match (inside `@layer base`) |
| 17 | `grep -n 'color: var(--color-neutral-100)' src/styles/global.css` | one match in the scoped override block |
| 18 | Visually verify on `/simplified-design-system/`: TypeSample h1–h6 samples and ColorSwatch color names render light (not neutral-900); callout headings stay dark on their light fills. | yes |

If `pnpm astro check` is unavailable, report it explicitly — do not silently skip.
