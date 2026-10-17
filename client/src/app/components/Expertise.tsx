import { motion } from "motion/react";
import { tint } from "../lib/tint";
import { Box, Brain, Database, Network, Server, Sparkles } from "lucide-react";
import { expertise, type ExpertiseIcon } from "../../data/portfolio";

const icons: Record<ExpertiseIcon, typeof Brain> = {
  network: Network,
  database: Database,
  sparkles: Sparkles,
  brain: Brain,
  box: Box,
  server: Server,
};

const colors = ["var(--neon-cyan)", "var(--neon-blue)", "var(--neon-purple)"];

const expertiseAreas = expertise.map((area, index) => ({
  ...area,
  icon: icons[area.icon],
  color: colors[index % colors.length],
}));

export function Expertise() {
  return (
    <section id="expertise" className="py-24 px-6" aria-labelledby="expertise-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="expertise-heading" className="text-4xl md:text-5xl mb-4">What I Do</h2>
          <p className="text-gray-400 text-lg">
            Areas I work across, from internships and project work
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                className="group relative p-6 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  backdropFilter: 'blur(10px)',
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  boxShadow: `0 0 30px ${tint(area.color, 0.2)}`,
                }}
              >
                {/* Icon */}
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${tint(area.color, 0.08)}`,
                    border: `1px solid ${tint(area.color, 0.19)}`,
                  }}
                >
                  <Icon
                    aria-hidden="true"
                    className="w-6 h-6 transition-all duration-300" 
                    style={{ color: area.color }}
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl mb-2 group-hover:text-[var(--neon-cyan)] transition-colors">
                  {area.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {area.description}
                </p>

                {/* Hover glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${tint(area.color, 0.06)}, transparent 70%)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
