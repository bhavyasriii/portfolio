import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import profile from "../assets/profile-cutout.png";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
  type Variants,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import {
  FiArrowRight,
  FiDownload,
  FiMail,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
} from "react-icons/fi";

import airpodsMotion from "../assets/motion/airpods-motion.mp4";
import aiOutfitMotion from "../assets/motion/AI_Outfit.mp4";
import hotelMotion from "../assets/motion/hotel-motion.mp4";
import coverHealthcare from "../assets/images/cover-healthcare.png";
import spotifyMotion from "../assets/motion/spotify-motion.mp4";

const RESUME_URL = "https://drive.google.com/file/d/1bzvDUR8B3nVfuUe_ViciH6ouNgumsJ8A/view";

type CaseStudy = {
  id: string; title: string; category: string;
  summary: string; image: string; route?: string; year: string;
};
type InteractionStudy = {
  id: string; title: string; category: string;
  summary: string; videoSrc: string; format: "desktop" | "mobile";
};

/* ─────────────────────────────────────────
   RESPONSIVE HOOK
───────────────────────────────────────── */
function useBreakpoint() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, []);
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    width,
  };
}

/* ─────────────────────────────────────────
   LOAD BAR
───────────────────────────────────────── */
function LoadBar() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 1200); return () => clearTimeout(t); }, []);
  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div style={{ position: "fixed", top: 0, left: 0, height: 2, background: "linear-gradient(90deg, transparent, #c9a96e, transparent)", zIndex: 10000, boxShadow: "0 0 20px rgba(201,169,110,0.6)" }}
          initial={{ width: "0%", opacity: 1 }} animate={{ width: "100%", opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2, ease: "easeInOut" }} />
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────
   LUXURY TYPEWRITER
───────────────────────────────────────── */
function LuxuryTypewriter({ text, delay = 0.5, speed = 40, style }: { text: string; delay?: number; speed?: number; style?: React.CSSProperties }) {
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => { const t = setTimeout(() => setIsTyping(true), delay * 1000); return () => clearTimeout(t); }, [delay]);
  useEffect(() => {
    if (!isTyping) return;
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, index + 1));
      index += 1;
      if (index >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [isTyping, text, speed]);
  return (
    <span style={style}>
      {displayed}
      {isTyping && displayed.length < text.length && (
        <motion.span animate={{ opacity: [1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity }}
          style={{ marginLeft: "2px", color: "#c9a96e", textShadow: "0 0 8px rgba(201,169,110,0.5)" }}>|</motion.span>
      )}
    </span>
  );
}

const Typewriter = LuxuryTypewriter;

/* ─────────────────────────────────────────
   PARTICLE FLOAT
───────────────────────────────────────── */
function ParticleFloat() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number; depth: number }>>([]);
  useEffect(() => {
    setParticles(Array.from({ length: 8 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, size: 2 + Math.random() * 4, duration: 20 + Math.random() * 10, delay: i * 0.3, depth: Math.random() * 100 })));
  }, []);
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1 }}>
      {particles.map((p) => (
        <motion.div key={p.id} style={{ position: "fixed", width: p.size, height: p.size, borderRadius: "50%", background: `rgba(201,169,110,${0.3 - p.depth / 500})`, left: `${p.x}%`, top: `${p.y}%`, filter: "blur(0.5px)" }}
          animate={{ y: [0, -100], opacity: [0, 0.6, 0] }} transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   SCROLL REVEAL 3D
───────────────────────────────────────── */
function ScrollReveal3D({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <motion.div ref={ref} style={{ perspective: "1200px" }} initial={{ opacity: 0, rotateX: 15, y: 40 }} animate={inView ? { opacity: 1, rotateX: 0, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   GLOW BUTTON
───────────────────────────────────────── */
function GlowButton({ text, onClick }: { text: string; onClick?: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.button style={{ padding: "12px 32px", background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.3)", color: "#c9a96e", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "500", position: "relative", overflow: "hidden" }}
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={onClick} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <motion.div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle, rgba(201,169,110,0.2) 0%, transparent 70%)", pointerEvents: "none" }} animate={isHovered ? { opacity: [0, 1, 0.5] } : { opacity: 0 }} transition={{ duration: 1 }} />
      <span style={{ position: "relative", zIndex: 1 }}>{text}</span>
    </motion.button>
  );
}

export { LoadBar, LuxuryTypewriter, ParticleFloat, ScrollReveal3D, GlowButton };

/* ─────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────── */
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState("View");
  const pos = useRef({ x: -200, y: -200 });
  const raf = useRef<number>(0);
  useEffect(() => {
    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const onOver = (e: MouseEvent) => { const el = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement | null; if (el) { setHovered(true); setLabel(el.dataset.cursor ?? "View"); } };
    const onOut = (e: MouseEvent) => { if ((e.target as HTMLElement).closest("[data-cursor]")) setHovered(false); };
    const loop = () => { if (cursorRef.current) cursorRef.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px)`; raf.current = requestAnimationFrame(loop); };
    raf.current = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove); window.addEventListener("mouseover", onOver); window.addEventListener("mouseout", onOut);
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseover", onOver); window.removeEventListener("mouseout", onOut); };
  }, []);
  return (
    <div ref={cursorRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 9999, pointerEvents: "none", willChange: "transform" }}>
      <motion.div animate={{ width: hovered ? 82 : 12, height: hovered ? 82 : 12, x: hovered ? -41 : -6, y: hovered ? -41 : -6, backgroundColor: hovered ? "rgba(201,169,110,0.94)" : "rgba(26,23,20,0.78)", borderRadius: "50%" }} transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <AnimatePresence>
          {hovered && (<motion.span key="label" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.16 }} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", color: "#1a1714", whiteSpace: "nowrap" }}>{label} ↗</motion.span>)}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function CursorTrail() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const position = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => { position.current = { x: e.clientX, y: e.clientY }; };
    const animate = () => {
      if (containerRef.current) {
        const dots = Array.from(containerRef.current.children) as HTMLElement[];
        dots.forEach((dot) => { dot.style.transform = `translate(${position.current.x - dot.clientWidth / 2}px, ${position.current.y - dot.clientHeight / 2}px)`; });
      }
      raf.current = requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", onMouseMove);
    raf.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", onMouseMove); cancelAnimationFrame(raf.current); };
  }, []);
  return (
    <div ref={containerRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9998 }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} style={{ position: "fixed", width: 12 - index * 2, height: 12 - index * 2, borderRadius: "50%", background: "rgba(201,169,110,0.24)", pointerEvents: "none", transform: "translate(-9999px,-9999px)", transition: "transform 0.16s ease-out" }} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   PROGRESS BAR
───────────────────────────────────────── */
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.5 });
  return <motion.div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, transformOrigin: "left", background: "#c9a96e", zIndex: 300, scaleX }} />;
}

/* ─────────────────────────────────────────
   NAVBAR WRAPPER
───────────────────────────────────────── */
function NavbarWrapper() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const handler = () => setScrolled(window.scrollY > 80); window.addEventListener("scroll", handler, { passive: true }); return () => window.removeEventListener("scroll", handler); }, []);
  return (
    <motion.div animate={{ borderBottomColor: scrolled ? "rgba(212,196,174,0.55)" : "transparent" }} transition={{ duration: 0.3 }} style={{ position: "relative", zIndex: 100, borderBottom: "1px solid transparent", backdropFilter: scrolled ? "blur(20px)" : "blur(8px)" }}>
      <Navbar />
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MARQUEE STRIP
───────────────────────────────────────── */
function MarqueeStrip() {
  const items = ["UI/UX Design", "User Research", "Motion Design", "Interaction Design", "Figma", "React", "Usability Testing", "Wireframing", "Prototyping"];
  const repeated = [...items, ...items, ...items];
  const [paused, setPaused] = useState(false);
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid #e2ddd6", borderBottom: "1px solid #e2ddd6", background: "#ede8e0", padding: "12px 0" }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <motion.div style={{ display: "flex", gap: 56, whiteSpace: "nowrap" }} animate={{ x: paused ? undefined : ["0%", "-33.33%"] }} transition={{ duration: 34, repeat: Infinity, ease: "linear" }}>
        {repeated.map((item, i) => (
          <span key={i} style={{ fontFamily: "'DM Serif Display', serif", fontSize: 13, fontStyle: "italic", color: paused ? "var(--ink-soft)" : "#8a7d6b", display: "inline-flex", alignItems: "center", gap: 52, transition: "color 0.3s" }}>
            {item}<span style={{ fontStyle: "normal", color: "#c9b89e", fontSize: 10 }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SECTION TAG
───────────────────────────────────────── */
function SectionTag({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: light ? "#7a7065" : "#9a8f82" }}>{children}</p>;
}

const reveal = {
  initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 }, transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] as const },
};

/* ─────────────────────────────────────────
   MAGNETIC WRAP
───────────────────────────────────────── */
function MagneticWrap({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.8 });
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2); const dy = e.clientY - (r.top + r.height / 2);
    if (Math.sqrt(dx * dx + dy * dy) < 80) { x.set(dx * 0.35); y.set(dy * 0.35); }
  };
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, display: "inline-flex" }} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   TILT CARD
───────────────────────────────────────── */
function TiltCard({ children, style, className, onClick, variants, "data-cursor": dataCursor }:
  { children: React.ReactNode; style?: React.CSSProperties; className?: string; onClick?: () => void; variants?: Variants; "data-cursor"?: string; }) {
  const ref = useRef<HTMLElement>(null);
  const rotX = useMotionValue(0); const rotY = useMotionValue(0);
  const springRotX = useSpring(rotX, { stiffness: 200, damping: 24 });
  const springRotY = useSpring(rotY, { stiffness: 200, damping: 24 });
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; const py = (e.clientY - r.top) / r.height;
    rotX.set((py - 0.5) * -16); rotY.set((px - 0.5) * 16);
  };
  const onLeave = () => { rotX.set(0); rotY.set(0); };
  return (
    <motion.article ref={ref as React.Ref<HTMLElement>} variants={variants} className={className} data-cursor={dataCursor}
      style={{ rotateX: springRotX, rotateY: springRotY, transformStyle: "preserve-3d", position: "relative", ...style }}
      whileHover={{ y: -6 }} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.article>
  );
}

/* ─────────────────────────────────────────
   STAT COUNT-UP
───────────────────────────────────────── */
function StatCountUp({ stat }: { stat: string }) {
  const match = stat.match(/^(\d+)(.*)$/);
  const num = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : stat;
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
    obs.observe(ref.current); return () => obs.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / 1400, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(tick); else setCount(num);
    };
    requestAnimationFrame(tick);
  }, [started, num]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─────────────────────────────────────────
   MOBILE CTA STRIP
───────────────────────────────────────── */
function MobileCTAStrip() {
  return (
    <>
      <style>{`@media (min-width: 769px) { .mobile-cta-strip { display: none !important; } }`}</style>
      <div className="mobile-cta-strip" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200, background: "rgba(26,23,20,0.96)", backdropFilter: "blur(16px)", borderTop: "1px solid #2d2a26", padding: "12px 20px 20px", display: "flex", gap: 10 }}>
        <a href={RESUME_URL} target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#c9a96e", color: "#1a1714", borderRadius: 100, padding: "13px 0", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.10em", textTransform: "uppercase", textDecoration: "none" }}>View Resume</a>
        <a href="mailto:bhavyasrireddy267@gmail.com" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "transparent", color: "var(--sand)", border: "1px solid #2d2a26", borderRadius: 100, padding: "13px 0", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.10em", textTransform: "uppercase", textDecoration: "none" }}>Email Me</a>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   PAGE TRANSITION
───────────────────────────────────────── */
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MOTION SECTION
───────────────────────────────────────── */
type MotionSectionProps = {
  interactionStudies: InteractionStudy[];
  activeStudyIndex: number;
  setActiveStudyIndex: React.Dispatch<React.SetStateAction<number>>;
  prevStudy: () => void;
  nextStudy: () => void;
};

function MotionSection({ interactionStudies, activeStudyIndex, setActiveStudyIndex, prevStudy, nextStudy }: MotionSectionProps) {
  const activeStudy = interactionStudies[activeStudyIndex];
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { isMobile, isTablet } = useBreakpoint();
  const sectionRef = useRef<HTMLElement>(null);
  const pad = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <section id="interactions" ref={sectionRef} className="scroll-mt-24 w-full"
      style={{ background: "#1a1714", position: "relative" }}
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>

      {!isMobile && (
        <motion.div animate={{ x: mousePos.x, y: mousePos.y, opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.4 }}
          transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.4 }}
          style={{ position: "fixed", top: 0, left: 0, width: 20, height: 20, borderRadius: "50%", background: "white", mixBlendMode: "difference", pointerEvents: "none", zIndex: 9990, translateX: "-50%", translateY: "-50%" }} />
      )}

      <div style={{ padding: isMobile ? "48px 24px 32px" : "80px 48px 40px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", borderBottom: "1px solid #2a2520" }}>
        <div>
          <SectionTag light>03 // Motion</SectionTag>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px,5.5vw,72px)", lineHeight: 0.88, letterSpacing: "-0.03em", color: "var(--cream)", marginTop: 16 }}>
            Motion with<br /><em style={{ color: "var(--sand)", fontStyle: "italic" }}>Intention</em>
          </h2>
        </div>
        {!isMobile && <div aria-hidden style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(80px,12vw,160px)", lineHeight: 1, letterSpacing: "-0.06em", color: "transparent", WebkitTextStroke: "1px #2d2a26", opacity: 0.6, userSelect: "none", paddingBottom: 4 }}>03</div>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile || isTablet ? "1fr" : "4fr 7fr", borderBottom: "1px solid #2a2520" }}>
        <div style={{ position: isMobile || isTablet ? "relative" : "sticky", top: 128, alignSelf: "start", borderRight: isMobile || isTablet ? "none" : "1px solid #2a2520", borderBottom: isMobile || isTablet ? "1px solid #2a2520" : "none", background: "#1a1714", padding: isMobile ? "32px 24px" : "48px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: isMobile ? "auto" : 600 }}>
          <div>
            <div aria-hidden style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(48px,8vw,100px)", lineHeight: 1, letterSpacing: "-0.06em", color: "transparent", WebkitTextStroke: "1px #2d2a26", userSelect: "none", marginBottom: 28 }}>{pad(activeStudyIndex)}</div>
            <AnimatePresence mode="wait">
              <motion.div key={activeStudy.id + "-brief"} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--sage)", marginBottom: 14 }}>{activeStudy.category}</p>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(20px,2.8vw,34px)", lineHeight: 1.15, letterSpacing: "-0.025em", color: "var(--cream)", marginBottom: 20 }}>{activeStudy.title}</h3>
                <div style={{ height: 1, background: "linear-gradient(to right, #c9a96e, transparent)", marginBottom: 20, width: "72%" }} />
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.9, color: "var(--stone)", fontWeight: 300, marginBottom: 28 }}>{activeStudy.summary}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {[activeStudy.format === "mobile" ? "Mobile" : "Desktop", activeStudy.category, "2026", "Framer Motion"].map((tag) => (
                    <span key={tag} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--stone)", background: "#252220", border: "1px solid #2d2a26", borderRadius: 100, padding: "4px 10px" }}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 48 }}>
            <div style={{ display: "flex", gap: 8 }}>
              {[{ fn: prevStudy, label: "Previous", Icon: FiChevronLeft }, { fn: nextStudy, label: "Next", Icon: FiChevronRight }].map(({ fn, label, Icon }) => (
                <button key={label} type="button" onClick={fn} aria-label={label}
                  style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid #3d3830", background: "transparent", color: "var(--stone)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, cursor: "pointer" }}>
                  <Icon />
                </button>
              ))}
            </div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontSize: 14 }}>
              <span style={{ color: "var(--gold)" }}>{activeStudyIndex + 1}</span>
              <span style={{ margin: "0 6px", color: "#2d2a26" }}>/</span>
              <span style={{ color: "#3d3830" }}>{interactionStudies.length}</span>
            </div>
          </div>
        </div>

        <div style={{ padding: isMobile ? "24px" : "40px", display: "flex", flexDirection: "column" }}>
          <div style={{ background: "#0d0c0a", borderRadius: 16, border: "1px solid #252220", overflow: "hidden", position: "relative", flex: 1, minHeight: isMobile ? 320 : 560, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 10, borderBottom: "1px solid #1f1c18", background: "rgba(13,12,10,0.9)", backdropFilter: "blur(12px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sage)", display: "inline-block" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#5a5248" }}>{activeStudy.format === "mobile" ? "Mobile Prototype" : "Desktop Prototype"}</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.span key={activeStudy.id + "-counter"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontSize: 11, color: "#3d3830" }}>
                  {pad(activeStudyIndex)} / {String(interactionStudies.length).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeStudy.id + "-video"} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "absolute", inset: 0, top: 42, display: "flex", alignItems: "center", justifyContent: "center", padding: activeStudy.format === "mobile" ? "28px 40px 24px" : "20px 24px" }}>
                {activeStudy.format === "mobile" ? (
                  <div style={{ height: "100%", maxHeight: 500, aspectRatio: "9 / 19", borderRadius: 16, overflow: "hidden", border: "1px solid #2d2a26", boxShadow: "0 24px 60px rgba(0,0,0,0.55)", flexShrink: 0 }}>
                    <video src={activeStudy.videoSrc} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                ) : (
                  <video src={activeStudy.videoSrc} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", borderRadius: 8 }} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #252220", display: "grid", gridTemplateColumns: isMobile ? `repeat(${interactionStudies.length}, minmax(140px, 1fr))` : `repeat(${interactionStudies.length}, 1fr)`, overflowX: isMobile ? "auto" : "visible" }}>
        {interactionStudies.map((study, index) => {
          const isActive = index === activeStudyIndex;
          return (
            <button key={study.id} type="button" data-cursor="Play" onClick={() => setActiveStudyIndex(index)}
              style={{ padding: "22px 24px", borderRight: index < interactionStudies.length - 1 ? "1px solid #252220" : "none", borderBottom: "none", background: isActive ? "rgba(201,169,110,0.06)" : "transparent", borderTop: isActive ? "2px solid var(--gold)" : "2px solid transparent", textAlign: "left", transition: "background 0.3s", position: "relative", cursor: "pointer" }}>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 11, color: isActive ? "var(--gold)" : "#2d2a26", letterSpacing: "0.06em", marginBottom: 6 }}>{pad(index)}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: isActive ? "var(--sage)" : "#3d3830", marginBottom: 5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{study.category}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: isActive ? "var(--cream)" : "#4a4540", lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{study.title}</p>
              {isActive && <motion.div layoutId="filmstrip-indicator" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "var(--gold)", opacity: 0.6 }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════ */
export default function Home() {
  const navigate = useNavigate();
  const [activeStudyIndex, setActiveStudyIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrolledPast120, setScrolledPast120] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();

  useEffect(() => {
    const handler = () => setScrolledPast120(window.scrollY > 120);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const caseStudies: CaseStudy[] = useMemo(() => [
    { id: "01", title: "AI-assisted healthcare appointment booking", category: "UX Case Study", summary: "A guided patient flow that helps users identify the right specialist, understand the next step faster, and book with clarity and less friction.", image: coverHealthcare, route: "/case-study/healthcare", year: "2026" },
    { id: "02", title: "Fintech UX Case Study - AI-Powered Subscription Optimization", category: "UX Case Study", summary: "A modern finance experience focused on clearer money management, subscription visibility, and a simpler decision-making flow.", image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1400&q=80&auto=format&fit=crop", route: "/case-study/fintech", year: "2026" },
  ], []);

  const interactionStudies: InteractionStudy[] = useMemo(() => [
    { id: "spotify", title: "Feel The Live Music", category: "Motion Study", summary: "A study focused on subtle motion cues, responsiveness, and interface liveliness while preserving readability.", videoSrc: spotifyMotion, format: "desktop" },
    { id: "airpods", title: "Product storytelling transition", category: "Motion Study", summary: "A motion exploration shaped around reveal, pacing, and hierarchy for a more intentional product presentation.", videoSrc: airpodsMotion, format: "desktop" },
    { id: "outfit", title: "AI outfit recommendation interaction", category: "Interaction Study", summary: "A guided browsing concept using progressive reveal to make recommendation-driven exploration feel lighter and fluid.", videoSrc: aiOutfitMotion, format: "mobile" },
    { id: "hotel", title: "Hotel browsing motion study", category: "Motion Study", summary: "A hospitality browsing interaction focused on smoother discovery, stronger content emphasis, and a more polished flow.", videoSrc: hotelMotion, format: "mobile" },
  ], []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = setInterval(() => setActiveStudyIndex((p) => (p + 1) % interactionStudies.length), 5000);
    return () => clearInterval(id);
  }, [interactionStudies.length]);

  const prevStudy = useCallback(() => setActiveStudyIndex((p) => p === 0 ? interactionStudies.length - 1 : p - 1), [interactionStudies.length]);
  const nextStudy = useCallback(() => setActiveStudyIndex((p) => (p + 1) % interactionStudies.length), [interactionStudies.length]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
        :root {
          --cream: #f5f1eb; --cream-dark: #ede8e0; --bone: #fdfcfa;
          --ink: #1a1714; --ink-soft: #3d3830; --stone: #7a7065;
          --sand: #b8a48a; --sand-light: #d4c4ae; --gold: #c9a96e;
          --gold-pale: #e8d9c0; --sage: #03b450;
        }
        body { background: var(--cream); margin: 0; }
        @media (hover: none) { *, *::before, *::after { cursor: auto !important; } }
        @media (hover: hover) { *, *::before, *::after { cursor: none !important; } }
        .btn-ink { display: inline-flex; align-items: center; gap: 8px; background: var(--ink); color: var(--cream); padding: 14px 28px; border-radius: 100px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.10em; text-transform: uppercase; border: none; text-decoration: none; transition: background .25s, transform .2s; cursor: pointer; }
        .btn-ink:hover { background: var(--ink-soft); transform: translateY(-2px); }
        .btn-outline { display: inline-flex; align-items: center; gap: 8px; background: transparent; color: var(--ink-soft); padding: 13px 24px; border-radius: 100px; border: 1px solid var(--sand-light); font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.10em; text-transform: uppercase; text-decoration: none; transition: border-color .2s, background .2s, transform .2s; }
        .btn-outline:hover { border-color: var(--sand); background: var(--cream-dark); transform: translateY(-2px); }
        .btn-gold { display: inline-flex; align-items: center; gap: 8px; background: var(--gold); color: var(--ink); padding: 14px 26px; border-radius: 100px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.10em; text-transform: uppercase; border: none; text-decoration: none; transition: background .2s, transform .2s; }
        .btn-gold:hover { background: #d4b07e; transform: translateY(-2px); }
        .btn-ghost-dark { display: inline-flex; align-items: center; gap: 8px; background: transparent; color: var(--sand); padding: 14px 26px; border-radius: 100px; border: 1px solid #2d2a26; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.10em; text-transform: uppercase; text-decoration: none; transition: background .2s, transform .2s; }
        .btn-ghost-dark:hover { background: #1f1c18; transform: translateY(-2px); }
        .cs-card-border { height: 2px; background: var(--gold); transform: scaleX(0); transform-origin: left; transition: transform 0.42s cubic-bezier(0.22,1,0.36,1); }
        .cs-card-wrap:hover .cs-card-border { transform: scaleX(1); }
        .contact-link-item { display: flex; align-items: center; gap: 16px; border: 1px solid #2d2a26; border-radius: 16px; padding: 20px 24px; text-decoration: none; transition: background .2s; }
        .contact-link-item:hover { background: #1f1c18; }
        .contact-link-arrow { margin-left: auto; color: #3d3830; font-size: 16px; transition: transform .22s, color .22s; }
        .contact-link-item:hover .contact-link-arrow { transform: rotate(-45deg) translate(2px,-2px); color: var(--gold); }
        .cs-perspective { perspective: 1200px; }
        @keyframes pulseDot { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
        .pulsing-dot { position: relative; background: #6fcf97 !important; animation: pulseDot 2s ease-in-out infinite; }
        .pulsing-dot::before { content: ''; position: absolute; inset: -1px; border-radius: 50%; background: rgba(111,207,151,0.45); animation: pulseRing 2s ease-out infinite; }
        @keyframes pulseRing { 0% { transform: scale(1); opacity: 1; } 60% { transform: scale(2.4); opacity: 0; } 100% { transform: scale(2.4); opacity: 0; } }
        @media (max-width: 767px) {
          .metrics-strip { grid-template-columns: repeat(2, 1fr) !important; }
          .metrics-strip > div { border-right: none !important; border-bottom: 1px solid var(--sand-light); }
          .metrics-strip > div:nth-child(odd) { border-right: 1px solid var(--sand-light) !important; }
          .contact-grid { grid-template-columns: 1fr !important; padding: 36px 24px !important; }
          .footer-row { flex-direction: column !important; gap: 8px !important; align-items: flex-start !important; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {!isMobile && <><CustomCursor /><CursorTrail /></>}
      <LoadBar />

      <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--cream)", color: "var(--ink)" }}>
        <ProgressBar />
        <NavbarWrapper />
        <PageTransition>
          <main>

            {/* ════ 01 · HERO ════ */}
            <section ref={heroRef} className="relative w-full overflow-hidden" style={{ background: "var(--cream)", minHeight: isMobile ? "auto" : "100vh" }}>
              <div className="pointer-events-none absolute inset-0 z-10" style={{ opacity: 0.02, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "256px" }} />

              {/* MOBILE HERO */}
              {isMobile && (
                <div style={{ padding: "100px 24px 60px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 0 }}>
                  <motion.img src={profile} alt="Bhavyasri Mudireddy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                    style={{ width: "72vw", maxWidth: 280, objectFit: "contain", filter: "drop-shadow(0 20px 40px rgba(26,23,20,0.14))", marginBottom: 32 }} />
                  <SectionTag>UX Designer · Portfolio</SectionTag>
                  <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                    style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(44px,12vw,72px)", lineHeight: 0.92, letterSpacing: "-0.03em", color: "var(--ink)", marginTop: 16 }}>
                    Hi, <em style={{ fontStyle: "italic", color: "var(--stone)" }}>I'm</em>
                  </motion.h1>
                  <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                    style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(36px,10vw,60px)", lineHeight: 1.0, letterSpacing: "-0.03em", color: "var(--ink)", marginTop: 8 }}>
                    Bhavyasri<br /><em style={{ fontStyle: "italic", color: "var(--stone)" }}>Mudireddy</em>
                  </motion.h2>
                  <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--stone)", marginTop: 16 }}>
                    Product Designer &amp; Frontend Engineer
                  </motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: "var(--sand)", marginTop: 6, minHeight: "1.5em" }}>
                    <Typewriter text="AI UX · Fintech & Healthcare · React/TypeScript" delay={1.2} speed={32} />
                  </motion.p>
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.8, color: "var(--stone)", fontWeight: 300, maxWidth: 320, marginTop: 20 }}>
                    3 years bridging UX research and React/TypeScript — I design the flow, then build it.
                  </motion.p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 20, justifyContent: "center" }}>
                    {["React", "TypeScript", "Framer Motion", "Figma", "WCAG AAA"].map((tag) => (
                      <span key={tag} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--stone)", border: "1px solid var(--sand-light)", borderRadius: 100, padding: "4px 10px", background: "var(--bone)" }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid var(--sand-light)", borderRadius: 100, padding: "10px 18px", background: "var(--bone)", marginTop: 20 }}>
                    <motion.span className="pulsing-dot" animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }} transition={{ duration: 1.1, repeat: Infinity }} style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--sage)", display: "inline-block", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "var(--stone)", letterSpacing: "0.06em" }}>Available for work · 2026</span>
                  </div>
                  <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap", justifyContent: "center" }}>
                    <button type="button" className="btn-ink" onClick={() => document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" })}>
                      View Case Studies <FiArrowRight />
                    </button>
                    <a href={RESUME_URL} target="_blank" rel="noreferrer" className="btn-outline"><FiDownload /> Resume</a>
                  </div>
                </div>
              )}

              {/* TABLET HERO */}
              {isTablet && (
                <div style={{ padding: "100px 48px 60px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "end", width: "100%" }}>
                    <div>
                      <SectionTag>UX Designer · Portfolio</SectionTag>
                      <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(48px,7vw,80px)", lineHeight: 0.9, letterSpacing: "-0.03em", color: "var(--ink)", marginTop: 20 }}>
                        Hi,<br /><em style={{ fontStyle: "italic", color: "var(--stone)" }}>I'm</em>
                      </h1>
                      <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(36px,5vw,60px)", lineHeight: 1.0, letterSpacing: "-0.03em", color: "var(--ink)", marginTop: 8 }}>
                        Bhavyasri<br /><em style={{ fontStyle: "italic", color: "var(--stone)" }}>Mudireddy</em>
                      </motion.h2>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.8, color: "var(--stone)", fontWeight: 300, marginTop: 20, maxWidth: 340 }}>
                        3 years bridging UX research and React/TypeScript. Specializing in AI-powered products for <span style={{ color: "var(--ink)", fontWeight: 400 }}>fintech &amp; healthcare</span>.
                      </p>
                      <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
                        <button type="button" className="btn-ink" onClick={() => document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" })}>
                          View Case Studies <FiArrowRight />
                        </button>
                        <a href={RESUME_URL} target="_blank" rel="noreferrer" className="btn-outline"><FiDownload /> Resume</a>
                      </div>
                    </div>
                    <motion.img src={profile} alt="Bhavyasri Mudireddy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                      style={{ width: "100%", maxHeight: "60vh", objectFit: "contain", filter: "drop-shadow(0 20px 40px rgba(26,23,20,0.14))" }} />
                  </div>
                </div>
              )}

              {/* DESKTOP HERO */}
              {!isMobile && !isTablet && (
                <div className="relative z-10 grid min-h-screen items-center" style={{ gridTemplateColumns: "1fr 480px 1fr", paddingTop: 96 }}>
                  <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col justify-center self-center px-10 xl:px-16">
                    <SectionTag>UX Designer · Portfolio</SectionTag>
                    <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(52px,7vw,92px)", lineHeight: 0.9, letterSpacing: "-0.03em", color: "var(--ink)", marginTop: 28 }}>
                      Hi,<br /><em style={{ fontStyle: "italic", color: "var(--stone)" }}>I'm</em>
                    </h1>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.9, color: "var(--stone)", fontWeight: 300, maxWidth: 270, marginTop: 28 }}>
                      3 years bridging UX research and React/TypeScript — I design the flow, then build it. Specializing in AI-powered products for <span style={{ color: "var(--ink)", fontWeight: 400 }}>fintech &amp; healthcare</span>.
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 20 }}>
                      {["React", "TypeScript", "Framer Motion", "Figma", "WCAG AAA"].map((tag) => (
                        <span key={tag} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--stone)", border: "1px solid var(--sand-light)", borderRadius: 100, padding: "4px 10px", background: "var(--bone)" }}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid var(--sand-light)", borderRadius: 100, padding: "10px 18px", background: "var(--bone)", width: "fit-content", marginTop: 20 }}>
                      <motion.span className="pulsing-dot" animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }} transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }} style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--sage)", display: "inline-block", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "var(--stone)", letterSpacing: "0.06em" }}>Available for work · 2026</span>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className="relative flex items-end justify-center" style={{ height: "100vh" }}>
                    <motion.img src={profile} alt="Bhavyasri Mudireddy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                      style={{ position: "relative", zIndex: 1, height: "85vh", width: "auto", objectFit: "contain", filter: "drop-shadow(0 28px 56px rgba(26,23,20,0.16))" }}
                      whileHover={{ scale: 1.015 }} />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col justify-center self-center px-10 xl:px-16">
                    <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                      style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(40px,5vw,76px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "var(--ink)" }}>
                      Bhavyasri<br /><em style={{ fontStyle: "italic", color: "var(--stone)" }}>Mudireddy</em>
                    </motion.h2>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--stone)", marginTop: 20 }}>
                      Product Designer &amp; Frontend Engineer
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 300, color: "var(--sand)", marginTop: 6, letterSpacing: "0.04em", minHeight: "1.5em" }}>
                      <Typewriter text="AI UX · Fintech & Healthcare · React/TypeScript" delay={1.5} speed={32} />
                    </p>
                    <div style={{ height: 1, background: "var(--sand-light)", margin: "28px 0", maxWidth: 320 }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 260 }}>
                      <MagneticWrap>
                        <button type="button" className="btn-ink" data-cursor="Work" onClick={() => document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" })}>
                          View Case Studies <FiArrowRight />
                        </button>
                      </MagneticWrap>
                      <MagneticWrap>
                        <a href={RESUME_URL} target="_blank" rel="noreferrer" className="btn-outline" data-cursor="Open">
                          <FiDownload /> Resume
                        </a>
                      </MagneticWrap>
                    </div>
                    <motion.div animate={{ opacity: scrolledPast120 ? 0 : 1 }} transition={{ duration: 0.4 }} style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 56, pointerEvents: "none" }}>
                      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} style={{ width: 1, height: 48, background: "var(--sand)", marginLeft: 2 }} />
                      <SectionTag>Scroll to see work</SectionTag>
                    </motion.div>
                  </motion.div>
                </div>
              )}
            </section>

            <MarqueeStrip />

            {/* ════ 02 · CASE STUDIES ════ */}
            <section id="case-studies" className="scroll-mt-24 w-full" style={{ background: "var(--cream)", padding: isMobile ? "64px 24px" : isTablet ? "80px 40px" : "112px 80px" }}>
              <motion.div {...reveal} style={{ marginBottom: 48 }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 32, alignItems: "end" }}>
                  <div>
                    <SectionTag>02 // Work</SectionTag>
                    <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(36px,6vw,80px)", lineHeight: 0.9, letterSpacing: "-0.03em", color: "var(--ink)", marginTop: 16 }}>
                      Selected<br /><em style={{ color: "var(--stone)", fontStyle: "italic" }}>Case Studies</em>
                    </h2>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.9, color: "var(--stone)", maxWidth: 480, fontWeight: 300 }}>
                    A curated set of UX work focused on guidance, clarity, and elegant interface thinking.
                  </p>
                </div>
              </motion.div>

              <motion.div className="metrics-strip" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, borderRadius: 16, overflow: "hidden", border: "1px solid var(--sand-light)", marginBottom: 32 }}>
                {[
                  { stat: "92%", label: "Task success rate", sub: "Fintech usability testing" },
                  { stat: "60%", label: "Less decision anxiety", sub: "Healthcare AI flow" },
                  { stat: "70+", label: "User interviews", sub: "Recruited via online communities & personal network" },
                  { stat: "100%", label: "Design-to-code parity", sub: "UNT campus tools" },
                ].map((item, i) => (
                  <div key={i} style={{ background: "var(--bone)", padding: "24px 20px", borderRight: i < 3 ? "1px solid var(--sand-light)" : "none" }}>
                    <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px,4vw,40px)", lineHeight: 1, letterSpacing: "-0.03em", color: "var(--ink)" }}><StatCountUp stat={item.stat} /></p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, color: "var(--ink-soft)", marginTop: 8, lineHeight: 1.4 }}>{item.label}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "var(--stone)", fontWeight: 300, marginTop: 4 }}>{item.sub}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div className="cs-perspective"
                style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 24 }}
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13 } } }}>
                {caseStudies.map((study) => (
                  <TiltCard key={study.id}
                    variants={{ hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } }}
                    className="cs-card-wrap group flex flex-col overflow-hidden" data-cursor="View"
                    style={{ borderRadius: 20, border: "1px solid var(--sand-light)", background: "var(--bone)" }}
                    onClick={() => study.route && navigate(study.route)}>
                    <div style={{ position: "relative", height: isMobile ? 220 : 280, overflow: "hidden" }}>
                      <motion.img src={study.image} alt={study.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} whileHover={{ scale: 1.06 }} transition={{ duration: 0.7 }} />
                      <div style={{ position: "absolute", top: 14, left: 14, background: "var(--ink)", color: "var(--cream)", borderRadius: 8, padding: "4px 10px" }}>
                        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 13 }}>{study.id}</span>
                      </div>
                    </div>
                    <div className="cs-card-border" />
                    <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "24px" }}>
                      <SectionTag>{study.category} · {study.year}</SectionTag>
                      <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: isMobile ? 18 : 22, lineHeight: 1.2, color: "var(--ink)", letterSpacing: "-0.02em", margin: "12px 0 10px" }}>{study.title}</h3>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.85, color: "var(--stone)", fontWeight: 300, flex: 1 }}>{study.summary}</p>
                      {study.route && (
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 20, color: "var(--gold)", fontSize: 11, fontWeight: 500, letterSpacing: "0.10em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
                          View Case Study <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity }}><FiArrowRight /></motion.span>
                        </div>
                      )}
                    </div>
                  </TiltCard>
                ))}
              </motion.div>
            </section>

            {/* ════ 03 · MOTION ════ */}
            <MotionSection interactionStudies={interactionStudies} activeStudyIndex={activeStudyIndex} setActiveStudyIndex={setActiveStudyIndex} prevStudy={prevStudy} nextStudy={nextStudy} />

            {/* ════ 04 · ABOUT ════ */}
            <section id="about" className="scroll-mt-24 w-full" style={{ background: "var(--cream-dark)", padding: isMobile ? "64px 24px" : isTablet ? "80px 40px" : "112px 80px" }}>
              <motion.div {...reveal}>
                <div style={{ marginBottom: 48, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 32, alignItems: "end" }}>
                  <div>
                    <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(36px,5.5vw,72px)", lineHeight: 0.9, letterSpacing: "-0.03em", color: "var(--ink)", marginTop: 16 }}>
                      Calm design,<br /><em style={{ color: "var(--stone)", fontStyle: "italic" }}>Clear structure</em>
                    </h2>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.9, color: "var(--stone)", maxWidth: 480, fontWeight: 400 }}>
                    I'm Bhavyasri, a product designer and frontend engineer focused on guided digital experiences for fintech and healthcare.
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: 20 }}>
                  {[
                    { num: "01", title: "UX Focus", desc: "AI-assisted flows, guided onboarding, interaction clarity, and decision-making support. I center the user at every step — recruiting participants through targeted online communities and personal network for both healthcare and fintech research." },
                    { num: "02", title: "Design Strength", desc: "Visual calm, thoughtful hierarchy, and interfaces that feel intentional. Not overdone, not underdone — with 100% design-to-code parity across shipped projects." },
                    { num: "03", title: "Working Style", desc: "Structure first, polish second. I bring WCAG AAA accessibility standards and React implementation awareness, so designs ship as designed." },
                  ].map((item, index) => (
                    <motion.div key={item.num} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: index * 0.1 }}
                      style={{ borderRadius: 20, border: "1px solid var(--sand-light)", background: "var(--bone)", padding: "32px 28px" }}>
                      <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 48, color: "var(--gold-pale)", lineHeight: 1, letterSpacing: "-0.04em" }}>{item.num}</p>
                      <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "var(--ink)", marginTop: 14, marginBottom: 10, letterSpacing: "-0.02em" }}>{item.title}</h3>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.85, color: "var(--stone)", fontWeight: 400 }}>{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: 0.3 }}
                  style={{ marginTop: 20, borderRadius: 20, border: "1px solid var(--sand-light)", background: "var(--bone)", padding: "24px 28px", display: "flex", alignItems: isMobile ? "flex-start" : "center", flexWrap: "wrap", gap: 20 }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--stone)", flexShrink: 0 }}>Credentials</p>
                  {[
                    { label: "MS Computer Science", sub: "University of North Texas · May 2025" },
                    { label: "Google UX Design Certificate", sub: "Professional · March 2026" },
                    { label: "WCAG AAA Implementation", sub: "Certified across enterprise products" },
                  ].map((cred) => (
                    <div key={cred.label} style={{ display: "flex", flexDirection: "column", gap: 3, borderLeft: "1px solid var(--sand-light)", paddingLeft: 16 }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{cred.label}</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "var(--stone)", fontWeight: 300 }}>{cred.sub}</span>
                    </div>
                  ))}
                </motion.div>
                <div style={{ marginTop: 20, borderRadius: 20, border: "1px solid var(--sand-light)", background: "var(--bone)", padding: "24px 28px", display: "flex", alignItems: isMobile ? "flex-start" : "center", gap: 24 }}>
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: "var(--gold-pale)", lineHeight: 1, flexShrink: 0 }}>+</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.85, color: "var(--stone)", fontWeight: 400 }}>
                    I bring <span style={{ color: "var(--ink)", fontWeight: 500 }}>full-stack UX ownership</span> — from 0→1 research through React/TypeScript implementation. At UNT, I conducted 50+ user research sessions and delivered a 20–50 component design system with 100% design-to-code parity across 8 campus tools.
                  </p>
                </div>
              </motion.div>
            </section>

            {/* ════ 05 · CONTACT ════ */}
            <section id="resume" className="scroll-mt-24 w-full" style={{ background: "var(--cream)", padding: isMobile ? "64px 24px 100px" : isTablet ? "80px 40px" : "112px 80px" }}>
              <motion.div {...reveal} className="contact-grid"
                style={{ borderRadius: 24, background: "var(--ink)", padding: isMobile ? "36px 24px" : "64px 56px", display: "grid", gap: 40, gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px,5vw,64px)", lineHeight: 0.9, letterSpacing: "-0.03em", color: "var(--cream)" }}>
                    Let's work<br /><em style={{ color: "var(--sand)", fontStyle: "italic" }}>together</em>
                  </h2>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.9, color: "var(--stone)", fontWeight: 400, maxWidth: 360 }}>
                    Available for full-time product design roles in <span style={{ color: "var(--sand-light)" }}>fintech, healthcare,</span> or AI-first products. Based in Denton, TX — open to remote.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    <a href={RESUME_URL} target="_blank" rel="noreferrer" className="btn-gold" data-cursor="Open"><FiDownload /> View Resume</a>
                    <a href="mailto:bhavyasrireddy267@gmail.com" className="btn-ghost-dark" data-cursor="Mail"><FiMail /> Email Me</a>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { label: "Email", value: "bhavyasrireddy267@gmail.com", icon: <FiMail size={15} />, href: "mailto:bhavyasrireddy267@gmail.com", iconBg: "#2d2a26", iconColor: "var(--sand)" },
                    { label: "LinkedIn", value: "Connect with me", icon: <FaLinkedinIn size={14} />, href: "https://www.linkedin.com/in/bhavyasri-m-593aa6214/", iconBg: "#1d3557", iconColor: "#a8c4e0" },
                    { label: "GitHub", value: "Implementation work", icon: <FaGithub size={15} />, href: "https://github.com/bhavyasriii", iconBg: "#2d2a26", iconColor: "var(--sand)" },
                    { label: "Schedule a call", value: "30-min intro · Calendly", icon: <FiCalendar size={15} />, href: "https://calendly.com/bhavyasrireddy267", iconBg: "#1a2e1a", iconColor: "var(--sage)" },
                  ].map((item) => (
                    <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="contact-link-item" data-cursor="Open">
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: item.iconBg, display: "flex", alignItems: "center", justifyContent: "center", color: item.iconColor, flexShrink: 0 }}>{item.icon}</div>
                      <div>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--stone)", marginBottom: 4 }}>{item.label}</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 13 : 15, color: "var(--cream)", fontWeight: 400, wordBreak: "break-all" }}>{item.value}</p>
                      </div>
                      <span className="contact-link-arrow">↗</span>
                    </a>
                  ))}
                </div>
              </motion.div>
              <footer className="footer-row" style={{ paddingTop: 32, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "var(--stone)", fontWeight: 300 }}>© 2026 Bhavyasri Mudireddy — Product Designer &amp; Frontend Engineer</p>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontSize: 22, color: "var(--sand)" }}>BM</p>
              </footer>
            </section>

            <MobileCTAStrip />
          </main>
        </PageTransition>
      </div>
    </>
  );
}
