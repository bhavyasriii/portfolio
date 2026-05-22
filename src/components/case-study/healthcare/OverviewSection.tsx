import React from "react";

const OverviewSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl">
          <p className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-blue-600">
            Overview
          </p>

          <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-gray-900">
            Patients struggle to find the right specialist when booking care.
          </h2>

          <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600">
            Many healthcare booking systems assume users already know which
            doctor or department they need. But in reality, patients often
            begin with symptoms, not medical certainty. That gap creates
            confusion, incorrect bookings, delayed care, and unnecessary
            frustration.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
              Problem
            </p>
            <p className="mt-4 text-base leading-7 text-gray-700">
              Users were expected to manually search through doctors or
              departments, even when they were unsure which specialist matched
              their symptoms.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
              Users
            </p>
            <p className="mt-4 text-base leading-7 text-gray-700">
              Patients who need care quickly but may not understand medical
              terminology or know which specialist to book with.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
              Goal
            </p>
            <p className="mt-4 text-base leading-7 text-gray-700">
              Redesign the experience into a guided booking flow that helps
              patients move from symptoms to the right specialist with less
              effort and more confidence.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
              Role
            </p>
            <p className="mt-4 text-base leading-7 text-gray-700">
              UX/UI Designer responsible for problem framing, user-flow design,
              interface design, and high-fidelity prototyping in Figma.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-blue-100 bg-blue-50/70 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Opportunity
          </p>
          <p className="mt-3 text-lg md:text-xl leading-8 text-gray-800">
            How might we design a guided, AI-assisted booking experience that
            helps patients move from symptoms to the right specialist quickly,
            confidently, and with minimal effort?
          </p>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;