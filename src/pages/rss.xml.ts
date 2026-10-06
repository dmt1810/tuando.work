import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { profile, site } from '../data/profile';
const escape = (s: string) =>
  s.replace(
    /[<>&"']/g,
    (c) =>
      ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&apos;',
      })[c]!,
  );
export const GET: APIRoute = async () => {
  const work = await getCollection(
    'work',
    ({ data }) => data.lang === 'en' && !data.draft,
  );
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escape(profile.person.displayName)} · Work</title><link>${site}</link><description>Growth, CRM and consulting case studies</description><language>en</language>${work.map(({ data }) => `<item><title>${escape(data.title)}</title><description>${escape(data.description)}</description><link>${site}/work/${data.slug}/</link><guid>${site}/work/${data.slug}/</guid><pubDate>${new Date(data.updated).toUTCString()}</pubDate></item>`).join('')}</channel></rss>`,
    { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } },
  );
};
