# Components

Authoritative anatomy for every component in MDS. For each, the variant set is closed — adding new variants needs explicit justification (see `principles.md`).

For copy-paste implementations, see `templates/`.

---

## Section

Full-width layout block with a background variant. A thin wrapper — does not enforce padding (the page composes that).

### Variants

| Variant | Background | Use case | Canonical classes |
|---|---|---|---|
| `default` | white | Standard content | `bg-white` |
| `surface` | `zinc-50` | Subtle content separation | `bg-zinc-50` |
| `inverse` | `zinc-900` | Hero, footer, high-contrast | `bg-zinc-900` |
| `accent` | `orange-500` | CTA blocks, highlights | `bg-orange-500` |

### Text colors inside

| Variant | Heading | Body |
|---|---|---|
| `default` / `surface` | `text-zinc-900` | `text-zinc-700` |
| `inverse` | `text-zinc-100` (or `text-white`) | `text-zinc-400` (secondary) / `text-zinc-300` (primary) |
| `accent` | `text-black` | `text-black/70` |

---

## Hero

Full-width page header. Two-column flex on desktop (`lg:flex-row lg:justify-between`), stacks on mobile.

### Pattern

```tsx
<div className="py-10 flex flex-col gap-y-8 lg:flex-row lg:justify-between">
  <div className="max-w-xl">
    <h1>…</h1>
    <p className="mt-4 …">…</p>
    {/* Buttons follow content flow — no justify-end here */}
  </div>
  <div className="flex flex-col gap-6 lg:pt-2">
    {/* Stats / avatar / metadata / logo */}
  </div>
</div>
```

### Variants

| Variant | Surface | Right column | H1 size |
|---|---|---|---|
| `homepage` | light (`bg-white`) | Avatar block (`w-48 h-72 sm:w-60 sm:h-88 lg:w-64 lg:h-96 bg-zinc-700`), overflows with `-mb-16 -mr-6` | `text-3xl sm:text-5xl lg:text-6xl leading-[1.1]` |
| `service` | dark (`bg-zinc-900`) | Stats list, each `border-l-2 border-orange-500 pl-6` with a `text-3xl font-bold text-white` value | `text-3xl md:text-4xl leading-tight` |
| `content` | dark | Stats list (same as service) | `text-3xl md:text-4xl leading-tight` |
| `blog-listing` | dark | Inline — hashtag links + archive row below H1 (no right column) | `text-3xl md:text-4xl` |
| `blog-article` | dark | Metadata stats (`text-xl font-bold`): published date, topic, reading time | `text-2xl md:text-3xl leading-tight` |
| `training` | dark | Stats list, H1 prefixed by `w-12 h-12 bg-zinc-700` logo block | `text-3xl md:text-4xl leading-tight` |

### Stat block (right column item)

```tsx
<div className="border-l-2 border-orange-500 pl-6">
  <span className="font-body text-3xl font-bold text-white">6+ years</span>
  <p className="mt-1 text-sm text-zinc-400">of DevOps and cloud experience</p>
</div>
```

### Hero buttons

Buttons in a hero follow the content flow on the left column — they are NOT pulled to the right. Use the standard button class strings from the Button section.

---

## Card

Container with `overflow-hidden p-6` base, one of five variants, optional hover-lift addon.

### Variants

| Variant | Background | Shadow | Heading | Body | Classes |
|---|---|---|---|---|---|
| `default` | white | inset | `text-zinc-900` (inherits) | `text-zinc-600` | `bg-white inset-shadow-sm inset-shadow-zinc-900/10 overflow-hidden p-6` |
| `surface` | white | shadow-xl | `text-zinc-900` | `text-zinc-600` | `bg-white shadow-xl shadow-zinc-900/10 overflow-hidden p-6` |
| `inverse` | `zinc-900` | none | `text-white` | `text-zinc-300` | `bg-zinc-900 overflow-hidden p-6` |
| `accent` | `orange-500` | none | `text-black` | `text-black/80` | `bg-orange-500 overflow-hidden p-6` |
| `accent-light` | `orange-50` | none | `text-zinc-900` | `text-zinc-600` | `bg-orange-50 overflow-hidden p-6` |

### Hover-lift addon

Add to any variant for clickable cards (training listings, service links):

```
transition duration-300 ease hover:-translate-y-0.5 ring-1 ring-transparent hover:ring-orange-500
```

### Card with action

The convention for a card with a CTA is heading + body + price/metadata + a right-aligned button:

```tsx
<div className="bg-white inset-shadow-sm inset-shadow-zinc-900/10 overflow-hidden p-6">
  <h4>Kubernetes</h4>
  <p className="mt-2 text-sm text-zinc-600">Learn to deploy and operate containerized apps at scale.</p>
  <p className="mt-4 font-mono text-lg font-semibold text-zinc-900">od 5 400 CZK</p>
  <div className="mt-6 flex justify-end">
    <button className="…accent-small button class string…">Detail</button>
  </div>
</div>
```

---

## Buttons

`font-mono`, sharp, right-aligned within the parent. 3 variants × 2 sizes.

### Variants

| Variant | Default | Hover | Active | Text | Focus outline |
|---|---|---|---|---|---|
| `accent` | `bg-orange-500` | `bg-orange-600` | `bg-orange-500` | `text-black` | `focus-visible:outline-orange-500` |
| `dark` | `bg-zinc-900` | `bg-zinc-700` | `bg-zinc-800` | `text-white` | `focus-visible:outline-zinc-900` |
| `white` | `bg-white` | `bg-orange-50` | `bg-orange-500` | `text-zinc-900` | `focus-visible:outline-white` |

### Sizes

| Size | Padding | Font size | Classes |
|---|---|---|---|
| `normal` | 16px / 32px | 16px (base) | `px-8 py-4 text-base` |
| `small` | 8px / 16px | 14px (sm) | `px-4 py-2 text-sm` |

### Canonical class strings

**Accent · normal**
```
group inline-flex items-center justify-center font-semibold focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 bg-orange-500 text-black hover:bg-orange-600 active:bg-orange-500 focus-visible:outline-orange-500 px-8 py-4 text-base transition duration-150 ease-in-out font-mono cursor-pointer
```

**Dark · normal** — swap the color cluster:
```
bg-zinc-900 text-white hover:bg-zinc-700 active:bg-zinc-800 focus-visible:outline-zinc-900
```

**White · normal** — swap:
```
bg-white text-zinc-900 hover:bg-orange-50 active:bg-orange-500 focus-visible:outline-white
```

**Small** — swap the sizing classes: `px-4 py-2 text-sm`.

### Alignment

Buttons live inside a `flex justify-end` wrapper inside cards, forms, and dialogs. Hero buttons are the exception (follow content flow on the left).

### Surface guidance

| Surface | Allowed variants |
|---|---|
| Light (`bg-white`) | `accent`, `dark` |
| Dark (`bg-zinc-900`) | `accent`, `white` |
| Accent (`bg-orange-500`) | `dark`, `white` (use sparingly — accent cards usually don't host buttons) |

---

## Forms & inputs

### Input class strings

| Surface | Input | Label | Helper |
|---|---|---|---|
| Light | `border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-700 w-full focus:outline-none focus:border-zinc-500 transition-colors` | `block font-heading text-sm font-semibold text-zinc-900 mb-1.5` | `text-xs text-zinc-500 mt-1` |
| Dark | `border border-zinc-600 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-100 w-full focus:outline-none focus:border-zinc-400 transition-colors placeholder:text-zinc-500` | `block font-heading text-sm font-semibold text-zinc-100 mb-1.5` | `text-xs text-zinc-400 mt-1` |

Textarea: same as input plus `resize-y`.

### Checkbox

```
form-checkbox appearance-none w-5 h-5 border border-zinc-300 bg-white checked:bg-orange-500 checked:border-orange-500 transition-colors cursor-pointer shrink-0
```

Dark: swap `border-zinc-300 bg-white` → `border-zinc-600 bg-zinc-800`.

The check glyph comes from a CSS rule that paints an SVG via `.form-checkbox:checked { background-image: url("data:image/svg+xml,…") }` — that rule lives in the host project's global stylesheet, not in the component.

### Radio

```
form-radio appearance-none w-5 h-5 border border-zinc-300 bg-white transition-colors cursor-pointer shrink-0
```

Checked state is rendered by `.form-radio:checked { background-color: #F97316; box-shadow: inset 0 0 0 3px white; border-color: #F97316; }` in the global stylesheet. Radio is square (no `rounded-full`).

### Toggle / switch

```tsx
<label className="flex items-center gap-3 cursor-pointer">
  <span className="relative inline-flex items-center w-11 h-6">
    <input type="checkbox" className="sr-only peer" />
    <span className="absolute inset-0 bg-zinc-300 peer-checked:bg-orange-500 transition-colors" />
    <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white transition-transform peer-checked:translate-x-5" />
  </span>
  <span className="text-sm text-zinc-700">Enable notifications</span>
</label>
```

Dark: swap `bg-zinc-300` → `bg-zinc-600`, knob `bg-white` → `bg-zinc-100`, label text → `text-zinc-300`.

### States

| State | Border | Background | Label | Notes |
|---|---|---|---|---|
| Default | `border-zinc-300` | `bg-white` | `text-zinc-900` | Resting |
| Focus | `focus:border-zinc-500` (light) / `focus:border-zinc-400` (dark) | unchanged | unchanged | No outline; only border transitions |
| Error | `border-2 border-red-500` | `bg-white` (**not** `bg-red-50`) | `text-zinc-900` | Inline message: `text-red-700` |
| Disabled | `border-zinc-200` | `bg-zinc-50` | `text-zinc-400` | + `opacity-50 cursor-not-allowed` |

### Form structure

```tsx
<form className="space-y-5">
  <div>
    <label className="block font-heading text-sm font-semibold text-zinc-900 mb-1.5">Email</label>
    <input className="…input class…" />
  </div>
  <div className="grid grid-cols-2 gap-4">{/* Inline field pair */}</div>
  <div className="flex justify-end">
    <button className="…button class…" type="submit">Send</button>
  </div>
</form>
```

Form inside a card: card uses `border border-zinc-200 bg-white p-8` (light) or `border border-zinc-700 bg-zinc-900 p-8` (dark).

---

## Loading & skeleton

The skeleton block is a `bg-zinc-200` placeholder; the shimmer line uses an inline gradient + animation.

### Plain skeleton block

```tsx
<div className="h-12 w-12 bg-zinc-200" />
```

### Shimmer skeleton

```tsx
<div
  className="h-4 w-48"
  style={{
    background: 'linear-gradient(90deg, #E4E4E7 25%, #F4F4F5 50%, #E4E4E7 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  }}
/>
```

The `shimmer` keyframe must exist in the host project's stylesheet (see `motion.md`).

---

## Callout

A bordered block for emphasis. 5 variants. Always `border-l-4 + p-6`.

### Variants

| Variant | Border | Background | Label color | Text color |
|---|---|---|---|---|
| `accent` | `border-orange-500` | `bg-orange-50` | `text-zinc-900` | `text-zinc-700` |
| `accent-dark` | `border-orange-500` | `bg-zinc-900` | `text-white` | `text-zinc-300` |
| `accent-light` | `border-orange-500` | `bg-white` | `text-zinc-900` | `text-zinc-700` |
| `neutral` | `border-zinc-900` | `bg-zinc-100` | `text-zinc-900` | `text-zinc-700` |
| `danger` | `border-red-500` | `bg-red-50` | `text-zinc-900` | `text-zinc-700` |

### Anatomy

```tsx
<div className="border-l-4 border-orange-500 bg-orange-50 p-6">
  <p className="font-heading font-semibold text-zinc-900">Important update</p>
  <p className="mt-2 font-heading text-zinc-700">Body content.</p>
</div>
```

Label uses Inter SemiBold (600). Body uses Inter Regular (400). Both via `font-heading`.

### Context rules

- Light backgrounds → use `accent`, `accent-light`, `neutral`, or `danger`.
- Dark backgrounds → use `accent-dark`. Other variants stay on light surfaces (or sit as bright islands on dark).

### Compact sidebar variant

For sidebar/nav active states, use `border-l-2` (thinner) instead of `border-l-4` with the same color scheme:

```
border-l-2 border-orange-500 bg-orange-50
```

---

## States / validation

The single source of truth for danger styling across the system.

| Element | Token | Where it shows |
|---|---|---|
| Error border | `red-500` (2px) | Input borders, callout left border |
| Error text | `red-700` | Inline error messages |
| Error background | `red-50` | Callout background, *not* input fill |

### Error input

```tsx
<div className="space-y-2">
  <label className="block font-heading font-semibold text-zinc-900">Password</label>
  <input
    type="text"
    className="w-full border-2 border-red-500 px-3 py-2 text-zinc-900 bg-white"
  />
  <p className="flex items-center gap-1 text-sm text-red-700">
    <span className="font-heading">ⓘ</span> Password is too short
  </p>
</div>
```

The bg stays `bg-white` — filling the input with `bg-red-50` breaks visual hierarchy and is documented as a "Don't".
