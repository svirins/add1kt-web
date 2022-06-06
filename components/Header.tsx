import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { globalConfig } from '@/lib/config';

import LocaleSwitcher from '@/components/LocaleSwitcher';
import NavItemHeader from '@/components/NavItemHeader';
import ThemeSwitcher from '@/components/ThemeSwitcher';

function Header() {
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('Navigation');
  useEffect(() => setMounted(true), []);

  const router = useRouter();
  return (
    <nav className="py-8 sm:pb-16">
      <a href="#skip" className="skip-nav">
        Skip to content
      </a>
      <div className="flex justify-between">
        <div className="inline-flex items-center">
          {globalConfig.menuLinks.map((link, index) => (
            <NavItemHeader
              href={link.href}
              text={index === 0 ? '//' : t(link.title)}
              key={link.title}
            />
          ))}
        </div>
        {mounted && (
          <div className="inline-flex items-center">
            <LocaleSwitcher />
            {/* <ThemeSwitcher /> */}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
