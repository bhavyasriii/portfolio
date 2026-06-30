import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";

import lofiHome from "../assets/images/gdinfotek/Lofi-Homepage.png";
import lofiE1 from "../assets/images/gdinfotek/Lofi-Enrollment1.png";
import lofiE2 from "../assets/images/gdinfotek/Lofi-Enrollment2.png";
import midfiHome from "../assets/images/gdinfotek/Midfi-Homepage.png";
import midfiE1 from "../assets/images/gdinfotek/Midfi-Enrollment1.png";
import midfiE2 from "../assets/images/gdinfotek/Midfi-Enrollment2.png";
import highfiHome from "../assets/images/gdinfotek/Highfi-Homepage.png";
import highfiE1 from "../assets/images/gdinfotek/Highfi-Enrollment1.png";
import highfiE2 from "../assets/images/gdinfotek/Highfi-Enrollment2.png";
import prototyping from "../assets/images/gdinfotek/Prototyping.png";
import beforeHome from "../assets/images/gdinfotek/Hero.png";
import beforeContact from "../assets/images/gdinfotek/Contact.png";
import beforeForm from "../assets/images/gdinfotek/Enrollment.png";
import beforeS1 from "../assets/images/gdinfotek/services1.png";
import personaPriya from "../assets/images/gdinfotek/persona-priya.png";
import personaMichael from "../assets/images/gdinfotek/persona-michael.png";

const CORRECT_PASSWORD = "gdinfo2026";

const problems = [
  { icon: "🔄", title: "No clear audience", body: "Homepage had three rotating carousel slides with no single primary message and no clear CTA." },
  { icon: "✍️", title: "Copy errors everywhere", body: "Typos on every page instantly undermining credibility with potential clients." },
  { icon: "🗂️", title: "Broken information architecture", body: "Client and candidate content competed for attention with no hierarchy. A hiring manager and a job seeker would both land on the same generic page." },
  { icon: "📋", title: "Overwhelming enrollment form", body: "All fields dumped onto a single unstructured page with no grouping, no labels hierarchy, no progress indicator, no sense of completion." },
  { icon: "🎨", title: "Dated visual system", body: "Clashing yellow buttons, heavy dark sections, justified text blocks, stock photos from 2014. The site looked like it had not been touched since 2021 because it had not." },
];

const decisions = [
  { num: "01", title: "Client-first homepage", body: "The business revenue comes from client companies hiring IT talent, not candidates. So the homepage leads with Build high-performing IT teams with confidence rather than candidate enrollment. Candidates get a dedicated amber band above the footer." },
  { num: "02", title: "Removed the carousel", body: "Carousels are almost always bad UX. Users rarely see beyond slide one and the message gets diluted across three competing headlines. Replaced with a single static hero with one strong headline." },
  { num: "03", title: "Modernized visual system", body: "Kept the existing navy and amber brand colors to maintain recognition. Changed the execution: lighter navy, amber used sparingly as accent only, generous white space, DM Sans typeface." },
  { num: "04", title: "Two-step enrollment form", body: "The original form placed all fields on one overwhelming page. Splitting into Personal and Academic first, then Visa and Skills, reduces cognitive load and gives candidates a clear sense of progress." },
  { num: "05", title: "Added structural sections", body: "Redesign added three sections that did not exist before: a trust bar showing roles filled, a How we work process section from the client perspective, and a Why choose us strip with four key differentiators." },
];

const processStages = [
  {
    stage: "Lo-fi wireframes",
    desc: "Structural layout decisions, section order, column structure, form grouping. No color, just boxes and labels.",
    images: [lofiHome, lofiE1, lofiE2],
    labels: ["Homepage", "Enrollment Step 1", "Enrollment Step 2"],
  },
  {
    stage: "Mid-fi exploration",
    desc: "Real content in greyscale. Validated the layout held up with actual copy and field labels before committing to color.",
    images: [midfiHome, midfiE1, midfiE2],
    labels: ["Homepage mid-fi", "Enrollment Step 1 mid-fi", "Enrollment Step 2 mid-fi"],
  },
  {
    stage: "High-fidelity",
    desc: "Full navy/amber visual system applied. Typography, spacing, component states, and icon system finalized.",
    images: [highfiHome, highfiE1, highfiE2],
    labels: ["Homepage", "Enrollment Step 1", "Enrollment Step 2"],
  },
  {
    stage: "Prototype",
    desc: "Connected the three frames with Smart Animate transitions, homepage to enrollment, step 1 to step 2, back navigation.",
    images: [prototyping],
    labels: ["Prototype connections"],
  },
];

const personas = [
  {
    image: personaPriya,
    initials: "PS",
    avatarBg: "linear-gradient(145deg,#8d78bd,#2b233f)",
    tag: "Primary Persona · Candidate",
    source: "Built from audit findings + candidate funnel data",
    name: "Priya Sharma",
    role: "26 · MS Computer Science · Herndon, VA",
    quote: "I just want someone to tell me what to do next. The process feels like a maze.",
    bio: "Priya recently graduated on OPT and is actively looking for her first US tech role. She has applied to three staffing firms but has not heard back from two. She is not sure what makes GD Infotek different or what happens after she submits the enrollment form.",
    goals: [
      "Understand exactly what happens after enrollment",
      "Know which roles she is eligible for on OPT",
      "Feel confident the recruiter will actually follow up",
      "Complete the form quickly without confusion",
    ],
    frustrations: [
      "No confirmation or next steps after submitting",
      "Form asks for information she does not understand",
      "Cannot tell if the company is active or legitimate",
      "No indication of how long placement takes",
    ],
  },
  {
    image: personaMichael,
    initials: "MT",
    avatarBg: "linear-gradient(145deg,#1B2E4B,#2d4a6e)",
    tag: "Secondary Persona · Client",
    source: "Built from stakeholder conversations + business priorities",
    name: "Michael Torres",
    role: "41 · IT Director · Reston, VA",
    quote: "I do not have time to sort through resumes. I need someone who already did the filtering.",
    bio: "Michael manages a team of 12 and has two open backend roles he needs to fill within 6 weeks. He has used staffing agencies before with mixed results. When he lands on GD Infotek's site, he cannot quickly tell if they specialize in what he needs or how the process works.",
    goals: [
      "Quickly verify the firm specializes in IT roles",
      "Understand the vetting and placement process",
      "Get pre-screened candidates within a week",
      "Have a single point of contact throughout",
    ],
    frustrations: [
      "No clear service description above the fold",
      "Cannot tell what types of roles the firm typically fills",
      "No social proof, no client logos or case examples",
      "Contact form feels generic, not business-oriented",
    ],
  },
];

const swot = [
  {
    label: "Strengths",
    color: "#166534",
    bg: "#f0fdf4",
    border: "#86efac",
    items: [
      "Client-first IA makes the value proposition clear within 10 seconds of landing",
      "Modernized visual system keeps navy and amber brand recognition intact",
      "Two-step enrollment form reduces cognitive load and signals professionalism",
      "Stats card gives hiring managers immediate proof points before scrolling",
    ],
  },
  {
    label: "Weaknesses",
    color: "#991b1b",
    bg: "#fef2f2",
    border: "#fca5a5",
    items: [
      "Research constrained to heuristic evaluation and persona synthesis given project timeline",
      "Prototype scope limited to homepage and enrollment form as first phase delivery",
      "Mobile frames currently in progress, desktop prototype delivered as phase one",
      "Implementation dependent on business decision, outside designer scope",
    ],
  },
  {
    label: "Opportunities",
    color: "#1e40af",
    bg: "#eff6ff",
    border: "#93c5fd",
    items: [
      "Candidate testimonials would instantly differentiate from competitor firm sites",
      "A live job board page would give candidates a reason to return to the site",
      "Client logo strip on homepage would add credibility in under 5 seconds",
      "Page titles and meta descriptions are completely missing from the current site",
    ],
  },
  {
    label: "Threats",
    color: "#92400e",
    bg: "#fffbeb",
    border: "#fcd34d",
    items: [
      "OPT candidates increasingly find placements through LinkedIn and direct networks",
      "Redesign has no real-world data until the site is actually built and launched",
      "Competing staffing firms in the DC area already have modern sites and live job boards",
      "10 client companies is a small portfolio, harder to build trust than firms with 50 plus",
    ],
  },
];

const contribution = {
  owned: [
    "Heuristic audit of existing site",
    "Persona research and synthesis",
    "IA and audience hierarchy decisions",
    "Lo-fi, mid-fi, and hi-fi Figma designs",
    "Enrollment form redesign",
    "Prototype connections",
  ],
  stakeholder: [
    "Business goals and priorities",
    "Approval of design direction",
    "Content and copy review",
    "Implementation decision",
  ],
};

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (value.trim() === CORRECT_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", background: "linear-gradient(180deg,#fbf6ee,#f8f3ea)" }}>
      <motion.div
        animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: 420, background: "rgba(255,250,242,.9)", border: "1px solid rgba(24,21,18,.1)", borderRadius: 28, padding: "40px 36px", boxShadow: "0 24px 80px rgba(51,35,20,.12)", textAlign: "center" }}
      >
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(141,120,189,.12)", border: "1px solid rgba(141,120,189,.24)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 22 }}>🔒</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.04em", marginBottom: 8, fontFamily: "Inter,sans-serif" }}>Company project</h2>
        <p style={{ fontSize: 14, color: "#746d64", lineHeight: 1.7, marginBottom: 28, fontFamily: "Inter,sans-serif" }}>This case study is password protected. If you are a recruiter or hiring manager, reach out and I will share access.</p>
        <input
          type="password"
          placeholder="Enter password"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false); }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `1px solid ${error ? "#e24b4a" : "rgba(24,21,18,.14)"}`, fontSize: 14, fontFamily: "Inter,sans-serif", background: "#fff", marginBottom: 8, outline: "none" }}
        />
        {error && <p style={{ fontSize: 12, color: "#e24b4a", marginBottom: 12, fontFamily: "Inter,sans-serif" }}>Incorrect password. Email bhavyasrireddy267@gmail.com for access.</p>}
        <button onClick={handleSubmit} style={{ width: "100%", padding: "12px 0", borderRadius: 12, background: "#181512", color: "#fff", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", marginBottom: 12, fontFamily: "Inter,sans-serif" }}>
          Unlock case study
        </button>
        <button onClick={() => navigate("/")} style={{ width: "100%", padding: "10px 0", borderRadius: 12, background: "transparent", color: "#746d64", fontSize: 13, border: "1px solid rgba(24,21,18,.1)", cursor: "pointer", fontFamily: "Inter,sans-serif" }}>
          Back to portfolio
        </button>
      </motion.div>
    </div>
  );
}

export default function GDInfotek() {
  const [unlocked, setUnlocked] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#f8f3ea;font-family:Inter,sans-serif}
        :root{--ink:#181512;--muted:#746d64;--line:rgba(24,21,18,.11);--purple:#8d78bd;--purple-deep:#2b233f;--shadow:0 24px 80px rgba(51,35,20,.12)}
        .cs-wrap{max-width:860px;margin:0 auto;padding:0 32px}
        .cs-section{padding:72px 0;border-bottom:1px solid var(--line)}
        .cs-section:last-child{border-bottom:none}
        .cs-eyebrow{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#9d9388;font-weight:700;margin-bottom:14px}
        .cs-h2{font-size:clamp(28px,5vw,48px);line-height:.96;letter-spacing:-.06em;font-weight:800;margin-bottom:16px}
        .cs-h2 em{font-family:"Instrument Serif",Georgia,serif;font-weight:400;font-style:italic;color:var(--purple)}
        .cs-body{font-size:15px;line-height:1.85;color:#665d54;max-width:680px}
        .meta-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:36px}
        .meta-card{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:16px 18px}
        .meta-card-label{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:6px}
        .meta-card-value{font-size:13px;font-weight:600;color:#fff;line-height:1.4}
        .before-after{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:28px}
        .ba-card{border-radius:16px;overflow:hidden;border:1px solid var(--line);background:#fff}
        .ba-label{font-size:10px;letter-spacing:.14em;text-transform:uppercase;padding:8px 14px;font-weight:700}
        .ba-label.before{background:#fef2f2;color:#991b1b}
        .ba-label.after{background:#f0fdf4;color:#166534}
        .ba-card img{width:100%;height:220px;object-fit:cover;object-position:top;display:block;cursor:zoom-in;transition:.3s ease}
        .ba-card img:hover{opacity:.88}
        .ba-card-footer{font-size:11px;color:#9d9388;padding:6px 12px 10px}
        .problem-grid{display:grid;gap:14px;margin-top:28px}
        .problem-item{display:grid;grid-template-columns:44px 1fr;gap:16px;align-items:start;background:rgba(255,250,242,.8);border:1px solid var(--line);border-radius:14px;padding:18px}
        .problem-icon{font-size:22px;line-height:1}
        .problem-title{font-size:14px;font-weight:700;letter-spacing:-.02em;margin-bottom:4px}
        .problem-body{font-size:13px;color:#665d54;line-height:1.7}
        .contribution-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:28px}
        .contribution-card{background:rgba(255,250,242,.8);border:1px solid var(--line);border-radius:14px;padding:22px}
        .contribution-label{font-size:9px;letter-spacing:.16em;text-transform:uppercase;font-weight:700;color:var(--purple);margin-bottom:12px}
        .contribution-list{list-style:none;display:flex;flex-direction:column;gap:8px}
        .contribution-list li{font-size:13px;color:#665d54;padding-left:14px;position:relative;line-height:1.55}
        .contribution-list li:before{content:"•";position:absolute;left:0;color:var(--purple)}
        .decision-list{display:flex;flex-direction:column;margin-top:28px}
        .decision-item{display:grid;grid-template-columns:56px 1fr;gap:20px;padding:24px 0;border-bottom:1px solid var(--line);align-items:start}
        .decision-item:last-child{border-bottom:none}
        .decision-num{font-size:11px;letter-spacing:.16em;color:var(--purple);font-weight:700;padding-top:3px}
        .decision-title{font-size:16px;font-weight:700;letter-spacing:-.03em;margin-bottom:6px}
        .decision-body{font-size:14px;color:#665d54;line-height:1.75}
        .process-stage{margin-top:48px}
        .process-stage:first-child{margin-top:28px}
        .stage-header{display:flex;align-items:center;gap:12px;margin-bottom:16px}
        .stage-dot{width:8px;height:8px;border-radius:50%;background:var(--purple);flex-shrink:0}
        .stage-name{font-size:13px;font-weight:700;letter-spacing:-.02em}
        .stage-desc{font-size:13px;color:#746d64;line-height:1.65;margin-bottom:16px}
        .stage-images{display:grid;gap:12px}
        .stage-images.cols-3{grid-template-columns:repeat(3,1fr)}
        .stage-images.cols-1{grid-template-columns:1fr}
        .stage-img-wrap{border-radius:12px;overflow:hidden;border:1px solid var(--line);cursor:zoom-in;background:#fff}
        .stage-img-wrap img{width:100%;display:block;transition:.3s ease}
        .stage-img-wrap:hover img{opacity:.88}
        .stage-img-label{font-size:10px;color:#9d9388;text-align:center;padding:6px 0}
        .outcome-box{background:rgba(141,120,189,.07);border:1px solid rgba(141,120,189,.2);border-left:4px solid var(--purple);border-radius:18px;padding:28px;margin-top:24px}
        .outcome-box p{font-size:14px;line-height:1.85;color:#413b35}
        .persona-card{background:#fff;border:1px solid var(--line);border-radius:20px;overflow:hidden;margin-top:28px;box-shadow:0 8px 32px rgba(51,35,20,.07)}
        .persona-top{display:grid;grid-template-columns:220px 1fr}
        .persona-photo-col{background:linear-gradient(145deg,#f0e8dc,#e8e0d3);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 24px;gap:14px}
        .persona-photo{width:140px;height:140px;border-radius:16px;object-fit:cover;object-position:center top;border:3px solid rgba(255,255,255,.8);box-shadow:0 8px 24px rgba(51,35,20,.15);flex-shrink:0}
        .persona-avatar{width:140px;height:140px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:44px;font-weight:800;color:#fff;box-shadow:0 8px 24px rgba(51,35,20,.2);flex-shrink:0}
        .persona-tag-label{font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:#9d9388;font-weight:700;text-align:center;margin-bottom:2px}
        .persona-tag-source{font-size:9px;color:#8d78bd;font-style:normal;font-weight:600;text-align:center}
        .persona-name{font-size:15px;font-weight:700;color:var(--ink);letter-spacing:-.02em;text-align:center;margin-bottom:3px}
        .persona-role{font-size:11px;color:#746d64;text-align:center}
        .persona-right{padding:32px}
        .persona-quote{font-size:18px;font-weight:700;letter-spacing:-.03em;color:var(--ink);line-height:1.3;margin-bottom:14px;font-family:"Instrument Serif",Georgia,serif;font-style:italic}
        .persona-bio{font-size:13px;color:#665d54;line-height:1.75}
        .persona-bottom{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--line)}
        .persona-col{padding:22px 24px}
        .persona-col:first-child{border-right:1px solid var(--line)}
        .persona-col-title{font-size:9px;letter-spacing:.16em;text-transform:uppercase;font-weight:700;margin-bottom:12px}
        .persona-col-title.goals{color:#166534}
        .persona-col-title.frustrations{color:#991b1b}
        .persona-list{list-style:none;display:flex;flex-direction:column;gap:8px}
        .persona-list li{font-size:12px;color:#665d54;line-height:1.55;padding-left:14px;position:relative}
        .persona-list li:before{content:"•";position:absolute;left:0;color:var(--purple)}
        .swot-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:28px}
        .swot-card{border-radius:16px;padding:24px;border:1px solid}
        .swot-card-label{font-size:9px;letter-spacing:.18em;text-transform:uppercase;font-weight:700;margin-bottom:14px}
        .swot-list{list-style:none;display:flex;flex-direction:column;gap:10px}
        .swot-list li{font-size:13px;line-height:1.65;padding-left:16px;position:relative;color:#665d54}
        .swot-list li:before{content:"→";position:absolute;left:0;font-size:11px;top:2px}
        .reflection-box{background:rgba(255,250,242,.9);border:1px solid var(--line);border-radius:20px;padding:36px;margin-top:28px}
        .reflection-item{padding:22px 0;border-bottom:1px solid var(--line)}
        .reflection-item:last-child{border-bottom:none;padding-bottom:0}
        .reflection-title{font-size:15px;font-weight:700;letter-spacing:-.03em;margin-bottom:8px;color:var(--ink)}
        .reflection-body{font-size:14px;color:#665d54;line-height:1.8}
        .lightbox-overlay{position:fixed;inset:0;z-index:9000;background:rgba(12,10,9,.95);backdrop-filter:blur(24px);display:flex;align-items:center;justify-content:center;padding:24px;cursor:zoom-out}
        .lightbox-inner{text-align:center}
        .lightbox-inner img{max-height:85vh;max-width:90vw;border-radius:16px;box-shadow:0 40px 100px rgba(0,0,0,.8)}
        .lightbox-label{font-size:12px;color:#666;margin-top:14px;font-family:Inter,sans-serif}
        @media(max-width:1020px){
          .meta-grid{grid-template-columns:repeat(2,1fr)}
          .persona-top{grid-template-columns:1fr}
          .contribution-grid{grid-template-columns:1fr}
        }
        @media(max-width:720px){
          .cs-wrap{padding:0 20px}
          .before-after{grid-template-columns:1fr}
          .stage-images.cols-3{grid-template-columns:1fr}
          .decision-item{grid-template-columns:1fr;gap:6px}
          .persona-bottom{grid-template-columns:1fr}
          .persona-col:first-child{border-right:none;border-bottom:1px solid var(--line)}
          .swot-grid{grid-template-columns:1fr}
          .contribution-grid{grid-template-columns:1fr}
        }
      `}</style>

      <Navbar />

      <main style={{ background: "linear-gradient(180deg,#fbf6ee,#f8f3ea)", minHeight: "100vh", paddingBottom: 80 }}>

        <div style={{ background: "#1B2E4B", paddingTop: 80 }}>
          <div className="cs-wrap" style={{ paddingTop: 48, paddingBottom: 56 }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(245,166,35,.12)", border: "1px solid rgba(245,166,35,.28)", borderRadius: 999, padding: "4px 12px", marginBottom: 20 }}>
                <span style={{ fontSize: 11, color: "#F5A623", fontWeight: 600 }}>Company Project · GD Infotek LLC · Product Designer Intern · 2026</span>
              </div>
              <h1 style={{ fontFamily: "Inter,sans-serif", fontSize: "clamp(32px,6vw,58px)", fontWeight: 800, letterSpacing: "-.06em", lineHeight: .96, color: "#fff", marginBottom: 18 }}>
                The website was live.<br />
                <span style={{ fontFamily: '"Instrument Serif",Georgia,serif', fontWeight: 400, fontStyle: "italic", color: "#F5A623" }}>Nobody knew what the company actually did.</span>
              </h1>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,.68)", lineHeight: 1.8, maxWidth: 580 }}>
                Full homepage and enrollment form redesign for an active IT staffing firm. Heuristic audit, IA restructure, and high-fidelity Figma prototype delivered to stakeholder.
              </p>
              <div className="meta-grid">
                {[
                  { label: "Role", value: "Product Designer Intern" },
                  { label: "Timeline", value: "March to June 2026" },
                  { label: "Tools", value: "Figma · Heuristic eval" },
                  { label: "Status", value: "Prototype delivered · Stakeholder approved" },
                ].map((m) => (
                  <div key={m.label} className="meta-card">
                    <div className="meta-card-label">{m.label}</div>
                    <div className="meta-card-value">{m.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="cs-wrap">

          <div className="cs-section">
            <div className="cs-eyebrow">My contribution</div>
            <h2 className="cs-h2">What I owned on <em>this project</em></h2>
            <p className="cs-body">This redesign was part of my internship at GD Infotek LLC. I led the UX audit, persona development, information architecture decisions, and Figma prototype delivery. Senior stakeholders provided business direction and final approval.</p>
            <div className="contribution-grid">
              <div className="contribution-card">
                <div className="contribution-label">I owned</div>
                <ul className="contribution-list">
                  {contribution.owned.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className="contribution-card">
                <div className="contribution-label">Stakeholder direction</div>
                <ul className="contribution-list">
                  {contribution.stakeholder.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          </div>

          <div className="cs-section">
            <div className="cs-eyebrow">The existing site</div>
            <h2 className="cs-h2">What we were working with</h2>
            <p className="cs-body">gditek.com had been live since 2021. It had not been meaningfully updated since. A heuristic evaluation surfaced five critical problems within the first scroll.</p>
            <div className="before-after">
              {[
                { src: beforeHome, label: "Homepage hero, vague carousel headline" },
                { src: beforeS1, label: "Services page, stock photos, typo-filled copy" },
                { src: beforeContact, label: "Footer, Copyright 2021" },
                { src: beforeForm, label: "Enrollment form, all fields, no structure" },
              ].map((img) => (
                <div key={img.label} className="ba-card" onClick={() => setLightbox({ src: img.src, label: img.label })}>
                  <div className="ba-label before">Before</div>
                  <img src={img.src} alt={img.label} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <div className="ba-card-footer">{img.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="cs-section">
            <div className="cs-eyebrow">Audit findings</div>
            <h2 className="cs-h2">Five problems. <em>One root cause.</em></h2>
            <p className="cs-body">The site tried to serve two audiences, client companies and job-seeking candidates, without committing to either. Every other problem followed from that.</p>
            <div className="problem-grid">
              {problems.map((p) => (
                <div key={p.title} className="problem-item">
                  <div className="problem-icon">{p.icon}</div>
                  <div>
                    <div className="problem-title">{p.title}</div>
                    <div className="problem-body">{p.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cs-section">
            <div className="cs-eyebrow">User personas</div>
            <h2 className="cs-h2">Two audiences, <em>grounded in business context.</em></h2>
            <p className="cs-body">GD Infotek is a small, founder-led staffing firm, the kind of environment where designers work directly from business context instead of a dedicated research pipeline. I built both personas from what was available: a heuristic audit of the existing site's failure points, direct stakeholder conversations about who actually converts, and the realities of an active recruiting pipeline already in motion. Every detail below traces back to one of those three sources, not assumption.</p>
            <div className="outcome-box" style={{ marginTop: 28 }}>
              <p><strong>Why provisional personas:</strong> at an early-stage company, moving fast on real business context is often more useful than waiting on a formal research cycle. I treated the existing site's friction points and stakeholder priorities as primary evidence, the same approach a designer uses when joining a team mid-flight and needing to ship defensible decisions quickly. This is a recognized method, provisional personas, suited to exactly this kind of environment.</p>
            </div>
            {personas.map((p, i) => (
              <motion.div
                key={p.name}
                className="persona-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="persona-top">
                  <div className="persona-photo-col">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="persona-photo" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    ) : (
                      <div className="persona-avatar" style={{ background: p.avatarBg }}>{p.initials}</div>
                    )}
                    <div>
                      <div className="persona-tag-label">{p.tag}</div>
                      <div className="persona-tag-source">{p.source}</div>
                    </div>
                    <div>
                      <div className="persona-name">{p.name}</div>
                      <div className="persona-role">{p.role}</div>
                    </div>
                  </div>
                  <div className="persona-right">
                    <div className="persona-quote">"{p.quote}"</div>
                    <div className="persona-bio">{p.bio}</div>
                  </div>
                </div>
                <div className="persona-bottom">
                  <div className="persona-col">
                    <div className="persona-col-title goals">Goals</div>
                    <ul className="persona-list">{p.goals.map((g) => <li key={g}>{g}</li>)}</ul>
                  </div>
                  <div className="persona-col">
                    <div className="persona-col-title frustrations">Frustrations</div>
                    <ul className="persona-list">{p.frustrations.map((f) => <li key={f}>{f}</li>)}</ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="cs-section">
            <div className="cs-eyebrow">Design decisions</div>
            <h2 className="cs-h2">Five decisions. <em>Each defensible.</em></h2>
            <p className="cs-body">Every decision came from the audit findings and a stakeholder conversation about what the business actually needed to grow.</p>
            <div className="decision-list">
              {decisions.map((d) => (
                <div key={d.num} className="decision-item">
                  <div className="decision-num">{d.num}</div>
                  <div>
                    <div className="decision-title">{d.title}</div>
                    <div className="decision-body">{d.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cs-section">
            <div className="cs-eyebrow">Design process</div>
            <h2 className="cs-h2">Lo-fi to Mid-fi to <em>Hi-fi to Prototype</em></h2>
            <p className="cs-body">Three stages of fidelity before the final prototype. Each stage answered a different question, structure, content, then polish.</p>
            {processStages.map((stage) => (
              <div key={stage.stage} className="process-stage">
                <div className="stage-header">
                  <div className="stage-dot" />
                  <div className="stage-name">{stage.stage}</div>
                </div>
                <div className="stage-desc">{stage.desc}</div>
                <div className={`stage-images ${stage.images.length > 1 ? "cols-3" : "cols-1"}`}>
                  {stage.images.map((img, idx) => (
                    <div key={idx} className="stage-img-wrap" onClick={() => setLightbox({ src: img, label: stage.labels[idx] })}>
                      <img src={img} alt={stage.labels[idx]} />
                      <div className="stage-img-label">{stage.labels[idx]}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="cs-section">
            <div className="cs-eyebrow">Final designs</div>
            <h2 className="cs-h2">Before <em>vs</em> after</h2>
            <p className="cs-body">Same brand colors. Completely different execution. Navy lightened, amber used only as accent, generous white space, DM Sans typeface throughout.</p>
            <div className="before-after" style={{ marginTop: 28 }}>
              <div className="ba-card" onClick={() => setLightbox({ src: beforeHome, label: "Before, original homepage" })}>
                <div className="ba-label before">Before</div>
                <img src={beforeHome} alt="Before homepage" />
                <div className="ba-card-footer">Original homepage</div>
              </div>
              <div className="ba-card" onClick={() => setLightbox({ src: highfiHome, label: "After, redesigned homepage" })}>
                <div className="ba-label after">After</div>
                <img src={highfiHome} alt="After homepage" />
                <div className="ba-card-footer">Redesigned homepage</div>
              </div>
              <div className="ba-card" onClick={() => setLightbox({ src: beforeForm, label: "Before, enrollment form" })}>
                <div className="ba-label before">Before</div>
                <img src={beforeForm} alt="Before form" />
                <div className="ba-card-footer">Original enrollment form</div>
              </div>
              <div className="ba-card" onClick={() => setLightbox({ src: highfiE1, label: "After, enrollment form step 1" })}>
                <div className="ba-label after">After</div>
                <img src={highfiE1} alt="After form step 1" />
                <div className="ba-card-footer">Redesigned enrollment form</div>
              </div>
            </div>
          </div>

          <div className="cs-section">
            <div className="cs-eyebrow">SWOT analysis</div>
            <h2 className="cs-h2">Honest assessment of <em>the redesign</em></h2>
            <p className="cs-body">Every design has tradeoffs. Here is an honest look at where this redesign is strong, where it falls short, and what comes next.</p>
            <div className="swot-grid">
              {swot.map((s) => (
                <div key={s.label} className="swot-card" style={{ background: s.bg, borderColor: s.border }}>
                  <div className="swot-card-label" style={{ color: s.color }}>{s.label}</div>
                  <ul className="swot-list">{s.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>

          <div className="cs-section">
            <div className="cs-eyebrow">Outcome</div>
            <h2 className="cs-h2">What was delivered</h2>
            <p className="cs-body">High-fidelity Figma prototype covering the full homepage and two-step enrollment form. The redesign addresses every usability issue identified in the audit.</p>
            <div className="outcome-box">
              <p>The prototype was reviewed and approved by the business owner. Implementation is pending. The redesign positions GD Infotek as a credible, modern IT staffing partner, which the original site with its broken copy and unclear messaging could not do.</p>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              {[
                { label: "Homepage redesigned", val: "✓" },
                { label: "Enrollment form redesigned", val: "✓" },
                { label: "Stakeholder approved", val: "✓" },
                { label: "Full process documented", val: "✓" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(141,120,189,.08)", border: "1px solid rgba(141,120,189,.18)", borderRadius: 999, padding: "8px 16px" }}>
                  <span style={{ color: "#8d78bd", fontWeight: 700, fontSize: 13 }}>{item.val}</span>
                  <span style={{ fontSize: 12, color: "#665d54" }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="cs-section">
            <div className="cs-eyebrow">What's next</div>
            <h2 className="cs-h2">Where this goes <em>from here</em></h2>
            <p className="cs-body">Phase one shipped a stakeholder-approved prototype. Here's the roadmap for what comes next, and what I'll measure once it does.</p>
            <div className="reflection-box">
              <div className="reflection-item">
                <div className="reflection-title">Personas drove the IA decision. Participant testing is phase two</div>
                <div className="reflection-body">Two personas, Priya the OPT candidate and Michael the IT Director, built from audit findings and direct stakeholder input, shaped the client-first IA call that anchors this redesign. The next step to strengthen that decision further: 2 to 3 moderated sessions with real candidates who've used IT staffing firms, validating whether the enrollment form fields match what they actually expect to provide.</div>
              </div>
              <div className="reflection-item">
                <div className="reflection-title">Phase two: designing the post-submission moment</div>
                <div className="reflection-body">Phase one focused on getting the form structure right, splitting one overwhelming page into a clear two-step flow. The next layer is the confirmation experience after Submit Enrollment: a success state, next steps, and a timeline. That's the most anxiety-inducing moment for an OPT candidate, and it's the first thing on the roadmap for this redesign's next iteration.</div>
              </div>
              <div className="reflection-item">
                <div className="reflection-title">Mobile is in progress, and it's the priority</div>
                <div className="reflection-body">The desktop design is complete at 1440px. Mobile frames for the homepage hero and enrollment form are actively in progress, since IT staffing candidates, especially recent graduates, are highly likely to access the site on their phones. Validating the layout at 390px is the next deliverable on the roadmap.</div>
              </div>
              <div className="reflection-item">
                <div className="reflection-title">What I'll measure once this ships</div>
                <div className="reflection-body">Two metrics will tell me if this redesign worked: enrollment form completion rate versus the original single-page form, and time-to-understand on the homepage, can a hiring manager articulate what GD Infotek does within 10 seconds of landing? Those are the two outcomes this redesign was built to move.</div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <AnimatePresence>
        {lightbox && (
          <motion.div className="lightbox-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)}>
            <motion.div className="lightbox-inner" initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} onClick={(e) => e.stopPropagation()}>
              <img src={lightbox.src} alt={lightbox.label} />
              <div className="lightbox-label">{lightbox.label} · click anywhere to close</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
