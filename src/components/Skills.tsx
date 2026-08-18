import { motion, useReducedMotion } from 'framer-motion';
import { Radar, ShieldHalf, Code2, Database, type LucideIcon } from 'lucide-react';
import { skillGroups } from '../data/content';
import { SectionHeading } from './SectionHeading';

const icons: Record<string, LucideIcon> = {
  reconnaissance: Radar,
  security: ShieldHalf,
  development: Code2,
  'backend-data': Database,
};

export function Skills() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="Arsenal of Spells & Systems"
          description="Tools and disciplines grouped by what they're for, not ranked by invented percentages."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {skillGroups.map((group, i) => {
            const Icon = icons[group.id] ?? Code2;
            return (
              <motion.div
                key={group.id}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-xl border p-6"
                style={{ borderColor: 'var(--nl-border)', background: 'var(--nl-surface)' }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ background: 'var(--nl-surface-2)', color: 'var(--nl-accent)' }}
                  >
                    <Icon size={19} aria-hidden="true" />
                  </div>
                  <span
                    className="font-mono rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wider"
                    style={{ borderColor: 'var(--nl-border-strong)', color: 'var(--nl-ink-faint)' }}
                  >
                    {group.focus}
                  </span>
                </div>

                <h3 className="font-display mt-4 text-2xl" style={{ color: 'var(--nl-ink)' }}>
                  {group.title}
                </h3>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="font-mono rounded-md border px-2.5 py-1.5 text-xs"
                      style={{ borderColor: 'var(--nl-border)', color: 'var(--nl-ink-dim)' }}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
