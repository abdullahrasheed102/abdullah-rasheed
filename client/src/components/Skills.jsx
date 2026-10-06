import { portfolio } from '../data/portfolio.js';
import SectionHeading from './SectionHeading.jsx';
import Reveal from './Reveal.jsx';

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <SectionHeading index="02" eyebrow="TECH STACK" title="Skills & technologies" text="Languages, libraries, APIs, and tools from the listed experience." />
        <div className="skills-list">
          {portfolio.skills.map((group, groupIndex) => (
            <Reveal as="article" className="skill-row" delay={groupIndex * 35} key={group.title}>
              <h3>{group.title}</h3>
              <ul>{group.items.map((skill, skillIndex) => (
                <Reveal as="li" className="skill-tag" delay={skillIndex * 28} key={skill}>{skill}</Reveal>
              ))}</ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
