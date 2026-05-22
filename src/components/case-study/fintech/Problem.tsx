const problem = () => {
  const problems = [
    {
      title: "Subscriptions renew silently",
      text: "Users often notice charges only after money has already been deducted.",
    },
    {
      title: "Spending patterns are hard to understand",
      text: "Transactions are visible, but they rarely explain what changed or why spending increased.",
    },
    {
      title: "Insights don’t lead to action",
      text: "Most finance apps show charts, but users still need to decide what to do next.",
    },
  ];

  return (
    <section className="w-full bg-[#070B16] px-6 py-24 text-white md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400">
          The Problem
        </p>

        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-start">
          <div>
            <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
              Users don’t just need to see spending they need help deciding what to do next.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Personal finance apps often surface balances, transactions, and charts, but they do not always help users connect those numbers to clear decisions. This creates a gap between awareness and action.
            </p>
          </div>

          <div className="grid gap-5">
            {problems.map((item, index) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-md"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15 text-sm font-semibold text-blue-300">
                  0{index + 1}
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 leading-relaxed text-slate-300">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-[32px] border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-300">
            Design challenge
          </p>

          <h3 className="mt-4 max-w-4xl text-2xl font-semibold leading-tight md:text-4xl">
            How might we help users recognize unnecessary recurring costs and take confident action before renewals happen?
          </h3>
        </div>
      </div>
    </section>
  );
};

export default problem;