import { useTranslations } from "next-intl";
import PoweredByVercel from "powered-by-vercel";

import { ExternalLink } from "@/components/ExternalLink";
import { facebook, github, telegram } from "@/components/Icons";
import { NavItemFooter } from "@/components/NavItemFooter";
import { SectionSeparator } from "@/components/SectionSeparator";
import { globalConfig } from "@/utils/global.config";

export function Footer() {
  const t = useTranslations("Navigation");

  return (
    <footer className="flex flex-col  max-w-2xl mx-auto w-full mb-8">
      <SectionSeparator />
      <div className="flex justify-between">
        <div className="inline-flex items-center">
          {globalConfig.menuLinks.map((link, index) => (
            <NavItemFooter
              href={link.href}
              text={index === 0 ? "//" : t(link.title)}
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
      <div className="flex justify-center mt-8 text-sm">
        <PoweredByVercel
          utmSource="addict.cf"
          target="_blank"
          rel="noopener noreferrer"
          svgProps={{
            width: 144,
          }}
        />
        <a
          className="font-thin pl-4 text-xs md:text-sm items-center transition-all delay-100 text-gray-800 dark:text-gray-50 hover:text-teal-800 dark:hover:text-teal-400"
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
