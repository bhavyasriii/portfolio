import SectionIntro from "./SectionIntro";

export default function UsersSection() {
  return (
    <section className="pt-28">
      <SectionIntro
        eyebrow="Target Users"
        title="Designed for people who shop regularly, remember items in fragments, and want less friction"
        description="This concept is especially useful for users who do not need another delivery workflow. They need a dependable system for planning, recalling, and completing grocery runs smoothly."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {[
          {
            title: "Busy professionals",
            desc: "Need a fast place to save groceries during the week and check them off quickly in-store.",
          },
          {
            title: "Students and shared households",
            desc: "Want a simple, low-effort list that reduces missed items and unnecessary duplicate purchases.",
          },
          {
            title: "Routine shoppers",
            desc: "Benefit from recurring suggestions and familiar weekly reminders without complex setup.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[24px] border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <h3 className="text-lg font-semibold text-black/88 dark:text-white/90">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-black/58 dark:text-white/58">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}