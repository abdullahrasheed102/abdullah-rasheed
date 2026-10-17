import { motion } from "motion/react";
import { tint } from "../lib/tint";
import { techStack } from "../../data/portfolio";

const palette = ["var(--neon-cyan)", "var(--neon-blue)", "var(--neon-purple)"];
const categoryColors: Record<string, string> = Object.fromEntries(
  Object.keys(techStack).map((category, index) => [category, palette[index % palette.length]]),
);

export function TechStack() {
  return (
    <section id="skills" className="py-24 px-6" aria-labelledby="skills-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="skills-heading" className="text-4xl md:text-5xl mb-4">Tech Stack</h2>
          <p className="text-gray-400 text-lg">
            Technologies organized around the work they support
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(techStack).map(([category, technologies], categoryIndex) => (
            <motion.div
              key={category}
              className="p-6 rounded-2xl"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'blur(10px)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              {/* Category header */}
              <div className="mb-4">
                <h3 
                  className="text-xl mb-2"
                  style={{ color: categoryColors[category] }}
                >
                  {category}
                </h3>
                <div 
                  className="h-0.5 w-16 rounded-full"
                  style={{ backgroundColor: categoryColors[category] }}
                />
              </div>

              {/* Technologies */}
              <ul className="flex flex-wrap gap-2">
                {technologies.map((tech, techIndex) => (
                  <motion.li
                    key={tech}
                    className="px-3 py-1.5 text-sm rounded-lg font-mono transition-all duration-300 hover:scale-105 cursor-default"
                    style={{
                      background: `${tint(categoryColors[category], 0.08)}`,
                      border: `1px solid ${tint(categoryColors[category], 0.19)}`,
                      color: 'var(--foreground)',
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.3, 
                      delay: categoryIndex * 0.1 + techIndex * 0.05 
                    }}
                    whileHover={{
                      backgroundColor: `${tint(categoryColors[category], 0.15)}`,
                      borderColor: `${tint(categoryColors[category], 0.31)}`,
                    }}
                  >
                    {tech}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
