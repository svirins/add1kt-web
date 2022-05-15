import { useRouter } from 'next/router';
export default function LocaleSwitcher() {
  const router = useRouter();
  const handleLocale = (locale) =>
    router.push(router.asPath, router.asPath, { locale: locale });
  return (
    <button
      aria-label="Toggle Site Language"
      type="button"
      className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
      onClick={() => handleLocale(router.locale === 'ru' ? 'pl' : 'ru')}
    >
      {router.locale === 'ru' ? (
        <span className="fi fi-ru fis"></span>
      ) : (
        <span className="fi fi-pl fis"></span>
      )}
    </button>
  );
}
