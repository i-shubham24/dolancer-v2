import { useLayoutEffect, useRef, useState } from "react";
import { ensureGsap, gsap, motionOK } from "@/lib/scrollMotion";

export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useLayoutEffect(() => {
    const force = new URLSearchParams(window.location.search).get("boot") === "1";
    if (!motionOK() || (!force && sessionStorage.getItem("dl-boot-v3"))) {
      setGone(true);
      return;
    }
    ensureGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("dl-boot-v3", "1");
          setGone(true);
        },
      });
      tl.fromTo(
        "[data-boot-hold]",
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
        0
      )
        .to("[data-boot-hold]", { duration: 0.55 })
        .to(
          "[data-boot-inner]",
          { yPercent: -6, duration: 0.8, ease: "power3.in" },
          0.85
        )
        .to(
          ref.current,
          { yPercent: -100, duration: 0.8, ease: "power4.inOut" },
          0.9
        );
    }, ref);
    return () => ctx.revert();
  }, []);

  if (gone) return null;

  return (
    <div ref={ref} className="fixed inset-0 z-[90] bg-[#060D0A]" aria-hidden="true">
      <div
        data-boot-hold
        className="flex h-full flex-col items-center justify-center gap-[22px] px-5"
        style={{ opacity: 0 }}
      >
        <p className="font-display font-extrabold leading-[0.9] tracking-[-0.02em] text-[#F3EFE3] text-[clamp(3.6rem,14vw,10rem)]">
          DOLANCER
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#7FE3A6]">
          Routed work · No bidding
        </p>
      </div>
      <div data-boot-inner className="absolute inset-0" />
    </div>
  );
}
