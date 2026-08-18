import { useEffect, useState } from 'react';
import { Menu, X, TerminalSquare, Sun, Moon } from 'lucide-react';
import { nav } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';
import { useTheme } from '../context/ThemeContext';
import { useEasterEggs } from '../context/EasterEggContext';
import { WardSeal } from './WardSeal';

const sectionIds = nav.map((n) => n.id);

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { openTerminal } = useEasterEggs();
  const active = useActiveSection(sectionIds);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function goTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  }

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled ? 'color-mix(in srgb, var(--nl-bg) 82%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--nl-border)' : '1px solid transparent',
      }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8" aria-label="Primary">
        <button
          type="button"
          onClick={() => goTo('hero')}
          className="group flex items-center gap-2.5 rounded"
          aria-label="Go to top"
        >
          <WardSeal size={30} animated={false} className="opacity-90 transition-opacity group-hover:opacity-100" />
          <span className="font-display text-lg tracking-wide" style={{ color: 'var(--nl-ink)' }}>
            Krishsudharsun<span style={{ color: 'var(--nl-accent)' }}>.</span>
          </span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => goTo(item.id)}
                className="font-mono relative rounded px-3 py-2 text-xs uppercase tracking-[0.14em] transition-colors"
                style={{ color: active === item.id ? 'var(--nl-accent)' : 'var(--nl-ink-dim)' }}
                aria-current={active === item.id ? 'true' : undefined}
              >
                {item.shortLabel}
                {active === item.id && (
                  <span
                    className="absolute inset-x-3 -bottom-0.5 h-px"
                    style={{ background: 'var(--nl-accent)' }}
                    aria-hidden="true"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={openTerminal}
            className="hidden items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-mono transition-colors hover:border-current sm:flex"
            style={{ borderColor: 'var(--nl-border)', color: 'var(--nl-ink-dim)' }}
            aria-label="Open terminal"
            title="Open terminal"
          >
            <TerminalSquare size={14} aria-hidden="true" />
            <span>~/shell</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-mono transition-colors hover:border-current"
            style={{ borderColor: 'var(--nl-border)', color: 'var(--nl-ink-dim)' }}
            aria-label={theme === 'nox' ? 'Switch to Lumos (light) theme' : 'Switch to Nox (dark) theme'}
            title={theme === 'nox' ? 'Lumos' : 'Nox'}
          >
            {theme === 'nox' ? <Sun size={14} aria-hidden="true" /> : <Moon size={14} aria-hidden="true" />}
            <span className="hidden sm:inline">{theme === 'nox' ? 'Lumos' : 'Nox'}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-md border p-2 lg:hidden"
            style={{ borderColor: 'var(--nl-border)', color: 'var(--nl-ink)' }}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="border-t px-5 py-3 lg:hidden"
          style={{ borderColor: 'var(--nl-border)', background: 'var(--nl-bg-soft)' }}
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => goTo(item.id)}
                  className="font-mono block w-full rounded px-2 py-2.5 text-left text-sm uppercase tracking-[0.1em]"
                  style={{ color: active === item.id ? 'var(--nl-accent)' : 'var(--nl-ink-dim)' }}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  openTerminal();
                  setMobileOpen(false);
                }}
                className="font-mono mt-1 flex w-full items-center gap-2 rounded px-2 py-2.5 text-left text-sm"
                style={{ color: 'var(--nl-ink-dim)' }}
              >
                <TerminalSquare size={15} aria-hidden="true" /> Open terminal
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
