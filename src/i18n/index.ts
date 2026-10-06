import en from './en.json';
import vi from './vi.json';
export type Lang = 'en' | 'vi';
export const strings = (lang: Lang) => (lang === 'vi' ? vi : en);
export const url = (lang: Lang, path = '') =>
  `${lang === 'vi' ? '/vi' : '/'}/${path}`
    .replace(/\/+/g, '/')
    .replace(/\/?$/, '/');
export const equivalent = (path: string, lang: Lang) => {
  if (/^\/(vi\/)?404(?:\.html)?\/?$/.test(path))
    return lang === 'en' ? '/404.html' : '/vi/404/';
  return url(lang, path.replace(/^\/vi(?=\/|$)/, '').replace(/^\//, ''));
};
