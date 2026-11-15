import { marked } from 'marked';
// Trusted, approved local copy, rendered only at build time.
export function markdown(text: string): string {
  return (marked.parse(text, { async: false }) as string)
    .replaceAll('https://scholar.google.com.tr/citations?user=Nz0anzQAAAAJ', 'https://scholar.google.com.tr/citations?hl=tr&pli=1&user=Nz0anzQAAAAJ')
    .replace(/<a href="(https:[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener"')
    .replace(/<th>/g, '<th scope="col">');
}
export function inline(text: string): string { return marked.parseInline(text, { async: false }) as string; }
