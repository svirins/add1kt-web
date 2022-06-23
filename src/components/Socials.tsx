import { ExternalLink } from "@/components/ExternalLink";
import { Facebook, Telegram, Youtube } from "@/components/Icons";

function getSocialIconByLink(url: string) {
  if (url.search(/youtube/i) !== -1) {
    return Youtube;
  }
  if (url.search(/facebook/i) !== -1) {
    return Facebook;
  }
  if (url.search(/t.me/i) !== -1) {
    return Telegram;
  }
  return null;
}

export function Socials({ socials }: { socials: string[] }) {
  const icons = socials.map((social, index) => (
    <ExternalLink key={index} href={social}>
      {getSocialIconByLink(social)!}
    </ExternalLink>
  ));
  return <>{icons}</>;
}
