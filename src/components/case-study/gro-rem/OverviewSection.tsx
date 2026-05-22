import { motion } from "framer-motion";
import SectionIntro from "./SectionIntro";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export default function OverviewSection() {
  return (
    <section className="pt-28">
      <SectionIntro
        eyebrow="Overview"
        title="A reminder-first shopping experience instead of another grocery delivery interface"
        description="This project explores a different kind of grocery product: one that helps users plan before shopping, stay focused while shopping, and remember what matters without relying on a complex delivery system."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Project Type", "Concept UX case study"],
          ["Platform", "Mobile-first shopping companion"],
          ["Primary Goal", "Reduce forgotten grocery items"],
          ["Core Differentiator", "User-driven list with AI-assisted suggestions"],
        ].map(([label, value], index) => (
          <motion.div
            key={label}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: index * 0.06 }}
            className="rounded-[24px] border border-black/10 bg-white/80 p-5 shadow-[0_12px_35px_rgba(0,0,0,0.04)] backdrop-blur-md dark:border-white/10 dark:bg-[#111a29]/85"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/42 dark:text-white/42">
              {label}
            </p>
            <p className="mt-3 text-lg font-semibold text-black/88 dark:text-white/90">
              {value}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}