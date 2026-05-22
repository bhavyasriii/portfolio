import HeroSection from "../components/case-study/gro-rem/HeroSection";
import OverviewSection from "../components/case-study/gro-rem/OverviewSection";
import ProblemSection from "../components/case-study/gro-rem/ProblemSection";
import OpportunitySection from "../components/case-study/gro-rem/OpportunitySection";
import UsersSection from "../components/case-study/gro-rem/UserSection";
import SolutionSection from "../components/case-study/gro-rem/SolutionSection";
import SmartAISection from "../components/case-study/gro-rem/SmartAISection";
import KeyFeaturesSection from "../components/case-study/gro-rem/KeyFeaturesSection";
import UserFlowSection from "../components/case-study/gro-rem/UserFlowSection";
import FinalDesignSection from "../components/case-study/gro-rem/FinalDesignSection";

export default function CaseStudyReminder() {
  return (
    <main className="min-h-screen bg-[#eef2f3] text-[#111111] dark:bg-[#0b1220] dark:text-white">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-24 md:px-8">
        <HeroSection />
        <OverviewSection />
        <ProblemSection />
        <OpportunitySection />
        <UsersSection />
        <SolutionSection />
        <SmartAISection />
        <KeyFeaturesSection />
        <UserFlowSection />
        <FinalDesignSection />
      </div>
    </main>
  );
}