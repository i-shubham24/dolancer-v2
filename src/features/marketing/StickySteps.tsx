import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ensureGsap, gsap, ScrollTrigger, motionOK } from "@/lib/scrollMotion";

export type StepItem = {
  n: string;
  title: string;
  body: string;
};

export function StickySteps({
  kicker,
  title,
  lede,
  steps,
  images,
  dark = false,
}: {
  kicker: string;
  title: string;
  lede?: string;
  steps: StepItem[];
  images: string[];
  dark?: boolean;
}) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const current = Math.min(active, steps.length - 1);
  const step = steps[current] ?? steps[0]!;

  useLayoutEffect(() => {
    ensureGsap();
    if (!motionOK()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-steps-rule]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-steps-list]", start: "top 72%", end: "bottom 55%", scrub: true },
        }
      );
      gsap.utils.toArray<HTMLElement>("[data-step-row]").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 62%",
          end: "bottom 38%",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
      });
    }, scopeRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={scopeRef}>
      <div className="max-w-2xl">
        <p className={dark ? "font-mono text-[11px] uppercase tracking-[0.2em] text-[#7FE3A6]" : "font-mono text-[11px] uppercase tracking-[0.2em] text-ink-2"}>{kicker}</p>
        <h2 className={dark ? "mt-3 font-display text-4xl sm:text-5xl font-extrabold leading-[1.02] tracking-[-0.02em] text-[#F3EFE3]" : "mt-3 font-display text-4xl sm:text-5xl font-extrabold leading-[1.02] tracking-[-0.02em] text-ink"}>
          {title}
        </h2>
        {lede ? <p className={dark ? "mt-4 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base" : "mt-4 max-w-xl text-sm leading-relaxed text-ink-2 sm:text-base"}>{lede}</p> : null}
      </div>

      <div className="mt-8 flex items-center gap-4" aria-hidden="true">
        <span className={dark ? "font-mono text-[11px] uppercase tracking-[0.18em] text-white/40" : "font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3"}>Progress</span>
        <div className={dark ? "h-[3px] flex-1 bg-white/15" : "h-[3px] flex-1 bg-ink/15"}>
          <div data-steps-rule className="h-full w-full origin-left bg-primary" style={{ transform: "scaleX(0)" }} />
        </div>
        <span className={dark ? "font-mono text-[11px] uppercase tracking-[0.18em] text-white/40" : "font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3"}>
          {String(current + 1).padStart(2, "0")}/{String(steps.length).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className={dark ? "relative aspect-[4/5] overflow-hidden border border-white/15 bg-white/[0.03]" : "relative aspect-[4/5] overflow-hidden border-2 border-ink bg-field"}>
              <AnimatePresence initial={false}>
                <motion.img
                  key={current}
                  src={images[current] ?? images[0]}
                  alt=""
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-full w-full object-cover grayscale"
                />
              </AnimatePresence>
              {dark ? <div className="absolute inset-0 bg-[#060D0A]/30" /> : null}
              <span className={dark ? "absolute bottom-0 left-0 border-r border-t border-white/15 bg-black/65 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#7FE3A6]" : "absolute bottom-0 left-0 border-r-2 border-t-2 border-ink bg-bone px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink"}>
                Fig. {step.n} / {step.title}
              </span>
            </div>
          </div>
        </div>

        <ol data-steps-list className={dark ? "border-t border-white/15 lg:col-span-7" : "border-t-2 border-ink lg:col-span-7"}>
          {steps.map((s, idx) => {
            const isActive = current === idx;
            return (
              <motion.li
                key={s.n}
                data-step-row
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: Math.min(idx, 2) * 0.06 }}
                className={dark ? "grid grid-cols-1 gap-2 border-b border-white/15 py-6 sm:grid-cols-12 sm:gap-4" : "grid grid-cols-1 gap-2 border-b border-ink/25 py-6 sm:grid-cols-12 sm:gap-4"}
              >
                <span
                  aria-hidden="true"
                  className={
                    isActive
                      ? "font-display text-4xl font-extrabold leading-none text-primary sm:col-span-3"
                      : dark
                        ? "font-display text-4xl font-extrabold leading-none text-white/20 sm:col-span-3"
                        : "font-display text-4xl font-extrabold leading-none text-ink/20 sm:col-span-3"
                  }
                >
                  {s.n}
                </span>
                <div className="sm:col-span-9">
                  <h3 className={dark ? "font-display text-xl font-extrabold leading-tight text-[#F3EFE3] sm:text-2xl" : "font-display text-xl font-extrabold leading-tight text-ink sm:text-2xl"}>{s.title}</h3>
                  <p className={dark ? "mt-1.5 max-w-md text-sm leading-relaxed text-white/55" : "mt-1.5 max-w-md text-sm leading-relaxed text-ink-2"}>{s.body}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
