import { useWatermarkStudio } from '../hooks/useWatermarkStudio';
import { Header } from './layout/Header';
import { ControlRail } from './controls/ControlRail';
import { PreviewStage } from './preview/PreviewStage';
import { BatchBar } from './preview/BatchBar';

export function WatermarkStudio() {
  const studio = useWatermarkStudio();

  return (
    <div className="flex min-h-screen flex-col overflow-y-auto bg-bg text-text md:h-screen md:overflow-hidden">
      <Header />

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <ControlRail
          settings={studio.settings}
          actions={studio.actions}
          logo={studio.logo}
          hasLogo={!!studio.logo}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <PreviewStage
            images={studio.images}
            activeIndex={studio.activeIndex}
            active={studio.active}
            logo={studio.logo}
            settings={studio.settings}
            onAddImages={studio.actions.onAddImages}
            onPrev={studio.prev}
            onNext={studio.next}
          />
          <BatchBar
            images={studio.images}
            activeIndex={studio.activeIndex}
            counts={studio.counts}
            isZipping={studio.isZipping}
            zipProgress={studio.zipProgress}
            onAddImages={studio.actions.onAddImages}
            onSelect={studio.setActiveIndex}
            onRemove={studio.removeImage}
            onClear={studio.clearAll}
            onDownload={studio.downloadAll}
          />
        </div>
      </div>
    </div>
  );
}
