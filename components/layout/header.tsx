import cn from 'classnames';
import { useTranslations } from 'next-intl';
import NextLink from 'next/link';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LocaleSwitcher from '@/components/misc/locale-switcher';
import ThemeSwitcher from '@/components/misc/theme-switcher';
import MobileMenu from '@/components/misc/mobile-menu';

import Config from '@/config/global-config';

function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a
        className={cn(
          isActive ? ' text-teal-600' : '',
          'hidden font-medium text-xl md:inline-block p-2 lg:py-4 items-center transition-all delay-100 hover:text-teal-800 dark:hover:text-teal-400'
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
      <nav className="flex items-center justify-between w-full relative max-w-3xl  mx-auto pt-8 pb-8 md:pb-16">
        <a href="#skip" className="skip-nav">
          Skip to content
        </a>
        <div className="ml-[-0.60rem] inline-flex items-center">
          <MobileMenu />
          {Config.menuLinks.map((link, index) => (
            <NavItem
              href={link.href}
              text={index === 0 ? '//' : t(link.title)}
              key={link.title}
            />
          ))}
        </div>
        {mounted && (
          <div className="inline-flex">
            <LocaleSwitcher />
            <ThemeSwitcher />
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
