import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";

const experiments = [
  {
    title: "AI-Assisted Healthcare Navigation",
    tag: "Healthcare UX",
    status: "In progress",
    question: "How can an AI system help users find appropriate care without pretending to diagnose them?",
    why: "Many healthcare tools assume users already know which specialist they need. But users often struggle with medical terminology before they even reach the booking step.",
    insight: "The problem is not just appointment booking. The deeper problem is uncertainty.",
    testing: ["Symptom-to-care pathways", "Confidence indicators", "Safety guardrails", "Human handoff patterns"],
  },
  {
    title: "Motion Systems in Framer",
    tag: "Motion Design",
    status: "Active exploration",
    question: "When does motion improve understanding instead of becoming decoration?",
    why: "Many interfaces animate everything. Most of it adds visual noise instead of helping the user understand what changed.",
    insight: "Motion should communicate hierarchy, direction, and cause-effect relationships.",
    testing: ["Page transitions", "Card expansion patterns", "Micro-interactions", "Motion accessibility settings"],
  },
  {
    title: "Accessibility-First Design Systems",
    tag: "Design Systems",
    status: "Ongoing",
    question: "What changes when accessibility becomes a starting point instead of a final checklist?",
    why: "Most design systems solve consistency first and accessibility later. I’m exploring what happens when accessibility leads the structure.",
    insight: "Accessible systems are usually easier for everyone, not only users with disabilities.",
    testing: ["Contrast-safe color systems", "Keyboard navigation", "Focus states", "Screen reader labels", "Error messaging patterns"],
  },
  {
    title: "Voice Interactions",
    tag: "Voice UX",
    status: "Research phase",
    question: "How does interface design change when users stop typing?",
    why: "Voice interactions remove visual affordances and create new trust challenges around feedback, errors, and confirmation.",
    insight: "Users need feedback about what the system heard, not just what it understood.",
    testing: ["Voice confirmations", "Error recovery", "Conversational flows", "Trust indicators"],
  },
];

export default function Experiments() {
  const [active, setActive] = useState<(typeof experiments)[0] | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#fff}
        main{min-height:100vh;background:#fff;font-family:Inter,sans-serif;color:#1a1a1a}
        .page{padding:120px 56px 80px}
        .wrap{max-width:1040px;margin:0 auto}
        .back{display:inline-flex;margin-bottom:44px;font-size:13px;color:#888;text-decoration:none}
        .back:hover{color:#9b8ec4}
        .eyebrow{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#bbb;margin-bottom:24px}
        h1{font-size:clamp(38px,6vw,72px);line-height:.98;letter-spacing:-.05em;font-weight:650;max-width:760px}
        .purple{color:#9b8ec4}
        .intro{font-size:16px;line-height:1.85;color:#777;max-width:620px;margin-top:28px}
        .note{margin-top:28px;font-size:13px;line-height:1.7;color:#aaa;max-width:560px}
        .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:64px}
        .card{border:1px solid #f0ede8;border-radius:28px;padding:28px;background:#fff;cursor:pointer;min-height:280px;display:flex;flex-direction:column;justify-content:space-between;transition:.25s;box-shadow:0 14px 40px rgba(0,0,0,.035)}
        .card:hover{transform:translateY(-6px);box-shadow:0 24px 60px rgba(0,0,0,.08);border-color:#e5dff2}
        .tag{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#9b8ec4;margin-bottom:16px}
        .card h2{font-size:24px;line-height:1.15;letter-spacing:-.03em;font-weight:620;max-width:360px}
        .card p{font-size:14px;line-height:1.75;color:#777;margin-top:18px}
        .status{margin-top:28px;display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#aaa}
        .status span:last-child{color:#9b8ec4}
        .modal-bg{position:fixed;inset:0;background:rgba(12,10,18,.72);backdrop-filter:blur(18px);z-index:9000;display:flex;align-items:center;justify-content:center;padding:32px}
        .modal{width:min(760px,100%);max-height:86vh;overflow:auto;background:#fff;border-radius:32px;padding:36px;box-shadow:0 40px 120px rgba(0,0,0,.35)}
        .modal-top{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;margin-bottom:30px}
        .modal h2{font-size:36px;line-height:1.05;letter-spacing:-.04em;font-weight:650;max-width:560px}
        .close{border:1px solid #eee;background:#fff;border-radius:100px;width:40px;height:40px;cursor:pointer;color:#888;font-size:18px;flex-shrink:0}
        .close:hover{border-color:#9b8ec4;color:#9b8ec4}
        .section-block{padding:22px 0;border-top:1px solid #f2f0ed}
        .section-block h3{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#9b8ec4;margin-bottom:10px}
        .section-block p{font-size:15px;line-height:1.8;color:#666}
        ul{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:6px}
        li{list-style:none;font-size:14px;color:#666;background:#faf9f7;border:1px solid #f0ede8;border-radius:14px;padding:12px 14px}
        .footer-card{margin-top:70px;border-radius:28px;background:#2a2440;color:#d8c9ff;padding:34px;display:flex;justify-content:space-between;gap:28px;align-items:flex-end}
        .footer-card h2{font-size:28px;letter-spacing:-.03em}
        .footer-card p{font-size:14px;line-height:1.8;color:#a99ad0;max-width:520px;margin-top:12px}

        @media(max-width:800px){
          .page{padding:100px 24px 64px}
          .grid{grid-template-columns:1fr;margin-top:44px}
          .card{min-height:auto}
          .modal{padding:26px;border-radius:24px}
          .modal h2{font-size:28px}
          ul{grid-template-columns:1fr}
          .footer-card{display:block}
        }
      `}</style>

      <Navbar />

      <main>
        <section className="page">
          <div className="wrap">
            <a className="back" href="/">← Back to portfolio</a>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
              <div className="eyebrow">Notes & Experiments</div>
              <h1>
                Small UX explorations before they become <span className="purple">full case studies.</span>
              </h1>
              <p className="intro">
                This is my thinking lab — a place where I test product ideas, interaction patterns, accessibility decisions, and emerging UX problems.
              </p>
              <p className="note">
                These are not polished case studies yet. They show how I explore questions, frame problems, and test ideas before committing to a final solution.
              </p>
            </motion.div>

            <div className="grid">
              {experiments.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="card"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setActive(item)}
                >
                  <div>
                    <div className="tag">{item.tag}</div>
                    <h2>{item.title}</h2>
                    <p>{item.question}</p>
                  </div>
                  <div className="status">
                    <span>{item.status}</span>
                    <span>Open →</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="footer-card">
              <div>
                <h2>Why include experiments?</h2>
                <p>
                  Case studies show finished thinking. Experiments show how I think while something is still messy — which is often where the most useful design decisions happen.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {active && (
          <motion.div className="modal-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
            <motion.div className="modal" initial={{ scale: 0.94, y: 18 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 18 }} onClick={(e) => e.stopPropagation()}>
              <div className="modal-top">
                <div>
                  <div className="tag">{active.tag}</div>
                  <h2>{active.title}</h2>
                </div>
                <button className="close" onClick={() => setActive(null)}>×</button>
              </div>

              <div className="section-block">
                <h3>Question</h3>
                <p>{active.question}</p>
              </div>

              <div className="section-block">
                <h3>Why I explored it</h3>
                <p>{active.why}</p>
              </div>

              <div className="section-block">
                <h3>Key insight</h3>
                <p>{active.insight}</p>
              </div>

              <div className="section-block">
                <h3>What I’m testing</h3>
                <ul>
                  {active.testing.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>

              <div className="section-block">
                <h3>Status</h3>
                <p>{active.status}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}