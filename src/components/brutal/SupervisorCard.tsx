import { ShieldCheck } from "@phosphor-icons/react";

export function SupervisorCard() {
  return (
    <div className="border-2 border-ink bg-field">
      <div className="flex items-center gap-4 p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary/10 text-primary">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-extrabold text-ink">Assigned Supervisor</h2>
          <p className="mt-0.5 text-xs font-medium text-ink-muted">
            Reviews deliveries and routes clarifications. Chat with them in the thread on this page.
          </p>
        </div>
      </div>
    </div>
  );
}
