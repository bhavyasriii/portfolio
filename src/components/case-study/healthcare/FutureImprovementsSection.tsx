import React from "react";

const improvements = [
  "Telemedicine appointment scheduling",
  "AI-powered symptom chat assistant",
  "Insurance verification integration",
  "Appointment reminders and notifications",
  "Personalized doctor recommendations based on history",
];

const FutureImprovementsSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <div className="border-t border-gray-200 pt-16">

          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-green-600">
              Future Improvements
            </p>

            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Expanding the experience beyond the current scope
            </h2>

            <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600">
              Future iterations of the product can extend beyond appointment
              booking to create a more comprehensive healthcare experience,
              integrating intelligence, personalization, and continuity of care.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {improvements.map((item, index) => (
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

export default FutureImprovementsSection;