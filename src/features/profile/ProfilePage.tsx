import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Star, Send, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { demo, demoId, demoRespond, isDemo } from "@/lib/demo-data";
import { callRowRpc, unwrap } from "@/lib/rpc";
import { selectColumns } from "@/lib/select";
import { qk } from "@/lib/query-keys";
import { useAuth } from "@/providers/AuthProvider";
import { Card } from "@/components/brutal/Card";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Skeleton } from "@/components/brutal/Skeleton";
import { useProfile } from "@/features/dashboard/queries";
import { toUserError } from "@/lib/user-error";
import { updateProfileBasics } from "@/features/auth/api";
import { profileBasicsSchema, applicationBioSchema, validateOrThrow } from "@/lib/validations";
import type { DoerApplicationRow, RatingSummaryRow } from "@/types/database";

/**
 * my_rating_summary returns the level the DATABASE computes, and we render exactly
 * that. rating_level() has two tiers (L1, and L2 at an average of 4.7 across at
 * least 15 ratings) and drives the claim head-start. It does not match the three
 * tiers described in the PRD, so no third tier is invented here; the discrepancy is
 * on the backend handoff list for someone to settle.
 */
async function fetchRating(): Promise<{ average: number | null; count: number; level: string }> {
  if (isDemo()) return demoRespond(() => demo.rating);

  const row = unwrap(await callRowRpc<RatingSummaryRow>("my_rating_summary"));
  const average = row?.avg_score == null ? null : Number(row.avg_score);
  return {
    average: average && Number.isFinite(average) ? average : null,
    count: Number(row?.rating_count ?? 0),
    level: row?.level ?? "L1",
  };
}

async function fetchApplication(): Promise<DoerApplicationRow | null> {
  if (isDemo()) return demoRespond(() => demo.application);

  const { data, error } = await supabase
    .from("doer_applications")
    .select(selectColumns("id", "bio", "status", "created_at"))
    .limit(1);
  if (error) throw new Error(error.message);
  return (data as unknown as DoerApplicationRow[] | null)?.[0] ?? null;
}

async function submitApplication(bio: string): Promise<void> {
  if (isDemo()) {
    return demoRespond(() => {
      demo.application = {
        id: demoId("application"),
        bio: bio.trim(),
        status: "pending",
        created_at: new Date().toISOString(),
      };
    });
  }

  const { data: userData } = await supabase.auth.getUser();
  const id = userData.user?.id;
  if (!id) throw new Error("Not signed in");
  const { error } = await supabase
    .from("doer_applications")
    .insert({ applicant_id: id, bio: bio.trim() });
  if (error) throw new Error(error.message);
}

const APPLICATION_COPY: Record<string, { tone: string; title: string; body: string }> = {
  pending: {
    tone: "bg-warning-bg text-warning-ink",
    title: "Application under review",
    body: "Someone is reading it. You keep full access to the app meanwhile, and we will let you know.",
  },
  approved: {
    tone: "bg-success-bg text-success-ink",
    title: "Application approved",
    body: "You are in. Finish the remaining setup steps to start receiving offers.",
  },
  rejected: {
    tone: "bg-danger-bg text-danger-ink",
    title: "Not approved this time",
    body: "We could not take your application forward. Support can tell you more.",
  },
};

const COUNTRY_OPTIONS = ["IN", "US", "GB", "CA", "AU", "AE", "SG"];

const MORE_OPTIONS: { to: string; title: string; body: string }[] = [
  { to: "/verification", title: "Verification", body: "Identity check, payout method and status." },
  { to: "/skills", title: "Skills", body: "The disciplines your offers are matched on." },
  { to: "/training", title: "Training", body: "Short modules plus the skill check." },
  { to: "/earnings", title: "Earnings", body: "Gross, tax withheld and net, per payout." },
  { to: "/refer", title: "Refer and earn", body: "200 credits per verified invite." },
  { to: "/tickets", title: "Support", body: "Raise a ticket. A human reads it." },
];

function initialOf(name: string | null | undefined, email: string | null | undefined): string {
  const fromName = name?.trim().charAt(0);
  if (fromName) return fromName.toUpperCase();
  const fromEmail = email?.trim().charAt(0);
  return (fromEmail ?? "?").toUpperCase();
}

export function ProfilePage() {
  const { user, role } = useAuth();
  const queryClient = useQueryClient();
  const profile = useProfile();

  const rating = useQuery({ queryKey: qk.rating(), queryFn: fetchRating });
  const application = useQuery({ queryKey: qk.application(), queryFn: fetchApplication });

  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");

  // Seed the form once the profile arrives, without clobbering an in-progress edit.
  useEffect(() => {
    if (!profile.data) return;
    setFullName(profile.data.full_name ?? "");
    setWhatsapp(profile.data.whatsapp ?? "");
  }, [profile.data]);

  const save = useMutation({
    mutationFn: () => {
      const parsed = validateOrThrow(profileBasicsSchema, { fullName: fullName.trim(), whatsapp: whatsapp.trim() || undefined });
      return updateProfileBasics({ fullName: parsed.fullName, whatsapp: parsed.whatsapp || null });
    },
    onSuccess: () => {
      toast.success("Saved.");
      void queryClient.invalidateQueries({ queryKey: qk.profile() });
    },
    onError: (error: Error) => toast.error(toUserError(error, "Could not save profile.")),
  });

  const apply = useMutation({
    mutationFn: () => {
      const parsed = validateOrThrow(applicationBioSchema, bio.trim());
      return submitApplication(parsed);
    },
    onSuccess: () => {
      toast.success("Application sent.");
      void queryClient.invalidateQueries({ queryKey: qk.application() });
      void queryClient.invalidateQueries({ queryKey: qk.gate() });
    },
    onError: (error: Error) => toast.error(toUserError(error, "Could not send application.")),
  });

  const applicationStatus = application.data?.status;
  const needsApplication = role !== "doer" && !application.data;

  const average = rating.data?.average ?? null;
  const count = rating.data?.count ?? 0;
  const level = rating.data?.level ?? "L1";
  const isTopLevel = level === "L2";
  const countProgress = Math.min(count, 15) / 15;
  const averageProgress = average == null ? 0 : Math.min(average, 4.7) / 4.7;

  const country = profile.data?.country ?? "";
  const countryOptions = country && !COUNTRY_OPTIONS.includes(country)
    ? [country, ...COUNTRY_OPTIONS]
    : COUNTRY_OPTIONS;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Identity header */}
      <Card className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <span
          aria-hidden="true"
          className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-primary font-display text-3xl font-extrabold text-white"
        >
          {profile.isLoading ? "" : initialOf(profile.data?.full_name, user?.email)}
        </span>
        <div className="min-w-0 flex-1">
          {profile.isLoading ? (
            <Skeleton className="h-8 w-56" />
          ) : (
            <h1 className="truncate text-3xl font-extrabold tracking-[-0.03em]">
              {profile.data?.full_name?.trim() || "Your profile"}
            </h1>
          )}
          <p className="mt-1 truncate text-sm text-ink-2">{user?.email}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-ink px-3 py-1 text-xs font-extrabold text-bone">
              {level === "L2" ? "L2 Pro" : "L1 Starter"}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-line-card bg-white/70 px-3 py-1 text-xs font-extrabold">
              <Star className="h-3.5 w-3.5 fill-accent text-ink" aria-hidden="true" />
              {rating.isLoading ? "…" : average != null ? average.toFixed(1) : "Not rated yet"}
            </span>
            <span className="rounded-full border border-line-card bg-white/70 px-3 py-1 text-xs font-bold text-ink-2">
              To clients: Expert
            </span>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Standing with level progress */}
        <Card>
          <h2 className="text-lg font-extrabold tracking-[-0.025em]">Standing</h2>
          <div className="mt-4 flex flex-wrap items-center gap-6">
            <div>
              <div className="text-2xs font-bold uppercase tracking-[0.05em] text-ink-muted">
                Rating
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <Star className="h-5 w-5 fill-accent text-ink" aria-hidden="true" />
                <span className="text-2xl font-extrabold tracking-[-0.03em]">
                  {rating.isLoading ? (
                    <Skeleton className="inline-block h-6 w-10 align-middle" />
                  ) : average != null ? (
                    average.toFixed(1)
                  ) : (
                    "Not rated"
                  )}
                </span>
              </div>
            </div>
            <div>
              <div className="text-2xs font-bold uppercase tracking-[0.05em] text-ink-muted">
                Ratings
              </div>
              <div className="mt-1 text-2xl font-extrabold tracking-[-0.03em]">{count}</div>
            </div>
            <div>
              <div className="text-2xs font-bold uppercase tracking-[0.05em] text-ink-muted">
                Level
              </div>
              <div className="mt-1 text-2xl font-extrabold tracking-[-0.03em]">{level}</div>
            </div>
          </div>

          {isTopLevel ? (
            <p className="mt-4 border-t border-line-subtle pt-3 text-[11px] leading-snug text-ink-muted">
              Top level. Matching work reaches you the moment it is posted.
            </p>
          ) : (
            <div className="mt-4 space-y-3 border-t border-line-subtle pt-4">
              <div>
                <div className="flex items-baseline justify-between text-[11px] font-bold">
                  <span className="uppercase tracking-[0.05em] text-ink-muted">Ratings to L2</span>
                  <span>{Math.min(count, 15)} of 15</span>
                </div>
                <div
                  className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink/10"
                  role="progressbar"
                  aria-valuenow={Math.min(count, 15)}
                  aria-valuemin={0}
                  aria-valuemax={15}
                  aria-label="Ratings toward L2"
                >
                  <div className="h-full rounded-full bg-primary" style={{ width: `${Math.round(countProgress * 100)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-baseline justify-between text-[11px] font-bold">
                  <span className="uppercase tracking-[0.05em] text-ink-muted">Average to 4.7</span>
                  <span>{average != null ? average.toFixed(1) : "No ratings yet"}</span>
                </div>
                <div
                  className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink/10"
                  role="progressbar"
                  aria-valuenow={Math.round(averageProgress * 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Average rating toward 4.7"
                >
                  <div className="h-full rounded-full bg-accent" style={{ width: `${Math.round(averageProgress * 100)}%` }} />
                </div>
              </div>
              <p className="text-[11px] leading-snug text-ink-muted">
                Hold a 4.7 average over 15 projects to move from L1 Starter to L2 Pro. Better
                offers reach you first.
              </p>
            </div>
          )}
        </Card>

        {/* Application */}
        {needsApplication ? (
          <Card className="border bg-accent-light">
            <h2 className="text-lg font-extrabold tracking-[-0.025em]">Apply to join</h2>
            <p className="mt-1 text-sm text-ink-2">
              Tell us what you do and where you are strongest. A couple of sentences is plenty.
            </p>
            <div className="mt-4 space-y-3">
              <Label htmlFor="bio" className="sr-only">
                About your work
              </Label>
              <Textarea
                id="bio"
                rows={4}
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                placeholder="I have been writing technical documentation for six years, mostly for developer tools..."
              />
              <Button
                className="w-full"
                disabled={bio.trim().length < 20 || apply.isPending}
                onClick={() => apply.mutate()}
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {apply.isPending ? "Sending..." : "Send application"}
              </Button>
              {bio.trim().length < 20 ? (
                <p className="text-center text-xs text-ink-muted">
                  A little more detail helps. Twenty characters minimum.
                </p>
              ) : null}
            </div>
          </Card>
        ) : (
          <Card>
            <h2 className="text-lg font-extrabold tracking-[-0.025em]">Application</h2>
            {applicationStatus ? (
              <>
                <p
                  className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-extrabold ${
                    APPLICATION_COPY[applicationStatus]?.tone ?? ""
                  }`}
                >
                  {APPLICATION_COPY[applicationStatus]?.title ?? applicationStatus}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  {APPLICATION_COPY[applicationStatus]?.body}
                </p>
                {application.data?.bio ? (
                  <div className="mt-4 border-t border-line-subtle pt-3">
                    <p className="text-2xs font-bold uppercase tracking-[0.05em] text-ink-muted">
                      What you sent
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-2">{application.data.bio}</p>
                  </div>
                ) : null}
              </>
            ) : (
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                You joined as a doer directly, so there is no separate application on file.
              </p>
            )}
          </Card>
        )}
      </div>

      {/* Details */}
      <Card className="space-y-5">
        <div>
          <h2 className="text-lg font-extrabold tracking-[-0.025em]">Your details</h2>
          <p className="mt-1 text-sm text-ink-2">
            This is how supervisors reach you and how payouts stay compliant.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              autoComplete="name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp number</Label>
            <Input
              id="whatsapp"
              type="tel"
              value={whatsapp}
              onChange={(event) => setWhatsapp(event.target.value)}
              autoComplete="tel"
              placeholder="+91 00000 00000"
            />
          </div>
        </div>
        <p className="-mt-2 text-xs text-ink-muted">
          Used only to reach you about your work. It is not a sign-in method.
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <select
              id="country"
              value={country}
              disabled
              aria-describedby="country-note"
              className="min-h-[44px] w-full rounded-xl border border-line-card bg-surface px-4 py-[11px] font-sans text-sm font-medium text-ink shadow-soft-sm outline-none disabled:opacity-50"
            >
              {countryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <p id="country-note" className="text-xs text-ink-muted">
              Set once at signup, because it drives your currency, tax and timezone.{" "}
              <Link to="/tickets" className="font-bold text-ink underline underline-offset-2">
                Contact support
              </Link>{" "}
              if it is wrong.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email">Login email</Label>
            <Input id="contact-email" value={user?.email ?? ""} disabled readOnly />
            <p className="text-xs text-ink-muted">
              This is your sign-in identity. It is never shown to clients.{" "}
              <Link to="/tickets" className="font-bold text-ink underline underline-offset-2">
                Contact support
              </Link>{" "}
              to change it.
            </p>
          </div>
        </div>

        <Button
          className="w-full sm:w-auto sm:min-w-56"
          disabled={save.isPending || !fullName.trim()}
          onClick={() => save.mutate()}
        >
          {save.isPending ? "Saving..." : "Save changes"}
        </Button>
      </Card>

      {/* More options */}
      <Card>
        <h2 className="text-lg font-extrabold tracking-[-0.025em]">More options</h2>
        <ul className="mt-3 divide-y divide-line-subtle">
          {MORE_OPTIONS.map((option) => (
            <li key={option.to}>
              <Link
                to={option.to}
                className="flex items-center gap-3 py-3.5"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-extrabold">{option.title}</span>
                  <span className="mt-0.5 block truncate text-xs text-ink-muted">{option.body}</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-ink-3" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
