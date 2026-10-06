import { ArrowDownRight, ArrowUpRight, Download, Github, Linkedin } from 'lucide-react';
import { portfolio } from '../data/portfolio.js';
import AgentNetwork from './AgentNetwork.jsx';
import DecodedName from './DecodedName.jsx';
import ExternalLink from './ExternalLink.jsx';
import MagneticLink from './MagneticLink.jsx';
import TerminalLine from './TerminalLine.jsx';

export default function Hero() {
  return (
    <section className="hero wrap" id="top" aria-labelledby="hero-title">
      <AgentNetwork />
      <div className="hero-copy">
        <p className="hero-kicker">{portfolio.personal.location}</p>
        <h1 id="hero-title"><DecodedName name={portfolio.personal.name} /></h1>
        <p className="hero-role">{portfolio.personal.title}</p>
        <TerminalLine />
        <p className="hero-specialty">Generative AI · LLMs & RAG · Agentic AI · Machine Learning</p>
        <p className="hero-intro">{portfolio.personal.summary}</p>
        <div className="hero-actions">
          <MagneticLink className="button button-primary" href="#projects">View projects <ArrowDownRight size={17} aria-hidden="true" /></MagneticLink>
          <MagneticLink className="button button-secondary" href={portfolio.personal.resumeUrl} download="Muhammad-Abdullah-Rasheed-Resume.pdf">
            Download resume <Download size={16} aria-hidden="true" />
          </MagneticLink>
        </div>
        <div className="hero-socials">
          <ExternalLink href={portfolio.personal.github}><Github size={16} aria-hidden="true" /> GitHub <ArrowUpRight size={13} aria-hidden="true" /></ExternalLink>
          <ExternalLink href={portfolio.personal.linkedin}><Linkedin size={16} aria-hidden="true" /> LinkedIn <ArrowUpRight size={13} aria-hidden="true" /></ExternalLink>
        </div>
        <p className="hero-status">{portfolio.personal.title} · {portfolio.personal.location}</p>
      </div>
      <aside className="hero-aside" aria-label="AI system pipeline and areas of experience">
        <ul className="focus-list">
          <li>Multi-agent AI with CrewAI</li>
          <li>LLM workflows with LangChain</li>
          <li>3D mesh and point-cloud data</li>
        </ul>
        <p className="aside-note">Python · Gemini API · NumPy · Pandas · Three.js</p>
      </aside>
    </section>
  );
}
