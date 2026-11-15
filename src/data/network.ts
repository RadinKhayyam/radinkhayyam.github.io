/**
 * Nodes for the home-page network.
 * Positions are 0–1 across the viewport. `layer` is the forward-pass order:
 * activation travels toward higher layers.
 * `milestone` is unused by the v1 canvas. A later Story timeline can read it
 * and turn the node into a link. Do not invent milestones that are not his.
 */

export type Milestone = {
  title: string;
  when?: string;
  href?: string;
  note?: string;
};

export type NetworkNode = {
  id: string;
  x: number;
  y: number;
  layer: number;
  /** Kept in the calmer mobile graph. */
  mobile?: boolean;
  milestone?: Milestone;
};

export type NetworkEdge = {
  from: string;
  to: string;
  /** 0–1. Stroke weight and propagation gain. */
  weight: number;
};

export const network: { nodes: NetworkNode[]; edges: NetworkEdge[] } = {
  nodes: [
    { id: 'a0', x: 0.08, y: 0.18, layer: 0, mobile: true },
    {
      id: 'a1',
      x: 0.15,
      y: 0.36,
      layer: 0,
      mobile: true,
      milestone: {
        title: 'Started table tennis',
        when: 'Age 5',
        href: '/photos',
        note: 'Began at age five.',
      },
    },
    { id: 'a2', x: 0.06, y: 0.54, layer: 0 },
    {
      id: 'a3',
      x: 0.14,
      y: 0.7,
      layer: 0,
      mobile: true,
      milestone: {
        title: 'Iran national teams',
        when: '2015 to 2019',
        href: '/about',
      },
    },
    { id: 'a4', x: 0.09, y: 0.88, layer: 0, mobile: true },

    { id: 'b0', x: 0.3, y: 0.14, layer: 1, mobile: true },
    {
      id: 'b1',
      x: 0.26,
      y: 0.34,
      layer: 1,
      milestone: {
        title: 'Tottori',
        when: '2018',
        href: '/about',
        note: 'Cadet boys team silver at the ITTF World Cadet Challenge.',
      },
    },
    {
      id: 'b2',
      x: 0.36,
      y: 0.5,
      layer: 1,
      mobile: true,
      milestone: {
        title: 'Sharif University of Technology',
        when: '2020 to 2025',
        href: '/about',
        note: 'BSc in electrical engineering.',
      },
    },
    { id: 'b3', x: 0.28, y: 0.68, layer: 1, mobile: true },
    { id: 'b4', x: 0.34, y: 0.86, layer: 1, mobile: true },

    { id: 'c0', x: 0.5, y: 0.2, layer: 2, mobile: true },
    {
      id: 'c1',
      x: 0.46,
      y: 0.38,
      layer: 2,
      milestone: {
        title: 'Chinese University of Hong Kong',
        when: '2023',
        href: '/research',
        note: 'Device authentication internship.',
      },
    },
    {
      id: 'c2',
      x: 0.56,
      y: 0.52,
      layer: 2,
      mobile: true,
      milestone: {
        title: 'BSc thesis',
        when: '2023 to 2024',
        href: '/research',
        note: 'Hand trajectory estimation from EEG.',
      },
    },
    {
      id: 'c3',
      x: 0.48,
      y: 0.7,
      layer: 2,
      mobile: true,
      milestone: {
        title: 'ICBME 2024',
        when: '2024',
        href: '/research',
      },
    },
    { id: 'c4', x: 0.58, y: 0.86, layer: 2 },

    { id: 'd0', x: 0.7, y: 0.16, layer: 3, mobile: true },
    {
      id: 'd1',
      x: 0.66,
      y: 0.36,
      layer: 3,
      mobile: true,
      milestone: {
        title: 'University of British Columbia',
        when: '2024 to 2025',
        href: '/research',
        note: 'Remote internship on EEG denoising.',
      },
    },
    {
      id: 'd2',
      x: 0.76,
      y: 0.54,
      layer: 3,
      mobile: true,
      milestone: {
        title: 'Solico Group',
        when: '2025 to 2026',
        href: '/projects',
        note: 'Applied machine learning and language-model systems.',
      },
    },
    { id: 'd3', x: 0.68, y: 0.72, layer: 3 },
    { id: 'd4', x: 0.74, y: 0.88, layer: 3, mobile: true },

    { id: 'e0', x: 0.9, y: 0.24, layer: 4, mobile: true },
    { id: 'e1', x: 0.86, y: 0.42, layer: 4 },
    {
      id: 'e2',
      x: 0.93,
      y: 0.58,
      layer: 4,
      mobile: true,
      milestone: {
        title: 'Learning theory',
        when: '2026',
        href: '/research',
        note: 'MSc research with Prof. Zafer Doğan, MLIP group, Koç University.',
      },
    },
    { id: 'e3', x: 0.88, y: 0.76, layer: 4, mobile: true },
    { id: 'e4', x: 0.92, y: 0.9, layer: 4 },
  ],
  edges: [
    { from: 'a0', to: 'b0', weight: 0.9 },
    { from: 'a0', to: 'b2', weight: 0.55 },
    { from: 'a1', to: 'b0', weight: 0.45 },
    { from: 'a1', to: 'b1', weight: 0.85 },
    { from: 'a1', to: 'b2', weight: 0.6 },
    { from: 'a2', to: 'b1', weight: 0.5 },
    { from: 'a2', to: 'b3', weight: 0.7 },
    { from: 'a3', to: 'b2', weight: 0.75 },
    { from: 'a3', to: 'b3', weight: 0.9 },
    { from: 'a4', to: 'b3', weight: 0.5 },
    { from: 'a4', to: 'b4', weight: 0.85 },

    { from: 'b0', to: 'c0', weight: 0.9 },
    { from: 'b0', to: 'c1', weight: 0.4 },
    { from: 'b1', to: 'c0', weight: 0.55 },
    { from: 'b1', to: 'c1', weight: 0.8 },
    { from: 'b2', to: 'c0', weight: 0.45 },
    { from: 'b2', to: 'c2', weight: 0.95 },
    { from: 'b3', to: 'c2', weight: 0.6 },
    { from: 'b3', to: 'c3', weight: 0.85 },
    { from: 'b4', to: 'c3', weight: 0.55 },
    { from: 'b4', to: 'c4', weight: 0.75 },

    { from: 'c0', to: 'd0', weight: 0.85 },
    { from: 'c0', to: 'd1', weight: 0.5 },
    { from: 'c1', to: 'd0', weight: 0.4 },
    { from: 'c1', to: 'd1', weight: 0.7 },
    { from: 'c2', to: 'd1', weight: 0.8 },
    { from: 'c2', to: 'd2', weight: 0.9 },
    { from: 'c3', to: 'd2', weight: 0.65 },
    { from: 'c3', to: 'd3', weight: 0.5 },
    { from: 'c3', to: 'd4', weight: 0.75 },
    { from: 'c4', to: 'd3', weight: 0.6 },
    { from: 'c4', to: 'd4', weight: 0.8 },

    { from: 'd0', to: 'e0', weight: 0.9 },
    { from: 'd0', to: 'e1', weight: 0.45 },
    { from: 'd1', to: 'e0', weight: 0.5 },
    { from: 'd1', to: 'e2', weight: 0.85 },
    { from: 'd2', to: 'e1', weight: 0.4 },
    { from: 'd2', to: 'e2', weight: 0.95 },
    { from: 'd2', to: 'e3', weight: 0.55 },
    { from: 'd3', to: 'e3', weight: 0.7 },
    { from: 'd4', to: 'e3', weight: 0.6 },
    { from: 'd4', to: 'e4', weight: 0.8 },
  ],
};
