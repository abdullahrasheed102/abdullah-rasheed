import { useEffect, useRef } from 'react';

const sectionIds = ['about', 'skills', 'projects', 'experience', 'education', 'contact'];

export default function ScrollPipeline() {
  const frameRef = useRef(0);
  const activeRef = useRef('top');
  const pipelineRef = useRef(null);

  useEffect(() => {
    function update() {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = 0;
        const root = document.documentElement;
        const maxScroll = root.scrollHeight - window.innerHeight;
        const nextProgress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
        pipelineRef.current?.style.setProperty('--page-progress', `${nextProgress * 100}%`);

        const marker = window.scrollY + window.innerHeight * 0.3;
        let activeId = 'top';
        sectionIds.forEach(id => {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top + window.scrollY <= marker) activeId = id;
        });
        if (window.scrollY + window.innerHeight >= root.scrollHeight - 2) activeId = 'contact';
        document.querySelectorAll('.section.pipeline-active').forEach(section => {
          if (section.id !== activeId) section.classList.remove('pipeline-active');
        });
        document.getElementById(activeId)?.classList.add('pipeline-active');
        if (activeRef.current !== activeId) {
          activeRef.current = activeId;
          window.dispatchEvent(new CustomEvent('portfolio:active-section', { detail: activeId }));
        }

        const timeline = document.querySelector('.experience-list');
        if (timeline) {
          const bounds = timeline.getBoundingClientRect();
          const amount = bounds.height ? Math.min(1, Math.max(0, (window.innerHeight * 0.72 - bounds.top) / bounds.height)) : 0;
          timeline.style.setProperty('--timeline-progress', `${amount * 100}%`);
        }
      });
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="scroll-pipeline" aria-hidden="true" ref={pipelineRef}>
      <span className="scroll-pipeline-track" />
      <span className="scroll-pipeline-packet" />
    </div>
  );
}
