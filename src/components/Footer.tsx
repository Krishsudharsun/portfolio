import { profile } from "../data/portfolio";
import RuneCircle from "./RuneCircle";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line py-10 overflow-hidden">
      <div className="absolute -right-16 -top-16 opacity-[0.06] pointer-events-none" aria-hidden="true">
        <RuneCircle size={220} spin={false} />
      </div>
      <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink-faint font-mono relative">
        <p>© {year} {profile.name}. Built with intent.</p>
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
          Try typing <span className="text-accent">REVELIO</span> anywhere on this page
        </p>
      </div>
    </footer>
  );
}
