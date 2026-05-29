import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B1120] px-6 py-24 text-white md:px-12 md:py-32">

      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full bg-blue-500/20 blur-[140px]" />
        <div className="absolute bottom-[-140px] right-[-100px] h-[420px] w-[420px] rounded-full bg-purple-500/20 blur-[140px]" />
      </div>

      {/* ✨ Main Content */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-20 md:grid-cols-2">

        {/* LEFT SIDE */}
        <div>

          {/* Small Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 text-sm uppercase tracking-[0.3em] text-blue-400"
          >
            Fintech UX Case Study
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold leading-[1.05] md:text-7xl"
          >
            AI-Powered
            <br />
            Subscription
            <br />
            Optimization
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl"
          >
            Helping users reduce recurring costs through intelligent
            financial insights, subscription tracking, and AI-powered
            optimization recommendations.
          </motion.p>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-4 text-sm text-slate-300"
          >
           {/* <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              Role: UX Designer
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              Timeline: 2 Weeks
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              Tools: Figma, React
            </span> */}
          </motion.div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="relative flex justify-center"
        >

          {/* Glow Behind Image */}
          <div className="absolute h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px]" />

          {/* Hero Image */}
          <img
            src="/case-studies/fintech/hero.png"
            alt="Fintech App Preview"
            className="relative z-10 w-full max-w-[700px] object-contain"
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center text-sm text-slate-400"
      >
        <span>Scroll</span>

        <div className="mt-2 h-8 w-[2px] bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}