import { useEffect, useRef } from 'react';
import { Github, Mail } from 'lucide-react';
import { portfolio } from '../data/portfolio.js';
import useScrollProgress from '../hooks/useScrollProgress.js';
import useReducedMotion from '../hooks/useReducedMotion.js';

function ScrollProgress() {
  const progress = useScrollProgress();
  return <div className="scroll-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>;
}

function CursorTrail() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || typeof window.matchMedia !== 'function'
      || !window.matchMedia('(pointer: fine)').matches) return undefined;
    document.body.classList.add('has-custom-cursor');
    const move = (event) => {
      const point = `${event.clientX}px, ${event.clientY}px`;
      dotRef.current?.style.setProperty('--cursor-point', point);
      ringRef.current?.style.setProperty('--cursor-point', point);
    };
    const over = (event) => {
      if (event.target.closest('a, button, [role="button"]')) document.body.classList.add('cursor-hover');
    };
    const out = (event) => {
      if (event.target.closest('a, button, [role="button"]')) document.body.classList.remove('cursor-hover');
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    document.addEventListener('pointerout', out);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.removeEventListener('pointerout', out);
      document.body.classList.remove('has-custom-cursor', 'cursor-hover');
    };
  }, [reduced]);

  return (
    <div className="cursor-layer" aria-hidden="true">
      <span className="cursor-ring" ref={ringRef} />
      <span className="cursor-dot" ref={dotRef} />
    </div>
  );
}

export default function ScrollPipeline() {
  const { email, github } = portfolio.personal;
  return (
    <>
      <ScrollProgress />
      <CursorTrail />
      <aside className="floating-actions" aria-label="Quick contact links">
        <a href={`mailto:${email}`} aria-label="Email Muhammad Abdullah Rasheed"><Mail size={17} /></a>
        <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={17} /></a>
      </aside>
    </>
  );
}
