import { useEffect, useRef, useState, type ElementType } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>/\\|~?=+-';

function randomChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

type DecryptTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** When the scramble→resolve animation fires. */
  trigger?: 'mount' | 'inView' | 'hover';
  /** Extra delay before this instance starts, for staggering several at once. */
  startDelayMs?: number;
  /** How fast unresolved characters flicker. */
  frameMs?: number;
  /** How fast characters lock in, left to right. */
  charDelayMs?: number;
};

/**
 * DecryptText — a terminal-style "decrypting" effect: characters flicker
 * through random glyphs and resolve left-to-right into the real text.
 * The visible flicker is aria-hidden; a plain sr-only copy of the text
 * is always present for assistive tech, and prefers-reduced-motion skips
 * straight to the resolved text.
 */
export function DecryptText({
  text,
  as = 'span',
  className = '',
  trigger = 'inView',
  startDelayMs = 0,
  frameMs = 32,
  charDelayMs = 28,
}: DecryptTextProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(text);
  const startedRef = useRef(false);
  const timers = useRef<{ scramble?: number; reveal?: number; start?: number }>({});

  function runAnimation() {
    if (reduceMotion) {
      setDisplay(text);
      return;
    }
    window.clearInterval(timers.current.scramble);
    window.clearInterval(timers.current.reveal);

    let revealed = 0;
    const total = text.length;

    timers.current.scramble = window.setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((ch, i) => (ch === ' ' || i < revealed ? ch : randomChar()))
          .join('')
      );
    }, frameMs);

    timers.current.reveal = window.setInterval(() => {
      revealed += 1;
      if (revealed >= total) {
        window.clearInterval(timers.current.scramble);
        window.clearInterval(timers.current.reveal);
        setDisplay(text);
      }
    }, charDelayMs);
  }

  useEffect(
    () => () => {
      window.clearInterval(timers.current.scramble);
      window.clearInterval(timers.current.reveal);
      window.clearTimeout(timers.current.start);
    },
    []
  );

  useEffect(() => {
    if (reduceMotion || startedRef.current) return;
    const shouldStart = trigger === 'mount' || (trigger === 'inView' && inView);
    if (!shouldStart) return;
    startedRef.current = true;
    timers.current.start = window.setTimeout(runAnimation, startDelayMs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, inView, reduceMotion]);

  function handleMouseEnter() {
    if (trigger === 'hover' && !reduceMotion) runAnimation();
  }

  const Tag = as as ElementType;

  return (
    <Tag ref={ref} className={className} onMouseEnter={handleMouseEnter}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
