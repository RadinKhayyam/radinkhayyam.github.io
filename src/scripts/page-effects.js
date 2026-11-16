import { onFrame } from './motion.js';

const ease = 'cubic-bezier(.2,.7,.2,1)';
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function mountPageEffects() {
  const controller = new AbortController();
  const { signal } = controller;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 1024px)');
  const animations = new Set();
  const counters = new Map();
  const seen = new WeakSet();
  const shell = document.querySelector('.timeline-shell');
  const timeline = document.querySelector('.timeline');
  const rows = [...document.querySelectorAll('.timeline-row')];
  const pins = rows.map(row => row.querySelector('.timeline-pin'));
  const years = [...document.querySelectorAll('.sticky-years span')];
  const photos = [...document.querySelectorAll('.photo-frame')];
  const lit = new Set();
  let geometry, pendingFrame, activeYear = -1;
  const transforms = new Map();

  function animate(element, frames, options = {}) {
    const animation = element.animate(frames, { duration: 700, easing: ease, ...options });
    animations.add(animation);
    animation.onfinish = () => { animations.delete(animation); animation.cancel(); };
    return animation;
  }
  function reveal(element, delay = 0) {
    if (seen.has(element)) return;
    seen.add(element);
    if (!reduced.matches) animate(element, [
      { opacity: 0, transform: 'translateY(20px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: desktop.matches ? 700 : 500, delay: desktop.matches ? delay : delay * 4 / 9, fill: 'backwards' });
  }
  const targets = new Map();
  const add = (selector, delay = 0) => document.querySelectorAll(selector).forEach(el => targets.set(el, delay));
  add('.chapter-photo, .hong-kong > img, .chapter-card > .pipeline');
  // Observe text blocks individually; a tall prose/inset wrapper must never hide
  // paragraphs that have already reached the viewport.
  add('.chapter-body .prose > *, .chapter-body > p, .chapter-body > .text-link', 180);
  add('.chapter-body :is(h2, h3, h4, h5, h6)', 90);
  add('[data-reveal]:not(.hong-kong), .about > div, .reading-panel, .entry, .project, .sport-history-row, .running-cards > article, .work-row, .teaser, .section-heading, .contact > h2, .blog-empty > .glass');
  document.querySelectorAll('.university-logos').forEach(group => {
    [...group.children].forEach((tile, i) => targets.set(tile, i * 110));
  });
  const reveals = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    reveal(el, targets.get(el));
    reveals.unobserve(el);
  }), { threshold: .05, rootMargin: '0px 0px -6% 0px' });
  targets.forEach((_, el) => reveals.observe(el));

  function finishCount(el) {
    counters.get(el)?.(); counters.delete(el);
    el.classList.remove('counting');
    el.querySelector('.count-visual').textContent = '';
  }
  function count(el) {
    if (reduced.matches) return;
    const final = el.dataset.count;
    const visual = el.querySelector('.count-visual');
    const isTime = final.includes(':');
    const value = isTime ? final.split(':').reduce((m, s) => Number(m) * 60 + Number(s)) : Number(final.match(/\d+/)[0]);
    const start = performance.now();
    const format = n => isTime
      ? `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`
      : final.replace(/\d+/, String(n));
    visual.textContent = format(0);
    el.classList.add('counting');
    counters.set(el, onFrame(now => {
      const progress = clamp((now - start) / 1000);
      visual.textContent = format(Math.floor(value * (1 - (1 - progress) ** 3)));
      if (progress === 1) { finishCount(el); return false; }
    }));
  }
  const numbers = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    count(entry.target); numbers.unobserve(entry.target);
  }), { threshold: .65 });
  document.querySelectorAll('[data-count]').forEach(el => numbers.observe(el));

  function measure() {
    const top = el => el.getBoundingClientRect().top + scrollY;
    geometry = {
      top: timeline ? top(timeline) + 12 : 0,
      height: timeline ? timeline.offsetHeight - 12 : 1,
      pins: pins.map(pin => top(pin) + pin.offsetHeight / 2),
      photos: photos.map(photo => {
        // Subtract our own translation so repeated resize measurements never drift.
        return { top: top(photo) - (transforms.get(photo) || 0), height: photo.offsetHeight };
      })
    };
  }
  function updateYear(index) {
    if (!years.length || index === activeYear) return;
    activeYear = index;
    const side = rows[index].classList.contains('reverse') ? 1 : 0;
    const text = rows[index].querySelector('.chapter-date p').textContent;
    years.forEach((year, i) => {
      // No queued transitions if the visitor scrubs quickly through the story.
      year.getAnimations().forEach(animation => { animation.cancel(); animations.delete(animation); });
      if (i === side) {
        year.textContent = text; year.style.opacity = '1';
        if (!reduced.matches) animate(year, [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 450 });
      } else if (year.style.opacity === '1') {
        year.style.opacity = '0';
        if (!reduced.matches) animate(year, [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-8px)' }], { duration: 300 });
      }
    });
  }
  function updateScroll() {
    pendingFrame = undefined;
    if (!geometry) measure();
    if (timeline) {
      const head = scrollY + innerHeight * .55;
      const progress = reduced.matches ? 1 : clamp((head - geometry.top) / geometry.height);
      timeline.style.setProperty('--story-progress', String(progress));
      pins.forEach((pin, i) => {
        if (reduced.matches || head >= geometry.pins[i]) lit.add(pin);
        pin.classList.toggle('is-lit', lit.has(pin));
      });
      // The active year changes when the next chapter reaches the sticky date position.
      let index = 0;
      geometry.pins.forEach((position, i) => { if (position <= scrollY + 170) index = i; });
      updateYear(index);
    }
    photos.forEach((photo, i) => {
      const { top, height } = geometry.photos[i];
      const distance = top + height / 2 - (scrollY + innerHeight / 2);
      // Move the entire natural-aspect frame, never scale/crop the image inside it.
      const offset = reduced.matches ? 0 : clamp(distance / innerHeight * 8, -4, 4);
      if (transforms.get(photo) !== offset) {
        photo.style.transform = `translateY(${offset.toFixed(2)}px)`;
        transforms.set(photo, offset);
      }
    });
    return false;
  }
  function requestUpdate() {
    if (!pendingFrame && !reduced.matches) pendingFrame = onFrame(updateScroll);
  }
  function resize() { measure(); if (reduced.matches) updateScroll(); else requestUpdate(); }
  function syncMotion() {
    if (reduced.matches) {
      animations.forEach(animation => animation.cancel()); animations.clear();
      [...counters.keys()].forEach(finishCount);
      pendingFrame?.(); pendingFrame = undefined;
    }
    shell?.classList.toggle('timeline-enhanced', !reduced.matches);
    activeYear = -1;
    measure(); updateScroll();
  }
  window.addEventListener('scroll', requestUpdate, { passive: true, signal });
  window.addEventListener('resize', resize, { passive: true, signal });
  desktop.addEventListener('change', resize, { signal });
  reduced.addEventListener('change', syncMotion, { signal });
  const resizer = new ResizeObserver(resize);
  resizer.observe(document.querySelector('main'));
  document.fonts.ready.then(() => { if (!signal.aborted) resize(); });
  syncMotion();
  return () => {
    controller.abort(); reveals.disconnect(); numbers.disconnect(); resizer.disconnect();
    pendingFrame?.(); animations.forEach(animation => animation.cancel());
    [...counters.keys()].forEach(finishCount);
  };
}
