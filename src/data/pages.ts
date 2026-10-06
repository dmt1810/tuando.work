import { getCollection } from 'astro:content';
import { profile } from './profile';
import { url, type Lang } from '../i18n';
export async function publicPages() {
  const pages: { path: string; title: string; description: string }[] = [];
  for (const lang of ['en', 'vi'] as Lang[]) {
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
