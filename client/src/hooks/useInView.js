import { useEffect, useRef, useState } from 'react';
import useReducedMotion from './useReducedMotion.js';

export default function useInView({ threshold = 0.15, rootMargin = '0px 0px -7% 0px', once = true } = {}) {
  const targetRef = useRef(null);
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = targetRef.current;
    if (!node) return undefined;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      if (!once) {
        setInView(entry.isIntersecting);
        return;
      }
      if (!entry.isIntersecting) return;
      setInView(true);
      observer.unobserve(node);
    }, { threshold, rootMargin });
    observer.observe(node);
    return () => observer.disconnect();
  }, [once, reduced, rootMargin, threshold]);

  return { ref: targetRef, inView };
}
