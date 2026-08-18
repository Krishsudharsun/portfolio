import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { education, certifications } from "../data/portfolio";

export default function EducationCerts() {
  return (
    <section id="education" className="py-28 md:py-36 bg-panel/30">
      <div className="container-page grid md:grid-cols-2 gap-14">
        <div>
          <p className="eyebrow mb-4">Education</p>
          <h2 className="font-display text-2xl md:text-3xl text-ink mb-8 text-balance">
            Foundations
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-line glass-panel p-6 flex gap-4"
          >
            <div className="shrink-0 w-11 h-11 rounded-lg bg-panel-raised flex items-center justify-center text-accent">
              <GraduationCap size={20} />
            </div>
            <div>
              <h3 className="font-display text-lg text-ink">{education.degree}</h3>
              <p className="text-sm text-ink-soft mt-1">{education.institution}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 font-mono text-xs text-ink-faint">
                <span>{education.period}</span>
                <span className="text-emerald">{education.status}</span>
                <span>CGPA {education.cgpa}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div id="certifications">
          <p className="eyebrow mb-4">Certifications</p>
          <h2 className="font-display text-2xl md:text-3xl text-ink mb-8 text-balance">
            Marks of Study
          </h2>

          <div className="space-y-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-xl border border-line glass-panel p-5 flex gap-4 items-center"
              >
                <div className="shrink-0 w-11 h-11 rounded-lg bg-panel-raised flex items-center justify-center text-gold">
                  <Award size={18} />
                </div>
                <div>
                  <h3 className="text-ink font-medium">{cert.name}</h3>
                  <p className="text-sm text-ink-soft font-mono mt-0.5">
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
