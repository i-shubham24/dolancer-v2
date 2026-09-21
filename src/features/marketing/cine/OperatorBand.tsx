import { Link } from "react-router-dom";
import { CONTACT } from "../content";

export function OperatorBand() {
  return (
    <section className="border-t border-white/15 bg-[#0A1912] py-14 pb-12 md:py-20 md:pb-14">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7FE3A6]">
          Who runs this
        </p>
        <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(2.2rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.02em]">
          <span className="block text-[#F3EFE3]">You bring the skill.</span>
          <span className="block text-[#10A969]">We bring everything else.</span>
        </h2>
        <div className="mt-8 flex flex-col gap-3 border border-white/15 p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
          <p className="max-w-[62ch] text-sm leading-relaxed text-white/65">
            Dolancer is operated by {CONTACT.company}, registered in {CONTACT.jurisdiction}.
            Supervisors bring verified client work to this side of the platform, explain it
            clearly, and stand behind every payout.
          </p>
          <Link
            to="/contact"
            className="shrink-0 border border-white/30 px-6 py-3 text-center text-sm font-extrabold text-white"
          >
            Ask us something
          </Link>
        </div>
      </div>
    </section>
  );
}
