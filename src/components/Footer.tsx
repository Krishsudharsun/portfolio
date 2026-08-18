import { Link, Briefcase, Mail } from 'lucide-react';
import { profile } from '../data/content';
import { WardSeal } from './WardSeal';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t" style={{ borderColor: 'var(--nl-border)' }}>
      <p className="font-mono py-3 text-center text-[10px] tracking-wide" style={{ color: 'var(--nl-ink-faint)' }}>
        psst — try typing <span style={{ color: 'var(--nl-accent)' }}>NOX</span>,{' '}
        <span style={{ color: 'var(--nl-accent)' }}>LUMOS</span>,{' '}
        <span style={{ color: 'var(--nl-accent)' }}>REVELIO</span>, or{' '}
        <span style={{ color: 'var(--nl-accent)' }}>ACCIO PROJECTS</span> anywhere on this page
      </p>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 border-t px-5 py-10 sm:flex-row sm:justify-between sm:px-8" style={{ borderColor: 'var(--nl-border)' }}>
        <div className="flex items-center gap-2.5">
          <WardSeal size={22} animated={false} />
          <span className="font-mono text-xs" style={{ color: 'var(--nl-ink-faint)' }}>
            © {year} {profile.name}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" style={{ color: 'var(--nl-ink-faint)' }}>
            <Link size={17} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ color: 'var(--nl-ink-faint)' }}>
            <Briefcase size={17} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" style={{ color: 'var(--nl-ink-faint)' }}>
            <Mail size={17} />
          </a>
        </div>

        <p className="font-mono text-[11px]" style={{ color: 'var(--nl-ink-faint)' }}>
          Built with React · TypeScript · Vite · Tailwind
        </p>
      </div>
    </footer>
  );
}
