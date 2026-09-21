/**
 * Boxy geometric motifs. Right angles only, no curves: each position on the
 * site gets its own mark so no graphic repeats.
 */

function Wrap({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      {children}
    </div>
  );
}

/** Corner registration ticks. */
export function CornerTicks({ className = "", tone = "text-current" }: { className?: string; tone?: string }) {
  return (
    <Wrap className={className}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className={`block h-auto w-full ${tone}`}>
        <path d="M4 30 V4 H30 M90 4 H116 V30 M116 90 V116 H90 M30 116 H4 V90" stroke="currentColor" strokeWidth="5" />
      </svg>
    </Wrap>
  );
}

/** Ascending columns for numbers and paths. */
export function BarColumns({ className = "", tone = "text-current" }: { className?: string; tone?: string }) {
  return (
    <Wrap className={className}>
      <svg width="150" height="90" viewBox="0 0 150 90" fill="none" className={`block h-auto w-full ${tone}`}>
        <rect x="6" y="58" width="18" height="26" fill="currentColor" />
        <rect x="34" y="44" width="18" height="40" fill="currentColor" />
        <rect x="62" y="30" width="18" height="54" fill="currentColor" />
        <rect x="90" y="44" width="18" height="40" fill="currentColor" />
        <rect x="118" y="16" width="18" height="68" fill="currentColor" />
      </svg>
    </Wrap>
  );
}

/** Specimen grid, two cells filled. */
export function SquareGrid({ className = "", tone = "text-current" }: { className?: string; tone?: string }) {
  const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const filled = new Set([1, 5]);
  return (
    <Wrap className={className}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className={`block h-auto w-full ${tone}`}>
        {cells.map((c) => {
          const x = (c % 3) * 40 + 4;
          const y = Math.floor(c / 3) * 40 + 4;
          return filled.has(c) ? (
            <rect key={c} x={x} y={y} width="32" height="32" fill="currentColor" />
          ) : (
            <rect key={c} x={x} y={y} width="32" height="32" stroke="currentColor" strokeWidth="3" />
          );
        })}
      </svg>
    </Wrap>
  );
}

/** Concentric squared target with solid core. */
export function SquareTarget({ className = "", tone = "text-current" }: { className?: string; tone?: string }) {
  return (
    <Wrap className={className}>
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none" className={`block h-auto w-full ${tone}`}>
        <rect x="8" y="8" width="144" height="144" stroke="currentColor" strokeWidth="4" />
        <rect x="44" y="44" width="72" height="72" stroke="currentColor" strokeWidth="4" />
        <rect x="72" y="72" width="16" height="16" fill="currentColor" />
      </svg>
    </Wrap>
  );
}
