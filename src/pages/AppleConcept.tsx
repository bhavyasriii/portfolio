import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

import mockup1 from "../assets/images/apple-cs/mockup-1.png";
import mockup2 from "../assets/images/apple-cs/mockup-2.png";
import mockup3 from "../assets/images/apple-cs/mockup-3.png";
import mockup4 from "../assets/images/apple-cs/mockup-4.png";

const screens = [
  {
    src: mockup1,
    index: "01",
    label: "Current state",
    title: "iOS today",
    desc: "Definition, Siri Knowledge, Look Up - no pronunciation anywhere. The gap is obvious once you see it.",
  },
  {
    src: mockup2,
    index: "02",
    label: "The redesign",
    title: "One row. That's all it took.",
    desc: "Phonetic spelling /ˈɑːrkɪtaɪp/ on the left. Speaker icon on the right. 44px touch target - Apple's own accessibility standard. Feels like it was always there.",
  },
  {
    src: mockup3,
    index: "03",
    label: "Active state",
    title: "Tap the speaker - it responds.",
    desc: "Phonetic text turns blue. Three waveform bars animate. Speaker icon enters a tapped state. You know it's playing without reading anything.",
  },
  {
    src: mockup4,
    index: "04",
    label: "Context shot",
    title: "The full moment.",
    desc: "Long-press a word while reading. The popup appears. Pronunciation is right there - no new screens, no new taps, no context switch.",
  },
];

export default function AppleConcept() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700;800&display=swap');

        *{box-sizing:border-box;margin:0;padding:0}
        html,body{background:#f8f5f0;font-family:Inter,sans-serif;color:#181512}

        :root{
          --ink:#181512;
          --muted:#746d64;
          --soft:#f8f5f0;
          --paper:#fffaf2;
          --line:rgba(24,21,18,.1);
          --purple:#8d78bd;
          --purple-deep:#2b233f;
          --apple:#0071e3;
          --apple-light:#e8f0fb;
        }

        .ac-wrap{max-width:1100px;margin:0 auto;padding:0 48px}
        .ac-eyebrow{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#9d9388;font-weight:700}
        .ac-serif{font-family:"Instrument Serif",Georgia,serif;font-weight:400}

        /* NAV */
        .ac-nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(248,245,240,.88);backdrop-filter:blur(18px);border-bottom:1px solid var(--line)}
        .ac-nav-inner{max-width:1100px;margin:0 auto;padding:16px 48px;display:flex;align-items:center;justify-content:space-between}
        .ac-nav-back{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--muted);cursor:pointer;border:none;background:none;font-family:Inter,sans-serif;transition:.2s}
        .ac-nav-back:hover{color:var(--ink)}
        .ac-nav-tag{font-size:11px;color:#9d9388;letter-spacing:.08em}

        /* HERO */
        .ac-hero{padding:120px 0 72px;border-bottom:1px solid var(--line)}
        .ac-hero-kicker{display:inline-flex;align-items:center;gap:8px;background:var(--apple-light);border:1px solid rgba(0,113,227,.18);border-radius:999px;padding:6px 14px;margin-bottom:28px}
        .ac-hero-kicker span{font-size:11px;color:var(--apple);font-weight:600;letter-spacing:.04em}
        .ac-hero h1{font-size:clamp(44px,7vw,88px);line-height:.92;letter-spacing:-.07em;font-weight:800;max-width:780px}
        .ac-hero h1 em{font-family:"Instrument Serif",Georgia,serif;font-weight:400;font-style:italic;color:var(--purple)}
        .ac-hero-sub{font-size:18px;line-height:1.75;color:var(--muted);max-width:540px;margin-top:28px}
        .ac-hero-meta{display:flex;gap:32px;margin-top:36px;flex-wrap:wrap}
        .ac-hero-stat strong{display:block;font-size:13px;color:var(--ink);margin-bottom:3px}
        .ac-hero-stat span{font-size:12px;color:#9d9388}

        /* PROBLEM */
        .ac-section{padding:80px 0;border-bottom:1px solid var(--line)}
        .ac-section-head{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;margin-bottom:52px}
        .ac-section-head h2{font-size:clamp(32px,4vw,54px);line-height:.96;letter-spacing:-.055em;font-weight:800}
        .ac-section-head h2 em{font-family:"Instrument Serif",Georgia,serif;font-style:italic;font-weight:400;color:var(--purple)}
        .ac-section-head p{font-size:15px;line-height:1.85;color:var(--muted);padding-top:8px}

        /* QUOTE */
        .ac-quote{border-left:3px solid var(--purple);padding:18px 24px;background:rgba(141,120,189,.07);border-radius:0 12px 12px 0;margin:32px 0}
        .ac-quote p{font-size:16px;line-height:1.7;color:#3d3830;font-style:italic}

        /* WHY NOT TRANSLATE */
        .ac-compare{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:28px}
        .ac-compare-card{border:1px solid var(--line);border-radius:16px;padding:20px 22px;background:var(--paper)}
        .ac-compare-card.no{border-color:rgba(220,80,60,.2);background:rgba(220,80,60,.03)}
        .ac-compare-card.yes{border-color:rgba(34,197,94,.25);background:rgba(34,197,94,.04)}
        .ac-compare-icon{font-size:22px;margin-bottom:10px}
        .ac-compare-label{font-size:10px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;margin-bottom:6px}
        .ac-compare-card.no .ac-compare-label{color:rgba(180,60,40,.7)}
        .ac-compare-card.yes .ac-compare-label{color:rgba(22,163,74,.8)}
        .ac-compare-card h4{font-size:15px;font-weight:600;margin-bottom:6px}
        .ac-compare-card p{font-size:13px;color:var(--muted);line-height:1.65}

        /* PRINCIPLE */
        .ac-principle{background:var(--ink);border-radius:20px;padding:28px 32px;margin:40px 0}
        .ac-principle-label{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:10px}
        .ac-principle p{font-size:20px;line-height:1.4;color:#fff;font-family:"Instrument Serif",Georgia,serif;font-weight:400;font-style:italic}

        /* TAGS */
        .ac-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:28px}
        .ac-tag{font-size:10px;letter-spacing:.1em;text-transform:uppercase;border:1px solid var(--line);border-radius:999px;padding:7px 14px;color:var(--muted)}

        /* SCREENS */
        .ac-screens{padding:80px 0;border-bottom:1px solid var(--line)}
        .ac-screen-tabs{display:flex;gap:10px;margin-bottom:48px;flex-wrap:wrap}
        .ac-screen-tab{border:1px solid var(--line);background:var(--paper);border-radius:999px;padding:9px 18px;font-size:12px;color:var(--muted);cursor:pointer;font-family:Inter,sans-serif;transition:.2s}
        .ac-screen-tab:hover{border-color:rgba(141,120,189,.4);color:var(--ink)}
        .ac-screen-tab.active{background:var(--ink);color:#fff;border-color:var(--ink)}

        .ac-screen-view{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
        .ac-screen-img{background:rgba(24,21,18,.06);border-radius:28px;display:flex;align-items:center;justify-content:center;padding:24px;min-height:560px}
        .ac-screen-img img{width:min(100%,380px);height:auto;border-radius:20px;box-shadow:0 30px 80px rgba(24,21,18,.18);transition:.3s cubic-bezier(.22,1,.36,1);cursor:zoom-in}
        .ac-screen-img img:hover{transform:scale(1.06)}
        .ac-lightbox{position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center;cursor:zoom-out}
        .ac-lightbox img{max-height:90vh;max-width:88vw;border-radius:24px;box-shadow:0 40px 100px rgba(0,0,0,.8)}
        .ac-screen-copy{}
        .ac-screen-index{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#9d9388;font-weight:700;margin-bottom:12px}
        .ac-screen-label{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--purple);font-weight:700;margin-bottom:8px}
        .ac-screen-title{font-size:clamp(26px,3.5vw,42px);line-height:1;letter-spacing:-.05em;font-weight:800;margin-bottom:16px}
        .ac-screen-desc{font-size:15px;line-height:1.8;color:var(--muted)}

        .ac-screen-nav{display:flex;gap:10px;margin-top:32px}
        .ac-screen-btn{width:40px;height:40px;border-radius:50%;border:1px solid var(--line);background:var(--paper);color:var(--ink);font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.2s;font-family:Inter,sans-serif}
        .ac-screen-btn:hover{background:var(--ink);color:#fff;border-color:var(--ink)}
        .ac-screen-btn:disabled{opacity:.3;cursor:default}

        /* SOLUTION DETAIL */
        .ac-solution{padding:80px 0;border-bottom:1px solid var(--line)}
        .ac-solution-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
        .ac-solution-card{border:1px solid var(--line);border-radius:20px;padding:24px;background:var(--paper)}
        .ac-solution-num{font-size:36px;font-weight:800;letter-spacing:-.06em;margin-bottom:6px}
        .ac-solution-card h4{font-size:14px;font-weight:600;margin-bottom:8px}
        .ac-solution-card p{font-size:13px;color:var(--muted);line-height:1.65}

        /* TAKEAWAY */
        .ac-takeaway{padding:80px 0}
        .ac-takeaway-inner{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
        .ac-takeaway h2{font-size:clamp(34px,4.5vw,58px);line-height:.95;letter-spacing:-.06em;font-weight:800}
        .ac-takeaway h2 em{font-family:"Instrument Serif",Georgia,serif;font-style:italic;font-weight:400;color:var(--purple)}
        .ac-takeaway-body p{font-size:15px;line-height:1.85;color:var(--muted);margin-bottom:16px}
        .ac-takeaway-body p:last-child{margin-bottom:0}

        /* FOOTER NAV */
        .ac-footer-nav{border-top:1px solid var(--line);padding:40px 0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px}
        .ac-footer-back{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--muted);cursor:pointer;border:none;background:none;font-family:Inter,sans-serif;transition:.2s}
        .ac-footer-back:hover{color:var(--ink)}
        .ac-footer-note{font-size:12px;color:#9d9388}

        @media(max-width:860px){
          .ac-wrap{padding:0 24px}
          .ac-nav-inner{padding:16px 24px}
          .ac-section-head{grid-template-columns:1fr}
          .ac-screen-view{grid-template-columns:1fr}
          .ac-screen-img{min-height:360px}
          .ac-solution-grid{grid-template-columns:1fr}
          .ac-takeaway-inner{grid-template-columns:1fr}
          .ac-compare{grid-template-columns:1fr}
          .ac-hero-meta{gap:20px}
        }
      `}</style>

      {/* NAV */}
      <nav className="ac-nav">
        <div className="ac-nav-inner">
          <button className="ac-nav-back" onClick={() => navigate("/")}>
            ← Back to portfolio
          </button>
          <span className="ac-nav-tag">Product Concept · iOS · 2026</span>
        </div>
      </nav>

      <main style={{ paddingTop: 64 }}>

        {/* HERO */}
        <section className="ac-hero">
          <div className="ac-wrap">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="ac-hero-kicker">
                <span>Apple iOS · Look Up · Pronunciation Gap</span>
              </div>
              <h1>
                You know the word.<br />
                But can you <em>say it?</em>
              </h1>
              <p className="ac-hero-sub">
                iOS can define a word instantly. It can translate it. It cannot tell you how to pronounce it, the one thing you need most in the moment you look something up.
              </p>
              <div className="ac-hero-meta">
                <div className="ac-hero-stat">
                  <strong>0 new screens</strong>
                  <span>Zero navigation added</span>
                </div>
                <div className="ac-hero-stat">
                  <strong>1 new row</strong>
                  <span>Phonetic + speaker icon</span>
                </div>
                <div className="ac-hero-stat">
                  <strong>44px</strong>
                  <span>Touch target, Apple HIG</span>
                </div>
                <div className="ac-hero-stat">
                  <strong>Figma · iOS Design</strong>
                  <span>Product Concept</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="ac-section">
          <div className="ac-wrap">
            <div className="ac-section-head">
              <div>
                <div className="ac-eyebrow" style={{ marginBottom: 16 }}>The problem</div>
                <h2>
                  A gap hiding<br />
                  in plain <em>sight.</em>
                </h2>
              </div>
              <p>
                I was reading an article when I came across the word "archetype." I long-pressed it, tapped Look Up, and got the definition instantly, but had no idea how to say it out loud. iOS could tell me what a word meant. It could translate it. But it couldn't tell me how to pronounce it, the one thing I needed most in that moment.
              </p>
            </div>

            <div className="ac-quote">
              <p>"iOS Look Up gives you meaning. But meaning without pronunciation leaves the word stranded on the page."</p>
            </div>

            <div className="ac-eyebrow" style={{ marginBottom: 16, marginTop: 40 }}>Why translate doesn't solve this</div>
            <div className="ac-compare">
              <div className="ac-compare-card no">
                <div className="ac-compare-icon">🌐</div>
                <div className="ac-compare-label">Translate</div>
                <h4>Converts to another language</h4>
                <p>Translate moves the word into a different language. It doesn't tell you how to say the word you're already reading in the language you're reading it in.</p>
              </div>
              <div className="ac-compare-card yes">
                <div className="ac-compare-icon">🔊</div>
                <div className="ac-compare-label">Pronunciation</div>
                <h4>Tells you how to say it in English</h4>
                <p>Pronunciation stays in the same language and gives you the phonetic reading and audio playback, exactly what you need to say the word confidently.</p>
              </div>
            </div>

            <div className="ac-principle">
              <div className="ac-principle-label">Design principle</div>
              <p>"The best feature feels like it was always there."</p>
            </div>

            <div className="ac-tags">
              <span className="ac-tag">Figma</span>
              <span className="ac-tag">iOS Design</span>
              <span className="ac-tag">Product Concept</span>
              <span className="ac-tag">2026</span>
            </div>
          </div>
        </section>

        {/* SCREENS */}
        <section className="ac-screens">
          <div className="ac-wrap">
            <div className="ac-eyebrow" style={{ marginBottom: 16 }}>The solution · 4 screens</div>
            <h2 style={{ fontSize: "clamp(32px,4vw,52px)", lineHeight: .96, letterSpacing: "-.055em", fontWeight: 800, marginBottom: 36 }}>
              Zero new screens.<br />
              <span style={{ fontFamily: '"Instrument Serif",Georgia,serif', fontWeight: 400, fontStyle: "italic", color: "var(--purple)" }}>One new row.</span>
            </h2>

            <div className="ac-screen-tabs">
              {screens.map((s, i) => (
                <button key={i} className={`ac-screen-tab ${active === i ? "active" : ""}`} onClick={() => setActive(i)}>
                  {s.index} · {s.label}
                </button>
              ))}
            </div>

            <motion.div
              key={active}
              className="ac-screen-view"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="ac-screen-img" style={{
                background: active === 0
                  ? "linear-gradient(135deg,#f0f0f5,#e8e8f0)"
                  : active === 1
                  ? "linear-gradient(135deg,#e8f0fb,#f0f4ff)"
                  : active === 2
                  ? "linear-gradient(135deg,#ede8fb,#f4f0ff)"
                  : "linear-gradient(135deg,#1a1a1a,#2a2a2a)"
              }}>
                <img src={screens[active].src} alt={screens[active].title} onClick={() => setZoomed(true)} />
              </div>
              <div className="ac-screen-copy">
                <div className="ac-screen-index">{screens[active].index} / 04</div>
                <div className="ac-screen-label">{screens[active].label}</div>
                <div className="ac-screen-title">{screens[active].title}</div>
                <p className="ac-screen-desc">{screens[active].desc}</p>
                <div className="ac-screen-nav">
                  <button className="ac-screen-btn" onClick={() => setActive(a => a - 1)} disabled={active === 0}>←</button>
                  <button className="ac-screen-btn" onClick={() => setActive(a => a + 1)} disabled={active === screens.length - 1}>→</button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SOLUTION DETAIL */}
        <section className="ac-solution">
          <div className="ac-wrap">
            <div className="ac-eyebrow" style={{ marginBottom: 16 }}>Why it works</div>
            <h2 style={{ fontSize: "clamp(32px,4vw,52px)", lineHeight: .96, letterSpacing: "-.055em", fontWeight: 800 }}>
              Minimal change.<br />
              <span style={{ fontFamily: '"Instrument Serif",Georgia,serif', fontWeight: 400, fontStyle: "italic", color: "var(--purple)" }}>Maximum fit.</span>
            </h2>
            <div className="ac-solution-grid">
              <div className="ac-solution-card">
                <div className="ac-solution-num">0</div>
                <h4>New screens added</h4>
                <p>The pronunciation row lives inside the existing Look Up popup. No navigation change. No new surface. The user never leaves the context they're in.</p>
              </div>
              <div className="ac-solution-card">
                <div className="ac-solution-num">44px</div>
                <h4>Touch target, Apple HIG</h4>
                <p>The speaker icon meets Apple's own Human Interface Guidelines for minimum touch target size. Accessible by default, not retrofitted.</p>
              </div>
              <div className="ac-solution-card">
                <div className="ac-solution-num">2</div>
                <h4>Feedback channels on tap</h4>
                <p>Visual (text turns blue, waveform animates) and audio (word plays). You know it's working without looking away from the screen.</p>
              </div>
            </div>
          </div>
        </section>

        {/* TAKEAWAY */}
        <section className="ac-takeaway">
          <div className="ac-wrap">
            <div className="ac-takeaway-inner">
              <div>
                <div className="ac-eyebrow" style={{ marginBottom: 16 }}>Takeaway</div>
                <h2>
                  The best gaps<br />
                  are hiding in<br />
                  products you <em>already use.</em>
                </h2>
              </div>
              <div className="ac-takeaway-body">
                <p>This concept started with a personal moment of friction, a word I couldn't say out loud. The solution wasn't a new app or a new feature surface. It was one row, in a popup that already existed, solving a problem that had always been there.</p>
                <p>Good product thinking doesn't always mean adding more. Sometimes it means noticing what's missing in what's already built, and finding the smallest possible change that closes the gap completely.</p>
              </div>
            </div>

            <div className="ac-footer-nav">
              <button className="ac-footer-back" onClick={() => navigate("/")}>← Back to portfolio</button>
              <span className="ac-footer-note">Product Concept · Figma · iOS · 2026 · Bhavyasri Mudireddy</span>
            </div>
          </div>
        </section>

      </main>

      {zoomed && (
        <div className="ac-lightbox" onClick={() => setZoomed(false)}>
          <img src={screens[active].src} alt={screens[active].title} />
        </div>
      )}
    </>
  );
}
