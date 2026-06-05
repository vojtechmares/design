/**
 * Card — Mareš Design System
 *
 * Variants: default | surface | inverse | accent | accent-light
 * Base classes (every variant): `overflow-hidden p-6`
 *
 * Optional `hoverLift` prop adds the standard interactive lift + orange ring.
 * Use it on clickable cards (training listings, service links).
 *
 * See references/components.md#card for the full spec.
 */
import * as React from 'react';

type Variant = 'default' | 'surface' | 'inverse' | 'accent' | 'accent-light';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  hoverLift?: boolean;
}

const base = 'overflow-hidden p-6';

const variants: Record<Variant, string> = {
  default: 'bg-white inset-shadow-sm inset-shadow-zinc-900/10',
  surface: 'bg-white shadow-xl shadow-zinc-900/10',
  inverse: 'bg-zinc-900',
  accent: 'bg-orange-500',
  'accent-light': 'bg-orange-50',
};

const hoverAddon =
  'transition duration-300 ease hover:-translate-y-0.5 ' +
  'ring-1 ring-transparent hover:ring-orange-500';

export function Card({
  variant = 'default',
  hoverLift = false,
  className = '',
  children,
  ...rest
}: CardProps) {
  const lift = hoverLift ? ` ${hoverAddon}` : '';
  return (
    <div
      className={`${base} ${variants[variant]}${lift} ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}

/**
 * Text colors inside the card (the parent does NOT set these):
 *
 *   default / surface  → headings inherit text-zinc-900, body text-zinc-600
 *   inverse            → headings text-white, body text-zinc-300
 *   accent             → headings text-black, body text-black/80
 *   accent-light       → same as default
 *
 * Usage:
 *
 *   <Card hoverLift>
 *     <h4>Kubernetes</h4>
 *     <p className="mt-2 text-sm text-zinc-600">Hands-on training…</p>
 *     <p className="mt-4 font-mono text-lg font-semibold text-zinc-900">od 5 400 CZK</p>
 *     <div className="mt-6 flex justify-end">
 *       <Button size="small">Detail</Button>
 *     </div>
 *   </Card>
 */
