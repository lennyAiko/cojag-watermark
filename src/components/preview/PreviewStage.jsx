import { useEffect, useRef } from 'react';
import { renderComposite } from '../../lib/watermark';
import { Dropzone } from '../ui/Dropzone';
import { NavButton } from './NavButton';

export function PreviewStage({
  images,
  activeIndex,
  active,
  logo,
  settings,
  maxPreviewSize,
  onAddImages,
  onPrev,
  onNext,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    renderComposite(canvas, active.img, logo?.img || null, {
      ...settings,
      presetId: active.presetId,
      intensity: active.intensity,
      adjustments: active.adjustments,
      maxPreviewSize,
    });
  }, [active, logo, settings, maxPreviewSize]);

  return (
    <div className="relative flex min-h-[50vh] min-w-0 flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_30%,#1b1e25_0%,#0f1115_70%)] p-4 md:min-h-0 md:p-6">
      {images.length === 0 ? (
        <div className="w-full max-w-md">
          <Dropzone
            onFiles={onAddImages}
            multiple
            large
            label="Drop images to batch-watermark"
            sub="Portrait and landscape both fine — mix freely"
          />
        </div>
      ) : (
        <>
          <canvas
            ref={canvasRef}
            className="max-h-full max-w-full object-contain rounded-md shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          />
          {images.length > 1 && (
            <>
              <NavButton dir="left" onClick={onPrev} />
              <NavButton dir="right" onClick={onNext} />
            </>
          )}
          {active && (
            <div className="absolute left-4 top-4 rounded border border-border-2 bg-surface-2/80 px-2 py-1 font-mono text-[11px] text-text-dim backdrop-blur-sm">
              {active.orientation} · {active.img.naturalWidth}×
              {active.img.naturalHeight}
            </div>
          )}
          <div className="absolute right-4 top-4 rounded border border-border-2 bg-surface-2/80 px-2 py-1 font-mono text-[11px] text-text-dim backdrop-blur-sm">
            {activeIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}
