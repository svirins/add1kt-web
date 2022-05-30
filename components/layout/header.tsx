import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { globalConfig } from '@/lib/config';

import LocaleSwitcher from '@/components/misc/locale-switcher';
import NavItemHeader from '@/components/misc/nav-item-header';
import ThemeSwitcher from '@/components/misc/theme-switcher';

function Header() {
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('Navigation');
  useEffect(() => setMounted(true), []);

  const router = useRouter();
  return (
    <>
      <a href="#skip" className="skip-nav">
        Skip to content
      </a>
      <div className="ml-[-0.60rem] inline-flex items-center">
        {/* <MobileMenu /> */}
        {globalConfig.menuLinks.map((link, index) => (
          <NavItemHeader
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
    </>
  );
}

export default Header;
