import type { ReactNode } from 'react';

interface Props {
  id?: string;
  ariaLabel?: string;
  variant?: 'default' | 'surface' | 'inverse' | 'accent';
  className?: string;
  children?: ReactNode;
}

const variantStyles: Record<string, string> = {
  default: 'bg-white',
  surface: 'bg-zinc-50',
  inverse: 'bg-zinc-900 text-zinc-100',
  accent: 'bg-orange-500 text-black',
};

const cn = (...c: (string | false | undefined | null)[]) =>
  c.filter(Boolean).join(' ');

export default function Section({
  id,
  ariaLabel,
  variant = 'default',
  className,
  children,
}: Props) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(variantStyles[variant], 'py-16 px-8', className)}
    >
      {children}
    </section>
  );
}
