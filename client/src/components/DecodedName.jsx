import { useEffect, useState } from 'react';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default function DecodedName({ name }) {
  const [displayName, setDisplayName] = useState(name);
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;

    function playDecode() {
      window.clearInterval(timer);
      if (motionQuery.matches) {
        setDisplayName(name);
        return;
      }
      let resolved = 0;
      setDisplayName(Array.from(name, character => character === ' ' ? ' ' : alphabet[Math.floor(Math.random() * alphabet.length)]).join(''));
      timer = window.setInterval(() => {
        resolved += 1;
        let letterIndex = 0;
        setDisplayName(Array.from(name, character => {
          if (character === ' ') return character;
          letterIndex += 1;
          return letterIndex <= resolved ? character : alphabet[Math.floor(Math.random() * alphabet.length)];
        }).join(''));
        if (resolved >= name.replace(/\s/g, '').length) {
          window.clearInterval(timer);
          setDisplayName(name);
        }
      }, 42);
    }

    function onMotionChange() {
      if (motionQuery.matches) {
        window.clearInterval(timer);
        setDisplayName(name);
      }
    }

    playDecode();
    motionQuery.addEventListener('change', onMotionChange);
    return () => {
      window.clearInterval(timer);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, [name, replay]);

  return (
    <span
      className="decoded-name"
      onMouseEnter={() => setReplay(value => value + 1)}
      onFocus={() => setReplay(value => value + 1)}
      tabIndex="0"
      aria-label={name}
    >
      {displayName}
    </span>
  );
}
