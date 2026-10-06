import type { APIRoute } from 'astro';
import { site } from '../data/profile';
const agents = [
  '*',
  'Googlebot',
  'Bingbot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Claude-SearchBot',
  'Claude-User',
  'GPTBot',
  'Google-Extended',
  'CCBot',
  'ClaudeBot',
];
// TODO(human): decide whether to disallow training crawlers. Vendor references in docs/SEO.md.
export const GET: APIRoute = () =>
  new Response(
    agents.map((agent) => `User-agent: ${agent}\nAllow: /\n`).join('\n') +
      `\nSitemap: ${site}/sitemap-index.xml\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
