import { Link } from "react-router-dom";

const PROMISES: [string, string, string][] = [
  [
    "01",
    "The client pays first",
    "The platform collects from the client before work starts, so your payout is covered from day one.",
  ],
  [
    "02",
    "Approved work is always paid",
    "Supervisor approval releases your payout within 48 hours to your bank or UPI. No chasing, no ghosting.",
  ],
  [
    "03",
    "Free to join, no fees",
    "Joining costs nothing and there is no fee to receive work. No card, no cuts, no surprises.",
  ],
  [
    "04",
    "You stay Expert",
    "Your name and details never reach clients. To them you are simply Expert.",
  ],
];

export function PayoutPromise() {
  return (
    <section className="border-t border-white/15 bg-[#060D0A] py-14 md:py-20">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7FE3A6]">
          Worried this is another scam
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-[16ch] font-display text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[0.95] tracking-[-0.02em] text-[#F3EFE3]">
            Built so you actually get paid.
          </h2>
          <Link
            to="/sign-up"
            className="bg-[#10A969] px-6 py-3 text-sm font-extrabold text-white active:scale-[0.98]"
          >
            Start earning
          </Link>
        </div>
        <ul className="mt-8 grid grid-cols-1 gap-px border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map(([n, title, body]) => (
            <li key={n} className="bg-[#060D0A] p-6">
              <p className="font-mono text-xs font-semibold text-[#7FE3A6]">{n}</p>
              <p className="mt-2 font-extrabold text-[#F3EFE3]">{title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
