import { motion } from "motion/react";
import { ChevronDown, MapPin } from "lucide-react";
import { personal } from "../../data/portfolio";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {/* Neural-grid backdrop (replaces the template's stock photo) */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(0, 240, 255, 0.55) 1px, transparent 1.5px), linear-gradient(rgba(0, 102, 255, 0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 102, 255, 0.18) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            backgroundPosition: '-24px -24px, 0 0, 0 0',
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 45%, #000 30%, transparent 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]" />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, var(--neon-cyan) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, var(--neon-purple) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="inline-flex items-center gap-2 mb-6 text-sm text-gray-400 font-mono">
            <MapPin className="w-4 h-4 text-[var(--neon-cyan)]" aria-hidden="true" />
            {personal.title} · {personal.location}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
            {personal.name}
            <br />
            <span className="bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-blue)] to-[var(--neon-purple)] bg-clip-text text-transparent">
              {personal.tagline}
            </span>
          </h1>
        </motion.div>

        <motion.p
          className="text-lg md:text-2xl text-gray-400 mb-6 font-mono"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {personal.headline.join(" • ")}
        </motion.p>

        <motion.p
          className="max-w-2xl mx-auto text-base md:text-lg text-gray-300 leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {personal.summary}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          data-chat-label-avoid
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="#projects"
            className="group relative w-60 sm:w-auto text-center px-8 py-4 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-blue)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:scale-105"
          >
            <span className="relative z-10 text-black">View Projects</span>
          </a>

          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-60 sm:w-auto text-center px-8 py-4 rounded-lg overflow-hidden transition-all duration-300"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span className="relative z-10 text-white group-hover:text-[var(--neon-cyan)] transition-colors">
              Download Resume
            </span>
          </a>
        </motion.div>

      </div>

      <motion.div
        className="hidden sm:block absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <ChevronDown className="w-8 h-8 text-[var(--neon-cyan)]" />
      </motion.div>
    </section>
  );
}
