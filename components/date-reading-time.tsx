import { useIntl } from 'next-intl';
import { parseISO } from 'date-fns';
import { useTranslations } from 'next-intl';

export default function DateReadingTime({ date, readingTime }) {
  const intl = useIntl();
  const t = useTranslations('Post');
  return (
    <>
      <time className="flex" dateTime={date}>
        {intl.formatDateTime(parseISO(date), {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </time>
      <div className="flex text-xs">{`${readingTime} ${t(
        'reading_time'
      )}`}</div>
    </>
  );
}
