import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Download, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { portfolio } from './data/portfolio.js';

const navigation = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Education', '#education'],
  ['Contact', '#contact'],
];

function ExternalLink({ href, children, ...props }) {
  if (!href) return <span className="unavailable-link" {...props}>{children}</span>;
  return <a href={href} target="_blank" rel="noreferrer" {...props}>{children}</a>;
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return undefined;
    function closeOnEscape(event) {
      if (event.key === 'Escape') setMenuOpen(false);
    }
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <nav className="nav wrap" aria-label="Main navigation">
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
          Muhammad Abdullah<span>.</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`} id="nav-links">
          {navigation.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="nav-resume" href={portfolio.personal.resumeUrl} download="Muhammad-Abdullah-Rasheed-Resume.pdf">
            Download resume <Download size={14} aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero wrap" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-kicker">{portfolio.personal.title} <span>·</span> {portfolio.personal.location}</p>
        <h1 id="hero-title">{portfolio.personal.name}</h1>
        <p className="hero-specialty">Generative AI · LLMs & RAG · Agentic AI · Machine Learning</p>
        <p className="hero-intro">{portfolio.personal.summary}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">View projects <ArrowDownRight size={17} aria-hidden="true" /></a>
          <a className="button button-secondary" href={portfolio.personal.resumeUrl} download="Muhammad-Abdullah-Rasheed-Resume.pdf">
            Download resume <Download size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="hero-socials">
          <ExternalLink href={portfolio.personal.github}><Github size={16} aria-hidden="true" /> GitHub <ArrowUpRight size={13} aria-hidden="true" /></ExternalLink>
          <ExternalLink href={portfolio.personal.linkedin}><Linkedin size={16} aria-hidden="true" /> LinkedIn <ArrowUpRight size={13} aria-hidden="true" /></ExternalLink>
        </div>
      </div>
      <aside className="hero-aside" aria-label="Areas of experience">
        <p className="aside-label">AREAS OF EXPERIENCE</p>
        <div className="focus-line"><span>01</span><b>Multi-agent AI with CrewAI</b></div>
        <div className="focus-line"><span>02</span><b>LLM workflows with LangChain</b></div>
        <div className="focus-line"><span>03</span><b>3D mesh and point-cloud data</b></div>
        <p className="aside-note">Python · Gemini API · NumPy · Pandas</p>
      </aside>
      <a className="scroll-cue" href="#about"><span>MORE ABOUT MY WORK</span><ArrowDownRight size={15} aria-hidden="true" /></a>
    </section>
  );
}

function SectionHeading({ index, eyebrow, title, text }) {
  return (
    <div className="section-heading">
      <span className="section-index">{index} / {eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function About() {
  return (
    <section className="section wrap" id="about">
      <div className="two-col">
        <SectionHeading index="01" eyebrow="ABOUT" title={<>AI graduate.<br /><em>Engineer in practice.</em></>} />
        <div className="about-copy">
          {portfolio.personal.about.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <div className="about-facts">
            <div><span>BASED IN</span><b>{portfolio.personal.location}</b></div>
            <div><span>EDUCATION</span><b>{portfolio.education[0].degree}</b></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section section-tinted" id="skills">
      <div className="wrap">
        <SectionHeading index="02" eyebrow="TECHNICAL SKILLS" title="A focused toolkit." text="Technologies and methods used across internships and projects." />
        <div className="skills-grid">
          {portfolio.skills.map(group => (
            <article className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <ul>{group.items.map(skill => <li key={skill}>{skill}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectLinks({ project }) {
  return (
    <div className="project-links">
      {project.github
        ? <ExternalLink href={project.github}><Github size={15} aria-hidden="true" /> Source code <ArrowUpRight size={13} aria-hidden="true" /></ExternalLink>
        : <span className="unavailable-link">GitHub: TODO: ADD INFORMATION</span>}
      {project.demo ? <ExternalLink href={project.demo}>Live demo <ArrowUpRight size={13} aria-hidden="true" /></ExternalLink> : <span className="unavailable-link">Live demo: TODO: ADD INFORMATION</span>}
    </div>
  );
}

function Projects() {
  return (
    <section className="section wrap" id="projects">
      <SectionHeading index="03" eyebrow="SELECTED PROJECTS" title="Applied AI, built to work." text="Project scope, implementation, technologies, and current status. Missing implementation details and results are marked clearly." />
      <p className="project-profile-link"><ExternalLink href={portfolio.personal.github}><Github size={16} aria-hidden="true" /> View GitHub profile <ArrowUpRight size={14} aria-hidden="true" /></ExternalLink></p>
      <div className="projects-grid">
        {portfolio.projects.map(project => (
          <article className="project-card" key={project.name}>
            <p className="project-category">{project.category}</p>
            <h3>{project.name}</h3>
            <p className="project-status">{project.status}</p>
            {project.image && <img className="project-image" src={project.image} alt={project.imageAlt || `Screenshot of ${project.name}`} loading="lazy" />}
            <dl className="project-details">
              <div><dt>Problem</dt><dd>{project.problem}</dd></div>
              <div><dt>Solution</dt><dd>{project.solution}</dd></div>
            </dl>
            <div className="project-tech"><span>Technologies</span>{project.technologies.length ? <ul className="tag-list" aria-label="Technologies">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul> : <span className="unavailable-link">{project.technologyNote}</span>}</div>
            <p className="project-result"><b>Result</b>{project.result}</p>
            <ProjectLinks project={project} />
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section section-tinted" id="experience">
      <div className="wrap">
        <SectionHeading index="04" eyebrow="EXPERIENCE" title="AI engineering internships." text="Hands-on internship work across multi-agent applications and 3D data processing." />
        <div className="experience-list">
          {portfolio.experience.map(item => (
            <article className="experience-item" key={item.company}>
              <div className="experience-meta"><span>{item.dates}</span><span>{item.company}</span></div>
              <div className="experience-content">
                <h3>{item.role}</h3>
                <h4>{item.project}</h4>
                <p className="experience-description">{item.description}</p>
                <ul>{item.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
                <p className="list-label">Technologies and areas</p>
                <ul className="tag-list" aria-label="Technologies and areas">{item.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="section wrap education-section" id="education">
      <SectionHeading index="05" eyebrow="EDUCATION" title="A foundation in artificial intelligence." />
      <div className="education-list">
        {portfolio.education.map(item => (
          <article className={`education-card ${item.level === 'University' ? 'education-primary' : 'education-secondary'}`} key={item.institution}>
            <div className="education-meta"><span>{item.level}</span><span>{item.dates}</span></div>
            <div>
              <h3>{item.degree}</h3>
              <p>{item.institution}</p>
              <p className="education-result">{item.result}</p>
              {item.details && <p>{item.details}</p>}
            </div>
          </article>
        ))}
      </div>
      <div className="certifications">
        <h3>Certifications</h3>
        <ul>{portfolio.certifications.map(item => <li key={item}>{item}</li>)}</ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="wrap contact-layout">
        <div className="contact-copy">
          <SectionHeading index="06" eyebrow="CONTACT" title={<>Let’s build<br /><em>something useful.</em></>} />
          <p>Open to AI Engineer opportunities, AI/ML roles, AI internships, Python and backend opportunities, and interesting AI projects.</p>
        </div>
        <div className="contact-links" aria-label="Contact links">
          <a href={`mailto:${portfolio.personal.email}`}><Mail size={17} aria-hidden="true" />{portfolio.personal.email}<ArrowUpRight size={14} aria-hidden="true" /></a>
          <ExternalLink href={portfolio.personal.linkedin}><Linkedin size={17} aria-hidden="true" /> LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></ExternalLink>
          <ExternalLink href={portfolio.personal.github}><Github size={17} aria-hidden="true" /> GitHub <ArrowUpRight size={14} aria-hidden="true" /></ExternalLink>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <a className="brand" href="#top">{portfolio.personal.shortName}<span>.</span></a>
        <p>{portfolio.personal.title} · {portfolio.personal.location}</p>
        <a href="#top" className="back-top">Back to top ↑</a>
        <small>© {new Date().getFullYear()} {portfolio.personal.name}</small>
      </div>
    </footer>
  );
}

export default function App() {
  return <><Navbar /><main><Hero /><About /><Skills /><Projects /><Experience /><Education /><Contact /></main><Footer /></>;
}
