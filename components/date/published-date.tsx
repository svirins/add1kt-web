import { useIntl } from 'next-intl';
import { parseISO } from 'date-fns';

export default function PublishedDate({ date }) {
    const intl = useIntl();

  return (
      <time dateTime={date}>
        {intl.formatDateTime(parseISO(date), {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </time>
  );
}
