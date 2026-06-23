import { createElement } from 'react';

interface Props {
  element: string;
  font: string;
  weight: string;
  size: string;
  lineHeight: string;
  usage: string;
}

const fontFamily: Record<string, string> = {
  'IBM Plex Sans': 'font-display',
  Inter: 'font-heading',
  'JetBrains Mono': 'font-mono',
};

export default function TypeSample({ element, font, weight, size, lineHeight, usage }: Props) {
  const fontClass = fontFamily[font] ?? 'font-heading';

  const sample = createElement(
    element,
    {
      className: fontClass,
      style: { fontSize: size, fontWeight: weight, lineHeight },
    },
    'The quick brown fox jumps over the lazy dog'
  );

  return (
    <div>
      {sample}
      <div className="mt-2 flex flex-wrap gap-4 text-xs text-neutral-500">
        <code className="font-mono">{font}</code>{' '}
        <code className="font-mono">{size}</code>{' '}
        <code className="font-mono">{weight}</code>{' '}
        <code className="font-mono">{lineHeight}</code>
      </div>
      <p className="mt-1 text-xs text-neutral-500">{usage}</p>
    </div>
  );
}
