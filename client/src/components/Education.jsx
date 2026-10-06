import { portfolio } from '../data/portfolio.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

export default function Education() {
  return (
    <section className="section wrap" id="education">
      <SectionHeading index="05" eyebrow="EDUCATION" title="Education" />
      <div className="education-list">
        {portfolio.education.map((item, index) => (
          <Reveal as="article" className={`education-card ${item.level === 'University' ? 'education-primary' : 'education-secondary'}`} delay={index * 100} key={item.institution}>
            <div className="education-meta"><span>{item.level}</span><span>{item.dates}</span></div>
            <div>
              <h3>{item.degree}</h3>
              <p>{item.institution}</p>
              <p className="education-result">{item.result}</p>
              {item.details && <p>{item.details}</p>}
            </div>
          </Reveal>
        ))}
      </div>
      <div className="certifications">
        <h3>Certifications</h3>
        <ul>{portfolio.certifications.map((item, index) => (
          <Reveal as="li" delay={index * 75} key={item}>{item}</Reveal>
        ))}</ul>
      </div>
    </section>
  );
}
