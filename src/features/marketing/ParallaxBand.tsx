import { useLayoutEffect, useRef } from "react";
import { ensureGsap, gsap, motionOK } from "@/lib/scrollMotion";

export type BandImage = {
  src: string;
  label: string;
  speed?: number;
};

export function ParallaxBand({ images, caption, dark = false }: { images: BandImage[]; caption: string; dark?: boolean }) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    ensureGsap();
    if (!motionOK()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-plx]").forEach((el) => {
        const speed = parseFloat(el.dataset.plx || "8");
        gsap.fromTo(
          el,
          { yPercent: -speed },
          {
            yPercent: speed,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className={dark ? "overflow-clip border-y border-white/15 bg-[#060D0A]" : "overflow-clip border-y-2 border-ink bg-bone"} aria-label={caption}>
      <div className={dark ? "grid grid-cols-1 sm:grid-cols-3 sm:divide-x sm:divide-white/15" : "grid grid-cols-1 sm:grid-cols-3 sm:divide-x-2 sm:divide-ink"}>
        {images.map((img, i) => (
          <figure key={img.label} className={i === 1 ? "sm:mt-12" : ""}>
            <div className={dark ? "overflow-hidden border-y border-white/15 sm:border-y-0" : "overflow-hidden border-y-2 border-ink sm:border-y-0"}>
              <img
                src={img.src}
                alt=""
                loading="lazy"
                data-plx={img.speed ?? (i === 1 ? 6 : 10)}
                className="h-[260px] w-full scale-[1.22] object-cover grayscale md:h-[360px]"
              />
            </div>
            <figcaption className={dark ? "flex items-center justify-between border-b border-white/15 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50 sm:border-b-0" : "flex items-center justify-between border-b-2 border-ink px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2 sm:border-b-0"}>
              <span>Fig. 0{i + 1}</span>
              <span>{img.label}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className={dark ? "border-t border-white/15 px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 md:px-8" : "border-t-2 border-ink px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3 md:px-8"}>
        {caption}
      </p>
    </section>
  );
}
