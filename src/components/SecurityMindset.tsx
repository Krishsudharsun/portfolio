import { motion, useReducedMotion } from 'framer-motion';
import { Search, Network, Radio, Cpu, Bug, Terminal as TerminalIcon } from 'lucide-react';
import { securityMindset } from '../data/content';
import { SectionHeading } from './SectionHeading';
import { DecryptText } from './DecryptText';

const pillarIcons = [Search, Network, Radio, Cpu, Bug, TerminalIcon];

export function SecurityMindset() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="security" className="relative py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full"
        style={{ background: 'linear-gradient(180deg, var(--nl-bg-soft), transparent 60%)' }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Mindset" title={securityMindset.title} description={securityMindset.intro} />

        <div
          className="mt-14 overflow-hidden rounded-xl border"
          style={{ borderColor: 'var(--nl-border-strong)', background: 'var(--nl-bg-soft)' }}
        >
          <div
            className="font-mono flex items-center gap-2 border-b px-5 py-3 text-xs"
            style={{ borderColor: 'var(--nl-border)', color: 'var(--nl-ink-faint)' }}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--nl-accent-3)' }} aria-hidden="true" />
            <DecryptText text="watch-console — live disciplines" trigger="inView" charDelayMs={14} frameMs={24} />
          </div>

          <div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3" style={{ borderColor: 'var(--nl-border)' }}>
            {securityMindset.pillars.map((pillar, i) => {
              const Icon = pillarIcons[i % pillarIcons.length];
              return (
                <motion.div
                  key={pillar.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="p-5"
                  style={{ borderColor: 'var(--nl-border)' }}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} style={{ color: 'var(--nl-accent)' }} aria-hidden="true" />
                    <h3 className="font-mono text-sm uppercase tracking-wide" style={{ color: 'var(--nl-ink)' }}>
                      <DecryptText text={pillar.label} trigger="inView" startDelayMs={i * 90} charDelayMs={20} />
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--nl-ink-dim)' }}>
                    {pillar.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
