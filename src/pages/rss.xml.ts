import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../data/site';
import { publishedPosts } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await publishedPosts();
  return rss({
    title: site.name,
    description: 'Notes by Radin Khayyam.',
    site: context.site ?? site.url,
    items: posts
      .filter((post) => post.data.draft !== true)
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/writing/${post.id}/`,
      })),
  });
}
