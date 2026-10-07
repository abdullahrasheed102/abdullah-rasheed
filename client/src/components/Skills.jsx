import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { portfolio } from '../data/portfolio.js';
import SectionHeading from './SectionHeading.jsx';
import useInView from '../hooks/useInView.js';
import useReducedMotion from '../hooks/useReducedMotion.js';
import useReveal from '../hooks/useReveal.js';

const pipelineNodes = {
  programming: [
    ['Language', 'Python'],
  ],
  'ai & machine learning': [
    ['Prepare', 'Data Preprocessing'], ['Process', 'NumPy · Pandas'], ['Model', 'Scikit-learn'], ['Evaluate', 'Model Training & Evaluation'],
  ],
  'generative ai': [
    ['Design', 'Prompt Engineering'], ['Orchestrate', 'LangChain'], ['Generate', 'LLMs'], ['Connect', 'Hugging Face'],
  ],
  'backend & apis': [
    ['Build', 'Python Backend Development'], ['Expose', 'REST API Integration'], ['Connect', 'Third-Party API Integration'],
  ],
  '3d data & visualization': [
    ['Input', 'Mesh Data'], ['Process', 'Point-Cloud Data'], ['Render', 'Three.js'], ['View', 'Color-Overlay Visualization'],
  ],
  tools: [
    ['Explore', 'Jupyter Notebook'], ['Visualize', 'Matplotlib'], ['Track', 'Git'], ['Share', 'GitHub'],
  ],
};

function PipelineCard({ group, index }) {
  const reveal = useReveal();
  const { ref: cardRef, inView } = useInView({ threshold: 0.24 });
  const [activeNode, setActiveNode] = useState(-1);
  const [hasRun, setHasRun] = useState(false);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(0);
  const reduced = useReducedMotion();
  const nodes = pipelineNodes[group.title.toLowerCase()] || group.items.map((item, i) => [`Step ${i + 1}`, item]);

  useEffect(() => () => window.clearInterval(timerRef.current), []);

  const run = () => {
    window.clearInterval(timerRef.current);
    setHasRun(true);
    if (reduced) {
      setActiveNode(nodes.length - 1);
      setRunning(false);
      return;
    }
    setRunning(true);
    setActiveNode(-1);
    let current = 0;
    timerRef.current = window.setInterval(() => {
      setActiveNode(current);
      current += 1;
      if (current >= nodes.length) {
        window.clearInterval(timerRef.current);
        setRunning(false);
      }
    }, 240);
  };

  useEffect(() => {
    if (inView && !hasRun) run();
  }, [inView, hasRun]);

  return (
    <article className="skill-pipeline-card" ref={node => { cardRef.current = node; reveal(node); }} data-reveal="rise" style={{ '--card-index': index }}>
      <header className="skill-card-heading">
        <span className="skill-card-index">0{index + 1}</span>
        <h3>{group.title}</h3>
      </header>
      <div className="pipeline-track" role="group" aria-label={`${group.title} technology pipeline`}>
        {nodes.map(([stage, tech], nodeIndex) => (
          <div className={`pipeline-node ${reduced || activeNode >= nodeIndex ? 'is-lit' : ''}`} key={`${stage}-${tech}`}>
            <span className="pipeline-node-dot" aria-hidden="true"><i /></span>
            <span className="pipeline-stage">{stage}</span>
            <strong>{tech}</strong>
            {nodeIndex < nodes.length - 1 && <span className={`pipeline-connector ${activeNode > nodeIndex ? 'is-active' : ''}`} aria-hidden="true" />}
          </div>
        ))}
      </div>
      <ul className="skill-tags" aria-label={`${group.title} skills`}>
        {group.items.map((item, tagIndex) => <li key={item} style={{ '--tag-index': tagIndex }}>{item}</li>)}
      </ul>
      <button className="pipeline-run" type="button" onClick={run} disabled={running}>
        <Play size={13} fill="currentColor" aria-hidden="true" /> {running ? 'Running' : 'Run pipeline'} <ArrowRight size={13} aria-hidden="true" />
      </button>
    </article>
  );
}

export default function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="wrap">
        <SectionHeading index="03" label="Skills" title={<>Tools for <em>building systems.</em></>} subtitle="Technologies organized around the work they support." />
        <div className="skills-grid">
          {portfolio.skills.map((group, index) => <PipelineCard key={group.title} group={group} index={index} />)}
        </div>
      </div>
    </section>
  );
}
