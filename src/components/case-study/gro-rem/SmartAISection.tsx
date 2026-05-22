import SectionIntro from "./SectionIntro";

export default function SmartAISection() {
  return (
    <section className="pt-28">
      <SectionIntro
        eyebrow="AI Logic"
        title="AI is used to assist the list, not replace the user"
        description="The intelligence in this concept is intentionally lightweight. The user remains in control through manual selection, while the system supports them with useful, believable recommendations based on context and routine."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[28px] border border-black/10 bg-white/84 p-6 shadow-[0_14px_40px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#111a29]/85">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/42 dark:text-white/42">
            Example logic
          </p>

          <div className="mt-5 space-y-4">
            {[
              "User adds Milk",
              "System checks commonly paired or repeated items",
              "Suggestions appear: Eggs, Bread, Cereal",
              "User decides whether to add them",
            ].map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm font-medium text-black/78 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/78"
              >
                {index + 1}. {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/8 to-sky-500/8 p-6 dark:from-emerald-500/10 dark:to-sky-500/10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
            Why this AI direction works
          </p>

          <div className="mt-5 space-y-3">
            {[
              "It avoids unnecessary image generation and storage complexity.",
              "It keeps the UI fast, readable, and easy to trust.",
              "It supports habits and related-item memory rather than taking over the experience.",
              "It feels product-realistic instead of speculative.",
            ].map((point) => (
              <div key={point} className="flex gap-3">
                <span className="mt-[10px] h-2 w-2 rounded-full bg-emerald-500" />
                <p className="text-sm leading-7 text-black/70 dark:text-white/70">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}