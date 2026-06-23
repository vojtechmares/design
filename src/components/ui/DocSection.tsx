import type { ReactNode } from 'react';

interface Props {
  id: string;
  title: string;
  subtitle?: string;
  variant?: 'light' | 'dark';
  children?: ReactNode;
}

const cn = (...c: (string | false | undefined | null)[]) =>
  c.filter(Boolean).join(' ');

export default function DocSection({
  id,
  title,
  subtitle,
  variant = 'light',
  children,
}: Props) {
  const isDark = variant === 'dark';

  return (
    <section
      id={id}
      className={cn(
        'border-t py-16 px-0',
        isDark
          ? 'bg-neutral-900 text-neutral-100 border-neutral-700'
          : 'bg-white text-neutral-700 border-neutral-200'
      )}
    >
      <h2 className={isDark ? 'text-neutral-100' : undefined}>{title}</h2>
      {subtitle && (
        <p className={cn('mt-2 text-base', isDark ? 'text-neutral-400' : 'text-neutral-500')}>
          {subtitle}
        </p>
      )}
      <div className="mt-10">{children}</div>
    </section>
  );
}
