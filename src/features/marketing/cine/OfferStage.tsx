import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, Minus } from "@phosphor-icons/react";

type Offer = {
  id: string;
  group: string;
  tag: string;
  title: string;
  deliverable: string;
  effort: string;
  deadline: string;
  mode: string;
  reqs: string[];
  pay: string;
  scope: string;
  exclusions: string;
  review: string;
  img: string;
};

const OFFERS: Offer[] = [
  {
    id: "proofread", group: "Words", tag: "Words · Proofreading",
    title: "Proofread 8-page product guide", deliverable: "Return marked-up document and clean final copy.",
    effort: "~3 hours", deadline: "3 days", mode: "Remote", reqs: ["English"],
    pay: "Fixed pay, told upfront",
    scope: "Proofread the supplied copy. Nothing else.",
    exclusions: "No academic work. No impersonation. No credential use.",
    review: "A supervisor checks it, then clears payout.",
    img: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1000&q=75",
  },
  {
    id: "uifix", group: "Code", tag: "Code · UI fix",
    title: "Fix checkout button overlap on mobile", deliverable: "Return patched component plus test evidence.",
    effort: "~3 hours", deadline: "3 days", mode: "Remote", reqs: ["React"],
    pay: "Fixed pay, told upfront",
    scope: "Fix the overlap shown in the test link.",
    exclusions: "No production access. No credential sharing.",
    review: "A supervisor runs the checks, then clears payout.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=75",
  },
  {
    id: "banner", group: "Visual", tag: "Visual · Banner set",
    title: "Adapt brand system to 6 social banners", deliverable: "Export sized pack plus source files.",
    effort: "~4 hours", deadline: "4 days", mode: "Remote", reqs: ["Figma"],
    pay: "Fixed pay, told upfront",
    scope: "Make 6 banners from the supplied brand kit. One round of changes.",
    exclusions: "No stock theft. No client contact.",
    review: "A supervisor checks sizes and rules, then clears payout.",
    img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1000&q=75",
  },
  {
    id: "harden", group: "Security", tag: "Security · Hardening review",
    title: "Review a staging build against a hardening checklist", deliverable: "Return gap sheet with findings ranked.",
    effort: "~4 hours", deadline: "4 days", mode: "Remote", reqs: ["Checklists"],
    pay: "Fixed pay, told upfront",
    scope: "Check the staging link against the supplied checklist. Flag gaps, change nothing.",
    exclusions: "No production systems. No live testing. No credential sharing.",
    review: "A supervisor reads the sheet, then clears payout.",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1000&q=75",
  },
  {
    id: "captions", group: "Audio", tag: "Audio · Captioned cut",
    title: "Cut 90s demo with captions to spec", deliverable: "Return 16:9 and 9:16 exports plus captions.",
    effort: "~6 hours", deadline: "5 days", mode: "Remote", reqs: ["Premiere"],
    pay: "Fixed pay, told upfront",
    scope: "Cut the supplied clips. Add captions.",
    exclusions: "No unlicensed media. No voice cloning.",
    review: "A supervisor watches it through, then clears payout.",
    img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=75",
  },
  {
    id: "dataset", group: "Research", tag: "Research · Data cleanup",
    title: "Reconcile 500-row ops dataset", deliverable: "Return validated sheet plus notes.",
    effort: "~5 hours", deadline: "5 days", mode: "Remote", reqs: ["Sheets"],
    pay: "Fixed pay, told upfront",
    scope: "Clean the sheet to match the schema. Note every change.",
    exclusions: "No sensitive data beyond what the brief allows.",
    review: "A supervisor checks the sheet, then clears payout.",
    img: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1000&q=75",
  },
];

const TABS = ["All", "Words", "Visual", "Audio", "Code", "Security", "Research"];

function StageSkeleton() {
  return (
    <div aria-hidden="true" className="grid grid-cols-1 lg:grid-cols-2">
      <div className="h-64 animate-pulse bg-ink/10 lg:h-[480px]" />
      <div className="space-y-4 border-t-2 border-ink p-6 lg:border-l-2 lg:border-t-0 lg:p-10">
        <div className="h-3 w-2/5 animate-pulse bg-ink/10" />
        <div className="h-8 w-4/5 animate-pulse bg-ink/10" />
        <div className="h-4 w-3/5 animate-pulse bg-ink/10" />
        <div className="h-24 w-full animate-pulse bg-ink/10" />
      </div>
    </div>
  );
}

export function OfferStage() {
  const [tab, setTab] = useState("All");
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const list = tab === "All" ? OFFERS : OFFERS.filter((o) => o.group === tab);
  const offer = list[Math.min(index, list.length - 1)] ?? OFFERS[0]!;

  useEffect(() => {
    setLoading(true);
    setIndex(0);
    setOpen(false);
    const t = window.setTimeout(() => setLoading(false), 420);
    return () => window.clearTimeout(t);
  }, [tab]);

  return (
    <section id="offers" className="overflow-x-clip border-t-2 border-ink bg-bone py-16 md:py-24 scroll-mt-16">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Example task formats</p>
            <h2 className="mt-3 max-w-[14ch] font-display text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-[0.95] tracking-[-0.02em] text-ink">
              Pick a task. Read it fully.
            </h2>
          </div>
          <p className="max-w-[30ch] text-sm leading-relaxed text-ink-2">
            Sample briefs. Scope and pay shown upfront. Marked as examples.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Pick a discipline">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={
                tab === t
                  ? "border-2 border-ink bg-ink px-4 py-2 text-sm font-extrabold text-bone"
                  : "border border-ink/40 bg-transparent px-4 py-2 text-sm font-bold text-ink-2"
              }
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6 border-2 border-ink bg-field" aria-busy={loading}>
          {loading ? (
            <StageSkeleton />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 overflow-hidden lg:h-auto lg:min-h-[480px]">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={offer.id}
                    src={offer.img}
                    alt=""
                    loading="lazy"
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 h-full w-full object-cover grayscale"
                  />
                </AnimatePresence>
                <span className="absolute left-4 top-4 border border-ink bg-bone px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
                  {offer.tag}
                </span>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {list.map((o, i) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => {
                        setIndex(i);
                        setOpen(false);
                      }}
                      aria-label={`Show ${o.title}`}
                      aria-current={o.id === offer.id}
                      className={
                        o.id === offer.id
                          ? "h-2 w-8 bg-primary"
                          : "h-2 w-8 bg-ink/25"
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="min-w-0 border-t-2 border-ink p-6 md:p-8 lg:border-l-2 lg:border-t-0 lg:p-10">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={offer.id}
                    initial={{ opacity: 0, x: 26 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h3 className="font-display text-3xl font-extrabold leading-[0.98] text-ink md:text-4xl">
                      {offer.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-2 md:text-base">{offer.deliverable}</p>
                    <dl className="mt-5 divide-y divide-ink/15 border-y border-ink/15">
                      {[
                        ["Effort", offer.effort],
                        ["Deadline", offer.deadline],
                        ["Mode", offer.mode],
                        ["Needs", offer.reqs.join(", ")],
                      ].map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                          <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">{k}</dt>
                          <dd className="text-right font-bold text-ink">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-4 bg-primary-light px-4 py-3 text-sm font-extrabold text-primary">{offer.pay}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                        className="inline-flex items-center gap-2 border-b-2 border-primary pb-0.5 text-sm font-extrabold text-ink"
                      >
                        {open ? (
                          <>Hide the full brief <Minus className="h-4 w-4" aria-hidden="true" /></>
                        ) : (
                          <>Read the full brief <Plus className="h-4 w-4" aria-hidden="true" /></>
                        )}
                      </button>
                      <Link to="/sign-up" className="bg-ink px-5 py-2.5 text-sm font-extrabold text-bone">
                        Check eligibility
                      </Link>
                    </div>
                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div
                          key="d"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-ink/20 pt-4 text-sm leading-relaxed text-ink-2">
                            <p><span className="font-extrabold text-ink">Scope. </span>{offer.scope}</p>
                            <p className="mt-2"><span className="font-extrabold text-ink">Out of scope. </span>{offer.exclusions}</p>
                            <p className="mt-2"><span className="font-extrabold text-ink">Review. </span>{offer.review}</p>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
