import React from "react";

const strategyCards = [
  {
    title: "Guided consultation selection",
    description:
      "Use symptom-based entry and contextual recommendations to help patients choose the right specialist with less uncertainty.",
  },
  {
    title: "Progressive, step-based flow",
    description:
      "Break booking into clear stages with visible progress so users can focus on one decision at a time.",
  },
  {
    title: "Smart defaults and reduced repetition",
    description:
      "Pre-fill known patient information and remove redundant inputs to streamline the experience.",
  },
  {
    title: "Clear confirmation and editable summary",
    description:
      "Provide a transparent review step with easy edits so users feel confident before submitting.",
  },
  {
    title: "Accessible and responsive interaction",
    description:
      "Design for legibility, touch comfort, and consistent usability across devices and ability levels.",
  },
];

const DesignStrategySection: React.FC = () => {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="border-t border-gray-200 pt-16">
          <div className="max-w-3xl">
            <p className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-blue-600">
              Design Strategy
            </p>

            <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-gray-900">
              Turning research into design decisions
            </h2>

            <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600">
              Based on recurring breakdowns across Rajesh’s journey, five core
              focus areas guided the redesign. These principles translated user
              pain points into clear interaction and interface decisions.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategyCards.slice(0, 4).map((card, index) => (
              <div
                key={index}
                className="rounded-[2rem] border border-gray-200 bg-gray-50 p-6 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-2xl md:text-3xl font-bold leading-tight text-gray-900">
                  {card.title}
                </h3>

                <p className="mt-5 text-base md:text-lg leading-8 text-gray-600">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 max-w-3xl">
            <div className="rounded-[2rem] border border-gray-200 bg-gray-50 p-6 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <h3 className="text-2xl md:text-3xl font-bold leading-tight text-gray-900">
                {strategyCards[4].title}
              </h3>

              <p className="mt-5 text-base md:text-lg leading-8 text-gray-600">
                {strategyCards[4].description}
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-[2rem] border border-blue-100 bg-blue-50/70 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              Transition to Solution
            </p>

            <p className="mt-3 text-lg md:text-xl leading-8 text-gray-800">
              These principles shaped the final booking experience — from guided
              symptom input and specialist recommendation to review, editable
              confirmation, and a more accessible mobile flow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignStrategySection;