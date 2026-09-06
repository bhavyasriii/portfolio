import React, { useId, useMemo, useState } from 'react';
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
  X,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  ChevronRight,
  Info,
} from 'lucide-react';

// =============================================================================
// TYPES & DATA
// =============================================================================
type MetricKey = 'views' | 'followers' | 'engagement' | 'rewards';

type LanguageBreakdown = {
  language: string;
  percentage: number;
  color: string;
};

type TimelinePoint = {
  label: string;
  values: Record<MetricKey, number>;
  breakdown: Record<string, number>;
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
  breakdown: { label: string; value: string; pct: number }[];
};

type Insight = {
  id: string;
  headline: string;
  detail: string;
  actionText: string;
  category: string;
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

const activeLanguages: LanguageBreakdown[] = [
  { language: 'Spanish (LATAM)', percentage: 42, color: '#e11d48' },
  { language: 'Hindi (India)', percentage: 31, color: '#f59e0b' },
  { language: 'German (EU)', percentage: 18, color: '#3b82f6' },
  { language: 'English (Original)', percentage: 9, color: '#64748b' },
];

const secondaryMetrics: SecondaryMetric[] = [
  {
    key: 'profile-views',
    label: 'Multi-language audio views',
    value: 52840,
    format: 'count',
    changePct: 12.3,
    spark: [6100, 6400, 5900, 7200, 7800, 8100, 9340],
    breakdown: [
      { label: 'Spanish (LATAM)', value: '28.4K', pct: 54 },
      { label: 'German (EU)', value: '14.2K', pct: 27 },
      { label: 'Portuguese (BR)', value: '10.2K', pct: 19 },
    ],
  },
  {
    key: 'video-views',
    label: 'Translated caption views',
    value: 1284000,
    format: 'count',
    changePct: 27.6,
    spark: [140000, 155000, 132000, 190000, 205000, 231000, 271000],
    breakdown: [
      { label: 'Hindi (IN)', value: '642K', pct: 50 },
      { label: 'Spanish (ES/MX)', value: '385K', pct: 30 },
      { label: 'Japanese (JP)', value: '207K', pct: 20 },
    ],
  },
  {
    key: 'engagement-rate',
    label: 'Cross-regional engagement rate',
    value: 9.4,
    format: 'percent',
    changePct: -2.1,
    spark: [10.2, 10.0, 9.9, 9.6, 9.5, 9.3, 9.4],
    breakdown: [
      { label: 'Mexico', value: '11.8%', pct: 40 },
      { label: 'India', value: '10.2%', pct: 35 },
      { label: 'Germany', value: '6.2%', pct: 25 },
    ],
  },
];

const insights: Insight[] = [
  {
    id: 'latam-audio',
    headline: 'Spanish audio gets 40% more shares in Mexico',
    detail: 'Your LATAM audience shares dubbed Spanish uploads far more than caption-only ones. Add a Spanish audio track to your next 3 uploads.',
    actionText: 'Auto-Dub Next Video',
    category: 'Audio Track',
  },
  {
    id: 'india-captions',
    headline: 'Hindi captions retain 2x more viewers in India',
    detail: 'Your top 5 videos in India this week all had Hindi captions from the first frame. Have captions ready before you publish, not added after.',
    actionText: 'Generate Hindi Subtitles',
    category: 'Captions',
  },
  {
    id: 'de-search',
    headline: '3 trending German searches match your last tutorial',
    detail: 'Localized titles and descriptions in German could capture this demand before it peaks.',
    actionText: 'Translate Metadata',
    category: 'SEO & Metadata',
  },
];

const metricSeriesMeta: MetricSeriesMeta[] = [
  { key: 'views', label: 'Views', format: 'count' },
  { key: 'followers', label: 'Followers', format: 'count' },
  { key: 'engagement', label: 'Engagement', format: 'percent' },
  { key: 'rewards', label: 'Rewards', format: 'currency' },
];

const timeline: TimelinePoint[] = [
  { label: 'Feb 1', values: { views: 142000, followers: 3120, engagement: 8.1, rewards: 210 }, breakdown: { Spanish: 40, Hindi: 30, German: 20, English: 10 } },
  { label: 'Feb 5', values: { views: 168000, followers: 3480, engagement: 8.6, rewards: 245 }, breakdown: { Spanish: 42, Hindi: 29, German: 19, English: 10 } },
  { label: 'Feb 9', values: { views: 151000, followers: 3010, engagement: 8.3, rewards: 232 }, breakdown: { Spanish: 41, Hindi: 31, German: 18, English: 10 } },
  { label: 'Feb 13', values: { views: 203000, followers: 4260, engagement: 9.0, rewards: 318 }, breakdown: { Spanish: 44, Hindi: 32, German: 15, English: 9 } },
  { label: 'Feb 17', values: { views: 246000, followers: 5100, engagement: 9.2, rewards: 402 }, breakdown: { Spanish: 43, Hindi: 33, German: 16, English: 8 } },
  { label: 'Feb 21', values: { views: 271000, followers: 4820, engagement: 9.1, rewards: 465 }, breakdown: { Spanish: 45, Hindi: 30, German: 17, English: 8 } },
  { label: 'Feb 25', values: { views: 318000, followers: 6340, engagement: 9.4, rewards: 548 }, breakdown: { Spanish: 42, Hindi: 31, German: 18, English: 9 } },
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

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

// =============================================================================
// SPARKLINE
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
// CHANGE BADGE
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
        'inline-flex items-center gap-1 rounded-full font-semibold tabular-nums shrink-0',
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
// SIDEBAR
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
    <aside className="flex h-full w-full flex-col justify-between bg-slate-900 text-slate-300">
      <div>
        <div className="flex items-center gap-2.5 px-6 py-6">
          <div className="flex size-9 items-center justify-center rounded-xl bg-rose-600 text-white">
            <TrendingUp className="size-5" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">Creator Studio</p>
            <p className="text-xs text-slate-500">Growth analytics</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 px-3" aria-label="Primary">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href="#"
                onClick={(e) => e.preventDefault()}
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
      </div>

      <div className="px-3 pb-6">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
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
// TOP BAR
// -----------------------------------------------------------------------------
// `sticky top-0` here keeps the controls visible while the panel below it
// scrolls internally (see the dashboard shell's `lg:overflow-y-auto`), so
// filters and the Data/Empty toggle are never scrolled out of reach.
// =============================================================================
function DashboardTopBar({
  showData,
  onToggleData,
  selectedRegion,
  onSelectRegion,
  selectedTimeframe,
  onSelectTimeframe,
}: {
  showData: boolean;
  onToggleData: (v: boolean) => void;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  selectedTimeframe: string;
  onSelectTimeframe: (tf: string) => void;
}) {
  return (
    <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
      <div>
        <h1 className="text-lg font-semibold leading-tight text-slate-900">Growth</h1>
        <p className="hidden text-xs text-slate-500 sm:block">How your content performs across languages and regions</p>
      </div>

      <div className="ml-auto flex flex-wrap items-center gap-2">
        <select
          value={selectedRegion}
          onChange={(e) => onSelectRegion(e.target.value)}
          className="h-8 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
        >
          <option value="all">All Regions & Languages</option>
          <option value="latam">LATAM (Spanish)</option>
          <option value="in">India (Hindi)</option>
          <option value="eu">Europe (German)</option>
        </select>

        <select
          value={selectedTimeframe}
          onChange={(e) => onSelectTimeframe(e.target.value)}
          className="h-8 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
        >
          <option value="7d">Last 7 Days</option>
          <option value="28d">Last 28 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>

        <div className="flex items-center rounded-lg bg-slate-100 p-0.5 sm:p-1 text-xs font-medium">
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
// PROFILE SUMMARY
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
// GROWTH HERO
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
              <h2 className="text-sm font-medium text-slate-500">International follower growth · last 7 days</h2>
            </div>
            <div className="mt-4 flex flex-wrap items-end gap-3">
              <span className="text-4xl font-semibold leading-none tracking-tight text-slate-900 sm:text-5xl">
                +{formatNumber(total)}
              </span>
              <ChangeBadge value={changePct} size="lg" className="mb-1" />
            </div>
            <p className="mt-3 max-w-xs text-pretty text-sm text-slate-500">
              You&apos;re growing faster than last week, mostly among Spanish and Hindi-speaking viewers.{' '}
              {bestDay} was your best day with <span className="font-medium text-slate-900">+{formatNumber(best)}</span> new followers.
            </p>

            <div className="mt-5">
              <p className="text-xs font-medium text-slate-500 mb-2">Top Contributing Languages</p>
              <div className="flex h-2 w-full overflow-hidden rounded-full bg-slate-100">
                {activeLanguages.map((lang) => (
                  <div
                    key={lang.language}
                    style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                    title={`${lang.language}: ${lang.percentage}%`}
                  />
                ))}
              </div>
              <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                {activeLanguages.map((lang) => (
                  <div key={lang.language} className="flex items-center gap-1.5 text-slate-600">
                    <span className="size-2 rounded-full" style={{ backgroundColor: lang.color }} aria-hidden="true" />
                    <span>{lang.language}</span>
                    <span className="font-semibold text-slate-900">{lang.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-rose-600 hover:underline"
          >
            View full language performance report
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
// SECONDARY METRICS
// =============================================================================
function MetricCard({ metric, onOpenDetail }: { metric: SecondaryMetric; onOpenDetail: (m: SecondaryMetric) => void }) {
  const positive = metric.changePct >= 0;
  return (
    <div className="flex flex-col justify-between min-h-[180px] rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div>
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-slate-500 leading-snug">{metric.label}</p>
          <ChangeBadge value={metric.changePct} />
        </div>
        <p className="mt-3 text-3xl font-semibold tabular-nums tracking-tight text-slate-900">
          {formatValue(metric.value, metric.format)}
        </p>
      </div>

      <div className="mt-4">
        <Sparkline
          data={metric.spark}
          width={220}
          height={40}
          strokeWidth={2}
          className="h-10 w-full"
          strokeClassName={positive ? 'text-emerald-600' : 'text-rose-600'}
        />

        <button
          onClick={() => onOpenDetail(metric)}
          className="mt-3 flex w-full items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-rose-600 hover:text-rose-700"
        >
          <span>View Language Breakdown</span>
          <ChevronRight className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function SecondaryMetrics({ metrics, onOpenDetail }: { metrics: SecondaryMetric[]; onOpenDetail: (m: SecondaryMetric) => void }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Key metrics">
      {metrics.map((m) => (
        <MetricCard key={m.key} metric={m} onOpenDetail={onOpenDetail} />
      ))}
    </section>
  );
}

// =============================================================================
// METRIC DRILLDOWN MODAL
// =============================================================================
function MetricDetailModal({ metric, onClose }: { metric: SecondaryMetric; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">{metric.label}</h3>
            <p className="text-xs text-slate-500">Language and region breakdown</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-3xl font-bold text-slate-900">{formatValue(metric.value, metric.format)}</span>
          <ChangeBadge value={metric.changePct} />
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Top Performing Audio/Sub Tracks</p>
          {metric.breakdown.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span>{item.label}</span>
                <span className="font-semibold text-slate-900">{item.value} ({item.pct}%)</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-rose-600" style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// AI INSIGHTS
// -----------------------------------------------------------------------------
// No longer forced to `h-full` / `justify-between` — that was fighting the
// timeline chart next to it for equal column height and pushing the chart's
// footer stats down into a big empty gap. Each card now just takes the
// height its own content needs.
// =============================================================================
function AiInsights({ insights }: { insights: Insight[] }) {
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  const toggleApply = (id: string) => {
    if (appliedIds.includes(id)) {
      setAppliedIds(appliedIds.filter((i) => i !== id));
    } else {
      setAppliedIds([...appliedIds, id]);
    }
  };

  return (
    <section
      className="rounded-2xl border border-rose-600/15 bg-rose-50 p-5 sm:p-6 shadow-sm"
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
          <p className="text-xs text-slate-500">Personalized for your channel, by market</p>
        </div>
      </div>

      <ul className="mt-5 flex flex-col gap-3">
        {insights.map((insight) => {
          const isApplied = appliedIds.includes(insight.id);
          return (
            <li
              key={insight.id}
              className="group rounded-xl border border-slate-200/60 bg-white/80 p-4 transition-colors hover:border-rose-600/30"
            >
              <div className="flex items-center justify-between">
                <span className="rounded bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-700">
                  {insight.category}
                </span>
              </div>
              <p className="mt-1.5 text-pretty text-sm font-medium leading-snug text-slate-900">{insight.headline}</p>
              <p className="mt-1 text-pretty text-xs leading-relaxed text-slate-500">{insight.detail}</p>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:underline"
                >
                  View details
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>

                <button
                  onClick={() => toggleApply(insight.id)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all shadow-sm',
                    isApplied
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-600 text-white hover:bg-rose-700',
                  )}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle2 className="size-3.5 shrink-0" />
                      <span>Scheduled</span>
                    </>
                  ) : (
                    <>
                      <Plus className="size-3.5 shrink-0" />
                      <span>{insight.actionText}</span>
                    </>
                  )}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// =============================================================================
// TIMELINE CHART
// -----------------------------------------------------------------------------
// Same fix as AiInsights: dropped `h-full flex flex-col justify-between`, so
// the footer stats row sits directly under the chart instead of being
// stretched to the bottom of a taller sibling column.
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
  const activeBreakdown = timeline[active].breakdown;

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-label="Performance timeline">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">International performance over time</h2>
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

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-3 text-sm">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-900">{timeline[active].label}:</span>
          <span className="font-semibold tabular-nums text-slate-900">{formatValue(values[active], meta.format)}</span>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          {Object.entries(activeBreakdown).map(([lang, pct]) => (
            <span key={lang} className="inline-flex items-center gap-1">
              <span className="font-medium text-slate-700">{lang}:</span> {pct}%
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// EMPTY STATE
// =============================================================================
function EmptyState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-rose-50 text-rose-600">
        <TrendingUp className="size-10" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-semibold text-slate-900">No language performance data yet</h2>
      <p className="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-slate-500">
        Add a multi-language audio track or translated captions to your first video, and your international growth and language insights will appear here.
      </p>
      <button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
        <Plus className="size-4" aria-hidden="true" />
        Upload a video
      </button>
    </div>
  );
}

// =============================================================================
// DASHBOARD SHELL
// -----------------------------------------------------------------------------
// LAYOUT FIX, explained:
// The outer panel now has a fixed height on desktop (`lg:h-[800px]`) instead
// of only a minimum height. The sidebar is a flex child of that fixed-height
// row, so it always spans the full panel and never scrolls out of view.
// The content column gets `lg:min-h-0 lg:overflow-y-auto`: `min-h-0` is the
// part that's easy to miss — without it, a flex child's default min-height
// is "auto," which means it grows to fit its content and drags the whole
// panel down with it, and `overflow-y-auto` never gets a chance to kick in.
// With `min-h-0` set, the column is capped at the panel's height and any
// extra content scrolls inside it instead, while the sidebar stays put.
// On mobile the sidebar is hidden entirely, so no fixed height is forced
// there — the panel just grows with its content as it did before.
// =============================================================================
function CreatorAnalyticsDashboard() {
  const [showData, setShowData] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [activeModalMetric, setActiveModalMetric] = useState<SecondaryMetric | null>(null);

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-xl lg:h-[800px] lg:flex-row">
      {/* Sidebar - stretches to the panel's full height, stays fixed while content scrolls */}
      <div className="hidden lg:block lg:w-56 xl:w-64 lg:shrink-0">
        <DashboardSidebar />
      </div>

      {/* Main Content Area - the only part that scrolls on desktop */}
      <div className="flex min-w-0 flex-1 flex-col lg:min-h-0 lg:overflow-y-auto">
        <DashboardTopBar
          showData={showData}
          onToggleData={setShowData}
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
          selectedTimeframe={selectedTimeframe}
          onSelectTimeframe={setSelectedTimeframe}
        />

        <main className="w-full flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex flex-col gap-6">
            <ProfileSummary profile={profile} />

            {showData ? (
              <>
                <GrowthHero total={followerGrowthTotal} changePct={followerGrowthChangePct} spark={followerGrowth7d} />

                <SecondaryMetrics metrics={secondaryMetrics} onOpenDetail={setActiveModalMetric} />

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
                  <div className="lg:col-span-5 xl:col-span-4">
                    <AiInsights insights={insights} />
                  </div>
                  <div className="lg:col-span-7 xl:col-span-8">
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

      {activeModalMetric && (
        <MetricDetailModal metric={activeModalMetric} onClose={() => setActiveModalMetric(null)} />
      )}
    </div>
  );
}

// =============================================================================
// MAIN CASE STUDY COMPONENT
// =============================================================================
export default function CaseStudyTikTokDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <article className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <p className="text-sm font-semibold text-rose-600 mb-4">Creator Tooling · Localization · 2026</p>

        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
          Creator Growth Analytics Dashboard
        </h1>

        <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl">
          A concept exploring what a creator's growth dashboard looks like once a meaningful share of that
          growth comes from viewers watching in a language other than the one the creator uploads in.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-y border-slate-200 py-6 mb-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Role</p>
            <p className="mt-1 text-sm text-slate-700">Lead interaction designer, self-directed</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Timeline</p>
            <p className="mt-1 text-sm text-slate-700">2026</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Tools</p>
            <p className="mt-1 text-sm text-slate-700">Figma, React, TypeScript, Tailwind, Claude Code</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Team</p>
            <p className="mt-1 text-sm text-slate-700">Solo concept exploration</p>
          </div>
        </div>

        <div className="border-t border-slate-200 py-6">
          <h3 className="text-lg font-bold text-slate-900">The problem space</h3>
          <div className="mt-2 text-slate-600 leading-relaxed">
            <p>
              Most creator analytics tools report views and engagement per video, but stop there. For a creator
              whose audience is increasingly international, the more useful question isn't "how did this video
              do," it's "who watched it, in what language, and what should I do differently before my next
              upload." Language and market data usually live apart from performance data, so the creator has to
              do the connecting work themselves.
            </p>
            <p className="mt-3">
              I kept the dashboard's existing growth-at-a-glance structure and rebuilt what it says: the metrics,
              AI insights, and empty state now speak specifically to multi-language audio, translated captions,
              and cross-regional performance.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 py-6">
          <h3 className="text-lg font-bold text-slate-900">Key design decisions</h3>
          <div className="mt-2 text-slate-600 leading-relaxed">
            <p>
              <span className="font-semibold text-slate-900">Keep the mental model, change what it measures.</span>{' '}
              Creators already understand this layout, so I didn't touch it. The hero number, the three secondary
              metrics, the AI insights panel, and the timeline chart are the same shapes a creator already knows
              how to read; only the content underneath now answers a language-specific question.
            </p>
            <p className="mt-3">
              <span className="font-semibold text-slate-900">Insights that name a language and a market, not just a behavior.</span>{' '}
              Instead of generic tips like "post in the evening," each AI insight ties a specific recommendation to
              a specific audience: Spanish audio for Mexico, Hindi captions for India, German metadata for a
              tutorial series. That specificity is what makes a recommendation actionable before the next upload,
              rather than a general best practice.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-rose-100 bg-rose-50 p-6 flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <p className="text-sm font-bold text-slate-900">Try the dashboard</p>
            <p className="text-xs text-slate-500 mt-1">
              Toggle between populated and empty states, switch metrics, and hover the timeline.
            </p>
          </div>
          <button
            onClick={() => {
              document.getElementById('sandbox')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg text-xs transition-all shadow"
          >
            <span>Try interactive preview</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </article>

      {/* Full Width Sandbox Section */}
      <section id="sandbox" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 border-t border-slate-200">
        <div className="mb-4 flex items-start sm:items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-600 shadow-sm">
          <Info className="size-4 shrink-0 text-rose-600 mt-0.5 sm:mt-0" aria-hidden="true" />
          <p>
            <strong className="font-semibold text-slate-900">Interactive Prototype Note:</strong> Filter dropdowns demonstrate layout controls; toggles demonstrate Data vs. Empty views.
          </p>
        </div>

        <CreatorAnalyticsDashboard />
      </section>

      <article className="max-w-4xl mx-auto px-6 py-16">
        <div className="border-t border-slate-200 py-6">
          <h3 className="text-lg font-bold text-slate-900">Where this stands, honestly</h3>
          <div className="mt-2 text-slate-600 leading-relaxed">
            <p>
              This is a concept I built on my own to think through a specific problem, not a shipped product
              validated with real creators or usage data. The numbers on screen are illustrative. If I were
              taking this further, the language-specific insight model is the piece I'd most want to pressure
              test with actual creators before calling it done.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}