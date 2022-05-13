import Link from 'next/link';
import { useRouter } from 'next/router';
// TODO: implement detect locale
export default function LocaleSwitcher() {
  const { locales, locale, pathname, query, asPath } = useRouter();
  const otherLocales = locales.filter((l) => l !== locale); // Find all the locales apart from the current locale.

  return (
    <>
      {otherLocales.map((locale) => {
        return (
          <Link
            key={locale}
            href={{ pathname, query }}
            as={asPath}
            locale={locale}
          >
            <a>Switch to &quot;{locale}&quot;</a>
          </Link>
        );
      })}
    </>
  );
}
