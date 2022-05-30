import { useTranslations } from 'next-intl';

import { globalConfig } from '@/lib/config';
import NavItemFooter from '@/components/misc/NavItemFooter';
import SectionSeparator from '@/components/misc/section-separator';

import { youtube, facebook, telegram, vercel } from '@/components/misc/Icons';

const ExternalLink = ({ href, children }) => (
  <a
    className="font-medium text-base p-2 items-center transition-all delay-100 hover:text-teal-800 dark:hover:text-teal-400"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer() {
  const t = useTranslations('Navigation');

  return (
    <footer className="flex flex-col  max-w-2xl mx-auto w-full mb-8">
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
      <div className="flex justify-center pt-16 text-sm">
        <a
          href="https://vercel.com/?utm_source=addictcf"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Powered by Vercel"
        >
          {vercel}
        </a>
      </div>
    </footer>
  );
}
