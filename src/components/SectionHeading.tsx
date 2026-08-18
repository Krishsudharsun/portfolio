import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { WardSeal } from './WardSeal';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: 'left' | 'center';
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55 }}
      className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}
    >
      <div className={`mb-3 flex items-center gap-2.5 ${align === 'center' ? 'justify-center' : ''}`}>
        <WardSeal size={16} animated={false} />
        <span
          className="font-mono text-xs uppercase tracking-[0.2em]"
          style={{ color: 'var(--nl-accent)' }}
        >
          {eyebrow}
        </span>
      </div>
      <h2 className="font-display text-balance text-4xl leading-tight sm:text-5xl" style={{ color: 'var(--nl-ink)' }}>
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed sm:text-lg" style={{ color: 'var(--nl-ink-dim)' }}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
