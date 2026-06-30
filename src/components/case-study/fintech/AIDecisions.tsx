import React from "react";

const flowSteps = [
  {
    number: "01",
    title: "Subscription Data",
    text: "Pricing, plans, renewal dates, and recurring payment details.",
  },
  {
    number: "02",
    title: "Usage Behavior",
    text: "Frequency, last active date, and overall engagement pattern.",
  },
  {
    number: "03",
    title: "AI Decision Engine",
    text: "Analyzes cost, usage, renewal timing, and potential savings.",
  },
  {
    number: "04",
    title: "Recommended Action",
    text: "Suggests cancel, pause, downgrade, or keep based on value.",
  },
];

const decisionRules = [
  "High cost + low usage → Cancel",
  "Low usage → Pause / Downgrade",
  "Moderate usage → Downgrade",
  "Active usage → Keep",
];

const AIDecisionLogic: React.FC = () => {
  return (
    <section className="w-full bg-[#070B16] px-6 py-24 text-white md:px-12">
      <div className="mx-auto max-w-6xl">

        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400">
          AI-Powered Decision Logic
        </p>

        <h2 className="max-w-4xl text-3xl font-semibold leading-tight md:text-5xl">
          Designing intelligent recommendations that guide users toward smarter
          subscription decisions.
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
          Instead of only visualizing financial data, the system introduces
          AI-powered logic to help users understand spending behavior and
          proactively reduce unnecessary recurring costs.
        </p>

        {/* FIX — Design decision rationale expanded */}
        <div className="mt-10 rounded-[28px] border border-blue-400/20 bg-blue-500/10 p-6 md:p-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
            Why AI — the design decision
          </p>
          <p className="text-base leading-relaxed text-slate-300 mb-4">
            Research showed that users didn't want <em>more information</em> about their
            subscriptions, they already knew they were overspending. What they wanted was
            someone to <strong className="text-white">tell them what to do about it</strong>.
          </p>
          <p className="text-base leading-relaxed text-slate-300 mb-4">
            I considered three alternatives before landing on the agent-aware pattern:
          </p>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex gap-3">
              <span className="text-red-400 flex-shrink-0">✗</span>
              <span><strong className="text-slate-300">Dashboard with charts</strong>, shows data but forces users to draw their own conclusions. Research showed this increased anxiety, not confidence.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-400 flex-shrink-0">✗</span>
              <span><strong className="text-slate-300">Alert-based system</strong>, sends renewal reminders but still leaves the action decision to the user. Doesn't reduce friction.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-400 flex-shrink-0">✓</span>
              <span><strong className="text-slate-300">Agent-aware card</strong>, surfaces one recommendation at a time with a clear action. Reduces cognitive load by making the decision for the user, while preserving their ability to override it.</span>
            </li>
          </ul>
        </div>

        <p className="mt-8 max-w-3xl leading-relaxed text-slate-300">
          The decision engine analyzes subscription activity, usage behavior,
          pricing patterns, and recurring payments to generate personalized
          recommendations. This transforms the experience from passive tracking
          into guided financial action.
        </p>

        {/* Recommendation Flow */}
        <div className="mt-16 rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md md:p-8">
          <p className="mb-6 text-sm uppercase tracking-[0.25em] text-blue-300">
            Recommendation Flow
          </p>

          <div className="grid gap-5 md:grid-cols-4">
            {flowSteps.map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-[24px] border border-white/10 bg-[#0B1120]/90 p-5"
              >
                <p className="text-sm font-semibold text-blue-300">
                  {step.number}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {step.text}
                </p>
                {index !== flowSteps.length - 1 && (
                  <div className="absolute -right-5 top-1/2 hidden h-[2px] w-10 bg-blue-400/40 md:block" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {decisionRules.map((rule) => (
              <div
                key={rule}
                className="rounded-[20px] border border-blue-400/20 bg-blue-500/10 p-4 text-sm font-medium leading-relaxed text-slate-200"
              >
                {rule}
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-400">
            The system analyzes user behavior and subscription data to generate
            actionable recommendations and highlight potential savings.
          </p>
        </div>

        {/* Supporting Sections */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-md">
            <h3 className="mb-5 text-xl font-semibold text-white">
              How the System Works
            </h3>
            <ul className="space-y-3 leading-relaxed text-slate-300">
              <li>• Subscription data: pricing, plans, and renewal dates</li>
              <li>• Usage patterns: frequency and last active date</li>
              <li>• Payment history: recurring subscription costs</li>
              <li>• Renewal timelines: upcoming payment windows</li>
            </ul>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-md">
            <h3 className="mb-5 text-xl font-semibold text-white">
              Decision Engine
            </h3>
            <ul className="space-y-3 leading-relaxed text-slate-300">
              <li>• High cost + low usage → Cancel</li>
              <li>• Low usage → Pause / Downgrade</li>
              <li>• Moderate usage → Downgrade</li>
              <li>• Active usage → Keep</li>
            </ul>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-md">
            <h3 className="mb-5 text-xl font-semibold text-white">
              Personalized Insights
            </h3>
            <p className="leading-relaxed text-slate-300">
              The system calculates potential savings across subscriptions and
              presents clear insights like:
            </p>
            <p className="mt-4 text-lg font-semibold text-blue-300">
              "You could save $48/month"
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-md">
            <h3 className="mb-5 text-xl font-semibold text-white">
              Why This Matters
            </h3>
            <p className="leading-relaxed text-slate-300">
              This shifts the experience from passive tracking to active
              financial guidance, helping users reduce unnecessary spending and
              make faster, more confident decisions.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AIDecisionLogic;
