import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { education, certifications } from '../data/content';
import { SectionHeading } from './SectionHeading';

export function Education() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Education" title="Study & Certification" />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border p-6 sm:p-8"
            style={{ borderColor: 'var(--nl-border)', background: 'var(--nl-surface)' }}
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-lg"
              style={{ background: 'var(--nl-surface-2)', color: 'var(--nl-accent-2)' }}
            >
              <GraduationCap size={20} aria-hidden="true" />
            </div>
            <h3 className="font-display mt-4 text-2xl" style={{ color: 'var(--nl-ink)' }}>
              {education.degree}
            </h3>
            <p className="mt-1.5 text-sm" style={{ color: 'var(--nl-ink-dim)' }}>
              {education.institution}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <span
                className="font-mono rounded-md border px-3 py-1.5 text-xs"
                style={{ borderColor: 'var(--nl-border-strong)', color: 'var(--nl-ink-dim)' }}
              >
                {education.period}
              </span>
              <span
                className="font-mono rounded-md border px-3 py-1.5 text-xs"
                style={{ borderColor: 'var(--nl-border-strong)', color: 'var(--nl-gold)' }}
              >
                CGPA {education.cgpa}
              </span>
            </div>
          </motion.div>

          <div id="certifications" className="space-y-4">
            <p className="font-mono mb-1 text-xs uppercase tracking-[0.16em]" style={{ color: 'var(--nl-accent-3)' }}>
              Certifications
            </p>
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex items-start gap-3.5 rounded-lg border p-4"
                style={{ borderColor: 'var(--nl-border)', background: 'var(--nl-surface)' }}
              >
                <Award size={18} className="mt-0.5 shrink-0" style={{ color: 'var(--nl-gold)' }} aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--nl-ink)' }}>
                    {cert.name}
                  </p>
                  <p className="font-mono mt-0.5 text-xs" style={{ color: 'var(--nl-ink-faint)' }}>
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
