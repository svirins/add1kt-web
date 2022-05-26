import { useTranslations } from 'next-intl';

import NavItemFooter from '@/components/misc/nav-item-footer';
import SectionSeparator from '@/components/misc/section-separator';
import Config from '@/config/global-config';

const ExternalLink = ({ href, children }) => (
  <a className="" target="_blank" rel="noopener noreferrer" href={href}>
    {children}
  </a>
);

export default function Footer() {
  const t = useTranslations('Navigation');

  return (
    <footer className="flex flex-col justify-center items-start max-w-3xl mx-auto w-full mb-8">
      <SectionSeparator />
      <div className="inline-flex items-center">
        {Config.menuLinks.map((link, index) => (
          <NavItemFooter
            href={link.href}
            text={t(link.title)}
            key={link.title}
          />
        ))}
      </div>
    </footer>
  );
}
