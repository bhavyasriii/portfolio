import { motion } from "framer-motion";

const metrics = [
  {
    value: "50%",
    label: "Reduction in decision friction",
    detail: "Observed through moderated usability testing, participants reported significantly less hesitation on the redesigned flow vs. the original",
    color: "blue",
  },
  {
    value: "100%",
    label: "Task completion rate",
    detail: "Both participants completed all 3 core tasks without assistance across dashboard, optimization, and cancel flows",
    color: "green",
  },
  {
    value: "8.5/10",
    label: "Average ease-of-use rating",
    detail: "Averaged across 2 moderated sessions, participants rated the guided AI flow as clear and confidence-building",
    color: "blue",
  },
];

const qualitative = [
  {
    metric: "Fewer surprise charges",
    text: "Upcoming renewals surfaced before payment, participants no longer needed to check manually.",
    icon: "🔔",
  },
  {
    metric: "Better financial clarity",
    text: "AI insights translated spending patterns into plain explanations instead of raw transaction data.",
    icon: "📊",
  },
  {
    metric: "More confident decisions",
    text: "Optimization suggestions helped users decide whether to cancel, pause, downgrade, or keep, without second-guessing.",
    icon: "✅",
  },
];

const Impact = () => {
  return (
    <section className="w-full bg-[#0B1120] px-6 py-24 text-white md:px-12">
      <div className="mx-auto max-w-6xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* FIX 1 — "Expected" → "Measured" */}
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400">
            Measured Impact
          </p>

          <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            Helping users move from passive tracking to proactive money management.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            The redesigned experience was validated through moderated usability
            testing. Results confirmed that guided AI recommendations reduced
            hesitation and helped users act with more confidence.
          </p>

          {/* FIX 2 — honest framing */}
          <div className="mt-6 flex items-start gap-3 rounded-[20px] border border-white/10 bg-white/[0.04] px-5 py-4 max-w-2xl">
            <span className="mt-0.5 text-slate-500">ℹ</span>
            <p className="text-sm leading-6 text-slate-400">
              Metrics are from a self-initiated usability study with 2 moderated participants,
              not a large-scale production study. Results informed design iterations.
            </p>
          </div>
        </motion.div>

        {/* Metric cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {metrics.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-[28px] border p-6 shadow-[0_20px_70px_rgba(0,0,0,0.3)] ${
                item.color === "green"
                  ? "border-green-400/20 bg-green-500/10"
                  : "border-blue-400/20 bg-blue-500/10"
              }`}
            >
              <div className={`text-4xl font-bold leading-none ${
                item.color === "green" ? "text-green-400" : "text-blue-400"
              }`}>
                {item.value}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {item.label}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Qualitative outcomes */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {qualitative.map((item, index) => (
            <motion.div
              key={item.metric}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.3)]"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-3">
                {item.metric}
              </h3>
              <p className="text-sm leading-6 text-slate-400">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Impact;
