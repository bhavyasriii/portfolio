import { motion } from "framer-motion";

const testers = [
  {
    avatarUrl: "https://i.pravatar.cc/150?img=44",
    name: "Aisha Johnson",
    age: 27,
    occupation: "UX Researcher",
    location: "New York, USA",
    rating: "9/10",
    overall: "Found the AI recommendations clear and trustworthy. The guided flow felt like having a financial advisor in the app.",
    task1: "Easily identified the most expensive subscription. The card layout made it immediately scannable.",
    task2: "AI optimization suggestions were direct and confidence-building. Appreciated the savings amount shown upfront.",
    task3: "Cancel flow was straightforward. Would have liked stronger confirmation that the action was completed.",
  },
  {
    avatarUrl: "https://i.pravatar.cc/150?img=68",
    name: "Carlos Rivera",
    age: 31,
    occupation: "Product Manager",
    location: "San Francisco, USA",
    rating: "8/10",
    overall: "The spending breakdown made patterns immediately visible. Felt empowered to act rather than just observe my finances.",
    task1: "Dashboard gave a clear overview. Renewal alerts were prominent and easy to understand at a glance.",
    task2: "Subscriptions page clearly grouped upcoming renewals. The Due Soon state drew attention effectively.",
    task3: "Optimize flow needed one extra tap than expected but the recommendation logic felt accurate and trustworthy.",
  },
];

const UsabilityTesting = () => {
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
            usability testing with a small group of volunteers. The test was
            structured around three core task scenarios to evaluate the guided
            AI flow's clarity, trust, and ease of use.
          </p>

          {/* Scenario + Tasks */}
          <div className="mt-8 max-w-2xl">
            <p className="text-base leading-relaxed text-slate-300 mb-4">
              <span className="font-semibold text-white">Scenario:</span>{" "}
              The user has just opened the app and wants to understand their
              subscription spending, identify unnecessary charges, and take
              action before the next renewal date.
            </p>
            {[
              { n: "Task 1", t: "Navigate the home dashboard and identify the most expensive active subscription." },
              { n: "Task 2", t: "Review AI optimization suggestions and understand the recommended action." },
              { n: "Task 3", t: "Complete the cancel or pause flow for a flagged subscription." },
            ].map((task) => (
              <p key={task.n} className="text-sm text-slate-400 leading-relaxed mb-2">
                <span className="font-semibold text-slate-200">{task.n}:</span>{" "}
                {task.t}
              </p>
            ))}
            <p className="text-sm text-slate-500 italic mt-5">
              This approach allowed me to gather direct insights on the app's
              interface clarity and AI guidance effectiveness from target users.
            </p>
          </div>
        </motion.div>

        {/* Tester cards */}
        <div className="mt-16 flex flex-col gap-8">
          {testers.map((tester, index) => (
            <motion.div
              key={tester.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-8 md:grid-cols-[1fr_380px]"
            >
              {/* Left — session results */}
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_70px_rgba(0,0,0,0.3)]">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
                  Tester {index + 1} -- Session Results
                </p>
                <p className="mt-4 text-sm italic text-slate-300 leading-relaxed border-l-2 border-blue-400/30 pl-4 mb-6">
                  "{tester.overall}"
                </p>
                {[
                  { label: "Task 1", text: tester.task1 },
                  { label: "Task 2", text: tester.task2 },
                  { label: "Task 3", text: tester.task3 },
                ].map((item) => (
                  <p key={item.label} className="text-sm text-slate-400 leading-relaxed mb-3">
                    <span className="font-semibold text-slate-200">{item.label}:</span>{" "}
                    {item.text}
                  </p>
                ))}
              </div>

              {/* Right — tester card */}
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.3)]">
                <div className="flex items-start gap-4 mb-5">
                  <img
                    src={tester.avatarUrl}
                    alt={tester.name}
                    className="w-16 h-16 rounded-full object-cover border border-white/10 flex-shrink-0"
                  />
                  <div>
                    <p className="text-base font-semibold text-white mb-1">
                      Name: {tester.name}
                    </p>
                    <p className="text-xs text-slate-400 mb-0.5">Age: {tester.age}</p>
                    <p className="text-xs text-slate-400 mb-0.5">Occupation: {tester.occupation}</p>
                    <p className="text-xs text-slate-400">Location: {tester.location}</p>
                  </div>
                </div>

                <div className="h-px bg-white/[0.06] mb-5" />

                <p className="text-xs text-slate-500 mb-1">
                  Ease of Use: 1 (Impossible), 10 (Effortless)
                </p>
                <p className="text-sm font-semibold text-blue-400 mb-5">
                  Rating: {tester.rating}
                </p>

                <div className="h-px bg-white/[0.06] mb-5" />

                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1">Overall Impression</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{tester.overall}</p>
                  </div>
                  {[
                    { label: "Task 1", text: tester.task1 },
                    { label: "Task 2", text: tester.task2 },
                    { label: "Task 3", text: tester.task3 },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs font-semibold text-slate-400 mb-1">{item.label}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default UsabilityTesting;
