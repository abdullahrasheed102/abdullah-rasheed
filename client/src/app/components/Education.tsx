import { motion } from "motion/react";
import { Award, GraduationCap } from "lucide-react";
import { certifications, education } from "../../data/portfolio";

export function Education() {
  return (
    <section id="education" className="py-24 px-6" aria-labelledby="education-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="education-heading" className="text-4xl md:text-5xl mb-4">Education & Certifications</h2>
          <p className="text-gray-400 text-lg">
            A foundation in artificial intelligence and continued learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Degrees */}
          <div className="lg:col-span-3 space-y-6">
            {education.map((item, index) => (
              <motion.article
                key={item.degree}
                className="group relative p-6 md:p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  backdropFilter: 'blur(10px)',
                }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex gap-5">
                  <div
                    className="w-12 h-12 shrink-0 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(0, 102, 255, 0.1))',
                      border: '1px solid rgba(0, 240, 255, 0.3)',
                    }}
                    aria-hidden="true"
                  >
                    <GraduationCap className="w-6 h-6" style={{ color: 'var(--neon-cyan)' }} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                      <h3 className="text-xl group-hover:text-[var(--neon-cyan)] transition-colors">{item.degree}</h3>
                      <p className="font-mono text-sm text-gray-400 sm:whitespace-nowrap">{item.dates}</p>
                    </div>
                    <p className="text-gray-300 mb-3">{item.institution}</p>
                    <p
                      className="inline-block px-3 py-1 text-sm rounded-full font-mono mb-3"
                      style={{
                        background: 'rgba(168, 85, 247, 0.08)',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        color: 'var(--neon-purple)',
                      }}
                    >
                      {item.result}
                    </p>
                    {item.details && <p className="text-gray-400 text-sm leading-relaxed">{item.details}</p>}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            className="lg:col-span-2 p-6 md:p-8 rounded-2xl"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              backdropFilter: 'blur(10px)',
            }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-6">
              <h3 className="text-xl mb-2" style={{ color: 'var(--neon-blue)' }}>Certifications</h3>
              <div className="h-0.5 w-16 rounded-full" style={{ backgroundColor: 'var(--neon-blue)' }} aria-hidden="true" />
            </div>
            <ul className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.li
                  key={cert.name}
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.08 }}
                >
                  <Award className="w-5 h-5 mt-0.5 shrink-0" style={{ color: 'var(--neon-cyan)' }} aria-hidden="true" />
                  <div>
                    <p className="text-gray-200 leading-snug">{cert.name}</p>
                    <p className="font-mono text-sm text-gray-400">{cert.issuer}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
