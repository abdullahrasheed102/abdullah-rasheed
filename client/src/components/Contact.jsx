import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { portfolio } from '../data/portfolio.js';
import ExternalLink from './ExternalLink.jsx';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="wrap contact-layout">
        <div className="contact-copy">
          <SectionHeading index="06" eyebrow="CONTACT" title="Let’s build something useful." />
          <Reveal as="p" delay={160}>{portfolio.personal.summary}</Reveal>
        </div>
        <div className="contact-links" aria-label="Contact links">
          <Reveal variant="right" className="contact-link-reveal"><a className="contact-link" href={`mailto:${portfolio.personal.email}`}><Mail size={17} aria-hidden="true" />{portfolio.personal.email}<ArrowUpRight size={14} aria-hidden="true" /></a></Reveal>
          <Reveal variant="right" className="contact-link-reveal" delay={90}><ExternalLink className="contact-link" href={portfolio.personal.linkedin}><Linkedin size={17} aria-hidden="true" /> LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></ExternalLink></Reveal>
          <Reveal variant="right" className="contact-link-reveal" delay={180}><ExternalLink className="contact-link" href={portfolio.personal.github}><Github size={17} aria-hidden="true" /> GitHub <ArrowUpRight size={14} aria-hidden="true" /></ExternalLink></Reveal>
        </div>
      </div>
    </section>
  );
}
