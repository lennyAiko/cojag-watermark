import { useRef, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

export function Dropzone({
  onFiles,
  label,
  sub,
  large,
  accept = 'image/*',
  multiple,
}) {
  const inputRef = useRef(null);
  const [over, setOver] = useState(false);

  const emit = (files) => {
    if (files && files.length) onFiles?.(files);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        emit(e.dataTransfer?.files);
      }}
      className={[
        'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-surface-2/40 text-center transition-colors',
        large ? 'gap-3 p-10' : 'p-4',
        over
          ? 'border-accent bg-accent-bg/30 text-text'
          : 'border-border-2 text-text-muted hover:border-accent hover:text-text',
      ].join(' ')}
    >
      {large ? <ImageIcon size={28} /> : <Upload size={16} />}
      <div className={large ? 'text-sm' : 'text-xs'}>{label}</div>
      {sub && <div className="text-xs text-text-faint">{sub}</div>}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        hidden
        onChange={(e) => {
          emit(e.target.files);
          e.target.value = '';
        }}
      />
    </div>
  );
}
