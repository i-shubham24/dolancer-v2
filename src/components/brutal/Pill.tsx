import * as React from "react";
import { cn } from "@/lib/cn";

/** Category tag: a quiet metadata label, squared to the ledger. */
export function CategoryPill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-ink/30 bg-subtle px-2.5 py-1",
        "text-2xs font-bold uppercase tracking-[0.04em]",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Progress tag: the active work accent. */
export function ProgressPill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-transparent bg-accent-light px-2.5 py-[3px]",
        "text-[11.5px] font-bold text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Quiet metadata chip. */
export function MicroChip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-ink/25 bg-subtle px-2.5 py-[3px]",
        "text-[11.5px] font-semibold text-ink-2",
        className,
      )}
    >
      {children}
    </span>
  );
}
