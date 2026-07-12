import { Label, ValuePill } from '../ui/Label';
import { Slider } from '../ui/Slider';
import { Button } from '../ui/Button';
import { PresetPicker } from './PresetPicker';
import { AdjustmentSliders } from './AdjustmentSliders';
import { isNeutral } from '../../lib/adjustments';

export function EffectsRail({
  actions,
  activePreset,
  activeIntensity,
  activeAdjustments,
  hasImages,
  imageCount,
}) {
  const {
    setActivePreset,
    setActiveIntensity,
    setActiveAdjustment,
    resetAdjustments,
    applyPresetToAll,
  } = actions;

  return (
    <div className="flex w-full shrink-0 flex-col gap-6 border-t border-border p-6 md:w-[280px] md:overflow-y-auto md:border-l md:border-t-0 lg:w-[300px]">
      <SectionTitle>Effects</SectionTitle>

      {hasImages ? (
        <>
          <section>
            <Label>Preset</Label>
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
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <Label>Adjustments</Label>
              <button
                onClick={resetAdjustments}
                disabled={isNeutral(activeAdjustments)}
                className="cursor-pointer text-[11px] text-text-muted hover:text-accent disabled:cursor-default disabled:opacity-40"
              >
                Reset
              </button>
            </div>
            <AdjustmentSliders
              adjustments={activeAdjustments}
              onChange={setActiveAdjustment}
            />
          </section>

          <section>
            <Button
              variant="secondary"
              className="w-full"
              onClick={applyPresetToAll}
              disabled={imageCount < 2}
            >
              Apply look to all ({imageCount})
            </Button>
            <p className="mt-2 text-[11px] leading-relaxed text-text-faint">
              Preset, intensity, and adjustments apply per image. “Apply look to
              all” copies the active image’s full look across the batch.
            </p>
          </section>
        </>
      ) : (
        <p className="rounded-md border border-border-2 bg-surface-2/60 p-3 text-[11px] leading-relaxed text-text-muted">
          Add images to apply presets and manual adjustments.
        </p>
      )}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
      {children}
    </h2>
  );
}
