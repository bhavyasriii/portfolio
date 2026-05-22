import React from "react";

const SmartTriageLogicSection: React.FC = () => {
  return (
    <section className="w-full bg-gray-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="border-t border-gray-200 pt-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-600">
              Smart Triage Logic
            </p>

            <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-gray-900">
              A symptom-based triage model reduced decision fatigue during booking.
            </h2>

            <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600">
              Instead of asking patients to search through doctor lists, the
              interface interprets symptom selections and recommends an
              appropriate specialist. This creates a more guided path while
              still allowing users to explore alternatives if they prefer.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-8 items-start">
            <div className="rounded-[2rem] border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                Design decision
              </p>

              <p className="mt-4 text-base md:text-lg leading-8 text-gray-700">
                To reduce cognitive load, the booking flow uses symptom-based
                triage rather than manual provider search. This shifts the
                system from a directory-style experience to a guided
                recommendation experience.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-5">
                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
                    Input
                  </p>
                  <p className="mt-2 text-base leading-7 text-gray-800">
                    Patient selects: <span className="font-medium">Head &amp; Neck</span> +{" "}
                    <span className="font-medium">Sore Throat</span>
                  </p>
                </div>

                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
                    Processing
                  </p>
                  <p className="mt-2 text-base leading-7 text-gray-800">
                    The system maps the selected symptoms to relevant medical
                    specialties.
                  </p>
                </div>

                <div className="rounded-3xl border border-green-100 bg-green-50/70 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-green-700">
                    Result
                  </p>
                  <p className="mt-2 text-base leading-7 text-gray-800">
                    ENT specialists are recommended as the most appropriate
                    providers, while still allowing the user to view alternatives.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-blue-100 bg-blue-50/70 p-6 md:p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
                Why this mattered
              </p>

              <ul className="mt-5 space-y-4 text-base md:text-lg leading-8 text-gray-800">
                <li>• Reduced uncertainty for users who do not know which specialist to choose</li>
                <li>• Improved booking accuracy through symptom-driven guidance</li>
                <li>• Lowered decision fatigue by narrowing irrelevant options</li>
                <li>• Preserved flexibility by allowing users to explore alternative specialists</li>
              </ul>

              <div className="mt-8 rounded-3xl border border-white/70 bg-white/70 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
                  UX takeaway
                </p>
                <p className="mt-2 text-base leading-7 text-gray-800">
                  The triage logic turns a stressful search task into a guided
                  decision, helping patients move forward with more confidence
                  and less guesswork.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartTriageLogicSection;