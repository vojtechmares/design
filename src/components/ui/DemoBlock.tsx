import type { ReactNode } from 'react';

interface Props {
  label?: string;
  variant?: 'light' | 'dark' | 'muted';
  children?: ReactNode;
}

const variantClasses: Record<string, string> = {
  light: 'bg-white border-zinc-200',
  dark: 'bg-zinc-900 border-zinc-700',
  muted: 'bg-zinc-100 border-zinc-200',
};

export default function DemoBlock({ label, variant = 'light', children }: Props) {
  return (
    <div>
      {label && (
        <span className="mb-2 block font-heading text-xs font-semibold uppercase tracking-wider text-zinc-500">
          {label}
        </span>
      )}
      <div className={`border p-6 ${variantClasses[variant]}`}>{children}</div>
    </div>
  );
}
