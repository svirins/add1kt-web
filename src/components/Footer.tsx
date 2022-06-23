import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import PoweredByVercel from "powered-by-vercel";

import { ExternalLink } from "@/components/ExternalLink";
import { Facebook, Github, Rss, Telegram } from "@/components/Icons";
import { NavItemFooter } from "@/components/NavItemFooter";
import { SectionSeparator } from "@/components/SectionSeparator";
import { GLOBAL_CONFIG } from "@/utils/global.config";

export function Footer() {
  const t = useTranslations("Navigation");
  const { locale } = useRouter();
  const isPl = locale === "pl" ? "/pl" : "";

  return (
    <footer className="mx-auto mb-8  flex w-full max-w-2xl flex-col">
      <SectionSeparator />
      <div className="flex justify-between">
        <div className="inline-flex items-center">
          {GLOBAL_CONFIG.menuLinks.map((link, index) => (
            <NavItemFooter
              href={link.href}
              text={index === 0 ? "//" : t(link.title)}
              key={link.title}
            />
          ))}
        </div>
        <div className="inline-flex items-center">
          <ExternalLink href={`./${isPl}/rss/feed.xml`}>{Rss}</ExternalLink>
          <ExternalLink href={GLOBAL_CONFIG.telegramLink}>{Telegram}</ExternalLink>
          <ExternalLink href={GLOBAL_CONFIG.facebookLink}>{Facebook}</ExternalLink>
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
          className="items-center pl-4 text-xs font-thin text-gray-800 transition-all delay-100 hover:text-orange-600 dark:text-gray-50 dark:hover:text-green-400 md:text-sm"
          target="_blank"
          rel="noopener noreferrer"
          href={GLOBAL_CONFIG.githubLink}
          title="source code =&gt;"
        >
          {Github}
        </a>
      </div>
    </footer>
  );
}
