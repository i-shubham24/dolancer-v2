/**
 * Boxy step-line motif. Right angles only, no curves: a staircase line with
 * registration crosses. Our answer to the decorative squiggle, drawn to fit
 * the ledger grid.
 */
export function StepsMotif({
  className = "",
  tone = "text-current",
}: {
  className?: string;
  tone?: string;
}) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <svg
        width="220"
        height="132"
        viewBox="0 0 220 132"
        fill="none"
        className={`block h-auto w-full ${tone}`}
      >
        <path
          d="M6 126 H64 V92 H118 V58 H172 V24 H214"
          stroke="currentColor"
          strokeWidth="7"
        />
        <path d="M30 34 h14 M37 27 v14" stroke="currentColor" strokeWidth="3" />
        <path d="M186 96 h12 M192 90 v12" stroke="currentColor" strokeWidth="3" />
      </svg>
    </div>
  );
}
