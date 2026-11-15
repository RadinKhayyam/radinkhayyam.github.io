// A single RAF owner per canvas. Time advances only while visible and playing.
export function animateCanvas(canvas, resize, render, onMotionChange = () => {}) {
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false, paused = false, raf = 0, previous = 0, time = 0;
  const active = () => visible && !document.hidden && !media.matches && !paused;
  function tick(now) {
    raf = 0;
    if (!active()) return;
    time += previous ? Math.min(50, now - previous) : 0;
    previous = now;
    render(time);
    raf = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(raf); raf = 0; previous = 0;
    if (active()) raf = requestAnimationFrame(tick);
  }
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
  observer.observe(canvas);
  new ResizeObserver(() => { resize(); render(time); }).observe(canvas);
  document.addEventListener('visibilitychange', sync);
  document.addEventListener('motion-toggle', event => { paused = event.detail; sync(); });
  media.addEventListener('change', () => { onMotionChange(); render(time); sync(); });
  resize();render(time);
  document.fonts.ready.then(() => { resize();render(time); });
  return { get time() { return time; }, redraw() { render(time); } };
}
