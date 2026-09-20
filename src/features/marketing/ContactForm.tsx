import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { PaperPlaneTilt, EnvelopeSimple, Check } from "@phosphor-icons/react";
import { Input, Textarea, Label } from "@/components/ui/input";
import { useAuth } from "@/providers/AuthProvider";
import { toUserError } from "@/lib/user-error";
import { openTicket, TICKET_CATEGORIES } from "@/features/tickets/api";
import { CONTACT } from "./content";

/**
 * One form, two honest destinations.
 *
 * Signed in, it opens a real support ticket: attached to the account, visible in
 * the app, and answerable in a thread. Signed out, there is no public endpoint to
 * post to, so rather than a form that pretends to submit and quietly drops the
 * message, it composes the mail and hands it to the visitor's own mail client. They
 * can see it was really sent, and they keep a copy.
 *
 * The alternative, a form that POSTs nowhere and shows a thank-you, is the single
 * most common lie on a contact page. Not here.
 */
export function ContactForm() {
  const { session, user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<string>(TICKET_CATEGORIES[0].id);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [handedOff, setHandedOff] = useState(false);
  // Honeypot, same contract as the ticket form: bots get a fake success.
  const [website, setWebsite] = useState("");

  const ticket = useMutation({
    mutationFn: () => openTicket({ subject, category, body: message }),
    onSuccess: (ticketId) => {
      toast.success("Ticket opened. You can follow it in support.");
      navigate(`/tickets/${ticketId}`);
    },
    onError: (error: Error) => toast.error(toUserError(error, "Could not open the ticket. Try again.")),
  });

  const ready = session
    ? subject.trim().length > 3 && message.trim().length > 10
    : name.trim().length > 1 && email.trim().length > 4 && subject.trim().length > 3 && message.trim().length > 10;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!ready) return;

    if (website.trim()) {
      // Bot trap tripped. Mirror a real success with no network call.
      toast.success("Ticket opened. You can follow it in support.");
      setSubject("");
      setMessage("");
      setWebsite("");
      return;
    }

    if (session) {
      ticket.mutate();
      return;
    }

    const body = `${message.trim()}\n\nFrom: ${name.trim()} <${email.trim()}>`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject.trim(),
    )}&body=${encodeURIComponent(body)}`;
    setHandedOff(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 border-ink bg-field p-6 lg:p-8"
    >
      <h2 className="text-2xl font-extrabold tracking-[-0.03em]">Send us a message</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-2">
        {session
          ? "This opens a support ticket on your account, so whoever picks it up already has your details and you can follow the whole thread."
          : "This opens your mail app with the message ready to send, so you keep a copy and can see it actually went."}
      </p>

      <div className="mt-6 space-y-4">
        {!session ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Your name</Label>
              <Input
                id="contact-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
                className="rounded-none border-2 border-ink bg-field shadow-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Your email</Label>
              <Input
                id="contact-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
                className="rounded-none border-2 border-ink bg-field shadow-none"
              />
            </div>
          </div>
        ) : (
          <p className="border border-ink/25 bg-bone px-3 py-2.5 text-xs text-ink-2">
            Sending as {user?.email}
          </p>
        )}

        <div className="space-y-2">
          <Label htmlFor="contact-category">What is it about?</Label>
          <select
            id="contact-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full border-2 border-ink bg-field px-4 py-[11px] text-sm font-medium outline-none focus:border-primary"
          >
            {TICKET_CATEGORIES.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-subject">Subject</Label>
            <Input
              id="contact-subject"
              value={subject}
              maxLength={120}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="A short summary"
              required
              className="rounded-none border-2 border-ink bg-field shadow-none"
            />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              rows={5}
              value={message}
              maxLength={4000}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Tell us what is going on."
              required
              className="rounded-none border-2 border-ink bg-field shadow-none"
            />
        </div>

        <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>
      </div>

      {handedOff ? (
        <div
          role="status"
          className="mt-5 flex items-start gap-2.5 border border-success-ink/30 bg-success-bg px-4 py-3"
        >
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-success-ink" aria-hidden="true" />
          <p className="text-xs font-semibold leading-snug text-success-ink">
            Your mail app should have opened with the message ready. If nothing happened,
            email {CONTACT.email} directly.
          </p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={!ready || ticket.isPending}
        className="mt-6 flex w-full items-center justify-center gap-2 bg-primary px-6 py-3.5 text-sm font-extrabold text-white active:scale-[0.99] disabled:opacity-50"
      >
        {session ? (
          <PaperPlaneTilt className="h-4 w-4" aria-hidden="true" />
        ) : (
          <EnvelopeSimple className="h-4 w-4" aria-hidden="true" />
        )}
        {ticket.isPending
          ? "Opening ticket..."
          : session
            ? "Open a support ticket"
            : "Compose the message"}
      </button>

      {!ready ? (
        <p className="mt-3 text-center text-xs text-ink-muted">
          Fill in the fields above to continue.
        </p>
      ) : null}
    </form>
  );
}
