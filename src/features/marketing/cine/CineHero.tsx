import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ensureGsap, gsap, motionOK } from "@/lib/scrollMotion";
import { PageBackdrop } from "./PageBackdrop";

const STRIP = [
  { src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=640&q=70", tag: "Words / Proofread", title: "Proofread 8-page guide" },
  { src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=640&q=70", tag: "Code / UI fix", title: "Fix checkout overlap" },
  { src: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=640&q=70", tag: "Audio / Captions", title: "Cut 90s captioned clip" },
  { src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=640&q=70", tag: "Audio / Cleanup", title: "Clean 25-min segment" },
  { src: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=640&q=70", tag: "Research / Analysis", title: "Reconcile 500-row dataset" },
];

export function CineHero() {
  const ref = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    ensureGsap();
    if (!motionOK()) return;
    const ctx = gsap.context(() => {
      const seen = sessionStorage.getItem("dl-boot");
      const base = seen ? 0.15 : 1.9;
      gsap.from("[data-ch-line] span", { yPercent: 115, duration: 1, stagger: 0.12, ease: "power3.out", delay: base });
      gsap.from("[data-ch-fade]", { y: 26, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: base + 0.35 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top top", end: "+=130%", pin: true, scrub: 0.6, anticipatePin: 1 },
      });
      tl.fromTo("[data-ghost]", { xPercent: 10 }, { xPercent: -24, ease: "none", duration: 2 }, 0).to(
        "[data-ch-head]",
        { yPercent: -6, opacity: 0.25, ease: "none", duration: 2 },
        0.4
      );
    }, ref);
    return () => ctx.revert();
  }, []);

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
    <section ref={ref} className="relative overflow-clip bg-[#0A1912] pt-6 md:pt-8">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="flex items-center justify-between border-y border-white/15 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
          <span>Field brief Nº 001</span>
          <span>Supervisor routed</span>
        </div>

        <div className="relative">
          <PageBackdrop word="DOLANCER" compact drift={false} />
          <div data-ch-head className="relative py-8 md:py-10">
          <p data-ch-fade className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7FE3A6]">
            Open to anyone who meets the requirements
          </p>
          <h1 className="mt-12 md:mt-16 font-display text-[clamp(3.2rem,10vw,8.5rem)] font-extrabold leading-[0.94] tracking-[-0.02em] text-[#F3EFE3]">
            <span data-ch-line className="block overflow-hidden pb-[0.06em]">
              <span className="block">Find work that</span>
            </span>
            <span data-ch-line className="block overflow-hidden pb-[0.08em]">
              <span className="block">
                fits your <span className="text-[#10A969]">skills.</span>
              </span>
            </span>
          </h1>
          <div className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p data-ch-fade className="max-w-[42ch] text-base leading-relaxed text-white/65">
              Supervisor-routed tasks with scope, effort, and payout terms visible upfront.
            </p>
            <div data-ch-fade className="relative -top-1 flex flex-wrap items-center gap-x-7 gap-y-3 lg:-left-2 lg:-top-2">
              <Link
                to="/sign-up"
                className="inline-block bg-[#10A969] px-7 py-3.5 text-sm font-extrabold text-white active:scale-[0.98]"
              >
                Explore opportunities
              </Link>
              <a
                href="#quiz"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm font-extrabold text-[#F3EFE3] underline decoration-[#10A969] decoration-2 underline-offset-8"
              >
                Check your fit
              </a>
            </div>
          </div>
          <p data-ch-fade className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
            No bidding · No public client identity · Clear task standards
          </p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/15 pb-12 pt-6">
        <span className="pointer-events-none absolute left-1/2 top-1 z-10 -translate-x-1/2 border border-white/25 bg-black/60 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white">
          Drag
        </span>
        <div
          ref={stripRef}
          className="flex cursor-grab gap-5 overflow-x-auto pb-2 pl-[max(1rem,calc((100vw-1400px)/2+2rem))] pr-4 [scrollbar-width:none] md:pr-8 active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
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
      </div>
    </section>
  );
}
