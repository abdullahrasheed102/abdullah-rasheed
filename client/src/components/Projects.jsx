import { ArrowUpRight, Github } from 'lucide-react';
import { portfolio } from '../data/portfolio.js';
import ExternalLink from './ExternalLink.jsx';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import ArchitectureDiagram from './ArchitectureDiagram.jsx';

function ProjectLinks({ project }) {
  const hasProjectLinks = project.github || project.demo;

  if (!hasProjectLinks) return null;

  return (
    <div className="project-links">
      {project.github && <ExternalLink href={project.github}><Github size={15} aria-hidden="true" /> Source code <ArrowUpRight size={13} aria-hidden="true" /></ExternalLink>}
      {project.demo && <ExternalLink href={project.demo}>Live demo <ArrowUpRight size={13} aria-hidden="true" /></ExternalLink>}
    </div>
  );
}

export default function Projects() {
  return (
    <section className="section wrap" id="projects">
      <SectionHeading index="03" eyebrow="SELECTED WORK" title="Projects" text="Selected project work in multi-agent AI, 3D data processing, generative AI, and voice interaction." />
      <p className="project-profile-link"><ExternalLink href={portfolio.personal.github}><Github size={16} aria-hidden="true" /> View GitHub profile <ArrowUpRight size={14} aria-hidden="true" /></ExternalLink></p>
      <div className="projects-grid">
        {portfolio.projects.map((project, index) => (
          <Reveal as="article" className="project-card" delay={index * 85} key={project.name}>
            <p className="project-category">{project.category}</p>
            <h3>{project.name}</h3>
            <p className="project-status">{project.status}</p>
            <p className="project-summary">{project.summary}</p>
            {project.image && <img className="project-image" src={project.image} alt={project.imageAlt || `Screenshot of ${project.name}`} loading="lazy" />}
            <ArchitectureDiagram diagram={project.architecture} />
            <ul className="tag-list project-tags" aria-label="Technologies">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
            <details className="project-details">
              <summary>Problem, approach, and result</summary>
              <dl>
                <div><dt>Problem</dt><dd>{project.problem}</dd></div>
                <div><dt>Solution</dt><dd>{project.solution}</dd></div>
                <div><dt>Result</dt><dd>{project.result}</dd></div>
              </dl>
            </details>
            <ProjectLinks project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
