import { useId, useMemo, useState } from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Video,
  Users,
  Wallet,
  Sparkles,
  Settings,
  Bell,
  Menu,
  Search,
  X,
  ArrowUpRight,
  Plus,
} from 'lucide-react';

// =============================================================================
// DATA (ported from lib/dashboard-data.ts)
// =============================================================================
type MetricKey = 'views' | 'followers' | 'engagement' | 'rewards';

type TimelinePoint = {
  label: string;
  values: Record<MetricKey, number>;
};

type MetricSeriesMeta = {
  key: MetricKey;
  label: string;
  format: 'count' | 'percent' | 'currency';
};

type SecondaryMetric = {
  key: string;
  label: string;
  value: number;
  format: 'count' | 'percent';
  changePct: number;
  spark: number[];
};

type Insight = {
  id: string;
  headline: string;
  detail: string;
};

type CreatorProfile = {
  name: string;
  handle: string;
  avatarInitials: string;
  followers: number;
  following: number;
  likes: number;
};

const profile: CreatorProfile = {
  name: 'Maya Rivers',
  handle: '@mayamakes',
  avatarInitials: 'MR',
  followers: 248300,
  following: 312,
  likes: 4820000,
};

const followerGrowth7d: number[] = [3120, 3480, 3010, 4260, 5100, 4820, 6340];
const followerGrowthTotal = followerGrowth7d.reduce((a, b) => a + b, 0);
const followerGrowthChangePct = 18.4;

const secondaryMetrics: SecondaryMetric[] = [
  {
    key: 'profile-views',
    label: 'Profile views',
    value: 52840,
    format: 'count',
    changePct: 12.3,
    spark: [6100, 6400, 5900, 7200, 7800, 8100, 9340],
  },
  {
    key: 'video-views',
    label: 'Video views',
    value: 1284000,
    format: 'count',
    changePct: 27.6,
    spark: [140000, 155000, 132000, 190000, 205000, 231000, 271000],
  },
  {
    key: 'engagement-rate',
    label: 'Engagement rate',
    value: 9.4,
    format: 'percent',
    changePct: -2.1,
    spark: [10.2, 10.0, 9.9, 9.6, 9.5, 9.3, 9.4],
  },
];

const insights: Insight[] = [
  {
    id: 'posting-window',
    headline: 'Videos posted 6–9pm get 40% more shares',
    detail: 'Your evening posts consistently outperform. Shift 2 uploads/week into this window.',
  },
  {
    id: 'hook-length',
    headline: 'Hooks under 3 seconds retain 2x more viewers',
    detail: 'Your top 5 videos this week all opened with a fast hook. Keep intros tight.',
  },
  {
    id: 'trending-sound',
    headline: '3 trending sounds match your last cooking series',
    detail: 'Jumping on these now could ride a rising trend before it peaks.',
  },
];

const metricSeriesMeta: MetricSeriesMeta[] = [
  { key: 'views', label: 'Views', format: 'count' },
  { key: 'followers', label: 'Followers', format: 'count' },
  { key: 'engagement', label: 'Engagement', format: 'percent' },
  { key: 'rewards', label: 'Rewards', format: 'currency' },
];

const timeline: TimelinePoint[] = [
  { label: 'Feb 1', values: { views: 142000, followers: 3120, engagement: 8.1, rewards: 210 } },
  { label: 'Feb 5', values: { views: 168000, followers: 3480, engagement: 8.6, rewards: 245 } },
  { label: 'Feb 9', values: { views: 151000, followers: 3010, engagement: 8.3, rewards: 232 } },
  { label: 'Feb 13', values: { views: 203000, followers: 4260, engagement: 9.0, rewards: 318 } },
  { label: 'Feb 17', values: { views: 246000, followers: 5100, engagement: 9.2, rewards: 402 } },
  { label: 'Feb 21', values: { views: 271000, followers: 4820, engagement: 9.1, rewards: 465 } },
  { label: 'Feb 25', values: { views: 318000, followers: 6340, engagement: 9.4, rewards: 548 } },
];

function formatNumber(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (Math.abs(n) >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return n.toLocaleString();
}

function formatValue(n: number, format: 'count' | 'percent' | 'currency'): string {
  if (format === 'percent') return `${n.toFixed(1)}%`;
  if (format === 'currency') return `$${formatNumber(n)}`;
  return formatNumber(n);
}

// =============================================================================
// SMALL UTIL (replaces clsx/tailwind-merge, not a project dependency)
// =============================================================================
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

// =============================================================================
// SPARKLINE (ported from components/dashboard/sparkline.tsx)
// =============================================================================
function Sparkline({
  data,
  width = 120,
  height = 40,
  strokeClassName = 'text-rose-600',
  fillClassName = 'text-rose-600',
  className,
  showArea = false,
  strokeWidth = 2,
}: {
  data: number[];
  width?: number;
  height?: number;
  strokeClassName?: string;
  fillClassName?: string;
  className?: string;
  showArea?: boolean;
  strokeWidth?: number;
}) {
  const gradientId = useId();
  const pad = strokeWidth;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = data.length > 1 ? (width - pad * 2) / (data.length - 1) : 0;

  const points = data.map((v, i) => {
    const x = pad + i * stepX;
    const y = pad + (1 - (v - min) / range) * (height - pad * 2);
    return [x, y] as const;
  });

  const line = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
  const area = `${line} L${points[points.length - 1][0].toFixed(2)},${height} L${points[0][0].toFixed(2)},${height} Z`;
  const [lastX, lastY] = points[points.length - 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {showArea && (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} className={fillClassName} fill={`url(#${gradientId})`} stroke="none" />
        </>
      )}
      <path
        d={line}
        fill="none"
        className={strokeClassName}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {!showArea && (
        <circle cx={lastX} cy={lastY} r={strokeWidth + 1} className={strokeClassName} fill="currentColor" />
      )}
    </svg>
  );
}

// =============================================================================
// CHANGE BADGE (ported from components/dashboard/change-badge.tsx)
// =============================================================================
function ChangeBadge({
  value,
  className,
  size = 'sm',
}: {
  value: number;
  className?: string;
  size?: 'sm' | 'lg';
}) {
  const positive = value >= 0;
  const Icon = positive ? TrendingUp : TrendingDown;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-semibold tabular-nums',
        positive ? 'bg-emerald-600/10 text-emerald-600' : 'bg-rose-600/10 text-rose-600',
        size === 'lg' ? 'px-2.5 py-1 text-sm' : 'px-2 py-0.5 text-xs',
        className,
      )}
    >
      <Icon className={size === 'lg' ? 'size-4' : 'size-3'} aria-hidden="true" />
      {positive ? '+' : ''}
      {value.toFixed(1)}%
    </span>
  );
}

// =============================================================================
// SIDEBAR (ported from components/dashboard/sidebar.tsx)
// =============================================================================
const navItems = [
  { label: 'Overview', icon: LayoutDashboard, active: false },
  { label: 'Growth', icon: TrendingUp, active: true },
  { label: 'Content', icon: Video, active: false },
  { label: 'Audience', icon: Users, active: false },
  { label: 'Rewards', icon: Wallet, active: false },
  { label: 'AI Studio', icon: Sparkles, active: false },
];

function DashboardSidebar() {
  return (
    <aside className="flex h-full w-full flex-col bg-slate-900 text-slate-300">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="flex size-9 items-center justify-center rounded-xl bg-rose-600 text-white">
          <TrendingUp className="size-5" aria-hidden="true" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">Creator Studio</p>
          <p className="text-xs text-slate-500">Growth analytics</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3" aria-label="Primary">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href="#"
              aria-current={item.active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                item.active
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white',
              )}
            >
              <Icon className="size-[18px] shrink-0" aria-hidden="true" />
              <span>{item.label}</span>
              {item.active && <span className="ml-auto h-4 w-1 rounded-full bg-rose-500" aria-hidden="true" />}
            </a>
          );
        })}
      </nav>

      <div className="px-3 pb-4">
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-white"
        >
          <Settings className="size-[18px] shrink-0" aria-hidden="true" />
          <span>Settings</span>
        </a>
      </div>
    </aside>
  );
}

// =============================================================================
// TOP BAR (ported from components/dashboard/top-bar.tsx)
// =============================================================================
function DashboardTopBar({
  onOpenNav,
  showData,
  onToggleData,
}: {
  onOpenNav: () => void;
  showData: boolean;
  onToggleData: (v: boolean) => void;
}) {
  return (
    <header className="flex items-center gap-3 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur sm:px-6">
      <button
        onClick={onOpenNav}
        className="grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      <div>
        <h1 className="text-lg font-semibold leading-tight text-slate-900">Growth</h1>
        <p className="hidden text-xs text-slate-500 sm:block">Your channel at a glance</p>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Demo toggle to preview populated vs. empty states */}
        <div className="mr-1 hidden items-center rounded-lg bg-slate-100 p-1 text-xs font-medium sm:flex">
          <button
            onClick={() => onToggleData(true)}
            className={cn(
              'rounded-md px-2.5 py-1 transition-colors',
              showData ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500',
            )}
          >
            Data
          </button>
          <button
            onClick={() => onToggleData(false)}
            className={cn(
              'rounded-md px-2.5 py-1 transition-colors',
              !showData ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500',
            )}
          >
            Empty
          </button>
        </div>

        <button
          className="grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"
          aria-label="Search"
        >
          <Search className="size-[18px]" aria-hidden="true" />
        </button>
        <button
          className="relative grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="size-[18px]" aria-hidden="true" />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-rose-500" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}

// =============================================================================
// PROFILE SUMMARY (ported from components/dashboard/profile-summary.tsx)
// =============================================================================
function ProfileStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-semibold tabular-nums text-slate-900 sm:text-base">{value}</span>
      <span className="text-xs text-slate-500">{label}</span>
    </div>
  );
}

function ProfileSummary({ profile }: { profile: CreatorProfile }) {
  return (
    <section className="flex flex-wrap items-center gap-x-8 gap-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-rose-600 text-base font-semibold text-white">
          {profile.avatarInitials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-slate-900">{profile.name}</p>
          <p className="truncate text-sm text-slate-500">{profile.handle}</p>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-6 sm:gap-8">
        <ProfileStat label="Followers" value={formatNumber(profile.followers)} />
        <ProfileStat label="Following" value={formatNumber(profile.following)} />
        <ProfileStat label="Likes" value={formatNumber(profile.likes)} />
      </div>
    </section>
  );
}

// =============================================================================
// GROWTH HERO (ported from components/dashboard/growth-hero.tsx)
// =============================================================================
const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function GrowthHero({ total, changePct, spark }: { total: number; changePct: number; spark: number[] }) {
  const best = Math.max(...spark);
  const bestDay = dayLabels[spark.indexOf(best)];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
        <div className="flex flex-col justify-between lg:w-[38%]">
          <div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-rose-600" aria-hidden="true" />
              <h2 className="text-sm font-medium text-slate-500">Follower growth · last 7 days</h2>
            </div>
            <div className="mt-4 flex items-end gap-3">
              <span className="text-5xl font-semibold leading-none tracking-tight text-slate-900 sm:text-6xl">
                +{formatNumber(total)}
              </span>
              <ChangeBadge value={changePct} size="lg" className="mb-1" />
            </div>
            <p className="mt-3 max-w-xs text-pretty text-sm text-slate-500">
              You&apos;re growing faster than last week. {bestDay} was your best day with{' '}
              <span className="font-medium text-slate-900">+{formatNumber(best)}</span> new followers.
            </p>
          </div>
          <a
            href="#"
            className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-rose-600 hover:underline"
          >
            View full growth report
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="flex flex-col lg:flex-1">
          <div className="relative flex-1 rounded-xl bg-gradient-to-b from-rose-600/[0.04] to-transparent p-2">
            <Sparkline
              data={spark}
              width={640}
              height={200}
              showArea
              strokeWidth={2.5}
              className="h-44 w-full sm:h-52"
              strokeClassName="text-rose-600"
              fillClassName="text-rose-600"
            />
          </div>
          <div className="mt-2 flex justify-between px-2 text-xs text-slate-500">
            {dayLabels.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SECONDARY METRICS (ported from components/dashboard/secondary-metrics.tsx)
// =============================================================================
function MetricCard({ metric }: { metric: SecondaryMetric }) {
  const positive = metric.changePct >= 0;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-slate-500">{metric.label}</p>
        <ChangeBadge value={metric.changePct} />
      </div>
      <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-slate-900">
        {formatValue(metric.value, metric.format)}
      </p>
      <Sparkline
        data={metric.spark}
        width={220}
        height={44}
        strokeWidth={2}
        className="mt-3 h-11 w-full"
        strokeClassName={positive ? 'text-emerald-600' : 'text-rose-600'}
      />
    </div>
  );
}

function SecondaryMetrics({ metrics }: { metrics: SecondaryMetric[] }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Key metrics">
      {metrics.map((m) => (
        <MetricCard key={m.key} metric={m} />
      ))}
    </section>
  );
}

// =============================================================================
// AI INSIGHTS (ported from components/dashboard/ai-insights.tsx)
// =============================================================================
function AiInsights({ insights }: { insights: Insight[] }) {
  return (
    <section
      className="rounded-2xl border border-rose-600/15 bg-rose-50 p-6 shadow-sm"
      aria-labelledby="ai-insights-heading"
    >
      <div className="flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-rose-600/10 text-rose-600">
          <Sparkles className="size-[18px]" aria-hidden="true" />
        </div>
        <div>
          <h2 id="ai-insights-heading" className="text-sm font-semibold text-slate-900">
            AI Insights
          </h2>
          <p className="text-xs text-slate-500">Personalized for your channel</p>
        </div>
      </div>

      <ul className="mt-5 flex flex-col gap-3">
        {insights.map((insight) => (
          <li
            key={insight.id}
            className="group rounded-xl border border-slate-200/60 bg-white/70 p-4 transition-colors hover:border-rose-600/30"
          >
            <p className="text-pretty text-sm font-medium leading-snug text-slate-900">{insight.headline}</p>
            <p className="mt-1 text-pretty text-xs leading-relaxed text-slate-500">{insight.detail}</p>
            <a
              href="#"
              className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:underline"
            >
              View details
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

// =============================================================================
// TIMELINE CHART (ported from components/dashboard/timeline-chart.tsx)
// =============================================================================
const CHART_W = 800;
const CHART_H = 300;
const CHART_PAD = { top: 24, right: 24, bottom: 36, left: 56 };

function TimelineChart({ timeline }: { timeline: TimelinePoint[] }) {
  const [metric, setMetric] = useState<MetricKey>('views');
  const [hover, setHover] = useState<number | null>(null);

  const meta = metricSeriesMeta.find((m) => m.key === metric)!;
  const values = timeline.map((p) => p.values[metric]);

  const { linePath, areaPath, points, ticks } = useMemo(() => {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const lo = Math.max(0, min - (max - min) * 0.15);
    const hi = max + (max - min) * 0.15 || max * 1.1 || 1;
    const range = hi - lo || 1;

    const innerW = CHART_W - CHART_PAD.left - CHART_PAD.right;
    const innerH = CHART_H - CHART_PAD.top - CHART_PAD.bottom;
    const stepX = values.length > 1 ? innerW / (values.length - 1) : 0;

    const points = values.map((v, i) => {
      const x = CHART_PAD.left + i * stepX;
      const y = CHART_PAD.top + (1 - (v - lo) / range) * innerH;
      return { x, y, v };
    });

    const linePath = points
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
      .join(' ');
    const areaPath = `${linePath} L${points[points.length - 1].x.toFixed(2)},${CHART_H - CHART_PAD.bottom} L${points[0].x.toFixed(2)},${CHART_H - CHART_PAD.bottom} Z`;

    const ticks = Array.from({ length: 4 }, (_, i) => {
      const t = lo + (range * i) / 3;
      const y = CHART_PAD.top + (1 - (t - lo) / range) * innerH;
      return { y, value: t };
    });

    return { linePath, areaPath, points, ticks, min: lo, max: hi };
  }, [values]);

  function handleMove(e: React.PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * CHART_W;
    const innerW = CHART_W - CHART_PAD.left - CHART_PAD.right;
    const stepX = values.length > 1 ? innerW / (values.length - 1) : 1;
    const idx = Math.round((x - CHART_PAD.left) / stepX);
    setHover(Math.min(values.length - 1, Math.max(0, idx)));
  }

  const active = hover ?? points.length - 1;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-label="Performance timeline">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Performance over time</h2>
          <p className="text-sm text-slate-500">Last 4 weeks · {meta.label.toLowerCase()}</p>
        </div>
        <div role="tablist" aria-label="Select metric" className="flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1">
          {metricSeriesMeta.map((m) => (
            <button
              key={m.key}
              role="tab"
              aria-selected={metric === m.key}
              onClick={() => setMetric(m.key)}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                metric === m.key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900',
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <svg
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          className="h-64 w-full touch-none sm:h-72"
          onPointerMove={handleMove}
          onPointerLeave={() => setHover(null)}
          role="img"
          aria-label={`${meta.label} timeline chart`}
        >
          <defs>
            <linearGradient id="timelineFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>

          {ticks.map((t, i) => (
            <g key={i}>
              <line
                x1={CHART_PAD.left}
                x2={CHART_W - CHART_PAD.right}
                y1={t.y}
                y2={t.y}
                className="text-slate-200"
                stroke="currentColor"
                strokeDasharray="3 4"
                strokeWidth={1}
              />
              <text x={CHART_PAD.left - 10} y={t.y + 4} textAnchor="end" className="fill-slate-500 text-[11px]">
                {formatValue(t.value, meta.format)}
              </text>
            </g>
          ))}

          <path d={areaPath} className="text-rose-600" fill="url(#timelineFill)" stroke="none" />
          <path
            d={linePath}
            fill="none"
            className="text-rose-600"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {timeline.map((p, i) => (
            <text
              key={p.label}
              x={points[i].x}
              y={CHART_H - CHART_PAD.bottom + 20}
              textAnchor="middle"
              className="fill-slate-500 text-[11px]"
            >
              {p.label}
            </text>
          ))}

          {/* hover guide */}
          <line
            x1={points[active].x}
            x2={points[active].x}
            y1={CHART_PAD.top}
            y2={CHART_H - CHART_PAD.bottom}
            className="text-slate-200"
            stroke="currentColor"
            strokeWidth={1}
          />
          <circle
            cx={points[active].x}
            cy={points[active].y}
            r={5}
            className="text-rose-600"
            fill="currentColor"
            stroke="white"
            strokeWidth={2}
          />
        </svg>

        <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-3 text-sm">
          <span className="text-slate-500">{timeline[active].label}</span>
          <span className="font-semibold tabular-nums text-slate-900">{formatValue(values[active], meta.format)}</span>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// EMPTY STATE (ported from components/dashboard/empty-state.tsx — original
// referenced a Next.js public/ image asset, replaced with a lucide icon since
// that asset doesn't exist in this project)
// =============================================================================
function EmptyState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-rose-50 text-rose-600">
        <TrendingUp className="size-10" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-semibold text-slate-900">No growth data yet</h2>
      <p className="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-slate-500">
        Post your first video to start tracking growth. Your followers, views, and AI insights will appear here.
      </p>
      <button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
        <Plus className="size-4" aria-hidden="true" />
        Upload a video
      </button>
    </div>
  );
}

// =============================================================================
// DASHBOARD SHELL (ported from components/dashboard/dashboard-shell.tsx)
// =============================================================================
function CreatorAnalyticsDashboard() {
  const [navOpen, setNavOpen] = useState(false);
  const [showData, setShowData] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <div className="hidden w-64 shrink-0 lg:block">
        <div className="fixed inset-y-0 w-64">
          <DashboardSidebar />
        </div>
      </div>

      {/* Mobile drawer */}
      {navOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setNavOpen(false)} aria-hidden="true" />
          <div className="absolute inset-y-0 left-0 w-64 shadow-xl">
            <button
              onClick={() => setNavOpen(false)}
              className="absolute right-3 top-4 z-10 grid size-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-800"
              aria-label="Close navigation"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
            <DashboardSidebar />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopBar onOpenNav={() => setNavOpen(true)} showData={showData} onToggleData={setShowData} />

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex flex-col gap-6">
            <ProfileSummary profile={profile} />

            {showData ? (
              <>
                <GrowthHero total={followerGrowthTotal} changePct={followerGrowthChangePct} spark={followerGrowth7d} />

                <SecondaryMetrics metrics={secondaryMetrics} />

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                  <div className="xl:col-span-1">
                    <AiInsights insights={insights} />
                  </div>
                  <div className="xl:col-span-2">
                    <TimelineChart timeline={timeline} />
                  </div>
                </div>
              </>
            ) : (
              <EmptyState />
            )}
          </div>
        </main>
      </div>
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
export default function CaseStudyTikTokDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <article className="max-w-4xl mx-auto px-6 pt-16 pb-16">
        {/* TODO: eyebrow line — role / timeline, matches the format in MedicationReconciliation.tsx */}

        {/* TODO: replace with the real case study title */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
          Creator Growth Analytics Dashboard
        </h1>

        {/* TODO: role / context / timeline / tools meta grid (see MedicationReconciliation.tsx) */}

        {/* TODO: Problem space section */}

        {/* TODO: Key design decisions section(s) */}

        <div className="rounded-xl border border-rose-100 bg-rose-50 p-6 flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <p className="text-sm font-bold text-slate-900">Try the dashboard</p>
            <p className="text-xs text-slate-500 mt-1">
              Toggle between populated and empty states, switch metrics, and hover the timeline.
            </p>
          </div>
          <a
            href="#sandbox"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg text-xs transition-all shadow"
          >
            <span>Try it</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </article>

      <section id="sandbox" className="border-t border-slate-200">
        <CreatorAnalyticsDashboard />
      </section>

      {/* TODO: Outcomes / closing section (optional) */}
    </div>
  );
}
