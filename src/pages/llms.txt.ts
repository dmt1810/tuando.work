import type { APIRoute } from 'astro';
import { publicPages } from '../data/pages';
import { profile, site } from '../data/profile';
export const GET: APIRoute = async () =>
  new Response(
    `# ${profile.person.displayName}\n\n> ${profile.person.subline.en}\n\nContact: ${profile.person.email}\nLinkedIn: ${profile.person.linkedin}\n\n## Pages\n\n${(await publicPages()).map((page) => `- [${page.title}](${site}${page.path}): ${page.description}`).join('\n')}\n\n## Expanded profile\n\n- [Full text](${site}/llms-full.txt)\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
