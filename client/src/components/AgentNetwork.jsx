import { useEffect, useRef } from 'react';

const TAU = Math.PI * 2;

function makeNodes(count) {
  const columns = 5;
  const rows = Math.ceil(count / columns);
  return Array.from({ length: count }, (_, index) => {
    const row = Math.floor(index / columns);
    const column = index % columns;
    const visualColumn = row % 2 ? columns - 1 - column : column;
    return {
      x: (visualColumn + 0.5) / columns,
      y: (row + 0.5) / rows,
      phase: index * 1.73,
      radius: index % 4 === 0 ? 2.4 : 1.7,
    };
  });
}

export default function AgentNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.closest('.hero');
    const context = canvas?.getContext('2d');
    if (!canvas || !hero || !context) return undefined;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mouse = { x: -1000, y: -1000 };
    let width = 0;
    let height = 0;
    let ratio = 1;
    let nodes = [];
    let frame = 0;
    let visible = true;
    let startedAt = 0;

    function resize() {
      const bounds = hero.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      const count = window.innerWidth <= 720 ? 10 : 20;
      nodes = makeNodes(count);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (motionQuery.matches) draw(0, false);
    }

    function draw(time, animate) {
      context.clearRect(0, 0, width, height);
      if (!width || !height) return;

      const seconds = animate ? time / 1000 : 0;
      const points = nodes.map(node => {
        let x = node.x * width + Math.sin(seconds * 0.27 + node.phase) * 4;
        let y = node.y * height + Math.cos(seconds * 0.23 + node.phase) * 4;
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const distance = Math.hypot(dx, dy);
        if (animate && distance < 115 && distance > 0) {
          const force = (1 - distance / 115) * 9;
          x += (dx / distance) * force;
          y += (dy / distance) * force;
        }
        return { x, y, radius: node.radius };
      });

      context.lineWidth = 1;
      context.strokeStyle = 'rgba(49, 94, 117, 0.10)';
      context.beginPath();
      for (let index = 0; index < points.length - 1; index += 1) {
        context.moveTo(points[index].x, points[index].y);
        context.lineTo(points[index + 1].x, points[index + 1].y);
      }
      context.stroke();

      if (animate && points.length > 1) {
        const travel = ((time - startedAt) / 520) % points.length;
        const segment = Math.floor(travel);
        const progress = travel - segment;
        const from = points[segment];
        const to = points[(segment + 1) % points.length];
        const pulseX = from.x + (to.x - from.x) * progress;
        const pulseY = from.y + (to.y - from.y) * progress;
        const glow = context.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 13);
        glow.addColorStop(0, 'rgba(49, 94, 117, 0.44)');
        glow.addColorStop(1, 'rgba(49, 94, 117, 0)');
        context.fillStyle = glow;
        context.beginPath();
        context.arc(pulseX, pulseY, 13, 0, TAU);
        context.fill();
        context.fillStyle = 'rgba(49, 94, 117, 0.85)';
        context.beginPath();
        context.arc(pulseX, pulseY, 2.3, 0, TAU);
        context.fill();
      }

      context.fillStyle = 'rgba(49, 94, 117, 0.32)';
      points.forEach(point => {
        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, TAU);
        context.fill();
      });
    }

    function animate(time) {
      if (!visible || motionQuery.matches) {
        frame = 0;
        return;
      }
      draw(time, true);
      frame = window.requestAnimationFrame(animate);
    }

    function start() {
      if (frame || !visible || motionQuery.matches) return;
      startedAt = performance.now();
      frame = window.requestAnimationFrame(animate);
    }

    function stop() {
      if (!frame) return;
      window.cancelAnimationFrame(frame);
      frame = 0;
    }

    function setVisible(nextVisible) {
      visible = nextVisible;
      if (visible) start();
      else stop();
    }

    function onPointerMove(event) {
      const bounds = hero.getBoundingClientRect();
      mouse.x = event.clientX - bounds.left;
      mouse.y = event.clientY - bounds.top;
    }

    function onPointerLeave() {
      mouse.x = -1000;
      mouse.y = -1000;
    }

    function onMotionChange() {
      stop();
      if (motionQuery.matches) draw(0, false);
      else start();
    }

    resize();
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    const sizeObserver = new ResizeObserver(resize);
    observer.observe(hero);
    sizeObserver.observe(hero);
    hero.addEventListener('pointermove', onPointerMove, { passive: true });
    hero.addEventListener('pointerleave', onPointerLeave, { passive: true });
    window.addEventListener('resize', resize, { passive: true });
    motionQuery.addEventListener('change', onMotionChange);
    start();

    return () => {
      stop();
      observer.disconnect();
      sizeObserver.disconnect();
      hero.removeEventListener('pointermove', onPointerMove);
      hero.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', resize);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  return <canvas className="agent-network" ref={canvasRef} aria-hidden="true" />;
}
