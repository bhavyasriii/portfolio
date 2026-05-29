import React from "react";
import { Link } from "react-router-dom";

import Hero from "../components/case-study/fintech/Hero";
import Overview from "../components/case-study/fintech/Overview";
import Problem from "../components/case-study/fintech/Problem";
import Opportunity from "../components/case-study/fintech/Opportunity";
import AIDecisions from "../components/case-study/fintech/AIDecisions";
import UserFlow from "../components/case-study/fintech/UserFlow";
import ScreensShowcase from "../components/case-study/fintech/ScreensShowcase";
import UsabilityTesting from "../components/case-study/fintech/UsabilityTesting";
import DesignDecisions from "../components/case-study/fintech/DesignDecisions";
import Accessibility from "../components/case-study/fintech/Accessibility";
import Impact from "../components/case-study/fintech/Impact";
import NextSteps from "../components/case-study/fintech/NextSteps";
import Research from "../components/case-study/fintech/Research";
import LowFiWireframes from "../components/case-study/fintech/LowFiWireframes";
import MidFiScreens from "../components/case-study/fintech/MidFiScreens";

const CaseStudyFinTech: React.FC = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#EEF4FF] via-[#E3ECFF] to-[#D7E4FF] text-[#111827]">

      {/* Background Glow Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-[-220px] top-[-160px] h-[520px] w-[520px] rounded-full bg-blue-300/30 blur-[150px]" />

        <div className="absolute right-[-180px] top-[25%] h-[520px] w-[520px] rounded-full bg-cyan-200/30 blur-[160px]" />

        <div className="absolute bottom-[-240px] left-[30%] h-[480px] w-[480px] rounded-full bg-indigo-200/25 blur-[150px]" />

      </div>

      <div className="relative z-10">

        {/* Back Button */}
        <div className="mx-auto max-w-7xl px-6 pt-8 md:px-12 md:pt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#C7D7F2] bg-white/70 px-4 py-2 text-sm font-medium text-[#374151] shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-[1px] hover:border-[#AFC6EE] hover:bg-white hover:text-[#111827]"
          >
            <span aria-hidden="true">←</span>
            <span>Back</span>
          </Link>
        </div>

        {/* Sections */}
        <Hero />
        <Overview />
        <Problem />
        <Research />
        <Opportunity />
        <AIDecisions />
        <UserFlow />
        <LowFiWireframes />
        <MidFiScreens />
        <ScreensShowcase />
        <UsabilityTesting />
        <DesignDecisions />
        <Accessibility />
        <Impact />
        <NextSteps />

      </div>
    </main>
  );
};

export default CaseStudyFinTech;