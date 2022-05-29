import Link from 'next/link';
import Image from 'next/image';

import { useTranslations, useIntl } from 'next-intl';
import { parseISO } from 'date-fns';

export default function PostMeta({ author, date, readingTime }) {
  const intl = useIntl();
  const t = useTranslations('Post');
  return (
    <>
      <div className="relative">
        <Image
          src={author.authorPicture}
          height="44"
          width="44"
          className="rounded-full align-middle"
          alt={author.authorName}
        />
      </div>
      <div className="pl-2 flex-1">
        <Link href={`/author/${author.authorSlug}`}>
          <a className="font-bold text-base hover:text-teal-600  transition-all delay-100 dark:hover:text-teal-400">
            {author.authorName}
          </a>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <time>
            {intl.formatDateTime(parseISO(date), {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          {` • `}
          <span>{`${readingTime} ${t('reading_time')}`}</span>
        </p>
      </div>
    </>
  );
}
