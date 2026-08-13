import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

// =============================================================================
// DATA / MOCK GENERATOR (ported from lib/blueprint-data.ts — deterministic,
// no backend calls. Logic kept exactly as-is, only import paths changed.)
// =============================================================================
type WireframeKind = 'feed' | 'composer' | 'detail' | 'list' | 'confirm' | 'chart';

type Screen = {
  title: string;
  kind: WireframeKind;
  elements: string[];
  rationale: string;
};

type Blueprint = {
  brief: string;
  screens: Screen[];
  summary: string;
};

type ExampleBrief = {
  label: string;
  brief: string;
};

const EXAMPLE_BRIEFS: ExampleBrief[] = [
  {
    label: 'Close friends story reply',
    brief:
      "A way for users to quickly reply to a close friend's story with a short message or reaction, then confirm it was sent privately.",
  },
  {
    label: 'Creator earnings summary',
    brief:
      'A dashboard where creators can review their earnings over time, break down revenue by source, and request a payout.',
  },
  {
    label: 'Video draft scheduler',
    brief:
      'A tool for creators to pick a saved video draft, choose a publish date and time, and confirm the scheduled post.',
  },
  {
    label: 'Habit streak tracker',
    brief:
      'A lightweight app to log a daily habit, see the current streak at a glance, and review a history of completed days.',
  },
];

// Fully populated default output so the layout is visible on load.
const DEFAULT_BLUEPRINT: Blueprint = {
  brief: EXAMPLE_BRIEFS[0].brief,
  summary:
    "The flow moves from discovery to action to reassurance. Viewers land in a familiar story context, drop into a focused reply composer that removes distractions, and end on a lightweight confirmation that builds trust that the private reply was delivered — mirroring the emotional beats of a real conversation.",
  screens: [
    {
      title: 'Story viewer',
      kind: 'feed',
      elements: ['Full-bleed story media', 'Close friends badge + author', 'Reply input dock'],
      rationale:
        'Entry point that keeps the friend\'s story in focus and surfaces the reply affordance without leaving the viewing context.',
    },
    {
      title: 'Reply composer',
      kind: 'composer',
      elements: ['Message text field', 'Quick reaction row', 'Send button'],
      rationale:
        'A focused surface for composing a short, personal reply so the moment feels intimate rather than like posting publicly.',
    },
    {
      title: 'Sent confirmation',
      kind: 'confirm',
      elements: ['Delivery status pill', 'Reply preview thumbnail', 'Back to stories link'],
      rationale:
        'Closes the loop with clear feedback that the reply was sent privately, reducing anxiety about who can see it.',
    },
  ],
};

const ADDITIONAL_BLUEPRINTS: { keywords: string[]; blueprint: Blueprint }[] = [
  {
    keywords: ['earning', 'payout', 'revenue', 'creator earnings'],
    blueprint: {
      brief: '',
      summary:
        "The flow prioritizes comprehension before action. Creators first absorb the big-picture number, drill into what drives it, and only then move to the higher-stakes payout request — so money decisions are made with full context.",
      screens: [
        {
          title: 'Earnings overview',
          kind: 'chart',
          elements: ['Total earnings figure', 'Trend chart', 'Time range selector'],
          rationale: "Gives creators an immediate read on how they're doing before any detail.",
        },
        {
          title: 'Revenue breakdown',
          kind: 'list',
          elements: ['Source list rows', 'Per-source amounts', 'Percentage bars'],
          rationale: 'Explains what is driving the total so the top-line number feels trustworthy.',
        },
        {
          title: 'Request payout',
          kind: 'confirm',
          elements: ['Available balance', 'Destination account', 'Confirm payout button'],
          rationale: 'Isolates the money-moving action with clear amounts to prevent costly mistakes.',
        },
      ],
    },
  },
  {
    keywords: ['schedul', 'draft', 'publish', 'video draft'],
    blueprint: {
      brief: '',
      summary:
        "A linear scheduling flow that mirrors the creator's mental model: choose what to publish, decide when, and lock it in. Keeping selection and timing on separate screens avoids a cramped, error-prone single form.",
      screens: [
        {
          title: 'Draft picker',
          kind: 'list',
          elements: ['Draft thumbnails grid', 'Draft titles + duration', 'Select action'],
          rationale: 'Lets creators find and choose the right saved draft as the starting point.',
        },
        {
          title: 'Schedule time',
          kind: 'composer',
          elements: ['Date picker', 'Time picker', 'Timezone note'],
          rationale: 'Focuses solely on timing so publish windows are chosen deliberately.',
        },
        {
          title: 'Confirm schedule',
          kind: 'confirm',
          elements: ['Preview card', 'Scheduled datetime', 'Confirm + edit buttons'],
          rationale: 'A final review that prevents mistimed posts before committing.',
        },
      ],
    },
  },
  {
    keywords: ['habit', 'streak', 'track'],
    blueprint: {
      brief: '',
      summary:
        'The flow is built around momentum. The streak is the emotional payoff, so it sits front and center, while logging is a single tap and history is available for reflection without cluttering the daily view.',
      screens: [
        {
          title: 'Today',
          kind: 'detail',
          elements: ['Current streak count', 'Log habit button', 'Motivational line'],
          rationale: 'Puts the streak and the one action that matters today in immediate reach.',
        },
        {
          title: 'Log entry',
          kind: 'composer',
          elements: ['Habit toggle', 'Optional note field', 'Save button'],
          rationale: 'A frictionless capture step so logging never feels like a chore.',
        },
        {
          title: 'History',
          kind: 'list',
          elements: ['Calendar heatmap', 'Completed day rows', 'Longest streak stat'],
          rationale: 'Supports reflection and reinforces progress to keep the habit going.',
        },
      ],
    },
  },
];

// Deterministic-ish generator that produces plausible blueprints for arbitrary briefs.
function generateBlueprint(brief: string): Blueprint {
  const trimmed = brief.trim().toLowerCase();

  const match = ADDITIONAL_BLUEPRINTS.find((b) => b.keywords.some((k) => trimmed.includes(k)));

  if (match) {
    return { ...match.blueprint, brief: brief.trim() };
  }

  // Generic three-screen fallback for unknown briefs.
  return {
    brief: brief.trim(),
    summary:
      'A pragmatic three-step flow: orient the user with an overview, let them take the core action on a focused screen, then confirm the result. Each screen has a single primary job to keep cognitive load low.',
    screens: [
      {
        title: 'Overview',
        kind: 'list',
        elements: ['Primary heading', 'Summary list', 'Call to action'],
        rationale: 'Grounds the user in what this flow is about and offers the main entry point.',
      },
      {
        title: 'Action',
        kind: 'composer',
        elements: ['Input fields', 'Helper text', 'Primary button'],
        rationale: 'The core interaction, isolated so the user can focus on completing the key task.',
      },
      {
        title: 'Confirmation',
        kind: 'confirm',
        elements: ['Success indicator', 'Result summary', 'Next step link'],
        rationale: 'Reassures the user the action succeeded and points them to a sensible next step.',
      },
    ],
  };
}

// =============================================================================
// WIREFRAME MOCKUP (ported from components/wireframe-mockup.tsx)
// =============================================================================
function Bar({ className = '' }: { className?: string }) {
  return <div className={`rounded-sm bg-slate-500/20 ${className}`} />;
}

function Box({ className = '', children }: { className?: string; children?: React.ReactNode }) {
  return <div className={`rounded-md border border-dashed border-slate-500/30 bg-slate-100/40 ${className}`}>{children}</div>;
}

function wireframeLayout(kind: WireframeKind) {
  switch (kind) {
    case 'feed':
      return (
        <>
          <div className="flex items-center gap-2">
            <div className="size-5 rounded-full bg-slate-500/25" />
            <Bar className="h-2 w-16" />
          </div>
          <Box className="flex-1" />
          <div className="flex items-center gap-2">
            <Bar className="h-6 flex-1 rounded-full" />
            <div className="size-6 rounded-full bg-slate-500/25" />
          </div>
        </>
      );
    case 'composer':
      return (
        <>
          <Bar className="h-2 w-20" />
          <Box className="h-1/2" />
          <div className="flex gap-1.5">
            <div className="size-6 rounded-full bg-slate-500/20" />
            <div className="size-6 rounded-full bg-slate-500/20" />
            <div className="size-6 rounded-full bg-slate-500/20" />
          </div>
          <Bar className="h-6 w-full rounded-md bg-indigo-600/40" />
        </>
      );
    case 'detail':
      return (
        <>
          <Bar className="h-2 w-14" />
          <Bar className="h-7 w-24 rounded-md bg-slate-500/30" />
          <Box className="flex-1" />
          <div className="flex gap-1.5">
            <Bar className="h-4 w-12 rounded-full" />
            <Bar className="h-4 w-12 rounded-full" />
          </div>
        </>
      );
    case 'list':
      return (
        <>
          <Bar className="h-2 w-16" />
          <div className="flex flex-1 flex-col gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2 rounded-sm border border-slate-500/15 p-1.5">
                <div className="size-4 shrink-0 rounded-sm bg-slate-500/20" />
                <Bar className="h-2 flex-1" />
                <Bar className="h-2 w-6" />
              </div>
            ))}
          </div>
        </>
      );
    case 'chart':
      return (
        <>
          <Bar className="h-2 w-14" />
          <Bar className="h-7 w-24 rounded-md bg-slate-500/30" />
          <Box className="relative flex-1 p-2">
            <svg
              viewBox="0 0 100 60"
              preserveAspectRatio="none"
              className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)]"
              role="presentation"
            >
              {/* baseline */}
              <line x1="0" y1="58" x2="100" y2="58" className="stroke-slate-500/20" strokeWidth="0.75" />
              {/* area fill under the line */}
              <polygon points="4,44 24,30 44,36 64,18 84,24 96,10 96,58 4,58" className="fill-indigo-600/10" />
              {/* the trend line */}
              <polyline
                points="4,44 24,30 44,36 64,18 84,24 96,10"
                fill="none"
                className="stroke-indigo-600/70"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* data points */}
              {[
                [4, 44],
                [24, 30],
                [44, 36],
                [64, 18],
                [84, 24],
                [96, 10],
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="1.6" className="fill-indigo-600/80" />
              ))}
            </svg>
          </Box>
          <div className="flex gap-1.5">
            <Bar className="h-4 w-12 rounded-full" />
            <Bar className="h-4 w-12 rounded-full" />
          </div>
        </>
      );
    case 'confirm':
      return (
        <>
          <div className="flex flex-1 flex-col items-center justify-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-indigo-600/15">
              <div className="size-4 rounded-full bg-indigo-600/60" />
            </div>
            <Bar className="h-2 w-24" />
            <Bar className="h-2 w-16" />
          </div>
          <Bar className="h-6 w-full rounded-md bg-slate-500/15" />
        </>
      );
  }
}

function WireframeMockup({ kind }: { kind: WireframeKind }) {
  return (
    <div
      aria-hidden="true"
      className="flex aspect-[3/4] w-full flex-col gap-2 rounded-lg border border-slate-200 bg-slate-100/40 p-3"
    >
      {wireframeLayout(kind)}
    </div>
  );
}

// =============================================================================
// SCREEN CARD (ported from components/screen-card.tsx)
// =============================================================================
function ScreenCard({ screen, index }: { screen: Screen; index: number }) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4">
      <header className="flex items-center gap-2">
        <span className="font-mono text-[11px] tabular-nums text-slate-500">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="text-sm font-semibold text-slate-900">{screen.title}</h3>
      </header>

      <WireframeMockup kind={screen.kind} />

      <div className="flex flex-col gap-2">
        <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Key elements</p>
        <ul className="flex flex-col gap-1">
          {screen.elements.map((el) => (
            <li key={el} className="flex items-start gap-2 text-[13px] leading-relaxed text-slate-900">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-indigo-600" />
              {el}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-auto border-t border-slate-200 pt-3 text-[13px] leading-relaxed text-slate-500 text-pretty">
        {screen.rationale}
      </p>
    </article>
  );
}

// =============================================================================
// BLUEPRINT GENERATOR — ported from components/brief-to-blueprint.tsx
// =============================================================================
function BlueprintGeneratorHeader() {
  return (
    <header className="flex flex-col gap-3 border-b border-slate-200 pb-6">
      <div className="flex items-center gap-2.5">
        <div className="flex size-7 items-center justify-center rounded-md bg-indigo-600">
          <div className="grid grid-cols-2 gap-0.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="size-1.5 rounded-[1px] bg-white" />
            ))}
          </div>
        </div>
        <h1 className="text-lg font-semibold tracking-tight text-slate-900">Brief to Blueprint</h1>
      </div>
      <p className="text-[15px] text-slate-500 text-pretty">Turn a product brief into a wireframe blueprint.</p>
    </header>
  );
}

function BlueprintLoadingState() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-slate-300 bg-white/50 py-20">
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-2.5 animate-pulse rounded-full bg-indigo-600"
            style={{ animationDelay: `${i * 180}ms`, animationDuration: '1s' }}
          />
        ))}
      </div>
      <p className="font-mono text-sm text-slate-500" role="status">
        Structuring your blueprint…
      </p>
    </section>
  );
}

function BlueprintOutput({ blueprint }: { blueprint: Blueprint }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-baseline justify-between border-b border-slate-200 pb-3">
        <h2 className="text-sm font-semibold text-slate-900">Blueprint</h2>
        <span className="font-mono text-[11px] text-slate-500">{blueprint.screens.length} screens</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blueprint.screens.map((screen, i) => (
          <ScreenCard key={`${screen.title}-${i}`} screen={screen} index={i} />
        ))}
      </div>

      <section className="rounded-xl border border-indigo-600/20 bg-indigo-50/50 p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-indigo-600" />
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-indigo-600">Design rationale</h3>
        </div>
        <p className="text-[15px] leading-relaxed text-slate-900 text-pretty">{blueprint.summary}</p>
      </section>
    </div>
  );
}

function BlueprintGenerator() {
  const [brief, setBrief] = useState(DEFAULT_BLUEPRINT.brief);
  const [blueprint, setBlueprint] = useState<Blueprint>(DEFAULT_BLUEPRINT);
  const [isGenerating, setIsGenerating] = useState(false);

  function handleGenerate() {
    if (!brief.trim() || isGenerating) return;
    setIsGenerating(true);
    const input = brief;
    // Simulate an async generation pass.
    window.setTimeout(() => {
      setBlueprint(generateBlueprint(input));
      setIsGenerating(false);
    }, 1600);
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-5 py-10 md:py-16">
      <BlueprintGeneratorHeader />

      <section className="flex flex-col gap-4">
        <label htmlFor="brief" className="font-mono text-xs uppercase tracking-wider text-indigo-600">
          {'> product_brief'}
        </label>
        <textarea
          id="brief"
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && !e.nativeEvent.isComposing) {
              e.preventDefault();
              handleGenerate();
            }
          }}
          placeholder="Describe the product flow you want to break down into screens…"
          rows={4}
          className="w-full resize-y rounded-xl border border-slate-200 bg-white p-4 text-[15px] leading-relaxed text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-500/60 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10"
        />

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500">Examples</span>
          {EXAMPLE_BRIEFS.map((ex) => (
            <button
              key={ex.label}
              type="button"
              onClick={() => setBrief(ex.brief)}
              className="rounded-full border border-slate-200 bg-slate-100/60 px-3 py-1 text-[13px] text-slate-700 transition-colors hover:border-indigo-600/40 hover:bg-indigo-50 hover:text-indigo-600"
            >
              {ex.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || !brief.trim()}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGenerating ? 'Structuring…' : 'Generate blueprint'}
          </button>
          <span className="hidden font-mono text-[11px] text-slate-500 sm:inline">⌘ + Enter</span>
        </div>
      </section>

      {isGenerating ? <BlueprintLoadingState /> : <BlueprintOutput blueprint={blueprint} />}
    </div>
  );
}

// =============================================================================
// MAIN CASE STUDY COMPONENT
// TODO: this wrapper is intentionally minimal — narrative copy (problem
// statement, design rationale, outcomes) still needs to be written. See
// src/pages/MedicationReconciliation.tsx for the structure/tone this
// portfolio's other case studies follow.
// =============================================================================
export default function CaseStudyBriefToBlueprint() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <article className="max-w-4xl mx-auto px-6 pt-16 pb-16">
        {/* TODO: eyebrow line — role / timeline, matches the format in MedicationReconciliation.tsx */}

        {/* TODO: replace with the real case study title */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
          Brief to Blueprint
        </h1>

        {/* TODO: role / context / timeline / tools meta grid (see MedicationReconciliation.tsx) */}

        {/* TODO: Problem space section */}

        {/* TODO: Key design decisions section(s) */}

        <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-6 flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <p className="text-sm font-bold text-slate-900">Try the generator</p>
            <p className="text-xs text-slate-500 mt-1">
              Type a product brief (or pick an example) and generate a wireframe blueprint.
            </p>
          </div>
          <a
            href="#sandbox"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs transition-all shadow"
          >
            <span>Try it</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </article>

      <section id="sandbox" className="border-t border-slate-200">
        <BlueprintGenerator />
      </section>

      {/* TODO: Outcomes / closing section (optional) */}
    </div>
  );
}
