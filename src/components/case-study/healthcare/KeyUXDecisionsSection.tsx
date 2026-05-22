import React from "react";

const decisions = [
  {
    title: "Guided consultation selection",
    description:
      "Many patients are unsure which type of appointment they need. The flow begins by asking what brings them in today, offering options such as general checkups, new health concerns, follow-ups, or prescription refills.",
  },
  {
    title: "Symptom-based specialist recommendation",
    description:
      "Instead of requiring patients to manually search for specialists, the system interprets selected symptoms and recommends the most relevant doctor. This reduces confusion and improves booking accuracy.",
  },
  {
    title: "Multi-select symptom input",
    description:
      "Patients often experience multiple symptoms at once. Allowing users to select more than one symptom gives the recommendation system better context and supports more accurate guidance.",
  },
  {
    title: "Progressive appointment scheduling",
    description:
      "Users first select a date and then choose from available time slots. The continue button activates only after a time slot is selected, preventing incomplete bookings and making the interaction more predictable.",
  },
];

const KeyUXDecisionsSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="border-t border-gray-200 pt-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-600">
              Key UX Decisions
            </p>

            <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-gray-900">
              Interaction choices were designed to reduce uncertainty at every step.
            </h2>

            <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600">
              These decisions translated research findings into concrete
              interaction patterns. Each one was aimed at reducing cognitive
              load, improving confidence, and helping patients move through the
              booking journey with more clarity.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {decisions.map((item, index) => (
              <div
                key={index}
                className="rounded-[2rem] border border-gray-200 bg-gray-50 p-6 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                    0{index + 1}
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>

                <p className="mt-5 text-base md:text-lg leading-8 text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyUXDecisionsSection;