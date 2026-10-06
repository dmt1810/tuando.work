import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';
import { profile } from './profile';
export async function entries<C extends 'services' | 'work' | 'lab'>(
  collection: C,
  lang: Lang,
): Promise<CollectionEntry<C>[]> {
  const list = await getCollection<C>(
    collection,
    ({ data }) => data.lang === lang && !data.draft,
  );
  return list.sort((a, b) => a.id.localeCompare(b.id));
}
export const workRecord = (data: {
  kind: 'experience' | 'consulting';
  profileId: string;
}) => {
  const item =
    data.kind === 'experience'
      ? profile.experience.find((e) => e.id === data.profileId && e.show.site)
      : profile.consulting.find((e) => e.id === data.profileId);
  if (!item)
    throw new Error(`Invalid or hidden profile reference: ${data.profileId}`);
  return item;
};
