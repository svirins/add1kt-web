import { GLOBAL_CONFIG, LOCALIZED_ALGOLIA_INDICES } from "./global.config";

export const shimmer = (w: number, h: number) => `
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

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export function getSkipValue(page: number) {
  const skipMultiplier = page === 1 ? 0 : page - 1;
  return skipMultiplier > 0
    ? GLOBAL_CONFIG.pagination.pageSize * skipMultiplier
    : 0;
}

export function truncate(
  str: string,
  length = GLOBAL_CONFIG.trimmedHeaderLength
) {
  let i;
  const bits = str.split("");
  if (bits.length > length) {
    for (i = bits.length - 1; i > -1; i -= 1) {
      if (i > length) {
        bits.length = i;
      } else if (bits[i] === " ") {
        bits.length = i;
        break;
      }
    }
    bits.push("...");
  }
  return bits.join("");
}

export function getIndexNameByLocale(locale: string): string {
  return LOCALIZED_ALGOLIA_INDICES.find((index) => index.locale === locale)!
    .indexName;
}
