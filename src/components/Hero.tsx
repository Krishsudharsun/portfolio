import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Link, Briefcase, FileText, Mail } from 'lucide-react';
import { profile } from '../data/content';
import { WardSeal } from './WardSeal';
import { DecryptText } from './DecryptText';
import { useEasterEggs } from '../context/EasterEggContext';

const headlineWords = profile.tagline.split(' ');

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { revelioActive } = useEasterEggs();

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden pt-20">
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute left-1/2 top-1/2 h-[140vmin] w-[140vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, var(--nl-surface-2) 0%, transparent 62%)',
          }}
        />
        <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
          <defs>
            <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
              <path d="M 42 0 L 0 0 0 42" fill="none" stroke="var(--nl-ink)" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <div>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs uppercase tracking-[0.16em]"
            style={{ borderColor: 'var(--nl-border-strong)', color: 'var(--nl-accent-3)' }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--nl-accent-3)' }} aria-hidden="true" />
            {profile.role}
          </motion.p>

          <h1 className="font-display text-balance text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
            {headlineWords.map((word, i) => (
              <motion.span
                key={word + i}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.1 + i * 0.12 }}
                className="mr-4 inline-block"
                style={{ color: i % 2 === 1 ? 'var(--nl-accent)' : 'var(--nl-ink)' }}
              >
                <DecryptText text={word} trigger="mount" startDelayMs={300 + i * 160} charDelayMs={22} />
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 max-w-xl text-lg leading-relaxed sm:text-xl"
            style={{ color: 'var(--nl-ink-dim)' }}
          >
            {profile.subheading}
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              className="rounded-md px-5 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--nl-accent)', color: 'var(--nl-bg)' }}
            >
              Explore My Work
            </button>
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="rounded-md border px-5 py-3 text-sm font-medium transition-colors hover:border-current"
              style={{ borderColor: 'var(--nl-border-strong)', color: 'var(--nl-ink)' }}
            >
              Contact Me
            </button>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-8 flex flex-wrap items-center gap-5 text-sm"
            style={{ color: 'var(--nl-ink-dim)' }}
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-current"
            >
              <Link size={16} aria-hidden="true" /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-current"
            >
              <Briefcase size={16} aria-hidden="true" /> LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-current"
            >
              <Mail size={16} aria-hidden="true" /> Email
            </a>
            {profile.resumeUrl ? (
              <a href={profile.resumeUrl} className="inline-flex items-center gap-1.5 transition-colors hover:text-current">
                <FileText size={16} aria-hidden="true" /> Resume
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 opacity-50" title="Resume link coming soon">
                <FileText size={16} aria-hidden="true" /> Resume — coming soon
              </span>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto hidden aspect-square w-full max-w-md items-center justify-center sm:flex"
        >
          <WardSeal size={440} pulse className="max-w-full" />
          <div
            className="hidden-ink font-mono absolute bottom-2 right-2 rounded border px-2.5 py-1 text-[10px]"
            style={{ borderColor: 'var(--nl-border-strong)', color: 'var(--nl-accent-3)', background: 'var(--nl-bg-soft)' }}
          >
            seal.integrity: verified
          </div>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => scrollTo('about')}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest sm:flex"
        style={{ color: 'var(--nl-ink-faint)' }}
        aria-label="Scroll to About section"
      >
        scroll
        <ArrowDown size={14} className={reduceMotion ? '' : 'animate-bounce'} aria-hidden="true" />
      </button>

      {revelioActive && (
        <p
          className="font-mono absolute left-5 top-24 max-w-[220px] text-[11px] leading-relaxed sm:left-8"
          style={{ color: 'var(--nl-ink-faint)' }}
        >
          revelio: this seal is a network graph in disguise — 8 ports, 4 hubs, one cursor.
        </p>
      )}
    </section>
  );
}
