import { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Plus, FolderGit2 } from 'lucide-react';
import { projects } from '../data/content';
import { SectionHeading } from './SectionHeading';
import { DecryptText } from './DecryptText';

export function Projects() {
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Mission Archives"
          description="Case files from development and security work — expand any entry for details."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((project, i) => {
            const open = openId === project.id;
            return (
              <motion.article
                key={project.id}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                className="rounded-xl border p-6"
                style={{ borderColor: 'var(--nl-border)', background: 'var(--nl-surface)' }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: 'var(--nl-surface-2)', color: 'var(--nl-accent-2)' }}
                  >
                    <FolderGit2 size={18} aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: 'var(--nl-ink-faint)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="font-display mt-4 text-2xl" style={{ color: 'var(--nl-ink)' }}>
                  <DecryptText text={project.title} trigger="hover" charDelayMs={16} frameMs={26} />
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--nl-ink-dim)' }}>
                  {project.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono rounded border px-2 py-0.5 text-[10px]"
                      style={{ borderColor: 'var(--nl-border)', color: 'var(--nl-ink-faint)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : project.id)}
                  className="font-mono mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider transition-colors"
                  style={{ color: 'var(--nl-accent)' }}
                  aria-expanded={open}
                >
                  <Plus size={13} style={{ transform: open ? 'rotate(45deg)' : undefined, transition: 'transform 0.25s ease' }} aria-hidden="true" />
                  {open ? 'Close case file' : 'Open case file'}
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul
                        className="mt-4 space-y-1.5 border-t pt-4 text-sm leading-relaxed"
                        style={{ borderColor: 'var(--nl-border)', color: 'var(--nl-ink-dim)' }}
                      >
                        {project.details.map((d, di) => (
                          <li key={di}>— {d}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
