import { CineHero } from "./cine/CineHero";
import { StatsBand, ReceiptsBand, useRefreshOnLoad } from "./cine/ProofBands";
import { SampleStories } from "./cine/SampleStories";
import { OperatorBand } from "./cine/OperatorBand";
import { SectionTicker } from "./SectionTicker";
import { DisciplineJourney } from "./cine/DisciplineJourney";
import { PayoutPromise } from "./cine/PayoutPromise";
import { OfferStage } from "./cine/OfferStage";
import { StickySteps } from "./StickySteps";
import { FitQuiz } from "./cine/FitQuiz";
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
    title: "Find work that fits",
    body: "Get tasks that match your profile. No names, no bidding.",
  },
  {
    n: "03",
    title: "Read the terms",
    body: "Read the full task first. Scope, pay, deadline, everything.",
  },
  {
    n: "04",
    title: "Complete the work safely",
    body: "Do the work as assigned. Your supervisor is one message away.",
  },
  {
    n: "05",
    title: "Submit work and track status",
    body: "Submit your work and track it all the way to payout.",
  },
  {
    n: "06",
    title: "Get paid",
    body: "The payout lands per the task terms.",
  },
];

const WORKFLOW_IMAGES = [
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
];

export function LandingPage() {
  useRefreshOnLoad();
  return (
    <div className="bg-[#0A1912]">
      <CineHero />
      <PayoutPromise />
      <SectionTicker />
      <DisciplineJourney />
      <OfferStage />
      <section id="workflow" className="border-t border-white/15 bg-[#0A1912] py-16 md:py-24 scroll-mt-16">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <StickySteps
            dark
            kicker="How Dolancer works"
            title="From joining to payout."
            steps={WORKFLOW_STEPS}
            images={WORKFLOW_IMAGES}
          />
        </div>
      </section>
      <StatsBand />
      <ReceiptsBand />
      <SampleStories />
      <FitQuiz />
      <div className="bg-bone">
        <SafetySection />
      </div>
      <OperatorBand />
      <div className="bg-bone">
        <FinalCta />
      </div>
    </div>
  );
}
