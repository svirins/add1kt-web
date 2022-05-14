import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function MorepostsControls() {
  const t = useTranslations('Post');
  return (
    <div className="flex flex-row justify-center">
      <Link href={`/blog/page/1`}>
        <a className="flex border-2 border-blue-500 font-bold text-blue-500 px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white mr-6">
          {t('more_posts')}
        </a>
      </Link>
    </div>
  );
}
