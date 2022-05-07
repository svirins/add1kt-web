export const createExcerpt = (str, max, suffix) => {
  const purifiedStr = str.replace(/\|&;\$%@"<>__\(\)\+,/g, '');
  return str.length < max
    ? purifiedStr
    : `${purifiedStr.substr(
        0,
        purifiedStr.substr(0, max - suffix.length).lastIndexOf(' ')
      )}${suffix}`;
};
