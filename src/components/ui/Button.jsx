const base =
  'inline-flex items-center justify-center gap-1.5 rounded-md text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50';

const variants = {
  primary:
    'border border-accent bg-accent px-3.5 py-[7px] font-semibold text-accent-ink hover:bg-accent/90',
  secondary:
    'border border-border-2 bg-surface-2 px-3 py-[7px] text-text hover:border-text-muted hover:bg-surface-3',
  ghost: 'text-text-muted hover:text-text px-2 py-1.5',
  icon: 'h-[26px] w-[26px] rounded-[5px] border border-border-2 bg-bg text-text-dim hover:border-text-muted hover:text-text',
};

export function Button({ variant = 'secondary', className = '', ...props }) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
