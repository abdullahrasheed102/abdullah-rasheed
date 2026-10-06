import { portfolio } from '../data/portfolio.js';
import SectionHeading from './SectionHeading.jsx';
import Reveal from './Reveal.jsx';

export default function About() {
  return (
    <section className="section wrap" id="about">
      <div className="two-col">
        <SectionHeading index="01" eyebrow="PROFILE" title="About me" />
        <Reveal className="about-copy">
          {portfolio.personal.about.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <div className="about-facts">
            <div><span>BASED IN</span><b>{portfolio.personal.location}</b></div>
            <div><span>EDUCATION</span><b>{portfolio.education[0].degree}</b></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
