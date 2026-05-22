import React from "react";
import userTestingImage from "../../../assets/case-studies/healthcare-booking/testing/user-testing.png";

const UserTestingSection: React.FC = () => {
  return (
    <section className="w-full bg-gray-50 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Divider */}
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
              A moderated usability session was conducted to evaluate how
              effectively the redesigned experience supports users in completing
              key booking tasks. Observations from this session helped identify
              friction points and refine the final interaction flow.
            </p>
          </div>

          {/* IMAGE */}
          <div className="mt-12 flex justify-center">
            <div className="bg-white p-4 md:p-6 rounded-[2rem] shadow-xl border border-gray-200">

              <img
                src={userTestingImage}
                alt="User testing and validation summary"
                className="rounded-[1.5rem] w-full max-w-4xl object-contain"
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default UserTestingSection;