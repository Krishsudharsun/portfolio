import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Theme = 'nox' | 'lumos';
const STORAGE_KEY = 'nl-theme';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readInitialTheme(): Theme {
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'nox' || attr === 'lumos') return attr;
  }
  return 'nox';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* localStorage unavailable — theme still applies for this session */
    }
  }, [theme]);

  // Respect live system preference changes only if the user hasn't made an explicit choice.
  useEffect(() => {
    let explicit = false;
    try {
      explicit = localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      explicit = false;
    }
    if (explicit) return;
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const handler = (e: MediaQueryListEvent) => setThemeState(e.matches ? 'lumos' : 'nox');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () => setThemeState((prev) => (prev === 'nox' ? 'lumos' : 'nox'));

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
