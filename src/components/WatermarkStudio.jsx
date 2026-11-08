import { useWatermarkStudio } from '../hooks/useWatermarkStudio';
import { DEFAULT_ADJUSTMENTS } from '../lib/adjustments';
import { Header } from './layout/Header';
import { WatermarkRail } from './controls/WatermarkRail';
import { EffectsRail } from './controls/EffectsRail';
import { PreviewStage } from './preview/PreviewStage';
import { BatchBar } from './preview/BatchBar';

export function WatermarkStudio() {
  const studio = useWatermarkStudio();

  return (
    <div className="flex min-h-screen flex-col overflow-y-auto bg-bg text-text md:h-screen md:overflow-hidden">
      <Header />

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <WatermarkRail
          settings={studio.settings}
          actions={studio.actions}
          logo={studio.logo}
          hasLogo={!!studio.logo}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <PreviewStage
            key={studio.active?.id ?? 'empty'}
            images={studio.images}
            activeIndex={studio.activeIndex}
            active={studio.active}
            logo={studio.logo}
            settings={studio.settings}
            maxPreviewSize={studio.maxPreviewSize}
            onAddImages={studio.actions.onAddImages}
            onCropChange={studio.actions.setActiveCrop}
            onPrev={studio.prev}
            onNext={studio.next}
          />
          <BatchBar
            images={studio.images}
            activeIndex={studio.activeIndex}
            counts={studio.counts}
            exportFormat={studio.exportFormat}
            exportQuality={studio.exportQuality}
            isZipping={studio.isZipping}
            zipProgress={studio.zipProgress}
            onAddImages={studio.actions.onAddImages}
            onSelect={studio.setActiveIndex}
            onRemove={studio.removeImage}
            onClear={studio.clearAll}
            onDownload={studio.downloadAll}
            onExportFormatChange={studio.setExportFormat}
            onExportQualityChange={studio.setExportQuality}
          />
        </div>

        <EffectsRail
          actions={studio.actions}
          hasImages={studio.images.length > 0}
          imageCount={studio.images.length}
          activePreset={studio.active?.presetId ?? 'none'}
          activeIntensity={studio.active?.intensity ?? 100}
          activeAdjustments={studio.active?.adjustments ?? DEFAULT_ADJUSTMENTS}
        />
      </div>
    </div>
  );
}
