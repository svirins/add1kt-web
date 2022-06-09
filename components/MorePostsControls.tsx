import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function MorepostsControls({ isDisabled }) {
  const t = useTranslations('Post');
  return (
    <div className="flex flex-row justify-center place-items-center  w-full flex-nowrap">
      {isDisabled ? (
        <p className="group  inline-flex items-center font-medium  text-lg md:text-xl text-gray-500">
          <span>{`${t('more_posts')} →`}</span>
        </p>
      ) : (
        <Link href={`/blog/p/1`}>
          <a className="group inline-flex items-center font-medium  text-gray-800 dark:text-gray-200  hover:text-teal-600 text-base transition-all delay-100 dark:hover:text-teal-400">
            <span>{`${t('more_posts')} →`}</span>
          </a>
        </Link>
      )}
    </div>
  );
}
