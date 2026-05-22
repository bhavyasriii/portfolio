import React from "react";

const personas = [
  {
    type: "Primary Persona",
    name: "Maya Patel",
    role: "Graduate student • 24 • Uses multiple subscriptions",
    image: "/case-studies/fintech/maya.png",
    quote:
      "I don’t realize how much I’m spending until the money is already gone.",
    bio:
      "Maya uses several subscriptions for streaming, learning, fitness, and productivity. She wants to manage her money better but often forgets renewal dates and only notices charges after they happen.",
    goals: [
      "Track active subscriptions in one place",
      "Understand where recurring money is going",
      "Get reminders before renewals happen",
      "Save money without manually checking every app",
    ],
    frustrations: [
      "Forgets about small monthly charges",
      "Feels overwhelmed by transaction lists",
      "Doesn’t know what to cancel or keep",
      "Notices charges only after payment",
    ],
  },
  {
    type: "Secondary Persona",
    name: "Daniel Kim",
    role: "Young professional • 29 • Budget-conscious user",
    image: "/case-studies/fintech/daniel.png",
    quote:
      "I want clear suggestions, not just charts that I still have to interpret.",
    bio:
      "Daniel checks his spending occasionally but does not want to spend time analyzing every transaction. He prefers quick, actionable recommendations that help him reduce unnecessary costs.",
    goals: [
      "See simple spending insights",
      "Identify low-value subscriptions",
      "Make quick cancel, pause, or downgrade decisions",
      "Stay in control without extra effort",
    ],
    frustrations: [
      "Charts do not clearly explain what to do",
      "Unsure if canceling a subscription is worth it",
      "Too many finance apps feel complicated",
      "Needs confidence before taking action",
    ],
  },
];

const Research: React.FC = () => {
  return (
    <section className="w-full bg-[#070B16] px-6 py-24 text-white md:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400">
          Research & Insights
        </p>

        <h2 className="mb-6 max-w-4xl text-3xl font-semibold leading-tight md:text-5xl">
          Understanding how users manage subscriptions and financial decisions.
        </h2>

        <p className="mb-16 max-w-2xl text-lg leading-relaxed text-slate-300">
          Research focused on identifying behavioral patterns, frustrations, and
          decision-making challenges users face while tracking subscriptions and
          recurring expenses.
        </p>

        <div className="mb-28">
          <h3 className="mb-8 text-2xl font-semibold">Personas</h3>

          <div className="space-y-10">
            {personas.map((persona) => (
              <div
                key={persona.name}
                className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-md md:p-8"
              >
                <div className="grid gap-8 md:grid-cols-[260px_1fr]">
                  <div>
                    <img
                      src={persona.image}
                      alt={persona.name}
                      className="h-[260px] w-full rounded-[28px] object-cover"
                    />

                    <div className="mt-5 rounded-[24px] border border-white/10 bg-[#0B1120]/80 p-5">
                      <p className="text-xs uppercase tracking-[0.25em] text-blue-300">
                        {persona.type}
                      </p>

                      <h4 className="mt-3 text-xl font-semibold text-white">
                        {persona.name}
                      </h4>

                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        {persona.role}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xl italic leading-relaxed text-white md:text-2xl">
                      “{persona.quote}”
                    </p>

                    <p className="mt-5 max-w-3xl leading-relaxed text-slate-300">
                      {persona.bio}
                    </p>

                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                      <div className="rounded-[24px] border border-emerald-400/20 bg-emerald-500/10 p-5">
                        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-emerald-300">
                          Goals
                        </p>

                        <ul className="space-y-3 text-sm leading-relaxed text-slate-200">
                          {persona.goals.map((goal) => (
                            <li key={goal}>• {goal}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-[24px] border border-red-400/20 bg-red-500/10 p-5">
                        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-red-300">
                          Frustrations
                        </p>

                        <ul className="space-y-3 text-sm leading-relaxed text-slate-200">
                          {persona.frustrations.map((frustration) => (
                            <li key={frustration}>• {frustration}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[28px] border border-blue-400/20 bg-blue-500/10 p-6">
            <h4 className="text-xl font-semibold text-white">Key Takeaways</h4>
            <p className="mt-3 leading-relaxed text-slate-300">
              Users need more than financial visibility, they need timely
              reminders, simplified insights, and clear recommendations that help
              them confidently reduce unnecessary subscription costs.
            </p>
          </div>
        </div>

        <div className="mb-28">
          <h3 className="mb-6 text-2xl font-semibold">Affinity Mapping</h3>

          <img
            src="/case-studies/fintech/affinity.png"
            alt="Affinity Mapping"
            className="w-full rounded-[28px] border border-white/10 shadow-[0_28px_90px_rgba(0,0,0,0.35)]"
          />

          <p className="mt-6 max-w-3xl leading-relaxed text-slate-400">
            Key patterns revealed that users struggle with awareness, feel
            overwhelmed by financial data, hesitate to take action, and lack
            clear guidance when managing subscriptions.
          </p>
        </div>

        <div className="mb-28">
          <h3 className="mb-6 text-2xl font-semibold">Card Sorting</h3>

          <img
            src="/case-studies/fintech/cardsorting.png"
            alt="Card Sorting"
            className="w-full rounded-[28px] border border-white/10 shadow-[0_28px_90px_rgba(0,0,0,0.35)]"
          />

          <p className="mt-6 max-w-3xl leading-relaxed text-slate-400">
            Users naturally grouped financial features into five key areas:
            money overview, insights & planning, subscription tracking, alerts &
            reminders, and action-based optimization. This informed the app’s
            navigation structure.
          </p>
        </div>

        <div>
          <h3 className="mb-6 text-2xl font-semibold">User Journey</h3>

          <img
            src="/case-studies/fintech/journey.png"
            alt="User Journey"
            className="w-full rounded-[28px] border border-white/10 shadow-[0_28px_90px_rgba(0,0,0,0.35)]"
          />

          <p className="mt-6 max-w-3xl leading-relaxed text-slate-400">
            The journey highlights how users move from initial awareness to
            decision-making, revealing key moments of confusion and opportunities
            for guided financial actions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Research;