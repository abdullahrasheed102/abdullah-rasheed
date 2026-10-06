import Reveal from './Reveal.jsx';

export default function SectionHeading({ index, eyebrow, title, text }) {
  return (
    <div className="section-heading">
      <Reveal as="span" variant="left" className="section-label">
        <span>{index}</span> / {eyebrow.toLowerCase()}
      </Reveal>
      <Reveal as="h2" delay={80}>{title}</Reveal>
      {text && <Reveal as="p" delay={150}>{text}</Reveal>}
    </div>
  );
}
