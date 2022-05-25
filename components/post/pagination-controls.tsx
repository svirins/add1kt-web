import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function PaginationControls({ currentPage, totalPages = 0 }) {
  const t = useTranslations('Post');
  const isLeftDisabled = currentPage === 1 ? true : false;
  const isRightDisabled = currentPage === totalPages ? true : false;

  return (
    <div className="flex flex-row justify-between place-items-center  w-full flex-nowrap">
      <Link href={`/blog/p/${Number(currentPage - 1)}`}>
        <a className="group  inline-flex items-center font-medium hover:text-orange-600 hover:cursor-pointer dark:hover:text-orange-400 text-xl  transition-all delay-100 hover:underline">
          <span className="order-last">{t('previous_page')}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 flex-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </a>
      </Link>
      <Link href={`/blog/p/${Number(currentPage + 1)}`}>
        <a className="group inline-flex items-center font-medium hover:text-orange-600 hover:cursor-pointer dark:hover:text-orange-400 text-xl  transition-all delay-100 hover:underline">
          <span>{t('next_page')}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 flex-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </Link>
    </div>
  );
}
