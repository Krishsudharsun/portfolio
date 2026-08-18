import { motion } from "framer-motion";
import { skillGroups } from "../data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="py-28 md:py-36">
      <div className="container-page">
        <div className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">Skills</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink text-balance">
            Arsenal of Spells &amp; Systems
          </h2>
          <p className="text-ink-soft mt-4 leading-relaxed">
            Grouped by function rather than ranked by number — each domain is a working focus, not a score.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-xl border border-line glass-panel p-6 hover:border-accent/50 transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-lg text-ink">{group.title}</h3>
                <span className="font-mono text-[0.65rem] text-ink-faint group-hover:text-accent transition-colors">
                  {group.codename}
                </span>
              </div>
              <ul className="space-y-2.5">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2.5 text-sm text-ink-soft">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
