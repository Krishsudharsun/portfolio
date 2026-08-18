import { useEffect, useRef, useState } from 'react';
import { TerminalSquare, X } from 'lucide-react';
import { profile, skillGroups, projects } from '../data/content';

type Line = { kind: 'input' | 'output'; text: string };

const HELP_TEXT = 'Available commands: whoami, skills, projects, contact, help, clear, exit';

function runCommand(raw: string): string[] {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case 'whoami':
      return [profile.name.toLowerCase().replace(/\s+/g, '')];
    case 'skills':
      return skillGroups.map((g) => `${g.title}: ${g.skills.join(', ')}`);
    case 'projects':
      return projects.map((p, i) => `${i + 1}. ${p.title}`);
    case 'contact':
      return [`email  ${profile.email}`, `phone  ${profile.phone}`, `github ${profile.github.replace('https://', '')}`, `linkedin ${profile.linkedin.replace('https://', '')}`];
    case 'help':
      return [HELP_TEXT];
    case '':
      return [];
    default:
      return [`command not found: ${cmd} — try "help"`];
  }
}

export function Terminal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>([
    { kind: 'output', text: `${profile.name} — secure shell. Type "help" to begin.` },
  ]);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) onClose();
    }
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [open, onClose]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value;
    if (trimmed.trim().toLowerCase() === 'clear') {
      setLines([]);
      setValue('');
      return;
    }
    if (trimmed.trim().toLowerCase() === 'exit') {
      onClose();
      setValue('');
      return;
    }
    const output = runCommand(trimmed);
    setLines((prev) => [
      ...prev,
      { kind: 'input', text: trimmed },
      ...output.map((text): Line => ({ kind: 'output', text })),
    ]);
    setValue('');
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center"
      style={{ background: 'var(--nl-scrim)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Terminal"
      onClick={onClose}
    >
      <div
        className="font-mono w-full max-w-xl overflow-hidden rounded-lg border shadow-2xl"
        style={{ background: 'var(--nl-bg-soft)', borderColor: 'var(--nl-border-strong)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between border-b px-4 py-2.5"
          style={{ borderColor: 'var(--nl-border)' }}
        >
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--nl-ink-dim)' }}>
            <TerminalSquare size={14} aria-hidden="true" />
            <span>krishsudharsun@upfinity: ~</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close terminal"
            className="rounded p-1 opacity-70 transition hover:opacity-100"
          >
            <X size={16} />
          </button>
        </div>

        <div ref={scrollRef} className="max-h-[50vh] overflow-y-auto px-4 py-3 text-sm leading-relaxed">
          {lines.map((line, i) => (
            <div key={i} className={line.kind === 'input' ? 'mt-2' : ''}>
              {line.kind === 'input' ? (
                <span>
                  <span style={{ color: 'var(--nl-accent-3)' }}>$ </span>
                  <span style={{ color: 'var(--nl-ink)' }}>{line.text}</span>
                </span>
              ) : (
                <span style={{ color: 'var(--nl-ink-dim)' }}>{line.text}</span>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t px-4 py-2.5" style={{ borderColor: 'var(--nl-border)' }}>
          <span style={{ color: 'var(--nl-accent-3)' }}>$</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
            style={{ color: 'var(--nl-ink)' }}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal command input"
            placeholder="type a command…"
          />
        </form>
      </div>
    </div>
  );
}
