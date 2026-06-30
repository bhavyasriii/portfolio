import React, { useState } from "react";

const tasks = [
  {
    task: "Find and begin the appointment booking flow",
    success: 12,
    total: 12,
    rate: 100,
    observation: "All participants located the entry point without prompting.",
  },
  {
    task: "Select symptoms and receive a specialist recommendation",
    success: 11,
    total: 12,
    rate: 92,
    observation: "One participant hesitated on the body-area selector; microcopy was added post-session.",
  },
  {
    task: "Choose an appointment time and confirm booking",
    success: 11,
    total: 12,
    rate: 92,
    observation: "Confirmation feedback needed to be more prominent — improved in final iteration.",
  },
  {
    task: "Understand what happens after booking (next steps)",
    success: 10,
    total: 12,
    rate: 83,
    observation: "Post-booking summary was unclear; a structured next-steps screen was added.",
  },
];

const improvements = [
  {
    finding: "Initial hesitation during symptom selection",
    action: "Added clearer instructional microcopy above the symptom selector",
    icon: "🔤",
  },
  {
    finding: "Confirmation feedback felt weak",
    action: "Redesigned confirmation screen with prominent success state and appointment summary",
    icon: "✅",
  },
  {
    finding: "Next steps after booking were unclear",
    action: "Added a dedicated post-booking screen with reminders and calendar option",
    icon: "📋",
  },
];

const UserTestingSection: React.FC = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <section className="w-full bg-gray-50 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="border-t border-gray-200 pt-16">

          {/* Heading */}
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-green-600">
              User Testing & Validation
            </p>

            <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-gray-900">
              Validating design decisions through usability testing
            </h2>

            <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600">
              A moderated usability study evaluated how effectively the redesigned
              experience supports patients in completing key booking tasks.
              Observations directly informed the final interaction flow.
            </p>
          </div>

          {/* Methodology strip */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Participants", value: "12" },
              { label: "Method", value: "Moderated" },
              { label: "Format", value: "Remote · Zoom" },
              { label: "Tool", value: "Maze + observation" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm"
              >
                <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Results table */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Task completion results
            </h3>

            <div className="overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white shadow-sm">
              {/* Table header */}
              <div className="grid grid-cols-[1fr_100px_80px] gap-4 border-b border-gray-100 bg-gray-50 px-6 py-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Task</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 text-center">Passed</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 text-center">Rate</span>
              </div>

              {/* Table rows */}
              {tasks.map((t, i) => (
                <div key={i}>
                  <button
                    className="w-full grid grid-cols-[1fr_100px_80px] gap-4 px-6 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                    onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                  >
                    <span className="text-sm font-medium text-gray-800 flex items-center gap-2">
                      <span className="text-gray-300 text-xs">{String(i + 1).padStart(2, "0")}</span>
                      {t.task}
                    </span>
                    <span className="text-sm text-gray-600 text-center self-center">
                      {t.success} / {t.total}
                    </span>
                    <span className="self-center flex justify-center">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${
                          t.rate === 100
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : t.rate >= 90
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                        }`}
                      >
                        {t.rate}%
                      </span>
                    </span>
                  </button>

                  {/* Expanded observation */}
                  {expandedRow === i && (
                    <div className="px-6 pb-4 bg-gray-50 border-b border-gray-100">
                      <div className="flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                        <span className="text-blue-400 mt-0.5 text-sm">↳</span>
                        <p className="text-sm leading-6 text-blue-800">{t.observation}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Overall result row */}
              <div className="grid grid-cols-[1fr_100px_80px] gap-4 border-t border-gray-200 bg-green-50 px-6 py-4">
                <span className="text-sm font-bold text-gray-900">Overall task success rate</span>
                <span className="text-sm font-bold text-gray-900 text-center self-center">44 / 48</span>
                <span className="self-center flex justify-center">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-800 border border-green-200">
                    92%
                  </span>
                </span>
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-400 italic">
              Click any row to see the key observation from that task.
            </p>
          </div>

          {/* Improvements made */}
          <div className="mt-14">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Improvements made based on findings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {improvements.map((item, i) => (
                <div
                  key={i}
                  className="rounded-[1.5rem] border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">
                    Finding
                  </p>
                  <p className="text-sm text-gray-700 leading-6 mb-4">{item.finding}</p>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm font-semibold text-green-700 uppercase tracking-widest mb-2">
                      Action taken
                    </p>
                    <p className="text-sm text-gray-700 leading-6">{item.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default UserTestingSection;
