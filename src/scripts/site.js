import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { onFrame } from './motion.js';
import { mountRace3D } from './raceview3d.js';
import { trailBackdrop } from './backdrop.js';
import { f } from './race.js';
import { mountPageEffects } from './page-effects.js';

let cleanup;
function mountPage() {
  cleanup?.();
  const controller = new AbortController();
  const { signal } = controller;
  const disposers = [() => controller.abort()];
  cleanup = () => { disposers.splice(0).reverse().forEach(dispose => dispose()); };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const touch = matchMedia('(pointer: coarse)');
  let lenis, removeLenisFrame;
  function syncScroll() {
    removeLenisFrame?.(); lenis?.destroy(); lenis = undefined;
    // Preserve native touch scrolling and Sport's CSS snap chapters.
    if (!reduced.matches && !touch.matches && !document.body.classList.contains('sport')) {
      lenis = new Lenis({ autoRaf: false, duration: 0.85, smoothWheel: true, syncTouch: false, anchors: false });
      removeLenisFrame = onFrame(now => lenis?.raf(now));
    }
  }
  syncScroll();
  reduced.addEventListener('change', syncScroll, { signal });
  touch.addEventListener('change', syncScroll, { signal });
  disposers.push(() => { removeLenisFrame?.(); lenis?.destroy(); });
  // Astro owns anchor navigation and history; Lenis only smooths wheel input.

  const menu = document.querySelector('.mobile-menu');
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.open) { menu.open = false; menu.querySelector('summary')?.focus(); }
  }, { signal });
  document.addEventListener('click', event => { if (menu?.open && (!menu.contains(event.target) || event.target.closest('a'))) menu.open = false; }, { signal });
  matchMedia('(min-width: 1101px)').addEventListener('change', event => { if (event.matches && menu) menu.open = false; }, { signal });

  const filters = document.querySelector('.project-filters');
  if (filters) filters.hidden = false;
  const projects = [...document.querySelectorAll('[data-tags]')];
  const buttons = [...document.querySelectorAll('[data-filter]')];
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    let count = 0;
    projects.forEach(project => {
      const show = button.dataset.filter === 'All' || project.dataset.tags.split(' ').includes(button.dataset.filter);
      project.hidden = !show; if (show) count++;
    });
    document.querySelector('#project-empty').hidden = count !== 0;
  }, { signal }));

  const canvas = document.querySelector('#race-canvas');
  if (canvas) {
    const step = document.querySelector('#race-step');
    const losses = Object.fromEntries(['sgd', 'mom', 'adam'].map(key => [key, document.querySelector(`#loss-${key}`)]));
    const race = mountRace3D(canvas, { onUpdate(r) {
      const value = r.done ? `Finished · ${r.t} steps` : `Step ${r.t}`;
      if (step.textContent !== value) step.textContent = value;
      for (const runner of r.runners) losses[runner.o.key].textContent = f(runner.s.x, runner.s.y).toFixed(3);
    } });
    const trail = trailBackdrop(document.querySelector('#hero-backdrop'));
    disposers.push(() => race.destroy(), () => trail.destroy());
    document.querySelector('.race-controls').hidden = false;
    const pause = document.querySelector('#pause-motion');
    pause.addEventListener('click', () => {
      const paused = pause.getAttribute('aria-pressed') !== 'true';
      pause.setAttribute('aria-pressed', String(paused));
      pause.textContent = paused ? 'Resume animation' : 'Pause animation';
      document.dispatchEvent(new CustomEvent('motion-toggle', { detail: paused }));
    }, { signal });
  }
  disposers.push(mountPageEffects());
}
document.addEventListener('astro:page-load', mountPage);
document.addEventListener('astro:before-swap', () => { cleanup?.(); cleanup = undefined; });
