import React from "react";
import { Link } from "react-router-dom";

import HeroSection from "../components/case-study/healthcare/HeroSection";
import OverviewSection from "../components/case-study/healthcare/OverviewSection";
import ResearchSection from "../components/case-study/healthcare/ResearchSection";
import JourneySection from "../components/case-study/healthcare/JourneySection";
import ExperienceComparisonSection from "../components/case-study/healthcare/ExperienceComparisonSection";
import DesignStrategySection from "../components/case-study/healthcare/DesignStrategySection";
import UserFlowSection from "../components/case-study/healthcare/UserFlowSection";
import SolutionSection from "../components/case-study/healthcare/SolutionSection";
import MidFiSection from "../components/case-study/healthcare/MidFiSection";
import FinalUIPrototypeSection from "../components/case-study/healthcare/FinalUIPrototypeSection";
import KeyUXDecisionsSection from "../components/case-study/healthcare/KeyUXDecisionsSection";
import SmartTriageLogicSection from "../components/case-study/healthcare/SmartTriageLogicSection";
import AccessibilityValidationSection from "../components/case-study/healthcare/AccessibilityValidationSection";
import UserTestingSection from "../components/case-study/healthcare/UserTestingSection";
import ExpectedOutcomesSection from "../components/case-study/healthcare/ExpectedOutcomesSection";
import ReflectionSection from "../components/case-study/healthcare/ReflectionSection";
import FutureImprovementsSection from "../components/case-study/healthcare/FutureImprovementsSection";

const CaseStudyHealthcare: React.FC = () => {
  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-8 md:pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-[1px] hover:border-gray-300 hover:text-gray-900 hover:shadow-md"
        >
          <span aria-hidden="true">←</span>
          <span>Back</span>
        </Link>
      </div>

      <HeroSection />
      <OverviewSection />
      <ResearchSection />
      <JourneySection />
      <ExperienceComparisonSection />
      <DesignStrategySection />
      <UserFlowSection />
      <SolutionSection />
      <MidFiSection />
      <FinalUIPrototypeSection />
      <KeyUXDecisionsSection />
      <SmartTriageLogicSection />
      <AccessibilityValidationSection />
      <UserTestingSection />
      <ExpectedOutcomesSection />
      <ReflectionSection />
      <FutureImprovementsSection />
    </main>
  );
};

export default CaseStudyHealthcare;