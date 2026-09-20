const ITEMS = [
  "Words and storytelling",
  "Visual and brand design",
  "Audio, video and motion",
  "Code and engineering",
  "Security and systems",
  "Research, data and strategy",
  "Supervisor routed",
  "No bidding",
];

export function SectionTicker() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y-2 border-ink bg-ink py-3" aria-hidden="true">
      <div className="ticker-track flex w-max items-center">
        {row.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="px-5 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-bone">
              {item}
            </span>
            <span className="font-mono text-xs text-primary">+</span>
          </span>
        ))}
      </div>
    </div>
  );
}
