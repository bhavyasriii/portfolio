import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import tiktokDashboardCover from '../assets/images/tiktok-dashboard-cover.png';
import briefToBlueprintCover from '../assets/images/brief-to-blueprint-cover.png';

// =============================================================================
// DATA — real notes from porting each vibe-coded prototype into this
// portfolio. No invented metrics or claims, only what actually happened.
// =============================================================================
type Project = {
  number: string;
  title: string;
  annotation: string;
  note: string;
  caseStudyRoute: string;
  cover?: string;
  accent: string;
};

const projects: Project[] = [
  {
    number: '01',
    title: 'Creator Analytics Dashboard',
    annotation: 'growth hero, 7-day spark, hand-built SVG charts (no chart library)',
    note: 'Caught a color collision, the brand pink was also flagging a negative trend. Fixed before it shipped. Ported and verified with a full build plus Playwright.',
    caseStudyRoute: '/case-study/tiktok-dashboard',
    cover: tiktokDashboardCover,
    accent: '#e11d48',
  },
  {
    number: '02',
    title: 'Brief to Blueprint',
    annotation: 'prompt to wireframe, deterministic generator, no backend calls',
    note: "Kept it honest: this doesn't call a live model, so the copy says exactly that. One screen's chart area rendered empty on the first pass, worth a second look before calling it done.",
    caseStudyRoute: '/case-study/brief-to-blueprint',
    cover: briefToBlueprintCover,
    accent: '#4f46e5',
  },
  {
    number: '03',
    title: 'Tap the Beat',
    annotation: 'tap-tempo detection, beat-synced microinteractions',
    note: 'Built silent on purpose, real trending sounds are copyrighted. Added a synthesized Web Audio tone and a mute toggle so it actually felt alive.',
    caseStudyRoute: '/case-study/tap-the-beat',
    accent: '#f472b6',
  },
];

// =============================================================================
// TAPE ACCENT — small rotated coral strip, recurring detail across the page
// =============================================================================
function TapeAccent({ style }: { style?: CSSProperties }) {
  return (
    <span
      aria-hidden="true"
      className="fn-tape"
      style={style}
    />
  );
}

// =============================================================================
// PREVIEW FRAME — dashed border, cream-white interior, small annotation callout
// =============================================================================
function PreviewFrame({ project }: { project: Project }) {
  return (
    <div className="fn-frame">
      <TapeAccent style={{ top: -10, left: 22, transform: 'rotate(-6deg)' }} />
      <div className="fn-frame-inner">
        {project.cover ? (
          <img src={project.cover} alt={`${project.title} preview`} className="fn-frame-img" />
        ) : (
          <div className="fn-frame-abstract" style={{ background: `linear-gradient(135deg, ${project.accent}22, #14121a)` }}>
            <div className="fn-frame-abstract-dot" style={{ background: project.accent }} />
            <div className="fn-frame-abstract-bars">
              <span style={{ background: project.accent }} />
              <span style={{ background: project.accent, opacity: 0.6 }} />
              <span style={{ background: project.accent, opacity: 0.35 }} />
            </div>
          </div>
        )}
      </div>
      <div className="fn-callout">{project.annotation}</div>
    </div>
  );
}

// =============================================================================
// FIELD NOTE ENTRY
// =============================================================================
function FieldNoteEntry({ project }: { project: Project }) {
  const navigate = useNavigate();
  return (
    <article className="fn-entry">
      <div className="fn-label">
        {project.number} / {project.title.toUpperCase()}
      </div>

      <div className="fn-entry-grid">
        <PreviewFrame project={project} />

        <div className="fn-entry-copy">
          <h3 className="fn-entry-title">{project.title}</h3>
          <p className="fn-note">{project.note}</p>
          <button className="fn-link" onClick={() => navigate(project.caseStudyRoute)}>
            View case study
            <ArrowUpRight className="fn-link-icon" />
          </button>
        </div>
      </div>
    </article>
  );
}

// =============================================================================
// PAGE
// =============================================================================
export default function FieldNotes() {
  const navigate = useNavigate();

  return (
    <div className="field-notes-page">
      <style>{`
        .field-notes-page {
          --kraft-bg: #f4ede0;
          --grid-line: #dcd0b8;
          --mono-label: #8a7a5c;
          --ink: #4a4028;
          --coral: #d4794f;
          --dashed-border: #a89771;
          --frame-bg: #fbf7ee;

          min-height: 100vh;
          background-color: var(--kraft-bg);
          background-image:
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
          background-size: 22px 22px;
          font-family: Inter, system-ui, sans-serif;
          padding: 64px 24px 96px;
        }

        .fn-tape {
          position: absolute;
          width: 64px;
          height: 18px;
          background: var(--coral);
          opacity: 0.5;
          box-shadow: 0 2px 6px rgba(74, 64, 40, 0.12);
        }

        .fn-wrap { max-width: 880px; margin: 0 auto; }

        .fn-back {
          display: flex;
          width: fit-content;
          align-items: center;
          gap: 6px;
          font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--mono-label);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          margin-bottom: 36px;
        }
        .fn-back:hover { color: var(--ink); }

        .fn-eyebrow {
          font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--mono-label);
          margin-bottom: 14px;
          position: relative;
          display: inline-block;
        }

        .fn-title {
          font-size: clamp(34px, 5vw, 52px);
          line-height: 1;
          letter-spacing: -0.03em;
          color: var(--ink);
          font-weight: 800;
          margin-bottom: 16px;
        }

        .fn-subtitle {
          font-family: "Instrument Serif", Georgia, serif;
          font-style: italic;
          font-size: 21px;
          line-height: 1.5;
          color: var(--ink);
          max-width: 560px;
          margin-bottom: 64px;
        }

        .fn-entry { margin-bottom: 72px; position: relative; }
        .fn-entry:last-child { margin-bottom: 0; }

        .fn-label {
          font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--mono-label);
          margin-bottom: 18px;
        }

        .fn-entry-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 32px;
          align-items: start;
        }

        .fn-frame {
          position: relative;
          border: 1.5px dashed var(--dashed-border);
          border-radius: 4px;
          background: var(--frame-bg);
          padding: 14px;
        }

        .fn-frame-inner {
          border-radius: 3px;
          overflow: hidden;
          background: #14121a;
          aspect-ratio: 16 / 10;
        }

        .fn-frame-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          display: block;
        }

        .fn-frame-abstract {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }
        .fn-frame-abstract-dot {
          width: 34px;
          height: 34px;
          border-radius: 50%;
        }
        .fn-frame-abstract-bars {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          height: 24px;
        }
        .fn-frame-abstract-bars span {
          width: 4px;
          height: 100%;
          border-radius: 2px;
        }
        .fn-frame-abstract-bars span:nth-child(1) { height: 60%; }
        .fn-frame-abstract-bars span:nth-child(2) { height: 100%; }
        .fn-frame-abstract-bars span:nth-child(3) { height: 40%; }

        .fn-callout {
          margin-top: 12px;
          font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
          font-size: 11px;
          line-height: 1.6;
          letter-spacing: 0.01em;
          color: var(--mono-label);
        }

        .fn-entry-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
          padding-top: 4px;
        }

        .fn-entry-title {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--ink);
          margin-bottom: 14px;
        }

        .fn-note {
          font-family: "Instrument Serif", Georgia, serif;
          font-style: italic;
          font-size: 19px;
          line-height: 1.65;
          color: var(--ink);
          margin-bottom: 22px;
        }

        .fn-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          width: fit-content;
          font-family: Inter, sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: var(--ink);
          background: none;
          border: none;
          border-bottom: 1.5px solid var(--dashed-border);
          padding: 0 0 2px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .fn-link:hover { color: var(--coral); border-color: var(--coral); }
        .fn-link-icon { width: 13px; height: 13px; }

        @media (max-width: 720px) {
          .fn-entry-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="fn-wrap">
        <button className="fn-back" onClick={() => navigate('/')}>
          <ArrowLeft className="fn-link-icon" />
          Back to portfolio
        </button>

        <div className="fn-eyebrow">
          Portfolio / Process Log
          <TapeAccent style={{ top: -8, right: -30, width: 40, height: 14, transform: 'rotate(8deg)' }} />
        </div>
        <h1 className="fn-title">Field Notes</h1>
        <p className="fn-subtitle">
          Prompts, sketches, and a few things that broke along the way, notes from porting three
          vibe-coded prototypes into working pages in this portfolio.
        </p>

        {projects.map((project) => (
          <FieldNoteEntry key={project.number} project={project} />
        ))}
      </div>
    </div>
  );
}
