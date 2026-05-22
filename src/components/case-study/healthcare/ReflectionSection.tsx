import React from "react";

const ReflectionSection: React.FC = () => {
  return (
    <section className="w-full bg-gray-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="border-t border-gray-200 pt-16">

          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-green-600">
              SWOT Analysis
            </p>

            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Evaluating the solution from a product perspective
            </h2>

            <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600">
              A critical reflection of the solution highlights both strengths
              and limitations, while also identifying opportunities for future
              growth and external challenges.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Strengths */}
            <div className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">Strengths</h3>
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>• Intuitive triage flow simplifies specialist selection</li>
                <li>• Low friction entry without requiring early sign-up</li>
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">Weaknesses</h3>
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>• Focused mainly on new consultations (limited scenarios)</li>
                <li>• Account creation form may introduce friction</li>
              </ul>
            </div>

            {/* Opportunities */}
            <div className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">Opportunities</h3>
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>• Telehealth and video consultation integration</li>
                <li>• Wearable health data integration (Apple Health, Google Fit)</li>
              </ul>
            </div>

            {/* Threats */}
            <div className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">Threats</h3>
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>• Strict healthcare regulations (HIPAA compliance)</li>
                <li>• Competition from platforms like Zocdoc</li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ReflectionSection;