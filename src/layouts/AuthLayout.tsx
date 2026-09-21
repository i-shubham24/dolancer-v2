import { Outlet } from "react-router-dom";
import { ShieldCheck } from "@phosphor-icons/react";

/**
 * Split auth screen. The side panel is decorative and hidden on small viewports,
 * so the form always gets the full width when it matters.
 *
  * Boxy forest ledger: hairline frame, ghost outline mark, ruled task plate.
 * Sharp corners, green accents only, no fabricated metrics.
 */
export function AuthLayout() {
  return (
    <div className="grid min-h-dvh bg-bone lg:h-dvh lg:overflow-hidden lg:grid-cols-2">
      <div className="auth-form-column flex min-w-0 items-center justify-center px-5 py-6 sm:px-10 lg:min-h-0 lg:overflow-y-auto lg:py-4">
        <Outlet />
      </div>

      <div className="relative hidden min-w-0 overflow-hidden border-l-2 border-ink bg-[#0A1912] text-white lg:block">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-6 w-px bg-white/10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-6 w-px bg-white/10"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-8 -right-2 select-none font-display text-[13rem] font-extrabold leading-none tracking-tight"
          style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(243,239,227,0.12)" }}
        >
          D.
        </span>

        <div className="relative flex h-full flex-col p-10 xl:p-12">
          <div className="relative mb-auto h-56 w-full">
            <div aria-hidden="true" className="absolute right-0 top-0 h-48 w-48 border-2 border-[#7FE3A6]/50" />
            <div aria-hidden="true" className="absolute right-6 top-6 h-36 w-36 border border-white/25 motion-safe:animate-[spin_16s_linear_infinite]" />
            <div aria-hidden="true" className="absolute right-[5.5rem] top-[5.5rem] h-3 w-3 bg-[#10A969] motion-safe:animate-pulse" />
            <p className="absolute bottom-1 right-1 font-mono text-[11px] tracking-[0.18em] text-[#7FE3A6]">
              01
            </p>
          </div>

          <div className="mt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7FE3A6]">
            Field record · Auth gate
          </p>
          <blockquote className="mt-4 max-w-md">
            <p className="font-display text-3xl xl:text-4xl font-extrabold leading-[1.02] tracking-[-0.02em] text-[#F3EFE3]">
              No bidding wars. The pay is agreed before you start.
            </p>
            <footer className="mt-4 flex items-center gap-2 text-sm font-bold text-white/60">
              <ShieldCheck className="h-4 w-4 text-[#7FE3A6]" aria-hidden="true" />
              A supervisor has your back
            </footer>
          </blockquote>

          <div className="mt-8 max-w-md border-2 border-white/20 bg-white/[0.04] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
              Example task
            </p>
            <p className="mt-2 font-display text-xl font-extrabold leading-tight text-[#F3EFE3]">
              Proofread an 8-page guide.
            </p>
            <p className="mt-1.5 text-sm text-white/65">Fixed pay, told upfront. Human review.</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
