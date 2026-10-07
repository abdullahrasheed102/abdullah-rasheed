import { useEffect, useState } from 'react';
import useReducedMotion from './useReducedMotion.js';

export default function useScrollProgress(targetRef, mode = 'page') {
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return undefined;
    }

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (mode === 'page') {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          setProgress(maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0);
          return;
        }
        const node = targetRef?.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const viewport = window.innerHeight;
        const travel = rect.height + viewport * 0.7;
        setProgress(Math.max(0, Math.min(1, (viewport * 0.85 - rect.top) / travel)));
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [mode, reduced, targetRef]);

  return reduced ? 1 : progress;
}
