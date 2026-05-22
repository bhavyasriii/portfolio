import React from "react";

const screens = [
  {
    title: "01 - Home Dashboard",
    image: "/case-studies/fintech/lofi-home.png",
    text: "Explored how users view balance, transactions, and AI insights in one place.",
  },
  {
    title: "02 - Spending Insights",
    image: "/case-studies/fintech/lofi-insights.png",
    text: "Tested how spending breakdown and insights could be presented clearly.",
  },
  {
    title: "03 - Subscriptions",
    image: "/case-studies/fintech/lofi-subscriptions.png",
    text: "Focused on renewals, alerts, and quick action buttons for subscriptions.",
  },
  {
    title: "04 - Optimize",
    image: "/case-studies/fintech/lofi-optimize.png",
    text: "Refined the user flow and interactions based on feedback and testing.",
  }
];

const LowFiWireframes: React.FC = () => {
  return (
    <section className="w-full bg-[#070B16] px-6 py-24 text-white md:px-12">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400">
          Low-Fidelity Wireframes
        </p>

        <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
          Exploring the core experience before visual design.
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
          At this stage, the focus was on structure, defining how users move from
          awareness to insights, and finally to subscription decisions.
        </p>

        {/* Screens Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {screens.map((screen) => (
            <div
              key={screen.title}
              className="rounded-[32px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:scale-[1.02] transition-all duration-300"
            >
              <img
                src={screen.image}
                alt={screen.title}
                className="w-full rounded-[24px]"
              />

              <h3 className="mt-6 text-xl font-semibold text-white">
                {screen.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {screen.text}
              </p>
            </div>
          ))}
        </div>

        {/* Insight Box */}
        <div className="mt-12 rounded-[28px] border border-blue-400/20 bg-blue-500/10 p-6">
          <h3 className="text-xl font-semibold text-white">Key Design Insight</h3>
          <p className="mt-3 leading-relaxed text-slate-300">
            Users don’t just need financial data, they need guidance. The early
            wireframes revealed that a clear journey from awareness to action is
            critical for helping users confidently manage subscriptions.
          </p>
        </div>

      </div>
    </section>
  );
};

export default LowFiWireframes;