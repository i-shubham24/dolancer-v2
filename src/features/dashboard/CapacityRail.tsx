import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Stack, ArrowUpRight, ShieldCheck, Sparkle, GraduationCap, Check } from "@phosphor-icons/react";
import { Card } from "@/components/brutal/Card";
import { cn } from "@/lib/cn";
import { MAX_ACTIVE_PROJECTS, SUPERVISOR_LABEL } from "@/lib/constants";
import type { DoerGateState } from "@/types/domain";

/**
 * The right rail: capacity, then next steps, then how the work actually runs.
 *
 * There is deliberately no pending-earnings figure anywhere in this app. The doer
 * cannot read payout status: ledger_doer exposes only released legs and
 * razorpay_payouts has no doer read policy, so a "pending" number would be
 * invented. Showing a made-up figure about someone's money is worse than showing
 * none, so that gap sits on the backend handoff list instead.
 */
export function CapacityRail({
  activeCount,
  gate,
}: {
  activeCount: number;
  gate: DoerGateState | undefined;
}) {
  const atCap = activeCount >= MAX_ACTIVE_PROJECTS;

  const steps = gate
    ? [
        { id: "kyc", label: "Verified", done: gate.kycDone, icon: ShieldCheck, to: "/verification" },
        { id: "skills", label: "Skills picked", done: gate.skillsDone, icon: Sparkle, to: "/skills" },
        {
          id: "training",
          label: "Training done",
          done: gate.trainingDone,
          icon: GraduationCap,
          to: "/training",
        },
      ]
    : [];

  return (
    <motion.aside
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="space-y-4"
      aria-label="Capacity and next steps"
    >
      <Card>
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
            <Stack className="h-3.5 w-3.5" aria-hidden="true" />
            Capacity
          </span>
          <span
            className={cn(
              "border px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em]",
              atCap ? "border-warning-ink/40 bg-warning-bg text-warning-ink" : "bg-primary text-white",
            )}
          >
            {activeCount} of {MAX_ACTIVE_PROJECTS}
          </span>
        </div>

        <div className="mt-4 flex gap-1.5" aria-hidden="true">
          {Array.from({ length: MAX_ACTIVE_PROJECTS }, (_, index) => (
            <div
              key={index}
              className={cn(
                "h-2.5 flex-1 border border-ink/25",
                index < activeCount ? "bg-primary" : "bg-ink/10",
              )}
            />
          ))}
        </div>
        <span className="sr-only">
          {activeCount} of {MAX_ACTIVE_PROJECTS} project slots in use.
        </span>

        <p className="mt-3 text-xs leading-snug text-ink-2">
          {atCap
            ? "You are at capacity, so new offers are paused. Finish something to free a slot. This does not affect your standing or your rating."
            : "Pausing stops new offers without affecting work you already hold."}
        </p>
      </Card>

      {gate && !gate.unlocked ? (
        <Card>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
            To unlock earning
          </h3>
          <ul className="mt-3 space-y-2">
            {steps.map((step) => (
              <li key={step.id}>
                <Link
                  to={step.to}
                  className={cn(
                    "flex items-center gap-2.5 border px-3 py-2 text-sm font-bold",
                    step.done
                      ? "border-ink/20 bg-bone text-ink-3"
                      : "border-ink/40 bg-field text-ink",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center border",
                      step.done ? "border-success-ink/40 bg-success-bg text-success-ink" : "border-ink/30 bg-primary text-white",
                    )}
                  >
                    {step.done ? (
                      <Check className="h-3 w-3" aria-hidden="true" />
                    ) : (
                      <step.icon className="h-3 w-3" aria-hidden="true" />
                    )}
                  </span>
                  <span className={cn("flex-1", step.done && "line-through")}>{step.label}</span>
                  {!step.done ? (
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      <Card>
        <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
          How work runs here
        </h3>
        <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-ink-2">
          <li>
            <strong className="font-extrabold text-ink">The pay is fixed.</strong> Every brief
            shows exactly what you earn before you accept it. No public marketplace.
          </li>
          <li>
            <strong className="font-extrabold text-ink">One point of contact.</strong> You speak
            to your supervisor, never to the {SUPERVISOR_LABEL.toLowerCase()}.
          </li>
          <li>
            <strong className="font-extrabold text-ink">Add your working link</strong> on a
            project before you update progress or submit it.
          </li>
        </ul>
      </Card>
    </motion.aside>
  );
}
