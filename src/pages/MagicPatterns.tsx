import React from "react";
import { Link } from "react-router-dom";

const MagicPatterns: React.FC = () => {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 40%, #16213e 100%)",
        color: "#e8e6f0",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Back Button */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 24,
            padding: "8px 18px",
            fontSize: 14,
            color: "#c4b5f4",
            textDecoration: "none",
            backdropFilter: "blur(8px)",
          }}
        >
          ← Back
        </Link>
      </div>

      <article style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>

        {/* Header */}
        <header style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: "1rem", flexWrap: "wrap" }}>
            <span style={tagStyle("#7c3aed", "#ede9fe")}>Product Critique</span>
            <span style={tagStyle("#0369a1", "#e0f2fe")}>AI Tool Analysis</span>
            <span style={tagStyle("#065f46", "#d1fae5")}>Healthcare Workflow</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: "1rem",
              background: "linear-gradient(135deg, #c4b5f4 0%, #818cf8 50%, #38bdf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Magic Patterns
            <br />
            Product Critique & Redesign
          </h1>

          <p style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            What happens when a designer with product thinking uses an AI design tool vs. a user who just describes a screen? I tested this gap using a clinical healthcare dashboard, and the difference was dramatic.
          </p>

          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[
              { label: "Tool", value: "Magic Patterns" },
              { label: "Domain", value: "Healthcare UX" },
              { label: "Method", value: "Prompt iteration + critique" },
              { label: "Year", value: "2025" },
            ].map((m) => (
              <div key={m.label}>
                <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>{m.label}</div>
                <div style={{ fontSize: 15, color: "#e2e8f0", fontWeight: 600 }}>{m.value}</div>
              </div>
            ))}
          </div>
        </header>

        <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", margin: "2rem 0" }} />

        {/* Section: The Setup */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>The Setup</h2>
          <p style={bodyStyle}>
            I wanted to understand Magic Patterns from the inside, not as a reviewer but as a product designer evaluating a tool I might use daily. I chose a clinical patient appointment dashboard as my test case because it sits at the intersection of two things I care about: healthcare workflows and AI-native interfaces.
          </p>
          <p style={bodyStyle}>
            My first prompt was intentionally simple:
          </p>
          <blockquote style={quoteStyle}>
            "Create a patient appointment dashboard that shows today's scheduled appointments, a count of cancellations, and highlights overdue follow-ups in red."
          </blockquote>
        </section>

        {/* Section: First Output */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>What the first version got right</h2>
          <p style={bodyStyle}>
            Magic Patterns generated a clean, scannable clinical interface immediately. Before generating, it stated its assumption upfront: "Assuming this is for front-desk/clinical staff, so I'm going clean and scannable with a calm clinical palette, tell me if you'd rather it lean patient-facing."
          </p>
          <p style={bodyStyle}>
            That assumption disclosure is a small but meaningful trust-building pattern that most AI tools skip entirely. The output included realistic patient data, proper color coding for appointment statuses, and red highlighting on overdue follow-ups. For a first pass from a single prompt, it was genuinely impressive.
          </p>
        </section>

        {/* Section: Three Gaps */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>What the first version revealed</h2>
          <p style={{ ...bodyStyle, marginBottom: "1.5rem" }}>
            Three real UX gaps emerged immediately:
          </p>

          {[
            {
              number: "01",
              title: "Static data, no reactivity",
              body: "The cancellation count in the stat card said 2. Two patients were cancelled in the table. The math worked, but only because it was hardcoded. If I added a third cancellation, the stat card would still say 2. The tool thinks in screens, not systems. A dashboard that doesn't reflect real data isn't a dashboard, it's a mockup wearing a dashboard costume.",
              color: "#f97316",
            },
            {
              number: "02",
              title: "No action affordances",
              body: "I could see that Robert Fields was 12 days overdue with elevated A1C. I couldn't do anything about it. No call button, no way to log a contact attempt, no handoff to the next staff member. Clinical staff need to act and document in the same surface, switching to a separate system to log a call attempt breaks the workflow entirely.",
              color: "#ef4444",
            },
            {
              number: "03",
              title: "Cancellations treated as dead ends",
              body: "Emma Johnson's 10:00am slot was marked Cancelled and buried in the appointments table. But that cancelled slot is actually an available slot, immediately bookable for a walk-in, a portal request, or a same-day caller. The dashboard was counting cancellations as losses instead of surfacing them as inventory.",
              color: "#a855f7",
            },
          ].map((gap) => (
            <div key={gap.number} style={gapCardStyle(gap.color)}>
              <div style={{ fontSize: 11, color: gap.color, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>
                GAP {gap.number}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#f1f5f9", marginBottom: 8 }}>{gap.title}</h3>
              <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.7 }}>{gap.body}</p>
            </div>
          ))}
        </section>

        {/* Section: Redesigned Prompt */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>The redesigned prompt</h2>
          <p style={bodyStyle}>
            I rebuilt the prompt around workflows rather than screens. The key changes:
          </p>
          <ul style={{ ...bodyStyle, paddingLeft: "1.5rem" }}>
            {[
              "Stat cards must be reactive, pulling from actual data, not hardcoded numbers",
              "Split layout, confirmed schedule on the left, available slots from cancellations on the right",
              "Each overdue row needs a Call Now button and a dropdown to log outcome, Call answered, Call unanswered, Left voicemail, Patient declined, with automatic timestamping",
              "Urgency hierarchy, patients overdue 7+ days get High priority treatment vs patients overdue under 5 days",
            ].map((item, i) => (
              <li key={i} style={{ marginBottom: 8, lineHeight: 1.7 }}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Section: Second Output */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>What the second version built</h2>
          <p style={bodyStyle}>
            Every requirement was executed correctly:
          </p>

          <div style={{ display: "grid", gap: 12, marginTop: "1rem" }}>
            {[
              "Confirmed schedule showed only 10 confirmed appointments, cancelled slots removed",
              "Available slots panel pulled Emma Johnson (10:00am, Dr. Patel) and Mateo Alvarez (11:15am, Dr. Reyes) directly from cancelled data, not hardcoded separately",
              "Stat cards showed correct reactive counts, 10 scheduled, 2 cancellations, 4 overdue",
              "Urgency hierarchy worked, Robert Fields and Diana Prince showed High priority, Marcus Bell showed Priority, Yuki Sato showed Overdue",
              "Call logging with timestamps worked for all 4 patients, Left voicemail · Jul 14, 2026 at 10:05 AM",
              "Book Now button on available slots, turning cancellations into immediate booking opportunities",
            ].map((item, i) => (
              <div key={i} style={checkItemStyle}>
                <span style={{ color: "#22c55e", fontSize: 16, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={insightBoxStyle}>
            <strong style={{ color: "#c4b5f4" }}>The key insight:</strong> The improvement between prompt 1 and prompt 2 was dramatic, not because the AI got better, but because the product thinking behind the prompt got better.
          </div>
        </section>

        {/* Section: Still needs a designer */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>What still needs a designer</h2>
          <p style={bodyStyle}>
            Even after the second prompt, three gaps remained - and these aren't failures of the AI. They're the gaps that a product designer needs to fill:
          </p>
          <ul style={{ ...bodyStyle, paddingLeft: "1.5rem" }}>
            {[
              "Empty state, what does the dashboard show at 8:00am before any appointments have started? How does it tell staff what to do first?",
              "End of day handling, what happens to uncontacted overdue patients at 5:30pm? The dashboard needs a closure workflow.",
              "Walk-in booking flow, the available slots panel shows open times but has no way to capture a walk-in patient's information and complete the booking.",
            ].map((item, i) => (
              <li key={i} style={{ marginBottom: 8, lineHeight: 1.7 }}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Section: Meta Insight */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>The meta insight</h2>
          <div style={{ ...insightBoxStyle, background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(56,189,248,0.08))", borderColor: "rgba(124,58,237,0.3)" }}>
            <p style={{ fontSize: 17, color: "#e2e8f0", lineHeight: 1.75, margin: 0 }}>
              Magic Patterns produces dramatically better output when the person prompting thinks like a product designer. The gap isn't the AI, it's that most users don't know how to structure prompts around workflows rather than screens.
            </p>
          </div>
          <p style={bodyStyle}>
            That's the design problem worth solving inside Magic Patterns itself. Better prompt scaffolding. Workflow templates that guide users to think about data states, action affordances, and edge cases before generating. Guardrails that ask "what happens when a user needs to act on this?" before producing a read-only view.
          </p>
          <p style={bodyStyle}>
            The tool is powerful. The opportunity is teaching users how to unlock that power, not by making the AI smarter, but by making the prompting process more structured and product-minded.
          </p>
        </section>

        {/* Footer nav */}
        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#818cf8",
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            ← Back to portfolio
          </Link>
        </div>
      </article>
    </main>
  );
};

// Style helpers
const tagStyle = (bg: string, color: string): React.CSSProperties => ({
  background: bg + "22",
  color,
  border: `1px solid ${bg}44`,
  borderRadius: 20,
  padding: "4px 12px",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: 0.5,
});

const sectionStyle: React.CSSProperties = {
  marginBottom: "3rem",
};

const h2Style: React.CSSProperties = {
  fontSize: "1.35rem",
  fontWeight: 700,
  color: "#f1f5f9",
  marginBottom: "1rem",
  letterSpacing: -0.3,
};

const bodyStyle: React.CSSProperties = {
  fontSize: 16,
  color: "#94a3b8",
  lineHeight: 1.8,
  marginBottom: "1rem",
};

const quoteStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderLeft: "3px solid #818cf8",
  borderRadius: 8,
  padding: "1rem 1.25rem",
  fontSize: 15,
  color: "#c4b5f4",
  fontStyle: "italic",
  margin: "1rem 0",
  lineHeight: 1.7,
};

const gapCardStyle = (color: string): React.CSSProperties => ({
  background: "rgba(255,255,255,0.03)",
  border: `1px solid ${color}33`,
  borderLeft: `3px solid ${color}`,
  borderRadius: 12,
  padding: "1.25rem 1.5rem",
  marginBottom: "1rem",
});

const checkItemStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
  background: "rgba(34,197,94,0.05)",
  border: "1px solid rgba(34,197,94,0.12)",
  borderRadius: 8,
  padding: "0.75rem 1rem",
};

const insightBoxStyle: React.CSSProperties = {
  background: "rgba(129,140,248,0.08)",
  border: "1px solid rgba(129,140,248,0.2)",
  borderRadius: 12,
  padding: "1.25rem 1.5rem",
  margin: "1.5rem 0",
  fontSize: 16,
  color: "#94a3b8",
  lineHeight: 1.75,
};

export default MagicPatterns;
