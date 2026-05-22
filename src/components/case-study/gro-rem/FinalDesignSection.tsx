import SectionIntro from "./SectionIntro";
import { FiSearch, FiCheck, FiPlus } from "react-icons/fi";

const searchResults = ["Milk", "Tomatoes", "Garlic", "Kale"];
const savedItems = [
  { name: "Milk", checked: true },
  { name: "Ginger", checked: false },
  { name: "Kale", checked: false },
];
const recommendations = ["Bread", "Oil", "Eggs"];

export default function FinalDesignSection() {
  return (
    <section className="pt-28 pb-20">
      <SectionIntro
        eyebrow="Final Direction"
        title="A calm, minimal interface that prioritizes speed, clarity, and repeated use"
        description="The visual direction is intentionally clean: text-first search, focused cards, readable hierarchy, and minimal decoration. This supports the product goal of getting users from intention to completion without friction."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[36px] border border-black/10 bg-white/86 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] md:p-8 dark:border-white/10 dark:bg-[#111a29]/85">
          <div className="rounded-[28px] border border-black/10 bg-[#f7faf8] p-5 dark:border-white/10 dark:bg-[#0c1522]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-black/85 dark:text-white/88">
                  Hi Bhavya
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-black/40 dark:text-white/40">
                  Search and save groceries
                </p>
              </div>

              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400" />
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black/52 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/52">
              <FiSearch className="text-base" />
              <span>Search for groceries you want to add</span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {searchResults.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <span className="text-sm font-medium text-black/80 dark:text-white/82">
                    {item}
                  </span>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                    <FiPlus className="text-sm" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-[32px] border border-black/10 bg-white/84 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#111a29]/85">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-black/88 dark:text-white/90">
                Your Space
              </h3>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                1 / 3 picked
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {savedItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <span
                    className={`text-sm font-medium ${
                      item.checked
                        ? "text-black/45 line-through dark:text-white/45"
                        : "text-black/80 dark:text-white/82"
                    }`}
                  >
                    {item.name}
                  </span>

                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-full border ${
                      item.checked
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-black/15 text-black/35 dark:border-white/15 dark:text-white/35"
                    }`}
                  >
                    {item.checked ? <FiCheck className="text-sm" /> : null}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/8 to-sky-500/8 p-6 dark:from-emerald-500/10 dark:to-sky-500/10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
              AI recommendations
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {recommendations.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-black/78 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/80"
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="mt-5 text-sm leading-7 text-black/65 dark:text-white/65">
              Recommendations appear as lightweight prompts based on item relationships
              and repeat shopping habits, helping users remember supporting essentials.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}