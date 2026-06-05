# Principles

Narrative for the rules behind the tokens and components. Read this when something feels ambiguous — when no rule from `tokens.md`, `colors.md`, or `components.md` resolves the question, the principles below should.

## Sharp design — why 0px

Every surface uses `border-radius: 0`. Inputs, buttons, cards, callouts, skeleton blocks. The system is inspired by PlanetScale and OpenStatus — technical, modern, no decorative softness. Rounded corners read as marketing polish; MDS is engineering polish.

Operationally:

- The base layer applies `* { border-radius: 0 }` globally. Any `rounded-*` class in your component is either dead code (overridden) or a bug (component injects style after Tailwind's reset). Either way, remove it.
- Native form controls strip their default radius via `appearance-none` on checkbox / radio / toggle.
- Avatars are square (`w-48 h-72`-style aspect rectangles). Profile photos are not circles.

## Mobile-first, with one breakpoint

MDS treats `lg:` (1024px) as the primary breakpoint and otherwise prefers fluid containers over heavy responsive logic.

- Stack vertically by default; switch to a two-column layout only when there is genuine room (`lg:flex-row`).
- Grid layout is optional — most pages compose with containers and `flex`. Reach for `grid grid-cols-12` only when explicit column control matters (admin layouts, dashboards).
- H1–H3 scale down on tablet (90%) and mobile (80%, min 24px). All other type stays fixed.

## Contrast & accessibility

The system is conservative about color signal:

- Color is never the sole indicator. Errors combine red border + red text + an icon. Disabled combines reduced opacity + cursor + label color.
- `text-black` always pairs with `bg-orange-500`. White on orange fails contrast and is the canonical "Don't".
- Links carry an underline at all times. Removing the underline to "clean up" link styling violates accessibility.
- Focus state on inputs is a border-color transition (`focus:border-zinc-500`). No outline ring, but the focus is visible.
- Focus state on buttons uses a visible 2px outline with offset (`focus-visible:outline-2 focus-visible:outline-offset-2`).

## Single source of truth

There is one accent (`orange-500`), one text-link color (`amber-800`), one danger triad (`red-50 / red-500 / red-700`), and one neutral spine (zinc).

If a design need pushes you toward a new hue, the answer is almost always one of:

- Use orange in a different role (background instead of text, or vice versa).
- Use a different zinc step (lighter / darker neutral).
- Reconsider whether the element actually needs to stand out as much as you think.

The five code-syntax colors (`blue-300`, `emerald-300`, `orange-300`, `amber-300`, `purple-300`) are scoped to syntax highlighting only. Do not reuse them elsewhere.

## When to invent a new variant

Almost never. Each component has a closed variant set:

| Component | Variants | Add new? |
|---|---|---|
| Section | default · surface · inverse · accent | No |
| Card | default · surface · inverse · accent · accent-light | No |
| Button | accent · dark · white (× normal · small) | No |
| Callout | accent · accent-dark · accent-light · neutral · danger | No |
| Hero | homepage · service · content · blog-listing · blog-article · training | No — adapt the closest variant instead |

If the existing variants genuinely cannot express what the page needs, the principled fix is to compose them, not to invent. Examples:

- "I need a card that highlights a price" → use `accent-light` and a `font-mono` price line.
- "I need a hero with a video" → use the `homepage` variant pattern and replace the avatar block with the video.
- "I need a warning button" → use `dark` for the safe action and rely on a `danger` callout + confirmation copy for the destructive one. The system intentionally does not provide a "destructive button" variant — destructive actions are gated through callouts.

## When the host project conflicts

If you are working in a project that has MDS *and* its own local conventions (different button anatomy, different palette use, etc.), defer to the local convention only when:

- The local convention is documented in the project's `CLAUDE.md` or a sibling skill.
- The page is part of a clearly demarcated area (an embedded third-party UI, a marketing landing page, an experimental section).

Otherwise, follow MDS. Drift starts with "just this once."

## When MDS itself feels wrong

MDS is intentionally narrow. If you find yourself wanting to add a hue, a radius, or a font, pause and ask whether the *requirement* is wrong rather than the *system*. Most "I need a softer look" requests in this codebase have been better solved by:

- A lighter zinc step (`zinc-100` / `zinc-200` instead of `zinc-300`).
- More whitespace.
- A shorter line length.

Reach for a system change only after exhausting compositional options.
