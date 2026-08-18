import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-panel shadow-[var(--shadow-card)]" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container-page flex items-center justify-between h-16 md:h-[72px]">
        <button
          onClick={() => handleNavClick("hero")}
          className="font-display text-lg md:text-xl tracking-wide text-ink flex items-center gap-2"
          aria-label="Go to top"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-accent" style={{ boxShadow: "var(--glow-cyan)" }} />
          Krishsudharsun L
        </button>

        <ul className="hidden md:flex items-center gap-8 font-mono text-[0.78rem] tracking-wide uppercase text-ink-soft">
          {LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNavClick(link.id)}
                className="hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "nox" ? "Lumos" : "Nox"} theme`}
            className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink-soft hover:text-accent hover:border-accent transition-colors duration-200"
            title={theme === "nox" ? "LUMOS" : "NOX"}
          >
            {theme === "nox" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center text-ink-soft"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden glass-panel border-t border-line">
          <ul className="container-page py-4 flex flex-col gap-4 font-mono text-sm uppercase tracking-wide text-ink-soft">
            {LINKS.map((link) => (
              <li key={link.id}>
                <button onClick={() => handleNavClick(link.id)} className="hover:text-accent transition-colors">
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
