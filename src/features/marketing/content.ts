/**
 * Public site content.
 *
 * The visual system is expressive, but the product language stays precise. Public
 * copy describes a managed, supervisor-routed service rather than an open market.
 */

export interface Category {
  name: string;
  blurb: string;
}

export const CATEGORIES: Category[] = [
  { name: "Words & storytelling", blurb: "Articles, copy, scripts and research." },
  { name: "Visual & brand design", blurb: "Logos, identities, layouts and interfaces." },
  { name: "Audio, video & motion", blurb: "Editing, animation, voiceover and sound." },
  { name: "Code & engineering", blurb: "Websites, apps, automations and integrations." },
  { name: "Security & systems", blurb: "Audits, testing, hardening and compliance." },
  { name: "Research, data & strategy", blurb: "Analysis, reports, research and planning." },
];

export interface Step {
  title: string;
  body: string;
}

export const STEPS: Step[] = [
  {
    title: "Create your account",
    body: "Sign in with email, confirm you are 18 or older, and tell us what you can genuinely deliver.",
  },
  {
    title: "Complete verification",
    body: "Share identity and payout details for safe payments. Must be done before payout.",
  },
  {
    title: "Receive an assigned offer",
    body: "A supervisor sends you a project with scope, deadline, workspace, and pay. No public pool. No bidding.",
  },
  {
    title: "Deliver through review",
    body: "Work in the company workspace. Talk to your supervisor. Get paid after the approval gate clears.",
  },
];

export interface Difference {
  title: string;
  body: string;
}

export const DIFFERENCES: Difference[] = [
  {
    title: "No bidding wars",
    body: "You never undercut anyone to win work. A supervisor routes a specific project to you when it fits your verified disciplines.",
  },
  {
    title: "The pay is agreed upfront",
    body: "Every assigned offer shows exactly what you earn before you accept it. There are no surprise discounts or mid-project negotiations.",
  },
  {
    title: "A supervisor has your back",
    body: "A supervisor reviews your work before delivery and handles the client conversation. You do not need to chase or identify the client.",
  },
  {
    title: "You choose what to accept",
    body: "You can accept or decline an offer. When you accept, you commit to the stated scope and deadline and work within the active-project limit. Take what fits around your classes or your job. Busy week? Skip it. Your schedule stays yours.",
  },
  {
    title: "No chasing invoices",
    body: "You are not billing a client. When the project clears its approval gate, the payout is released to the account you registered.",
  },
  {
    title: "Grow into better offers",
    body: "Hold a 4.7 average over 15 projects to move from L1 Starter to L2 Pro. Better offers reach you first as your rating builds.",
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "When do I get paid?",
    answer:
      "After your supervisor has cleared the delivery and the client approval gate is satisfied. If a client does not respond, the approved timeout process may release the payout later. Your earnings page itemises every payout with its own receipt.",
  },
  {
    question: "How much does a project pay?",
    answer:
      "Each assigned offer states the doer payout before you accept it. There is no public rate card because the payout reflects the specific scope, deadline and level rules for that project.",
  },
  {
    question: "How does the money reach me?",
    answer:
      "Payouts go to your registered payout account over UPI or NEFT once the approval gate clears. Each one lands with an itemised receipt you can check against your own records.",
  },
  {
    question: "How do projects reach me?",
    answer:
      "A supervisor manually routes specific projects to vetted doers whose verified disciplines fit the task. There is no public work pool, bidding, proposal process or client search.",
  },
  {
    question: "Can I work on several projects at once?",
    answer:
      "The platform limits active projects so that delivery quality stays manageable. The current limit is shown in your dashboard and may prevent new offers while your slots are full.",
  },
  {
    question: "Do I talk to the client?",
    answer:
      "No. You work with a supervisor, who is your point of contact. The client sees only a discipline label and does not receive your name or personal details.",
  },
  {
    question: "What do you need to verify me?",
    answer:
      "Verification may require a PAN, a government photo identity document and payout details. The exact fields and retention rules are explained in the Privacy Policy before submission.",
  },
  {
    question: "What work is not allowed?",
    answer:
      "Dolancer does not accept coursework, essays, dissertations, exams, graded assignments, impersonation, plagiarism, fabrication, unauthorised cyber security work or other unlawful requests. Ask support if a task is unclear.",
  },
  {
    question: "What happens if my work needs changes?",
    answer:
      "Your supervisor explains what needs changing and you revise within the accepted task. Work outside the original scope must be raised with the supervisor before you continue.",
  },
  {
    question: "What does it cost to join?",
    answer:
      "Nothing. Joining is free and there is no fee to receive work. You earn from the projects you complete.",
  },
  {
    question: "Must I accept every project?",
    answer:
      "No. Every offer shows its task, deadline and payout before you decide. Take what fits your skills and schedule and skip the rest.",
  },
  {
    question: "What is the verification and training step?",
    answer:
      "A quick identity check plus a short skills walkthrough of about 25 minutes. It makes you a trusted doer and teaches you how the platform works. It is built to get you ready, not to slow you down.",
  },
];

/** Existing proof sections are intentionally left unchanged until the evidence review. */
export interface Testimonial {
  quote: string;
  name: string;
  discipline: string;
}

export const TESTIMONIALS: Testimonial[] = [];

export const CONTACT = {
  email: "support@dolancer.in",
  grievanceEmail: "grievance@dolancer.in",
  hours: "24 hours a day, 7 days a week",
  company: "Dolancer",
  jurisdiction: "Punjab, India",
} as const;
