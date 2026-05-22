import home from "../../../assets/case-studies/healthcare-booking/wireframes/home.png";
import appointment from "../../../assets/case-studies/healthcare-booking/wireframes/appointment.png";
import body from "../../../assets/case-studies/healthcare-booking/wireframes/body.png";
import symptoms from "../../../assets/case-studies/healthcare-booking/wireframes/symptoms.png";
import recommendation from "../../../assets/case-studies/healthcare-booking/wireframes/recommendation.png";
import timeslot from "../../../assets/case-studies/healthcare-booking/wireframes/timeslot.png";
import review from "../../../assets/case-studies/healthcare-booking/wireframes/review.png";
import confirmation from "../../../assets/case-studies/healthcare-booking/wireframes/confirmation.png";
import login from "../../../assets/case-studies/healthcare-booking/wireframes/login.png";
import signup from "../../../assets/case-studies/healthcare-booking/wireframes/signup.png";
const SolutionSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="border-t border-gray-200 pt-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-600">
              The Redesign
            </p>

            <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-gray-900">
              Designing a guided, confidence-building booking experience
            </h2>

            <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600">
              Based on recurring friction patterns identified in the research,
              the redesigned experience introduces guided consultation
              selection, progressive booking steps, smart defaults, and clear
              confirmation states to reduce cognitive load and improve booking
              confidence.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                Design approach
              </h3>

              <ul className="mt-5 space-y-3 text-gray-600 leading-7">
                <li>• Shift from search-based to symptom-driven flow</li>
                <li>• Break complex decisions into smaller steps</li>
                <li>• Reduce repetition using smart defaults</li>
                <li>• Improve clarity with structured confirmation</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                What changed
              </h3>

              <ul className="mt-5 space-y-3 text-gray-600 leading-7">
                <li>• Users no longer search blindly for specialists</li>
                <li>• Booking is guided step-by-step</li>
                <li>• Fewer decisions are shown at each stage</li>
                <li>• Clear review and confirmation build confidence</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-600">
              Low-Fidelity Wireframes
            </p>

            <h3 className="mt-4 text-2xl md:text-4xl font-bold text-gray-900">
              Early concepts explored the booking journey step by step
            </h3>

            <p className="mt-5 text-lg text-gray-600 leading-8">
              Instead of presenting all wireframes at once, the flow is grouped
              into key decision stages to show how the experience gradually
              guides patients from entry to confirmation.
            </p>
          </div>

          <div className="mt-16 space-y-20">
            <div>
              <h4 className="text-xl md:text-2xl font-semibold text-gray-900 text-center">
                Step 01 — Entry & Intent
              </h4>

              <div className="mt-6 flex flex-wrap justify-center gap-6">
                <img
                  src={home}
                  alt="Home wireframe"
                  className="w-40 md:w-44 rounded-2xl shadow-md"
                />
                <img
                  src={appointment}
                  alt="Appointment type wireframe"
                  className="w-40 md:w-44 rounded-2xl shadow-md"
                />
              </div>

              <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto leading-7">
                Users begin from a clear appointment entry point instead of
                navigating multiple disconnected options.
              </p>
            </div>

            <div>
              <h4 className="text-xl md:text-2xl font-semibold text-gray-900 text-center">
                Step 02 — Symptom Capture
              </h4>

              <div className="mt-6 flex flex-wrap justify-center gap-6">
                <img
                  src={body}
                  alt="Body area wireframe"
                  className="w-40 md:w-44 rounded-2xl shadow-md"
                />
                <img
                  src={symptoms}
                  alt="Symptoms wireframe"
                  className="w-40 md:w-44 rounded-2xl shadow-md"
                />
              </div>

              <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto leading-7">
                Guided inputs help users describe their issue without needing
                prior medical knowledge or specialist familiarity.
              </p>
            </div>

            <div>
              <h4 className="text-xl md:text-2xl font-semibold text-gray-900 text-center">
                Step 03 — Specialist Recommendation
              </h4>

              <div className="mt-6 flex justify-center">
                <img
                  src={recommendation}
                  alt="Recommendation wireframe"
                  className="w-44 md:w-52 rounded-2xl shadow-md"
                />
              </div>

              <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto leading-7">
                Based on selected symptoms, the system recommends the most
                relevant specialist and explains why they are a match.
              </p>
            </div>

            <div>
              <h4 className="text-xl md:text-2xl font-semibold text-gray-900 text-center">
                Step 04 — Time Slot Selection
              </h4>

              <div className="mt-6 flex justify-center">
                <img
                  src={timeslot}
                  alt="Time slot wireframe"
                  className="w-44 md:w-52 rounded-2xl shadow-md"
                />
              </div>

              <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto leading-7">
                Available appointment slots are shown clearly so users can make
                one simple scheduling decision at a time.
              </p>
            </div>

            <div>
              <h4 className="text-xl md:text-2xl font-semibold text-gray-900 text-center">
                Step 05 — Review & Confirmation
              </h4>

              <div className="mt-6 flex flex-wrap justify-center gap-6">
                <img
                  src={review}
                  alt="Review wireframe"
                  className="w-40 md:w-44 rounded-2xl shadow-md"
                />
                <img
                  src={confirmation}
                  alt="Confirmation wireframe"
                  className="w-40 md:w-44 rounded-2xl shadow-md"
                />
                <img
                  src={login}
                  alt="Login wireframe"
                  className="w-40 md:w-44 rounded-2xl shadow-md"
                />
                <img
                  src={signup}
                  alt="Signup wireframe"
                  className="w-40 md:w-44 rounded-2xl shadow-md"
                />
              </div>

              <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto leading-7">
                Users review appointment details, confirm the booking, and
                securely sign in or create an account to complete the process.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              Key Design Insight
            </p>

            <p className="mt-3 text-lg leading-8 text-gray-800">
              The wireframes validated that breaking the booking experience into
              smaller, guided steps reduces decision anxiety and makes the flow
              feel more manageable from start to finish.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;