import React from "react";

const screens = [
  {
    title: "01 - Home Dashboard",
    image: "/case-studies/fintech/midfi-home.png",
    text: "Refined the dashboard hierarchy with clearer balance, transaction, insight, and renewal sections.",
  },
  {
    title: "02 - Spending Insights",
    image: "/case-studies/fintech/midfi-insights.png",
    text: "Improved chart placement, insight grouping, and suggestion visibility for easier scanning.",
  },
  {
    title: "03 - Subscriptions",
    image: "/case-studies/fintech/midfi-subscriptions.png",
    text: "Structured renewal cards with clearer labels, prices, due states, and action buttons.",
  },
  {
    title: "04 - Optimize",
    image: "/case-studies/fintech/midfi-optimize.png",
    text: "Optimized recommendations and decision flow for better user engagement.",
  },
];

const MidFiScreens: React.FC = () => {
  return (
    <section className="w-full bg-[#0B1120] px-6 py-24 text-white md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400">
          Mid-Fidelity Screens
        </p>

        <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
          Refining hierarchy, grouping, and decision clarity.
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
          Mid-fidelity exploration focused on improving structure before visual polish:
          clearer card systems, stronger CTA placement, and a more guided subscription
          decision flow.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {screens.map((screen) => (
            <div
              key={screen.title}
              className="rounded-[32px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-[1.02]"
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

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-semibold text-white">What improved</h3>
            <p className="mt-3 leading-relaxed text-slate-300">
              Stronger hierarchy, clearer subscription grouping, better CTA placement,
              and reduced clutter across key decision points.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-semibold text-white">Why mid-fi mattered</h3>
            <p className="mt-3 leading-relaxed text-slate-300">
              It helped validate the product flow before final styling, ensuring the
              experience felt guided rather than just visually attractive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MidFiScreens;