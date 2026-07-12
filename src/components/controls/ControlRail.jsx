import { Label, ValuePill } from '../ui/Label';
import { Slider } from '../ui/Slider';
import { Button } from '../ui/Button';
import { PositionPicker } from './PositionPicker';
import { PresetPicker } from './PresetPicker';
import { LogoPanel } from './LogoPanel';

export function ControlRail({
  settings,
  actions,
  logo,
  hasLogo,
  activePreset,
  activeIntensity,
  hasImages,
  imageCount,
}) {
  const { position, sizePct, paddingPct, opacity, rotation, tiled } = settings;
  const {
    onLogoUpload,
    onLogoClear,
    setPosition,
    setSizePct,
    setPaddingPct,
    setOpacity,
    setRotation,
    setTiled,
    setActivePreset,
    setActiveIntensity,
    applyPresetToAll,
  } = actions;

  return (
    <div className="flex w-full shrink-0 flex-col gap-6 border-b border-border p-6 md:w-[300px] md:overflow-y-auto md:border-b-0 md:border-r">
      <LogoPanel logo={logo} onUpload={onLogoUpload} onClear={onLogoClear} />

      <section>
        <Label>02 · Layout</Label>
        <div className="mb-3 flex gap-2">
          <ModeToggle
            active={!tiled}
            onClick={() => setTiled(false)}
            label="Single"
          />
          <ModeToggle
            active={tiled}
            onClick={() => setTiled(true)}
            label="Tiled"
          />
        </div>
        <PositionPicker
          value={position}
          onChange={setPosition}
          disabled={tiled}
        />
      </section>

      <section>
        <Label>
          03 · Size <ValuePill>{sizePct}% of width</ValuePill>
        </Label>
        <Slider min={4} max={40} value={sizePct} onChange={setSizePct} />
      </section>

      {!tiled && (
        <section>
          <Label>
            04 · Edge padding <ValuePill>{paddingPct}%</ValuePill>
          </Label>
          <Slider
            min={0}
            max={15}
            value={paddingPct}
            onChange={setPaddingPct}
          />
        </section>
      )}

      <section>
        <Label>
          05 · Opacity <ValuePill>{opacity}%</ValuePill>
        </Label>
        <Slider min={10} max={100} value={opacity} onChange={setOpacity} />
      </section>

      <section>
        <Label>
          06 · Rotation <ValuePill>{rotation}°</ValuePill>
        </Label>
        <Slider min={-45} max={45} value={rotation} onChange={setRotation} />
      </section>

      <section>
        <Label>07 · Preset</Label>
        {hasImages ? (
          <>
            <PresetPicker value={activePreset} onChange={setActivePreset} />
            <div className="mt-4">
              <Label>
                Intensity <ValuePill>{activeIntensity}%</ValuePill>
              </Label>
              <Slider
                min={0}
                max={100}
                value={activeIntensity}
                onChange={setActiveIntensity}
              />
            </div>
            <Button
              variant="secondary"
              className="mt-3 w-full"
              onClick={applyPresetToAll}
              disabled={imageCount < 2}
            >
              Apply preset to all ({imageCount})
            </Button>
            <p className="mt-2 text-[11px] leading-relaxed text-text-faint">
              Presets apply per image. Use “Apply to all” to copy this look and
              intensity across the batch.
            </p>
          </>
        ) : (
          <p className="rounded-md border border-border-2 bg-surface-2/60 p-3 text-[11px] leading-relaxed text-text-muted">
            Add images to apply Lightroom-style color presets.
          </p>
        )}
      </section>

      {!hasLogo && (
        <p className="rounded-md border border-border-2 bg-surface-2/60 p-3 text-[11px] leading-relaxed text-text-muted md:mt-auto">
          Add a logo above to start stamping. Settings apply live to every image
          in the batch.
        </p>
      )}
    </div>
  );
}

function ModeToggle({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={[
        'flex-1 cursor-pointer rounded-md border py-1.5 text-xs font-medium transition-colors',
        active
          ? 'border-accent bg-accent-bg text-accent'
          : 'border-border-2 bg-surface-2 text-text-muted hover:text-text',
      ].join(' ')}
    >
      {label}
    </button>
  );
}
