import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks, personal } from "../../data/portfolio";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled || open ? "rgba(10, 10, 15, 0.8)" : "transparent",
        borderBottom: `1px solid ${scrolled || open ? "var(--glass-border)" : "transparent"}`,
        backdropFilter: scrolled || open ? "blur(12px)" : "none",
      }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main">
        <a href="#top" className="flex items-center gap-3 group" aria-label={`${personal.name}, back to top`}>
          <span
            className="w-9 h-9 rounded-lg flex items-center justify-center font-mono text-sm font-bold text-black bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-blue)]"
            aria-hidden="true"
          >
            {personal.initials}
          </span>
          <span className="hidden sm:block font-semibold group-hover:text-[var(--neon-cyan)] transition-colors">
            {personal.name}
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-gray-400 hover:text-[var(--neon-cyan)] transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={personal.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex px-4 py-2 text-sm rounded-lg transition-all duration-300 hover:text-[var(--neon-cyan)] hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]"
          style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
        >
          Resume
        </a>

        <button
          type="button"
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg"
          style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="lg:hidden px-6 pb-6">
          <ul className="flex flex-col gap-1">
            {[...navLinks, { href: personal.resumeUrl, label: "Resume" }].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  {...(link.href === personal.resumeUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="block py-3 text-gray-300 hover:text-[var(--neon-cyan)] transition-colors border-b"
                  style={{ borderColor: "var(--glass-border)" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.header>
  );
}
