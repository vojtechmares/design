import type { ReactNode } from 'react';

interface Props {
  label?: string;
  variant?: 'light' | 'dark' | 'muted';
  children?: ReactNode;
}

const variantClasses: Record<string, string> = {
  light: 'bg-white border-neutral-200',
  dark: 'bg-neutral-900 border-neutral-700',
  muted: 'bg-neutral-100 border-neutral-200',
};

export default function DemoBlock({ label, variant = 'light', children }: Props) {
  return (
    <div>
      {label && (
        <span className="mb-2 block font-heading text-xs font-semibold uppercase tracking-wider text-neutral-500">
          {label}
        </span>
      )}
      <div className={`border p-6 ${variantClasses[variant]}`}>{children}</div>
    </div>
  );
}
