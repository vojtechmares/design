/**
 * Button — Mareš Design System
 *
 * Variants: accent | dark | white
 * Sizes:    normal | small
 *
 * Conventions:
 *  - Buttons use `font-mono` (JetBrains Mono) to differentiate from badges.
 *  - Buttons are always right-aligned inside the parent (wrap with `flex justify-end`)
 *    EXCEPT inside heroes where they follow the content flow.
 *  - Sharp corners (0px) — never add a `rounded-*` class.
 *  - Accent surfaces always pair with `text-black` (never white).
 *
 * See references/components.md#buttons for the full spec.
 */
import * as React from 'react';

type Variant = 'accent' | 'dark' | 'white';
type Size = 'normal' | 'small';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const base =
  'group inline-flex items-center justify-center font-semibold ' +
  'focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'transition duration-150 ease-in-out font-mono cursor-pointer';

const variants: Record<Variant, string> = {
  accent:
    'bg-orange-500 text-black hover:bg-orange-600 active:bg-orange-500 focus-visible:outline-orange-500',
  dark:
    'bg-zinc-900 text-white hover:bg-zinc-700 active:bg-zinc-800 focus-visible:outline-zinc-900',
  white:
    'bg-white text-zinc-900 hover:bg-orange-50 active:bg-orange-500 focus-visible:outline-white',
};

const sizes: Record<Size, string> = {
  normal: 'px-8 py-4 text-base',
  small: 'px-4 py-2 text-sm',
};

export function Button({
  variant = 'accent',
  size = 'normal',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}

/**
 * Usage:
 *
 *   <div className="flex justify-end">
 *     <Button>Send Message</Button>            // accent + normal
 *     <Button variant="dark" size="small">Cancel</Button>
 *   </div>
 *
 *   // In a hero, buttons follow content flow — no justify-end wrapper:
 *   <div className="mt-8 flex flex-wrap gap-4">
 *     <Button variant="white" size="small">Partnership</Button>
 *     <Button variant="white" size="small">Training</Button>
 *   </div>
 */
