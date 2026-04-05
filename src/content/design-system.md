# Mares Design System v1.0

Complete visual style specification. Single source of truth for design and web development.

## Typography (3 Fonts)

Monospace system for a technical aesthetic.

### Font Families

| Font | Usage | Weights |
|------|-------|---------|
| IBM Plex Sans | Display headings (H1-H3) | 600 (SemiBold), 700 (Bold) |
| Inter | UI headings (H4-H6), labels, buttons | 400, 500, 600, 700 |
| Space Mono | Body text, code, data | 400 (Regular), 700 (Bold) |

### Typographic Scale

| Element | Size | Font / Weight | Line-height | Usage |
|---------|------|---------------|-------------|-------|
| H1 | 48px / 3rem | IBM Plex Sans Bold (700) | 1.1 | Hero sections |
| H2 | 36px / 2.25rem | IBM Plex Sans SemiBold (600) | 1.2 | Main sections |
| H3 | 28px / 1.75rem | IBM Plex Sans SemiBold (600) | 1.3 | Subsections, cards |
| H4 | 20px / 1.25rem | Inter Medium (500) | 1.4 | Smaller headings |
| H5 | 18px / 1.125rem | Inter SemiBold (600) | 1.5 | UI components |
| H6 | 16px / 1rem | Inter SemiBold (600) | 1.5 | Inline headings |
| P | 16px / 1rem | Space Mono Regular (400) | 1.6 | Body text |
| SMALL | 14px / 0.875rem | Space Mono Regular (400) | 1.5 | Captions, metadata |
| A | Inherit | Space Mono Medium (500) | Inherit | Color: Amber-800 #92400E |

Responsive: Desktop 100% · Tablet 90% (H1-H3) · Mobile 80% (H1-H3, min 24px)

### Links
- Light background: Amber-800 (#92400E) + underline, hover Orange-600 (#ea580c)
- Dark background: Zinc-100 (#F4F4F5) + underline

## Colors (Orange + Zinc)

Warm orange combined with a neutral Zinc palette. Ensures a high-contrast, warm aesthetic.

### Primary Palette

| Name | HEX | RGB | Tailwind | Usage |
|------|-----|-----|----------|-------|
| Orange-500 (Primary) | #f97316 | 249, 115, 22 | orange-500 | Primary buttons, action icons, CTAs. Text must be black (#000) |
| Orange-600 (Hover) | #ea580c | 234, 88, 12 | orange-600 | Primary button hover state |
| Orange-50 (Light) | #fff7ed | 255, 247, 237 | orange-50 | Secondary buttons |
| Amber-800 (Text) | #92400E | 146, 64, 14 | amber-800 | Text links, highlighted text, labels. WCAG AA |
| Zinc-900 (Dark) | #18181B | 24, 24, 27 | zinc-900 | Headings, dark backgrounds (hero, footer), code blocks |

### Zinc Text Palette

| Name | HEX | Usage |
|------|-----|-------|
| Zinc-700 | #3F3F46 | Body text on light background |
| Zinc-500 | #71717A | Secondary text, captions |
| Zinc-100 | #F4F4F5 | Text on dark background |
| Zinc-300 | #D4D4D8 | Secondary text on dark background |

### Background Combinations

- Light background: Zinc-100 (#F4F4F5) + White blocks (#ffffff)
- Dark background: Zinc-900 (#18181B) + Zinc-800 blocks (#27272A)

## Code Syntax Colors

5 colors from Tailwind 300 scale for syntax highlighting.

| Name | HEX | RGB | Usage |
|------|-----|-----|-------|
| Blue-300 | #93C5FD | 147, 197, 253 | Functions, methods |
| Emerald-300 | #6EE7B7 | 110, 231, 183 | Strings, text values |
| Orange-300 | #FDBA74 | 253, 186, 116 | Keywords, HTML tags |
| Amber-300 | #FCD34D | 252, 211, 77 | Numbers, constants, booleans |
| Purple-300 | #D8B4FE | 216, 180, 254 | Classes, types, special objects |

## Container & Spacing (Mobile First)

| Container | Max Width | Usage |
|-----------|-----------|-------|
| Standard | 1280px | Homepage, portfolio, contact |
| Prose | 65ch | Blog posts, documentation |
| Breakpoint | 1024px | Mobile/desktop switch |

### Grid System (Optional)
- Columns: 12
- Gap: 32px
- Common layouts: 2-8-2, 8-4, 9-3, 4-4-4, 6-6

### Hero Section Structure
Dark hero background (Zinc-900) → Title (H1) → Publication date → Content in prose mode

## Animations

### Fade In Up
- Duration: 0.6s (normal), 1.2s (slow)
- Easing: ease-out
- Offset: 30px bottom-to-top

### Typewriter Text
- Duration: 3s (configurable)
- Steps: steps(37, end)
- Cursor: blink 0.8s

### Hover Highlight
- Border: 1px Orange-500 (#f97316)
- Transition: 0.3s ease

## Shape Hierarchy (Sharp Design)

All border-radius: 0px. No rounding anywhere. Technical, modern look.

Applies to: buttons, inputs, cards, blocks, images — everything.

## Contextual Blocks

### Light Section
- Background: white
- Text: Zinc-700
- Primary button: bg-orange-500, text-black
- Secondary button: bg-white, border-zinc-300, text-zinc-700

### Dark Section
- Background: Zinc-900
- Text: Zinc-100
- Primary button: bg-orange-500, text-black
- Secondary button: bg-zinc-800, border-zinc-600, text-zinc-100

## Do's & Don'ts

- ✅ DO: Black text on orange backgrounds (high contrast)
- ❌ DON'T: White text on orange backgrounds (low contrast, poor readability)

## States & Loading

### Skeleton Loading
- Placeholder color: Zinc-200 (#E4E4E7)
- Shimmer: linear-gradient sweep animation, 1.5s infinite
- No border-radius on skeleton elements

### Form Validation (Error State)
- Label: red-600
- Input border: 2px red-500
- Error message: red-600, text-sm
