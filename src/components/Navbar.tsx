import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

type NavItem = { label: string; id: string };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navItems: NavItem[] = useMemo(() => [
    { label: "Work", id: "case-studies" },
    { label: "Concepts", id: "concepts-interactions" },
    { label: "About", id: "about" },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (!isHome) return;
      const scrollPosition = window.scrollY + 140;
      let current: string | null = null;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (scrollPosition >= el.offsetTop) current = item.id;
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems, isHome]);

  const handleNavClick = (id: string) => {
    if (isHome) {
      const el = document.getElementById(id);
      if (!el) return;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
      setActiveSection(id);
    } else {
      navigate(`/#${id}`);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (!el) return;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
      }, 100);
    }
  };

  const handleLogoClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection(null);
    } else {
      navigate("/");
    }
  };

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "14px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(245,243,240,0.7)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "0.5px solid rgba(0,0,0,0.05)" : "none",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <button
        onClick={handleLogoClick}
        style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#bbb", fontFamily: "Inter, sans-serif" }}>Portfolio</div>
        <div style={{ fontSize: 13, fontWeight: 500, color: "#1a1a1a", fontFamily: "Inter, sans-serif", marginTop: 2 }}>Bhavyasri Mudireddy</div>
      </button>

      <nav
        style={{
          display: "flex", alignItems: "center", gap: 2,
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "0.5px solid rgba(255,255,255,0.9)",
          borderRadius: 100,
          padding: "5px 8px",
          boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 11, fontWeight: 500, letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: activeSection === item.id ? "#1a1a1a" : "#999",
              fontFamily: "Inter, sans-serif",
              padding: "6px 16px", borderRadius: 100,
              transition: "color 0.2s, background 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "#1a1a1a";
              e.currentTarget.style.background = "rgba(0,0,0,0.04)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = activeSection === item.id ? "#1a1a1a" : "#999";
              e.currentTarget.style.background = "none";
            }}
          >
            {item.label}
          </button>
        ))}

        <a
          href="/resume.pdf"
          target="_blank" rel="noreferrer"
          style={{
            marginLeft: 4,
            fontSize: 11, fontWeight: 500, letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "Inter, sans-serif",
            padding: "7px 16px", borderRadius: 100,
            background: "#1a1a1a", color: "#fff",
            textDecoration: "none",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#333")}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#1a1a1a")}
        >
          Resume ↗
        </a>
      </nav>
    </header>
  );
}
