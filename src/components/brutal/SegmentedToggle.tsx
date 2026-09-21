import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Two or three mutually exclusive views, as one bordered pill with the active
 * segment lifted onto a smooth spring-animated chip.
 */
export function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: readonly { id: T; label: string; count?: number }[];
  value: T;
  onChange: (next: T) => void;
  label: string;
  className?: string;
}) {
  const layoutId = React.useId();

  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        "inline-flex max-w-full items-center gap-1 overflow-x-auto border-2 border-ink bg-field p-1",
        className,
      )}
    >
      {options.map((option) => {
        const selected = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.id)}
            className={cn(
              "relative inline-flex min-h-[42px] shrink-0 items-center gap-1.5 px-4 py-2 text-xs font-extrabold tracking-[-0.01em]",
              selected ? "text-bone" : "text-ink-2",
            )}
          >
            {selected && (
              <motion.span
                layoutId={`segmented-active-${layoutId}`}
                className="absolute inset-0 bg-ink"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10">{option.label}</span>
            {typeof option.count === "number" ? (
              <span
                className={cn(
                  "relative z-10 px-1.5 py-0.5 text-[10px] font-extrabold",
                  selected ? "bg-primary text-white" : "bg-ink/10 text-ink-2",
                )}
              >
                {option.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
