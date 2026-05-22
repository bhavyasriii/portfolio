import SectionIntro from "./SectionIntro";
import { FiArrowRight } from "react-icons/fi";

const steps = [
  "Open app",
  "Search item by name",
  "Select suggested result",
  "Add item to Your Space",
  "Review personal list",
  "Shop in-store",
  "Check items as picked",
  "Receive smart recommendations",
];

export default function UserFlowSection() {
  return (
    <section className="pt-28">
      <SectionIntro
        eyebrow="User Flow"
        title="A short, low-friction flow that helps users move from memory to completion"
        description="The experience intentionally reduces complexity. It starts with quick search, moves into personal list-building, and supports the user at the exact point where groceries are being picked in the real world."
      />

      <div className="mt-12 rounded-[36px] border border-black/10 bg-white/84 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.05)] md:p-8 dark:border-white/10 dark:bg-[#111a29]/85">
        <div className="flex flex-wrap items-center gap-3">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <div className="rounded-full border border-black/10 bg-black/[0.03] px-4 py-3 text-sm font-medium text-black/78 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/78">
                {step}
              </div>

              {index < steps.length - 1 && (
                <FiArrowRight className="text-black/35 dark:text-white/35" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}