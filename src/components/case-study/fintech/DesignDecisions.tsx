const decisions = [
  {
    title: "Dark Mode for Financial Focus",
    text: "A dark interface reduces visual fatigue and allows key financial data and alerts to stand out with higher contrast.",
  },
  {
    title: "Action-First Layout",
    text: "Instead of overwhelming users with data, each screen prioritizes clear actions like remind, review, or optimize.",
  },
  {
    title: "Consistent Card System",
    text: "All information is structured into modular cards to maintain clarity, hierarchy, and predictable interaction patterns.",
  },
  {
    title: "Subtle Visual Hierarchy",
    text: "Glow, color, and elevation are used sparingly to guide attention toward important elements without overwhelming the interface.",
  },
];

const DesignDecisions = () => {
  return (
    <section className="w-full bg-[#0B1120] px-6 py-24 text-white md:px-12">
      <div className="mx-auto max-w-6xl">

        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400">
          Design Decisions
        </p>

        <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
          Thoughtful choices that balance clarity, focus, and usability.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {decisions.map((item, index) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.3)] backdrop-blur-md"
            >
              <p className="mb-3 text-sm font-semibold text-blue-300">
                0{index + 1}
              </p>

              <h3 className="text-xl font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-slate-300 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DesignDecisions;