type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionIntroProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-black/40 dark:text-white/40">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl dark:text-white/95">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-8 text-black/58 dark:text-white/60">
          {description}
        </p>
      )}
    </div>
  );
}