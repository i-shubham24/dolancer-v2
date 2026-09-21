import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Flame, Stack, Timer } from "@phosphor-icons/react";
import { formatPaise } from "@/lib/paise";
import { relativeDeadline } from "@/lib/datetime";
import { MAX_ACTIVE_PROJECTS } from "@/lib/constants";
import type { DoerProject } from "@/types/domain";
import { cn } from "@/lib/cn";

/**
 * SpotlightHero is pure presentation over data the dashboard already loads.
 * It invents no money figure, renames no status, and links only to existing
 * routes. Safe to keep when the backend lands.
 */
export function SpotlightHero({
  name,
  activeCount,
  poolCount,
  focus,
  unlocked,
}: {
  name: string;
  activeCount: number;
  poolCount: number;
  focus: DoerProject | null;
  unlocked: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const hour = new Date().getHours();
  const daypart = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const freeSlots = Math.max(0, MAX_ACTIVE_PROJECTS - activeCount);
  const atCap = activeCount >= MAX_ACTIVE_PROJECTS;

  return (
    <motion.section
      aria-label="Today spotlight"
      className="relative overflow-hidden border-2 border-ink bg-[#0A1912] text-[#F3EFE3]"
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08 }}
    >
      <div className="relative flex flex-wrap items-center justify-between gap-2 border-b border-white/15 px-5 py-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
          {today} <span className="mx-2 text-white/30">/</span> Doer mode
        </p>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 border border-[#10A969]/50 bg-[#10A969]/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[#7FE3A6]">
            <span className="h-1.5 w-1.5 animate-pulse bg-[#10A969]" aria-hidden="true" />
            {poolCount} assigned offers
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em]",
              atCap ? "border-[#10A969]/50 bg-[#10A969]/10 text-[#7FE3A6]" : "border-white/25 text-white/80",
            )}
          >
            <Flame className="h-3 w-3" aria-hidden="true" />
            {activeCount} of {MAX_ACTIVE_PROJECTS} slots used
          </span>
        </div>
      </div>

      <div className="relative grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-1.5 border border-white/25 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
            Fixed pay <ArrowUpRight className="h-3 w-3" aria-hidden="true" /> No bidding
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.02] tracking-[-0.02em] text-[#F3EFE3] sm:text-4xl">
            {daypart}, {name}.
            <span className="mt-1 block text-white/75">
              {focus ? "Your next deadline is waiting." : freeSlots > 0 ? "Room to take something new." : "Finish strong, then accept again."}
            </span>
          </h2>
          <p className="mt-3 max-w-md text-sm font-medium leading-relaxed text-white/60">
            {unlocked
              ? "Accept your assigned offer, add your working link, submit for supervisor review. Pay stays fixed from the start."
              : "View your assignments. Finish verification to unlock offers and payouts."}
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link
              to="/pool"
              className="inline-flex min-h-[44px] items-center gap-2 bg-[#F3EFE3] px-4 py-3 text-sm font-extrabold text-[#0A1912] active:scale-[0.98]"
            >
              View assigned offers
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/work"
              className="inline-flex min-h-[44px] items-center gap-2 border border-white/25 px-4 py-3 text-sm font-extrabold text-[#F3EFE3]"
            >
              My work
            </Link>
            <Link
              to="/training"
              className="inline-flex min-h-[44px] items-center gap-2 border border-white/25 px-4 py-3 text-sm font-extrabold text-[#F3EFE3]"
            >
              Training
            </Link>
          </div>
        </div>

        <div className="min-w-0">
          {focus ? (
            <Link
              to={`/work/${focus.id}`}
              className="block border-2 border-[#F3EFE3]/80 bg-[#F3EFE3] p-5 text-ink"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                  <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                  Up next
                </span>
                <span className="border border-ink/25 bg-primary-light px-2 py-0.5 text-[11px] font-extrabold text-primary">
                  {relativeDeadline(focus.deliveryAt)}
                </span>
              </div>
              <p className="mt-3 truncate font-display text-lg font-extrabold tracking-[-0.02em]">
                {focus.brief?.trim() || `${focus.category} task`}
              </p>
              <div className="mt-2 flex min-w-0 flex-wrap items-end justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">Payout before tax</div>
                  <div className="break-words font-display text-3xl font-extrabold tracking-[-0.02em]">{formatPaise(focus.payoutPaise)}</div>
                </div>
                <span className="inline-flex min-h-[44px] items-center gap-1 bg-ink px-3 py-2 text-xs font-extrabold text-bone">
                  Open <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
              <div
                className="mt-4 h-2 overflow-hidden bg-ink/10"
                role="progressbar"
                aria-valuenow={focus.progressPct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Task progress"
              >
                <div className="h-full bg-primary" style={{ width: `${Math.min(100, Math.max(0, focus.progressPct))}%` }} />
              </div>
            </Link>
          ) : (
            <div className="border border-dashed border-white/25 p-5">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/80">
                <Stack className="h-3.5 w-3.5" aria-hidden="true" />
                No active work
              </div>
              <p className="mt-3 font-display text-lg font-extrabold leading-snug text-[#F3EFE3]">
                Nothing on your plate. Offers are routed manually by your supervisor.
              </p>
              <Link
                to={unlocked ? "/pool" : "/verification"}
                className="mt-4 inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-sm font-extrabold text-white"
              >
                {unlocked ? "View assigned offers" : "Get verified"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          )}

          <div className="mt-3 flex items-center gap-2" aria-hidden="true">
            {Array.from({ length: MAX_ACTIVE_PROJECTS }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "h-2 flex-1 border border-white/30",
                  i < activeCount ? "bg-[#10A969]" : "bg-white/10",
                )}
              />
            ))}
            <span className="ml-1 font-mono text-[11px] font-bold text-white/80">
              {freeSlots} open
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
