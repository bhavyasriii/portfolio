import React from "react";
import homeMidfi from "../../../assets/case-studies/healthcare-booking/midfi/home-midfi.png";
import appointmentMidfi from "../../../assets/case-studies/healthcare-booking/midfi/appointment-midfi.png";
import bodyMidfi from "../../../assets/case-studies/healthcare-booking/midfi/body-midfi.png";
import symptomsMidfi from "../../../assets/case-studies/healthcare-booking/midfi/symptoms-midfi.png";
import recommendationMidfi from "../../../assets/case-studies/healthcare-booking/midfi/recommendation-midfi.png";
import timeslotMidfi from "../../../assets/case-studies/healthcare-booking/midfi/timeslot-midfi.png";
import reviewMidfi from "../../../assets/case-studies/healthcare-booking/midfi/review-midfi.png";
import confirmationMidfi from "../../../assets/case-studies/healthcare-booking/midfi/confirmation-midfi.png";
import loginMidfi from "../../../assets/case-studies/healthcare-booking/midfi/login-midfi.png";
import signupMidfi from "../../../assets/case-studies/healthcare-booking/midfi/signup-midfi.png";

const MidFiSection: React.FC = () => {
  return (
    <section className="w-full bg-gray-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="border-t border-gray-200 pt-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-600">
              Mid-Fidelity Screens
            </p>

            <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-gray-900">
              The flow became clearer, more guided, and easier to complete.
            </h2>

            <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600">
              Mid-fidelity exploration focused on improving hierarchy, reducing
              ambiguity, and making each booking step feel more intentional.
              This stage helped validate structure, content grouping, and
              interaction clarity before moving into high-fidelity UI.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                What improved at this stage
              </h3>

              <ul className="mt-5 space-y-3 text-gray-600 leading-7">
                <li>• Stronger visual hierarchy across key screens</li>
                <li>• More structured content grouping and spacing</li>
                <li>• Clearer decision points at each step</li>
                <li>• Better guidance before final visual polish</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                Why Mid-Fi mattered
              </h3>

              <ul className="mt-5 space-y-3 text-gray-600 leading-7">
                <li>• Helped validate the booking sequence</li>
                <li>• Reduced clutter before visual styling decisions</li>
                <li>• Improved confidence in the step-by-step flow</li>
                <li>• Created a stronger foundation for the hi-fi prototype</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 space-y-20">
            <div>
              <h4 className="text-xl md:text-2xl font-semibold text-gray-900 text-center">
                Step 01 — Guided Entry
              </h4>

              <div className="mt-6 flex flex-wrap justify-center gap-6">
                <img
                  src={homeMidfi}
                  alt="Mid-fi home screen"
                  className="w-40 md:w-44 rounded-2xl shadow-md"
                />
                <img
                  src={appointmentMidfi}
                  alt="Mid-fi appointment type screen"
                  className="w-40 md:w-44 rounded-2xl shadow-md"
                />
              </div>

              <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto leading-7">
                Entry points became more structured, helping users start the
                booking process with less confusion and clearer intent.
              </p>
            </div>

            <div>
              <h4 className="text-xl md:text-2xl font-semibold text-gray-900 text-center">
                Step 02 — Structured Symptom Input
              </h4>

              <div className="mt-6 flex flex-wrap justify-center gap-6">
                <img
                  src={bodyMidfi}
                  alt="Mid-fi body area screen"
                  className="w-40 md:w-44 rounded-2xl shadow-md"
                />
                <img
                  src={symptomsMidfi}
                  alt="Mid-fi symptoms screen"
                  className="w-40 md:w-44 rounded-2xl shadow-md"
                />
              </div>

              <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto leading-7">
                The symptom capture flow became easier to scan and more usable,
                helping users move forward without relying on medical jargon.
              </p>
            </div>

            <div>
              <h4 className="text-xl md:text-2xl font-semibold text-gray-900 text-center">
                Step 03 — Recommendation
              </h4>

              <div className="mt-6 flex justify-center">
                <img
                  src={recommendationMidfi}
                  alt="Mid-fi recommendation screen"
                  className="w-44 md:w-52 rounded-2xl shadow-md"
                />
              </div>

              <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto leading-7">
                Recommendation screens introduced clearer information hierarchy
                so users could understand who was suggested and why.
              </p>
            </div>

            <div>
              <h4 className="text-xl md:text-2xl font-semibold text-gray-900 text-center">
                Step 04 — Appointment Selection
              </h4>

              <div className="mt-6 flex justify-center">
                <img
                  src={timeslotMidfi}
                  alt="Mid-fi time slot screen"
                  className="w-44 md:w-52 rounded-2xl shadow-md"
                />
              </div>

              <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto leading-7">
                Time-slot selection became more predictable by surfacing only
                the choices users needed at that moment.
              </p>
            </div>

            <div>
              <h4 className="text-xl md:text-2xl font-semibold text-gray-900 text-center">
                Step 05 — Review & Account Completion
              </h4>

              <div className="mt-6 flex flex-wrap justify-center gap-6">
                <img
                  src={reviewMidfi}
                  alt="Mid-fi review screen"
                  className="w-40 md:w-44 rounded-2xl shadow-md"
                />
                <img
                  src={confirmationMidfi}
                  alt="Mid-fi confirmation screen"
                  className="w-40 md:w-44 rounded-2xl shadow-md"
                />
                <img
                  src={loginMidfi}
                  alt="Mid-fi login screen"
                  className="w-40 md:w-44 rounded-2xl shadow-md"
                />
                <img
                  src={signupMidfi}
                  alt="Mid-fi signup screen"
                  className="w-40 md:w-44 rounded-2xl shadow-md"
                />
              </div>

              <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto leading-7">
                Review and authentication flows were simplified to preserve user
                confidence through the final stages of booking.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              Key Mid-Fi Insight
            </p>

            <p className="mt-3 text-lg leading-8 text-gray-800">
              Mid-fidelity testing showed that clarity came less from visual
              polish and more from reducing choice overload, tightening content
              hierarchy, and making the flow feel sequential and guided.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MidFiSection;