interface Props {
  name: string;
  hex: string;
  rgb?: string;
  tailwind?: string;
  usage?: string;
  cmyk?: string;
  oklch?: string;
}

export default function ColorSwatch({ name, hex, rgb, tailwind, usage, cmyk, oklch }: Props) {
  const meta = [
    { label: 'HEX', value: hex },
    { label: 'RGB', value: rgb },
    { label: 'TW', value: tailwind },
    { label: 'CMYK', value: cmyk },
    { label: 'OKLCH', value: oklch },
  ].filter((m) => m.value);

  return (
    <div>
      <div className="h-20 w-full" style={{ backgroundColor: hex }}></div>
      <div className="mt-3">
        <h4>{name}</h4>
        <dl className="mt-1 space-y-0.5 text-xs text-neutral-500">
          {meta.map((m) => (
            <div key={m.label} className="flex gap-2">
              <dt className="font-bold uppercase">{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
        {usage && <p className="mt-2 text-xs text-neutral-500">{usage}</p>}
      </div>
    </div>
  );
}
