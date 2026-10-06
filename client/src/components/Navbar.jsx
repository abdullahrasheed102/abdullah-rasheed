import { useEffect, useRef, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { portfolio } from '../data/portfolio.js';
import MagneticLink from './MagneticLink.jsx';

const navigation = [
  ['Home', '#top'],
  ['About', '#about'],
  ['Experience', '#experience'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Education', '#education'],
  ['Contact', '#contact'],
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const navRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    function onActiveSection(event) { setActiveSection(event.detail); }
    window.addEventListener('portfolio:active-section', onActiveSection);
    return () => {
      window.removeEventListener('portfolio:active-section', onActiveSection);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) return undefined;
    const nav = navRef.current;
    const activeLink = nav?.querySelector(`a[href="#${activeSection}"]`);
    if (!nav || !activeLink) return undefined;
    const measure = () => setIndicator({ left: activeLink.offsetLeft, width: activeLink.offsetWidth });
    measure();
    window.addEventListener('resize', measure, { passive: true });
    return () => window.removeEventListener('resize', measure);
  }, [activeSection, menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    function closeOnEscape(event) {
      if (event.key === 'Escape') setMenuOpen(false);
    }
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <nav className="nav wrap" aria-label="Main navigation">
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
          {portfolio.personal.shortName}<span>.</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`} id="nav-links" ref={navRef}>
          {navigation.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={activeSection === href.slice(1) ? 'is-active' : undefined}
              aria-current={activeSection === href.slice(1) ? 'location' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <span className="nav-indicator" aria-hidden="true" style={{ left: `${indicator.left}px`, width: `${indicator.width}px` }} />
          <MagneticLink className="nav-resume" href={portfolio.personal.resumeUrl} download="Muhammad-Abdullah-Rasheed-Resume.pdf">
            Resume <Download size={14} aria-hidden="true" />
          </MagneticLink>
        </div>
      </nav>
    </header>
  );
}
