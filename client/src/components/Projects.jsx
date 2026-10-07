import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Github } from 'lucide-react';
import { portfolio } from '../data/portfolio.js';
import SectionHeading from './SectionHeading.jsx';
import useInView from '../hooks/useInView.js';
import useReducedMotion from '../hooks/useReducedMotion.js';
import useReveal from '../hooks/useReveal.js';

const filters = ['All', 'Agentic AI', 'Generative AI', '3D Data', 'Voice'];

const stepsByProject = {
  'NOVA AI Virtual Assistant': ['Microphone input', 'Speech Recognition', 'Intent recognition', 'Command execution', 'Text-to-speech reply'],
  'Job & Project Matching System': ['Job or project description', 'CrewAI classification', 'Requirements and developer profile comparison', 'Recommendation or feasibility estimate'],
  '3D Data Processing & Visualization': ['Mesh and point-cloud data', 'Python processing with NumPy and Pandas', 'Storage schema', 'Three.js color-overlay view'],
  'AI Instagram Post Generator': ['Instagram post link', 'Hugging Face image generation', 'Gemini text through LangChain', 'Image, caption, and hashtags'],
};

function isInFilter(project, filter) {
  if (filter === 'All') return true;
  if (filter === 'Agentic AI') return project.category.toLowerCase().includes('agentic');
  if (filter === 'Generative AI') return project.category.toLowerCase().includes('generative');
  if (filter === '3D Data') return project.category.toLowerCase().includes('3d');
  return project.category.toLowerCase().includes('voice') || project.name.includes('NOVA');
}

function cleanResult(result = '') {
  return result.replace(/\s*No [^.]+(?:were|was) provided\.?/gi, '').trim();
}

function ProjectDetail({ project }) {
  const [activeStep, setActiveStep] = useState(-1);
  const hasPlayed = useRef(false);
  const steps = stepsByProject[project.name] || [];
  const { ref, inView } = useInView({ threshold: 0.18 });
  const reduced = useReducedMotion();
  const reveal = useReveal();

  useEffect(() => {
    if (!inView || hasPlayed.current) return undefined;
    hasPlayed.current = true;
    if (reduced) {
      setActiveStep(steps.length - 1);
      return undefined;
    }
    let step = 0;
    const timer = window.setInterval(() => {
      setActiveStep(step);
      step += 1;
      if (step >= steps.length) window.clearInterval(timer);
    }, 240);
    return () => window.clearInterval(timer);
  }, [inView, project.name, reduced, steps.length]);

  return (
    <article className="project-detail" key={project.name} ref={node => { ref.current = node; reveal(node); }} data-reveal="rise" aria-live="polite">
      <p className="project-detail-eyebrow">{project.category}</p>
      <div className="project-detail-title">
        <h3>{project.name}</h3>
        <span className="project-status">{project.status}</span>
      </div>
      <p className="project-summary">{project.summary}</p>
      <div className="project-story">
        <div><span>Problem</span><p>{project.problem}</p></div>
        <div><span>Approach</span><p>{project.solution}</p></div>
        <div><span>Result</span><p>{cleanResult(project.result)}</p></div>
      </div>
      <div className="project-how">
        <h4>How it works</h4>
        <ol className="project-steps">
          {steps.map((step, index) => <li className={reduced || activeStep >= index ? 'is-lit' : ''} key={step}>
            <span className="project-step-dot" aria-hidden="true" />
            <span>{step}</span>
          </li>)}
        </ol>
      </div>
      <ul className="project-tags" aria-label="Project technologies">
        {project.technologies.map((tech) => <li key={tech}>{tech}</li>)}
      </ul>
      {(project.github || project.demo) && <div className="project-links">
        {project.github && <a href={project.github} target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" /> View source <ArrowUpRight size={13} aria-hidden="true" /></a>}
        {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={13} aria-hidden="true" /></a>}
      </div>}
    </article>
  );
}

export default function Projects() {
  const reveal = useReveal();
  const projects = portfolio.projects;
  const [filter, setFilter] = useState('All');
  const [selectedName, setSelectedName] = useState(projects[0]?.name || null);
  const visibleProjects = useMemo(() => projects.filter((project) => isInFilter(project, filter)), [filter, projects]);
  const selected = selectedName ? visibleProjects.find((project) => project.name === selectedName) : undefined;

  useEffect(() => {
    if (!visibleProjects.some((project) => project.name === selectedName)) setSelectedName(visibleProjects[0]?.name || null);
  }, [selectedName, visibleProjects]);

  const chooseProject = (name) => setSelectedName((current) => (current === name ? null : name));

  return (
    <section className="section projects-section" id="projects">
      <div className="wrap">
        <SectionHeading index="04" label="Projects" title={<>Selected <em>work.</em></>} subtitle="A closer look at systems built through internships and project work." />
        <div className="project-filters" aria-label="Filter projects">
          {filters.map((item) => <button key={item} type="button" className={filter === item ? 'is-active' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <div className="project-browser">
          <div className="project-list" role="list" aria-label="Projects">
            {visibleProjects.map((project, index) => {
              const expanded = selected?.name === project.name;
              return (
                <div className={`project-list-item ${expanded ? 'is-selected' : ''}`} key={project.name} role="listitem" ref={reveal} data-reveal="rise" style={{ '--item-index': index }}>
                  <button type="button" className="project-select" aria-expanded={expanded} aria-controls={`project-mobile-panel-${index} project-detail-panel`} onClick={() => chooseProject(project.name)}>
                    <span className="project-list-number">0{index + 1}</span>
                    <span className="project-list-copy"><small>{project.category}</small><strong>{project.name}</strong></span>
                    <ArrowDownRight size={17} aria-hidden="true" />
                  </button>
                  <div className="project-mobile-detail" id={`project-mobile-panel-${index}`}>
                    {expanded && <ProjectDetail project={project} />}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="project-detail-shell" id="project-detail-panel">
            {selected && <ProjectDetail project={selected} key={`desktop-${selected.name}`} />}
          </div>
        </div>
      </div>
    </section>
  );
}
