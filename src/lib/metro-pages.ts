import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const careerSlugs = [
  'mytour',
  'metrixa',
  'onemount',
  'igloo',
  'tastech',
];
export const projectSlugs = ['catsa', 'cenhomes', 'dichung', 'hanoicc'];
export type MetroKind = 'home' | 'career' | 'projects' | 'project';

export function metroDocument(
  lang: 'en' | 'vi',
  kind: MetroKind,
  slug?: string,
) {
  let path = lang === 'vi' ? 'vi/' : '';
  if (kind === 'career') {
    if (!slug || !careerSlugs.includes(slug))
      throw new Error('Unknown career station');
    path += `career/${slug}/`;
  } else if (kind === 'project') {
    if (!slug || !projectSlugs.includes(slug))
      throw new Error('Unknown project');
    path += `projects/${slug}/`;
  } else if (kind === 'projects') path += 'projects/';
  return readFileSync(resolve('.metro-build', path + 'index.html'), 'utf8');
}
