import { useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ensureGsap, gsap, ScrollTrigger, motionOK } from "@/lib/scrollMotion";

const STATS = [
  { value: 6, label: "Fields of work", body: "Six fields. Nothing else is offered." },
  { value: 4, label: "Gates to payout", body: "Join, verify, deliver, get paid. Same path every time." },
  { value: 1, label: "Supervisor per project", body: "Every offer is routed and reviewed by a person." },
  { value: 0, label: "Bidding rounds", body: "No proposals, no undercutting, ever." },
];

function StatCell({ value, label, body, index }: { value: number; label: string; body: string; index: number }) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!motionOK() || !numRef.current) {
      if (numRef.current) numRef.current.textContent = String(value).padStart(2, "0");
      return;
    }
    ensureGsap();
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: value,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: { trigger: numRef.current, start: "top 85%", once: true },
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = String(Math.round(obj.v)).padStart(2, "0");
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.08 }}
      className="bg-[#0A1912] p-5 md:p-6"
    >
      <span ref={numRef} className="font-display text-5xl font-extrabold leading-none text-[#10A969] md:text-6xl">
        00
      </span>
      <p className="mt-2.5 font-extrabold text-[#F3EFE3]">{label}</p>
      <p className="mt-1 max-w-[26ch] text-[13px] leading-relaxed text-white/55">{body}</p>
    </motion.div>
  );
}

export function StatsBand() {
  return (
    <section className="border-t border-white/15 bg-[#0A1912] py-12 md:py-16">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7FE3A6]">Platform record</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-[14ch] font-display text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-[0.95] tracking-[-0.02em] text-[#F3EFE3]">
            Small numbers, all true.
          </h2>
          <p className="max-w-[30ch] text-sm leading-relaxed text-white/55">
            Nothing rented, nothing borrowed. What the platform itself guarantees.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-px border border-white/15 bg-white/15 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <StatCell key={s.label} value={s.value} label={s.label} body={s.body} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const RECEIPTS = [
  {
    tag: "Words · Proofreading",
    title: "8-page guide, marked and clean",
    rows: [
      ["Delivered", "Marked-up plus clean copy"],
      ["Review", "Cleared in one pass"],
      ["Payout", "Released per brief terms"],
    ],
  },
  {
    tag: "Visual · Banner set",
    title: "6 banners plus source files",
    rows: [
      ["Delivered", "Sized pack, brand-checked"],
      ["Review", "One revision inside boundary"],
      ["Payout", "Released per brief terms"],
    ],
  },
  {
    tag: "Audio · Captioned cut",
    title: "90s demo with captions",
    rows: [
      ["Delivered", "16:9 and 9:16 exports"],
      ["Review", "Timing and captions checked"],
      ["Payout", "Released per brief terms"],
    ],
  },
  {
    tag: "Code · UI fix",
    title: "Checkout overlap resolved",
    rows: [
      ["Delivered", "Patch plus test evidence"],
      ["Review", "Checklist run, no regressions"],
      ["Payout", "Released per brief terms"],
    ],
  },
  {
    tag: "Security · Hardening review",
    title: "Staging gaps ranked",
    rows: [
      ["Delivered", "Gap sheet, nothing touched live"],
      ["Review", "Sampled against checklist"],
      ["Payout", "Released per brief terms"],
    ],
  },
  {
    tag: "Research · Data cleanup",
    title: "500 rows reconciled",
    rows: [
      ["Delivered", "Validated sheet plus notes"],
      ["Review", "Schema check passed"],
      ["Payout", "Released per brief terms"],
    ],
  },
];

export function ReceiptsBand() {
  return (
    <section className="border-t-2 border-ink bg-bone py-14 md:py-20">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Field receipts</p>
            <h2 className="mt-3 max-w-[16ch] font-display text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-[0.95] tracking-[-0.02em] text-ink">
              Outcomes, anonymized by design.
            </h2>
          </div>
          <p className="max-w-[30ch] text-sm leading-relaxed text-ink-2">
            Example formats. No names, no institutions, no invented counts.
          </p>
        </div>

        <div className="mt-8 border-t-2 border-ink">
          {RECEIPTS.map((r, i) => (
            <motion.article
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: Math.min(i, 2) * 0.06 }}
              className="grid gap-3 border-b-2 border-ink py-6 md:grid-cols-12 md:gap-6 md:py-7"
            >
              <div className="md:col-span-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">{r.tag}</p>
                <span className="mt-2 inline-block border border-ink bg-primary px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                  Example
                </span>
              </div>
              <h3 className="font-display text-2xl font-extrabold leading-[0.98] text-ink md:col-span-4 md:text-[2rem]">
                {r.title}
              </h3>
              <p
                aria-hidden="true"
                className="hidden font-display text-5xl font-extrabold leading-none text-primary md:col-span-1 md:block md:self-center lg:text-6xl"
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <dl className="md:col-span-4">
                {r.rows.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-3 border-t border-ink/15 py-1.5 text-sm first:border-t-0 first:pt-0">
                    <dt className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">{k}</dt>
                    <dd className="text-right font-bold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Link to="/sign-up" className="inline-block bg-ink px-6 py-3 text-sm font-extrabold text-bone">
            Start your first brief
          </Link>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
            Receipts 001 to 006 · Terms shown upfront
          </p>
        </div>
      </div>
    </section>
  );
}

export function useRefreshOnLoad() {
  useLayoutEffect(() => {
    ensureGsap();
    const onLoad = () => {
      try {
        ScrollTrigger.refresh();
      } catch {
        /* noop */
      }
    };
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }
    return () => window.removeEventListener("load", onLoad);
  }, []);
}
