---
description: Derive the Simplified Design System (SDS) page from the main Design System
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
---

Invoke the `simplified-design-system` skill to (re)generate the Simplified Design System from the main Design System.

The skill produces:

- `src/pages/simplified-design-system.mdx`
- `src/data/simplified-design-system-nav.ts`

…by reading `src/pages/design-system.mdx` and applying the SDS derivation rules documented in the skill's `SKILL.md`.

Before generating, verify that `src/layouts/Layout.astro` and `src/components/Sidebar.astro` accept a `theme="dark"` prop. If either does not, patch them per the skill's "Layout requirements" section before continuing.

The SDS page is overwritten on every run — hand-edits to `src/pages/simplified-design-system.mdx` will be lost. The skill must self-check its output before reporting success (see "Self-check" in SKILL.md).
