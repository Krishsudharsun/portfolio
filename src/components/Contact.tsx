import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Phone, Link, Briefcase, Send } from 'lucide-react';
import { profile } from '../data/content';
import { SectionHeading } from './SectionHeading';

const contactMethods = [
  { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, '')}` },
  { icon: Link, label: 'github.com/Krishsudharsun', href: profile.github },
  { icon: Briefcase, label: 'LinkedIn profile', href: profile.linkedin },
];

export function Contact() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || `Portfolio inquiry from ${form.name || 'a visitor'}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name || 'Anonymous'}${form.email ? ` (${form.email})` : ''}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Send an Owl — Secure Channel"
          description="Reach out directly, or use the form below."
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-3">
            {contactMethods.map((m) => (
              <a
                key={m.label}
                href={m.href}
                target={m.href.startsWith('http') ? '_blank' : undefined}
                rel={m.href.startsWith('http') ? 'noreferrer' : undefined}
                className="flex items-center gap-3.5 rounded-lg border p-4 transition-colors hover:border-current"
                style={{ borderColor: 'var(--nl-border)', color: 'var(--nl-ink-dim)' }}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
                  style={{ background: 'var(--nl-surface-2)', color: 'var(--nl-accent)' }}
                >
                  <m.icon size={16} aria-hidden="true" />
                </span>
                <span className="font-mono text-sm">{m.label}</span>
              </a>
            ))}
          </div>

          <motion.form
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="rounded-xl border p-6 sm:p-8"
            style={{ borderColor: 'var(--nl-border)', background: 'var(--nl-surface)' }}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" value={form.name} onChange={handleChange} />
              <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
            </div>
            <div className="mt-4">
              <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} />
            </div>
            <div className="mt-4">
              <label className="font-mono mb-1.5 block text-xs uppercase tracking-wide" style={{ color: 'var(--nl-ink-faint)' }}>
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full rounded-md border bg-transparent px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-current"
                style={{ borderColor: 'var(--nl-border-strong)', color: 'var(--nl-ink)' }}
              />
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--nl-accent)', color: 'var(--nl-bg)' }}
            >
              <Send size={15} aria-hidden="true" />
              Open in Email App
            </button>
            <p className="mt-3 text-xs leading-relaxed" style={{ color: 'var(--nl-ink-faint)' }}>
              This opens your email app with the message pre-filled — nothing is sent automatically from this page.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="font-mono mb-1.5 block text-xs uppercase tracking-wide" style={{ color: 'var(--nl-ink-faint)' }}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        className="w-full rounded-md border bg-transparent px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-current"
        style={{ borderColor: 'var(--nl-border-strong)', color: 'var(--nl-ink)' }}
      />
    </div>
  );
}
