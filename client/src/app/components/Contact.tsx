import { motion } from "motion/react";
import { tint } from "../lib/tint";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { personal } from "../../data/portfolio";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
    color: "var(--neon-cyan)",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/abdullah-rasheed1",
    href: personal.linkedin,
    color: "var(--neon-blue)",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/abdullahrasheed102",
    href: personal.github,
    color: "var(--neon-purple)",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden" aria-labelledby="contact-heading">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] max-w-full rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--neon-cyan) 0%, transparent 70%)',
            filter: 'blur(120px)',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="contact-heading" className="text-4xl md:text-5xl mb-6">Let's Build Together</h2>
          <p className="text-xl text-gray-400 mb-8">
            I'm open to {personal.openTo}.
          </p>
        </motion.div>

        {/* Contact methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={method.label}
                href={method.href}
                {...(method.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className="group p-6 rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
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
                  boxShadow: `0 0 30px ${tint(method.color, 0.19)}`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${tint(method.color, 0.08)}`,
                    border: `1px solid ${tint(method.color, 0.19)}`,
                  }}
                >
                  <Icon
                    aria-hidden="true"
                    className="w-6 h-6" 
                    style={{ color: method.color }}
                  />
                </div>
                <h3 className="text-center mb-2">{method.label}</h3>
                <p 
                  className="text-[13px] text-center font-mono transition-colors duration-300 [overflow-wrap:anywhere]"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {method.value}
                </p>
              </motion.a>
            );
          })}
        </div>

        {/* CTA Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href={`mailto:${personal.email}`}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-blue)] rounded-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] hover:scale-105"
          >
            <span className="text-black">Get In Touch</span>
            <Send className="w-5 h-5 text-black transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </motion.div>
      </div>

    </section>
  );
}

export function Footer() {
  return (
    <motion.footer
      className="px-6 pb-28"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="max-w-7xl mx-auto pt-12 border-t"
        style={{ borderColor: 'var(--glass-border)' }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} {personal.name}. Built with React & Motion.</p>
          <p className="font-mono">
            Specialized in{" "}
            <span className="text-[var(--neon-cyan)]">Agentic AI</span>
            {" • "}
            <span className="text-[var(--neon-blue)]">LLM Apps & RAG</span>
            {" • "}
            <span className="text-[var(--neon-purple)]">Computer Vision</span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
