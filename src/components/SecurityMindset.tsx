import { motion } from "framer-motion";
import { cyberFocus } from "../data/portfolio";

export default function SecurityMindset() {
  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(700px 400px at 50% 0%, color-mix(in srgb, var(--emerald) 8%, transparent), transparent)",
        }}
      />
      <div className="container-page">
        <div className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">Focus</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink text-balance">Security Mindset</h2>
          <p className="text-ink-soft mt-4 leading-relaxed">
            Cybersecurity isn't a section here — it's the lens the rest of the work is built through.
          </p>
        </div>

        <div className="rounded-2xl border border-line glass-panel rune-border p-6 md:p-10">
          <div className="flex items-center justify-between mb-8 font-mono text-xs uppercase tracking-wide text-ink-faint">
            <span>console — sec.monitor</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
              live focus
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cyberFocus.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-lg border border-line bg-panel-raised/60 p-4 flex items-center gap-3"
              >
                <span className="font-mono text-[0.65rem] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm text-ink">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
