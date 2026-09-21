import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ensureGsap, gsap, motionOK } from "@/lib/scrollMotion";
import { StepsMotif } from "./cine/StepsMotif";

export function FinalCta() {
  const scopeRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    ensureGsap();
    if (!motionOK()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-cta-drift]",
        { xPercent: 1.5 },
        {
          xPercent: -1.5,
          ease: "none",
          scrollTrigger: { trigger: scopeRef.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    }, scopeRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scopeRef} className="overflow-clip border-t-2 border-ink bg-bone pb-16 pt-12 md:pb-24 md:pt-16">
      <div className="fresh-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55 }}
          className="relative grid grid-cols-1 gap-8 overflow-hidden border-2 border-ink bg-primary p-8 sm:p-10 md:p-12 lg:grid-cols-12 lg:items-end"
        >
          <StepsMotif tone="text-white/30" className="bottom-3 left-3 hidden w-44 sm:block" />
          <div className="relative lg:col-span-8" data-cta-drift>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/80">Join free</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-extrabold leading-[0.98] tracking-[-0.02em] text-white">
              Join free and see what fits your skills.
            </h2>
            <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-white/85">
              Create a profile, find work that fits, and track every payout.
            </p>
          </div>
          <div className="relative flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
            <Link
              to="/sign-up"
              className="bg-white px-7 py-3.5 text-center text-sm font-extrabold text-ink active:scale-[0.98]"
            >
              Create account
            </Link>
            <Link
              to="/how-it-works"
              className="border-2 border-white/60 px-7 py-3.5 text-center text-sm font-extrabold text-white"
            >
              Read safety standards
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
