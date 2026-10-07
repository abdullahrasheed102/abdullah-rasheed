import { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { portfolio } from '../data/portfolio.js';

const links = [
  ['about', 'About'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['education', 'Education'],
  ['contact', 'Contact'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('about');
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const linkRefs = useRef({});
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  const moveUnderline = useCallback(() => {
    const activeLink = linkRefs.current[active];
    const nav = navRef.current;
    if (!activeLink || !nav) return;
    setUnderline({ left: activeLink.offsetLeft, width: activeLink.offsetWidth });
  }, [active]);

  useEffect(() => {
    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 18));
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', moveUnderline);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', moveUnderline);
    };
  }, [moveUnderline]);

  useEffect(() => {
    moveUnderline();
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-22% 0px -62% 0px', threshold: [0, 0.1, 0.3] });
    links.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [moveUnderline]);

  useEffect(() => moveUnderline(), [active, open, moveUnderline]);

  const closeMenu = () => setOpen(false);
  const resume = portfolio.personal.resumeUrl;

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="nav wrap" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={closeMenu} aria-label={`${portfolio.personal.name}, home`}>
          <span className="brand-mark">MA</span><span className="brand-name">{portfolio.personal.shortName}</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="primary-links"
          onClick={() => setOpen((value) => !value)}
        >{open ? <X size={20} /> : <Menu size={20} />}</button>
        <div id="primary-links" ref={navRef} className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              ref={(node) => { linkRefs.current[id] = node; }}
              aria-current={active === id ? 'location' : undefined}
              onClick={closeMenu}
            >{label}</a>
          ))}
          <span className="nav-underline" aria-hidden="true" style={{ transform: `translateX(${underline.left}px)`, width: underline.width }} />
          <a className="nav-resume" href={resume} download>
            Resume <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  );
}
