import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ensureGsap, gsap, motionOK } from "@/lib/scrollMotion";
import { PageBackdrop } from "./PageBackdrop";
import { CornerTicks } from "./Motifs";

export function CineHero() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    ensureGsap();
    if (!motionOK()) return;
    const ctx = gsap.context(() => {
      const seen = sessionStorage.getItem("dl-boot-v3");
      const base = seen ? 0.15 : 1.3;
      gsap.from("[data-ch-line] span", { yPercent: 115, duration: 1, stagger: 0.12, ease: "power3.out", delay: base });
      gsap.from("[data-ch-fade]", { y: 26, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: base + 0.35 });
      if (window.innerWidth < 1024) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top top", end: "+=40%", pin: true, scrub: 0.6, anticipatePin: 1 },
      });
      tl.fromTo("[data-ghost]", { xPercent: 10 }, { xPercent: -24, ease: "none", duration: 2 }, 0).to(
        "[data-ch-head]",
        { yPercent: -4, opacity: 0.35, ease: "none", duration: 2 },
        1.0
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-clip bg-[#0A1912] pb-10 pt-6 md:pb-12 md:pt-8">
      <CornerTicks tone="text-white/20" className="right-4 top-24 hidden w-28 md:right-8 lg:block" />
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="flex items-center justify-between border-y border-white/15 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
          <span>Field brief Nº 001</span>
          <span>Supervisor routed</span>
        </div>

        <div className="relative">
          <PageBackdrop word="DOLANCER" compact drift={false} />
          <div data-ch-head className="relative py-6 md:py-8">
            <p data-ch-fade className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7FE3A6]">
              Anyone can join
            </p>
          <h1 className="mt-6 md:mt-8 font-display text-[clamp(2.75rem,10vw,8.5rem)] font-extrabold leading-[0.94] tracking-[-0.02em] text-[#F3EFE3]">
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
                A supervisor sends the tasks. Scope, effort, and pay shown upfront.
              </p>
            <div data-ch-fade className="relative -top-2 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 lg:-left-2 lg:-top-3">
              <Link
                to="/sign-up"
                className="inline-block bg-[#10A969] px-7 py-3.5 text-center text-sm font-extrabold text-white active:scale-[0.98]"
              >
                Explore opportunities
              </Link>
              <a
                href="#quiz"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="py-1 text-center text-sm font-extrabold text-[#F3EFE3] underline decoration-[#10A969] decoration-2 underline-offset-8 sm:text-left"
              >
                Check your fit
              </a>
            </div>
          </div>
          <p data-ch-fade className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
            No bidding · No client names · Clear rules
          </p>
          </div>
        </div>
      </div>
    </section>
  );
}
