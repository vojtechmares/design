/**
 * Section — Mareš Design System
 *
 * Variants: default | surface | inverse | accent
 *
 * Thin full-width background wrapper. Padding is NOT enforced here —
 * the page composes vertical padding with `py-*` at the call site.
 *
 * See references/components.md#section for the variant table.
 */
import * as React from 'react';

type Variant = 'default' | 'surface' | 'inverse' | 'accent';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  default: 'bg-white',
  surface: 'bg-zinc-50',
  inverse: 'bg-zinc-900',
  accent: 'bg-orange-500',
};

export function Section({
  variant = 'default',
  className = '',
  children,
  ...rest
}: SectionProps) {
  return (
    <section className={`${variants[variant]} ${className}`.trim()} {...rest}>
      {children}
    </section>
  );
}

/**
 * Text colors inside (set on children, not on Section):
 *
 *   default / surface  → headings text-zinc-900, body text-zinc-700
 *   inverse            → headings text-zinc-100 (or text-white), body text-zinc-300/400
 *   accent             → headings text-black, body text-black/70
 *
 * Usage:
 *
 *   <Section variant="inverse" className="py-20">
 *     <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
 *       <h2 className="text-zinc-100">Section heading</h2>
 *       <p className="mt-4 text-zinc-300">Body copy.</p>
 *     </div>
 *   </Section>
 */
