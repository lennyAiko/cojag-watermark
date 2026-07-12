import { PRESETS } from '../../lib/presets';

export function PresetPicker({ value, onChange, disabled }) {
  return (
    <div
      className={[
        'grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3',
        disabled ? 'pointer-events-none opacity-40' : '',
      ].join(' ')}
    >
      {PRESETS.map((p) => {
        const active = p.id === value;
        return (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
            title={p.label}
            className={[
              'flex cursor-pointer flex-col items-center gap-1 rounded-md border p-1.5 transition-colors',
              active
                ? 'border-accent bg-accent-bg'
                : 'border-border-2 bg-surface-2 hover:border-text-muted',
            ].join(' ')}
          >
            <span
              className="h-8 w-full rounded"
              style={{ background: p.swatch }}
            />
            <span
              className={[
                'w-full truncate text-center text-[10px] leading-tight',
                active ? 'text-accent' : 'text-text-muted',
              ].join(' ')}
            >
              {p.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
