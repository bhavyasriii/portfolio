import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import CaseStudyHealthcare from "./pages/CaseStudyHealthcare";
import CaseStudyAICareerAssistant from "./pages/CaseStudyGrocery";
import CaseStudyReminder from "./pages/CaseStudyReminder";
import CaseStudyFintech from "./pages/CaseStudyFinTech.tsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-study/healthcare" element={<CaseStudyHealthcare />} />
        <Route
          path="/pages/CaseStudyGrocery"
          element={<CaseStudyAICareerAssistant />}
        />
        <Route path="/case-study/reminder" element={<CaseStudyReminder />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/case-study/fintech" element={<CaseStudyFintech />} />

      </Routes>
    </>
  );
}