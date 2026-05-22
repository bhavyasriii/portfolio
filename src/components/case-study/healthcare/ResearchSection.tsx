import React from "react";
import rajeshImage from "../../../assets/case-studies/healthcare-booking/personas/rajesh.png";
import katherineImage from "../../../assets/case-studies/healthcare-booking/personas/katherine.png";

const insights = [
  {
    title: "Medical terminology creates confusion",
    description:
      "Users struggled to understand consultation types and provider labels, leading to hesitation and fear of selecting the wrong specialist.",
  },
  {
    title: "Too many choices increase decision fatigue",
    description:
      "Patients were presented with multiple providers and time slots without guidance, making the process feel overwhelming and harder to navigate.",
  },
  {
    title: "Repetitive data entry adds unnecessary friction",
    description:
      "Users were asked to re-enter information already available in the system, increasing effort and frustration during booking.",
  },
  {
    title: "Lack of confirmation clarity reduces trust",
    description:
      "After booking, patients were often unsure whether they selected the right appointment or what would happen next.",
  },
];

const ResearchSection: React.FC = () => {
  return (
    <section className="w-full bg-gray-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl">
          <p className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-blue-600">
            Research Insights
          </p>

          <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-gray-900">
            Four recurring friction patterns shaped the redesign.
          </h2>

          <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600">
            Through user interviews and analysis, I identified the most
            recurring moments of confusion, hesitation, and friction across the
            booking journey. These insights directly informed the structure of
            the guided healthcare experience.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                  0{index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {insight.title}
                </h3>
              </div>

              <p className="mt-4 text-base leading-7 text-gray-600">
                {insight.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-3xl">
          <p className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-blue-600">
            Persona Highlights
          </p>

          <h3 className="mt-4 text-2xl md:text-4xl font-bold leading-tight text-gray-900">
            Two user perspectives anchored the final direction.
          </h3>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Rather than designing for a generic patient, I focused on two
            representative perspectives: a user who needs clarity and
            confidence to book independently, and a busy caregiver who values
            speed, straightforward language, and minimal friction.
          </p>
        </div>

        {/* Primary Persona */}
        <div className="mt-10 rounded-[2rem] border border-gray-200 bg-white p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-8">
            <div>
              <div className="overflow-hidden rounded-[1.75rem] border border-gray-200 bg-gray-100">
                <img
                  src={rajeshImage}
                  alt="Rajesh Menon persona"
                  className="h-[320px] w-full object-cover"
                />
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-gray-200 bg-gray-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                  Primary Persona
                </p>

                <h4 className="mt-3 text-2xl font-bold text-gray-900">
                  Rajesh Menon
                </h4>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  67 • Retired bank manager • Houston, Texas
                </p>
              </div>
            </div>

            <div>
              <blockquote className="text-2xl md:text-3xl italic leading-10 text-gray-800">
                “I don’t mind using technology, I just don’t want it to be
                confusing.”
              </blockquote>

              <p className="mt-6 text-base md:text-lg leading-8 text-gray-500">
                Rajesh is a recently retired bank manager who values
                independence, routine, and clear instructions. He is
                comfortable using a smartphone for basic tasks, but becomes
                frustrated when healthcare systems feel dense, unfamiliar, or
                overly complex. He wants digital experiences that help him
                complete tasks confidently without needing support from family
                members.
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-green-700">
                    Goals
                  </p>
                  <ul className="mt-4 space-y-3">
                    <li className="text-sm md:text-base leading-7 text-gray-700">
                      • Book appointments independently
                    </li>
                    <li className="text-sm md:text-base leading-7 text-gray-700">
                      • Access results and visit summaries easily
                    </li>
                    <li className="text-sm md:text-base leading-7 text-gray-700">
                      • Receive clear reminders and next steps
                    </li>
                    <li className="text-sm md:text-base leading-7 text-gray-700">
                      • Understand billing and insurance information without
                      confusion
                    </li>
                  </ul>
                </div>

                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-red-600">
                    Frustrations
                  </p>
                  <ul className="mt-4 space-y-3">
                    <li className="text-sm md:text-base leading-7 text-gray-700">
                      • Small text and dense layouts are hard to read
                    </li>
                    <li className="text-sm md:text-base leading-7 text-gray-700">
                      • Medical jargon is difficult to understand
                    </li>
                    <li className="text-sm md:text-base leading-7 text-gray-700">
                      • Multiple logins and disconnected systems feel
                      overwhelming
                    </li>
                    <li className="text-sm md:text-base leading-7 text-gray-700">
                      • Fear of making mistakes reduces confidence
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Persona */}
        <div className="mt-8 rounded-[2rem] border border-gray-200 bg-white p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8 items-start">
            <div>
              <div className="overflow-hidden rounded-[1.5rem] border border-gray-200 bg-gray-100">
                <img
                  src={katherineImage}
                  alt="Katherine persona"
                  className="h-[260px] w-full object-cover"
                />
              </div>

              <div className="mt-4 rounded-[1.25rem] border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                  Secondary Persona
                </p>

                <h4 className="mt-2 text-xl font-bold text-gray-900">
                  Katherine
                </h4>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  46 • School administrator • Dallas, Texas
                </p>
              </div>
            </div>

            <div>
              <blockquote className="text-xl md:text-2xl italic leading-9 text-gray-800">
                “When it comes to health, I need guidance, not guesswork.”
              </blockquote>

              <p className="mt-5 text-base leading-8 text-gray-500">
                Katherine is a busy school administrator and mother who balances
                work, family, and personal health. She prefers straightforward,
                time-saving solutions and expects healthcare systems to reduce
                effort rather than add complexity. She wants to manage care
                quickly, clearly, and without repeating the same information
                across tools.
              </p>

              <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-green-700">
                    Goals
                  </p>
                  <ul className="mt-4 space-y-3">
                    <li className="text-sm md:text-base leading-7 text-gray-700">
                      • Book appointments quickly without calling during work
                      hours
                    </li>
                    <li className="text-sm md:text-base leading-7 text-gray-700">
                      • Understand results and next steps in simple language
                    </li>
                    <li className="text-sm md:text-base leading-7 text-gray-700">
                      • Manage family healthcare in one place
                    </li>
                  </ul>
                </div>

                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-red-600">
                    Frustrations
                  </p>
                  <ul className="mt-4 space-y-3">
                    <li className="text-sm md:text-base leading-7 text-gray-700">
                      • Medical terminology feels confusing and overwhelming
                    </li>
                    <li className="text-sm md:text-base leading-7 text-gray-700">
                      • Different systems for booking, billing, and results feel
                      fragmented
                    </li>
                    <li className="text-sm md:text-base leading-7 text-gray-700">
                      • Unclear billing and follow-up information creates stress
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="mt-12 rounded-[2rem] border border-blue-100 bg-blue-50/70 p-6 md:p-8">
          <h4 className="text-xl md:text-2xl font-semibold text-gray-900">
            Key Takeaways
          </h4>

          <ul className="mt-6 space-y-4 text-base md:text-lg leading-8 text-gray-700">
            <li>
              • Users need guidance, not decision overload — especially when
              they are unsure which specialist to choose.
            </li>
            <li>
              • Medical terminology must be simplified to reduce hesitation and
              build confidence.
            </li>
            <li>
              • Reducing steps and repetitive inputs is critical for both older
              and busy users.
            </li>
            <li>
              • Clear confirmation and next steps are essential to build trust
              after booking.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;