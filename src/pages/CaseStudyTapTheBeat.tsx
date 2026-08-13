import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Heart, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';

// =============================================================================
// BEAT CLOCK (ported from hooks/use-beat.ts — logic kept exactly as-is)
// =============================================================================
function useBeat(bpm: number | null) {
  const [phase, setPhase] = useState(0);
  const [beatIndex, setBeatIndex] = useState(0);
  const startRef = useRef<number>(0);
  const lastBeat = useRef<number>(-1);

  useEffect(() => {
    if (!bpm) {
      setPhase(0);
      return;
    }
    const interval = 60000 / bpm;
    startRef.current = performance.now();
    lastBeat.current = -1;
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const beats = elapsed / interval;
      const whole = Math.floor(beats);
      setPhase(beats - whole);
      if (whole !== lastBeat.current) {
        lastBeat.current = whole;
        setBeatIndex(whole);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [bpm]);

  return { phase, beatIndex, active: !!bpm };
}

/** Sharp attack, smooth decay envelope for a beat pulse. */
function envelope(phase: number, attack = 0.12) {
  if (phase < attack) return phase / attack;
  const t = (phase - attack) / (1 - attack);
  return Math.pow(1 - t, 2.2);
}

// =============================================================================
// CLICK SOUND (ported from hooks/use-click-sound.ts — tiny synthesized blip
// via the Web Audio API, no audio files. AudioContext is created lazily on
// first user gesture.)
// =============================================================================
function useClickSound(muted: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);

  const ensureCtx = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!ctxRef.current) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctxRef.current = new Ctor();
    }
    const ctx = ctxRef.current;
    if (ctx.state === 'suspended') void ctx.resume().catch(() => {});
    return ctx;
  }, []);

  const blip = useCallback(
    (freq = 880, gain = 0.14, duration = 0.06) => {
      if (muted) return;
      const ctx = ensureCtx();
      if (!ctx) return;
      const t = ctx.currentTime + 0.001;
      const osc = ctx.createOscillator();
      const amp = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      amp.gain.setValueAtTime(0.0001, t);
      amp.gain.exponentialRampToValueAtTime(gain, t + 0.005);
      amp.gain.exponentialRampToValueAtTime(0.0001, t + duration);
      osc.connect(amp);
      amp.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + duration + 0.02);
    },
    [ensureCtx, muted],
  );

  return { blip, ensureCtx };
}

// =============================================================================
// WAVEFORM (ported from components/beat/Waveform.tsx)
// =============================================================================
const WAVEFORM_BARS = 32;

function Waveform({
  phase,
  beatIndex,
  active,
}: {
  phase: number;
  beatIndex: number;
  active: boolean;
}) {
  const env = envelope(phase);
  return (
    <div className="flex h-32 items-end justify-center gap-1 sm:gap-1.5">
      {Array.from({ length: WAVEFORM_BARS }).map((_, i) => {
        const center = Math.abs(i - (WAVEFORM_BARS - 1) / 2) / ((WAVEFORM_BARS - 1) / 2);
        const seed = Math.sin((i + 1) * 12.9898 + beatIndex * 4.233) * 0.5 + 0.5;
        const base = 8 + (1 - center) * 14;
        const height = active ? base + env * (18 + seed * 78) * (1 - center * 0.6) : base;
        return (
          <div
            key={i}
            className="w-1.5 rounded-full sm:w-2"
            style={{
              height: `${height}%`,
              background: active
                ? `color-mix(in oklab, var(--primary) ${35 + env * 65}%, var(--muted))`
                : 'var(--muted)',
              transition: active ? 'none' : 'height 300ms ease-out',
            }}
          />
        );
      })}
    </div>
  );
}

// =============================================================================
// UI PLAYGROUND (ported from components/beat/Playground.tsx)
// =============================================================================
function Tile({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
      <div className="flex min-h-24 w-full items-center justify-center">{children}</div>
      <p className="text-center text-xs tracking-wide text-[var(--muted-foreground)] uppercase">{label}</p>
    </div>
  );
}

function Playground({
  phase,
  beatIndex,
  active,
}: {
  phase: number;
  beatIndex: number;
  active: boolean;
}) {
  const env = active ? envelope(phase) : 0;
  const progress = active ? ((beatIndex % 8) + phase) / 8 : 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Like heart */}
      <Tile label="Like — on-beat pulse">
        <Heart
          className="h-12 w-12"
          style={{
            color: active ? 'var(--primary)' : 'var(--muted-foreground)',
            fill: active ? 'var(--primary)' : 'transparent',
            opacity: 0.55 + env * 0.45,
            transform: `scale(${1 + env * 0.28})`,
          }}
        />
      </Tile>

      {/* Card scale */}
      <Tile label="Card — beat-synced scale">
        <div
          className="flex h-20 w-full flex-col justify-center gap-2 rounded-xl border bg-[var(--secondary)] px-4"
          style={{
            transform: `scale(${1 + env * 0.05})`,
            borderColor: active
              ? `color-mix(in oklab, var(--primary) ${20 + env * 70}%, var(--border))`
              : 'var(--border)',
          }}
        >
          <div className="h-2 w-2/3 rounded-full bg-[var(--muted-foreground)]/40" />
          <div className="h-2 w-1/3 rounded-full bg-[var(--muted-foreground)]/25" />
        </div>
      </Tile>

      {/* Progress */}
      <Tile label="Progress — 8-beat loop">
        <div className="w-full">
          <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--secondary)]">
            <div
              className="h-full rounded-full bg-[var(--primary)]"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <p className="mt-3 font-mono text-xs text-[var(--muted-foreground)]">
            beat {active ? (beatIndex % 8) + 1 : 0} / 8
          </p>
        </div>
      </Tile>

      {/* Glow button */}
      <Tile label="Button — glow on downbeat">
        <button
          type="button"
          className="rounded-full border px-6 py-3 text-sm font-semibold"
          style={{
            borderColor: active
              ? `color-mix(in oklab, var(--primary) ${30 + env * 70}%, var(--border))`
              : 'var(--border)',
            color: active ? 'var(--primary)' : 'var(--muted-foreground)',
            boxShadow: active
              ? `0 0 ${8 + env * 34}px -4px color-mix(in oklab, var(--primary) ${env * 90}%, transparent)`
              : 'none',
          }}
        >
          Play track
        </button>
      </Tile>
    </div>
  );
}

// =============================================================================
// SANDBOX SHELL (ported from routes/index.tsx — TanStack route wrapper and
// page <head> metadata removed since this is embedded in a React Router page,
// not a standalone route)
// =============================================================================
const PRESETS = [
  { label: 'Chill', bpm: 80 },
  { label: 'Pop', bpm: 120 },
  { label: 'Hype', bpm: 160 },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-5 text-xs font-semibold tracking-[0.25em] text-[var(--muted-foreground)] uppercase">
      {children}
    </h2>
  );
}

function TapTheBeatSandbox() {
  const [bpm, setBpm] = useState<number | null>(null);
  const [tapCount, setTapCount] = useState(0);
  const [muted, setMuted] = useState(false);
  const taps = useRef<number[]>([]);
  const { phase, beatIndex, active } = useBeat(bpm);
  const env = active ? envelope(phase) : 0;
  const { blip, ensureCtx } = useClickSound(muted);

  // On-beat tone: low accent on the downbeat of each 4-beat bar.
  useEffect(() => {
    if (!active) return;
    blip(beatIndex % 4 === 0 ? 660 : 440, beatIndex % 4 === 0 ? 0.16 : 0.08, 0.05);
  }, [beatIndex, active, blip]);

  const tap = useCallback(() => {
    ensureCtx();
    blip(1040, 0.18, 0.045);
    const now = performance.now();
    const list = taps.current;
    const last = list[list.length - 1];
    if (last !== undefined && now - last > 2200) list.length = 0;
    list.push(now);
    if (list.length > 8) list.shift();
    setTapCount(list.length);
    if (list.length >= 3) {
      const gaps = list.slice(1).map((t, i) => t - (list[i] as number));

      const avg = gaps.reduce((a, b) => a + b, 0) / gaps.length;
      setBpm(Math.max(40, Math.min(220, Math.round(60000 / avg))));
    }
  }, [blip, ensureCtx]);

  const setPreset = (v: number) => {
    ensureCtx();
    taps.current = [];
    setTapCount(0);
    setBpm(v);
  };

  const reset = () => {
    taps.current = [];
    setTapCount(0);
    setBpm(null);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-14 text-[var(--foreground)] sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-20">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Tap the Beat</h1>
            <p className="mt-2 text-base text-[var(--muted-foreground)]">
              Interface motion, synced to rhythm
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => {
                ensureCtx();
                setMuted((m) => !m);
              }}
              aria-label={muted ? 'Unmute beat sound' : 'Mute beat sound'}
              aria-pressed={!muted}
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--border)] transition-colors hover:text-[var(--foreground)]"
              style={{ color: muted ? 'var(--muted-foreground)' : 'var(--primary)' }}
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <button
              onClick={reset}
              className="rounded-full border border-[var(--border)] px-4 py-2 text-xs tracking-wide text-[var(--muted-foreground)] uppercase transition-colors hover:text-[var(--foreground)]"
            >
              Reset
            </button>
          </div>
        </header>

        {/* Tempo */}
        <section className="flex flex-col items-center gap-10">
          <button
            onClick={tap}
            className="relative grid h-52 w-52 place-items-center rounded-full border border-[var(--border)] bg-[var(--card)] transition-transform active:scale-95 sm:h-60 sm:w-60"
            style={{
              boxShadow: active
                ? `0 0 ${20 + env * 70}px -10px color-mix(in oklab, var(--primary) ${30 + env * 70}%, transparent)`
                : 'none',
              borderColor: active
                ? `color-mix(in oklab, var(--primary) ${20 + env * 60}%, var(--border))`
                : 'var(--border)',
              transform: `scale(${1 + env * 0.03})`,
            }}
          >
            <span className="flex flex-col items-center">
              {bpm ? (
                <>
                  <span
                    className="font-mono text-6xl font-bold tabular-nums"
                    style={{ color: 'var(--primary)' }}
                  >
                    {bpm}
                  </span>
                  <span className="mt-1 text-xs tracking-[0.3em] text-[var(--muted-foreground)] uppercase">
                    BPM
                  </span>
                </>
              ) : (
                <>
                  <span className="text-2xl font-semibold">TAP</span>
                  <span className="mt-2 text-xs tracking-wide text-[var(--muted-foreground)]">
                    {tapCount > 0 ? `${3 - tapCount} more tap${3 - tapCount === 1 ? '' : 's'}` : 'click to set tempo'}
                  </span>
                </>
              )}
            </span>
          </button>

          <div className="flex flex-wrap justify-center gap-3">
            {PRESETS.map((p) => (
              <button
                key={p.bpm}
                onClick={() => setPreset(p.bpm)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                  bpm === p.bpm
                    ? 'border-[var(--primary)] text-[var(--primary)]'
                    : 'border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                }`}
              >
                {p.label} ({p.bpm} BPM)
              </button>
            ))}
          </div>
        </section>

        {/* Waveform */}
        <section>
          <SectionLabel>Waveform</SectionLabel>
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-10">
            <Waveform phase={phase} beatIndex={beatIndex} active={active} />
          </div>
        </section>

        {/* Playground */}
        <section>
          <SectionLabel>UI Playground</SectionLabel>
          <Playground phase={phase} beatIndex={beatIndex} active={active} />
        </section>

        {/* Why */}
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-10">
          <SectionLabel>Why this matters</SectionLabel>
          <p className="max-w-3xl text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
            Most interface motion is authored against a fixed duration and easing curve: 200ms
            ease-out, forever, regardless of context. Rhythm-driven motion instead treats tempo as
            the shared clock every element subscribes to, so a heart, a card, and a progress bar
            resolve on the same downbeat rather than drifting independently. The result reads as
            one coordinated system instead of a pile of unrelated transitions — and the pacing can
            adapt to the energy of the moment, speeding up for dense, high-signal flows and slowing
            down when the user needs room to think.
          </p>
        </section>

        <footer className="pb-6 text-xs text-[var(--muted-foreground)]">
          Beat clock driven by requestAnimationFrame — no animation library.
        </footer>
      </div>
    </main>
  );
}

// =============================================================================
// MAIN CASE STUDY COMPONENT
// TODO: this wrapper is intentionally minimal — narrative copy (problem
// statement, design rationale, outcomes) still needs to be written. See
// src/pages/MedicationReconciliation.tsx for the structure/tone this
// portfolio's other case studies follow.
// =============================================================================
export default function CaseStudyTapTheBeat() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <article className="max-w-4xl mx-auto px-6 pt-16 pb-16">
        {/* TODO: eyebrow line — role / timeline, matches the format in MedicationReconciliation.tsx */}

        {/* TODO: replace with the real case study title */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
          Tap the Beat
        </h1>

        {/* TODO: role / context / timeline / tools meta grid (see MedicationReconciliation.tsx) */}

        {/* TODO: Problem space section */}

        {/* TODO: Key design decisions section(s) */}

        <div className="rounded-xl border border-fuchsia-100 bg-fuchsia-50 p-6 flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <p className="text-sm font-bold text-slate-900">Try the playground</p>
            <p className="text-xs text-slate-500 mt-1">
              Tap a tempo (or pick a preset), then watch the waveform and UI tiles lock to the beat.
            </p>
          </div>
          <a
            href="#sandbox"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold rounded-lg text-xs transition-all shadow"
          >
            <span>Try it</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </article>

      <section id="sandbox" className="border-t border-slate-200">
        <style>{`
          .tap-the-beat-scope {
            --background: oklch(0.16 0.012 285);
            --foreground: oklch(0.97 0.005 285);
            --card: oklch(0.205 0.014 285);
            --primary: oklch(0.7 0.28 350);
            --primary-foreground: oklch(0.15 0.02 350);
            --secondary: oklch(0.26 0.015 285);
            --muted: oklch(0.26 0.015 285);
            --muted-foreground: oklch(0.68 0.012 285);
            --border: oklch(0.28 0.014 285);
          }
        `}</style>
        <div className="tap-the-beat-scope">
          <TapTheBeatSandbox />
        </div>
      </section>

      {/* TODO: Outcomes / closing section (optional) */}
    </div>
  );
}
