import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import { profile } from "../data/portfolio";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    const subject = encodeURIComponent(form.subject || "Portfolio inquiry");
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const contactLines = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: profile.phone, href: `tel:+91${profile.phone}` },
    { icon: GithubIcon, label: "github.com/Krishsudharsun", href: profile.github },
    { icon: LinkedinIcon, label: "linkedin.com/in/krishsudharsun-l", href: profile.linkedin },
  ];

  return (
    <section id="contact" className="py-28 md:py-36">
      <div className="container-page grid md:grid-cols-[0.9fr_1.1fr] gap-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">Contact</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-6 text-balance">
            Send an Owl — Secure Channel
          </h2>
          <p className="text-ink-soft leading-relaxed mb-8 max-w-md">
            Open to conversations about development, security work, or UPFINITY. Reach out directly, or
            use the form to draft a message.
          </p>

          <ul className="space-y-4">
            {contactLines.map((line) => (
              <li key={line.label}>
                <a
                  href={line.href}
                  target={line.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-3 text-ink-soft hover:text-accent transition-colors group"
                >
                  <span className="w-9 h-9 rounded-lg border border-line flex items-center justify-center group-hover:border-accent transition-colors shrink-0">
                    <line.icon size={16} />
                  </span>
                  <span className="text-sm font-mono">{line.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="rounded-2xl border border-line glass-panel p-6 md:p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
            <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} />
          <div>
            <label htmlFor="message" className="block font-mono text-xs uppercase tracking-wide text-ink-faint mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-lg bg-panel-raised border border-line px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent outline-none transition-colors resize-none"
              placeholder="What would you like to discuss?"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-md bg-accent text-void font-mono text-sm uppercase tracking-wide font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            style={{ color: "var(--bg-void)" }}
          >
            <Send size={15} /> Send Message
          </button>
          <p className="text-xs text-ink-faint leading-relaxed pt-1">
            This opens your email client with the message pre-filled — no backend is connected yet, so
            nothing is sent automatically from this page.
          </p>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block font-mono text-xs uppercase tracking-wide text-ink-faint mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg bg-panel-raised border border-line px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent outline-none transition-colors"
      />
    </div>
  );
}
