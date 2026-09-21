import { useLayoutEffect, useRef } from "react";
import { motionOK } from "@/lib/scrollMotion";

const STRIP = [
  { src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=640&q=70", tag: "Words / Proofread", title: "Proofread 8-page guide" },
  { src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=640&q=70", tag: "Code / UI fix", title: "Fix checkout overlap" },
  { src: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=640&q=70", tag: "Audio / Captions", title: "Cut 90s captioned clip" },
  { src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=640&q=70", tag: "Audio / Cleanup", title: "Clean 25-min segment" },
  { src: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=640&q=70", tag: "Research / Analysis", title: "Reconcile 500-row dataset" },
];

export function BriefStrip() {
  const stripRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const strip = stripRef.current;
    if (!strip || !motionOK()) return;
    let down = false;
    let startX = 0;
    let startScroll = 0;
    const onDown = (e: PointerEvent) => {
      down = true;
      startX = e.clientX;
      startScroll = strip.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      strip.scrollLeft = startScroll - (e.clientX - startX) * 1.5;
    };
    const onUp = () => {
      down = false;
    };
    strip.addEventListener("pointerdown", onDown);
    strip.addEventListener("pointermove", onMove);
    strip.addEventListener("pointerup", onUp);
    strip.addEventListener("pointercancel", onUp);
    return () => {
      strip.removeEventListener("pointerdown", onDown);
      strip.removeEventListener("pointermove", onMove);
      strip.removeEventListener("pointerup", onUp);
      strip.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <section className="border-t border-white/15 bg-[#0A1912] py-14 md:py-20">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
          Example formats · 05 tasks
        </p>
        <span className="border border-white/25 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white">
          Drag
        </span>
      </div>
      <div
        ref={stripRef}
        data-rail="briefs"
        className="mt-6 flex cursor-grab gap-5 overflow-x-auto pb-2 pl-[max(1rem,calc((100vw-1400px)/2+2rem))] pr-4 [scrollbar-width:none] [touch-action:pan-y] md:pr-8 active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        {STRIP.map((b) => (
          <article key={b.title} className="w-[80vw] shrink-0 border border-white/15 bg-white/[0.04] sm:w-[420px]">
            <div className="relative h-[220px] overflow-hidden md:h-[260px]">
              <img src={b.src} alt="" loading="lazy" draggable={false} className="h-full w-full object-cover grayscale" />
              <span className="absolute left-3 top-3 border border-black/40 bg-black/65 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#7FE3A6]">
                {b.tag}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <h2 className="font-display text-lg font-extrabold leading-tight text-[#F3EFE3]">{b.title}</h2>
              <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">Ex. format</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
