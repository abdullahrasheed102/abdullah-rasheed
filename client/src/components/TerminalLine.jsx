import { useEffect, useState } from 'react';

const lines = [
  'multi-agent systems with CrewAI',
  'RAG and LLM workflows',
  '3D data in Python + Three.js',
];

export default function TerminalLine() {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState(() => (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? lines[0] : ''
  ));

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let index = 0;
    let character = 0;
    let pause = false;
    let timer;

    function tick() {
      if (motionQuery.matches) {
        setText(lines[0]);
        setLineIndex(0);
        return;
      }
      const current = lines[index];
      if (!pause && character < current.length) {
        character += 1;
        setText(current.slice(0, character));
        timer = window.setTimeout(tick, 48);
      } else if (!pause) {
        pause = true;
        timer = window.setTimeout(tick, 1450);
      } else if (character > 0) {
        character -= 1;
        setText(current.slice(0, character));
        timer = window.setTimeout(tick, 24);
      } else {
        pause = false;
        index = (index + 1) % lines.length;
        setLineIndex(index);
        timer = window.setTimeout(tick, 240);
      }
    }

    function start() {
      window.clearTimeout(timer);
      index = 0;
      character = 0;
      pause = false;
      if (motionQuery.matches) {
        setText(lines[0]);
        setLineIndex(0);
      } else {
        setText('');
        timer = window.setTimeout(tick, 180);
      }
    }

    function onMotionChange() { start(); }
    start();
    motionQuery.addEventListener('change', onMotionChange);
    return () => {
      window.clearTimeout(timer);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  return (
    <p className="typing-line" aria-label={`> ${lines[lineIndex]}`} aria-live="off">
      <span aria-hidden="true">&gt; </span><span>{text}</span><span className="typing-cursor" aria-hidden="true" />
    </p>
  );
}
