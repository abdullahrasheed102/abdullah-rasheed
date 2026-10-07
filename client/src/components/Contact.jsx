import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from 'lucide-react';
import { portfolio } from '../data/portfolio.js';
import SectionHeading from './SectionHeading.jsx';
import useReveal from '../hooks/useReveal.js';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const reveal = useReveal();
  const { email, github, linkedin } = portfolio.personal;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="wrap contact-layout">
        <div className="contact-copy">
          <SectionHeading index="06" label="Contact" titleLines={["Let’s build", 'something useful.']} subtitle="I’m open to AI Engineer opportunities, AI/ML roles, internships, Python/backend work, and interesting AI projects." />
          <button className="copy-email" type="button" onClick={copyEmail} ref={reveal} data-reveal="rise" aria-live="polite">
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {copied ? 'Copied' : 'Copy email'}
          </button>
        </div>
        <div className="contact-links">
          <a href={`mailto:${email}`} ref={reveal} data-reveal="slide"><span className="contact-icon"><Mail size={18} aria-hidden="true" /></span><span><small>Email</small><strong>{email}</strong></span><ArrowUpRight size={15} aria-hidden="true" /></a>
          <a href={linkedin} target="_blank" rel="noreferrer" ref={reveal} data-reveal="slide" data-delay="1"><span className="contact-icon"><Linkedin size={18} aria-hidden="true" /></span><span><small>LinkedIn</small><strong>Connect with me</strong></span><ArrowUpRight size={15} aria-hidden="true" /></a>
          <a href={github} target="_blank" rel="noreferrer" ref={reveal} data-reveal="slide" data-delay="2"><span className="contact-icon"><Github size={18} aria-hidden="true" /></span><span><small>GitHub</small><strong>Explore my work</strong></span><ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
