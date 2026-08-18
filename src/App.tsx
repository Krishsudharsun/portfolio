import { useState } from "react";
import { TerminalSquare } from "lucide-react";
import { ThemeProvider } from "./context/ThemeContext";
import { useIncantations } from "./hooks/useIncantations";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import SecurityMindset from "./components/SecurityMindset";
import EducationCerts from "./components/EducationCerts";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Terminal from "./components/Terminal";

function PageContent() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const { revealed } = useIncantations();

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <SecurityMindset />
        <EducationCerts />
        <Contact />
      </main>
      <Footer />

      {/* REVELIO — a hidden detail, revealed only via the incantation */}
      {revealed && (
        <div
          role="status"
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-full glass-panel border border-accent/50 font-mono text-xs text-accent shadow-[var(--glow-cyan)]"
        >
          revelio — you found the hidden sigil. this site has no invented facts, only sourced ones.
        </div>
      )}

      {/* Terminal launcher */}
      <button
        onClick={() => setTerminalOpen((v) => !v)}
        aria-label="Open terminal"
        className="fixed bottom-6 right-5 md:right-8 z-50 w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-[var(--glow-cyan)] hover:opacity-90 transition-opacity"
        style={{ color: "var(--bg-void)" }}
      >
        <TerminalSquare size={20} />
      </button>
      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PageContent />
    </ThemeProvider>
  );
}
