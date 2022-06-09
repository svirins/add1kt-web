import { useRouter } from 'next/router';
export function LocaleSwitch() {
  const router = useRouter();
  const handleLocale = (locale) =>
    router.push(router.asPath, router.asPath, { locale: locale });
  return (
    <button
      aria-label="Toggle Site Language"
      type="button"
      className="flex items-center "
      onClick={() => handleLocale(router.locale === 'ru' ? 'pl' : 'ru')}
    >
      <span className="font-medium items-center  py-2 lg:py-4 transition-all duration-100 text-base md:text-xl text-gray-800 dark:text-gray-50 hover:text-teal-600 dark:hover:text-teal-400">
        {router.locale === 'ru' ? 'ru' : 'pl'}
      </span>
    </button>
  );
}
