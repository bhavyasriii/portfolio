const Opportunity = () => {
  const opportunities = [
    "Detect recurring payments before they become surprise charges",
    "Translate spending data into clear, human-readable insights",
    "Recommend practical actions like remind, pause, downgrade, or cancel",
  ];

  return (
    <section className="w-full bg-[#0B1120] px-6 py-24 text-white md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400">
          Opportunity
        </p>

        <div className="grid gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
              From passive tracking to proactive financial guidance.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              The opportunity was to move beyond showing numbers and design an experience that helps users understand what changed, why it matters, and what they can do next.
            </p>
          </div>

          <div className="rounded-[36px] border border-blue-400/20 bg-gradient-to-br from-[#10213A] to-[#0B1220] p-6 shadow-[0_28px_90px_rgba(37,99,235,0.12)]">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
                Product shift
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-slate-400">Before</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    “Here is what you spent.”
                  </p>
                </div>

                <div className="h-px bg-white/10" />

                <div>
                  <p className="text-blue-300">After</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    “Here is what changed and how you can save.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {opportunities.map((item, index) => (
            <div
              key={item}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="mb-4 text-sm font-semibold text-blue-300">
                0{index + 1}
              </p>
              <p className="text-lg font-medium leading-relaxed text-slate-100">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Opportunity;