import { Outlet } from "react-router-dom";
import { ShieldCheck } from "@phosphor-icons/react";

/**
 * Split auth screen. The side panel is decorative and hidden on small viewports,
 * so the form always gets the full width when it matters.
 *
 * Boxy forest ledger: hairline frame, ghost outline mark, ruled brief plate.
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

        <div className="relative flex h-full flex-col justify-end p-10 xl:p-12">
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
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
                Example brief format
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#7FE3A6]">Ex. 001</p>
            </div>
            <p className="mt-3 font-display text-xl font-extrabold leading-tight text-[#F3EFE3]">
              Proofread 8-page guide · ~3h · Remote
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Anonymized brief", "Human review", "Terms upfront"].map((chip) => (
                <span
                  key={chip}
                  className="border border-[#10A969]/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#7FE3A6]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
