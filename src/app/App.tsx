import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github, Linkedin, Mail, Menu, X, Terminal, Shield, Code,
  Database, Search, Zap, ArrowRight, Send, GraduationCap,
  Award, Download, Eye, Globe, Server, Lock, ChevronDown, Network
} from "lucide-react";

// ─── IMAGES ──────────────────────────────────────────────────────────────────
const CASTLE_IMG = "https://images.unsplash.com/photo-1768739538834-a3edb42db797?w=1920&h=1080&fit=crop&auto=format";
const LIBRARY_IMG = "https://images.unsplash.com/photo-1758730010177-1711515b7552?w=1200&h=800&fit=crop&auto=format";
const profileImg = "logo.png";
const upfinityLogo = "favicon.png";

// ─── FONTS ───────────────────────────────────────────────────────────────────
const F_DISPLAY = "'Cinzel Decorative', serif";
const F_HEADING = "'Cinzel', serif";
const F_BODY = "'EB Garamond', serif";
const F_MONO = "'JetBrains Mono', monospace";

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV = ["HOME", "ABOUT", "EXPERIENCE", "SKILLS", "PROJECTS", "EDUCATION", "CONTACT"];

const EXPERIENCE_DATA = [
  {
    role: "Founder & Team Manager", company: "UPFINITY", period: "May 2025 – Present", badge: "FOUNDING", color: "#c9a84c",
    desc: "Founded and leads UPFINITY, orchestrating cross-disciplinary teams across development, security, and client operations. Drives strategic vision and delivers premium digital products.",
    tags: ["Leadership", "Strategy", "Team Management", "Vision"]
  },
  {
    role: "Backend Developer", company: "UPFINITY", period: "March 2026 – Present", badge: "DEVELOPMENT", color: "#10b981",
    desc: "Architects and implements backend systems, RESTful APIs, and database integrations with a security-first mindset — scalable, robust, and resilient by design.",
    tags: ["Python", "Node.js", "MongoDB", "MySQL", "REST APIs"]
  },
  {
    role: "Database Administrator", company: "UPFINITY", period: "March 2026 – Present", badge: "DATA", color: "#00d4ff",
    desc: "Designs and maintains database schemas, optimises query performance, and ensures data integrity and security across MongoDB and MySQL environments.",
    tags: ["MongoDB", "MySQL", "Schema Design", "Query Optimisation"]
  },
  {
    role: "Frontend Developer", company: "UPFINITY", period: "May 2025 – March 2026", badge: "FRONTEND", color: "#7c3aed",
    desc: "Built responsive, accessible web interfaces for client projects — translating complex designs into production-ready HTML, CSS and JavaScript.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
  },
];

const SKILL_CATS = [
  {
    id: "recon", label: "RECON", icon: Search, color: "#00d4ff",
    skills: [{ name: "OSINT", level: 85 }, { name: "Maltego", level: 70 }, { name: "Networking", level: 80 }]
  },
  {
    id: "security", label: "SECURITY", icon: Shield, color: "#7c3aed",
    skills: [{ name: "Linux", level: 82 }, { name: "Wireshark", level: 75 }, { name: "Burp Suite", level: 72 }, { name: "Rev. Engineering", level: 65 }]
  },
  {
    id: "dev", label: "DEVELOPMENT", icon: Code, color: "#10b981",
    skills: [{ name: "Python", level: 80 }, { name: "JavaScript", level: 78 }, { name: "HTML5 / CSS", level: 90 }]
  },
  {
    id: "data", label: "DATA", icon: Database, color: "#c9a84c",
    skills: [{ name: "MongoDB", level: 75 }, { name: "MySQL", level: 72 }, { name: "Backend Dev", level: 78 }]
  },
];

const POTIONS = [
  { name: "OSINT", level: 85, color: "#00d4ff", sym: "Ø" },
  { name: "Linux", level: 82, color: "#7c3aed", sym: "λ" },
  { name: "Networking", level: 80, color: "#10b981", sym: "⟁" },
  { name: "Python", level: 80, color: "#c9a84c", sym: "π" },
  { name: "Burp Suite", level: 72, color: "#f472b6", sym: "β" },
  { name: "Wireshark", level: 75, color: "#a78bfa", sym: "ω" },
];

const PROJECTS_DATA = [
  {
    title: "OSINT Investigation Case Study", subtitle: "Intelligence Gathering Protocol", type: "SECURITY", status: "CLASSIFIED", statusColor: "#7c3aed", spineColor: "#7c3aed", icon: Eye,
    desc: "Comprehensive OSINT investigation using advanced methodologies, Maltego link analysis, and network mapping to build full target profiles from open sources.", tags: ["OSINT", "Maltego", "Networking", "Investigation"]
  },
  {
    title: "Personal Portfolio Website", subtitle: "Identity & Brand Architecture", type: "DEVELOPMENT", status: "ACTIVE", statusColor: "#10b981", spineColor: "#c9a84c", icon: Globe,
    desc: "Cinematic portfolio with Harry Potter × Cybersecurity aesthetic — dual-mode theme system, terminal Easter egg, animated map and interactive book-flip cards.", tags: ["HTML5", "CSS3", "JavaScript", "Design"]
  },
  {
    title: "Vulnerability Research / Bug Bounty", subtitle: "Security Assessment Operations", type: "SECURITY", status: "ONGOING", statusColor: "#00d4ff", spineColor: "#00d4ff", icon: Shield,
    desc: "Systematic vulnerability research on authorised targets — web application security testing, reconnaissance, and responsible disclosure workflows.", tags: ["Burp Suite", "Web Security", "Bug Bounty"]
  },
  {
    title: "E-Commerce Website", subtitle: "Digital Commerce Platform", type: "DEVELOPMENT", status: "DELIVERED", statusColor: "#c9a84c", spineColor: "#10b981", icon: Server,
    desc: "Full-featured e-commerce platform with product catalogue, cart, and secure payment integration — fully responsive across all devices and screen sizes.", tags: ["JavaScript", "MongoDB", "Backend", "UX"]
  },
  {
    title: "Company Websites via UPFINITY", subtitle: "Client Delivery Portfolio", type: "AGENCY", status: "DEPLOYED", statusColor: "#10b981", spineColor: "#8b2635", icon: Zap,
    desc: "Multiple corporate websites developed through UPFINITY — each custom-built to client specifications, brand identity, and performance requirements.", tags: ["HTML5", "CSS3", "JavaScript", "Client Work"]
  },
];

const MAP_NODES = [
  { id: "about", label: "ABOUT", cx: 175, cy: 115 },
  { id: "experience", label: "EXPERIENCE", cx: 680, cy: 95 },
  { id: "skills", label: "SKILLS", cx: 440, cy: 225 },
  { id: "projects", label: "PROJECTS", cx: 195, cy: 340 },
  { id: "contact", label: "CONTACT", cx: 720, cy: 345 },
];
const MAP_EDGES = [[0, 2], [1, 2], [2, 3], [2, 4], [0, 3], [1, 4], [3, 4], [0, 1]];

const SYS_LOGS = [
  "INITIALIZING ARCANE_SECURITY_PROTOCOL...OK",
  "LOADING SKILL_MATRIX.dat ━━━━━━━━ 100%",
  "ENCRYPTION_MODULE: ACTIVE",
  "OSINT_TOOLS: ONLINE",
  "NETWORK_TOPOLOGY: MAPPED",
  "FIREWALL: ENGAGED",
  "ALL SYSTEMS NOMINAL ✓",
];

const TERMINAL_CMDS: Record<string, string[]> = {
  whoami: ["KRISHSUDHARSUN", "Computer Science Engineer | Cybersecurity Enthusiast", "Founder @ UPFINITY  |  Backend Developer  |  OSINT Analyst", "Status: ONLINE  •  Clearance: ACTIVE"],
  skills: ["LOADING SKILL_MATRIX...", "• RECON      → OSINT, Maltego, Networking", "• SECURITY   → Linux, Wireshark, Burp Suite, Rev.Eng", "• DEV        → Python, JavaScript, HTML5/CSS", "• DATA       → MongoDB, MySQL, Backend Systems", "LOADED ✓"],
  projects: ["ACCESSING MISSION_ARCHIVES...", "[01] OSINT Investigation Case Study     [CLASSIFIED]", "[02] Personal Portfolio Website         [ACTIVE]", "[03] Vulnerability Research/Bug Bounty  [ONGOING]", "[04] E-Commerce Website                 [DELIVERED]", "[05] Company Websites via UPFINITY      [DEPLOYED]", "✓"],
  contact: ["INITIATING SECURE_CHANNEL...", "• EMAIL    → krishsudharsunl@gmail.com", "• GITHUB   → github.com/KRISHSUDHARSUN", "• LINKEDIN → linkedin.com/in/krishsudharsun", "CHANNEL OPEN  •  ENCRYPTION ACTIVE ✓"],
  lumos: ["SWITCHING TO LUMOS MODE...", "Illuminating the manuscript...", "⟨ PARCHMENT MODE ACTIVE ⟩"],
  nox: ["SWITCHING TO NOX MODE...", "Extinguishing the lights...", "⟨ MIDNIGHT MODE ACTIVE ⟩"],
  revelio: ["REVELIO!", "Hidden detail revealed...", "CGPA: 7.57 / 10  |  Batch: 2025–2029", "Cert: Introduction to Cybersecurity — Simplilearn, 2025", "Cert: HTML Fundamentals — Sololearn, 2025", "Foundation: UPFINITY — building the digital future."],
  help: ["AVAILABLE SPELLS:", "  whoami    —  identify the wizard", "  skills    —  view skill matrix", "  projects  —  access mission archives", "  contact   —  open secure channel", "  lumos     —  activate light mode", "  nox       —  activate dark mode", "  revelio   —  reveal hidden details", "  clear     —  clear terminal"],
  clear: ["__CLEAR__"],
};

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useDecryptText(text: string, startDelay = 700) {
  const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>{}[]▓░▒";
  const [display, setDisplay] = useState(() =>
    text.split("").map(c => (c === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join("")
  );
  useEffect(() => {
    let cancelled = false;
    const startTimer = setTimeout(() => {
      let revealed = 0;
      const id = setInterval(() => {
        if (cancelled) { clearInterval(id); return; }
        revealed = Math.min(revealed + 0.7, text.length);
        const r = Math.floor(revealed);
        setDisplay(text.split("").map((c, i) => {
          if (c === " " || c === "-" || c === ".") return c;
          if (i < r) return c;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }).join(""));
        if (r >= text.length) clearInterval(id);
      }, 38);
    }, startDelay);
    return () => { cancelled = true; clearTimeout(startTimer); };
  }, [text, startDelay]);
  return display;
}

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── SPARK CURSOR ────────────────────────────────────────────────────────────

type Spark = { id: number; x: number; y: number; hue: number; size: number };
function SparkCursor({ isDark }: { isDark: boolean }) {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const counter = useRef(0);
  const lastMs = useRef(0);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMs.current < 60) return;
      lastMs.current = now;
      const id = counter.current++;
      const hue = isDark ? 180 + Math.random() * 80 : 15 + Math.random() * 30;
      setSparks(s => [...s.slice(-9), { id, x: e.clientX, y: e.clientY, hue, size: 3 + Math.random() * 4 }]);
      setTimeout(() => setSparks(s => s.filter(sp => sp.id !== id)), 700);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [isDark]);
  return (
    <div className="pointer-events-none fixed inset-0 z-[9998]">
      {sparks.map(sp => (
        <div key={sp.id} style={{
          position: "absolute", left: sp.x, top: sp.y,
          width: sp.size, height: sp.size,
          background: `hsl(${sp.hue},100%,72%)`,
          boxShadow: `0 0 ${sp.size * 2}px hsl(${sp.hue},100%,72%)`,
          borderRadius: "50%",
          animation: "spark-out 0.7s ease-out forwards",
        }} />
      ))}
    </div>
  );
}

// ─── FLOATING CANDLE ─────────────────────────────────────────────────────────

function FloatingCandle({ x, yBase, scale, delay, isDark }: { x: number; yBase: number; scale: number; delay: number; isDark: boolean }) {
  return (
    <div className="pointer-events-none absolute" style={{
      left: `${x}%`, top: `${yBase}%`,
      transform: `scale(${scale})`,
      transformOrigin: "bottom center",
      animation: `float ${3.5 + delay * 0.4}s ${delay * 0.3}s ease-in-out infinite`,
      opacity: isDark ? 0.85 : 0.5,
      zIndex: 5,
    }}>
      <svg viewBox="0 0 20 58" width="14" height="40">
        <defs>
          <radialGradient id={`flame-${delay}`} cx="50%" cy="60%">
            <stop offset="0%" stopColor="#fff9c4" stopOpacity="1" />
            <stop offset="40%" stopColor="#ffb300" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ff6f00" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Flame glow */}
        <ellipse cx="10" cy="10" rx="9" ry="9" fill={`url(#flame-${delay})`} opacity="0.35">
          <animate attributeName="rx" values="9;12;8;10;9" dur="0.5s" repeatCount="indefinite" />
          <animate attributeName="ry" values="9;11;7;9;9" dur="0.5s" repeatCount="indefinite" />
        </ellipse>
        {/* Flame body */}
        <ellipse cx="10" cy="9" rx="4.5" ry="7" fill="#ffb300" opacity="0.95">
          <animate attributeName="cx" values="10;11;9;10" dur="0.35s" repeatCount="indefinite" />
          <animate attributeName="ry" values="7;9;6;7" dur="0.4s" repeatCount="indefinite" />
        </ellipse>
        {/* Flame core */}
        <ellipse cx="10" cy="9" rx="2" ry="4" fill="#fff9c4" opacity="0.9">
          <animate attributeName="ry" values="4;5.5;3;4" dur="0.4s" repeatCount="indefinite" />
        </ellipse>
        {/* Candle body */}
        <rect x="7" y="16" width="6" height="32" rx="1.5" fill={isDark ? "#e8e0d0" : "#d4c8b8"} opacity="0.95" />
        {/* Wax drip */}
        <ellipse cx="10" cy="47" rx="5" ry="2.5" fill={isDark ? "#d4c8b8" : "#c0b4a0"} opacity="0.7" />
      </svg>
    </div>
  );
}

// ─── HERO NETWORK OVERLAY ────────────────────────────────────────────────────

function HeroNetwork({ isDark }: { isDark: boolean }) {
  const nodes = [
    { x: 9, y: 16 }, { x: 83, y: 11 }, { x: 50, y: 42 }, { x: 20, y: 74 },
    { x: 87, y: 70 }, { x: 65, y: 26 }, { x: 33, y: 58 }, { x: 72, y: 52 },
  ];
  const edges = [[0, 2], [1, 2], [2, 3], [2, 4], [0, 3], [1, 5], [5, 2], [2, 6], [6, 3], [4, 7], [5, 7], [7, 2]];
  const nc = isDark ? "#00d4ff" : "#8b2635";
  const ec = isDark ? "#7c3aed" : "#c9a84c";
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ opacity: isDark ? 0.45 : 0.3 }}>
      <defs>
        <filter id="halo"><feGaussianBlur stdDeviation="0.6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      {edges.map((edge, i) => (
        <line key={i} x1={`${nodes[edge[0]].x}%`} y1={`${nodes[edge[0]].y}%`} x2={`${nodes[edge[1]].x}%`} y2={`${nodes[edge[1]].y}%`}
          stroke={ec} strokeWidth="0.12" strokeDasharray="0.7 0.5" opacity="0.6" />
      ))}
      {nodes.map((n, i) => (
        <g key={i} filter="url(#halo)">
          <circle cx={`${n.x}%`} cy={`${n.y}%`} r="0.5" fill={nc} />
          <circle cx={`${n.x}%`} cy={`${n.y}%`} r="0.5" fill="none" stroke={nc} strokeWidth="0.2">
            <animate attributeName="r" values="0.5;2;0.5" dur={`${2 + i * 0.35}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0;1" dur={`${2 + i * 0.35}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
}

// ─── SYSTEM LOG TICKER ───────────────────────────────────────────────────────

function SystemLogTicker({ isDark }: { isDark: boolean }) {
  const [idx, setIdx] = useState(0);
  const [chars, setChars] = useState("");
  useEffect(() => {
    const line = SYS_LOGS[idx];
    let i = 0;
    setChars("");
    const id = setInterval(() => {
      i++;
      setChars(line.slice(0, i));
      if (i >= line.length) {
        clearInterval(id);
        setTimeout(() => setIdx(p => (p + 1) % SYS_LOGS.length), 1800);
      }
    }, 28);
    return () => clearInterval(id);
  }, [idx]);
  return (
    <div className="absolute bottom-24 left-6 right-6 md:left-auto md:right-8 md:max-w-sm z-10 pointer-events-none">
      <div className="rounded px-4 py-3" style={{ background: isDark ? "rgba(8,8,15,0.7)" : "rgba(245,230,200,0.75)", border: `1px solid ${isDark ? "rgba(0,212,255,0.25)" : "rgba(139,38,53,0.2)"}`, backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-2 mb-2" style={{ borderBottom: `1px solid ${isDark ? "rgba(0,212,255,0.15)" : "rgba(139,38,53,0.15)"}`, paddingBottom: "6px" }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: isDark ? "#10b981" : "#059669", animation: "glow-pulse 1.5s ease-in-out infinite" }} />
          <span className="font-mono text-[9px] tracking-[0.25em]" style={{ color: isDark ? "#8b8ca8" : "#6b5a3e", fontFamily: F_MONO }}>ARCANE_SYS.LOG</span>
        </div>
        <div className="font-mono text-[10px] tracking-wide min-h-[1.2em]" style={{ color: isDark ? "#00d4ff" : "#8b2635", fontFamily: F_MONO }}>
          {chars}<span style={{ animation: "blink 0.8s step-end infinite", opacity: 1 }}>▌</span>
        </div>
      </div>
    </div>
  );
}

// ─── SECTION UTILITIES ───────────────────────────────────────────────────────

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  );
}

function SectionHeader({ eyebrow, title, subtitle, isDark }: { eyebrow: string; title: string; subtitle?: string; isDark: boolean }) {
  const g = isDark ? "#c9a84c" : "#8b2635";
  const a = isDark ? "#00d4ff" : "#8b2635";
  return (
    <Reveal className="mb-16 text-center">
      <div className="font-mono text-[10px] tracking-[0.4em] mb-4" style={{ color: a, fontFamily: F_MONO }}>{eyebrow}</div>
      <h2 style={{ fontFamily: F_DISPLAY, fontSize: "clamp(2rem,5vw,3.5rem)", color: isDark ? "#e8e0d0" : "#2d1a0e", fontWeight: 700, lineHeight: 1.15, marginBottom: "1rem" }}>{title}</h2>
      {subtitle && <p style={{ fontFamily: F_BODY, fontSize: "1.1rem", color: isDark ? "#8b8ca8" : "#6b5a3e", maxWidth: "480px", margin: "0 auto" }}>{subtitle}</p>}
      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="h-px w-20" style={{ background: isDark ? "rgba(201,168,76,0.35)" : "rgba(139,38,53,0.25)" }} />
        <div className="w-2 h-2 rotate-45" style={{ background: g }} />
        <div className="h-px w-20" style={{ background: isDark ? "rgba(201,168,76,0.35)" : "rgba(139,38,53,0.25)" }} />
      </div>
    </Reveal>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar({ isDark, setIsDark, scrollTo }: { isDark: boolean; setIsDark: (v: boolean) => void; scrollTo: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const gold = isDark ? "#c9a84c" : "#8b2635";
  const bg = isDark
    ? (scrolled ? "rgba(8,8,15,0.94)" : "rgba(8,8,15,0.15)")
    : (scrolled ? "rgba(245,230,200,0.95)" : "rgba(245,230,200,0.2)");
  const bdr = isDark ? "rgba(201,168,76,0.2)" : "rgba(139,38,53,0.2)";
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{ background: bg, borderBottom: `1px solid ${bdr}`, backdropFilter: "blur(18px)" }}>
        <div className="max-w-7xl mx-auto px-5 h-[62px] flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2.5">
            <div className="w-8 h-8 flex items-center justify-center" style={{ border: `1px solid ${gold}`, background: `${gold}12` }}>
              <img src={profileImg} alt="Logo" className="w-7 h-7" />
            </div>
            <span className="hidden sm:block font-mono text-[10px] tracking-[0.3em]" style={{ color: gold, fontFamily: F_MONO }}>KRISHSUDHARSUN</span>
          </button>
          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map(n => (
              <button key={n} onClick={() => scrollTo(n.toLowerCase())}
                className="font-mono text-[10px] tracking-[0.2em] opacity-65 hover:opacity-100 transition-opacity"
                style={{ color: isDark ? "#e8e0d0" : "#2d1a0e", fontFamily: F_MONO }}>{n}</button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsDark(!isDark)}
              className="px-3 py-1.5 font-mono text-[10px] tracking-[0.25em] border transition-all duration-300"
              style={{ borderColor: gold, color: gold, background: `${gold}0a`, fontFamily: F_MONO }}>
              {isDark ? "LUMOS" : "NOX"}
            </button>
            <a href="https://github.com/krishsudharsun" target="_blank" rel="noopener noreferrer" className="opacity-55 hover:opacity-100 transition-opacity" style={{ color: isDark ? "#e8e0d0" : "#2d1a0e" }}>
              <Github size={17} />
            </a>
            <button className="lg:hidden opacity-60" onClick={() => setMobile(true)} style={{ color: isDark ? "#e8e0d0" : "#2d1a0e" }}><Menu size={22} /></button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobile(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="relative ml-auto w-72 h-full p-8 flex flex-col gap-5"
              style={{ background: isDark ? "#0d0e1e" : "#faf0dc", borderLeft: `1px solid ${bdr}` }}>
              <button onClick={() => setMobile(false)} className="self-end opacity-50" style={{ color: isDark ? "#e8e0d0" : "#2d1a0e" }}><X size={22} /></button>
              {NAV.map(n => (
                <button key={n} onClick={() => { scrollTo(n.toLowerCase()); setMobile(false); }}
                  className="text-left tracking-[0.18em] opacity-75 hover:opacity-100 transition-opacity"
                  style={{ fontFamily: F_HEADING, fontSize: "14px", color: isDark ? "#e8e0d0" : "#2d1a0e" }}>{n}</button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── HERO SECTION ────────────────────────────────────────────────────────────

const CANDLES = [
  { x: 5, yBase: 22, scale: 1.1, delay: 0 },
  { x: 15, yBase: 18, scale: 0.8, delay: 2 },
  { x: 27, yBase: 28, scale: 1.0, delay: 4 },
  { x: 38, yBase: 15, scale: 0.7, delay: 1 },
  { x: 62, yBase: 20, scale: 0.9, delay: 3 },
  { x: 73, yBase: 14, scale: 1.2, delay: 5 },
  { x: 82, yBase: 25, scale: 0.75, delay: 1.5 },
  { x: 90, yBase: 18, scale: 1.0, delay: 3.5 },
  { x: 95, yBase: 30, scale: 0.85, delay: 2.5 },
];

function HeroSection({ isDark, scrollTo }: { isDark: boolean; scrollTo: (id: string) => void }) {
  const heroName = useDecryptText("KRISHSUDHARSUN", 1000);
  const overlayBg = isDark
    ? "linear-gradient(to bottom, rgba(8,8,15,0.6) 0%, rgba(8,8,15,0.42) 45%, rgba(8,8,15,0.98) 100%)"
    : "linear-gradient(to bottom, rgba(245,230,200,0.68) 0%, rgba(245,230,200,0.5) 45%, rgba(245,230,200,0.99) 100%)";
  const gold = isDark ? "#c9a84c" : "#8b2635";
  const cyan = isDark ? "#00d4ff" : "#6d28d9";

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Castle background */}
      <div className="absolute inset-0 bg-gray-900">
        <img src={CASTLE_IMG} alt="Gothic castle shrouded in night fog" className="w-full h-full object-cover object-center" style={{ opacity: isDark ? 0.72 : 0.6 }} />
      </div>
      {/* Colour overlay */}
      <div className="absolute inset-0" style={{ background: overlayBg }} />
      {/* Network topology */}
      <HeroNetwork isDark={isDark} />
      {/* Floating candles */}
      {CANDLES.map((c, i) => <FloatingCandle key={i} {...c} isDark={isDark} />)}
      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${cyan}80, transparent)`, animation: "scan-line 7s linear infinite", opacity: 0.45 }} />
      </div>
      {/* HUD corners */}
      {[["top-8 left-8", "border-t-2 border-l-2"], ["top-8 right-8", "border-t-2 border-r-2"], ["bottom-[88px] left-8", "border-b-2 border-l-2"], ["bottom-[88px] right-8", "border-b-2 border-r-2"]].map(([pos, cls], i) => (
        <div key={i} className={`absolute ${pos} w-7 h-7 ${cls} opacity-35`} style={{ borderColor: gold }} />
      ))}

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
        {/* Status badge */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
          style={{ border: `1px solid ${cyan}55`, background: `${cyan}0c`, fontFamily: F_MONO }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: isDark ? "#10b981" : "#059669", animation: "glow-pulse 2s ease-in-out infinite" }} />
          <span className="font-mono text-[9px] tracking-[0.35em]" style={{ color: cyan }}>ARCANE SECURITY SYSTEM • ONLINE</span>
        </motion.div>

        {/* Decrypting name */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <h1 style={{ fontFamily: F_DISPLAY, fontSize: "clamp(2.2rem,7vw,5.5rem)", color: isDark ? "#e8e0d0" : "#2d1a0e", fontWeight: 900, lineHeight: 1.05, letterSpacing: "0.04em", marginBottom: "1.2rem" }}>
            {heroName}
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }}
          className="tracking-[0.18em] mb-5"
          style={{ fontFamily: F_MONO, fontSize: "clamp(0.9rem,2.5vw,1.3rem)", color: gold }}>
          I BUILD. I SECURE. I INVESTIGATE.
        </motion.p>

        {/* Description */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.1 }}
          className="max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: F_BODY, fontSize: "clamp(1rem,2vw,1.2rem)", color: isDark ? "#c8bfaf" : "#4a3728" }}>
          Computer Science Engineer exploring cybersecurity, development, backend systems, OSINT and digital security.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <button onClick={() => scrollTo("projects")}
            className="group relative overflow-hidden flex items-center gap-2 px-8 py-3.5 font-mono text-[11px] tracking-[0.25em] transition-all duration-300"
            style={{ background: gold, color: isDark ? "#08080f" : "#faf0dc", fontFamily: F_MONO }}>
            <span className="relative z-10 flex items-center gap-2">EXPLORE MY WORK <ArrowRight size={14} /></span>
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" style={{ background: isDark ? "#b8943c" : "#6b1c28" }} />
          </button>
          <button onClick={() => scrollTo("contact")}
            className="flex items-center gap-2 px-8 py-3.5 font-mono text-[11px] tracking-[0.25em] border transition-all duration-300 hover:opacity-75"
            style={{ border: `1px solid ${gold}70`, color: gold, fontFamily: F_MONO }}>
            CONTACT ME
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.5 }}
          className="flex items-center justify-center gap-8">
          {[{ icon: Github, label: "GitHub", href: "https://github.com/Krishsudharsun" }, { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/krishsudharsun-l-483525277/" }, { icon: Download, label: "Resume", href: "Krishsudharsun-resume.pdf" }].map(({ icon: Icon, label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 opacity-55 hover:opacity-100 transition-opacity font-mono text-[10px] tracking-widest"
              style={{ color: isDark ? "#e8e0d0" : "#2d1a0e", fontFamily: F_MONO }}>
              <Icon size={14} />{label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* System log */}
      <SystemLogTicker isDark={isDark} />

      {/* Scroll hint */}
      <button onClick={() => scrollTo("portal")} className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 opacity-35 hover:opacity-70 transition-opacity" style={{ animation: "float 3s ease-in-out infinite" }}>
        <ChevronDown size={26} style={{ color: gold }} />
      </button>
    </section>
  );
}

// ─── PORTAL SECTION ──────────────────────────────────────────────────────────

function PortalSection({ isDark, scrollTo }: { isDark: boolean; scrollTo: (id: string) => void }) {
  const [stage, setStage] = useState(0);
  const { ref, visible } = useInView(0.5);
  useEffect(() => {
    if (!visible || stage > 0) return;
    const t1 = setTimeout(() => setStage(1), 300);
    const t2 = setTimeout(() => setStage(2), 2200);
    const t3 = setTimeout(() => setStage(3), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [visible]);

  const archColor = stage === 3 ? (isDark ? "#00d4ff" : "#059669") : (isDark ? "#c9a84c" : "#8b2635");
  const bg = isDark
    ? "linear-gradient(to bottom, transparent, rgba(8,8,15,0.95), rgba(8,8,15,0.95), transparent)"
    : "linear-gradient(to bottom, transparent, rgba(245,230,200,0.95), rgba(245,230,200,0.95), transparent)";

  return (
    <section id="portal" ref={ref as React.RefObject<HTMLElement>} className="py-20 flex flex-col items-center justify-center overflow-hidden" style={{ background: bg }}>
      {/* Arch */}
      <div className="relative mb-8">
        <svg viewBox="0 0 300 370" width={200} height={247} className="overflow-visible">
          <defs>
            <filter id="arch-glow"><feGaussianBlur stdDeviation={stage === 3 ? "3" : "1.5"} result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          {/* Outer arch */}
          <path d="M 22,370 L 22,162 Q 22,12 150,12 Q 278,12 278,162 L 278,370" fill="none" stroke={archColor} strokeWidth="2.5" opacity="0.8" filter="url(#arch-glow)" />
          {/* Middle arch */}
          <path d="M 44,370 L 44,172 Q 44,38 150,38 Q 256,38 256,172 L 256,370" fill="none" stroke={archColor} strokeWidth="1.5" opacity="0.45" />
          {/* Portal void */}
          <path d="M 66,370 L 66,185 Q 66,66 150,66 Q 234,66 234,185 L 234,370"
            fill={stage === 3 ? `${archColor}14` : isDark ? "rgba(8,8,15,0.75)" : "rgba(245,230,200,0.5)"}
            style={{ transition: "fill 1s ease" }} />

          {/* Scan beam (stage 1-2) */}
          {(stage === 1 || stage === 2) && (
            <line x1="66" x2="234" y1="66" y2="66" stroke={archColor} strokeWidth="1.5" opacity="0.7">
              <animate attributeName="y1" values="66;370" dur="1.8s" fill="freeze" />
              <animate attributeName="y2" values="66;370" dur="1.8s" fill="freeze" />
              <animate attributeName="opacity" values="0.7;0.4;0.7" dur="0.3s" repeatCount="indefinite" />
            </line>
          )}

          {/* Keystone decoration */}
          <polygon points="150,6 158,20 142,20" fill={archColor} opacity={stage > 0 ? 0.9 : 0.4} />
          <circle cx="22" cy="162" r="4" fill={archColor} opacity="0.7" />
          <circle cx="278" cy="162" r="4" fill={archColor} opacity="0.7" />

          {/* Arch rune diamonds */}
          {[0.15, 0.35, 0.55, 0.75, 0.9].map((t, i) => {
            const a = Math.PI + t * Math.PI;
            const cx = 150 + 128 * Math.cos(a), cy = 162 + 150 * Math.sin(a);
            return <rect key={i} x={cx - 3.5} y={cy - 3.5} width="7" height="7" fill={archColor} opacity={stage > 0 ? 0.6 : 0.2} transform={`rotate(45,${cx},${cy})`} />;
          })}
        </svg>

        {/* Stage overlay text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ paddingTop: "50px" }}>
          <AnimatePresence mode="wait">
            {stage === 0 && <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-mono text-[11px] tracking-[0.3em]" style={{ color: archColor, fontFamily: F_MONO }}>◆ AWAITING ◆</motion.div>}
            {stage === 1 && <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-2">
              <div className="font-mono text-[10px] tracking-[0.3em]" style={{ color: archColor, fontFamily: F_MONO }}>SYSTEM SCAN</div>
              <div className="font-mono text-[9px] tracking-wider opacity-60" style={{ color: archColor, fontFamily: F_MONO }}>IN PROGRESS...</div>
            </motion.div>}
            {stage === 2 && <motion.div key="verify" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-1">
              <div className="font-mono text-[9px] tracking-[0.2em]" style={{ color: archColor, fontFamily: F_MONO }}>VERIFYING CREDENTIALS</div>
              <div className="font-mono text-[9px] opacity-50" style={{ color: archColor, fontFamily: F_MONO }}>100%</div>
            </motion.div>}
            {stage === 3 && <motion.div key="granted" initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="font-mono text-[10px] tracking-[0.4em] mb-1" style={{ color: archColor, fontFamily: F_MONO }}>ACCESS</div>
              <div className="font-mono text-xl tracking-[0.3em] font-bold" style={{ color: archColor, fontFamily: F_MONO, animation: "glow-pulse 2s ease-in-out infinite" }}>GRANTED</div>
            </motion.div>}
          </AnimatePresence>
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-3 font-mono text-[9px] tracking-[0.2em]" style={{ fontFamily: F_MONO }}>
        {[["ENTER ARCHIVE", 1], ["SYSTEM SCAN", 2], ["ACCESS GRANTED", 3]].map(([label, s], i) => (
          <div key={i} className="flex items-center gap-3">
            <span style={{ color: stage >= (s as number) ? archColor : (isDark ? "#8b8ca8" : "#6b5a3e"), transition: "color 0.5s" }}>{label as string}</span>
            {i < 2 && <ArrowRight size={10} opacity={0.35} style={{ color: isDark ? "#8b8ca8" : "#6b5a3e" }} />}
          </div>
        ))}
      </div>

      {stage === 3 && (
        <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          onClick={() => scrollTo("about")}
          className="mt-8 font-mono text-[10px] tracking-[0.3em] border px-6 py-2.5 transition-all duration-300 hover:opacity-75"
          style={{ borderColor: `${archColor}50`, color: archColor, fontFamily: F_MONO }}>
          ENTER THE ARCHIVE
        </motion.button>
      )}
    </section>
  );
}

// ─── ABOUT SECTION ───────────────────────────────────────────────────────────

function AboutSection({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(13,14,30,0.88)" : "rgba(250,240,220,0.95)";
  const bdr = isDark ? "rgba(124,58,237,0.28)" : "rgba(139,38,53,0.2)";
  const gold = isDark ? "#c9a84c" : "#8b2635";
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="// SECTION 01" title="THE WIZARD BEHIND THE CODE" isDark={isDark} />
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>

            <div className="space-y-4" style={{ fontFamily: F_BODY }}>
              <p style={{ fontSize: "1.15rem", lineHeight: 1.75, color: isDark ? "#c8bfaf" : "#4a3728" }}>
                Wotcher! I’m a Computer Science Engineering student at Misrimal Navajee Munoth Jain Engineering College (2025–2029), driven by a deep curiosity for cybersecurity, digital investigation, and systems architecture. I enjoy exploring how technology works beneath the surface, understanding complex systems, and constantly experimenting with new ideas, tools, and technologies.
              </p>

              <p style={{ fontSize: "1.15rem", lineHeight: 1.75, color: isDark ? "#c8bfaf" : "#4a3728" }}>
                As the founder of <strong style={{ color: gold }}>UPFINITY</strong>, I lead multi-disciplinary teams delivering high-quality digital products. My work spans OSINT research, reverse engineering, network analysis, and full-stack development. Through these experiences, I’ve developed a strong interest in building practical solutions while also understanding how systems can be analyzed, secured, and improved.
              </p>

              <p style={{ fontSize: "1.15rem", lineHeight: 1.75, color: isDark ? "#c8bfaf" : "#4a3728" }}>
                For me, technology is more than just writing code — it’s about understanding the bigger picture, discovering how systems communicate, finding weaknesses, and creating solutions that are both functional and secure.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="space-y-4">
              {/* Terminal */}
              <div className="rounded px-0 overflow-hidden" style={{ background: "#08080e", border: `1px solid ${isDark ? "rgba(0,212,255,0.22)" : "rgba(124,58,237,0.35)"}` }}>
                <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: "#0d0e1e", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  {["#ef4444", "#f59e0b", "#10b981"].map((c, i) => <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}
                  <span className="ml-2 text-[9px] tracking-widest text-[#8b8ca8]" style={{ fontFamily: F_MONO }}>arcane-terminal — wizard@headquarters</span>
                </div>
                <div className="p-5 space-y-2 font-mono text-[11px]" style={{ fontFamily: F_MONO }}>
                  {[
                    { k: "user", v: "krishsudharsun_l", c: "#c9a84c" },
                    { k: "role", v: "CS Engineer + Security Researcher + Founder", c: "#00d4ff" },
                    { k: "company", v: "UPFINITY", c: "#10b981" },
                    { k: "domain", v: "Cybersecurity · OSINT · Backend · Linux", c: "#7c3aed" },
                    { k: "base", v: "India", c: "#a78bfa" },
                    { k: "status", v: "ONLINE — Building the future", c: "#c9a84c" },
                  ].map(({ k, v, c }) => (
                    <div key={k} className="flex gap-2">
                      <span className="text-[#8b8ca8]">{k}:</span>
                      <span style={{ color: c }}>{v}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-[#8b8ca8]">$</span>
                    <span className="inline-block w-1.5 h-3.5 bg-[#00d4ff] ml-0.5" style={{ animation: "blink 1s step-end infinite" }} />
                  </div>
                </div>
              </div>

              {/* Highlight grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Shield, label: "Cybersecurity", text: "OSINT · Recon · Vulnerability Research" },
                  { icon: Code, label: "Development", text: "Python · JavaScript · Backend Systems" },
                  { icon: Database, label: "Data & Systems", text: "MongoDB · MySQL · Linux Admin" },
                  { icon: upfinityLogo, label: "UPFINITY", text: "Founder — building digital futures" },
                ].map(({ icon: Icon, label, text }) => (
                  <div key={label} className="p-4 rounded transition-all duration-300 hover:scale-[1.02]" style={{ background: cardBg, border: `1px solid ${bdr}`, backdropFilter: "blur(8px)" }}>
                    <Icon size={17} className="mb-2" style={{ color: gold }} />
                    <div className="font-semibold text-sm mb-1" style={{ fontFamily: F_HEADING, color: isDark ? "#e8e0d0" : "#2d1a0e" }}>{label}</div>
                    <div className="text-[10px] leading-relaxed" style={{ fontFamily: F_MONO, color: isDark ? "#8b8ca8" : "#6b5a3e" }}>{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE SECTION ──────────────────────────────────────────────────────

function ExperienceSection({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(13,14,30,0.88)" : "rgba(250,240,220,0.95)";
  const bdr = isDark ? "rgba(124,58,237,0.25)" : "rgba(139,38,53,0.18)";
  return (
    <section id="experience" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader eyebrow="// SECTION 02" title="CHRONICLES & MISSIONS" subtitle="A record of operations, roles and endeavours across the UPFINITY command structure." isDark={isDark} />
        <div className="relative">
          <div className="absolute left-6 md:left-7 top-0 bottom-0 w-px" style={{ background: isDark ? "rgba(201,168,76,0.2)" : "rgba(139,38,53,0.15)" }} />
          <div className="space-y-9">
            {EXPERIENCE_DATA.map((exp, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="relative flex gap-8 md:gap-12 pl-14 md:pl-20">
                  <div className="absolute left-4 md:left-5 top-6 w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: exp.color, background: isDark ? "#08080f" : "#f5e6c8" }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: exp.color, animation: "glow-pulse 2.5s ease-in-out infinite" }} />
                  </div>
                  <div className="flex-1 p-6 rounded transition-all duration-300 hover:translate-x-1" style={{ background: cardBg, border: `1px solid ${bdr}`, backdropFilter: "blur(8px)" }}>
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="font-semibold text-lg mb-0.5" style={{ fontFamily: F_HEADING, color: isDark ? "#e8e0d0" : "#2d1a0e" }}>{exp.role}</div>
                        <div className="font-mono text-[10px] tracking-[0.25em]" style={{ color: exp.color, fontFamily: F_MONO }}>{exp.company}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className="px-2.5 py-0.5 font-mono text-[9px] tracking-widest" style={{ background: `${exp.color}18`, color: exp.color, border: `1px solid ${exp.color}40`, fontFamily: F_MONO }}>{exp.badge}</span>
                        <span className="font-mono text-[10px] opacity-55" style={{ fontFamily: F_MONO, color: isDark ? "#8b8ca8" : "#6b5a3e" }}>{exp.period}</span>
                      </div>
                    </div>
                    <p className="mb-4 leading-relaxed" style={{ fontFamily: F_BODY, fontSize: "1.05rem", color: isDark ? "#a89f92" : "#4a3728" }}>{exp.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 font-mono text-[9px]" style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", color: isDark ? "#8b8ca8" : "#6b5a3e", border: `1px solid ${bdr}`, fontFamily: F_MONO }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── POTION BOTTLE ───────────────────────────────────────────────────────────

function PotionBottle({ name, level, color, sym, isDark }: { name: string; level: number; color: string; sym: string; isDark: boolean }) {
  const id = name.replace(/\s/g, "");
  return (
    <div className="flex flex-col items-center gap-3 group cursor-default select-none">
      <div style={{ position: "relative", width: 68, height: 118 }}>
        <svg viewBox="0 0 68 118" width="68" height="118">
          <defs>
            <clipPath id={`bc-${id}`}><path d="M21,54 L16,74 Q14,98 34,102 Q54,98 52,74 L47,54 Z" /></clipPath>
            <linearGradient id={`bl-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.95" />
              <stop offset="100%" stopColor={color} stopOpacity="0.45" />
            </linearGradient>
            <filter id={`bg-${id}`}><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          {/* Cork cap */}
          <rect x="26" y="6" width="16" height="6" rx="1.5" fill={isDark ? "#5c4033" : "#4a3728"} />
          {/* Cork body */}
          <rect x="24" y="12" width="20" height="9" rx="2" fill={isDark ? "#8b7355" : "#6b5a3e"} />
          {/* Neck */}
          <rect x="23" y="21" width="22" height="33" rx="2" fill="none" stroke={color} strokeWidth="1.5" opacity="0.55" />
          <rect x="24" y="22" width="20" height="31" fill={color} opacity={level > 75 ? 0.22 : 0.06} rx="1" />
          {/* Body */}
          <path d="M21,54 L16,74 Q14,98 34,102 Q54,98 52,74 L47,54 Z" fill="none" stroke={color} strokeWidth="1.8" filter={`url(#bg-${id})`} />
          {/* Liquid */}
          <g clipPath={`url(#bc-${id})`}>
            <rect x="12" y={102 - (48 * level / 100)} width="44" height={48 * level / 100} fill={`url(#bl-${id})`}
              style={{ animation: `liquid-wave 3s ${name.length * 0.15}s ease-in-out infinite` }} />
          </g>
          {/* Glass shimmer */}
          <path d="M23,58 L22,76 Q21,87 26,93" stroke="white" strokeWidth="1.2" opacity="0.18" fill="none" strokeLinecap="round" />
          {/* Symbol */}
          <text x="34" y="80" textAnchor="middle" fontSize="9" fill={color} opacity="0.65" fontFamily="Georgia, serif">{sym}</text>
          {/* Outer glow */}
          <ellipse cx="34" cy="78" rx="22" ry="26" fill="none" stroke={color} strokeWidth="0.5" opacity="0" className="group-hover:opacity-40" style={{ transition: "opacity 0.4s" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, boxShadow: `0 0 0px ${color}00`, transition: "box-shadow 0.4s" }} className="group-hover:[box-shadow:0_0_28px_var(--gc)]" />
      </div>
      <div className="text-center">
        <div className="font-mono text-[10px] tracking-[0.22em] font-semibold" style={{ color, fontFamily: F_MONO }}>{name.toUpperCase()}</div>
        <div className="font-mono text-[9px] opacity-45 mt-0.5" style={{ color: isDark ? "#8b8ca8" : "#6b5a3e", fontFamily: F_MONO }}>{level}%</div>
      </div>
    </div>
  );
}

// ─── SKILLS SECTION ──────────────────────────────────────────────────────────

function SkillsSection({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(13,14,30,0.88)" : "rgba(250,240,220,0.95)";
  const bdr = isDark ? "rgba(124,58,237,0.25)" : "rgba(139,38,53,0.18)";
  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="// SECTION 03" title="SECURITY MINDSET" subtitle="Arcane Security Council — active modules across recon, security, development and data." isDark={isDark} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
          {SKILL_CATS.map(cat => {
            const Icon = cat.icon;
            return (
              <Reveal key={cat.id}>
                <div className="p-6 rounded group hover:scale-[1.015] transition-all duration-300 h-full" style={{ background: cardBg, border: `1px solid ${bdr}`, backdropFilter: "blur(8px)" }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 flex items-center justify-center" style={{ background: `${cat.color}14`, border: `1px solid ${cat.color}38` }}>
                      <Icon size={16} style={{ color: cat.color }} />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.28em]" style={{ color: cat.color, fontFamily: F_MONO }}>{cat.label}</div>
                      <div className="font-mono text-[8px] tracking-widest opacity-35" style={{ fontFamily: F_MONO, color: isDark ? "#8b8ca8" : "#6b5a3e" }}>MODULE ACTIVE</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {cat.skills.map(sk => (
                      <div key={sk.name}>
                        <div className="flex justify-between mb-1.5">
                          <span className="font-mono text-[10px]" style={{ color: isDark ? "#c8bfaf" : "#4a3728", fontFamily: F_MONO }}>{sk.name}</span>
                          <span className="font-mono text-[10px]" style={{ color: cat.color, fontFamily: F_MONO }}>{sk.level}%</span>
                        </div>
                        <div className="h-0.5 rounded-full overflow-hidden" style={{ background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)" }}>
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${sk.level}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                            className="h-full rounded-full" style={{ background: `linear-gradient(to right, ${cat.color}, ${cat.color}80)` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Potion bottles */}
        <Reveal>
          <div className="text-center mb-10">
            <div className="font-mono text-[10px] tracking-[0.35em] mb-2" style={{ color: isDark ? "#c9a84c" : "#8b2635", fontFamily: F_MONO }}>
              ◆ ARCANE POTION STORES — SKILL ELIXIRS ACTIVE ◆
            </div>
            <div className="h-px max-w-xs mx-auto" style={{ background: isDark ? "rgba(201,168,76,0.2)" : "rgba(139,38,53,0.15)" }} />
          </div>
          <div className="flex flex-wrap items-end justify-center gap-8 md:gap-14">
            {POTIONS.map(p => <PotionBottle key={p.name} {...p} isDark={isDark} />)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── MARAUDER'S MAP ──────────────────────────────────────────────────────────

function MaraudersMapSection({ isDark, scrollTo }: { isDark: boolean; scrollTo: (id: string) => void }) {
  const p = isDark ? "#1c1508" : "#f0dba5";
  const ink = isDark ? "#c9a84c" : "#4a3010";
  const inkF = isDark ? "rgba(201,168,76,0.22)" : "rgba(74,48,16,0.28)";
  const ns = isDark ? "#00d4ff" : "#8b2635";
  const ec = isDark ? "rgba(124,58,237,0.55)" : "rgba(139,38,53,0.4)";
  return (
    <section id="map" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="⟨ NETWORK ONLINE ⟩  ⟨ ENCRYPTION ACTIVE ⟩" title="MARAUDER'S NETWORK" subtitle="An enchanted cartography of the arcane architecture — every node a chapter, every path a connection." isDark={isDark} />
        <Reveal>
          <div className="relative overflow-hidden" style={{ border: `1px solid ${isDark ? "rgba(201,168,76,0.3)" : "rgba(74,48,16,0.3)"}` }}>
            <svg viewBox="0 0 900 420" className="w-full" style={{ background: p }}>
              {/* Parchment grid */}
              {Array.from({ length: 22 }, (_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 20} x2="900" y2={i * 20} stroke={inkF} strokeWidth="0.4" />
              ))}
              {Array.from({ length: 19 }, (_, i) => (
                <line key={`v${i}`} x1={i * 52} y1="0" x2={i * 52} y2="420" stroke={inkF} strokeWidth="0.4" />
              ))}

              {/* Ink map paths */}
              <path d="M 70,100 Q 210,55 360,145 Q 480,210 600,130 Q 720,75 840,120" stroke={ink} strokeWidth="1.4" fill="none" opacity="0.32" strokeLinecap="round" />
              <path d="M 80,300 Q 240,255 390,305 Q 520,355 660,290 Q 760,255 855,315" stroke={ink} strokeWidth="1.4" fill="none" opacity="0.32" strokeLinecap="round" />
              <path d="M 175,115 Q 295,175 440,225" stroke={ink} strokeWidth="0.9" fill="none" opacity="0.22" />
              <path d="M 440,225 Q 568,210 680,95" stroke={ink} strokeWidth="0.9" fill="none" opacity="0.22" />
              <path d="M 175,115 Q 158,228 195,340" stroke={ink} strokeWidth="0.9" fill="none" opacity="0.22" />
              <path d="M 195,340 Q 385,380 720,345" stroke={ink} strokeWidth="0.9" fill="none" opacity="0.22" />
              <path d="M 680,95 Q 732,220 720,345" stroke={ink} strokeWidth="0.9" fill="none" opacity="0.22" />
              <path d="M 440,225 Q 568,298 720,345" stroke={ink} strokeWidth="0.9" fill="none" opacity="0.22" />
              <path d="M 175,115 Q 420,80 680,95" stroke={ink} strokeWidth="0.9" fill="none" opacity="0.18" />

              {/* Network edges */}
              {MAP_EDGES.map((edge, i) => (
                <line key={i} x1={MAP_NODES[edge[0]].cx} y1={MAP_NODES[edge[0]].cy} x2={MAP_NODES[edge[1]].cx} y2={MAP_NODES[edge[1]].cy}
                  stroke={ec} strokeWidth="1.2" strokeDasharray="5 3">
                  <animate attributeName="stroke-dashoffset" values="0;-16" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
                </line>
              ))}

              {/* Animated footstep dots */}
              {MAP_EDGES.slice(0, 5).map((edge, i) => (
                <g key={i}>
                  <path id={`mp-${i}`} d={`M${MAP_NODES[edge[0]].cx},${MAP_NODES[edge[0]].cy} L${MAP_NODES[edge[1]].cx},${MAP_NODES[edge[1]].cy}`} fill="none" opacity="0" />
                  <circle r="3.5" fill={ns} opacity="0.8">
                    <animateMotion dur={`${5 + i * 1.2}s`} repeatCount="indefinite" begin={`${i * 1.1}s`}>
                      <mpath href={`#mp-${i}`} />
                    </animateMotion>
                  </circle>
                </g>
              ))}

              {/* Nodes */}
              {MAP_NODES.map((n, i) => (
                <g key={n.id} className="cursor-pointer" onClick={() => scrollTo(n.id)}>
                  <circle cx={n.cx} cy={n.cy} r="18" fill="none" stroke={ns} strokeWidth="0.8" opacity="0">
                    <animate attributeName="r" values="18;32;18" dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.5}s`} />
                    <animate attributeName="opacity" values="0.5;0;0.5" dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.5}s`} />
                  </circle>
                  <circle cx={n.cx} cy={n.cy} r="11" fill={p} stroke={ns} strokeWidth="1.8" />
                  <circle cx={n.cx} cy={n.cy} r="5" fill={ns} opacity="0.85">
                    <animate attributeName="opacity" values="0.85;1;0.85" dur={`${1.8 + i * 0.2}s`} repeatCount="indefinite" />
                  </circle>
                  <text x={n.cx} y={n.cy + 26} textAnchor="middle" fontSize="8.5" fontFamily="'JetBrains Mono', monospace" fill={ink} fontWeight="bold">{n.label}</text>
                </g>
              ))}

              {/* Compass rose */}
              <g transform="translate(858,35)">
                <circle cx="0" cy="0" r="16" fill="none" stroke={ink} strokeWidth="0.8" opacity="0.5" />
                <polygon points="0,-14 2,-3 0,0 -2,-3" fill={ink} opacity="0.7" />
                <polygon points="0,14 2,3 0,0 -2,3" fill={ink} opacity="0.35" />
                <polygon points="-14,0 -3,2 0,0 -3,-2" fill={ink} opacity="0.35" />
                <polygon points="14,0 3,2 0,0 3,-2" fill={ink} opacity="0.35" />
                <text y="5" textAnchor="middle" fontSize="5" fill={ink} fontFamily="'JetBrains Mono', monospace" opacity="0.7">N</text>
              </g>

              {/* Corner ornaments */}
              {[[20, 20, 1, 1], [880, 20, -1, 1], [20, 400, 1, -1], [880, 400, -1, -1]].map(([x, y, sx, sy], i) => (
                <g key={i} transform={`translate(${x},${y}) scale(${sx},${sy})`}>
                  <path d="M0,0 L22,0 M0,0 L0,22" stroke={ink} strokeWidth="1.8" opacity="0.55" />
                  <circle cx="6" cy="6" r="2.5" fill={ink} opacity="0.35" />
                </g>
              ))}

              {/* Map title + status */}
              <text x="450" y="28" textAnchor="middle" fontSize="10" fontFamily="'Cinzel', serif" fill={ink} opacity="0.5" letterSpacing="5">ARCANE NETWORK MAP — CLASSIFIED</text>
              <text x="450" y="410" textAnchor="middle" fontSize="7.5" fontFamily="'JetBrains Mono', monospace" fill={ink} opacity="0.45">
                NETWORK ONLINE  ◆  ENCRYPTION ACTIVE  ◆  NODES: 5  ◆  UPTIME: ∞
              </text>
            </svg>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-5 flex flex-wrap justify-center gap-5">
            {[{ l: "NETWORK ONLINE", c: isDark ? "#10b981" : "#059669" }, { l: "ENCRYPTION ACTIVE", c: isDark ? "#00d4ff" : "#0284c7" }, { l: "NODES: 5", c: isDark ? "#c9a84c" : "#8b2635" }].map(({ l, c }) => (
              <div key={l} className="flex items-center gap-2 font-mono text-[9px] tracking-[0.25em]" style={{ color: c, fontFamily: F_MONO }}>
                <div className="w-1.5 h-1.5 rounded-full bg-current" style={{ animation: "glow-pulse 2s ease-in-out infinite" }} />
                {l}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── BOOK CARD (3D FLIP) ─────────────────────────────────────────────────────

function BookCard({ proj, isDark }: { proj: typeof PROJECTS_DATA[0]; isDark: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = proj.icon;
  const cardBg = isDark ? "#0d0e1e" : "#faf0dc";
  const pagesBg = isDark ? "#10122a" : "#f0e8d8";
  const bdr = isDark ? "rgba(124,58,237,0.25)" : "rgba(139,38,53,0.18)";

  return (
    <div style={{ perspective: "1100px", cursor: "pointer" }} className="h-80"
      onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)}>
      <div style={{
        position: "relative", width: "100%", height: "100%",
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 0.65s cubic-bezier(0.4,0,0.2,1)",
      }}>
        {/* FRONT: Cover */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          background: cardBg, border: `1px solid ${proj.spineColor}45`, overflow: "hidden",
        }} className="flex flex-col rounded-sm">
          <div className="absolute left-0 top-0 bottom-0 w-3" style={{ background: proj.spineColor }} />
          <div className="absolute left-0 top-0 bottom-0 w-4" style={{ background: `linear-gradient(to right, ${proj.spineColor}80, transparent)` }} />
          <div className="pl-7 p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[9px] tracking-[0.22em]" style={{ color: isDark ? "#8b8ca8" : "#6b5a3e", fontFamily: F_MONO }}>{proj.type}</span>
              <span className="px-2 py-0.5 font-mono text-[9px] tracking-wider" style={{ background: `${proj.statusColor}18`, color: proj.statusColor, border: `1px solid ${proj.statusColor}40`, fontFamily: F_MONO }}>{proj.status}</span>
            </div>
            <div className="w-11 h-11 flex items-center justify-center mb-4" style={{ background: `${proj.spineColor}14`, border: `1px solid ${proj.spineColor}30` }}>
              <Icon size={19} style={{ color: proj.spineColor }} />
            </div>
            <h3 className="font-semibold leading-snug mb-1.5" style={{ fontFamily: F_HEADING, fontSize: "1rem", color: isDark ? "#e8e0d0" : "#2d1a0e" }}>{proj.title}</h3>
            <p className="font-mono text-[9px] tracking-wider mb-auto" style={{ color: proj.spineColor, fontFamily: F_MONO }}>{proj.subtitle}</p>
            <div className="mt-4 font-mono text-[9px] tracking-widest opacity-35 flex items-center gap-1" style={{ color: isDark ? "#8b8ca8" : "#6b5a3e", fontFamily: F_MONO }}>
              <span>HOVER TO OPEN</span> <ArrowRight size={9} />
            </div>
          </div>
          {/* Shine effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 bottom-0 w-8 -skew-x-12 opacity-[0.04]" style={{ background: "white", left: "-30%", animation: flipped ? "" : "book-shimmer 0.8s ease forwards" }} />
          </div>
        </div>

        {/* BACK: Classified Dossier */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: pagesBg, border: `1px solid ${proj.spineColor}55`, overflow: "hidden",
        }} className="flex flex-col p-5 rounded-sm">
          <div className="pb-3 mb-3" style={{ borderBottom: `1px solid ${proj.spineColor}30` }}>
            <div className="font-mono text-[8px] tracking-[0.35em] mb-1" style={{ color: proj.spineColor, fontFamily: F_MONO }}>◆ CLASSIFIED DOSSIER ◆</div>
            <div className="font-semibold text-sm leading-snug" style={{ fontFamily: F_HEADING, color: isDark ? "#e8e0d0" : "#2d1a0e" }}>{proj.title}</div>
          </div>
          <p className="flex-1 leading-relaxed mb-3" style={{ fontFamily: F_BODY, fontSize: "0.95rem", color: isDark ? "#a89f92" : "#4a3728" }}>{proj.desc}</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {proj.tags.map(t => (
              <span key={t} className="px-1.5 py-0.5 font-mono text-[8px]" style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)", color: isDark ? "#8b8ca8" : "#6b5a3e", border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"}`, fontFamily: F_MONO }}>{t}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 font-mono text-[9px] tracking-widest" style={{ color: proj.statusColor, fontFamily: F_MONO }}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" style={{ animation: "glow-pulse 2s ease-in-out infinite" }} />
            STATUS: {proj.status}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROJECTS SECTION ────────────────────────────────────────────────────────

function ProjectsSection({ isDark }: { isDark: boolean }) {
  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="// SECTION 04" title="MISSION ARCHIVES" subtitle="Classified dossiers — hover to open each enchanted book and reveal the full case file." isDark={isDark} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((proj, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <BookCard proj={proj} isDark={isDark} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EDUCATION SECTION ───────────────────────────────────────────────────────

function EducationSection({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(13,14,30,0.88)" : "rgba(250,240,220,0.95)";
  const bdr = isDark ? "rgba(124,58,237,0.25)" : "rgba(139,38,53,0.18)";
  const gold = isDark ? "#c9a84c" : "#8b2635";
  return (
    <section id="education" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader eyebrow="// SECTION 05" title="ACADEMIA OF CODE" isDark={isDark} />

        <Reveal>
          <div className="rounded p-8 mb-8" style={{ background: cardBg, border: `1px solid ${bdr}`, backdropFilter: "blur(8px)" }}>
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0" style={{ background: `${gold}14`, border: `1px solid ${gold}38` }}>
                <GraduationCap size={26} style={{ color: gold }} />
              </div>
              <div className="flex-1">
                <div className="font-mono text-[9px] tracking-[0.35em] mb-1" style={{ color: gold, fontFamily: F_MONO }}>B.E. COMPUTER SCIENCE ENGINEERING</div>
                <h3 className="font-semibold text-lg mb-1" style={{ fontFamily: F_HEADING, color: isDark ? "#e8e0d0" : "#2d1a0e" }}>
                  Misrimal Navajee Munoth Jain Engineering College
                </h3>
                <div className="font-mono text-xs mb-5 opacity-60" style={{ fontFamily: F_MONO, color: isDark ? "#8b8ca8" : "#6b5a3e" }}>2025 – 2029</div>
                <div className="flex items-center gap-4">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono text-xs opacity-50" style={{ fontFamily: F_MONO, color: isDark ? "#8b8ca8" : "#6b5a3e" }}>CGPA</span>
                    <span style={{ fontFamily: F_DISPLAY, fontSize: "1.8rem", color: gold, fontWeight: 700 }}>7.57</span>
                    <span className="font-mono text-xs opacity-40" style={{ fontFamily: F_MONO, color: isDark ? "#8b8ca8" : "#6b5a3e" }}>/10</span>
                  </div>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)" }}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "75.7%" }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full rounded-full" style={{ background: `linear-gradient(to right, ${gold}, ${gold}70)` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="font-mono text-[9px] tracking-[0.35em] mb-5" style={{ color: isDark ? "#00d4ff" : "#8b2635", fontFamily: F_MONO }}>
            CERTIFICATIONS — ENCHANTED CREDENTIALS
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: "Introduction to Cybersecurity", issuer: "Simplilearn", year: "2025", icon: Shield },
              { title: "HTML Fundamentals", issuer: "Sololearn", year: "2025", icon: Code },
            ].map(({ title, issuer, year, icon: Icon }) => (
              <div key={title} className="flex items-center gap-4 p-5 rounded" style={{ background: cardBg, border: `1px solid ${bdr}`, backdropFilter: "blur(8px)" }}>
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: isDark ? "rgba(0,212,255,0.08)" : "rgba(139,38,53,0.07)", border: `1px solid ${isDark ? "rgba(0,212,255,0.28)" : "rgba(139,38,53,0.2)"}` }}>
                  <Award size={17} style={{ color: isDark ? "#00d4ff" : "#8b2635" }} />
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ fontFamily: F_HEADING, color: isDark ? "#e8e0d0" : "#2d1a0e" }}>{title}</div>
                  <div className="font-mono text-[9px] tracking-wider mt-0.5 opacity-55" style={{ fontFamily: F_MONO, color: isDark ? "#8b8ca8" : "#6b5a3e" }}>{issuer} · {year}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────

function ContactSection({ isDark }: { isDark: boolean }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const cardBg = isDark ? "rgba(13,14,30,0.88)" : "rgba(250,240,220,0.95)";
  const bdr = isDark ? "rgba(124,58,237,0.25)" : "rgba(139,38,53,0.18)";
  const gold = isDark ? "#c9a84c" : "#8b2635";
  const inputBg = isDark ? "rgba(18,20,42,0.8)" : "rgba(237,224,196,0.8)";

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="// SECTION 06" title="SEND AN OWL" subtitle="Secure Channel — encrypted transmission active on all frequencies." isDark={isDark} />
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left */}
          <Reveal>
            <div className="mb-8 p-8 rounded text-center" style={{ background: cardBg, border: `1px solid ${bdr}`, backdropFilter: "blur(8px)" }}>
              <svg viewBox="0 0 120 80" className="w-28 mx-auto mb-4" style={{ animation: "float 4s ease-in-out infinite" }}>
                <rect x="6" y="16" width="108" height="50" rx="4" fill="none" stroke={gold} strokeWidth="1.5" opacity="0.8" />
                <path d="M6,20 L60,50 L114,20" fill="none" stroke={gold} strokeWidth="1.5" opacity="0.8" />
                <path d="M6,66 L42,44" fill="none" stroke={gold} strokeWidth="1" opacity="0.35" />
                <path d="M114,66 L78,44" fill="none" stroke={gold} strokeWidth="1" opacity="0.35" />
                <circle cx="60" cy="50" r="3" fill={gold} opacity="0.65" style={{ animation: "glow-pulse 2s ease-in-out infinite" }} />
                {/* Wax seal */}
                <circle cx="60" cy="50" r="7" fill="none" stroke={gold} strokeWidth="0.5" opacity="0.3" />
              </svg>
              <div className="font-mono text-[9px] tracking-[0.35em] mb-1" style={{ color: gold, fontFamily: F_MONO }}>SECURE CHANNEL OPEN</div>
              <div className="font-mono text-[8px] tracking-wider opacity-45" style={{ fontFamily: F_MONO, color: isDark ? "#8b8ca8" : "#6b5a3e" }}>END-TO-END ENCRYPTION ACTIVE</div>
            </div>
            <div className="space-y-3">
              {[
                { icon: Mail, label: "EMAIL", value: "krishsudharsun40@gmail.com", href: "mailto:krishsudharsun40@gmail.com" },
                { icon: Github, label: "GITHUB", value: "github.com/KRISHSUDHARSUN", href: "https://github.com/Krishsudharsun" },
                { icon: Linkedin, label: "LINKEDIN", value: "linkedin.com/in/krishsudharsun", href: "https://www.linkedin.com/in/krishsudharsun-l-483525277/" },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded group transition-all duration-300 hover:translate-x-1"
                  style={{ background: cardBg, border: `1px solid ${bdr}`, backdropFilter: "blur(8px)" }}>
                  <div className="w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ background: `${gold}13`, border: `1px solid ${gold}30` }}>
                    <Icon size={15} style={{ color: gold }} />
                  </div>
                  <div>
                    <div className="font-mono text-[8px] tracking-[0.22em] opacity-45 mb-0.5" style={{ fontFamily: F_MONO, color: isDark ? "#8b8ca8" : "#6b5a3e" }}>{label}</div>
                    <div className="font-mono text-xs" style={{ color: isDark ? "#c8bfaf" : "#4a3728", fontFamily: F_MONO }}>{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.15}>
            <div className="rounded p-8" style={{ background: cardBg, border: `1px solid ${bdr}`, backdropFilter: "blur(8px)" }}>
              <div className="font-mono text-[9px] tracking-[0.35em] mb-6" style={{ color: gold, fontFamily: F_MONO }}>COMPOSE MESSAGE — ENCRYPTED FORM</div>
              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.form key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-5">
                    {([{ k: "name", l: "YOUR NAME", t: "text", ph: "Full name" }, { k: "email", l: "EMAIL", t: "email", ph: "your@email.com" }] as const).map(({ k, l, t, ph }) => (
                      <div key={k}>
                        <label className="block font-mono text-[8px] tracking-[0.25em] mb-2" style={{ color: isDark ? "#8b8ca8" : "#6b5a3e", fontFamily: F_MONO }}>{l}</label>
                        <input type={t} required placeholder={ph} value={(form as any)[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                          className="w-full px-4 py-3 outline-none rounded-sm transition-all duration-200"
                          style={{ background: inputBg, border: `1px solid ${bdr}`, color: isDark ? "#e8e0d0" : "#2d1a0e", fontFamily: F_MONO, fontSize: "12px" }} />
                      </div>
                    ))}
                    <div>
                      <label className="block font-mono text-[8px] tracking-[0.25em] mb-2" style={{ color: isDark ? "#8b8ca8" : "#6b5a3e", fontFamily: F_MONO }}>MESSAGE</label>
                      <textarea required rows={5} placeholder="Your message..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        className="w-full px-4 py-3 outline-none resize-none rounded-sm"
                        style={{ background: inputBg, border: `1px solid ${bdr}`, color: isDark ? "#e8e0d0" : "#2d1a0e", fontFamily: F_MONO, fontSize: "12px" }} />
                    </div>
                    <button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 font-mono text-[11px] tracking-[0.25em] transition-all duration-300 hover:opacity-88"
                      style={{ background: gold, color: isDark ? "#08080f" : "#faf0dc", fontFamily: F_MONO }}>
                      <Send size={14} /> TRANSMIT MESSAGE
                    </button>
                  </motion.form>
                ) : (
                  <motion.div key="sent" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-14 text-center">
                    <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✉</div>
                    <div className="font-semibold text-lg mb-2" style={{ fontFamily: F_HEADING, color: isDark ? "#e8e0d0" : "#2d1a0e" }}>OWL DISPATCHED!</div>
                    <div className="font-mono text-[10px] tracking-widest opacity-55" style={{ fontFamily: F_MONO, color: isDark ? "#8b8ca8" : "#6b5a3e" }}>Your message is en route — encrypted and secure.</div>
                    <button onClick={() => setSent(false)} className="mt-6 font-mono text-[10px] tracking-widest opacity-45 hover:opacity-80 transition-opacity" style={{ color: gold, fontFamily: F_MONO }}>SEND ANOTHER</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── TERMINAL EGG ────────────────────────────────────────────────────────────

function TerminalEgg({ onClose, setIsDark }: { onClose: () => void; setIsDark: (v: boolean) => void }) {
  const [lines, setLines] = useState<string[]>(["ARCANE TERMINAL v2.0.25", "Type 'help' for available spells.", "─────────────────────────", "", ""]);
  const [input, setInput] = useState("");
  const outRef = useRef<HTMLDivElement>(null);
  const inRef = useRef<HTMLInputElement>(null);
  useEffect(() => { outRef.current?.scrollTo({ top: 99999, behavior: "smooth" }); }, [lines]);
  useEffect(() => { inRef.current?.focus(); }, []);

  const run = useCallback((cmd: string) => {
    const key = cmd.trim().toLowerCase();
    const resp = TERMINAL_CMDS[key];
    if (!resp) { setLines(p => [...p, `> ${cmd}`, `Spell not found: "${cmd}". Type 'help'.`, ""]); setInput(""); return; }
    if (key === "clear") { setLines(["ARCANE TERMINAL v2.0.25", "Type 'help' for available spells.", "─────────────────────────", "", ""]); setInput(""); return; }
    if (key === "lumos") setIsDark(false);
    if (key === "nox") setIsDark(true);
    setLines(p => [...p, `> ${cmd}`, ...resp, ""]);
    setInput("");
  }, [setIsDark]);

  return (
    <motion.div initial={{ opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.96 }} transition={{ duration: 0.2 }}
      className="fixed bottom-20 right-5 z-50 w-[380px] max-w-[calc(100vw-2rem)] shadow-2xl overflow-hidden"
      style={{ background: "#08080e", border: "1px solid rgba(124,58,237,0.5)", borderRadius: "4px" }}>
      <div className="flex items-center justify-between px-4 py-2.5" style={{ background: "#0d0e1e", borderBottom: "1px solid rgba(124,58,237,0.28)" }}>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">{["#ef4444", "#f59e0b", "#10b981"].map((c, i) => <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}</div>
          <span className="font-mono text-[9px] tracking-widest text-[#c9a84c] ml-1.5" style={{ fontFamily: F_MONO }}>arcane-terminal</span>
        </div>
        <button onClick={onClose} className="text-[#8b8ca8] hover:text-white transition-colors"><X size={13} /></button>
      </div>
      <div ref={outRef} className="p-4 overflow-y-auto max-h-52 space-y-0.5">
        {lines.map((l, i) => (
          <div key={i} className="font-mono text-[11px] leading-relaxed" style={{
            fontFamily: F_MONO,
            color: l.startsWith(">") ? "#e8e0d0" : l.startsWith("ARCANE") || l.startsWith("Type") || l.startsWith("─") ? "#c9a84c" :
              l.startsWith("Spell not") ? "#ef4444" : "#00d4ff"
          }}>
            {l || " "}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: "#0a0a14", borderTop: "1px solid rgba(124,58,237,0.2)" }}>
        <span className="font-mono text-[11px] text-[#c9a84c]" style={{ fontFamily: F_MONO }}>$</span>
        <input ref={inRef} value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && input.trim()) run(input); }}
          className="flex-1 bg-transparent outline-none font-mono text-[11px] text-white"
          style={{ fontFamily: F_MONO }} placeholder="enter spell..." spellCheck={false} autoComplete="off" />
      </div>
    </motion.div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer({ isDark }: { isDark: boolean }) {
  const gold = isDark ? "#c9a84c" : "#8b2635";
  return (
    <footer className="py-10 px-6 text-center" style={{ borderTop: `1px solid ${isDark ? "rgba(124,58,237,0.18)" : "rgba(139,38,53,0.12)"}` }}>
      <div className="font-mono text-[9px] tracking-[0.35em] mb-2" style={{ color: gold, fontFamily: F_MONO }}>
        ARCANE SECURITY SYSTEM — KRISHSUDHARSUN
      </div>
      <div className="font-mono text-[8px] tracking-wider opacity-35" style={{ fontFamily: F_MONO, color: isDark ? "#8b8ca8" : "#6b5a3e" }}>
        UPFINITY © 2025 — BUILT WITH CODE & CRAFT
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [terminal, setTerminal] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SparkCursor isDark={isDark} />
      <Navbar isDark={isDark} setIsDark={setIsDark} scrollTo={scrollTo} />

      <HeroSection isDark={isDark} scrollTo={scrollTo} />
      <PortalSection isDark={isDark} scrollTo={scrollTo} />
      <AboutSection isDark={isDark} />
      <ExperienceSection isDark={isDark} />
      <SkillsSection isDark={isDark} />
      <MaraudersMapSection isDark={isDark} scrollTo={scrollTo} />
      <ProjectsSection isDark={isDark} />
      <EducationSection isDark={isDark} />
      <ContactSection isDark={isDark} />
      <Footer isDark={isDark} />

      {/* Terminal button */}
      <motion.button
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
        onClick={() => setTerminal(o => !o)}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 flex items-center justify-center shadow-xl"
        style={{ background: isDark ? "#0d0e1e" : "#faf0dc", border: `1px solid ${isDark ? "rgba(201,168,76,0.5)" : "rgba(139,38,53,0.4)"}`, color: isDark ? "#c9a84c" : "#8b2635", boxShadow: isDark ? "0 0 18px rgba(201,168,76,0.12)" : "0 4px 14px rgba(0,0,0,0.1)", borderRadius: "2px" }}
        title="Open Arcane Terminal"
      >
        <Terminal size={17} />
      </motion.button>

      <AnimatePresence>
        {terminal && <TerminalEgg onClose={() => setTerminal(false)} setIsDark={setIsDark} />}
      </AnimatePresence>
    </div>
  );
}
