/**
 * Callout — Mareš Design System
 *
 * Variants: accent | accent-dark | accent-light | neutral | danger
 *
 * Structure: `border-l-4 + p-6`. Optional `label` line (Inter SemiBold 600)
 * above body text (Inter Regular 400). Both use `font-heading`.
 *
 * Context: use `accent-dark` on `bg-zinc-900` surfaces. The other variants
 * live on light surfaces.
 *
 * See references/components.md#callout for the full variant table.
 */
import * as React from 'react';

type Variant = 'accent' | 'accent-dark' | 'accent-light' | 'neutral' | 'danger';

interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  label?: React.ReactNode;
}

const variants: Record<Variant, { container: string; label: string; body: string }> = {
  accent: {
    container: 'border-l-4 border-orange-500 bg-orange-50 p-6',
    label: 'font-heading font-semibold text-zinc-900',
    body: 'mt-2 font-heading text-zinc-700',
  },
  'accent-dark': {
    container: 'border-l-4 border-orange-500 bg-zinc-900 p-6',
    label: 'font-heading font-semibold text-white',
    body: 'mt-2 font-heading text-zinc-300',
  },
  'accent-light': {
    container: 'border-l-4 border-orange-500 bg-white p-6',
    label: 'font-heading font-semibold text-zinc-900',
    body: 'mt-2 font-heading text-zinc-700',
  },
  neutral: {
    container: 'border-l-4 border-zinc-900 bg-zinc-100 p-6',
    label: 'font-heading font-semibold text-zinc-900',
    body: 'mt-2 font-heading text-zinc-700',
  },
  danger: {
    container: 'border-l-4 border-red-500 bg-red-50 p-6',
    label: 'font-heading font-semibold text-zinc-900',
    body: 'mt-2 font-heading text-zinc-700',
  },
};

export function Callout({
  variant = 'accent',
  label,
  className = '',
  children,
  ...rest
}: CalloutProps) {
  const v = variants[variant];
  return (
    <div className={`${v.container} ${className}`.trim()} {...rest}>
      {label ? <p className={v.label}>{label}</p> : null}
      <div className={label ? v.body : v.body.replace(/^mt-2 /, '')}>{children}</div>
    </div>
  );
}

/**
 * Usage:
 *
 *   <Callout variant="accent" label="Important update">
 *     This is the primary callout variant for light backgrounds.
 *   </Callout>
 *
 *   <Callout variant="danger" label="Breaking change">
 *     This action cannot be undone.
 *   </Callout>
 *
 *   // Compact sidebar variant — use border-l-2 + accent scheme directly:
 *   <a className="border-l-2 border-orange-500 bg-orange-50 px-3 py-2">Active item</a>
 */
