import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { CONTACT } from "./content";
import { ParallaxBand } from "./ParallaxBand";
import { PageBackdrop } from "./cine/PageBackdrop";
import { StepsMotif } from "./cine/StepsMotif";
import { ensureGsap, gsap, motionOK } from "@/lib/scrollMotion";

function AboutManifesto() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    ensureGsap();
    if (!motionOK()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-mani-line] span", {
        yPercent: 115,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%", end: "top 28%", scrub: 0.6 },
      });
      gsap.from("[data-mani-fade]", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 60%", end: "top 20%", scrub: 0.6 },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-clip border-t-2 border-ink bg-[#0A1912]">
      <StepsMotif tone="text-white/15" className="bottom-6 right-4 hidden w-52 md:right-8 lg:block" />
      <div className="relative mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7FE3A6]">The exchange</p>
        <h2 className="mt-4 font-display text-[clamp(2.6rem,7vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.02em]">
          <span data-mani-line className="block overflow-hidden pb-[0.06em]">
            <span className="block text-[#F3EFE3]">You bring the skill.</span>
          </span>
          <span data-mani-line className="block overflow-hidden pb-[0.08em]">
            <span className="block text-[#10A969]">We bring everything else.</span>
          </span>
        </h2>
        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p data-mani-fade className="max-w-[46ch] text-base leading-relaxed text-white/65">
            Client chaos stays on our side. Tasks, review, payouts, hard talks.
            Your side stays clean: one task, one deliverable, one receipt.
          </p>
          <div data-mani-fade className="flex flex-wrap items-center gap-4">
            <Link to="/how-it-works" className="bg-[#10A969] px-7 py-3.5 text-sm font-extrabold text-white active:scale-[0.98]">
              See how it works
            </Link>
            <Link to="/sign-up" className="border border-white/30 px-7 py-3.5 text-sm font-extrabold text-white">
              Join free
            </Link>
          </div>
        </div>
        <p data-mani-fade className="mt-8 border-t border-white/15 pt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
          No bidding · No client chase · No invoice chasing
        </p>
      </div>
    </section>
  );
}

const PRINCIPLES = [
  {
    n: "01",
    title: "You stay anonymous",
      body: "Clients never learn your name, where you are, or what you are paid. They see the field, nothing else. This protects you too.",
  },
  {
    n: "02",
    title: "You are not an employee",
      body: "You choose what to accept and when to stop. Nothing is forced on you, and pausing is your call.",
  },
  {
    n: "03",
    title: "You are always paid",
      body: "If work you delivered was sound and the client changed their mind, that is our problem, not yours. If we ever part ways, anything you have earned is still paid out.",
  },
];

const PRINCIPLE_IMAGES = [
  "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&w=600&q=70",
];

const RECORD = [
  ["Managed, not listed", "A supervisor sends each offer to a vetted doer. No public pool. No bidding. No proposals."],
  ["Anonymous by design", "The client sees the field, not your name. Your details stay on this side."],
  ["Pay stated upfront", "Every offer shows the pay before you accept. No mid-project negotiation."],
];

export function AboutPage() {
  const reduceMotion = useReducedMotion();
  const scopeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    ensureGsap();
    if (!motionOK()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-about-plx]").forEach((el) => {
        const speed = parseFloat(el.dataset.aboutPlx || "7");
        gsap.fromTo(
          el,
          { yPercent: -speed },
          {
            yPercent: speed,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, scopeRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={scopeRef} className="bg-bone">
      <div className="fresh-container relative pt-[130px] md:pt-[150px]">
        <PageBackdrop word="ABOUT" dark={false} />
        <div className="flex items-center justify-between border-y-2 border-ink py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2">
          <span>About the platform</span>
          <span>Three rules, kept</span>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="grid gap-10 py-10 md:py-14 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-2">About</p>
            <h1 className="mt-4 font-display text-[clamp(2.6rem,6vw,4.8rem)] font-extrabold leading-[0.98] tracking-[-0.02em] text-ink">
              Clear work needs clear owners.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-2">
              Dolancer is a managed service, not an open marketplace. Freelancing works best when
              incentives are aligned and rules are clear.
            </p>
          </div>
          <motion.figure
            initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80"
              alt=""
              loading="eager"
              data-about-plx="7"
              className="aspect-[4/3] w-full scale-[1.15] border-2 border-ink object-cover grayscale will-change-transform"
            />
            <figcaption className="flex items-center justify-between border-2 border-t-0 border-ink px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2">
              <span>Fig. 01</span>
              <span>Managed service</span>
            </figcaption>
          </motion.figure>
        </motion.div>
      </div>

      <ParallaxBand
        caption="Field notes · People doing defined work"
        images={[
          {
            src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
            label: "Signed terms",
            speed: 10,
          },
          {
            src: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80",
            label: "Counted payout",
            speed: 6,
          },
          {
            src: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=1200&q=80",
            label: "Guided work",
            speed: 12,
          },
        ]}
      />

      <div className="border-t-2 border-ink bg-bone">
        <div className="fresh-container py-14 md:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-2">The record</p>
          <ol className="mt-6 border-t-2 border-ink">
            {RECORD.map(([title, body], i) => (
              <motion.li
                key={title}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: Math.min(i, 2) * 0.06 }}
                className="grid grid-cols-1 gap-2 border-b border-ink/25 py-6 sm:grid-cols-12 sm:gap-6"
              >
                <span className="font-display text-4xl font-extrabold leading-none text-primary sm:col-span-2" aria-hidden="true">
                  0{i + 1}
                </span>
                <h2 className="font-display text-2xl font-extrabold leading-tight text-ink sm:col-span-4">{title}</h2>
                <p className="max-w-md text-sm leading-relaxed text-ink-2 sm:col-span-6">{body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      <div className="border-t-2 border-ink bg-bone">
        <div className="fresh-container py-14 md:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-2">Core principles</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-ink">Three rules we will not compromise on</h2>
          <ol className="mt-8 border-t-2 border-ink">
            {PRINCIPLES.map((p, i) => (
              <motion.li
                key={p.n}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55 }}
                className="grid grid-cols-1 gap-4 border-b border-ink/25 py-6 sm:grid-cols-12 sm:gap-6"
              >
                <div className="overflow-hidden sm:col-span-4">
                  <img
                    src={PRINCIPLE_IMAGES[i] ?? PRINCIPLE_IMAGES[0]}
                    alt=""
                    loading="lazy"
                    data-about-plx="5"
                    className="aspect-[16/10] w-full scale-[1.12] border-2 border-ink object-cover grayscale will-change-transform"
                  />
                </div>
                <span className="font-mono text-sm font-semibold tracking-[0.18em] text-primary sm:col-span-1" aria-hidden="true">
                  {p.n}
                </span>
                <h3 className="font-display text-2xl font-extrabold leading-tight text-ink sm:col-span-3">{p.title}</h3>
                <p className="max-w-md text-sm leading-relaxed text-ink-2 sm:col-span-4">{p.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      <AboutManifesto />

      <div className="border-t-2 border-ink bg-bone pb-16 md:pb-24">
        <div className="fresh-container pt-14 md:pt-20">
          <div className="grid grid-cols-1 gap-8 border-2 border-ink bg-field p-8 sm:p-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-2">Who runs this</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold leading-[1.02] text-ink">
                Operated in the open.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-2">
                Dolancer is operated by {CONTACT.company}, registered in {CONTACT.jurisdiction}. We also run a
                client-facing brand, which is how work reaches this side of the platform. We do not hide that
                connection, and you are free to ask about it.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:justify-end">
              <Link to="/sign-up" className="bg-primary px-7 py-3.5 text-center text-sm font-extrabold text-white active:scale-[0.98]">
                Start earning
              </Link>
              <Link to="/contact" className="border-2 border-ink px-7 py-3.5 text-center text-sm font-extrabold text-ink">
                Ask us something
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
