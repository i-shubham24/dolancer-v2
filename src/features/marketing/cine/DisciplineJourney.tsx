import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

function JourneyImage({ src, n }: { src: string; n: string }) {
  const [ready, setReady] = useState(false);
  const [dead, setDead] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    // Cached images can finish before onLoad attaches; catch that path.
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) setReady(true);
  }, [src]);
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center font-display text-[11rem] font-extrabold leading-none text-transparent lg:text-[15rem]"
        style={{ WebkitTextStroke: "1.5px rgba(243,239,227,0.22)" }}
      >
        {n}
      </span>
      {!dead && (
        <img
          ref={imgRef}
          src={src}
          alt=""
          loading="eager"
          decoding="async"
          onLoad={() => setReady(true)}
          onError={() => setDead(true)}
          className={`absolute inset-0 h-full w-full object-cover grayscale transition-opacity duration-500 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </>
  );
}

export function DisciplineJourney() {
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  const step = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.86, behavior: "smooth" });
  };

  const onRailScroll = () => {
    const track = trackRef.current;
    if (!track || window.innerWidth >= 768) return;
    const max = track.scrollWidth - track.clientWidth;
    if (max <= 0) return;
    const idx = Math.min(6, Math.floor((track.scrollLeft / max) * 6) + 1);
    if (numRef.current) {
      numRef.current.textContent = `${String(idx).padStart(2, "0")} / 06`;
    }
    if (progRef.current) {
      progRef.current.style.width = `${Math.round((track.scrollLeft / max) * 100)}%`;
    }
  };

  const pinActive = useRef<boolean | null>(null);
  if (pinActive.current === null) pinActive.current = motionOK();

  useLayoutEffect(() => {
    ensureGsap();
    const mm = gsap.matchMedia();
    mm.add("all", () => {
      if (!motionOK()) return;
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;
      gsap.set(track, { overflowX: "visible", overflowY: "visible" });
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progRef.current) {
              progRef.current.style.width = `${Math.round(self.progress * 100)}%`;
            }
            if (numRef.current) {
              const idx = Math.min(6, Math.floor(self.progress * 6) + 1);
              numRef.current.textContent = `${String(idx).padStart(2, "0")} / 06`;
            }
          },
        },
      });
      const onLoad = () => ScrollTrigger.refresh();
      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", onLoad);
      }
      if (document.fonts) {
        document.fonts.ready.then(onLoad).catch(() => {});
      }
      return () => {
        window.removeEventListener("load", onLoad);
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={wrapRef} id="disciplines" className="relative overflow-clip bg-[#060D0A] scroll-mt-16">
      <div className="mx-auto max-w-[1400px] px-4 pt-10 md:px-8 md:pt-14">
          <p className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-[#7FE3A6]">
            <span>Six fields</span>
            <span ref={numRef} className="text-white/50">01 / 06</span>
          </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-[14ch] font-display text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-[0.95] tracking-[-0.02em] text-[#F3EFE3]">
            One clear brief at a time.
          </h2>
          <p className="max-w-[30ch] text-sm leading-relaxed text-white/55">
            Six kinds of work, each with clear limits.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-[1400px] px-4 md:px-8" aria-hidden="true">
        <div className="h-[3px] bg-white/10">
          <div ref={progRef} className="h-full w-0 bg-[#10A969]" />
        </div>
      </div>

      {!pinActive.current && (
        <div className="mx-auto mt-4 flex max-w-[1400px] gap-3 px-4 md:hidden">
          <button
            type="button"
            onClick={() => step(-1)}
            className="border border-white/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#F3EFE3] active:bg-white/10"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className="bg-[#10A969] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white active:brightness-110"
          >
            Next
          </button>
        </div>
      )}

      <div
        ref={trackRef}
        data-rail="disciplines"
        onScroll={onRailScroll}
        className="mt-4 flex snap-x snap-mandatory gap-0 overflow-x-auto overscroll-x-contain [scrollbar-width:none] lg:w-max lg:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {DISCIPLINES.map((d) => (
          <article
            key={d.n}
            className="relative min-h-[72svh] w-[72vw] shrink-0 snap-center overflow-hidden border-y border-r border-white/15 bg-[#0A1912] first:border-l sm:w-[52vw] md:min-h-[82svh] md:w-[44vw] lg:h-[82svh] lg:max-h-[720px] lg:min-h-[480px] lg:w-[32vw]"
          >
            <JourneyImage src={d.img} n={d.n} />
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

        <div className="flex min-h-[72svh] w-[72vw] shrink-0 snap-center flex-col justify-between border-y border-r border-white/15 bg-[#10A969] p-6 sm:w-[52vw] md:min-h-[82svh] md:w-[44vw] md:p-8 lg:h-[82svh] lg:max-h-[720px] lg:min-h-[480px] lg:w-[30vw]">
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
          Pinned journey · Swipe rail when reduced motion is on
        </p>
      </div>
    </section>
  );
}
