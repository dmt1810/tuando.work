import { getCollection } from 'astro:content';
import { profile } from './profile';
import { url, type Lang } from '../i18n';
import en from '../../scripts/metro/content.en.json';
import vi from '../../scripts/metro/content.vi.json';
import projects from '../../scripts/metro/projects.json';
export async function publicPages() {
  const pages: { path: string; title: string; description: string }[] = [];
  for (const lang of ['en', 'vi'] as Lang[]) {
    const content = lang === 'en' ? en : vi;
    pages.push({
      path: url(lang, 'projects'),
      title: lang === 'en' ? 'Projects' : 'Dự án',
      description: content.hero.sub,
    });
    for (const station of content.stations)
      pages.push({
        path: url(lang, `career/${station.slug}`),
        title: station.name,
        description: station.context,
      });
    for (const project of projects)
      pages.push({
        path: url(lang, `projects/${project.slug}`),
        title: project.title[lang],
        description: project.summary[lang],
      });
    pages.push({
      path: url(lang),
      title: profile.person.headline[lang],
      description: profile.person.subline[lang],
    });
    pages.push({
      path: url(lang, 'cv'),
      title: `${profile.person.displayName} · CV`,
      description: profile.summary.en,
    });
    for (const collection of ['services', 'work', 'lab'] as const) {
      pages.push({
        path: url(lang, collection),
        title:
          collection === 'services'
            ? lang === 'en'
              ? 'Services'
              : 'Dịch vụ'
            : collection === 'work'
              ? lang === 'en'
                ? 'Selected work'
                : 'Dự án chọn lọc'
              : 'Lab',
        description: profile.person.subline[lang],
      });
      const items = await getCollection(
        collection,
        ({ data }) => data.lang === lang && !data.draft,
      );
      for (const item of items)
        pages.push({
          path: url(lang, `${collection}/${item.data.slug}`),
          title: item.data.title,
          description: item.data.description,
        });
    }
  }
  return pages;
}
