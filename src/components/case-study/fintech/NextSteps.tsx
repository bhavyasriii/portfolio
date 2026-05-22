const steps = [
  {
    title: "Usage-Based Insights",
    text: "Integrate real usage data to detect underused subscriptions and improve accuracy of recommendations.",
  },
  {
    title: "Smart Alerts & Reminders",
    text: "Allow users to customize alerts for renewals, spending thresholds, and unusual patterns.",
  },
  {
    title: "Bank Integration",
    text: "Connect with real financial accounts to automatically track subscriptions and spending behavior.",
  },
  {
    title: "Automated Actions",
    text: "Enable one-tap or automated cancellation and plan changes for supported services.",
  },
];

const NextSteps = () => {
  return (
    <section className="w-full bg-[#070B16] px-6 py-24 text-white md:px-12">
      <div className="mx-auto max-w-6xl">

        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400">
          Next Steps
        </p>

        <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
          Expanding the system into a fully intelligent financial assistant.
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
          This concept focuses on improving awareness and decision-making. Future iterations would aim to automate actions, personalize insights, and integrate deeper financial data.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {steps.map((item, index) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.3)]"
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

export default NextSteps;