import React from "react";
import journeyImage from "../../../assets/case-studies/healthcare-booking/journey/current-experience-map.png";

const JourneySection: React.FC = () => {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="border-t border-gray-200 pt-16">
          <div className="max-w-3xl">
            <p className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-blue-600">
              Current Experience
            </p>

            <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-gray-900">
              Rajesh’s current booking journey reveals friction across the entire portal.
            </h2>

            <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600">
              Mapping Rajesh’s end-to-end interaction helped surface where the
              experience breaks down most: unclear specialist selection,
              overwhelming choices, repeated inputs, and weak confirmation
              clarity.
            </p>
          </div>

          <div className="mt-10 rounded-[2rem] border border-gray-200 bg-gray-50 p-4 md:p-6 shadow-sm">
            <img
              src={journeyImage}
              alt="Rajesh current booking journey map"
              className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm"
            />
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                Where users struggle
              </h3>

              <ul className="mt-5 space-y-4 text-base leading-7 text-gray-600">
                <li>• Users are unsure which specialist best matches their symptoms.</li>
                <li>• Provider and time-slot selection feels overwhelming without guidance.</li>
                <li>• Medical terminology introduces hesitation and fear of choosing incorrectly.</li>
                <li>• Repeated steps and fragmented flows increase effort before completion.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                Why this matters
              </h3>

              <ul className="mt-5 space-y-4 text-base leading-7 text-gray-600">
                <li>• Decision anxiety increases as users move through the journey.</li>
                <li>• Incorrect bookings become more likely when terminology is unclear.</li>
                <li>• Trust drops when the system does not reassure users after booking.</li>
                <li>• Friction at multiple stages raises the chance of abandonment.</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-[2rem] border border-amber-100 bg-amber-50/70 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-700">
              Key Journey Insight
            </p>

            <p className="mt-3 text-lg md:text-xl leading-8 text-gray-800">
              The biggest issue was not a single broken screen — it was the
              cumulative effect of uncertainty at every stage. Rajesh needed a
              guided path that reduced cognitive load and increased confidence
              from symptom entry to final confirmation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;