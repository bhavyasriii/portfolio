

const screens = [
  {
    title: "01 - Home",
    subtitle: "Awareness",
    text: "A glanceable dashboard surfaces balance, recent transactions, AI spending signals, and the most urgent renewal.",
    image: "/case-studies/fintech/Home_High.png",
  },
  {
    title: "02 - AI Insights",
    subtitle: "Understanding",
    text: "Spending patterns are visualized through a donut chart and translated into simple, actionable insights.",
    image: "/case-studies/fintech/insights.png",
  },
  {
    title: "03 - Subscriptions",
    subtitle: "Control",
    text: "Upcoming renewals are grouped clearly with due-soon alerts and actions to remind or manage subscriptions.",
    image: "/case-studies/fintech/subscriptions.png",
  },
  {
    title: "04 - Optimize",
    subtitle: "Action",
    text: "AI recommendations help users cancel, pause, downgrade, or keep subscriptions based on value and usage.",
    image: "/case-studies/fintech/optimize.png",
  },
];

const ScreensShowcase = () => {
  return (
    <section className="w-full bg-[#070B16] px-6 py-28 text-white md:px-12">
      <div className="mx-auto max-w-6xl">

        {/* Section Header */}
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-blue-400">
          Final Screens
        </p>

        <h2 className="max-w-4xl text-3xl font-semibold leading-tight md:text-5xl">
          A guided experience from financial awareness to confident action.
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-slate-400">
          Each screen is designed to reduce cognitive load and progressively guide
          users toward better subscription decisions.
        </p>

        {/* Screens */}
        <div className="mt-20 space-y-32">
          {screens.map((screen, index) => (
            <div
              key={screen.title}
              className={`grid gap-12 md:grid-cols-2 md:items-center ${
                index % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              {/* TEXT */}
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-blue-300">
                  {screen.subtitle}
                </p>

                <h3 className="mt-5 text-3xl font-semibold text-white md:text-4xl">
                  {screen.title}
                </h3>

                <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-300">
                  {screen.text}
                </p>
              </div>

              {/* IMAGE */}
              <div className="relative flex justify-center">
                
                {/* Glow Layers */}
                <div className="absolute inset-0 m-auto h-[400px] w-[260px] rounded-full bg-blue-500/20 blur-[120px]" />
                <div className="absolute inset-0 m-auto h-[300px] w-[200px] rounded-full bg-purple-500/10 blur-[100px]" />

                <img
                  src={screen.image}
                  alt={screen.title}
                  className="relative z-10 w-[260px] rounded-[36px] border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-[1.03] md:w-[300px]"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ScreensShowcase;