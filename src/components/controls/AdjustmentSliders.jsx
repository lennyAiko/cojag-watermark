import { Slider } from '../ui/Slider';

const GROUPS = [
  {
    title: 'Light',
    items: [
      { key: 'brightness', label: 'Brightness' },
      { key: 'contrast', label: 'Contrast' },
      { key: 'highlights', label: 'Highlights' },
      { key: 'shadows', label: 'Shadows' },
    ],
  },
  {
    title: 'Color',
    items: [
      { key: 'temperature', label: 'Temperature' },
      { key: 'tint', label: 'Tint' },
      { key: 'vibrance', label: 'Vibrance' },
      { key: 'saturation', label: 'Saturation' },
    ],
  },
];

export function AdjustmentSliders({ adjustments, onChange }) {
  return (
    <div className="flex flex-col gap-5">
      {GROUPS.map((group) => (
        <div key={group.title} className="flex flex-col gap-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-faint">
            {group.title}
          </div>
          {group.items.map(({ key, label }) => {
            const value = adjustments[key] ?? 0;
            return (
              <div key={key}>
                <div className="mb-1 flex items-center justify-between text-[11px]">
                  <span className="text-text-muted">{label}</span>
                  <span
                    className={
                      value === 0 ? 'text-text-faint' : 'font-medium text-accent'
                    }
                  >
                    {value > 0 ? `+${value}` : value}
                  </span>
                </div>
                <Slider
                  min={-100}
                  max={100}
                  value={value}
                  onChange={(v) => onChange(key, v)}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
