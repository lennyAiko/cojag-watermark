import { Badge } from '../ui/Label';

export function Header() {
  return (
    <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-border px-4 py-3 md:px-7 md:py-3">
      <Badge>COJAG</Badge>
      <h1 className="m-0 text-base font-semibold tracking-[-0.01em] md:text-lg">
        COJAG WATERMARK TOOL
      </h1>
      <span className="hidden text-[13px] text-text-muted sm:inline">
        Stamp a logo across a batch of photos, check it, export a zip.
      </span>
    </header>
  );
}
