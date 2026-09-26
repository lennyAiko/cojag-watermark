import { Download, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Dropzone } from '../ui/Dropzone';
import { ThumbnailStrip } from './ThumbnailStrip';

export function BatchBar({
  images,
  activeIndex,
  counts,
  exportFormat,
  exportQuality,
  isZipping,
  zipProgress,
  onAddImages,
  onSelect,
  onRemove,
  onClear,
  onDownload,
  onExportFormatChange,
  onExportQualityChange,
}) {
  const empty = images.length === 0;

  return (
    <div className="border-t border-border px-4 py-4 md:px-6">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-32 sm:w-36">
            <Dropzone onFiles={onAddImages} multiple label="Add images" />
          </div>
          {!empty && (
            <span className="text-xs text-text-muted">
              {images.length} image{images.length !== 1 ? 's' : ''} ·{' '}
              {counts.landscape} landscape · {counts.portrait} portrait
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {!empty && (
            <div className="flex items-center gap-2">
              <label
                htmlFor="export-format"
                className="text-xs text-text-muted"
              >
                Export
              </label>
              <select
                id="export-format"
                value={exportFormat}
                onChange={(event) => onExportFormatChange(event.target.value)}
                disabled={isZipping}
                className="rounded-md border border-border-2 bg-surface-2 px-2 py-1.75 text-xs text-text outline-none focus:border-accent"
              >
                <option value="jpeg">JPEG · smaller</option>
                <option value="webp">WebP · smallest</option>
                <option value="png">PNG · lossless</option>
              </select>
              {exportFormat !== 'png' && (
                <label
                  htmlFor="export-quality"
                  className="flex items-center gap-1.5 text-xs text-text-muted"
                >
                  <input
                    id="export-quality"
                    type="range"
                    min="60"
                    max="100"
                    value={exportQuality}
                    onChange={(event) =>
                      onExportQualityChange(Number(event.target.value))
                    }
                    disabled={isZipping}
                    className="w-20 cursor-pointer"
                  />
                  <span className="w-8">{exportQuality}%</span>
                </label>
              )}
            </div>
          )}
          <div className="flex gap-2">
            {!empty && (
              <Button variant="secondary" onClick={onClear}>
                Clear all
              </Button>
            )}
            <Button
              variant="primary"
              disabled={empty || isZipping}
              onClick={onDownload}
              className="flex-1 sm:flex-none"
            >
              {isZipping ? (
                <>
                  <Loader2 size={13} className="animate-spin-slow" />
                  Zipping {zipProgress}%
                </>
              ) : (
                <>
                  <Download size={13} /> Download all ({images.length})
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {!empty && (
        <ThumbnailStrip
          images={images}
          activeIndex={activeIndex}
          onSelect={onSelect}
          onRemove={onRemove}
        />
      )}
    </div>
  );
}
