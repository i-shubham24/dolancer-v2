import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const STEPS = [
  { q: "What do you like doing most?", options: ["Write words", "Design visuals", "Cut audio and video", "Build and ship", "Check and secure", "Research and analyze"] },
  { q: "How do you want to be guided?", options: ["Solo with a clear brief", "Checkpoints plus support", "Close review"] },
  { q: "How much effort per task?", options: ["Under 3 hours", "3 to 5 hours", "5 hours plus"] },
  { q: "What must be visible upfront?", options: ["Scope", "Payout terms", "Review path"] },
];

const RESULT: Record<string, { discipline: string; brief: string }> = {
  "Write words": { discipline: "Words and storytelling", brief: "Turn writing skill into paid work: articles, copy, scripts and research." },
  "Design visuals": { discipline: "Visual and brand design", brief: "Make brands look sharp: logos, identities, layouts and interfaces." },
  "Cut audio and video": { discipline: "Audio, video and motion", brief: "Bring stories to life: editing, animation, voiceover and sound." },
  "Build and ship": { discipline: "Code and engineering", brief: "Build and ship: websites, apps, automations and integrations." },
  "Check and secure": { discipline: "Security and systems", brief: "Keep things safe: audits, testing, hardening and compliance." },
  "Research and analyze": { discipline: "Research, data and strategy", brief: "Make sense of it all: analysis, reports, research and planning." },
};

export function FitQuiz() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const done = step >= STEPS.length;
  const result = done ? RESULT[answers[0] ?? "Write words"] ?? RESULT["Write words"]! : null;
  const current = STEPS[Math.min(step, STEPS.length - 1)]!;

  function pick(opt: string) {
    setAnswers((a) => [...a, opt]);
    setStep((s) => s + 1);
  }

  function back() {
    setAnswers((a) => a.slice(0, -1));
    setStep((s) => Math.max(0, s - 1));
  }

  function reset() {
    setAnswers([]);
    setStep(0);
  }

  return (
    <section id="quiz" className="border-t-2 border-ink bg-bone py-16 md:py-24 scroll-mt-16">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Find your fit · 04 questions</p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.02em] text-ink">
            Four questions. One direction.
          </h2>
          <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-ink-2 md:text-base">
            No account needed. Answer four questions and we will point you at work that fits.
          </p>
          {!done ? (
            <p className="mt-6 font-mono text-xs tracking-[0.18em] text-ink-3">
              Q{Math.min(step + 1, 4)}/04
            </p>
          ) : null}
        </div>

        <div className="lg:col-span-7">
          <div className="border-2 border-ink bg-field">
            <div className="h-[3px] bg-ink/15">
              <div
                className="h-full bg-primary"
                style={{ width: `${(Math.min(step, 4) / 4) * 100}%`, transition: reduce ? "none" : "width 0.45s cubic-bezier(0.16,1,0.3,1)" }}
              />
            </div>
            <div className="p-6 md:p-10">
              <AnimatePresence mode="wait" initial={false}>
                {!done ? (
                  <motion.div
                    key={step}
                    initial={reduce ? false : { opacity: 0, x: 44 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduce ? undefined : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h3 className="font-display text-2xl font-extrabold text-ink md:text-3xl">{current.q}</h3>
                    <div className="mt-6 grid gap-2.5">
                      {current.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => pick(opt)}
                          className="flex items-center justify-between border border-ink/30 bg-transparent px-5 py-4 text-left font-semibold text-ink active:scale-[0.99]"
                        >
                          {opt}
                          <span aria-hidden="true" className="font-mono text-primary">0{current.options.indexOf(opt) + 1}</span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={back}
                        disabled={step === 0}
                        className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2 disabled:text-ink/20"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={reset}
                        className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3"
                      >
                        Reset
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Your direction</p>
                    <p className="mt-3 font-display text-3xl font-extrabold leading-tight text-ink md:text-4xl">
                      {result?.discipline}
                    </p>
                    <p className="mt-2 max-w-md text-sm text-ink-2 md:text-base">{result?.brief}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {answers.map((a, i) => (
                        <span key={i} className="border border-ink/25 px-3 py-1.5 text-xs text-ink-2">
                          {a}
                        </span>
                      ))}
                    </div>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <Link to="/sign-up" className="flex-1 bg-primary py-3.5 text-center font-extrabold text-white">
                        Join free
                      </Link>
                      <button
                        type="button"
                        onClick={reset}
                        className="flex-1 border-2 border-ink py-3.5 font-extrabold text-ink"
                      >
                        Retake
                      </button>
                    </div>
                    <p className="mt-4 text-xs leading-relaxed text-ink-3">
                      Example format. Full scope, effort, eligibility, and payment conditions appear in the brief
                      before you accept.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
