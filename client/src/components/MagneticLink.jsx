import { useRef } from 'react';

export default function MagneticLink({ children, className = '', ...props }) {
  const linkRef = useRef(null);

  function moveTowardPointer(event) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.08;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.08;
    event.currentTarget.style.translate = `${x}px ${y}px`;
  }

  function resetPosition() {
    if (linkRef.current) linkRef.current.style.translate = '';
  }

  return (
    <a
      {...props}
      ref={linkRef}
      className={`magnetic-link ${className}`.trim()}
      onPointerMove={moveTowardPointer}
      onPointerLeave={resetPosition}
      onBlur={resetPosition}
    >
      {children}
    </a>
  );
}
