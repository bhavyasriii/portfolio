const impactItems = [
  {
    metric: "Fewer surprise charges",
    text: "Upcoming renewals are surfaced before payment, helping users avoid unexpected subscription deductions.",
  },
  {
    metric: "Better financial clarity",
    text: "AI insights translate spending patterns into simple explanations instead of raw transaction data.",
  },
  {
    metric: "More confident decisions",
    text: "Optimization suggestions help users decide whether to cancel, pause, downgrade, or keep a subscription.",
  },
];

const Impact = () => {
  return (
    <section className="w-full bg-[#0B1120] px-6 py-24 text-white md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400">
          Expected Impact
        </p>

        <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
          Helping users move from passive tracking to proactive money management.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {impactItems.map((item, index) => (
            <div
              key={item.metric}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.3)]"
            >
              <p className="mb-4 text-sm font-semibold text-blue-300">
                0{index + 1}
              </p>

              <h3 className="text-xl font-semibold text-white">
                {item.metric}
              </h3>

              <p className="mt-4 leading-relaxed text-slate-300">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;