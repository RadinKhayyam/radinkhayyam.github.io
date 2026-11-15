export const site = {
  name: 'Radin Khayyam',
  url: 'https://radinkhayyam.github.io',
  email: 'radinkhayyam@gmail.com',
  location: 'Istanbul',
  description:
    'Radin Khayyam is an MSc student in artificial intelligence at Koç University, working on learning theory and applications of AI. He studied electrical engineering at Sharif.',
  github: 'https://github.com/RadinKhayyam',
  linkedin: 'https://www.linkedin.com/in/radin-khayyam/',
  x: 'https://x.com/radinkh03',
  scholar: 'https://scholar.google.com.tr/citations?hl=tr&pli=1&user=Nz0anzQAAAAJ',
  sportsCv: 'https://drive.google.com/file/d/1iYFyVzTf1yFYciEZKdIxgTfaY-gfVPqr/view',
  cvPath: '/cv/Radin_Khayyam_CV.pdf',
  solico: 'https://www.solico-group.com',
  paper: 'https://ieeexplore.ieee.org/document/10895673',
  slides: 'https://drive.google.com/file/d/1vfxfPBEQrINraJK8Xg00AbBsi5e0A8pd/view?usp=share_link',
} as const;

export const nav = [
  { href: '/about', label: 'About' },
  { href: '/research', label: 'Research' },
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
  { href: '/photos', label: 'Photos' },
  { href: '/cv', label: 'CV' },
] as const;

export const contacts = [
  { href: `mailto:${site.email}`, label: 'Email' },
  { href: site.github, label: 'GitHub' },
  { href: site.linkedin, label: 'LinkedIn' },
  { href: site.x, label: 'X' },
  { href: site.scholar, label: 'Scholar' },
] as const;
