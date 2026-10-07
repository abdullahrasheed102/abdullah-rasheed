import { GraduationCap, Award } from 'lucide-react';
import { portfolio } from '../data/portfolio.js';
import SectionHeading from './SectionHeading.jsx';
import useReveal from '../hooks/useReveal.js';

export default function Education() {
  const reveal = useReveal();
  return (
    <section className="section education-section" id="education">
      <div className="wrap">
        <SectionHeading index="05" label="Education" title={<>A foundation in <em>artificial intelligence.</em></>} subtitle="Formal study and continued learning." />
        <div className="education-list">
          {portfolio.education.map((item, index) => (
            <article className={`education-row ${index === 0 ? 'education-primary' : ''}`} key={`${item.institution}-${item.dates}`} ref={reveal} data-reveal="rise" style={{ '--row-delay': `${index * 120}ms` }}>
              <div className="education-icon" aria-hidden="true"><GraduationCap size={20} /></div>
              <div className="education-copy">
                <p className="education-level">{item.level}</p>
                <h3>{item.degree}</h3>
                <p>{item.institution}</p>
                {item.details && <p>{item.details}</p>}
              </div>
              <div className="education-facts"><span>{item.dates}</span><strong>{item.result}</strong></div>
            </article>
          ))}
        </div>
        <div className="certification-block">
          <div className="certification-heading" ref={reveal} data-reveal="slide">
            <span className="certification-icon" aria-hidden="true"><Award size={18} /></span>
            <h3>Certifications</h3>
          </div>
          <ul className="certification-list">
            {portfolio.certifications.map((certification, index) => <li key={certification} ref={reveal} data-reveal="rise" style={{ '--row-delay': `${index * 100}ms` }}>{certification}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
