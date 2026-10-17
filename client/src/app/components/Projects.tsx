import { motion } from "motion/react";
import { ArrowRight, Lock } from "lucide-react";
import { projects } from "../../data/portfolio";

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6" aria-labelledby="projects-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="projects-heading" className="text-4xl md:text-5xl mb-4">Featured Projects</h2>
          <p className="text-gray-400 text-lg">
            Systems built through internships and project work
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              className="group relative p-6 md:p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'blur(10px)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Title with gradient underline */}
              <div className="mb-4">
                <p className="font-mono text-xs uppercase tracking-wider text-gray-400 mb-2">{project.category}</p>
                <h3 className="text-2xl mb-2">{project.title}</h3>
                <div
                  className="h-1 w-20 rounded-full"
                  style={{ backgroundImage: `linear-gradient(to right, ${project.gradient[0]}, ${project.gradient[1]})` }}
                  aria-hidden="true"
                />
              </div>

              {/* Summary */}
              <p className="text-gray-400 mb-6 leading-relaxed">
                {project.summary}
              </p>

              {/* Tech stack badges */}
              <ul className="flex flex-wrap gap-2 mb-6" aria-label="Technologies">
                {project.stack.map((tech) => (
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

              {/* Result */}
              <div
                className="p-4 rounded-lg mb-6 mt-auto"
                style={{
                  background: 'rgba(168, 85, 247, 0.05)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                }}
              >
                <p className="text-sm text-gray-300">
                  <span className="text-[var(--neon-purple)]">Result:</span> {project.result}
                </p>
              </div>

              {/* CTA */}
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative z-10 self-start flex items-center gap-2 text-[var(--neon-cyan)] hover:gap-4 transition-all duration-300"
                >
                  <span>View on GitHub</span>
                  <span className="sr-only">: {project.title} (opens in a new tab)</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true" />
                </a>
              ) : (
                <p className="flex items-center gap-2 text-sm text-gray-400">
                  <Lock className="w-4 h-4" aria-hidden="true" />
                  Internship proof of concept, code not public
                </p>
              )}

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top right, rgba(0, 240, 255, 0.1), transparent 50%)`,
                }}
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
