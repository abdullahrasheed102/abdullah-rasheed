import { portfolio } from '../data/portfolio.js';
import SectionHeading from './SectionHeading.jsx';
import useInView from '../hooks/useInView.js';
import useReveal from '../hooks/useReveal.js';

const innerTech = ['LLMs', 'RAG', 'LangChain', 'CrewAI', 'Gemini API', 'Hugging Face'];
const outerTech = ['Python', 'NumPy', 'Pandas', 'Three.js', 'Computer Vision'];

function OrbitRing({ tech, className }) {
  return (
    <div className={`orbit-ring ${className}`} aria-hidden="true">
      {tech.map((item, index) => {
        const angle = (index * Math.PI * 2) / tech.length;
        const x = 50 + (Math.cos(angle) * 45);
        const y = 50 + (Math.sin(angle) * 45);
        return <span className="orbit-point" key={item} style={{ '--orbit-x': `${x}%`, '--orbit-y': `${y}%` }}><span className="orbit-chip">{item}</span></span>;
      })}
    </div>
  );
}

export default function About() {
  const reveal = useReveal();
  const { ref: railRef, inView } = useInView({ threshold: 0.18 });
  const { ref: orbitViewRef, inView: orbitInView } = useInView({ threshold: 0.08, once: false });
  const { about, location } = portfolio.personal;
  const degree = portfolio.education.find((item) => item.level === 'University');

  return (
    <section className="section about-section" id="about">
      <div className="wrap">
        <SectionHeading index="01" label="About" title={<>Engineering useful <em>AI systems.</em></>} subtitle="My background and the areas I work across." />
        <div className="about-layout">
          <div className="about-copy" ref={reveal} data-reveal="rise">
            <div className={`about-rail ${inView ? 'is-filled' : ''}`} ref={railRef} aria-hidden="true"><span /></div>
            <div className="about-paragraphs">
              {about.map((paragraph, index) => <p key={paragraph} data-reveal="rise" ref={reveal} style={{ '--reveal-delay': `${index * 90}ms` }}>{paragraph}</p>)}
              <div className="about-meta" ref={reveal} data-reveal="rise" data-delay="2">
                <span><small>EDUCATION</small><strong>{degree?.degree}</strong><span>{degree?.institution}</span></span>
                <span><small>LOCATION</small><strong>{location}</strong></span>
              </div>
            </div>
          </div>
          <div className={`orbit-card ${orbitInView ? 'is-in-view' : ''}`} ref={node => { orbitViewRef.current = node; reveal(node); }} data-reveal="rise" aria-hidden="true">
            <div className="orbit-graphic">
              <OrbitRing tech={outerTech} className="orbit-outer" />
              <OrbitRing tech={innerTech} className="orbit-inner" />
              <div className="orbit-core"><span>MA</span><i /></div>
            </div>
            <p className="orbit-caption"><span>GENERATIVE AI</span><i /><span>DATA &amp; 3D</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
