import type { ImageMetadata } from 'astro';
import rally from '../assets/photos/rally.png';
import road from '../assets/photos/road.png';
import tableLines from '../assets/photos/table-lines.png';
import windowGrid from '../assets/photos/window.png';

export type Album = 'Table tennis' | 'Life & travel';

export type Photo = {
  src: ImageMetadata;
  album: Album;
  caption: string;
  /** ISO date, or null while a frame is still a placeholder. */
  date: string | null;
  alt: string;
};

export const albums: Album[] = ['Table tennis', 'Life & travel'];

export const photos: Photo[] = [
  {
    src: tableLines,
    album: 'Table tennis',
    caption: 'Placeholder for a match photograph.',
    date: null,
    alt: 'Designed placeholder: a table-tennis table in plan, split by a net line, on a dark field.',
  },
  {
    src: rally,
    album: 'Table tennis',
    caption: 'Placeholder for a training photograph.',
    date: null,
    alt: 'Designed placeholder: a circle and two arcs on a dark field, standing in for a rally.',
  },
  {
    src: windowGrid,
    album: 'Life & travel',
    caption: 'Placeholder for a city or travel photograph.',
    date: null,
    alt: 'Designed placeholder: a window grid of unequal panes on a dark field.',
  },
  {
    src: road,
    album: 'Life & travel',
    caption: 'Placeholder for a road or landscape photograph.',
    date: null,
    alt: 'Designed placeholder: a horizon and a narrowing path drawn with straight lines on a dark field.',
  },
];
