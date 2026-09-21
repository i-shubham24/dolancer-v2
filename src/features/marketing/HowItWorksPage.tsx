import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, Minus } from "@phosphor-icons/react";
import { STEPS, DIFFERENCES, FAQS, CATEGORIES } from "./content";
import { CONTACT } from "./content";
import { ParallaxBand } from "./ParallaxBand";
import { PageBackdrop } from "./cine/PageBackdrop";
import { BarColumns } from "./cine/Motifs";
import { SquareGrid } from "./cine/Motifs";
import { ensureGsap, gsap, ScrollTrigger, motionOK } from "@/lib/scrollMotion";

const GATE_IMAGES = [
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=75",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=75",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=75",
  "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1000&q=75",
];

function GateStack() {
  return (
    <div>
      {STEPS.map((step, i) => (
        <div key={step.title} className="sticky" style={{ top: `${88 + i * 20}px` }}>
          <motion.article
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 overflow-hidden border-2 border-ink bg-field"
          >
            <div className="grid md:grid-cols-12">
              <div className="relative min-h-52 overflow-hidden border-b-2 border-ink md:col-span-5 md:border-b-0 md:border-r-2">
                <img
                  src={GATE_IMAGES[i] ?? GATE_IMAGES[0]}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover grayscale"
                />
                <span className="absolute left-4 top-4 border border-ink bg-bone px-2.5 py-1 font-mono text-[11px] tracking-[0.18em] text-ink">
                  Gate 0{i + 1} / 04
                </span>
              </div>
              <div className="p-6 md:col-span-7 md:p-8">
                <p className="font-display text-5xl font-extrabold leading-none text-primary/25" aria-hidden="true">
                  0{i + 1}
                </p>
                <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight text-ink md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-2 md:text-base">{step.body}</p>
              </div>
            </div>
          </motion.article>
        </div>
      ))}
    </div>
  );
}

const PAYOUT_ROWS = [
  ["Work clears review", "Your supervisor checks the work against the task."],
  ["Approval gate clears", "Client approval, timeout, or exception. Nothing moves on a promise."],
  ["Payout lands itemised", "Gross, deductions, and net shown separately. Paid over UPI or NEFT."],
];

function PayoutJourney() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    ensureGsap();
    if (!motionOK()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-po-rule]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-po-list]", start: "top 72%", end: "bottom 55%", scrub: true },
        }
      );
      gsap.utils.toArray<HTMLElement>("[data-po-row]").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 62%",
          end: "bottom 38%",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
      });
      gsap.fromTo(
        "[data-po-ghost]",
        { xPercent: 3 },
        {
          xPercent: -5,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-clip border-t border-white/15 bg-[#0A1912]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-8 flex justify-end overflow-hidden">
        <span
          data-po-ghost
          className="whitespace-nowrap pr-4 font-display font-extrabold leading-[0.85] md:pr-8"
          style={{
            fontSize: "clamp(3.5rem,9vw,8rem)",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(243,239,227,0.10)",
          }}
        >
          PAYOUT
        </span>
      </div>
      <BarColumns tone="text-white/15" className="bottom-6 left-4 hidden w-40 md:left-8 lg:block" />
      <div className="relative mx-auto max-w-[1400px] px-4 py-14 md:px-8 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7FE3A6]">Payout path</p>
            <h2 className="mt-3 max-w-[20ch] font-display text-3xl sm:text-4xl font-extrabold leading-[1.02] text-white">
              Approved, released, in bank. Each with a receipt.
            </h2>
          </div>
          <p className="max-w-[30ch] text-sm leading-relaxed text-white/55">
            Every payout leaves a paper trail you can check.
          </p>
        </div>
        <div className="mt-8 flex items-center gap-4" aria-hidden="true">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">Path</span>
          <div className="h-[3px] flex-1 bg-white/15">
            <div data-po-rule className="h-full w-full origin-left bg-primary" style={{ transform: "scaleX(0)" }} />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
            {String(Math.min(active + 1, 3)).padStart(2, "0")}/03
          </span>
        </div>
        <ol data-po-list className="mt-8 grid grid-cols-1 gap-px border border-white/15 bg-white/15 md:grid-cols-3">
          {PAYOUT_ROWS.map(([title, body], i) => {
            const isActive = active === i;
            return (
              <li
                key={title}
                data-po-row
                className={isActive ? "bg-[#0E2A1F] p-6 md:p-7" : "bg-[#0A1912] p-6 md:p-7"}
              >
                <p
                  aria-hidden="true"
                  className={isActive ? "font-display text-6xl font-extrabold leading-none text-[#10A969]" : "font-display text-6xl font-extrabold leading-none text-white/15"}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 font-display text-xl font-extrabold leading-tight text-white">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{body}</p>
                <p className="mt-5 border-t border-white/15 pt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
                  Receipt {String(i + 1).padStart(2, "0")} / 03
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t-2 border-ink">
      {FAQS.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.question} className="border-b border-ink/25">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center gap-4 py-4 text-left"
            >
              <span className="font-mono text-xs font-semibold text-primary" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-display text-lg font-extrabold text-ink">{faq.question}</span>
              {isOpen ? (
                <Minus className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              ) : (
                <Plus className="h-5 w-5 shrink-0 text-ink-3" aria-hidden="true" />
              )}
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="a"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-5 text-sm leading-relaxed text-ink-2">{faq.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function HowItWorksPage() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay: number) => ({
    initial: reduceMotion ? ({} as const) : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <div className="bg-bone">
      <div className="bg-[#0A1912]">
        <div className="fresh-container relative pt-[104px] md:pt-[112px]">
          <PageBackdrop word="PROCESS" compact />
          <div className="flex items-center justify-between border-y border-white/15 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
            <span>Process record</span>
            <span>Read before you join</span>
          </div>

          <motion.div {...reveal(0)} className="py-6 md:py-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7FE3A6]">How it works</p>
            <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.02em] text-[#F3EFE3]">
              The whole thing, start to payout.
            </h1>
            <div className="mt-6 max-w-xl">
              <p className="text-base leading-relaxed text-white/65">
                No part of this is hidden until after you sign up. Read it all, then decide.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mx-auto max-w-[1400px] px-4 pb-10 md:px-8">
          <div className="flex items-center justify-between border-t border-white/15 pt-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">Four gates below</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">Drag sideways</p>
          </div>
          <div className="mt-4 flex snap-x gap-px overflow-x-auto border border-white/25 bg-white/25 pb-0 pr-4 [scrollbar-width:thin] md:pr-8" data-rail="gates">
            {STEPS.map((s, i) => (
              <motion.a
                key={s.title}
                href="#walkthrough"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("walkthrough")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
                }}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: Math.min(i, 3) * 0.07 }}
                className="w-[210px] shrink-0 snap-start bg-[#0A1912] p-5 md:w-[250px]"
              >
                <p className="font-display text-4xl font-extrabold leading-none text-[#10A969]" aria-hidden="true">
                  0{i + 1}
                </p>
                <p className="mt-3 font-mono text-[11px] tracking-[0.18em] text-[#7FE3A6]">Gate 0{i + 1} / 04</p>
                <p className="mt-1.5 font-display text-base font-extrabold leading-tight text-white">{s.title}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <ParallaxBand
        caption="Field notes · The process, photographed plainly"
        images={[
          {
            src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
            label: "Defined scope",
            speed: 10,
          },
          {
            src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
            label: "Guided work",
            speed: 6,
          },
          {
            src: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1200&q=80",
            label: "Delivered proof",
            speed: 12,
          },
        ]}
      />

      <div id="walkthrough" className="border-t-2 border-ink bg-bone scroll-mt-20">
        <div className="fresh-container py-14 md:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">The walkthrough</p>
          <h2 className="mt-3 max-w-[18ch] font-display text-3xl sm:text-4xl font-extrabold leading-[1.02] text-ink">
            Four gates, in order.
          </h2>
          <div className="mt-8">
            <GateStack />
          </div>
        </div>
      </div>

      <PayoutJourney />

      <div className="border-t-2 border-ink bg-bone">
        <div className="fresh-container relative py-14 md:py-20">
          <SquareGrid tone="text-ink/20" className="right-4 top-10 hidden w-28 md:right-8 lg:block" />
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">What makes this different</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold leading-[1.02] text-ink">
            Six reasons, pictured.
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {DIFFERENCES.map((d, i) => (
              <motion.article
                key={d.title}
                {...reveal(Math.min(i, 2) * 0.06)}
                className={`border-2 border-ink bg-field ${i % 2 === 1 ? "md:mt-12" : ""}`}
              >
                <div className="overflow-hidden border-b-2 border-ink">
                  <img
                  src={[
                    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=70",
                    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1000&q=70",
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=70",
                    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=70",
                    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=70",
                    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=70",
                  ][i] ?? ""}
                  alt=""
                  loading="lazy"
                  data-hiw-plx="6"
                  className="aspect-[16/7] w-full scale-[1.12] object-cover grayscale will-change-transform"
                />
              </div>
                <div className="p-6">
                  <p className="font-mono text-[11px] tracking-[0.18em] text-primary">0{i + 1} / 06</p>
                  <h3 className="mt-2 font-display text-xl font-extrabold text-ink md:text-2xl">{d.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{d.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t-2 border-ink bg-bone">
        <div className="fresh-container py-14 md:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-2">Disciplines</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-ink">What gets offered here</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-2">
            Pick what you are genuinely strong in. Supervisors match offers to it, so honesty beats breadth.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <li key={c.name} title={c.blurb} className="border border-ink/40 px-3.5 py-2 text-sm font-bold text-ink">
                {c.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t-2 border-ink bg-bone">
        <div className="fresh-container py-14 md:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-2">Questions</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-ink">Asked often, answered plainly</h2>
          <div className="mt-8">
            <FaqList />
          </div>
        </div>
      </div>

      <div className="border-t-2 border-ink bg-bone pb-16 md:pb-24">
        <div className="fresh-container pt-14 md:pt-20">
          <div className="grid grid-cols-1 gap-8 border-2 border-ink bg-primary p-8 sm:p-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/80">That is all of it</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold leading-[1.02] text-white">
                Start earning on your terms.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
              <Link to="/sign-up" className="bg-white px-7 py-3.5 text-center text-sm font-extrabold text-ink active:scale-[0.98]">
                Create your account
              </Link>
              <Link to="/contact" className="border-2 border-white/60 px-7 py-3.5 text-center text-sm font-extrabold text-white">
                Ask a question first
              </Link>
            </div>
          </div>
          <p className="mt-6 text-xs text-ink-3">
            Operated by {CONTACT.company}, {CONTACT.jurisdiction}.
          </p>
        </div>
      </div>
    </div>
  );
}
