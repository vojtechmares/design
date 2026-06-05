/**
 * TextInput — Mareš Design System
 *
 * Themes:  light (default) | dark
 * States:  default | error (via `error` prop, supplies inline message)
 *          disabled (via standard HTML `disabled` attribute)
 *
 * Spacing rules baked in: label `mb-1.5`, helper `mt-1`.
 * Wrap in `<form className="space-y-5">` so vertical rhythm matches the system.
 *
 * Error styling: 2px red-500 border + red-700 text message. The input bg stays
 * white (light) or zinc-800 (dark) — never `bg-red-50`, which is the
 * canonical "Don't" for input fills.
 *
 * See references/components.md#forms--inputs for the full spec.
 */
import * as React from 'react';

type Theme = 'light' | 'dark';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: string;
  theme?: Theme;
}

export function TextInput({
  label,
  helper,
  error,
  theme = 'light',
  className = '',
  disabled,
  id,
  ...rest
}: TextInputProps) {
  const isDark = theme === 'dark';
  const autoId = React.useId();
  const inputId = id ?? autoId;

  const labelCls = isDark
    ? 'block font-heading text-sm font-semibold text-zinc-100 mb-1.5'
    : 'block font-heading text-sm font-semibold text-zinc-900 mb-1.5';

  const baseInput = isDark
    ? 'bg-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-400'
    : 'bg-white text-zinc-700 focus:border-zinc-500';

  const borderInput = error
    ? 'border-2 border-red-500'
    : isDark
    ? 'border border-zinc-600'
    : 'border border-zinc-300';

  const disabledCls = disabled
    ? ' opacity-50 cursor-not-allowed ' + (isDark ? 'bg-zinc-800/60' : 'bg-zinc-50 border-zinc-200')
    : '';

  const helperCls = isDark
    ? 'text-xs text-zinc-400 mt-1'
    : 'text-xs text-zinc-500 mt-1';

  const errorCls = 'flex items-center gap-1 text-sm text-red-700 mt-1';

  return (
    <div>
      {label ? (
        <label htmlFor={inputId} className={labelCls}>
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        disabled={disabled}
        className={`${borderInput} ${baseInput} px-4 py-2.5 text-sm w-full focus:outline-none transition-colors${disabledCls} ${className}`.trim()}
        {...rest}
      />
      {error ? (
        <p className={errorCls}>
          <span className="font-heading">ⓘ</span> {error}
        </p>
      ) : helper ? (
        <p className={helperCls}>{helper}</p>
      ) : null}
    </div>
  );
}

/**
 * Usage:
 *
 *   <form className="space-y-5">
 *     <TextInput label="Full Name" placeholder="Jane Doe" />
 *     <TextInput label="Email" type="email" placeholder="jane@example.com" />
 *     <TextInput label="Password" type="password" error="Password is too short" />
 *     <div className="flex justify-end">
 *       <Button type="submit">Send</Button>
 *     </div>
 *   </form>
 *
 *   // Dark surface:
 *   <TextInput theme="dark" label="Email" placeholder="jane@example.com" />
 */
