import { useCallback } from 'react';
import useReducedMotion from './useReducedMotion.js';

let sharedObserver;

function getObserver() {
  if (sharedObserver || typeof IntersectionObserver === 'undefined') return sharedObserver;
  sharedObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.dataset.visible = 'true';
      sharedObserver.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -7% 0px' });
  return sharedObserver;
}

export default function useReveal() {
  const reduced = useReducedMotion();
  return useCallback((node) => {
    if (!node) return;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      node.dataset.visible = 'true';
      return;
    }
    getObserver()?.observe(node);
  }, [reduced]);
}
