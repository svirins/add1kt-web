import readingTime from 'reading-time';
// import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
export const getExcerpt = (str, max, suffix) => {
  const maxLength = max ? max : 200;
  const suffixString = suffix ? suffix : '...';
  const clearedString = str.replace(/\|&;\$%@"<>__\(\)\+,/g, '');

  return clearedString.length < maxLength
    ? clearedString
    : `${clearedString.substr(
        0,
        clearedString
          .substr(0, maxLength - suffixString.length)
          .lastIndexOf(' ')
      )}${suffixString}`;
};

export const getReadingTime = (str) => {
  // TODO: add i18n
  const clearedString = str.replace(/\|&;\$%@"<>__\(\)\+,/g, '');
  const { text, minutes, time, words } = readingTime(clearedString);
  console.log(text, minutes, time, words);
  return { text, minutes, time, words };
};
