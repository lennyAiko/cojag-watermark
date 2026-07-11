import { ChevronLeft, ChevronRight } from 'lucide-react';

export function NavButton({ dir, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        'absolute top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border-2 bg-surface-2/90 text-text backdrop-blur-sm transition-colors hover:border-accent',
        dir === 'left' ? 'left-4' : 'right-4',
      ].join(' ')}
    >
      {dir === 'left' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
    </button>
  );
}
