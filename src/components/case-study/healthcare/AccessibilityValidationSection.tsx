import React from "react";

const AccessibilityValidationSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="border-t border-gray-200 pt-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-600">
              Accessibility & Validation
            </p>

            <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-gray-900">
              Accessibility standards were treated as core usability requirements, not add-ons.
            </h2>

            <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600">
              Because healthcare interfaces must support a wide range of users,
              the design was reviewed against accessibility principles that
              improve readability, touch interaction, and confidence across
              devices and ability levels.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] border border-gray-200 bg-gray-50 p-6 md:p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                Accessibility standards
              </p>

              <ul className="mt-5 space-y-4 text-base md:text-lg leading-8 text-gray-700">
                <li>
                  <span className="font-semibold text-gray-900">Visual hierarchy:</span>{" "}
                  Primary, secondary, and tertiary button styles guide users
                  toward the most important actions.
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Touch targets:</span>{" "}
                  Interactive elements use a minimum 44px tap area for mobile usability.
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Color contrast:</span>{" "}
                  The palette was checked against WCAG 2.1 AA requirements for readability.
                </li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-green-100 bg-green-50/70 p-6 md:p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-green-700">
                Accessibility validation
              </p>

              <ul className="mt-5 space-y-4 text-base md:text-lg leading-8 text-gray-800">
                <li>
                  <span className="font-semibold">Color contrast:</span> All
                  text and UI elements meet required contrast ratios for better
                  readability.
                </li>
                <li>
                  <span className="font-semibold">Touch targets:</span>{" "}
                  Buttons and time-slot selectors maintain a minimum size of
                  44 × 44 pixels.
                </li>
                <li>
                  <span className="font-semibold">Readable typography:</span>{" "}
                  Clear font hierarchy and sufficient spacing improve reading on
                  small mobile screens.
                </li>
                <li>
                  <span className="font-semibold">Color independence:</span>{" "}
                  Selected states are indicated through both color and visual
                  cues to support color-blind users.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-[2rem] border border-blue-100 bg-blue-50/70 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              Validation tool
            </p>

            <p className="mt-3 text-lg md:text-xl leading-8 text-gray-800">
              The interface was reviewed using the Stark accessibility plugin in
              Figma to check WCAG 2.1 AA alignment across contrast, readability,
              and interaction states.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccessibilityValidationSection;