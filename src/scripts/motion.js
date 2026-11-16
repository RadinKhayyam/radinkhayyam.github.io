// All JS animation (canvases, scroll, counters and Lenis) shares one RAF owner.
const tasks = new Set();
let raf = 0;
function schedule() {
  if (!raf && tasks.size && !document.hidden) raf = requestAnimationFrame(tick);
}
function tick(now) {
  raf = 0;
  for (const task of [...tasks]) if (tasks.has(task) && task(now) === false) tasks.delete(task);
  schedule();
}
export function onFrame(task) {
  tasks.add(task);
  schedule();
  return () => { tasks.delete(task); if (!tasks.size) { cancelAnimationFrame(raf); raf = 0; } };
}
document.addEventListener('visibilitychange', () => {
  cancelAnimationFrame(raf); raf = 0; schedule();
});

export function animateCanvas(canvas, resize, render, onMotionChange = () => {}) {
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const controller = new AbortController();
  const { signal } = controller;
  let visible = false, paused = false, previous = 0, time = 0, removeFrame;
  function sync() {
    removeFrame?.(); removeFrame = undefined; previous = 0;
    if (visible && !document.hidden && !media.matches && !paused) removeFrame = onFrame(now => {
      time += previous ? Math.min(50, now - previous) : 0;
      previous = now; render(time);
    });
  }
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
  const resizer = new ResizeObserver(() => { resize(); render(time); });
  observer.observe(canvas); resizer.observe(canvas);
  document.addEventListener('visibilitychange', sync, { signal });
  document.addEventListener('motion-toggle', event => { paused = event.detail; sync(); }, { signal });
  media.addEventListener('change', () => { onMotionChange(); render(time); sync(); }, { signal });
  resize(); render(time);
  document.fonts.ready.then(() => { if (!signal.aborted) { resize(); render(time); } });
  return {
    get time() { return time; }, redraw() { render(time); },
    destroy() { controller.abort(); observer.disconnect(); resizer.disconnect(); removeFrame?.(); }
  };
}
