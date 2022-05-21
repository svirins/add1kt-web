import cn from 'classnames';
import { useTranslations } from 'next-intl';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LocaleSwitcher from '@/components/misc/locale-switcher';
import ThemeSwitcher from '@/components/misc/theme-switcher';
import MobileMenu from '@/components/misc/mobile-menu';

function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a
        className={cn(
          isActive
            ? 'font-semibold text-gray-800 dark:text-gray-200'
            : 'font-normal text-gray-600 dark:text-gray-400',
          'hidden md:inline-block p-1 sm:px-3 sm:py-2 items-center hover:underline font-semibold transition-all'
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  );
}

function Header() {
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('Navigation');
  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const router = useRouter();
  return (
    <div className="flex flex-col justify-center px-8">
      <nav className="flex items-center justify-between w-full relative max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
        <a href="#skip" className="skip-nav">
          Skip to content
        </a>
        <div className="ml-[-0.60rem]">
          <MobileMenu />
          <NavItem href="/" text={t('home')} />
          <NavItem href="/blog/page/1" text={t('blog')} />
          <NavItem href="/about" text={t('about')} />
        </div>
        {mounted && (
          <div className="inline-flex flex">
            <LocaleSwitcher />
            <ThemeSwitcher />
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
