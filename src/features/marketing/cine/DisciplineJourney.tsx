import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ensureGsap, gsap, ScrollTrigger, motionOK } from "@/lib/scrollMotion";

const DISCIPLINES = [
  { n: "01", name: "Words and storytelling", scope: "Turn writing skill into paid work.", example: "Articles, copy, scripts and research.", img: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=75" },
  { n: "02", name: "Visual and brand design", scope: "Make brands look sharp.", example: "Logos, identities, layouts and interfaces.", img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1200&q=75" },
  { n: "03", name: "Audio, video and motion", scope: "Bring stories to life.", example: "Editing, animation, voiceover and sound.", img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=75" },
  { n: "04", name: "Code and engineering", scope: "Build and ship.", example: "Websites, apps, automations and integrations.", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=75" },
  { n: "05", name: "Security and systems", scope: "Keep things safe.", example: "Audits, testing, hardening and compliance.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=75" },
  { n: "06", name: "Research, data and strategy", scope: "Make sense of it all.", example: "Analysis, reports, research and planning.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=75" },
];

export function DisciplineJourney() {
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    ensureGsap();
    if (!motionOK() || window.innerWidth < 1024) return;
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    const ctx = gsap.context(() => {
      const distance = track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrap);
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }
    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={wrapRef} id="disciplines" className="relative overflow-clip bg-[#060D0A] scroll-mt-16">
      <div className="mx-auto max-w-[1400px] px-4 pt-10 md:px-8 md:pt-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7FE3A6]">Six fields</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-[14ch] font-display text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-[0.95] tracking-[-0.02em] text-[#F3EFE3]">
            One clear brief at a time.
          </h2>
          <p className="max-w-[30ch] text-sm leading-relaxed text-white/55">
            Six kinds of work, each with clear limits.
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-6 flex snap-x snap-mandatory gap-0 overflow-x-auto [scrollbar-width:none] lg:w-max lg:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {DISCIPLINES.map((d) => (
          <article
            key={d.n}
            className="relative h-[82svh] max-h-[720px] min-h-[480px] w-[86vw] shrink-0 snap-center overflow-hidden border-y border-r border-white/15 first:border-l sm:w-[52vw] lg:w-[44vw]"
          >
            <img src={d.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale" />
            <div className="absolute inset-0 bg-[#060D0A]/55" />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
              <span className="border border-black/40 bg-black/65 px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] text-[#7FE3A6]">
                {d.n} / 06
              </span>
              <span className="font-mono text-[11px] tracking-[0.18em] text-white/50">Bounded format</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <h3 className="font-display text-[clamp(1.9rem,3.4vw,3rem)] font-extrabold leading-[0.95] text-[#F3EFE3]">
                {d.name}
              </h3>
              <p className="mt-2 max-w-[38ch] text-sm text-white/70 md:text-base">{d.scope}</p>
              <p className="mt-3 border-t border-white/20 pt-3 text-[13px] italic text-white/60">{d.example}</p>
              <Link to="/sign-up" className="mt-4 inline-block bg-[#F3EFE3] px-5 py-2.5 text-sm font-extrabold text-[#0A1912]">
                View examples
              </Link>
            </div>
          </article>
        ))}

        <div className="flex h-[82svh] max-h-[720px] min-h-[480px] w-[86vw] shrink-0 snap-center flex-col justify-between border-y border-r border-white/15 bg-[#10A969] p-6 sm:w-[52vw] md:p-8 lg:w-[36vw]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#06281a]/70">Not sure where you fit</p>
          <p className="font-display text-4xl font-extrabold leading-[0.95] text-[#06281a] md:text-5xl">
            Answer 4 questions. Get a direction.
          </p>
          <a
            href="#quiz"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block bg-[#06281a] px-6 py-3.5 text-center font-extrabold text-white"
          >
            Check your fit
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
          Pinned journey on desktop · Swipe rail on mobile
        </p>
      </div>
    </section>
  );
}
