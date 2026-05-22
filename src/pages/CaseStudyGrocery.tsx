import React from "react";
import Navbar from "../components/Navbar";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiPlay,
  FiTool,
  FiUser,
} from "react-icons/fi";
import heroImage from "../assets/case-studies/grocery/hero.png";
import abhimanyuPersona from "../assets/images/grocery/abhimanyu-persona.png";
import ananyaPersona from "../assets/images/grocery/ananya-persona.png";
//import { a } from "framer-motion/client";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.14 },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6DBE7B]">
      {children}
    </p>
  );
}

function EditorialTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-serif text-4xl leading-[1.02] text-[#101828] md:text-6xl ${className}`}
    >
      {children}
    </h2>
  );
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-[#6DBE7B]">{icon}</div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#667085]">
          {label}
        </p>
        <p className="mt-1 text-sm text-[#101828]">{value}</p>
      </div>
    </div>
  );
}

function PlaceholderPanel({
  title,
  subtitle,
  height = "h-[420px]",
  tone = "light",
}: {
  title: string;
  subtitle?: string;
  height?: string;
  tone?: "light" | "green" | "beige";
}) {
  const bg =
    tone === "green"
      ? "bg-[#EEF7F0]"
      : tone === "beige"
      ? "bg-[#F7F4EE]"
      : "bg-white";

  return (
    <div
      className={`w-full ${height} rounded-[28px] border border-[#E6ECE8] ${bg} flex items-center justify-center px-6 text-center`}
    >
      <div>
        <div className="mx-auto mb-4 h-14 w-14 rounded-2xl border border-[#E6ECE8] bg-white" />
        <p className="text-lg font-medium text-[#101828]">{title}</p>
        {subtitle && (
          <p className="mt-2 max-w-md text-sm leading-7 text-[#667085]">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

function QuoteLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-[#E6ECE8] py-6 last:border-b-0">
      <p className="font-serif text-2xl leading-relaxed text-[#101828] md:text-[2rem]">
        “{children}”
      </p>
    </div>
  );
}

function BulletRow({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-[11px] h-2.5 w-2.5 shrink-0 rounded-full bg-[#6DBE7B]" />
      <p className="text-base leading-8 text-[#475467]">{text}</p>
    </div>
  );
}

function OutcomePill({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full border border-[#E6ECE8] bg-white px-5 py-3 text-sm text-[#475467]">
      {children}
    </div>
  );
}

export default function CaseStudyGrocery() {
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.35,
  });

  const goals = [
    "Helps users decide what to buy faster",
    "Uses AI to generate smart suggestions",
    "Creates structured and organized grocery lists",
    "Enables a smooth and confident checkout process",
  ];

  const insights = [
    "Grocery lists are often inconsistent or incomplete",
    "Users depend heavily on memory instead of structured planning",
    "People prefer guidance over browsing endless options",
    "Speed and simplicity matter more than customization",
  ];

  const uxDecisions = [
    "AI-generated lists eliminate manual list creation by providing smart, ready-to-use suggestions",
    "Categorized items improve scanability and reduce mental effort",
    "Progressive disclosure reveals information step-by-step to prevent overwhelm",
    "Confirmation states are designed to feel complete and trustworthy",
  ];

  const outcomes = [
    "Reduce time spent planning groceries",
    "Prevent missed items",
    "Improve decision confidence",
    "Create a smoother checkout experience",
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8FAF7] text-[#101828]">
      <motion.div className="fixed left-0 right-0 top-0 z-[90] h-[3px] bg-black/5">
        <motion.div
          className="h-full origin-left bg-[#6DBE7B]"
          style={{ scaleX: progressX }}
        />
      </motion.div>

      <Navbar />

      <main className="pt-24">
        {/* HERO */}
        <section className="px-6 pb-14 pt-10 md:px-10 lg:px-14">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-end">
              <motion.div {...fadeUp} className="max-w-2xl">
                <SectionLabel>AI Grocery Planning Assistant</SectionLabel>

                <h1 className="mt-5 font-serif text-5xl leading-[0.95] text-[#101828] md:text-7xl xl:text-[5.8rem]">
                  Grocery planning,
                  <span className="block text-[#6A7B70]">
                    redesigned as a calmer guided flow.
                  </span>
                </h1>

                <p className="mt-8 text-lg leading-8 text-[#475467]">
      A guided grocery planning experience that uses AI-powered
      suggestions to reduce decision fatigue and simplify everyday
      shopping.
    </p>
  </motion.div>

  {/* RIGHT → IMAGE */}
  <motion.div {...fadeUp}>
  <div className="h-[440px] md:h-[620px] overflow-hidden rounded-[28px] border border-[#E6ECE8] bg-[#F7F4EE]">
    <img
      src={heroImage}
      alt="Grocery hero"
      className="h-full w-full object-cover"
    />
  </div>
</motion.div>

</div>

            <motion.div
              {...fadeUp}
              className="mt-10 border-t border-[#E6ECE8] pt-8"
            >
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-5">
                <MetaItem
                  icon={<FiUser />}
                  label="Role"
                  value="UX Designer"
                />
                <MetaItem
                  icon={<FiClock />}
                  label="Timeline"
                  value="4 Weeks"
                />
                <MetaItem
                  icon={<FiTool />}
                  label="Tools"
                  value="Figma, FigJam"
                />
                <MetaItem
                  icon={<FiCheckCircle />}
                  label="Scope"
                  value="Research, Wireframing"
                />
                <MetaItem
                  icon={<FiArrowRight />}
                  label="Also Included"
                  value="UI Design, Prototyping"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="border-y border-[#E6ECE8] bg-white/70 px-6 py-8 md:px-10 lg:px-14">
          <motion.div {...fadeUp} className="mx-auto max-w-6xl">
            <p className="text-lg leading-9 text-[#475467] md:text-xl">
              Designed a smart grocery planning experience that helps users
              quickly decide what to buy, generate structured grocery lists,
              and complete checkout with confidence — all in a guided,
              low-friction flow.
            </p>
          </motion.div>
        </section>

        {/* PROBLEM + GOAL */}
        <section className="px-6 py-24 md:px-10 lg:px-14">
          <div className="mx-auto grid max-w-7xl gap-16 xl:grid-cols-[1fr_1fr]">
            <motion.div {...fadeUp}>
              <SectionLabel>The Problem</SectionLabel>
              <EditorialTitle className="mt-4 max-w-2xl">
                The shopping itself is manageable. The planning before it is not.
              </EditorialTitle>

              <div className="mt-10 max-w-2xl space-y-6 text-lg leading-9 text-[#475467]">
                <p>
                  Grocery shopping is not inherently difficult, but the planning
                  process leading up to it is often unstructured and
                  time-consuming.
                </p>
                <p>
                  Users frequently rely on memory, make incomplete lists, or
                  spend excessive time browsing without clear direction. Most
                  existing grocery apps focus on purchasing, not planning.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUp}>
              <SectionLabel>The Goal</SectionLabel>
              <EditorialTitle className="mt-4 max-w-2xl">
                Build a guided experience that helps users decide faster and shop with more confidence.
              </EditorialTitle>

              <div className="mt-10 space-y-5">
                {goals.map((item) => (
                  <BulletRow key={item} text={item} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* RESEARCH */}
        <section className="bg-[#EEF7F0] px-6 py-24 md:px-10 lg:px-14">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeUp}>
              <SectionLabel>Understanding Users</SectionLabel>
              <EditorialTitle className="mt-4 max-w-4xl">
                Users are not looking for more options. They are looking for less friction.
              </EditorialTitle>
            </motion.div>

            <div className="mt-14 grid gap-10 xl:grid-cols-[0.95fr_1.05fr]">
              <motion.div {...fadeUp} className="rounded-[30px] bg-white px-8 py-2">
                <QuoteLine>
                  I’ve applied my own memory to grocery planning for too long, and I still forget important things.
                </QuoteLine>
                <QuoteLine>
                  I want help deciding what to buy, not a huge list of endless options.
                </QuoteLine>
                <QuoteLine>
                  Tailoring meals and shopping every week is more tiring than it should be.
                </QuoteLine>
                <QuoteLine>
                  Shopping feels easier when the app guides me instead of making me browse everything.
                </QuoteLine>
              </motion.div>

              <motion.div {...fadeUp} className="flex flex-col justify-between">
                <div className="rounded-[30px] bg-white p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#667085]">
                    Key Insights
                  </p>
                  <div className="mt-6 space-y-5">
                    {insights.map((item) => (
                      <BulletRow key={item} text={item} />
                    ))}
                  </div>
                </div>

                <div className="mt-8 rounded-[30px] bg-[#F7F4EE] p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#667085]">
                    Insight Statement
                  </p>
                  <p className="mt-5 font-serif text-3xl leading-[1.3] text-[#101828] md:text-4xl">
                    Users are not looking for more choices — they are looking
                    for less friction and clearer direction.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
{/* PERSONAS */}
<section className="px-6 py-24 md:px-10 lg:px-14">
  <div className="mx-auto max-w-7xl">
    <motion.div {...fadeUp} className="max-w-4xl">
      <SectionLabel>Personas</SectionLabel>
      <EditorialTitle className="mt-4">
        Two distinct user mindsets shaped the product direction.
      </EditorialTitle>
      <p className="mt-6 text-lg leading-8 text-[#475467]">
        These personas revealed two key needs in the experience: speed for users
        who want to complete shopping quickly, and guidance for users who need
        more support while planning meals and grocery lists.
      </p>
    </motion.div>

    <div className="mt-14 space-y-12">
      {/* Abhimanyu */}
      <motion.div {...fadeUp}>
        <div className="overflow-hidden rounded-[30px] border border-[#E6ECE8] bg-white shadow-[0_12px_32px_rgba(16,24,40,0.05)]">
          <div className="grid xl:grid-cols-[0.95fr_1.45fr]">
            {/* Left Image + Basic Details */}
            <div className="border-b border-[#E6ECE8] xl:border-b-0 xl:border-r">
              <div className="overflow-hidden">
                <img
                  src={abhimanyuPersona}
                  alt="Abhimanyu persona"
                  className="h-[360px] w-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="inline-block rounded-[22px] bg-[#ECEFF3] px-6 py-4">
                  <h3 className="text-3xl font-medium text-[#1F2937]">
                    Abhimanyu Reddy
                  </h3>
                </div>

                <div className="mt-8 space-y-5 text-[18px] leading-8 text-[#2D3748]">
                  <p>Age: 28</p>
                  <p>Occupation: Software Engineer</p>
                  <p>Location: Dallas, Texas</p>
                  <p>Living Situation: Live with Family</p>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="grid">
              <div className="border-b border-[#E6ECE8] p-8 md:p-10">
                <p className="font-serif text-4xl italic leading-tight text-[#101828] md:text-5xl">
                  “I don’t have time to figure things out — I need it done fast.”
                </p>

                <div className="mt-8 rounded-[20px] bg-[#E9EFF8] p-6">
                  <p className="text-[18px] leading-9 text-[#1F2937]">
                    Abhimanyu is a working professional with a busy schedule,
                    balancing long work hours with personal responsibilities. He
                    prefers quick and efficient solutions when it comes to
                    everyday tasks like grocery shopping.
                  </p>

                  <p className="mt-4 text-[18px] leading-9 text-[#1F2937]">
                    He does not want to spend time browsing through multiple
                    options or navigating complex interfaces. Instead, he values
                    a straightforward experience that helps him find what he
                    needs and complete his tasks with minimal effort.
                  </p>

                  <p className="mt-4 text-[18px] leading-9 text-[#1F2937]">
                    For Abhimanyu, speed, simplicity, and clarity are essential.
                    He expects to complete his shopping in just a few taps
                    without unnecessary steps or distractions.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2">
                <div className="border-b border-[#E6ECE8] p-8 md:border-b-0 md:border-r md:p-10">
                  <h4 className="text-2xl font-semibold text-[#1D6F42]">
                    Goals
                  </h4>

                  <ul className="mt-8 space-y-4 text-[18px] leading-9 text-[#1F2937]">
                    <li>• Quickly find and add items</li>
                    <li>• Complete shopping in minimal steps</li>
                    <li>• Reorder frequently used items easily</li>
                    <li>• Save time during checkout</li>
                  </ul>
                </div>

                <div className="p-8 md:p-10">
                  <h4 className="text-2xl font-semibold text-[#C81E1E]">
                    Frustrations
                  </h4>

                  <ul className="mt-8 space-y-4 text-[18px] leading-9 text-[#1F2937]">
                    <li>• Too many steps in the process</li>
                    <li>• Slow or cluttered interfaces</li>
                    <li>• Difficulty finding items quickly</li>
                    <li>• Repeating the same actions every time</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ananya */}
      <motion.div {...fadeUp}>
        <div className="overflow-hidden rounded-[30px] border border-[#E6ECE8] bg-white shadow-[0_12px_32px_rgba(16,24,40,0.05)]">
          <div className="grid xl:grid-cols-[0.95fr_1.45fr]">
            {/* Left Image + Basic Details */}
            <div className="border-b border-[#E6ECE8] xl:border-b-0 xl:border-r">
              <div className="overflow-hidden">
                <img
                  src={ananyaPersona}
                  alt="Ananya persona"
                  className="h-[360px] w-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="inline-block rounded-[22px] bg-[#ECEFF3] px-6 py-4">
                  <h3 className="text-3xl font-medium text-[#1F2937]">
                    Ananya Reddy, 24
                  </h3>
                </div>

                <div className="mt-8 space-y-5 text-[18px] leading-8 text-[#2D3748]">
                  <p>Age: 24</p>
                  <p>Occupation: Graduate Student</p>
                  <p>Education: Master’s Student (Computer Science)</p>
                  <p>Location: Tempe, Arizona</p>
                  <p>Gender: She/Her</p>
                  <p>Living Situation: Lives independently</p>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="grid">
              <div className="border-b border-[#E6ECE8] p-8 md:p-10">
                <p className="font-serif text-4xl italic leading-tight text-[#101828] md:text-5xl">
                  “I just want grocery shopping to be quick and stress-free.”
                </p>

                <div className="mt-8 rounded-[20px] bg-[#E9EFF8] p-6">
                  <p className="text-[18px] leading-9 text-[#1F2937]">
                    Ananya is someone who prefers planning ahead, especially
                    when it comes to groceries and meals. She enjoys organizing
                    her week but often finds it overwhelming to decide what to
                    cook and which ingredients to buy.
                  </p>

                  <p className="mt-4 text-[18px] leading-9 text-[#1F2937]">
                    Instead of starting from scratch every time, she looks for
                    guidance that can simplify her planning process. She values
                    experiences that feel supportive and structured, helping her
                    make decisions with confidence.
                  </p>

                  <p className="mt-4 text-[18px] leading-9 text-[#1F2937]">
                    For Ananya, the ideal experience does not just enable
                    shopping — it guides her through the process, making
                    planning feel effortless rather than stressful.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2">
                <div className="border-b border-[#E6ECE8] p-8 md:border-b-0 md:border-r md:p-10">
                  <h4 className="text-2xl font-semibold text-[#1D6F42]">
                    Goals
                  </h4>

                  <ul className="mt-8 space-y-4 text-[18px] leading-9 text-[#1F2937]">
                    <li>• Plan meals in a structured way</li>
                    <li>• Get helpful suggestions for what to buy</li>
                    <li>• Avoid missing important ingredients</li>
                    <li>• Feel confident about her decisions</li>
                  </ul>
                </div>

                <div className="p-8 md:p-10">
                  <h4 className="text-2xl font-semibold text-[#C81E1E]">
                    Frustrations
                  </h4>

                  <ul className="mt-8 space-y-4 text-[18px] leading-9 text-[#1F2937]">
                    <li>• Unsure what ingredients are needed</li>
                    <li>• Overwhelmed by too many choices</li>
                    <li>• Manual planning feels time-consuming</li>
                    <li>• Lack of guidance in most apps</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>
        {/* AFFINITY MAP */}
        <section className="bg-white px-6 py-24 md:px-10 lg:px-14">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeUp} className="grid gap-10 xl:grid-cols-[0.38fr_0.62fr]">
              <div className="max-w-xl">
                <SectionLabel>Affinity Mapping</SectionLabel>
                <EditorialTitle className="mt-4">
                  Synthesizing repeated patterns from research.
                </EditorialTitle>
                <p className="mt-6 text-lg leading-8 text-[#475467]">
                  Affinity mapping helped organize repeated themes around meal
                  planning, shopping behavior, category confusion, list-building,
                  and decision fatigue.
                </p>
              </div>

              <div>
                <PlaceholderPanel
                  title="Affinity Map"
                  subtitle="Place the full affinity mapping board here."
                  height="h-[760px]"
                  tone="green"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* USER FLOW */}
        <section className="bg-[#F7F4EE] px-6 py-24 md:px-10 lg:px-14">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeUp} className="max-w-4xl">
              <SectionLabel>User Flows</SectionLabel>
              <EditorialTitle className="mt-4">
                The experience supports both guided planning and direct shopping.
              </EditorialTitle>
            </motion.div>

            <div className="mt-14 grid gap-10 xl:grid-cols-[0.42fr_0.58fr]">
              <motion.div {...fadeUp} className="space-y-8">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#667085]">
                    Flow 1 — Guided Grocery Planning
                  </p>
                  <p className="mt-4 text-lg leading-8 text-[#475467]">
                    Home → AI Suggestions → Select Meal → Generate Grocery List
                    → Review Cart → Checkout → Confirmation
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#667085]">
                    Flow 2 — Direct Shopping
                  </p>
                  <p className="mt-4 text-lg leading-8 text-[#475467]">
                    Home → Search / Quick Add → Cart → Checkout
                  </p>
                </div>

                <div className="rounded-[28px] border border-[#E6ECE8] bg-white p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#667085]">
                    Approach
                  </p>
                  <p className="mt-4 text-base leading-8 text-[#475467]">
                    The primary flow focuses on guided decision-making, while
                    the secondary flow supports users who prefer speed and
                    familiarity.
                  </p>
                </div>
              </motion.div>

              <motion.div {...fadeUp}>
                <PlaceholderPanel
                  title="User Flow / Journey Board"
                  subtitle="Place the journey map or user flow image here."
                  height="h-[760px]"
                  tone="light"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* WIREFRAMES */}
        <section className="px-6 py-24 md:px-10 lg:px-14">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeUp} className="max-w-4xl">
              <SectionLabel>Low-Fidelity Wireframes</SectionLabel>
              <EditorialTitle className="mt-4">
                Early exploration focused on flow, hierarchy, and decision points.
              </EditorialTitle>
              <p className="mt-6 text-lg leading-8 text-[#475467]">
                These wireframes helped validate navigation flow, screen
                structure, and the moments where users needed clarity most.
              </p>
            </motion.div>

            <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              <motion.div {...fadeUp}>
                <PlaceholderPanel
                  title="Wireframe 01"
                  subtitle="Home"
                  height="h-[420px]"
                  tone="green"
                />
              </motion.div>

              <motion.div {...fadeUp}>
                <PlaceholderPanel
                  title="Wireframe 02"
                  subtitle="Meal Selection / Grocery List"
                  height="h-[420px]"
                  tone="green"
                />
              </motion.div>

              <motion.div {...fadeUp}>
                <PlaceholderPanel
                  title="Wireframe 03"
                  subtitle="Checkout / Confirmation"
                  height="h-[420px]"
                  tone="green"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ITERATIONS */}
        <section className="border-y border-[#E6ECE8] bg-white px-6 py-24 md:px-10 lg:px-14">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeUp} className="max-w-4xl">
              <SectionLabel>Iteration Highlights</SectionLabel>
              <EditorialTitle className="mt-4">
                The design evolved from browsing-heavy to more guided and reassuring.
              </EditorialTitle>
            </motion.div>

            <div className="mt-14 space-y-12">
              <motion.div
                {...fadeUp}
                className="grid gap-8 border-b border-[#E6ECE8] pb-12 xl:grid-cols-[0.32fr_0.68fr]"
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#667085]">
                    01
                  </p>
                  <h3 className="mt-3 font-serif text-3xl text-[#101828]">
                    From Browsing to AI Guidance
                  </h3>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#667085]">
                      Before
                    </p>
                    <p className="mt-3 text-base leading-8 text-[#475467]">
                      Initial designs relied on browsing categories and standard
                      product exploration.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6DBE7B]">
                      After
                    </p>
                    <p className="mt-3 text-base leading-8 text-[#475467]">
                      AI-driven suggestions reduced decision effort and made the
                      experience feel more guided from the beginning.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                {...fadeUp}
                className="grid gap-8 border-b border-[#E6ECE8] pb-12 xl:grid-cols-[0.32fr_0.68fr]"
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#667085]">
                    02
                  </p>
                  <h3 className="mt-3 font-serif text-3xl text-[#101828]">
                    From Flat Layouts to Structured Cards
                  </h3>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#667085]">
                      Before
                    </p>
                    <p className="mt-3 text-base leading-8 text-[#475467]">
                      Earlier layouts lacked visual hierarchy and made scanning
                      harder than it needed to be.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6DBE7B]">
                      After
                    </p>
                    <p className="mt-3 text-base leading-8 text-[#475467]">
                      Structured grouping improved readability, category clarity,
                      and decision speed.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                {...fadeUp}
                className="grid gap-8 xl:grid-cols-[0.32fr_0.68fr]"
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#667085]">
                    03
                  </p>
                  <h3 className="mt-3 font-serif text-3xl text-[#101828]">
                    From Functional to Reassuring Checkout
                  </h3>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#667085]">
                      Before
                    </p>
                    <p className="mt-3 text-base leading-8 text-[#475467]">
                      Checkout was usable, but emotionally flat and not very confidence-building.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6DBE7B]">
                      After
                    </p>
                    <p className="mt-3 text-base leading-8 text-[#475467]">
                      The final version felt calmer, easier to review, and more trustworthy.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FINAL UI */}
        <section className="bg-[#EEF7F0] px-6 py-24 md:px-10 lg:px-14">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeUp} className="max-w-5xl">
              <SectionLabel>Final UI Screens</SectionLabel>
              <EditorialTitle className="mt-4">
                The final interface becomes the main story.
              </EditorialTitle>
              <p className="mt-6 text-lg leading-8 text-[#475467]">
                Final screens should feel like the visual centerpiece of the
                case study — not small supporting assets.
              </p>
            </motion.div>

            <div className="mt-14 space-y-8">
              <motion.div {...fadeUp}>
                <PlaceholderPanel
                  title="Main Final UI Showcase"
                  subtitle="Use your strongest composite, hero screen set, or polished multi-screen arrangement here."
                  height="h-[720px]"
                  tone="light"
                />
              </motion.div>

              <div className="grid gap-8 md:grid-cols-2">
                <motion.div {...fadeUp}>
                  <PlaceholderPanel
                    title="Home / AI Suggestions"
                    subtitle="Large mockup placement"
                    height="h-[520px]"
                    tone="beige"
                  />
                </motion.div>

                <motion.div {...fadeUp}>
                  <PlaceholderPanel
                    title="Meal Selection / Grocery List"
                    subtitle="Large mockup placement"
                    height="h-[520px]"
                    tone="beige"
                  />
                </motion.div>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                <motion.div {...fadeUp}>
                  <PlaceholderPanel
                    title="Smart Grocery List"
                    subtitle="Essentials / Add-ons / Healthy choices"
                    height="h-[420px]"
                    tone="light"
                  />
                </motion.div>

                <motion.div {...fadeUp}>
                  <PlaceholderPanel
                    title="Checkout"
                    subtitle="Pricing, delivery, payment"
                    height="h-[420px]"
                    tone="light"
                  />
                </motion.div>

                <motion.div {...fadeUp}>
                  <PlaceholderPanel
                    title="Confirmation"
                    subtitle="Completion state and success feedback"
                    height="h-[420px]"
                    tone="light"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* UX DECISIONS */}
        <section className="px-6 py-24 md:px-10 lg:px-14">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-14 xl:grid-cols-[0.9fr_1.1fr]">
              <motion.div {...fadeUp}>
                <SectionLabel>Key UX Decisions</SectionLabel>
                <EditorialTitle className="mt-4 max-w-xl">
                  The strongest value came from structure, not just features.
                </EditorialTitle>
              </motion.div>

              <motion.div {...fadeUp} className="space-y-6">
                {uxDecisions.map((item, index) => (
                  <div
                    key={item}
                    className="grid gap-4 border-b border-[#E6ECE8] pb-6 last:border-b-0"
                  >
                    <div className="flex items-start gap-4">
                      <span className="min-w-[34px] text-sm font-semibold text-[#6DBE7B]">
                        0{index + 1}
                      </span>
                      <p className="text-lg leading-8 text-[#475467]">{item}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROTOTYPE */}
        <section className="bg-[#F7F4EE] px-6 py-24 md:px-10 lg:px-14">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="text-center">
              <SectionLabel>Prototype & Interactions</SectionLabel>
              <EditorialTitle className="mt-4">
                A standout section for motion, transitions, and guided progression.
              </EditorialTitle>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#475467]">
                The prototype focuses on clear selection states, smooth screen
                transitions, enabled and disabled CTA feedback, and seamless
                step-by-step progression.
              </p>
            </motion.div>

            <motion.div {...fadeUp} className="mt-14">
              <div className="rounded-[32px] border border-[#E6ECE8] bg-white p-6 md:p-8">
                <div className="flex h-[620px] items-center justify-center rounded-[24px] bg-[#F8FAF7] text-center">
                  <div>
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF7F0] text-[#6DBE7B]">
                      <FiPlay className="text-2xl" />
                    </div>
                    <p className="text-2xl font-medium text-[#101828]">
                      Prototype Video / GIF
                    </p>
                    <p className="mx-auto mt-3 max-w-xl text-base leading-8 text-[#667085]">
                      Place your prototype media here as the main interaction showcase.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* OUTCOMES */}
        <section className="px-6 py-24 md:px-10 lg:px-14">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="text-center">
              <SectionLabel>Expected Outcome</SectionLabel>
              <EditorialTitle className="mt-4">
                Designed to make grocery planning faster, calmer, and more reliable.
              </EditorialTitle>
            </motion.div>

            <motion.div
              {...fadeUp}
              className="mt-14 flex flex-wrap justify-center gap-4"
            >
              {outcomes.map((item) => (
                <OutcomePill key={item}>{item}</OutcomePill>
              ))}
            </motion.div>
          </div>
        </section>

        {/* REFLECTION */}
        <section className="border-t border-[#E6ECE8] bg-white px-6 py-24 md:px-10 lg:px-14">
          <div className="mx-auto max-w-5xl">
            <motion.div {...fadeUp}>
              <SectionLabel>Reflection</SectionLabel>
              <EditorialTitle className="mt-4">
                AI was useful here because it supported everyday decisions without becoming the center of attention.
              </EditorialTitle>

              <div className="mt-10 space-y-6 text-lg leading-9 text-[#475467]">
                <p>
                  This project explored how AI can support everyday
                  decision-making in a practical way.
                </p>
                <p>
                  The biggest challenge was balancing guidance with simplicity —
                  providing smart suggestions without overwhelming users.
                </p>
                <p>
                  Through iteration, I learned how structure, hierarchy, and
                  visual tone directly influence user confidence.
                </p>
              </div>

              <div className="mt-12">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#667085]">
                  Next Steps
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {[
                    "Personalization based on dietary preferences",
                    "Weekly planning automation",
                    "Repeat purchase recommendations",
                  ].map((item) => (
                    <div
                      key={item}
                      className="border-t border-[#E6ECE8] pt-4 text-base leading-8 text-[#475467]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}