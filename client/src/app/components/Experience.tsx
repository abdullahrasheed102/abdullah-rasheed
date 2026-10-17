import { motion } from "motion/react";
import { Briefcase } from "lucide-react";
import { experience } from "../../data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6 relative overflow-hidden" aria-labelledby="experience-heading">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] max-w-full rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--neon-blue) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="experience-heading" className="text-4xl md:text-5xl mb-4">Experience</h2>
          <p className="text-gray-400 text-lg">
            Internship work across AI systems, API development, and 3D data
          </p>
        </motion.div>

        <div className="relative md:pl-12">
          {/* Connection line */}
          <div
            className="hidden md:block absolute left-[1.4rem] top-2 bottom-2 w-0.5"
            style={{
              background: 'linear-gradient(to bottom, var(--neon-cyan), var(--neon-blue), var(--neon-purple))',
              opacity: 0.3,
            }}
            aria-hidden="true"
          />

          <ol className="space-y-10">
          {experience.map((job, index) => (
            <motion.li
              key={job.company}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Timeline node */}
              <div
                className="hidden md:flex absolute -left-12 top-6 w-11 h-11 rounded-full items-center justify-center backdrop-blur-sm"
                style={{
                  background: '#0a0a0f',
                  border: '2px solid var(--neon-cyan)',
                  color: 'var(--neon-cyan)',
                }}
                aria-hidden="true"
              >
                <Briefcase className="w-5 h-5" />
              </div>

              <article
                className="group relative p-6 md:p-8 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-2xl mb-1 group-hover:text-[var(--neon-cyan)] transition-colors">{job.role}</h3>
                    <p className="text-lg bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-blue)] bg-clip-text text-transparent font-semibold">
                      {job.company}
                    </p>
                  </div>
                  <p className="font-mono text-sm text-gray-400 md:text-right md:whitespace-nowrap">{job.dates}</p>
                </div>

                <p className="text-gray-300 mb-4">
                  <span className="text-[var(--neon-purple)]">Project:</span> {job.project}
                </p>

                <ul className="space-y-2 mb-6">
                  {job.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-gray-400 leading-relaxed">
                      <span
                        className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: 'var(--neon-cyan)' }}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                  {job.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full font-mono"
                      style={{
                        background: 'rgba(0, 240, 255, 0.1)',
                        border: '1px solid rgba(0, 240, 255, 0.3)',
                        color: 'var(--neon-cyan)',
                      }}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at top right, rgba(0, 240, 255, 0.08), transparent 50%)',
                  }}
                  aria-hidden="true"
                />
              </article>
            </motion.li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
