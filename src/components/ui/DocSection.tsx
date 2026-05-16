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
          ? 'bg-zinc-900 text-zinc-100 border-zinc-700'
          : 'bg-white text-zinc-700 border-zinc-200'
      )}
    >
      <h2 className={isDark ? 'text-zinc-100' : undefined}>{title}</h2>
      {subtitle && (
        <p className={cn('mt-2 text-base', isDark ? 'text-zinc-400' : 'text-zinc-500')}>
          {subtitle}
        </p>
      )}
      <div className="mt-10">{children}</div>
    </section>
  );
}
