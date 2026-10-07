import { useEffect, useRef, useState } from 'react';
import { portfolio } from '../data/portfolio.js';
import SectionHeading from './SectionHeading.jsx';
import useInView from '../hooks/useInView.js';
import useReveal from '../hooks/useReveal.js';
import useScrollProgress from '../hooks/useScrollProgress.js';

function TimelineEntry({ entry, index }) {
  const reveal = useReveal();
  const { ref: viewRef, inView } = useInView({ threshold: 0.2 });
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    if (inView) setArrived(true);
  }, [inView]);

  return (
    <article className={`timeline-entry ${arrived ? 'has-arrived' : ''}`} ref={node => { viewRef.current = node; reveal(node); }} data-reveal={index % 2 ? 'side-right' : 'side-left'}>
      <div className="timeline-marker" aria-hidden="true"><span /></div>
      <div className="timeline-date">{entry.dates}</div>
      <div className="timeline-content">
        <p className="timeline-role">{entry.role}</p>
        <h3>{entry.company}</h3>
        <p className="timeline-project">{entry.project}</p>
        <p className="timeline-description">{entry.description}</p>
        <ul className="timeline-details">
          {entry.details.map((detail) => <li key={detail}>{detail}</li>)}
        </ul>
        <ul className="timeline-tags" aria-label="Technologies and areas">
          {entry.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </div>
    </article>
  );
}

export default function Experience() {
  const timelineRef = useRef(null);
  const progress = useScrollProgress(timelineRef, 'element');
  const reveal = useReveal();
  return (
    <section className="section experience-section" id="experience">
      <div className="wrap">
        <SectionHeading index="02" label="Experience" title={<>Learning through <em>building.</em></>} subtitle="Internship work across AI systems, API development, and 3D data." />
        <div className="experience-timeline" ref={node => { timelineRef.current = node; reveal(node); }} data-reveal="rise" style={{ '--timeline-fill': progress }}>
          <span className="timeline-rail" aria-hidden="true"><i /></span>
          {portfolio.experience.map((entry, index) => <TimelineEntry key={`${entry.company}-${entry.dates}`} entry={entry} index={index} />)}
        </div>
      </div>
    </section>
  );
}
