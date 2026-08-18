import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Code2, Users } from 'lucide-react';
import { about, profile } from '../data/content';
import { SectionHeading } from './SectionHeading';

const facets = [
  { icon: ShieldCheck, label: 'Security-minded', detail: 'OSINT, reverse engineering, threat intel' },
  { icon: Code2, label: 'Full-stack builder', detail: 'Python, JavaScript, MongoDB, MySQL' },
  { icon: Users, label: 'Founder & Team Manager', detail: 'Leading delivery at UPFINITY' },
];

export function About() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading eyebrow="About" title={about.title} />

          <div>
            {about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="mb-5 text-base leading-relaxed sm:text-lg"
                style={{ color: 'var(--nl-ink-dim)' }}
              >
                {p}
              </motion.p>
            ))}

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {facets.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="rounded-lg border p-4"
                  style={{ borderColor: 'var(--nl-border)', background: 'var(--nl-surface)' }}
                >
                  <f.icon size={18} style={{ color: 'var(--nl-accent)' }} aria-hidden="true" />
                  <p className="mt-2.5 text-sm font-medium" style={{ color: 'var(--nl-ink)' }}>
                    {f.label}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--nl-ink-faint)' }}>
                    {f.detail}
                  </p>
                </motion.div>
              ))}
            </div>

            <p className="hidden-ink font-mono mt-6 text-xs" style={{ color: 'var(--nl-ink-faint)' }}>
              signed: {profile.name} · role: {profile.role}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
