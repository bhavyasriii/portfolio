import SectionIntro from "./SectionIntro";

export default function SolutionSection() {
  return (
    <section className="pt-28">
      <SectionIntro
        eyebrow="Solution"
        title="A text-first grocery reminder system with a personal list space and a supportive AI layer"
        description="The final direction combines a reliable core experience with lightweight intelligence. Users stay in control through name-based search and manual list building, while the system adds value through contextual recommendations and habit-aware prompts."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {[
          {
            title: "Core experience",
            points: [
              "Search grocery items by name",
              "Add selected items instantly",
              "Keep all saved items in one personal space",
              "Check items while shopping in-store",
            ],
          },
          {
            title: "Smart layer",
            points: [
              "Suggest related items like milk → eggs",
              "Bring back frequently bought items",
              "Support recurring shopping habits",
              "Reduce forgotten supporting essentials",
            ],
          },
        ].map((group) => (
          <div
            key={group.title}
            className="rounded-[28px] border border-black/10 bg-white/84 p-6 shadow-[0_14px_40px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#111a29]/85"
          >
            <h3 className="text-xl font-semibold text-black/88 dark:text-white/90">
              {group.title}
            </h3>

            <div className="mt-5 space-y-3">
              {group.points.map((point) => (
                <div key={point} className="flex gap-3">
                  <span className="mt-[10px] h-2 w-2 rounded-full bg-emerald-500" />
                  <p className="text-sm leading-7 text-black/60 dark:text-white/60">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}