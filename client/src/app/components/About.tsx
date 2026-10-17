import { motion } from "motion/react";
import { Fragment } from "react";
import { MapPin } from "lucide-react";
import { about, personal } from "../../data/portfolio";

// Phrases from the bio to pick out in the template's accent colors, one color per paragraph.
const highlights: [string[], string][] = [
  [["BS Artificial Intelligence", "two AI engineering internships"], "var(--neon-cyan)"],
  [["practical AI-powered systems", "Python and API-oriented backend development"], "var(--neon-blue)"],
  [["early-career AI engineer"], "var(--neon-purple)"],
];

function highlight(text: string, phrases: string[], color: string) {
  if (phrases.length === 0) return text;
  const pattern = new RegExp(`(${phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`);
  return text.split(pattern).map((part, index) =>
    phrases.includes(part) ? (
      <span key={index} style={{ color }}>{part}</span>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}

export function About() {
  return (
    <section id="about" className="py-24 px-6" aria-labelledby="about-heading">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="about-heading" className="text-4xl md:text-5xl mb-4">About Me</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Photo */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden group"
              style={{
                border: '2px solid var(--glass-border)',
              }}
            >
              <img
                src={personal.photo}
                alt={`Portrait of ${personal.name}`}
                width={256}
                height={256}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(168, 85, 247, 0.2))',
                }}
              />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="p-8 rounded-2xl"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {about.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-300 leading-relaxed mb-4 last:mb-0">
                  {highlight(paragraph, highlights[index]?.[0] ?? [], highlights[index]?.[1] ?? "inherit")}
                </p>
              ))}
              <p className="mt-6 inline-flex items-center gap-2 text-sm text-gray-400 font-mono">
                <MapPin className="w-4 h-4 text-[var(--neon-cyan)]" aria-hidden="true" />
                {personal.location}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
