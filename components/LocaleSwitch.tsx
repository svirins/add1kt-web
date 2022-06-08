import { useRouter } from 'next/router';

export function LocaleSwitch() {
  const router = useRouter();
  const handleLocale = (locale) =>
    router.push(router.asPath, router.asPath, { locale });
  return (
    <button
      aria-label="Toggle Site Language"
      type="button"
      className="flex items-center "
      onClick={() => handleLocale(router.locale === 'ru' ? 'pl' : 'ru')}
    >
      <span className="items-center py-2  text-base font-medium text-gray-800 transition-all duration-100 hover:text-teal-600 dark:text-gray-50 dark:hover:text-teal-400 md:text-xl lg:py-4">
        {router.locale === 'ru' ? 'ru' : 'pl'}
      </span>
    </button>
  );
}
