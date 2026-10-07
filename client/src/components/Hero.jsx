import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, MoveUpRight } from 'lucide-react';
import { portfolio } from '../data/portfolio.js';
import useInView from '../hooks/useInView.js';
import useReducedMotion from '../hooks/useReducedMotion.js';
import useReveal from '../hooks/useReveal.js';

const roleLines = ['AI Engineer', 'LLM Application Developer', 'Multi-Agent Systems', 'Computer Vision'];
const ambientTech = ['Python', 'LangChain', 'CrewAI', 'RAG', 'Hugging Face', 'Three.js'];

function LanyardBadge() {
  const badgeRef = useRef(null);
  const startX = useRef(0);
  const returnFrame = useRef(0);
  const returnTimer = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [returning, setReturning] = useState(false);
  const reduced = useReducedMotion();
  const { name, title, github } = portfolio.personal;
  const handle = useMemo(() => github.replace(/\/$/, '').split('/').pop(), [github]);

  useEffect(() => () => {
    cancelAnimationFrame(returnFrame.current);
    clearTimeout(returnTimer.current);
  }, []);

  const begin = (event) => {
    if (reduced || event.button > 0) return;
    event.preventDefault();
    startX.current = event.clientX;
    setDragging(true);
    setReturning(false);
    event.currentTarget.classList.add('is-dragging');
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const drag = (event) => {
    if (!dragging || !badgeRef.current) return;
    const angle = Math.max(-28, Math.min(28, (event.clientX - startX.current) * 0.34));
    badgeRef.current.style.setProperty('--badge-angle', `${angle}deg`);
  };

  const release = (event) => {
    if (!dragging || !badgeRef.current) return;
    setDragging(false);
    setReturning(true);
    const node = badgeRef.current;
    node.classList.remove('is-dragging');
    node.classList.add('is-returning');
    const currentAngle = node.style.getPropertyValue('--badge-angle') || '0deg';
    node.style.setProperty('--badge-angle', currentAngle);
    cancelAnimationFrame(returnFrame.current);
    returnFrame.current = requestAnimationFrame(() => node.style.setProperty('--badge-angle', '0deg'));
    if (node.hasPointerCapture?.(event.pointerId)) node.releasePointerCapture(event.pointerId);
    clearTimeout(returnTimer.current);
    returnTimer.current = window.setTimeout(() => {
      node.classList.remove('is-returning');
      node.style.removeProperty('--badge-angle');
      setReturning(false);
    }, 650);
  };

  return (
    <div className="lanyard-scene" aria-label="Interactive identification badge">
      <div className="lanyard-strap" aria-hidden="true"><span /></div>
      <div
        ref={badgeRef}
        className={`lanyard-badge ${dragging ? 'is-dragging' : ''} ${returning ? 'is-returning' : ''}`}
        style={{ '--badge-angle': '0deg' }}
        onPointerDown={begin}
        onPointerMove={drag}
        onPointerUp={release}
        onPointerCancel={release}
      >
        <span className="badge-hole" aria-hidden="true" />
        <img className="badge-photo" src="/abdullah.png" alt="Portrait of Muhammad Abdullah Rasheed" />
        <strong>{name}</strong>
        <span className="badge-role">{title}</span>
        <span className="badge-handle"><Github size={13} aria-hidden="true" /> @{handle}</span>
        <span className="badge-foot" aria-hidden="true"><i /><i /><i /></span>
      </div>
    </div>
  );
}

function AmbientTech() {
  return (
    <div className="ambient-tech" aria-hidden="true">
      {ambientTech.map((tech, index) => <span key={tech} className={`ambient-chip ambient-chip-${index + 1}`}>{tech}</span>)}
    </div>
  );
}

export default function Hero() {
  const { name, title, summary, github, linkedin, resumeUrl } = portfolio.personal;
  const [roleIndex, setRoleIndex] = useState(0);
  const reduced = useReducedMotion();
  const reveal = useReveal();
  const { ref: heroRef, inView } = useInView({ threshold: 0.05, rootMargin: '0px', once: false });

  useEffect(() => {
    if (reduced || !inView) return undefined;
    const timer = window.setInterval(() => setRoleIndex((index) => (index + 1) % roleLines.length), 2800);
    return () => window.clearInterval(timer);
  }, [inView, reduced]);

  return (
    <section className={`hero-section ${inView ? 'is-in-view' : ''}`} id="home" ref={heroRef}>
      <div className="hero-grid" aria-hidden="true" />
      <AmbientTech />
      <div className="hero wrap">
        <div className="hero-copy">
          <p className="hero-kicker" ref={reveal} data-reveal="slide">AI ENGINEERING <span>·</span> LAHORE, PAKISTAN</p>
          <h1 ref={reveal} data-reveal="rise" data-delay="1">{name}</h1>
          <p className="hero-title" ref={reveal} data-reveal="rise" data-delay="2">{title}</p>
          <div className="role-switcher" ref={reveal} data-reveal="rise" data-delay="2">
            <span className="role-switcher-label">FOCUS</span>
            <span key={roleIndex} className="role-switcher-value">{roleLines[roleIndex]}</span>
          </div>
          <p className="hero-intro" ref={reveal} data-reveal="rise" data-delay="3">{summary}</p>
          <div className="open-status" ref={reveal} data-reveal="rise" data-delay="3"><i aria-hidden="true" /> Open to work</div>
          <div className="hero-actions" ref={reveal} data-reveal="rise" data-delay="4">
            <a className="button button-primary" href="#projects">View projects <ArrowRight size={16} aria-hidden="true" /></a>
            <a className="button button-outline" href={resumeUrl} download>Download resume <MoveUpRight size={15} aria-hidden="true" /></a>
          </div>
          <div className="hero-socials" ref={reveal} data-reveal="rise" data-delay="5">
            <a href={github} target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" /> GitHub <ArrowUpRight size={12} aria-hidden="true" /></a>
            <a href={linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} aria-hidden="true" /> LinkedIn <ArrowUpRight size={12} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="hero-visual" ref={reveal} data-reveal="rise" data-delay="3">
          <LanyardBadge />
          <p className="lanyard-hint"><span aria-hidden="true">↕</span> Drag the badge</p>
        </div>
        <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} aria-hidden="true" /></a>
      </div>
    </section>
  );
}
