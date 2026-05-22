import { useEffect, useMemo, useState } from "react";

type NavItem = {
  label: string;
  id: string;
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "About", id: "about" },
      { label: "Motion", id: "interactions" },
      { label: "Case Studies", id: "case-studies" },
      { label: "Contact Me", id: "resume" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 140;
      let currentSection: string | null = null;

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (!el) continue;

        const top = el.offsetTop;
        const height = el.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          currentSection = item.id;
          break;
        }

        if (scrollPosition >= top) {
          currentSection = item.id;
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 90;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

    setActiveSection(id);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveSection(null);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-6 pt-6 md:px-10 xl:px-16">
      <div
        className={`flex w-full items-center justify-between border-b border-[#d8e6ef] pb-4 transition-all duration-300 ${
          scrolled ? "bg-[#f7fbff]/82 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <button
          onClick={scrollToTop}
          className="text-left"
          aria-label="Go to top"
        >
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#8a90a3]">
            Portfolio
          </p>
          <p className="mt-1 text-sm font-medium text-[#2f3341]">
            Bhavyasri Mudireddy
          </p>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group relative pb-2 text-[12px] uppercase tracking-[0.14em] transition ${
                  isActive
                    ? "text-[#8b84ad]"
                    : "text-[#666f84] hover:text-[#2f3341]"
                }`}
              >
                {item.label}

                <span
                  className={`absolute bottom-0 left-1/2 h-[1.5px] -translate-x-1/2 rounded-full bg-[#8b84ad] transition-all duration-300 ${
                    isActive
                      ? "w-6 opacity-100"
                      : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        <button
          onClick={() => scrollToSection("resume")}
          className="rounded-full border border-[#c4c5e6] bg-white/80 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#6f7694] transition duration-300 hover:bg-[#f7f9ff] md:hidden"
        >
          Contact
        </button>
      </div>
    </header>
  );
}