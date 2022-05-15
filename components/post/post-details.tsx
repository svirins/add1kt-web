import { useEffect } from 'react';
import { useTranslations, useIntl } from 'next-intl';
import useSWR from 'swr';
import { parseISO } from 'date-fns';
import fetcher from '@/lib/fetcher';

export default function PostDetails({ date, readingTime, slug }) {
  const intl = useIntl();
  const t = useTranslations('Post');

  // const { locale } = { useRouter };
  // const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher);
  // const views = new Number(data?.total);
  // useEffect(() => {
  //   const registerView = () =>
  //     fetch(`/api/views/${slug}`, {
  //       method: 'POST'
  //     });
  //   registerView();
  // }, [slug]);
  // return <span>{`${views > 0 ? views.toLocaleString() : '–––'} views`}</span>;

  return (
    <div className="justify-between">
      <div>
        <time>
          {intl.formatDateTime(parseISO(date), {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </time>
      </div>
      <div>{`${readingTime} ${t('reading_time')}`}</div>
      <div>{`207 : views`}</div>;
    </div>
  );
}

{
  ` • `;
}
