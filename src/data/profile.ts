import seed from './profile.json';
import { profileSchema } from './schema';
export const profile = profileSchema.parse(seed);
export const updated = '2026-10-06';
export const site = 'https://tuando.work';
export const period = (
  item: { start: string; end: string | null },
  lang = 'en',
) => `${item.start} → ${item.end ?? (lang === 'vi' ? 'Hiện tại' : 'Present')}`;
