import { useEffect, useRef, useState } from 'react';
import { Check, Crop, RotateCcw, X } from 'lucide-react';
import { renderComposite } from '../../lib/watermark';
import { Button } from '../ui/Button';
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
  onCropChange,
  onPrev,
  onNext,
}) {
  const canvasRef = useRef(null);
  const cropOverlayRef = useRef(null);
  const [cropEditor, setCropEditor] = useState({
    imageId: null,
    cropMode: false,
    selection: null,
    dragStart: null,
  });
  const cropMode = cropEditor.imageId === active?.id && cropEditor.cropMode;
  const selection =
    cropEditor.imageId === active?.id ? cropEditor.selection : null;
  const dragStart =
    cropEditor.imageId === active?.id ? cropEditor.dragStart : null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    renderComposite(canvas, active.img, logo?.img || null, {
      ...settings,
      presetId: active.presetId,
      intensity: active.intensity,
      adjustments: active.adjustments,
      crop: active.crop,
      maxPreviewSize,
    });
  }, [active, logo, settings, maxPreviewSize]);

  function getPoint(event) {
    const bounds = cropOverlayRef.current.getBoundingClientRect();
    return {
      x: Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width)),
      y: Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height)),
    };
  }

  function startSelection(event) {
    if (!cropMode || !active) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = getPoint(event);
    setCropEditor({
      imageId: active.id,
      cropMode: true,
      selection: { x: point.x, y: point.y, width: 0, height: 0 },
      dragStart: point,
    });
  }

  function updateSelection(event) {
    if (!dragStart) return;
    const point = getPoint(event);
    setCropEditor((current) => ({
      ...current,
      selection: {
        x: Math.min(dragStart.x, point.x),
        y: Math.min(dragStart.y, point.y),
        width: Math.abs(point.x - dragStart.x),
        height: Math.abs(point.y - dragStart.y),
      },
    }));
  }

  function finishSelection(event) {
    if (!dragStart) return;
    updateSelection(event);
    setCropEditor((current) => ({ ...current, dragStart: null }));
  }

  function beginCrop() {
    if (!active) return;
    setCropEditor({
      imageId: active.id,
      cropMode: true,
      selection: active.crop ?? null,
      dragStart: null,
    });
  }

  function applyCrop() {
    if (!selection || selection.width <= 0 || selection.height <= 0) return;
    onCropChange(selection);
    setCropEditor((current) => ({ ...current, cropMode: false }));
  }

  function resetCrop() {
    onCropChange(null);
    setCropEditor((current) => ({
      ...current,
      selection: null,
      cropMode: false,
    }));
  }

  return (
    <div className="relative flex min-h-[50vh] min-w-0 flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_30%,#1b1e25_0%,#0f1115_70%)] p-4 md:min-h-0 md:p-6">
      {images.length === 0 || !active ? (
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
          <div className="relative inline-block max-h-full max-w-full overflow-hidden rounded-md leading-[0] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <canvas
              ref={canvasRef}
              className="max-h-full max-w-full object-contain"
            />
            {cropMode && (
              <div
                ref={cropOverlayRef}
                role="group"
                aria-label="Drag to select the area to crop"
                className="absolute inset-0 cursor-crosshair touch-none"
                onPointerDown={startSelection}
                onPointerMove={updateSelection}
                onPointerUp={finishSelection}
                onPointerCancel={finishSelection}
              >
                {selection && (
                  <div
                    className="pointer-events-none absolute border border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.55)]"
                    style={{
                      left: `${selection.x * 100}%`,
                      top: `${selection.y * 100}%`,
                      width: `${selection.width * 100}%`,
                      height: `${selection.height * 100}%`,
                    }}
                  />
                )}
              </div>
            )}
          </div>
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
          <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-lg border border-border-2 bg-surface-2/95 p-2 shadow-lg">
            {cropMode ? (
              <>
                <span className="px-1 text-xs text-text-dim">
                  Drag over the image to select a crop
                </span>
                <Button
                  variant="secondary"
                  className="pointer-events-auto"
                  onClick={() =>
                    setCropEditor((current) => ({
                      ...current,
                      cropMode: false,
                    }))
                  }
                  aria-label="Cancel crop"
                >
                  <X size={13} /> Cancel
                </Button>
                <Button
                  variant="primary"
                  className="pointer-events-auto"
                  onClick={applyCrop}
                  disabled={
                    !selection || selection.width <= 0 || selection.height <= 0
                  }
                >
                  <Check size={13} /> Apply crop
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  className="pointer-events-auto"
                  onClick={beginCrop}
                >
                  <Crop size={13} /> {active.crop ? 'Adjust crop' : 'Crop'}
                </Button>
                {active.crop && (
                  <Button
                    variant="ghost"
                    className="pointer-events-auto"
                    onClick={resetCrop}
                    aria-label="Reset crop"
                    title="Reset crop"
                  >
                    <RotateCcw size={13} /> Reset
                  </Button>
                )}
              </>
            )}
          </div>
          <div className="absolute right-4 top-4 rounded border border-border-2 bg-surface-2/80 px-2 py-1 font-mono text-[11px] text-text-dim backdrop-blur-sm">
            {activeIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}
