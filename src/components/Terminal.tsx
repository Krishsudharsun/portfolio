import { useEffect, useRef, useState } from "react";
import { TerminalSquare, X } from "lucide-react";
import { profile, skillGroups, projects } from "../data/portfolio";

type Line = { cmd?: string; out: string[] };

const HELP = [
  "available commands: whoami · skills · projects · contact · help · clear",
];

function runCommand(raw: string): string[] {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "whoami":
      return ["krishsudharsun"];
    case "skills":
      return skillGroups.map((g) => `${g.title.padEnd(16, " ")} ${g.skills.join(", ")}`);
    case "projects":
      return projects.map((p, i) => `${String(i + 1).padStart(2, "0")}. ${p.title}`);
    case "contact":
      return [profile.email, profile.phone, profile.github, profile.linkedin];
    case "help":
      return HELP;
    case "":
      return [];
    default:
      return [`command not found: ${cmd} — try "help"`];
  }
}

export default function Terminal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [history, setHistory] = useState<Line[]>([{ out: ["Type a command. Try: whoami", ...HELP] }]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === "clear") {
      setHistory([]);
      setInput("");
      return;
    }
    const out = runCommand(input);
    setHistory((h) => [...h, { cmd: input, out }]);
    setInput("");
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Terminal"
      className="fixed bottom-24 right-5 md:right-8 z-50 w-[min(92vw,380px)] rounded-xl border border-line-bright glass-panel shadow-[var(--shadow-card)] overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-line font-mono text-xs text-ink-faint">
        <span className="flex items-center gap-2">
          <TerminalSquare size={13} /> guest@krishsudharsun:~
        </span>
        <button onClick={onClose} aria-label="Close terminal" className="hover:text-accent transition-colors">
          <X size={14} />
        </button>
      </div>

      <div className="h-64 overflow-y-auto px-4 py-3 font-mono text-[0.78rem] leading-relaxed">
        {history.map((line, i) => (
          <div key={i} className="mb-1.5">
            {line.cmd !== undefined && (
              <div className="text-accent">
                <span className="text-ink-faint">$ </span>
                {line.cmd}
              </div>
            )}
            {line.out.map((o, j) => (
              <div key={j} className="text-ink-soft whitespace-pre-wrap break-words">
                {o}
              </div>
            ))}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-2.5 border-t border-line">
        <span className="text-accent font-mono text-sm">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none font-mono text-sm text-ink placeholder:text-ink-faint"
          placeholder="type a command…"
          aria-label="Terminal command input"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
