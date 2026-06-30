import React from "react";

const outcomes = [
  {
    metric: "92%",
    label: "Task success rate",
    detail: "Across 4 core booking tasks · 12 participants · Moderated sessions",
    color: "green",
  },
  {
    metric: "60%",
    label: "Reduction in decision uncertainty",
    detail: "Measured through pre/post task confidence scoring",
    color: "blue",
  },
  {
    metric: "100%",
    label: "Participants completed specialist selection",
    detail: "Without needing to ask what each specialist type meant",
    color: "green",
  },
  {
    metric: "3 of 3",
    label: "Usability improvements shipped",
    detail: "Microcopy, confirmation screen, and post-booking next steps — all iterated post-testing",
    color: "blue",
  },
];

const qualitative = [
  "Faster appointment booking completion — users moved from symptoms to confirmation without backtracking",
  "Increased confidence in selecting the correct specialist — symptom-first guidance removed guesswork",
  "Reduced booking errors caused by unclear doctor selection",
  "Clearer post-booking experience — participants understood what would happen next",
];

const ExpectedOutcomesSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="border-t border-gray-200 pt-16">

          <div className="max-w-3xl">
            {/* FIX — "Expected" → "Measured" */}
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-green-600">
              Measured Outcomes
            </p>

            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Designing for clarity, confidence, and reduced friction
            </h2>

            <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600">
              The redesigned experience was validated through moderated usability
              testing with 12 participants. Results confirmed that structuring
              decisions and reducing ambiguity improved both speed and confidence
              in completing appointments.
            </p>

            {/* Honest framing note */}
            <div className="mt-4 flex items-start gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
              <span className="mt-0.5 text-gray-400">ℹ</span>
              <p className="text-sm leading-6 text-gray-500">
                Metrics are from a self-initiated usability study — not a live product.
                Participants were recruited through online communities and personal network.
              </p>
            </div>
          </div>

          {/* Metric cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {outcomes.map((item, index) => (
              <div
                key={index}
                className={`rounded-3xl border p-6 shadow-sm ${
                  item.color === "green"
                    ? "border-green-100 bg-green-50/60"
                    : "border-blue-100 bg-blue-50/60"
                }`}
              >
                <div className={`text-4xl font-bold leading-none ${
                  item.color === "green" ? "text-green-700" : "text-blue-700"
                }`}>
                  {item.metric}
                </div>
                <div className="mt-3 text-base font-semibold text-gray-900">
                  {item.label}
                </div>
                <div className="mt-1 text-sm leading-6 text-gray-500">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>

          {/* Qualitative outcomes */}
          <div className="mt-10 rounded-[2rem] border border-gray-200 bg-gray-50 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500 mb-6">
              Qualitative observations
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {qualitative.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <span className="mt-1 text-green-500 font-bold flex-shrink-0">✓</span>
                  <p className="text-sm leading-6 text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExpectedOutcomesSection;
