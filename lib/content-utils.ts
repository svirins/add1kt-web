import { globalConfig } from '@/lib/config';
import { youtube, facebook, telegram } from '@/components/Icons';

export const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export function getSkipValue(page) {
  const skipMultiplier = page === 1 ? 0 : page - 1;
  return skipMultiplier > 0
    ? globalConfig.pagination.pageSize * skipMultiplier
    : 0;
}

export function getSocialIconByLink(url) {
  if (url.search(/youtube/i) !== -1) {
    return youtube;
  }
  if (url.search(/facebook/i) !== -1) {
    return facebook;
  }
  if (url.search(/t.me/i) !== -1) {
    return telegram;
  }

  return null;
}
