import { X } from 'lucide-react';
import { Label } from '../ui/Label';
import { Button } from '../ui/Button';
import { Dropzone } from '../ui/Dropzone';

export function LogoPanel({ logo, onUpload, onClear }) {
  return (
    <section>
      <Label>01 · Logo</Label>
      {logo ? (
        <div className="flex items-center gap-2.5 rounded-lg border border-border-2 bg-surface-2 p-2.5">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded bg-[repeating-conic-gradient(#2a2e37_0%_25%,#22252c_0%_50%)] bg-[length:10px_10px]">
            <img src={logo.url} alt="logo" className="max-h-full max-w-full" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs text-text-dim">
              {logo.img.naturalWidth} × {logo.img.naturalHeight}
            </div>
            <div className="truncate text-[11px] text-text-faint">
              {logo.name}
            </div>
          </div>
          <Button variant="icon" onClick={onClear} title="Remove logo">
            <X size={14} />
          </Button>
        </div>
      ) : (
        <Dropzone
          onFiles={(files) => onUpload(files[0])}
          label="Drop logo (PNG works best)"
        />
      )}
    </section>
  );
}
