import { parseISO } from 'date-fns';
import Link from 'next/link';
import { useIntl, useTranslations } from 'next-intl';

import { SanityImage } from '@/components/SanityImage';
import { globalConfig } from '@/config/global.config';

export function PostMeta({ author, date, readingTime }) {
  const intl = useIntl();
  const t = useTranslations('Post');
  return (
    <>
      <div className="relative">
        <SanityImage
          url={author.authorPicture}
          alt={author.authorName}
          w={globalConfig.images.defaultAvatarImageWidthHeight}
          isRounded={true}
        />
      </div>
      <div className="flex-1 pl-2">
        <Link href={`/author/${author.authorSlug}`}>
          <a className="text-base font-bold transition-all  delay-100 hover:text-teal-600 dark:hover:text-teal-400">
            {author.authorName}
          </a>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <time>
            {intl.formatDateTime(parseISO(date), {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {` • `}
          <span>{`${readingTime} ${t('reading_time')}`}</span>
        </p>
      </div>
    </>
  );
}
