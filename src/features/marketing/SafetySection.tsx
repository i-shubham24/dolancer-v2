import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck } from "@phosphor-icons/react";

const BLOCKED = [
  "Academic cheating",
  "Exam completion",
  "Impersonation",
  "Credential sharing",
  "Deceptive outreach",
  "Unsafe work",
];

const PILLARS = [
  ["01", "See the scope, the review rules, and the pay before you commit."],
  ["02", "Never share passwords. Never share more than needed."],
  ["03", "Unsure or unsafe? Report it to support."],
];

const PAYOUT = [
  ["01", "Approved", "Your work passes review."],
  ["02", "Released", "The payout moves, with its own receipt."],
  ["03", "In bank", "Timing and deductions follow the brief."],
];

export function SafetySection() {
  return (
    <section id="safety" className="bg-bone pb-16 md:pb-24 scroll-mt-16">
      <div className="fresh-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55 }}
          className="border-2 border-ink bg-[#0A1912] p-7 sm:p-10 md:p-12"
        >
          <span className="inline-flex items-center gap-2 border border-[#7FE3A6]/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#7FE3A6]">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Safety and standards
          </span>
          <h2 className="mt-4 max-w-[18ch] font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.02] tracking-[-0.02em] text-white">
            Real work. Clear terms.
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">What legitimate looks like</p>
              <ul className="mt-3 divide-y divide-white/15 border-y border-white/15">
                {PILLARS.map(([n, text]) => (
                  <li key={n} className="flex gap-4 py-3.5 text-sm leading-relaxed text-white/85">
                    <span className="font-mono text-xs font-semibold text-[#7FE3A6]">{n}</span>
                    {text}
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">Never supported</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {BLOCKED.map((b) => (
                  <span key={b} className="border border-red-300/40 bg-red-500/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-red-200">
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">Follow every payout home</p>
              <ol className="mt-3 divide-y divide-white/15 border-y border-white/15">
                {PAYOUT.map(([n, title, body]) => (
                  <li key={n} className="flex gap-4 py-3.5">
                    <span className="font-mono text-xs font-semibold text-[#7FE3A6]">{n}</span>
                    <div>
                      <p className="font-extrabold text-white">{title}</p>
                      <p className="mt-0.5 text-sm text-white/65">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link to="/how-it-works" className="bg-white px-5 py-2.5 text-sm font-extrabold text-ink">
                  How review works
                </Link>
                <Link to="/contact" className="border border-white/30 px-5 py-2.5 text-sm font-extrabold text-white">
                  Talk to support
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
