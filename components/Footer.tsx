import { useTranslations } from 'next-intl';
import PoweredByVercel from 'powered-by-vercel';

import { ExternalLink } from '@/components/ExternalLink';
import { facebook, github, telegram } from '@/components/Icons';
import { NavItemFooter } from '@/components/NavItemFooter';
import { SectionSeparator } from '@/components/SectionSeparator';
import { globalConfig } from '@/config/global.config';

export function Footer() {
  const t = useTranslations('Navigation');

  return (
    <footer className="mx-auto mb-8  flex w-full max-w-2xl flex-col">
      <SectionSeparator />
      <div className="flex justify-between">
        <div className="inline-flex items-center">
          {globalConfig.menuLinks.map((link, index) => (
            <NavItemFooter
              href={link.href}
              text={index === 0 ? '//' : t(link.title)}
              key={link.title}
            />
          ))}
        </div>
        <div className="inline-flex items-center">
          <ExternalLink href={globalConfig.telegramLink}>
            {telegram}
          </ExternalLink>
          <ExternalLink href={globalConfig.facebookLink}>
            {facebook}
          </ExternalLink>
        </div>
      </div>
      <div className="mt-8 flex justify-center text-sm">
        <PoweredByVercel
          utmSource="addict.cf"
          target="_blank"
          rel="noopener noreferrer"
          svgProps={{
            width: 144,
          }}
        />
        <a
          className="items-center pl-4 text-xs font-thin text-gray-800 transition-all delay-100 hover:text-teal-800 dark:text-gray-50 dark:hover:text-teal-400 md:text-sm"
          target="_blank"
          rel="noopener noreferrer"
          href={globalConfig.githubLink}
          title="source code =&gt;"
        >
          {github}
        </a>
      </div>
    </footer>
  );
}
