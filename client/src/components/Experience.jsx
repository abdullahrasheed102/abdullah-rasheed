import { portfolio } from '../data/portfolio.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <SectionHeading index="04" eyebrow="EXPERIENCE" title="Professional experience" text="Internship work in multi-agent AI and 3D data processing." />
        <div className="experience-list">
          {portfolio.experience.map((item, index) => (
            <Reveal as="article" variant="left" className="experience-item" delay={index * 90} key={item.company}>
              <div className="experience-meta"><span>{item.dates}</span></div>
              <div className="experience-content">
                <h3>{item.role}</h3>
                <p className="experience-company">{item.company}</p>
                <h4>{item.project}</h4>
                <p className="experience-description">{item.description}</p>
                <ul>{item.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
                <p className="list-label">Technologies and areas</p>
                <ul className="tag-list" aria-label="Technologies and areas">{item.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
