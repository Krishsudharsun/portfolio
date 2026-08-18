import { useEffect, useRef } from 'react';

/**
 * Listens for typed sequences (e.g. "LUMOS", "ACCIO PROJECTS") anywhere
 * on the page and fires onMatch with the matched command. Ignores
 * keystrokes while focus is inside a form field so typing in the
 * contact form never accidentally triggers an easter egg.
 */
export function useKeySequence(commands: string[], onMatch: (command: string) => void, enabled = true) {
  const bufferRef = useRef('');
  const onMatchRef = useRef(onMatch);
  onMatchRef.current = onMatch;

  useEffect(() => {
    if (!enabled || commands.length === 0) return;
    const maxLen = Math.max(...commands.map((c) => c.length));
    const upperCommands = commands.map((c) => c.toUpperCase());

    function handleKeydown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable) return;
      if (e.key.length !== 1) return;

      bufferRef.current = (bufferRef.current + e.key).slice(-maxLen).toUpperCase();
      const matched = upperCommands.find((c) => bufferRef.current.endsWith(c));
      if (matched) {
        bufferRef.current = '';
        onMatchRef.current(matched);
      }
    }

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [commands, enabled]);
}
