import { getCollection } from 'astro:content';

export async function publishedPosts() {
  const posts = await getCollection('writing');
  return posts
    .filter((post) => (import.meta.env.PROD ? post.data.draft !== true : true))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
