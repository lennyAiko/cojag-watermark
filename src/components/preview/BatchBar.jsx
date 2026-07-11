import { Download, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Dropzone } from '../ui/Dropzone';
import { ThumbnailStrip } from './ThumbnailStrip';

export function BatchBar({
  images,
  activeIndex,
  counts,
  isZipping,
  zipProgress,
  onAddImages,
  onSelect,
  onRemove,
  onClear,
  onDownload,
}) {
  const empty = images.length === 0;

  return (
    <div className="border-t border-border px-6 py-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-36">
            <Dropzone onFiles={onAddImages} multiple label="Add images" />
          </div>
          {!empty && (
            <span className="text-xs text-text-muted">
              {images.length} image{images.length !== 1 ? 's' : ''} ·{' '}
              {counts.landscape} landscape · {counts.portrait} portrait
            </span>
          )}
        </div>
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
