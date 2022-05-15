import { useIntl } from 'next-intl';
import { useTranslations } from 'next-intl';

export default function ReadingTime({  readingTime }) {
  const t = useTranslations("Post");
  return (
    <span>{`${readingTime} ${t("reading_time")}`}</span>
  );
}
