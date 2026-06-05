# Motion

The system has four named animation tokens plus a single hover transition convention. Do not introduce new animations without justification — motion is sparse on purpose.

## Tokens

| Token | Duration | Easing | Purpose |
|---|---|---|---|
| `--animate-fade-in-up` | `0.6s` (or `1.2s` for "slow") | `ease-out` | Reveal blocks as they scroll into view. 30px bottom-to-top offset, opacity 0 → 1. |
| `--animate-shimmer` | `1.5s` | linear, `infinite` | Skeleton loading state. |
| `--animate-typewriter` | `3s` (configurable) | `steps(40)` (or `steps(37, end)` in hero copy) | Hero / marketing reveal of a single line. |
| `--animate-blink` | `0.8s` | `step-end infinite` | Caret blink that accompanies the typewriter effect. |

## Keyframe bodies

If you need to recreate these in a project that does not yet have them in `global.css`:

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

@keyframes typewriter {
  from { width: 0; }
  to   { width: 100%; }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0; }
}
```

## Usage

### Fade-in-up

Apply via the token on a section that should reveal as it scrolls into view. In the source project this is wrapped in a small React component that adds an IntersectionObserver and toggles a class. Inline use:

```tsx
<div className="opacity-0" style={{ animation: 'fadeInUp 0.6s ease-out forwards' }}>…</div>
```

### Typewriter

```tsx
<div
  className="overflow-hidden whitespace-nowrap border-r-2 border-zinc-900 text-base text-zinc-900"
  style={{ width: 0, animation: 'typewriter 3s steps(37, end) forwards, blink 0.8s step-end infinite' }}
>
  We code precisely. We deliver fast.
</div>
```

On dark surfaces swap `border-zinc-900` and `text-zinc-900` for `border-zinc-100` and `text-zinc-100`.

### Shimmer (skeleton)

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

## Hover transitions

There is one canonical hover transition: **0.3s ease**, applied via `transition duration-300 ease` (or `transition-all duration-300`). Use it for:

- The card hover-lift addon (`hover:-translate-y-0.5 ring-1 ring-transparent hover:ring-orange-500`).
- Generic "block lights up on hover" patterns (`border border-transparent hover:border-orange-500`).
- Anything where a background or border color changes on hover.

Buttons use a faster transition (`transition duration-150 ease-in-out`) baked into their canonical class string — don't change it.

## What not to animate

- Layout shifts (no animating `width` / `height` other than the typewriter line).
- Color of body text on hover.
- Pulsing accents that compete with the orange accent for attention.
- Decorative parallax or scroll-jacking.
