import SectionIntro from "./SectionIntro";
import { FiSearch, FiBookmark, FiCheckSquare, FiRefreshCw } from "react-icons/fi";

const features = [
  {
    icon: <FiSearch className="text-lg" />,
    title: "Smart name-based search",
    desc: "Typing “green” surfaces relevant grocery names like Green Chillies or Green Beans without needing heavy visuals.",
  },
  {
    icon: <FiBookmark className="text-lg" />,
    title: "Your Space",
    desc: "A dedicated saved area that keeps selected groceries visible, personal, and easy to return to.",
  },
  {
    icon: <FiCheckSquare className="text-lg" />,
    title: "In-store checklist mode",
    desc: "Users can mark items as picked, helping them track progress and avoid missing essentials.",
  },
  {
    icon: <FiRefreshCw className="text-lg" />,
    title: "Habit-based support",
    desc: "The system can suggest repeated items over time, reducing the need to rebuild the same lists every week.",
  },
];

export default function KeyFeaturesSection() {
  return (
    <section className="pt-28">
      <SectionIntro
        eyebrow="Key Features"
        title="The experience stays simple on the surface, but each part supports real shopping behavior"
        description="Rather than overloading the interface, the product focuses on a few high-value features that are easy to understand and easy to use quickly."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-[28px] border border-black/10 bg-white/82 p-6 shadow-[0_14px_40px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#111a29]/85"
          >
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
              {feature.icon}
            </div>

            <h3 className="mt-5 text-xl font-semibold text-black/88 dark:text-white/90">
              {feature.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-black/58 dark:text-white/60">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}