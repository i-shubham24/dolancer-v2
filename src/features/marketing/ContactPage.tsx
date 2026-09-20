import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { EnvelopeSimple, Clock, Scales, Lifebuoy } from "@phosphor-icons/react";
import { useAuth } from "@/providers/AuthProvider";
import { CONTACT } from "./content";
import { ContactForm } from "./ContactForm";
import { PageBackdrop } from "./cine/PageBackdrop";

export function ContactPage() {
  const { session } = useAuth();
  const reduceMotion = useReducedMotion();

  return (
    <div className="bg-bone">
      <div className="fresh-container relative pt-[130px] md:pt-[150px]">
        <PageBackdrop word="TALK" dark={false} />
        <div className="flex items-center justify-between border-y-2 border-ink py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2">
          <span>Support desk</span>
          <span>Every message answered</span>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="max-w-3xl py-10 md:py-14"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-2">Contact</p>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,6vw,4.8rem)] font-extrabold leading-[0.98] tracking-[-0.02em] text-ink">
            Talk to a person.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-2">
            Questions about payments, verification, a project you are on, or your account.
            Someone answers every one of them.
          </p>
          <div className="mt-8 grid border-t-2 border-ink sm:grid-cols-3">
            <a href={`mailto:${CONTACT.email}`} className="group border-b border-ink/25 py-4 sm:border-b-0 sm:pr-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">01 / Support</p>
              <p className="mt-1 break-all text-sm font-extrabold text-ink underline decoration-primary decoration-2 underline-offset-4">
                {CONTACT.email}
              </p>
            </a>
            <a href={`mailto:${CONTACT.grievanceEmail}`} className="border-b border-ink/25 py-4 sm:border-b-0 sm:border-l sm:border-ink/25 sm:px-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">02 / Grievance</p>
              <p className="mt-1 break-all text-sm font-extrabold text-ink underline decoration-primary decoration-2 underline-offset-4">
                {CONTACT.grievanceEmail}
              </p>
            </a>
            <div className="py-4 sm:px-6 sm:border-l sm:border-ink/25">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">03 / Hours</p>
              <p className="mt-1 text-sm font-extrabold text-ink">{CONTACT.hours}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="border-t-2 border-ink bg-bone">
        <div className="fresh-container grid gap-8 py-14 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="space-y-5 lg:col-span-5">
            {session ? (
              <div className="border-2 border-ink bg-field p-6">
                <Lifebuoy className="h-6 w-6 text-primary" aria-hidden="true" />
                <h2 className="mt-3 font-display text-xl font-extrabold text-ink">Already have tickets open?</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  Everything you have raised, and every reply, lives in one place.
                </p>
                <Link to="/tickets" className="mt-4 inline-block bg-ink px-5 py-2.5 text-sm font-extrabold text-bone">
                  Go to support
                </Link>
              </div>
            ) : (
              <div className="border-2 border-ink bg-field p-6">
                <EnvelopeSimple className="h-6 w-6 text-primary" aria-hidden="true" />
                <h2 className="mt-3 font-display text-xl font-extrabold text-ink">Or email directly</h2>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-2 inline-block break-all text-sm font-bold text-ink underline decoration-primary decoration-2 underline-offset-4"
                >
                  {CONTACT.email}
                </a>
              </div>
            )}

            <div className="border-2 border-ink bg-field p-6">
              <Clock className="h-6 w-6 text-primary" aria-hidden="true" />
              <h2 className="mt-3 font-display text-xl font-extrabold text-ink">When we are around</h2>
              <p className="mt-2 text-sm font-bold text-ink">{CONTACT.hours}</p>
              <p className="mt-3 text-xs leading-relaxed text-ink-2">
                Anything about a project you are actively working on is best raised with your
                supervisor in that project thread. They will see it soonest.
              </p>
            </div>

            <div className="border-2 border-ink bg-field p-6">
              <Scales className="h-6 w-6 text-primary" aria-hidden="true" />
              <h2 className="mt-3 font-display text-xl font-extrabold text-ink">Grievances</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                If something has not been resolved through support, or concerns how your data has
                been handled, our grievance officer is reachable directly.
              </p>
              <a
                href={`mailto:${CONTACT.grievanceEmail}`}
                className="mt-3 inline-block break-all text-sm font-bold text-ink underline decoration-primary decoration-2 underline-offset-4"
              >
                {CONTACT.grievanceEmail}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-ink/25 bg-bone">
        <p className="fresh-container py-8 text-xs leading-relaxed text-ink-3">
          Dolancer is operated by {CONTACT.company}, {CONTACT.jurisdiction}. See our{" "}
          <Link to="/legal/terms" className="underline underline-offset-2">
            terms
          </Link>{" "}
          and{" "}
          <Link to="/legal/privacy" className="underline underline-offset-2">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
