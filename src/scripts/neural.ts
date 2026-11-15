import type { NetworkEdge, NetworkNode } from '../data/network';

type Graph = { nodes: NetworkNode[]; edges: NetworkEdge[] };

type Pulse = { edge: number; t: number; amp: number };

function token(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function select(data: Graph, mobile: boolean): Graph {
  const nodes = data.nodes.filter((node) => !mobile || node.mobile);
  const ids = new Set(nodes.map((node) => node.id));
  const edges = data.edges.filter((edge) => ids.has(edge.from) && ids.has(edge.to));
  return { nodes, edges };
}

export function mountNeural(root: HTMLElement) {
  const canvas = root.querySelector('canvas');
  if (!(canvas instanceof HTMLCanvasElement)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const raw = root.getAttribute('data-network');
  if (!raw) return;
  const data = JSON.parse(raw) as Graph;

  const media = window.matchMedia('(max-width: 40rem), (hover: none)');
  let graph = select(data, media.matches);
  const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  let pulses: Pulse[] = [];
  const born: Pulse[] = [];
  let act = new Float32Array(graph.nodes.length);
  let refractory = new Float64Array(graph.nodes.length);
  let outgoing: number[][] = [];
  let index = new Map<string, number>();

  function reindex() {
    graph = select(data, media.matches);
    act = new Float32Array(graph.nodes.length);
    refractory = new Float64Array(graph.nodes.length);
    pulses = [];
    born.length = 0;
    index = new Map(graph.nodes.map((node, i) => [node.id, i]));
    outgoing = graph.nodes.map(() => []);
    graph.edges.forEach((edge, i) => {
      const from = index.get(edge.from);
      if (from !== undefined) outgoing[from].push(i);
    });
  }

  reindex();

  let pointer: { x: number; y: number } | null = null;
  let lastMove = 0;
  let lastAmbient = 0;
  let ambientCursor = 0;
  let onScreen = true;
  let running = false;
  let raf = 0;
  let last = 0;

  const colors = () => ({
    dim: token('--color-network-dim') || token('--color-rule'),
    accent: token('--color-network') || token('--color-accent'),
    ink: token('--color-ink-2') || token('--color-ink'),
  });

  function emit(nodeIndex: number, amp: number, now: number) {
    if (amp < 0.22 || now < refractory[nodeIndex]) return;
    refractory[nodeIndex] = now + 880;
    act[nodeIndex] = Math.max(act[nodeIndex], Math.min(1, amp));
    for (const edge of outgoing[nodeIndex]) born.push({ edge, t: 0, amp });
  }

  function pointOf(i: number, width: number, height: number) {
    const node = graph.nodes[i];
    return { x: node.x * width, y: node.y * height };
  }

  function step(dt: number, now: number) {
    const decay = Math.exp(-dt / 680);
    for (let i = 0; i < act.length; i++) act[i] *= decay;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!coarse && pointer && width && height) {
      const radius = Math.min(width, height) * 0.18;
      for (let i = 0; i < graph.nodes.length; i++) {
        const p = pointOf(i, width, height);
        const d = Math.hypot(p.x - pointer.x, p.y - pointer.y);
        if (d >= radius) continue;
        const influence = (1 - d / radius) ** 1.35;
        act[i] = Math.max(act[i], influence);
        if (influence > 0.62) emit(i, influence, now);
      }
    }

    const idle = coarse || !pointer || now - lastMove > 3600;
    if (idle && now - lastAmbient > (coarse ? 2800 : 4200)) {
      lastAmbient = now;
      const inputs = graph.nodes
        .map((node, i) => ({ node, i }))
        .filter(({ node }) => node.layer === 0);
      if (inputs.length) {
        const pick = inputs[ambientCursor % inputs.length];
        ambientCursor += 1;
        emit(pick.i, 0.9, now);
      }
    }

    const next: Pulse[] = [];
    for (const pulse of pulses) {
      const edge = graph.edges[pulse.edge];
      const duration = 380 + (1 - edge.weight) * 340;
      pulse.t += dt / duration;
      const target = index.get(edge.to);
      if (target === undefined) continue;
      const travel = Math.sin(Math.min(pulse.t, 1) * Math.PI);
      act[target] = Math.max(act[target], travel * pulse.amp * edge.weight);
      if (pulse.t >= 1) emit(target, pulse.amp * edge.weight * 0.92, now);
      else next.push(pulse);
    }
    pulses = next.concat(born);
    born.length = 0;
    if (pulses.length > 90) pulses.splice(0, pulses.length - 90);
  }

  function draw() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const bw = Math.round(width * dpr);
    const bh = Math.round(height * dpr);
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw;
      canvas.height = bh;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.lineCap = 'round';
    const { dim, accent, ink } = colors();

    for (const edge of graph.edges) {
      const a = index.get(edge.from);
      const b = index.get(edge.to);
      if (a === undefined || b === undefined) continue;
      const p = pointOf(a, width, height);
      const q = pointOf(b, width, height);
      ctx.strokeStyle = dim;
      ctx.globalAlpha = 0.28 + edge.weight * 0.22;
      ctx.lineWidth = 0.7 + edge.weight;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(q.x, q.y);
      ctx.stroke();
    }

    for (const pulse of pulses) {
      const edge = graph.edges[pulse.edge];
      const a = index.get(edge.from);
      const b = index.get(edge.to);
      if (a === undefined || b === undefined) continue;
      const p = pointOf(a, width, height);
      const q = pointOf(b, width, height);
      const t1 = Math.min(pulse.t, 1);
      const t0 = Math.max(0, t1 - 0.2);
      ctx.strokeStyle = accent;
      ctx.globalAlpha = 0.35 + 0.6 * pulse.amp;
      ctx.lineWidth = 1.4 + edge.weight;
      ctx.beginPath();
      ctx.moveTo(p.x + (q.x - p.x) * t0, p.y + (q.y - p.y) * t0);
      ctx.lineTo(p.x + (q.x - p.x) * t1, p.y + (q.y - p.y) * t1);
      ctx.stroke();
    }

    for (let i = 0; i < graph.nodes.length; i++) {
      const p = pointOf(i, width, height);
      const level = act[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.1 + level * 3.2, 0, Math.PI * 2);
      ctx.globalAlpha = 0.55 + level * 0.45;
      ctx.fillStyle = level > 0.12 ? accent : ink;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function frame(now: number) {
    raf = 0;
    if (!running) return;
    const dt = Math.min(40, now - last);
    last = now;
    step(dt, now);
    draw();
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function sync() {
    if (document.visibilityState === 'visible' && onScreen) start();
    else stop();
  }

  const observer = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    sync();
  });
  observer.observe(canvas);

  document.addEventListener('visibilitychange', sync);
  media.addEventListener('change', () => {
    reindex();
    draw();
  });

  window.addEventListener('pointermove', (event) => {
    if (coarse) return;
    const rect = canvas.getBoundingClientRect();
    pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    const inside =
      pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height;
    if (!inside) pointer = null;
    lastMove = performance.now();
  });

  window.addEventListener('pointerdown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
    let best = -1;
    let bestD = 180;
    for (let i = 0; i < graph.nodes.length; i++) {
      const p = pointOf(i, rect.width, rect.height);
      const d = Math.hypot(p.x - x, p.y - y);
      if (d < bestD) {
        best = i;
        bestD = d;
      }
    }
    if (best >= 0) emit(best, 1, performance.now());
  });

  root.classList.add('is-live');
  draw();
  sync();
}
