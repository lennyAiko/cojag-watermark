import { X } from 'lucide-react';

export function ThumbnailStrip({ images, activeIndex, onSelect, onRemove }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {images.map((im, idx) => (
        <div
          key={im.id}
          onClick={() => onSelect(idx)}
          className={[
            'relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-[5px] outline outline-1 outline-border',
            idx === activeIndex
              ? 'border-2 border-accent'
              : 'border-2 border-transparent',
          ].join(' ')}
        >
          <img
            src={im.url}
            alt={im.name}
            className="block h-full w-full object-cover"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(im.id);
            }}
            className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-[3px] border-none bg-black/70 text-white hover:bg-black"
          >
            <X size={10} />
          </button>
        </div>
      ))}
    </div>
  );
}
