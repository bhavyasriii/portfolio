import React from "react";

const outcomes = [
  "Faster appointment booking completion",
  "Increased confidence in selecting the correct specialist",
  "Reduced booking errors caused by unclear doctor selection",
  "A more intuitive healthcare scheduling experience",
];

const ExpectedOutcomesSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <div className="border-t border-gray-200 pt-16">

          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-green-600">
              Expected Outcomes
            </p>

            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Designing for clarity, confidence, and reduced friction
            </h2>

            <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600">
              The redesigned experience focuses on guiding patients through the
              booking journey with minimal confusion. By structuring decisions
              and reducing ambiguity, the interface aims to improve both speed
              and confidence in completing appointments.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {outcomes.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm"
              >
                <p className="text-lg text-gray-800 leading-7">
                  • {item}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExpectedOutcomesSection;