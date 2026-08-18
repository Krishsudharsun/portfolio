import { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { experience } from '../data/content';
import { SectionHeading } from './SectionHeading';

export function Experience() {
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Chronicles & Missions"
          description="A record of roles held while building UPFINITY."
        />

        <ol className="relative mt-14 space-y-3 sm:pl-4">
          <div
            className="absolute bottom-2 left-[7px] top-2 hidden w-px sm:block"
            style={{ background: 'var(--nl-border-strong)' }}
            aria-hidden="true"
          />

          {experience.map((role, i) => {
            const open = openIndex === i;
            return (
              <motion.li
                key={role.title}
                initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative sm:pl-8"
              >
                <span
                  className="absolute left-0 top-6 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 sm:block"
                  style={{
                    borderColor: role.current ? 'var(--nl-accent)' : 'var(--nl-border-strong)',
                    background: role.current ? 'var(--nl-accent)' : 'var(--nl-bg)',
                  }}
                  aria-hidden="true"
                />

                <div className="overflow-hidden rounded-lg border" style={{ borderColor: 'var(--nl-border)', background: 'var(--nl-surface)' }}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={open}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="font-display text-xl" style={{ color: 'var(--nl-ink)' }}>
                          {role.title}
                        </h3>
                        {role.current && (
                          <span
                            className="font-mono inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider"
                            style={{ background: 'var(--nl-accent-3)', color: 'var(--nl-bg)' }}
                          >
                            <Sparkles size={10} aria-hidden="true" /> Current
                          </span>
                        )}
                      </div>
                      <p className="font-mono mt-1 text-xs" style={{ color: 'var(--nl-ink-dim)' }}>
                        {role.org} · {role.period}
                      </p>
                    </div>
                    <ChevronDown
                      size={18}
                      style={{ color: 'var(--nl-ink-faint)', transform: open ? 'rotate(180deg)' : undefined, transition: 'transform 0.3s ease' }}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ul className="space-y-1.5 px-5 pb-5 pl-5" style={{ color: 'var(--nl-ink-dim)' }}>
                          {role.responsibilities.map((r, ri) => (
                            <li key={ri} className="text-sm leading-relaxed">
                              — {r}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
