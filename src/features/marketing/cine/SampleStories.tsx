import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const STORIES: { n: string; quote: string; who: string; meta: string }[] = [
  {
    n: "01",
    quote:
      "What sold me was getting paid on time, every time. The work is steady and it fits around my week.",
    who: "Aarav · Content writer · Pune",
    meta: "L2 Pro · Words and storytelling",
  },
  {
    n: "02",
    quote:
      "No bidding, no proposals. Tasks just show up that actually match what I do. That is rare.",
    who: "Meera · UI designer · Bengaluru",
    meta: "L2 Pro · Visual and brand design",
  },
  {
    n: "03",
    quote:
      "The task is always clear and there is a supervisor if I am stuck. Felt legit from the first project.",
    who: "Kabir · Data analyst · Delhi",
    meta: "L1 Starter · Research, data and strategy",
  },
];

export function SampleStories() {
  const [lead, ...rest] = STORIES;
  if (!lead) return null;
  return (
    <section className="relative overflow-clip border-t border-white/15 bg-[#060D0A] py-14 md:py-20">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 left-0 block whitespace-nowrap font-display font-extrabold leading-[0.85] tracking-[-0.02em] text-transparent"
        style={{
          fontSize: "clamp(6rem,17vw,15rem)",
          WebkitTextStroke: "1.5px rgba(243,239,227,0.12)",
        }}
      >
        PAID ON TIME
      </span>

      <div className="relative mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7FE3A6]">
              Sample stories
            </p>
            <h2 className="mt-3 max-w-[16ch] font-display text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[0.95] tracking-[-0.02em] text-[#F3EFE3]">
              People like you, already earning.
            </h2>
          </div>
          <p className="max-w-[30ch] text-sm leading-relaxed text-white/55">
            Illustrative examples. Real doer stories publish here after launch, with consent.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <motion.figure
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col border border-white/15 bg-[#0A1912] p-7 md:p-10 lg:col-span-7"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#7FE3A6]">{lead.n}</span>
              <span className="border border-[#7FE3A6]/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#7FE3A6]">
                Featured
              </span>
            </div>
            <blockquote className="mt-6 flex-1 font-display text-[clamp(1.6rem,3.4vw,2.9rem)] font-extrabold leading-[1.04] tracking-[-0.01em] text-[#F3EFE3]">
              {lead.quote}
            </blockquote>
            <figcaption className="mt-8 border-t border-white/15 pt-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
                {lead.who}
              </p>
              <p className="mt-1 text-xs text-white/40">{lead.meta}</p>
            </figcaption>
          </motion.figure>

          <div className="grid grid-cols-1 gap-5 lg:col-span-5">
            {rest.map((s, i) => (
              <motion.figure
                key={s.n}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-1 flex-col border border-white/15 bg-white/[0.04] p-6 md:p-7"
              >
                <span className="font-mono text-xs font-semibold text-[#7FE3A6]">{s.n}</span>
                <blockquote className="mt-3 flex-1 font-display text-xl font-bold leading-snug text-[#F3EFE3] md:text-[1.35rem]">
                  {s.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-white/15 pt-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
                    {s.who}
                  </p>
                  <p className="mt-1 text-xs text-white/40">{s.meta}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 flex flex-col gap-4 border border-[#10A969]/50 bg-[#10A969]/10 p-6 sm:flex-row sm:items-center sm:justify-between md:p-7"
        >
          <p className="font-display text-xl font-extrabold text-[#F3EFE3] md:text-2xl">
            Your story could be next.
          </p>
          <Link
            to="/sign-up"
            className="inline-block bg-[#10A969] px-6 py-3 text-center text-sm font-extrabold text-white active:scale-[0.98]"
          >
            Start earning
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
