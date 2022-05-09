import readingTime from 'reading-time';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
export const getExcerptAndReadingTime = (body, max, suffix) => {
  const maxLength = max ? max : 192;
  const suffixString = suffix ? suffix : '...';
  const convertedString = documentToPlainTextString(body.json);
  const { minutes } = readingTime(convertedString);
  const truncatedString = convertedString
    .replace(/\|&;\$%@"<>_\(\)\+,/g, '')
    .substring(0, maxLength);
  return {
    excerpt: `${truncatedString}${suffixString}`,
    readingTime: Math.ceil(minutes)
  };
};
