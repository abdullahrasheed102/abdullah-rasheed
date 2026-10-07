import { ArrowUp } from 'lucide-react';
import { portfolio } from '../data/portfolio.js';
import useReveal from '../hooks/useReveal.js';

export default function Footer() {
  const reveal = useReveal();
  return (
    <footer className="site-footer" ref={reveal} data-reveal="fade">
      <div className="wrap footer-inner">
        <a className="footer-brand" href="#home"><span className="brand-mark">MA</span><strong>{portfolio.personal.name}</strong></a>
        <span className="footer-title">{portfolio.personal.title}</span>
        <a className="back-top" href="#home">Back to top <ArrowUp size={14} aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
