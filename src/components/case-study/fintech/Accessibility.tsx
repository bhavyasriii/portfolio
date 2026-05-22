const checks = [
  "WCAG 2.1 AA contrast validation with zero contrast violations",
  "Readable dark-mode color system for primary, secondary, and accent text",
  "Accessible warning states using both color and labels like “Due Soon”",
  "Clear text labels paired with chart colors to avoid color-only communication",
];

const Accessibility = () => {
  return (
    <section className="w-full bg-[#070B16] px-6 py-24 text-white md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400">
          Accessibility
        </p>

        <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
          Designed to stay premium without sacrificing readability.
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
          Since this experience uses a dark fintech interface, accessibility checks were especially important. The color system was adjusted to preserve the premium visual style while ensuring key text, buttons, alerts, and chart labels remained readable.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {checks.map((item, index) => (
            <div
              key={item}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="mb-3 text-sm font-semibold text-blue-300">
                0{index + 1}
              </p>
              <p className="text-lg leading-relaxed text-slate-100">
                {item}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-[32px] border border-emerald-400/20 bg-emerald-500/10 p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">
            Validation result
          </p>

          <h3 className="mt-4 text-2xl font-semibold text-white md:text-4xl">
            0 contrast violations after final accessibility checks.
          </h3>

          <p className="mt-4 max-w-2xl text-slate-300">
            Gradient-based components were manually reviewed because automated tools can flag them as potential checks. Final colors were adjusted to maintain clarity across text, buttons, labels, and chart content.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Accessibility;