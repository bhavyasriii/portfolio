const UserFlow = () => {
  const steps = [
    {
      label: "01",
      title: "Home",
      text: "User sees balance, recent activity, AI insight preview, and upcoming renewal alert.",
    },
    {
      label: "02",
      title: "AI Insights",
      text: "User understands spending patterns through a visual breakdown and plain-language insights.",
    },
    {
      label: "03",
      title: "Subscriptions",
      text: "User reviews upcoming renewals and sees which subscriptions need attention.",
    },
    {
      label: "04",
      title: "Optimize",
      text: "User gets AI-recommended actions to cancel, pause, downgrade, or keep subscriptions.",
    },
  ];

  return (
    <section className="w-full bg-[#0B1120] px-6 py-24 text-white md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400">
          User Flow
        </p>

        <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
          A focused journey from awareness to action.
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
          The experience was designed as a simple loop: help users notice what matters, understand why it matters, and take action before money is lost.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-[28px] border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="text-sm font-semibold text-blue-300">
                {step.label}
              </p>

              <h3 className="mt-4 text-xl font-semibold text-white">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {step.text}
              </p>

              {index !== steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-blue-400/40 md:block" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-[32px] border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 text-center">
          <p className="text-xl font-semibold text-white md:text-2xl">
            Home → AI Insights → Subscriptions → Optimize
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserFlow;