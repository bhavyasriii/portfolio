import { motion } from "framer-motion";
import { useState } from "react";

const tasks = [
  {
    task: "Navigate dashboard and identify most expensive active subscription",
    tester1: { passed: true, note: "Located immediately. Card layout was immediately scannable." },
    tester2: { passed: true, note: "Dashboard gave a clear overview. Renewal alerts were prominent." },
    rate: 100,
  },
  {
    task: "Review AI optimization suggestions and understand recommended action",
    tester1: { passed: true, note: "Suggestions were direct and confidence-building. Savings shown upfront." },
    tester2: { passed: true, note: "Subscriptions page clearly grouped upcoming renewals. Due Soon state worked." },
    rate: 100,
  },
  {
    task: "Complete cancel or pause flow for a flagged subscription",
    tester1: { passed: true, note: "Flow was straightforward. Wanted stronger confirmation after action." },
    tester2: { passed: true, note: "Needed one extra tap but recommendation logic felt accurate." },
    rate: 100,
  },
];

const improvements = [
  {
    finding: "Confirmation feedback felt weak after cancellation",
    action: "Added a prominent success state with clear confirmation copy and summary of savings",
    icon: "✅",
  },
  {
    finding: "Cancel flow required one extra tap than expected",
    action: "Streamlined the cancel flow — reduced from 4 steps to 3, confirmation on same screen",
    icon: "⚡",
  },
  {
    finding: "Users wanted to see savings amount before committing",
    action: "Moved projected savings to the top of the recommendation card, before the action button",
    icon: "💰",
  },
];

const testers = [
  {
    name: "Aisha Johnson",
    age: 27,
    occupation: "UX Researcher",
    location: "New York, USA",
    rating: "9/10",
    overall: "Found the AI recommendations clear and trustworthy. The guided flow felt like having a financial advisor in the app.",
  },
  {
    name: "Carlos Rivera",
    age: 31,
    occupation: "Product Manager",
    location: "San Francisco, USA",
    rating: "8/10",
    overall: "The spending breakdown made patterns immediately visible. Felt empowered to act rather than just observe my finances.",
  },
];

const UsabilityTesting = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <section className="w-full bg-[#070B16] px-6 py-24 text-white md:px-12">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400">
            Usability Testing
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            Validating the guided AI flow with real users.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            I developed an interactive Figma prototype and conducted moderated
            usability testing. The test evaluated the guided AI flow's clarity,
            trust, and ease of use across three core task scenarios.
          </p>

          {/* Honest framing */}
          <div className="mt-6 flex items-start gap-3 rounded-[20px] border border-white/10 bg-white/[0.04] px-5 py-4 max-w-2xl">
            <span className="mt-0.5 text-slate-500">ℹ</span>
            <p className="text-sm leading-6 text-slate-400">
              This was a small-scale self-initiated study, not a full enterprise usability program.
              Participants were recruited through personal network. Results informed design iterations.
            </p>
          </div>
        </motion.div>

        {/* Methodology strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Participants", value: "2" },
            { label: "Method", value: "Moderated" },
            { label: "Format", value: "Remote · Zoom" },
            { label: "Tool", value: "Figma prototype" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4 text-center"
            >
              <div className="text-2xl font-bold text-white">{item.value}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-500">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scenario */}
        <div className="mt-10 rounded-[24px] border border-white/10 bg-white/[0.04] p-6 max-w-2xl">
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-3">Scenario</p>
          <p className="text-sm leading-relaxed text-slate-300">
            The user has just opened the app and wants to understand their
            subscription spending, identify unnecessary charges, and take
            action before the next renewal date.
          </p>
        </div>

        {/* Task results table */}
        <div className="mt-14">
          <h3 className="text-xl font-semibold text-white mb-6">Task completion results</h3>

          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04]">
            {/* Header */}
            <div className="grid grid-cols-[1fr_80px_80px_80px] gap-4 border-b border-white/10 bg-white/[0.04] px-6 py-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Task</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 text-center">Aisha</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 text-center">Carlos</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 text-center">Rate</span>
            </div>

            {tasks.map((t, i) => (
              <div key={i}>
                <button
                  className="w-full grid grid-cols-[1fr_80px_80px_80px] gap-4 px-6 py-4 text-left hover:bg-white/[0.02] transition-colors border-b border-white/[0.06] last:border-b-0"
                  onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                >
                  <span className="text-sm text-slate-300 flex items-center gap-2">
                    <span className="text-slate-600 text-xs">{String(i + 1).padStart(2, "0")}</span>
                    {t.task}
                  </span>
                  <span className="text-center self-center text-green-400 font-bold">✓</span>
                  <span className="text-center self-center text-green-400 font-bold">✓</span>
                  <span className="self-center flex justify-center">
                    <span className="inline-flex items-center rounded-full bg-green-500/10 border border-green-400/20 px-2.5 py-1 text-xs font-bold text-green-400">
                      {t.rate}%
                    </span>
                  </span>
                </button>

                {expandedRow === i && (
                  <div className="px-6 pb-4 bg-white/[0.02] border-b border-white/[0.06] grid md:grid-cols-2 gap-4">
                    <div className="rounded-[16px] border border-blue-400/20 bg-blue-500/10 px-4 py-3">
                      <p className="text-xs font-semibold text-blue-400 mb-1">Aisha</p>
                      <p className="text-xs leading-6 text-slate-300">{t.tester1.note}</p>
                    </div>
                    <div className="rounded-[16px] border border-blue-400/20 bg-blue-500/10 px-4 py-3">
                      <p className="text-xs font-semibold text-blue-400 mb-1">Carlos</p>
                      <p className="text-xs leading-6 text-slate-300">{t.tester2.note}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Overall */}
            <div className="grid grid-cols-[1fr_80px_80px_80px] gap-4 border-t border-white/10 bg-green-500/5 px-6 py-4">
              <span className="text-sm font-bold text-white">Overall task success rate</span>
              <span className="text-center self-center text-green-400 font-bold">3/3</span>
              <span className="text-center self-center text-green-400 font-bold">3/3</span>
              <span className="self-center flex justify-center">
                <span className="inline-flex items-center rounded-full bg-green-500/10 border border-green-400/20 px-2.5 py-1 text-xs font-bold text-green-400">
                  100%
                </span>
              </span>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-600 italic">
            Click any row to see individual tester observations.
          </p>
        </div>

        {/* Tester profiles */}
        <div className="mt-14">
          <h3 className="text-xl font-semibold text-white mb-6">Tester profiles & overall impressions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {testers.map((tester, index) => (
              <motion.div
                key={tester.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-400/20 flex items-center justify-center text-blue-300 font-bold text-lg flex-shrink-0">
                    {tester.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{tester.name}</p>
                    <p className="text-xs text-slate-400">{tester.age} · {tester.occupation} · {tester.location}</p>
                    <p className="text-sm font-semibold text-blue-400 mt-1">Ease of use: {tester.rating}</p>
                  </div>
                </div>
                <div className="border-t border-white/[0.06] pt-4">
                  <p className="text-sm italic leading-relaxed text-slate-300">"{tester.overall}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Improvements */}
        <div className="mt-14">
          <h3 className="text-xl font-semibold text-white mb-6">Improvements made based on findings</h3>
          <div className="grid md:grid-cols-3 gap-5">
            {improvements.map((item, i) => (
              <div
                key={i}
                className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Finding</p>
                <p className="text-sm text-slate-300 leading-6 mb-4">{item.finding}</p>
                <div className="border-t border-white/[0.06] pt-4">
                  <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-2">Action taken</p>
                  <p className="text-sm text-slate-300 leading-6">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default UsabilityTesting;
