import useReveal from '../hooks/useReveal.js';

export default function SectionHeading({ index, label, title, titleLines, subtitle, className = '' }) {
  const reveal = useReveal();
  return (
    <header className={`section-heading ${className}`}>
      <p className="section-index" ref={reveal} data-reveal="slide">{index} <span>/</span> {label}</p>
      <h2 className={titleLines ? 'section-title-lines' : ''}>
        {titleLines ? titleLines.map((line, lineIndex) => <span className={lineIndex === 1 ? 'heading-emphasis' : ''} key={line} ref={reveal} data-reveal="rise" style={{ '--reveal-delay': `${120 + lineIndex * 120}ms` }}>{line}</span>) : <span ref={reveal} data-reveal="rise" style={{ '--reveal-delay': '120ms' }}>{title}</span>}
      </h2>
      {subtitle && <p className="section-subtitle" ref={reveal} data-reveal="rise" style={{ '--reveal-delay': '240ms' }}>{subtitle}</p>}
    </header>
  );
}
