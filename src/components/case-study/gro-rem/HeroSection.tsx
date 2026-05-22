import { motion } from "framer-motion";
import { FiArrowRight, FiClock, FiCheckCircle, FiZap } from "react-icons/fi";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

const searchResults = [
  "Milk",
  "Green Chillies",
  "Kale",
  "Garlic",
  "Tomatoes",
];

const yourSpace = [
  { name: "Milk", done: true },
  { name: "Green Chillies", done: false },
  { name: "Kale", done: false },
  { name: "Garlic", done: false },
];

const suggestions = ["Eggs", "Bread", "Oil"];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[40px] border border-black/8 bg-white/80 shadow-[0_30px_100px_rgba(0,0,0,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-[#101826]/80 dark:shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.12),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.10),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.10),_transparent_26%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.20),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.12),_transparent_26%)]" />

      <div className="relative grid gap-12 px-7 py-10 md:px-10 md:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-14 lg:py-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold tracking-wide text-black/70 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.05] dark:text-white/75"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-30" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            Featured AI-assisted UX case study
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.04 }}
            className="mt-7 text-sm font-medium uppercase tracking-[0.2em] text-black/45 dark:text-white/45"
          >
            Smart Grocery Reminder
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.08 }}
            className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.96] md:text-7xl lg:text-[5rem] dark:text-white/95"
          >
            A lightweight grocery companion that helps users remember, plan, and finish shopping with less effort
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.14 }}
            className="mt-7 max-w-2xl text-base leading-8 text-black/62 md:text-lg dark:text-white/65"
          >
            Instead of acting like a delivery app, this concept focuses on the in-store shopping moment:
            quick item search, a personal saved list, and smart recommendations that reduce forgotten items
            and decision fatigue.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.22 }}
            className="mt-10 grid gap-3 sm:grid-cols-3"
          >
            {[
              {
                icon: <FiClock className="text-lg" />,
                label: "Fast add flow",
                value: "Search by name",
              },
              {
                icon: <FiCheckCircle className="text-lg" />,
                label: "In-store clarity",
                value: "Check as you shop",
              },
              {
                icon: <FiZap className="text-lg" />,
                label: "AI layer",
                value: "Smart suggestions",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[24px] border border-black/10 bg-white/72 p-4 shadow-[0_10px_28px_rgba(0,0,0,0.04)] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="text-black/70 dark:text-white/75">{item.icon}</div>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-black/42 dark:text-white/42">
                  {item.label}
                </p>
                <p className="mt-2 text-base font-semibold text-black/88 dark:text-white/90">
                  {item.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          {...fadeUp}
          className="mx-auto w-full max-w-[520px]"
        >
          <div className="relative overflow-hidden rounded-[36px] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(240,247,243,0.92))] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.14)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05]">
            <div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-emerald-200/60 blur-3xl dark:bg-emerald-500/18" />
            <div className="absolute -right-8 bottom-10 h-32 w-32 rounded-full bg-sky-200/60 blur-3xl dark:bg-sky-500/18" />

            <div className="relative grid gap-4">
              <div className="rounded-[28px] border border-black/8 bg-white/90 p-5 shadow-[0_14px_35px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-[#0f1724]">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/40 dark:text-white/40">
                  Search groceries
                </p>

                <div className="mt-4 rounded-2xl border border-black/10 bg-[#f6f8f7] px-4 py-3 text-sm text-black/55 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55">
                  Search “green”...
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {searchResults.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-2 text-sm font-medium text-black/75 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/75"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-black/8 bg-white/90 p-5 shadow-[0_14px_35px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-[#0f1724]">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/40 dark:text-white/40">
                    Your Space
                  </p>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                    1 / 4 picked
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {yourSpace.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]"
                    >
                      <span
                        className={`text-sm font-medium ${
                          item.done
                            ? "text-black/45 line-through dark:text-white/45"
                            : "text-black/80 dark:text-white/82"
                        }`}
                      >
                        {item.name}
                      </span>

                      <span
                        className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
                          item.done
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-black/15 text-black/45 dark:border-white/15 dark:text-white/45"
                        }`}
                      >
                        {item.done ? "✓" : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-black/8 bg-white/90 p-5 shadow-[0_14px_35px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-[#0f1724]">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/40 dark:text-white/40">
                  AI recommendations
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {suggestions.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 px-3 py-2 text-sm font-medium text-black/78 dark:border-white/10 dark:text-white/80"
                    >
                      {item}
                      <FiArrowRight className="text-xs" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}