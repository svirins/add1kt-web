import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function PaginationControls({ currentPage, totalPages = 0 }) {
  // TODO: implement enable-disable logic
  const t = useTranslations('Post');
  const isLeftDisabled = currentPage === 1 ? true : false;
  const isRightDisabled = currentPage === totalPages ? true : false;

  return (
    <div className="flex flex-row justify-between">
      <Link href={`/blog/page/${Number(currentPage - 1)}`}>
        <a className="flex border-2 border-blue-500 font-bold text-blue-500 px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white mr-6">
          {t('previous_page')}
        </a>
      </Link>
      <Link href={`/blog/page/${Number(currentPage + 1)}`}>
        <a className="flex border-2 border-blue-500 font-bold text-blue-500 px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white mr-6">
          {t('next_page')}
        </a>
      </Link>
    </div>
  );
}
