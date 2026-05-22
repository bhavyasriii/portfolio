import React from "react";

const steps = [
  "Enter Symptoms",
  "AI Recommendation",
  "Select Specialist",
  "Choose Time Slot",
  "Review Details",
  "Confirm Booking",
];

const UserFlowSection: React.FC = () => {
  return (
    <section className="w-full bg-gray-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="border-t border-gray-200 pt-16">
          {/* HEADER */}
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-600">
              User Flow
            </p>

            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-gray-900">
              A guided flow replaces fragmented booking
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Instead of forcing users to search and decide independently, the
              redesigned experience guides them step-by-step from symptoms to
              confirmation, reducing cognitive load and improving confidence.
            </p>
          </div>

          {/* FLOW VISUAL */}
          <div className="mt-16 overflow-x-auto">
            <div className="flex items-center gap-6 min-w-max">

              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  
                  {/* STEP CARD */}
                  <div className="flex flex-col items-center">
                    <div className="w-44 h-24 flex items-center justify-center text-center px-4 rounded-2xl border border-gray-200 bg-white shadow-sm font-medium text-gray-800">
                      {step}
                    </div>

                    <div className="mt-3 text-xs text-gray-400">
                      Step {index + 1}
                    </div>
                  </div>

                  {/* ARROW */}
                  {index !== steps.length - 1 && (
                    <div className="text-gray-400 text-2xl">→</div>
                  )}
                </React.Fragment>
              ))}

            </div>
          </div>

          {/* FLOW EXPLANATION */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-blue-600 uppercase">
                Start
              </p>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                Symptom-first approach
              </h3>
              <p className="mt-3 text-gray-600 text-sm leading-6">
                Users begin with symptoms instead of searching providers,
                eliminating guesswork from the start.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-blue-600 uppercase">
                Guidance
              </p>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                AI-driven narrowing
              </h3>
              <p className="mt-3 text-gray-600 text-sm leading-6">
                The system reduces decision fatigue by recommending relevant
                specialists and limiting unnecessary choices.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-blue-600 uppercase">
                Completion
              </p>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                Confident confirmation
              </h3>
              <p className="mt-3 text-gray-600 text-sm leading-6">
                A clear review step ensures users understand their booking before
                final submission.
              </p>
            </div>

          </div>

          {/* FINAL INSIGHT */}
          <div className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <p className="text-sm font-semibold text-blue-700 uppercase">
              Why this matters
            </p>

            <p className="mt-2 text-gray-800 text-base leading-7">
              This flow transforms booking from a decision-heavy process into a
              guided experience, helping users move forward with clarity,
              confidence, and reduced cognitive effort.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default UserFlowSection;