import { Badge } from '../ui/Label';

export function Header() {
  return (
    <header className="flex items-baseline gap-3 border-b border-border px-7 py-5">
      <Badge>COJAG</Badge>
      <h1 className="m-0 text-lg font-semibold tracking-[-0.01em]">
        WATERMARK TOOL
      </h1>
      <span className="text-[13px] text-text-muted">
        Stamp a logo across a batch of photos, check it, export a zip.
      </span>
    </header>
  );
}
