import SectionIntro from "./SectionIntro";

export default function OpportunitySection() {
  return (
    <section className="pt-28">
      <div className="rounded-[36px] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(243,250,246,0.92))] p-8 shadow-[0_22px_60px_rgba(0,0,0,0.05)] backdrop-blur-md md:p-10 lg:p-12 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(17,26,41,0.95),rgba(12,22,34,0.95))]">
        <SectionIntro
          eyebrow="Opportunity"
          title="Existing products either focus on delivery or basic list storage — not a smarter in-store companion"
          description="The gap is not another catalog-heavy grocery app. The gap is a calm, fast, reminder-first experience that supports the actual shopping moment while adding lightweight intelligence only where it helps."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[28px] border border-black/10 bg-white/72 p-6 dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/42 dark:text-white/42">
              What many apps do now
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-black/62 dark:text-white/62">
              <li>• Prioritize delivery inventory and product browsing</li>
              <li>• Offer basic checklist behavior with limited guidance</li>
              <li>• Depend on visuals and product-heavy layouts</li>
            </ul>
          </div>

          <div className="rounded-[28px] border border-emerald-500/20 bg-emerald-500/8 p-6 dark:bg-emerald-500/10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
              What this concept focuses on
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-black/70 dark:text-white/70">
              <li>• Fast name-based item search</li>
              <li>• A personal saved area called “Your Space”</li>
              <li>• In-store progress and item check-off</li>
              <li>• AI suggestions for adjacent or repeat items</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}