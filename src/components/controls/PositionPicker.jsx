import { POSITIONS } from '../../lib/watermark';

export function PositionPicker({ value, onChange, disabled }) {
  return (
    <div
      className={[
        'grid aspect-[4/3] w-full max-w-[160px] grid-cols-3 grid-rows-3 gap-1 rounded-lg border border-border-2 bg-surface-2 p-2',
        disabled ? 'pointer-events-none opacity-40' : '',
      ].join(' ')}
    >
      {POSITIONS.map((p) => {
        const active = p.id === value.id;
        const align =
          (p.row === 0
            ? 'items-start'
            : p.row === 1
              ? 'items-center'
              : 'items-end') +
          ' ' +
          (p.col === 0
            ? 'justify-start'
            : p.col === 1
              ? 'justify-center'
              : 'justify-end');
        return (
          <button
            key={p.id}
            title={p.label}
            onClick={() => onChange(p)}
            className={`flex cursor-pointer border-none bg-transparent ${align}`}
          >
            <span
              className="rounded-[3px] transition-all"
              style={{
                width: active ? 12 : 7,
                height: active ? 12 : 7,
                background: active ? 'var(--color-accent)' : '#3a3f4a',
                boxShadow: active ? '0 0 0 4px rgba(227,168,87,0.13)' : 'none',
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
