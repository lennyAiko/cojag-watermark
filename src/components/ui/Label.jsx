export function Label({ children }) {
  return (
    <div className="mb-2.5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-text-muted">
      {children}
    </div>
  );
}

export function ValuePill({ children }) {
  return (
    <span className="rounded-[3px] border border-accent-border bg-accent-bg px-1.5 py-px font-mono text-[11px] normal-case tracking-normal text-accent">
      {children}
    </span>
  );
}

export function Badge({ children }) {
  return (
    <span className="rounded-[3px] border border-accent-border bg-accent-bg px-2 py-[3px] font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
      {children}
    </span>
  );
}
