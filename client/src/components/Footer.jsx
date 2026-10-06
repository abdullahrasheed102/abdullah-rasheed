import { portfolio } from '../data/portfolio.js';
import Reveal from './Reveal.jsx';

export default function Footer() {
  return (
    <Reveal as="footer" variant="fade" className="footer footer-reveal">
      <div className="wrap footer-inner">
        <a className="brand" href="#top">{portfolio.personal.shortName}<span>.</span></a>
        <p>{portfolio.personal.title} · {portfolio.personal.location}</p>
        <a href="#top" className="back-top">Back to top ↑</a>
        <small>© {new Date().getFullYear()} {portfolio.personal.name}</small>
      </div>
    </Reveal>
  );
}
