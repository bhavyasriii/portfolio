import React from "react";

const ExperienceComparisonSection: React.FC = () => {
  return (
    <section className="w-full bg-gray-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* SECTION HEADER */}
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-600">
            Experience Transformation
          </p>

          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-gray-900">
            From confusion to guided clarity
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            By comparing the current fragmented experience with the redesigned
            guided flow, the goal was to reduce cognitive load, simplify
            decisions, and improve user confidence throughout the journey.
          </p>
        </div>

        {/* BEFORE vs AFTER */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* BEFORE */}
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-red-700">
              Before (Existing Experience)
            </h3>

            <ul className="mt-6 space-y-4 text-gray-700 leading-7">
              <li>
                • Fragmented navigation and unclear medical categories
              </li>
              <li>
                • Users forced to manually search for the right specialist
              </li>
              <li>
                • Overwhelming choices without guidance
              </li>
              <li>
                • High cognitive load and uncertainty
              </li>
              <li>
                • Increased chances of incorrect bookings
              </li>
            </ul>
          </div>

          {/* AFTER */}
          <div className="rounded-3xl border border-green-200 bg-green-50 p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-green-700">
              After (Redesigned Experience)
            </h3>

            <ul className="mt-6 space-y-4 text-gray-700 leading-7">
              <li>
                • Guided symptom-based flow reduces guesswork
              </li>
              <li>
                • Step-by-step interaction simplifies decision-making
              </li>
              <li>
                • Intelligent recommendations match users to specialists
              </li>
              <li>
                • Reduced cognitive load and clearer navigation
              </li>
              <li>
                • Higher confidence and successful booking completion
              </li>
            </ul>
          </div>
        </div>

        {/* HOW MIGHT WE */}
        <div className="mt-16 rounded-[2rem] border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            How Might We
          </p>

          <h3 className="mt-4 text-2xl md:text-3xl font-bold text-gray-900">
            Framing the design challenge
          </h3>

          <ul className="mt-6 space-y-4 text-lg text-gray-700 leading-8">
            <li>
              • How might we help patients identify the right specialist based on their symptoms?
            </li>
            <li>
              • How might we simplify appointment booking to reduce cognitive effort?
            </li>
            <li>
              • How might we guide users with clarity and confidence at each step?
            </li>
            <li>
              • How might we design a system that builds trust in automated recommendations?
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default ExperienceComparisonSection;