import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import coverHealthcare from "../assets/images/cover-healthcare.png";
import fintechImage from "../assets/images/Mobile.png";
import profilePhoto from "../assets/profile-cutout.png";
import gdCover from "../assets/images/gdinfotek/Highfi-Homepage.png";
import mockup1 from "../assets/images/apple-cs/mockup-1.png";
import jobflowCover from "../assets/images/jobflowCover.png";
import magicPatternsCover from "../assets/magic-patterns-cover.png";
import medReconCover from "../assets/images/med-recon-cover.png";

const RESUME_URL = "/resume.pdf";

type PillKey = "research" | "shipped" | "code" | "available" | null;

type CaseStudy = {
  tag: string;
  year: string;
  title: ReactNode;
  desc: string;
  metric: string;
  metricText: string;
  small: string;
  image: string;
  route: string;
  bgClass: string;
  note: string;
};

function PillAnswer({ active }: { active: PillKey }) {
  const answers: Record<NonNullable<PillKey>, { label: string; text: ReactNode }> = {
    research: {
      label: "Research lens",
      text: (
        <>
          I recruit real participants, not convenience samples. <strong>70+ moderated interviews</strong> across healthcare and fintech. I look for the gap between what users say, what they do, and what the product assumes. In both case studies the blocker wasn't the interface, it was vocabulary and trust.
        </>
      ),
    },
    shipped: {
      label: "What I've built",
      text: (
        <>
          Shipped work lives at <strong>GD Infotek</strong>, full website redesign delivered and approved, implementation in progress. Research case studies are self-initiated and validated through moderated usability testing. This portfolio is <strong>React + TypeScript</strong>, live on Vercel.
        </>
      ),
    },
    code: {
      label: "Design engineering",
      text: (
        <>
          React and TypeScript, this portfolio included. I can prototype beyond static screens: interaction logic, responsive behavior, motion, and accessibility. When a developer pushes back on a component, I can open the code. <em>WCAG AAA</em> validated across shipped work.
        </>
      ),
    },
    available: {
      label: "Available for Work",
      text: (
        <div className="available-row">
          <span className="green-dot" />
          Available for full-time product design roles. Based in Denton TX, open to relocate.
        </div>
      ),
    },
  };

  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          key={active}
          className="pill-answer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.24 }}
        >
          <div className="pill-answer-label">{answers[active].label}</div>
          <div className="pill-answer-text">{answers[active].text}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const caseStudies: CaseStudy[] = [
  {
    tag: "Healthcare UX",
    year: "2026",
    title: (
      <>
        Patients weren't lost in the UI.
        <br />
        <span>They didn't know what doctor they needed.</span>
      </>
    ),
    desc: "A vocabulary problem disguised as a booking problem. 30 patient interviews revealed the real friction, specialist terminology patients had never heard. Redesigned around symptom-first guidance.",
    metric: "92%",
    metricText: "task success rate",
    small: "Tested with 12 participants · Maze · moderated sessions",
    image: coverHealthcare,
    route: "/case-study/healthcare",
    bgClass: "health-bg",
    note: "Self-initiated research · validated through moderated usability testing",
  },
  {
    tag: "Fintech UX",
    year: "2026",
    title: (
      <>
        The interface was clear.
        <br />
        <span>The anxiety wasn't about the UI at all.</span>
      </>
    ),
    desc: "40 user interviews surfaced spending anxiety as the real blocker, not confusion. Subscriptions felt like money disappearing, not decisions being made. Redesigned using agent-aware UX patterns.",
    metric: "50%",
    metricText: "reduction in decision friction",
    small: "Tested with 2 participants · moderated usability testing · NPS improvement confirmed",
    image: fintechImage,
    route: "/case-study/fintech",
    bgClass: "fintech-bg",
    note: "Self-initiated research · validated through moderated usability testing",
  },
  {
    tag: "Company Project · NDA",
    year: "2026",
    title: (
      <>
        The website was live.
        <br />
        <span>Nobody knew what the company actually did.</span>
      </>
    ),
    desc: "Full homepage and enrollment form redesign for an active IT staffing firm. Heuristic audit identified broken IA, unclear audience hierarchy, and copy errors. Restructured client-first with a complete visual system.",
    metric: "5/5",
    metricText: "critical usability issues resolved",
    small: "Heuristic audit · stakeholder approved · implementation pending",
    image: gdCover,
    route: "/case-study/gdinfotek",
    bgClass: "gd-bg",
    note: "Company project · GD Infotek LLC · Product Designer Intern",
  },
];

const conceptItems = [
  {
    id: "med-recon",
    type: "AI Product Sprint",
    name: "Medication Reconciliation",
    hook: "The AI didn't need to be trusted. It needed to be checked.",
    desc: "A 3-day sprint designing a human-in-the-loop verification cockpit for clinicians reconciling patient-reported meds against the EHR.",
    bg: "linear-gradient(135deg, rgba(59,130,246,.14), rgba(255,255,255,.94))",
    emoji: "💊",
    route: "/case-study/medication-reconciliation",
    image: medReconCover,
  },
  {
    id: "apple",
    type: "Product Thinking",
    name: "Apple iOS Look Up",
    hook: "iOS can define a word. It can't say it.",
    desc: "A pronunciation feature iOS overlooked, zero new screens, one new row.",
    bg: "linear-gradient(135deg, rgba(155,142,196,.16), rgba(255,255,255,.94))",
    emoji: "📱",
    route: "/case-study/apple-concept",
    image: mockup1,
  },
  {
    id: "jobflow",
    type: "Interaction Study + Research",
    name: "JobFlow",
    hook: "The job tracker people don't abandon.",
    desc: "8 user interviews. One finding: trackers die from upkeep cost, not missing features. Designed a one-tap card and built it in React.",
    bg: "linear-gradient(135deg, #eef3ff, #ffffff)",
    emoji: "📋",
    route: "/case-study/jobflow",
    image: jobflowCover,
  },
  {
  id: "magic-patterns",
  type: "Product Critique & Redesign",
  name: "Magic Patterns",
  hook: "The AI got better output when the prompt got smarter.",
  desc: "Tested Magic Patterns with a clinical dashboard. First prompt: static data, no actions. Second prompt, with real product thinking, reactive stats, call logging, and cancellations as available inventory.",
  bg: "linear-gradient(135deg, #1e1b4b, #2d1b69)",
  emoji: "🔬",
  route: "/case-study/magic-patterns",
  image: magicPatternsCover,
},
];

const storyBeats = [
  {
    year: "Accenture",
    title: "I started as a developer.",
    body: "Not because I wanted to write code, but because I wanted to understand how large teams build things together. The mentorship, the org structure, the way decisions moved through a hundred people. I was fascinated by that.",
  },
  {
    year: "The moment",
    title: "Then I moved to the US for my master's.",
    body: "Early on I tried to book a medical appointment online. The portal was a mess. My first instinct was simple, just fix the UI. Clean up the screens, reorganize the layout. That should fix it. It didn't. Every step still felt heavy. Not confusing, exhausting. Something deeper was broken.",
  },
  {
    year: "The pivot",
    title: "I started researching people, not layouts.",
    body: "Where were they getting stuck? Why? What were they actually trying to do? I discovered there were entire methods built around finding exactly that. Tools for identifying where the real pain lives. That discovery changed everything for me.",
  },
  {
    year: "Childhood",
    title: "Looking back, it makes sense.",
    body: "As a kid I spent hours playing video games. What I loved wasn't the graphics, it was how those games never made you feel lost. No instructions needed. Every screen told you exactly what to do next. That was great UX before I had a word for it. I've been chasing that feeling ever since.",
  },
  {
    year: "How I think",
    title: "I read to understand what people can't say.",
    body: "Robert Greene's Mastery. Books about how people think and feel. Not for career reasons, because the people I love sometimes struggle to say what they need. I've always wanted to understand what's underneath the words. That same instinct makes me a better researcher.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [activePill, setActivePill] = useState<PillKey>(null);
  const [fintechImageError, setFintechImageError] = useState(false);

  const togglePill = (key: PillKey) => setActivePill((prev) => (prev === key ? null : key));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") return; };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700;800&display=swap');

        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth;background:#f8f3ea}
        body{background:#f8f3ea}

        :root{
          --ink:#181512;
          --muted:#746d64;
          --soft:#f8f3ea;
          --paper:#fffaf2;
          --paper-2:#f0e8dc;
          --line:rgba(24,21,18,.11);
          --purple:#8d78bd;
          --purple-deep:#2b233f;
          --yellow:#f4d15f;
          --green:#22c55e;
          --shadow:0 24px 80px rgba(51,35,20,.12);
        }

        @keyframes pulseGreen{
          0%{box-shadow:0 0 0 0 rgba(34,197,94,.55)}
          50%{box-shadow:0 0 0 7px rgba(34,197,94,.13)}
          100%{box-shadow:0 0 0 0 rgba(34,197,94,0)}
        }
        @keyframes ripple{
          0%{transform:scale(1);opacity:.62}
          100%{transform:scale(2.8);opacity:0}
        }
        @keyframes marquee{
          from{transform:translateX(0)}
          to{transform:translateX(-50%)}
        }

        main{
          min-height:100vh;
          font-family:Inter,sans-serif;
          color:var(--ink);
          background:
            radial-gradient(circle at 18% 8%, rgba(141,120,189,.18), transparent 28%),
            radial-gradient(circle at 86% 22%, rgba(244,209,95,.22), transparent 24%),
            linear-gradient(180deg, #fbf6ee 0%, #f8f3ea 55%, #fffaf2 100%);
          overflow:hidden;
        }
        main:before{
          content:"";
          position:fixed;inset:0;pointer-events:none;opacity:.26;z-index:0;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.18'/%3E%3C/svg%3E");
        }

        .section{position:relative;z-index:1;padding:88px 56px;border-bottom:1px solid var(--line)}
        .wrap{max-width:1160px;margin:0 auto}
        .eyebrow{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#9d9388;font-weight:700}

        /* HERO */
        .hero{position:relative;z-index:1;padding:140px 56px 70px}
        .hero-center{max-width:760px;margin:0 auto;display:flex;flex-direction:column;align-items:center;text-align:center}
        .hero-status{display:inline-flex;align-items:center;gap:8px;font-size:11px;color:#776f66;margin-bottom:22px}
        .hero-status span{width:7px;height:7px;border-radius:50%;background:var(--green);animation:pulseGreen 1.8s infinite}
        .hero-name{font-size:clamp(38px,6vw,64px);line-height:1.02;letter-spacing:-.05em;font-weight:800;color:var(--ink)}
        .hero-role{font-size:15px;color:var(--muted);margin-top:12px}
        .hero-skills{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:26px;max-width:600px}
        .hero-skills span{font-size:12px;border:1px solid var(--line);border-radius:999px;padding:8px 15px;color:#4f4740;background:rgba(255,250,242,.6)}

        /* PILLS */
        .pill-row{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:30px 0 20px}
        .pill-btn,.pill-available{font-size:12px;padding:11px 18px;border-radius:100px;border:1px solid rgba(24,21,18,.12);background:rgba(255,250,242,.75);color:#4f4740;cursor:pointer;font-family:Inter,sans-serif;text-decoration:none;transition:.24s ease;backdrop-filter:blur(16px)}
        .pill-btn:hover,.pill-available:hover{transform:translateY(-2px);border-color:rgba(141,120,189,.42);box-shadow:0 14px 32px rgba(51,35,20,.08)}
        .pill-btn.active{background:var(--purple-deep);color:#fff;border-color:var(--purple-deep)}
        .pill-cta{background:var(--ink)!important;color:#fff!important;border-color:var(--ink)!important;box-shadow:0 16px 34px rgba(24,21,18,.18)}
        .pill-available{display:inline-flex;align-items:center;gap:9px;color:#15803d;background:rgba(34,197,94,.08);border-color:rgba(34,197,94,.28)}
        .pill-available.active{background:rgba(34,197,94,.14);border-color:#22c55e}
        .dot-wrap{position:relative;width:8px;height:8px;display:inline-flex}
        .dot-core,.green-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;display:block;animation:pulseGreen 1.8s infinite;flex:0 0 auto}
        .dot-ring{position:absolute;inset:0;border-radius:50%;border:1.5px solid #22c55e;animation:ripple 1.8s ease-out infinite}
        .pill-answer{max-width:590px;margin:0 auto;text-align:left;border:1px solid rgba(141,120,189,.2);border-left:4px solid var(--purple);background:rgba(255,250,242,.72);backdrop-filter:blur(18px);box-shadow:0 16px 36px rgba(51,35,20,.07);border-radius:18px;padding:18px 20px}
        .pill-answer-label{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--purple);font-weight:800;margin-bottom:8px}
        .pill-answer-text{font-size:13px;line-height:1.85;color:#61584f}
        .available-row{display:flex;align-items:center;gap:10px;color:#413b35}
        .tool-grid{display:flex;flex-wrap:wrap;gap:8px}
        .tool-grid span{font-size:11px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.07);border-radius:999px;padding:8px 12px;color:#f3eee7}

        /* MARQUEE */
        .marquee-wrap{position:relative;z-index:1;border-top:1px solid rgba(24,21,18,.07);border-bottom:1px solid rgba(24,21,18,.07);background:rgba(24,21,18,.018);overflow:hidden;white-space:nowrap;opacity:.78}
        .marquee{display:flex;width:max-content;animation:marquee 28s linear infinite}
        .marquee span{font-family:"Instrument Serif",Georgia,serif;font-size:28px;color:rgba(48,41,31,.68);padding:12px 18px}
        .marquee b{color:rgba(141,120,189,.62);font-weight:400}

        /* CASE STUDIES */
        .work-head{display:flex;justify-content:space-between;align-items:flex-end;gap:22px;margin-bottom:32px}
        .work-head h2{font-size:clamp(34px,5vw,62px);line-height:.95;letter-spacing:-.06em;max-width:620px}
        .work-head p{max-width:350px;color:var(--muted);font-size:14px;line-height:1.7}
        .case-stack{display:grid;gap:22px}
        .case-card{display:grid;grid-template-columns:minmax(0,.9fr) minmax(360px,1.1fr);min-height:520px;border:1px solid rgba(24,21,18,.1);background:rgba(255,250,242,.72);backdrop-filter:blur(18px);border-radius:34px;overflow:hidden;box-shadow:0 20px 60px rgba(51,35,20,.08)}
        .case-copy{padding:38px;display:flex;flex-direction:column;justify-content:space-between;gap:28px}
        .case-topline{display:flex;align-items:center;justify-content:space-between;gap:14px;color:#8d8378;font-size:11px;text-transform:uppercase;letter-spacing:.16em;font-weight:800}
        .case-note{display:inline-flex;align-items:center;gap:6px;font-size:10px;color:#9d9388;margin-top:6px;font-style:italic}
        .case-note:before{content:"↳";font-style:normal}
        .case-copy h2{font-size:clamp(30px,4vw,52px);line-height:1;letter-spacing:-.06em;font-weight:800;max-width:580px}
        .case-copy h2 span{font-family:"Instrument Serif",Georgia,serif;font-weight:400;font-style:italic;color:var(--purple);letter-spacing:-.04em}
        .case-copy p{font-size:14px;line-height:1.85;color:#665d54;max-width:530px}
        .case-bottom{display:flex;align-items:end;justify-content:space-between;gap:18px;flex-wrap:wrap}
        .metric strong{font-size:46px;letter-spacing:-.07em;line-height:.9}
        .metric span{display:block;font-size:12px;color:#756b61;margin-top:8px;font-weight:700}
        .metric small{display:block;font-size:10px;color:#8f8579;margin-top:6px;line-height:1.45;max-width:260px}
        .cs-btn{border:0;border-radius:999px;background:var(--ink);color:#fff;padding:12px 18px;font-size:12px;font-weight:700;cursor:pointer;transition:.24s ease;box-shadow:0 16px 34px rgba(24,21,18,.16);width:fit-content}
        .cs-btn:hover{transform:translateY(-2px);background:var(--purple-deep)}
        .case-media{position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;padding:48px;min-height:520px}
        .case-media:before{content:"";position:absolute;width:440px;height:440px;border-radius:50%;background:rgba(255,255,255,.38);filter:blur(8px)}
        .case-media img{position:relative;z-index:1;width:min(82%,440px);max-height:390px;object-fit:contain;border-radius:28px;box-shadow:0 30px 90px rgba(24,21,18,.22);transition:.45s cubic-bezier(.22,1,.36,1)}
        .case-card:hover .case-media img{transform:scale(1.04) rotate(-1deg)}
        .health-bg{background:radial-gradient(circle at 30% 20%, rgba(141,120,189,.36), transparent 30%), linear-gradient(135deg,#efe5d7,#fbf6ee)}
        .fintech-bg{background:radial-gradient(circle at 70% 20%, rgba(141,120,189,.32), transparent 32%), linear-gradient(135deg,#15151b,#322944)}
        .gd-bg{background:radial-gradient(circle at 40% 30%, rgba(27,46,75,.28), transparent 40%), linear-gradient(135deg,#1B2E4B,#2d4a6e)}
        .image-fallback{position:relative;z-index:1;color:#c8bedb;font-size:13px;border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:16px 20px}
        .lock-badge{display:inline-flex;align-items:center;gap:5px;font-size:9px;background:rgba(141,120,189,.15);color:var(--purple);border:1px solid rgba(141,120,189,.25);border-radius:999px;padding:4px 10px;margin-top:8px}

        /* CONCEPTS */
        .concept-head{display:flex;justify-content:space-between;align-items:flex-end;gap:18px;margin-bottom:26px}
        .concept-head h2{font-size:clamp(34px,5vw,60px);line-height:.94;letter-spacing:-.06em}
        .concept-track{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
        .concept-card{border-radius:32px;overflow:hidden;border:1px solid rgba(24,21,18,.1);background:rgba(255,250,242,.76);box-shadow:0 18px 50px rgba(51,35,20,.08);cursor:pointer;transition:.35s cubic-bezier(.22,1,.36,1)}
        .concept-card:hover{transform:translateY(-8px);box-shadow:0 24px 70px rgba(51,35,20,.14)}
        .concept-img{height:285px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
        .concept-img img{height:92%;max-width:92%;object-fit:contain;filter:drop-shadow(0 22px 35px rgba(0,0,0,.18));transition:.35s ease}
        .concept-card:hover .concept-img img{transform:scale(1.05)}
        .concept-overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent,rgba(0,0,0,.56));display:flex;align-items:flex-end;padding:20px;opacity:0;transition:.3s}
        .concept-card:hover .concept-overlay{opacity:1}
        .concept-overlay span{color:#fff;font-family:"Instrument Serif",Georgia,serif;font-size:25px;line-height:1.05}
        .concept-body{padding:22px}
        .concept-type{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--purple);font-weight:800;margin-bottom:9px}
        .concept-body h3{font-size:24px;letter-spacing:-.045em;line-height:1.08}
        .concept-body p{font-size:13px;color:#756d64;line-height:1.7;margin-top:10px}
        .concept-link{font-size:12px;color:var(--ink);font-weight:800;margin-top:16px}

        /* FIELD NOTES TILE */
        .field-notes-tile{
          position:relative;
          margin-top:18px;
          padding:26px 30px;
          border-radius:20px;
          cursor:pointer;
          background-color:#f4ede0;
          background-image:linear-gradient(#dcd0b8 1px, transparent 1px), linear-gradient(90deg, #dcd0b8 1px, transparent 1px);
          background-size:22px 22px;
          border:1.5px dashed #a89771;
          transition:transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease;
        }
        .field-notes-tile:hover{transform:translateY(-4px);box-shadow:0 18px 46px rgba(74,64,40,.14)}
        .field-notes-tape{
          position:absolute;top:-9px;left:28px;width:56px;height:16px;
          background:#d4794f;opacity:.5;transform:rotate(-5deg);
          box-shadow:0 2px 6px rgba(74,64,40,.12);
        }
        .field-notes-label{
          font-family:ui-monospace,"SFMono-Regular",Menlo,Consolas,monospace;
          font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#8a7a5c;margin-bottom:12px;
        }
        .field-notes-row{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}
        .field-notes-row h3{font-size:22px;font-weight:800;letter-spacing:-.03em;color:#4a4028}
        .field-notes-row p{font-family:"Instrument Serif",Georgia,serif;font-style:italic;font-size:16px;color:#4a4028;margin-top:6px}
        .field-notes-link{font-size:12px;font-weight:800;color:#4a4028;border-bottom:1.5px solid #a89771;padding-bottom:2px;white-space:nowrap}
        .field-notes-tile:hover .field-notes-link{color:#d4794f;border-color:#d4794f}

        /* ABOUT */
        .about-section{background:linear-gradient(180deg,#fffaf2,#f4ecdf)}
        .about-shell{max-width:1160px;margin:0 auto;display:grid;grid-template-columns:1fr 1.4fr;gap:72px;align-items:start}
        .about-left{position:sticky;top:88px}
        .about-photo-wrap{width:100%;max-width:320px;aspect-ratio:3/4;border-radius:28px;overflow:hidden;background:linear-gradient(145deg,#2b233f,#8d78bd);box-shadow:var(--shadow);margin-bottom:28px}
        .about-photo-wrap img{width:100%;height:100%;object-fit:cover;object-position:center top}
        .about-left-name{font-size:22px;font-weight:800;letter-spacing:-.04em;margin-bottom:6px}
        .about-left-role{font-size:14px;color:var(--muted);margin-bottom:18px}
        .about-left-tags{display:flex;flex-wrap:wrap;gap:8px}
        .about-left-tags span{font-size:10px;letter-spacing:.12em;text-transform:uppercase;border:1px solid var(--line);border-radius:999px;padding:6px 12px;color:#756d64}
        .story-beats{display:flex;flex-direction:column;gap:0}
        .story-beat{padding:28px 0;border-bottom:1px solid var(--line);display:grid;grid-template-columns:100px 1fr;gap:24px;align-items:start}
        .story-beat:last-child{border-bottom:none}
        .story-beat-year{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--purple);font-weight:700;padding-top:4px}
        .story-beat-title{font-size:18px;font-weight:700;letter-spacing:-.04em;margin-bottom:8px;line-height:1.2}
        .story-beat-body{font-size:14px;color:#665d54;line-height:1.85}
        .about-closing{margin-top:36px;padding:28px;background:rgba(141,120,189,.08);border:1px solid rgba(141,120,189,.18);border-left:4px solid var(--purple);border-radius:18px}
        .about-closing p{font-size:15px;line-height:1.85;color:#413b35;font-family:"Instrument Serif",Georgia,serif;font-style:italic}
        .about-closing cite{display:block;font-size:11px;font-style:normal;color:var(--muted);margin-top:12px;letter-spacing:.06em}

        /* CONTACT */
        .contact{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:30px}
        .contact h2{font-size:clamp(42px,7vw,86px);line-height:.92;letter-spacing:-.07em}
        .contact h2 span{font-family:"Instrument Serif",Georgia,serif;font-weight:400;font-style:italic;color:var(--purple)}
        .contact-sub{font-size:15px;color:#746d64;margin-top:14px;line-height:1.7;max-width:480px}
        .contact-links{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}
        .contact-links a{font-size:13px;padding:12px 18px;border-radius:999px;text-decoration:none;border:1px solid rgba(24,21,18,.12);color:#4f4740;background:rgba(255,250,242,.72);transition:.24s ease}
        .contact-links a:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(51,35,20,.09)}
        .contact-links a:first-child{background:var(--ink);color:#fff;border-color:var(--ink)}
        .footer{font-size:12px;color:#9b9085;margin-top:44px;display:flex;justify-content:space-between;gap:18px;flex-wrap:wrap}

        @media(max-width:1020px){
          .case-card{grid-template-columns:1fr}
          .case-media{min-height:420px}
          .concept-track{grid-template-columns:1fr}
          .about-shell{grid-template-columns:1fr;gap:36px}
          .about-left{position:static}
        }

        @media(max-width:720px){
          .section,.hero{padding-left:22px;padding-right:22px}
          .hero{padding-top:96px}
          .hero-name{font-size:clamp(34px,11vw,52px)}
          .hero-skills{gap:6px}
          .hero-skills span{font-size:11px;padding:7px 12px}
          .work-head,.concept-head{align-items:flex-start;flex-direction:column}
          .case-copy{padding:26px}
          .case-media{padding:30px;min-height:340px}
          .case-media img{width:min(92%,360px);max-height:300px}
          .story-beat{grid-template-columns:1fr;gap:6px}
          .contact{align-items:flex-start}
          .contact-links{justify-content:flex-start}
          .marquee span{font-size:24px}
        }
      `}</style>

      <Navbar />

      <main>

        <section className="hero">
          <motion.div className="hero-center" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="hero-status"><span /> Available for work</div>
            <h1 className="hero-name">Bhavyasri Mudireddy</h1>
            <p className="hero-role">Product Designer · Denton, TX</p>
            <div className="hero-skills">
              {["User research", "Prototyping", "Interaction design", "Usability testing", "Information architecture", "Design systems"].map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <div className="pill-row">
              <button className="pill-btn pill-cta" onClick={() => document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" })}>
                See my work ↓
              </button>
              <button className={`pill-btn ${activePill === "research" ? "active" : ""}`} onClick={() => togglePill("research")}>
                how do you research?
              </button>
              <button className={`pill-btn ${activePill === "shipped" ? "active" : ""}`} onClick={() => togglePill("shipped")}>
                what have you built?
              </button>
              <button className={`pill-btn ${activePill === "code" ? "active" : ""}`} onClick={() => togglePill("code")}>
                can you code?
              </button>
              <a href={RESUME_URL} target="_blank" rel="noreferrer" className="pill-btn">
                Resume ↗
              </a>
            </div>
            <PillAnswer active={activePill} />
          </motion.div>
        </section>

        <section id="case-studies" className="section">
          <div className="wrap">
            <div className="work-head">
              <div>
                <div className="eyebrow" style={{ marginBottom: 14 }}>Selected Work</div>
                <h2>Three projects.<br />Two research-led. One shipped.</h2>
              </div>
              <p>Two self-initiated studies validated through moderated usability testing. One company project delivered to stakeholder.</p>
            </div>
            <div className="case-stack">
              {caseStudies.map((cs, index) => (
                <motion.article
                  key={cs.route}
                  className="case-card"
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                >
                  <div className="case-copy">
                    <div>
                      <div className="case-topline">
                        <span>{cs.tag}</span>
                      </div>
                      <h2>{cs.title}</h2>
                      <div className="case-note">{cs.note}</div>
                      {cs.route.includes("gdinfotek") && (
                        <div className="lock-badge">🔒 Password protected · ask me for access</div>
                      )}
                      <p style={{ marginTop: 16 }}>{cs.desc}</p>
                    </div>
                    <div className="case-bottom">
                      <div className="metric">
                        <strong>{cs.metric}</strong>
                        <span>{cs.metricText}</span>
                        <small>{cs.small}</small>
                      </div>
                      <button className="cs-btn" onClick={() => navigate(cs.route)}>
                        {cs.route.includes("gdinfotek") ? "View case study 🔒" : "Read case study →"}
                      </button>
                    </div>
                  </div>
                  <div className={`case-media ${cs.bgClass}`}>
                    {cs.route.includes("fintech") && fintechImageError ? (
                      <div className="image-fallback">Fintech image coming soon</div>
                    ) : (
                      <img
                        src={cs.image}
                        alt={cs.tag}
                        onError={() => cs.route.includes("fintech") && setFintechImageError(true)}
                      />
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="concepts-interactions" className="section">
          <div className="wrap">
            <div className="concept-head">
              <div>
                <div className="eyebrow" style={{ marginBottom: 14 }}>Concepts & Interactions</div>
                <h2>Smaller explorations.<br />Specific product logic.</h2>
              </div>
              <p style={{ fontSize: 12, color: "#9b9085" }}>Click a card to explore</p>
            </div>
            <div className="concept-track">
              {conceptItems.map((item) => (
                <article
                  key={item.id}
                  className="concept-card"
                  onClick={() => navigate(item.route)}
                >
                  <div className="concept-img" style={{ background: item.bg }}>
                    {item.image
                      ? <img src={item.image} alt={item.name} />
                      : <span style={{ fontSize: 58, opacity: 0.35 }}>{item.emoji}</span>
                    }
                    <div className="concept-overlay">
                      <span>{item.hook}</span>
                    </div>
                  </div>
                  <div className="concept-body">
                    <div className="concept-type">{item.type}</div>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                    <div className="concept-link">
                      View {item.type.includes("Thinking") ? "concept" : "study"} →
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <article className="field-notes-tile" onClick={() => navigate("/field-notes")}>
              <span className="field-notes-tape" />
              <div className="field-notes-label">Field Notes / Vibe Coding Log</div>
              <div className="field-notes-row">
                <div>
                  <h3>How these got built</h3>
                  <p>Prompts, sketches, and a few things that broke along the way, vibe coding three ideas into working builds.</p>
                </div>
                <div className="field-notes-link">Read the notes →</div>
              </div>
            </article>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="wrap">
            <div className="eyebrow" style={{ marginBottom: 36 }}>About</div>
            <div className="about-shell">
              <div className="about-left">
                <div className="about-photo-wrap">
                  <img src={profilePhoto} alt="Bhavyasri Mudireddy" />
                </div>
                <div className="about-left-name">Bhavyasri Mudireddy</div>
                <div className="about-left-role">Product Designer · Denton, TX</div>
                <div className="about-left-tags">
                  {["UX Research", "Interaction Design", "React", "Figma"].map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="about-right">
                <div className="story-beats">
                  {storyBeats.map((beat, i) => (
                    <motion.div
                      key={i}
                      className="story-beat"
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: i * 0.06 }}
                    >
                      <div className="story-beat-year">{beat.year}</div>
                      <div className="story-beat-content">
                        <div className="story-beat-title">{beat.title}</div>
                        <div className="story-beat-body">{beat.body}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="about-closing">
                  <p>"I design, I research, and I build - because I've never been satisfied stopping at any one of them."</p>
                  <cite> Bhavyasri Mudireddy</cite>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ borderBottom: 0, paddingBottom: 90 }}>
          <div className="wrap">
            <div className="contact">
              <div>
                <h2>
                  Available for<br />
                  full-time <span>design roles.</span>
                </h2>
                <p className="contact-sub">
                  Based in Denton TX. Open to relocate anywhere in the US.
                </p>
              </div>
              <div className="contact-links">
                <a href="mailto:bhavyasrireddy267@gmail.com">Email me</a>
                <a href="https://www.linkedin.com/in/bhavyasri-m-593aa6214/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a href="https://calendly.com/bhavyasrireddy267" target="_blank" rel="noreferrer">Book a call ↗</a>
                <a href={RESUME_URL} target="_blank" rel="noreferrer">Resume ↗</a>
              </div>
            </div>
            <div className="footer">
              <span>©  Bhavyasri Mudireddy. Product Designer</span>
              <span>Designed and built in React + TypeScript</span>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
