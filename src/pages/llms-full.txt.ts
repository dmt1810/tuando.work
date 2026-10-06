import type { APIRoute } from 'astro';
import { profile, site, period, updated } from '../data/profile';
import { publicPages } from '../data/pages';
import { getCollection } from 'astro:content';
export const GET: APIRoute = async () => {
  const services = await getCollection(
    'services',
    ({ data }) => data.lang === 'en' && !data.draft,
  );
  const text = [
    `# ${profile.person.displayName}`,
    profile.person.subline.en,
    `Last updated: ${updated}`,
    `Email: ${profile.person.email}`,
    `LinkedIn: ${profile.person.linkedin}`,
    '## Experience',
    ...profile.experience
      .filter((e) => e.show.site)
      .map(
        (e) =>
          `### ${e.company}\n${e.role} · ${period(e)}\n${e.summary}\n${e.achievements.map((a) => `- ${a}`).join('\n')}`,
      ),
    '## Consulting',
    ...profile.consulting.map(
      (c) =>
        `### ${c.client}\n${c.industry}\n${c.scope.map((s) => `- ${s}`).join('\n')}`,
    ),
    '## Services',
    ...services.map(
      (s) => `### ${s.data.title}\n${s.data.description}\n${s.body}`,
    ),
    '## Skills',
    ...Object.entries(profile.skills).map(
      ([key, value]) => `${key}: ${value.join(', ')}`,
    ),
    '## Pages',
    ...(await publicPages()).map((p) => `${p.title}: ${site}${p.path}`),
  ].join('\n\n');
  return new Response(text + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
