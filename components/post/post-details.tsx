import { useTranslations, useIntl } from 'next-intl';
import { parseISO } from 'date-fns';

export default function PostDetails({ date, readingTime }) {
  const intl = useIntl();
  const t = useTranslations('Post');

  return (
    <div className="flex max-w-full justify-between">
      <time>
        {intl.formatDateTime(parseISO(date), {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </time>
      <div>{`${readingTime} ${t('reading_time')}`}</div>
    </div>
  );
}
