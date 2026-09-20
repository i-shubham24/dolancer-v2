import { CineHero } from "./cine/CineHero";
import { SectionTicker } from "./SectionTicker";
import { DisciplineJourney } from "./cine/DisciplineJourney";
import { OfferStage } from "./cine/OfferStage";
import { StickySteps } from "./StickySteps";
import { FitQuiz } from "./cine/FitQuiz";
import { StatsBand, ReceiptsBand, useRefreshOnLoad } from "./cine/ProofBands";
import { SafetySection } from "./SafetySection";
import { FinalCta } from "./FinalCta";

const WORKFLOW_STEPS = [
  {
    n: "01",
    title: "Join and create a profile",
    body: "Tell us what you can do, and how to reach you.",
  },
  {
    n: "02",
    title: "Find a suitable opportunity",
    body: "Get briefs that match your profile. No names, no bidding.",
  },
  {
    n: "03",
    title: "Review requirements and terms",
    body: "Read the full brief first. Scope, pay, deadline, everything.",
  },
  {
    n: "04",
    title: "Complete the work safely",
    body: "Do the work as briefed. Your supervisor is one message away.",
  },
  {
    n: "05",
    title: "Submit work and track status",
    body: "Submit your work and track it all the way to payout.",
  },
  {
    n: "06",
    title: "Receive payout per disclosed terms",
    body: "The payout lands per the brief terms.",
  },
];

const WORKFLOW_IMAGES = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
];

export function LandingPage() {
  useRefreshOnLoad();
  return (
    <div className="bg-[#0A1912]">
      <CineHero />
      <SectionTicker />
      <DisciplineJourney />
      <OfferStage />
      <section id="workflow" className="border-t border-white/15 bg-[#0A1912] py-16 md:py-24 scroll-mt-16">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <StickySteps
            dark
            kicker="How Dolancer works"
            title="From join to payout, in the open."
            steps={WORKFLOW_STEPS}
            images={WORKFLOW_IMAGES}
          />
        </div>
      </section>
      <FitQuiz />
      <StatsBand />
      <ReceiptsBand />
      <div className="bg-bone">
        <SafetySection />
      </div>
      <div className="bg-bone">
        <FinalCta />
      </div>
    </div>
  );
}
