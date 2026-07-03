import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import jobhouseBefore from "../assets/jobflow/jobhouse-before.png";

/* ============================================================
   JobFlow, Self-initiated UX research & interaction study
   Single-file case study page. Live cards + live affinity map.
   Screens/“before” shots use <img> slots (Figma PNG exports).
   ============================================================ */

const PURPLE = "#9b8ec4";
const INK = "#1a1a1a";
const BODY = "#555";
const MUTE = "#999";

/* ---------- shared section reveal ---------- */
const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

/* ---------- stage model for the LIVE cards ---------- */
type ActionKind = "prep" | "decide" | "nudge" | "learn";
interface Stage {
  key: string;
  label: string;
  accent: string;
  headline: string;
  countdown?: number;
  actionLabel?: string;
  actionText?: string;
  advance?: string;
  dimmed?: boolean;
  struck?: boolean;
  terminal?: boolean;
}

const ACTION_TAG: Record<ActionKind, string> = {
  prep: "PREP NOW",
  decide: "DECIDE",
  nudge: "DON'T LET IT GO COLD",
  learn: "CLOSE THE LOOP",
};

function hexA(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/* A single rendered card (static display variant) */
function Card({ stage }: { stage: Stage }) {
  const s = stage;
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${hexA(s.accent, 0.35)}`,
        borderRadius: 18,
        padding: 20,
        boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 12px 32px rgba(15,23,42,0.06)",
        opacity: s.dimmed ? 0.58 : 1,
        width: "100%",
        maxWidth: 320,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 600, color: "#0f172a" }}>Amazon</div>
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>Senior Product Designer · Seattle</div>
        </div>
        <span
          style={{
            fontSize: 10.5, fontWeight: 600, padding: "4px 10px", borderRadius: 999,
            color: s.accent, background: hexA(s.accent, 0.12), border: `1px solid ${hexA(s.accent, 0.3)}`,
            whiteSpace: "nowrap",
          }}
        >
          {s.label}
        </span>
      </div>

      <div
        style={{
          fontSize: 16, fontWeight: 600, marginTop: 16,
          color: s.dimmed ? "#6b7280" : "#0f172a",
          textDecoration: s.struck ? "line-through" : "none",
          display: "flex", alignItems: "baseline", gap: 8,
        }}
      >
        {s.countdown != null && (
          <span style={{ fontSize: 21, fontWeight: 700, color: s.accent }}>{s.countdown}d</span>
        )}
        {s.headline}
      </div>

      {s.actionText && (
        <div
          style={{
            marginTop: 13, border: `1px solid ${hexA(s.accent, 0.22)}`, borderRadius: 12,
            padding: 13, background: hexA(s.accent, 0.07),
          }}
        >
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", color: "#475569" }}>{s.actionLabel}</div>
          <div style={{ fontSize: 13.5, color: "#0f172a", marginTop: 5, lineHeight: 1.4 }}>{s.actionText}</div>
        </div>
      )}

      {s.advance && !s.terminal && (
        <div
          style={{
            marginTop: 14, width: "100%", textAlign: "center",
            border: `1.5px solid ${hexA(s.accent, 0.4)}`, borderRadius: 12, padding: "11px 14px",
            fontSize: 13.5, fontWeight: 600, color: s.accent,
          }}
        >
          → {s.advance}
        </div>
      )}

      {s.terminal && (
        <div style={{ marginTop: 14, textAlign: "center", fontSize: 13.5, fontWeight: 600, color: "#059669", padding: "10px 0" }}>
          Tracked, current, zero effort ✓
        </div>
      )}
    </div>
  );
}

/* ---------- the LIVE interactive one-tap advancer ---------- */
const FLOW: Stage[] = [
  { key: "applied", label: "Applied", accent: "#64748b", headline: "Logged. Waiting to hear back.", advance: "Heard back, move to screen" },
  { key: "screen", label: "Recruiter Screen", accent: "#0891b2", headline: "Call Thursday, 2:00pm", countdown: 2, actionLabel: ACTION_TAG.prep, actionText: "Draft 3 talking points + 2 questions", advance: "Screen done, move to review" },
  { key: "onsite", label: "Portfolio Review", accent: "#7c3aed", headline: "Walkthrough Monday, 10:00am", countdown: 5, actionLabel: ACTION_TAG.prep, actionText: "Rehearse the 12-min case study cut", advance: "Review done,move to offer" },
  { key: "offer", label: "Offer", accent: "#059669", headline: "Respond by next Friday", countdown: 7, actionLabel: ACTION_TAG.decide, actionText: "Compare comp + ask about start date", terminal: true },
];

function LiveAdvancer() {
  const [i, setI] = useState(0);
  const isLast = i === FLOW.length - 1;
  const s = FLOW[i];
  const next = !isLast ? FLOW[i + 1] : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div
        style={{
          background: "#fff", border: `1px solid ${hexA(s.accent, 0.35)}`, borderRadius: 18, padding: 20,
          boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 12px 32px rgba(15,23,42,0.06)",
          width: "100%", maxWidth: 340, fontFamily: "Inter, sans-serif",
          transition: "border-color 240ms ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 600, color: "#0f172a" }}>Amazon</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>Senior Product Designer · Seattle</div>
          </div>
          <span style={{ fontSize: 10.5, fontWeight: 600, padding: "4px 10px", borderRadius: 999, color: s.accent, background: hexA(s.accent, 0.12), border: `1px solid ${hexA(s.accent, 0.3)}`, whiteSpace: "nowrap" }}>
            {s.label}
          </span>
        </div>

        <div style={{ fontSize: 16, fontWeight: 600, marginTop: 16, color: "#0f172a", display: "flex", alignItems: "baseline", gap: 8 }}>
          {s.countdown != null && <span style={{ fontSize: 21, fontWeight: 700, color: s.accent }}>{s.countdown}d</span>}
          {s.headline}
        </div>

        {s.actionText && (
          <div style={{ marginTop: 13, border: `1px solid ${hexA(s.accent, 0.22)}`, borderRadius: 12, padding: 13, background: hexA(s.accent, 0.07) }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", color: "#475569" }}>{s.actionLabel}</div>
            <div style={{ fontSize: 13.5, color: "#0f172a", marginTop: 5, lineHeight: 1.4 }}>{s.actionText}</div>
          </div>
        )}

        {!isLast ? (
          <button
            onClick={() => setI(i + 1)}
            style={{
              marginTop: 14, width: "100%", cursor: "pointer", fontFamily: "inherit",
              border: `1.5px solid ${hexA(next!.accent, 0.45)}`, borderRadius: 12, padding: "11px 14px",
              fontSize: 13.5, fontWeight: 600, color: next!.accent, background: "#fff",
              transition: "all 160ms ease",
            }}
          >
            → {s.advance}
          </button>
        ) : (
          <div style={{ marginTop: 14, textAlign: "center", fontSize: 13.5, fontWeight: 600, color: "#059669", padding: "10px 0" }}>
            Tracked, current, zero effort ✓
          </div>
        )}
      </div>

      <button
        onClick={() => setI(0)}
        style={{ background: "transparent", border: "none", color: MUTE, fontSize: 12.5, cursor: "pointer", fontFamily: "Inter, sans-serif", textDecoration: "underline" }}
      >
        {isLast ? "Reset and try again" : "One tap advances the stage, no form, no typing"}
      </button>
    </div>
  );
}

/* ---------- secondary state cards ---------- */
const NO_REPLY: Stage = { key: "noreply", label: "No reply", accent: "#9ca3af", headline: "Silent for 12 days", actionLabel: ACTION_TAG.nudge, actionText: "Send a short follow-up to the recruiter", advance: "Draft follow-up" };
const REJECTED: Stage = { key: "rejected", label: "Closed", accent: "#9ca3af", headline: "Not moving forward", actionLabel: ACTION_TAG.learn, actionText: "Note one thing to do differently next time", advance: "Add a note", dimmed: true };
const WITHDRAWN: Stage = { key: "withdrawn", label: "Withdrawn", accent: "#9ca3af", headline: "You withdrew", dimmed: true, struck: true };

/* ---------- typography helpers ---------- */
const eyebrow: React.CSSProperties = { fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: PURPLE, fontWeight: 600, fontFamily: "Inter, sans-serif" };
const h2: React.CSSProperties = { fontSize: 30, fontWeight: 500, fontFamily: "'DM Serif Display', serif", color: INK, lineHeight: 1.2, margin: "14px 0 0" };
const body: React.CSSProperties = { fontSize: 16.5, lineHeight: 1.75, color: BODY, fontFamily: "Inter, sans-serif", maxWidth: 680 };
const caption: React.CSSProperties = { fontSize: 13, fontStyle: "italic", color: MUTE, fontFamily: "Inter, sans-serif", marginTop: 14 };

function Section({ children, tint }: { children: React.ReactNode; tint?: string }) {
  return (
    <section style={{ background: tint || "transparent", padding: "0" }}>
      <motion.div {...reveal} style={{ maxWidth: 900, margin: "0 auto", padding: "72px 48px" }}>
        {children}
      </motion.div>
    </section>
  );
}

/* alternating card/text block */
function StateBlock({ stage, flip, heading, children }: { stage: Stage; flip?: boolean; heading: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center",
        marginTop: 56,
      }}
    >
      <div style={{ order: flip ? 2 : 1, display: "flex", justifyContent: "center" }}>
        <Card stage={stage} />
      </div>
      <div style={{ order: flip ? 1 : 2 }}>
        <h3 style={{ fontSize: 20, fontWeight: 500, fontFamily: "'DM Serif Display', serif", color: INK, marginBottom: 12 }}>{heading}</h3>
        <p style={{ ...body, fontSize: 15.5 }}>{children}</p>
      </div>
    </div>
  );
}

export default function CaseStudyJobFlow() {
  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap');`}</style>

      {/* back button */}
      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "32px 48px 0" }}>
        <Link
          to="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999,
            border: "1px solid #e5e7eb", background: "#fff", padding: "8px 16px",
            fontSize: 14, fontWeight: 500, color: "#374151", textDecoration: "none",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <span aria-hidden>←</span> Back
        </Link>
      </div>

      {/* ===== HERO ===== */}
      <section style={{ background: "linear-gradient(150deg, #f5f3ff 0%, #eef0ff 60%, #f7f9ff 100%)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 48px 72px", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 40, alignItems: "center" }}>
          <div>
            <div style={eyebrow}>Self-initiated · UX research &amp; interaction design</div>
            <h1 style={{ fontSize: 46, fontWeight: 500, fontFamily: "'DM Serif Display', serif", color: INK, lineHeight: 1.08, margin: "16px 0 18px" }}>
              The job tracker people don&rsquo;t abandon
            </h1>
            <p style={{ ...body, fontSize: 18, color: "#666" }}>
              Most trackers fail not because they lack features, but because keeping them current is exhausting. I redesigned the one interaction that decides whether people stay.
            </p>
            <div style={{ display: "flex", gap: 28, marginTop: 28, flexWrap: "wrap" }}>
              <Meta label="ROLE" value="Sole designer, research, interaction, prototype" />
              <Meta label="TIMELINE" value="1 week" />
              <Meta label="TOOLS" value="Figma · prototyped in React" />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card stage={FLOW[1]} />
          </div>
        </div>
      </section>

      {/* ===== STARTING POINT ===== */}
      <Section>
        <div style={eyebrow}>The starting point</div>
        <p style={{ ...body, marginTop: 22 }}>
          I&rsquo;d already built a working job tracker, JobHouse, and used it during my own search. It logged every application&rsquo;s status cleanly. And it still failed me &mdash; not because it lacked features, but because keeping it current was its own chore. A refresh could wipe it; updating meant opening it, finding the row, editing, saving. Within two weeks I&rsquo;d stopped using it.
        </p>
        <p style={{ ...body, marginTop: 18 }}>
          That personal failure raised a sharper question than &ldquo;what features are missing?&rdquo; It was: why do people abandon job trackers at all?
        </p>

        {/* JobHouse before screenshot slot */}
        <div style={{ marginTop: 40 }}>
          {/* Replace src with your Figma/screenshot export */}
          <img
            src={jobhouseBefore}
            alt="JobHouse v1 - the tracker I built before this study"
            style={{ width: "100%", maxWidth: 560, borderRadius: 12, border: "1px solid #e2e8f0", display: "block" }}
          />
          <p style={caption}>My v1. Status as a flat dropdown: Applied &rarr; Interviewing &rarr; Offer. It logged where things were &mdash; and died in two weeks.</p>
        </div>
      </Section>

      {/* ===== RESEARCH + AFFINITY MAP ===== */}
      <Section tint="#fafafa">
        <div style={eyebrow}>Research</div>
        <p style={{ ...body, marginTop: 22 }}>
          I kept this focused &mdash; a small study, not a sprawling one. I drew on conversations with fellow job-seekers, recruited through online communities and my own network, plus an audit of my own tracking behavior. Then I organized what I heard into themes.
        </p>

        <AffinityMap />
      </Section>

      {/* ===== INSIGHT ===== */}
      <Section>
        <div style={eyebrow}>The insight</div>
        <div style={{ display: "flex", gap: 20, marginTop: 24 }}>
          <div style={{ width: 3, background: PURPLE, borderRadius: 2, flexShrink: 0 }} />
          <p style={{ fontSize: 27, fontWeight: 500, fontFamily: "'DM Serif Display', serif", color: INK, lineHeight: 1.35, maxWidth: 700 }}>
            People abandon job trackers because upkeep costs more than it returns &mdash; not because trackers lack features. The fix is to reduce effort, not add capability.
          </p>
        </div>
      </Section>

      {/* ===== SCOPE ===== */}
      <Section>
        <div style={eyebrow}>What I designed, and what I set aside</div>
        <p style={{ ...body, marginTop: 22 }}>
          The maintenance theme is broad &mdash; it spans fragmentation across portals, scattered notes, and the sheer effort of updates. I couldn&rsquo;t honestly solve all of it in one focused study, so I scoped deliberately to the single highest-frequency action: updating an application&rsquo;s status as it moves forward.
        </p>
        <p style={{ ...body, marginTop: 18 }}>
          I set aside the fragmentation pieces &mdash; consolidating portals, unifying notes &mdash; not because they don&rsquo;t matter, but because they need a whole product, and this study is about proving one decision deeply. Naming that boundary is part of the design, not a gap in it.
        </p>
      </Section>

      {/* ===== THE INTERACTION (LIVE) ===== */}
      <Section tint="#fafafa">
        <div style={eyebrow}>The interaction, try it</div>
        <h2 style={h2}>One tap, no form, no typing</h2>
        <p style={{ ...body, marginTop: 18, marginBottom: 40 }}>
          A spreadsheet update is four steps &mdash; open, find, edit, save. I designed it down to one. Tap the forward action and the card advances, reconfiguring to show what the new stage asks of you. The update doesn&rsquo;t just record a status; it produces the next state.
        </p>
        <LiveAdvancer />
      </Section>

      {/* ===== STAGE PROGRESSION (the four happy-path, explained) ===== */}
      <Section>
        <div style={eyebrow}>The card across stages</div>
        <p style={{ ...body, marginTop: 18 }}>
          The same component, four stages. Color and content shift to match what each stage asks &mdash; calm grey while waiting, warming through the active stages, green at the offer.
        </p>

        <StateBlock stage={FLOW[0]} heading="Applied - the calm state">
          Nothing to do yet but wait, so the card asks nothing. Most trackers give every row equal weight &mdash; which is what makes them feel like noise. I let a waiting application recede, saving attention for stages that need it. Grey says &ldquo;nothing required&rdquo; before you read a word.
        </StateBlock>

        <StateBlock stage={FLOW[1]} flip heading="Recruiter screen - the card wakes up">
          Now there&rsquo;s something to do, so the card surfaces it: a prep block with the exact next action, and a countdown that turns &ldquo;soon&rdquo; into &ldquo;2 days.&rdquo; Color encodes urgency &mdash; the card shifts from grey to active the moment the stage demands attention.
        </StateBlock>

        <StateBlock stage={FLOW[2]} heading="Portfolio review - higher stakes, same logic">
          The most important interview gets the most prominent color &mdash; violet &mdash; and a prep action scaled to the moment. The system holds: each stage&rsquo;s weight and color map to how much it actually demands. Nothing is styled for its own sake.
        </StateBlock>

        <StateBlock stage={FLOW[3]} flip heading="Offer -a decision, not a task">
          An offer isn&rsquo;t prep &mdash; it&rsquo;s a choice. The action block shifts from &ldquo;prep&rdquo; to &ldquo;decide,&rdquo; and the color turns green: the one unambiguously good state. This is the payoff of one-tap advancing &mdash; the tracker stayed current with almost no effort, all the way to the finish.
        </StateBlock>
      </Section>

      {/* ===== STATES MOST TRACKERS SKIP ===== */}
      <Section tint="#fafafa">
        <div style={eyebrow}>The states most trackers skip</div>
        <p style={{ ...body, marginTop: 18 }}>
          The happy path is easy. A job hunt hurts in the other states &mdash; so those got the most deliberate design.
        </p>

        <StateBlock stage={NO_REPLY} heading="No reply, prompt without pressure">
          The most emotionally loaded state: silence. I designed it to nudge, not alarm &mdash; calm grey, a gentle &ldquo;send a follow-up,&rdquo; and deliberately no countdown, because silence is a drift, not a deadline. A red alert here would punish the user for something outside their control.
        </StateBlock>

        <StateBlock stage={REJECTED} flip heading="Rejected, keep, but recede">
          Most trackers either delete rejections (you lose your history) or leave them at full prominence (they clutter your view with dead ends). I chose a third path: keep the card but dim it. It stays for the record and offers one reflective action &mdash; then visually steps back so it stops competing with live applications.
        </StateBlock>

        <StateBlock stage={WITHDRAWN} heading="Withdrawn, the empty state, on purpose">
          The only card with no action at all. You closed this one yourself, so the tool shouldn&rsquo;t ask anything of you. A strikethrough marks it as your choice, not their rejection. The emptiness is the design &mdash; most trackers would still show buttons here.
        </StateBlock>
      </Section>

      {/* ===== HONEST SEAM ===== */}
      <Section>
        <div style={eyebrow}>What&rsquo;s real, and what&rsquo;s next</div>
        <p style={{ ...body, marginTop: 22 }}>
          This is a focused study, not a shipped product, and I&rsquo;d rather name the seam than hide it. The countdowns and prep text are illustrative &mdash; in a real build they&rsquo;d derive from each stage&rsquo;s deadline and a per-company prep template. The research was small and informal, recruited through online communities, scoped to pressure-test one instinct, not to produce statistics.
        </p>
        <p style={{ ...body, marginTop: 18 }}>
          What&rsquo;s real is the decision the study is about: that a status should carry intent, and that the smallest place to prove it is one card. The honest next step is usability testing &mdash; does one-tap advancing actually keep people in the tool past the two-week point where the spreadsheet dies?
        </p>
      </Section>

      {/* ===== REFLECTION ===== */}
      <Section tint="#fafafa">
        <div style={eyebrow}>Reflection</div>
        <p style={{ ...body, marginTop: 22 }}>
          The most useful thing I did here wasn&rsquo;t the interaction &mdash; it was letting the research overrule my first instinct. I came in certain the problem was &ldquo;status doesn&rsquo;t tell you what to do.&rdquo; The synthesis said otherwise: the real failure was effort and fragmentation. I designed toward that instead, and named the part I deliberately left unsolved.
        </p>
        <p style={{ ...body, marginTop: 18 }}>
          That discipline &mdash; following the evidence past your own assumption, and being honest about scope &mdash; is what I want to bring to a product team.
        </p>

        <Link
          to="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginTop: 36, borderRadius: 999,
            background: INK, color: "#fff", padding: "10px 20px", fontSize: 13, fontWeight: 500,
            textDecoration: "none", fontFamily: "Inter, sans-serif",
          }}
        >
          ← Back to all work
        </Link>
      </Section>
    </main>
  );
}

/* ---------- small bits ---------- */
function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#94a3b8", fontFamily: "Inter, sans-serif" }}>{label}</div>
      <div style={{ fontSize: 14.5, color: INK, marginTop: 4, fontFamily: "Inter, sans-serif", maxWidth: 220 }}>{value}</div>
    </div>
  );
}

/* ---------- live affinity map ---------- */
function AffinityMap() {
  const voice = (t: string, stroke: string) => (
    <div style={{ background: "#fff", border: `1px solid ${stroke}`, borderRadius: 8, padding: "9px 12px", fontSize: 12.5, color: "#334155", fontFamily: "Inter, sans-serif" }}>{t}</div>
  );
  return (
    <div style={{ marginTop: 36, border: "1px solid #e2e8f0", borderRadius: 16, padding: 20, background: "#fff" }}>
      {/* coral - dominant */}
      <div style={{ background: hexA("#F87171", 0.08), border: `1px solid ${hexA("#F87171", 0.25)}`, borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", fontFamily: "Inter, sans-serif" }}>Maintenance &amp; fragmentation</div>
        <div style={{ fontSize: 12.5, color: "#64748b", marginTop: 2, marginBottom: 12, fontFamily: "Inter, sans-serif" }}>Dominant theme, 5 of 8 voices</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {voice('"Spreadsheet dies after 2 weeks"', "#f1d4d4")}
          {voice('"Updating is a full-time job"', "#f1d4d4")}
          {voice('"My info is everywhere"', "#f1d4d4")}
          {voice('"Don\'t know where I applied"', "#f1d4d4")}
          {voice('"Every portal is different"', "#f1d4d4")}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
        {/* amber - design focus */}
        <div style={{ background: hexA("#D97706", 0.08), border: `1px solid ${hexA("#D97706", 0.25)}`, borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", fontFamily: "Inter, sans-serif" }}>Deadline &amp; prep failure</div>
          <div style={{ fontSize: 12.5, color: "#D97706", fontWeight: 600, marginTop: 2, marginBottom: 12, fontFamily: "Inter, sans-serif" }}>Design focus, 2 of 8 voices</div>
          <div style={{ display: "grid", gap: 8 }}>
            {voice('"I forget important deadlines"', "#f0e0c8")}
            {voice('"Tracking across platforms"', "#f0e0c8")}
          </div>
        </div>
        {/* cyan */}
        <div style={{ background: hexA("#0891B2", 0.08), border: `1px solid ${hexA("#0891B2", 0.25)}`, borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", fontFamily: "Inter, sans-serif" }}>Emotional uncertainty</div>
          <div style={{ fontSize: 12.5, color: "#64748b", marginTop: 2, marginBottom: 12, fontFamily: "Inter, sans-serif" }}>2 of 8 voices</div>
          <div style={{ display: "grid", gap: 8 }}>
            {voice('"Ghosted after interviews"', "#cfe8ef")}
            {voice('"Can\'t tell what\'s working"', "#cfe8ef")}
          </div>
        </div>
      </div>

      {/* grey */}
      <div style={{ background: hexA("#9CA3AF", 0.08), border: `1px solid ${hexA("#9CA3AF", 0.25)}`, borderRadius: 12, padding: 16, marginTop: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", fontFamily: "Inter, sans-serif" }}>Outcome blindness</div>
        <div style={{ fontSize: 12.5, color: "#64748b", marginTop: 2, marginBottom: 12, fontFamily: "Inter, sans-serif" }}>1 of 8 voices</div>
        <div style={{ maxWidth: 320 }}>{voice('"Don\'t know why I\'m not getting interviews"', "#e2e4e8")}</div>
      </div>

      {/* insight strip */}
      <div style={{ borderTop: "1px solid #e2e8f0", marginTop: 20, paddingTop: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: PURPLE, fontFamily: "Inter, sans-serif" }}>THE INSIGHT</div>
        <div style={{ fontSize: 14.5, color: "#334155", marginTop: 8, lineHeight: 1.6, fontFamily: "Inter, sans-serif" }}>
          People abandon trackers because upkeep costs more than it returns, not because trackers lack features. The fix is less effort, not more.
        </div>
      </div>
    </div>
  );
}
