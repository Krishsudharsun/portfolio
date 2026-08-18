import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { useKeySequence } from '../hooks/useKeySequence';
import { useTheme } from './ThemeContext';

type EasterEggContextValue = {
  revelioActive: boolean;
  terminalOpen: boolean;
  openTerminal: () => void;
  closeTerminal: () => void;
  toast: string | null;
};

const EasterEggContext = createContext<EasterEggContextValue | null>(null);

const COMMANDS = ['LUMOS', 'NOX', 'ACCIO PROJECTS', 'REVELIO'];

export function EasterEggProvider({ children }: { children: ReactNode }) {
  const { setTheme } = useTheme();
  const [revelioActive, setRevelioActive] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    document.body.classList.toggle('revelio-active', revelioActive);
  }, [revelioActive]);

  const handleMatch = useCallback(
    (command: string) => {
      switch (command) {
        case 'LUMOS':
          setTheme('lumos');
          showToast('Lumos! The manuscript brightens.');
          break;
        case 'NOX':
          setTheme('nox');
          showToast('Nox. The terminal goes dark.');
          break;
        case 'ACCIO PROJECTS': {
          const el = document.getElementById('projects');
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          showToast('Accio Projects — summoned.');
          break;
        }
        case 'REVELIO':
          setRevelioActive((prev) => !prev);
          showToast('Revelio! A hidden layer stirs.');
          break;
      }
    },
    [setTheme, showToast]
  );

  useKeySequence(COMMANDS, handleMatch, !terminalOpen);

  const openTerminal = useCallback(() => setTerminalOpen(true), []);
  const closeTerminal = useCallback(() => setTerminalOpen(false), []);

  return (
    <EasterEggContext.Provider value={{ revelioActive, terminalOpen, openTerminal, closeTerminal, toast }}>
      {children}
    </EasterEggContext.Provider>
  );
}

export function useEasterEggs() {
  const ctx = useContext(EasterEggContext);
  if (!ctx) throw new Error('useEasterEggs must be used within EasterEggProvider');
  return ctx;
}
