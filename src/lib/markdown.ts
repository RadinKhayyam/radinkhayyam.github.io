import { marked } from 'marked';
// Trusted, approved local copy, rendered only at build time.
export function markdown(text: string): string {
  return (marked.parse(text, { async: false }) as string)
    .replaceAll('https://scholar.google.com.tr/citations?user=Nz0anzQAAAAJ', 'https://scholar.google.com.tr/citations?hl=tr&pli=1&user=Nz0anzQAAAAJ')
    .replace(/<a href="(https:[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener"')
    .replace(/<th>/g, '<th scope="col">')
    .replace(/\b(World No\. 6|47:24|20:18|15 km|74 minutes)\b/g, value =>
      `<span class="count-up" data-count="${value}"><span class="count-final">${value}</span><span class="count-visual" aria-hidden="true"></span></span>`);
}
export function inline(text: string): string { return marked.parseInline(text, { async: false }) as string; }
