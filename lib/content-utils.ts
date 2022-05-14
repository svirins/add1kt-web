import readingTime from 'reading-time';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

export const getExcerptAndReadingTime = (body, max = 192, suffix = ' ...') => {
  const convertedString = documentToPlainTextString(body?.json);
  const { minutes } = readingTime(convertedString);
  const truncatedString = convertedString
    .replace(/[|&;$%@<>()+_*,]/g, '')
    .substring(0, max);
  const lastSpace = truncatedString.lastIndexOf(' ');
  return {
    excerpt: `${truncatedString.substring(0, lastSpace + 1)}${suffix}`,
    readingTime: Math.ceil(minutes)
  };
};

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
