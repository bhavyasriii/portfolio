import { motion } from "framer-motion";
import SectionIntro from "./SectionIntro";

export default function ProblemSection() {
  return (
    <section className="pt-28">
      <SectionIntro
        eyebrow="Problem"
        title="People forget items, rebuild the same lists repeatedly, and make unnecessary extra trips"
        description="Grocery shopping sounds simple, but the experience often breaks down in small ways. Users remember items too late, lose track in-store, or rely on scattered notes that are not built for quick shopping behavior."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {[
          {
            title: "Forgetting key items",
            desc: "Users remember groceries in fragments, which leads to missed essentials and repeated trips.",
          },
          {
            title: "No quick in-store system",
            desc: "Traditional notes are not optimized for fast scanning, checking, and decision-making inside the store.",
          },
          {
            title: "Too much mental load",
            desc: "Users keep the list in their head, compare options mentally, and still forget supporting items.",
          },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.07 }}
            className="rounded-[28px] border border-black/10 bg-white/82 p-6 shadow-[0_14px_40px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#111a29]/85"
          >
            <h3 className="text-xl font-semibold text-black/88 dark:text-white/90">
              {item.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-black/58 dark:text-white/60">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
