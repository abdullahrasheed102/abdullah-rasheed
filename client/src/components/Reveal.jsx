import { useEffect, useRef, useState } from 'react';

let sharedObserver;
const targets = new Map();

function motionIsReduced() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

function getObserver() {
  if (sharedObserver || typeof IntersectionObserver === 'undefined') return sharedObserver;
  sharedObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const reveal = targets.get(entry.target);
      targets.delete(entry.target);
      sharedObserver.unobserve(entry.target);
      reveal?.();
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -36px 0px' });
  return sharedObserver;
}

export default function Reveal({ as: Element = 'div', children, className = '', delay = 0, variant = 'up', ...props }) {
  const elementRef = useRef(null);
  const [visible, setVisible] = useState(() => (
    typeof IntersectionObserver === 'undefined' || motionIsReduced()
  ));

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof IntersectionObserver === 'undefined' || motionIsReduced()) {
      setVisible(true);
      return undefined;
    }

    const observer = getObserver();
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const showForReducedMotion = () => {
      if (!motionQuery.matches) return;
      targets.delete(element);
      observer?.unobserve(element);
      setVisible(true);
    };
    targets.set(element, () => setVisible(true));
    observer?.observe(element);
    motionQuery.addEventListener('change', showForReducedMotion);

    return () => {
      targets.delete(element);
      observer?.unobserve(element);
      motionQuery.removeEventListener('change', showForReducedMotion);
    };
  }, []);

  return (
    <Element
      ref={elementRef}
      className={`reveal reveal-${variant} ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...props}
    >
      {children}
    </Element>
  );
}
