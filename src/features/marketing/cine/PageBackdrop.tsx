import { useLayoutEffect, useRef } from "react";
import { ensureGsap, gsap, motionOK } from "@/lib/scrollMotion";

const NOISE_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")";

export function PageBackdrop({
  word,
  dark = true,
  big = false,
  compact = false,
  drift = true,
}: {
  word: string;
  dark?: boolean;
  big?: boolean;
  compact?: boolean;
  drift?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    ensureGsap();
    if (!motionOK() || !drift) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-ghost]",
        { xPercent: 4 },
        {
          xPercent: -9,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [drift]);

  const stroke = dark ? "rgba(243,239,227,0.14)" : "rgba(10,25,18,0.1)";
  const line = dark ? "bg-white/10" : "bg-ink/10";
  const mark = dark ? "text-white/30" : "text-ink/30";

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className={`absolute inset-y-0 left-4 md:left-8 w-px ${line}`} />
      <div className={`absolute inset-y-0 right-4 md:right-8 w-px ${line}`} />
      <span className={`absolute left-4 md:left-8 top-4 font-mono text-sm ${mark}`}>+</span>
      <span className={`absolute right-4 md:right-8 top-4 font-mono text-sm ${mark}`}>+</span>
      <div
        className="absolute inset-x-0 top-0 overflow-hidden"
        style={{ height: "clamp(170px,30vw,400px)" }}
      >
        <div className="mx-auto h-full max-w-[1400px] px-4 md:px-8">
          <span
            data-ghost
            className="block whitespace-nowrap font-display font-extrabold leading-[0.85] tracking-[-0.02em]"
            style={{
              fontSize: compact
                ? "clamp(6rem,15vw,14rem)"
                : big
                  ? "clamp(11rem,30vw,28rem)"
                  : "clamp(8rem,22vw,20rem)",
              color: "transparent",
              WebkitTextStroke: `1.5px ${stroke}`,
            }}
          >
            {word}
          </span>
        </div>
      </div>
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: NOISE_URL }} />
    </div>
  );
}
