import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { EnvelopeSimple, ArrowUp } from "@phosphor-icons/react";
import { CONTACT } from "./content";
import { ensureGsap, gsap, motionOK } from "@/lib/scrollMotion";

const COLS: { head: string; links: { to: string; label: string }[] }[] = [
  {
    head: "Work",
    links: [
      { to: "/how-it-works", label: "How it works" },
      { to: "/sign-up", label: "Start earning" },
      { to: "/refer", label: "Refer and earn" },
      { to: "/sign-in", label: "Sign in" },
    ],
  },
  {
    head: "Studio",
    links: [
      { to: "/contact", label: "Contact" },
      { to: "/tickets", label: "Report work" },
    ],
  },
  {
    head: "Legal",
    links: [
      { to: "/legal/terms", label: "Terms of service" },
      { to: "/legal/privacy", label: "Privacy policy" },
      { to: "/contact", label: "Grievances" },
    ],
  },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const scopeRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    ensureGsap();
    if (!motionOK()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-footer-wm]",
        { xPercent: 4 },
        {
          xPercent: -2,
          ease: "none",
          scrollTrigger: { trigger: scopeRef.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    }, scopeRef);
    return () => ctx.revert();
  }, []);

  function toTop() {
    window.scrollTo({ top: 0, behavior: motionOK() ? "smooth" : "auto" });
  }

  return (
    <footer ref={scopeRef} className="relative overflow-clip bg-[#060D0A]">
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-[1400px] px-4 pt-12 md:px-8 md:pt-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <Link to="/" className="inline-flex items-center gap-2.5" aria-label="Dolancer home">
                <span className="grid h-9 w-9 place-items-center bg-[#10A969] font-display text-lg font-extrabold text-[#06281a]">
                  D
                </span>
                <span className="font-display text-2xl font-extrabold tracking-[-0.02em] text-[#F3EFE3]">
                  Dolancer<span className="text-[#10A969]">.</span>
                </span>
              </Link>
              <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-white/60">
                Skilled work, assigned properly, paid reliably. A supervisor sends the work.
                Terms shown before you commit.
              </p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-5 inline-flex items-center gap-2 border border-white/20 px-4 py-2.5 text-xs font-bold text-white/80"
              >
                <EnvelopeSimple className="h-4 w-4 text-[#7FE3A6]" aria-hidden="true" />
                <span>{CONTACT.email}</span>
              </a>
            </div>

            {COLS.map((col) => (
              <nav key={col.head} className="md:col-span-2" aria-label={col.head}>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7FE3A6]">{col.head}</h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="text-sm font-semibold text-white/70">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="md:col-span-1 flex md:justify-end items-start">
              <button
                type="button"
                onClick={toTop}
                aria-label="Back to top"
                className="grid h-11 w-11 place-items-center border border-white/25 text-[#F3EFE3] active:scale-[0.96]"
              >
                <ArrowUp className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div aria-hidden="true" className="select-none overflow-hidden pt-8">
            <span
              data-footer-wm
              className="block whitespace-nowrap font-display font-extrabold leading-[0.85] tracking-[-0.02em]"
              style={{
                fontSize: "clamp(4rem,17vw,15rem)",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(243,239,227,0.22)",
              }}
            >
              DOLANCER
            </span>
          </div>

          <div className="flex flex-col gap-2 border-t border-white/15 py-5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Operated by {CONTACT.company}, {CONTACT.jurisdiction}
            </p>
            <p>
              © {currentYear} · Support {CONTACT.hours}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
