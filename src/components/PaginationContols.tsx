import Link from "next/link";
import { useTranslations } from "next-intl";

export function PaginationControls({
  currentPage,
  totalPages = 0,
}: {
  currentPage: number;
  totalPages?: number;
}) {
  const t = useTranslations("Post");
  const isLeftDisabled = currentPage === 1;
  const isRightDisabled = currentPage === totalPages;

  return (
    <div className="flex w-full flex-row flex-nowrap  place-items-center justify-between">
      {isLeftDisabled ? (
        <p className="group  inline-flex items-center text-base  font-medium text-gray-500">
          <span>{` ← ${t("previous_page")}`}</span>
        </p>
      ) : (
        <Link href={`/blog/p/${Number(currentPage - 1)}`}>
          <a className="group  inline-flex items-center text-base font-medium transition-all  delay-100 hover:text-teal-600 dark:hover:text-teal-400">
            <span>{`← ${t("previous_page")}`}</span>
          </a>
        </Link>
      )}
      {isRightDisabled ? (
        <p className="group  inline-flex items-center text-base  font-medium text-gray-500">
          <span>{`${t("next_page")} →`}</span>
        </p>
      ) : (
        <Link href={`/blog/p/${Number(currentPage + 1)}`}>
          <a className="group  inline-flex items-center font-medium  transition-all  delay-100 hover:text-teal-600 dark:hover:text-teal-400">
            <span>{`${t("next_page")} →`}</span>
          </a>
        </Link>
      )}
    </div>
  );
}
